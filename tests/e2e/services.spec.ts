import { expect, test } from '@playwright/test';

/*
 * /servicios/ in the standard build (`dist`): the service copy is
 * provisional, so only the hero and the closing decision ship.
 */
test('the standard build withholds the provisional service layers', async ({
  page,
}) => {
  await page.goto('/servicios/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Servicios' }),
  ).toBeVisible();
  await expect(
    page.locator('[data-service-layer], [data-dev-placeholder]'),
  ).toHaveCount(0);
  await expect(
    page.getByRole('heading', { level: 2, name: 'Ahora toca verlo en acción' }),
  ).toHaveCount(1);
  await expect(
    page.getByRole('link', { name: 'Ver proyectos', exact: true }),
  ).toHaveAttribute('href', '/proyectos/');
  await expect(
    page.getByRole('link', { name: 'Hablemos', exact: true }),
  ).toHaveAttribute('href', '/contacto/');

  const hero = await page
    .locator('[data-services-hero]')
    .evaluate((element) => ({
      height: element.getBoundingClientRect().height,
      viewport: window.innerHeight,
    }));
  expect(Math.abs(hero.height - hero.viewport)).toBeLessThanOrEqual(1);

  // The hero loop is the client's final piece, so it ships here too.
  await expect(
    page.locator('[data-services-hero] video source'),
  ).toHaveAttribute('src', '/assets/services/video%20hero%20servicios.mp4');

  // The route ends on black, footer included.
  for (const selector of ['body', '.site-footer']) {
    await expect(page.locator(selector)).toHaveCSS(
      'background-color',
      'rgb(18, 16, 15)',
    );
  }
});
