import { expect, test, type Page } from '@playwright/test';

/*
 * /proyectos/[slug]/ in the demo build (`dist-demo`).
 *
 * The point of the system is that one skeleton produces pages that do not look
 * alike, so most of this spec is comparative: the same components, two
 * palettes, two rhythms, two selections of modules. The standard build has no
 * project routes at all while nothing is approved, which `foundations.spec.ts`
 * already guards with a 404.
 */

const LIGHT = '/proyectos/demo-fauce-elastica/';
const DARK = '/proyectos/demo-rastro-naranja/';
/** `#f7f3ec` and `#121417`, the two demonstration themes. */
const PAPER = 'rgb(247, 243, 236)';
const CHARCOAL = 'rgb(18, 20, 23)';

async function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

test('a case study opens on the project, not on the studio', async ({
  page,
}) => {
  const errors = await collectErrors(page);
  await page.goto(LIGHT);

  // The project's name is the page's only h1, and it is real text.
  const title = page.getByRole('heading', { level: 1, name: 'Fauce Elástica' });
  await expect(title).toBeVisible();
  await expect(page.locator('main h1')).toHaveCount(1);

  // The first screen is the project's own media, at the size of the screen.
  const hero = page.locator('[data-cs-hero]');
  await expect(hero).toHaveAttribute('data-variant', 'full');
  const size = await hero.evaluate((element) => ({
    height: element.getBoundingClientRect().height,
    viewport: window.innerHeight,
  }));
  expect(size.height).toBeGreaterThanOrEqual(size.viewport - 1);

  // Provisional content is unmistakable.
  await expect(page.locator('.cs-flag')).toHaveText(
    'DEMO FICTICIA — NO PUBLICAR',
  );

  expect(errors).toEqual([]);
});

test('the theme comes from the project and carries the global chrome', async ({
  page,
}) => {
  await page.goto(LIGHT);
  await expect(page.locator('[data-case-study]')).toHaveCSS(
    'background-color',
    PAPER,
  );
  // The canvas behind the page follows it, so an overscroll shows the project.
  await expect(page.locator('html')).toHaveCSS('background-color', PAPER);
  await expect(page.locator('[data-site-logo]')).toHaveAttribute(
    'data-theme',
    'light',
  );

  await page.goto(DARK);
  await expect(page.locator('[data-case-study]')).toHaveCSS(
    'background-color',
    CHARCOAL,
  );
  await expect(page.locator('html')).toHaveCSS('background-color', CHARCOAL);
  // A dark project gets the cream wordmark, without a rule written per route.
  await expect(page.locator('[data-site-logo]')).toHaveAttribute(
    'data-theme',
    'dark',
  );
  await expect(page.locator('[data-site-logo] img')).toHaveAttribute(
    'src',
    '/assets/brand/colmillo-wordmark-cream.png',
  );
});

test('two projects share the components and not the composition', async ({
  page,
}) => {
  await page.goto(LIGHT);
  const light = await page
    .locator('[data-cs-module]')
    .evaluateAll((nodes) =>
      nodes.map((node) => (node as HTMLElement).dataset.csModule),
    );

  await page.goto(DARK);
  const dark = await page
    .locator('[data-cs-module]')
    .evaluateAll((nodes) =>
      nodes.map((node) => (node as HTMLElement).dataset.csModule),
    );

  // Both are built from the same registry, in a different order and selection.
  expect(light).toEqual([
    'text',
    'fullMedia',
    'split',
    'palette',
    'statement',
    'type',
    'twoUp',
    'gallery',
  ]);
  expect(dark).toEqual([
    'text',
    'sticky',
    'fullMedia',
    'process',
    'statement',
    'facts',
  ]);
  expect(light).not.toEqual(dark);

  // And the layout variant differs, so the air between them differs too.
  await expect(page.locator('[data-case-study]')).toHaveAttribute(
    'data-layout',
    'immersion',
  );
});

test('the metadata is a real description list and invents nothing', async ({
  page,
}) => {
  await page.goto(LIGHT);
  const terms = await page.locator('.cs-meta__term').allTextContents();
  // Only the fields the project actually supplies: no empty row, no dash.
  expect(terms).toEqual(['Servicios', 'Cliente', 'Año', 'Entregables']);
  await expect(page.locator('.cs-meta__value').first()).not.toBeEmpty();

  // A fallback study has no client and no deliverables, so neither is offered.
  await page.goto('/proyectos/demo-umbral/');
  const fallback = await page.locator('.cs-meta__term').allTextContents();
  expect(fallback).not.toContain('Cliente');
  expect(fallback).toContain('Año');
});

test('a project with no authored study still publishes a whole page', async ({
  page,
}) => {
  const errors = await collectErrors(page);
  await page.goto('/proyectos/demo-volumen/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Volumen' }),
  ).toBeVisible();
  // Hero from its cover, introduction from its own text, gallery as modules.
  await expect(page.locator('[data-cs-hero]')).toHaveCount(1);
  await expect(page.locator('.cs-intro__text').first()).not.toBeEmpty();
  await expect(page.locator('[data-cs-module]')).not.toHaveCount(0);
  await expect(page.locator('[data-cs-next]')).toHaveCount(1);

  expect(errors).toEqual([]);
});

test('the index appears only where a project asked for it', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');

  await page.goto(DARK);
  const nav = page.locator('[data-cs-chapters]');
  await expect(nav).toBeVisible();
  const links = nav.getByRole('link');
  await expect(links).toHaveCount(4);

  // They are real anchors at real sections.
  for (const link of await links.all()) {
    const href = await link.getAttribute('href');
    expect(href).toMatch(/^#[a-z-]+$/);
    await expect(page.locator(`${href}`)).toHaveCount(1);
  }

  // A short project offers none, whatever the screen.
  await page.goto(LIGHT);
  await expect(page.locator('[data-cs-chapters]')).toHaveCount(0);
});

test('the next project is one stage and both routes out are real', async ({
  page,
}) => {
  await page.goto(LIGHT);

  const next = page.getByRole('link', {
    name: /Siguiente proyecto.*Pulso Molar/,
  });
  await expect(next).toHaveAttribute('href', '/proyectos/demo-pulso-molar/');

  const archive = page.getByRole('link', { name: 'Todos los proyectos' });
  await expect(archive).toHaveAttribute('href', '/proyectos/');
  await expect(
    page.getByRole('link', { name: /Tienes algo entre manos/ }),
  ).toHaveAttribute('href', '/contacto/');

  await next.click();
  await expect(page).toHaveURL(/demo-pulso-molar/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Pulso Molar' }),
  ).toBeVisible();
});

test('the bite reveal is rationed and releases the picture', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto(LIGHT);

  // The signature is budgeted: never more than three on one page.
  const bites = page.locator('[data-cs-bite]');
  const count = await bites.count();
  expect(count).toBeGreaterThan(0);
  expect(count).toBeLessThanOrEqual(3);

  const surface = bites.first();
  const section = page.locator('[data-cs-module]').nth(1);

  // Approaching it, the surface is clipped by the wave.
  await section.evaluate((element) =>
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 700,
      behavior: 'instant',
    }),
  );
  await page.waitForTimeout(600);
  const clipped = await surface.evaluate((element) => element.style.clipPath);
  expect(clipped).toContain('path(');

  // Past it, the picture is whole again and its frame never moved.
  await section.evaluate((element) =>
    element.scrollIntoView({ block: 'center', behavior: 'instant' }),
  );
  await page.waitForTimeout(800);
  await expect(section.locator('.cs-media__frame').first()).toHaveCSS(
    'transform',
    'none',
  );
});

test('the sticky story holds on a wide screen and reads plainly on a phone', async ({
  page,
}, testInfo) => {
  await page.goto(DARK);
  const sticky = page.locator('[data-cs-sticky]');
  await expect(sticky).toHaveCount(1);
  await sticky.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  if (testInfo.project.name === 'fine-1440') {
    await expect(sticky).toHaveAttribute('data-enhanced', 'true');
    await expect(
      sticky.locator('[data-cs-figure][data-state="active"]'),
    ).toHaveCount(1);
  } else {
    // No held frame: every step keeps its own picture in the flow.
    await expect(sticky).not.toHaveAttribute('data-enhanced', 'true');
    await expect(sticky.locator('.cs-sticky__inline')).toHaveCount(3);
  }

  // The steps are always in the document, in reading order.
  await expect(sticky.locator('[data-cs-step]')).toHaveCount(3);
});

test('reduced motion keeps every module and switches the effects off', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(DARK);
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');

  await expect(page.locator('[data-cs-module]')).toHaveCount(6);
  for (const module of await page.locator('[data-cs-module]').all()) {
    await module.scrollIntoViewIfNeeded();
  }
  await page.waitForTimeout(400);

  // Nothing is left hidden behind a reveal, and no surface stays clipped.
  for (const media of await page.locator('.cs-media').all()) {
    await expect(media).toHaveCSS('opacity', '1');
  }
  expect(
    await page
      .locator('[data-cs-bite]')
      .first()
      .evaluate((element) => element.style.clipPath),
  ).toBe('');
  await expect(page.locator('[data-cs-sticky]')).not.toHaveAttribute(
    'data-enhanced',
    'true',
  );
});

test('without JavaScript the whole case study is there', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(LIGHT);

  await expect(
    page.getByRole('heading', { level: 1, name: 'Fauce Elástica' }),
  ).toBeVisible();
  await expect(page.locator('[data-cs-module]')).toHaveCount(8);
  await expect(page.locator('.cs-statement')).toBeVisible();
  await expect(page.locator('.cs-palette__field')).toHaveCount(4);

  // Both routes out still work.
  await page
    .getByRole('link', { name: /Siguiente proyecto.*Pulso Molar/ })
    .click();
  await expect(page).toHaveURL(/demo-pulso-molar/);
  await context.close();
});

test('a case study fits every tested viewport without sideways scroll', async ({
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
    [430, 932],
    [390, 844],
    [320, 720],
  ] as const) {
    await page.setViewportSize({ width, height });
    for (const route of [LIGHT, DARK]) {
      await page.goto(route);
      await page.waitForTimeout(250);

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
      const label = `${route} ${width}x${height}`;
      expect(layout.overflow, label).toBeLessThanOrEqual(1);
      expect(layout.left, label).toBeGreaterThanOrEqual(0);
      expect(layout.right, label).toBeLessThanOrEqual(width);
    }
  }
});
