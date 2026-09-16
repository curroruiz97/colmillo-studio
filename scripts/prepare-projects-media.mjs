/**
 * COLMILLO STUDIO - /proyectos/ MEDIA PREPARATION
 *
 * Derives the archive's closing scene from the supplied master,
 * `public/assets/projects/bg cta proyectos.png`, which is never modified.
 *
 * Measured with sharp: 2172x724 (exactly 3:1), sRGB, three channels, no alpha.
 *
 * One treatment, and only one: the master's paper is 254,253,251, a hair under
 * the page's own #ffffff, so a rectangle of it laid on the route's white sheet
 * shows its own edges — which is exactly what the close does with it. Every
 * channel is scaled by 255/251 (`linear`), the same kind of white-point lift
 * the hero master was given when its first seconds sat on #fbfbfb: the paper
 * clamps to pure white and the drawing is left where it is (the deepest ink
 * moves by a level and the orange by two, far under a visible step). With that
 * the picture dissolves into the sheet on every side, so the close can draw it
 * at whatever size the composition wants without a seam anywhere.
 *
 * Nothing is cropped, scaled or reframed: the CSS decides how much of each end
 * a screen shows. Quality 90 with smart subsampling, the setting the
 * `/servicios/` close already uses.
 *
 * The script also prints what the close's geometry is built on — the paper
 * after the lift and how far the ink reaches in from each end — so the numbers
 * in `projects-page.css` and `src/config/assets.ts` can be re-derived rather
 * than trusted. Uses `sharp`, which the repository already installs through
 * Astro's image service (it is not a direct dependency).
 * Run: `npm.cmd run media:projects`.
 */
import console from 'node:console';
import { mkdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const SOURCE = resolve('public/assets/projects/bg cta proyectos.png');
const OUT_DIR = resolve('public/assets/projects');
const OUT = resolve(OUT_DIR, 'proyectos-cta.webp');
const EXPECTED = { width: 2172, height: 724 };
/** The master's paper, measured; the lift that takes it to pure white. */
const PAPER_FLOOR = 251;
const LIFT = 255 / PAPER_FLOOR;

const meta = await sharp(SOURCE).metadata();
if (meta.width !== EXPECTED.width || meta.height !== EXPECTED.height) {
  console.error(
    `Expected a ${EXPECTED.width}x${EXPECTED.height} master, found ${meta.width}x${meta.height}. Update EXPECTED, the measured fractions in projects-page.css and projectsCloseScene together.`,
  );
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });
const lifted = sharp(SOURCE).linear(LIFT, 0);
await lifted
  .clone()
  .webp({ quality: 90, effort: 6, smartSubsample: true })
  .toFile(OUT);

/* ---- what the close's geometry is built on, measured on the derivative ---- */

const { data, info } = await sharp(OUT)
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;
const pixel = (x, y) => {
  const i = (y * W + x) * C;
  return [data[i], data[i + 1], data[i + 2]];
};
const isInk = (x, y) => 255 - Math.min(...pixel(x, y)) > 12;

/** Where the ink ends on the left and begins again on the right. */
function extents(y0, y1) {
  let left = -1;
  let right = W;
  const rows = y1 - y0;
  for (let x = 0; x < Math.floor(W / 2); x++) {
    let ink = 0;
    for (let y = y0; y < y1; y++) if (isInk(x, y)) ink++;
    if (ink > rows * 0.01) left = x;
  }
  for (let x = W - 1; x >= Math.floor(W / 2); x--) {
    let ink = 0;
    for (let y = y0; y < y1; y++) if (isInk(x, y)) ink++;
    if (ink > rows * 0.01) right = x;
  }
  return { left, right };
}

const full = extents(0, H);
const middle = extents(Math.round(H * 0.25), Math.round(H * 0.75));
const { size } = await stat(OUT);

console.log(`Wrote ${OUT} (${W}x${H}, ${size} bytes).`);
console.log(
  `  paper now        ${pixel(Math.round(W / 2), Math.round(H / 2)).join(',')} (was 254,253,251)`,
);
console.log(
  `  ink, full height ends ${(((full.left + 1) / W) * 100).toFixed(1)}% from the left, starts ${((full.right / W) * 100).toFixed(1)}% from the left`,
);
console.log(
  `  ink, middle half ends ${(((middle.left + 1) / W) * 100).toFixed(1)}%, starts ${((middle.right / W) * 100).toFixed(1)}%`,
);
