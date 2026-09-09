import { existsSync, readFileSync } from 'node:fs';
import process from 'node:process';
import { URL } from 'node:url';

const failures = [];
const siteUrl = process.env.PUBLIC_SITE_URL;

function readBoolean(name) {
  const value = process.env[name];
  if (value !== undefined && value !== 'true' && value !== 'false') {
    failures.push(`${name} must be exactly true or false when defined.`);
  }
  return value === 'true';
}

const releaseApproved = readBoolean('PUBLIC_RELEASE_APPROVED');
const indexingApproved = readBoolean('PUBLIC_INDEXING_APPROVED');

if (!siteUrl) {
  failures.push('PUBLIC_SITE_URL is missing.');
} else {
  try {
    const parsed = new URL(siteUrl);
    if (
      parsed.protocol !== 'https:' ||
      parsed.pathname !== '/' ||
      parsed.search ||
      parsed.hash ||
      parsed.username ||
      parsed.password
    ) {
      failures.push('PUBLIC_SITE_URL must be an HTTPS origin without a path.');
    }
  } catch {
    failures.push('PUBLIC_SITE_URL is not a valid URL.');
  }
}

if (!releaseApproved) {
  failures.push(
    'PUBLIC_RELEASE_APPROVED must be true after content/legal/visual approval.',
  );
}
if (!indexingApproved) {
  failures.push(
    'PUBLIC_INDEXING_APPROVED must be true only after SEO and robots review.',
  );
}

const robotsPath = new URL('../public/robots.txt', import.meta.url);
if (
  indexingApproved &&
  readFileSync(robotsPath, 'utf8').includes('Disallow: /')
) {
  failures.push(
    'public/robots.txt still blocks all indexing. Replace it before release.',
  );
}

if (!existsSync(new URL('../dist/index.html', import.meta.url))) {
  failures.push('dist/index.html is missing. Run npm run build first.');
}

if (failures.length > 0) {
  process.stderr.write(
    `Release preflight blocked (${failures.length} checks):\n`,
  );
  failures.forEach((failure) => process.stderr.write(`- ${failure}\n`));
  process.exitCode = 1;
} else {
  process.stdout.write(
    'Release preflight passed. Deployment may proceed only with explicit user approval.\n',
  );
}
