import gsap from 'gsap';

/**
 * Home goodbye stage: a viewport over one panoramic scene.
 *
 * Two positions only. At `start` the scene shows its left side; the forward
 * arrow pans the whole scene left until its right side fills the screen
 * (`end`); the back arrow pans it home. The distance is never measured here:
 * the stylesheet resolves it from the viewport container, so this module only
 * eases `--goodbye-progress` between 0 and 1 and a resize can never leave the
 * scene short of, or past, either side.
 *
 * During the travel the copy hands over: the block leaving drifts out and
 * fades early, the block arriving drifts in once the scene is mostly across,
 * and keyboard focus moves from the pressed arrow to the arrow of the block
 * that arrived. A request made while the scene is travelling is ignored.
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
    video.pause();
  } else if (video) {
    // Fetched and played only near the viewport and in a visible tab.
    let near = false;
    const sync = () => {
      if (near && !document.hidden) void video.play().catch(() => undefined);
      else video.pause();
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
      video.pause();
    });
  }

  const scene = root.querySelector<HTMLElement>('[data-goodbye-scene]');
  const startStop = root.querySelector<HTMLElement>(
    '[data-goodbye-stop="start"]',
  );
  const endStop = root.querySelector<HTMLElement>('[data-goodbye-stop="end"]');
  const arrows = [
    ...root.querySelectorAll<HTMLButtonElement>('[data-goodbye-travel]'),
  ];
  if (!scene || !startStop || !endStop || arrows.length === 0) {
    return cleanupAll;
  }

  const stopOf = (side: Side) => (side === 'start' ? startStop : endStop);
  // Kept on the element, so a motion-preference restart keeps the reader's
  // side of the scene.
  let at: Side = root.dataset.goodbyeAt === 'end' ? 'end' : 'start';
  let travel: gsap.core.Timeline | null = null;

  const place = () => {
    gsap.set(scene, { '--goodbye-progress': at === 'end' ? 1 : 0 });
    for (const side of ['start', 'end'] as const) {
      const active = side === at;
      stopOf(side).inert = !active;
      gsap.set(stopOf(side), { x: 0, autoAlpha: active ? 1 : 0 });
    }
  };

  const moveTo = (target: Side) => {
    if (target === at || travel?.isActive()) return;
    const leaving = stopOf(at);
    const arriving = stopOf(target);
    const keepFocus = leaving.contains(document.activeElement);
    const handOver = () => {
      leaving.inert = true;
      if (keepFocus) {
        arriving
          .querySelector<HTMLButtonElement>('[data-goodbye-travel]')
          ?.focus({ preventScroll: true });
      }
    };
    at = target;
    root.dataset.goodbyeAt = target;
    arriving.inert = false;

    if (reduced) {
      place();
      handOver();
      return;
    }

    const direction = target === 'end' ? 1 : -1;
    const copyIn = DURATION * 0.55;
    travel = gsap
      .timeline({ defaults: { ease: EASE } })
      .to(
        scene,
        { '--goodbye-progress': target === 'end' ? 1 : 0, duration: DURATION },
        0,
      )
      .to(
        leaving,
        {
          x: -COPY_DRIFT * direction,
          autoAlpha: 0,
          duration: DURATION * 0.4,
          ease: 'power2.in',
        },
        0,
      )
      .fromTo(
        arriving,
        { x: COPY_DRIFT * direction, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: DURATION - copyIn, ease: 'power2.out' },
        copyIn,
      )
      // Once the arriving block is visible, and so focusable.
      .call(handOver, undefined, copyIn + 0.01)
      .set(leaving, { x: 0 });
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
  place();
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
    gsap.set([startStop, endStop], {
      clearProps: 'transform,opacity,visibility',
    });
    startStop.inert = false;
    endStop.inert = false;
    delete root.dataset.goodbyeEnhanced;
    cleanupAll();
  };
}
