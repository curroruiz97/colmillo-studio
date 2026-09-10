/**
 * Home entry intro: COLMILLO is set letter by letter, the final O opens and the
 * home is revealed through its counter. See `src/scripts/motion/HomeIntro.ts`.
 *
 * `repeat` decides how often a visitor sees it:
 * - `'session'`: once per browser tab session (sessionStorage), so returning to
 *   the home through a link or going back never replays it;
 * - `'always'`: every full document load of the home, except history
 *   traversal (back/forward) and deep links to a fragment.
 *
 * `replayOnReload` plays it again whenever the home itself is reloaded, even
 * inside a session that has already seen it.
 */
export interface HomeIntroConfig {
  enabled: boolean;
  repeat: 'session' | 'always';
  replayOnReload: boolean;
  storageKey: string;
  /**
   * `'cream'`: ink letters on the page's light ground (`--color-background`,
   * white since 2026-09-10). `'ink'`: cream letters on the ink ground. The
   * portal only reads when the O's ring contrasts with the page it opens onto:
   * the home is light, so a light ring merges with it and
   * the O reads as a filled disc instead of a window. See docs/DECISIONS.md
   * (2026-09-10, home intro theme) for the side-by-side comparison.
   */
  theme: 'ink' | 'cream';
}

export const homeIntro: HomeIntroConfig = {
  enabled: true,
  repeat: 'session',
  replayOnReload: true,
  storageKey: 'colmilloIntroPlayed',
  theme: 'cream',
};
