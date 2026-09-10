import { readFile } from 'node:fs/promises';
import process from 'node:process';

const hero = await readFile(
  'src/components/sections/HeroSection.astro',
  'utf8',
);
const motion = await readFile('src/scripts/motion/HeroMotion.ts', 'utf8');

const requiredHeroTokens = [
  'heroMedia.mobile.webm',
  'heroMedia.mobile.mp4',
  'heroMedia.desktop.webm',
  'heroMedia.desktop.mp4',
  'media="(max-width: 48rem)"',
  'media="(min-width: 48.01rem)"',
  'poster={heroMedia.poster}',
  'width={heroMedia.width}',
  'height={heroMedia.height}',
  'data-motion-video',
  'hero__poster',
];
const requiredMotionTokens = [
  'IntersectionObserver',
  'entry.target.play()',
  'entry.target.pause()',
  "dataset.motion === 'reduced'",
];

const missing = [
  ...requiredHeroTokens.filter((token) => !hero.includes(token)),
  ...requiredMotionTokens.filter((token) => !motion.includes(token)),
];

if (missing.length > 0) {
  throw new Error(
    `Responsive hero contract is incomplete:\n${missing.join('\n')}`,
  );
}

/*
 * The hero loop is delivered pre-composited for the cream surface: its sheet is
 * mapped to `--color-brand-cream` and then cut out. If the token moves and the
 * derivatives are not regenerated, the drawing's own paper stops matching the
 * page behind it, so the two values are checked against each other.
 */
const preparation = await readFile('scripts/prepare-hero-media.mjs', 'utf8');
const tokens = await readFile('src/styles/tokens.css', 'utf8');

const bakedCream = preparation
  .match(/const CREAM = \[([^\]]+)\]/)?.[1]
  ?.split(',')
  .map((part) => Number(part.trim()));
const brandCream = tokens
  .match(/--color-brand-cream:\s*#([0-9a-f]{6})/i)?.[1]
  ?.match(/../g)
  ?.map((pair) => Number.parseInt(pair, 16));

if (!bakedCream || bakedCream.length !== 3 || !brandCream) {
  throw new Error(
    'Could not read the baked hero cream or --color-brand-cream to compare them.',
  );
}
if (bakedCream.some((channel, index) => channel !== brandCream[index])) {
  throw new Error(
    `Hero media is baked for rgb(${bakedCream.join(', ')}) but --color-brand-cream is rgb(${brandCream.join(', ')}). Regenerate with "node scripts/prepare-hero-media.mjs".`,
  );
}

process.stdout.write(
  'Responsive hero contract passed: desktop/mobile WebM+MP4, poster, dimensions, viewport pause, reduced-motion fallback and the baked cream match the brand token.\n',
);
