import { defineConfig } from '@playwright/test';

/* The shop (`shop/`, built to `dist-shop/`) on its own server and matrix. */
export default defineConfig({
  testDir: './tests/e2e',
  testMatch: ['shop.spec.ts'],
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:4324',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'fine-1440',
      use: {
        viewport: { width: 1440, height: 900 },
        hasTouch: false,
        isMobile: false,
      },
    },
    {
      name: 'touch-390',
      use: {
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
      },
    },
  ],
  webServer: {
    command: 'node scripts/serve-dist.mjs --root dist-shop --port 4324',
    url: 'http://127.0.0.1:4324',
    reuseExistingServer: false,
  },
});
