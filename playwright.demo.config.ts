import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: ['demo.spec.ts', 'studio.demo.spec.ts'],
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:4322',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'fine-1440',
      use: {
        viewport: { width: 1440, height: 1000 },
        deviceScaleFactor: 1,
        hasTouch: false,
        isMobile: false,
      },
    },
    {
      name: 'touch-834',
      use: {
        viewport: { width: 834, height: 1112 },
        deviceScaleFactor: 1,
        hasTouch: true,
        isMobile: false,
      },
    },
    {
      name: 'touch-390',
      use: {
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 1,
        hasTouch: true,
        isMobile: true,
      },
    },
  ],
  webServer: {
    command: 'node scripts/serve-dist.mjs --root dist-demo --port 4322',
    url: 'http://127.0.0.1:4322',
    reuseExistingServer: false,
  },
});
