import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  testIgnore: [
    'demo.spec.ts',
    'studio.demo.spec.ts',
    'services.demo.spec.ts',
    'projects.demo.spec.ts',
    'case-study.demo.spec.ts',
  ],
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:4323',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'node scripts/serve-dist.mjs --root dist --port 4323',
    url: 'http://127.0.0.1:4323',
    reuseExistingServer: false,
  },
});
