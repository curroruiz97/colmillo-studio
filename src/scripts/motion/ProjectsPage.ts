import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bindPressSurface, canPress } from './PressSurface';
import type { mountProjectsPage } from './ProjectsPageMotion';

type ProjectsPageLoader = () => Promise<{
  mountProjectsPage: typeof mountProjectsPage;
}>;

/**
 * Mounts the `/proyectos/` behaviour. `MotionController` owns its lifecycle
 * through this function, like every other module.
 *
 * The behaviour itself is a separate chunk (`ProjectsPageMotion.ts`), and the
 * dynamic import that loads it lives in the route's own script
 * (`src/pages/proyectos/index.astro`), which hands the loader over on the
 * page element. That keeps Vite's import helper and the chunk out of the
 * shared motion bundle, which sits at its 150 KB budget. GSAP and the press
 * geometry are passed in rather than imported, so they stay in that bundle
 * alone.
 *
 * The archive is complete without any of this: no loader, or a chunk that
 * fails to load, leaves every piece listed, linked and still, with no filter
 * offered. The hero's entrance is CSS and never waits for the chunk.
 */
export function initProjectsPage(): () => void {
  const page = document.querySelector<HTMLElement>('[data-projects-page]');
  const load: unknown = page && Reflect.get(page, 'loadProjectsPage');
  if (!page || typeof load !== 'function') return () => undefined;

  let disposed = false;
  let cleanup: (() => void) | undefined;
  void (load as ProjectsPageLoader)()
    .then((motion) => {
      if (!disposed) {
        cleanup = motion.mountProjectsPage(page, {
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
