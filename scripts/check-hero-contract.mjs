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
  // Since 2026-09-22 the loop is started and parked through the shared
  // `VideoLoop.ts` helper, which retries a refused autoplay at the first
  // gesture. The contract is unchanged: the observer's entry still decides.
  'playLoop(entry.target)',
  'stopLoop(entry.target)',
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
 * The hero and Studio loops are delivered pre-composited: their paper is
 * mapped onto a colour baked into the preparation script. Two things must
 * hold, or the drawing's own paper stops matching the page behind it and reads
 * as a rectangle.
 *
 * 1. Every baked paper colour equals the token it claims to be.
 *
 * 2. The published files match how each loop is composited on the page, and
 *    the two are composited differently since 2026-09-22:
 *
 *    - The Studio loop is laid straight on the section, so its files must be
 *      the set baked for `--color-background` (`-white` on white, the
 *      unsuffixed originals on cream).
 *    - The home hero is blended with `mix-blend-mode: multiply` inside an
 *      isolated frame (`hero-section.css`). White is that operator's identity,
 *      so the hero needs the `-white` set whatever the page colour is; a
 *      paper-matched bake would be the wrong file there, because on cream it
 *      would multiply cream by cream and darken the whole frame.
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
const heroFiles = published.filter((path) => path.includes('/hero/'));
const studioFiles = published.filter((path) => path.includes('/studio/'));

/*
 * The hero blends, so it is checked against the multiply identity rather than
 * against the page. The rule is read from the stylesheet instead of assumed:
 * if the blend is ever removed, the hero falls back to the Studio's rule.
 */
const heroCss = await readFile('src/styles/hero-section.css', 'utf8');
const heroBlends = /mix-blend-mode:\s*multiply/.test(heroCss);
if (heroBlends && !/isolation:\s*isolate/.test(heroCss)) {
  throw new Error(
    'hero-section.css blends the hero with multiply but never isolates the frame, so the paper would show the decor behind the hero. Add "isolation: isolate" to .hero__media-frame.',
  );
}
const heroSurface = heroBlends ? surfaces['color-white'] : surface;

const wrongPaper = (paths, target) =>
  paths.filter((path) =>
    target.suffix
      ? !path.includes(`${target.suffix}.`)
      : path.includes('-white.'),
  );
const mismatched = [
  ...wrongPaper(heroFiles, heroSurface),
  ...wrongPaper(studioFiles, surface),
];
if (published.length === 0 || mismatched.length > 0) {
  throw new Error(
    `These loop files are baked for the wrong paper:\n${mismatched.join('\n')}\nThe Studio loop needs the ${surface.name} set for the ${surface.name} page; the hero is blended with multiply, so it needs the ${heroSurface.name} set.`,
  );
}

process.stdout.write(
  `Responsive hero contract passed: desktop/mobile WebM+MP4, poster, dimensions, viewport pause, reduced-motion fallback, ${heroFiles.length} hero files baked ${heroSurface.name} and ${heroBlends ? 'multiplied onto' : 'laid on'} the ${surface.name} page, and ${studioFiles.length} Studio files baked ${surface.name}.\n`,
);
