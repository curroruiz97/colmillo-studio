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

test('services, studio and contact are complete demo destinations', async ({
  page,
}) => {
  await page.goto('/servicios/');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Servicios' }),
  ).toBeVisible();
  await expect(page.locator('[data-service-layer]')).toHaveCount(4);
  await expect(
    page.getByRole('link', { name: 'Ver proyectos', exact: true }),
  ).toHaveAttribute('href', '/proyectos/');

  await page.goto('/studio/');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Studio' }),
  ).toBeVisible();
  await expect(page.locator('[data-principle-item]')).toHaveCount(4);

  await page.goto('/contacto/');
  await expect(
    page.getByRole('heading', { level: 1, name: /Haz que tu marca/ }),
  ).toBeVisible();
  await expect(
    page.locator('.contact-page__routes a[href="/servicios/"]'),
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

test('a project tile bends at the edge under the pointer and springs back', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/');
  await expect(page.locator('[data-horizontal-projects]')).toHaveAttribute(
    'data-projects-ready',
  );
  await scrollRailToTop(page);

  const tile = page.locator('[data-project-card] a').first();
  const frame = tile.locator('.project-tile__frame');
  const surface = tile.locator('[data-tile-surface]');
  const clip = () => surface.evaluate((element) => element.style.clipPath);
  // Whether the pressed surface is still under a point of the frame.
  const surfaceAt = (x: number, y: number) =>
    page.evaluate(
      ([px, py]) =>
        Boolean(
          document.elementFromPoint(px!, py!)?.closest('[data-tile-surface]'),
        ),
      [x, y],
    );

  const rest = await frame.boundingBox();
  expect(rest).not.toBeNull();
  expect(await clip()).toBe('');

  // Near the right edge only that edge gives; the opposite edge stays put.
  const middle = rest!.y + rest!.height / 2;
  await page.mouse.move(rest!.x + rest!.width - 12, middle, { steps: 6 });
  await expect.poll(clip).toContain('path(');
  await page.waitForTimeout(600);
  expect(await surfaceAt(rest!.x + rest!.width - 6, middle)).toBe(false);
  expect(await surfaceAt(rest!.x + rest!.width - 60, middle)).toBe(true);
  expect(await surfaceAt(rest!.x + 6, middle)).toBe(true);
  expect(await surfaceAt(rest!.x + rest!.width / 2, rest!.y + 6)).toBe(true);

  // The dent happens inside the frame: nothing scales, moves or resizes.
  expect(await frame.boundingBox()).toEqual(rest);
  await expect(frame).toHaveCSS('transform', 'none');
  await expect(tile.locator('.project-tile__media')).toHaveCSS(
    'transform',
    'none',
  );
  await expect(tile.locator('.project-tile__title')).toHaveCSS('opacity', '1');

  // The top edge takes over when the pointer goes there.
  await page.mouse.move(rest!.x + rest!.width / 2, rest!.y + 10, {
    steps: 10,
  });
  await page.waitForTimeout(700);
  expect(await surfaceAt(rest!.x + rest!.width / 2, rest!.y + 6)).toBe(false);
  expect(await surfaceAt(rest!.x + rest!.width - 6, middle)).toBe(true);

  // Leaving releases it back to the untouched rectangle.
  await page.mouse.move(2, 2);
  await expect.poll(clip).toBe('');
  expect(await frame.boundingBox()).toEqual(rest);
});

test('reduced motion keeps the project tile still on hover', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('[data-horizontal-projects]')).toHaveAttribute(
    'data-projects-ready',
  );
  await scrollRailToTop(page);

  const tile = page.locator('[data-project-card] a').first();
  const box = await tile.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.move(box!.x + box!.width - 12, box!.y + box!.height / 2, {
    steps: 6,
  });
  await expect(tile.locator('.project-tile__title')).toHaveCSS('opacity', '1');
  await page.waitForTimeout(500);
  expect(
    await tile
      .locator('[data-tile-surface]')
      .evaluate((element) => element.style.clipPath),
  ).toBe('');
  await expect(tile.locator('.project-tile__frame')).toHaveCSS(
    'transform',
    'none',
  );
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

test('the edge menu keeps Inicio active across the home scenes', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/');

  // The pinned project rail adds a full pin's worth of document height once it
  // registers; wait for it so the scroll really lands on the contact scene.
  await expect(page.locator('[data-horizontal-projects]')).toHaveAttribute(
    'data-horizontal-enhanced',
    'true',
  );

  await page
    .locator('#contacto')
    .evaluate((section) =>
      section.scrollIntoView({ block: 'center', behavior: 'instant' }),
    );
  await page.waitForTimeout(300);

  // The active route follows the URL, not the scene in view.
  await expect(page.locator('[data-edge-position]')).toHaveText('01');
  await expect(
    page.locator('.edge-menu__list a[aria-current="page"]'),
  ).toHaveAttribute('href', '/');
  await expect(page.locator('.edge-menu__list a[aria-current]')).toHaveCount(1);

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

/** Each service's name and its opacity as painted: its own times its parents'. */
const serviceOpacities = (section: Locator) =>
  section.locator('[data-service-entry]').evaluateAll((nodes) =>
    nodes.map((node) => {
      let opacity = 1;
      for (
        let element: Element | null = node;
        element && !element.matches('[data-services-section]');
        element = element.parentElement
      ) {
        opacity *= Number(getComputedStyle(element).opacity);
      }
      return {
        name: node.querySelector('h3')?.textContent?.trim() ?? '',
        opacity: Math.round(opacity * 100) / 100,
      };
    }),
  );

const serviceNames = ['Estrategia', 'Identidad', 'Digital', 'Contenido'];

test('the services block keeps every entry readable in all modes', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  const section = page.locator('#servicios');
  const entries = section.locator('[data-service-entry]');
  await expect(entries).toHaveCount(4);
  await expect(section.getByRole('heading', { level: 2 })).toHaveText(
    'Nuestros servicios',
  );
  await expect(section.locator('h3')).toHaveText(serviceNames);

  // No printed number above each name (removed at the user's request); the
  // sequence readout alone says where the reader is.
  await expect(section.locator('.service-entry__index')).toHaveCount(0);
  await expect(section.locator('[data-services-ghost]')).toHaveCount(0);
  await expect(section.locator('[data-services-marker]')).toHaveCount(0);

  // One CTA, beside the heading, into the real services page.
  const cta = section.locator('.services-section__head a.bite-button');
  await expect(cta).toHaveCount(1);
  await expect(cta).toHaveAttribute('href', '/servicios/');
  await expect(cta).toHaveAccessibleName('Abrir servicios');
  if (testInfo.project.name === 'fine-1440') {
    const [title, button] = await Promise.all([
      section.locator('.services-section__title').boundingBox(),
      cta.boundingBox(),
    ]);
    if (!title || !button) throw new Error('heading or CTA not rendered');
    // Beside the heading, with real air between them, and level with it.
    expect(button.x - (title.x + title.width)).toBeGreaterThanOrEqual(32);
    expect(button.y).toBeGreaterThanOrEqual(title.y);
    expect(button.y + button.height).toBeLessThanOrEqual(
      title.y + title.height + 1,
    );
  }

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

  // Where the sequence does not run (touch screens here), the list is linear:
  // once each service has come into view, all four are painted at once.
  if (testInfo.project.name !== 'fine-1440') {
    await expect(section).not.toHaveAttribute('data-services-enhanced');
    await expect(section.locator('.services-progress')).toBeHidden();
    // The list keeps the shared illustration; the per-service art belongs to
    // the sequence only.
    for (const layer of await section
      .locator('.services-section__illustration--service')
      .all()) {
      await expect(layer).toBeHidden();
    }
    for (let index = 0; index < 4; index += 1) {
      await entries.nth(index).scrollIntoViewIfNeeded();
    }
    await expect
      .poll(async () =>
        (await serviceOpacities(section)).every(
          (service) => service.opacity === 1,
        ),
      )
      .toBe(true);
  }

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

test('services hand the stage from one to the next, then let the rail in', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/');
  const section = page.locator('#servicios');
  await expect(section).toHaveAttribute('data-services-enhanced', 'true');
  // Not a sticky stack layer: a stage inside the track holds the screen and
  // ordinary scroll releases it.
  await expect(section).toHaveCSS('position', 'relative');

  const viewportHeight = page.viewportSize()?.height ?? 0;
  const { top, height } = await section.evaluate((node) => ({
    top: node.getBoundingClientRect().top + window.scrollY,
    height: (node as HTMLElement).offsetHeight,
  }));
  // One screen of stage plus one step per service: roughly 220-280vh.
  expect(height / viewportHeight).toBeGreaterThanOrEqual(2.2);
  expect(height / viewportHeight).toBeLessThanOrEqual(2.81);
  const travel = height - viewportHeight;
  const scrollTo = (y: number) =>
    page.evaluate(
      (to) => window.scrollTo({ top: to, behavior: 'instant' }),
      Math.round(y),
    );
  const heading = section.locator('.services-section__title');
  const viewportWidth = page.viewportSize()?.width ?? 0;
  const onStage = async () =>
    (await serviceOpacities(section))
      .filter((service) => service.opacity > 0.05)
      .map((service) => `${service.name}:${service.opacity}`);

  let anchor: { x: number; y: number } | undefined;
  for (const [index, name] of serviceNames.entries()) {
    await scrollTo(top + travel * ((index + 0.5) / serviceNames.length));
    // Exactly one service is painted, fully, and it is this one.
    await expect.poll(onStage).toEqual([`${name}:1`]);
    await expect(section.locator('[data-services-counter]')).toHaveText(
      `0${index + 1}`,
    );
    // The illustration follows the service: exactly this service's layer is
    // painted (Estrategia keeps the shared art), fully and already loaded.
    const expectedLayer = index === 0 ? 'shared' : String(index);
    await expect
      .poll(() =>
        section
          .locator('[data-services-layer]')
          .evaluateAll((nodes) =>
            nodes
              .filter((node) => Number(getComputedStyle(node).opacity) > 0.95)
              .map(
                (node) =>
                  `${(node as HTMLElement).dataset.servicesLayer}:${
                    (node as HTMLImageElement).naturalWidth > 0
                  }`,
              ),
          ),
      )
      .toEqual([`${expectedLayer}:true`]);
    // The heading is the anchor: it never moves during the sequence.
    const box = await heading.boundingBox();
    if (!box) throw new Error('the heading is not rendered');
    anchor ??= box;
    expect(Math.abs(box.y - anchor.y)).toBeLessThanOrEqual(1);
    expect(Math.abs(box.x - anchor.x)).toBeLessThanOrEqual(1);

    // The art and the service on stage are one pair centred on the viewport:
    // the art close to the copy without touching it, level with the name and
    // description rather than hanging below them, and never shrunk.
    const pair = await section.evaluate((node) => {
      const art = node
        .querySelector('[data-services-art]')!
        .getBoundingClientRect();
      const list = node
        .querySelector('.services-section__list')!
        .getBoundingClientRect();
      const entry = node.querySelector('.service-entry[data-active]')!;
      const name = entry.querySelector('h3')!.getBoundingClientRect();
      const copy = entry.querySelector('p')!.getBoundingClientRect();
      return {
        artLeft: art.left,
        artRight: art.right,
        artMiddle: (art.top + art.bottom) / 2,
        artWidth: art.width,
        copyLeft: name.left,
        copyMiddle: (name.top + copy.bottom) / 2,
        listRight: list.right,
      };
    });
    expect(pair.artLeft).toBeGreaterThan(box.x);
    expect(pair.copyLeft - pair.artRight).toBeGreaterThanOrEqual(24);
    expect(pair.copyLeft - pair.artRight).toBeLessThanOrEqual(140);
    expect(
      Math.abs((pair.artLeft + pair.listRight) / 2 - viewportWidth / 2),
    ).toBeLessThanOrEqual(viewportWidth * 0.03);
    expect(Math.abs(pair.artMiddle - pair.copyMiddle)).toBeLessThanOrEqual(
      viewportHeight * 0.05,
    );
    expect(pair.artWidth).toBeGreaterThan(360);
  }

  // The sequence runs backwards as faithfully as forwards.
  await scrollTo(top + travel * (1.5 / serviceNames.length));
  await expect.poll(onStage).toEqual(['Identidad:1']);

  // Past the track the stage leaves with the page and the rail follows right
  // under it: one seam, nothing of an older layer, and the rail not pinned.
  await scrollTo(top + travel + viewportHeight * 0.5);
  await expect
    .poll(() =>
      page.evaluate(() => {
        const services = document.querySelector('#servicios')!;
        const rail = document.querySelector('#proyectos')!;
        const seam = services.getBoundingClientRect().bottom;
        const railTop = rail.getBoundingClientRect().top;
        return {
          seamMeetsRail: Math.abs(seam - railTop) <= 1,
          above: services.contains(document.elementFromPoint(40, seam - 3)),
          below: rail.contains(document.elementFromPoint(40, seam + 3)),
          railPinned: getComputedStyle(rail).position === 'fixed',
        };
      }),
    )
    .toEqual({
      seamMeetsRail: true,
      above: true,
      below: true,
      railPinned: false,
    });

  // The rail pins only once the services are entirely off screen.
  await scrollTo(top + height + 40);
  await expect
    .poll(() =>
      page.evaluate(() => {
        const rail = document.querySelector('#proyectos')!;
        return {
          servicesGone:
            document.querySelector('#servicios')!.getBoundingClientRect()
              .bottom <= 0,
          railTop: Math.round(rail.getBoundingClientRect().top),
          railPinned: getComputedStyle(rail).position === 'fixed',
        };
      }),
    )
    .toEqual({ servicesGone: true, railTop: 0, railPinned: true });
});

test('reduced motion lists the services without the sequence', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  const section = page.locator('#servicios');
  await expect(section).not.toHaveAttribute('data-services-enhanced');
  await expect(section).toHaveCSS('position', 'relative');
  await expect(section.locator('.services-progress')).toBeHidden();

  // Every service painted at once, untransformed, one under the other.
  expect(
    (await serviceOpacities(section)).map((service) => service.opacity),
  ).toEqual([1, 1, 1, 1]);
  const boxes = await section
    .locator('[data-service-entry]')
    .evaluateAll((nodes) =>
      nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return {
          x: Math.round(rect.x),
          top: rect.top,
          bottom: rect.bottom,
          transform: getComputedStyle(node).transform,
        };
      }),
    );
  expect(new Set(boxes.map((box) => box.x)).size).toBe(1);
  boxes.forEach((box, index) => {
    expect(box.transform).toBe('none');
    const previous = boxes[index - 1];
    if (previous) expect(box.top).toBeGreaterThanOrEqual(previous.bottom);
  });
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
    '/servicios/',
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
    '/servicios/',
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
    '/servicios/',
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

/** Where the one scene sits and which editorial block a reader can see. */
async function measureGoodbye(page: Page) {
  return page.locator('[data-goodbye]').evaluate((section) => {
    const box = (element: Element | null) => {
      const rect = element!.getBoundingClientRect();
      return {
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        bottom: Math.round(rect.bottom),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    };
    // Painted and opaque. Side A fades as a block; side B's copy fades line
    // by line, so its headline stands for it.
    const shown = (element: Element | null) => {
      const style = getComputedStyle(element!);
      return style.visibility === 'visible' && Number(style.opacity) > 0.5;
    };
    const startStop = section.querySelector('[data-goodbye-stop="start"]');
    const endStop = section.querySelector('[data-goodbye-stop="end"]');
    const image = section.querySelector<HTMLImageElement>(
      '[data-goodbye-scene] img',
    );
    return {
      image: image && {
        src: image.currentSrc,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      },
      viewport: box(section.querySelector('.goodbye-section__viewport')),
      startCopy: box(startStop),
      copy: box(section.querySelector('.goodbye-end__copy')),
      back: box(section.querySelector('[data-goodbye-travel="back"]')),
      viewportHeight: window.innerHeight,
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      at: (section as HTMLElement).dataset.goodbyeAt,
      scenes: section.querySelectorAll('[data-goodbye-scene]').length,
      section: box(section),
      scene: box(section.querySelector('[data-goodbye-scene]')),
      startShown: shown(startStop),
      endShown: shown(endStop!.querySelector('.goodbye-end__headline')),
      startInert: (startStop as HTMLElement).inert,
      endInert: (endStop as HTMLElement).inert,
    };
  });
}

test('the goodbye stage pans one panoramic scene from its left side to its right', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  const section = page.locator('[data-goodbye]');

  // Structural placeholders only, kept machine-detectable so
  // `check:production` keeps them out of `dist/`.
  await expect(section).toHaveAttribute('data-dev-placeholder');
  await expect(section).toHaveAttribute('data-goodbye-enhanced', 'true');
  // Not a carousel: one scene, one arrow per side, no counter.
  await expect(section.locator('[data-goodbye-scene]')).toHaveCount(1);
  await expect(section.locator('[data-goodbye-travel]')).toHaveCount(2);
  await expect(section.getByText(/\b\d+\s*\/\s*\d+\b/)).toHaveCount(0);
  await expect(section).toHaveCSS('overflow', 'hidden');

  await scrollGoodbyeToTop(page);
  const start = await measureGoodbye(page);
  expect(start.overflow).toBeLessThanOrEqual(1);
  if (testInfo.project.name === 'fine-1440') {
    expect(start.section.height).toBe(start.viewportHeight);
  } else {
    expect(start.section.height).toBeGreaterThanOrEqual(start.viewportHeight);
  }

  // Side A: one photograph, far wider than the screen, showing its left side,
  // under the first block.
  expect(start.at).toBe('start');
  expect(start.image?.src).toMatch(/goodbye-panorama\.webp$/);
  expect(start.image?.naturalWidth).toBe(2048);
  expect(start.scene.width).toBeGreaterThanOrEqual(start.section.width * 1.3);
  expect(start.scene.left).toBe(start.section.left);
  expect([start.startShown, start.endShown]).toEqual([true, false]);
  expect([start.startInert, start.endInert]).toEqual([false, true]);

  /*
   * The copy lives in the photograph's black fields, never on the orange
   * piece: measured on the photograph, it is black left of 29% of its width,
   * and right of 66% above 70% of its height. On the wide layout the scene is
   * the photograph, cropped at most vertically.
   */
  const wide = testInfo.project.name === 'fine-1440';
  const ratio = 2048 / 768;
  const photoX = (state: typeof start, x: number) =>
    (x - state.scene.left) / state.scene.width;
  const photoY = (state: typeof start, y: number) => {
    const drawn = state.scene.width / ratio;
    return (y - (state.scene.top + (state.scene.height - drawn) / 2)) / drawn;
  };
  if (wide) {
    expect(photoX(start, start.startCopy.right)).toBeLessThanOrEqual(0.29);
  } else {
    // Portrait: the photograph is a band and the copy lives below it.
    expect(start.startCopy.top).toBeGreaterThanOrEqual(start.viewport.bottom);
  }

  // Nothing moves on its own.
  await page.waitForTimeout(1200);
  expect((await measureGoodbye(page)).scene.left).toBe(start.scene.left);

  const next = section.locator('[data-goodbye-travel="next"]');
  await expect(next).toHaveAccessibleName('Siguiente');

  /*
   * The travel, sampled in the page on every frame from before the click, so
   * a slow machine can never skip past the middle: one scene, one size, and
   * frames part of the way across.
   */
  const sampling = section.evaluate(
    (element) =>
      new Promise<
        { left: number; right: number; size: string; scenes: number }[]
      >((resolve) => {
        const frames: {
          left: number;
          right: number;
          size: string;
          scenes: number;
        }[] = [];
        const started = performance.now();
        const tick = () => {
          const scenes = element.querySelectorAll('[data-goodbye-scene]');
          const rect = scenes[0]!.getBoundingClientRect();
          frames.push({
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            size: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
            scenes: scenes.length,
          });
          if (performance.now() - started < 1600) requestAnimationFrame(tick);
          else resolve(frames);
        };
        requestAnimationFrame(tick);
      }),
  );
  await next.click();
  const frames = await sampling;
  expect(new Set(frames.map((frame) => frame.size))).toEqual(
    new Set([`${start.scene.width}x${start.scene.height}`]),
  );
  expect(frames.every((frame) => frame.scenes === 1)).toBe(true);
  expect(
    frames.some(
      (frame) =>
        frame.left < start.scene.left - 20 &&
        frame.right > start.section.right + 20,
    ),
  ).toBe(true);

  // Side B: the same photograph's right side, flush with the screen's right
  // edge. The back button lands just after the scene, and the stage settles
  // (the side left behind turns inert) only then, so wait for both.
  await expect
    .poll(async () => {
      const state = await measureGoodbye(page);
      return (
        Math.abs(state.scene.right - state.section.right) <= 1 &&
        state.startInert
      );
    })
    .toBe(true);
  const end = await measureGoodbye(page);
  expect(end.at).toBe('end');
  expect(end.image?.src).toBe(start.image?.src);
  expect(end.scene.width).toBe(start.scene.width);
  expect(end.section).toEqual(start.section);
  expect([end.startShown, end.endShown]).toEqual([false, true]);
  expect([end.startInert, end.endInert]).toEqual([true, false]);
  if (wide) {
    // The CTA in the right black field, the back button in the corner that
    // is black at every height (past 76%).
    expect(photoX(end, end.copy.left)).toBeGreaterThanOrEqual(0.66);
    expect(photoY(end, end.copy.bottom)).toBeLessThanOrEqual(0.7);
    expect(photoX(end, end.back.left)).toBeGreaterThanOrEqual(0.76);
  } else {
    expect(end.copy.top).toBeGreaterThanOrEqual(end.viewport.bottom);
  }
  // The back button is whole, never cut by the stage.
  expect(end.back.left).toBeGreaterThanOrEqual(end.section.left);
  expect(end.back.right).toBeLessThanOrEqual(end.section.right);
  expect(end.back.top).toBeGreaterThanOrEqual(end.section.top);
  expect(end.back.bottom).toBeLessThanOrEqual(end.section.bottom);

  // The headline is the route to Contacto.
  const cta = section.getByRole('link', {
    name: /Nosotros sabemos dónde apretar/,
  });
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute('href', '/contacto/');

  // Focus followed the reader to the back button.
  const back = section.locator('[data-goodbye-travel="back"]');
  await expect(back).toHaveAccessibleName('Volver a la vista anterior');
  await expect(back).toBeFocused();

  if (testInfo.project.name.startsWith('touch')) {
    // Dragging to the right brings the left side back, like the back arrow.
    await section.evaluate((element) => {
      const at = (clientX: number) => ({
        pointerType: 'touch',
        isPrimary: true,
        clientX,
        clientY: 300,
        bubbles: true,
      });
      element.dispatchEvent(new PointerEvent('pointerdown', at(120)));
      element.dispatchEvent(new PointerEvent('pointerup', at(260)));
    });
  } else {
    await page.keyboard.press('Enter');
  }

  // Home again: the same scene travelled back to its left side.
  await expect
    .poll(async () => (await measureGoodbye(page)).scene.left)
    .toBe(start.scene.left);
  const home = await measureGoodbye(page);
  expect(home.at).toBe('start');
  expect([home.startShown, home.endShown]).toEqual([true, false]);
  expect(home.image?.src).toBe(start.image?.src);
});

test('the goodbye stage jumps between sides without travel under reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await scrollGoodbyeToTop(page);

  await page.locator('[data-goodbye-travel="next"]').click();
  // `reduced-motion.css` gives every property a 0.01ms transition, so even an
  // instant change lands on the next frame. Two frames, not the 1.1s travel.
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  const state = await measureGoodbye(page);
  expect(state.at).toBe('end');
  expect(Math.abs(state.scene.right - state.section.right)).toBeLessThanOrEqual(
    1,
  );
  expect([state.startShown, state.endShown], JSON.stringify(state)).toEqual([
    false,
    true,
  ]);
  // Focus waits for the jump to land, then moves to the back button.
  await expect(page.locator('[data-goodbye-travel="back"]')).toBeFocused();
});

/**
 * A reveal band (the incoming layer's clipped top strip, rounded corners and
 * side strips) may only show the section right before it or the page. The
 * services ink used to show between the rail and Studio, and Studio through the
 * top of Contacto, because both stayed stuck behind everything after them.
 */
test('no older stack layer shows through a reveal band', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/');
  await expect(page.locator('[data-horizontal-projects]')).toHaveAttribute(
    'data-horizontal-enhanced',
    'true',
  );

  // The band is 7% of the screen, not of the layer: the manifesto is several
  // screens tall and a 7% inset of its own height cut its first word.
  const viewportHeight = page.viewportSize()?.height ?? 0;
  const band = await page
    .locator('#manifiesto')
    .evaluate((element) =>
      Number(/^inset\(([\d.]+)px/.exec(element.style.clipPath)?.[1]),
    );
  expect(band).toBeGreaterThan(0);
  expect(band).toBeLessThanOrEqual(Math.ceil(viewportHeight * 0.07));

  const scrollTo = (selector: string, fraction: number) =>
    page.locator(selector).evaluate((element, share) => {
      window.scrollTo({
        top:
          element.getBoundingClientRect().top +
          window.scrollY -
          window.innerHeight * share,
        behavior: 'instant',
      });
    }, fraction);

  for (const selector of ['#studio', '#contacto']) {
    for (const fraction of [0.85, 0.6, 0.4]) {
      await scrollTo(selector, fraction);
      await page.waitForTimeout(900);
      const leaks = await page.locator(selector).evaluate((incoming) => {
        const layers = [...document.querySelector('main')!.children];
        const layerOf = (element: Element | null) =>
          layers.find((layer) => element && layer.contains(element));
        const own = layerOf(incoming)!;
        const allowed = new Set([own, own.previousElementSibling]);
        const top = incoming.getBoundingClientRect().top;
        const found: string[] = [];
        for (const y of [0.5, 2, 0.02, 0.04, 0.065].map((offset) =>
          offset < 1 && offset > 0.01
            ? top + window.innerHeight * offset
            : top + offset,
        )) {
          for (const x of [3, 18, 40, window.innerWidth / 2]) {
            const layer = layerOf(document.elementFromPoint(x, y));
            if (layer && !allowed.has(layer)) {
              const shown =
                layer.classList.contains('pin-spacer') &&
                layer.firstElementChild
                  ? layer.firstElementChild
                  : layer;
              found.push(`${shown.id || shown.className} at ${x},${y - top}`);
            }
          }
        }
        return found;
      });
      expect(leaks, `${selector} entering at ${fraction}`).toEqual([]);
    }
  }

  // Scrolling back re-sticks a released layer before it can be seen. The rail
  // is measured by its pin spacer: past the pin the section itself sits at the
  // spacer's far end.
  await scrollTo('.pin-spacer:has(#proyectos)', 0.5);
  await page.waitForTimeout(900);
  // Services is no longer a sticky layer at all: its own stage holds the
  // screen inside its track and ordinary scroll releases it, so there is
  // nothing to release or re-stick.
  const services = page.locator('#servicios');
  await expect(services).not.toHaveAttribute('data-stack-released');
  await expect(services).toHaveCSS('position', 'relative');
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the goodbye stage rests on its left side and lists both blocks under the photograph', async ({
    page,
  }) => {
    await page.goto('/');
    const section = page.locator('[data-goodbye]');
    await expect(section.locator('[data-goodbye-travel]')).toHaveCount(2);
    await expect(section.locator('[data-goodbye-travel]').first()).toBeHidden();
    await expect(section.locator('[data-goodbye-travel]').last()).toBeHidden();
    const titles = section.locator(
      '.goodbye-start__title, .goodbye-end__title',
    );
    await expect(titles).toHaveCount(2);
    await expect(
      section.getByRole('link', { name: /Nosotros sabemos dónde apretar/ }),
    ).toHaveAttribute('href', '/contacto/');
    for (let position = 0; position < 2; position += 1) {
      await titles.nth(position).scrollIntoViewIfNeeded();
      await expect(titles.nth(position)).toBeVisible();
    }
    const offset = await section.evaluate(
      (element) =>
        element.querySelector('[data-goodbye-scene]')!.getBoundingClientRect()
          .left - element.getBoundingClientRect().left,
    );
    expect(Math.round(offset)).toBe(0);
  });
});

/** Lands on the contact close and waits for its entrance to settle. */
async function settleOnContact(page: Page) {
  await page.goto('/#contacto');
  const section = page.locator('#contacto');
  await expect(section).toHaveAttribute('data-bite-enhanced', 'true');
  await section.evaluate((element) =>
    element.scrollIntoView({ block: 'start', behavior: 'instant' }),
  );
  await page.waitForTimeout(2600);
  return section;
}

const readSculpture = (section: Locator) =>
  section.evaluate((element) => ({
    press: parseFloat(element.style.getPropertyValue('--press') || '0'),
    leanX: parseFloat(element.style.getPropertyValue('--lean-x') || '0'),
    outline: element
      .querySelector('[data-sculpture="body"]')!
      .getAttribute('d'),
    word: element
      .querySelector('.contact-bite__line--bite .contact-bite__word')!
      .getBoundingClientRect().x,
  }));

test('the contact close centres the headline on the sculpture, with two bite buttons', async ({
  page,
}, testInfo) => {
  const section = await settleOnContact(page);

  await expect(
    page.getByRole('heading', { level: 2, name: 'Haz que tu marca muerda' }),
  ).toBeVisible();
  await expect(section.locator('.contact-bite__kicker')).toHaveCount(0);
  const mail = section.getByRole('link', { name: 'Correo', exact: true });
  const instagram = section.getByRole('link', {
    name: 'Instagram',
    exact: true,
  });
  await expect(mail).toHaveAttribute('href', 'mailto:hola@colmillostudio.com');
  await expect(instagram).toHaveAttribute(
    'href',
    'https://www.instagram.com/colmillo.studio/',
  );
  await expect(mail).toHaveClass(/bite-button/);
  await expect(instagram).toHaveClass(/bite-button/);
  await expect(
    section.getByRole('link', { name: 'Contacto', exact: true }),
  ).toHaveAttribute('href', '/contacto/');

  const layout = await section.evaluate((element) => {
    const box = (node: Element) => node.getBoundingClientRect();
    const hit = (a: DOMRect, b: DOMRect) =>
      a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top;
    const look = (node: Element) => {
      const style = getComputedStyle(node);
      return [
        style.borderRadius,
        style.boxShadow,
        style.backgroundColor,
        style.borderTopWidth,
        style.borderTopColor,
      ].join(' | ');
    };
    const title = box(element.querySelector('.contact-bite__title')!);
    const form = box(element.querySelector('.contact-bite__form > use')!);
    const words = [
      ...element.querySelectorAll('.contact-bite__title .contact-bite__word'),
    ].map(box);
    const buttons = [...element.querySelectorAll('.contact-bite__button')];
    const buttonBoxes = buttons.map(box);
    return {
      height: box(element).height,
      viewport: window.innerHeight,
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      collides: [...words, ...buttonBoxes].some((rect) => hit(rect, form)),
      sameLine: Math.abs(buttonBoxes[0]!.top - buttonBoxes[1]!.top) < 2,
      underTitle: buttonBoxes[0]!.top > title.bottom,
      // The buttons start where "muerda" starts.
      offMuerda: Math.abs(
        buttonBoxes[0]!.left -
          box(
            element.querySelector(
              '.contact-bite__line--bite .contact-bite__word',
            )!,
          ).left,
      ),
      // The headline and the sculpture share one vertical centre.
      centreDelta: title.top + title.height / 2 - (form.top + form.height / 2),
      // The link's own box stays clear of the fixed edge rail.
      pieceInside:
        box(element.querySelector('[data-bite-piece]')!).right <=
        box(element.querySelector('[data-bite-stage]')!).right + 1,
      // The channel buttons are the hero's button, not a lookalike.
      sameAsHero: buttons.every(
        (button) =>
          look(button) === look(document.querySelector('.hero__cta')!),
      ),
      transforms: [
        element.querySelector('.contact-bite__title')!,
        ...buttons,
      ].map((node) => getComputedStyle(node).textTransform),
      shown: [
        ...element.querySelectorAll(
          '[data-bite-line], [data-bite-row], [data-bite-piece]',
        ),
      ].every((node) => getComputedStyle(node).opacity === '1'),
    };
  });
  expect(layout.height).toBeGreaterThanOrEqual(layout.viewport - 1);
  expect(layout.overflow).toBeLessThanOrEqual(0);
  expect(layout.collides).toBe(false);
  expect(layout.sameLine).toBe(true);
  expect(layout.underTitle).toBe(true);
  expect(layout.offMuerda).toBeLessThanOrEqual(2);
  expect(layout.pieceInside).toBe(true);
  expect(layout.sameAsHero).toBe(true);
  expect(new Set(layout.transforms)).toEqual(new Set(['none']));
  expect(layout.shown).toBe(true);
  if (testInfo.project.name === 'fine-1440') {
    expect(Math.abs(layout.centreDelta)).toBeLessThanOrEqual(12);
  }
});

test('the contact sculpture follows, dents, presses "muerda" and bites', async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'fine-1440',
    'The follow, the pressure and the bite need a fine pointer.',
  );
  const section = await settleOnContact(page);
  const form = (await page
    .locator('.contact-bite__form > use')
    .first()
    .boundingBox())!;
  const away = { x: form.x + form.width / 2, y: form.y + form.height + 160 };

  await page.mouse.move(away.x, away.y, { steps: 2 });
  await page.waitForTimeout(1300);
  const rest = await readSculpture(section);

  // Come in from far left, level with the bite, so the path never crosses the
  // piece; just outside the bite it answers with inertia.
  const level = form.y + form.height * 0.55;
  await page.mouse.move(form.x - form.width * 0.95, level, { steps: 4 });
  await page.waitForTimeout(1300);
  await page.mouse.move(form.x - 40, level, { steps: 10 });
  await page.waitForTimeout(250);
  const early = await readSculpture(section);
  await page.waitForTimeout(1400);
  const pressed = await readSculpture(section);
  expect(pressed.outline).not.toBe(rest.outline);
  expect(pressed.press).toBeGreaterThan(early.press);
  expect(Math.abs(pressed.leanX)).toBeLessThanOrEqual(18.5);
  // "muerda" gives way 1-3px under the same pressure.
  const shift = rest.word - pressed.word;
  expect(shift).toBeGreaterThan(0.5);
  expect(shift).toBeLessThanOrEqual(3.5);

  // Touching the piece bites once and lets go well inside a second.
  await page.mouse.move(
    form.x + form.width * 0.55,
    form.y + form.height * 0.45,
    { steps: 4 },
  );
  await expect(section).toHaveAttribute('data-biting', 'true');
  await expect(section).not.toHaveAttribute('data-biting', /.*/, {
    timeout: 1500,
  });

  // Away from it, it settles back into exactly its resting shape.
  await page.mouse.move(away.x, away.y, { steps: 4 });
  await expect
    .poll(async () => (await readSculpture(section)).outline, {
      timeout: 3000,
    })
    .toBe(rest.outline);

  // The white around the piece is never part of the button.
  const piece = section.locator('[data-bite-piece]');
  const pieceBox = (await piece.boundingBox())!;
  const corner = await page.evaluate(
    ([x, y]) =>
      document.elementFromPoint(x!, y!)?.closest('a')?.getAttribute('href') ??
      null,
    [pieceBox.x + 6, pieceBox.y + 6],
  );
  expect(corner).toBeNull();

  // The piece itself is a button: hovering presses it onto its ink shadow
  // and names it, and a click opens Contacto.
  const target = {
    x: form.x + form.width * 0.62,
    y: form.y + form.height * 0.5,
  };
  await page.mouse.move(target.x, target.y, { steps: 4 });
  await expect(piece.locator('.contact-bite__form')).toHaveCSS(
    'cursor',
    'pointer',
  );
  // The cursor takes the hero CTA's "Contacto" disc over the piece, so the
  // note set into it stays for keyboard focus and touch only.
  const cursor = page.locator('[data-custom-cursor]');
  await expect(cursor).toHaveAttribute('data-labelled', 'true');
  await expect(cursor.locator('[data-cursor-text]')).toHaveText('Contacto');
  await expect(piece.locator('.contact-bite__hint')).toHaveCSS('opacity', '0');
  await expect(piece.locator('.contact-bite__offset')).toHaveCSS(
    'opacity',
    '1',
  );
  await expect(piece.locator('.contact-bite__form')).not.toHaveCSS(
    'transform',
    'none',
  );
  await page.mouse.click(target.x, target.y);
  await expect(page).toHaveURL(/\/contacto\/$/);
});

test('reduced motion keeps the contact composition complete and still', async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const section = await settleOnContact(page);

  const shown = await section.evaluate((element) =>
    [
      ...element.querySelectorAll(
        '[data-bite-line], [data-bite-row], [data-bite-piece]',
      ),
    ].every((node) => getComputedStyle(node).opacity === '1'),
  );
  expect(shown).toBe(true);

  if (testInfo.project.name === 'fine-1440') {
    const rest = await readSculpture(section);
    const form = (await page
      .locator('.contact-bite__form > use')
      .first()
      .boundingBox())!;
    await page.mouse.move(form.x - 40, form.y + form.height * 0.55, {
      steps: 6,
    });
    await page.waitForTimeout(1200);
    const after = await readSculpture(section);
    expect(after.outline).toBe(rest.outline);
    expect(after.press).toBe(0);
    expect(after.word).toBe(rest.word);
  }
});
