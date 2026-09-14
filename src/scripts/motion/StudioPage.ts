import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bindPressSurface, canPress } from './PressSurface';
import type { mountStudioPage } from './StudioPageMotion';

type StudioPageLoader = () => Promise<{
  mountStudioPage: typeof mountStudioPage;
}>;

/**
 * Mounts the `/studio/` motion. `MotionController` owns its lifecycle through
 * this function, like every other module.
 *
 * The motion itself is a separate chunk (`StudioPageMotion.ts`), and the
 * dynamic import that loads it lives in the page's own script
 * (`src/pages/studio.astro`), which hands the loader over on the page element.
 * That keeps Vite's import helper and the chunk out of the shared motion
 * bundle, which sits at its 150 KB budget. GSAP and the press geometry are
 * passed in rather than imported, so they stay in that bundle alone.
 *
 * The page is complete without any of this: no loader, or a chunk that fails
 * to load, leaves every principle listed with its picture and every portrait
 * still. The hero's entrance is CSS and never waits for the chunk.
 */
export function initStudioPage(): () => void {
  const page = document.querySelector<HTMLElement>('[data-studio-page]');
  const load: unknown = page && Reflect.get(page, 'loadStudioPage');
  if (!page || typeof load !== 'function') return () => undefined;

  let disposed = false;
  let cleanup: (() => void) | undefined;
  void (load as StudioPageLoader)()
    .then((motion) => {
      if (!disposed) {
        cleanup = motion.mountStudioPage(page, {
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
