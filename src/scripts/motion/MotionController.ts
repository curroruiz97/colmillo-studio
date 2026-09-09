import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCustomCursor } from './CustomCursor';
import { initEditorialMotion } from './EditorialMotion';
import { initHeroMotion } from './HeroMotion';
import { initHorizontalProjects } from './HorizontalProjects';
import { initMagneticElements } from './MagneticElements';
import { initManifestoMotion } from './ManifestoMotion';
import { initMotionPreference } from './MotionPreference';
import { initSectionStack } from './SectionStack';
import { initServicesMotion } from './ServicesMotion';
import { initSideMenu } from './SideMenu';
import { initStickyHeader } from './StickyHeader';
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
    initStickyHeader(),
    initSurfaceTone(),
    initSideMenu(),
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
