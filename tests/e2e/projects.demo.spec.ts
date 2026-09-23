import { expect, test, type Page } from '@playwright/test';

/*
 * /proyectos/ in the demo build (`dist-demo`), where the provisional pieces
 * are rendered and the archive can be read as a whole. The standard build is
 * covered by `projects.spec.ts`.
 */

const CREAM = 'rgb(252, 238, 218)';
const INK = 'rgb(18, 16, 15)';

async function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

const visibleItems = (page: Page) =>
  page.locator('[data-project-item]:not([hidden])');

async function openGallery(page: Page) {
  await page.locator('.projects-gallery').evaluate((gallery) =>
    window.scrollTo({
      top: gallery.getBoundingClientRect().top + window.scrollY,
      behavior: 'instant',
    }),
  );
  await page.waitForTimeout(400);
}

test('the archive opens like the other editorial routes and ends on one door', async ({
  page,
}) => {
  const errors = await collectErrors(page);
  await page.goto('/proyectos/');

  // Hero: the route's title on a cream first screen, with the orange stop.
  const title = page.getByRole('heading', { level: 1, name: 'Proyectos' });
  await expect(title).toBeVisible();
  await expect(page.locator('.projects-hero')).toHaveCSS(
    'background-color',
    CREAM,
  );
  // The hero and the gallery are one sheet: no seam, no rounded lift.
  await expect(page.locator('.projects-hero')).toHaveCSS(
    'color',
    'rgb(18, 16, 15)',
  );
  await expect(page.locator('.projects-hero__dot')).toHaveCount(1);
  // The title holds its line: the orange stop never wraps below the word.
  const lines = await page
    .locator('[data-projects-hero-title]')
    .evaluate((word) => word.getClientRects().length);
  expect(lines).toBe(1);

  // The slot for the loop is there at its final size, with no visible note.
  const frame = page.locator('.projects-hero__frame');
  await expect(frame).toHaveCount(1);
  await expect(frame).toHaveText('');

  // Nothing of the old archive survives.
  await expect(page.locator('body')).not.toContainText('Archivo');
  await expect(page.getByText('DEMO FICTICIA — NO PUBLICAR')).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText('2099');
  await expect(page.locator('.project-card')).toHaveCount(0);

  /*
   * The archive and the footer are the page's cream; the close is the route's
   * one change of surface since 2026-09-23, and it is white. The hero and the
   * archive are still one sheet with no seam between them.
   */
  for (const selector of [
    '.projects-hero',
    '.projects-gallery',
    '.site-footer',
  ]) {
    await expect(page.locator(selector), selector).toHaveCSS(
      'background-color',
      CREAM,
    );
  }
  await expect(page.locator('.projects-close')).toHaveCSS(
    'background-color',
    'rgb(255, 255, 255)',
  );
  await expect(page.locator('.projects-close')).toHaveCSS('color', INK);
  await expect(
    page.getByRole('link', { name: 'Hablemos', exact: true }),
  ).toHaveAttribute('href', '/contacto/');

  expect(errors).toEqual([]);
});

test('the closing scene frames its copy and never pushes the page sideways', async ({
  page,
}) => {
  await page.goto('/proyectos/');
  await page.locator('.projects-close').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const scene = await page.evaluate(() => {
    const box = (selector: string) => {
      const rect = document.querySelector(selector)?.getBoundingClientRect();
      return rect
        ? {
            left: rect.left,
            right: rect.right,
            width: rect.width,
            top: rect.top,
            bottom: rect.bottom,
          }
        : null;
    };
    return {
      close: box('.projects-close'),
      inner: box('.projects-close__inner'),
      start: box('.projects-close__wing--start'),
      end: box('.projects-close__wing--end'),
      height:
        document.querySelector('.projects-close')?.getBoundingClientRect()
          .height ?? 0,
      viewport: document.documentElement.clientWidth,
      viewportHeight: window.innerHeight,
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    };
  });

  const { close, inner, start, end } = scene;
  if (!close || !inner || !start || !end) {
    throw new Error('The close is missing its scene or its copy.');
  }

  // One wing per side, anchored to its own edge, and the two never overlap.
  // How they clear each other depends on the layout: side by side on
  // landscape screens, and as a band at the top and one at the foot on
  // portrait ones, where a band is allowed to be wider than half the screen
  // because it never shares a row with the other.
  const centre = scene.viewport / 2;
  expect(Math.round(start.left)).toBe(0);
  expect(Math.round(end.right)).toBe(Math.round(scene.viewport));
  const sideBySide = start.right <= end.left + 1;
  const banded = start.bottom <= end.top + 1 || end.bottom <= start.top + 1;
  expect(sideBySide || banded).toBe(true);
  // Both are pushed out by the same amount, so the composition stays centred.
  expect(Math.abs(start.width - end.width)).toBeLessThanOrEqual(1);

  // The copy is centred on the screen. Its box deliberately overlaps the
  // wings' boxes — those are mostly the picture's empty paper, and what has
  // to clear the copy is the ink, which is measured on the rendered pixels
  // rather than here (see `docs/EXECUTION_STATE.md`, 2026-09-16).
  expect(Math.abs((inner.left + inner.right) / 2 - centre)).toBeLessThanOrEqual(
    2,
  );

  // A whole screen, and no sideways scroll.
  expect(scene.height).toBeGreaterThanOrEqual(scene.viewportHeight - 2);
  expect(scene.overflow).toBeLessThanOrEqual(1);
});

test('the close rises over the archive as a layer of the route stack', async ({
  page,
}) => {
  await page.goto('/proyectos/');

  /*
   * Three layers since 2026-09-23: the hero, the archive and the close. The
   * archive had to join them — it is the section the close rises over, and a
   * layer can only be risen over if it holds.
   */
  await expect(page.locator('[data-stack-section]')).toHaveCount(3);
  for (const selector of [
    '.projects-hero',
    '.projects-gallery',
    '.projects-close',
  ]) {
    await expect(page.locator(selector), selector).toHaveAttribute(
      'data-stack-ready',
      'true',
    );
  }

  // The hero and the archive stack flush: they are one sheet and must not
  // open a band between them. Only the close does.
  await expect(page.locator('.projects-hero')).toHaveAttribute(
    'data-stack-flush',
    '',
  );
  await expect(page.locator('.projects-gallery')).toHaveAttribute(
    'data-stack-flush',
    '',
  );
  await expect(page.locator('.projects-close')).not.toHaveAttribute(
    'data-stack-flush',
    '',
  );

  const close = page.locator('.projects-close');

  // Parked inside the stack's window ('top 92%' to 'top 38%') the close is
  // opening: a rounded band with the picture clipped inside it.
  await page.evaluate(() => {
    const section = document.querySelector('.projects-close');
    if (!section) throw new Error('The close is missing.');
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top - window.innerHeight * 0.72,
      behavior: 'instant',
    });
  });
  await page.waitForTimeout(1100);
  const opening = await close.evaluate((section) => {
    const style = getComputedStyle(section);
    return {
      radius: Number.parseFloat(style.borderTopLeftRadius),
      clip: style.clipPath,
    };
  });
  expect(opening.radius).toBeGreaterThan(8);
  expect(opening.clip).not.toBe('none');

  // Settled, it is flush and square again.
  await page.evaluate(() => {
    const section = document.querySelector('.projects-close');
    if (!section) throw new Error('The close is missing.');
    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY,
      behavior: 'instant',
    });
  });
  await page.waitForTimeout(1100);
  const settled = await close.evaluate((section) => ({
    radius: Number.parseFloat(getComputedStyle(section).borderTopLeftRadius),
    height: Math.round(section.getBoundingClientRect().height),
    viewport: window.innerHeight,
  }));
  expect(settled.radius).toBeLessThan(2);
  expect(settled.height).toBeGreaterThanOrEqual(settled.viewport - 2);
});

test('every piece is a real link with its name and categories in the page', async ({
  page,
}) => {
  await page.goto('/proyectos/');
  const items = page.locator('[data-project-item]');
  await expect(items).toHaveCount(10);

  for (const item of await items.all()) {
    const link = item.locator('a.projects-card');
    await expect(link).toHaveAttribute('href', /^\/proyectos\/[a-z0-9-]+\/$/);
    // The name never depends on hover: it is text in the document.
    await expect(link.locator('.projects-card__title')).not.toBeEmpty();
    const categories = await item.getAttribute('data-categories');
    expect(categories?.length).toBeGreaterThan(0);
  }
});

test('the masonry varies its shapes and spans instead of repeating one cell', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/proyectos/');
  await openGallery(page);

  const cells = await page.locator('[data-project-item]').evaluateAll((items) =>
    items.map((item) => {
      const box = item.getBoundingClientRect();
      return {
        format: (item as HTMLElement).dataset.format,
        width: Math.round(box.width),
        height: Math.round(box.height),
        top: Math.round(box.top),
      };
    }),
  );

  // Four directed formats, several widths and several heights: no catalogue.
  expect(new Set(cells.map((cell) => cell.format)).size).toBe(4);
  expect(new Set(cells.map((cell) => cell.width)).size).toBeGreaterThan(2);
  expect(new Set(cells.map((cell) => cell.height)).size).toBeGreaterThan(3);

  // Pieces sharing a row start at different heights.
  const rows = new Map<number, number[]>();
  for (const cell of cells) {
    const key = Math.round(cell.top / 400);
    rows.set(key, [...(rows.get(key) ?? []), cell.top]);
  }
  const stepped = [...rows.values()].some(
    (tops) => new Set(tops).size > 1 && tops.length > 1,
  );
  expect(stepped).toBe(true);
});

test('the category filter shows only its own pieces and can be undone', async ({
  page,
}) => {
  const errors = await collectErrors(page);
  await page.goto('/proyectos/');
  await openGallery(page);

  const filters = page.locator('[data-project-filter]');
  await expect(filters).toHaveCount(5);
  await expect(page.locator('[data-projects-page]')).toHaveAttribute(
    'data-filters-ready',
    'true',
  );

  for (const category of [
    'estrategia',
    'identidad',
    'digital',
    'contenido',
  ] as const) {
    await page.locator(`[data-project-filter="${category}"]`).click();
    await page.waitForTimeout(700);

    await expect(
      page.locator(`[data-project-filter="${category}"]`),
    ).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[aria-pressed="true"]')).toHaveCount(1);

    const shown = await visibleItems(page).count();
    expect(shown, category).toBeGreaterThan(0);
    const wrong = await visibleItems(page).evaluateAll(
      (items, wanted) =>
        items.filter(
          (item) =>
            !((item as HTMLElement).dataset.categories ?? '')
              .split(' ')
              .includes(wanted),
        ).length,
      category,
    );
    expect(wrong, category).toBe(0);

    // The page never grows sideways while the grid repacks.
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow, category).toBeLessThanOrEqual(1);
  }

  await page.locator('[data-project-filter="todos"]').click();
  await page.waitForTimeout(700);
  await expect(visibleItems(page)).toHaveCount(10);
  expect(errors).toEqual([]);
});

test('the filter stays in reach on wide screens and never covers the corner', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === 'touch-390');
  await page.goto('/proyectos/');

  // Deep into the gallery the band is stuck at the top of the screen.
  await page
    .locator('[data-project-item]')
    .nth(5)
    .evaluate((item) =>
      item.scrollIntoView({ block: 'start', behavior: 'instant' }),
    );
  await page.waitForTimeout(500);

  const band = page.locator('[data-projects-filters]');
  await expect(band).toHaveAttribute('data-stuck', 'true');
  const top = await band.evaluate((element) =>
    Math.round(element.getBoundingClientRect().top),
  );
  expect(top).toBe(0);

  // It never runs under the Instagram control or the edge menu's tab.
  const first = await page
    .locator('[data-project-filter]')
    .first()
    .boundingBox();
  for (const selector of ['[data-instagram]', '[data-edge-tab]']) {
    const box = await page.locator(selector).boundingBox();
    if (!box || !first) continue;
    const overlaps =
      first.x < box.x + box.width &&
      first.x + first.width > box.x &&
      first.y < box.y + box.height &&
      first.y + first.height > box.y;
    expect(overlaps, selector).toBe(false);
  }
});

test('touch screens keep every name and category open and the picture still', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === 'fine-1440');
  await page.goto('/proyectos/');
  await openGallery(page);

  const tags = page.locator('[data-project-item] .projects-card__tags');
  for (const tag of await tags.all()) {
    await expect(tag).toHaveCSS('opacity', '1');
  }
  await expect(
    page.locator('[data-project-item] .projects-card__frame').first(),
  ).toHaveCSS('transform', 'none');
});

test('a fine pointer dents the piece it presses and lets it go', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/proyectos/');
  await openGallery(page);

  const card = page.locator('[data-project-item] .projects-card').first();
  const surface = card.locator('[data-press-surface]');
  const box = await card.boundingBox();
  if (!box) throw new Error('The first piece has no box.');

  await page.mouse.move(box.x + box.width / 2, box.y + 8);
  await page.waitForTimeout(600);
  await expect(surface).not.toHaveCSS('clip-path', 'none');

  await page.mouse.move(box.x + box.width / 2, box.y + box.height + 320);
  await page.waitForTimeout(800);
  // The frame itself never moves, whatever the surface does.
  await expect(card.locator('.projects-card__frame')).toHaveCSS(
    'transform',
    'none',
  );
});

test('reduced motion keeps the whole archive and a working filter', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/proyectos/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await openGallery(page);

  await expect(visibleItems(page)).toHaveCount(10);
  for (const card of await page
    .locator('[data-project-item] .projects-card')
    .all()) {
    await expect(card).toHaveCSS('opacity', '1');
  }

  await page.locator('[data-project-filter="digital"]').click();
  await page.waitForTimeout(400);
  const shown = await visibleItems(page).count();
  expect(shown).toBeGreaterThan(0);
  expect(shown).toBeLessThan(10);
});

test('without JavaScript the archive is complete and offers no dead control', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/proyectos/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Proyectos' }),
  ).toBeVisible();
  await expect(page.locator('[data-project-item]')).toHaveCount(10);
  for (const card of await page
    .locator('[data-project-item] .projects-card')
    .all()) {
    await expect(card).toBeVisible();
  }
  // The filter cannot work, so it is not shown.
  await expect(page.locator('[data-projects-filters]')).toBeHidden();

  await page
    .getByRole('link', { name: /Fauce Elástica/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/proyectos\/demo-fauce-elastica\/$/);
  await context.close();
});

test('the archive fits every tested viewport without sideways scroll', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');

  for (const [width, height] of [
    [1920, 1080],
    [1600, 900],
    [1536, 864],
    [1440, 900],
    [1366, 768],
    [1024, 768],
    [390, 844],
    [320, 720],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('/proyectos/');
    await page.waitForTimeout(300);

    const layout = await page.evaluate(() => {
      const heading = document.querySelector<HTMLElement>('main h1');
      const box = heading?.getBoundingClientRect();
      return {
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        left: box?.left ?? 0,
        right: box?.right ?? 0,
      };
    });
    const label = `${width}x${height}`;
    expect(layout.overflow, label).toBeLessThanOrEqual(1);
    expect(layout.left, label).toBeGreaterThanOrEqual(0);
    expect(layout.right, label).toBeLessThanOrEqual(width);
  }
});
