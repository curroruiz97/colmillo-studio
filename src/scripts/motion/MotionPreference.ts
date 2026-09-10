export type MotionPreference = 'full' | 'reduced';

/**
 * Key of the retired manual override. The visible "Reducir movimiento" control
 * was removed from the edge menu on 2026-09-10 at the user's request. A value
 * left behind by it would keep a visitor in reduced motion with no control to
 * undo it, so it is cleared and the system preference is the only source.
 */
const RETIRED_STORAGE_KEY = 'colmillo-motion';

export function initMotionPreference(): () => void {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');

  try {
    window.localStorage.removeItem(RETIRED_STORAGE_KEY);
  } catch {
    // Storage can be unavailable (privacy modes); there is nothing to clear.
  }

  const apply = () => {
    const preference: MotionPreference = media.matches ? 'reduced' : 'full';
    document.documentElement.dataset.motion = preference;
    window.dispatchEvent(
      new CustomEvent('colmillo:motionchange', { detail: { preference } }),
    );
  };

  media.addEventListener('change', apply);
  apply();

  return () => {
    media.removeEventListener('change', apply);
  };
}
