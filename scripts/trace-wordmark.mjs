/**
 * Extracts the eight COLMILLO letters of the supplied wordmark as vector paths
 * for the home entry intro, and proves the result against the raster.
 *
 * There is no vector master of the logo yet (see docs/CONTENT_NEEDED.md), and
 * the intro scales the final O far past the resolution of any PNG. This is not
 * a redrawing: every contour is the 50% iso-line of the official file's own
 * alpha channel, located to a fraction of a pixel by interpolating between
 * pixel centres (marching squares). The iso-line is then carried by smooth
 * cubic curves through a dense subset of its own points.
 *
 * The script refuses to write anything unless the curves stay within
 * MAX_DEVIATION source pixels of the iso-line and the re-rasterised letters
 * match the original alpha within MAX_MEAN_ERROR. It prints both measurements,
 * so the fidelity claim is reproducible rather than asserted.
 *
 *   node scripts/trace-wordmark.mjs
 *
 * Source: public/assets/brand/colmillo-wordmark-black.png (validated by
 * `check:brand`). Output: src/components/intro/wordmarkGlyphs.ts (generated).
 */
import { Buffer } from 'node:buffer';
import console from 'node:console';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import process from 'node:process';
import { fileURLToPath, URL } from 'node:url';
import { inflateSync } from 'node:zlib';
import { format, resolveConfig } from 'prettier';

const SOURCE = fileURLToPath(
  new URL(
    '../public/assets/brand/colmillo-wordmark-black.png',
    import.meta.url,
  ),
);
const OUTPUT = fileURLToPath(
  new URL('../src/components/intro/wordmarkGlyphs.ts', import.meta.url),
);
const LETTERS = ['c', 'o', 'l', 'm', 'i', 'l', 'l', 'o'];
/** Douglas-Peucker tolerance for the points the curves pass through. */
const SIMPLIFY = 0.18;
/** Longest chord left between two curve points, so no span is under-described. */
const MAX_SPAN = 7;
/** Acceptance: largest distance between curve and iso-line, in source px. */
const MAX_DEVIATION = 0.45;
/**
 * Acceptance: mean |alpha - coverage| over each letter's antialiased edge band.
 * A geometrically exact curve still scores about 0.05 here, because the box
 * filter used to re-rasterise it is not the filter that antialiased the PNG.
 */
const MAX_MEAN_ERROR = 0.08;
/** Acceptance: no single pixel may swap from inside to outside the letter. */
const MAX_PIXEL_ERROR = 0.5;

/* ------------------------------------------------------------ decoding -- */

function decodeAlpha(path) {
  const png = readFileSync(path);
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  if (png[24] !== 8 || png[25] !== 6) throw new Error('expected 8-bit RGBA');
  const compressed = [];
  for (let offset = 8; offset < png.length;) {
    const length = png.readUInt32BE(offset);
    const type = png.toString('ascii', offset + 4, offset + 8);
    if (type === 'IDAT')
      compressed.push(png.subarray(offset + 8, offset + 8 + length));
    if (type === 'IEND') break;
    offset += 12 + length;
  }
  const raw = inflateSync(Buffer.concat(compressed));
  const stride = width * 4;
  const pixels = Buffer.alloc(height * stride);
  let cursor = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = raw[cursor];
    cursor += 1;
    for (let x = 0; x < stride; x += 1) {
      const a = x >= 4 ? pixels[y * stride + x - 4] : 0;
      const b = y ? pixels[(y - 1) * stride + x] : 0;
      const c = x >= 4 && y ? pixels[(y - 1) * stride + x - 4] : 0;
      const v = raw[cursor + x];
      let predictor = 0;
      if (filter === 1) predictor = a;
      else if (filter === 2) predictor = b;
      else if (filter === 3) predictor = (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        predictor = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      pixels[y * stride + x] = (v + predictor) & 255;
    }
    cursor += stride;
  }
  const alpha = new Float64Array(width * height);
  for (let i = 0; i < width * height; i += 1)
    alpha[i] = pixels[i * 4 + 3] / 255;
  return { width, height, alpha };
}

/* ---------------------------------------------------------- components -- */

/** 8-connected components of the half-covered pixels, largest letters only. */
function letterComponents({ width, height, alpha }) {
  const label = new Int32Array(width * height).fill(-1);
  const components = [];
  for (let start = 0; start < width * height; start += 1) {
    if (alpha[start] < 0.5 || label[start] !== -1) continue;
    const id = components.length;
    const box = { minX: width, minY: height, maxX: 0, maxY: 0, area: 0 };
    const stack = [start];
    label[start] = id;
    while (stack.length) {
      const index = stack.pop();
      const x = index % width;
      const y = (index - x) / width;
      box.minX = Math.min(box.minX, x);
      box.maxX = Math.max(box.maxX, x);
      box.minY = Math.min(box.minY, y);
      box.maxY = Math.max(box.maxY, y);
      box.area += 1;
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const next = ny * width + nx;
          if (alpha[next] >= 0.5 && label[next] === -1) {
            label[next] = id;
            stack.push(next);
          }
        }
      }
    }
    components.push(box);
  }
  // The COLMILLO capitals are all far taller than any `studio` glyph.
  const tallest = Math.max(...components.map((box) => box.maxY - box.minY));
  components.forEach((box, id) => {
    box.letter = box.maxY - box.minY > tallest * 0.6;
    box.id = id;
  });
  const letters = components
    .filter((box) => box.letter)
    .sort((a, b) => a.minX - b.minX);
  if (letters.length !== LETTERS.length) {
    throw new Error(
      `expected ${LETTERS.length} capitals, found ${letters.length}`,
    );
  }
  // Pixels of the `studio` line (plus a 2 px halo) are not part of the trace.
  const foreign = new Uint8Array(width * height);
  for (let index = 0; index < width * height; index += 1) {
    if (label[index] === -1 || components[label[index]].letter) continue;
    const x = index % width;
    const y = (index - x) / width;
    for (let dy = -2; dy <= 2; dy += 1) {
      for (let dx = -2; dx <= 2; dx += 1) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < width && ny < height)
          foreign[ny * width + nx] = 1;
      }
    }
  }
  return { letters, foreign };
}

/* ------------------------------------------------------ marching squares -- */

/**
 * Closed 50% iso-lines of the alpha field, in image coordinates where pixel
 * (x, y) is centred on (x + 0.5, y + 0.5). The field is padded with a
 * transparent border so every contour closes.
 */
function isoContours({ width, height, alpha }) {
  const W = width + 2;
  const H = height + 2;
  const value = (i, j) =>
    i < 1 || j < 1 || i > width || j > height
      ? 0
      : alpha[(j - 1) * width + (i - 1)];
  const points = new Map();
  const neighbours = new Map();
  const point = (key) => {
    if (points.has(key)) return;
    const [kind, si, sj] = key.split(':');
    const i = Number(si);
    const j = Number(sj);
    const a = value(i, j);
    const b = kind === 'h' ? value(i + 1, j) : value(i, j + 1);
    const t = (0.5 - a) / (b - a);
    points.set(
      key,
      kind === 'h' ? [i - 0.5 + t, j - 0.5] : [i - 0.5, j - 0.5 + t],
    );
  };
  const link = (a, b) => {
    point(a);
    point(b);
    if (!neighbours.has(a)) neighbours.set(a, []);
    if (!neighbours.has(b)) neighbours.set(b, []);
    neighbours.get(a).push(b);
    neighbours.get(b).push(a);
  };
  for (let j = 0; j < H - 1; j += 1) {
    for (let i = 0; i < W - 1; i += 1) {
      const tl = value(i, j);
      const tr = value(i + 1, j);
      const br = value(i + 1, j + 1);
      const bl = value(i, j + 1);
      const inTL = tl >= 0.5;
      const inTR = tr >= 0.5;
      const inBR = br >= 0.5;
      const inBL = bl >= 0.5;
      const top = `h:${i}:${j}`;
      const bottom = `h:${i}:${j + 1}`;
      const left = `v:${i}:${j}`;
      const right = `v:${i + 1}:${j}`;
      const crossed = [];
      if (inTL !== inTR) crossed.push(top);
      if (inTR !== inBR) crossed.push(right);
      if (inBR !== inBL) crossed.push(bottom);
      if (inBL !== inTL) crossed.push(left);
      if (crossed.length === 2) link(crossed[0], crossed[1]);
      else if (crossed.length === 4) {
        const centreIn = (tl + tr + br + bl) / 4 >= 0.5;
        // Saddle: join the inside corners through the centre when it is inside.
        const cutTLandBR = inTL ? !centreIn : centreIn;
        if (cutTLandBR) {
          link(left, top);
          link(right, bottom);
        } else {
          link(top, right);
          link(bottom, left);
        }
      }
    }
  }
  const visited = new Set();
  const loops = [];
  for (const start of neighbours.keys()) {
    if (visited.has(start)) continue;
    const loop = [];
    let previous = null;
    let current = start;
    while (!visited.has(current)) {
      visited.add(current);
      loop.push(points.get(current));
      const next = neighbours
        .get(current)
        .find((key) => key !== previous && !visited.has(key));
      previous = current;
      if (!next) break;
      current = next;
    }
    if (loop.length > 8) loops.push(loop);
  }
  return loops;
}

/* -------------------------------------------------------------- curves -- */

const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

function segmentDistance(p, a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const length = dx * dx + dy * dy;
  const t = length
    ? Math.max(
        0,
        Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / length),
      )
    : 0;
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

function douglasPeucker(points, tolerance) {
  if (points.length < 3) return points;
  let worst = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i += 1) {
    const d = segmentDistance(points[i], points[0], points.at(-1));
    if (d > worst) {
      worst = d;
      index = i;
    }
  }
  if (worst <= tolerance) return [points[0], points.at(-1)];
  const head = douglasPeucker(points.slice(0, index + 1), tolerance);
  const tail = douglasPeucker(points.slice(index), tolerance);
  return [...head.slice(0, -1), ...tail];
}

/** Keeps a closed loop's shape-defining points, then caps every span. */
function curvePoints(loop) {
  let far = 0;
  for (let i = 1; i < loop.length; i += 1) {
    if (distance(loop[i], loop[0]) > distance(loop[far], loop[0])) far = i;
  }
  const a = douglasPeucker(loop.slice(0, far + 1), SIMPLIFY);
  const b = douglasPeucker([...loop.slice(far), loop[0]], SIMPLIFY);
  const kept = [...a.slice(0, -1), ...b.slice(0, -1)];
  const dense = [];
  for (let i = 0; i < kept.length; i += 1) {
    const p = kept[i];
    const q = kept[(i + 1) % kept.length];
    const pieces = Math.ceil(distance(p, q) / MAX_SPAN);
    for (let k = 0; k < pieces; k += 1) {
      dense.push([
        p[0] + ((q[0] - p[0]) * k) / pieces,
        p[1] + ((q[1] - p[1]) * k) / pieces,
      ]);
    }
  }
  return dense;
}

/** Centripetal Catmull-Rom through a closed point list, as cubic Béziers. */
function toBeziers(points) {
  const n = points.length;
  const segments = [];
  for (let i = 0; i < n; i += 1) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const d1 = Math.max(1e-6, Math.sqrt(distance(p0, p1)));
    const d2 = Math.max(1e-6, Math.sqrt(distance(p1, p2)));
    const d3 = Math.max(1e-6, Math.sqrt(distance(p2, p3)));
    const c1 = [0, 1].map(
      (k) =>
        (d1 * d1 * p2[k] -
          d2 * d2 * p0[k] +
          (2 * d1 * d1 + 3 * d1 * d2 + d2 * d2) * p1[k]) /
        (3 * d1 * (d1 + d2)),
    );
    const c2 = [0, 1].map(
      (k) =>
        (d3 * d3 * p1[k] -
          d2 * d2 * p3[k] +
          (2 * d3 * d3 + 3 * d3 * d2 + d2 * d2) * p2[k]) /
        (3 * d3 * (d3 + d2)),
    );
    segments.push([p1, c1, c2, p2]);
  }
  return segments;
}

function flatten(segments, steps = 12) {
  const out = [];
  for (const [p0, c1, c2, p3] of segments) {
    for (let s = 0; s < steps; s += 1) {
      const t = s / steps;
      const u = 1 - t;
      out.push([
        u * u * u * p0[0] +
          3 * u * u * t * c1[0] +
          3 * u * t * t * c2[0] +
          t * t * t * p3[0],
        u * u * u * p0[1] +
          3 * u * u * t * c1[1] +
          3 * u * t * t * c2[1] +
          t * t * t * p3[1],
      ]);
    }
  }
  return out;
}

/** Largest distance from any point of `from` to the closed polyline `to`. */
function deviation(from, to) {
  let worst = 0;
  for (const p of from) {
    let best = Infinity;
    for (let i = 0; i < to.length; i += 1) {
      best = Math.min(best, segmentDistance(p, to[i], to[(i + 1) % to.length]));
    }
    worst = Math.max(worst, best);
  }
  return worst;
}

function signedArea(polygon) {
  let area = 0;
  for (let i = 0; i < polygon.length; i += 1) {
    const [x1, y1] = polygon[i];
    const [x2, y2] = polygon[(i + 1) % polygon.length];
    area += x1 * y2 - x2 * y1;
  }
  return area / 2;
}

function centroid(polygon) {
  let cx = 0;
  let cy = 0;
  let area = 0;
  for (let i = 0; i < polygon.length; i += 1) {
    const [x1, y1] = polygon[i];
    const [x2, y2] = polygon[(i + 1) % polygon.length];
    const cross = x1 * y2 - x2 * y1;
    area += cross;
    cx += (x1 + x2) * cross;
    cy += (y1 + y2) * cross;
  }
  return [cx / (3 * area), cy / (3 * area)];
}

/* --------------------------------------------------------- verification -- */

/** Even-odd coverage of polygons on the pixel grid, 4x4 supersampled. */
function rasterise(polygons, width, height) {
  const coverage = new Float64Array(width * height);
  const samples = 4;
  const edges = polygons.flatMap((polygon) =>
    polygon.map((p, i) => [p, polygon[(i + 1) % polygon.length]]),
  );
  for (let y = 0; y < height; y += 1) {
    for (let sy = 0; sy < samples; sy += 1) {
      const py = y + (sy + 0.5) / samples;
      const crossings = [];
      for (const [a, b] of edges) {
        if (a[1] <= py === b[1] <= py) continue;
        crossings.push(a[0] + ((py - a[1]) * (b[0] - a[0])) / (b[1] - a[1]));
      }
      crossings.sort((m, n) => m - n);
      for (let k = 0; k + 1 < crossings.length; k += 2) {
        for (
          let x = Math.max(0, Math.floor(crossings[k]));
          x < Math.min(width, Math.ceil(crossings[k + 1]));
          x += 1
        ) {
          for (let sx = 0; sx < samples; sx += 1) {
            const px = x + (sx + 0.5) / samples;
            if (px >= crossings[k] && px < crossings[k + 1]) {
              coverage[y * width + x] += 1 / (samples * samples);
            }
          }
        }
      }
    }
  }
  return coverage;
}

/* ---------------------------------------------------------------- main -- */

const image = decodeAlpha(SOURCE);
const { letters: components, foreign } = letterComponents(image);
const loops = isoContours(image);

const glyphs = components.map((box, index) => {
  const own = loops.filter((loop) => {
    const xs = loop.map((p) => p[0]);
    const ys = loop.map((p) => p[1]);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    return (
      cx >= box.minX - 1 &&
      cx <= box.maxX + 2 &&
      cy >= box.minY - 1 &&
      cy <= box.maxY + 2
    );
  });
  own.sort((a, b) => Math.abs(signedArea(b)) - Math.abs(signedArea(a)));
  const traced = own.map((loop) => {
    const segments = toBeziers(curvePoints(loop));
    const curve = flatten(segments);
    return {
      loop,
      segments,
      curve,
      deviation: Math.max(deviation(curve, loop), deviation(loop, curve)),
    };
  });
  return { letter: LETTERS[index], box, traced };
});

// Everything is expressed relative to the tight box of the eight letters.
const allCurves = glyphs.flatMap((glyph) =>
  glyph.traced.flatMap((t) => t.curve),
);
const originX = Math.min(...allCurves.map((p) => p[0]));
const originY = Math.min(...allCurves.map((p) => p[1]));
const boxWidth = Math.max(...allCurves.map((p) => p[0])) - originX;
const boxHeight = Math.max(...allCurves.map((p) => p[1])) - originY;

// All eight letters are rasterised together, so a neighbour inside a letter's
// padded box is compared against its own curves rather than counted as error.
const coverage = rasterise(
  glyphs.flatMap((glyph) => glyph.traced.map((t) => t.curve)),
  image.width,
  image.height,
);
const report = [];
let failed = false;
for (const glyph of glyphs) {
  const { box } = glyph;
  const pad = 3;
  const x0 = Math.max(0, box.minX - pad);
  const y0 = Math.max(0, box.minY - pad);
  const w = Math.min(image.width, box.maxX + pad + 1) - x0;
  const h = Math.min(image.height, box.maxY + pad + 1) - y0;
  let band = 0;
  let error = 0;
  let worstPixel = 0;
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const index = (y + y0) * image.width + (x + x0);
      if (foreign[index]) continue;
      const a = image.alpha[index];
      const c = coverage[index];
      if (a > 0 || c > 0) {
        if (a < 1 || c < 1) {
          band += 1;
          error += Math.abs(a - c);
        }
        worstPixel = Math.max(worstPixel, Math.abs(a - c));
      }
    }
  }
  const meanError = band ? error / band : 0;
  const worstDeviation = Math.max(...glyph.traced.map((t) => t.deviation));
  const ok =
    worstDeviation <= MAX_DEVIATION &&
    meanError <= MAX_MEAN_ERROR &&
    worstPixel <= MAX_PIXEL_ERROR;
  failed ||= !ok;
  report.push({
    letter: glyph.letter,
    contours: glyph.traced.length,
    maxDeviationPx: Number(worstDeviation.toFixed(3)),
    meanEdgeErrorAlpha: Number(meanError.toFixed(4)),
    worstPixelAlpha: Number(worstPixel.toFixed(3)),
    ok,
  });
}
console.table(report);
if (failed) {
  console.error('Trace rejected: the curves drift from the official raster.');
  process.exitCode = 1;
} else {
  const fmt = (v) => Number(v.toFixed(2)).toString();
  const toPath = (segments) => {
    const [first] = segments[0];
    const move = `M${fmt(first[0] - originX)} ${fmt(first[1] - originY)}`;
    const body = segments
      .map(
        ([, c1, c2, p]) =>
          `C${[c1, c2, p].map(([x, y]) => `${fmt(x - originX)} ${fmt(y - originY)}`).join(' ')}`,
      )
      .join('');
    return `${move}${body}Z`;
  };
  const entries = glyphs.map((glyph) => {
    const [outer, ...holes] = glyph.traced;
    const xs = outer.curve.map((p) => p[0] - originX);
    const ys = outer.curve.map((p) => p[1] - originY);
    const entry = {
      letter: glyph.letter,
      d: glyph.traced.map((t) => toPath(t.segments)).join(''),
      box: [
        Math.min(...xs),
        Math.min(...ys),
        Math.max(...xs),
        Math.max(...ys),
      ].map((v) => Number(v.toFixed(2))),
    };
    if (holes.length === 1) {
      const counter = holes[0];
      entry.outer = toPath(outer.segments);
      entry.counter = toPath(counter.segments);
      entry.counterCentre = centroid(counter.curve).map((v, k) =>
        Number((v - (k ? originY : originX)).toFixed(2)),
      );
      // A light polygon of the counter for the runtime coverage maths.
      const coarse = douglasPeucker(
        [...counter.curve, counter.curve[0]],
        0.35,
      ).slice(0, -1);
      entry.counterPolygon = coarse
        .map(([x, y]) => `${fmt(x - originX)},${fmt(y - originY)}`)
        .join(' ');
    }
    return entry;
  });
  const source = `/**
 * GENERATED by scripts/trace-wordmark.mjs — do not edit by hand.
 *
 * The eight COLMILLO capitals of public/assets/brand/colmillo-wordmark-black.png
 * as the 50% iso-line of its alpha channel, in source pixels relative to the
 * letters' tight box. Worst curve deviation from the iso-line:
 * ${Math.max(...report.map((r) => r.maxDeviationPx))} px; worst mean edge error: ${Math.max(
   ...report.map((r) => r.meanEdgeErrorAlpha),
 )} alpha. This is a derivative of the raster, not the missing vector master.
 */
export interface WordmarkGlyph {
  letter: string;
  /** Every contour of the letter; fill with \`evenodd\`. */
  d: string;
  /** Tight box of the outer contour: [minX, minY, maxX, maxY]. */
  box: readonly [number, number, number, number];
  /** Letters with a counter (the two Os) also expose it separately. */
  outer?: string;
  counter?: string;
  counterCentre?: readonly [number, number];
  counterPolygon?: string;
}

export const wordmarkBox = { width: ${fmt(boxWidth)}, height: ${fmt(boxHeight)} } as const;

export const wordmarkGlyphs: readonly WordmarkGlyph[] = ${JSON.stringify(entries, null, 2)};
`;
  // Written already formatted, so regenerating never leaves a format diff.
  const formatted = await format(source, {
    ...(await resolveConfig(OUTPUT)),
    filepath: OUTPUT,
  });
  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, formatted);
  console.log(`Wrote ${OUTPUT} (${Buffer.byteLength(formatted)} bytes).`);
}
