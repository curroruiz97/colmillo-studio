import { expect, test, type Locator, type Page } from '@playwright/test';
import { homeIntro } from '../../src/config/intro';

// The home entry intro plays once per tab and locks scrolling while it runs.
// These specs measure the page behind it, so they start as a returning visit.
test.beforeEach(async ({ page }) => {
  await page.addInitScript((key) => {
    sessionStorage.setItem(key, 'true');
  }, homeIntro.storageKey);
});

const demoNames = [
  'Fauce Elástica',
  'Pulso Molar',
  'Rastro Naranja',
  'Muesca Doble',
  'Capas en Tensión',
];

/**
 * Walks the home down until the project section's own top reaches the top of
 * the viewport, which is where the enhanced rail pins. The sticky sections
 * above it make a single computed jump land short, so it is re-applied.
 */
async function scrollRailToTop(page: Page) {
  const section = page.locator('#proyectos');
  for (let attempt = 0; attempt < 6; attempt += 1) {
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
}

/** Document offset and length of the pin that holds the project rail. */
async function projectPin(page: Page) {
  return page.locator('.pin-spacer:has(#proyectos)').evaluate((spacer) => {
    const rect = spacer.getBoundingClientRect();
    return { top: rect.top + window.scrollY, height: rect.height };
  });
}

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

test('development demo exposes five unmistakably fictional projects', async ({
  page,
}) => {
  await page.goto('/proyectos/');
  await expect(
    page.getByText('DEMO FICTICIA — NO PUBLICAR').first(),
  ).toBeVisible();
  for (const name of demoNames) {
    await expect(page.getByRole('heading', { level: 3, name })).toBeVisible();
  }
  await expect(page.locator('.project-card')).toHaveCount(5);
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

test('project tiles reveal their title on hover and open their case study', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/');
  const section = page.locator('[data-horizontal-projects]');
  await expect(section).toHaveAttribute('data-projects-ready');
  await scrollRailToTop(page);

  // The rail carries only images: no counter, arrows, meter, years, numbers,
  // summaries or demo flags.
  await expect(
    section.locator(
      '.demo-flag, [data-project-progress], [data-project-previous], [data-project-next], [data-project-meter]',
    ),
  ).toHaveCount(0);
  await expect(section).not.toContainText('2099');
  await expect(section).not.toContainText('DEMO FICTICIA');

  const tile = page.locator('[data-project-card] a').first();
  const title = tile.locator('.project-tile__title');
  await expect(title).toHaveText('Fauce Elástica');
  // At rest the title waits below the frame.
  await expect(title).toHaveCSS('opacity', '0');

  const box = await tile.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  const cursor = page.locator('[data-custom-cursor]');
  await expect(cursor).toHaveAttribute('data-labelled', 'true');
  await expect(cursor.locator('[data-cursor-text]')).toHaveText('Abrir');
  await expect(tile.locator('.project-tile__label')).toHaveCSS(
    'transform',
    'none',
  );
  await expect(title).toHaveCSS('opacity', '1');

  // Leaving reverses it.
  await page.mouse.move(2, 2);
  await expect(title).toHaveCSS('opacity', '0');

  // The whole tile is the link into the case study.
  await Promise.all([
    page.waitForURL(/\/proyectos\/demo-fauce-elastica\/$/),
    tile.click(),
  ]);
});

test('touch screens show every project title without hover', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === 'fine-1440');
  await page.goto('/');
  const titles = page.locator('[data-project-card] .project-tile__title');
  await expect(titles).toHaveCount(5);
  for (const title of await titles.all()) {
    await expect(title).toHaveCSS('opacity', '1');
  }
  await expect(
    page.locator('[data-project-card] .project-tile__label').first(),
  ).toHaveCSS('transform', 'none');
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

  const pin = await projectPin(page);

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
  await expect(page.locator('[data-project-card]')).toHaveCount(5);
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
  // Capital initial only, never forced into capitals.
  await expect(section.locator('.service-entry__title').first()).toHaveCSS(
    'text-transform',
    'none',
  );
});

test('the services block is an even 2x2 beside the heading on desktop', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/');
  const section = page.locator('#servicios');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);

  const [headingRight, boxes, art] = await Promise.all([
    section
      .locator('.services-section__lede')
      .evaluate((node) => node.getBoundingClientRect().right),
    section.locator('[data-service-entry]').evaluateAll((nodes) =>
      nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
        };
      }),
    ),
    section.locator('.services-section__illustration').evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return { top: rect.top, right: rect.right, width: rect.width };
    }),
  ]);

  const [estrategia, identidad, digital, contenido] = boxes;
  if (!estrategia || !identidad || !digital || !contenido) {
    throw new Error(`expected four service entries, got ${boxes.length}`);
  }

  // Two zones: every entry sits to the right of the heading column.
  for (const box of boxes) {
    expect(box.x).toBeGreaterThan(headingRight);
  }

  // Two columns, not four indents and not a staircase.
  expect(new Set(boxes.map((box) => box.x)).size).toBe(2);
  expect(estrategia.x).toBe(digital.x);
  expect(identidad.x).toBe(contenido.x);
  expect(identidad.x).toBeGreaterThan(estrategia.x);

  // Both rows start on one line, and the second row clears the first.
  expect(estrategia.y).toBe(identidad.y);
  expect(digital.y).toBe(contenido.y);
  expect(digital.y).toBeGreaterThan(estrategia.y);

  // Equal column widths, within a rounding pixel.
  expect(Math.abs(estrategia.width - identidad.width)).toBeLessThanOrEqual(1);

  // The illustration shares the heading column, so it must read as an
  // illustration rather than a thumbnail, and it must never push the quadrant
  // down: the first row starts above the art, not after it.
  expect(art.width).toBeGreaterThan(360);
  expect(estrategia.y).toBeLessThan(art.top);

  // A full screen, and a wide channel of ink between the art and the 2x2.
  const viewportHeight = page.viewportSize()?.height ?? 0;
  const sectionHeight = await section.evaluate(
    (node) => node.getBoundingClientRect().height,
  );
  expect(sectionHeight).toBeGreaterThanOrEqual(viewportHeight - 1);
  expect(estrategia.x - art.right).toBeGreaterThanOrEqual(80);
  // It holds the screen like every stack layer instead of scrolling away and
  // exposing the project rail under it.
  await expect(section).toHaveCSS('position', 'sticky');
});

test('the route into the archive closes the project rail', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#proyectos');
  const cta = section.locator('a[href="/proyectos/"].bite-button');
  await expect(cta).toHaveText('Ver proyectos');

  // It is the last piece of the moving track, after the last project.
  await expect(
    section.locator(
      '[data-project-track] > .projects-section__list + [data-project-outro] a.projects-section__cta',
    ),
  ).toHaveCount(1);

  await scrollRailToTop(page);
  const enhanced =
    (await section.getAttribute('data-horizontal-enhanced')) === 'true';
  if (enhanced) {
    // Travel to the end of the pin; the scrub needs a moment to catch up.
    const pin = await projectPin(page);
    const viewportHeight = page.viewportSize()?.height ?? 0;
    await page.evaluate(
      (y) => window.scrollTo(0, y),
      pin.top + pin.height - viewportHeight - 2,
    );
    await page.waitForTimeout(1500);
  } else {
    await section
      .locator('[data-project-viewport]')
      .evaluate((viewport) =>
        viewport.scrollTo({ left: viewport.scrollWidth }),
      );
    await page.waitForTimeout(500);
  }

  const viewport = page.viewportSize();
  const ctaBox = await cta.boundingBox();
  const lastTile = await section
    .locator('[data-project-card]')
    .last()
    .boundingBox();
  expect(viewport).not.toBeNull();
  expect(ctaBox).not.toBeNull();
  expect(lastTile).not.toBeNull();
  // Fully on screen at the end of the rail, with air to the right, and after
  // the fifth project rather than under the first.
  expect(ctaBox!.x).toBeGreaterThan(lastTile!.x + lastTile!.width);
  expect(ctaBox!.x + ctaBox!.width).toBeLessThanOrEqual(viewport!.width - 16);
  expect(ctaBox!.y).toBeGreaterThanOrEqual(0);
  expect(ctaBox!.y + ctaBox!.height).toBeLessThanOrEqual(viewport!.height);
});

test('no project tile is cut off by the pinned rail', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/');
  const section = page.locator('#proyectos');
  await expect(section).toHaveAttribute('data-horizontal-enhanced', 'true');
  await scrollRailToTop(page);
  const pin = await projectPin(page);
  const viewportHeight = page.viewportSize()?.height ?? 0;

  for (const ratio of [0, 0.25, 0.5, 0.75, 1]) {
    await page.evaluate(
      (y) => window.scrollTo(0, y),
      pin.top + (pin.height - viewportHeight) * ratio,
    );
    await page.waitForTimeout(900);
    const state = await section.evaluate((node) => ({
      viewportHeight: window.innerHeight,
      tiles: [...node.querySelectorAll('[data-project-card]')].map((tile) => {
        const rect = tile.getBoundingClientRect();
        return {
          left: rect.left,
          top: rect.top,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
        };
      }),
    }));
    expect(state.tiles).toHaveLength(5);
    for (const tile of state.tiles) {
      // Upright editorial pieces, whole from top to bottom with air below.
      expect(tile.height).toBeGreaterThan(tile.width);
      expect(tile.top).toBeGreaterThanOrEqual(0);
      expect(tile.bottom).toBeLessThanOrEqual(state.viewportHeight - 24);
    }
    // The first piece does not start against the left edge.
    if (ratio === 0) expect(state.tiles[0]!.left).toBeGreaterThanOrEqual(16);
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
  // The file carries wide transparent margins, so the box may reach under
  // "Dejar marca."; the drawn ink, which starts 310/1600 into the image, must
  // keep clear air from it.
  const inkLeft =
    final.figure!.left +
    (final.figure!.right - final.figure!.left) * (310 / 1600);
  expect(final.marca!.right + 48).toBeLessThan(inkLeft);
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

/** Walks the home down until `#studio` sits at the top of the viewport. */
async function scrollStudioToTop(page: Page) {
  const section = page.locator('#studio');
  for (let attempt = 0; attempt < 6; attempt += 1) {
    await section.evaluate((element) => {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: 'auto',
      });
    });
    await page.waitForTimeout(350);
    const offset = await section.evaluate(
      (element) => element.getBoundingClientRect().top,
    );
    if (Math.abs(offset) < 2) break;
  }
  await page.waitForTimeout(1400);
}

async function measureStudio(page: Page) {
  return page.locator('#studio').evaluate((section) => {
    const box = (selector: string) => {
      const element = section.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
      };
    };
    const shell = section.querySelector('.content-shell')!;
    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      shellOpacity: Number(getComputedStyle(shell).opacity),
      title: box('.studio-section__title')!,
      lede: box('.studio-section__lede')!,
      cta: box('.studio-section__button')!,
      media: box('.studio-section__video')!,
    };
  });
}

test('the studio spread pairs an editorial headline with the loop', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  const section = page.locator('#studio');

  // The copy is still a demonstration placeholder, kept machine-detectable so
  // `check:production` can keep it out of `dist/`.
  await expect(section).toHaveAttribute('data-dev-placeholder');
  await expect(section.getByRole('heading', { level: 2 })).toHaveText(
    'Tensamos cada idea hasta que muerde.',
  );
  await expect(section).toHaveCSS('background-color', 'rgb(255, 255, 255)');

  // The retired orange composition must stay retired: no seal, no underlined
  // route, no visible development note.
  await expect(
    section.locator('.studio-section__seal, [data-deformable], .section-route'),
  ).toHaveCount(0);
  await expect(section.locator('.dev-note')).toHaveCount(0);
  await expect(section.getByText(/se incorporará cuando/)).toHaveCount(0);
  // No section label: the headline opens the section.
  await expect(section.locator('.studio-section__eyebrow')).toHaveCount(0);
  await expect(section.getByText(/Colmillo \/ Studio/i)).toHaveCount(0);

  // The headline never sets in more than two lines.
  const titleLines = await section
    .locator('.studio-section__title')
    .evaluate((title) => {
      const style = getComputedStyle(title);
      const lineHeight =
        Number.parseFloat(style.lineHeight) ||
        Number.parseFloat(style.fontSize);
      return Math.round(title.getBoundingClientRect().height / lineHeight);
    });
  expect(titleLines).toBeLessThanOrEqual(2);

  // The route is the shared bite button.
  const cta = section.getByRole('link', { name: 'Abrir Studio' });
  await expect(cta).toHaveAttribute('href', '/studio/');
  await expect(cta).toHaveClass(/bite-button/);

  // The loop is decorative, silent and fetched only when it is needed.
  const video = section.locator('video');
  await expect(video).toHaveAttribute('aria-hidden', 'true');
  expect(
    await video.evaluate((element: HTMLVideoElement) => ({
      muted: element.muted,
      loop: element.loop,
      playsInline: element.playsInline,
      controls: element.controls,
      autoplay: element.autoplay,
      preload: element.preload,
    })),
  ).toEqual({
    muted: true,
    loop: true,
    playsInline: true,
    controls: false,
    autoplay: false,
    preload: 'none',
  });

  await scrollStudioToTop(page);
  const state = await measureStudio(page);
  expect(state.overflow).toBeLessThanOrEqual(1);
  // The section is not yet covered, so it must not be compressed. This is the
  // regression guard for stack triggers measured before the rail's pin existed.
  expect(state.shellOpacity).toBeGreaterThan(0.95);

  const { viewport, title, lede, cta: button, media } = state;
  // Nothing touches or crosses the viewport's sides.
  expect(media.left).toBeGreaterThanOrEqual(8);
  expect(media.right).toBeLessThanOrEqual(viewport.width - 8);

  if (testInfo.project.name === 'fine-1440') {
    // Two columns: the text well off the left edge, the loop to its right and
    // wider than it, wholly inside one screen with air above and below.
    expect(title.left).toBeGreaterThan(80);
    expect(media.left).toBeGreaterThan(title.right + 32);
    expect(media.left).toBeGreaterThan(lede.right);
    expect(media.width).toBeGreaterThan(viewport.width * 0.4);
    expect(media.width).toBeGreaterThan(title.width);
    expect(media.top).toBeGreaterThan(viewport.height * 0.15);
    expect(media.bottom).toBeLessThan(viewport.height * 0.85);
    expect(button.bottom).toBeLessThan(viewport.height);
  } else {
    // Stacked: headline and supporting line above a near full-width loop.
    expect(media.top).toBeGreaterThan(lede.bottom);
    expect(media.width).toBeGreaterThan(viewport.width * 0.8);
    if (testInfo.project.name === 'touch-390') {
      expect(button.top).toBeGreaterThan(media.bottom);
    } else {
      expect(button.bottom).toBeLessThan(media.top);
    }
  }

  // With motion allowed the loop plays once it is on screen.
  await expect
    .poll(() =>
      video.evaluate(
        (element: HTMLVideoElement) =>
          !element.paused && element.currentTime > 0,
      ),
    )
    .toBe(true);
});

test('the studio loop rests on its poster under reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await scrollStudioToTop(page);

  const state = await page.locator('#studio').evaluate((section) => {
    const video = section.querySelector('video')!;
    const hidden = [
      ...section.querySelectorAll(
        '[data-studio-line], .studio-section__lede, .studio-section__cta, .studio-section__media',
      ),
    ].filter((element) => {
      const style = getComputedStyle(element);
      return (
        Number(style.opacity) < 1 ||
        style.visibility !== 'visible' ||
        style.display === 'none'
      );
    }).length;
    return {
      motion: document.documentElement.dataset.motion,
      paused: video.paused,
      time: video.currentTime,
      poster: video.getAttribute('poster'),
      hidden,
    };
  });

  expect(state.motion).toBe('reduced');
  expect(state.paused).toBe(true);
  expect(state.time).toBe(0);
  expect(state.poster).toMatch(/studio-poster-white\.webp$/);
  expect(state.hidden).toBe(0);
});

async function scrollGoodbyeToTop(page: Page) {
  const section = page.locator('[data-goodbye]');
  for (let attempt = 0; attempt < 8; attempt += 1) {
    await section.evaluate((element) => {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: 'auto',
      });
    });
    await page.waitForTimeout(350);
    const offset = await section.evaluate(
      (element) => element.getBoundingClientRect().top,
    );
    if (Math.abs(offset) < 2) break;
  }
  await page.waitForTimeout(600);
}

/** Boxes of the stage and the indices of the slides a reader can see. */
async function measureGoodbye(page: Page) {
  return page.locator('[data-goodbye]').evaluate((section) => {
    const box = (element: Element | null) => {
      const rect = element!.getBoundingClientRect();
      return {
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    };
    const slides = [...section.querySelectorAll('[data-goodbye-slide]')];
    return {
      viewportHeight: window.innerHeight,
      index: (section as HTMLElement).dataset.goodbyeIndex ?? '0',
      section: box(section),
      composition: box(section.querySelector('.goodbye-section__composition')),
      visual: box(section.querySelector('.goodbye-section__visual')),
      visible: slides.flatMap((slide, position) => {
        const style = getComputedStyle(slide);
        return style.visibility === 'visible' && Number(style.opacity) > 0.5
          ? [position]
          : [];
      }),
      inert: slides.map((slide) => (slide as HTMLElement).inert),
    };
  });
}

test('the goodbye stage changes its copy over a visual that never moves', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  const section = page.locator('[data-goodbye]');

  // Structural placeholders only, kept machine-detectable so
  // `check:production` keeps them out of `dist/`.
  await expect(section).toHaveAttribute('data-dev-placeholder');
  await expect(section).toHaveAttribute('data-goodbye-enhanced', 'true');
  await expect(section.locator('[data-goodbye-slide]')).toHaveCount(3);

  // Not a traditional carousel: one arrow button and nothing else to press,
  // no visible counter, no autoplay.
  const next = section.getByRole('button', { name: 'Siguiente' });
  await expect(section.getByRole('button')).toHaveCount(1);
  await expect(next).toHaveAttribute('aria-controls', 'goodbye-slides');
  await expect(section.getByText(/\b\d+\s*\/\s*\d+\b/)).toHaveCount(0);

  await scrollGoodbyeToTop(page);
  const start = await measureGoodbye(page);
  expect(start.visible).toEqual([0]);
  expect(start.inert).toEqual([false, true, true]);
  if (testInfo.project.name === 'fine-1440') {
    // Exactly one screen on a desktop.
    expect(start.section.height).toBe(start.viewportHeight);
  } else {
    expect(start.section.height).toBeGreaterThanOrEqual(start.viewportHeight);
  }

  // Nothing moves on its own.
  await page.waitForTimeout(1500);
  expect((await measureGoodbye(page)).index).toBe('0');

  const advance = async (expected: string) => {
    await expect
      .poll(async () => {
        const state = await measureGoodbye(page);
        return `${state.index}:${state.visible.join(',')}`;
      })
      .toBe(`${expected}:${expected}`);
    const state = await measureGoodbye(page);
    // The copy changed; the layout, the section and the visual did not.
    expect(state.composition).toEqual(start.composition);
    expect(state.section).toEqual(start.section);
    expect(state.visual).toEqual(start.visual);
    return state;
  };

  await next.click();
  const second = await advance('1');
  expect(second.inert).toEqual([true, false, true]);

  if (testInfo.project.name.startsWith('touch')) {
    // A horizontal swipe to the left is the same request as the button.
    await section.evaluate((element) => {
      const at = (clientX: number) => ({
        pointerType: 'touch',
        isPrimary: true,
        clientX,
        clientY: 300,
        bubbles: true,
      });
      element.dispatchEvent(new PointerEvent('pointerdown', at(260)));
      element.dispatchEvent(new PointerEvent('pointerup', at(120)));
    });
  } else {
    await next.click();
  }
  await advance('2');

  // The last slide wraps to the first, still entering from the right, and the
  // keyboard stays on the one control.
  await next.focus();
  await page.keyboard.press('Enter');
  await advance('0');
  await expect(next).toBeFocused();
});

test('the goodbye stage swaps its copy in place under reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await scrollGoodbyeToTop(page);
  const start = await measureGoodbye(page);

  await page.locator('[data-goodbye-next]').click();
  const state = await measureGoodbye(page);
  expect(state.index).toBe('1');
  expect(state.visible, JSON.stringify(state)).toEqual([1]);
  expect(state.composition).toEqual(start.composition);
  // No travel: the new slide is already home.
  const transform = await page
    .locator('[data-goodbye-slide]')
    .nth(1)
    .evaluate((slide) => getComputedStyle(slide).transform);
  expect(['none', 'matrix(1, 0, 0, 1, 0, 0)']).toContain(transform);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the goodbye stage lists every slide and hides its button', async ({
    page,
  }) => {
    await page.goto('/');
    const section = page.locator('[data-goodbye]');
    await expect(section.locator('[data-goodbye-next]')).toBeHidden();
    const titles = section.locator('.goodbye-slide__title');
    await expect(titles).toHaveCount(3);
    for (let position = 0; position < 3; position += 1) {
      await titles.nth(position).scrollIntoViewIfNeeded();
      await expect(titles.nth(position)).toBeVisible();
    }
  });
});
