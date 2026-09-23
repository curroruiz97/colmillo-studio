import { expect, test, type Page } from '@playwright/test';
import { homeIntro } from '../../src/config/intro';

/**
 * The home entry intro plays once per tab session on the home only, never
 * traps the page and always hands scrolling, the cursor and the hero back.
 * Every other spec opts out through the same sessionStorage key.
 */

const INTRO_BUDGET_MS = 6_000;

async function expectHandedBack(page: Page) {
  const root = page.locator('html');
  await expect(root).not.toHaveAttribute('data-intro', /.*/, {
    timeout: INTRO_BUDGET_MS,
  });
  await expect(page.locator('[data-home-intro]')).toBeHidden();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).overflowY,
    ),
  ).not.toBe('hidden');
}

test('the first visit plays the intro over the rendered home, then hands it back', async ({
  page,
  isMobile,
}) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const root = page.locator('html');
  await expect(root).toHaveAttribute('data-intro', 'full');
  const overlay = page.locator('[data-home-intro]');
  await expect(overlay).toHaveAttribute('aria-hidden', 'true');
  await expect(overlay).toBeVisible();
  // The page is already rendered underneath, and it is locked while covered.
  await expect(page.locator('#inicio')).toHaveCount(1);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).overflowY,
    ),
  ).toBe('hidden');

  await expectHandedBack(page);

  // The hero loop starts once the O has opened, from its first frame.
  if (!isMobile) {
    await expect
      .poll(() =>
        page
          .locator('.hero__media')
          .evaluate((video: HTMLVideoElement) => !video.paused),
      )
      .toBe(true);
    await page.mouse.move(700, 450);
    await page.mouse.wheel(0, 900);
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);
  }
  // The hero settles after the overlay has gone; no transform is left behind.
  await expect
    .poll(() =>
      page
        .locator('.hero__inner')
        .evaluate((element) => getComputedStyle(element).transform),
    )
    .toMatch(/none|matrix\(1, 0, 0, 1, 0, 0\)/);
});

test('a reload of the home plays the intro again, from the top of the page', async ({
  page,
}) => {
  test.skip(!homeIntro.replayOnReload, 'Reload replay is switched off.');
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expectHandedBack(page);

  // Reloading mid-page must still open the O onto the hero.
  await page.evaluate(() => window.scrollTo(0, 1500));
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).toHaveAttribute(
    'data-intro',
    /full|reduced/,
  );
  // The browser may restore the old position after DOMContentLoaded; the intro
  // pins the page back to the top while it is covered.
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expectHandedBack(page);
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  // Later history traversals remember their position again.
  expect(await page.evaluate(() => history.scrollRestoration)).toBe('auto');
});

test('returning to the home and history traversal skip the intro', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expectHandedBack(page);

  await page.goto('/studio/');
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).not.toHaveAttribute('data-intro', /.*/);

  await page.goto('/studio/');
  await page.goBack({ waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).not.toHaveAttribute('data-intro', /.*/);
  await expect(page.locator('[data-home-intro]')).toBeHidden();
});

test('a new tab has its own session and plays the intro again', async ({
  page,
  context,
}) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expectHandedBack(page);

  const tab = await context.newPage();
  await tab.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(tab.locator('html')).toHaveAttribute('data-intro', 'full');
  await expectHandedBack(tab);
  await tab.close();
});

test('only the home plays the intro, and a deep link skips it', async ({
  page,
}) => {
  await page.goto('/studio/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).not.toHaveAttribute('data-intro', /.*/);
  await expect(page.locator('[data-home-intro]')).toHaveCount(0);

  await page.goto('/#contacto', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).not.toHaveAttribute('data-intro', /.*/);
  await expect(page.locator('[data-home-intro]')).toBeHidden();
});

test('the word is the brand orange and the seed inside the O is ink', async ({
  page,
}) => {
  /*
   * Inverted on 2026-09-22 (client direction): COLMILLO used to be ink with an
   * orange seed in the counter of the final O. Now the word carries the brand
   * orange the home's wordmark carries, and the seed is the ink that used to
   * be the word, so it still reads against the ground it sits on. Nothing else
   * about the sequence changed, and no frame paints the old pairing.
   */
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).toHaveAttribute('data-intro', 'full');

  const letters = page.locator('.home-intro__letter');
  await expect(letters.first()).toHaveCSS('fill', 'rgb(205, 87, 48)');
  const fills = await letters.evaluateAll((nodes) =>
    nodes.map((node) => getComputedStyle(node).fill),
  );
  expect(new Set(fills)).toEqual(new Set(['rgb(205, 87, 48)']));

  // The seed against the cream ground it opens onto, and the ground itself.
  await expect(page.locator('[data-intro-seed]')).toHaveCSS(
    'fill',
    'rgb(18, 16, 15)',
  );
  await expect(page.locator('.home-intro__ground')).toHaveCSS(
    'fill',
    'rgb(252, 238, 218)',
  );

  await expectHandedBack(page);
});

test('reduced motion shows the still wordmark briefly and never expands the O', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).toHaveAttribute('data-intro', 'reduced');
  await expect(page.locator('html')).not.toHaveAttribute('data-intro', /.*/, {
    timeout: 2_000,
  });
  const portals = await page
    .locator('[data-intro-portal]')
    .evaluateAll((groups) => groups.map((g) => g.getAttribute('transform')));
  expect(portals.every((value) => value === null)).toBe(true);
});

test('the intro never traps focus: the skip link stays reachable above it', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'Keyboard focus is covered on the desktop project.');
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('html')).toHaveAttribute('data-intro', 'full');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await expect(page.locator('.skip-link')).toBeInViewport();
  // A key also plays the rest faster instead of cutting it.
  await expectHandedBack(page);
});

test('without JavaScript there is no overlay and the home scrolls', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('[data-home-intro]')).toBeHidden();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).overflowY,
    ),
  ).not.toBe('hidden');
  await context.close();
});

test('the intro remembers itself under the configured key', async ({
  page,
}) => {
  test.skip(homeIntro.repeat !== 'session', 'Only the session policy stores.');
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  expect(
    await page.evaluate(
      (key) => sessionStorage.getItem(key),
      homeIntro.storageKey,
    ),
  ).toBe('true');
});
