import type { bindPressSurface, canPress } from './PressSurface';
import { mountStudioOrbit, type OrbitTools } from './StudioOrbit';

/**
 * The shared tools, handed over by `StudioPage.ts`. This chunk imports them
 * for their types only, so GSAP, ScrollTrigger and the press geometry stay in
 * the shared motion bundle alone and are never duplicated or split into a
 * chunk.
 */
export interface StudioPageTools extends OrbitTools {
  bindPressSurface: typeof bindPressSurface;
  canPress: typeof canPress;
}

const none = () => undefined;

/** Matches the description's open/close transition in `studio-page.css`. */
const DISCLOSURE_MS = 520;

/** How far the principles' picture may slide past the list's top or foot. */
const MEDIA_SLACK = 24;

/**
 * /studio/ — the page's motion, loaded only on this route.
 *
 * - The hero's entrance is CSS (`studio-page.css`), so it starts with the
 *   first paint and never waits for this chunk; here the hero loop (once
 *   supplied) only plays on screen in a visible tab.
 * - Quiet reveals: a short orange rule draws in, headings and paragraphs
 *   settle upwards in turn, closing lines rise out of their clips, once, on
 *   entry; team portraits appear progressively.
 * - Interaction: the principles open one at a time on hover, focus, tap and
 *   keys (the picture beside them follows the open row), and a team portrait
 *   gives where a fine pointer presses it.
 * - The Colmillo orbit (`StudioOrbit.ts`): one thin ring that travels the page
 *   with the scroll on wide screens and gives a little under a fine pointer.
 *
 * No pin, no parallax and no permanent loop. Every listener,
 * observer, tween and ScrollTrigger is released by the returned cleanup, which
 * `MotionController` runs before a motion-preference restart.
 *
 * Reduced motion keeps every piece of content and all of the principles'
 * interaction; reveals become a short opacity fade, the principles change
 * without travel, the hero loop rests on its poster and the dent is off.
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
      (root) => initPrinciples(root, reduced),
    ),
    initTeam(page, reduced, tools),
    initClose(page, reduced, tools),
    mountStudioOrbit(page, tools, reduced),
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
 * `[data-reveal-group]`: its `[data-reveal-rule]` draws in from the left, its
 * `[data-reveal-line]` children rise out of their `.studio-line` clip and its
 * `[data-reveal-fade]` children settle upwards one after another, in document
 * order (about one second in all, `power3.out`, no bounce or blur). A
 * `[data-reveal-ring]` turns in meanwhile.
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
        const rules = [
          ...group.querySelectorAll<HTMLElement>('[data-reveal-rule]'),
        ];
        const lines = [
          ...group.querySelectorAll<HTMLElement>('[data-reveal-line]'),
        ];
        const fades = [
          ...group.querySelectorAll<HTMLElement>('[data-reveal-fade]'),
        ];
        const rings = [
          ...group.querySelectorAll<HTMLElement>('[data-reveal-ring]'),
        ];
        const all = [...rules, ...lines, ...fades, ...rings];
        if (all.length === 0) return;

        if (reduced) {
          gsap.from(all, {
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
        if (rules.length)
          timeline.from(
            rules,
            { scaleX: 0, transformOrigin: 'left center', duration: 0.9 },
            0,
          );
        if (lines.length)
          timeline.from(
            lines,
            { yPercent: 108, duration: 0.95, stagger: 0.09 },
            0,
          );
        if (fades.length)
          timeline.from(
            fades,
            { y: 20, opacity: 0, duration: 0.8, stagger: 0.16 },
            lines.length ? 0.3 : 0.08,
          );
        if (rings.length)
          timeline.from(
            rings,
            {
              opacity: 0,
              scale: 0.82,
              rotation: -40,
              duration: 1.4,
              ease: 'power2.out',
            },
            0.35,
          );
      });
  }, page);

  return () => context.revert();
}

/* ----------------------------------------------------------- principles --- */

interface PrincipleParts {
  item: HTMLElement;
  heading: HTMLElement;
  description: HTMLElement;
  button: HTMLButtonElement;
}

/**
 * Upgrades the principles list into disclosures that keep exactly one
 * principle open.
 *
 * Each name's content moves into a `<button aria-expanded>` inside its own
 * heading. Opening: hover with a mouse or pen anywhere on the row, keyboard
 * focus, click or tap, and ArrowUp/ArrowDown, Home and End between the names.
 * The last principle chosen stays open, so a description and a picture are
 * always showing. A closed description is `inert`, so assistive technology
 * meets it once it is opened, like any disclosure.
 *
 * Only one row opens as another closes, so the list keeps its height, and a
 * row only ever grows downwards from under the pointer that opened it.
 *
 * The pictures are painted in three states: `active` (on top, arriving),
 * `previous` (fading out where it is) and `idle` (hidden).
 */
function initPrinciples(root: HTMLElement, reduced: boolean): () => void {
  const list = root.querySelector<HTMLElement>('[data-principles-list]');
  const media = root.querySelector<HTMLElement>('[data-principles-media]');
  const figures = [
    ...root.querySelectorAll<HTMLElement>('[data-principle-figure]'),
  ];
  const parts: PrincipleParts[] = [];
  for (const item of root.querySelectorAll<HTMLElement>(
    '[data-principle-item]',
  )) {
    const heading = item.querySelector<HTMLElement>('[data-principle-name]');
    const description = item.querySelector<HTMLElement>(
      '[data-principle-desc]',
    );
    if (!heading || !description) return none;
    parts.push({
      item,
      heading,
      description,
      button: document.createElement('button'),
    });
  }
  const count = parts.length;
  if (!list || !media || count === 0 || figures.length !== count) return none;

  // A motion-preference restart keeps the principle that was open.
  const stored = Number(root.dataset.activeIndex ?? 0);
  let active =
    Number.isInteger(stored) && stored >= 0 && stored < count ? stored : 0;

  parts.forEach(({ heading, description, button }) => {
    button.type = 'button';
    button.className = 'principles__trigger';
    button.setAttribute('aria-controls', description.id);
    button.append(...heading.childNodes);
    heading.append(button);
  });

  /*
   * Beside the list, the picture slides so its middle is level with the open
   * row once the rows have settled, never further than `MEDIA_SLACK` past the
   * list's top or foot. Measured from the rows' own heights, which do not
   * change while a description opens, so it lands with the rows.
   */
  const alignMedia = () => {
    if (
      media.getBoundingClientRect().left < list.getBoundingClientRect().right
    ) {
      media.style.removeProperty('translate');
      return;
    }
    const rule = Number.parseFloat(getComputedStyle(list).borderBottomWidth);
    let top = 0;
    let middle = 0;
    parts.forEach(({ item, heading, description }, index) => {
      const row =
        heading.offsetHeight +
        Number.parseFloat(getComputedStyle(item).borderTopWidth);
      const open =
        index === active
          ? (description.firstElementChild?.scrollHeight ?? 0)
          : 0;
      if (index === active) middle = top + (row + open) / 2;
      top += row + open;
    });
    const room = top + rule - media.offsetHeight;
    const offset = Math.min(
      Math.max(
        middle - media.offsetHeight / 2,
        Math.min(0, room) - MEDIA_SLACK,
      ),
      Math.max(0, room) + MEDIA_SLACK,
    );
    media.style.translate = `0 ${Math.round(offset)}px`;
  };

  const render = (leaving: number) => {
    parts.forEach(({ item, description, button }, index) => {
      const open = index === active;
      item.toggleAttribute('data-active', open);
      button.setAttribute('aria-expanded', String(open));
      description.inert = !open;
    });
    figures.forEach((figure, index) => {
      figure.dataset.state =
        index === active ? 'active' : index === leaving ? 'previous' : 'idle';
    });
    root.dataset.activeIndex = String(active);
    alignMedia();
  };

  const select = (index: number) => {
    if (index === active) return;
    const leaving = active;
    active = index;
    render(leaving);
  };

  // The closed rows collapse without a transition on the first paint.
  root.dataset.settling = '';
  root.dataset.enhanced = 'true';
  render(-1);
  let settle = requestAnimationFrame(() => {
    settle = requestAnimationFrame(() => delete root.dataset.settling);
  });

  // When the picture sits under the list, a tap that leaves it off screen
  // brings it in with the least movement, once the rows have settled.
  let revealTimer = 0;
  const reveal = () => {
    window.clearTimeout(revealTimer);
    revealTimer = window.setTimeout(
      () => {
        const box = media.getBoundingClientRect();
        const stacked = box.top >= list.getBoundingClientRect().bottom - 1;
        if (stacked && (box.bottom > window.innerHeight || box.top < 0))
          media.scrollIntoView({
            block: 'nearest',
            behavior: reduced ? 'auto' : 'smooth',
          });
      },
      reduced ? 0 : DISCLOSURE_MS,
    );
  };

  const unbind = parts.map(({ item, button }, index) => {
    const hover = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') select(index);
    };
    const focus = () => select(index);
    const click = () => {
      select(index);
      reveal();
    };
    item.addEventListener('pointerenter', hover);
    button.addEventListener('focus', focus);
    button.addEventListener('click', click);
    return () => {
      item.removeEventListener('pointerenter', hover);
      button.removeEventListener('focus', focus);
      button.removeEventListener('click', click);
    };
  });

  const keys = (event: KeyboardEvent) => {
    const current = parts.findIndex(
      ({ button }) => button === document.activeElement,
    );
    if (current < 0) return;
    const targets: Partial<Record<string, number>> = {
      ArrowDown: current + 1,
      ArrowUp: current - 1,
      Home: 0,
      End: count - 1,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    parts[(target + count) % count]?.button.focus();
  };
  list.addEventListener('keydown', keys);

  const resize = new ResizeObserver(alignMedia);
  resize.observe(root);

  return () => {
    cancelAnimationFrame(settle);
    window.clearTimeout(revealTimer);
    resize.disconnect();
    media.style.removeProperty('translate');
    unbind.forEach((cleanup) => cleanup());
    list.removeEventListener('keydown', keys);
    parts.forEach(({ heading, description, button }) => {
      heading.append(...button.childNodes);
      button.remove();
      description.inert = false;
    });
    delete root.dataset.enhanced;
    delete root.dataset.settling;
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

/* ---------------------------------------------------------------- close --- */

/** Most the pointer moves the photograph, in px (horizontal, vertical). */
const CLOSE_SHIFT = { x: 7, y: 4 };

/**
 * The close's photographic stage.
 *
 * - Transition from the team: as the section comes in, the photograph's black
 *   rises over the charcoal from the foot (`clip-path` on the media layer,
 *   scroll-linked with a light scrub, so it follows the scroll both ways and
 *   never holds it).
 * - Entrance, once at `top 65%`: the photograph settles from `scale 1.06` and
 *   28 px to the right (1.4 s, like a camera coming to rest), the question
 *   rises and fades in from 0.3 s, the button from 0.48 s; all `power3.out`.
 * - While the section is crossed the photograph drifts 32 px in all against
 *   the scroll: depth, not a parallax scene.
 * - A fine pointer over the sculpture's side moves the photograph a few pixels
 *   away from it, with a slow ease; leaving brings it back.
 *
 * The layers are transforms and one clip on a single layer; the section's
 * box is read on pointer entry and after a scroll, never per move. Reduced
 * motion: nothing runs and the stage is simply there.
 */
function initClose(
  page: HTMLElement,
  reduced: boolean,
  { gsap, canPress }: StudioPageTools,
): () => void {
  const section = page.querySelector<HTMLElement>('[data-studio-close]');
  const media = section?.querySelector<HTMLElement>('[data-close-media]');
  const frame = section?.querySelector<HTMLElement>('[data-close-frame]');
  const image = section?.querySelector<HTMLElement>('[data-close-image]');
  const title = section?.querySelector<HTMLElement>('[data-close-title]');
  const action = section?.querySelector<HTMLElement>('[data-close-action]');
  if (reduced || !section || !media || !frame || !image || !title || !action)
    return none;

  const context = gsap.context(() => {
    gsap.fromTo(
      media,
      { clipPath: 'inset(26% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'top 30%',
          scrub: 0.5,
        },
      },
    );

    gsap.fromTo(
      image,
      { y: -16 },
      {
        y: 16,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      },
    );

    gsap
      .timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: section, start: 'top 65%', once: true },
      })
      .from(
        image,
        { scale: 1.06, x: 28, transformOrigin: '70% 50%', duration: 1.4 },
        0,
      )
      .from(title, { y: 32, opacity: 0, duration: 0.9 }, 0.3)
      .from(action, { y: 22, opacity: 0, duration: 0.8 }, 0.48);
  }, section);

  if (!canPress()) return () => context.revert();

  const toX = gsap.quickTo(frame, 'x', { duration: 1.1, ease: 'power3.out' });
  const toY = gsap.quickTo(frame, 'y', { duration: 1.1, ease: 'power3.out' });
  let box: DOMRect | null = null;
  const forget = () => {
    box = null;
  };
  const move = (event: PointerEvent) => {
    box ??= section.getBoundingClientRect();
    const nx = (event.clientX - box.left) / box.width;
    const ny = (event.clientY - box.top) / box.height;
    // Nothing over the copy's side; full response over the sculpture.
    const weight = Math.min(1, Math.max(0, (nx - 0.45) / 0.2));
    const clampShift = (value: number, limit: number) =>
      Math.min(limit, Math.max(-limit, value));
    toX(-clampShift((nx - 0.72) * 30, CLOSE_SHIFT.x) * weight);
    toY(-clampShift((ny - 0.5) * 16, CLOSE_SHIFT.y) * weight);
  };
  const leave = () => {
    toX(0);
    toY(0);
  };
  section.addEventListener('pointerenter', forget);
  section.addEventListener('pointermove', move);
  section.addEventListener('pointerleave', leave);
  window.addEventListener('scroll', forget, { passive: true });
  window.addEventListener('resize', forget);

  return () => {
    section.removeEventListener('pointerenter', forget);
    section.removeEventListener('pointermove', move);
    section.removeEventListener('pointerleave', leave);
    window.removeEventListener('scroll', forget);
    window.removeEventListener('resize', forget);
    gsap.killTweensOf(frame);
    gsap.set(frame, { clearProps: 'transform' });
    context.revert();
  };
}
