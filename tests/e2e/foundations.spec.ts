import { expect, test } from '@playwright/test';

test('the home foundation is navigable without invented contact links', async ({
  page,
}) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Colmillo Studio' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Haz que tu marca muerda' }),
  ).toHaveAttribute('href', '#contacto');
  await expect(page.getByRole('link', { name: 'Seguir' })).toHaveAttribute(
    'href',
    '#contacto',
  );
  await expect(page.locator('#contacto')).toHaveCount(1);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
});

test('the standard production artifact excludes every demo route and marker', async ({
  page,
}) => {
  const response = await page.goto('/proyectos/demo-fauce-elastica/');
  expect(response?.status()).toBe(404);
  await expect(page.getByText('DEMO FICTICIA — NO PUBLICAR')).toHaveCount(0);

  await page.goto('/proyectos/');
  await expect(page.locator('.project-card')).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText('Fauce Elástica');
  await expect(page.locator('body')).not.toContainText('Pulso Molar');
  await expect(page.locator('body')).not.toContainText('Rastro Naranja');
});

test('the hero uses its static fallback while official media stays disabled', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('[data-hero-stage]')).toBeVisible();
  await expect(page.locator('.hero video')).toHaveCount(0);
  const size = await page.locator('[data-hero]').evaluate((hero) => ({
    height: hero.getBoundingClientRect().height,
    viewport: window.innerHeight,
  }));
  expect(size.height).toBeGreaterThanOrEqual(size.viewport);
});

test('essential routes render', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });

  const routes = [
    ['/manifiesto/', 'Manifiesto'],
    ['/studio/', 'Studio'],
    ['/proyectos/', 'Proyectos'],
    ['/contacto/', 'Haz que tu marca muerda'],
    ['/aviso-legal/', 'Aviso legal'],
    ['/privacidad/', 'Privacidad'],
    ['/cookies/', 'Cookies'],
  ] as const;

  for (const [route, heading] of routes) {
    await page.goto(route);
    await expect(
      page.getByRole('heading', { level: 1, name: heading }),
    ).toBeVisible();
  }

  expect(consoleErrors).toEqual([]);
});

test('the header uses the supplied logo variant with intrinsic dimensions', async ({
  page,
}) => {
  await page.goto('/studio/');
  const lightHeader = page.locator('[data-sticky-header]');
  const blackLogo = lightHeader.locator('.wordmark__image');
  await expect(lightHeader).toHaveAttribute('data-tone', 'light');
  await expect(blackLogo).toHaveAttribute(
    'src',
    '/assets/brand/colmillo-wordmark-black.png',
  );
  await expect(blackLogo).toHaveAttribute('width', '906');
  await expect(blackLogo).toHaveAttribute('height', '242');

  await page.goto('/contacto/');
  const darkHeader = page.locator('[data-sticky-header]');
  const creamLogo = darkHeader.locator('.wordmark__image');
  await expect(darkHeader).toHaveAttribute('data-tone', 'dark');
  await expect(creamLogo).toHaveAttribute(
    'src',
    '/assets/brand/colmillo-wordmark-cream.png',
  );
  await expect(creamLogo).toHaveAttribute('width', '865');
  await expect(creamLogo).toHaveAttribute('height', '232');
  await expect(creamLogo).toHaveJSProperty('complete', true);
  expect(
    await creamLogo.evaluate(
      (image) => (image as HTMLImageElement).naturalWidth,
    ),
  ).toBe(865);
});

test('the logo stays undistorted and clear of navigation at target widths', async ({
  page,
  isMobile,
}) => {
  test.skip(
    isMobile,
    'The explicit viewport matrix runs once in desktop Chromium.',
  );

  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 834, height: 1112 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);

    for (const route of ['/studio/', '/contacto/']) {
      await page.goto(route);
      const metrics = await page
        .locator('.wordmark__image')
        .evaluate((node) => {
          const image = node as HTMLImageElement;
          const header = image.closest('header');
          const navigation = header?.querySelector('nav');
          const imageRect = image.getBoundingClientRect();
          const headerRect = header?.getBoundingClientRect();
          const navigationRect = navigation?.getBoundingClientRect();

          return {
            imageRatio: imageRect.width / imageRect.height,
            intrinsicRatio: image.naturalWidth / image.naturalHeight,
            insideHeader:
              Boolean(headerRect) &&
              imageRect.top >= headerRect!.top - 0.5 &&
              imageRect.bottom <= headerRect!.bottom + 0.5,
            clearOfNavigation:
              !navigationRect || imageRect.right <= navigationRect.left,
            documentWidth: document.documentElement.scrollWidth,
            viewportWidth: window.innerWidth,
          };
        });

      expect(
        Math.abs(metrics.imageRatio - metrics.intrinsicRatio),
      ).toBeLessThan(0.02);
      expect(metrics.insideHeader).toBe(true);
      expect(metrics.clearOfNavigation).toBe(true);
      expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth);
    }
  }
});

test('skip navigation and keyboard focus are available', async ({
  page,
  isMobile,
}) => {
  test.skip(
    isMobile,
    'Mobile Chromium emulates touch navigation rather than hardware Tab focus.',
  );

  await page.goto('/');
  await page.keyboard.press('Tab');

  const skipLink = page.getByRole('link', { name: 'Saltar al contenido' });
  await expect(skipLink).toBeFocused();
  await skipLink.press('Enter');
  await expect(page.locator('#contenido')).toBeFocused();
});

test('the side menu works with pointer and keyboard', async ({ page }) => {
  await page.goto('/');

  const menu = page.locator('[data-side-menu]');
  const trigger = menu.locator('summary');
  await trigger.click();
  await expect(menu).toHaveAttribute('open', '');
  await expect(menu.getByRole('link', { name: /Contacto/ })).toBeVisible();
  await expect(page.locator('body')).toHaveAttribute('data-menu-open', 'true');
  await expect(page.locator('main')).toHaveJSProperty('inert', true);
  await expect(menu.locator('[data-motion-toggle]')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(menu).not.toHaveAttribute('open', '');
  await expect(page.locator('main')).toHaveJSProperty('inert', false);
  await expect(trigger).toBeFocused();
});

test('the menu trigger is mathematically centered at target widths', async ({
  page,
  isMobile,
}) => {
  test.skip(
    isMobile,
    'The explicit viewport matrix runs once in desktop Chromium.',
  );

  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 834, height: 1112 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const offset = await page
      .locator('[data-menu-trigger]')
      .evaluate((trigger) => {
        const rect = trigger.getBoundingClientRect();
        return Math.abs(rect.left + rect.width / 2 - window.innerWidth / 2);
      });
    expect(offset).toBeLessThanOrEqual(1);
  }
});

test('the contact header becomes operable only after the hero', async ({
  page,
}) => {
  await page.goto('/');

  const header = page.locator('[data-sticky-header]');
  await expect(header).toHaveAttribute('data-visible', 'false');
  await expect(header).toHaveJSProperty('inert', true);

  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await expect(header).toHaveAttribute('data-visible', 'true');
  await expect(header).toHaveJSProperty('inert', false);
});

test('reduced motion disables optional motion enhancements', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await expect(page.locator('[data-motion-toggle]')).toBeDisabled();
  await expect(page.locator('html')).not.toHaveAttribute(
    'data-cursor-ready',
    'true',
  );
});

test('core home navigation works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');

  const cta = page.getByRole('link', { name: 'Haz que tu marca muerda' });
  await expect(cta).toBeVisible();
  await cta.click();
  await expect(page).toHaveURL(/#contacto$/);

  const menu = page.locator('[data-side-menu]');
  await menu.locator('summary').click();
  await expect(menu).toHaveAttribute('open', '');
  await expect(menu.getByRole('link', { name: 'Ver proyectos' })).toBeVisible();

  await context.close();
});

test('client navigation remains stable across history changes', async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });

  await page.goto('/');
  const menu = page.locator('[data-side-menu]');
  await menu.locator('summary').click();
  await menu.getByRole('link', { name: 'Ver proyectos' }).click();
  await expect(page).toHaveURL(/\/proyectos\/$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Proyectos' }),
  ).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Colmillo Studio' }),
  ).toBeAttached();
  expect(consoleErrors).toEqual([]);
});
