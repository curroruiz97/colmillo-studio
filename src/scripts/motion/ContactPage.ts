import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { mountContactPage } from './ContactPageMotion';

type ContactPageLoader = () => Promise<{
  mountContactPage: typeof mountContactPage;
}>;

/**
 * Mounts the `/contacto/` behaviour. `MotionController` owns its lifecycle
 * through this function, like every other module.
 *
 * The behaviour itself is a separate chunk (`ContactPageMotion.ts`), and the
 * dynamic import that loads it lives in the route's own script
 * (`src/pages/contacto.astro`), which hands the loader over on the page
 * element. That keeps Vite's import helper and the chunk out of the shared
 * motion bundle, which sits at its 150 KB budget. GSAP and ScrollTrigger are
 * passed in rather than imported, so they stay in that bundle alone.
 *
 * The page is complete without any of this: no loader, or a chunk that fails
 * to load, still leaves the hero drawn and entering (its entrance is CSS), the
 * white sheet rising over it (sticky layout) and a working form — the browser
 * then validates it natively and hands it to the visitor's mail client through
 * the form's own `action`.
 */
export function initContactPage(): () => void {
  const page = document.querySelector<HTMLElement>('[data-contact-page]');
  const load: unknown = page && Reflect.get(page, 'loadContactPage');
  if (!page || typeof load !== 'function') return () => undefined;

  let disposed = false;
  let cleanup: (() => void) | undefined;
  void (load as ContactPageLoader)()
    .then((motion) => {
      if (!disposed) {
        cleanup = motion.mountContactPage(page, { gsap, ScrollTrigger });
      }
    })
    .catch(() => undefined);

  return () => {
    disposed = true;
    cleanup?.();
  };
}
