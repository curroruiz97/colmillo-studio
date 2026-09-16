import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bindPressSurface, bitePath, canPress } from './PressSurface';
import type { mountCaseStudy } from './CaseStudyPageMotion';

type CaseStudyLoader = () => Promise<{
  mountCaseStudy: typeof mountCaseStudy;
}>;

/**
 * Mounts the `/proyectos/[slug]/` behaviour. `MotionController` owns its
 * lifecycle through this function, like every other module.
 *
 * The behaviour itself is a separate chunk (`CaseStudyPageMotion.ts`), and the
 * dynamic import that loads it lives in the route's own layout
 * (`src/layouts/CaseStudyLayout.astro`), which hands the loader over on the
 * page element. That keeps Vite's import helper and the chunk out of the
 * shared motion bundle, which sits at its 150 KB budget. GSAP, the press
 * geometry and the bite path are passed in rather than imported, so they stay
 * in that bundle alone.
 *
 * Every case study is complete without any of this: no loader, or a chunk that
 * fails to load, leaves the hero, the metadata, every module, the approved
 * prose and the next project readable, linked and still. The hero's entrance
 * is CSS and never waits for the chunk.
 */
export function initCaseStudyPage(): () => void {
  const page = document.querySelector<HTMLElement>('[data-case-study]');
  const load: unknown = page && Reflect.get(page, 'loadCaseStudy');
  if (!page || typeof load !== 'function') return () => undefined;

  let disposed = false;
  let cleanup: (() => void) | undefined;
  void (load as CaseStudyLoader)()
    .then((motion) => {
      if (!disposed) {
        cleanup = motion.mountCaseStudy(page, {
          gsap,
          ScrollTrigger,
          bindPressSurface,
          canPress,
          bitePath,
        });
      }
    })
    .catch(() => undefined);

  return () => {
    disposed = true;
    cleanup?.();
  };
}
