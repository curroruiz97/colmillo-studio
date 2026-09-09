import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
import { Buffer } from 'node:buffer';
import { inflateSync } from 'node:zlib';

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const assets = [
  ['colmillo-wordmark-black.png', 906, 242],
  ['colmillo-wordmark-cream.png', 865, 232],
];

function paeth(left, above, upperLeft) {
  const prediction = left + above - upperLeft;
  const leftDistance = Math.abs(prediction - left);
  const aboveDistance = Math.abs(prediction - above);
  const upperLeftDistance = Math.abs(prediction - upperLeft);

  if (leftDistance <= aboveDistance && leftDistance <= upperLeftDistance) {
    return left;
  }
  return aboveDistance <= upperLeftDistance ? above : upperLeft;
}

function inspectPng(fileName, expectedWidth, expectedHeight) {
  const path = join(process.cwd(), 'public', 'assets', 'brand', fileName);
  const png = readFileSync(path);
  if (!png.subarray(0, 8).equals(signature)) {
    throw new Error(`${fileName} is not a valid PNG.`);
  }

  let offset = 8;
  let header;
  const compressed = [];
  while (offset < png.length) {
    const length = png.readUInt32BE(offset);
    const type = png.toString('ascii', offset + 4, offset + 8);
    const data = png.subarray(offset + 8, offset + 8 + length);
    if (type === 'IHDR') {
      header = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        bitDepth: data[8],
        colorType: data[9],
        interlace: data[12],
      };
    }
    if (type === 'IDAT') compressed.push(data);
    offset += length + 12;
  }

  if (!header) throw new Error(`${fileName} has no IHDR chunk.`);
  if (header.width !== expectedWidth || header.height !== expectedHeight) {
    throw new Error(
      `${fileName} dimensions changed: ${header.width}x${header.height}.`,
    );
  }
  if (
    header.bitDepth !== 8 ||
    header.colorType !== 6 ||
    header.interlace !== 0
  ) {
    throw new Error(`${fileName} must be a non-interlaced 8-bit RGBA PNG.`);
  }

  const raw = inflateSync(Buffer.concat(compressed));
  const bytesPerPixel = 4;
  const rowLength = header.width * bytesPerPixel;
  const decoded = Buffer.alloc(rowLength * header.height);
  let rawOffset = 0;
  let minX = header.width;
  let minY = header.height;
  let maxX = -1;
  let maxY = -1;
  let transparentPixels = 0;
  let opaquePixels = 0;
  let edgePixels = 0;

  for (let y = 0; y < header.height; y += 1) {
    const filter = raw[rawOffset];
    rawOffset += 1;
    const rowOffset = y * rowLength;

    for (let x = 0; x < rowLength; x += 1) {
      const source = raw[rawOffset + x];
      const left = x >= bytesPerPixel ? decoded[rowOffset + x - 4] : 0;
      const above = y > 0 ? decoded[rowOffset - rowLength + x] : 0;
      const upperLeft =
        y > 0 && x >= bytesPerPixel
          ? decoded[rowOffset - rowLength + x - 4]
          : 0;
      const predictor =
        filter === 0
          ? 0
          : filter === 1
            ? left
            : filter === 2
              ? above
              : filter === 3
                ? Math.floor((left + above) / 2)
                : filter === 4
                  ? paeth(left, above, upperLeft)
                  : undefined;
      if (predictor === undefined) {
        throw new Error(`${fileName} uses unsupported PNG filter ${filter}.`);
      }
      decoded[rowOffset + x] = (source + predictor) & 255;
    }
    rawOffset += rowLength;

    for (let x = 0; x < header.width; x += 1) {
      const alpha = decoded[rowOffset + x * 4 + 3];
      if (alpha === 0) transparentPixels += 1;
      else {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
        if (alpha === 255) opaquePixels += 1;
        else edgePixels += 1;
      }
    }
  }

  const padding = [
    minX,
    minY,
    header.width - 1 - maxX,
    header.height - 1 - maxY,
  ];
  if (padding.some((value) => value !== 12)) {
    throw new Error(`${fileName} must retain an even 12px transparent margin.`);
  }
  if (transparentPixels === 0 || opaquePixels === 0 || edgePixels === 0) {
    throw new Error(
      `${fileName} must contain transparent, opaque and antialiased edge pixels ` +
        `(transparent=${transparentPixels}, opaque=${opaquePixels}, edge=${edgePixels}).`,
    );
  }

  process.stdout.write(
    `${fileName}: ${header.width}x${header.height}, RGBA, 12px transparent margin.\n`,
  );
}

for (const asset of assets) inspectPng(...asset);
