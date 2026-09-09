import { existsSync, statSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { extname, join, relative, resolve, sep } from 'node:path';
import process from 'node:process';
import { URL } from 'node:url';

const root = resolve(process.argv[2] ?? 'dist');

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

function pageUrl(file) {
  const path = relative(root, file).replaceAll('\\', '/');
  if (path === 'index.html') return '/';
  if (path.endsWith('/index.html')) return `/${path.slice(0, -10)}`;
  return `/${path}`;
}

function targetFile(pathname) {
  const decoded = decodeURIComponent(pathname).replace(/^\/+/, '');
  const candidates =
    decoded === ''
      ? ['index.html']
      : extname(decoded)
        ? [decoded]
        : [decoded, join(decoded, 'index.html')];

  for (const candidate of candidates) {
    const absolute = resolve(root, candidate);
    if (
      (absolute === root || absolute.startsWith(`${root}${sep}`)) &&
      existsSync(absolute) &&
      statSync(absolute).isFile()
    ) {
      return absolute;
    }
  }
  return null;
}

const htmlFiles = (await walk(root)).filter(
  (file) => extname(file) === '.html',
);
const failures = [];

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const hrefs = [...html.matchAll(/\shref=(?:"([^"]*)"|'([^']*)')/gi)].map(
    (match) => match[1] ?? match[2] ?? '',
  );

  for (const href of hrefs) {
    if (
      href === '' ||
      /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(href)
    ) {
      continue;
    }

    const resolvedUrl = new URL(href, `https://local.test${pageUrl(file)}`);
    const target = targetFile(resolvedUrl.pathname);
    if (!target) {
      failures.push(
        `${relative(root, file)} -> ${href} (local target is missing)`,
      );
      continue;
    }

    if (resolvedUrl.hash) {
      const id = decodeURIComponent(resolvedUrl.hash.slice(1));
      const targetHtml = await readFile(target, 'utf8');
      const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (
        !new RegExp(`(?:id|name)=(?:"${escaped}"|'${escaped}')`).test(
          targetHtml,
        )
      ) {
        failures.push(
          `${relative(root, file)} -> ${href} (fragment is missing)`,
        );
      }
    }
  }
}

if (failures.length > 0) {
  throw new Error(
    `Broken internal links (${failures.length}):\n${failures.join('\n')}`,
  );
}

process.stdout.write(
  `Internal link integrity passed: ${htmlFiles.length} HTML files checked in ${relative(process.cwd(), root) || '.'}.\n`,
);
