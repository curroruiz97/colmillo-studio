import type { gsap as GsapCore } from 'gsap';
import type { ScrollTrigger as ScrollTriggerClass } from 'gsap/ScrollTrigger';
import {
  REST_STATE,
  sculptureFrame,
  toBodyUnits,
  VIEW_W,
  type Ellipse,
  type SculptureState,
} from './ContactSculpture';

/**
 * The shared GSAP instance, handed over by `ContactBite.ts`. This chunk
 * imports GSAP for its types only, so bundling it never moves GSAP out of the
 * shared motion bundle into a chunk of its own.
 */
export interface MotionTools {
  gsap: typeof GsapCore;
  ScrollTrigger: typeof ScrollTriggerClass;
}

/*
 * "La última mordida": the home contact close.
 *
 * - Entrance, every capability, as one choreography: the eyebrow, the two
 *   lines, "muerda" revealed from a slight squeeze, the sculpture released
 *   from a squash back into its shape, then the channel rules and rows.
 * - Fine pointer only: the pointer is eased into the sculpture's state (a
 *   heavy follow), and the SVG is redrawn from `ContactSculpture.ts`: it
 *   tilts towards the pointer, dents where the pressure comes from, swells on
 *   the far side and opens its bite near it. The whole piece drifts a few
 *   pixels after the pointer, and "muerda" gives way 1-3px under the same
 *   pressure. Touching the piece or "muerda" bites: squash, a deeper scoop,
 *   release.
 *
 * One pointer listener feeds `quickTo`s; the one ticker callback that draws
 * runs only while the section is on screen and skips frames where nothing
 * changed. Reduced motion keeps a short fade and the still piece.
 */

const FINE_POINTER = '(hover: hover) and (pointer: fine)';
/** Seconds the sculpture takes to follow the pointer: soft, never nervous. */
const FOLLOW = 0.95;
/** Furthest the whole piece drifts towards the pointer, in px. */
const DRIFT = 18;

const setEllipse = (node: Element, ellipse: Ellipse) => {
  node.setAttribute('cx', String(ellipse.cx));
  node.setAttribute('cy', String(ellipse.cy));
  node.setAttribute('rx', String(ellipse.rx));
  node.setAttribute('ry', String(ellipse.ry));
};

export function mountContactBite(
  section: HTMLElement,
  { gsap, ScrollTrigger }: MotionTools,
): () => void {
  const piece = section.querySelector<HTMLElement>('[data-bite-piece]');
  const svg = section.querySelector<SVGSVGElement>('[data-bite-sculpture]');
  const part = (name: string) =>
    section.querySelector(`[data-sculpture="${name}"]`);
  const nodes = {
    body: part('body'),
    light: part('light'),
    shade: part('shade'),
    cavity: part('cavity'),
    lip: part('lip'),
    shadow: part('shadow'),
  };
  if (!piece || !svg || Object.values(nodes).some((node) => !node)) {
    return () => undefined;
  }
  const { body, light, shade, cavity, lip, shadow } = nodes as Record<
    keyof typeof nodes,
    Element
  >;

  const reduced = document.documentElement.dataset.motion === 'reduced';
  const fine = !reduced && window.matchMedia(FINE_POINTER).matches;
  const q = gsap.utils.selector(section);
  section.dataset.biteEnhanced = 'true';

  const state: SculptureState = { ...REST_STATE };
  const drift = { x: 0, y: 0 };

  const draw = () => {
    const frame = sculptureFrame(state);
    body.setAttribute('d', frame.body);
    light.setAttribute('cx', String(frame.light.x));
    light.setAttribute('cy', String(frame.light.y));
    shade.setAttribute('cx', String(frame.shade.x));
    shade.setAttribute('cy', String(frame.shade.y));
    setEllipse(cavity, frame.cavity);
    setEllipse(lip, frame.lip);
    setEllipse(shadow, frame.shadow);
    section.style.setProperty('--press', frame.press.toFixed(3));
    section.style.setProperty('--lean-x', `${drift.x.toFixed(2)}px`);
    section.style.setProperty('--lean-y', `${drift.y.toFixed(2)}px`);
  };

  let drawn = '';
  const tick = () => {
    const key = [
      state.px,
      state.py,
      state.presence,
      state.sx,
      state.sy,
      state.bite,
      drift.x,
      drift.y,
    ]
      .map((value) => value.toFixed(3))
      .join(' ');
    if (key === drawn) return;
    drawn = key;
    draw();
  };

  let ticking = false;
  const setTicking = (on: boolean) => {
    if (on === ticking || reduced) return;
    ticking = on;
    if (on) gsap.ticker.add(tick);
    else gsap.ticker.remove(tick);
  };

  /*
   * Every entrance tween names both ends: a `from` reads its end back from
   * the element, and a from-state already on it (a restarted module) then
   * became the end too.
   */
  const shown = { opacity: 1, x: 0, y: 0, xPercent: 0, yPercent: 0 };
  const context = gsap.context(() => {
    gsap.set(section, { '--bite': 0 });
    const entrance = gsap.timeline({ paused: true });

    if (reduced) {
      entrance
        .fromTo(
          q('[data-bite-kicker], [data-bite-line], [data-bite-row]'),
          { opacity: 0, y: 10 },
          { ...shown, duration: 0.45, stagger: 0.04, ease: 'power2.out' },
        )
        .fromTo(
          piece,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: 'power1.out' },
          0,
        );
    } else {
      entrance
        .fromTo(
          q('[data-bite-line="1"]'),
          { yPercent: 60, opacity: 0 },
          { ...shown, duration: 0.85, ease: 'power4.out' },
          0.1,
        )
        .fromTo(
          q('[data-bite-line="2"]'),
          { yPercent: 60, opacity: 0 },
          { ...shown, duration: 0.85, ease: 'power4.out' },
          0.2,
        )
        // Revealed from its left edge while it lets go of a slight squeeze.
        .fromTo(
          q('[data-bite-line="3"]'),
          {
            yPercent: 24,
            scaleX: 0.9,
            scaleY: 1.08,
            opacity: 0,
            clipPath: 'inset(-20% 100% -30% -6%)',
            transformOrigin: '0% 100%',
          },
          {
            ...shown,
            scaleX: 1,
            scaleY: 1,
            clipPath: 'inset(-20% -6% -30% -6%)',
            duration: 1,
            ease: 'power3.out',
            clearProps: 'clipPath',
          },
          0.34,
        )
        .fromTo(
          piece,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
          0.3,
        )
        // The piece arrives squashed and slightly more bitten, and recovers.
        .fromTo(
          state,
          { sx: 1.1, sy: 0.86, bite: 0.14 },
          { sx: 1, sy: 1, bite: 0, duration: 1.15, ease: 'back.out(1.5)' },
          0.34,
        )
        .fromTo(
          q('[data-bite-row]'),
          { y: 18, opacity: 0 },
          { ...shown, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
          0.82,
        );
    }

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      entrance.play();
    };
    // `end: 'max'` keeps every position past the start inside the trigger, so
    // a deep link, a restored position or a late refresh cannot skip it.
    const reveal = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      end: 'max',
      onEnter: play,
      onRefresh: (self) => {
        if (self.progress > 0) play();
      },
    });
    if (
      reveal.progress > 0 ||
      section.getBoundingClientRect().top < window.innerHeight * 0.7
    ) {
      play();
    }

    // Draw only while the section is on screen.
    const onScreen = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => setTicking(self.isActive),
    });
    setTicking(onScreen.isActive);
  });

  const cleanupBase = () => {
    setTicking(false);
    context.revert();
    Object.assign(state, REST_STATE);
    drift.x = 0;
    drift.y = 0;
    draw();
    ['--press', '--lean-x', '--lean-y', '--bite'].forEach((property) =>
      section.style.removeProperty(property),
    );
    delete section.dataset.biteEnhanced;
    delete section.dataset.biting;
  };

  if (!fine) return cleanupBase;

  const trigger = section.querySelector<HTMLElement>('[data-bite-trigger]');
  const cursor = document.querySelector<HTMLElement>('[data-custom-cursor]');

  // Page position of the sculpture box and viewBox units per px.
  const measure = () => {
    const rect = svg.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX - drift.x,
      top: rect.top + window.scrollY - drift.y,
      scale: VIEW_W / rect.width,
    };
  };
  let box = measure();

  const follow = {
    px: gsap.quickTo(state, 'px', { duration: FOLLOW, ease: 'power3.out' }),
    py: gsap.quickTo(state, 'py', { duration: FOLLOW, ease: 'power3.out' }),
    presence: gsap.quickTo(state, 'presence', {
      duration: FOLLOW,
      ease: 'power2.out',
    }),
    dx: gsap.quickTo(drift, 'x', { duration: 1.2, ease: 'power3.out' }),
    dy: gsap.quickTo(drift, 'y', { duration: 1.2, ease: 'power3.out' }),
  };

  let biting: gsap.core.Timeline | null = null;
  let pressedCursor = false;
  const releaseCursor = () => {
    if (pressedCursor && cursor) cursor.dataset.pressed = 'false';
    pressedCursor = false;
  };
  // Squeeze, dig in, let go: about 0.65 s, no cartoon bounce.
  const bite = () => {
    if (biting?.isActive()) return;
    section.dataset.biting = 'true';
    if (cursor && cursor.dataset.pressed !== 'true') {
      cursor.dataset.pressed = 'true';
      pressedCursor = true;
    }
    biting = gsap
      .timeline({
        onComplete: () => {
          delete section.dataset.biting;
          releaseCursor();
        },
      })
      .to(state, { sx: 0.95, sy: 1.045, bite: 0.16, duration: 0.15 }, 0)
      .to(section, { '--bite': 1, duration: 0.15, ease: 'power3.out' }, 0)
      .to(
        state,
        { sx: 1, sy: 1, bite: 0, duration: 0.48, ease: 'back.out(1.7)' },
        0.18,
      )
      .to(section, { '--bite': 0, duration: 0.42, ease: 'power2.out' }, 0.18);
  };

  let inside = false;
  const onMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    const unit = toBodyUnits(
      (event.pageX - box.left) * box.scale,
      (event.pageY - box.top) * box.scale,
    );
    follow.px(unit.x);
    follow.py(unit.y);
    follow.presence(1);
    const distance = Math.hypot(unit.x, unit.y);
    const pull = Math.max(0, 1 - Math.max(0, distance - 1) / 1.2);
    follow.dx((unit.x / Math.max(1, distance)) * pull * DRIFT);
    follow.dy((unit.y / Math.max(1, distance)) * pull * DRIFT * 0.7);
    const nowInside = distance < 0.85;
    if (nowInside && !inside) bite();
    inside = nowInside;
  };
  const onLeave = () => {
    inside = false;
    follow.presence(0);
    follow.dx(0);
    follow.dy(0);
  };
  const onBiteWord = (event: PointerEvent) => {
    if (event.pointerType !== 'touch') bite();
  };

  const remeasure = () => {
    box = measure();
  };
  const resize = new ResizeObserver(remeasure);
  resize.observe(svg);
  ScrollTrigger.addEventListener('refresh', remeasure);

  section.addEventListener('pointermove', onMove, { passive: true });
  section.addEventListener('pointerleave', onLeave);
  trigger?.addEventListener('pointerenter', onBiteWord);

  return () => {
    section.removeEventListener('pointermove', onMove);
    section.removeEventListener('pointerleave', onLeave);
    trigger?.removeEventListener('pointerenter', onBiteWord);
    ScrollTrigger.removeEventListener('refresh', remeasure);
    resize.disconnect();
    biting?.kill();
    Object.values(follow).forEach((tween) => tween.tween.kill());
    releaseCursor();
    cleanupBase();
  };
}
