import { defineConfig } from 'astro/config';
import process from 'node:process';
import { URL, fileURLToPath } from 'node:url';

/*
 * COLMILLO TIENDA
 *
 * The shop is its own static build, published to its own subdomain
 * (tienda.colmillostudio.com), so none of the main site's release gates,
 * demo boundary or tests can be touched by it. It shares the design system
 * by importing the main site's tokens, type and brand files from `../src`
 * and `../public` rather than copying them.
 *
 * It is a front-end with no commerce platform behind it yet (2026-09-28: the
 * client has not chosen Shopify, WooCommerce or anything else, nor what will
 * be sold). Every product is a clearly flagged demonstration, the cart lives
 * in the browser and nothing is ever charged. See `docs/DECISIONS.md`.
 */
/*
 * `SHOP_BASE=/tienda/` builds the copy that lives under the preview's
 * folder; the default is the subdomain's root. Only a plain folder path is
 * accepted, so a stray value can never point links elsewhere.
 */
const base = /^\/[a-z0-9-]+\/$/.test(process.env.SHOP_BASE ?? '')
  ? process.env.SHOP_BASE
  : '/';

export default defineConfig({
  output: 'static',
  base,
  outDir: process.env.SHOP_OUT_DIR ?? '../dist-shop',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    resolve: {
      alias: {
        '@shop': fileURLToPath(new URL('./src', import.meta.url)),
        '@': fileURLToPath(new URL('../src', import.meta.url)),
      },
    },
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
