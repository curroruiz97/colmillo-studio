export interface MotionMedia {
  desktop: MotionMediaSource;
  mobile: MotionMediaSource;
  poster: string;
  width: number;
  height: number;
}

export interface MotionMediaSource {
  webm: string;
  mp4: string;
}

export interface BrandImage {
  src: string;
  width: number;
  height: number;
}

/**
 * Validated Colmillo wordmark derivatives.
 *
 * All three files are checked by `scripts/check-brand-assets.mjs`, so the
 * intrinsic dimensions declared here are the ones the checker enforces.
 * Consumers must render them at their natural ratio.
 *
 * `orange` is the mark the client made definitive on 2026-09-22, written by
 * `npm run media:brand` from their original (2170x725, 495 KB): the same
 * lockup as the other two, cropped to its drawn box, scaled to the black
 * derivative's drawn width so one CSS width gives both the same letter size,
 * and given the shared 12 px clear space. Its drawn ink measures rgb(199, 84,
 * 41) on average, within a few units of `--color-brand-orange` (#cd5730). It
 * is taller than the black mark because `studio` sits lower in the master;
 * nothing was stretched. Used by the home alone (`SiteLogo.astro`).
 */
export const brandWordmark: {
  black: BrandImage;
  cream: BrandImage;
  orange: BrandImage;
} = {
  black: {
    src: '/assets/brand/colmillo-wordmark-black.png',
    width: 906,
    height: 242,
  },
  cream: {
    src: '/assets/brand/colmillo-wordmark-cream.png',
    width: 865,
    height: 232,
  },
  orange: {
    src: '/assets/brand/colmillo-wordmark-orange.png',
    width: 906,
    height: 257,
  },
};

/**
 * Official hero loop supplied by the client.
 *
 * Final delivery of 2026-09-14, derived from the untouched
 * `media-src/animacion hero final.webm` (3840x2160, opaque). The master was
 * moved out of `public/` on 2026-09-25: anything under it is published, and a
 * client master is not for publishing.
 * The master has no alpha, so these files are opaque with the paper baked as
 * `--color-white`. Two defects of the master were removed, nothing else:
 * its first 5.4 s sit on #fbfbfb (lifted to #fff, the ink untouched after
 * that point), and from 5.43 s a ~3 px black frame line runs round all four
 * edges (cropped). The crop is 2832x2124 at (504, 18): 4:3, every drawn pixel
 * of the loop inside it, so it fits the existing 4:3 hero frame unchanged.
 * Audio dropped. The earlier `hero-*-white` loop files stay beside them,
 * unpublished. Exact commands in `docs/EXECUTION_STATE.md` (2026-09-14).
 *
 * THIS SET IS DELIBERATELY THE WHITE ONE, AND MUST STAY WHITE (2026-09-22).
 * The light surface went back to `--color-brand-cream`, and rather than
 * re-encode the client's final master, the hero composites it:
 * `hero-section.css` blends the loop and its still with
 * `mix-blend-mode: multiply` inside an isolated frame. White is that
 * operator's identity, so the baked paper drops out and the cream shows
 * through it exactly, while the ink stays ink. A cream-baked hero would be
 * the wrong file here — it would multiply cream by cream and darken the
 * frame — which is why `npm run check:hero` pins the hero to the `-white`
 * set for as long as the blend is in the stylesheet.
 *
 * The blend also absorbs what an exact bake cannot: the codec's one-to-three
 * level drift across the flat paper, which would otherwise draw its own faint
 * rectangle on a flat page.
 */
export const heroMedia: MotionMedia = {
  desktop: {
    webm: '/assets/motion/hero/hero-final-desktop-white.webm',
    mp4: '/assets/motion/hero/hero-final-desktop-white.mp4',
  },
  mobile: {
    webm: '/assets/motion/hero/hero-final-mobile-white.webm',
    mp4: '/assets/motion/hero/hero-final-mobile-white.mp4',
  },
  poster: '/assets/motion/hero/hero-final-poster-white.webp',
  width: 1440,
  height: 1080,
};

export interface LoopMedia extends MotionMediaSource {
  poster: string;
  /** Seconds into the file where the poster frame sits. */
  posterTime: number;
  width: number;
  height: number;
}

/**
 * Home Studio loop supplied by the client.
 *
 * Derived from `public/assets/video estudio.mp4` by
 * `scripts/prepare-studio-media.mjs`: cropped to the drawing's rows, its paper
 * moved onto `--color-brand-cream` (the ink and the orange move by at most 2%),
 * rising from and sinking back into the paper over eight frames at each end so
 * the wrap is seamless, audio dropped. Both papers are derived from the same
 * master by the same script; the `-white` set beside them is the one the site
 * published while the light surface was white (2026-09-10 to 2026-09-22) and
 * is kept for reference.
 * One resolution serves every width: 1280 px is what a phone at 3x needs, and
 * the whole file is smaller than one hero variant.
 *
 * The poster is frame 8, the first complete picture; the first pass starts
 * there so the still and the first played frame are the same.
 */
export const studioMedia: LoopMedia = {
  webm: '/assets/motion/studio/studio-loop.webm',
  mp4: '/assets/motion/studio/studio-loop.mp4',
  poster: '/assets/motion/studio/studio-poster.webp',
  posterTime: 8 / 24,
  width: 1280,
  height: 512,
};

/**
 * The permanent visual behind the home goodbye stage: one loop or one still
 * that stays in place while the slides change over it. It is decorative — the
 * slides carry the meaning — so it is hidden from assistive technology.
 *
 * On trial since 2026-09-11 at the user's request: the still supplied as
 * `public/assets/bg panoramica.png` (2048x768), published as a WebP derivative
 * by `scripts/prepare-goodbye-media.mjs`. Final approval is still open
 * (`docs/CONTENT_NEEDED.md`); the section stays demo-only while its copy is a
 * placeholder. `null` restores the structural placeholder panorama.
 */
export type GoodbyeVisual =
  ({ kind: 'video' } & MotionMedia) | ({ kind: 'image' } & BrandImage);

export const goodbyeVisual: GoodbyeVisual | null = {
  kind: 'image',
  src: '/assets/goodbye/goodbye-panorama.webp',
  width: 2048,
  height: 768,
};

/**
 * Home manifesto illustration supplied by the client.
 *
 * `public/assets/manifesto.png` is line art with a real alpha channel: the
 * sheet, the shirts and the background are all transparent, so it composites
 * directly on the page surface, cream or white, with no derivative. Roughly a fifth of the file on each side is
 * empty padding — the drawn ink occupies 1032x634 inside the 1600x900 frame —
 * so the layout sizes the box for the padding, not for the ink.
 */
export const manifestoIllustration: BrandImage = {
  src: '/assets/manifesto.png',
  width: 1600,
  height: 900,
};

/**
 * Home services illustration supplied by the client.
 *
 * Line art with a real alpha channel, drawn in the brand palette (`#d25731`
 * and `#f6e5cf`, the orange and the cream), so it composites straight onto the
 * ink surface with no plate or blend mode: the clothing is transparent and the
 * section shows through it, which is the hero loop's own trick inverted.
 *
 * Roughly a fifth of the supplied file was empty padding, and unlike the
 * manifesto this layout has no room to pay for it — the art is sized by its
 * column, so the padding would have eaten a fifth of the column. The drawn ink
 * occupies 1202x696 of the 1536x1024 original, and
 * `scripts/trim-transparent-png.mjs` wrote the cropped derivative below. The
 * untouched original lives in `media-src/servicios.png`, beside the hero
 * source, so it is preserved without shipping 283 KB of unused pixels.
 */
export const servicesIllustration: BrandImage = {
  src: '/assets/servicios-trimmed.png',
  width: 1202,
  height: 696,
};

/*
 * Per-service illustrations supplied by the client on 2026-09-11 for
 * Identidad, Digital and Contenido (Estrategia keeps the shared illustration
 * above). The 1600x900 RGBA PNGs (`public/assets/servicio *.png`) are left
 * untouched; `npm run media:services` crops their transparent margin on the
 * alpha channel, scales them to 1200px wide and writes these WebP derivatives
 * with the alpha intact. No colour is changed: unlike the shared art, their
 * clothing is opaque near-black (about RGB 11-16), a shade under the ink.
 */
export const servicesIdentityIllustration: BrandImage = {
  src: '/assets/services/servicio-identidad.webp',
  width: 1200,
  height: 658,
};

export const servicesDigitalIllustration: BrandImage = {
  src: '/assets/services/servicio-digital.webp',
  width: 1200,
  height: 574,
};

export const servicesContentIllustration: BrandImage = {
  src: '/assets/services/servicio-contenido.webp',
  width: 1200,
  height: 610,
};

/**
 * `/studio/` hero loop supplied by the client on 2026-09-14.
 *
 * It sits in a 4:3 frame on the right of the charcoal hero, fitted with
 * `object-fit: contain`, playing `autoplay muted loop playsinline` with no
 * controls, paused off screen, in a background tab and under reduced motion.
 * `null` restores the plain surface.
 *
 * Derived from the untouched `media-src/video hero studio.mp4` (1280x720, 24 fps, 144 frames). Three things only: a 960x720
 * crop at x=192, 4:3 like the frame, with every drawn pixel of every frame
 * inside it (the ink spans x 259-1086, y 106-654), so the drawing fills the
 * frame instead of floating in the file's side margins; a seam, because the
 * last pose of the master is not its first: frames 9-136 play as they are and
 * the last eight frames dissolve into the first eight, so the wrap has no
 * jump (136 frames, 5.67 s); and a black-level lift, because the master's flat
 * ground (#161616) read as a darker box on the page: `v + 9.85 * (1 - v/255)`
 * per channel puts it on the route's #1f1f1f and leaves the cream strokes
 * (240 -> 241) as they are. Audio dropped. The poster is the loop's first
 * frame.
 */
export interface StudioHeroMedia extends MotionMediaSource {
  poster: string;
  width: number;
  height: number;
}

export const studioHeroMedia: StudioHeroMedia | null = {
  webm: '/assets/motion/studio-page/studio-hero-loop.webm',
  mp4: '/assets/motion/studio-page/studio-hero-loop.mp4',
  poster: '/assets/motion/studio-page/studio-hero-poster.webp',
  width: 960,
  height: 720,
};

/**
 * One replaceable media slot on an editorial page: an image, or a silent loop
 * with its poster. An empty `alt` marks the piece decorative (hidden from
 * assistive technology). `fit` is `cover` for photographs and video, which
 * fill their frame, and `contain` for illustrations, which stay whole on their
 * plate. Rendered by `src/components/services/ServiceMedia.astro`.
 */
export type PageMedia =
  | {
      kind: 'image';
      src: string;
      width: number;
      height: number;
      alt: string;
      fit: 'cover' | 'contain';
    }
  | {
      kind: 'video';
      webm: string | null;
      mp4: string | null;
      poster: string;
      width: number;
      height: number;
      alt: string;
      fit: 'cover' | 'contain';
    };

/**
 * `/servicios/` hero loop supplied by the client on 2026-09-15: two figures
 * building a geometric structure, cream line art on black.
 *
 * Published as delivered, untouched and under its own name (the space is
 * URL-encoded here): H.264, 1280x720, 24 fps, 144 frames (6 s), plus an audio
 * track the page never plays (the loop is muted). Sampled across the clip in
 * Chromium, its flat ground decodes to #0d0d0b and the drawing never leaves
 * x 209-1113, y 112-621, so a 16:9 frame with `object-fit: contain` shows it
 * whole and the hero's ground is that same black (`services-page.css`). The
 * last frame is not the first, so each pass wraps with a small cut. The
 * poster is the loop's first frame, extracted in Chromium. Decorative
 * (`alt: ''`); it plays only on screen, uncovered, in a visible tab and never
 * under reduced motion (`ServicesPageMotion.ts`). `null` restores the
 * abstract plates.
 */
export const servicesHeroMedia: PageMedia | null = {
  kind: 'video',
  webm: null,
  mp4: '/assets/services/video%20hero%20servicios.mp4',
  poster: '/assets/services/servicios-hero-poster.webp',
  width: 1280,
  height: 720,
  alt: '',
  fit: 'contain',
};

/**
 * `/proyectos/` hero loop supplied by the client on 2026-09-16: two figures
 * hanging framed pieces on a wall, black line art on a flat pale ground.
 *
 * Published as delivered, untouched and under its own name (the space is
 * URL-encoded here), the way `/servicios/` publishes its own: H.264,
 * 1280x720, 24 fps, 144 frames (6.02 s), plus an audio track the page never
 * plays (the loop is muted). Measured across the clip in Chromium: the ground
 * holds 243-244, 241-242, 237-238 (about #f4f2ee) from the first frame to the
 * last, and the drawing never leaves the middle 83%, keeping at least 8.1% of
 * empty ground on every side. So a 16:9 frame with `object-fit: contain`
 * shows it whole, and the outer 8% can be faded into the page without
 * touching a drawn pixel — which is what `projects-page.css` does, because
 * that ground sits a shade under the route's white and would otherwise read
 * as a pale panel with a hard edge. No filter, tint or blend touches the
 * drawing.
 *
 * Two defects of the master are listed in `docs/CONTENT_NEEDED.md`: its
 * ground is not the page's white, and its last frame is not its first, so
 * each pass wraps with a small cut.
 *
 * The poster is the loop's first frame, extracted in Chromium and written as
 * WebP (quality 86). Decorative (`alt: ''`); `ProjectsPageMotion.ts` plays
 * the loop only while it is on screen and in a visible tab, and never under
 * reduced motion, where the poster is the whole picture. `null` restores the
 * plain surface.
 */
export const projectsHeroMedia: PageMedia | null = {
  kind: 'video',
  webm: null,
  mp4: '/assets/projects/video%20hero%20proyectos.mp4',
  poster: '/assets/projects/proyectos-hero-poster.webp',
  width: 1280,
  height: 720,
  alt: '',
  fit: 'contain',
};

/**
 * The scene behind the `/proyectos/` close, supplied by the client on
 * 2026-09-16 (`public/assets/projects/bg cta proyectos.png`, kept untouched).
 * Published as a WebP derivative by `npm run media:projects`.
 *
 * 2172x724, exactly 3:1: orange-and-metal sculptures enter from both ends and
 * the middle is empty paper, so the closing copy stands in that gap. Measured
 * on the derivative: ink reaches 30.3% of the width from the left and starts
 * again at 68.1% over the full height (24.0% and 74.4% across the middle half,
 * where the copy sits).
 *
 * One treatment, and it is the reason the scene works: the master's paper is
 * 254,253,251, a hair under the page's own white, so a rectangle of it on this
 * route's white sheet shows its own edges. The script scales every channel by
 * 255/251, the same kind of white-point lift the hero master was given, which
 * clamps the paper to #ffffff and leaves the drawing where it is. The picture
 * then has no visible boundary on the page — only its sculptures — so the
 * close can draw each end at the size the composition wants
 * (`projects-page.css`) with no seam, band or plate anywhere. Approval of that
 * lift is open (`docs/CONTENT_NEEDED.md`).
 *
 * Decorative — the question says everything — so it is rendered with empty
 * alternative text. `null` restores the plain white close.
 */
export const projectsCloseScene: BrandImage | null = {
  src: '/assets/projects/proyectos-cta.webp',
  width: 2172,
  height: 724,
};
