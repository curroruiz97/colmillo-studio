/**
 * Every internal link goes through here, so the shop can live at the root
 * of its own subdomain (tienda.colmillostudio.com) or under a folder of the
 * password-protected preview (pre.colmillostudio.com/tienda/) from the same
 * source. The base comes from `SHOP_BASE` at build time (astro.config.mjs).
 */
const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

/** `shopPath('producto/x/')` → `/producto/x/` or `/tienda/producto/x/`. */
export const shopPath = (path = '') => `${BASE}${path.replace(/^\//, '')}`;

export const productPath = (handle: string) => shopPath(`producto/${handle}/`);

export const categoryPath = (category?: string) =>
  category
    ? shopPath(`?categoria=${encodeURIComponent(category)}#catalogo`)
    : shopPath('#catalogo');
