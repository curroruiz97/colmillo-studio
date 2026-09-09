import gsap from 'gsap';

/**
 * Services composition behaviour.
 *
 * Three responsibilities, all progressive enhancement:
 *  - reveal each entry with its own grammar but a shared duration and ease;
 *  - track the active service from scroll position, so keyboard, touch and
 *    screen-reader users get the same editorial focus as pointer users;
 *  - let a fine pointer temporarily override that active service.
 *
 * No content is ever hidden by this module. It only changes emphasis.
 */
export function initServicesMotion(): () => void {
  const section = document.querySelector<HTMLElement>(
    '[data-services-section]',
  );
  if (!section) return () => undefined;

  const entries = [
    ...section.querySelectorAll<HTMLElement>('[data-service-entry]'),
  ];
  if (entries.length === 0) return () => undefined;

  const ghost = section.querySelector<HTMLElement>('[data-services-ghost]');
  const marker = section.querySelector<HTMLElement>('[data-services-marker]');

  let activeEntry: HTMLElement | null = null;
  const applyActive = (entry: HTMLElement | null) => {
    if (entry === activeEntry) return;
    activeEntry = entry;
    entries.forEach((candidate) => {
      candidate.dataset.serviceActive = String(candidate === entry);
    });
    if (!entry) return;
    if (ghost) ghost.textContent = entry.dataset.serviceTitle ?? '';
    if (marker) marker.textContent = entry.dataset.serviceNumber ?? '';
  };

  applyActive(entries[0] ?? null);

  if (document.documentElement.dataset.motion === 'reduced') {
    // Static composition: everything stays visible and legible, with no
    // scroll tracking, pointer response or dimming.
    return () => {
      entries.forEach((entry) => delete entry.dataset.serviceActive);
      delete section.dataset.servicesEngaged;
    };
  }

  // Scroll ownership of the active service. The entry whose centre is nearest
  // the middle of the viewport wins, which keeps the backdrop word and the
  // sticky marker truthful while simply scrolling.
  let pointerEntry: HTMLElement | null = null;
  let frame = 0;
  const syncFromScroll = () => {
    if (pointerEntry) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const middle = window.innerHeight / 2;
      let nearest: HTMLElement | null = null;
      let nearestDistance = Number.POSITIVE_INFINITY;
      entries.forEach((entry) => {
        const rect = entry.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - middle);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = entry;
        }
      });
      if (nearest) applyActive(nearest);
    });
  };

  window.addEventListener('scroll', syncFromScroll, { passive: true });
  window.addEventListener('resize', syncFromScroll);
  syncFromScroll();

  const context = gsap.context(() => {
    // One shared motion signature; four different entrances.
    const duration = 0.7;
    const ease = 'power3.out';
    entries.forEach((entry, index) => {
      // The reveal targets the inner block, never the entry itself: an inline
      // opacity left on the entry would override the CSS dim-the-rest rule.
      const inner = entry.querySelector<HTMLElement>('[data-service-inner]');
      if (!inner) return;
      const from: gsap.TweenVars = { duration, ease, opacity: 0 };
      switch (index % 4) {
        case 0:
          from.x = -26;
          break;
        case 1:
          from.clipPath = 'inset(0 0 100% 0)';
          break;
        case 2:
          from.scale = 0.96;
          from.transformOrigin = '0% 50%';
          break;
        default:
          from.clipPath = 'inset(0 100% 0 0)';
          from.x = 18;
          break;
      }
      gsap.from(inner, {
        ...from,
        scrollTrigger: { trigger: entry, start: 'top 86%', once: true },
      });
    });
  }, section);

  const matchMedia = gsap.matchMedia();
  matchMedia.add(
    '(min-width: 64.01rem) and (hover: hover) and (pointer: fine)',
    () => {
      const onEnter = (event: PointerEvent) => {
        const entry = (event.currentTarget as HTMLElement) ?? null;
        pointerEntry = entry;
        section.dataset.servicesEngaged = 'true';
        applyActive(entry);
      };
      const onLeave = () => {
        pointerEntry = null;
        delete section.dataset.servicesEngaged;
        syncFromScroll();
      };
      entries.forEach((entry) => {
        entry.addEventListener('pointerenter', onEnter);
        entry.addEventListener('pointerleave', onLeave);
      });
      return () => {
        entries.forEach((entry) => {
          entry.removeEventListener('pointerenter', onEnter);
          entry.removeEventListener('pointerleave', onLeave);
        });
        pointerEntry = null;
        delete section.dataset.servicesEngaged;
      };
    },
  );

  return () => {
    matchMedia.revert();
    context.revert();
    window.removeEventListener('scroll', syncFromScroll);
    window.removeEventListener('resize', syncFromScroll);
    cancelAnimationFrame(frame);
    entries.forEach((entry) => delete entry.dataset.serviceActive);
    delete section.dataset.servicesEngaged;
  };
}
