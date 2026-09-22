import type { gsap as GsapCore } from 'gsap';
import type { ScrollTrigger as ScrollTriggerClass } from 'gsap/ScrollTrigger';
import type { bindPressSurface, canPress } from './PressSurface';
import { playLoop, stopLoop } from './VideoLoop';

/**
 * The shared tools, handed over by `ProjectsPage.ts`. This chunk imports them
 * for their types only, so GSAP, ScrollTrigger and the press geometry stay in
 * the shared motion bundle alone and are never duplicated into a chunk.
 */
export interface ProjectsPageTools {
  gsap: typeof GsapCore;
  ScrollTrigger: typeof ScrollTriggerClass;
  bindPressSurface: typeof bindPressSurface;
  canPress: typeof canPress;
}

const none = () => undefined;

/** How long a piece takes to leave, and to arrive after the grid repacks. */
const OUT_MS = 0.16;
const MOVE_MS = 0.42;
const IN_MS = 0.28;

/**
 * /proyectos/ — the archive's behaviour, loaded only on this route.
 *
 * - The hero's entrance is CSS (`projects-page.css`), so it starts with the
 *   first paint; here the hero loop (once supplied) only plays while it is on
 *   screen in a visible tab.
 * - The category filter. It is published by this chunk — the row is hidden
 *   until `data-filters-ready` — because it cannot work without it: a page
 *   with no JavaScript shows the complete archive instead of a dead control.
 *   Filtering hides the pieces that do not match, lets CSS Grid repack the
 *   masonry, and plays the change as one short movement (see `applyFilter`).
 * - Quiet reveals as each piece enters the viewport, and the same for the
 *   close: a few pixels of travel and a fade, once, never a parallax.
 * - The same pressure dent as the home rail and the Studio portraits
 *   (`PressSurface.ts`), on a fine pointer only.
 *
 * No pin, no scroll-linked movement and no permanent loop. Every listener,
 * observer, tween and ScrollTrigger is released by the returned cleanup, which
 * `MotionController` runs before a motion-preference restart.
 *
 * Reduced motion keeps the whole archive and a working filter; the change is
 * then instant, the reveals do not run and the dent is off.
 */
export function mountProjectsPage(
  page: HTMLElement,
  tools: ProjectsPageTools,
): () => void {
  const reduced = document.documentElement.dataset.motion === 'reduced';
  const cleanups = [
    initHeroLoop(page, reduced),
    initReveals(page, reduced, tools),
    initPress(page, tools),
    initStickyState(page),
    initFilter(page, reduced, tools),
  ];

  return () => cleanups.forEach((cleanup) => cleanup());
}

/* ----------------------------------------------------------------- hero --- */

/**
 * The loop plays only while it is on screen in a visible tab, and never under
 * reduced motion, where its poster is the whole picture.
 */
function initHeroLoop(page: HTMLElement, reduced: boolean): () => void {
  const video = page.querySelector<HTMLVideoElement>(
    '[data-projects-hero] [data-page-video]',
  );
  if (!video) return none;

  let visible = false;
  const sync = () => {
    if (!reduced && visible && !document.hidden) playLoop(video);
    else stopLoop(video);
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = Boolean(entry?.isIntersecting);
    sync();
  });
  observer.observe(video);
  document.addEventListener('visibilitychange', sync);
  sync();

  return () => {
    document.removeEventListener('visibilitychange', sync);
    observer.disconnect();
    stopLoop(video);
  };
}

/* -------------------------------------------------------------- reveals --- */

/**
 * Each piece settles upwards a few pixels as it enters, once; the close does
 * the same. The tween runs on the card inside the item, never on the grid
 * item itself, because the filter moves that one — the two can then play at
 * the same time without writing over each other.
 */
function initReveals(
  page: HTMLElement,
  reduced: boolean,
  { gsap }: ProjectsPageTools,
): () => void {
  if (reduced) return none;

  const context = gsap.context(() => {
    gsap.utils
      .toArray<HTMLElement>('[data-project-item] > .projects-card')
      .forEach((card) => {
        gsap.from(card, {
          y: 26,
          scale: 0.985,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 92%', once: true },
        });
      });

    gsap.utils
      .toArray<HTMLElement>('[data-projects-reveal]')
      .forEach((element, index) => {
        gsap.from(element, {
          y: 22,
          opacity: 0,
          duration: 0.7,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });
  }, page);

  return () => context.revert();
}

/* ---------------------------------------------------------------- press --- */

/**
 * The archive's pieces give under a fine pointer, with the geometry the home
 * rail and the Studio portraits already use. Touch, coarse pointers, keyboard
 * and reduced motion keep the still picture (`canPress()`).
 */
function initPress(
  page: HTMLElement,
  { bindPressSurface, canPress }: ProjectsPageTools,
): () => void {
  if (!canPress()) return none;

  const releases = Array.from(
    page.querySelectorAll<HTMLElement>('[data-project-item] .projects-card'),
    (card) => {
      const frame = card.querySelector<HTMLElement>('[data-press-frame]');
      const surface = card.querySelector<HTMLElement>('[data-press-surface]');
      return frame && surface ? bindPressSurface(card, surface, frame) : none;
    },
  );

  return () => releases.forEach((release) => release());
}

/* --------------------------------------------------------------- sticky --- */

/**
 * Whether the filter band is stuck to the top of the screen. A sentinel just
 * above it leaves the viewport exactly then, so the hairline under the band
 * is drawn without measuring anything on scroll.
 */
function initStickyState(page: HTMLElement): () => void {
  const filters = page.querySelector<HTMLElement>('[data-projects-filters]');
  const sentinel = page.querySelector<HTMLElement>('[data-filters-sentinel]');
  if (!filters || !sentinel) return none;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) delete filters.dataset.stuck;
      else filters.dataset.stuck = 'true';
    },
    { threshold: 0 },
  );
  observer.observe(sentinel);

  return () => {
    observer.disconnect();
    delete filters.dataset.stuck;
  };
}

/* --------------------------------------------------------------- filter --- */

/**
 * The category filter.
 *
 * A piece belongs to every category it declares, so the test is membership
 * and never a rule written per project. Hiding a piece with `hidden` takes it
 * out of the flow, and CSS Grid repacks the masonry by itself; this only
 * plays the change:
 *
 *   1. the pieces that leave fade out where they are;
 *   2. the grid repacks, and every piece that stays is carried from where it
 *      was to where it now is (its two boxes are measured either side of the
 *      change, so the layout is never animated, only the offset between two
 *      settled states);
 *   3. the pieces that arrive fade in.
 *
 * About half a second in all. Reduced motion changes the set with no movement
 * at all. Only the grid items are moved here; their cards carry the entrance
 * reveal, so the two never write to the same element.
 */
function initFilter(
  page: HTMLElement,
  reduced: boolean,
  { gsap, ScrollTrigger }: ProjectsPageTools,
): () => void {
  const grid = page.querySelector<HTMLElement>('[data-projects-grid]');
  const buttons = [
    ...page.querySelectorAll<HTMLButtonElement>('[data-project-filter]'),
  ];
  if (!grid || buttons.length === 0) return none;

  const items = [...grid.querySelectorAll<HTMLElement>('[data-project-item]')];
  const empty = page.querySelector<HTMLElement>('[data-projects-empty]');
  let current = 'todos';
  let running: ReturnType<typeof GsapCore.timeline> | null = null;

  const matches = (item: HTMLElement, category: string) =>
    category === 'todos' ||
    (item.dataset.categories ?? '').split(' ').includes(category);

  const boxes = () =>
    new Map(
      items
        .filter((item) => !item.hidden)
        .map((item) => [item, item.getBoundingClientRect()] as const),
    );

  const apply = (category: string) => {
    if (category === current) return;
    current = category;
    buttons.forEach((button) => {
      button.setAttribute(
        'aria-pressed',
        button.dataset.projectFilter === category ? 'true' : 'false',
      );
    });

    const before = reduced ? null : boxes();
    running?.kill();
    running = null;
    gsap.set(items, { clearProps: 'opacity,transform,visibility' });

    const leaving = items.filter(
      (item) => !item.hidden && !matches(item, category),
    );
    const arriving = items.filter(
      (item) => item.hidden && matches(item, category),
    );

    const settle = () => {
      items.forEach((item) => {
        item.hidden = !matches(item, category);
      });
      if (empty) empty.hidden = items.some((item) => !item.hidden);
      // The grid is a different height now, so every trigger below it moved.
      ScrollTrigger.refresh();
    };

    if (reduced || !before) {
      settle();
      return;
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(items, { clearProps: 'opacity,transform' });
        running = null;
      },
    });
    running = timeline;

    if (leaving.length > 0) {
      timeline.to(leaving, {
        opacity: 0,
        scale: 0.985,
        duration: OUT_MS,
        ease: 'power2.out',
      });
    }

    timeline.add(() => {
      settle();
      const after = boxes();
      const moved: HTMLElement[] = [];
      after.forEach((box, item) => {
        const was = before.get(item);
        if (!was) return;
        const dx = was.left - box.left;
        const dy = was.top - box.top;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
        moved.push(item);
        gsap.fromTo(
          item,
          { x: dx, y: dy },
          { x: 0, y: 0, duration: MOVE_MS, ease: 'power3.out' },
        );
      });
      if (arriving.length > 0) {
        gsap.fromTo(
          arriving,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: IN_MS,
            delay: moved.length > 0 ? MOVE_MS * 0.45 : 0,
            ease: 'power2.out',
            stagger: 0.03,
          },
        );
      }
    });

    // Holds the timeline open while the tweens started above play out.
    timeline.to({}, { duration: MOVE_MS + IN_MS });
  };

  const onClick = (event: Event) => {
    const button = event.currentTarget as HTMLButtonElement;
    apply(button.dataset.projectFilter ?? 'todos');
  };

  buttons.forEach((button) => button.addEventListener('click', onClick));
  // Only now is the control real, so only now is it shown.
  page.dataset.filtersReady = 'true';

  return () => {
    buttons.forEach((button) => button.removeEventListener('click', onClick));
    running?.kill();
    gsap.set(items, { clearProps: 'opacity,transform' });
    items.forEach((item) => {
      item.hidden = false;
    });
    buttons.forEach((button, index) => {
      button.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
    });
    if (empty) empty.hidden = true;
    delete page.dataset.filtersReady;
  };
}
