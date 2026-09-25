import { existsSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import process from 'node:process';

const projectRoot = process.cwd();
const publicRoot = join(projectRoot, 'public', 'assets');
const requireAssets = process.env.REQUIRE_CLIENT_ASSETS;

if (
  requireAssets !== undefined &&
  requireAssets !== 'true' &&
  requireAssets !== 'false'
) {
  throw new Error('REQUIRE_CLIENT_ASSETS must be exactly true or false.');
}

const requiredFiles = [
  'brand/colmillo-wordmark-black.png',
  'brand/colmillo-wordmark-cream.png',
  'brand/favicon.svg',
  /*
   * The delivery of 2026-09-14, which is what `heroMedia` actually points
   * at. Until 2026-09-25 this list still named the first generation
   * (hero-desktop.*, hero-mobile.*, hero-poster.webp), so the release gate
   * was guarding files the site had stopped using — and passing only
   * because those files happened to still be lying in `public/`.
   */
  'motion/hero/hero-final-desktop-white.webm',
  'motion/hero/hero-final-desktop-white.mp4',
  'motion/hero/hero-final-mobile-white.webm',
  'motion/hero/hero-final-mobile-white.mp4',
  'motion/hero/hero-final-poster-white.webp',
  'motion/goodbye/goodbye.webm',
  'motion/goodbye/goodbye.mp4',
  'motion/goodbye/goodbye-poster.webp',
];

const requiredDirectories = ['fonts/bootzy', 'fonts/more-sugar', 'projects'];

const missingFiles = requiredFiles.filter(
  (file) => !existsSync(join(publicRoot, file)),
);
const missingDirectories = requiredDirectories.filter(
  (directory) => !existsSync(join(publicRoot, directory)),
);
const fontDirectories = requiredDirectories.filter((directory) =>
  directory.startsWith('fonts/'),
);
const missingFontDirectories = fontDirectories.filter((directory) => {
  const absolute = join(publicRoot, directory);
  return (
    !existsSync(absolute) ||
    !readdirSync(absolute).some((file) => /\.woff2$/i.test(file))
  );
});
const missing = [
  ...missingDirectories.map((directory) => `directory: ${directory}`),
  ...missingFiles.map((file) => `file: ${file}`),
  ...missingFontDirectories.map(
    (directory) => `file: at least one licensed .woff2 in ${directory}`,
  ),
];

if (missing.length === 0) {
  process.stdout.write(
    'Client asset intake passed: all required slots are present.\n',
  );
  process.exit(0);
}

process.stdout.write(
  `Client asset intake is incomplete (${missing.length} items):\n${missing
    .map((item) => `- ${item}`)
    .join('\n')}\n`,
);

if (requireAssets === 'true') {
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Prelaunch mode: missing assets are allowed and remain blocked from publication. Root: ${relative(projectRoot, publicRoot)}\n`,
  );
}
