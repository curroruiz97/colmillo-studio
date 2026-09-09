import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import process from 'node:process';
import { clearTimeout, setTimeout } from 'node:timers';
import { URL } from 'node:url';

const host = '127.0.0.1';
const rootArgument = process.argv.indexOf('--root');
const portArgument = process.argv.indexOf('--port');
const port =
  Number(portArgument >= 0 ? process.argv[portArgument + 1] : undefined) ||
  4321;
const root = resolve(
  rootArgument >= 0 ? (process.argv[rootArgument + 1] ?? 'dist') : 'dist',
);
const idleShutdownMs = 10_000;
let idleTimer;

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
};

function resolveRequestPath(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const relativePath =
    decodedPath === '/' ? 'index.html' : decodedPath.replace(/^\/+/, '');
  const candidate = normalize(join(root, relativePath));

  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) {
    return null;
  }

  if (existsSync(candidate) && statSync(candidate).isFile()) {
    return candidate;
  }

  const indexCandidate = join(candidate, 'index.html');
  return existsSync(indexCandidate) ? indexCandidate : null;
}

const server = createServer((request, response) => {
  scheduleShutdown();
  const requestUrl = new URL(request.url ?? '/', `http://${host}:${port}`);
  const filePath = resolveRequestPath(requestUrl.pathname);
  const responsePath = filePath ?? join(root, '404.html');

  response.statusCode = filePath ? 200 : 404;
  response.setHeader(
    'Content-Type',
    contentTypes[extname(responsePath)] ?? 'application/octet-stream',
  );
  createReadStream(responsePath).pipe(response);
});

server.listen(port, host, () => {
  process.stdout.write(
    `Static test server listening at http://${host}:${port}\n`,
  );
  scheduleShutdown();
});

function closeServer() {
  server.close(() => process.exit(0));
}

function scheduleShutdown() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(closeServer, idleShutdownMs);
}

process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
