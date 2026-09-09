import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const metrics = { cls: 0, lcp: 0 };
    Object.defineProperty(window, '__colmilloMetrics', { value: metrics });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as Array<
        PerformanceEntry & { value: number; hadRecentInput: boolean }
      >) {
        if (!entry.hadRecentInput) metrics.cls += entry.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const latest = entries.at(-1);
      if (latest) metrics.lcp = latest.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
});

test('the home stays within layout and client asset budgets', async ({
  page,
}) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const measurements = await page.evaluate(() => {
    const metrics = (
      window as unknown as Window & {
        __colmilloMetrics: { cls: number; lcp: number };
      }
    ).__colmilloMetrics;
    const scripts = performance
      .getEntriesByType('resource')
      .filter((entry) =>
        entry.name.endsWith('.js'),
      ) as PerformanceResourceTiming[];

    return {
      cls: metrics.cls,
      lcp: metrics.lcp,
      horizontalOverflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      totalScriptBytes: scripts.reduce(
        (total, entry) => total + entry.encodedBodySize,
        0,
      ),
    };
  });

  expect(measurements.cls).toBeLessThan(0.1);
  expect(measurements.lcp).toBeGreaterThan(0);
  expect(measurements.lcp).toBeLessThan(2_500);
  expect(measurements.horizontalOverflow).toBeLessThanOrEqual(1);
  expect(measurements.totalScriptBytes).toBeLessThan(220_000);
});
