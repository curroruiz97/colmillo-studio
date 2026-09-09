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

process.stdout.write(
  'Responsive hero contract passed: desktop/mobile WebM+MP4, poster, dimensions, viewport pause and reduced-motion fallback are wired.\n',
);
