import { expect, test, type Locator, type Page } from '@playwright/test';

const demoNames = ['Fauce Elástica', 'Pulso Molar', 'Rastro Naranja'];

async function expectNoOverlap(fixed: Locator, content: Locator) {
  const fixedBox = await fixed.boundingBox();
  expect(fixedBox).not.toBeNull();
  const contentBoxes = await content.evaluateAll((elements) =>
    elements
      .filter((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return (
          style.visibility !== 'hidden' &&
          style.display !== 'none' &&
          rect.width > 0 &&
          rect.height > 0
        );
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
      }),
  );

  for (const box of contentBoxes) {
    const overlaps =
      fixedBox !== null &&
      fixedBox.x < box.x + box.width &&
      fixedBox.x + fixedBox.width > box.x &&
      fixedBox.y < box.y + box.height &&
      fixedBox.y + fixedBox.height > box.y;
    expect(overlaps).toBe(false);
  }
}

async function collectConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

test('development demo exposes three unmistakably fictional projects', async ({
  page,
}) => {
  await page.goto('/proyectos/');
  await expect(
    page.getByText('DEMO FICTICIA — NO PUBLICAR').first(),
  ).toBeVisible();
  for (const name of demoNames) {
    await expect(page.getByRole('heading', { level: 3, name })).toBeVisible();
  }
  await expect(page.locator('.project-card')).toHaveCount(3);
});

test('manifesto, studio and contact are complete demo destinations', async ({
  page,
}) => {
  await page.goto('/manifiesto/');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Manifiesto' }),
  ).toBeVisible();
  await expect(
    page.getByText('DEMO FICTICIA — NO PUBLICAR').first(),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Siguiente Studio/ }),
  ).toHaveAttribute('href', '/studio/');

  await page.goto('/studio/');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Studio' }),
  ).toBeVisible();
  await expect(page.locator('.studio-process__steps li')).toHaveCount(4);

  await page.goto('/contacto/');
  await expect(
    page.getByRole('heading', { level: 1, name: /Haz que tu marca/ }),
  ).toBeVisible();
  await expect(
    page.locator('.contact-page__routes a[href="/manifiesto/"]'),
  ).toBeVisible();
  await expect(
    page.locator('.contact-page__routes a[href="/studio/"]'),
  ).toBeVisible();
  await expect(
    page.locator('.contact-page__routes a[href="/proyectos/"]'),
  ).toBeVisible();
});

test('project detail, previous/next and history navigation work', async ({
  page,
}) => {
  const errors = await collectConsoleErrors(page);
  await page.goto('/proyectos/demo-fauce-elastica/');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Fauce Elástica' }),
  ).toBeVisible();
  await expect(
    page.getByText('DEMO FICTICIA — NO PUBLICAR').first(),
  ).toBeVisible();
  await page.getByRole('link', { name: /Siguiente.*Pulso Molar/ }).click();
  await expect(page).toHaveURL(/demo-pulso-molar/);
  await page.goBack();
  await expect(page).toHaveURL(/demo-fauce-elastica/);
  await page.goForward();
  await expect(page).toHaveURL(/demo-pulso-molar/);
  await page.getByRole('link', { name: 'Todos los proyectos' }).click();
  await expect(page).toHaveURL(/\/proyectos\/$/);
  expect(errors).toEqual([]);
});

test('project pages and the rail remain usable without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  const viewport = page.locator('[data-project-viewport]');
  await expect(viewport).toBeVisible();
  const overflow = await viewport.evaluate(
    (element) => element.scrollWidth > element.clientWidth,
  );
  expect(overflow).toBe(true);
  const firstProject = page
    .getByRole('link', { name: /Fauce Elástica/ })
    .first();
  await expect(firstProject).toHaveAttribute(
    'href',
    '/proyectos/demo-fauce-elastica/',
  );
  await Promise.all([
    page.waitForURL(/demo-fauce-elastica/),
    firstProject.evaluate((link: HTMLAnchorElement) => link.click()),
  ]);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Fauce Elástica' }),
  ).toBeVisible();
  const nextProject = page.getByRole('link', {
    name: /Siguiente.*Pulso Molar/,
  });
  await Promise.all([
    page.waitForURL(/demo-pulso-molar/),
    nextProject.evaluate((link: HTMLAnchorElement) => link.click()),
  ]);
  await expect(page).toHaveURL(/demo-pulso-molar/);
  await context.close();
});

test('horizontal enhancement moves the project track on a fine pointer', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/');
  const section = page.locator('[data-horizontal-projects]');
  await section.scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 700);
  await page.waitForTimeout(150);
  await expect(page.locator('[data-project-track]')).not.toHaveCSS(
    'transform',
    'none',
  );
});

test('project rail exposes contextual cursor and truthful progress', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/');
  const section = page.locator('[data-horizontal-projects]');
  await expect(section).toHaveAttribute('data-projects-ready');
  // The home stacks sticky sections above the rail, so a single absolute jump
  // computed before scrolling can land short. Re-apply until the rail really
  // sits at the top of the viewport, then let the pin settle.
  for (let attempt = 0; attempt < 4; attempt += 1) {
    await section.evaluate((element) => {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: 'auto',
      });
    });
    await page.waitForTimeout(400);
    const offset = await section.evaluate(
      (element) => element.getBoundingClientRect().top,
    );
    if (Math.abs(offset) < 2) break;
  }
  await page.waitForTimeout(900);

  const firstCard = page.locator('[data-project-card] a').first();
  const firstCardBox = await firstCard.boundingBox();
  const viewport = page.viewportSize();
  expect(firstCardBox).not.toBeNull();
  expect(viewport).not.toBeNull();
  await page.mouse.move(
    Math.max(
      1,
      Math.min(viewport!.width - 1, firstCardBox!.x + firstCardBox!.width / 2),
    ),
    (Math.max(0, firstCardBox!.y) +
      Math.min(viewport!.height, firstCardBox!.y + firstCardBox!.height)) /
      2,
  );
  const cursor = page.locator('[data-custom-cursor]');
  await expect(cursor).toHaveAttribute('data-labelled', 'true');
  await expect(cursor.locator('[data-cursor-text]')).toHaveText('Abrir');

  const next = page.locator('[data-project-next]');
  await expect(page.locator('[data-project-previous]')).toBeDisabled();
  await next.click();
  await expect(page.locator('[data-project-progress]')).toHaveText('2 / 3');
  await expect(page.locator('[data-project-meter]')).toHaveAttribute(
    'aria-valuenow',
    '2',
  );
});

test('the pinned project rail stays in view for the whole pin', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/');
  const section = page.locator('[data-horizontal-projects]');
  await expect(section).toHaveAttribute('data-horizontal-enhanced', 'true');

  // No ancestor of the rail may establish a containing block for fixed
  // descendants. A transform, filter or perspective there makes ScrollTrigger
  // position the pinned section against that ancestor instead of the viewport,
  // which scrolls the whole section out of sight mid-pin.
  const ancestorBreaksFixed = await section.evaluate((element) => {
    let node = element.parentElement;
    while (node) {
      const style = getComputedStyle(node);
      if (
        style.transform !== 'none' ||
        style.perspective !== 'none' ||
        style.filter !== 'none' ||
        style.backdropFilter !== 'none'
      ) {
        return node.tagName.toLowerCase() + '#' + node.id;
      }
      node = node.parentElement;
    }
    return null;
  });
  expect(ancestorBreaksFixed).toBeNull();

  const pin = await page
    .locator('.pin-spacer')
    .first()
    .evaluate((spacer) => {
      const rect = spacer.getBoundingClientRect();
      return { top: rect.top + window.scrollY, height: rect.height };
    });

  const viewportHeight = page.viewportSize()?.height ?? 0;
  expect(viewportHeight).toBeGreaterThan(0);

  // Sample across the pin, including both ends.
  for (const ratio of [0.05, 0.3, 0.55, 0.8]) {
    const target = pin.top + (pin.height - viewportHeight) * ratio;
    await page.evaluate((y) => window.scrollTo(0, y), target);
    await page.waitForTimeout(400);

    const state = await section.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const track = document.querySelector('[data-project-track]');
      return {
        top: Math.round(rect.top),
        height: Math.round(rect.height),
        viewportHeight: window.innerHeight,
        position: getComputedStyle(element).position,
        trackX: track
          ? new DOMMatrix(getComputedStyle(track).transform).m41
          : 0,
      };
    });

    if (state.position === 'fixed') {
      // While pinned the section must sit at the top of the viewport and fit
      // inside it, because vertical scrolling is frozen for the whole pin.
      expect(state.top).toBe(0);
      expect(state.height).toBeLessThanOrEqual(state.viewportHeight + 1);
    }
    // The section is on screen at every sampled point of the pin.
    expect(state.top).toBeLessThan(state.viewportHeight);
    expect(state.top + state.height).toBeGreaterThan(0);
  }

  // The rail actually advanced horizontally across the pin.
  const finalX = await page
    .locator('[data-project-track]')
    .evaluate((track) => new DOMMatrix(getComputedStyle(track).transform).m41);
  expect(finalX).toBeLessThan(-100);
});

test('side rail reports the current home scene', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/');
  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-side-menu-current]')).toHaveText('05');
  await expect(page.locator('[data-section-link="contacto"]')).toHaveAttribute(
    'aria-current',
    'location',
  );
});

test('fixed controls do not cover hero, contact or footer content', async ({
  page,
}) => {
  await page.goto('/');
  const motion = page.locator('[data-motion-toggle]');
  const menu = page.locator('.side-menu__trigger');
  await expect(motion).not.toBeVisible();
  await expectNoOverlap(menu, page.locator('.hero__footer a'));

  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await expectNoOverlap(
    menu,
    page.locator('#contacto h2, #contacto p, #contacto a'),
  );

  const siteFooter = page.locator('.site-footer');
  await siteFooter.scrollIntoViewIfNeeded();
  await expectNoOverlap(menu, siteFooter.locator('p, a'));

  await menu.click();
  await expect(motion).toBeVisible();
  await expect(page.locator('[data-menu-panel]')).toBeVisible();
});

test('fixed controls do not cover project copy or navigation', async ({
  page,
}) => {
  await page.goto('/proyectos/demo-fauce-elastica/');
  const motion = page.locator('[data-motion-toggle]');
  const menu = page.locator('.side-menu__trigger');
  const copy = page.locator(
    '.project-hero__copy h1, .project-hero__copy p, .project-hero__copy li, .project-hero__copy strong',
  );
  await expect(motion).not.toBeVisible();
  await expectNoOverlap(menu, copy);

  await page.locator('.project-navigation').scrollIntoViewIfNeeded();
  await expectNoOverlap(menu, page.locator('.project-navigation a'));
});

test('reduced motion keeps all project content available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await expect(page.locator('[data-motion-toggle]')).toBeDisabled();
  await expect(page.locator('[data-project-card]')).toHaveCount(3);
  await expect(page.locator('[data-project-track]')).toHaveCSS(
    'transform',
    'none',
  );
});

test('the services composition keeps every entry readable in all modes', async ({
  page,
}) => {
  await page.goto('/');
  const section = page.locator('#servicios');
  const entries = section.locator('[data-service-entry]');
  await expect(entries).toHaveCount(4);
  await expect(section.getByRole('heading', { level: 2 })).toHaveText(
    'Servicios',
  );
  await expect(section.locator('h3')).toHaveCount(4);

  // Provisional copy must stay unmistakably flagged.
  await expect(
    section.getByText('DEMO FICTICIA — NO PUBLICAR').first(),
  ).toBeVisible();

  // No content may sit behind hover, and no placeholder destinations.
  await expect(section.locator('a[href="#"]')).toHaveCount(0);
  await expect(
    section.locator('[tabindex="0"]:not(a):not(button)'),
  ).toHaveCount(0);
  const hiddenDescriptions = await section
    .locator('.service-entry__description')
    .evaluateAll(
      (nodes) =>
        nodes.filter((node) => {
          const style = getComputedStyle(node);
          return (
            style.display === 'none' ||
            style.visibility === 'hidden' ||
            Number.parseFloat(style.opacity) < 0.5
          );
        }).length,
    );
  expect(hiddenDescriptions).toBe(0);

  // Decorative glyphs stay out of the accessibility tree.
  const exposedGlyphs = await section
    .locator('.service-glyph')
    .evaluateAll(
      (nodes) =>
        nodes.filter((node) => node.getAttribute('aria-hidden') !== 'true')
          .length,
    );
  expect(exposedGlyphs).toBe(0);

  await expect(section.locator('a[href="/proyectos/"]')).toBeVisible();
});

test('the services composition is asymmetric on a fine pointer', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/');
  const section = page.locator('#servicios');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // Designed placement: no two entries share an indent, and none of it is
  // random, so the same four offsets must appear on every run.
  const indents = await section
    .locator('[data-service-entry]')
    .evaluateAll((nodes) =>
      nodes.map((node) => Math.round(node.getBoundingClientRect().x)),
    );
  expect(new Set(indents).size).toBe(indents.length);

  // Hover emphasis dims the rest without hiding it.
  const first = section.locator('[data-service-entry]').first();
  await first.hover();
  await page.waitForTimeout(350);
  await expect(first).toHaveAttribute('data-service-active', 'true');
  const dimmed = await section
    .locator('[data-service-entry]:not([data-service-active="true"])')
    .evaluateAll((nodes) =>
      nodes.map((node) => Number.parseFloat(getComputedStyle(node).opacity)),
    );
  for (const opacity of dimmed) {
    expect(opacity).toBeGreaterThanOrEqual(0.45);
    expect(opacity).toBeLessThanOrEqual(0.65);
  }
});

test('primary and editorial routes fit a compact 320px viewport', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.setViewportSize({ width: 320, height: 720 });
  const routes = [
    '/',
    '/manifiesto/',
    '/studio/',
    '/contacto/',
    '/proyectos/',
    '/proyectos/demo-fauce-elastica/',
    '/privacidad/',
    '/404.html',
  ];

  for (const route of routes) {
    await page.goto(route);
    const layout = await page.evaluate(() => {
      const heading = document.querySelector<HTMLElement>('main h1');
      const box = heading?.getBoundingClientRect();
      return {
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        headingLeft: box?.left ?? 0,
        headingRight: box?.right ?? 0,
      };
    });
    expect(layout.overflow, route).toBeLessThanOrEqual(1);
    expect(layout.headingLeft, route).toBeGreaterThanOrEqual(0);
    expect(layout.headingRight, route).toBeLessThanOrEqual(320);
  }
});

test('editorial routes tolerate 200 percent text sizing', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.setViewportSize({ width: 390, height: 844 });

  for (const route of [
    '/manifiesto/',
    '/studio/',
    '/contacto/',
    '/proyectos/',
    '/privacidad/',
  ]) {
    await page.goto(route);
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow, route).toBeLessThanOrEqual(1);
  }
});

test('demo routes render without browser errors', async ({ page }) => {
  const errors = await collectConsoleErrors(page);
  const routes = [
    '/',
    '/manifiesto/',
    '/studio/',
    '/proyectos/',
    '/proyectos/demo-rastro-naranja/',
    '/contacto/',
    '/aviso-legal/',
    '/privacidad/',
    '/cookies/',
    '/404.html',
  ];
  for (const route of routes) {
    await page.goto(route);
    await page.waitForLoadState('domcontentloaded');
    const layout = await page.evaluate(() => ({
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      scrollX: window.scrollX,
    }));
    expect(layout.overflow).toBeLessThanOrEqual(1);
    expect(layout.scrollX).toBe(0);
  }
  expect(errors).toEqual([]);
});
