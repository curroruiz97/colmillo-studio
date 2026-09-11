/*
 * The contact sculpture: a soft, slightly inflated orange piece with a large
 * piece missing from its left side.
 *
 * Pure geometry, no DOM and no GSAP. The server render uses it for the still
 * pose every device gets (`ContactSection.astro`), and `ContactBiteMotion.ts`
 * uses it for the live pose, so the two can never disagree.
 *
 * The outline is computed, not drawn: an inflated pebble (a polar radius with
 * a few low harmonics) minus a sphere, joined by a smooth SDF subtraction so
 * the shoulders of the bite stay rounded like clay. Pressure dents the side
 * the pointer comes from and lets the far side swell; the bite opens a few
 * units when the pointer is near it; the scoop itself shifts with the tilt,
 * so the silhouette really turns instead of a flat picture rotating.
 */

export interface SculptureState {
  /** Pointer in body units (1 = the body radius), eased. */
  px: number;
  py: number;
  /** 0..1: how present the pointer is. */
  presence: number;
  /** Squash on each axis around the foot; 1 at rest. */
  sx: number;
  sy: number;
  /** Extra depth of the bite; 0 at rest. */
  bite: number;
}

export interface Ellipse {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export interface SculptureFrame {
  /** Outline of the body. */
  body: string;
  /** Centre of the soft light and of the shade that darkens the far side. */
  light: { x: number; y: number };
  shade: { x: number; y: number };
  /** The scoop's inner wall and the thin light lip along the bite. */
  cavity: Ellipse;
  lip: Ellipse;
  /** Contact shadow under the foot. */
  shadow: Ellipse;
  /** 0..1 pressure, for the type that answers it. */
  press: number;
}

export const REST_STATE: SculptureState = {
  px: 0,
  py: 0,
  presence: 0,
  sx: 1,
  sy: 1,
  bite: 0,
};

/** The viewBox, cropped to the piece and its shadow with room to squash. */
export const VIEW_W = 1000;
export const VIEW_H = 860;
export const CENTER = { x: 500, y: 440 };
/** Body radius in viewBox units, and the piece's proportions. */
export const RADIUS = 315;
const AX = 1.06;
const AY = 0.9;
/** Squareness of the inflated cushion: 2 is an ellipse, higher is a pillow. */
const CUSHION = 2.8;

const BITE_ANGLE = Math.PI - 0.2;
const BITE_DISTANCE = 1.12;
const BITE_RADIUS = 0.56;
/** Softness of the bite's shoulders. */
const SMOOTH = 0.07;
const SAMPLES = 72;
const FOOT = CENTER.y + RADIUS * AY * 0.98;

const TAU = Math.PI * 2;
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const wrap = (angle: number) => Math.atan2(Math.sin(angle), Math.cos(angle));
const bell = (delta: number, width: number) =>
  Math.exp(-((wrap(delta) / width) ** 2));
const smoothMax = (a: number, b: number, k: number) => {
  const high = Math.max(a, b);
  return (
    high + k * Math.log(Math.exp((a - high) / k) + Math.exp((b - high) / k))
  );
};
const round = (value: number) => Math.round(value * 10) / 10;

/** An inflated cushion (a superellipse) with a few soft irregularities. */
const baseRadius = (theta: number) =>
  (Math.abs(Math.cos(theta)) ** CUSHION +
    Math.abs(Math.sin(theta)) ** CUSHION) **
    (-1 / CUSHION) *
  (1 +
    0.035 * Math.cos(2 * theta - 0.5) +
    0.02 * Math.cos(3 * theta + 1.2) +
    0.012 * Math.cos(5 * theta - 0.7));

/** First point where the ray at `theta` leaves the body. */
function boundary(
  theta: number,
  radius: number,
  bite: { x: number; y: number; r: number },
): number {
  const ux = Math.cos(theta);
  const uy = Math.sin(theta);
  const field = (t: number) =>
    smoothMax(
      t - radius,
      bite.r - Math.hypot(t * ux - bite.x, t * uy - bite.y),
      SMOOTH,
    );
  let inside = 0.3;
  let outside = 1.8;
  for (let t = 0.3; t <= 1.8; t += 0.025) {
    if (field(t) >= 0) {
      outside = t;
      break;
    }
    inside = t;
  }
  for (let step = 0; step < 10; step += 1) {
    const middle = (inside + outside) / 2;
    if (field(middle) >= 0) outside = middle;
    else inside = middle;
  }
  return (inside + outside) / 2;
}

/** Closed Catmull-Rom spline through the points, as cubic Béziers. */
function smoothPath(points: { x: number; y: number }[]): string {
  const count = points.length;
  const at = (index: number) => points[(index + count) % count]!;
  let path = `M${round(at(0).x)} ${round(at(0).y)}`;
  for (let index = 0; index < count; index += 1) {
    const p0 = at(index - 1);
    const p1 = at(index);
    const p2 = at(index + 1);
    const p3 = at(index + 2);
    path +=
      `C${round(p1.x + (p2.x - p0.x) / 6)} ${round(p1.y + (p2.y - p0.y) / 6)} ` +
      `${round(p2.x - (p3.x - p1.x) / 6)} ${round(p2.y - (p3.y - p1.y) / 6)} ` +
      `${round(p2.x)} ${round(p2.y)}`;
  }
  return `${path}Z`;
}

/** A point in viewBox units expressed in body units. */
export function toBodyUnits(x: number, y: number) {
  return {
    x: (x - CENTER.x) / (RADIUS * AX),
    y: (y - CENTER.y) / (RADIUS * AY),
  };
}

export function sculptureFrame(state: SculptureState): SculptureFrame {
  const distance = Math.hypot(state.px, state.py);
  const angle = Math.atan2(state.py, state.px);
  // Full on the body, fading out 0.9 radii beyond it.
  const reach = state.presence * clamp01((1.9 - distance) / 0.9);
  // Right at the centre there is no side to dent: the whole piece settles.
  const dent = reach * clamp01(distance / 0.35);
  const settle = reach * (1 - clamp01(distance / 0.35));
  const toward = distance > 1 ? 1 / distance : 1;
  const tilt = {
    x: state.px * toward * reach,
    y: state.py * toward * reach,
  };

  const bite = {
    x: BITE_DISTANCE * Math.cos(BITE_ANGLE) + tilt.x * 0.08,
    y: BITE_DISTANCE * Math.sin(BITE_ANGLE) + tilt.y * 0.06,
    r:
      BITE_RADIUS +
      state.bite * 0.14 +
      0.04 * dent * bell(angle - BITE_ANGLE, 0.9),
  };

  const place = (ux: number, uy: number) => ({
    x: CENTER.x + ux * RADIUS * AX * state.sx,
    y: FOOT + (CENTER.y + uy * RADIUS * AY - FOOT) * state.sy,
  });

  const points = Array.from({ length: SAMPLES }, (_, index) => {
    const theta = (index / SAMPLES) * TAU;
    const radius =
      baseRadius(theta) *
      (1 -
        0.07 * dent * bell(theta - angle, 0.55) +
        0.03 * dent * bell(theta - angle - Math.PI, 1.1)) *
      (1 - 0.02 * settle);
    const t = boundary(theta, radius, bite);
    return place(t * Math.cos(theta), t * Math.sin(theta));
  });

  const biteCentre = place(bite.x, bite.y);
  const biteRx = bite.r * RADIUS * AX * state.sx;
  const biteRy = bite.r * RADIUS * AY * state.sy;
  // Turning towards the bite shows more of its inner wall.
  const wall =
    RADIUS * (0.07 + 0.06 * clamp01(-tilt.x) + 0.03 * clamp01(tilt.y));
  const inward = { x: -Math.cos(BITE_ANGLE), y: -Math.sin(BITE_ANGLE) };
  const press = clamp01(reach * 0.8 + state.bite * 2);

  return {
    body: smoothPath(points),
    light: {
      x: round(CENTER.x + (-0.34 + tilt.x * 0.24) * RADIUS * AX),
      y: round(CENTER.y + (-0.42 + tilt.y * 0.2) * RADIUS * AY),
    },
    shade: {
      x: round(CENTER.x + (-0.18 + tilt.x * 0.12) * RADIUS * AX),
      y: round(CENTER.y + (-0.26 + tilt.y * 0.1) * RADIUS * AY),
    },
    cavity: {
      cx: round(biteCentre.x + inward.x * wall),
      cy: round(biteCentre.y + inward.y * wall),
      rx: round(biteRx),
      ry: round(biteRy),
    },
    lip: {
      cx: round(biteCentre.x),
      cy: round(biteCentre.y),
      rx: round(biteRx),
      ry: round(biteRy),
    },
    shadow: {
      cx: round(CENTER.x - tilt.x * 22),
      cy: round(FOOT + RADIUS * 0.05),
      rx: round(RADIUS * 0.82 * state.sx * (1 - 0.05 * press)),
      ry: round(RADIUS * 0.09),
    },
    press,
  };
}
