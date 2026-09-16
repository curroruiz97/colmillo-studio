import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCaseStudyPage } from './CaseStudyPage';
import { initContactBite } from './ContactBite';
import { initContactPage } from './ContactPage';
import { initCustomCursor } from './CustomCursor';
import { initEdgeMenu } from './EdgeMenu';
import { initEditorialMotion } from './EditorialMotion';
import { initGoodbyePanorama } from './GoodbyePanorama';
import { initHeroMotion } from './HeroMotion';
import { initHomeIntro } from './HomeIntro';
import { initHorizontalProjects } from './HorizontalProjects';
import { initInstagramBadge } from './InstagramBadge';
import { initMagneticElements } from './MagneticElements';
import { initManifestoMotion } from './ManifestoMotion';
import { initMotionPreference } from './MotionPreference';
import { initProjectTilePress } from './ProjectTilePress';
import { initProjectsPage } from './ProjectsPage';
import { initSectionStack } from './SectionStack';
import { initServicesMotion } from './ServicesMotion';
import { initServicesPage } from './ServicesPage';
import { initStudioMotion } from './StudioMotion';
import { initStudioPage } from './StudioPage';
import { initSurfaceTone } from './SurfaceTone';

gsap.registerPlugin(ScrollTrigger);

let cleanupCurrent: (() => void) | null = null;

export function initMotion(): void {
  cleanupCurrent?.();

  const cleanupPreference = initMotionPreference();
  // Once per document, before the hero reads its hold, and never restarted by
  // a motion preference change.
  const cleanupIntro = initHomeIntro();
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
    initProjectTilePress(),
    initStudioMotion(),
    initStudioPage(),
    initServicesPage(),
    initProjectsPage(),
    initContactPage(),
    initCaseStudyPage(),
    initGoodbyePanorama(),
    initContactBite(),
    initMagneticElements(),
  ];

  /*
   * Modules create their triggers in module order, not page order: the stack
   * layers are registered before the project rail's pin exists. Refreshing in
   * creation order then measured every section after the rail without the
   * pin's spacing, so Studio, Goodbye and Contacto compressed about one pin
   * length too early. Sorting refreshes them in page order, pins first.
   */
  let enhancements = startEnhancements();
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  const restart = () => {
    enhancements.forEach((cleanup) => cleanup());
    enhancements = startEnhancements();
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  };
  window.addEventListener('colmillo:motionchange', restart);

  cleanupCurrent = () => {
    window.removeEventListener('colmillo:motionchange', restart);
    enhancements.forEach((cleanup) => cleanup());
    cleanupIntro();
    cleanupPreference();
  };
}
