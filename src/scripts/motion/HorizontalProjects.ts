import gsap from 'gsap';

interface PinnedRail {
  end: number;
  progress: number;
  scroll: (position: number) => void;
  start: number;
}

/**
 * Home project rail. On a wide screen with motion allowed, vertical scroll
 * scrubs the track sideways while the section is pinned. Everywhere else the
 * rail is a native horizontal overflow with scroll snap, which is also what
 * visitors without JavaScript get.
 *
 * The travel is never a fixed number: it is the track's real width minus the
 * width of the window onto it, re-measured on every ScrollTrigger refresh
 * (resize, load, orientation change). The wheel is never intercepted.
 */
export function initHorizontalProjects(): () => void {
  const section = document.querySelector<HTMLElement>(
    '[data-horizontal-projects]',
  );
  const track = section?.querySelector<HTMLElement>('[data-project-track]');
  const viewport = section?.querySelector<HTMLElement>(
    '[data-project-viewport]',
  );

  if (!section || !track || !viewport) return () => undefined;

  let pinned: PinnedRail | undefined;
  const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

  /*
   * Keyboard focus walks the rail. While pinned, the viewport clips its
   * overflow and the transform owns the offset, so the page is scrolled to the
   * point of the pin where the focused piece is entirely in view. Natively the
   * browser only needs to be asked to reveal it.
   */
  const revealFocused = (event: FocusEvent) => {
    const item = (event.target as Element | null)?.closest<HTMLElement>(
      '[data-project-card], [data-project-outro]',
    );
    if (!item) return;
    if (!pinned) {
      item.scrollIntoView({
        behavior:
          document.documentElement.dataset.motion === 'reduced'
            ? 'auto'
            : 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
      return;
    }
    // Focusing inside an `overflow: hidden` box can still scroll it; the
    // transform is the only offset the rail may have.
    viewport.scrollLeft = 0;
    const travel = distance();
    if (travel <= 0) return;
    const trackStyle = getComputedStyle(track);
    const before = parseFloat(trackStyle.paddingInlineStart) || 0;
    const after = parseFloat(trackStyle.paddingInlineEnd) || 0;
    const left =
      item.getBoundingClientRect().left - track.getBoundingClientRect().left;
    const right = left + item.offsetWidth;
    const current = pinned.progress * travel;
    let offset = current;
    if (left - before < current) offset = left - before;
    else if (right + after > current + viewport.clientWidth)
      offset = right + after - viewport.clientWidth;
    offset = Math.max(0, Math.min(travel, offset));
    pinned.scroll(
      pinned.start + (pinned.end - pinned.start) * (offset / travel),
    );
  };

  section.dataset.projectsReady = 'true';
  track.addEventListener('focusin', revealFocused);

  const matchMedia = gsap.matchMedia();
  matchMedia.add(
    '(min-width: 769px) and (prefers-reduced-motion: no-preference)',
    () => {
      // Set before measuring: the enhanced layout sizes every tile from the
      // height of the pinned rail, so the width only exists once it applies.
      section.dataset.horizontalEnhanced = 'true';
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });
      pinned = tween.scrollTrigger;
      return () => {
        pinned = undefined;
        delete section.dataset.horizontalEnhanced;
        tween.scrollTrigger?.kill();
      };
    },
  );

  return () => {
    matchMedia.revert();
    track.removeEventListener('focusin', revealFocused);
    delete section.dataset.projectsReady;
    delete section.dataset.horizontalEnhanced;
  };
}
