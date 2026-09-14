import { expect, test, type Page } from '@playwright/test';

/*
 * /studio/ in the demo build (`dist-demo`), where every provisional block is
 * rendered. The standard build is covered by `studio.spec.ts`.
 */

const CHARCOAL = 'rgb(31, 31, 31)';

async function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

async function scrollToTop(page: Page, selector: string, offset = 60) {
  await page
    .locator(selector)
    .first()
    .evaluate((element, margin) => {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - margin, behavior: 'instant' });
    }, offset);
}

const principle = (page: Page, name: string) =>
  page.getByRole('button', { name, exact: true });

test('the studio page has its five moments and no maquette leftovers', async ({
  page,
}) => {
  const errors = await collectErrors(page);
  await page.goto('/studio/');

  const title = page.getByRole('heading', { level: 1, name: 'Studio' });
  await expect(title).toBeVisible();
  await expect(title).toHaveCSS('text-transform', 'none');
  for (const name of [
    'Somos Colmillo',
    'Cómo hacemos las cosas',
    'Equipo',
    '¿Hacemos algo juntos?',
  ]) {
    await expect(page.getByRole('heading', { level: 2, name })).toHaveCount(1);
  }

  const main = page.locator('main');
  await expect(main).not.toContainText('DEMO FICTICIA');
  await expect(main).not.toContainText('02 / Studio');
  await expect(main).not.toContainText('Loop pendiente');
  await expect(
    page.locator(
      '.editorial-page__mark, .studio-process, .section-kicker, .studio-hero__pending, .studio-hero__shape',
    ),
  ).toHaveCount(0);

  // The hero loop: decorative, silent, looping, without controls, and no
  // placeholder surface left behind.
  await expect(page.locator('.studio-hero__placeholder')).toHaveCount(0);
  const loop = page.locator('[data-studio-hero-video]');
  await expect(loop).toHaveAttribute('aria-hidden', 'true');
  await expect(loop).not.toHaveAttribute('controls', /.*/);
  expect(
    await loop.evaluate((video: HTMLVideoElement) => ({
      muted: video.muted,
      loop: video.loop,
      autoplay: video.autoplay,
      playsInline: video.playsInline,
    })),
  ).toEqual({ muted: true, loop: true, autoplay: true, playsInline: true });

  // No visible numbering in the principles.
  await expect(page.locator('.studio-principles')).not.toContainText(
    /\b0[1-4]\b/,
  );

  await expect(page.getByRole('link', { name: 'Hablemos' })).toHaveAttribute(
    'href',
    '/contacto/',
  );
  expect(errors).toEqual([]);
});

test('the whole route is one charcoal surface with no light band', async ({
  page,
}) => {
  await page.goto('/studio/');
  const surfaces = await page.evaluate(() => {
    const paint = (element: Element) =>
      getComputedStyle(element).backgroundColor;
    return {
      html: paint(document.documentElement),
      body: paint(document.body),
      page: paint(document.querySelector('[data-studio-page]')!),
      footer: paint(document.querySelector('.site-footer')!),
      sections: [
        ...document.querySelectorAll(
          '[data-studio-page] > :is(header, section)',
        ),
      ].map((section) => ({
        background: paint(section),
        tone: (section as HTMLElement).dataset.surfaceTone,
      })),
    };
  });
  expect(surfaces.html).toBe(CHARCOAL);
  expect(surfaces.body).toBe(CHARCOAL);
  expect(surfaces.page).toBe(CHARCOAL);
  expect(surfaces.footer).toBe(CHARCOAL);
  expect(surfaces.sections).toHaveLength(5);
  for (const section of surfaces.sections) {
    // Transparent: every section shows the page's own charcoal.
    expect(section.background).toBe('rgba(0, 0, 0, 0)');
    expect(section.tone).toBe('dark');
  }
});

test('studio fits every target viewport without horizontal overflow', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');

  for (const [width, height] of [
    [1920, 1080],
    [1440, 900],
    [1366, 768],
    [1024, 1366],
    [768, 1024],
    [430, 932],
    [390, 844],
    [320, 720],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('/studio/');
    const layout = await page.evaluate(() => {
      const title = document.querySelector('h1')!.getBoundingClientRect();
      const hero = document
        .querySelector('[data-studio-hero]')!
        .getBoundingClientRect();
      const h2 = getComputedStyle(document.querySelector('main h2')!);
      return {
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
        titleLeft: title.left,
        titleRight: title.right,
        heroHeight: hero.height,
        h2: Number.parseFloat(h2.fontSize),
      };
    });
    const label = `${width}x${height}`;
    expect(layout.overflow, label).toBeLessThanOrEqual(1);
    expect(layout.titleLeft, label).toBeGreaterThanOrEqual(0);
    expect(layout.titleRight, label).toBeLessThanOrEqual(width);
    expect(layout.heroHeight, label).toBeGreaterThanOrEqual(height - 1);
    // Section headings stay on the moderate scale: at most 5rem.
    expect(layout.h2, label).toBeLessThanOrEqual(80.5);
  }
});

test('the hero centres the title vertically and sets the frame on the right', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');

  for (const [width, height] of [
    [1920, 1080],
    [1440, 900],
    [1366, 768],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('/studio/');
    // Let the CSS entrance (title 1.15 s, frame 1.56 s) finish first.
    await page.waitForTimeout(1700);
    const hero = await page.evaluate(() => {
      const title = document
        .querySelector('[data-studio-hero-title]')!
        .getBoundingClientRect();
      const frame = document
        .querySelector('.studio-hero__frame')!
        .getBoundingClientRect();
      return {
        titleMiddle: title.top + title.height / 2,
        titleRight: title.right,
        frameMiddle: frame.top + frame.height / 2,
        frameLeft: frame.left,
        frameRight: frame.right,
        frameWidth: frame.width,
      };
    });
    const label = `${width}x${height}`;
    // The CSS entrance may still be settling the title by a few pixels.
    expect(Math.abs(hero.titleMiddle - height / 2), label).toBeLessThan(
      height * 0.04,
    );
    expect(Math.abs(hero.frameMiddle - height / 2), label).toBeLessThan(
      height * 0.04,
    );
    expect(hero.frameLeft, label).toBeGreaterThan(width * 0.45);
    expect(hero.frameLeft, label).toBeGreaterThan(hero.titleRight + 48);
    expect(hero.frameWidth, label).toBeGreaterThan(width * 0.4);
    // Clear of the right edge.
    expect(width - hero.frameRight, label).toBeGreaterThanOrEqual(40);
  }
});

test('Mirar starts open and the pointer or a tap opens a principle', async ({
  page,
}, testInfo) => {
  await page.goto('/studio/');
  await scrollToTop(page, '.principles');

  await expect(page.locator('.principles__trigger')).toHaveCount(4);
  const mirar = principle(page, 'Mirar');
  await expect(mirar).toHaveAttribute('aria-expanded', 'true');
  await expect(
    page.locator('#principio-mirar .principles__text'),
  ).toBeVisible();

  const lanzar = principle(page, 'Lanzar');
  if (testInfo.project.name === 'fine-1440') await lanzar.hover();
  else await lanzar.tap();

  await expect(lanzar).toHaveAttribute('aria-expanded', 'true');
  await expect(mirar).toHaveAttribute('aria-expanded', 'false');
  // Mirar's description has closed: its row collapses to nothing and fades.
  const closed = page.locator('#principio-mirar [data-principle-desc]');
  await expect(closed).toHaveCSS('opacity', '0');
  await expect
    .poll(async () => (await closed.boundingBox())?.height ?? 0)
    .toBeLessThan(1);

  // The description opens directly under its own name.
  const text = page.locator('#principio-lanzar .principles__text');
  await expect(text).toBeVisible();
  await expect
    .poll(async () => {
      const name = (await lanzar.boundingBox())!;
      const box = (await text.boundingBox())!;
      return box.y >= name.y + name.height - 1 && Math.abs(box.x - name.x) < 12;
    })
    .toBe(true);

  // Its picture is on screen, even when the pictures sit under the list.
  const figure = page.locator('[data-principle-figure]').nth(3);
  await expect(figure).toHaveAttribute('data-state', 'active');
  await expect(figure).toBeInViewport({ ratio: 0.5 });

  // Only the open description is exposed; the closed ones are inert.
  const inert = await page
    .locator('[data-principle-desc]')
    .evaluateAll((panels) =>
      panels.map((element) => (element as HTMLElement).inert),
    );
  expect(inert).toEqual([true, true, true, false]);
});

test('the principles picture stays small beside the list on wide screens', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/studio/');
  await scrollToTop(page, '.principles');

  const layout = await page.evaluate(() => {
    const box = (selector: string) =>
      document.querySelector(selector)!.getBoundingClientRect();
    const root = box('[data-principles]');
    const list = box('[data-principles-list]');
    const media = box('[data-principles-media]');
    return {
      list: list.width / root.width,
      media: media.width / root.width,
      beside: media.left > list.right,
    };
  });
  expect(layout.beside).toBe(true);
  expect(layout.list).toBeGreaterThan(0.54);
  expect(layout.list).toBeLessThan(0.62);
  expect(layout.media).toBeLessThanOrEqual(0.36);

  // The open name steps in and the others stay legible, not disabled.
  const pensar = principle(page, 'Pensar');
  await pensar.hover();
  await expect(pensar).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#principio-pensar .principles__label')).toHaveCSS(
    'translate',
    '6px',
  );
  const idle = await page
    .locator('#principio-mirar .principles__label')
    .evaluate((element) => getComputedStyle(element).color);
  expect(idle).toBe('rgba(255, 255, 255, 0.5)');
});

test('the principles are keyboard disclosures with arrow navigation', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/studio/');
  await scrollToTop(page, '.principles');

  await principle(page, 'Mirar').focus();
  await page.keyboard.press('ArrowDown');
  await expect(principle(page, 'Pensar')).toBeFocused();
  await expect(principle(page, 'Pensar')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await page.keyboard.press('End');
  await expect(principle(page, 'Lanzar')).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(principle(page, 'Mirar')).toBeFocused();
  await expect(principle(page, 'Mirar')).toHaveAttribute(
    'aria-expanded',
    'true',
  );

  // Tab moves on to the next name, which opens it.
  await page.keyboard.press('Tab');
  await expect(principle(page, 'Pensar')).toBeFocused();
  await expect(principle(page, 'Pensar')).toHaveAttribute(
    'aria-expanded',
    'true',
  );
});

test('Somos Colmillo settles in on entry', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/studio/');
  const fades = page.locator('.studio-intro [data-reveal-fade]');
  await expect(fades).toHaveCount(3);
  await expect(page.locator('.studio-intro__accent')).toHaveText(
    'provocar algo',
  );

  await scrollToTop(page, '.studio-intro', 0);
  await expect
    .poll(() =>
      fades.evaluateAll((elements) =>
        elements.map((element) => getComputedStyle(element).opacity),
      ),
    )
    .toEqual(['1', '1', '1']);
  await expect(page.locator('.studio-intro__rule')).toBeVisible();
});

test('team portraits give under a fine pointer and never under touch', async ({
  page,
}, testInfo) => {
  await page.goto('/studio/');
  const members = page.locator('[data-team-member]');
  await expect(members).toHaveCount(6);

  const frame = page.locator('[data-press-frame]').first();
  const surface = page.locator('[data-press-surface]').first();
  await scrollToTop(page, '[data-press-frame]', 150);
  // A portrait is hidden until its reveal has run; then its name is exposed.
  await expect(members.first()).toHaveCSS('opacity', '1');
  await expect(
    members.first().getByRole('heading', { level: 3, name: 'Nombre' }),
  ).toBeVisible();
  const box = (await frame.boundingBox())!;

  if (testInfo.project.name === 'fine-1440') {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.move(box.x + box.width - 12, box.y + box.height / 2, {
      steps: 5,
    });
    await expect
      .poll(() => surface.evaluate((element) => element.style.clipPath))
      .toContain('path(');
    // The name sits outside the pressed surface and is never clipped.
    await expect(members.first().locator('.studio-member__name')).toHaveCSS(
      'clip-path',
      'none',
    );
    await page.mouse.move(box.x + box.width + 240, box.y - 120);
    await expect
      .poll(() => surface.evaluate((element) => element.style.clipPath))
      .toBe('');
  } else {
    await frame.tap();
    await page.waitForTimeout(300);
    expect(await surface.evaluate((element) => element.style.clipPath)).toBe(
      '',
    );
  }
});

test('reduced motion keeps every principle, without travel or dent', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/studio/');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');

  await scrollToTop(page, '.principles');
  const crear = principle(page, 'Crear');
  await crear.hover();
  await expect(crear).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('[data-principle-figure]').nth(2)).toHaveAttribute(
    'data-state',
    'active',
  );
  await expect(
    page.locator('#principio-crear .principles__text'),
  ).toBeVisible();

  await scrollToTop(page, '[data-press-frame]', 150);
  const box = (await page.locator('[data-press-frame]').first().boundingBox())!;
  await page.mouse.move(box.x + box.width - 12, box.y + box.height / 2, {
    steps: 4,
  });
  await page.waitForTimeout(300);
  expect(
    await page
      .locator('[data-press-surface]')
      .first()
      .evaluate((element) => element.style.clipPath),
  ).toBe('');
});

test('without JavaScript every description is open under its name', async ({
  browser,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/studio/');
  await expect(page.locator('.principles__text')).toHaveCount(4);
  for (const text of await page.locator('.principles__text').all())
    await expect(text).toBeVisible();
  await expect(page.locator('.principles__trigger')).toHaveCount(0);
  await context.close();
});

test('Somos, the principles, the team and the close share one container', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  for (const [width, height] of [
    [1920, 1080],
    [1440, 900],
    [1100, 800],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('/studio/');
    const edges = await page.evaluate(() =>
      [
        '.studio-intro__inner',
        '.studio-principles__inner',
        '.studio-team__inner',
      ].map((selector) => {
        const element = document.querySelector(selector)!;
        const box = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return [
          Math.round(box.left + Number.parseFloat(style.paddingLeft)),
          Math.round(box.right - Number.parseFloat(style.paddingRight)),
        ];
      }),
    );
    for (const edge of edges) expect(edge, `${width}`).toEqual(edges[0]);
  }

  // Both paragraphs of Somos Colmillo are set alike, as wide as the section
  // below.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/studio/');
  const paragraphs = await page
    .locator('.studio-intro__text')
    .evaluateAll((elements) =>
      elements.map((element) => {
        const style = getComputedStyle(element);
        return [
          style.color,
          style.fontSize,
          style.lineHeight,
          style.fontWeight,
          Math.round(element.getBoundingClientRect().width),
        ].join(' ');
      }),
    );
  expect(paragraphs).toHaveLength(2);
  expect(paragraphs[1]).toBe(paragraphs[0]);
  const below = (await page.locator('[data-principles]').boundingBox())!;
  for (const paragraph of await page.locator('.studio-intro__text').all()) {
    const text = (await paragraph.boundingBox())!;
    expect(Math.abs(text.x - below.x)).toBeLessThan(2);
    expect(Math.abs(text.width - below.width)).toBeLessThan(2);
  }
});

test('the principles are renamed and their picture follows the open row', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/studio/');
  await expect(page.locator('.principles__label')).toHaveText([
    'Mirar',
    'Pensar',
    'Crear',
    'Lanzar',
  ]);
  await expect(page.locator('.principles__label').first()).toHaveCSS(
    'text-transform',
    'none',
  );
  await scrollToTop(page, '.principles');

  const middle = async () => {
    const media = (await page
      .locator('[data-principles-media]')
      .boundingBox())!;
    return media.y + media.height / 2;
  };
  await principle(page, 'Mirar').hover();
  await page.waitForTimeout(900);
  const first = await middle();
  await principle(page, 'Lanzar').hover();
  await page.waitForTimeout(900);
  const last = await middle();
  // It moves down with the open row, but only a little.
  expect(last - first).toBeGreaterThan(20);
  expect(last - first).toBeLessThan(160);
});

test('team portraits step only a little and carry no numbers', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.goto('/studio/');
  const tops = await page
    .locator('.studio-member')
    .evaluateAll((members) =>
      members.slice(0, 3).map((member) => member.getBoundingClientRect().top),
    );
  expect(tops[1]! - tops[0]!).toBeGreaterThanOrEqual(40);
  expect(tops[1]! - tops[0]!).toBeLessThanOrEqual(90);
  expect(tops[2]! - tops[0]!).toBeGreaterThanOrEqual(15);
  expect(tops[2]! - tops[0]!).toBeLessThanOrEqual(45);
  await expect(page.locator('.studio-team')).not.toContainText(/\b0[1-6]\b/);
  await expect(page.locator('.studio-member__ph-label').first()).toHaveText(
    'Retrato pendiente',
  );
});

test('the closing question is never clipped', async ({ page }, testInfo) => {
  const widths =
    testInfo.project.name === 'fine-1440' ? [1920, 1440, 390, 320] : [0];
  for (const width of widths) {
    if (width) await page.setViewportSize({ width, height: 900 });
    await page.goto('/studio/');
    const clipped = await page
      .locator('.studio-close__title')
      .evaluate((title) => {
        for (
          let element: Element | null = title;
          element && !element.matches('.studio-close');
          element = element.parentElement
        ) {
          if (getComputedStyle(element).overflow !== 'visible') return true;
        }
        return false;
      });
    expect(clipped).toBe(false);
  }
  await scrollToTop(page, '.studio-close', 0);
  await expect(page.locator('.studio-close__title')).toHaveCSS('opacity', '1');
  await expect(page.getByRole('link', { name: 'Hablemos' })).toBeInViewport();
});

test('the close is a photographic stage with the copy on its black field', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  const errors = await collectErrors(page);

  for (const [width, height] of [
    [1920, 1080],
    [1440, 900],
    [1366, 768],
    [1024, 768],
  ] as const) {
    await page.setViewportSize({ width, height });
    await page.goto('/studio/');
    await page.evaluate(() =>
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'instant',
      }),
    );
    await page.waitForTimeout(1800);
    const stage = await page.evaluate(() => {
      const section = document.querySelector('.studio-close')!;
      const image = document.querySelector<HTMLImageElement>(
        '.studio-close__image',
      )!;
      const box = image.getBoundingClientRect();
      const style = getComputedStyle(image);
      // Where the sculpture starts: 42.5% into the picture, which is cropped
      // by the cover fit at the focus point.
      const scale = Math.max(
        box.width / image.naturalWidth,
        box.height / image.naturalHeight,
      );
      const drawn = image.naturalWidth * scale;
      const focus = Number.parseFloat(style.objectPosition) / 100;
      const sculpture = box.left - (drawn - box.width) * focus + drawn * 0.425;
      const right = (selector: string) =>
        document.querySelector(selector)!.getBoundingClientRect().right;
      return {
        height: section.getBoundingClientRect().height,
        fit: style.objectFit,
        alt: image.getAttribute('alt'),
        loaded: image.complete && image.naturalWidth > 0,
        sculpture,
        copyRight: Math.max(
          right('.studio-close__title'),
          right('.studio-close__button'),
        ),
        copyLeft: document
          .querySelector('.studio-close__title')!
          .getBoundingClientRect().left,
        heroLeft: document
          .querySelector('.studio-hero__title')!
          .getBoundingClientRect().left,
        overflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      };
    });
    const label = `${width}x${height}`;
    expect(stage.loaded, label).toBe(true);
    expect(stage.fit, label).toBe('cover');
    expect(stage.alt, label).toBe('');
    expect(stage.height, label).toBeGreaterThanOrEqual(height * 0.9 - 1);
    // The copy stays on the black, clear of the sculpture, on the hero's edge.
    expect(stage.copyRight, label).toBeLessThan(stage.sculpture - 24);
    expect(Math.abs(stage.copyLeft - stage.heroLeft), label).toBeLessThan(2);
    // And the sculpture is well inside the screen.
    expect(stage.sculpture, label).toBeLessThan(width * 0.62);
    expect(stage.overflow, label).toBeLessThanOrEqual(1);
  }
  expect(errors).toEqual([]);
});

test('reduced motion shows the close stage still and complete', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/studio/');
  await scrollToTop(page, '.studio-close', 0);
  await page.waitForTimeout(400);
  await expect(page.locator('.studio-close__media')).toHaveCSS(
    'clip-path',
    'none',
  );
  await expect(page.locator('.studio-close__image')).toHaveCSS(
    'transform',
    'none',
  );
  await expect(page.locator('.studio-close__title')).toHaveCSS('opacity', '1');
  await expect(page.getByRole('link', { name: 'Hablemos' })).toBeVisible();
});

test('the Colmillo orbit travels on wide screens and stays out of the way', async ({
  page,
}, testInfo) => {
  const orbit = page.locator('[data-studio-orbit]');
  await page.goto('/studio/');

  if (testInfo.project.name !== 'fine-1440') {
    // Touch and narrow screens: no journey, only the still ring.
    await expect(orbit).toBeHidden();
    await scrollToTop(page, '.studio-intro__ring', 200);
    await expect(page.locator('.studio-intro__ring-art')).toBeVisible();
    return;
  }

  await expect(page.locator('[data-studio-page]')).toHaveAttribute(
    'data-orbit',
    '',
  );
  await expect(orbit).toHaveCSS('pointer-events', 'none');
  const place = () =>
    orbit.evaluate((element) => {
      const style = getComputedStyle(element);
      const { m41, m42 } = new DOMMatrix(style.transform);
      return { x: m41, y: m42, opacity: Number(style.opacity) };
    });

  // It arrives after the hero's entrance, discreetly.
  await expect.poll(async () => (await place()).opacity).toBeGreaterThan(0.5);
  expect((await place()).opacity).toBeLessThanOrEqual(0.9);
  const hero = await place();

  // At "Somos Colmillo" it lands on the still ring, which steps aside. It
  // docks when the ring is 30% down the screen, above the text.
  const ring = page.locator('.studio-intro__ring');
  await ring.evaluate((element) => {
    const box = element.getBoundingClientRect();
    window.scrollTo({
      top: box.top + window.scrollY + box.height / 2 - window.innerHeight * 0.3,
      behavior: 'instant',
    });
  });
  await page.waitForTimeout(1200);
  const intro = await place();
  const slot = (await ring.boundingBox())!;
  expect(Math.abs(intro.x - (slot.x + slot.width / 2))).toBeLessThan(4);
  expect(Math.abs(intro.y - (slot.y + slot.height / 2))).toBeLessThan(4);
  expect(Math.hypot(intro.x - hero.x, intro.y - hero.y)).toBeGreaterThan(200);
  await expect(page.locator('.studio-intro__ring-art')).toBeHidden();

  // A step of scroll moves it a little, never a jump.
  await page.mouse.wheel(0, 100);
  await page.waitForTimeout(700);
  const after = await place();
  expect(Math.hypot(after.x - intro.x, after.y - intro.y)).toBeLessThan(160);

  // At the end of the page it reaches the close, slips under the photograph
  // and fades out.
  await page.evaluate(() =>
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'instant',
    }),
  );
  await expect
    .poll(async () => (await place()).opacity, { timeout: 4000 })
    .toBeLessThan(0.05);
  // The button under its path still takes the pointer.
  await expect(page.getByRole('link', { name: 'Hablemos' })).toBeVisible();
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
});

test('reduced motion shows no travelling orbit and a still ring', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/studio/');
  await expect(page.locator('[data-studio-orbit]')).toBeHidden();
  await expect(page.locator('[data-studio-page]')).not.toHaveAttribute(
    'data-orbit',
  );
  await scrollToTop(page, '.studio-intro', 0);
  const art = page.locator('.studio-intro__ring-art');
  await expect(art).toBeVisible();
  const box = (await page.locator('.studio-intro__ring').boundingBox())!;
  await page.mouse.move(box.x + 10, box.y + 10, { steps: 4 });
  await page.waitForTimeout(400);
  expect(await art.evaluate((element) => element.style.transform)).toBe('');
});
