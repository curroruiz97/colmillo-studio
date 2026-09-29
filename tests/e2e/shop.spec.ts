import { expect, test, type Page } from '@playwright/test';

/*
 * The shop (tienda.colmillostudio.com), built from `shop/` to `dist-shop/`.
 * Every product is a flagged demonstration and nothing is ever charged; these
 * tests hold the layout, the cart and those two promises.
 */

async function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

const noOverflow = (page: Page) =>
  page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );

const cartCount = (page: Page) => page.locator('[data-cart-count]');

test('the home is a flagged, unindexed demonstration', async ({ page }) => {
  const errors = await collectErrors(page);
  await page.goto('/');

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  );
  // The top band went on 2026-09-29; the footer still says it, and every
  // card below carries its own flag.
  await expect(page.locator('.demo-band')).toHaveCount(0);
  await expect(page.locator('.shop-footer')).toContainText('Sin pagos reales');
  await expect(page.locator('.stage__kicker')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Tienda.');

  const cards = page.locator('[data-card]');
  await expect(cards).toHaveCount(9);
  for (const card of await cards.all()) {
    await expect(card.locator('.card__flag').first()).toHaveText('Demo');
  }

  expect(await noOverflow(page)).toBeLessThanOrEqual(0);
  expect(errors).toEqual([]);
});

test('robots.txt blocks everything', async ({ request }) => {
  const response = await request.get('/robots.txt');
  expect(await response.text()).toContain('Disallow: /');
});

test('the bar categories are the only filter, and keep it in the address', async ({
  page,
  isMobile,
}) => {
  await page.goto('/');
  const grid = page.locator('[data-grid]');
  // The pill row under the title is gone (2026-09-29).
  await expect(page.locator('[data-filter]')).toHaveCount(0);

  if (!isMobile) {
    const papel = page.locator('.shop-bar__nav [data-category-link="Papel"]');
    await papel.click();
    await expect(papel).toHaveAttribute('aria-current', 'true');
    await expect(grid.locator('[data-card]:visible')).toHaveCount(3);
    for (const card of await grid.locator('[data-card]:visible').all()) {
      await expect(card).toHaveAttribute('data-category', 'Papel');
    }
    await expect(page.locator('[data-catalog-count]')).toHaveText('3');
    expect(new URL(page.url()).searchParams.get('categoria')).toBe('Papel');
  }

  // Arriving with a category applies it.
  await page.goto('/?categoria=Textil#catalogo');
  await expect(grid.locator('[data-card]:visible')).toHaveCount(3);
  await expect(page.locator('[data-catalog-count]')).toHaveText('3');
});

test('a quick add lands in the cart and survives a reload', async ({
  page,
}) => {
  await page.goto('/');
  await expect(cartCount(page)).toHaveText('0');
  await page
    .locator('[data-card][data-category="Objetos"] [data-quick-add]')
    .first()
    .click();
  await expect(cartCount(page)).toHaveText('1');
  await expect(page.locator('[data-cart-announcer]')).toContainText(
    'Añadido a la cesta',
  );

  await page.reload();
  await expect(cartCount(page)).toHaveText('1');
});

test('the drawer edits lines, and closes back to its button', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('[data-quick-add]').first().click();
  const opener = page.locator('[data-cart-open]');
  await opener.click();

  const dialog = page.locator('[data-cart]');
  await expect(dialog).toHaveAttribute('open', '');
  await expect(dialog.locator('#cesta-title')).toContainText('(1)');
  const line = dialog.locator('.cart-line');
  await expect(line).toHaveCount(1);
  const unit = await line.locator('[data-line-price]').textContent();

  await line.locator('[data-line-more]').click();
  await expect(line.locator('[data-line-qty]')).toHaveText('2');
  await expect(dialog.locator('#cesta-title')).toContainText('(2)');
  await expect(line.locator('[data-line-price]')).not.toHaveText(unit ?? '');

  await line.locator('[data-line-remove]').click();
  await expect(dialog.locator('[data-cart-empty]')).toBeVisible();
  await expect(cartCount(page)).toHaveText('0');

  await page.keyboard.press('Escape');
  await expect(dialog).not.toHaveAttribute('open', '');
  await expect(opener).toBeFocused();
});

test('checkout says it is a mock-up and asks for nothing', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-quick-add]').first().click();
  await page.locator('[data-cart-open]').click();
  await page.locator('[data-cart-checkout]').click();
  await expect(page.locator('[data-cart-demo]')).toBeVisible();
  await expect(page.locator('[data-cart-demo]')).toContainText(
    'No se ha cobrado nada',
  );
  // No payment or personal-data field anywhere on the page.
  await expect(
    page.locator(
      'input[autocomplete*="cc-"], input[type="email"], input[type="tel"]',
    ),
  ).toHaveCount(0);
});

test('a product resolves its variant, price and sold-out values', async ({
  page,
}) => {
  await page.goto('/producto/demo-camiseta-mordisco/');
  const form = page.locator('form[data-buy]');
  const submit = form.locator('[data-buy-submit]');

  // Tinta in XL is the demo's sold-out variant.
  // The radio covers its pill, so the pill is chosen through the radio.
  await form.getByRole('radio', { name: 'Tinta', exact: true }).check();
  await expect(form.locator('.pill:has(input[value="XL"])')).toHaveAttribute(
    'data-out',
    '',
  );
  await form.getByRole('radio', { name: /^XL/ }).check();
  await expect(submit).toBeDisabled();
  await expect(submit).toHaveText('Agotado');

  await form.getByRole('radio', { name: 'L', exact: true }).check();
  await expect(submit).toBeEnabled();
  await submit.click();

  // The drawer opens once the disc has landed, with the chosen variant.
  const dialog = page.locator('[data-cart]');
  await expect(dialog).toHaveAttribute('open', '');
  await expect(dialog.locator('[data-line-options]')).toHaveText('Tinta · L');

  // A price that depends on an option.
  await page.goto('/producto/demo-poster-presion/');
  const price = page.locator('.product__price [data-buy-price]');
  await expect(price).toHaveText(/28,00/);
  await page
    .locator('form[data-buy]')
    .getByRole('radio', { name: 'A2', exact: true })
    .check();
  await expect(price).toHaveText(/38,00/);
});

test('on touch the cart is the dock centred at the foot', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, 'The dock is the touch layout.');
  await page.goto('/');
  const viewport = page.viewportSize();
  const dock = await page.locator('[data-cart-open]').boundingBox();
  expect(viewport).not.toBeNull();
  expect(dock).not.toBeNull();
  if (!viewport || !dock) return;
  expect(Math.abs(dock.x + dock.width / 2 - viewport.width / 2)).toBeLessThan(
    1.5,
  );
  const air = viewport.height - (dock.y + dock.height);
  expect(air).toBeGreaterThanOrEqual(8);
  expect(air).toBeLessThanOrEqual(32);
  // The stage's own button stands clear of it.
  const cta = await page.locator('.stage__cta').boundingBox();
  expect(cta).not.toBeNull();
  if (cta) expect(cta.y + cta.height).toBeLessThanOrEqual(dock.y);
});

test('pressing the ball squashes the word under it', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'Held pressure is a fine-pointer gesture.');
  await page.goto('/');
  const stage = page.locator('[data-stage]');
  const ball = page.locator('[data-ball]');
  await page.waitForTimeout(1500);
  const box = await ball.boundingBox();
  expect(box).not.toBeNull();
  if (!box) return;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await expect
    .poll(() =>
      stage.evaluate((node) =>
        Number(getComputedStyle(node).getPropertyValue('--press')),
      ),
    )
    .toBeGreaterThan(0.5);
  await page.mouse.up();
  await expect
    .poll(() =>
      stage.evaluate((node) =>
        Number(getComputedStyle(node).getPropertyValue('--press')),
      ),
    )
    .toBeLessThan(0.05);
});

test('reduced motion keeps everything still and complete', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  await expect(page.locator('[data-band]')).toHaveCSS('animation-name', 'none');
  // Nothing waits to be revealed.
  for (const block of await page.locator('[data-reveal]').all()) {
    await expect(block).toHaveCSS('opacity', '1');
  }
});

test('without JavaScript the catalogue is whole and nothing is dead', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4324/');
  await expect(page.locator('[data-card]')).toHaveCount(9);
  await expect(page.locator('[data-card]').first()).toBeVisible();
  await page.goto('http://127.0.0.1:4324/producto/demo-pin-colmillo/');
  await expect(page.locator('.buy__noscript')).toBeVisible();
  await context.close();
});

test('the mark leads to the studio, not to the shop', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.shop-bar__brand')).toHaveAttribute(
    'href',
    'https://colmillostudio.com/',
  );
  await expect(page.locator('.shop-footer__brand')).toHaveAttribute(
    'href',
    'https://colmillostudio.com/',
  );
});
