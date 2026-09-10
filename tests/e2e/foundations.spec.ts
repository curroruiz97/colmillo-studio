import { expect, test, type Page } from '@playwright/test';

/** Width of the handle that is actually inside the viewport. */
async function visibleHandleWidth(page: Page): Promise<number> {
  return page.locator('[data-edge-trigger]').evaluate((handle) => {
    const rect = handle.getBoundingClientRect();
    return document.documentElement.clientWidth - rect.left;
  });
}

test('the home foundation publishes only approved contact channels', async ({
  page,
}) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Colmillo Studio' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Haz que tu marca muerda' }),
  ).toHaveAttribute('href', '#contacto');
  await expect(page.locator('#contacto')).toHaveCount(1);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);

  const approvedMail = 'mailto:hola@colmillostudio.com';
  const approvedInstagram = 'https://www.instagram.com/colmillo.studio/';

  // The contact section publishes both approved channels in the document flow.
  const contactSection = page.locator('#contacto');
  await expect(
    contactSection.locator(`a[href="${approvedMail}"]`),
  ).toBeVisible();
  await expect(
    contactSection.locator(`a[href="${approvedInstagram}"]`),
  ).toBeVisible();

  // The same channels exist as sticky-header quick access, which stays hidden
  // until the hero is left behind.
  const headerNav = page.locator('.site-header__nav');
  await expect(headerNav.locator(`a[href="${approvedMail}"]`)).toHaveCount(1);
  await expect(headerNav.locator(`a[href="${approvedInstagram}"]`)).toHaveCount(
    1,
  );
  await expect(headerNav.locator(`a[href="${approvedMail}"]`)).toBeHidden();

  // Every published channel must be one of the approved destinations.
  const mailHrefs = await page
    .locator('a[href^="mailto:"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  expect(new Set(mailHrefs)).toEqual(new Set([approvedMail]));

  // No telephone number has been supplied yet, so none may be published.
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

test('the hero publishes the official loop over a full first screen', async ({
  page,
}) => {
  await page.goto('/');

  // The approved client loop, with both responsive sources and a poster.
  const video = page.locator('.hero__media');
  await expect(video).toHaveCount(1);
  await expect(video).toHaveAttribute('poster', /hero-poster\.webp$/);
  await expect(video).toHaveAttribute('muted', '');
  await expect(video).toHaveAttribute('playsinline', '');
  await expect(video).toHaveAttribute('loop', '');
  const sources = await video
    .locator('source')
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('src')));
  expect(sources).toEqual([
    '/assets/motion/hero/hero-mobile.webm',
    '/assets/motion/hero/hero-mobile.mp4',
    '/assets/motion/hero/hero-desktop.webm',
    '/assets/motion/hero/hero-desktop.mp4',
  ]);

  // The loop is decorative: it carries no name into the accessibility tree.
  await expect(video).toHaveAttribute('aria-hidden', 'true');

  // The provisional kinetic composition and its notice are gone for good.
  await expect(page.locator('[data-hero-stage]')).toHaveCount(0);
  await expect(page.locator('.hero')).not.toContainText('fallback provisional');

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

test('the native scrollbar is hidden but scrolling still works', async ({
  page,
}) => {
  await page.goto('/');

  // Hidden, not merely thin: the layout viewport is the whole viewport, so the
  // page meets the right edge with nothing reserved beside it.
  expect(
    await page.evaluate(
      () => window.innerWidth - document.documentElement.clientWidth,
    ),
  ).toBe(0);

  // The document is still a scroll container.
  expect(
    await page.evaluate(
      () => document.documentElement.scrollHeight > window.innerHeight,
    ),
  ).toBe(true);

  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();

  // Wheel and trackpad.
  await page.mouse.move(viewport!.width / 2, viewport!.height / 2);
  await page.mouse.wheel(0, 800);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);

  // Keyboard.
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.locator('main').focus();
  await page.keyboard.press('PageDown');
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);

  // Programmatic and anchor scrolling.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() =>
    document
      .querySelector('#contacto')!
      .scrollIntoView({ block: 'center', behavior: 'instant' }),
  );
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);

  // Hiding the indicator must not have introduced horizontal overflow.
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(0);
});

test('the edge rail carries no progress marker', async ({ page }) => {
  await page.goto('/');

  const spine = await page.locator('.edge-menu__spine').evaluate((element) => ({
    after: getComputedStyle(element, '::after').content,
    before: getComputedStyle(element, '::before').content,
    width: element.getBoundingClientRect().width,
  }));

  // The rail is a stable graphic edge: present, and with nothing travelling on
  // it. `content: none` means the pseudo-element generates no box at all.
  expect(spine.width).toBeGreaterThan(0);
  expect(spine.after).toBe('none');
  expect(spine.before).toBe('none');
});

test('the edge menu works with pointer and keyboard', async ({ page }) => {
  await page.goto('/');

  const menu = page.locator('[data-edge-menu]');
  const disclosure = page.locator('[data-edge-disclosure]');
  const trigger = page.locator('[data-edge-trigger]');

  await expect(menu).toHaveAttribute('data-state', 'closed');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toHaveAttribute('aria-controls', 'site-menu-panel');

  await trigger.click();
  await expect(disclosure).toHaveAttribute('open', '');
  await expect(menu).toHaveAttribute('data-state', 'open');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(menu.getByRole('link', { name: /Contacto/ })).toBeVisible();
  await expect(page.locator('body')).toHaveAttribute('data-menu-open', 'true');
  await expect(page.locator('main')).toHaveJSProperty('inert', true);
  await expect(menu.locator('[data-motion-toggle]')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(disclosure).not.toHaveAttribute('open', '');
  await expect(menu).toHaveAttribute('data-state', 'closed');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('main')).toHaveJSProperty('inert', false);
  await expect(trigger).toBeFocused();
});

test('the edge menu closes from the rail and from outside the panel', async ({
  page,
}) => {
  const menu = page.locator('[data-edge-menu]');
  const trigger = page.locator('[data-edge-trigger]');

  await page.goto('/');

  // The same handle that opened it closes it again.
  await trigger.click();
  await expect(menu).toHaveAttribute('data-state', 'open');
  await trigger.click();
  await expect(menu).toHaveAttribute('data-state', 'closed');

  // Clicking outside the panel closes it too.
  await trigger.click();
  await expect(menu).toHaveAttribute('data-state', 'open');
  await page.locator('[data-edge-close]').click({ position: { x: 40, y: 40 } });
  await expect(menu).toHaveAttribute('data-state', 'closed');
  await expect(page.locator('main')).toHaveJSProperty('inert', false);
  await expect(page.locator('body')).not.toHaveAttribute(
    'data-menu-open',
    'true',
  );
});

test('the edge handle stays brand orange under the cursor', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'Hover styling is a fine-pointer concern.');

  // `--color-brand-orange`, #cd5730.
  const ORANGE = 'rgb(205, 87, 48)';
  const INK = 'rgb(18, 16, 15)';

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');

  const menu = page.locator('[data-edge-menu]');
  const handle = page.locator('[data-edge-trigger]');

  // Closed, and peeking under the cursor: the handle is already brand orange,
  // so hovering changes no colour. Its travel is the response.
  await expect(handle).toHaveCSS('background-color', ORANGE);
  await handle.hover();
  await expect(menu).toHaveAttribute('data-state', 'peek');
  await expect(handle).toHaveCSS('background-color', ORANGE);
  await expect(handle).toHaveCSS('color', INK);

  // Open, the handle becomes an outlined close tab; hovering fills it with the
  // same brand orange rather than any other accent.
  await handle.click();
  await expect(menu).toHaveAttribute('data-state', 'open');
  await handle.hover();
  await expect(handle).toHaveCSS('background-color', ORANGE);
  await expect(handle).toHaveCSS('color', INK);
});

test('the closed edge menu keeps the panel out of reach', async ({ page }) => {
  await page.goto('/');

  const panel = page.locator('[data-edge-panel]');
  // Hidden rather than merely off-screen, so it leaves the tab order and the
  // accessibility tree while the menu is closed.
  await expect(panel).toBeHidden();
  await expect(panel).toHaveCSS('visibility', 'hidden');
});

test('the edge rail stays anchored to the right edge', async ({
  page,
  isMobile,
}) => {
  test.skip(
    isMobile,
    'The explicit viewport matrix runs once in desktop Chromium.',
  );

  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 1440, height: 1000 },
    { width: 1366, height: 768 },
    { width: 834, height: 1112 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');

    const geometry = await page
      .locator('[data-edge-trigger]')
      .evaluate((handle) => {
        const rect = handle.getBoundingClientRect();
        const spine = document
          .querySelector('.edge-menu__spine')!
          .getBoundingClientRect();
        return {
          edge: document.documentElement.clientWidth,
          handleRight: rect.right,
          visible: document.documentElement.clientWidth - rect.left,
          spineRight: spine.right,
          spineWidth: spine.width,
        };
      });

    // The spine is flush against the edge in every state.
    expect(Math.abs(geometry.spineRight - geometry.edge)).toBeLessThanOrEqual(
      1,
    );
    expect(geometry.spineWidth).toBeGreaterThan(0);

    // The handle is translated outwards, so only a sliver of it is inside the
    // viewport while the menu is closed. The rest waits off-screen.
    expect(geometry.handleRight).toBeGreaterThan(geometry.edge);
    expect(geometry.visible).toBeGreaterThan(0);
    expect(geometry.visible).toBeLessThanOrEqual(56);
  }
});

test('pointer proximity to the right edge reveals the handle', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'The peek state is a fine-pointer enhancement.');

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');

  const menu = page.locator('[data-edge-menu]');
  const closedWidth = await visibleHandleWidth(page);

  await page.mouse.move(200, 500);
  await expect(menu).toHaveAttribute('data-state', 'closed');

  await page.mouse.move(1420, 500);
  await expect(menu).toHaveAttribute('data-state', 'peek');
  // The handle travels, so poll until the transition settles.
  await expect
    .poll(() => visibleHandleWidth(page))
    .toBeGreaterThan(closedWidth * 2);

  // Retracts once the pointer leaves the zone again.
  await page.mouse.move(600, 500);
  await expect(menu).toHaveAttribute('data-state', 'closed');
});

test('an open edge menu ignores pointer proximity', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'The peek state is a fine-pointer enhancement.');

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.locator('[data-edge-trigger]').click();
  await expect(page.locator('[data-edge-menu]')).toHaveAttribute(
    'data-state',
    'open',
  );

  // Moving away from the edge must not retract an open panel.
  await page.mouse.move(120, 400);
  await page.mouse.move(80, 700);
  await expect(page.locator('[data-edge-menu]')).toHaveAttribute(
    'data-state',
    'open',
  );
});

test('opening the menu locks scrolling without moving the layout', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('#contacto').scrollIntoViewIfNeeded();

  const read = () =>
    page.evaluate(() => {
      const footer = document.querySelector('.site-footer')!;
      const rect = footer.getBoundingClientRect();
      return {
        y: window.scrollY,
        left: rect.left,
        right: rect.right,
        overflowY: getComputedStyle(document.body).overflowY,
        lockGutter: document.body.style.getPropertyValue(
          '--scroll-lock-gutter',
        ),
      };
    });

  const before = await read();

  await page.locator('[data-edge-trigger]').click();
  await expect(page.locator('[data-edge-menu]')).toHaveAttribute(
    'data-state',
    'open',
  );

  const during = await read();
  expect(during.overflowY).toBe('hidden');
  expect(Math.abs(during.y - before.y)).toBeLessThanOrEqual(1);
  expect(Math.abs(during.left - before.left)).toBeLessThanOrEqual(1);
  expect(Math.abs(during.right - before.right)).toBeLessThanOrEqual(1);

  await page.keyboard.press('Escape');
  const after = await read();
  expect(after.overflowY).not.toBe('hidden');
  expect(after.lockGutter).toBe('');
  expect(Math.abs(after.y - before.y)).toBeLessThanOrEqual(1);
});

test('every navigation label stays on a single line', async ({
  page,
  isMobile,
}) => {
  test.skip(
    isMobile,
    'The explicit viewport matrix runs once in desktop Chromium.',
  );

  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 1440, height: 900 },
    { width: 1366, height: 768 },
    { width: 1024, height: 1366 },
    { width: 768, height: 1024 },
    { width: 430, height: 932 },
    { width: 390, height: 844 },
    { width: 320, height: 720 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.locator('[data-edge-trigger]').click();
    await expect(page.locator('[data-edge-menu]')).toHaveAttribute(
      'data-state',
      'open',
    );

    const labels = await page
      .locator('.edge-menu__list strong')
      .evaluateAll((elements) =>
        elements.map((element) => {
          const style = getComputedStyle(element);
          return {
            text: element.textContent?.trim() ?? '',
            height: element.getBoundingClientRect().height,
            lineHeight: parseFloat(style.lineHeight),
          };
        }),
      );

    expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) {
      expect(
        label.height,
        label.text + ' wraps at width ' + String(viewport.width),
      ).toBeLessThan(label.lineHeight * 1.6);
    }

    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(0);
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

  const menu = page.locator('[data-edge-menu]');
  await menu.locator('summary').click();
  await expect(page.locator('[data-edge-disclosure]')).toHaveAttribute(
    'open',
    '',
  );
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
  const menu = page.locator('[data-edge-menu]');
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
