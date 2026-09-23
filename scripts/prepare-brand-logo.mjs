/**
 * Prepares the orange Colmillo wordmark derivative from the client original.
 *
 * The original supplied on 2026-09-22 (`logo colmillo naranja.png`, 2170x725
 * RGBA, 495 KB) is the same lockup as the validated black and cream marks —
 * COLMILLO over `studio` — in the brand orange, with a wide transparent
 * margin around it. The home paints it about 144 CSS px wide, so the file as
 * delivered is roughly twenty times the pixels it can ever show and sits on
 * the intro's critical path: `HomeIntro.ts` waits for the wordmark to decode
 * before the O opens.
 *
 * This writes the published derivative under the same contract the other two
 * marks are held to by `scripts/check-brand-assets.mjs`:
 *
 * - the fully transparent margin is measured on the alpha channel and cropped;
 * - the mark is scaled to the black derivative's drawn width (882 px), so at
 *   one CSS width the two letterforms are the same size, stroke for stroke;
 * - an even 12 px transparent margin is added back;
 * - the result is a non-interlaced 8-bit RGBA PNG.
 *
 * No colour is touched: no matte, no background, no recolour. The original is
 * read from `media-src/` if it has been moved there, otherwise from
 * `public/assets/brand/`, and is never modified. Re-running it on the same
 * source and sharp version produces the same file.
 *
 *   npm run media:brand
 */
import console from 'node:console';
import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const SOURCE = 'logo colmillo naranja.png';
const sourceDirs = ['media-src', 'public/assets/brand'];
const destination = join(
  root,
  'public/assets/brand/colmillo-wordmark-orange.png',
);
/** Drawn width of `colmillo-wordmark-black.png`, margin excluded. */
const MARK_WIDTH = 882;
/** The transparent clear space every published mark carries. */
const MARGIN = 12;

/** Bounding box of every pixel that is not fully transparent. */
async function opaqueBox(source) {
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  let left = width;
  let top = height;
  let right = -1;
  let bottom = -1;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (data[(y * width + x) * channels + 3] !== 0) {
        if (x < left) left = x;
        if (x > right) right = x;
        if (y < top) top = y;
        if (y > bottom) bottom = y;
      }
    }
  }
  if (right < 0) throw new Error(`${source} is fully transparent`);
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

const source = sourceDirs
  .map((directory) => join(root, directory, SOURCE))
  .find((path) => existsSync(path));
if (!source) {
  console.error(`Missing source: ${SOURCE} in ${sourceDirs.join(' or ')}`);
  process.exit(1);
}

const box = await opaqueBox(source);

/*
 * Trimmed twice. The master carries a band of all but invisible pixels above
 * the mark (alpha 1-2), which is ink to the first trim and nothing at all once
 * the 2.4x downscale has averaged it away. Measuring the scaled mark again is
 * what makes the published clear space exactly the 12 px the other two marks
 * carry, instead of 12 px plus whatever that band rounded to.
 */
const scaled = await sharp(source)
  .extract(box)
  .resize({ width: MARK_WIDTH })
  .png()
  .toBuffer();
const drawn = await opaqueBox(scaled);

const output = await sharp(scaled)
  .extract(drawn)
  .extend({
    top: MARGIN,
    bottom: MARGIN,
    left: MARGIN,
    right: MARGIN,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9, palette: false, progressive: false })
  .toFile(destination);

console.log(
  JSON.stringify({
    source: source.slice(root.length),
    box: [box.left, box.top, box.width, box.height],
    drawn: [drawn.left, drawn.top, drawn.width, drawn.height],
    to: `${output.width}x${output.height}`,
    bytesIn: statSync(source).size,
    bytesOut: statSync(destination).size,
  }),
);
