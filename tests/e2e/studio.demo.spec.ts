import { expect, test, type Page } from '@playwright/test';

/*
 * /studio/ in the demo build (`dist-demo`), where every provisional block is
 * rendered. The standard build is covered by `studio.spec.ts`.
 */

async function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

async function scrollToTop(page: Page, selector: string, offset = 60) {
  await page
    .locator(selector)
    .first()
    .evaluate((element, margin) => {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - margin, behavior: 'instant' });
    }, offset);
}

test('the studio page has its five moments and no maquette leftovers', async ({
  page,
}) => {
  const errors = await collectErrors(page);
  await page.goto('/studio/');

  const title = page.getByRole('heading', { level: 1, name: 'Studio' });
  await expect(title).toBeVisible();
  await expect(title).toHaveCSS('text-transform', 'none');
  for (const name of [
    /Somos\s+Colmillo/,
    'Cómo hacemos las cosas',
    'Los que muerden',
    '¿Hacemos algo juntos?',
  ]) {
    await expect(page.getByRole('heading', { level: 2, name })).toHaveCount(1);
  }

  const main = page.locator('main');
  await expect(main).not.toContainText('DEMO FICTICIA');
  await expect(main).not.toContainText('02 / Studio');
  await expect(
    page.locator('.editorial-page__mark, .studio-process, .section-kicker'),
  ).toHaveCount(0);

  // The loop slot is empty, so the disc holds its marked placeholder.
  await expect(page.locator('.studio-hero__placeholder')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
  await expect(page.locator('.studio-hero__pending')).toBeVisible();

  await expect(page.getByRole('link', { name: 'Hablemos' })).toHaveAttribute(
    'href',
    '/contacto/',
  );
  expect(errors).toEqual([]);
});

test('studio fits every target viewport without horizontal overflow', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');

  for (const [width, height] of [
    [1920, 1080],
    [1440, 900],
    [1366, 768],
    [1024, 1366],
    [768, 1024],
    [430, 932],
    [390, 844],
    [320, 720],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('/studio/');
    const layout = await page.evaluate(() => {
      const title = document.querySelector('h1')!.getBoundingClientRect();
      const hero = document
        .querySelector('[data-studio-hero]')!
        .getBoundingClientRect();
      return {
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        titleLeft: title.left,
        titleRight: title.right,
        heroHeight: hero.height,
      };
    });
    const label = `${width}x${height}`;
    expect(layout.overflow, label).toBeLessThanOrEqual(1);
    expect(layout.titleLeft, label).toBeGreaterThanOrEqual(0);
    expect(layout.titleRight, label).toBeLessThanOrEqual(width);
    expect(layout.heroHeight, label).toBeGreaterThanOrEqual(height - 1);
  }
});

test('Mirar starts on stage and the pointer or a tap selects a principle', async ({
  page,
}, testInfo) => {
  await page.goto('/studio/');
  await scrollToTop(page, '.principles');

  await expect(page.getByRole('tab')).toHaveCount(4);
  const mirar = page.getByRole('tab', { name: /Mirar/ });
  await expect(mirar).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#principio-mirar')).toHaveAttribute(
    'data-state',
    'active',
  );
  await expect(
    page.locator('#principio-mirar .principles__text'),
  ).toBeVisible();

  const soltar = page.getByRole('tab', { name: /Soltar/ });
  if (testInfo.project.name === 'fine-1440') await soltar.hover();
  else await soltar.tap();

  await expect(soltar).toHaveAttribute('aria-selected', 'true');
  await expect(mirar).toHaveAttribute('aria-selected', 'false');
  const panel = page.locator('#principio-soltar');
  await expect(panel).toHaveAttribute('data-state', 'active');
  await expect(panel.locator('.principles__text')).toBeVisible();
  // The picture of the chosen principle is on screen, even when the stage
  // sits under the list.
  await expect(panel.locator('.principles__visual')).toBeInViewport({
    ratio: 0.5,
  });
  // Only the active panel is exposed; the others are inert.
  const inert = await page
    .locator('[data-principle-panel]')
    .evaluateAll((panels) =>
      panels.map((element) => (element as HTMLElement).inert),
    );
  expect(inert).toEqual([true, true, true, false]);
});

test('the principles are a keyboard tab list with roving focus', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/studio/');
  await scrollToTop(page, '.principles');

  const tab = (name: string) =>
    page.getByRole('tab', { name: new RegExp(name) });
  await tab('Mirar').focus();
  await page.keyboard.press('ArrowDown');
  await expect(tab('Tensar')).toBeFocused();
  await expect(tab('Tensar')).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('End');
  await expect(tab('Soltar')).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(tab('Mirar')).toBeFocused();
  await expect(page.locator('[role="tab"][tabindex="0"]')).toHaveCount(1);

  // Tab leaves the list for the panel on stage.
  await page.keyboard.press('Tab');
  await expect(page.locator('#principio-mirar')).toBeFocused();
});

test('team portraits give under a fine pointer and never under touch', async ({
  page,
}, testInfo) => {
  await page.goto('/studio/');
  const members = page.locator('[data-team-member]');
  await expect(members).toHaveCount(6);

  const frame = page.locator('[data-press-frame]').first();
  const surface = page.locator('[data-press-surface]').first();
  await scrollToTop(page, '[data-press-frame]', 150);
  // A portrait is hidden until its reveal has run; then its name is exposed.
  await expect(members.first()).toHaveCSS('opacity', '1');
  await expect(
    members.first().getByRole('heading', { level: 3, name: 'Nombre' }),
  ).toBeVisible();
  const box = (await frame.boundingBox())!;

  if (testInfo.project.name === 'fine-1440') {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.move(box.x + box.width - 12, box.y + box.height / 2, {
      steps: 5,
    });
    await expect
      .poll(() => surface.evaluate((element) => element.style.clipPath))
      .toContain('path(');
    // The name sits outside the pressed surface and is never clipped.
    await expect(members.first().locator('.studio-member__name')).toHaveCSS(
      'clip-path',
      'none',
    );
    await page.mouse.move(box.x + box.width + 240, box.y - 120);
    await expect
      .poll(() => surface.evaluate((element) => element.style.clipPath))
      .toBe('');
  } else {
    await frame.tap();
    await page.waitForTimeout(300);
    expect(await surface.evaluate((element) => element.style.clipPath)).toBe(
      '',
    );
  }
});

test('reduced motion keeps every principle, without dent or drift', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/studio/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');

  await scrollToTop(page, '.principles');
  const morder = page.getByRole('tab', { name: /Morder/ });
  await morder.hover();
  await expect(morder).toHaveAttribute('aria-selected', 'true');
  await page.mouse.move(1200, 500);
  expect(
    await page
      .locator('[data-principles-stage]')
      .evaluate((element) => element.style.getPropertyValue('--drift-x')),
  ).toBe('');

  await scrollToTop(page, '[data-press-frame]', 150);
  const box = (await page.locator('[data-press-frame]').first().boundingBox())!;
  await page.mouse.move(box.x + box.width - 12, box.y + box.height / 2, {
    steps: 4,
  });
  await page.waitForTimeout(300);
  expect(
    await page
      .locator('[data-press-surface]')
      .first()
      .evaluate((element) => element.style.clipPath),
  ).toBe('');
});
