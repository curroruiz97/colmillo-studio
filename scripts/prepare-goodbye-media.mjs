/**
 * COLMILLO STUDIO - GOODBYE PANORAMA PREPARATION
 *
 * Derives the goodbye stage's still from the supplied master,
 * `public/assets/bg panoramica.png`, which is never modified.
 *
 * Measured with sharp: 2048x768 (8:3), sRGB, three channels, no alpha. The
 * background is near-black (RGB 1-4); everything brighter than luma 38 lies
 * between 30% and 74% of the width, and 66%-74% is bright only below 70% of
 * the height. `goodbye-section.css` places the copy from those fractions.
 *
 * One lossy WebP at the master's own size: it is never upscaled here, and the
 * panorama is never cropped, so the stage can pan across all of it.
 *
 * Uses `sharp`, which the repository already installs through Astro's image
 * service (it is not a direct dependency). Run: `node scripts/prepare-goodbye-media.mjs`.
 */
import console from 'node:console';
import { mkdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const SOURCE = resolve('public/assets/bg panoramica.png');
const OUT_DIR = resolve('public/assets/goodbye');
const OUT = resolve(OUT_DIR, 'goodbye-panorama.webp');
const EXPECTED = { width: 2048, height: 768 };

const meta = await sharp(SOURCE).metadata();
if (meta.width !== EXPECTED.width || meta.height !== EXPECTED.height) {
  console.error(
    `Expected a ${EXPECTED.width}x${EXPECTED.height} master, found ${meta.width}x${meta.height}. Update EXPECTED, the measured fractions in goodbye-section.css and goodbyeVisual together.`,
  );
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });
// High quality: the near-black vignette bands at lower settings.
await sharp(SOURCE)
  .webp({ quality: 92, effort: 6, smartSubsample: true })
  .toFile(OUT);

const { size } = await stat(OUT);
console.log(`Wrote ${OUT} (${meta.width}x${meta.height}, ${size} bytes).`);
