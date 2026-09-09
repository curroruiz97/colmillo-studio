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

// Activate these slots only after the client supplies the source files and the
// optimized derivatives have been visually approved.
export const heroMedia: MotionMedia | null = null;
export const goodbyeMedia: MotionMedia | null = null;
