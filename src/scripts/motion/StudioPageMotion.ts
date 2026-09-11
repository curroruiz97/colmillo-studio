import type { gsap as GsapCore } from 'gsap';
import type { bindPressSurface, canPress } from './PressSurface';

/**
 * The shared tools, handed over by `StudioPage.ts`. This chunk imports them
 * for their types only, so GSAP and the press geometry stay in the shared
 * motion bundle alone and are never duplicated or split into a chunk.
 */
export interface StudioPageTools {
  gsap: typeof GsapCore;
  bindPressSurface: typeof bindPressSurface;
  canPress: typeof canPress;
}

const none = () => undefined;

/** How far the principles picture drifts with the pointer, in CSS pixels. */
const DRIFT_X = 12;
const DRIFT_Y = 9;

/**
 * /studio/ — the page's motion, loaded only on this route.
 *
 * - The hero's entrance is CSS (`studio-page.css`), so it starts with the
 *   first paint and never waits for this chunk; here the hero loop (once
 *   supplied) only plays on screen in a visible tab.
 * - Quiet reveals: headline lines rise out of their own clips and text
 *   settles in, once, on entry; team portraits appear progressively.
 * - Interaction: the principles respond to hover, focus, tap and keys, and a
 *   team portrait gives where a fine pointer presses it.
 *
 * No pin, no scrub, no parallax and no permanent loop. Every listener,
 * observer, tween and ScrollTrigger is released by the returned cleanup, which
 * `MotionController` runs before a motion-preference restart.
 *
 * Reduced motion keeps every piece of content and all of the principles'
 * interaction; reveals become a short opacity fade, the hero loop rests on its
 * poster, and the drift and the dent are off.
 */
export function mountStudioPage(
  page: HTMLElement,
  tools: StudioPageTools,
): () => void {
  const reduced = document.documentElement.dataset.motion === 'reduced';
  const cleanups = [
    initHeroLoop(page, reduced),
    initReveals(page, reduced, tools),
    ...Array.from(
      page.querySelectorAll<HTMLElement>('[data-principles]'),
      (root) => initPrinciples(root, reduced, tools),
    ),
    initTeam(page, reduced, tools),
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
    '[data-studio-hero-video]',
  );
  if (!video) return none;

  let visible = false;
  const sync = () => {
    if (!reduced && visible && !document.hidden)
      void video.play().catch(() => undefined);
    else video.pause();
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
    video.pause();
  };
}

/* -------------------------------------------------------------- reveals --- */

/**
 * `[data-reveal-group]`: its `[data-reveal-line]` children rise out of their
 * `.studio-line` clip, then its `[data-reveal-fade]` children settle in.
 */
function initReveals(
  page: HTMLElement,
  reduced: boolean,
  { gsap }: StudioPageTools,
): () => void {
  const context = gsap.context(() => {
    page
      .querySelectorAll<HTMLElement>('[data-reveal-group]')
      .forEach((group) => {
        const lines = [
          ...group.querySelectorAll<HTMLElement>('[data-reveal-line]'),
        ];
        const fades = [
          ...group.querySelectorAll<HTMLElement>('[data-reveal-fade]'),
        ];
        if (lines.length + fades.length === 0) return;

        if (reduced) {
          gsap.from([...lines, ...fades], {
            opacity: 0,
            duration: 0.45,
            ease: 'none',
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          });
          return;
        }

        const timeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: group, start: 'top 78%', once: true },
        });
        if (lines.length)
          timeline.from(lines, {
            yPercent: 108,
            duration: 0.95,
            stagger: 0.09,
          });
        if (fades.length)
          timeline.from(
            fades,
            { y: 18, opacity: 0, duration: 0.75, stagger: 0.1 },
            lines.length ? 0.3 : 0,
          );
      });
  }, page);

  return () => context.revert();
}

/* ----------------------------------------------------------- principles --- */

/**
 * Upgrades the principles' table of contents into a vertical tab list.
 *
 * Selecting: hover with a mouse or pen, keyboard focus, click or tap, and
 * ArrowUp/ArrowDown (also Left/Right), Home and End inside the list. The
 * selection stays on the last principle chosen, so the stage is never empty.
 *
 * Panels are painted in three states: `active` (on top, its picture clipped
 * in from the foot), `previous` (the picture being covered, held full until
 * the next change) and `idle` (hidden). Only the active panel is exposed to
 * assistive technology and focus; the others are `inert`.
 */
function initPrinciples(
  root: HTMLElement,
  reduced: boolean,
  tools: StudioPageTools,
): () => void {
  const list = root.querySelector<HTMLElement>('[data-principles-list]');
  const stage = root.querySelector<HTMLElement>('[data-principles-stage]');
  const items = [
    ...root.querySelectorAll<HTMLElement>('[data-principle-item]'),
  ];
  const triggers = items
    .map((item) =>
      item.querySelector<HTMLAnchorElement>('[data-principle-trigger]'),
    )
    .filter((trigger): trigger is HTMLAnchorElement => trigger !== null);
  const panels = [
    ...root.querySelectorAll<HTMLElement>('[data-principle-panel]'),
  ];
  const count = items.length;
  if (
    !list ||
    !stage ||
    count === 0 ||
    triggers.length !== count ||
    panels.length !== count
  )
    return none;

  // A motion-preference restart keeps the principle that was on stage.
  const stored = Number(root.dataset.activeIndex ?? 0);
  let active =
    Number.isInteger(stored) && stored >= 0 && stored < count ? stored : 0;

  const heading = root.closest('section')?.querySelector('h2');
  root.dataset.enhanced = 'true';
  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-orientation', 'vertical');
  if (heading?.id) list.setAttribute('aria-labelledby', heading.id);
  items.forEach((item) => item.setAttribute('role', 'presentation'));
  triggers.forEach((trigger, index) => {
    trigger.setAttribute('role', 'tab');
    const panel = panels[index];
    if (panel) trigger.setAttribute('aria-controls', panel.id);
  });
  panels.forEach((panel, index) => {
    panel.setAttribute('role', 'tabpanel');
    const trigger = triggers[index];
    if (trigger) panel.setAttribute('aria-labelledby', trigger.id);
    panel.tabIndex = 0;
  });

  const render = (leaving: number) => {
    items.forEach((item, index) =>
      item.toggleAttribute('data-active', index === active),
    );
    triggers.forEach((trigger, index) => {
      trigger.setAttribute('aria-selected', String(index === active));
      trigger.tabIndex = index === active ? 0 : -1;
    });
    panels.forEach((panel, index) => {
      panel.dataset.state =
        index === active ? 'active' : index === leaving ? 'previous' : 'idle';
      panel.inert = index !== active;
    });
    root.dataset.activeIndex = String(active);
  };

  const select = (index: number) => {
    if (index === active) return;
    const leaving = active;
    active = index;
    render(leaving);
  };

  render(-1);

  // In the stacked layout the stage sits under the list; a tap that leaves
  // the new picture off screen brings it in with the least movement.
  const reveal = () => {
    const stageBox = stage.getBoundingClientRect();
    const stacked = stageBox.top >= list.getBoundingClientRect().bottom - 1;
    if (stacked && (stageBox.bottom > window.innerHeight || stageBox.top < 0))
      stage.scrollIntoView({
        block: 'nearest',
        behavior: reduced ? 'auto' : 'smooth',
      });
  };

  const unbind = triggers.map((trigger, index) => {
    const hover = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') select(index);
    };
    const focus = () => select(index);
    const click = (event: MouseEvent) => {
      event.preventDefault();
      select(index);
      reveal();
    };
    trigger.addEventListener('pointerenter', hover);
    trigger.addEventListener('focus', focus);
    trigger.addEventListener('click', click);
    return () => {
      trigger.removeEventListener('pointerenter', hover);
      trigger.removeEventListener('focus', focus);
      trigger.removeEventListener('click', click);
    };
  });

  const keys = (event: KeyboardEvent) => {
    const targets: Partial<Record<string, number>> = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: count - 1,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    const index = (target + count) % count;
    select(index);
    triggers[index]?.focus();
  };
  list.addEventListener('keydown', keys);

  const stopDrift = reduced ? none : drift(root, stage, tools);

  return () => {
    unbind.forEach((cleanup) => cleanup());
    list.removeEventListener('keydown', keys);
    stopDrift();
    delete root.dataset.enhanced;
    list.removeAttribute('role');
    list.removeAttribute('aria-orientation');
    list.removeAttribute('aria-labelledby');
    items.forEach((item) => item.removeAttribute('role'));
    triggers.forEach((trigger) => {
      for (const name of ['role', 'aria-controls', 'aria-selected', 'tabindex'])
        trigger.removeAttribute(name);
    });
    panels.forEach((panel) => {
      for (const name of ['role', 'aria-labelledby', 'tabindex'])
        panel.removeAttribute(name);
      panel.inert = false;
    });
  };
}

/**
 * The stage's pictures lean a few pixels towards a fine pointer over the
 * section. It is a translation only — no tilt, no scale — written as two
 * custom properties from `gsap.quickTo`s on the shared ticker, so no loop of
 * its own runs. The section's box is read once per entry and after a scroll.
 */
function drift(
  root: HTMLElement,
  stage: HTMLElement,
  { gsap }: StudioPageTools,
): () => void {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches)
    return none;

  const offset = { x: 0, y: 0 };
  const paint = () => {
    stage.style.setProperty('--drift-x', `${offset.x.toFixed(2)}px`);
    stage.style.setProperty('--drift-y', `${offset.y.toFixed(2)}px`);
  };
  const vars = { duration: 0.9, ease: 'power3.out', onUpdate: paint };
  const toX = gsap.quickTo(offset, 'x', vars);
  const toY = gsap.quickTo(offset, 'y', vars);

  let bounds: DOMRect | null = null;
  const move = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    bounds ??= root.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    toX(Math.max(-0.5, Math.min(0.5, x)) * 2 * DRIFT_X);
    toY(Math.max(-0.5, Math.min(0.5, y)) * 2 * DRIFT_Y);
  };
  const forget = () => {
    bounds = null;
  };
  const leave = () => {
    bounds = null;
    toX(0);
    toY(0);
  };

  root.addEventListener('pointermove', move, { passive: true });
  root.addEventListener('pointerleave', leave);
  window.addEventListener('scroll', forget, { passive: true });
  window.addEventListener('resize', forget);

  return () => {
    root.removeEventListener('pointermove', move);
    root.removeEventListener('pointerleave', leave);
    window.removeEventListener('scroll', forget);
    window.removeEventListener('resize', forget);
    gsap.killTweensOf(offset);
    stage.style.removeProperty('--drift-x');
    stage.style.removeProperty('--drift-y');
  };
}

/* ----------------------------------------------------------------- team --- */

function initTeam(
  page: HTMLElement,
  reduced: boolean,
  { gsap, bindPressSurface, canPress }: StudioPageTools,
): () => void {
  const members = [...page.querySelectorAll<HTMLElement>('[data-team-member]')];
  if (members.length === 0) return none;

  // The dent is the strong effect here, and it only happens under the
  // pointer. `canPress()` excludes touch, coarse pointers and reduced motion.
  const presses = canPress()
    ? members.map((member) => {
        const frame = member.querySelector<HTMLElement>('[data-press-frame]');
        const surface = member.querySelector<HTMLElement>(
          '[data-press-surface]',
        );
        return frame && surface
          ? bindPressSurface(frame, surface, frame)
          : none;
      })
    : [];

  // Each portrait arrives once as it reaches the viewport; none moves after.
  const context = gsap.context(() => {
    members.forEach((member) => {
      const scrollTrigger = { trigger: member, start: 'top 90%', once: true };
      gsap.from(
        member,
        reduced
          ? { autoAlpha: 0, duration: 0.45, ease: 'none', scrollTrigger }
          : {
              autoAlpha: 0,
              y: 56,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger,
            },
      );
    });
  }, page);

  return () => {
    presses.forEach((cleanup) => cleanup());
    context.revert();
  };
}
