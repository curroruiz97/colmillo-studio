import { initBall } from '@shop/scripts/ball';
import { initBuy } from '@shop/scripts/buy';
import { cart } from '@shop/scripts/cart';
import { initDrawer } from '@shop/scripts/drawer';
import { initFilter } from '@shop/scripts/filter';
import { initGallery } from '@shop/scripts/gallery';
import { initReveal } from '@shop/scripts/reveal';

/**
 * The shop's one entry point. Every module is independent and does nothing
 * on a page that lacks its markup.
 *
 * The pressure dent on the tiles is the main site's own (`PressSurface.ts`,
 * with GSAP). It is only loaded for a fine pointer with motion allowed, as a
 * separate chunk, so touch and reduced motion never download it.
 */
export function initShop() {
  cart.init();
  const drawer = initDrawer();
  initBuy(drawer.open);
  initFilter();
  initReveal();
  initGallery();
  initBall();

  if (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    document.documentElement.dataset.motion !== 'reduced'
  ) {
    void import('@/scripts/motion/PressSurface').then(
      ({ bindPressSurface }) => {
        document
          .querySelectorAll<HTMLElement>('[data-card-tile], [data-press-tile]')
          .forEach((tile) => {
            const surface = tile.querySelector<HTMLElement>(
              '[data-card-surface], [data-press-surface]',
            );
            if (surface) bindPressSurface(tile, surface, tile);
          });
      },
    );
  }
}
