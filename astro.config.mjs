import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import process from 'node:process';
import { URL } from 'node:url';

const configuredSite = process.env.PUBLIC_SITE_URL;
const site = (() => {
  if (!configuredSite) return undefined;
  try {
    const parsed = new URL(configuredSite);
    return parsed.protocol === 'https:' &&
      parsed.pathname === '/' &&
      !parsed.search &&
      !parsed.hash
      ? parsed.toString()
      : undefined;
  } catch {
    return undefined;
  }
})();

export default defineConfig({
  output: 'static',
  site,
  integrations: site ? [sitemap()] : [],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
