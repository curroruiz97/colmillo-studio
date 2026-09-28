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
 *
 * Waiting for a gesture still left the first screen standing still, which
 * the client reported again on 2026-09-28 from an iPhone in Low Power Mode.
 * Safari will play an MP4 given to an `<img>` as an animated image, and
 * Low Power Mode does not stop images. So a refused loop is also covered by
 * its own MP4 as an image, laid exactly over the video's box, while the
 * video keeps its place in the layout (the modules observe it) and is only
 * made invisible. An engine that cannot decode an MP4 as an image fails the
 * load and keeps the poster and the gesture retry. A gesture that later lets
 * the video play hands back to it; parking a loop hides the image.
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

/** Loops currently asked to play by their module. */
const wanted = new Set<HTMLVideoElement>();

/** The animated-image stand-in of each refused loop, once it has loaded. */
const standIns = new Map<HTMLImageElement, HTMLVideoElement>();
const standInOf = new Map<HTMLVideoElement, HTMLImageElement>();

/** Loops whose MP4 this engine could not decode as an image. */
const noStandIn = new WeakSet<HTMLVideoElement>();

/** Keeps each stand-in on its video's box as the layout changes. */
let tracker: ResizeObserver | null = null;

/** The MP4 the video would pick on this screen, if it has one. */
function mp4Source(video: HTMLVideoElement): string | null {
  for (const source of video.querySelectorAll('source')) {
    if (!source.type.startsWith('video/mp4')) continue;
    if (source.media && !window.matchMedia(source.media).matches) continue;
    return source.src;
  }
  const own = video.currentSrc || video.src;
  return /\.mp4(?:[?#]|$)/i.test(own) ? own : null;
}

/**
 * Lays the image over the video's box. The image is absolutely positioned,
 * but its containing block may be a transformed ancestor rather than the
 * video's offset parent (the home hero scales its frame), so the offset is
 * measured on screen from the image's own origin and divided by the scale
 * both share. The image carries the video's classes, so object-fit, blending
 * and radius match.
 */
function place(image: HTMLImageElement, video: HTMLVideoElement): void {
  Object.assign(image.style, {
    position: 'absolute',
    inset: 'auto',
    left: '0px',
    top: '0px',
    width: `${video.offsetWidth}px`,
    height: `${video.offsetHeight}px`,
    margin: '0',
    maxWidth: 'none',
    maxHeight: 'none',
    pointerEvents: 'none',
    // The classes may carry an entrance or a centring transform; the video
    // has made its entrance already, and a transform on the image would
    // falsify the origin measured below.
    transform: 'none',
    translate: 'none',
    scale: 'none',
    rotate: 'none',
    animation: 'none',
    transition: 'none',
  });
  const origin = image.getBoundingClientRect();
  const target = video.getBoundingClientRect();
  const scale = video.offsetWidth ? target.width / video.offsetWidth : 1;
  const unit = scale || 1;
  image.style.left = `${(target.left - origin.left) / unit}px`;
  image.style.top = `${(target.top - origin.top) / unit}px`;
  // The offsets are whole pixels; the rendered box keeps its fraction.
  image.style.width = `${target.width / unit}px`;
  image.style.height = `${target.height / unit}px`;
}

function showStandIn(video: HTMLVideoElement): void {
  const image = standInOf.get(video);
  if (!image) return;
  place(image, video);
  image.style.visibility = '';
  video.style.visibility = 'hidden';
}

function hideStandIn(video: HTMLVideoElement): void {
  const image = standInOf.get(video);
  if (!image) return;
  image.style.visibility = 'hidden';
  video.style.visibility = '';
}

function coverWithImage(video: HTMLVideoElement): void {
  if (standInOf.has(video)) {
    if (wanted.has(video)) showStandIn(video);
    return;
  }
  if (noStandIn.has(video)) return;
  const source = mp4Source(video);
  if (!source) {
    noStandIn.add(video);
    return;
  }

  const image = document.createElement('img');
  image.className = video.className;
  image.alt = '';
  image.setAttribute('aria-hidden', 'true');
  image.dataset.loopStandIn = '';
  image.decoding = 'async';
  image.style.visibility = 'hidden';
  image.addEventListener(
    'load',
    () => {
      if (image.naturalWidth === 0) return;
      standInOf.set(video, image);
      standIns.set(image, video);
      tracker ??= new ResizeObserver(() => {
        for (const [still, loop] of standIns) place(still, loop);
      });
      tracker.observe(video);
      if (wanted.has(video) && refused.has(video)) showStandIn(video);
    },
    { once: true },
  );
  image.addEventListener(
    'error',
    () => {
      noStandIn.add(video);
      image.remove();
    },
    { once: true },
  );
  place(image, video);
  image.src = source;
  video.after(image);
}

function retry(event: Event): void {
  for (const video of [...refused]) {
    // A scroll grants nothing on iOS, and a loop already moving as its image
    // does not need asking again on every scroll event; a tap or a key does.
    if (event.type === 'scroll' && standInOf.has(video)) continue;
    refused.delete(video);
    if (wanted.has(video)) playLoop(video);
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
  wanted.add(video);
  // Already refused and covered by its image: show that, and leave the video
  // to the gesture retry rather than asking again on every scroll event.
  if (refused.has(video) && standInOf.has(video)) {
    showStandIn(video);
    return;
  }
  // The attributes are in the markup; the properties are what an autoplay
  // policy reads, and `muted` in particular must be true at the call.
  video.muted = true;
  video.playsInline = true;
  Promise.resolve(video.play()).then(
    () => {
      refused.delete(video);
      release();
      hideStandIn(video);
    },
    (error: unknown) => {
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        hold(video);
        if (wanted.has(video)) coverWithImage(video);
      }
    },
  );
}

/** Parks a loop and cancels any retry waiting on a gesture for it. */
export function stopLoop(video: HTMLVideoElement): void {
  wanted.delete(video);
  hideStandIn(video);
  // A loop covered by its image stays known as refused, so coming back on
  // screen shows the image at once instead of flashing the poster.
  if (!standInOf.has(video)) refused.delete(video);
  release();
  video.pause();
}
