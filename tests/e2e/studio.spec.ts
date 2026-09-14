import { expect, test } from '@playwright/test';

/*
 * /studio/ in the standard build (`dist`): only the parts with final wording
 * ship. The provisional intro, principles and team stay in the demo build
 * (`studio.demo.spec.ts`).
 */
test('the standard build withholds every provisional Studio block', async ({
  page,
}) => {
  await page.goto('/studio/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Studio' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Hablemos' })).toHaveAttribute(
    'href',
    '/contacto/',
  );
  await expect(
    page.locator(
      '.studio-intro, .studio-principles, .studio-team, .studio-hero__pending, [data-dev-placeholder]',
    ),
  ).toHaveCount(0);
  // The supplied loop fills the frame; no placeholder surface is left.
  await expect(page.locator('.studio-hero__placeholder')).toHaveCount(0);
  await expect(page.locator('[data-studio-hero-video]')).toHaveCount(1);
  await expect(page.locator('main')).not.toContainText('Loop pendiente');
  // The route is one charcoal surface, footer included.
  for (const selector of ['body', '.site-footer']) {
    await expect(page.locator(selector)).toHaveCSS(
      'background-color',
      'rgb(31, 31, 31)',
    );
  }
});
