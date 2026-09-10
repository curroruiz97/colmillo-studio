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

/** Waits until the edge panel has finished travelling into place. */
async function settleEdgePanel(page: Page) {
  await expect(page.locator('[data-edge-menu]')).toHaveAttribute(
    'data-state',
    'open',
  );
  await expect
    .poll(() =>
      page
        .locator('[data-edge-panel]')
        .evaluate(
          (panel) => new DOMMatrix(getComputedStyle(panel).transform).m41,
        ),
    )
    .toBeLessThanOrEqual(1);
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
      // Sub-pixel only: the pin can land on a fractional offset, and the
      // strict form of this failed on `-0` for a top of -0.4px.
      expect(Math.abs(state.top)).toBeLessThanOrEqual(1);
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

test('the edge rail reports the current home scene', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/');

  // The pinned project rail adds a full pin's worth of document height once it
  // registers. Scrolling before that lands on an earlier scene, which then
  // stays reported because nothing scrolls again.
  await expect(page.locator('[data-horizontal-projects]')).toHaveAttribute(
    'data-horizontal-enhanced',
    'true',
  );

  // The rail reports the scene crossing the middle of the viewport.
  await expect
    .poll(async () => {
      await page
        .locator('#contacto')
        .evaluate((section) =>
          section.scrollIntoView({ block: 'center', behavior: 'instant' }),
        );
      return page.locator('[data-edge-position]').textContent();
    })
    .toBe('05');

  await expect(page.locator('[data-section-link="contacto"]')).toHaveAttribute(
    'aria-current',
    'location',
  );

  // The closed edge carries no readout of its own: only the panel reports.
  await expect(page.locator('.edge-menu__spine')).toHaveCount(0);
  await expect(page.locator('[data-edge-current]')).toHaveCount(0);
});

test('fixed controls do not cover hero, contact or footer content', async ({
  page,
}) => {
  await page.goto('/');
  const menu = page.locator('[data-edge-tab]');
  const instagram = page.locator('[data-instagram]');
  const heroContent = page.locator(
    '.hero__media-frame, .hero__cta, .hero__scroll, .hero__logo',
  );
  await expect(page.locator('[data-motion-toggle]')).toHaveCount(0);
  // The loop, the CTA and the scroll hint all have to clear the tab, and the
  // large Instagram pose must not land on any of them either.
  await expectNoOverlap(menu, heroContent);
  await expectNoOverlap(instagram, heroContent);

  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await expectNoOverlap(
    menu,
    page.locator('#contacto h2, #contacto p, #contacto a'),
  );

  const siteFooter = page.locator('.site-footer');
  await siteFooter.scrollIntoViewIfNeeded();
  await expectNoOverlap(menu, siteFooter.locator('p, a'));

  await menu.click();
  await expect(page.locator('[data-edge-panel]')).toBeVisible();
});

test('the open panel never hides behind its own close control', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('[data-edge-trigger]').click();
  await settleEdgePanel(page);

  // Measured while the control is fully expanded, its widest state.
  await expect(page.locator('[data-edge-menu]')).toHaveAttribute(
    'data-close',
    'expanded',
  );
  await expectNoOverlap(
    page.locator('[data-edge-closer]'),
    page.locator(
      '.edge-menu__head, .edge-menu__list a, .edge-menu__channels a, .edge-menu__legal a',
    ),
  );
});

test('fixed controls do not cover project copy or navigation', async ({
  page,
}) => {
  await page.goto('/proyectos/demo-fauce-elastica/');
  const menu = page.locator('[data-edge-tab]');
  const copy = page.locator(
    '.project-hero__copy h1, .project-hero__copy p, .project-hero__copy li, .project-hero__copy strong',
  );
  await expect(page.locator('[data-motion-toggle]')).toHaveCount(0);
  await expectNoOverlap(menu, copy);
  await expectNoOverlap(page.locator('[data-instagram]'), copy);

  await page.locator('.project-navigation').scrollIntoViewIfNeeded();
  await expectNoOverlap(menu, page.locator('.project-navigation a'));
});

test('reduced motion keeps all project content available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await expect(page.locator('[data-motion-toggle]')).toHaveCount(0);
  await expect(page.locator('[data-project-card]')).toHaveCount(3);
  await expect(page.locator('[data-project-track]')).toHaveCSS(
    'transform',
    'none',
  );
});

test('the services block keeps every entry readable in all modes', async ({
  page,
}) => {
  await page.goto('/');
  const section = page.locator('#servicios');
  const entries = section.locator('[data-service-entry]');
  await expect(entries).toHaveCount(4);
  await expect(section.getByRole('heading', { level: 2 })).toHaveText(
    'Nuestros servicios',
  );
  await expect(section.locator('h3')).toHaveCount(4);

  // The removed decoration must stay removed: no per-service numbering, no
  // backdrop word, no sticky marker.
  await expect(section.locator('.service-entry__number')).toHaveCount(0);
  await expect(section.locator('[data-services-ghost]')).toHaveCount(0);
  await expect(section.locator('[data-services-marker]')).toHaveCount(0);

  // Provisional copy stays machine-detectable so `check:production` can keep
  // it out of `dist/`, even though the loud badge is gone from the design.
  await expect(section).toHaveAttribute('data-dev-placeholder', 'true');
  await expect(
    section.getByText('Texto provisional de demostración').first(),
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

  // The removed orange furniture must stay removed: no eyebrow, no accent line
  // under the title, and no route out of this section.
  await expect(section.locator('.services-section__eyebrow')).toHaveCount(0);
  await expect(section.locator('.service-entry__short')).toHaveCount(0);
  await expect(section.locator('a[href="/proyectos/"]')).toHaveCount(0);

  // The service titles are the section's only colour.
  await expect(section.locator('.service-entry__title').first()).toHaveCSS(
    'color',
    'rgb(205, 87, 48)',
  );
});

test('the route into the archive closes the project rail', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#proyectos');
  const cta = section.locator('a[href="/proyectos/"].bite-button');
  await expect(cta).toHaveText('Ver proyectos');

  // It closes the rail: after it in the DOM and below it on screen.
  await expect(
    section.locator('[data-project-viewport] ~ .projects-section__outro'),
  ).toHaveCount(1);

  // Walk down until the section's own top reaches the top of the viewport,
  // which is where the enhanced rail pins.
  for (let step = 0; step < 90; step += 1) {
    const top = await section.evaluate(
      (node) => node.getBoundingClientRect().top,
    );
    if (top <= 1) break;
    await page.mouse.wheel(0, Math.min(600, Math.max(120, top)));
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(600);
  await expect(cta).toBeVisible();

  const geometry = await section.evaluate((node) => {
    const rail = node.querySelector('[data-project-viewport]');
    const button = node.querySelector('a.projects-section__cta');
    if (!rail || !button) return null;
    return {
      enhanced: node.getAttribute('data-horizontal-enhanced') === 'true',
      railBottom: rail.getBoundingClientRect().bottom,
      ctaTop: button.getBoundingClientRect().top,
      ctaBottom: button.getBoundingClientRect().bottom,
      viewportHeight: window.innerHeight,
    };
  });
  if (!geometry) throw new Error('projects rail or CTA missing');
  expect(geometry.ctaTop).toBeGreaterThanOrEqual(geometry.railBottom - 2);

  // A pinned section freezes vertical scrolling, so anything below the fold is
  // unreachable for the whole pin. The native fallback simply scrolls, so the
  // constraint only applies to the enhanced rail.
  if (geometry.enhanced) {
    expect(geometry.ctaTop).toBeGreaterThanOrEqual(0);
    expect(geometry.ctaBottom).toBeLessThanOrEqual(geometry.viewportHeight + 1);
  }
});

test('the pinned rail still shows a whole project card next to the route', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/');
  const section = page.locator('#proyectos');
  await expect(section).toHaveAttribute('data-horizontal-enhanced', 'true');
  for (let step = 0; step < 90; step += 1) {
    const top = await section.evaluate(
      (node) => node.getBoundingClientRect().top,
    );
    if (top <= 1) break;
    await page.mouse.wheel(0, Math.min(600, Math.max(120, top)));
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(600);

  // Adding the closing route costs the rail height, so the card summary is the
  // first thing that would be clipped. It must still clear the card edge.
  const clearance = await section.evaluate((node) => {
    const card = node.querySelector('[data-project-card]');
    const summary = card?.querySelector('p');
    if (!card || !summary) return null;
    return (
      card.getBoundingClientRect().bottom -
      summary.getBoundingClientRect().bottom
    );
  });
  if (clearance === null) throw new Error('project card copy missing');
  expect(clearance).toBeGreaterThan(16);
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

test('the hero composition centres the loop with the CTA under it', async ({
  page,
}) => {
  await page.goto('/');

  const geometry = await page.evaluate(() => {
    const box = (selector: string) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
        centreX: rect.left + rect.width / 2,
      };
    };
    return {
      viewport: { width: innerWidth, height: innerHeight },
      loop: box('.hero__media-frame'),
      cta: box('.hero__cta'),
      hint: box('.hero__scroll'),
      logo: box('.hero__logo'),
      disc: box('.hero__shape--disc'),
      orangeTrace: Boolean(document.querySelector('.hero__shape--orbit')),
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    };
  });

  const { loop, cta, hint, logo, viewport } = geometry;
  expect(loop).not.toBeNull();
  expect(cta).not.toBeNull();
  expect(hint).not.toBeNull();
  if (!loop || !cta || !hint || !logo) return;

  // The loop is the protagonist: it owns a serious share of the first screen.
  expect(loop.width).toBeGreaterThan(viewport.width * 0.5);
  expect(loop.height).toBeGreaterThan(viewport.height * 0.2);

  // The CTA sits directly under the loop, centred on it.
  expect(Math.abs(cta.centreX - loop.centreX)).toBeLessThanOrEqual(2);
  expect(cta.top).toBeGreaterThanOrEqual(loop.bottom);

  // The scroll hint sits under the CTA, on the same axis, with air between
  // them, and still finishes inside the first screen.
  expect(Math.abs(hint.centreX - cta.centreX)).toBeLessThanOrEqual(2);
  expect(hint.top).toBeGreaterThanOrEqual(cta.bottom + 12);
  expect(hint.bottom).toBeLessThanOrEqual(viewport.height + 1);

  // The wordmark keeps the top-left corner clear of the animation.
  expect(logo.top).toBeLessThan(loop.top);
  expect(logo.left).toBeLessThan(viewport.width * 0.25);

  // The group hangs high: real paper is left under the hint.
  expect(viewport.height - hint.bottom).toBeGreaterThan(viewport.height * 0.1);

  // The ink mass enters from the side and lands on the foot. It must never be
  // cut by the bottom edge, and the trace that used to cross the loop is gone.
  expect(geometry.disc).not.toBeNull();
  if (geometry.disc) {
    expect(geometry.disc.bottom).toBeLessThanOrEqual(viewport.height + 1);
    expect(geometry.disc.left).toBeLessThan(viewport.width * 0.5);
  }
  expect(geometry.orangeTrace).toBe(false);

  expect(geometry.overflow).toBeLessThanOrEqual(1);
});

/**
 * Home manifesto. The section builds its composition out of four concepts as
 * the page scrolls, so the checks below are about the contract that makes that
 * readable rather than about exact pixels: the type is never scaled through
 * `transform` (that is what made "Morder." look soft), each black concept gets
 * its own moment and the three end up on one line, and the illustration
 * replaced the old tension/release diagram.
 */
async function seekManifesto(page: Page, progress: number) {
  const geometry = await page.evaluate(() => {
    const track = document.querySelector<HTMLElement>('[data-manifesto-track]');
    if (!track) return null;
    return {
      top: track.getBoundingClientRect().top + window.scrollY,
      height: track.offsetHeight,
      vh: window.innerHeight,
    };
  });
  expect(geometry).not.toBeNull();
  if (!geometry) return;
  await page.evaluate(
    ([box, value]) => {
      window.scrollTo({
        top: Math.round(box.top + (box.height - box.vh) * value),
        behavior: 'instant',
      });
    },
    [geometry, progress] as const,
  );
  // The timeline is scrubbed, so give it time to catch up with the jump.
  await page.waitForTimeout(1400);
}

/** True when the element carries a pure translation: no scale, no skew. */
async function isUnscaled(page: Page, selector: string) {
  return page.evaluate((target) => {
    const element = document.querySelector(target);
    if (!element) return false;
    const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
    return (
      Math.abs(matrix.a - 1) < 0.001 &&
      Math.abs(matrix.d - 1) < 0.001 &&
      Math.abs(matrix.b) < 0.001 &&
      Math.abs(matrix.c) < 0.001
    );
  }, selector);
}

test('the home manifesto builds its composition without scaling the type', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/');
  await page.addStyleTag({ content: 'html{scroll-behavior:auto !important}' });

  // The tension/release circle and the vertical label are gone; the supplied
  // illustration took their place.
  await expect(page.locator('[data-manifesto-shape]')).toHaveCount(0);
  await expect(page.locator('[data-manifesto-tag]')).toHaveCount(0);
  const illustration = page.locator('.manifesto-home__illustration');
  await expect(illustration).toHaveAttribute('src', '/assets/manifesto.png');
  await expect(illustration).toHaveAttribute('width', '1600');
  await expect(illustration).toHaveAttribute('height', '900');
  await expect(illustration).toHaveAttribute('alt', '');

  const read = () =>
    page.evaluate(() => {
      const box = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          opacity: Number(getComputedStyle(element).opacity),
        };
      };
      return {
        morder: box("[data-manifesto-word='morder']"),
        presionar: box("[data-manifesto-word='presionar']"),
        romper: box("[data-manifesto-word='romper']"),
        marca: box("[data-manifesto-word='marca']"),
        figure: box('[data-manifesto-figure]'),
        band: box('[data-manifesto-band]'),
        cta: box('[data-manifesto-cta]'),
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      };
    });

  // Opening pose: "Morder." alone, and already at its real font size.
  await seekManifesto(page, 0);
  const opening = await read();
  expect(opening.morder?.opacity).toBe(1);
  expect(opening.presionar?.opacity).toBe(0);
  expect(opening.romper?.opacity).toBe(0);
  expect(opening.marca?.opacity).toBe(0);
  expect(opening.cta?.opacity).toBe(0);
  expect(await isUnscaled(page, "[data-manifesto-word='morder']")).toBe(true);
  expect(opening.overflow).toBeLessThanOrEqual(1);

  // "Presionar." arrives as the protagonist while "Morder." holds the band.
  // "Romper." has not started yet: every concept has its own moment.
  await seekManifesto(page, 48 / 136);
  const second = await read();
  expect(second.morder?.opacity).toBe(1);
  expect(second.presionar?.opacity).toBe(1);
  expect(second.romper?.opacity).toBe(0);
  expect(second.marca?.opacity).toBe(0);
  expect(second.presionar!.top).toBeGreaterThan(second.morder!.bottom);
  expect(await isUnscaled(page, "[data-manifesto-word='presionar']")).toBe(
    true,
  );

  // "Romper." is the protagonist while the pair holds the band.
  await seekManifesto(page, 84 / 136);
  const third = await read();
  expect(third.presionar?.opacity).toBe(1);
  expect(third.romper?.opacity).toBe(1);
  expect(third.marca?.opacity).toBe(0);
  expect(
    Math.abs(third.presionar!.top - third.morder!.top),
  ).toBeLessThanOrEqual(2);
  expect(third.romper!.top).toBeGreaterThan(third.morder!.bottom);
  expect(await isUnscaled(page, "[data-manifesto-word='romper']")).toBe(true);

  // Finished poster: the three black concepts share one band, "Dejar marca." sits under it,
  // the illustration holds the right side and the CTA finally exists.
  await seekManifesto(page, 1);
  const final = await read();
  expect(final.marca?.opacity).toBe(1);
  expect(final.cta?.opacity).toBe(1);
  expect(
    Math.abs(final.presionar!.top - final.morder!.top),
  ).toBeLessThanOrEqual(2);
  expect(final.presionar!.left).toBeGreaterThan(final.morder!.right);
  expect(
    Math.abs(final.romper!.top - final.presionar!.top),
  ).toBeLessThanOrEqual(2);
  expect(final.romper!.left).toBeGreaterThan(final.presionar!.right);
  expect(final.romper!.right).toBeLessThanOrEqual(final.band!.right);
  expect(final.marca!.top).toBeGreaterThan(final.morder!.bottom);
  expect(final.marca!.right).toBeLessThan(final.figure!.left);
  expect(final.overflow).toBeLessThanOrEqual(1);

  for (const selector of [
    "[data-manifesto-word='morder']",
    "[data-manifesto-word='presionar']",
    "[data-manifesto-word='romper']",
    "[data-manifesto-word='marca']",
  ]) {
    expect(await isUnscaled(page, selector), selector).toBe(true);
  }
});

test('the home manifesto is a finished poster under reduced motion', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const state = await page.evaluate(() => {
    const section = document.querySelector('#manifiesto');
    const visible = (selector: string) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        opacity: Number(style.opacity),
        visibility: style.visibility,
        width: rect.width,
        height: rect.height,
      };
    };
    return {
      motion: document.documentElement.dataset.motion,
      // No pinned track is left to scroll through.
      sectionHeight: section!.getBoundingClientRect().height,
      viewport: window.innerHeight,
      words: [
        visible("[data-manifesto-word='morder']"),
        visible("[data-manifesto-word='presionar']"),
        visible("[data-manifesto-word='romper']"),
        visible("[data-manifesto-word='marca']"),
        visible('[data-manifesto-figure]'),
        visible('[data-manifesto-cta]'),
      ],
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    };
  });

  expect(state.motion).toBe('reduced');
  expect(state.sectionHeight).toBeLessThan(state.viewport * 1.4);
  for (const entry of state.words) {
    expect(entry).not.toBeNull();
    expect(entry!.opacity).toBe(1);
    expect(entry!.visibility).toBe('visible');
    expect(entry!.width).toBeGreaterThan(0);
    expect(entry!.height).toBeGreaterThan(0);
  }
  expect(state.overflow).toBeLessThanOrEqual(1);
});
