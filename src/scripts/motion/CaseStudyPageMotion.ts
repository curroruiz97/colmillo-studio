import type { gsap as GsapCore } from 'gsap';
import type { ScrollTrigger as ScrollTriggerClass } from 'gsap/ScrollTrigger';
import type {
  bindPressSurface,
  bitePath,
  canPress,
  Edge,
} from './PressSurface';
import { playLoop, stopLoop } from './VideoLoop';

/**
 * The shared tools, handed over by `CaseStudyPage.ts`. This chunk imports them
 * for their types only, so GSAP, ScrollTrigger and the press geometry stay in
 * the shared motion bundle alone and are never duplicated into a chunk.
 */
export interface CaseStudyTools {
  gsap: typeof GsapCore;
  ScrollTrigger: typeof ScrollTriggerClass;
  bindPressSurface: typeof bindPressSurface;
  canPress: typeof canPress;
  bitePath: typeof bitePath;
}

const none = () => undefined;

/** Which edge each bite reveal is eaten from, in the order they appear. */
const BITE_EDGES: Edge[] = ['bottom', 'left', 'right'];

/**
 * /proyectos/[slug]/ — the case study's behaviour, loaded only on this route.
 *
 * The page is finished before any of this runs. Everything here presents the
 * work; nothing here is required to read it, and each piece is switched off on
 * its own terms — reduced motion, a coarse pointer, a short window.
 *
 * - The hero's entrance is CSS (`case-study.css`), so it starts with the first
 *   paint. This chunk only adds the slow drift behind it, which is what makes
 *   the first screen feel like a camera coming to rest rather than a poster.
 * - Arrivals: each module's lines and pictures settle once as they enter.
 * - The bite reveal: the studio's signature. An organic concave wave — the
 *   same geometry as the pressure dent, through `bitePath()` — uncovers a
 *   picture as it arrives. At most three on a page, budgeted by the renderer.
 * - Pressure: the shared dent under a fine pointer, only where a module asked
 *   for it.
 * - The sticky story, the image sequence, the chapter index with the route's
 *   progress, and the next project growing to the full width.
 *
 * No pin, no scroll interception and no permanent loop. Every listener,
 * observer, tween and ScrollTrigger is released by the returned cleanup, which
 * `MotionController` runs before a motion-preference restart.
 */
export function mountCaseStudy(
  page: HTMLElement,
  tools: CaseStudyTools,
): () => void {
  const reduced = document.documentElement.dataset.motion === 'reduced';

  /*
   * Order matters. The sticky story and the image sequence change the page's
   * height when they take over their layout, so they are mounted first and
   * everything that measures the page is created after them. The refresh at
   * the end settles every trigger against the layout the page actually has:
   * this chunk arrives asynchronously, after `MotionController` has already
   * sorted and refreshed, so nothing else would.
   *
   * Found in QA: without it the bite reveal kept the depth it was created
   * with and the picture stayed behind its own mask.
   */
  const cleanups = [
    initSticky(page, reduced, tools),
    initSequence(page, reduced, tools),
    initVideos(page, reduced),
    initHero(page, reduced, tools),
    initReveals(page, reduced, tools),
    initBite(page, reduced, tools),
    initPress(page, tools),
    initChapters(page, tools),
    initNext(page, reduced, tools),
  ];
  tools.ScrollTrigger.refresh();

  return () => cleanups.forEach((cleanup) => cleanup());
}

/* --------------------------------------------------------------- videos --- */

/**
 * Silent loops play only while they are on screen in a visible tab, and never
 * under reduced motion, where the poster is the whole picture. A video with
 * controls is the visitor's to start and is never touched.
 */
function initVideos(page: HTMLElement, reduced: boolean): () => void {
  const videos = [
    ...page.querySelectorAll<HTMLVideoElement>('[data-cs-video]'),
  ];
  if (videos.length === 0) return none;

  const visible = new WeakMap<Element, boolean>();
  const sync = () => {
    for (const video of videos) {
      if (!reduced && visible.get(video) === true && !document.hidden)
        playLoop(video);
      else stopLoop(video);
    }
  };
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries)
      visible.set(entry.target, entry.isIntersecting);
    sync();
  });
  videos.forEach((video) => observer.observe(video));
  document.addEventListener('visibilitychange', sync);
  sync();

  return () => {
    document.removeEventListener('visibilitychange', sync);
    observer.disconnect();
    videos.forEach((video) => stopLoop(video));
  };
}

/* ----------------------------------------------------------------- hero --- */

/**
 * The cinematic drift. The CSS entrance settles the hero's frame; this moves
 * the picture inside it a few percent across the first screen of scroll, so
 * leaving the hero feels like a camera pulling back rather than a page
 * scrolling. It runs on the asset inside the frame, never on the frame the CSS
 * animation owns, so the two can never fight over one transform.
 */
function initHero(
  page: HTMLElement,
  reduced: boolean,
  { gsap }: CaseStudyTools,
): () => void {
  const hero = page.querySelector<HTMLElement>('[data-cs-hero]');
  const asset = hero?.querySelector<HTMLElement>('.cs-media__asset, .cs-art');
  if (reduced || !hero || !asset) return none;

  const context = gsap.context(() => {
    gsap.fromTo(
      asset,
      { scale: 1 },
      {
        scale: 1.07,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      },
    );
  }, page);

  return () => context.revert();
}

/* -------------------------------------------------------------- reveals --- */

/**
 * Each module arrives once: its lines rise a few pixels in turn and its
 * pictures settle from just below, at `top 86%`. Never a parallax, never a
 * blur, never a second pass. Reduced motion gets one short fade with no
 * travel, so nothing is ever hidden waiting for a scroll that may not come.
 */
function initReveals(
  page: HTMLElement,
  reduced: boolean,
  { gsap }: CaseStudyTools,
): () => void {
  const context = gsap.context(() => {
    page.querySelectorAll<HTMLElement>('[data-cs-reveal]').forEach((block) => {
      const lines = [...block.querySelectorAll<HTMLElement>('[data-cs-line]')];
      const media = [...block.querySelectorAll<HTMLElement>('.cs-media')];
      if (lines.length === 0 && media.length === 0) return;

      const scrollTrigger = { trigger: block, start: 'top 86%', once: true };

      if (reduced) {
        gsap.from([...lines, ...media], {
          opacity: 0,
          duration: 0.45,
          ease: 'none',
          scrollTrigger,
        });
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger,
      });
      if (lines.length > 0)
        timeline.from(
          lines,
          { y: 22, opacity: 0, duration: 0.8, stagger: 0.08 },
          0,
        );
      if (media.length > 0)
        timeline.from(
          media,
          { y: 26, opacity: 0, duration: 0.9, stagger: 0.1 },
          lines.length > 0 ? 0.12 : 0,
        );
    });
  }, page);

  return () => context.revert();
}

/* ----------------------------------------------------------------- bite --- */

/**
 * THE BITE REVEAL — the studio's mark on this route.
 *
 * The picture arrives behind its own surface pushed deep inwards from one
 * edge, and the pressure lets go as the section is crossed. It is literally
 * the archive's pressure dent at the scale of a whole picture
 * (`bitePath()` in `PressSurface.ts`), so the two read as one idea rather than
 * as two effects.
 *
 * It is scroll-linked and reversible, never held, and only the surface is ever
 * clipped: the frame, the grid and the type around it never move. Reduced
 * motion skips it entirely and the picture is simply there.
 */
function initBite(
  page: HTMLElement,
  reduced: boolean,
  { gsap, bitePath }: CaseStudyTools,
): () => void {
  const surfaces = [...page.querySelectorAll<HTMLElement>('[data-cs-bite]')];
  if (reduced || surfaces.length === 0) return none;

  const context = gsap.context(() => {
    surfaces.forEach((surface, index) => {
      const frame = surface.parentElement;
      const section = surface.closest<HTMLElement>('[data-cs-module]');
      if (!frame || !section) return;

      const edge = BITE_EDGES[index % BITE_EDGES.length] ?? 'bottom';
      const box = { width: 0, height: 0, radius: 0, span: 0 };
      const state = { depth: 0 };

      const measure = () => {
        const style = getComputedStyle(surface);
        box.width = parseFloat(style.width) || surface.offsetWidth;
        box.height = parseFloat(style.height) || surface.offsetHeight;
        box.radius =
          parseFloat(getComputedStyle(frame).borderTopLeftRadius) || 0;
        // A wide, soft wave rather than a narrow notch at this scale.
        box.span = Math.max(box.width, box.height) * 0.7;
      };

      /** How deep the wave reaches at the start, capped inside the surface. */
      const full = () => {
        measure();
        return (
          (edge === 'top' || edge === 'bottom' ? box.height : box.width) * 0.96
        );
      };

      const draw = () => {
        surface.style.clipPath =
          state.depth < 0.5
            ? ''
            : `path('${bitePath(box, edge, state.depth)}')`;
      };

      gsap.fromTo(
        state,
        { depth: full },
        {
          depth: 0,
          ease: 'none',
          onUpdate: draw,
          onComplete: draw,
          scrollTrigger: {
            trigger: section,
            start: 'top 92%',
            end: 'top 38%',
            scrub: 0.7,
            invalidateOnRefresh: true,
            onRefresh: measure,
          },
        },
      );
    });
  }, page);

  return () => {
    context.revert();
    surfaces.forEach((surface) => surface.style.removeProperty('clip-path'));
  };
}

/* ---------------------------------------------------------------- press --- */

/**
 * Reactive media: the pieces a project marked `press` give where a fine
 * pointer pushes them, with the archive's own dent. A surface that carries the
 * bite reveal is skipped, because both write the same clip and the reveal owns
 * it. Touch, coarse pointers, keyboard and reduced motion keep the still
 * picture (`canPress()`).
 */
function initPress(
  page: HTMLElement,
  { bindPressSurface, canPress }: CaseStudyTools,
): () => void {
  if (!canPress()) return none;

  const releases = [
    ...page.querySelectorAll<HTMLElement>('[data-press-frame]'),
  ].map((frame) => {
    const surface = frame.querySelector<HTMLElement>('[data-press-surface]');
    if (!surface || surface.hasAttribute('data-cs-bite')) return none;
    return bindPressSurface(frame, surface, frame);
  });

  return () => releases.forEach((release) => release());
}

/* --------------------------------------------------------------- sticky --- */

/**
 * The sticky story. The document always holds the plain sequence of steps,
 * each with its own picture; on a wide screen with motion allowed the block is
 * marked `data-enhanced`, which hands the layout to CSS — one held frame of
 * stacked pictures beside the copy — and a trigger per step says which picture
 * is showing. Nothing is pinned and the scroll is never intercepted.
 */
function initSticky(
  page: HTMLElement,
  reduced: boolean,
  { gsap, ScrollTrigger }: CaseStudyTools,
): () => void {
  const blocks = [...page.querySelectorAll<HTMLElement>('[data-cs-sticky]')];
  if (reduced || blocks.length === 0) return none;

  const media = gsap.matchMedia();
  media.add('(min-width: 64.01rem) and (min-height: 34rem)', () => {
    const triggers: ScrollTriggerClass[] = [];

    for (const block of blocks) {
      const steps = [...block.querySelectorAll<HTMLElement>('[data-cs-step]')];
      const figures = [
        ...block.querySelectorAll<HTMLElement>('[data-cs-figure]'),
      ];
      if (steps.length === 0 || figures.length !== steps.length) continue;

      block.dataset.enhanced = 'true';
      const show = (index: number) => {
        figures.forEach((figure, position) => {
          figure.dataset.state = position === index ? 'active' : 'idle';
        });
      };
      show(0);

      steps.forEach((step, index) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: step,
            start: 'top 55%',
            end: 'bottom 45%',
            onEnter: () => show(index),
            onEnterBack: () => show(index),
          }),
        );
      });
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      for (const block of blocks) {
        delete block.dataset.enhanced;
        block
          .querySelectorAll<HTMLElement>('[data-cs-figure]')
          .forEach((figure) => delete figure.dataset.state);
      }
    };
  });

  return () => media.revert();
}

/* ------------------------------------------------------------- sequence --- */

/**
 * The image sequence: the frames are stacked and crossfaded by the scroll.
 * Only enhanced does the page fetch anything past the first frame, so a reader
 * who never reaches the module — or who has motion switched off — pays for one
 * picture.
 */
function initSequence(
  page: HTMLElement,
  reduced: boolean,
  { gsap }: CaseStudyTools,
): () => void {
  const blocks = [...page.querySelectorAll<HTMLElement>('[data-cs-sequence]')];
  if (reduced || blocks.length === 0) return none;

  const context = gsap.context(() => {
    for (const block of blocks) {
      const frames = [
        ...block.querySelectorAll<HTMLElement>('[data-cs-frame]'),
      ];
      if (frames.length < 2) continue;
      block.dataset.enhanced = 'true';

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: block,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 0.5,
        },
      });
      frames.slice(1).forEach((frame, index) => {
        timeline.fromTo(
          frame,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          index,
        );
      });
    }
  }, page);

  return () => {
    context.revert();
    blocks.forEach((block) => delete block.dataset.enhanced);
  };
}

/* ------------------------------------------------------------- chapters --- */

/**
 * The internal index. The links are real anchors and work without any of this;
 * the chunk only moves the accent mark down the rail with the page's progress
 * and marks the chapter currently on screen.
 */
function initChapters(
  page: HTMLElement,
  { gsap, ScrollTrigger }: CaseStudyTools,
): () => void {
  const nav = page.querySelector<HTMLElement>('[data-cs-chapters]');
  if (!nav) return none;

  const sections = [...page.querySelectorAll<HTMLElement>('[data-cs-chapter]')];
  const triggers: ScrollTriggerClass[] = [];

  const progress = ScrollTrigger.create({
    trigger: page,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      nav.style.setProperty('--cs-progress', self.progress.toFixed(3));
    },
  });
  triggers.push(progress);

  for (const section of sections) {
    const id = section.dataset.csChapter;
    const link = id
      ? nav.querySelector<HTMLElement>(`[data-cs-chapter-link="${id}"]`)
      : null;
    if (!link) continue;
    const mark = (on: boolean) => {
      if (on) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    };
    triggers.push(
      ScrollTrigger.create({
        trigger: section,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => mark(self.isActive),
      }),
    );
  }

  return () => {
    triggers.forEach((trigger) => trigger.kill());
    gsap.killTweensOf(nav);
    nav.style.removeProperty('--cs-progress');
    nav
      .querySelectorAll('[data-cs-chapter-link]')
      .forEach((link) => link.removeAttribute('aria-current'));
  };
}

/* ----------------------------------------------------------------- next --- */

/**
 * The next project grows as it is reached: its picture starts held inside the
 * measure and opens to the full width by the time the section is on screen, so
 * the portfolio reads as one continuous piece of work instead of a set of
 * pages. It is one transform on one element, reversible, and its resting state
 * — the state without JavaScript and under reduced motion — is the full-width
 * picture, which is the honest one.
 */
function initNext(
  page: HTMLElement,
  reduced: boolean,
  { gsap }: CaseStudyTools,
): () => void {
  const next = page.querySelector<HTMLElement>('[data-cs-next]');
  const media = next?.querySelector<HTMLElement>('[data-cs-next-media]');
  if (reduced || !next || !media) return none;

  const context = gsap.context(() => {
    gsap.fromTo(
      media,
      { scale: 0.86 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: next,
          start: 'top bottom',
          end: 'top 30%',
          scrub: 0.8,
        },
      },
    );
  }, page);

  return () => context.revert();
}
