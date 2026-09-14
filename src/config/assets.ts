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
 * Both files are checked by `scripts/check-brand-assets.mjs`, so the intrinsic
 * dimensions declared here are the ones the checker enforces. Consumers must
 * render them at their natural ratio.
 */
export const brandWordmark: {
  black: BrandImage;
  cream: BrandImage;
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
};

/**
 * Official hero loop supplied by the client.
 *
 * Final delivery of 2026-09-14, derived from the untouched
 * `public/assets/motion/hero/animacion hero final.webm` (3840x2160, opaque).
 * The master has no alpha, so these files are opaque with the paper baked as
 * `--color-white`. Two defects of the master were removed, nothing else:
 * its first 5.4 s sit on #fbfbfb (lifted to #fff, the ink untouched after
 * that point), and from 5.43 s a ~3 px black frame line runs round all four
 * edges (cropped). The crop is 2832x2124 at (504, 18): 4:3, every drawn pixel
 * of the loop inside it, so it fits the existing 4:3 hero frame unchanged.
 * Audio dropped. The earlier `hero-*-white` loop files stay beside them,
 * unpublished. Exact commands in `docs/EXECUTION_STATE.md` (2026-09-14).
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
 * unmixed onto `--color-white` (the ink and the orange keep their values),
 * rising from and sinking back into the paper over eight frames at each end so
 * the wrap is seamless, audio dropped. The unsuffixed cream set beside them is
 * the previous delivery, kept for reference.
 * One resolution serves every width: 1280 px is what a phone at 3x needs, and
 * the whole file is smaller than one hero variant.
 *
 * The poster is frame 8, the first complete picture; the first pass starts
 * there so the still and the first played frame are the same.
 */
export const studioMedia: LoopMedia = {
  webm: '/assets/motion/studio/studio-loop-white.webm',
  mp4: '/assets/motion/studio/studio-loop-white.mp4',
  poster: '/assets/motion/studio/studio-poster-white.webp',
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
 * Derived from the untouched `public/assets/motion/studio/video hero
 * studio.mp4` (1280x720, 24 fps, 144 frames). Three things only: a 960x720
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
