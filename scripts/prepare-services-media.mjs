/**
 * Prepares the per-service illustrations for the home services sequence.
 *
 * The client supplied one illustration per service (Identidad, Digital,
 * Contenido; Estrategia keeps `servicios-trimmed.png`) as 1600x900 RGBA PNGs
 * of 716-827 KB whose drawing fills only part of the canvas. For each one this:
 *
 * - crops the fully transparent margin, measured on the alpha channel itself
 *   (a colour-based trim would treat the opaque near-black clothing as
 *   background), so every illustration fills its frame the way the shared
 *   one does;
 * - scales it to at most 1200px wide, which covers the largest drawn size
 *   (36rem) on a 2x screen;
 * - writes a WebP with its alpha channel intact to `public/assets/services/`.
 *
 * Nothing else is touched: no colour change, no matte, no background. The
 * sources are read from `media-src/` if they have been moved there, otherwise
 * from `public/assets/`, and are never modified. Re-running it on the same
 * sources and sharp version produces the same files.
 *
 *   npm run media:services
 */
import console from 'node:console';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const outDir = join(root, 'public/assets/services');
const sourceDirs = ['media-src', 'public/assets'];
const MAX_WIDTH = 1200;

const services = [
  { id: 'identidad', file: 'servicio identidad.png' },
  { id: 'digital', file: 'servicio digital.png' },
  { id: 'contenido', file: 'servicio contenido.png' },
];

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

mkdirSync(outDir, { recursive: true });

for (const service of services) {
  const source = sourceDirs
    .map((directory) => join(root, directory, service.file))
    .find((path) => existsSync(path));
  if (!source) {
    console.error(`Missing source for ${service.id}: ${service.file}`);
    process.exitCode = 1;
    continue;
  }

  const box = await opaqueBox(source);
  const destination = join(outDir, `servicio-${service.id}.webp`);
  const output = await sharp(source)
    .extract(box)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 86, alphaQuality: 100, effort: 6, smartSubsample: true })
    .toFile(destination);

  console.log(
    JSON.stringify({
      id: service.id,
      box: [box.left, box.top, box.width, box.height],
      to: `${output.width}x${output.height}`,
      bytesIn: statSync(source).size,
      bytesOut: statSync(destination).size,
    }),
  );
}
