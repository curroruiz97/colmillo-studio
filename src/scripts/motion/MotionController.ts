import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCustomCursor } from './CustomCursor';
import { initEdgeMenu } from './EdgeMenu';
import { initEditorialMotion } from './EditorialMotion';
import { initHeroMotion } from './HeroMotion';
import { initHorizontalProjects } from './HorizontalProjects';
import { initInstagramBadge } from './InstagramBadge';
import { initMagneticElements } from './MagneticElements';
import { initManifestoMotion } from './ManifestoMotion';
import { initMotionPreference } from './MotionPreference';
import { initSectionStack } from './SectionStack';
import { initServicesMotion } from './ServicesMotion';
import { initSurfaceTone } from './SurfaceTone';

gsap.registerPlugin(ScrollTrigger);

let cleanupCurrent: (() => void) | null = null;

export function initMotion(): void {
  cleanupCurrent?.();

  const cleanupPreference = initMotionPreference();
  const startEnhancements = () => [
    initCustomCursor(),
    initEditorialMotion(),
    initManifestoMotion(),
    initHeroMotion(),
    initSurfaceTone(),
    // Before the menu: it reads the badge's compact band as its exclusion zone.
    initInstagramBadge(),
    initEdgeMenu(),
    initSectionStack(),
    initServicesMotion(),
    initHorizontalProjects(),
    initMagneticElements(),
  ];

  let enhancements = startEnhancements();
  const restart = () => {
    enhancements.forEach((cleanup) => cleanup());
    enhancements = startEnhancements();
    ScrollTrigger.refresh();
  };
  window.addEventListener('colmillo:motionchange', restart);

  cleanupCurrent = () => {
    window.removeEventListener('colmillo:motionchange', restart);
    enhancements.forEach((cleanup) => cleanup());
    cleanupPreference();
  };
}
