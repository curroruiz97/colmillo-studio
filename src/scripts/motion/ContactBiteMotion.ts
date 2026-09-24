import type { gsap as GsapCore } from 'gsap';
import type { ScrollTrigger as ScrollTriggerClass } from 'gsap/ScrollTrigger';
import {
  BODY_HALF_W,
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
 *   the far side and opens its bite near it. Resting the pointer on the body
 *   squeezes it like a stress ball — see THE SQUEEZE below — and letting go
 *   springs it back with a wobble. The whole piece drifts a few
 *   pixels after the pointer, and "muerda" gives way 1-3px under the same
 *   pressure. Touching "muerda" bites: squash, a deeper scoop,
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
    shadow: part('shadow'),
    dipShade: part('dip-shade'),
    dipLight: part('dip-light'),
  };
  if (!piece || !svg || Object.values(nodes).some((node) => !node)) {
    return () => undefined;
  }
  const { body, light, shade, shadow, dipShade, dipLight } = nodes as Record<
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
    setEllipse(dipShade, frame.dip.shade);
    setEllipse(dipLight, frame.dip.light);
    const dip = frame.dip.strength.toFixed(3);
    dipShade.setAttribute('opacity', dip);
    dipLight.setAttribute('opacity', dip);
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
      state.squish,
      state.pull,
      state.yaw,
      state.pitch,
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

  /*
   * THE HAND.
   *
   * Three things a hand does to a stress ball, from one pointer, with no
   * modifier to learn and nothing to be told:
   *
   *   RESTING on it presses it a little. `TOUCH` is barely a fifth of the way
   *     in, because a pointer that has not been clicked has not committed to
   *     anything, and because leaving the whole depth to the click is what
   *     gives the click something to do.
   *   HOLDING the button digs in the rest of the way: the outline gives where
   *     the pressure comes from, the skin buckles into a rim and wrinkles
   *     around the contact, and the dip shades itself.
   *   DRAGGING while held does one of two things, and the ball decides which
   *     from where the pointer is. On the ball it rolls, because the surface
   *     is still under the finger. Past its edge it stretches, because the
   *     surface is not: the material follows the pointer out into a tip with
   *     a neck behind it.
   *
   * `grip` is that decision, and it is a fade rather than a switch, so a drag
   * from the middle outwards rolls, then rolls less and pulls more, then only
   * pulls. Nothing announces the change and nothing needs to.
   *
   * Everything springs back. The press and the pull go with `elastic.out`,
   * because the ball is carrying the energy that was put into it; the push
   * itself is `power2.out` in a tenth of a second, because a finger meets a
   * surface at once. The roll coasts to a stop — a flick spins it, a pointer
   * that stopped before it lifted does not — and `HOME_WAIT` after the last
   * touch the ball finds its way back to the pose the page was served with,
   * the short way round, so one spun three times settles rather than
   * unwinding.
   *
   * Reduced motion never reaches here: the module leaves the still pose
   * alone, and a still ball that cannot be handled is the honest one.
   */
  const TOUCH = 0.22;
  const PRESSED = 1;
  const SOFTNESS = 0.68;
  const HOME_WAIT = 2.5;
  const HOME_TIME = 1.5;
  const PITCH_LIMIT = 1.05;

  let holding = false;
  let heldPointer = -1;
  let touching = false;
  let lastX = 0;
  let lastY = 0;
  let lastAt = 0;
  let spin = 0;
  let homeCall: gsap.core.Tween | null = null;

  const clamp = (value: number) => Math.min(1, Math.max(0, value));
  /** Where the pointer is on the ball, in body radii. */
  const reachOf = (event: PointerEvent) => {
    const at = toBodyUnits(
      (event.pageX - box.left) * box.scale,
      (event.pageY - box.top) * box.scale,
    );
    return { at, distance: Math.hypot(at.x, at.y) };
  };
  /** Deepest under the middle, nothing past the edge, stiffening as it goes. */
  const depthAt = (distance: number) =>
    clamp((0.95 - distance) / 0.68) ** SOFTNESS;
  /** How much of the ball is still under the pointer: 1 on it, 0 past it. */
  const gripAt = (distance: number) => clamp((1.12 - distance) / 0.45);

  const squeeze = (amount: number) => {
    gsap.killTweensOf(state, 'squish');
    gsap.to(state, {
      squish: amount,
      duration: 0.12,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };
  const drawOut = (amount: number) => {
    gsap.killTweensOf(state, 'pull');
    gsap.to(state, {
      pull: amount,
      duration: 0.18,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };
  const springTo = (squish: number) => {
    touching = squish > 0;
    gsap.killTweensOf(state, 'squish,pull');
    gsap.to(state, {
      squish,
      duration: 1.15,
      ease: 'elastic.out(1, 0.38)',
      overwrite: 'auto',
    });
    gsap.to(state, {
      pull: 0,
      duration: 1.3,
      ease: 'elastic.out(1, 0.32)',
      overwrite: 'auto',
    });
  };

  const stopHoming = () => {
    homeCall?.kill();
    homeCall = null;
    gsap.killTweensOf(state, 'yaw,pitch');
  };

  const goHome = () => {
    gsap.killTweensOf(state, 'yaw,pitch');
    // Rolling is periodic, so coming back is a choice of route: this is the
    // short one, and the only one that never looks like rewinding.
    state.yaw = Math.atan2(Math.sin(state.yaw), Math.cos(state.yaw));
    gsap.to(state, {
      yaw: 0,
      pitch: 0,
      duration: HOME_TIME,
      ease: 'power2.inOut',
      overwrite: 'auto',
    });
  };

  const onGrab = (event: PointerEvent) => {
    if (event.pointerType === 'touch' || event.button !== 0) return;
    holding = true;
    touching = true;
    heldPointer = event.pointerId;
    lastX = event.clientX;
    lastY = event.clientY;
    lastAt = event.timeStamp;
    spin = 0;
    stopHoming();
    piece.dataset.held = 'true';
    piece.setPointerCapture(event.pointerId);
    // The click on its own, with no movement at all, still digs in.
    squeeze(depthAt(reachOf(event).distance) * PRESSED);
    // Without this the drag starts a text selection instead.
    event.preventDefault();
  };

  const onDrag = (event: PointerEvent) => {
    if (!holding || event.pointerId !== heldPointer) return;
    const rate =
      (Math.PI / 2) *
      (box.scale / BODY_HALF_W) *
      gripAt(reachOf(event).distance);
    const dx = (event.clientX - lastX) * rate;
    const dy = (event.clientY - lastY) * rate;
    lastX = event.clientX;
    lastY = event.clientY;
    const elapsed = Math.max(8, event.timeStamp - lastAt);
    lastAt = event.timeStamp;
    state.yaw += dx;
    state.pitch = Math.min(
      PITCH_LIMIT,
      Math.max(-PITCH_LIMIT, state.pitch + dy),
    );
    // Smoothed, so one stuttering frame cannot decide what the flick was.
    spin = spin * 0.6 + (dx / elapsed) * 0.4;
  };

  const onLetGo = (event: PointerEvent) => {
    if (!holding || event.pointerId !== heldPointer) return;
    holding = false;
    heldPointer = -1;
    delete piece.dataset.held;
    // It springs back to whatever a pointer merely resting there would do.
    springTo(depthAt(reachOf(event).distance) * TOUCH);
    // A pointer that stopped before it lifted was not a flick.
    const still = event.timeStamp - lastAt > 120;
    const carry = still ? 0 : Math.max(-1.8, Math.min(1.8, spin * 260));
    if (Math.abs(carry) > 0.06) {
      gsap.to(state, {
        yaw: state.yaw + carry,
        duration: 0.9,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
    homeCall = gsap.delayedCall(HOME_WAIT, goHome);
  };

  const onMove = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    const { at, distance } = reachOf(event);
    follow.px(at.x);
    follow.py(at.y);
    follow.presence(1);
    const lean = Math.max(0, 1 - Math.max(0, distance - 1) / 1.2);
    follow.dx((at.x / Math.max(1, distance)) * lean * DRIFT);
    follow.dy((at.y / Math.max(1, distance)) * lean * DRIFT * 0.7);

    const depth = depthAt(distance);
    if (holding) {
      squeeze(depth * PRESSED);
      // Past its own edge the material follows the pointer instead.
      drawOut(clamp((distance - 1) / 1.15));
    } else if (depth > 0) {
      touching = true;
      squeeze(depth * TOUCH);
    } else if (touching) {
      springTo(0);
    }
  };
  const onLeave = () => {
    // A captured pointer still reports leaving the section; a hand that is
    // holding the ball has not let go of it.
    if (holding) return;
    springTo(0);
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
  /*
   * The grip goes on the piece, and the stylesheet only lets the painted body
   * answer, so the empty corners of its box are never a handle. It is declared
   * here rather than in the markup because a page whose motion never arrives
   * must not offer a grip it cannot honour: no chunk, no `data-bite-turn`, no
   * grab cursor, no pointer events.
   */
  piece.dataset.biteHandle = 'true';
  piece.dataset.cursorLabel = '';
  piece.addEventListener('pointerdown', onGrab);
  piece.addEventListener('pointermove', onDrag);
  piece.addEventListener('pointerup', onLetGo);
  piece.addEventListener('pointercancel', onLetGo);

  return () => {
    section.removeEventListener('pointermove', onMove);
    section.removeEventListener('pointerleave', onLeave);
    trigger?.removeEventListener('pointerenter', onBiteWord);
    piece.removeEventListener('pointerdown', onGrab);
    piece.removeEventListener('pointermove', onDrag);
    piece.removeEventListener('pointerup', onLetGo);
    piece.removeEventListener('pointercancel', onLetGo);
    delete piece.dataset.biteHandle;
    delete piece.dataset.held;
    delete piece.dataset.cursorLabel;
    stopHoming();
    gsap.killTweensOf(state, 'squish,pull');
    state.squish = 0;
    state.pull = 0;
    state.yaw = 0;
    state.pitch = 0;
    ScrollTrigger.removeEventListener('refresh', remeasure);
    resize.disconnect();
    biting?.kill();
    Object.values(follow).forEach((tween) => tween.tween.kill());
    releaseCursor();
    cleanupBase();
  };
}
