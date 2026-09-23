import { expect, test, type Page } from '@playwright/test';

/*
 * /contacto/ in the standard build (`dist`). Nothing on this route is
 * provisional or fictional, so the artifact publishes it whole: the charcoal
 * hero with its unfinished trajectory, the white brief that rises over it, and
 * the footer. Rebuilt on 2026-09-16.
 */

const EMAIL = 'mailto:hola@colmillostudio.com';

const openBrief = async (page: Page) => {
  await page.evaluate(() => {
    const sheet = document.querySelector<HTMLElement>('[data-contact-brief]');
    window.scrollTo({ top: (sheet?.offsetTop ?? 0) + 10, behavior: 'instant' });
  });
};

test('the hero states the question and carries the route`s own graphic', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto('/contacto/');

  const title = page.getByRole('heading', {
    level: 1,
    name: /Cuéntanos qué tienes entre manos/,
  });
  await expect(title).toBeVisible();
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page).toHaveTitle('Contacto — Colmillo Studio');

  // Charcoal, with the cream wordmark the dark header theme asks for.
  await expect(page.locator('.contact-hero')).toHaveCSS(
    'background-color',
    'rgb(31, 31, 31)',
  );
  await expect(page.locator('[data-site-logo]')).toHaveAttribute(
    'data-theme',
    'dark',
  );

  // One decorative arc, hidden from assistive technology and never clickable.
  const orbit = page.locator('[data-contact-orbit]');
  await expect(orbit).toHaveCount(1);
  await expect(orbit).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('.contact-orbit-slot')).toHaveCSS(
    'pointer-events',
    'none',
  );

  expect(errors).toEqual([]);
});

test('the brief rises over the hero, which stays underneath', async ({
  page,
}) => {
  await page.goto('/contacto/');

  const hero = page.locator('.contact-hero');
  await expect(hero).toHaveCSS('position', 'sticky');

  await page.evaluate(() =>
    window.scrollTo({ top: window.innerHeight * 0.6, behavior: 'instant' }),
  );
  const boxes = await page.evaluate(() => {
    const top = (selector: string) =>
      document.querySelector(selector)!.getBoundingClientRect().top;
    return { hero: top('.contact-hero'), sheet: top('[data-contact-brief]') };
  });
  // The hero is held at the top of the screen while the cream sheet covers it.
  expect(Math.round(boxes.hero)).toBe(0);
  expect(boxes.sheet).toBeGreaterThan(0);
  expect(boxes.sheet).toBeLessThan(await page.evaluate(() => innerHeight));

  await expect(page.locator('[data-contact-brief]')).toHaveCSS(
    'background-color',
    'rgb(252, 238, 218)',
  );
  // The footer belongs to the sheet, not to the hero.
  await expect(page.locator('.site-footer')).toHaveCSS(
    'background-color',
    'rgb(252, 238, 218)',
  );
});

test('the route offers the brief and the two approved channels, and nothing else', async ({
  page,
}) => {
  await page.goto('/contacto/');

  await expect(
    page.getByRole('heading', { level: 2, name: /Hablemos/ }),
  ).toBeVisible();
  await expect(
    page.locator('.contact-brief__channel-link').first(),
  ).toHaveAttribute('href', EMAIL);
  const instagram = page.locator('.contact-brief__channel-link').nth(1);
  await expect(instagram).toHaveAttribute(
    'href',
    'https://www.instagram.com/colmillo.studio/',
  );
  await expect(instagram).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(instagram).toHaveAttribute('target', '_blank');

  // No map back into the site inside the page: the edge menu is the navigation.
  await expect(page.locator('main a[href="/studio/"]')).toHaveCount(0);
  await expect(page.locator('main a[href="/servicios/"]')).toHaveCount(0);
  await expect(page.locator('main a[href="/proyectos/"]')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('Mientras tanto');
  await expect(page.locator('main')).not.toContainText(
    'El siguiente movimiento',
  );

  // Contacto is the current route in the menu, in the brand orange.
  const current = page.locator('.edge-menu__list a[aria-current="page"]');
  await expect(current).toHaveAttribute('href', '/contacto/');
  await expect(current).toHaveCSS('color', 'rgb(205, 87, 48)');
});

test('every control is real, labelled and usable without JavaScript', async ({
  page,
}) => {
  await page.goto('/contacto/');

  for (const [id, type] of [
    ['#contact-name', 'text'],
    ['#contact-email', 'email'],
    ['#contact-company', 'text'],
  ] as const) {
    const field = page.locator(id);
    await expect(field).toHaveAttribute('type', type);
    await expect(field).toHaveJSProperty('labels.length', 1);
  }
  await expect(page.locator('#contact-message')).toHaveJSProperty(
    'labels.length',
    1,
  );
  await expect(page.locator('#contact-name')).toHaveAttribute(
    'autocomplete',
    'name',
  );
  await expect(page.locator('#contact-email')).toHaveAttribute(
    'autocomplete',
    'email',
  );

  // The service selector is a native radio group, not a set of divs.
  const radios = page.locator('input[type="radio"][name="service"]');
  await expect(radios).toHaveCount(5);
  await expect(page.locator('.contact-field--choice legend')).toHaveText(
    'Servicio',
  );

  /*
   * With no JavaScript the browser validates natively and the form's own
   * action hands the fields to the visitor's mail client. Nothing here needs a
   * script to be a working form.
   */
  await expect(page.locator('[data-contact-form]')).toHaveAttribute(
    'action',
    new RegExp(`^${EMAIL}\\?subject=`),
  );
});

test('the service pills work from the keyboard and paint the choice', async ({
  page,
}) => {
  await page.goto('/contacto/');
  await openBrief(page);

  await page.locator('#contact-message').focus();
  await page.keyboard.press('Tab');
  await expect(page.locator('input[value="estrategia"]')).toBeFocused();

  await page.keyboard.press('ArrowRight');
  await expect(page.locator('input[value="identidad"]')).toBeFocused();
  await expect(page.locator('input[value="identidad"]')).toBeChecked();

  const chosen = page.locator(
    'input[value="identidad"] + .contact-choice__pill',
  );
  await expect(chosen).toHaveCSS('background-color', 'rgb(205, 87, 48)');
  const other = page.locator('input[value="digital"] + .contact-choice__pill');
  await expect(other).toHaveCSS('background-color', 'rgb(252, 238, 218)');
});

test('validation answers under each field and never in a dialog', async ({
  page,
}) => {
  let dialogs = 0;
  page.on('dialog', (dialog) => {
    dialogs += 1;
    void dialog.dismiss();
  });

  await page.goto('/contacto/');
  await openBrief(page);
  await page.locator('[data-contact-submit]').click();

  await expect(page.locator('[data-contact-form]')).toHaveAttribute(
    'data-state',
    'invalid',
  );
  await expect(
    page.locator('[data-name="name"] [data-field-error]'),
  ).toHaveText('Necesitamos tu nombre para saber con quién hablamos.');
  await expect(
    page.locator('[data-name="email"] [data-field-error]'),
  ).toHaveText('Necesitamos tu correo para responderte.');
  await expect(page.locator('#contact-name')).toHaveAttribute(
    'aria-invalid',
    'true',
  );
  // The message is announced on the field it belongs to.
  await expect(page.locator('#contact-name')).toHaveAttribute(
    'aria-describedby',
    'contact-name-error',
  );
  await expect(page.locator('#contact-name')).toBeFocused();
  expect(dialogs).toBe(0);

  // An address that cannot be one is caught, and clears as soon as it is fixed.
  await page.fill('#contact-name', 'Ada');
  await page.fill('#contact-message', 'Queremos rehacer la identidad.');
  await page.fill('#contact-email', 'ada@');
  await page.locator('[data-contact-submit]').click();
  await expect(
    page.locator('[data-name="email"] [data-field-error]'),
  ).toHaveText('Ese correo no parece completo. Revísalo, por favor.');

  await page.fill('#contact-email', 'ada@estudio.com');
  await expect(page.locator('[data-contact-field][data-invalid]')).toHaveCount(
    0,
  );
});

test('a complete brief is handed to the mail client, and never called sent', async ({
  page,
}) => {
  await page.goto('/contacto/');
  await openBrief(page);

  await page.fill('#contact-name', 'Ada');
  await page.fill('#contact-email', 'ada@estudio.com');
  await page.fill('#contact-message', 'Queremos rehacer la identidad.');
  await page.evaluate(() =>
    document
      .querySelector<HTMLFormElement>('[data-contact-form]')!
      .requestSubmit(),
  );

  const form = page.locator('[data-contact-form]');
  await expect(form).toHaveAttribute('data-state', 'handoff');

  /*
   * This repository has no server, API route or mail provider, so the site
   * itself sends nothing. The status says exactly what happened and offers the
   * address as well; the words "enviado" and "recibido" must never appear.
   */
  const status = page.locator('[data-contact-status]');
  await expect(status).toContainText('Hemos preparado el mensaje');
  await expect(status).not.toContainText(/enviado|recibido/i);
  await expect(status.locator('a')).toHaveAttribute('href', EMAIL);
});

test('the page fits every target width with no horizontal overflow', async ({
  page,
}) => {
  for (const size of [
    { width: 1600, height: 900 },
    { width: 1440, height: 900 },
    { width: 1366, height: 768 },
    { width: 1024, height: 768 },
    { width: 390, height: 844 },
    { width: 320, height: 720 },
  ]) {
    await page.setViewportSize(size);
    await page.goto('/contacto/');
    await expect(page.locator('h1')).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, `overflow at ${size.width}`).toBeLessThanOrEqual(0);

    // The two-column brief only where there is real width for it.
    const columns = await page.evaluate(
      () =>
        getComputedStyle(
          document.querySelector('.contact-brief__inner')!,
        ).gridTemplateColumns.split(' ').length,
    );
    expect(columns, `columns at ${size.width}`).toBe(size.width > 1024 ? 2 : 1);
  }
});

test('under reduced motion nothing travels, and the page is complete', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/contacto/');

  // The arc is simply drawn, and its disc does not walk the line.
  await expect(page.locator('.contact-orbit__line')).toHaveCSS(
    'stroke-dashoffset',
    '0px',
  );
  const first = await page.getAttribute('[data-orbit-dot]', 'transform');
  await page.waitForTimeout(1200);
  expect(await page.getAttribute('[data-orbit-dot]', 'transform')).toBe(first);

  // Every block is there without waiting for a reveal.
  await openBrief(page);
  const opacities = await page.evaluate(() =>
    [...document.querySelectorAll('[data-contact-reveal]')].map(
      (element) => getComputedStyle(element).opacity,
    ),
  );
  expect(opacities.every((value) => value === '1')).toBe(true);

  // The pulse is a mark in the margin, and stays where it is.
  const pulseTop = () =>
    page.evaluate(
      () =>
        document.querySelector('[data-contact-pulse]')!.getBoundingClientRect()
          .top,
    );
  const before = await pulseTop();
  await page.locator('#contact-message').focus();
  await page.waitForTimeout(600);
  expect(Math.abs((await pulseTop()) - before)).toBeLessThan(2);

  // The form still validates and still answers.
  await page.locator('[data-contact-submit]').click();
  await expect(page.locator('[data-contact-form]')).toHaveAttribute(
    'data-state',
    'invalid',
  );
});
