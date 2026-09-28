import {
  REST_STATE,
  VIEW_H,
  VIEW_W,
  sculptureFrame,
  toBodyUnits,
  type Ellipse,
  type SculptureState,
} from '@/scripts/motion/ContactSculpture';

/**
 * The stage's ball, live.
 *
 * It drops onto the word as the page opens and squashes it; a pointer over
 * the stage makes it lean and dip towards the pointer and turn a little
 * under it; holding presses it in. Whatever pressure the ball is under is
 * published as `--press` on the stage, and the word beneath it gives way.
 * A tap on touch squeezes it once. The geometry is the home contact
 * section's own (`ContactSculpture.ts`); this is only a lighter driver.
 *
 * There is no frame loop at rest: frames run while the state is still
 * travelling towards its target and stop when it arrives. Reduced motion
 * never binds, and keeps the still ball the server rendered.
 */

type Numeric = { [K in keyof SculptureState]: number };

const EASE = 0.16;
const SETTLED = 0.0015;

export function initBall() {
  const stage = document.querySelector<HTMLElement>('[data-stage]');
  const ball = stage?.querySelector<HTMLElement>('[data-ball]');
  const svg = ball?.querySelector<SVGSVGElement>('[data-ball-svg]');
  if (!stage || !ball || !svg) return;
  if (document.documentElement.dataset.motion === 'reduced') return;

  const part = <T extends Element>(name: string) =>
    svg.querySelector<T>(`[data-part="${name}"]`);
  const body = part<SVGPathElement>('body');
  const light = part<SVGRadialGradientElement>('light');
  const shade = part<SVGRadialGradientElement>('shade');
  const shadow = part<SVGEllipseElement>('shadow');
  const dipShade = part<SVGEllipseElement>('dip-shade');
  const dipLight = part<SVGEllipseElement>('dip-light');
  if (!body || !light || !shade || !shadow || !dipShade || !dipLight) return;

  const setEllipse = (node: SVGEllipseElement, e: Ellipse) => {
    node.setAttribute('cx', String(e.cx));
    node.setAttribute('cy', String(e.cy));
    node.setAttribute('rx', String(e.rx));
    node.setAttribute('ry', String(e.ry));
  };

  const state: Numeric = { ...REST_STATE };
  const target: Numeric = { ...REST_STATE };
  let frame = 0;
  let last = 0;

  const draw = () => {
    const f = sculptureFrame(state);
    body.setAttribute('d', f.body);
    light.setAttribute('cx', String(f.light.x));
    light.setAttribute('cy', String(f.light.y));
    shade.setAttribute('cx', String(f.shade.x));
    shade.setAttribute('cy', String(f.shade.y));
    setEllipse(shadow, f.shadow);
    setEllipse(dipShade, f.dip.shade);
    setEllipse(dipLight, f.dip.light);
    const dip = f.dip.strength.toFixed(3);
    dipShade.setAttribute('opacity', dip);
    dipLight.setAttribute('opacity', dip);
    // The word answers the squeeze and the landing, not a mere hover.
    const press = Math.min(1, state.squish * 0.9 + (1 - state.sy) * 3.2);
    stage.style.setProperty('--press', press.toFixed(3));
  };

  const tick = (now: number) => {
    const dt = last ? Math.min(64, now - last) : 16.7;
    last = now;
    const k = 1 - Math.pow(1 - EASE, dt / 16.7);
    let moving = false;
    for (const key of Object.keys(state) as (keyof Numeric)[]) {
      const delta = target[key] - state[key];
      if (Math.abs(delta) > SETTLED) {
        state[key] += delta * k;
        moving = true;
      } else {
        state[key] = target[key];
      }
    }
    draw();
    frame = moving ? requestAnimationFrame(tick) : 0;
    if (!moving) last = 0;
  };
  const wake = () => {
    if (!frame) frame = requestAnimationFrame(tick);
  };

  /* --------------------------------------------------------- pointer -- */

  const toState = (event: PointerEvent) => {
    const rect = svg.getBoundingClientRect();
    const vx = ((event.clientX - rect.left) / rect.width) * VIEW_W;
    const vy = ((event.clientY - rect.top) / rect.height) * VIEW_H;
    return toBodyUnits(vx, vy);
  };

  let held = false;
  const lean = (event: PointerEvent) => {
    const p = toState(event);
    target.px = p.x;
    target.py = p.y;
    target.presence = 1;
    // It turns a little towards the hand: the lumps walk through the outline.
    target.yaw = Math.max(-0.6, Math.min(0.6, p.x * 0.35));
    target.pitch = Math.max(-0.4, Math.min(0.4, -p.y * 0.25));
    wake();
  };
  const release = () => {
    held = false;
    target.squish = 0;
    wake();
  };
  const leave = () => {
    release();
    Object.assign(target, {
      presence: 0,
      px: 0,
      py: 0,
      yaw: 0,
      pitch: 0,
    });
    wake();
  };

  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  stage.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch' || !fine.matches) return;
    lean(event);
  });
  stage.addEventListener('pointerleave', leave);

  ball.addEventListener('pointerdown', (event) => {
    held = true;
    lean(event);
    target.squish = 1;
    wake();
    if (event.pointerType === 'touch') {
      // A tap squeezes once; a scroll that starts here cancels it.
      window.setTimeout(() => {
        if (held) leave();
      }, 380);
    }
  });
  window.addEventListener('pointerup', () => {
    if (!held) return;
    release();
  });
  ball.addEventListener('pointercancel', leave);

  /* ---------------------------------------------------------- landing -- */

  // The ball drops onto the word and squashes it, once, as the page opens.
  if (typeof ball.animate === 'function') {
    ball
      .animate(
        [
          { transform: 'translateY(-70vh)', offset: 0 },
          { transform: 'translateY(0)', offset: 1 },
        ],
        {
          duration: 720,
          easing: 'cubic-bezier(0.55, 0, 0.85, 0.35)',
          fill: 'backwards',
          delay: 120,
        },
      )
      .finished.then(() => {
        state.sy = 0.84;
        state.sx = 1.1;
        wake();
      })
      .catch(() => undefined);
  }
}
