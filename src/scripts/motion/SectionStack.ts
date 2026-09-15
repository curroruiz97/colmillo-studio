import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Where `layout.css` makes a stack layer sticky. */
const STICKY_QUERY = '(min-width: 64.01rem) and (min-height: 40rem)';

/*
 * The reveal band is 7% of the screen, never of the layer. A percentage inset
 * resolves against the layer's own height, so on the manifesto (a track more
 * than five screens tall) it clipped ~340px and cut its first word as it
 * entered. On every layer that is exactly one screen tall the band is the same.
 */
const bandTop = (section: HTMLElement) =>
  Math.round(Math.min(section.offsetHeight, window.innerHeight) * 0.07);

export function initSectionStack(): () => void {
  const sections = gsap.utils.toArray<HTMLElement>('[data-stack-section]');
  if (sections.length < 2) return () => undefined;
  sections.forEach((section, index) => {
    section.style.setProperty('--stack-index', String(index + 1));
    section.dataset.stackReady = 'true';
  });
  if (document.documentElement.dataset.motion === 'reduced') {
    return () => {
      sections.forEach((section) => delete section.dataset.stackReady);
    };
  }

  const context = gsap.context(() => {
    sections.forEach((section, index) => {
      // Both ends share one shape, so every value interpolates in pairs.
      gsap.fromTo(
        section,
        {
          clipPath: () =>
            `inset(${bandTop(section)}px 2.5% 0px round 5rem 5rem 0rem 0rem)`,
          borderRadius: '5rem 5rem 0 0',
        },
        {
          clipPath: 'inset(0px 0% 0px round 0rem 0rem 0rem 0rem)',
          borderRadius: '0rem',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 92%',
            end: 'top 38%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );

      const nextSection = sections[index + 1];
      // A layer names what compresses with `data-stack-content`; the home
      // sections use their `.content-shell`.
      const content = section.querySelector<HTMLElement>(
        '[data-stack-content], .content-shell',
      );
      if (nextSection && content) {
        gsap.to(content, {
          yPercent: -1.8,
          scale: 0.972,
          opacity: 0.84,
          transformOrigin: '50% 0%',
          ease: 'none',
          scrollTrigger: {
            trigger: nextSection,
            start: 'top 96%',
            end: 'top 8%',
            scrub: 0.6,
          },
        });
      }
    });
  });

  /*
   * A sticky layer stays stuck at the top of `main` until the page ends, so it
   * sits behind everything that follows it. When the section right after it is
   * not sticky (the pinned project rail, the goodbye stage), that section
   * scrolls away and the NEXT one opens its rounded band straight onto the old
   * layer: the services ink showed between the white rail and Studio, and
   * Studio showed through the top of Contacto.
   *
   * So a layer is released back into the flow once the section after it covers
   * the whole screen. Sticky and relative take the same room, so nothing
   * shifts, and at that moment the layer is entirely covered, so the switch is
   * invisible; scrolling back re-sticks it before it can be seen. It is not
   * hidden: it stays in the accessibility tree and focusable.
   */
  const release = gsap.matchMedia();
  release.add(STICKY_QUERY, () => {
    const triggers = sections.flatMap((section) => {
      const next = section.nextElementSibling;
      if (!(next instanceof HTMLElement)) return [];
      if (getComputedStyle(section).position !== 'sticky') return [];
      if (getComputedStyle(next).position === 'sticky') return [];
      const set = (released: boolean) => {
        if (released) section.dataset.stackReleased = 'true';
        else delete section.dataset.stackReleased;
      };
      return ScrollTrigger.create({
        trigger: next,
        start: 'top top',
        end: 'max',
        // Past `max` is still covered: only going back above `start` re-sticks.
        onToggle: (self) => set(self.progress > 0),
        onRefresh: (self) => set(self.progress > 0),
      });
    });
    return () => {
      triggers.forEach((trigger) => trigger.kill());
      sections.forEach((section) => delete section.dataset.stackReleased);
    };
  });

  return () => {
    release.revert();
    context.revert();
    sections.forEach((section) => delete section.dataset.stackReady);
  };
}
