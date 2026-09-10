/**
 * Crops the fully transparent margin off an 8-bit RGBA PNG and writes the
 * result beside it, leaving the original untouched.
 *
 * Written for `public/assets/servicios.png`, whose drawn ink occupies only
 * 1202x696 of a 1536x1024 frame. The services layout sizes the art by its
 * column, so that padding was a fifth of the column doing nothing.
 *
 *   node scripts/trim-transparent-png.mjs <source.png> <destination.png>
 */
import { Buffer } from 'node:buffer';
import console from 'node:console';
import { readFileSync, writeFileSync } from 'node:fs';
import process from 'node:process';
import { deflateSync, inflateSync } from 'node:zlib';

const src = process.argv[2];
const dest = process.argv[3];
const b = readFileSync(src);
const w = b.readUInt32BE(16);
const h = b.readUInt32BE(20);
if (b[24] !== 8 || b[25] !== 6) throw new Error('expected 8-bit RGBA');

let off = 8;
const idat = [];
while (off < b.length) {
  const len = b.readUInt32BE(off);
  const type = b.toString('ascii', off + 4, off + 8);
  if (type === 'IDAT') idat.push(b.subarray(off + 8, off + 8 + len));
  if (type === 'IEND') break;
  off += 12 + len;
}
const raw = inflateSync(Buffer.concat(idat));
const bpp = 4;
const stride = w * bpp;
const px = Buffer.alloc(h * stride);
let p = 0;
for (let y = 0; y < h; y += 1) {
  const ft = raw[p];
  p += 1;
  const line = raw.subarray(p, p + stride);
  p += stride;
  const cur = px.subarray(y * stride, (y + 1) * stride);
  const prev = y
    ? px.subarray((y - 1) * stride, y * stride)
    : Buffer.alloc(stride);
  for (let x = 0; x < stride; x += 1) {
    const A = x >= bpp ? cur[x - bpp] : 0;
    const B = prev[x];
    const C = x >= bpp ? prev[x - bpp] : 0;
    const v = line[x];
    let val;
    if (ft === 0) val = v;
    else if (ft === 1) val = v + A;
    else if (ft === 2) val = v + B;
    else if (ft === 3) val = v + ((A + B) >> 1);
    else {
      const pp = A + B - C;
      const pa = Math.abs(pp - A),
        pb = Math.abs(pp - B),
        pc = Math.abs(pp - C);
      val = v + (pa <= pb && pa <= pc ? A : pb <= pc ? B : C);
    }
    cur[x] = val & 255;
  }
}

// Bounding box of anything not fully transparent.
let minX = w,
  minY = h,
  maxX = -1,
  maxY = -1;
for (let y = 0; y < h; y += 1) {
  for (let x = 0; x < w; x += 1) {
    if (px[y * stride + x * 4 + 3] !== 0) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
const nw = maxX - minX + 1;
const nh = maxY - minY + 1;

// Adaptive filtering: try all five per row, keep the one with the smallest sum
// of absolute differences. This is what a normal encoder does, and without it
// the re-encode came out larger than the untrimmed original.
const nstride = nw * bpp;
const rows = [];
const paeth = (a, b, c) => {
  const pp = a + b - c;
  const pa = Math.abs(pp - a),
    pb = Math.abs(pp - b),
    pc = Math.abs(pp - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
};
let prevRow = Buffer.alloc(nstride);
for (let y = 0; y < nh; y += 1) {
  const cur = px.subarray(
    (minY + y) * stride + minX * bpp,
    (minY + y) * stride + minX * bpp + nstride,
  );
  let best = null;
  for (let ft = 0; ft < 5; ft += 1) {
    const out = Buffer.alloc(nstride);
    let score = 0;
    for (let x = 0; x < nstride; x += 1) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prevRow[x];
      const c = x >= bpp ? prevRow[x - bpp] : 0;
      let v;
      if (ft === 0) v = cur[x];
      else if (ft === 1) v = cur[x] - a;
      else if (ft === 2) v = cur[x] - b;
      else if (ft === 3) v = cur[x] - ((a + b) >> 1);
      else v = cur[x] - paeth(a, b, c);
      out[x] = v & 255;
      score += out[x] < 128 ? out[x] : 256 - out[x];
    }
    if (!best || score < best.score) best = { ft, out, score };
  }
  rows.push(Buffer.concat([Buffer.from([best.ft]), best.out]));
  prevRow = Buffer.from(cur);
}
const outRaw = Buffer.concat(rows);

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc = (buf) => {
  let c = 0xffffffff;
  for (const byte of buf) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const cr = Buffer.alloc(4);
  cr.writeUInt32BE(crc(body));
  return Buffer.concat([len, body, cr]);
};
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(nw, 0);
ihdr.writeUInt32BE(nh, 4);
ihdr[8] = 8;
ihdr[9] = 6;
writeFileSync(
  dest,
  Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(outRaw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]),
);
console.log(
  JSON.stringify({
    from: `${w}x${h}`,
    box: [minX, minY, maxX, maxY],
    to: `${nw}x${nh}`,
    bytesIn: b.length,
    bytesOut: readFileSync(dest).length,
  }),
);
