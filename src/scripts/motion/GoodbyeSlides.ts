import gsap from 'gsap';

/**
 * Home goodbye stage: the copy changes slide by slide over a visual that
 * never moves.
 *
 * Phase 1 of the redesign: mechanism only. The transition is a plain
 * horizontal hand-over — the current slide leaves to the left while the next
 * enters from the right, both inside the copy column's clip — tuned from the
 * constants below. The final choreography is still to be decided.
 *
 * Input: the round button (click, Enter, Space; ArrowLeft/ArrowRight while it
 * has focus) and, on touch, a horizontal swipe anywhere on the stage. Vertical
 * gestures stay native scroll (`touch-action: pan-y pinch-zoom`). There is no
 * autoplay: nothing moves unless the reader asks. A request made while a
 * hand-over is still running is ignored, so the copy never jumps.
 *
 * The slides share one grid cell, so the block never changes height. Inactive
 * slides are `inert` and hidden, and the column is a polite live region, so a
 * screen reader hears the new copy when the button is pressed.
 *
 * Reduced motion swaps the slides in place with no travel and leaves a video
 * visual on its poster. Without JavaScript the slides are listed one after
 * another and the button stays hidden.
 */
const DURATION = 0.9;
const EASE = 'power3.inOut';
/** Horizontal travel, in px, before a touch gesture counts as a swipe. */
const SWIPE_DISTANCE = 48;

export function initGoodbyeSlides(): () => void {
  const root = document.querySelector<HTMLElement>('[data-goodbye]');
  if (!root) return () => undefined;
  const reduced = document.documentElement.dataset.motion === 'reduced';
  const cleanups: (() => void)[] = [];

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

  const slides = [
    ...root.querySelectorAll<HTMLElement>('[data-goodbye-slide]'),
  ];
  const next = root.querySelector<HTMLButtonElement>('[data-goodbye-next]');
  const count = slides.length;
  if (count < 2 || !next) {
    return () => cleanups.forEach((cleanup) => cleanup());
  }

  // Kept on the element, so a motion-preference restart keeps the reader's
  // place instead of jumping back to the first slide.
  const stored = Number(root.dataset.goodbyeIndex);
  let index = Number.isInteger(stored) ? ((stored % count) + count) % count : 0;
  let handOver: gsap.core.Timeline | null = null;

  const settle = () => {
    slides.forEach((slide, position) => {
      const active = position === index;
      slide.inert = !active;
      gsap.set(slide, { xPercent: 0, autoAlpha: active ? 1 : 0 });
    });
  };

  const go = (direction: 1 | -1) => {
    if (handOver?.isActive()) return;
    const leaving = slides[index];
    index = (index + direction + count) % count;
    const entering = slides[index];
    root.dataset.goodbyeIndex = String(index);
    if (!leaving || !entering || reduced) {
      settle();
      return;
    }
    leaving.inert = true;
    entering.inert = false;
    handOver = gsap
      .timeline({ defaults: { duration: DURATION, ease: EASE } })
      .fromTo(
        entering,
        { xPercent: 100 * direction, autoAlpha: 1 },
        { xPercent: 0 },
        0,
      )
      .to(leaving, { xPercent: -100 * direction }, 0)
      .set(leaving, { autoAlpha: 0, xPercent: 0 });
  };

  const onClick = () => go(1);
  const onKey = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    go(event.key === 'ArrowRight' ? 1 : -1);
  };

  // Touch and pen only; a mouse uses the button. A gesture the browser takes
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
      go(dx < 0 ? 1 : -1);
    }
  };
  const onCancel = () => {
    origin = null;
  };

  root.dataset.goodbyeEnhanced = 'true';
  next.hidden = false;
  settle();
  next.addEventListener('click', onClick);
  next.addEventListener('keydown', onKey);
  root.addEventListener('pointerdown', onDown, { passive: true });
  root.addEventListener('pointerup', onUp);
  root.addEventListener('pointercancel', onCancel);

  return () => {
    handOver?.kill();
    next.removeEventListener('click', onClick);
    next.removeEventListener('keydown', onKey);
    root.removeEventListener('pointerdown', onDown);
    root.removeEventListener('pointerup', onUp);
    root.removeEventListener('pointercancel', onCancel);
    gsap.set(slides, { clearProps: 'transform,opacity,visibility' });
    slides.forEach((slide) => {
      slide.inert = false;
    });
    next.hidden = true;
    delete root.dataset.goodbyeEnhanced;
    cleanups.forEach((cleanup) => cleanup());
  };
}
