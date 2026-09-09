import { createHash } from 'node:crypto';
import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import process from 'node:process';

const distRoot = join(process.cwd(), 'dist');
const manifestPath = join(distRoot, 'release-manifest.json');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? walk(path) : path;
    }),
  );
  return paths.flat();
}

if (!(await stat(distRoot).catch(() => null))) {
  throw new Error(
    'dist/ is missing. Run npm run build before generating a manifest.',
  );
}

const files = (await walk(distRoot)).filter(
  (file) => resolve(file) !== resolve(manifestPath),
);
const entries = await Promise.all(
  files.map(async (file) => {
    const contents = await readFile(file);
    return {
      path: relative(distRoot, file).replaceAll('\\', '/'),
      bytes: contents.byteLength,
      sha256: createHash('sha256').update(contents).digest('hex'),
      type: extname(file).slice(1) || 'file',
    };
  }),
);

const manifest = {
  generatedAt: new Date().toISOString(),
  node: process.version,
  package: JSON.parse(await readFile('package.json', 'utf8')).version,
  siteUrl: process.env.PUBLIC_SITE_URL ?? null,
  releaseApproved: process.env.PUBLIC_RELEASE_APPROVED === 'true',
  indexingApproved: process.env.PUBLIC_INDEXING_APPROVED === 'true',
  files: entries.sort((a, b) => a.path.localeCompare(b.path)),
};

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
process.stdout.write(
  `Release manifest written to ${relative(process.cwd(), manifestPath)} (${entries.length} files).\n`,
);
