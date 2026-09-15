import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bindPressSurface, canPress } from './PressSurface';
import type { mountServicesPage } from './ServicesPageMotion';

type ServicesPageLoader = () => Promise<{
  mountServicesPage: typeof mountServicesPage;
}>;

/**
 * Mounts the `/servicios/` motion, exactly as `StudioPage.ts` does for Studio:
 * the chunk (`ServicesPageMotion.ts`) is loaded through the page's own script
 * and receives GSAP and ScrollTrigger, so neither is duplicated and the shared
 * motion bundle stays under its budget.
 *
 * The page is complete without it: the layers stack through
 * `SectionStack.ts` and CSS, and a chunk that fails to load leaves every
 * layer's content simply there.
 */
export function initServicesPage(): () => void {
  const page = document.querySelector<HTMLElement>('[data-services-page]');
  const load: unknown = page && Reflect.get(page, 'loadServicesPage');
  if (!page || typeof load !== 'function') return () => undefined;

  let disposed = false;
  let cleanup: (() => void) | undefined;
  void (load as ServicesPageLoader)()
    .then((motion) => {
      if (!disposed) {
        cleanup = motion.mountServicesPage(page, {
          gsap,
          ScrollTrigger,
          bindPressSurface,
          canPress,
        });
      }
    })
    .catch(() => undefined);

  return () => {
    disposed = true;
    cleanup?.();
  };
}
