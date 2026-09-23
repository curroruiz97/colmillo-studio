import { expect, test, type Page } from '@playwright/test';

/*
 * /proyectos/[slug]/ in the demo build (`dist-demo`).
 *
 * Since 2026-09-23 the route is one template and every project is read the
 * same way: the route's own header, the project's name, the client it was made
 * for, the three chapters as native disclosures, the way on to Contacto, and
 * the work in the column beside it. There is no hero, no module sequence and
 * no next-project stage.
 *
 * So this spec is no longer comparative. What it guards is that the template
 * is the same on a light project and a dark one, that the chapters fold and
 * read with no script at all, and that nothing invents content. The standard
 * build has no project routes at all while nothing is approved, which
 * `foundations.spec.ts` guards with a 404.
 */

const LIGHT = '/proyectos/demo-fauce-elastica/';
const DARK = '/proyectos/demo-rastro-naranja/';
/** `--color-brand-cream`: every project page stands on the site's own ground. */
const CREAM = 'rgb(252, 238, 218)';

async function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

/** The chapters a reader can actually read, in order. */
const openChapters = (page: Page) =>
  page.evaluate(() =>
    [...document.querySelectorAll<HTMLDetailsElement>('details.cs-chapter')]
      .filter((chapter) => chapter.open)
      .map((chapter) => chapter.id),
  );

/*
 * The requirement in one test: not "the template exists" but "every project is
 * it". Since 2026-09-23 all ten pieces of the archive are registered and all
 * ten go through the same factory, so this walks the lot and refuses any page
 * that differs in shape.
 */
const ARCHIVE = [
  'demo-fauce-elastica',
  'demo-pulso-molar',
  'demo-rastro-naranja',
  'demo-muesca-doble',
  'demo-capas-en-tension',
  'demo-materia',
  'demo-umbral',
  'demo-volumen',
  'demo-ritmo',
  'demo-fragmento',
];

test('the route carries its own header: the archive, the mark, Instagram', async ({
  page,
}) => {
  const errors = await collectErrors(page);
  await page.goto(LIGHT);

  const header = page.locator('[data-cs-header]');
  await expect(header).toBeVisible();

  // Left: the way back to the archive.
  const back = header.locator('.cs-header__back');
  await expect(back).toHaveText('Proyectos');
  await expect(back).toHaveAttribute('href', '/proyectos/');

  // Centre: the wordmark, and it is the page's only one — the global corner
  // mark is switched off on this route so the two never both appear.
  await expect(page.locator('[data-site-logo]')).toHaveCount(0);
  const mark = header.locator('.cs-header__logo');
  await expect(mark).toHaveAttribute('href', '/');
  const centred = await page.evaluate(() => {
    const box = document
      .querySelector('.cs-header__logo')!
      .getBoundingClientRect();
    return Math.abs(box.left + box.width / 2 - window.innerWidth / 2);
  });
  expect(centred).toBeLessThan(2);

  // Right: the global control, unchanged, and inside the band rather than
  // hanging out of it.
  const contained = await page.evaluate(() => {
    const badge = document.querySelector('.ig-badge')!.getBoundingClientRect();
    const band = document
      .querySelector('[data-cs-header]')!
      .getBoundingClientRect();
    return badge.bottom <= band.bottom + 0.5 && badge.top >= band.top - 0.5;
  });
  expect(contained).toBe(true);

  // And clear of it sideways: the mark, the label and the control are three
  // things across one line, which is tightest on a phone.
  const clearance = await page.evaluate(() => {
    const box = (selector: string) =>
      document.querySelector(selector)!.getBoundingClientRect();
    const label = box('.cs-header__back');
    const logo = box('.cs-header__logo');
    const badge = box('.ig-badge');
    return {
      labelToLogo: logo.left - label.right,
      logoToBadge: badge.left - logo.right,
    };
  });
  expect(clearance.labelToLogo).toBeGreaterThan(0);
  expect(clearance.logoToBadge).toBeGreaterThan(0);

  expect(errors).toEqual([]);
});

test('the template is the project, the client, the chapters and the way on', async ({
  page,
}) => {
  await page.goto(LIGHT);

  await expect(page.locator('h1')).toHaveText('Fauce Elástica');
  await expect(page.locator('.cs-brief__client')).toHaveText('Cerámica Nava');

  // The three chapters, always these three and in this order.
  await expect(page.locator('.cs-chapter__label')).toHaveText([
    'Estrategia',
    'Ejecución',
    'Resultados',
  ]);

  const cta = page.locator('.cs-brief__cta');
  await expect(cta).toHaveText('Sé el siguiente');
  await expect(cta).toHaveAttribute('href', '/contacto/');

  // The work stands beside the brief.
  await expect(page.locator('.cs-brief__piece')).toHaveCount(2);

  // What the rebuild removed, and which must not come back: the hero, the
  // module sequence, the metadata block, the next-project stage and the
  // provisional notice.
  await expect(page.locator('.cs-hero')).toHaveCount(0);
  await expect(page.locator('.cs-module')).toHaveCount(0);
  await expect(page.locator('.cs-intro')).toHaveCount(0);
  await expect(page.locator('[data-cs-next]')).toHaveCount(0);
  await expect(page.locator('.cs-flag')).toHaveCount(0);
});

test('the chapters are disclosures, open on arrival and foldable', async ({
  page,
}) => {
  await page.goto(LIGHT);

  const chapters = page.locator('details.cs-chapter');
  await expect(chapters).toHaveCount(3);
  // All three are open, so the whole case is readable the moment it loads.
  expect(await openChapters(page)).toEqual([
    'caso-estrategia',
    'caso-ejecucion',
    'caso-resultados',
  ]);

  // A reader who wants to skim folds one away, and the others are untouched.
  await page.locator('#caso-ejecucion summary').click();
  expect(await openChapters(page)).toEqual([
    'caso-estrategia',
    'caso-resultados',
  ]);

  // The element keeps its own keyboard behaviour; nothing here reimplements it.
  await page.locator('#caso-ejecucion summary').focus();
  await page.keyboard.press('Enter');
  expect(await openChapters(page)).toEqual([
    'caso-estrategia',
    'caso-ejecucion',
    'caso-resultados',
  ]);
});

test('without JavaScript the whole case is on the page', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(LIGHT);

  // Every chapter is readable, in order, each under its own heading. The
  // disclosures need no script at all, so this state is the same one everyone
  // else gets.
  expect(await openChapters(page)).toEqual([
    'caso-estrategia',
    'caso-ejecucion',
    'caso-resultados',
  ]);
  await expect(page.locator('.cs-chapter__label')).toHaveText([
    'Estrategia',
    'Ejecución',
    'Resultados',
  ]);

  // The name, the work and both ways out are all real without a script.
  await expect(page.locator('h1')).toHaveText('Fauce Elástica');
  await expect(page.locator('.cs-brief__piece')).toHaveCount(2);
  await expect(page.locator('.cs-header__back')).toHaveAttribute(
    'href',
    '/proyectos/',
  );
  await expect(page.locator('.cs-brief__cta')).toHaveAttribute(
    'href',
    '/contacto/',
  );

  await context.close();
});

test('every project stands on the same cream, page and canvas alike', async ({
  page,
}) => {
  for (const slug of ARCHIVE) {
    await page.goto(`/proyectos/${slug}/`);
    // The article, the document behind it and the route's own header all take
    // the one ground, so an overscroll at either end shows the same colour.
    await expect(page.locator('[data-case-study]'), slug).toHaveCSS(
      'background-color',
      CREAM,
    );
    await expect(page.locator('html'), slug).toHaveCSS(
      'background-color',
      CREAM,
    );
    await expect(page.locator('[data-cs-header]'), slug).toHaveCSS(
      'background-color',
      CREAM,
    );
    // And the mark is the orange derivative, as on every route since
    // 2026-09-23.
    await expect(page.locator('.cs-header__mark'), slug).toHaveAttribute(
      'src',
      /orange/,
    );
  }
});

test('every project in the archive is the same template', async ({ page }) => {
  const errors = await collectErrors(page);

  for (const slug of ARCHIVE) {
    await page.goto(`/proyectos/${slug}/`);

    await expect(page.locator('[data-cs-header]'), slug).toBeVisible();
    await expect(page.locator('h1'), slug).toHaveCount(1);
    // A name and the brand it was made for, each on its own single line.
    await expect(page.locator('.cs-brief__client'), slug).toHaveCount(1);
    // The same three chapters, in the same order, all open.
    await expect(page.locator('.cs-chapter__label'), slug).toHaveText([
      'Estrategia',
      'Ejecución',
      'Resultados',
    ]);
    expect(await openChapters(page), slug).toEqual([
      'caso-estrategia',
      'caso-ejecucion',
      'caso-resultados',
    ]);
    // The work beside the brief, and the one way on.
    await expect(page.locator('.cs-brief__piece'), slug).toHaveCount(2);
    await expect(page.locator('.cs-brief__cta'), slug).toHaveAttribute(
      'href',
      '/contacto/',
    );
    // And nothing the rebuild removed.
    await expect(
      page.locator('.cs-hero, .cs-module, .cs-intro'),
      slug,
    ).toHaveCount(0);
  }

  expect(errors).toEqual([]);
});

test('the name and the client each hold one line on every project', async ({
  page,
}) => {
  for (const slug of ARCHIVE) {
    await page.goto(`/proyectos/${slug}/`);
    const lines = await page.evaluate(() => {
      const count = (selector: string) => {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element) return 0;
        const style = getComputedStyle(element);
        return Math.round(
          element.getBoundingClientRect().height /
            Number.parseFloat(style.lineHeight),
        );
      };
      return {
        title: count('.cs-brief__title'),
        client: count('.cs-brief__client'),
        overflow: document.documentElement.scrollWidth - window.innerWidth,
      };
    });
    expect(lines.title, `${slug} title`).toBe(1);
    expect(lines.client, `${slug} client`).toBe(1);
    expect(lines.overflow, `${slug} overflow`).toBeLessThanOrEqual(0);
  }
});

test('reduced motion keeps the whole template and switches the effects off', async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(LIGHT);

  // Folding a chapter is the element's own behaviour, so it still works.
  await expect(page.locator('details.cs-chapter')).toHaveCount(3);
  await page.locator('#caso-ejecucion summary').click();
  expect(await openChapters(page)).toEqual([
    'caso-estrategia',
    'caso-resultados',
  ]);

  await expect(page.locator('.cs-brief__piece')).toHaveCount(2);
  await context.close();
});

test('the template fits every tested viewport without sideways scroll', async ({
  page,
}) => {
  for (const path of [LIGHT, DARK]) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, `${path} overflows`).toBeLessThanOrEqual(0);
  }
});
