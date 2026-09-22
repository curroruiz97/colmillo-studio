import gsap from 'gsap';
import { playLoop, stopLoop } from './VideoLoop';

/**
 * Home goodbye stage: a viewport over one panoramic scene.
 *
 * Two positions only. At `start` the scene shows its left side under the first
 * block. The forward arrow pans the whole scene left (`end`) until its right
 * side fills the screen and the CTA arrives over it. The back button pans it
 * home. The distance is never measured here: the stylesheet resolves it from
 * the viewport container, so this module only eases `--goodbye-progress`
 * between 0 and 1 and a resize can never leave the scene short of, or past,
 * either side.
 *
 * The travel is ONE timeline, played forward to arrive and reversed to go
 * back, so the return is the exact inverse of the arrival. It is staggered so
 * nothing lands on the same millisecond: the scene leads and the first block
 * drifts out, the CTA copy arrives once the scene is mostly across and the
 * back button last. Keyboard focus moves from the pressed arrow to the arrow of
 * the side that arrived once the travel has settled. A request made while the
 * scene is travelling is ignored.
 *
 * Input: the arrows (click, Enter, Space; ArrowLeft/ArrowRight while one has
 * focus) and, on touch, a horizontal swipe anywhere on the stage. Vertical
 * gestures stay native scroll. Nothing moves on its own.
 *
 * Reduced motion jumps between the two sides with no travel and leaves a
 * video scene on its poster. Without JavaScript the scene rests on its left
 * side, both blocks are listed and the arrows stay hidden.
 */
type Side = 'start' | 'end';

const DURATION = 1.1;
const EASE = 'power3.inOut';
/*
 * The copy is fixed to the screen while the photograph moves under it, so it
 * may only be visible where the photograph is black. Measured against the
 * orange piece's edge at 1024-2560px wide: side A's block must be gone by 28%
 * of the travel, and side B's copy may only appear from about 74%.
 */
const START_OUT = DURATION * 0.28;
const END_IN = DURATION * 0.76;
const BACK_IN = DURATION * 0.86;
/** Sideways drift, in px, of the copy handing over during the travel. */
const COPY_DRIFT = 40;
/** Horizontal travel, in px, before a touch gesture counts as a swipe. */
const SWIPE_DISTANCE = 48;

export function initGoodbyePanorama(): () => void {
  const root = document.querySelector<HTMLElement>('[data-goodbye]');
  if (!root) return () => undefined;
  const reduced = document.documentElement.dataset.motion === 'reduced';
  const cleanups: (() => void)[] = [];
  const cleanupAll = () => cleanups.forEach((cleanup) => cleanup());

  const video = root.querySelector<HTMLVideoElement>('[data-goodbye-video]');
  if (video && reduced) {
    stopLoop(video);
  } else if (video) {
    // Fetched and played only near the viewport and in a visible tab.
    let near = false;
    const sync = () => {
      if (near && !document.hidden) playLoop(video);
      else stopLoop(video);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        near = Boolean(entry?.isIntersecting);
        sync();
      },
      { rootMargin: '20% 0px' },
    );
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);
    cleanups.push(() => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      stopLoop(video);
    });
  }

  const scene = root.querySelector<HTMLElement>('[data-goodbye-scene]');
  const startStop = root.querySelector<HTMLElement>(
    '[data-goodbye-stop="start"]',
  );
  const endStop = root.querySelector<HTMLElement>('[data-goodbye-stop="end"]');
  const back = root.querySelector<HTMLElement>('[data-goodbye-travel="back"]');
  const arrows = [
    ...root.querySelectorAll<HTMLButtonElement>('[data-goodbye-travel]'),
  ];
  if (!scene || !startStop || !endStop || !back || arrows.length === 0) {
    return cleanupAll;
  }
  const reveals = [
    ...endStop.querySelectorAll<HTMLElement>('[data-goodbye-reveal]'),
  ];

  const stopOf = (side: Side) => (side === 'start' ? startStop : endStop);
  // Kept on the element, so a motion-preference restart keeps the reader's
  // side of the scene.
  let at: Side = root.dataset.goodbyeAt === 'end' ? 'end' : 'start';
  let focusAfter = false;

  const settle = () => {
    const arrived = stopOf(at);
    const left = stopOf(at === 'end' ? 'start' : 'end');
    // Focus first, so the keyboard is never on a block that is going inert.
    if (focusAfter) {
      arrived
        .querySelector<HTMLButtonElement>('[data-goodbye-travel]')
        ?.focus({ preventScroll: true });
    }
    focusAfter = false;
    left.inert = true;
  };

  const place = () => {
    const end = at === 'end';
    gsap.set(scene, { '--goodbye-progress': end ? 1 : 0 });
    gsap.set(startStop, { x: 0, autoAlpha: end ? 0 : 1 });
    gsap.set(reveals, { x: 0, autoAlpha: end ? 1 : 0 });
    gsap.set(back, { scale: 1, autoAlpha: end ? 1 : 0 });
  };

  // Arrival, in order: scene and first block out, CTA copy, back button.
  const travel = reduced
    ? null
    : gsap
        .timeline({
          paused: true,
          defaults: { ease: EASE },
          onComplete: settle,
          onReverseComplete: settle,
        })
        .fromTo(
          scene,
          { '--goodbye-progress': 0 },
          { '--goodbye-progress': 1, duration: DURATION },
          0,
        )
        .fromTo(
          startStop,
          { x: 0, autoAlpha: 1 },
          {
            x: -COPY_DRIFT,
            autoAlpha: 0,
            duration: START_OUT,
            ease: 'power2.in',
          },
          0,
        )
        .fromTo(
          reveals,
          { x: COPY_DRIFT, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power2.out',
          },
          END_IN,
        )
        .fromTo(
          back,
          { scale: 0.6, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.3, ease: 'power2.out' },
          BACK_IN,
        );

  const moveTo = (target: Side) => {
    if (target === at || travel?.isActive()) return;
    focusAfter = stopOf(at).contains(document.activeElement);
    at = target;
    root.dataset.goodbyeAt = target;
    stopOf(target).inert = false;

    if (!travel) {
      // The stylesheet turns transitions off here, so the jump is on screen
      // (and the arriving control focusable) as soon as it is written.
      place();
      settle();
      return;
    }
    if (target === 'end') travel.play();
    else travel.reverse();
  };

  const onClick = (event: Event) => {
    const arrow = event.currentTarget as HTMLButtonElement;
    moveTo(arrow.dataset.goodbyeTravel === 'back' ? 'start' : 'end');
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    moveTo(event.key === 'ArrowRight' ? 'end' : 'start');
  };

  // Touch and pen only; a mouse uses the arrows. A gesture the browser takes
  // over as a vertical scroll ends in `pointercancel` and is dropped.
  let origin: { x: number; y: number } | null = null;
  const onDown = (event: PointerEvent) => {
    if (event.pointerType === 'mouse' || !event.isPrimary) return;
    origin = { x: event.clientX, y: event.clientY };
  };
  const onUp = (event: PointerEvent) => {
    if (!origin) return;
    const dx = event.clientX - origin.x;
    const dy = event.clientY - origin.y;
    origin = null;
    if (Math.abs(dx) >= SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy) * 1.2) {
      // Dragging the scene left reveals its right side.
      moveTo(dx < 0 ? 'end' : 'start');
    }
  };
  const onCancel = () => {
    origin = null;
  };

  root.dataset.goodbyeEnhanced = 'true';
  // The timeline has already rendered its start; a restart on side B jumps to
  // its end. Only the side on screen can be reached either way.
  if (travel) travel.progress(at === 'end' ? 1 : 0, true);
  else place();
  startStop.inert = at === 'end';
  endStop.inert = at !== 'end';
  for (const arrow of arrows) {
    arrow.hidden = false;
    arrow.addEventListener('click', onClick);
    arrow.addEventListener('keydown', onKey);
  }
  root.addEventListener('pointerdown', onDown, { passive: true });
  root.addEventListener('pointerup', onUp);
  root.addEventListener('pointercancel', onCancel);

  return () => {
    travel?.kill();
    for (const arrow of arrows) {
      arrow.removeEventListener('click', onClick);
      arrow.removeEventListener('keydown', onKey);
      arrow.hidden = true;
    }
    root.removeEventListener('pointerdown', onDown);
    root.removeEventListener('pointerup', onUp);
    root.removeEventListener('pointercancel', onCancel);
    scene.style.removeProperty('--goodbye-progress');
    gsap.set([startStop, back, ...reveals], {
      clearProps: 'transform,opacity,visibility',
    });
    startStop.inert = false;
    endStop.inert = false;
    delete root.dataset.goodbyeEnhanced;
    cleanupAll();
  };
}
