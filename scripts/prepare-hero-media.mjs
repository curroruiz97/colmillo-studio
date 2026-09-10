/**
 * COLMILLO STUDIO - HERO MEDIA PREPARATION
 *
 * Derives the approved hero loop from the supplied client master.
 * The master (`media-src/WEB.webm`) is never modified.
 *
 * The artwork is black line art drawn on a uniform off-white sheet measured at
 * RGB(250, 250, 250). The hero surface behind it is a flat page colour, the
 * "paper target" chosen with `--paper=`:
 *
 * - `white` (default): `--color-white`, the light surface since 2026-09-10.
 *   Writes `hero-*-white.*`, the files the site publishes.
 * - `cream`: `--color-brand-cream`, the original surface. Writes the original
 *   unsuffixed `hero-*.*` set, byte-identical to the first delivery.
 *
 * Two steps follow from that:
 *
 * 1. COLOUR. Every channel is mapped `paper * min(1, value / 250)`, so the
 *    sheet becomes exactly the page colour and every antialiased edge already
 *    blends ink into it. The master is neutral grey, so on white this is a
 *    uniform 2% lift and the ink keeps its colour. Nothing else is graded.
 *
 * 2. ALPHA. Any pixel at or above `SHEET_THRESHOLD` becomes fully transparent.
 *    Because those pixels were already mapped to the page colour, cutting them
 *    is exact: it cannot produce a halo, and it removes the codec's 1-3 level
 *    drift across a large flat field, which is visible as a faint rectangle
 *    when the loop sits on a flat page.
 *
 *    The cut is deliberately not limited to sheet connected to the frame
 *    border. The figures contain large interior white areas — faces, shirts,
 *    shoes, a handbag, the cathedral — drawn in exactly the sheet colour. A
 *    border-seeded flood fill keeps those opaque, which is what produced the
 *    drift in the first place. Letting the page show through them is
 *    identical in appearance and exact in colour.
 *
 *    The consequence is a real constraint: each derivative is composited for
 *    its paper target. It must not be placed over another colour without being
 *    regenerated for it; `npm run check:hero` fails if the published set does
 *    not match `--color-background`.
 *
 * A decoder that ignores WebM alpha still renders the correct picture, because
 * the colour plane alone is already the artwork flattened over the page colour.
 * The MP4 fallback is that same flattened picture, opaque.
 *
 * Requires ffmpeg/ffprobe on PATH, or FFMPEG_PATH pointing at the bin folder.
 */
import { Buffer } from 'node:buffer';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
/*
 * The supplied master. It deliberately lives outside `public/`: everything
 * under that directory is copied verbatim into `dist/`, and the raw client
 * master is build input, not a published asset. HERO_SOURCE overrides this for
 * a one-off run against a different file.
 */
const source = process.env.HERO_SOURCE
  ? resolve(root, process.env.HERO_SOURCE)
  : join(root, 'media-src', 'WEB.webm');
const outputDirectory = join(root, 'public', 'assets', 'motion', 'hero');
// Intermediates must never live under `public/`: everything there is copied
// verbatim into `dist/`. HERO_WORK_DIR keeps them so encoder settings can be
// retuned without repeating the flood fill.
const keepWork = Boolean(process.env.HERO_WORK_DIR);
const workDirectory = keepWork
  ? process.env.HERO_WORK_DIR
  : await mkdtemp(join(tmpdir(), 'colmillo-hero-'));
await mkdir(workDirectory, { recursive: true });

const bin = process.env.FFMPEG_PATH ?? '';
const ffmpeg = bin ? join(bin, 'ffmpeg') : 'ffmpeg';

/**
 * Empty sheet measured across all 388 frames: the drawing never leaves
 * 12.9%-67.5% horizontally. The crop keeps a ~2% margin on each side and the
 * full height, removing only blank paper and turning the 7:3 master into a
 * 4:3 frame the hero can actually show at a readable size.
 */
const CROP = { width: 2880, height: 2160, x: 588, y: 0 };

/** Measured sheet white of the master. */
const PAPER = 250;
/** Must stay identical to `--color-brand-cream` in `src/styles/tokens.css`. */
const CREAM = [0xfc, 0xee, 0xda];
/** Must stay identical to `--color-white` in `src/styles/tokens.css`. */
const WHITE = [0xff, 0xff, 0xff];

/** Page colours the sheet can be composited for, and their file suffixes. */
const PAPER_TARGETS = {
  white: { rgb: WHITE, suffix: '-white' },
  cream: { rgb: CREAM, suffix: '' },
};
const paperName =
  process.argv.find((argument) => argument.startsWith('--paper='))?.slice(8) ??
  'white';
const paper = PAPER_TARGETS[paperName];
if (!paper) {
  throw new Error(`Unknown --paper=${paperName}. Use "white" or "cream".`);
}
/**
 * A pixel at or above this luminance is sheet. The measured sheet floor is 247,
 * so this clears the paper and its noise while staying far above the ink and
 * the grey shading; the widest possible step it can introduce reads as one
 * more level of antialiasing.
 */
const SHEET_THRESHOLD = 240;

const targets = [
  /*
   * Cutting every sheet pixel makes the alpha plane a detailed mask rather than
   * one large region, which is what the encoder spends its bits on. Because the
   * paper is gone, colour-plane loss only ever touches ink and shading, so a
   * high CRF stays clean; these values were chosen against the rendered result.
   */
  { name: 'desktop', width: 1440, height: 1080, crf: 52 },
  { name: 'mobile', width: 768, height: 576, crf: 54 },
];

const frameLimit = Number(
  process.argv.find((argument) => argument.startsWith('--frames='))?.slice(9) ??
    0,
);

/** Flattens readable `[flag, value]` pairs into an ffmpeg argument list. */
function flags(pairs) {
  return pairs.flat();
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', ...options });
    child.on('error', reject);
    child.on('close', (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`${command} exited with code ${code}`)),
    );
  });
}

/** Maps one decoded RGB frame to paper-flattened RGBA with the sheet cut out. */
function createTransformer(width, height) {
  const pixels = width * height;
  // Lookup from source channel value to the paper-flattened channel value.
  const map = paper.rgb.map((channel) => {
    const table = new Uint8Array(256);
    for (let value = 0; value < 256; value += 1) {
      table[value] = Math.round(channel * Math.min(1, value / PAPER));
    }
    return table;
  });

  return function transform(frame) {
    // A fresh buffer per frame: the encoder stream may still hold a reference
    // to the previous one while it drains.
    const output = Buffer.allocUnsafe(pixels * 4);
    for (let i = 0; i < pixels; i += 1) {
      const o = i * 3;
      const q = i * 4;
      const r = frame[o];
      const g = frame[o + 1];
      const b = frame[o + 2];
      output[q] = map[0][r];
      output[q + 1] = map[1][g];
      output[q + 2] = map[2][b];
      const luminance = (r * 77 + g * 150 + b * 29) >> 8;
      output[q + 3] = luminance >= SHEET_THRESHOLD ? 0 : 255;
    }
    return output;
  };
}

/** Streams the master through the flood fill into a lossless RGBA master. */
async function buildMaster(target, destination) {
  const { width, height } = target;
  const filters = [
    `crop=${CROP.width}:${CROP.height}:${CROP.x}:${CROP.y}`,
    `scale=${width}:${height}:flags=lanczos`,
  ].join(',');

  const decoder = spawn(
    ffmpeg,
    [
      '-v',
      'error',
      '-i',
      source,
      '-an',
      ...(frameLimit ? ['-frames:v', String(frameLimit)] : []),
      '-vf',
      filters,
      '-pix_fmt',
      'rgb24',
      '-f',
      'rawvideo',
      '-',
    ],
    { stdio: ['ignore', 'pipe', 'inherit'] },
  );

  const encoder = spawn(
    ffmpeg,
    [
      '-v',
      'error',
      '-f',
      'rawvideo',
      '-pix_fmt',
      'rgba',
      '-s',
      `${width}x${height}`,
      '-r',
      '30',
      '-i',
      '-',
      '-c:v',
      'ffv1',
      '-pix_fmt',
      'rgba',
      '-y',
      destination,
    ],
    { stdio: ['pipe', 'inherit', 'inherit'] },
  );

  const transform = createTransformer(width, height);
  const frameBytes = width * height * 3;
  let carry = Buffer.alloc(0);
  let frames = 0;

  await new Promise((resolve, reject) => {
    decoder.stdout.on('data', (chunk) => {
      carry = carry.length ? Buffer.concat([carry, chunk]) : chunk;
      while (carry.length >= frameBytes) {
        const frame = carry.subarray(0, frameBytes);
        carry = carry.subarray(frameBytes);
        frames += 1;
        if (!encoder.stdin.write(transform(frame))) {
          decoder.stdout.pause();
          encoder.stdin.once('drain', () => decoder.stdout.resume());
        }
        if (frames % 30 === 0) {
          process.stdout.write(`  ${target.name}: ${frames} frames\n`);
        }
      }
    });
    decoder.stdout.on('end', () => {
      encoder.stdin.end();
      resolve();
    });
    decoder.on('error', reject);
    encoder.on('error', reject);
  });

  await new Promise((resolve, reject) => {
    encoder.on('close', (code) =>
      code === 0 ? resolve() : reject(new Error(`ffv1 exited ${code}`)),
    );
  });

  process.stdout.write(`  ${target.name}: ${frames} frames processed\n`);
  return frames;
}

async function report(file) {
  const { size } = await stat(file);
  process.stdout.write(`  ${file.replace(root, '')} — ${size} bytes\n`);
}

await mkdir(outputDirectory, { recursive: true });

for (const target of targets) {
  process.stdout.write(`\n${target.name} (${target.width}x${target.height})\n`);
  const master = join(workDirectory, `master-${target.name}-${paperName}.mkv`);
  if (keepWork && existsSync(master)) {
    process.stdout.write('  reusing existing lossless master\n');
  } else {
    await buildMaster(target, master);
  }

  const webm = join(outputDirectory, `hero-${target.name}${paper.suffix}.webm`);
  await run(
    ffmpeg,
    flags([
      ['-v', 'error'],
      ['-i', master],
      ['-an'],
      ['-c:v', 'libvpx-vp9'],
      ['-pix_fmt', 'yuva420p'],
      ['-b:v', '0'],
      ['-crf', String(target.crf)],
      ['-row-mt', '1'],
      // Alternate reference frames survive the alpha channel and pay for
      // themselves; verified with
      // `ffprobe -show_entries stream_tags=alpha_mode`.
      ['-auto-alt-ref', '1'],
      ['-lag-in-frames', '25'],
      ['-deadline', 'good'],
      ['-cpu-used', '1'],
      ['-y', webm],
    ]),
  );
  await report(webm);

  // No portable MP4 carries alpha, so the fallback is the same picture already
  // flattened over the page colour. It is visually identical over the hero.
  const mp4 = join(outputDirectory, `hero-${target.name}${paper.suffix}.mp4`);
  await run(
    ffmpeg,
    flags([
      ['-v', 'error'],
      ['-i', master],
      ['-an'],
      ['-vf', `scale=${target.width}:${target.height},format=yuv420p`],
      ['-c:v', 'libx264'],
      ['-profile:v', 'high'],
      ['-crf', '23'],
      ['-preset', 'slow'],
      ['-movflags', '+faststart'],
      ['-y', mp4],
    ]),
  );
  await report(mp4);

  if (target.name === 'desktop') {
    const poster = join(outputDirectory, `hero-poster${paper.suffix}.webp`);
    await run(
      ffmpeg,
      flags([
        ['-v', 'error'],
        ['-i', master],
        ['-frames:v', '1'],
        ['-c:v', 'libwebp'],
        ['-lossless', '0'],
        ['-quality', '86'],
        ['-y', poster],
      ]),
    );
    await report(poster);
  }
}

if (!keepWork) await rm(workDirectory, { recursive: true, force: true });

process.stdout.write(`\nHero media prepared for the ${paperName} paper.\n`);
