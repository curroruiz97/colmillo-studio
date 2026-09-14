import type { gsap as GsapCore } from 'gsap';
import type { ScrollTrigger as ScrollTriggerClass } from 'gsap/ScrollTrigger';

/** Handed over by `StudioPage.ts`, like the rest of the page's tools. */
export interface OrbitTools {
  gsap: typeof GsapCore;
  ScrollTrigger: typeof ScrollTriggerClass;
}

type Gsap = typeof GsapCore;

const none = () => undefined;

/** The orbit's own box in `studio-page.css`; every size is a scale of it. */
const BOX = 120;

/** How far past the ring's line the pointer starts to be felt, in px. */
const REACH = 110;
/** Most the ring leans towards the pointer, in px. */
const PULL = 12;
/** Most it tilts, in degrees. */
const TILT = 6;
/** Most its dot slides along the line towards the pointer, in degrees. */
const DOT_SLIDE = 24;
/** Stretch along the pointer's direction, and squeeze across it. */
const STRETCH = 0.07;
const SQUEEZE = 0.045;

/**
 * Text the travelling ring must not compete with. Where its box covers any of
 * these it fades to a trace (`QUIET_FLOOR`). Inline boxes are used where a
 * heading's block would span empty space (the team title).
 */
const TEXT_BLOCKS = [
  '.studio-intro__text',
  '.studio-principles__title',
  '.principles__list',
  '.studio-team__title [data-reveal-line]',
  '.studio-team__lede',
  '.studio-close__title',
].join(', ');
const QUIET_FLOOR = 0.12;

interface Pose {
  x: number;
  y: number;
  size: number;
  rotate: number;
  dot: number;
  opacity: number;
  sx: number;
  sy: number;
}

interface Pull {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tilt: number;
  dot: number;
}

interface StopLook {
  /** Diameter in px; null takes the marker's own width (the still ring). */
  size: number | null;
  rotate: number;
  /** Where the dot sits on the line, in degrees from the top (clockwise). */
  dot: number;
  opacity: number;
  sx: number;
  sy: number;
  /** The orbit sits exactly on its stop when the stop is this far down the screen. */
  focus: number;
}

/*
 * One look per section. Rotation and dot only ever grow, so going down the
 * page the ring keeps turning the same way and its dot keeps orbiting forward.
 */
const STOPS: Partial<Record<string, StopLook>> = {
  hero: {
    size: 90,
    rotate: -14,
    dot: 214,
    opacity: 0.85,
    sx: 1,
    sy: 1,
    focus: 0.7,
  },
  intro: {
    size: null,
    rotate: 10,
    dot: 305,
    opacity: 0.8,
    sx: 1.03,
    sy: 0.97,
    // Beside the heading, above the text: it lands while the text is still
    // low on the screen, so it never has to cross it.
    focus: 0.3,
  },
  principles: {
    size: 70,
    rotate: 38,
    dot: 400,
    opacity: 0.7,
    sx: 0.97,
    sy: 1.03,
    focus: 0.45,
  },
  team: {
    size: 100,
    rotate: 66,
    dot: 510,
    opacity: 0.75,
    sx: 1.02,
    sy: 0.98,
    focus: 0.35,
  },
  close: {
    size: 50,
    rotate: 100,
    dot: 610,
    opacity: 0.7,
    sx: 1,
    sy: 1,
    focus: 0.55,
  },
};

interface Stop extends Omit<Pose, 'y'> {
  /** The stop's centre in document coordinates. */
  docY: number;
  /** The scroll position at which the orbit rests exactly on the stop. */
  scroll: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const restingPull = (): Pull => ({ x: 0, y: 0, vx: 0, vy: 0, tilt: 0, dot: 0 });

/**
 * The Colmillo orbit — /studio/ only.
 *
 * - Wide screens (over 64rem) with motion allowed: one thin orange ring
 *   travels the page behind the content. Every section marks a stop in its
 *   own empty space (`[data-orbit-station]`); the scroll position between two
 *   stops blends their place, size, tilt, proportion and dot angle, so the
 *   ring rides a little with a section and then glides to the next, and it is
 *   a touch fainter while it travels. Wherever its path crosses text it fades
 *   to a trace, so it never competes with it. At "Somos Colmillo" it lands
 *   exactly on the still ring, which steps aside; at the close it shrinks
 *   towards the top edge of the photograph, slips under it as it rises and
 *   fades.
 * - A fine pointer that comes near the ring bends it: it leans up to 12 px
 *   towards the pointer, stretches a few percent along that direction, tilts a
 *   few degrees and slides its dot towards it, all with inertia, and settles
 *   back when the pointer leaves. It never follows the pointer.
 * - Narrower screens: no travel. The still ring of "Somos Colmillo" stays,
 *   and under a fine pointer it responds the same way.
 * - Touch and coarse pointers: no pointer response. Reduced motion: nothing
 *   runs; only the still ring shows (the travelling one is never displayed).
 *
 * No layout is read on pointer moves: stops are measured on ScrollTrigger's
 * refresh and the still ring once after a scroll or resize. Everything is
 * written as one transform, one opacity and one dot angle per frame, from a
 * ticker that only runs while something is still moving.
 */
export function mountStudioOrbit(
  page: HTMLElement,
  tools: OrbitTools,
  reduced: boolean,
): () => void {
  if (reduced) return none;
  const orbit = page.querySelector<HTMLElement>('[data-studio-orbit]');
  const still = page.querySelector<HTMLElement>('[data-still-ring]');

  const media = tools.gsap.matchMedia();
  media.add(
    {
      travel: '(min-width: 64.01rem)',
      fine: '(hover: hover) and (pointer: fine)',
    },
    (context) => {
      const travel = Boolean(context.conditions?.travel);
      const fine = Boolean(context.conditions?.fine);
      if (travel && orbit) return mountTravel(page, orbit, fine, tools);
      if (fine && still) return mountStill(still, tools.gsap);
      return none;
    },
  );

  return () => media.revert();
}

/* ------------------------------------------------------- shared drawing --- */

/** Where the pointer wants the ring to give, for a ring at `center`. */
function respond(
  center: { x: number; y: number },
  radius: number,
  pointer: { x: number; y: number } | null,
  dot: number,
): Pull {
  if (!pointer) return restingPull();
  const dx = pointer.x - center.x;
  const dy = pointer.y - center.y;
  const distance = Math.hypot(dx, dy);
  const inner = radius * 0.3;
  const outer = radius + REACH;
  let k = clamp((outer - distance) / (outer - inner), 0, 1);
  if (k === 0) return restingPull();
  k = k * k * (3 - 2 * k);
  const ux = dx / (distance || 1);
  const uy = dy / (distance || 1);
  const angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
  const towards = ((((angle - dot) % 360) + 540) % 360) - 180;
  return {
    x: ux * PULL * k,
    y: uy * PULL * k,
    vx: ux * k,
    vy: uy * k,
    tilt: ux * TILT * k,
    dot: clamp(towards, -DOT_SLIDE, DOT_SLIDE) * k,
  };
}

/** The whole pose as one CSS matrix: size, tilt, proportion, stretch, place. */
function matrixOf(pose: Pose, pull: Pull): string {
  const scale = pose.size / BOX;
  const angle = ((pose.rotate + pull.tilt) * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  let a = cos * pose.sx;
  let c = -sin * pose.sy;
  let b = sin * pose.sx;
  let d = cos * pose.sy;
  const k = Math.hypot(pull.vx, pull.vy);
  if (k > 1e-4) {
    const ux = pull.vx / k;
    const uy = pull.vy / k;
    const across = 1 - SQUEEZE * k;
    const extra = 1 + STRETCH * k - across;
    const s00 = across + extra * ux * ux;
    const s01 = extra * ux * uy;
    const s11 = across + extra * uy * uy;
    [a, c, b, d] = [
      s00 * a + s01 * b,
      s00 * c + s01 * d,
      s01 * a + s11 * b,
      s01 * c + s11 * d,
    ];
  }
  const n = (value: number) => (value * scale).toFixed(4);
  return `matrix(${n(a)}, ${n(b)}, ${n(c)}, ${n(d)}, ${(pose.x + pull.x).toFixed(2)}, ${(pose.y + pull.y).toFixed(2)})`;
}

/** Eased setters for every numeric key of `target`. */
function quickSetters<T extends object>(
  gsap: Gsap,
  target: T,
  vars: { duration: number; ease: string },
): Record<keyof T, (value: number) => void> {
  const setters = {} as Record<keyof T, (value: number) => void>;
  for (const key of Object.keys(target) as (keyof T & string)[])
    setters[key] = gsap.quickTo(target, key, vars);
  return setters;
}

/**
 * A ticker callback that removes itself once nothing has asked it to run for
 * a while (every glide here is shorter than that).
 */
function sleepyTicker(gsap: Gsap, frame: () => void) {
  let until = 0;
  let running = false;
  const tick = () => {
    frame();
    if (performance.now() > until) {
      gsap.ticker.remove(tick);
      running = false;
    }
  };
  return {
    wake(ms = 1400) {
      until = Math.max(until, performance.now() + ms);
      if (!running) {
        running = true;
        gsap.ticker.add(tick);
      }
    },
    stop() {
      gsap.ticker.remove(tick);
      running = false;
    },
  };
}

/** Pointer position for the fine-pointer response; null once it leaves. */
function trackPointer(
  onMove: (pointer: { x: number; y: number } | null) => void,
) {
  const move = (event: PointerEvent) => {
    if (event.pointerType !== 'touch')
      onMove({ x: event.clientX, y: event.clientY });
  };
  const leave = (event: PointerEvent) => {
    if (!event.relatedTarget) onMove(null);
  };
  window.addEventListener('pointermove', move, { passive: true });
  document.addEventListener('pointerout', leave);
  return () => {
    window.removeEventListener('pointermove', move);
    document.removeEventListener('pointerout', leave);
  };
}

/* ---------------------------------------------------------------- travel --- */

function mountTravel(
  page: HTMLElement,
  orbit: HTMLElement,
  fine: boolean,
  { gsap, ScrollTrigger }: OrbitTools,
): () => void {
  const dotGroup = orbit.querySelector<SVGGElement>('[data-ring-dot]');
  const markers = [
    ...page.querySelectorAll<HTMLElement>('[data-orbit-station]'),
  ].filter((marker) => STOPS[marker.dataset.orbitStation ?? '']);
  if (!dotGroup || markers.length === 0) return none;

  const pose: Pose = {
    x: 0,
    y: 0,
    size: 90,
    rotate: 0,
    dot: 0,
    opacity: 0,
    sx: 1,
    sy: 1,
  };
  const pull = restingPull();
  const presence = { value: 0 };
  const ending = { value: 1 };
  const quiet = { value: 1 };
  const hush = gsap.quickTo(quiet, 'value', {
    duration: 0.2,
    ease: 'power2.out',
  });
  const texts = [...page.querySelectorAll<HTMLElement>(TEXT_BLOCKS)];
  const glide = quickSetters(gsap, pose, { duration: 0.6, ease: 'power3.out' });
  const give = quickSetters(gsap, pull, { duration: 0.9, ease: 'power2.out' });
  const travelEase = gsap.parseEase('sine.inOut');

  let stops: Stop[] = [];
  /** The text blocks in document coordinates, measured with the stops. */
  let bands: { left: number; right: number; top: number; bottom: number }[] =
    [];
  let quietTarget = 1;
  let viewport = window.innerHeight;
  let pointer: { x: number; y: number } | null = null;
  let aimed: Pull = restingPull();
  let landed = false;

  const measure = () => {
    viewport = window.innerHeight;
    const max = ScrollTrigger.maxScroll(window);
    const offset = window.scrollY;
    let previous = -Infinity;
    stops = markers.map((marker) => {
      const look = STOPS[marker.dataset.orbitStation ?? '']!;
      const box = marker.getBoundingClientRect();
      const docY = box.top + offset + box.height / 2;
      const scroll = Math.max(
        clamp(docY - viewport * look.focus, 0, max),
        previous + 1,
      );
      previous = scroll;
      return {
        x: box.left + box.width / 2,
        docY,
        scroll,
        size: look.size ?? box.width,
        rotate: look.rotate,
        dot: look.dot,
        opacity: look.opacity,
        sx: look.sx,
        sy: look.sy,
      };
    });
    // Through the offset chain, which ignores transforms: the text may still
    // be waiting for its reveal (moved down, or out of its clip) when this runs.
    bands = texts.map((text) => {
      let left = 0;
      let top = 0;
      for (
        let node: HTMLElement | null = text;
        node;
        node = node.offsetParent as HTMLElement | null
      ) {
        left += node.offsetLeft;
        top += node.offsetTop;
      }
      return {
        left,
        right: left + text.offsetWidth,
        top,
        bottom: top + text.offsetHeight,
      };
    });
  };

  /** How much of the ring's box currently lies over text, from 0 to 1. */
  const overText = () => {
    const half = (pose.size / 2) * Math.max(pose.sx, pose.sy);
    const left = pose.x + pull.x - half;
    const right = pose.x + pull.x + half;
    const top = pose.y + pull.y - half + window.scrollY;
    const bottom = top + half * 2;
    let covered = 0;
    for (const band of bands) {
      const width = Math.min(right, band.right) - Math.max(left, band.left);
      const height = Math.min(bottom, band.bottom) - Math.max(top, band.top);
      if (width > 0 && height > 0) covered += width * height;
    }
    // A sixth of the box over text is already enough to fade it fully.
    return clamp((covered / (half * half * 4)) * 6, 0, 1);
  };

  /** The pose the scroll position asks for. */
  const poseAt = (scroll: number): Pose => {
    const first = stops[0]!;
    const last = stops[stops.length - 1]!;
    let from = first;
    let to = first;
    let t = 0;
    let travelling = 0;
    if (scroll >= last.scroll) {
      from = to = last;
    } else if (scroll > first.scroll) {
      const index = stops.findIndex((stop) => stop.scroll > scroll);
      from = stops[index - 1]!;
      to = stops[index]!;
      const raw = (scroll - from.scroll) / (to.scroll - from.scroll);
      t = travelEase(raw);
      travelling = Math.sin(Math.PI * raw);
    }
    const mix = (key: keyof Omit<Pose, 'y'>) =>
      from[key] + (to[key] - from[key]) * t;
    return {
      x: mix('x'),
      y: clamp(
        from.docY - scroll + (to.docY - from.docY) * t,
        viewport * 0.08,
        viewport * 0.92,
      ),
      size: mix('size'),
      rotate: mix('rotate'),
      dot: mix('dot'),
      opacity: mix('opacity') * (1 - 0.3 * travelling),
      sx: mix('sx'),
      sy: mix('sy'),
    };
  };

  let lastTransform = '';
  let lastOpacity = '';
  let lastDot = '';
  const render = () => {
    const transform = matrixOf(pose, pull);
    if (transform !== lastTransform)
      orbit.style.transform = lastTransform = transform;
    const opacity = (
      pose.opacity *
      presence.value *
      ending.value *
      quiet.value
    ).toFixed(3);
    if (opacity !== lastOpacity) orbit.style.opacity = lastOpacity = opacity;
    const dot = `rotate(${(pose.dot + pull.dot).toFixed(2)} 60 60)`;
    if (dot !== lastDot) dotGroup.setAttribute('transform', (lastDot = dot));
  };

  const ticker = sleepyTicker(gsap, () => {
    if (fine) {
      const next = respond(
        { x: pose.x + pull.x, y: pose.y + pull.y },
        pose.size / 2,
        pointer,
        pose.dot,
      );
      for (const key of Object.keys(next) as (keyof Pull)[]) {
        if (Math.abs(next[key] - aimed[key]) > 0.01) give[key](next[key]);
      }
      aimed = next;
    }
    const target = 1 - (1 - QUIET_FLOOR) * overText();
    if (Math.abs(target - quietTarget) > 0.01) {
      quietTarget = target;
      hush(target);
    }
    render();
  });

  const aim = (scroll: number, immediate = false) => {
    if (stops.length === 0) return;
    const target = poseAt(scroll);
    for (const key of Object.keys(target) as (keyof Pose)[]) {
      if (immediate) pose[key] = target[key];
      else glide[key](target[key]);
    }
    // Landed at the close: it lingers around the dot, then fades out.
    const atEnd = scroll >= stops[stops.length - 1]!.scroll - 2;
    if (atEnd !== landed || immediate) {
      landed = atEnd;
      gsap.to(ending, {
        value: atEnd ? 0 : 1,
        duration: atEnd ? 1.2 : 0.5,
        delay: atEnd ? 0.7 : 0,
        ease: 'power2.inOut',
        overwrite: true,
        onUpdate: () => ticker.wake(200),
      });
    }
    ticker.wake();
  };

  measure();
  aim(window.scrollY, true);
  page.dataset.orbit = '';

  const trigger = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => aim(self.scroll()),
    onRefresh: (self) => {
      measure();
      aim(self.scroll());
    },
  });

  // It is found rather than shown: it arrives after the hero's entrance.
  gsap.to(presence, {
    value: 1,
    duration: 1.4,
    delay: 1.2,
    ease: 'power2.out',
    onUpdate: () => ticker.wake(200),
  });

  const untrack = fine
    ? trackPointer((next) => {
        pointer = next;
        const engaged = Math.hypot(pull.vx, pull.vy) > 0.001;
        const near =
          next &&
          Math.hypot(next.x - pose.x, next.y - pose.y) <
            pose.size / 2 + REACH * 1.5;
        if (near || engaged) ticker.wake(1200);
      })
    : none;

  return () => {
    untrack();
    trigger.kill();
    ticker.stop();
    gsap.killTweensOf([pose, pull, presence, ending, quiet]);
    delete page.dataset.orbit;
    orbit.style.removeProperty('transform');
    orbit.style.removeProperty('opacity');
    dotGroup.removeAttribute('transform');
  };
}

/* ----------------------------------------------------------------- still --- */

/** The still ring of "Somos Colmillo", where the orbit does not travel. */
function mountStill(slot: HTMLElement, gsap: Gsap): () => void {
  const art = slot.querySelector<SVGSVGElement>('[data-ring]');
  const dotGroup = art?.querySelector<SVGGElement>('[data-ring-dot]');
  if (!art || !dotGroup) return none;

  const pose: Pose = {
    x: 0,
    y: 0,
    size: BOX,
    rotate: 0,
    dot: 0,
    opacity: 1,
    sx: 1,
    sy: 1,
  };
  const pull = restingPull();
  const give = quickSetters(gsap, pull, { duration: 0.9, ease: 'power2.out' });
  let pointer: { x: number; y: number } | null = null;
  let aimed = restingPull();
  let center = { x: 0, y: 0, radius: 0 };
  let stale = true;

  const ticker = sleepyTicker(gsap, () => {
    if (stale) {
      const box = slot.getBoundingClientRect();
      center = {
        x: box.left + box.width / 2,
        y: box.top + box.height / 2,
        radius: box.width / 2,
      };
      stale = false;
    }
    const next = respond(center, center.radius, pointer, 0);
    for (const key of Object.keys(next) as (keyof Pull)[]) {
      if (Math.abs(next[key] - aimed[key]) > 0.01) give[key](next[key]);
    }
    aimed = next;
    art.style.transform = matrixOf(pose, pull);
    dotGroup.setAttribute('transform', `rotate(${pull.dot.toFixed(2)} 60 60)`);
  });

  const invalidate = () => {
    stale = true;
  };
  window.addEventListener('scroll', invalidate, { passive: true });
  window.addEventListener('resize', invalidate);
  const untrack = trackPointer((next) => {
    pointer = next;
    ticker.wake(1200);
  });

  return () => {
    untrack();
    window.removeEventListener('scroll', invalidate);
    window.removeEventListener('resize', invalidate);
    ticker.stop();
    gsap.killTweensOf(pull);
    art.style.removeProperty('transform');
    dotGroup.removeAttribute('transform');
  };
}
