import { expect, test } from '@playwright/test';

/*
 * /proyectos/ in the standard build (`dist`). No project has been approved
 * yet, so the route is its hero and its close and nothing else: the gallery,
 * the filter and every provisional piece stay out of the artifact. The demo
 * build's complete composition is covered by `projects.demo.spec.ts`.
 */

test('the archive publishes its hero and its close, and no unapproved piece', async ({
  page,
}) => {
  await page.goto('/proyectos/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Proyectos' }),
  ).toBeVisible();
  await expect(page.locator('.projects-hero')).toHaveCSS(
    'background-color',
    'rgb(252, 238, 218)',
  );
  await expect(page.locator('.projects-hero__frame')).toHaveCount(1);

  // Nothing provisional, and no control that would have nothing to filter.
  await expect(page.locator('[data-project-item]')).toHaveCount(0);
  await expect(page.locator('[data-projects-filters]')).toHaveCount(0);
  await expect(page.locator('.projects-gallery')).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText('Archivo');

  await expect(
    page.getByRole('link', { name: 'Hablemos', exact: true }),
  ).toHaveAttribute('href', '/contacto/');
});

test('the close stands in its own scene and offers both routes', async ({
  page,
}) => {
  await page.goto('/proyectos/');

  /*
   * The close is the route's one change of surface since 2026-09-23: white,
   * where the hero and the archive are the page's cream. It is also the colour
   * the scene in front of it was prepared for, so the picture's paper and the
   * section are the same value and the sculptures carry no rectangle.
   */
  const close = page.locator('.projects-close');
  await expect(close).toHaveCSS('background-color', 'rgb(255, 255, 255)');

  // It is drawn as two wings sharing one decorative file, so the picture's
  // near-white centre is never laid over the page's white.
  await expect(close.locator('.projects-close__wing')).toHaveCount(2);
  const images = close.locator('.projects-close__image');
  await expect(images).toHaveCount(2);
  for (const image of await images.all()) {
    await expect(image).toHaveAttribute('alt', '');
  }

  // Two real routes. The arrow is drawn by CSS with empty alternative text,
  // so it never reaches either accessible name.
  await expect(
    page.getByRole('link', { name: 'Ver servicios', exact: true }),
  ).toHaveAttribute('href', '/servicios/');
});

test('the route carries the orange wordmark and marks itself in the menu', async ({
  page,
}) => {
  await page.goto('/proyectos/');

  await expect(page.locator('[data-site-logo]')).toHaveAttribute(
    'data-theme',
    'light',
  );
  await expect(page.locator('[data-site-logo] img')).toHaveAttribute(
    'src',
    /orange/,
  );
  const current = page.locator('.edge-menu__list a[aria-current="page"]');
  await expect(current).toHaveCount(1);
  await expect(current).toHaveAttribute('href', '/proyectos/');
});
