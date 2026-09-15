import gsap from 'gsap';

/**
 * Home entry intro.
 *
 * NEGRO -> C -> CO -> ... -> COLMILLO -> tension -> the final O opens -> HOME.
 *
 * The overlay (`HomeIntro.astro`) is a single SVG in wordmark units. The ink
 * ground is an enormous rectangle with the final O's silhouette cut out of it,
 * and it shares one transform with that O, so as the O grows the hole in the
 * ground grows with it and the real page - already rendered underneath - is
 * seen through the counter until the counter is larger than the viewport.
 * Every frame is vector: the transform is an SVG attribute, re-rasterised by
 * the browser rather than scaled as a bitmap.
 *
 * The head script decides whether this load plays at all and in which mode
 * (`html[data-intro]`). This module owns the rest of the lifecycle: it claims
 * the attribute, runs the timeline, holds the hero loop until the page is
 * revealed and hands everything back exactly once - scroll, cursor and hero.
 */

type Point = [number, number];

/** Seconds. The whole sequence lands at roughly 2.7 s. */
const TIMING = {
  /** Solid ink before the first letter. */
  hold: 0.2,
  letterStagger: 0.1,
  letterDuration: 0.46,
  /**
   * From the end of the last letter's ease to the O starting to open. It is
   * negative because the ease's tail is invisible: the O reads as landed about
   * 0.15 s before its tween ends, so this leaves a felt pause of ~0.2 s.
   */
  tension: -0.1,
  /** The counter opening from its centre before the O grows. */
  iris: 0.3,
  /** Overlap between the iris and the growth, so the gesture is continuous. */
  irisOverlap: 0.12,
  expansion: 1.2,
  /** Longest wait for the hero's first frame before the O opens anyway. */
  readinessCap: 1.2,
} as const;

/** Letters enter from this far below, in screen pixels. */
const LETTER_RISE_PX = 14;
/** How far the placed letters give way when the next one lands. */
const PRESSURE_PX = 1.5;
/** Radius of the orange seed in the counter, in screen pixels. */
const SEED_RADIUS_PX = 3;
/**
 * The growth is eased towards a scale slightly past the one that just covers
 * the viewport, and the overlay is removed the moment it is covered. The last,
 * slowest part of the ease therefore happens where nobody can see it.
 */
const OVERSHOOT = 1.35;
/** The hero loop is released this far before the overlay is removed. */
const REVEAL_SHARE = 0.62;
/**
 * The page settles from this scale as it is revealed, around a point high in
 * the hero: centred, a tall phone pushed the corner wordmark off the top edge
 * for the length of the settle.
 */
const HERO_SETTLE_FROM = 1.02;
const HERO_SETTLE_ORIGIN = '50% 20%';

const noop = () => undefined;

function parsePoints(value: string | undefined): Point[] {
  return (value ?? '')
    .trim()
    .split(/\s+/)
    .map((pair) => pair.split(',').map(Number) as Point)
    .filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));
}

/** Distance from `origin` to the polygon's edge along `angle`. */
function rayToEdge(polygon: Point[], origin: Point, angle: number): number {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  let nearest = Infinity;
  for (let i = 0; i < polygon.length; i += 1) {
    const [ax, ay] = polygon[i] as Point;
    const [bx, by] = polygon[(i + 1) % polygon.length] as Point;
    const ex = bx - ax;
    const ey = by - ay;
    const denominator = dx * ey - dy * ex;
    if (Math.abs(denominator) < 1e-9) continue;
    const ox = ax - origin[0];
    const oy = ay - origin[1];
    const t = (ox * ey - oy * ex) / denominator;
    const u = (ox * dy - oy * dx) / denominator;
    if (t > 0 && u >= 0 && u <= 1) nearest = Math.min(nearest, t);
  }
  return nearest;
}

/** Scales every "x y" pair of an absolute path around `centre`. */
function scalePath(d: string, centre: Point, scale: number): string {
  return d.replace(
    /(-?\d*\.?\d+) (-?\d*\.?\d+)/g,
    (_, x: string, y: string) =>
      `${(centre[0] + (Number(x) - centre[0]) * scale).toFixed(2)} ${(
        centre[1] +
        (Number(y) - centre[1]) * scale
      ).toFixed(2)}`,
  );
}

/** A smooth bump: quick rise, softer decay. Zero outside [0, 0.5] s. */
function pressureEnvelope(t: number): number {
  if (t <= 0 || t >= 0.5) return 0;
  const rise = 0.07;
  return t < rise
    ? Math.sin((t / rise) * (Math.PI / 2))
    : Math.exp(-(t - rise) / 0.1);
}

export function initHomeIntro(): () => void {
  const root = document.documentElement;
  const mode = root.dataset.intro;
  const overlay = document.querySelector<HTMLElement>('[data-home-intro]');
  const stage = overlay?.querySelector<SVGSVGElement>('[data-intro-stage]');

  if (!mode) return noop;
  if (!overlay || !stage || root.dataset.introState) {
    // Nothing to play on this document; never leave the page locked.
    delete root.dataset.intro;
    return noop;
  }
  root.dataset.introState = 'running';

  let timeline: gsap.core.Timeline | null = null;
  let settle: gsap.core.Tween | null = null;
  let revealed = false;
  let finished = false;
  const heroInner = document.querySelector<HTMLElement>('.hero__inner');

  const reveal = () => {
    if (revealed) return;
    revealed = true;
    window.dispatchEvent(new CustomEvent('colmillo:introreveal'));
  };

  const listeners: Array<() => void> = [];
  const listen = <K extends keyof WindowEventMap>(
    type: K,
    handler: (event: WindowEventMap[K]) => void,
    options?: AddEventListenerOptions,
  ) => {
    window.addEventListener(type, handler, options);
    listeners.push(() => window.removeEventListener(type, handler, options));
  };

  const finish = () => {
    if (finished) return;
    finished = true;
    reveal();
    timeline?.kill();
    listeners.forEach((remove) => remove());
    overlay.hidden = true;
    delete root.dataset.introState;
    delete root.dataset.intro;
    // A reload paused scroll restoration so the O opened onto the hero; later
    // history traversals of this entry must remember their position again.
    if ('scrollRestoration' in history) history.scrollRestoration = 'auto';
    window.dispatchEvent(new CustomEvent('colmillo:introend'));
  };

  // A timeline that stalls for any reason still returns the page.
  const guard = window.setTimeout(finish, 9000);
  listeners.push(() => window.clearTimeout(guard));

  // Impatience is respected: a key, a wheel or a touch plays the rest faster
  // instead of cutting it, so the reveal never snaps. Focus is never trapped;
  // the skip link sits above the overlay.
  const hurry = () => timeline?.timeScale(3.2);
  listen('keydown', hurry);
  listen('wheel', hurry, { passive: true });
  listen('touchstart', hurry, { passive: true });

  // The intro always opens onto the hero. A reload restores the old scroll
  // position - Chrome does so even with `scrollRestoration = 'manual'` set in
  // the head - so the page is pinned to the top for as long as it is covered.
  // Nobody can scroll it meanwhile: the root is `overflow: hidden`.
  const toTop = () => {
    if (window.scrollY || window.scrollX) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };
  toTop();
  listen('scroll', toTop, { passive: true });

  if (mode !== 'full') {
    // Reduced motion: the still wordmark, a short fade, the page.
    timeline = gsap
      .timeline({ onComplete: finish })
      .to(overlay, { opacity: 0, duration: 0.3, ease: 'power1.out' }, 0.35);
    return finish;
  }

  const letters = [
    ...stage.querySelectorAll<SVGGElement>('[data-intro-letter]'),
  ];
  const presses = [
    ...stage.querySelectorAll<SVGGElement>('[data-intro-press]'),
  ];
  const portals = [
    ...stage.querySelectorAll<SVGGElement>('[data-intro-portal]'),
  ];
  const plug = stage.querySelector<SVGPathElement>('[data-intro-plug]');
  const seed = stage.querySelector<SVGCircleElement>('[data-intro-seed]');
  const counter = parsePoints(stage.dataset.counter);
  const [centre] = parsePoints(stage.dataset.counterCentre);
  const outer = stage.dataset.outer ?? '';
  const counterPath = stage.dataset.counterPath ?? '';
  const viewBox = stage.viewBox.baseVal;

  if (
    letters.length < 2 ||
    !plug ||
    !seed ||
    !centre ||
    counter.length < 3 ||
    !viewBox.width
  ) {
    finish();
    return noop;
  }
  const finalLetter = letters.at(-1) as SVGGElement;
  const leadLetters = letters.slice(0, -1);

  /* ------------------------------------------------------------ geometry -- */

  /** Screen pixels per wordmark unit, and where the viewport centre falls. */
  const measure = () => {
    const box = stage.getBoundingClientRect();
    const unit = box.width / viewBox.width;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const target: Point = [
      (width / 2 - box.left) / unit,
      (height / 2 - box.top) / unit,
    ];
    // The smallest scale at which the counter, centred on the viewport,
    // contains every point of the viewport's outline.
    const halfW = width / 2 / unit;
    const halfH = height / 2 / unit;
    let cover = 1;
    const steps = 24;
    for (let side = 0; side < 4; side += 1) {
      for (let step = 0; step < steps; step += 1) {
        const t = step / steps;
        const x =
          side === 0
            ? -halfW + 2 * halfW * t
            : side === 2
              ? halfW - 2 * halfW * t
              : side === 1
                ? halfW
                : -halfW;
        const y =
          side === 1
            ? -halfH + 2 * halfH * t
            : side === 3
              ? halfH - 2 * halfH * t
              : side === 0
                ? -halfH
                : halfH;
        const reach = rayToEdge(counter, centre, Math.atan2(y, x));
        if (Number.isFinite(reach))
          cover = Math.max(cover, Math.hypot(x, y) / reach);
      }
    }
    return { unit, target, cover };
  };
  let geometry = measure();
  listen('resize', () => {
    geometry = measure();
  });

  const setPortal = (scale: number, travel: number) => {
    const tx = centre[0] + (geometry.target[0] - centre[0]) * travel;
    const ty = centre[1] + (geometry.target[1] - centre[1]) * travel;
    const transform = `translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${scale.toFixed(5)}) translate(${-centre[0]} ${-centre[1]})`;
    portals.forEach((portal) => portal.setAttribute('transform', transform));
  };

  seed.setAttribute('r', (SEED_RADIUS_PX / geometry.unit).toFixed(2));

  /* ----------------------------------------------------------- readiness -- */

  // The O only opens onto a finished first screen: the wordmark and the
  // hero's first frame decoded. Nothing further down the page is awaited.
  let ready = false;
  const heroVideo = document.querySelector<HTMLVideoElement>('.hero__media');
  const waits: Array<Promise<unknown>> = [];
  document
    .querySelectorAll<HTMLImageElement>('[data-site-logo] img')
    .forEach((mark) => waits.push(mark.decode().catch(noop)));
  if (heroVideo?.poster) {
    const poster = new Image();
    poster.src = heroVideo.poster;
    waits.push(poster.decode().catch(noop));
  }
  const readiness = Promise.all(waits).then(() => {
    ready = true;
  });

  /* ------------------------------------------------------------ timeline -- */

  const late = performance.now() > 1500;
  const hold = late ? 0.05 : TIMING.hold;
  const landing = (index: number) =>
    hold + index * TIMING.letterStagger + TIMING.letterDuration * 0.55;
  const lettersEnd =
    hold + (letters.length - 1) * TIMING.letterStagger + TIMING.letterDuration;
  const irisStart = lettersEnd + TIMING.tension;
  const growStart = irisStart + TIMING.iris - TIMING.irisOverlap;

  const tl = gsap.timeline({ paused: true, onComplete: finish });
  timeline = tl;
  if (late) tl.timeScale(1.35);

  // 1. The word, one letter at a time.
  letters.forEach((letter, index) => {
    tl.fromTo(
      letter,
      {
        opacity: 0,
        y: LETTER_RISE_PX / geometry.unit,
        scaleY: 0.96,
        transformOrigin: '50% 100%',
      },
      {
        opacity: 1,
        y: 0,
        scaleY: 1,
        duration: TIMING.letterDuration,
        ease: 'power3.out',
      },
      hold + index * TIMING.letterStagger,
    );
  });

  // 2. Pressure: every landing nudges the letters already set, then releases.
  const pressure = { t: 0 };
  tl.to(
    pressure,
    {
      t: lettersEnd + 0.5,
      duration: lettersEnd + 0.5,
      ease: 'none',
      onUpdate: () => {
        presses.forEach((press, index) => {
          let push = 0;
          for (let next = index + 1; next < letters.length; next += 1) {
            push += pressureEnvelope(pressure.t - landing(next));
          }
          const x = (-Math.min(push, 1.6) * PRESSURE_PX) / geometry.unit;
          press.setAttribute('transform', `translate(${x.toFixed(3)} 0)`);
        });
      },
    },
    0,
  );

  // 3. Tension: the seed marks the centre of the counter.
  tl.to(
    seed,
    { opacity: 1, duration: 0.16, ease: 'power2.out' },
    lettersEnd - 0.06,
  );

  // Hold here only if the first screen is not ready yet.
  tl.call(
    () => {
      if (ready) return;
      tl.pause();
      const resume = () => {
        if (!finished) tl.play();
      };
      void Promise.race([
        readiness,
        new Promise((resolve) =>
          window.setTimeout(resolve, TIMING.readinessCap * 1000),
        ),
      ]).then(resume);
    },
    [],
    irisStart - 0.001,
  );

  // 4. The counter opens from its centre: the first sight of the page.
  const iris = { k: 0 };
  tl.call(
    () => {
      root.dataset.introState = 'portal';
    },
    [],
    irisStart,
  );
  tl.to(
    iris,
    {
      k: 1,
      duration: TIMING.iris,
      ease: 'power2.inOut',
      onUpdate: () => {
        plug.setAttribute(
          'd',
          iris.k >= 1
            ? outer
            : `${outer}${scalePath(counterPath, centre, iris.k)}`,
        );
      },
      onComplete: () => {
        plug.style.display = 'none';
      },
    },
    irisStart,
  );
  tl.to(seed, { opacity: 0, duration: 0.22, ease: 'power1.in' }, growStart);

  // 5. The O grows until its counter is the whole screen.
  const grow = { t: 0 };
  const scaleEase = gsap.parseEase('power3.inOut');
  const travelEase = gsap.parseEase('power2.inOut');
  tl.call(
    () => {
      if (heroInner) {
        gsap.set(heroInner, {
          scale: HERO_SETTLE_FROM,
          transformOrigin: HERO_SETTLE_ORIGIN,
        });
      }
    },
    [],
    irisStart,
  );
  tl.to(
    grow,
    {
      t: 1,
      duration: TIMING.expansion,
      ease: 'none',
      onUpdate: () => {
        const end = Math.log(geometry.cover * OVERSHOOT);
        const scale = Math.exp(end * scaleEase(grow.t));
        setPortal(scale, travelEase(grow.t));
        const share = scale / geometry.cover;
        if (share >= REVEAL_SHARE && !revealed) {
          reveal();
          if (heroInner) {
            settle = gsap.to(heroInner, {
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
              clearProps: 'transform',
            });
          }
        }
        if (share >= 1.002) finish();
      },
    },
    growStart,
  );

  // The rest of the word holds for a beat, then gives way to the O.
  tl.to(
    leadLetters,
    { opacity: 0, duration: 0.4, ease: 'power1.in' },
    growStart + 0.14,
  );
  void finalLetter;

  tl.play(0);

  return () => {
    finish();
    settle?.progress(1);
  };
}
