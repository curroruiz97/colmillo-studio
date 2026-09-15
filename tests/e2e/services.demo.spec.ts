import { expect, test, type Page } from '@playwright/test';

/*
 * /servicios/ in the demo build (`dist-demo`): the hero, the four provisional
 * service layers and the closing decision.
 */

const SERVICES = ['Estrategia', 'Identidad', 'Digital', 'Contenido'];

/** Fixed chrome that sits above the stack on purpose. */
const CHROME =
  '.edge-menu, .edge-menu *, [class*="ig-badge"], [class*="ig-badge"] *, [data-instagram], [data-instagram] *, .custom-cursor, .custom-cursor *, .skip-link';

async function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

/** Where each stack layer starts in the document, ignoring `sticky`. */
function naturalTops(page: Page) {
  return page.evaluate(() => {
    const layers = [
      ...document.querySelectorAll<HTMLElement>('[data-stack-section]'),
    ];
    const saved = layers.map((layer) => layer.style.position);
    layers.forEach((layer) => (layer.style.position = 'relative'));
    const tops = layers.map((layer) =>
      Math.round(layer.getBoundingClientRect().top + window.scrollY),
    );
    layers.forEach((layer, index) => (layer.style.position = saved[index]!));
    return tops;
  });
}

/** Points where the page itself, not a layer or the footer, is painted. */
function gapsOnScreen(page: Page) {
  return page.evaluate((chrome) => {
    const gaps: string[] = [];
    const xs = [8, innerWidth * 0.5, innerWidth - 48];
    const ys = [2, innerHeight * 0.1, innerHeight * 0.5, innerHeight - 3];
    for (const x of xs)
      for (const y of ys) {
        const top = document
          .elementsFromPoint(x, y)
          .find((element) => !element.matches(chrome));
        if (!top?.closest('[data-stack-section], .site-footer'))
          gaps.push(`${Math.round(x)},${Math.round(y)}:${top?.tagName}`);
      }
    return gaps;
  }, CHROME);
}

test('the page is a hero, four service layers and a closing decision', async ({
  page,
}) => {
  const errors = await collectErrors(page);
  await page.goto('/servicios/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Servicios' }),
  ).toBeVisible();
  expect(
    (await page.locator('main h2').allTextContents()).map((text) =>
      text.trim(),
    ),
  ).toEqual([...SERVICES, 'Ahora toca verlo en acción']);

  // Nothing that makes it look like a mock-up.
  const main = page.locator('main');
  for (const text of ['DEMO FICTICIA', '03 / Servicios', 'S 03', 'pendiente'])
    await expect(main).not.toContainText(text);
  await expect(
    page.locator(
      '.editorial-page__mark, .section-kicker, .section-index, .demo-flag',
    ),
  ).toHaveCount(0);

  // Every service shares one structure; only the variants differ.
  const layers = page.locator('[data-service-layer]');
  await expect(layers).toHaveCount(4);
  for (const [index, title] of SERVICES.entries()) {
    const layer = layers.nth(index);
    await expect(layer.locator('h2')).toHaveText(title);
    await expect(layer.locator('.service-layer__claim')).toHaveCount(1);
    await expect(layer.locator('.service-layer__description')).toHaveCount(1);
    await expect(
      layer.getByRole('list', { name: 'Capacidades' }).getByRole('listitem'),
    ).toHaveCount(5);
    await expect(layer.locator('[data-service-media] img')).toHaveAttribute(
      'alt',
      '',
    );
    // Capabilities are not links, and no placeholder link exists.
    await expect(layer.locator('a')).toHaveCount(0);
  }
  expect(
    await layers.evaluateAll((sections) =>
      sections.map((section) => (section as HTMLElement).dataset.theme),
    ),
  ).toEqual(['light', 'accent', 'dark', 'light']);
  expect(
    await layers.evaluateAll((sections) =>
      sections.map((section) => (section as HTMLElement).dataset.layout),
    ),
  ).toEqual(['text-media', 'media-text', 'text-media', 'media-text']);

  // The hero fills the first screen; its empty media slot carries no text.
  const hero = await page
    .locator('[data-services-hero]')
    .evaluate((element) => ({
      height: element.getBoundingClientRect().height,
      viewport: window.innerHeight,
      frameText: element.querySelector('.services-hero__frame')?.textContent,
    }));
  expect(Math.abs(hero.height - hero.viewport)).toBeLessThanOrEqual(1);
  expect(hero.frameText?.trim()).toBe('');

  await expect(
    page.locator('.edge-menu__list a[aria-current="page"]'),
  ).toHaveAttribute('href', '/servicios/');
  await expect(
    page.getByRole('link', { name: 'Ver proyectos', exact: true }),
  ).toHaveAttribute('href', '/proyectos/');
  await expect(
    page.getByRole('link', { name: 'Hablemos', exact: true }),
  ).toHaveAttribute('href', '/contacto/');

  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);
});

test('the hero loop plays whole, silent and without controls', async ({
  page,
}, testInfo) => {
  const errors = await collectErrors(page);
  await page.goto('/servicios/');

  const video = page.locator('[data-services-hero] video');
  await expect(video).toHaveCount(1);
  await expect(video.locator('source')).toHaveAttribute(
    'src',
    '/assets/services/video%20hero%20servicios.mp4',
  );
  await expect
    .poll(() =>
      video.evaluate(
        (element: HTMLVideoElement) =>
          element.readyState >= 3 && !element.paused,
      ),
    )
    .toBe(true);

  const state = await video.evaluate((element: HTMLVideoElement) => {
    const box = element.getBoundingClientRect();
    const title = document
      .querySelector('[data-services-hero-title]')!
      .getBoundingClientRect();
    return {
      controls: element.controls || element.hasAttribute('controls'),
      flags: [
        element.autoplay,
        element.loop,
        element.muted,
        element.playsInline,
      ],
      fit: getComputedStyle(element).objectFit,
      ratio: box.width / box.height,
      box: {
        left: box.left,
        right: box.right,
        top: box.top,
        bottom: box.bottom,
      },
      share: box.width / innerWidth,
      title: { right: title.right, bottom: title.bottom },
      viewport: { width: innerWidth, height: innerHeight },
    };
  });
  expect(state.controls).toBe(false);
  expect(state.flags).toEqual([true, true, true, true]);

  // Whole: the frame keeps the file's 16:9 and stays inside the screen.
  expect(state.fit).toBe('contain');
  expect(Math.abs(state.ratio - 16 / 9)).toBeLessThan(0.01);
  expect(state.box.left).toBeGreaterThanOrEqual(0);
  expect(state.box.right).toBeLessThanOrEqual(state.viewport.width);
  expect(state.box.top).toBeGreaterThanOrEqual(0);
  expect(state.box.bottom).toBeLessThanOrEqual(state.viewport.height);

  if (testInfo.project.name === 'fine-1440') {
    // Beside the title, with more than half of the screen's width.
    expect(state.box.left).toBeGreaterThan(state.title.right);
    expect(state.share).toBeGreaterThan(0.5);
  } else {
    // Under the title, close to the screen's full width.
    expect(state.box.top).toBeGreaterThan(state.title.bottom);
    expect(state.share).toBeGreaterThan(0.8);
  }
  expect(errors).toEqual([]);
});

test('each layer rises over the previous one and never shows a gap', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440', 'the stack is wide-only');
  // A sweep of the whole page: slower than one screen of assertions.
  test.setTimeout(90_000);
  const errors = await collectErrors(page);
  await page.goto('/servicios/');
  await page.waitForTimeout(600);

  const positions = await page
    .locator('[data-stack-section]')
    .evaluateAll((sections) =>
      sections.map((section) => getComputedStyle(section).position),
    );
  expect(positions).toEqual(Array(6).fill('sticky'));

  const tops = await naturalTops(page);
  const viewport = page.viewportSize()!.height;
  const bottom = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight,
  );

  // A sweep through the whole stack, and fast jumps across it.
  const gaps: string[] = [];
  for (let y = 0; y <= bottom; y += Math.round(viewport * 0.16)) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(90);
    gaps.push(...(await gapsOnScreen(page)).map((gap) => `${y} ${gap}`));
  }
  for (const y of [bottom, 0, bottom / 2, bottom * 0.8, 0]) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(150);
    gaps.push(...(await gapsOnScreen(page)).map((gap) => `jump ${gap}`));
  }
  expect(gaps).toEqual([]);

  // Halfway through its rise Identidad is a rounded band over a compressed
  // Estrategia; at rest it covers the screen.
  const identity = page.locator('#servicio-identidad');
  await page.evaluate((y) => window.scrollTo(0, y), tops[2]! - viewport / 2);
  await page.waitForTimeout(1000);
  const rising = await identity.evaluate((section) => ({
    clip: section.style.clipPath,
    under: (
      section.previousElementSibling as HTMLElement
    ).querySelector<HTMLElement>('[data-stack-content]')?.style.transform,
  }));
  expect(rising.clip).toMatch(/^inset\((?!0px 0%)/);
  expect(rising.under).toContain('scale');

  await page.evaluate((y) => window.scrollTo(0, y), tops[2]! + 40);
  await page.waitForTimeout(1600);
  expect(
    await identity.evaluate((section) =>
      Math.round(section.getBoundingClientRect().top),
    ),
  ).toBe(0);
  await expect(page.locator('html')).toHaveAttribute(
    'data-surface-tone',
    'accent',
  );

  // The plates alternate sides and share one size. Sizes are layout sizes:
  // a covered layer's content is scaled by the stack's compression.
  const plates = await page
    .locator('[data-service-layer]')
    .evaluateAll((sections) =>
      sections.map((section) => {
        const frame = section.querySelector<HTMLElement>(
          '.service-layer__frame',
        )!;
        const box = frame.getBoundingClientRect();
        return {
          side: box.left + box.width / 2 > innerWidth / 2 ? 'right' : 'left',
          width: frame.offsetWidth,
          height: frame.offsetHeight,
        };
      }),
    );
  expect(plates.map((plate) => plate.side)).toEqual([
    'right',
    'left',
    'right',
    'left',
  ]);
  for (const plate of plates) {
    expect(Math.abs(plate.width - plates[0]!.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(plate.height - plates[0]!.height)).toBeLessThanOrEqual(1);
  }
  // The shared cursor stays visible on the orange.
  expect(
    await page
      .locator('.custom-cursor__shape')
      .evaluate((shape) => getComputedStyle(shape).borderColor),
  ).toBe('rgb(18, 16, 15)');
  expect(errors).toEqual([]);
});

test('every layer’s content arrives and stays readable', async ({ page }) => {
  await page.goto('/servicios/');
  const tops = await naturalTops(page);
  for (const top of tops) {
    await page.evaluate((y) => window.scrollTo(0, y), top + 40);
    await page.waitForTimeout(250);
  }
  // Read one after another, the plates sit under their copy.
  for (const media of await page.locator('[data-service-media]').all()) {
    await media.scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(1600);
  const hidden = await page
    .locator(
      '[data-service-reveal], [data-service-detail], [data-service-media], [data-close-reveal]',
    )
    .evaluateAll(
      (elements) =>
        elements.filter(
          (element) => Number(getComputedStyle(element).opacity) < 0.99,
        ).length,
    );
  expect(hidden).toBe(0);
});

test('narrow screens read the layers one after another', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === 'fine-1440', 'touch layouts only');
  await page.goto('/servicios/');
  const layers = await page
    .locator('.service-layer, .services-close')
    .evaluateAll((sections) =>
      sections.map((section) => {
        const style = getComputedStyle(section);
        return {
          position: style.position,
          clip: style.clipPath,
          radius: Number.parseFloat(style.borderTopLeftRadius),
          overlap: Number.parseFloat(style.marginTop),
        };
      }),
    );
  for (const layer of layers) {
    expect(layer.position).toBe('relative');
    expect(layer.clip).toBe('none');
    expect(layer.radius).toBeGreaterThan(0);
    // Tucked under the previous layer, so its rounded top shows that surface.
    expect(layer.overlap).toBeLessThan(0);
  }

  const bottom = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight,
  );
  const gaps: string[] = [];
  for (let y = 0; y <= bottom; y += 300) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(60);
    gaps.push(...(await gapsOnScreen(page)));
  }
  expect(gaps).toEqual([]);
});

test('reduced motion keeps plain layers and every piece of content', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name === 'touch-834');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/servicios/');

  const state = await page.evaluate(() => ({
    positions: [
      ...new Set(
        [...document.querySelectorAll('[data-stack-section]')].map(
          (section) => getComputedStyle(section).position,
        ),
      ),
    ],
    holds: [...document.querySelectorAll('.service-layer')].map(
      (section) => getComputedStyle(section).marginBottom,
    ),
    heroEntrance: getComputedStyle(
      document.querySelector('[data-services-hero-title]')!,
    ).animationName,
  }));
  expect(state.positions).toEqual(['relative']);
  expect(state.holds).toEqual(['0px', '0px', '0px', '0px']);
  expect(state.heroEntrance).toBe('none');
  // The hero loop rests on its poster frame.
  await expect
    .poll(() =>
      page
        .locator('[data-services-hero] video')
        .evaluate((video: HTMLVideoElement) => video.paused),
    )
    .toBe(true);

  const bottom = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  for (let y = 0; y <= bottom; y += 400) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(800);
  const hidden = await page
    .locator(
      '[data-service-reveal], [data-service-detail], [data-service-media], [data-close-reveal]',
    )
    .evaluateAll(
      (elements) =>
        elements.filter(
          (element) => Number(getComputedStyle(element).opacity) < 0.99,
        ).length,
    );
  expect(hidden).toBe(0);
});

test('capabilities and the two paths answer a fine pointer', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'fine-1440', 'hover needs a mouse');
  await page.goto('/servicios/');
  const tops = await naturalTops(page);
  await page.evaluate((y) => window.scrollTo(0, y), tops[1]! + 40);
  await page.waitForTimeout(1600);

  const capability = page.locator('#servicio-estrategia .service-cap').nth(1);
  await capability.hover();
  await page.waitForTimeout(600);
  expect(
    await capability.evaluate((row) => ({
      text: getComputedStyle(row.querySelector('.service-cap__text')!)
        .translate,
      mark: getComputedStyle(row.querySelector('.service-cap__mark')!).scale,
      art: getComputedStyle(
        row
          .closest('[data-service-layer]')!
          .querySelector('.page-media__asset')!,
      ).translate,
    })),
  ).toEqual({ text: '5px', mark: '1', art: '0px -6px' });

  await page.evaluate((y) => window.scrollTo(0, y), tops.at(-1)! + 10);
  await page.waitForTimeout(1600);
  const projects = page.getByRole('link', {
    name: 'Ver proyectos',
    exact: true,
  });
  // Orange on a cream slab; hovering presses it part of the way in.
  expect(
    await projects.evaluate((link) => ({
      background: getComputedStyle(link).backgroundColor,
      translate: getComputedStyle(link).translate,
    })),
  ).toEqual({ background: 'rgb(205, 87, 48)', translate: 'none' });
  await projects.hover();
  await page.waitForTimeout(500);
  expect(
    await projects.evaluate((link) => getComputedStyle(link).translate),
  ).toBe('0px 3.52px');
});

test('the close is a full scene with its copy in the empty centre', async ({
  page,
}) => {
  const errors = await collectErrors(page);
  await page.goto('/servicios/');
  const tops = await naturalTops(page);
  for (const top of tops) {
    await page.evaluate((y) => window.scrollTo(0, y), top + 10);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(1800);

  const scene = await page
    .locator('[data-services-close]')
    .evaluate((close) => {
      const box = (selector: string) =>
        close.querySelector(selector)!.getBoundingClientRect();
      const section = close.getBoundingClientRect();
      const images = [
        ...close.querySelectorAll<HTMLImageElement>('.services-close__image'),
      ];
      return {
        height: section.height,
        viewport: innerHeight,
        width: section.width,
        images: images.map((image) => ({
          alt: image.alt,
          loaded: image.complete && image.naturalWidth > 0,
        })),
        scene: box('[data-close-scene]'),
        section,
        title: box('.services-close__title'),
        actions: box('.services-close__actions'),
        titleOpacity: getComputedStyle(
          close.querySelector('.services-close__title')!,
        ).opacity,
      };
    });

  // Edge to edge and at least a screen tall.
  expect(scene.height).toBeGreaterThanOrEqual(scene.viewport - 1);
  expect(Math.round(scene.scene.left)).toBeLessThanOrEqual(0);
  expect(Math.round(scene.scene.right)).toBeGreaterThanOrEqual(scene.width);
  expect(scene.images).toEqual([
    { alt: '', loaded: true },
    { alt: '', loaded: true },
  ]);
  // The copy is centred in the section and fully arrived.
  const centre = scene.section.left + scene.section.width / 2;
  expect(
    Math.abs(scene.title.left + scene.title.width / 2 - centre),
  ).toBeLessThanOrEqual(24);
  expect(
    Math.abs(scene.actions.left + scene.actions.width / 2 - centre),
  ).toBeLessThanOrEqual(24);
  expect(scene.actions.top).toBeGreaterThan(scene.title.bottom);
  expect(scene.titleOpacity).toBe('1');

  await expect(
    page.getByRole('link', { name: 'Ver proyectos', exact: true }),
  ).toBeInViewport();
  await expect(
    page.getByRole('link', { name: 'Hablemos', exact: true }),
  ).toBeInViewport();
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);
});
