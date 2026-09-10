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
 * flattened over `--color-brand-cream` for decoders without WebM alpha. Both
 * therefore render identically over the cream hero surface.
 */
export const heroMedia: MotionMedia = {
  desktop: {
    webm: '/assets/motion/hero/hero-desktop.webm',
    mp4: '/assets/motion/hero/hero-desktop.mp4',
  },
  mobile: {
    webm: '/assets/motion/hero/hero-mobile.webm',
    mp4: '/assets/motion/hero/hero-mobile.mp4',
  },
  poster: '/assets/motion/hero/hero-poster.webp',
  width: 1920,
  height: 1440,
};

// Activate this slot only after the client supplies the source file and the
// optimized derivatives have been visually approved.
export const goodbyeMedia: MotionMedia | null = null;
