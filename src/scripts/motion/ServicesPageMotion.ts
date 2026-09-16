import type { gsap as GsapCore } from 'gsap';
import type { ScrollTrigger as ScrollTriggerClass } from 'gsap/ScrollTrigger';
import type { bindPressSurface, canPress } from './PressSurface';

/** Handed over by `ServicesPage.ts`; imported here for their types only. */
export interface ServicesPageTools {
  gsap: typeof GsapCore;
  ScrollTrigger: typeof ScrollTriggerClass;
  bindPressSurface: typeof bindPressSurface;
  canPress: typeof canPress;
}

const none = () => undefined;

/** Where `layout.css` makes the stack layers sticky. */
const STACKED = '(min-width: 64.01rem) and (min-height: 34rem)';
const LINEAR = '(max-width: 64rem), (max-height: 33.99rem)';

/**
 * /servicios/ — the page's motion, loaded only on this route.
 *
 * The stack itself (layers rising over one another, the covered one
 * compressing) is the shared `SectionStack.ts`, so this chunk adds only:
 *
 * - each layer's arrival: rule and title, then the claim, the description,
 *   the capabilities and finally the media, once, `power3.out`, small
 *   translations and a light top clip on the plate; no scale, blur or bounce;
 * - the close's scene, scroll-linked: the picture settles, its two wings
 *   press in around the centre and the heading and the two paths arrive;
 * - loops that play only when they can be seen;
 * - the service plates' pressure dent under a fine pointer, the same one as
 *   the Studio team portraits.
 *
 * No pin, scrub or scroll interception: the stack is sticky CSS. Every tween,
 * trigger, observer and listener is released by the returned cleanup, which
 * `MotionController` runs before a motion-preference restart.
 *
 * Reduced motion: a short opacity fade on arrival, loops rest on their poster
 * and the plates stay still.
 */
export function mountServicesPage(
  page: HTMLElement,
  tools: ServicesPageTools,
): () => void {
  const reduced = document.documentElement.dataset.motion === 'reduced';
  const cleanups = [
    initLayers(page, reduced, tools),
    initPress(page, tools),
    initClose(page, reduced, tools),
    initLoops(page, reduced, tools),
  ];
  return () => cleanups.forEach((cleanup) => cleanup());
}

/* ---------------------------------------------------------------- press --- */

/**
 * Each service plate gives where it is pressed, exactly like the Studio team
 * portraits (`initTeam` in `StudioPageMotion.ts`): the shared
 * `bindPressSurface` dents the edge nearest the pointer by clipping the
 * surface inside the fixed frame, so size, radius, proportion and the art's
 * `object-fit` never change. `canPress()` excludes touch, coarse pointers and
 * reduced motion, which keep the still plate.
 */
function initPress(
  page: HTMLElement,
  { bindPressSurface, canPress }: ServicesPageTools,
): () => void {
  if (!canPress()) return none;
  const presses = [
    ...page.querySelectorAll<HTMLElement>('[data-service-layer]'),
  ].map((layer) => {
    const frame = layer.querySelector<HTMLElement>('[data-press-frame]');
    const surface = layer.querySelector<HTMLElement>('[data-press-surface]');
    return frame && surface ? bindPressSurface(frame, surface, frame) : none;
  });
  return () => presses.forEach((release) => release());
}

/* --------------------------------------------------------------- layers --- */

interface LayerParts {
  layer: HTMLElement;
  copy: HTMLElement | null;
  rule: HTMLElement | null;
  /** Title, claim and description, in order. */
  lines: HTMLElement[];
  /** The capabilities' label, each capability and the optional button. */
  details: HTMLElement[];
  media: HTMLElement | null;
}

function layerParts(layer: HTMLElement): LayerParts {
  return {
    layer,
    copy: layer.querySelector('[data-service-copy]'),
    rule: layer.querySelector('[data-service-rule]'),
    lines: [...layer.querySelectorAll<HTMLElement>('[data-service-reveal]')],
    details: [...layer.querySelectorAll<HTMLElement>('[data-service-detail]')],
    media: layer.querySelector('[data-service-media]'),
  };
}

type Timeline = ReturnType<typeof GsapCore.timeline>;

/** Adds the copy's arrival to a timeline, from `at` seconds. */
function revealCopy(timeline: Timeline, parts: LayerParts, at = 0) {
  if (parts.rule)
    timeline.from(
      parts.rule,
      { scaleX: 0, transformOrigin: 'left center', duration: 0.8 },
      at,
    );
  if (parts.lines.length)
    timeline.from(
      parts.lines,
      { y: 24, opacity: 0, duration: 0.85, stagger: 0.1 },
      at + 0.04,
    );
  if (parts.details.length)
    timeline.from(
      parts.details,
      { y: 12, opacity: 0, duration: 0.7, stagger: 0.045 },
      at + 0.32,
    );
}

/** Adds the plate's arrival: it rises a little and opens a light top clip. */
function revealMedia(timeline: Timeline, media: HTMLElement, at: number) {
  timeline.fromTo(
    media,
    { y: 28, opacity: 0, clipPath: 'inset(14% 0% 0% 0%)' },
    {
      y: 0,
      opacity: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1,
      clearProps: 'clipPath',
    },
    at,
  );
}

function initLayers(
  page: HTMLElement,
  reduced: boolean,
  { gsap }: ServicesPageTools,
): () => void {
  const layers = [
    ...page.querySelectorAll<HTMLElement>('[data-service-layer]'),
  ].map(layerParts);
  if (layers.length === 0) return none;

  if (reduced) {
    const context = gsap.context(() => {
      layers.forEach((parts) => {
        const targets = [
          parts.rule,
          ...parts.lines,
          ...parts.details,
          parts.media,
        ].filter((target): target is HTMLElement => Boolean(target));
        gsap.from(targets, {
          opacity: 0,
          duration: 0.45,
          ease: 'none',
          scrollTrigger: { trigger: parts.layer, start: 'top 80%', once: true },
        });
      });
    }, page);
    return () => context.revert();
  }

  const media = gsap.matchMedia();

  // A layer arrives as one piece: it is sticky, so copy and plate are on
  // screen together. The sequence starts once most of it has risen.
  media.add(STACKED, () => {
    layers.forEach((parts) => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: parts.layer, start: 'top 58%', once: true },
      });
      revealCopy(timeline, parts);
      if (parts.media) revealMedia(timeline, parts.media, 0.4);
    });
  });

  // Read one after another, the plate sits under the copy and can be a
  // screen further down, so it keeps its own trigger.
  media.add(LINEAR, () => {
    layers.forEach((parts) => {
      const copy = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: parts.copy ?? parts.layer,
          start: 'top 84%',
          once: true,
        },
      });
      revealCopy(copy, parts);
      if (parts.media) {
        const plate = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: parts.media, start: 'top 90%', once: true },
        });
        revealMedia(plate, parts.media, 0);
      }
    });
  });

  return () => media.revert();
}

/* ---------------------------------------------------------------- close --- */

/** How far outside its resting place each wing starts, as a share of the width. */
const CLOSE_SPREAD = 0.065;

/**
 * The close's scene: pressure, framing, message.
 *
 * - Scene, scrubbed from the moment the section enters the screen until its
 *   top is near the top: the picture settles from `scale 1.08`, 2.5% lower,
 *   while the two wings travel in from further out (`CLOSE_SPREAD`), so the
 *   sculptures close around the empty centre. It follows the scroll both ways
 *   and never holds it.
 * - Message, once the section is well on screen (`top 55%`): the heading rises
 *   from a faint trace, the buttons a beat later. Played once, so the copy
 *   never fades out again while someone reads it or scrolls back.
 *
 * Transforms and opacity only; the stack's own entrance band
 * (`SectionStack.ts`) runs alongside. Reduced motion: nothing runs and the
 * final composition is simply there.
 */
function initClose(
  page: HTMLElement,
  reduced: boolean,
  { gsap }: ServicesPageTools,
): () => void {
  const close = page.querySelector<HTMLElement>('[data-services-close]');
  const scene = close?.querySelector<HTMLElement>('[data-close-scene]');
  const start = close?.querySelector<HTMLElement>('[data-close-wing="start"]');
  const end = close?.querySelector<HTMLElement>('[data-close-wing="end"]');
  const title = close?.querySelector<HTMLElement>('[data-close-title]');
  const actions = close
    ? [...close.querySelectorAll<HTMLElement>('[data-close-action]')]
    : [];
  if (reduced || !close || !scene || !start || !end || !title) return none;

  const context = gsap.context(() => {
    const spread = () => close.offsetWidth * CLOSE_SPREAD;
    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: close,
        start: 'top bottom',
        end: 'top 12%',
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
    timeline
      .fromTo(
        scene,
        { scale: 1.08, yPercent: 2.5 },
        { scale: 1, yPercent: 0, duration: 1 },
        0,
      )
      .fromTo(
        start,
        { x: () => -spread() },
        { x: 0, duration: 1, ease: 'power1.inOut' },
        0,
      )
      .fromTo(
        end,
        { x: () => spread() },
        { x: 0, duration: 1, ease: 'power1.inOut' },
        0,
      );

    const message = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: { trigger: close, start: 'top 55%', once: true },
    });
    message.fromTo(
      title,
      { y: 36, opacity: 0.06 },
      { y: 0, opacity: 1, duration: 1 },
      0,
    );
    if (actions.length)
      message.fromTo(
        actions,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        0.35,
      );
  }, close);

  return () => context.revert();
}

/* ---------------------------------------------------------------- loops --- */

/**
 * A loop plays only while it is on screen, not covered by the next layer of
 * the stack and in a visible tab; never under reduced motion.
 */
function initLoops(
  page: HTMLElement,
  reduced: boolean,
  { ScrollTrigger }: ServicesPageTools,
): () => void {
  const videos = [
    ...page.querySelectorAll<HTMLVideoElement>('video[data-page-video]'),
  ];
  if (videos.length === 0) return none;

  const visible = new Set<HTMLVideoElement>();
  const covered = new Set<HTMLVideoElement>();
  const sync = () => {
    videos.forEach((video) => {
      const playable =
        !reduced &&
        visible.has(video) &&
        !covered.has(video) &&
        !document.hidden;
      if (playable) void video.play().catch(() => undefined);
      else video.pause();
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) visible.add(video);
        else visible.delete(video);
      });
      sync();
    },
    { rootMargin: '10% 0px' },
  );
  videos.forEach((video) => observer.observe(video));

  // A covered sticky layer still intersects the viewport: the next layer's
  // arrival at the top is what hides it.
  const triggers = videos.flatMap((video) => {
    const next = video.closest('[data-stack-section]')?.nextElementSibling;
    if (!(next instanceof HTMLElement) || !next.matches('[data-stack-section]'))
      return [];
    const set = (isCovered: boolean) => {
      if (isCovered) covered.add(video);
      else covered.delete(video);
      sync();
    };
    return ScrollTrigger.create({
      trigger: next,
      start: 'top top',
      end: 'max',
      onToggle: (self) => set(self.progress > 0),
      onRefresh: (self) => set(self.progress > 0),
    });
  });

  document.addEventListener('visibilitychange', sync);
  sync();

  return () => {
    document.removeEventListener('visibilitychange', sync);
    observer.disconnect();
    triggers.forEach((trigger) => trigger.kill());
    videos.forEach((video) => video.pause());
  };
}
