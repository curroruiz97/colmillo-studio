export type MotionPreference = 'full' | 'reduced';

const STORAGE_KEY = 'colmillo-motion';

export function initMotionPreference(): () => void {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const button = document.querySelector<HTMLButtonElement>(
    '[data-motion-toggle]',
  );
  const label = button?.querySelector<HTMLElement>(
    '[data-motion-toggle-label]',
  );

  const stored = window.localStorage.getItem(STORAGE_KEY);
  let override: MotionPreference | null =
    stored === 'full' || stored === 'reduced' ? stored : null;

  const apply = () => {
    const preference: MotionPreference = media.matches
      ? 'reduced'
      : (override ?? 'full');
    document.documentElement.dataset.motion = preference;
    if (button && label) {
      button.hidden = false;
      button.disabled = media.matches;
      button.setAttribute('aria-pressed', String(preference === 'reduced'));
      label.textContent = media.matches
        ? 'Movimiento reducido'
        : preference === 'reduced'
          ? 'Activar movimiento'
          : 'Reducir movimiento';
    }
    window.dispatchEvent(
      new CustomEvent('colmillo:motionchange', { detail: { preference } }),
    );
  };

  const toggle = () => {
    if (media.matches) return;
    override =
      document.documentElement.dataset.motion === 'reduced'
        ? 'full'
        : 'reduced';
    window.localStorage.setItem(STORAGE_KEY, override);
    apply();
  };

  const syncSystemPreference = () => {
    apply();
  };

  button?.addEventListener('click', toggle);
  media.addEventListener('change', syncSystemPreference);
  apply();

  return () => {
    button?.removeEventListener('click', toggle);
    media.removeEventListener('change', syncSystemPreference);
  };
}
