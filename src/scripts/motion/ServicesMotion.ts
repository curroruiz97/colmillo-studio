import gsap from 'gsap';

/**
 * Services reveal.
 *
 * The calmest motion on the home page, by design: no pinning, no scrubbing, no
 * scroll-driven state and no dimming. Each entry simply arrives once, with a
 * short offset and a shared ease, and is then left alone. Every pointer
 * response lives in CSS, so keyboard and touch keep the full composition and
 * nothing here can hide content.
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

  // Reduced motion gets the finished composition, immediately.
  if (document.documentElement.dataset.motion === 'reduced') {
    return () => undefined;
  }

  const context = gsap.context(() => {
    // One trigger per entry, the same shape the editorial reveals use: each
    // vignette arrives as it comes into view instead of the whole block
    // depending on a single measurement of a section taller than the screen.
    entries.forEach((entry) => {
      gsap.from(entry, {
        opacity: 0,
        y: 22,
        duration: 0.62,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: entry,
          start: 'top 88%',
          once: true,
        },
      });
    });
  }, section);

  return () => {
    context.revert();
  };
}
