import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { mountContactBite } from './ContactBiteMotion';

type ContactBiteLoader = () => Promise<{
  mountContactBite: typeof mountContactBite;
}>;

/**
 * Mounts the home contact close ("la última mordida"). `MotionController`
 * owns its lifecycle through this function, like every other module.
 *
 * The motion itself is a separate chunk, and the dynamic import that loads it
 * lives in the section's own script (`ContactSection.astro`), which hands the
 * loader over on the section element. That keeps Vite's import helper and the
 * chunk out of the shared motion bundle, which sits at its 150 KB budget, and
 * GSAP is passed in rather than imported, so it stays in that bundle alone.
 *
 * The section is complete without any of this: no loader, or a chunk that
 * fails to load, leaves the still poster.
 */
export function initContactBite(): () => void {
  const section = document.querySelector<HTMLElement>('[data-contact-bite]');
  const load: unknown = section && Reflect.get(section, 'loadContactBite');
  if (!section || typeof load !== 'function') return () => undefined;

  let disposed = false;
  let cleanup: (() => void) | undefined;
  void (load as ContactBiteLoader)()
    .then((motion) => {
      if (!disposed) {
        cleanup = motion.mountContactBite(section, { gsap, ScrollTrigger });
      }
    })
    .catch(() => undefined);

  return () => {
    disposed = true;
    cleanup?.();
  };
}
