/*
 * The contact sculpture: a soft orange stress ball.
 *
 * Pure geometry, no DOM and no GSAP. The server render uses it for the still
 * pose every device gets (`ContactSection.astro`), and `ContactBiteMotion.ts`
 * uses it for the live pose, so the two can never disagree.
 *
 * WHAT THE OBJECT IS (2026-09-24)
 *
 * A ball. Nothing is cut out of it any more — the bites went, at the client's
 * word, because a bitten form left readers asking what they were looking at
 * and a stress ball asks nobody anything. What is left has to carry three
 * things at once, and it carries all three by the same means: the folds in
 * its skin.
 *
 *   PRESS   the finger digs in. The outline gives way where the pressure
 *           comes from, and the dip shades itself — dark on the wall that
 *           faces the light, bright on the wall that faces away from it.
 *           Nothing is drawn on the skin: no line is ever stroked on this
 *           ball (client direction, 2026-09-24, twice). Every mark that was
 *           tried — standing folds, a rim around the contact, wrinkles
 *           leaving it — read as scratches at the size the ball is shown, so
 *           the press is carried by shading and by the outline alone.
 *   PULL    dragged past its own edge, the material follows the pointer out
 *           into a tip, leaves a neck behind it and takes the width from
 *           across the pull, because none of it appears from nowhere.
 *   ROLL    the ball turns under the finger.
 *
 * The roll is the one that needs help, and it has no marks to do it with.
 * It is carried by the shape itself: the ball is not perfectly round, its
 * unevenness belongs to the ball rather than to the room, and a lump only
 * shows where it reaches the limb — so rolling it walks the lumps through the
 * outline, which is the one thing a plain ball can do that a picture of a
 * plain ball cannot.
 *
 * What does NOT turn: the light, the shade, the ground shadow, the resting
 * sag of the outline, the dip and its rings. Those belong to the room, to
 * gravity and to the hand rather than to the object, and keeping them still
 * is most of what makes the roll read as a roll instead of as a picture being
 * rotated.
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
  /** A quick all-over pinch, for when "muerda" is bitten; 0 at rest. */
  bite: number;
  /**
   * 0..1, how far the finger is pushed into the ball. A pointer resting on it
   * barely presses; holding the button down is what digs in.
   */
  squish: number;
  /**
   * 0..1, how far the material has been drawn out past its own edge, towards
   * wherever `px`/`py` is. 0 unless the ball is being pulled.
   */
  pull: number;
  /**
   * The roll, in radians. `yaw` turns the ball about the vertical (positive
   * brings its left side towards the reader), `pitch` about the horizontal
   * (positive brings its top forward). Both are 0 in the pose the server
   * renders, and the driver eases them back to it after a drag.
   */
  yaw: number;
  pitch: number;
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
  /** The dip under the finger: its shaded wall and its lit one. */
  dip: { shade: Ellipse; light: Ellipse; strength: number };
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
  squish: 0,
  pull: 0,
  yaw: 0,
  pitch: 0,
};

/** The viewBox, cropped to the piece and its shadow with room to squash. */
export const VIEW_W = 1000;
export const VIEW_H = 860;
export const CENTER = { x: 500, y: 440 };
/** Body radius in viewBox units, and the piece's proportions. */
export const RADIUS = 315;
const AX = 1.06;
const AY = 0.9;
/**
 * Half the body width in viewBox units. The driver rolls the ball by this:
 * dragging across one of these is a quarter turn, so a drag across the whole
 * ball is half of one, which is the rate a thing held in the hand turns at.
 */
export const BODY_HALF_W = RADIUS * AX;
/** Squareness of the inflated cushion: 2 is an ellipse, higher is a pillow. */
const CUSHION = 2.8;

/*
 * THE PRESS.
 *
 * Pushing a rubber ball does four things at once, and the silhouette only
 * reads as rubber when all four are there. Each is a share of the radius, at
 * full press:
 *
 *   FINGER    the contact point caves in — narrow, so it reads as a fingertip
 *             rather than the whole side going soft;
 *   RIM       the material it displaces has to go somewhere, and it piles up
 *             in a ring just around the dent. This is the one that sells it;
 *   COMPRESS  the body flattens along the line of the push;
 *   POISSON   and widens across it, which is the same volume coming back out.
 *
 * All four only apply as far as the finger is out towards the edge, which is
 * the thing the first pass at this got wrong. Pushing the middle of a ball
 * drives the material away from the reader, not sideways: the outline barely
 * moves, and what it does do is SPREAD, because a ball flattened front to back
 * has to go somewhere. Pushing near the limb is the case where the outline
 * really is what gives.
 */
const FINGER = 0.15;
const RIM = 0.05;
const COMPRESS = 0.09;
const POISSON = 0.07;
const SPREAD = 0.05;
/** How narrow the fingertip is, and the ring of material around it. */
const FINGER_WIDTH = 0.5;
const RIM_WIDTH = 0.8;

/** The pull: the tip drawn out, the neck behind it, the width it costs. */
const TIP = 0.4;
const NECK = 0.15;
const ACROSS = 0.15;

const SAMPLES = 72;
const FOOT = CENTER.y + RADIUS * AY * 0.98;

const TAU = Math.PI * 2;
const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const wrap = (angle: number) => Math.atan2(Math.sin(angle), Math.cos(angle));
const bell = (delta: number, width: number) =>
  Math.exp(-((wrap(delta) / width) ** 2));
const round = (value: number) => Math.round(value * 10) / 10;

/* ---------------------------------------------------- the ball, in space --- */

/** Object space: x to the right, y up, z towards the reader. */
interface Vec3 {
  x: number;
  y: number;
  z: number;
}

const unit = (v: Vec3): Vec3 => {
  const length = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / length, y: v.y / length, z: v.z / length };
};

/** Pitch about the horizontal, then yaw about the vertical: a roll. */
const turn = (v: Vec3, yaw: number, pitch: number): Vec3 => {
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const y = v.y * cp - v.z * sp;
  const z = v.y * sp + v.z * cp;
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  return { x: v.x * cy + z * sy, y, z: -v.x * sy + z * cy };
};

/**
 * A lump: somewhere the ball is not quite round. It belongs to the ball, not
 * to the room, so it turns with it — and a lump only shows itself where it
 * reaches the limb, which is why rolling the ball walks its lumps through the
 * outline. With nothing drawn on the skin, this is the only thing that tells
 * a reader the ball is turning at all, so it is not decoration: see the note
 * at the top of the file before making it any smaller.
 */
interface Lump {
  dir: Vec3;
  /** Share of the radius it adds; negative is a soft flat spot. */
  size: number;
  /** How far round the ball it reaches. */
  width: number;
}

const LUMPS: Lump[] = [
  { dir: unit({ x: 0.92, y: 0.2, z: 0.33 }), size: 0.075, width: 0.9 },
  { dir: unit({ x: -0.5, y: 0.4, z: -0.77 }), size: 0.062, width: 1 },
  { dir: unit({ x: 0.12, y: -0.86, z: 0.5 }), size: -0.05, width: 0.8 },
];

/* ------------------------------------------------------------- the skin --- */

/** An inflated cushion (a superellipse) with a few soft irregularities. */
const baseRadius = (theta: number) =>
  (Math.abs(Math.cos(theta)) ** CUSHION +
    Math.abs(Math.sin(theta)) ** CUSHION) **
    (-1 / CUSHION) *
  (1 +
    0.035 * Math.cos(2 * theta - 0.5) +
    0.02 * Math.cos(3 * theta + 1.2) +
    0.012 * Math.cos(5 * theta - 0.7));

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
  // Right at the centre there is no side to dent: the whole ball settles.
  const dent = reach * clamp01(distance / 0.35);
  const settle = reach * (1 - clamp01(distance / 0.35));
  const toward = distance > 1 ? 1 / distance : 1;
  const tilt = {
    x: state.px * toward * reach,
    y: state.py * toward * reach,
  };

  const place = (ux: number, uy: number) => ({
    x: CENTER.x + ux * RADIUS * AX * state.sx,
    y: FOOT + (CENTER.y + uy * RADIUS * AY - FOOT) * state.sy,
  });

  const squish = clamp01(state.squish);
  const pull = clamp01(state.pull);
  /** How much of the push has a side of the ball to act on. */
  const edge = clamp01((distance - 0.28) / 0.55);

  const rubber = (theta: number) => {
    if (squish === 0) return 0;
    const delta = theta - angle;
    const finger = bell(delta, FINGER_WIDTH);
    // A ring in angle: wide bell minus narrow, so it peaks beside the dent.
    const ring = Math.max(0, bell(delta, RIM_WIDTH) - bell(delta, 0.36));
    const along = Math.cos(wrap(delta));
    const axis = along * along;
    return (
      squish *
      (edge *
        (-FINGER * finger +
          RIM * ring -
          COMPRESS * axis +
          POISSON * (1 - axis)) +
        (1 - edge) * SPREAD)
    );
  };

  const stretch = (theta: number) => {
    if (pull === 0) return 0;
    const delta = theta - angle;
    const tip = bell(delta, 0.62);
    const neck = Math.max(0, bell(delta, 1.2) - bell(delta, 0.66));
    const along = Math.cos(wrap(delta));
    return pull * (TIP * tip - NECK * neck - ACROSS * (1 - along * along));
  };

  /*
   * The ball's own unevenness, turned with it. The silhouette at a screen
   * bearing is the surface at the limb in that direction, so how much a lump
   * shows there is simply how far it is from that direction — which is why a
   * lump on the near face does nothing to the outline and the same lump, once
   * rolled round to the edge, is the whole of it.
   */
  const lumps = LUMPS.map((lump) => {
    const dir = turn(lump.dir, state.yaw, state.pitch);
    return { x: dir.x, y: dir.y, size: lump.size, width: lump.width };
  });
  const uneven = (theta: number) => {
    const lx = Math.cos(theta);
    const ly = -Math.sin(theta);
    let sum = 0;
    for (const lump of lumps) {
      const away = Math.acos(
        Math.min(1, Math.max(-1, lump.x * lx + lump.y * ly)),
      );
      sum += lump.size * Math.exp(-((away / lump.width) ** 2));
    }
    return sum;
  };

  /** The skin at a screen bearing, with everything being done to it. */
  const skinAt = (theta: number) =>
    baseRadius(theta) *
    (1 +
      uneven(theta) -
      0.07 * dent * bell(theta - angle, 0.55) +
      0.03 * dent * bell(theta - angle - Math.PI, 1.1) +
      rubber(theta) +
      stretch(theta)) *
    (1 - 0.02 * settle - 0.05 * state.bite);

  const points = Array.from({ length: SAMPLES }, (_, index) => {
    const theta = (index / SAMPLES) * TAU;
    const skin = skinAt(theta);
    return place(skin * Math.cos(theta), skin * Math.sin(theta));
  });

  /*
   * The dip itself. A depression is not a dark spot: the wall that faces the
   * light is the one in shadow and the wall facing away from it catches the
   * light, so it is two offset gradients and reads as a hole in the surface
   * rather than a mark on it.
   */
  const hold = distance > 0.92 ? 0.92 / distance : 1;
  const dipAt = place(state.px * hold, state.py * hold);
  const dipSize = RADIUS * (0.3 + 0.22 * squish);
  const dipShift = RADIUS * 0.17;

  /* What the type answers to: the bite, the press and the pull. */
  const press = clamp01(
    reach * 0.8 + state.bite * 2 + squish * 0.9 + pull * 0.5,
  );

  return {
    body: smoothPath(points),
    light: {
      x: round(
        CENTER.x +
          (-0.34 + tilt.x * 0.24 + state.px * squish * 0.22) * RADIUS * AX,
      ),
      y: round(
        CENTER.y +
          (-0.42 + tilt.y * 0.2 + state.py * squish * 0.22) * RADIUS * AY,
      ),
    },
    shade: {
      x: round(CENTER.x + (-0.18 + tilt.x * 0.12) * RADIUS * AX),
      y: round(CENTER.y + (-0.26 + tilt.y * 0.1) * RADIUS * AY),
    },
    dip: {
      shade: {
        cx: round(dipAt.x - dipShift * 0.62),
        cy: round(dipAt.y - dipShift * 0.78),
        rx: round(dipSize),
        ry: round(dipSize * 0.94),
      },
      light: {
        cx: round(dipAt.x + dipShift * 0.52),
        cy: round(dipAt.y + dipShift * 0.64),
        rx: round(dipSize * 0.84),
        ry: round(dipSize * 0.8),
      },
      strength: clamp01(squish * reach * 0.9),
    },
    /*
     * A squashed ball sits on more of the ground, so its contact shadow
     * spreads and tightens rather than only dimming.
     */
    shadow: {
      cx: round(CENTER.x - tilt.x * 22),
      cy: round(FOOT + RADIUS * 0.05),
      rx: round(RADIUS * 0.82 * state.sx * (1 - 0.05 * press + 0.12 * squish)),
      ry: round(RADIUS * 0.09 * (1 - 0.18 * squish)),
    },
    press,
  };
}
