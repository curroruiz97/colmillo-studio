<?php

declare(strict_types=1);

/**
 * COLMILLO STUDIO — the contact form's endpoint.
 *
 * The one piece of server code in the site (2026-09-29, client direction:
 * what is written in the form reaches hola@colmillostudio.com). It receives
 * the brief as JSON from `/contacto/`, checks it the same way the form does,
 * and sends it as a plain-text email through IONOS's SMTP, where the studio's
 * mail lives, so it passes SPF and DKIM instead of leaving this server as
 * unauthenticated mail. "Reply" in the inbox answers the visitor.
 *
 * Nothing is stored. The only state is a salted hash of the sender's address
 * held for ten minutes to limit abuse (see `limit()`).
 *
 * The SMTP credentials are NOT in the repository or in any public folder:
 * `colmillo-private/mail-config.php` in the subscription's home, one level
 * above every document root (`docs/DEPLOYMENT.md`). Without a usable file the
 * endpoint answers 503 and the form falls back to showing the address.
 *
 * Responses are JSON: `{"ok": true}` or `{"ok": false, "error": "…"}` with a
 * 4xx/5xx status. The form only says "Recibido" on a 2xx.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

const MAX_BODY_BYTES = 20000;
/** A person needs longer than this to fill in the form. */
const MIN_FILL_MS = 2500;
const RATE_WINDOW_SECONDS = 600;
const RATE_MAX_SENDS = 5;
const ALLOWED_HOSTS = [
    'colmillostudio.com',
    'www.colmillostudio.com',
    'pre.colmillostudio.com',
];
/** Mirrors `contactServices` in `src/data/contactPage.ts`. */
const SERVICES = [
    'estrategia' => 'Estrategia',
    'identidad' => 'Identidad',
    'digital' => 'Digital',
    'contenido' => 'Contenido',
    'sin-definir' => 'No lo sé todavía',
];

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

/** The private folder: `$COLMILLO_PRIVATE`, or the home above the docroot. */
function private_dir(): string
{
    $override = getenv('COLMILLO_PRIVATE');
    if (is_string($override) && $override !== '') {
        return rtrim($override, '/');
    }
    return dirname(__DIR__, 2) . '/colmillo-private';
}

/** One line in the private log: the stage and a code, never the brief. */
function log_line(string $line): void
{
    @file_put_contents(
        private_dir() . '/contacto.log',
        gmdate('c') . ' ' . $line . "\n",
        FILE_APPEND | LOCK_EX,
    );
}

/* ------------------------------------------------------------- request -- */

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method']);
}

$config = (static function (): ?array {
    $file = private_dir() . '/mail-config.php';
    if (!is_file($file)) {
        return null;
    }
    $loaded = require $file;
    return is_array($loaded) ? $loaded : null;
})();

// Only the site's own pages may post here.
$allowed = array_merge(ALLOWED_HOSTS, (array) ($config['extra_hosts'] ?? []));
$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '');
$originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
$originPort = parse_url($origin, PHP_URL_PORT);
$originKey = $originPort ? "$originHost:$originPort" : $originHost;
if ($originHost === '' || !in_array($originKey, $allowed, true)) {
    respond(403, ['ok' => false, 'error' => 'origin']);
}

if (!str_contains(strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? '')), 'application/json')) {
    respond(415, ['ok' => false, 'error' => 'type']);
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false || strlen($raw) > MAX_BODY_BYTES) {
    respond(413, ['ok' => false, 'error' => 'size']);
}
$data = json_decode($raw, true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'json']);
}

/* ---------------------------------------------------------------- spam -- */

// A filled trap or an impossibly fast form is a bot. It is told "ok", so it
// learns nothing, and nothing is sent.
$trap = $data['website'] ?? '';
$elapsed = $data['elapsed'] ?? 0;
if ((is_string($trap) && trim($trap) !== '') || !is_numeric($elapsed) || (int) $elapsed < MIN_FILL_MS) {
    log_line('dropped bot');
    respond(200, ['ok' => true]);
}

/* ------------------------------------------------------------ validate -- */

/** A single line: trimmed, no control characters at all. */
function line_field(mixed $value, int $max): ?string
{
    if (!is_string($value)) {
        return null;
    }
    $value = trim(preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '');
    return mb_strlen($value) <= $max ? $value : null;
}

/** Text: line breaks kept and normalised, other control characters removed. */
function text_field(mixed $value, int $max): ?string
{
    if (!is_string($value)) {
        return null;
    }
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = trim(preg_replace('/[\x00-\x08\x0B-\x1F\x7F]+/u', '', $value) ?? '');
    return mb_strlen($value) <= $max ? $value : null;
}

$name = line_field($data['name'] ?? null, 120);
$email = line_field($data['email'] ?? null, 254);
$company = line_field($data['company'] ?? '', 160);
$service = line_field($data['service'] ?? '', 40);
$message = text_field($data['message'] ?? null, 5000);

$invalid = [];
if ($name === null || $name === '') {
    $invalid[] = 'name';
}
if ($email === null || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    $invalid[] = 'email';
}
if ($company === null) {
    $invalid[] = 'company';
}
if ($service === null || ($service !== '' && !array_key_exists($service, SERVICES))) {
    $invalid[] = 'service';
}
if ($message === null || $message === '') {
    $invalid[] = 'message';
}
if ($invalid) {
    respond(422, ['ok' => false, 'error' => 'invalid', 'fields' => $invalid]);
}

/* --------------------------------------------------------------- limit -- */

/**
 * At most RATE_MAX_SENDS per address per RATE_WINDOW_SECONDS. The address is
 * kept only as a salted hash, only for the window, only in the private folder.
 */
function limit(string $ip, string $salt): bool
{
    $dir = private_dir() . '/ratelimit';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return true;
    }
    $file = $dir . '/' . hash('sha256', $salt . '|' . $ip);
    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        return true;
    }
    flock($handle, LOCK_EX);
    $now = time();
    $stamps = json_decode(stream_get_contents($handle) ?: '[]', true);
    $stamps = array_values(array_filter(
        is_array($stamps) ? $stamps : [],
        static fn ($t) => is_int($t) && $t > $now - RATE_WINDOW_SECONDS,
    ));
    $allowed = count($stamps) < RATE_MAX_SENDS;
    if ($allowed) {
        $stamps[] = $now;
    }
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($stamps));
    flock($handle, LOCK_UN);
    fclose($handle);

    // Forget windows that have closed, now and then.
    if (random_int(1, 50) === 1) {
        foreach (glob($dir . '/*') ?: [] as $old) {
            if (@filemtime($old) < $now - RATE_WINDOW_SECONDS) {
                @unlink($old);
            }
        }
    }
    return $allowed;
}

/* -------------------------------------------------------------- config -- */

$required = ['host', 'port', 'username', 'password', 'to'];
$ready = is_array($config);
foreach ($required as $key) {
    $ready = $ready && isset($config[$key]) && $config[$key] !== '';
}
if (!$ready || str_starts_with((string) $config['password'], 'CAMBIAR')) {
    log_line('not configured');
    respond(503, ['ok' => false, 'error' => 'not_configured']);
}

if (!limit((string) ($_SERVER['REMOTE_ADDR'] ?? ''), (string) ($config['salt'] ?? $config['username']))) {
    respond(429, ['ok' => false, 'error' => 'rate']);
}

/* ------------------------------------------------------------- message -- */

/**
 * RFC 2047 encoded words, so accents survive every mail client. Each word
 * stays under the 75-character limit — at most 45 bytes of text, never
 * splitting a character — and long values are folded onto new lines.
 */
function header_words(string $text): string
{
    $words = [];
    $chunk = '';
    foreach (mb_str_split($text) as $char) {
        if (strlen($chunk) + strlen($char) > 45) {
            $words[] = '=?UTF-8?B?' . base64_encode($chunk) . '?=';
            $chunk = '';
        }
        $chunk .= $char;
    }
    $words[] = '=?UTF-8?B?' . base64_encode($chunk) . '?=';
    return implode("\r\n ", $words);
}

$to = (string) $config['to'];
$from = (string) ($config['from'] ?? $config['username']);
$fromName = (string) ($config['from_name'] ?? 'Web Colmillo Studio');
$serviceLabel = $service !== '' ? SERVICES[$service] : '';
$when = (new DateTimeImmutable('now', new DateTimeZone('Europe/Madrid')))->format('d/m/Y H:i');

$body = implode("\n", array_filter([
    'Nuevo mensaje desde el formulario de ' . $originHost . '.',
    '',
    'Nombre: ' . $name,
    'Correo: ' . $email,
    $company !== '' ? 'Empresa / proyecto: ' . $company : null,
    $serviceLabel !== '' ? 'Servicio: ' . $serviceLabel : null,
    '',
    '------------------------------------------------------------',
    $message,
    '------------------------------------------------------------',
    '',
    'Enviado el ' . $when . ' (hora de Madrid).',
    'Responde a este correo para contestar directamente a ' . $email . '.',
], static fn ($line) => $line !== null));

$messageId = sprintf('<%s@colmillostudio.com>', bin2hex(random_bytes(12)));
$headers = [
    'Date: ' . date(DATE_RFC2822),
    'From: ' . header_words($fromName) . ' <' . $from . '>',
    'To: <' . $to . '>',
    'Reply-To: ' . header_words($name) . ' <' . $email . '>',
    'Subject: ' . header_words('Nuevo mensaje de ' . $name . ' — colmillostudio.com'),
    'Message-ID: ' . $messageId,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    'X-Mailer: colmillostudio.com contacto',
];
$payload = implode("\r\n", $headers) . "\r\n\r\n"
    . rtrim(chunk_split(base64_encode($body), 76, "\r\n"));

/* ---------------------------------------------------------------- SMTP -- */

/**
 * A small SMTP client: STARTTLS (or implicit TLS on 465), AUTH LOGIN, one
 * message. Certificates are verified; nothing is sent in the clear to a
 * remote host. `secure => none` exists only for the local test harness.
 */
final class Smtp
{
    /** @var resource */
    private $socket;

    public function __construct(private array $config)
    {
    }

    private function read(int ...$expect): string
    {
        $reply = '';
        while (($line = fgets($this->socket, 1024)) !== false) {
            $reply .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') {
                break;
            }
        }
        $code = (int) substr($reply, 0, 3);
        if (!in_array($code, $expect, true)) {
            throw new RuntimeException('smtp ' . ($code ?: 'no-reply'));
        }
        return $reply;
    }

    private function send(string $command, int ...$expect): string
    {
        fwrite($this->socket, $command . "\r\n");
        return $this->read(...$expect);
    }

    public function deliver(string $from, string $to, string $data): void
    {
        $secure = (string) ($this->config['secure'] ?? 'starttls');
        $host = (string) $this->config['host'];
        $port = (int) $this->config['port'];
        $scheme = $secure === 'tls' ? 'ssl' : 'tcp';
        $context = stream_context_create(['ssl' => [
            'verify_peer' => true,
            'verify_peer_name' => true,
            'peer_name' => $host,
        ]]);
        $socket = @stream_socket_client("$scheme://$host:$port", $errno, $error, 15, STREAM_CLIENT_CONNECT, $context);
        if ($socket === false) {
            throw new RuntimeException('connect ' . $errno);
        }
        $this->socket = $socket;
        stream_set_timeout($socket, 20);

        $this->read(220);
        $this->send('EHLO colmillostudio.com', 250);
        if ($secure === 'starttls') {
            $this->send('STARTTLS', 220);
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT)) {
                throw new RuntimeException('tls');
            }
            $this->send('EHLO colmillostudio.com', 250);
        }
        $this->send('AUTH LOGIN', 334);
        $this->send(base64_encode((string) $this->config['username']), 334);
        $this->send(base64_encode((string) $this->config['password']), 235);
        $this->send('MAIL FROM:<' . $from . '>', 250);
        $this->send('RCPT TO:<' . $to . '>', 250, 251);
        $this->send('DATA', 354);
        // Dot-stuffing: a line that starts with a dot gets a second one.
        $stuffed = preg_replace('/^\./m', '..', $data) ?? $data;
        $this->send($stuffed . "\r\n.", 250);
        try {
            $this->send('QUIT', 221);
        } catch (RuntimeException) {
            // Already accepted; a server that hangs up early is fine.
        }
        fclose($socket);
    }
}

try {
    (new Smtp($config))->deliver($from, $to, $payload);
} catch (Throwable $error) {
    log_line('send failed: ' . $error->getMessage());
    respond(502, ['ok' => false, 'error' => 'send_failed']);
}

log_line('sent ' . $messageId);
respond(200, ['ok' => true]);
