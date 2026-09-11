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
  // Until the loop is supplied the disc shows its geometric placeholder.
  await expect(page.locator('.studio-hero__placeholder')).toHaveCount(1);
});
