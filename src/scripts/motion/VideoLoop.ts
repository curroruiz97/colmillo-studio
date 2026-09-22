/**
 * Starting and stopping the site's silent loops.
 *
 * Every loop is authored `muted loop playsinline` and is asked to play by the
 * module that owns its section, as it comes on screen, in a visible tab and
 * never under reduced motion. Those rules do not change here: this module only
 * makes the request itself survive a browser that refuses it.
 *
 * Most engines allow a muted inline video to start without a gesture. Some do
 * not, and they refuse with `NotAllowedError`: iOS in Low Power Mode, Chrome
 * with Data Saver, Safari's per-site "Auto-Play: Never". The element is then
 * left parked on its poster with the platform's own start badge over it, which
 * is exactly what reads as "this video needs a tap" — the mobile behaviour the
 * client reported on 2026-09-22.
 *
 * `playLoop` keeps every refused loop and retries it at the first gesture the
 * document sees — a tap, a scroll, a key. Inside a gesture the same call is
 * allowed, so the loops start on their own as soon as the visitor does
 * anything at all, with no control of ours and no change to the markup.
 *
 * A rejection is only remembered when the browser refused. `play()` also
 * rejects with `AbortError` when a later `pause()` interrupts it, which is
 * routine here (a loop scrolling out mid-request); retrying that one would
 * restart a loop its own module has just parked.
 */

/** Loops the browser refused, waiting for a gesture to be retried. */
const refused = new Set<HTMLVideoElement>();

/** Gestures that unlock playback; scroll counts on touch platforms. */
const GESTURES = [
  'pointerdown',
  'touchstart',
  'touchend',
  'keydown',
  'scroll',
  'click',
] as const;

/** Capture, so a gesture stopped by a handler still reaches this one. */
const OPTIONS: AddEventListenerOptions = { capture: true, passive: true };

let listening = false;

function retry(): void {
  for (const video of [...refused]) {
    refused.delete(video);
    playLoop(video);
  }
  release();
}

function hold(video: HTMLVideoElement): void {
  refused.add(video);
  if (listening) return;
  listening = true;
  for (const gesture of GESTURES)
    window.addEventListener(gesture, retry, OPTIONS);
}

function release(): void {
  if (!listening || refused.size > 0) return;
  listening = false;
  for (const gesture of GESTURES)
    window.removeEventListener(gesture, retry, OPTIONS);
}

/**
 * Asks a loop to play, and retries at the first gesture if the browser
 * refuses. Safe to call repeatedly: a video that is already playing resolves
 * at once.
 */
export function playLoop(video: HTMLVideoElement): void {
  // The attributes are in the markup; the properties are what an autoplay
  // policy reads, and `muted` in particular must be true at the call.
  video.muted = true;
  video.playsInline = true;
  Promise.resolve(video.play()).then(
    () => {
      refused.delete(video);
      release();
    },
    (error: unknown) => {
      if (error instanceof DOMException && error.name === 'NotAllowedError')
        hold(video);
    },
  );
}

/** Parks a loop and cancels any retry waiting on a gesture for it. */
export function stopLoop(video: HTMLVideoElement): void {
  refused.delete(video);
  release();
  video.pause();
}
