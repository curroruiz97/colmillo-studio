/**
 * Exercises `public/api/contacto.php` end to end, with no network and no
 * real mailbox: PHP's built-in server runs the endpoint, and a fake SMTP
 * server here records what it would have delivered.
 *
 *   npm run check:contact
 *
 * Needs the `php` CLI (8.1+). Exits non-zero on the first failed case.
 */
import { spawn } from 'node:child_process';
import { Buffer } from 'node:buffer';
import console from 'node:console';
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';
import { setTimeout as wait } from 'node:timers/promises';

/* Node's own fetch; imported like the other globals so ESLint knows it. */
const { fetch } = globalThis;

const PHP_PORT = 4391;
const SMTP_PORT = 4392;
const ORIGIN = `http://127.0.0.1:${PHP_PORT}`;

/* ------------------------------------------------------------ fake SMTP -- */

const delivered = [];
const smtp = createServer((socket) => {
  let inData = false;
  let authStep = 0;
  let buffer = '';
  let message = '';
  socket.write('220 fake ESMTP\r\n');
  socket.on('data', (chunk) => {
    buffer += chunk.toString('utf8');
    let index;
    while ((index = buffer.indexOf('\r\n')) >= 0) {
      const line = buffer.slice(0, index);
      buffer = buffer.slice(index + 2);
      if (inData) {
        if (line === '.') {
          inData = false;
          delivered.push(message);
          message = '';
          socket.write('250 queued\r\n');
        } else {
          message += `${line}\r\n`;
        }
        continue;
      }
      if (authStep === 1) {
        authStep = 2;
        socket.write('334 UGFzc3dvcmQ6\r\n');
        continue;
      }
      if (authStep === 2) {
        authStep = 0;
        socket.write('235 ok\r\n');
        continue;
      }
      const verb = line.split(' ')[0].toUpperCase();
      if (verb === 'EHLO') socket.write('250-fake\r\n250 AUTH LOGIN\r\n');
      else if (verb === 'AUTH') {
        authStep = 1;
        socket.write('334 VXNlcm5hbWU6\r\n');
      } else if (verb === 'MAIL' || verb === 'RCPT') socket.write('250 ok\r\n');
      else if (verb === 'DATA') {
        inData = true;
        socket.write('354 go\r\n');
      } else if (verb === 'QUIT') {
        socket.end('221 bye\r\n');
      } else socket.write('500 ?\r\n');
    }
  });
});
await new Promise((resolve) => smtp.listen(SMTP_PORT, '127.0.0.1', resolve));

/* ---------------------------------------------------------------- PHP -- */

const privateDir = (config) => {
  const dir = mkdtempSync(join(tmpdir(), 'colmillo-contact-'));
  writeFileSync(join(dir, 'mail-config.php'), `<?php return ${config};`);
  return dir;
};
const baseConfig = (port, password = 'secreto') => `[
  'host' => '127.0.0.1', 'port' => ${port}, 'secure' => 'none',
  'username' => 'web@colmillostudio.com', 'password' => '${password}',
  'from' => 'web@colmillostudio.com',
  'from_name' => 'Web Colmillo Studio', 'to' => 'hola@colmillostudio.com',
  'salt' => 'test', 'extra_hosts' => ['127.0.0.1:${PHP_PORT}'],
]`;

let php;
let current;
async function startPhp(dir, ini = []) {
  php?.kill();
  await wait(150);
  current = dir;
  php = spawn('php', [...ini, '-S', `127.0.0.1:${PHP_PORT}`, '-t', 'public'], {
    env: { ...process.env, COLMILLO_PRIVATE: dir },
    stdio: 'ignore',
  });
  for (let i = 0; i < 40; i += 1) {
    try {
      await fetch(`${ORIGIN}/api/contacto.php`);
      return;
    } catch {
      await wait(100);
    }
  }
  throw new Error('php -S did not start');
}

const post = (body, headers = {}) =>
  fetch(`${ORIGIN}/api/contacto.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: ORIGIN, ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

const brief = (extra = {}) => ({
  name: 'Ada Lovelace',
  email: 'ada@estudio.com',
  company: 'Máquina Analítica',
  service: 'identidad',
  message: 'Queremos rehacer la identidad.\n.Una línea que empieza por punto.',
  website: '',
  elapsed: 9000,
  ...extra,
});

/* -------------------------------------------------------------- cases -- */

let failures = 0;
const check = (label, condition, detail = '') => {
  console.log(
    `${condition ? 'ok  ' : 'FAIL'} ${label}${condition ? '' : ` ${detail}`}`,
  );
  if (!condition) failures += 1;
};
const decode = (raw) => {
  const [head, body] = raw.split('\r\n\r\n');
  return {
    head,
    body: Buffer.from(body.replace(/\r\n/g, ''), 'base64').toString('utf8'),
  };
};

try {
  await startPhp(privateDir(baseConfig(SMTP_PORT)));

  let res = await fetch(`${ORIGIN}/api/contacto.php`);
  check('GET is refused with 405', res.status === 405, res.status);

  res = await post(brief(), { Origin: 'https://otra-web.example' });
  check('another origin is refused with 403', res.status === 403, res.status);

  res = await post(brief());
  const json = await res.json();
  check(
    'a valid brief is accepted',
    res.status === 200 && json.ok,
    `${res.status} ${JSON.stringify(json)}`,
  );
  check(
    'exactly one message was delivered',
    delivered.length === 1,
    delivered.length,
  );
  const { head, body } = decode(delivered[0] ?? '\r\n\r\n');
  check('it goes to hola@', /^To: <hola@colmillostudio\.com>$/m.test(head));
  check(
    'it comes from the web mailbox',
    /^From: .*<web@colmillostudio\.com>$/m.test(head),
  );
  check(
    'Reply-To is the visitor',
    /^Reply-To: .*<ada@estudio\.com>$/m.test(head),
  );
  check(
    'the body carries every field',
    [
      'Ada Lovelace',
      'ada@estudio.com',
      'Máquina Analítica',
      'Identidad',
      'Queremos rehacer la identidad.',
    ].every((part) => body.includes(part)),
    body,
  );
  check(
    'no encoded word exceeds 75 characters',
    (head.match(/=\?UTF-8\?B\?[^?]*\?=/g) ?? []).every(
      (word) => word.length <= 75,
    ),
  );

  const before = delivered.length;
  res = await post(brief({ website: 'http://spam.example' }));
  check(
    'a filled trap is told ok and nothing is sent',
    res.status === 200 && delivered.length === before,
  );
  res = await post(brief({ elapsed: 300 }));
  check(
    'an impossibly fast brief is dropped',
    res.status === 200 && delivered.length === before,
  );

  res = await post(brief({ email: 'no-es-un-correo' }));
  const invalid = await res.json();
  check(
    'an invalid address is refused with 422',
    res.status === 422 && invalid.fields?.includes('email'),
    JSON.stringify(invalid),
  );

  res = await post(brief({ service: 'hackear' }));
  check('an unknown service is refused', res.status === 422);

  res = await post(brief({ name: 'Ada\r\nBcc: victima@example.com' }));
  const injected = delivered.at(-1) ?? '';
  check(
    'a header injection in the name is neutralised',
    res.status === 200 && !/^Bcc:/im.test(injected),
    injected.slice(0, 300),
  );

  res = await post('{"no es json');
  check('broken JSON is refused with 400', res.status === 400);

  res = await post(brief({ message: 'x'.repeat(21000) }));
  check('an oversized body is refused with 413', res.status === 413);

  // Five sends per window from one address. Two went out above (the valid
  // brief and the neutralised one); three more fill the window, then 429.
  await post(brief());
  await post(brief());
  res = await post(brief());
  check(
    'the fifth send in the window still goes out',
    res.status === 200,
    res.status,
  );
  res = await post(brief());
  check(
    'the sixth send in the window is limited with 429',
    res.status === 429,
    res.status,
  );

  await startPhp(
    privateDir(baseConfig(SMTP_PORT, 'CAMBIAR-por-la-contraseña')),
  );
  res = await post(brief());
  check('an unconfigured endpoint answers 503', res.status === 503, res.status);

  await startPhp(privateDir(baseConfig(SMTP_PORT + 7)));
  res = await post(brief());
  check('an unreachable SMTP answers 502', res.status === 502, res.status);

  // The local mail server needs no login.
  const sentBefore = delivered.length;
  await startPhp(
    privateDir(`[
      'host' => '127.0.0.1', 'port' => ${SMTP_PORT}, 'secure' => 'none',
      'from' => 'web@colmillostudio.com', 'to' => 'hola@colmillostudio.com',
      'salt' => 'otra', 'extra_hosts' => ['127.0.0.1:${PHP_PORT}'],
    ]`),
  );
  res = await post(brief());
  check(
    'the local server is used without a login',
    res.status === 200 && delivered.length === sentBefore + 1,
    res.status,
  );

  // Plain SMTP to another machine is refused as unconfigured.
  await startPhp(
    privateDir(`[
      'host' => 'smtp.example.com', 'port' => 25, 'secure' => 'none',
      'from' => 'web@colmillostudio.com', 'to' => 'hola@colmillostudio.com',
      'extra_hosts' => ['127.0.0.1:${PHP_PORT}'],
    ]`),
  );
  res = await post(brief());
  check(
    'unencrypted SMTP to a remote host is never used',
    res.status === 503,
    res.status,
  );

  // The server's own mail system: `mail()` through a sendmail that writes
  // what it is given to a file (the trailing `#` swallows the `-f` flag
  // PHP appends, which the real sendmail takes).
  const mailDir = privateDir(`[
    'transport' => 'sendmail',
    'from' => 'web@colmillostudio.com', 'to' => 'hola@colmillostudio.com',
    'salt' => 'tercera', 'extra_hosts' => ['127.0.0.1:${PHP_PORT}'],
  ]`);
  const outbox = join(mailDir, 'outbox.eml');
  await startPhp(mailDir, ['-d', `sendmail_path=cat > ${outbox} #`]);
  res = await post(brief());
  await wait(200);
  const local = existsSync(outbox) ? readFileSync(outbox, 'utf8') : '';
  check(
    'the local mail system is handed the brief',
    res.status === 200 && local.length > 0,
    res.status,
  );
  check(
    'it is addressed to hola@',
    /^To: hola@colmillostudio\.com/m.test(local),
    local.slice(0, 200),
  );
  check(
    'it carries From and Reply-To',
    /^From: .*<web@colmillostudio\.com>/m.test(local) &&
      /^Reply-To: .*<ada@estudio\.com>/m.test(local),
  );
  const [, localBody = ''] = local.split(/\r?\n\r?\n/);
  check(
    'its body decodes to the brief',
    Buffer.from(localBody.replace(/\s+/g, ''), 'base64')
      .toString('utf8')
      .includes('Máquina Analítica'),
  );
} finally {
  php?.kill();
  smtp.close();
  if (current) rmSync(current, { recursive: true, force: true });
}

if (failures) {
  console.error(`\n${failures} contact endpoint check(s) failed.`);
  process.exit(1);
}
console.log('\nContact endpoint checks passed.');
