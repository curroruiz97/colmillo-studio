import { bindPressSurface, canPress } from './PressSurface';

/**
 * Home project rail: the image gives under the cursor.
 *
 * Only the edge nearest the pointer bends, inwards, as a smooth dent whose
 * peak follows the pointer along that edge; the corners stay pinned and the
 * picture itself never moves or scales. The dent is a `clip-path: path()` on
 * the tile's inner surface, so the frame, the tile and the rail keep their
 * exact size and the page shows through the bite. The label sits outside the
 * surface and keeps its own CSS reveal.
 *
 * The geometry and easing live in `PressSurface.ts`, shared with the Studio
 * team portraits; this module only finds the tiles. Fine pointers with motion
 * allowed only: touch, keyboard and reduced motion keep the still image and
 * the CSS title reveal.
 */
export function initProjectTilePress(): () => void {
  const section = document.querySelector<HTMLElement>(
    '[data-horizontal-projects]',
  );
  if (!section || !canPress()) return () => undefined;

  const cleanups = Array.from(
    section.querySelectorAll<HTMLElement>('.project-tile__link'),
    (link) => {
      const surface = link.querySelector<HTMLElement>('[data-tile-surface]');
      const frame = link.querySelector<HTMLElement>('.project-tile__frame');
      return surface && frame
        ? bindPressSurface(link, surface, frame)
        : () => undefined;
    },
  );

  return () => cleanups.forEach((cleanup) => cleanup());
}
