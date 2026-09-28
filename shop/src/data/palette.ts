/**
 * Painting a drawing. Shared by the server render and the browser, so it
 * holds no catalogue data: only how a palette becomes CSS.
 */
import type { ArtPalette } from '@shop/data/catalog';

/** The palette as the custom properties `ProductArt` paints with. */
export const artStyle = (palette: ArtPalette) =>
  `--art-ground:${palette.ground};--art-body:${palette.body};--art-accent:${palette.accent};--art-ink:${palette.ink}`;

const luminance = (hex: string) => {
  const value = Number.parseInt(hex.replace('#', ''), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};

/**
 * The gallery's third ground: the one that shows the object best and is not
 * the ground it already stands on. A dark object goes on cream, a light one
 * on ink; if that is its own ground, on deep cream.
 */
export const altGround = (palette: ArtPalette) => {
  const pick = luminance(palette.body) < 0.4 ? '#fceeda' : '#12100f';
  return pick.toLowerCase() === palette.ground.toLowerCase() ? '#ead2b4' : pick;
};
