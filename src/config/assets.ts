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
 * Derived from `media-src/WEB.webm` by `scripts/prepare-hero-media.mjs`.
 * The WebM carries a real alpha channel; the MP4 is the same picture already
 * flattened over `--color-white` for decoders without WebM alpha. Both
 * therefore render identically over the white hero surface. The unsuffixed
 * cream set beside them is the original delivery, kept and unpublished.
 */
export const heroMedia: MotionMedia = {
  desktop: {
    webm: '/assets/motion/hero/hero-desktop-white.webm',
    mp4: '/assets/motion/hero/hero-desktop-white.mp4',
  },
  mobile: {
    webm: '/assets/motion/hero/hero-mobile-white.webm',
    mp4: '/assets/motion/hero/hero-mobile-white.mp4',
  },
  poster: '/assets/motion/hero/hero-poster-white.webp',
  width: 1920,
  height: 1440,
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
 * Whether it is a video or an image is still open (`docs/CONTENT_NEEDED.md`).
 * Activate the slot only once the file and its derivatives are approved; until
 * then the stage shows its bare ink surface.
 */
export type GoodbyeVisual =
  ({ kind: 'video' } & MotionMedia) | ({ kind: 'image' } & BrandImage);

export const goodbyeVisual: GoodbyeVisual | null = null;

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
