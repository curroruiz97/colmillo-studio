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
 * The hero and Studio loops are delivered pre-composited for the page colour:
 * their paper is mapped onto a colour baked into the preparation script. Two
 * things must therefore hold, or the drawing's own paper stops matching the
 * page behind it and reads as a rectangle:
 *
 * 1. every baked paper colour equals the token it claims to be;
 * 2. the published files are the set baked for `--color-background`
 *    (`-white` files on white, the unsuffixed originals on cream).
 */
const tokens = await readFile('src/styles/tokens.css', 'utf8');
const assets = await readFile('src/config/assets.ts', 'utf8');

function tokenRgb(name) {
  return tokens
    .match(new RegExp(`--${name}:\\s*#([0-9a-f]{6})`, 'i'))?.[1]
    ?.match(/../g)
    ?.map((pair) => Number.parseInt(pair, 16));
}

const bakedConstants = [
  ['CREAM', 'color-brand-cream'],
  ['WHITE', 'color-white'],
];
for (const script of [
  'scripts/prepare-hero-media.mjs',
  'scripts/prepare-studio-media.mjs',
]) {
  const preparation = await readFile(script, 'utf8');
  for (const [constant, token] of bakedConstants) {
    const baked = preparation
      .match(new RegExp(`const ${constant} = \\[([^\\]]+)\\]`))?.[1]
      ?.split(',')
      .map((part) => Number(part.trim()));
    const value = tokenRgb(token);
    if (!baked || baked.length !== 3 || !value) {
      throw new Error(
        `Could not read ${constant} in ${script} or --${token} to compare them.`,
      );
    }
    if (baked.some((channel, index) => channel !== value[index])) {
      throw new Error(
        `${script} bakes ${constant} as rgb(${baked.join(', ')}) but --${token} is rgb(${value.join(', ')}). Fix the constant and regenerate.`,
      );
    }
  }
}

const background = tokens.match(/--color-background:\s*var\(--([\w-]+)\)/)?.[1];
const surfaces = {
  'color-white': { name: 'white', suffix: '-white' },
  'color-brand-cream': { name: 'cream', suffix: '' },
};
const surface = background ? surfaces[background] : undefined;
if (!surface) {
  throw new Error(
    `--color-background resolves to "${background}", which no media set is baked for.`,
  );
}

const published = [
  ...assets.matchAll(/'\/assets\/motion\/(?:hero|studio)\/[^']+'/g),
].map((match) => match[0].slice(1, -1));
const mismatched = published.filter((path) =>
  surface.suffix
    ? !path.includes(`${surface.suffix}.`)
    : path.includes('-white.'),
);
if (published.length === 0 || mismatched.length > 0) {
  throw new Error(
    `The page is ${surface.name} but these loop files are baked for another paper:\n${mismatched.join('\n')}\nRegenerate with "--paper=${surface.name}" and point src/config/assets.ts at them.`,
  );
}

process.stdout.write(
  `Responsive hero contract passed: desktop/mobile WebM+MP4, poster, dimensions, viewport pause, reduced-motion fallback, and ${published.length} hero/Studio files baked for the ${surface.name} page.\n`,
);
