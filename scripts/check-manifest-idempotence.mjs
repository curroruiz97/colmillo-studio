import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

const manifestPath = join(process.cwd(), 'dist', 'release-manifest.json');

await import('./release-manifest.mjs?pass=1');
const first = JSON.parse(await readFile(manifestPath, 'utf8'));
await import('./release-manifest.mjs?pass=2');
const second = JSON.parse(await readFile(manifestPath, 'utf8'));

for (const manifest of [first, second]) {
  if (manifest.files.some((entry) => entry.path === 'release-manifest.json')) {
    throw new Error('release-manifest.json signed itself.');
  }
}

if (JSON.stringify(first.files) !== JSON.stringify(second.files)) {
  throw new Error(
    'Release manifest file entries changed between consecutive runs.',
  );
}

process.stdout.write(
  `Release manifest idempotence passed: ${second.files.length} stable files, self excluded.\n`,
);
