import gsap from 'gsap';

type Edge = 'top' | 'right' | 'bottom' | 'left';

interface EdgeState {
  /** How far the edge is pushed in, in CSS pixels. */
  depth: number;
  /** Where the dent peaks, as a fraction of the edge's straight run. */
  peak: number;
}

const EDGES: readonly Edge[] = ['top', 'right', 'bottom', 'left'];

/** Deepest dent, as a share of the surface's short side, clamped in pixels. */
const DEPTH_SHARE = 0.06;
const DEPTH_MIN = 16;
const DEPTH_MAX = 34;
/** A cursor at the centre still presses, at this share of the full depth. */
const DEPTH_FLOOR = 0.5;
/** Pressing the button pushes a little further. */
const PRESS_GAIN = 1.2;
/** Half the width of the dent, as a share of the surface's short side. */
const SPAN_SHARE = 0.3;
/** The dent never peaks closer than this to a corner (share of the run). */
const PEAK_LIMIT = 0.16;
/** Another edge only takes over once it is this much closer (short side). */
const HYSTERESIS = 0.06;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * Whether a surface may give under the pointer at all: a fine pointer that
 * can hover, with motion allowed. Touch, coarse pointers, keyboard and reduced
 * motion always keep the still picture.
 */
export function canPress(): boolean {
  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    document.documentElement.dataset.motion !== 'reduced'
  );
}

/**
 * The shared pressure dent (home project rail, Studio team portraits).
 *
 * Only the edge nearest the pointer bends, inwards, as a smooth dent whose
 * peak follows the pointer along that edge; the corners stay pinned and the
 * picture itself never moves or scales. The dent is a `clip-path: path()` on
 * `surface`, so the frame around it keeps its exact size and the page shows
 * through the bite. Anything outside the surface — a title, a name — is never
 * clipped or deformed.
 *
 * - `trigger` receives the pointer (it may be larger than the surface);
 * - `surface` is the layer that is clipped;
 * - `frame` supplies the corner radius the outline follows.
 *
 * The pointer only sets targets, at most once per frame; GSAP eases the depth
 * and the peak towards them, so the surface never tracks raw mouse pixels.
 * Callers decide eligibility with `canPress()`.
 */
export function bindPressSurface(
  trigger: HTMLElement,
  surface: HTMLElement,
  frame: HTMLElement,
): () => void {
  const edges = {
    top: { depth: 0, peak: 0.5 },
    right: { depth: 0, peak: 0.5 },
    bottom: { depth: 0, peak: 0.5 },
    left: { depth: 0, peak: 0.5 },
  } satisfies Record<Edge, EdgeState>;
  const targets: Record<Edge, number> = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
  const size = { width: 0, height: 0, radius: 0, depth: 0, span: 0 };
  const pointer = { x: 0, y: 0 };
  let active: Edge | null = null;
  let inside = false;
  let pressed = false;
  let frameRequest = 0;

  // Layout size, not the transformed box: a section may scale or shift the
  // surface while it is covered or revealed, and the path is drawn in the
  // surface's own units.
  const measure = () => {
    const style = getComputedStyle(surface);
    size.width = parseFloat(style.width) || surface.offsetWidth;
    size.height = parseFloat(style.height) || surface.offsetHeight;
    size.radius = parseFloat(getComputedStyle(frame).borderTopLeftRadius) || 0;
    size.depth = clamp(
      Math.min(size.width, size.height) * DEPTH_SHARE,
      DEPTH_MIN,
      DEPTH_MAX,
    );
    size.span = Math.min(size.width, size.height) * SPAN_SHARE;
  };

  const render = () => {
    const resting = EDGES.every((edge) => edges[edge].depth < 0.05);
    surface.style.clipPath =
      resting && !inside ? '' : `path('${outline(size, edges)}')`;
  };

  const ease = (
    edge: Edge,
    vars: Partial<EdgeState>,
    duration: number,
    curve: string,
  ) => {
    gsap.to(edges[edge], {
      ...vars,
      duration,
      ease: curve,
      overwrite: true,
      onUpdate: render,
      onComplete: render,
    });
  };

  const aim = () => {
    frameRequest = 0;
    if (!inside || !size.width || !size.height) return;

    const rect = surface.getBoundingClientRect();
    const x = clamp(
      (pointer.x - rect.left) / (rect.width / size.width || 1),
      0,
      size.width,
    );
    const y = clamp(
      (pointer.y - rect.top) / (rect.height / size.height || 1),
      0,
      size.height,
    );
    const distance: Record<Edge, number> = {
      top: y,
      right: size.width - x,
      bottom: size.height - y,
      left: x,
    };
    const short = Math.min(size.width, size.height);
    let nearest = EDGES.reduce((best, edge) =>
      distance[edge] < distance[best] ? edge : best,
    );
    if (
      active &&
      nearest !== active &&
      distance[active] - distance[nearest] < short * HYSTERESIS
    )
      nearest = active;
    const switched = nearest !== active;
    active = nearest;

    const closeness = 1 - Math.min(distance[nearest] / (short / 2), 1);
    const depth =
      size.depth *
      (DEPTH_FLOOR + (1 - DEPTH_FLOOR) * closeness) *
      (pressed ? PRESS_GAIN : 1);
    const run =
      nearest === 'top' || nearest === 'bottom' ? size.width : size.height;
    const along = nearest === 'top' || nearest === 'bottom' ? x : y;
    const straight = Math.max(1, run - 2 * size.radius);
    const peak = clamp(
      (along - size.radius) / straight,
      PEAK_LIMIT,
      1 - PEAK_LIMIT,
    );

    // A dent that is not there yet starts right under the pointer instead of
    // sliding in from wherever it last was.
    if (switched && edges[nearest].depth < 0.5) edges[nearest].peak = peak;

    for (const edge of EDGES) {
      const target = edge === nearest ? depth : 0;
      if (edge !== nearest && targets[edge] === 0) continue;
      targets[edge] = target;
      if (edge === nearest)
        ease(edge, { depth: target, peak }, 0.42, 'power3.out');
      else ease(edge, { depth: 0 }, 0.4, 'power2.out');
    }
  };

  const request = (event: PointerEvent) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    if (!frameRequest) frameRequest = requestAnimationFrame(aim);
  };

  const enter = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return;
    measure();
    inside = true;
    active = null;
    request(event);
  };

  const move = (event: PointerEvent) => {
    if (inside) request(event);
  };

  const leave = () => {
    inside = false;
    pressed = false;
    active = null;
    cancelAnimationFrame(frameRequest);
    frameRequest = 0;
    for (const edge of EDGES) {
      targets[edge] = 0;
      ease(edge, { depth: 0 }, 0.46, 'power3.out');
    }
  };

  const press = (event: PointerEvent) => {
    if (!inside || event.button !== 0) return;
    pressed = true;
    request(event);
  };

  const release = (event: PointerEvent) => {
    if (!pressed) return;
    pressed = false;
    if (inside) request(event);
  };

  trigger.addEventListener('pointerenter', enter);
  trigger.addEventListener('pointermove', move, { passive: true });
  trigger.addEventListener('pointerleave', leave);
  trigger.addEventListener('pointerdown', press);
  trigger.addEventListener('pointerup', release);
  trigger.addEventListener('pointercancel', leave);

  return () => {
    trigger.removeEventListener('pointerenter', enter);
    trigger.removeEventListener('pointermove', move);
    trigger.removeEventListener('pointerleave', leave);
    trigger.removeEventListener('pointerdown', press);
    trigger.removeEventListener('pointerup', release);
    trigger.removeEventListener('pointercancel', leave);
    cancelAnimationFrame(frameRequest);
    EDGES.forEach((edge) => gsap.killTweensOf(edges[edge]));
    surface.style.clipPath = '';
  };
}

/**
 * The surface's rounded outline with each edge bent inwards by its depth.
 * The outline runs one pixel outside the frame, whose own rounded clip draws
 * every straight edge, so the two clips never share an antialiased line.
 */
function outline(
  size: { width: number; height: number; radius: number; span: number },
  edges: Record<Edge, EdgeState>,
): string {
  const bleed = 1;
  const x0 = -bleed;
  const y0 = -bleed;
  const x1 = size.width + bleed;
  const y1 = size.height + bleed;
  const r = size.radius + bleed;
  const arc = (x: number, y: number) =>
    `A${f(r)} ${f(r)} 0 0 1 ${f(x)} ${f(y)}`;

  const span = size.span;

  return [
    `M${f(x0 + r)} ${f(y0)}`,
    side(x0 + r, y0, x1 - r, y0, 0, 1, edges.top, span),
    arc(x1, y0 + r),
    side(x1, y0 + r, x1, y1 - r, -1, 0, edges.right, span),
    arc(x1 - r, y1),
    // Bottom and left run backwards, so their peak fraction is mirrored to
    // keep it measured from the left and from the top like the others.
    side(x1 - r, y1, x0 + r, y1, 0, -1, mirror(edges.bottom), span),
    arc(x0, y1 - r),
    side(x0, y1 - r, x0, y0 + r, 1, 0, mirror(edges.left), span),
    arc(x0 + r, y0),
    'Z',
  ].join(' ');
}

const mirror = (edge: EdgeState): EdgeState => ({
  depth: edge.depth,
  peak: 1 - edge.peak,
});

/**
 * One straight run from A to B, dented towards the inward normal over at most
 * `span` on either side of the peak. Two cubic curves meet at the peak; both
 * leave the run and arrive at the peak parallel to it, so the dent joins the
 * straight edge and rounds its own crest without a kink. Near a corner the
 * flank on that side shortens, so the pressure gathers towards the corner.
 */
function side(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  nx: number,
  ny: number,
  edge: EdgeState,
  span: number,
): string {
  const depth = Math.max(0, edge.depth);
  if (depth < 0.05) return `L${f(bx)} ${f(by)}`;
  const length = Math.hypot(bx - ax, by - ay) || 1;
  const ux = (bx - ax) / length;
  const uy = (by - ay) / length;
  const at = length * edge.peak;
  const before = Math.min(span, at);
  const after = Math.min(span, length - at);
  // The run is drawn one bleed pixel outside the frame; lift past it so the
  // visible dent is exactly `depth`.
  const lift = depth + 1;
  const point = (along: number, offset = 0) =>
    `${f(ax + ux * along + nx * offset)} ${f(ay + uy * along + ny * offset)}`;

  return [
    `L${point(at - before)}`,
    `C${point(at - before / 2)} ${point(at - before / 2, lift)} ${point(at, lift)}`,
    `C${point(at + after / 2, lift)} ${point(at + after / 2)} ${point(at + after)}`,
    `L${f(bx)} ${f(by)}`,
  ].join(' ');
}

const f = (value: number) => value.toFixed(2);
