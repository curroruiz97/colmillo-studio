import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { mountServicesSequence } from './ServicesSequence';

type SequenceLoader = () => Promise<{
  mountServicesSequence: typeof mountServicesSequence;
}>;

/** Where the section becomes a sequence; mirrors `services-section.css`. */
const SEQUENCE_QUERY =
  '(min-width: 64.01rem) and (min-height: 40rem) and (prefers-reduced-motion: no-preference)';
const LINEAR_QUERY = '(max-width: 64rem), (max-height: 39.99rem)';

/**
 * Home services motion. `MotionController` owns its lifecycle here.
 *
 * On a wide screen with motion allowed the section switches to its sequence
 * layout (`data-services-enhanced`: a tall track with one sticky stage)
 * synchronously, so every trigger below it is measured against the final
 * height on the first refresh and nothing shifts when the timeline arrives.
 * The timeline itself (`ServicesSequence.ts`) is a separate chunk whose
 * dynamic import lives in the section's own script, keeping it and Vite's
 * import helper out of the shared motion bundle, which sits at its budget.
 * If the chunk cannot load, the section falls back to its linear layout.
 *
 * Everywhere else the list is linear and each entry simply arrives once.
 * Reduced motion gets the finished composition with no reveal at all.
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

  if (document.documentElement.dataset.motion === 'reduced') {
    return () => undefined;
  }

  const load: unknown = Reflect.get(section, 'loadServicesSequence');
  const media = gsap.matchMedia();

  if (typeof load === 'function') {
    media.add(SEQUENCE_QUERY, () => {
      section.dataset.servicesEnhanced = 'true';
      let disposed = false;
      let cleanup: (() => void) | undefined;
      void (load as SequenceLoader)()
        .then((sequence) => {
          if (!disposed) {
            cleanup = sequence.mountServicesSequence(section, entries, gsap);
          }
        })
        .catch(() => {
          // Without its timeline the stage would stack every service in one
          // place, so the section goes back to reading as a list.
          if (disposed) return;
          delete section.dataset.servicesEnhanced;
          ScrollTrigger.refresh();
        });

      return () => {
        disposed = true;
        cleanup?.();
        delete section.dataset.servicesEnhanced;
      };
    });
  }

  // Linear layout: each entry arrives once, as it comes into view, and is then
  // left alone. One trigger per entry, never a measurement of the whole list.
  media.add(LINEAR_QUERY, () => {
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
  });

  return () => {
    media.revert();
  };
}
