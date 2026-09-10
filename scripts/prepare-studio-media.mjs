/**
 * COLMILLO STUDIO - STUDIO LOOP PREPARATION
 *
 * Derives the home Studio loop from the supplied client master. The master
 * (`public/assets/video estudio.mp4`) is never modified.
 *
 * Measured with ffprobe and by sampling every frame: H.264 High, 1280x720,
 * 24 fps, exactly 6 s (144 frames), plus a stereo AAC track the site never
 * plays. The drawing sits on a flat paper whose mode is RGB(250, 236, 216)
 * (BT.709), with +-2 levels of noise - within three levels of
 * `--color-brand-cream`, but on a flat section three levels still read as a
 * faint rectangle. Four steps follow from that:
 *
 * 1. CROP. Measured on raw luma across all 144 frames, the ink never leaves
 *    rows 169-583 or columns 107-1225. The frame is cut to 1280x512 from row
 *    120, which keeps about 48 px of paper above and below the drawing for the
 *    page's edge feather. Only blank paper is removed; the full width stays
 *    because the figures drift across almost all of it.
 *
 * 2. COLOUR. The paper is moved onto the page colour chosen with `--paper=`.
 *    No keying: an MP4 has no alpha, and the paper becoming the page is what
 *    integrates it.
 *
 *    - `white` (default): `--color-white`, the light surface since 2026-09-10.
 *      Writes `studio-*-white.*`, the files the site publishes. The master's
 *      paper is beige, so a per-channel gain onto white would push the ink
 *      and the orange by up to 18% in blue. Every pixel is instead unmixed: it
 *      is modelled as paper, black ink and orange ink (all three measured)
 *      laid over one another, the paper's share is recovered by projecting the
 *      pixel onto that triangle, and only that share is lifted to white. Solid
 *      ink and solid orange keep their exact values; paper, including paper
 *      showing through the drawing (the sneakers, the highlights on the band),
 *      becomes white; antialiased edges blend ink into white exactly as they
 *      blended it into beige. The grain disappears with the paper.
 *    - `cream`: `--color-brand-cream`, the original surface. Each channel is
 *      mapped `min(cream, value * cream / floor)`, with `floor` the measured
 *      noise floor of the paper, which moves the ink and the orange by at most
 *      2%. Writes the original unsuffixed `studio-*.*` set, byte-identical to
 *      the first delivery.
 *
 * 3. LOOP. The clip does not close: the last frame and the first differ as
 *    much as frames three seconds apart (SSIM 0.77 against 0.997 between
 *    neighbours), and no internal frame comes close to the first. The first
 *    DIP_FRAMES therefore rise out of the paper and the last DIP_FRAMES sink
 *    back into it, so the file's wrap joins paper to paper and the jump becomes
 *    a third of a second's breath at the end of each pass. Every frame is kept,
 *    in its original order. The poster is frame DIP_FRAMES, the first complete
 *    picture, and `StudioMotion.ts` starts the first pass there (see
 *    `studioMedia.posterTime`), so the still and the first played frame match.
 *
 * 4. AUDIO. Dropped. The section never plays sound.
 *
 * Requires ffmpeg on PATH, or FFMPEG_PATH pointing at its bin folder.
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
const source = process.env.STUDIO_SOURCE
  ? resolve(root, process.env.STUDIO_SOURCE)
  : join(root, 'public', 'assets', 'video estudio.mp4');
const outputDirectory = join(root, 'public', 'assets', 'motion', 'studio');

const bin = process.env.FFMPEG_PATH ?? '';
const ffmpeg = bin ? join(bin, 'ffmpeg') : 'ffmpeg';

/** Blank paper above and below the drawing, removed. */
const CROP = { width: 1280, height: 512, x: 0, y: 120 };
/** Lowest paper value per channel across the clip (BT.709). */
const PAPER_FLOOR = [247, 234, 215];
/** Modal paper colour of the clip (BT.709, full range). */
const PAPER_MODE = [250, 236, 216];
/** Modal black ink and modal orange ink of the clip (BT.709, full range). */
const INK = [18, 18, 18];
const ORANGE = [226, 119, 62];
/** Must stay identical to `--color-brand-cream` in `src/styles/tokens.css`. */
const CREAM = [0xfc, 0xee, 0xda];
/** Must stay identical to `--color-white` in `src/styles/tokens.css`. */
const WHITE = [0xff, 0xff, 0xff];
/** Frame count and rate of the master. */
const FRAMES = 144;
const FPS = 24;
/**
 * Length of the rise at the start and the sink at the end. Also the poster
 * frame; `studioMedia.posterTime` in `src/config/assets.ts` must equal
 * DIP_FRAMES / 24.
 */
const DIP_FRAMES = 8;

/** Page colours the paper can be moved onto, and their file suffixes. */
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

const paperHex = `0x${paper.rgb
  .map((channel) => channel.toString(16).padStart(2, '0'))
  .join('')}`;
const fades =
  `fade=t=in:start_frame=0:nb_frames=${DIP_FRAMES}:color=${paperHex},` +
  `fade=t=out:start_frame=${FRAMES - DIP_FRAMES}:nb_frames=${DIP_FRAMES}:color=${paperHex}`;
const cropToRgb =
  `crop=${CROP.width}:${CROP.height}:${CROP.x}:${CROP.y},` +
  'scale=in_color_matrix=bt709:in_range=tv,format=rgb24';

const lut = ['r', 'g', 'b']
  .map(
    (channel, index) =>
      `${channel}='min(${CREAM[index]},val*${CREAM[index]}/${PAPER_FLOOR[index]})'`,
  )
  .join(':');

/**
 * The shared picture: cropped, normalised, rising from and sinking to paper.
 * The cream graph reads the master directly; the white graph reads the
 * lossless unmixed intermediate, which is already cropped.
 */
const picture =
  paperName === 'cream'
    ? `[0:v]${cropToRgb},lutrgb=${lut},${fades}[rgb]`
    : `[0:v]format=rgb24,${fades}[rgb]`;

const toVideo = `${picture};[rgb]scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[out]`;
const colourTags = [
  '-colorspace',
  'bt709',
  '-color_primaries',
  'bt709',
  '-color_trc',
  'bt709',
  '-color_range',
  'tv',
];

const outputs = [
  {
    file: `studio-loop${paper.suffix}.webm`,
    graph: toVideo,
    args: [
      '-c:v',
      'libvpx-vp9',
      '-b:v',
      '0',
      '-crf',
      '34',
      '-deadline',
      'good',
      '-cpu-used',
      '1',
      '-row-mt',
      '1',
      '-g',
      '48',
      ...colourTags,
    ],
  },
  {
    file: `studio-loop${paper.suffix}.mp4`,
    graph: toVideo,
    args: [
      '-c:v',
      'libx264',
      '-preset',
      'veryslow',
      '-tune',
      'animation',
      '-crf',
      '23',
      '-profile:v',
      'high',
      '-g',
      '48',
      '-movflags',
      '+faststart',
      ...colourTags,
    ],
  },
  {
    // The first complete picture, where the first pass starts. Lossless keeps
    // the paper exactly on the page colour.
    file: `studio-poster${paper.suffix}.webp`,
    graph: `${picture};[rgb]trim=start_frame=${DIP_FRAMES}:end_frame=${DIP_FRAMES + 1},setpts=PTS-STARTPTS[out]`,
    args: ['-frames:v', '1', '-c:v', 'libwebp', '-lossless', '1'],
  },
];

function run(command, args) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('close', (code) =>
      code === 0
        ? resolvePromise()
        : reject(new Error(`${command} exited with code ${code}`)),
    );
  });
}

/**
 * Returns a function that lifts the paper's share of one RGB frame to the
 * paper target and leaves the ink's share untouched.
 *
 * With P the paper, K the black ink and O the orange, a pixel is written as
 * `P + u (K - P) + v (O - P)`. Inside the triangle `1 - u - v` is the paper's
 * share; outside it the nearest edge is used instead (paper-ink, paper-orange,
 * or ink-orange, which holds no paper at all). The lift is measured from the
 * paper's noise floor, so every paper pixel saturates on the target exactly.
 */
function createUnmixer(pixels) {
  const lift = paper.rgb.map((channel, index) => channel - PAPER_FLOOR[index]);
  const sub = (a, b) => a.map((value, index) => value - b[index]);
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const e1 = sub(INK, PAPER_MODE);
  const e2 = sub(ORANGE, PAPER_MODE);
  const e3 = sub(ORANGE, INK);
  const a11 = dot(e1, e1);
  const a12 = dot(e1, e2);
  const a22 = dot(e2, e2);
  const det = a11 * a22 - a12 * a12;
  const a33 = dot(e3, e3);

  /** Squared distance from q to base + t * edge, t clamped to [0, 1]. */
  function edge(qx, qy, qz, edgeVector, length) {
    let t =
      (qx * edgeVector[0] + qy * edgeVector[1] + qz * edgeVector[2]) / length;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    const dx = qx - t * edgeVector[0];
    const dy = qy - t * edgeVector[1];
    const dz = qz - t * edgeVector[2];
    return [dx * dx + dy * dy + dz * dz, t];
  }

  return function unmix(frame) {
    // A fresh buffer per frame: the encoder stream may still hold a reference
    // to the previous one while it drains.
    const output = Buffer.allocUnsafe(pixels * 3);
    for (let o = 0; o < pixels * 3; o += 3) {
      const r = frame[o];
      const g = frame[o + 1];
      const b = frame[o + 2];
      const qx = r - PAPER_MODE[0];
      const qy = g - PAPER_MODE[1];
      const qz = b - PAPER_MODE[2];
      const b1 = qx * e1[0] + qy * e1[1] + qz * e1[2];
      const b2 = qx * e2[0] + qy * e2[1] + qz * e2[2];
      const u = (b1 * a22 - b2 * a12) / det;
      const v = (b2 * a11 - b1 * a12) / det;

      let share;
      if (u >= 0 && v >= 0 && u + v <= 1) {
        share = 1 - u - v;
      } else {
        const [toInk, tInk] = edge(qx, qy, qz, e1, a11);
        const [toOrange, tOrange] = edge(qx, qy, qz, e2, a22);
        const [between] = edge(r - INK[0], g - INK[1], b - INK[2], e3, a33);
        if (between < toInk && between < toOrange) share = 0;
        else share = toInk <= toOrange ? 1 - tInk : 1 - tOrange;
      }

      output[o] = Math.min(255, Math.round(r + share * lift[0]));
      output[o + 1] = Math.min(255, Math.round(g + share * lift[1]));
      output[o + 2] = Math.min(255, Math.round(b + share * lift[2]));
    }
    return output;
  };
}

/** Streams the cropped master through the unmixer into a lossless master. */
async function buildUnmixedMaster(destination) {
  const { width, height } = CROP;
  const decoder = spawn(
    ffmpeg,
    [
      '-v',
      'error',
      '-i',
      source,
      '-an',
      '-vf',
      cropToRgb,
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
      'rgb24',
      '-s',
      `${width}x${height}`,
      '-r',
      String(FPS),
      '-i',
      '-',
      '-c:v',
      'ffv1',
      '-y',
      destination,
    ],
    { stdio: ['pipe', 'inherit', 'inherit'] },
  );

  const unmix = createUnmixer(width * height);
  const frameBytes = width * height * 3;
  let carry = Buffer.alloc(0);
  let frames = 0;

  await new Promise((resolvePromise, reject) => {
    decoder.stdout.on('data', (chunk) => {
      carry = carry.length ? Buffer.concat([carry, chunk]) : chunk;
      while (carry.length >= frameBytes) {
        const frame = carry.subarray(0, frameBytes);
        carry = carry.subarray(frameBytes);
        frames += 1;
        if (!encoder.stdin.write(unmix(frame))) {
          decoder.stdout.pause();
          encoder.stdin.once('drain', () => decoder.stdout.resume());
        }
      }
    });
    decoder.stdout.on('end', () => {
      encoder.stdin.end();
      resolvePromise();
    });
    decoder.on('error', reject);
    encoder.on('error', reject);
  });
  await new Promise((resolvePromise, reject) => {
    encoder.on('close', (code) =>
      code === 0 ? resolvePromise() : reject(new Error(`ffv1 exited ${code}`)),
    );
  });

  if (frames !== FRAMES) {
    throw new Error(`Expected ${FRAMES} frames, unmixed ${frames}.`);
  }
  process.stdout.write(
    `unmixed ${frames} frames onto the ${paperName} paper\n`,
  );
}

if (!existsSync(source)) {
  throw new Error(`Studio master not found: ${source}`);
}
await mkdir(outputDirectory, { recursive: true });

// Intermediates never live under `public/`: everything there is published.
const workDirectory =
  paperName === 'cream'
    ? null
    : await mkdtemp(join(tmpdir(), 'colmillo-studio-'));
const input = workDirectory ? join(workDirectory, 'unmixed.mkv') : source;
if (workDirectory) await buildUnmixedMaster(input);

for (const output of outputs) {
  const target = join(outputDirectory, output.file);
  if (resolve(target) === resolve(source)) {
    throw new Error('Refusing to overwrite the client master.');
  }
  await run(ffmpeg, [
    '-hide_banner',
    '-v',
    'error',
    '-y',
    '-i',
    input,
    '-filter_complex',
    output.graph,
    '-map',
    '[out]',
    '-an',
    '-map_metadata',
    '-1',
    ...output.args,
    target,
  ]);
  const { size } = await stat(target);
  process.stdout.write(
    `${output.file}: ${size.toLocaleString('en-US')} bytes\n`,
  );
}

if (workDirectory) await rm(workDirectory, { recursive: true, force: true });
