import { expect, test, type Page } from '@playwright/test';
import { homeIntro } from '../../src/config/intro';

// The home entry intro has its own spec (intro.spec.ts); here it would only
// cover the page for its first seconds, so every test starts as a return visit.
test.beforeEach(async ({ page }) => {
  await page.addInitScript((key) => {
    sessionStorage.setItem(key, 'true');
  }, homeIntro.storageKey);
});

/** Width of the closed tab that is actually inside the viewport. */
async function visibleTabWidth(page: Page): Promise<number> {
  return page.locator('[data-edge-tab]').evaluate((tab) => {
    const rect = tab.getBoundingClientRect();
    return document.documentElement.clientWidth - rect.left;
  });
}

/** Vertical centre of the closed tab, in viewport pixels. */
async function tabCentre(page: Page): Promise<number> {
  return page.locator('[data-edge-tab]').evaluate((tab) => {
    const rect = tab.getBoundingClientRect();
    return rect.top + rect.height / 2;
  });
}

const APPROVED_INSTAGRAM = 'https://www.instagram.com/colmillo.studio/';

test('the home foundation publishes only approved contact channels', async ({
  page,
}) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Colmillo Studio' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Haz que tu marca muerda' }),
  ).toHaveAttribute('href', '#contacto');
  await expect(page.locator('#contacto')).toHaveCount(1);
  await expect(page.locator('a[href="#"]')).toHaveCount(0);

  const approvedMail = 'mailto:hola@colmillostudio.com';
  const approvedInstagram = 'https://www.instagram.com/colmillo.studio/';

  // The contact section publishes both approved channels in the document flow.
  const contactSection = page.locator('#contacto');
  await expect(
    contactSection.locator(`a[href="${approvedMail}"]`),
  ).toBeVisible();
  await expect(
    contactSection.locator(`a[href="${approvedInstagram}"]`),
  ).toBeVisible();

  // Every published channel must be one of the approved destinations.
  const mailHrefs = await page
    .locator('a[href^="mailto:"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  expect(new Set(mailHrefs)).toEqual(new Set([approvedMail]));

  // No telephone number has been supplied yet, so none may be published.
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
});

test('the standard production artifact excludes every demo route and marker', async ({
  page,
}) => {
  const response = await page.goto('/proyectos/demo-fauce-elastica/');
  expect(response?.status()).toBe(404);
  await expect(page.getByText('DEMO FICTICIA — NO PUBLICAR')).toHaveCount(0);

  await page.goto('/proyectos/');
  await expect(page.locator('[data-project-item]')).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText('Fauce Elástica');
  await expect(page.locator('body')).not.toContainText('Pulso Molar');
  await expect(page.locator('body')).not.toContainText('Rastro Naranja');
});

test('the hero publishes the official loop over a full first screen', async ({
  page,
}) => {
  await page.goto('/');

  // The approved client loop, with both responsive sources and a poster.
  const video = page.locator('.hero__media');
  await expect(video).toHaveCount(1);
  await expect(video).toHaveAttribute(
    'poster',
    /hero-final-poster-white\.webp$/,
  );
  await expect(video).toHaveAttribute('muted', '');
  await expect(video).toHaveAttribute('playsinline', '');
  await expect(video).toHaveAttribute('loop', '');
  const sources = await video
    .locator('source')
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('src')));
  // The white-paper derivatives, matching the white surface behind them.
  expect(sources).toEqual([
    '/assets/motion/hero/hero-final-mobile-white.webm',
    '/assets/motion/hero/hero-final-mobile-white.mp4',
    '/assets/motion/hero/hero-final-desktop-white.webm',
    '/assets/motion/hero/hero-final-desktop-white.mp4',
  ]);

  // The loop is decorative: it carries no name into the accessibility tree.
  await expect(video).toHaveAttribute('aria-hidden', 'true');

  // White canvas; the ring and the scroll dot carry the brand orange.
  await expect(page.locator('.hero')).toHaveCSS(
    'background-color',
    'rgb(255, 255, 255)',
  );
  await expect(page.locator('.hero__media-frame')).toHaveCSS(
    'background-color',
    'rgb(255, 255, 255)',
  );
  await expect(page.locator('.hero__shape--ring')).toHaveCSS(
    'border-top-color',
    'rgb(205, 87, 48)',
  );
  await expect(page.locator('.hero__scroll-dot')).toHaveCSS(
    'background-color',
    'rgb(205, 87, 48)',
  );

  // The provisional kinetic composition and its notice are gone for good.
  await expect(page.locator('[data-hero-stage]')).toHaveCount(0);
  await expect(page.locator('.hero')).not.toContainText('fallback provisional');

  const size = await page.locator('[data-hero]').evaluate((hero) => ({
    height: hero.getBoundingClientRect().height,
    viewport: window.innerHeight,
  }));
  expect(size.height).toBeGreaterThanOrEqual(size.viewport);
});

test('a loop a browser refuses to start plays at the first gesture', async ({
  page,
}) => {
  /*
   * What iOS Low Power Mode, Chrome's Data Saver and Safari's per-site
   * "Auto-Play: Never" do to a silent loop: the `autoplay` attribute is
   * ignored and every `play()` outside a gesture is refused, so the element
   * is left on its poster under the platform's own start badge — the mobile
   * defect the client reported on 2026-09-22. `VideoLoop.ts` keeps the
   * refused loop and retries it at the first gesture, which is where this
   * asserts it: no control of ours, and none of theirs either.
   */
  await page.addInitScript(() => {
    const play = HTMLMediaElement.prototype.play;
    let unlocked = false;
    const unlock = () => {
      unlocked = true;
    };
    for (const gesture of ['pointerdown', 'touchstart', 'keydown'])
      window.addEventListener(gesture, unlock, { capture: true });
    // The attribute is refused as well, so nothing runs before the gesture.
    document.addEventListener(
      'play',
      (event) => {
        if (!unlocked && event.target instanceof HTMLMediaElement)
          event.target.pause();
      },
      true,
    );
    HTMLMediaElement.prototype.play = function play_() {
      return unlocked
        ? play.call(this)
        : Promise.reject(new DOMException('blocked', 'NotAllowedError'));
    };
  });

  await page.goto('/');
  const video = page.locator('.hero__media');
  await expect(video).toHaveJSProperty('paused', true);

  // Any gesture at all, wherever the visitor makes it.
  await page.keyboard.press('Tab');
  await expect(video).toHaveJSProperty('paused', false);
  await expect
    .poll(() =>
      video.evaluate((node) => (node as HTMLVideoElement).currentTime),
    )
    .toBeGreaterThan(0);
});

test('essential routes render', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });

  const routes = [
    ['/studio/', 'Studio'],
    ['/servicios/', 'Servicios'],
    ['/proyectos/', 'Proyectos'],
    ['/contacto/', 'Cuéntanos qué tienes entre manos'],
    ['/aviso-legal/', 'Aviso legal'],
    ['/privacidad/', 'Privacidad'],
    ['/cookies/', 'Cookies'],
  ] as const;

  for (const [route, heading] of routes) {
    await page.goto(route);
    await expect(
      page.getByRole('heading', { level: 1, name: heading }),
    ).toBeVisible();
  }

  expect(consoleErrors).toEqual([]);
});

test('skip navigation and keyboard focus are available', async ({
  page,
  isMobile,
}) => {
  test.skip(
    isMobile,
    'Mobile Chromium emulates touch navigation rather than hardware Tab focus.',
  );

  await page.goto('/');
  await page.keyboard.press('Tab');

  const skipLink = page.getByRole('link', { name: 'Saltar al contenido' });
  await expect(skipLink).toBeFocused();
  await skipLink.press('Enter');
  await expect(page.locator('#contenido')).toBeFocused();
});

test('the native scrollbar is hidden but scrolling still works', async ({
  page,
}) => {
  await page.goto('/');

  // Hidden, not merely thin: the layout viewport is the whole viewport, so the
  // page meets the right edge with nothing reserved beside it.
  expect(
    await page.evaluate(
      () => window.innerWidth - document.documentElement.clientWidth,
    ),
  ).toBe(0);

  // The document is still a scroll container.
  expect(
    await page.evaluate(
      () => document.documentElement.scrollHeight > window.innerHeight,
    ),
  ).toBe(true);

  const viewport = page.viewportSize();
  expect(viewport).not.toBeNull();

  // Wheel and trackpad.
  await page.mouse.move(viewport!.width / 2, viewport!.height / 2);
  await page.mouse.wheel(0, 800);
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);

  // Keyboard.
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.locator('main').focus();
  await page.keyboard.press('PageDown');
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);

  // Programmatic and anchor scrolling.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() =>
    document
      .querySelector('#contacto')!
      .scrollIntoView({ block: 'center', behavior: 'instant' }),
  );
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);

  // Hiding the indicator must not have introduced horizontal overflow.
  expect(
    await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(0);
});

test('the closed edge menu is a single small orange tab', async ({ page }) => {
  await page.goto('/');

  // No spine, no progress readout and no visible label outside the panel.
  await expect(page.locator('.edge-menu__spine')).toHaveCount(0);
  await expect(page.locator('[data-edge-current]')).toHaveCount(0);
  await expect(page.locator('[data-edge-tab]')).toHaveText('');
  await expect(page.locator('[data-edge-tab]')).toHaveCSS(
    'background-color',
    'rgb(205, 87, 48)',
  );

  // The summary keeps an accessible name even though nothing is written on it.
  await expect(page.getByRole('group').locator('summary')).toHaveAccessibleName(
    /Menú/,
  );

  // It is pressed against the edge and only a sliver of it is inside.
  const visible = await visibleTabWidth(page);
  expect(visible).toBeGreaterThan(0);
  expect(visible).toBeLessThanOrEqual(44);
});

test('the edge menu works with pointer and keyboard', async ({ page }) => {
  await page.goto('/');

  const menu = page.locator('[data-edge-menu]');
  const disclosure = page.locator('[data-edge-disclosure]');
  const trigger = page.locator('[data-edge-trigger]');

  await expect(menu).toHaveAttribute('data-state', 'closed');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toHaveAttribute('aria-controls', 'site-menu-panel');

  await trigger.click();
  await expect(disclosure).toHaveAttribute('open', '');
  await expect(menu).toHaveAttribute('data-state', 'open');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(menu.getByRole('link', { name: /Contacto/ })).toBeVisible();
  await expect(page.locator('body')).toHaveAttribute('data-menu-open', 'true');
  await expect(page.locator('main')).toHaveJSProperty('inert', true);
  // The archive link and the motion toggle were retired from the panel.
  await expect(page.locator('[data-motion-toggle]')).toHaveCount(0);
  await expect(
    menu.getByText(/Ver archivo completo|Ver proyectos|Reducir movimiento/),
  ).toHaveCount(0);

  await page.keyboard.press('Escape');
  await expect(disclosure).not.toHaveAttribute('open', '');
  await expect(menu).toHaveAttribute('data-state', 'closed');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('main')).toHaveJSProperty('inert', false);
  await expect(trigger).toBeFocused();
});

test('the edge menu closes from the rail and from outside the panel', async ({
  page,
}) => {
  const menu = page.locator('[data-edge-menu]');
  const trigger = page.locator('[data-edge-trigger]');

  await page.goto('/');

  // The same handle that opened it closes it again.
  await trigger.click();
  await expect(menu).toHaveAttribute('data-state', 'open');
  await trigger.click();
  await expect(menu).toHaveAttribute('data-state', 'closed');

  // Clicking outside the panel closes it too.
  await trigger.click();
  await expect(menu).toHaveAttribute('data-state', 'open');
  await page.locator('[data-edge-close]').click({ position: { x: 40, y: 40 } });
  await expect(menu).toHaveAttribute('data-state', 'closed');
  await expect(page.locator('main')).toHaveJSProperty('inert', false);
  await expect(page.locator('body')).not.toHaveAttribute(
    'data-menu-open',
    'true',
  );
});

test('the edge tab stays brand orange under the cursor', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'Hover styling is a fine-pointer concern.');

  // `--color-brand-orange`, #cd5730.
  const ORANGE = 'rgb(205, 87, 48)';
  const INK = 'rgb(18, 16, 15)';

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');

  const menu = page.locator('[data-edge-menu]');
  const tab = page.locator('[data-edge-tab]');
  const closer = page.locator('[data-edge-closer]');

  // Closed and tracking: the tab is brand orange, so hovering changes no
  // colour. Its reach into the page is the response.
  await expect(tab).toHaveCSS('background-color', ORANGE);
  await tab.hover();
  await expect(menu).toHaveAttribute('data-state', 'tracking');
  await expect(tab).toHaveCSS('background-color', ORANGE);

  // Open, the tab becomes an outlined ink close control; hovering fills it
  // with the same brand orange rather than any other accent.
  await tab.click();
  await expect(menu).toHaveAttribute('data-state', 'open');
  await closer.hover();
  await expect(closer).toHaveCSS('background-color', ORANGE);
  await expect(closer).toHaveCSS('color', INK);
});

test('the edge tab keeps its orange over the surfaces this build paints', async ({
  page,
}) => {
  const ORANGE = 'rgb(205, 87, 48)';
  const tab = page.locator('[data-edge-tab]');

  /*
   * Since `/contacto/` was rebuilt (2026-09-16) no section of the standard
   * build paints a field of brand orange: every surface is white, ink or
   * charcoal, so the tab is orange everywhere here and never has to turn ink.
   * The case where it does — the orange `Identidad` layer of `/servicios/` —
   * only exists in the demonstration build and is covered by
   * `demo.spec.ts`.
   */
  await page.goto('/contacto/');
  await expect(page.locator('[data-edge-menu]')).not.toHaveAttribute(
    'data-tab-tone',
    'accent',
  );
  await expect(tab).toHaveCSS('background-color', ORANGE);

  // Over the white brief that rises onto the charcoal hero, unchanged.
  await page.locator('[data-contact-brief]').evaluate((section) => {
    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY,
      behavior: 'instant',
    });
  });
  await expect(tab).toHaveCSS('background-color', ORANGE);

  // On the white home it stays orange.
  await page.goto('/');
  await expect(tab).toHaveCSS('background-color', ORANGE);
});

test('menu routes are written in sentence case', async ({ page }) => {
  await page.goto('/');
  const labels = page.locator('.edge-menu__list strong');
  await expect(labels.first()).toHaveCSS('text-transform', 'none');
  expect(await labels.allTextContents()).toEqual([
    'Inicio',
    'Studio',
    'Servicios',
    'Proyectos',
    'Contacto',
  ]);
});

test('the active route follows the URL, never the home scroll', async ({
  page,
}) => {
  const current = page.locator('.edge-menu__list a[aria-current="page"]');

  await page.goto('/');
  await expect(current).toHaveCount(1);
  await expect(current).toHaveAttribute('href', '/');
  // Scrolling through the home sections that share a route's name leaves
  // "Inicio" active.
  // Sections withheld from the standard build are skipped.
  for (const id of ['studio', 'servicios', 'proyectos', 'contacto']) {
    const section = page.locator(`main #${id}`).first();
    if ((await section.count()) === 0) continue;
    await section.evaluate((section) =>
      section.scrollIntoView({ block: 'center', behavior: 'instant' }),
    );
    await page.waitForTimeout(250);
    await expect(current).toHaveAttribute('href', '/');
  }
  await expect(page.locator('.edge-menu__list a[aria-current]')).toHaveCount(1);

  for (const route of [
    '/studio/',
    '/servicios/',
    '/proyectos/',
    '/contacto/',
  ] as const) {
    await page.goto(route);
    await expect(current).toHaveCount(1);
    await expect(current).toHaveAttribute('href', route);
  }
});

test('the edge panel lists routes and channels without numbers or legal links', async ({
  page,
}) => {
  await page.goto('/');
  const panel = page.locator('[data-edge-panel]');

  // No route numbers, no `01 / 05` readout and no legal line in the panel;
  // the footer keeps the legal links.
  await expect(panel.locator('[data-edge-position]')).toHaveCount(0);
  await expect(panel.locator('.edge-menu__index')).toHaveCount(0);
  await expect(panel.locator('a[href="/aviso-legal/"]')).toHaveCount(0);
  await expect(panel.locator('a[href="/privacidad/"]')).toHaveCount(0);
  await expect(panel.locator('a[href="/cookies/"]')).toHaveCount(0);
  await expect(
    page.locator('.site-footer a[href="/aviso-legal/"]'),
  ).toHaveCount(1);

  const mail = panel.locator('.edge-menu__channels a[href^="mailto:"]');
  await expect(mail).toHaveAttribute('href', 'mailto:hola@colmillostudio.com');
  await expect(mail).not.toHaveAttribute('target', /.+/);

  const instagram = panel.locator(
    '.edge-menu__channels a[href="https://www.instagram.com/colmillo.studio/"]',
  );
  await expect(instagram).toHaveAttribute('target', '_blank');
  await expect(instagram).toHaveAttribute('rel', 'noopener noreferrer');

  // The channels are their names only, side by side.
  await expect(mail.locator('.edge-menu__channel-label')).toHaveText('Correo');
  await expect(instagram.locator('.edge-menu__channel-label')).toHaveText(
    'Instagram',
  );
  await expect(panel.locator('.edge-menu__foot')).not.toContainText('hola@');
  await expect(panel.locator('.edge-menu__foot')).not.toContainText(
    '@colmillo.studio',
  );
});

test('the closed edge menu keeps the panel out of reach', async ({ page }) => {
  await page.goto('/');

  const panel = page.locator('[data-edge-panel]');
  // Hidden rather than merely off-screen, so it leaves the tab order and the
  // accessibility tree while the menu is closed.
  await expect(panel).toBeHidden();
  await expect(panel).toHaveCSS('visibility', 'hidden');
});

test('the edge tab stays anchored to the right edge at mid-height', async ({
  page,
  isMobile,
}) => {
  test.skip(
    isMobile,
    'The explicit viewport matrix runs once in desktop Chromium.',
  );

  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 1440, height: 1000 },
    { width: 1366, height: 768 },
    { width: 834, height: 1112 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');

    const geometry = await page.locator('[data-edge-tab]').evaluate((tab) => {
      const rect = tab.getBoundingClientRect();
      return {
        edge: document.documentElement.clientWidth,
        right: rect.right,
        visible: document.documentElement.clientWidth - rect.left,
        centre: rect.top + rect.height / 2,
      };
    });

    // Translated outwards, so only a sliver is inside the viewport while the
    // menu is closed. The rest waits off-screen.
    expect(geometry.right).toBeGreaterThan(geometry.edge);
    expect(geometry.visible).toBeGreaterThan(0);
    expect(geometry.visible).toBeLessThanOrEqual(24);
    // Its resting place is the middle of the viewport.
    expect(Math.abs(geometry.centre - viewport.height / 2)).toBeLessThanOrEqual(
      2,
    );
  }
});

test('the edge tab follows the pointer vertically near the edge', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'Tracking is a fine-pointer enhancement.');

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');

  const menu = page.locator('[data-edge-menu]');
  const closedWidth = await visibleTabWidth(page);

  // Far from the edge nothing happens.
  await page.mouse.move(200, 500);
  await expect(menu).toHaveAttribute('data-state', 'closed');

  // Near the edge the tab reaches further in and follows Y, never X.
  await page.mouse.move(1420, 300, { steps: 3 });
  await expect(menu).toHaveAttribute('data-state', 'tracking');
  await expect
    .poll(() => visibleTabWidth(page))
    .toBeGreaterThan(closedWidth * 1.5);
  await expect.poll(() => tabCentre(page)).toBeLessThan(310);
  await expect.poll(() => tabCentre(page)).toBeGreaterThan(290);

  await page.mouse.move(1420, 800, { steps: 3 });
  await expect.poll(() => tabCentre(page)).toBeGreaterThan(790);

  // It never climbs into the Instagram control's band.
  await page.mouse.move(1420, 4, { steps: 3 });
  const exclusion = await page
    .locator('[data-instagram]')
    .evaluate((badge) => badge.getBoundingClientRect().bottom);
  await expect
    .poll(() =>
      page
        .locator('[data-edge-tab]')
        .evaluate((tab) => tab.getBoundingClientRect().top),
    )
    .toBeGreaterThan(exclusion);

  // Leaving the zone returns it to rest at mid-height.
  await page.mouse.move(600, 500, { steps: 3 });
  await expect(menu).toHaveAttribute('data-state', 'closed');
  await expect.poll(() => tabCentre(page)).toBeGreaterThan(495);
  await expect.poll(() => tabCentre(page)).toBeLessThan(505);
});

test('the close control retracts after a pause and returns on approach', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'Retraction depends on a hovering pointer.');

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');

  const menu = page.locator('[data-edge-menu]');
  await page.locator('[data-edge-tab]').click();
  await expect(menu).toHaveAttribute('data-close', 'expanded');

  // Away from the control it recedes to a sliver after the hold.
  await page.mouse.move(400, 500);
  await expect(menu).toHaveAttribute('data-close', 'collapsed', {
    timeout: 5000,
  });
  // The attribute changes before the slide ends, so wait for it to settle.
  const sliver = () =>
    page
      .locator('[data-edge-closer]')
      .evaluate(
        (closer) =>
          document.documentElement.clientWidth -
          closer.getBoundingClientRect().left,
      );
  await expect.poll(sliver).toBeLessThanOrEqual(12.5);
  expect(await sliver()).toBeGreaterThan(0);

  // Approaching the edge brings it back, and it stays while the pointer does.
  await page.mouse.move(1420, 500, { steps: 3 });
  await expect(menu).toHaveAttribute('data-close', 'expanded');
  await page.waitForTimeout(3000);
  await expect(menu).toHaveAttribute('data-close', 'expanded');

  // Keyboard focus brings it back too.
  await page.mouse.move(400, 500);
  await expect(menu).toHaveAttribute('data-close', 'collapsed', {
    timeout: 4000,
  });
  await page.locator('[data-edge-trigger]').focus();
  await expect(menu).toHaveAttribute('data-close', 'expanded');

  // Escape always closes.
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('data-state', 'closed');
  await expect(menu).not.toHaveAttribute('data-close');
});

test('the open menu sets a blurred backdrop that closes it', async ({
  page,
  isMobile,
}) => {
  test.skip(
    isMobile,
    'On a phone the panel is full width, so no backdrop is left to click.',
  );
  await page.goto('/');
  const scrim = page.locator('[data-edge-close]');

  // Closed, the backdrop never intercepts the page.
  await expect(scrim).toHaveCSS('pointer-events', 'none');

  await page.locator('[data-edge-trigger]').click();
  await expect(scrim).toHaveCSS('pointer-events', 'auto');
  await expect(scrim).toHaveCSS('backdrop-filter', 'blur(6px)');
  await expect
    .poll(() => scrim.evaluate((s) => getComputedStyle(s).opacity))
    .toBe('1');

  await scrim.click({ position: { x: 20, y: 20 } });
  await expect(page.locator('[data-edge-menu]')).toHaveAttribute(
    'data-state',
    'closed',
  );
});

test('an open edge menu ignores pointer proximity', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'Tracking is a fine-pointer enhancement.');

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await page.locator('[data-edge-trigger]').click();
  await expect(page.locator('[data-edge-menu]')).toHaveAttribute(
    'data-state',
    'open',
  );

  // Moving away from the edge must not retract an open panel.
  await page.mouse.move(120, 400);
  await page.mouse.move(80, 700);
  await expect(page.locator('[data-edge-menu]')).toHaveAttribute(
    'data-state',
    'open',
  );
});

test('opening the menu locks scrolling without moving the layout', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('#contacto').scrollIntoViewIfNeeded();

  const read = () =>
    page.evaluate(() => {
      const footer = document.querySelector('.site-footer')!;
      const rect = footer.getBoundingClientRect();
      return {
        y: window.scrollY,
        left: rect.left,
        right: rect.right,
        overflowY: getComputedStyle(document.body).overflowY,
        lockGutter: document.body.style.getPropertyValue(
          '--scroll-lock-gutter',
        ),
      };
    });

  const before = await read();

  await page.locator('[data-edge-trigger]').click();
  await expect(page.locator('[data-edge-menu]')).toHaveAttribute(
    'data-state',
    'open',
  );

  const during = await read();
  expect(during.overflowY).toBe('hidden');
  expect(Math.abs(during.y - before.y)).toBeLessThanOrEqual(1);
  expect(Math.abs(during.left - before.left)).toBeLessThanOrEqual(1);
  expect(Math.abs(during.right - before.right)).toBeLessThanOrEqual(1);

  await page.keyboard.press('Escape');
  const after = await read();
  expect(after.overflowY).not.toBe('hidden');
  expect(after.lockGutter).toBe('');
  expect(Math.abs(after.y - before.y)).toBeLessThanOrEqual(1);
});

test('every navigation label stays on a single line', async ({
  page,
  isMobile,
}) => {
  test.skip(
    isMobile,
    'The explicit viewport matrix runs once in desktop Chromium.',
  );

  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 1440, height: 900 },
    { width: 1366, height: 768 },
    { width: 1024, height: 1366 },
    { width: 768, height: 1024 },
    { width: 430, height: 932 },
    { width: 390, height: 844 },
    { width: 320, height: 720 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    await page.locator('[data-edge-trigger]').click();
    await expect(page.locator('[data-edge-menu]')).toHaveAttribute(
      'data-state',
      'open',
    );

    const labels = await page
      .locator('.edge-menu__list strong')
      .evaluateAll((elements) =>
        elements.map((element) => {
          const style = getComputedStyle(element);
          return {
            text: element.textContent?.trim() ?? '',
            height: element.getBoundingClientRect().height,
            lineHeight: parseFloat(style.lineHeight),
          };
        }),
      );

    expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) {
      expect(
        label.height,
        label.text + ' wraps at width ' + String(viewport.width),
      ).toBeLessThan(label.lineHeight * 1.6);
    }

    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(0);
  }
});

test('reduced motion disables optional motion enhancements', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced');
  // The system preference is the only source: there is no manual toggle.
  await expect(page.locator('[data-motion-toggle]')).toHaveCount(0);
  await expect(page.locator('html')).not.toHaveAttribute(
    'data-cursor-ready',
    'true',
  );

  // The tab stays at rest instead of following the pointer.
  const viewport = page.viewportSize()!;
  const before = await tabCentre(page);
  await page.mouse.move(viewport.width - 10, 80);
  await page.mouse.move(viewport.width - 10, 120);
  await expect(page.locator('[data-edge-menu]')).toHaveAttribute(
    'data-state',
    'closed',
  );
  expect(Math.abs((await tabCentre(page)) - before)).toBeLessThanOrEqual(1);

  // The Instagram control changes state without a continuous fold.
  const badge = page.locator('[data-instagram]');
  await expect(badge).toHaveAttribute('data-pose', 'hero');
  await page.evaluate(() => window.scrollTo(0, window.innerHeight));
  await expect(badge).toHaveAttribute('data-pose', 'compact');
  await expect
    .poll(() => badge.evaluate((b) => b.style.getPropertyValue('--ig-p')))
    .toBe('1.0000');
});

test('the Instagram control folds from the hero into the corner', async ({
  page,
}) => {
  await page.goto('/');

  // One control, pointing at the approved profile from the central config.
  const badge = page.locator('[data-instagram]');
  await expect(badge).toHaveCount(1);
  await expect(badge).toHaveAttribute('href', APPROVED_INSTAGRAM);
  await expect(badge).toHaveAccessibleName('Instagram');
  await expect(badge).toHaveAttribute('data-pose', 'hero');
  await expect(badge).toHaveAttribute('data-ready', 'true');

  // From the first screen it already sits in the top-right corner.
  const readCorner = () =>
    badge.evaluate((b) => {
      const rect = b.getBoundingClientRect();
      return {
        top: rect.top,
        right: document.documentElement.clientWidth - rect.right,
      };
    });
  const heroCorner = await readCorner();
  expect(heroCorner.top).toBeLessThanOrEqual(32);
  expect(heroCorner.right).toBeGreaterThan(0);
  expect(heroCorner.right).toBeLessThanOrEqual(64);
  await expect(badge.locator('[data-instagram-icon]')).toHaveCSS(
    'opacity',
    '0',
  );

  const heroBox = await badge.boundingBox();
  await page.evaluate(() => window.scrollTo(0, window.innerHeight));
  await expect(badge).toHaveAttribute('data-pose', 'compact');
  await expect
    .poll(() => badge.evaluate((b) => b.style.getPropertyValue('--ig-p')))
    .toBe('1.0000');

  // The same element, now at rest in the top-right corner.
  const compact = await badge.evaluate((b) => {
    const rect = b.getBoundingClientRect();
    return {
      top: rect.top,
      right: document.documentElement.clientWidth - rect.right,
      scale: new DOMMatrix(getComputedStyle(b).transform).a,
    };
  });
  expect(compact.top).toBeLessThanOrEqual(32);
  // It folded in place: the right edge never moved away from the corner.
  expect(Math.abs(compact.right - heroCorner.right)).toBeLessThanOrEqual(1);
  expect(compact.scale).toBeCloseTo(1, 2);
  expect(heroBox).not.toBeNull();

  // Compact, it carries the Instagram glyph instead of the word and the arrow.
  const icon = badge.locator('[data-instagram-icon]');
  await expect(icon.locator('svg')).toHaveCount(1);
  await expect(icon).toHaveCSS('opacity', '1');
  await expect(badge.locator('.ig-badge__arrow')).toHaveCSS('opacity', '0');

  // It still sits on top of the page and stays operable.
  await expect(badge).toBeVisible();
  await expect(badge).toHaveJSProperty('inert', false);

  // Reversing the scroll unfolds it again.
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(badge).toHaveAttribute('data-pose', 'hero');
});

test('every route carries one wordmark and one folding Instagram control', async ({
  page,
}) => {
  for (const { path, theme } of [
    { path: '/', theme: 'light' },
    { path: '/studio/', theme: 'dark' },
    { path: '/servicios/', theme: 'dark' },
    { path: '/proyectos/', theme: 'light' },
    { path: '/contacto/', theme: 'dark' },
  ]) {
    await page.goto(path);

    // One wordmark, a link home, in the top-left corner, in the hero's tone.
    const logo = page.locator('[data-site-logo]');
    await expect(logo, path).toHaveCount(1);
    await expect(logo).toHaveAttribute('href', '/');
    await expect(logo).toHaveAttribute('data-theme', theme);
    await expect(logo.locator('img')).toHaveCount(1);
    await expect(logo.locator('img')).toHaveAttribute(
      'src',
      theme === 'dark'
        ? '/assets/brand/colmillo-wordmark-cream.png'
        : '/assets/brand/colmillo-wordmark-black.png',
    );
    const readLogo = () =>
      logo.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { top: rect.top, left: rect.left, width: rect.width };
      });
    const first = await readLogo();
    expect(first.top, path).toBeLessThanOrEqual(64);
    expect(first.left, path).toBeLessThanOrEqual(64);
    expect(first.width, path).toBeGreaterThan(90);

    // The Instagram control starts as the pill and folds on scroll.
    const badge = page.locator('[data-instagram]');
    await expect(badge, path).toHaveCount(1);
    await expect(badge).toHaveAttribute('data-ready', 'true');
    await expect(badge).toHaveAttribute('data-pose', 'hero');
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    await expect(badge, path).toHaveAttribute('data-pose', 'compact');

    // The wordmark belongs to the first screen and scrolls away with it; the
    // Instagram control stays fixed in its corner.
    const scrolled = await page.evaluate(() => window.scrollY);
    expect(scrolled, path).toBeGreaterThan(0);
    const after = await readLogo();
    expect(after.top, path).toBeCloseTo(first.top - scrolled, 0);
    expect(after.left, path).toBe(first.left);
    await expect(badge).toBeInViewport();

    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
      path,
    ).toBeLessThanOrEqual(0);
  }
});

test('the Instagram control makes way for the open menu', async ({ page }) => {
  await page.goto('/');
  const badge = page.locator('[data-instagram]');

  await page.locator('[data-edge-trigger]').click();
  await expect(page.locator('[data-edge-menu]')).toHaveAttribute(
    'data-state',
    'open',
  );
  // The panel carries its own Instagram link, so the global one steps back.
  await expect(badge).toHaveJSProperty('inert', true);
  await expect(badge).toBeHidden();
  // The wordmark stays under the scrim, out of the focus order.
  await expect(page.locator('[data-site-logo]')).toHaveJSProperty(
    'inert',
    true,
  );
  await expect(
    page.locator(`[data-edge-panel] a[href="${APPROVED_INSTAGRAM}"]`),
  ).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(badge).toBeVisible();
  await expect(badge).toHaveJSProperty('inert', false);
});

test('the Instagram control and the edge tab never overlap', async ({
  page,
  isMobile,
}) => {
  test.skip(
    isMobile,
    'The explicit viewport matrix runs once in desktop Chromium.',
  );

  for (const viewport of [
    { width: 1920, height: 1080 },
    { width: 1440, height: 900 },
    { width: 1366, height: 768 },
    { width: 1024, height: 1366 },
    { width: 768, height: 1024 },
    { width: 430, height: 932 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/');

    for (const y of [0, viewport.height]) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      // Reach for the top of the edge, where the two could meet.
      await page.mouse.move(viewport.width - 12, 8, { steps: 2 });
      await page.waitForTimeout(500);
      const boxes = await page.evaluate(() => {
        const read = (selector: string) => {
          const rect = document
            .querySelector(selector)!
            .getBoundingClientRect();
          return [rect.left, rect.top, rect.right, rect.bottom];
        };
        return {
          badge: read('[data-instagram]'),
          tab: read('[data-edge-tab]'),
        };
      });
      const [a, b] = [boxes.badge, boxes.tab] as [number[], number[]];
      const overlap =
        a[0]! < b[2]! && a[2]! > b[0]! && a[1]! < b[3]! && a[3]! > b[1]!;
      expect(overlap, `overlap at ${viewport.width}, scroll ${y}`).toBe(false);
    }

    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(0);
  }
});

test('core home navigation works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');

  const cta = page.getByRole('link', { name: 'Haz que tu marca muerda' });
  await expect(cta).toBeVisible();
  await cta.click();
  await expect(page).toHaveURL(/#contacto$/);

  const menu = page.locator('[data-edge-menu]');
  await menu.locator('summary').click();
  await expect(page.locator('[data-edge-disclosure]')).toHaveAttribute(
    'open',
    '',
  );
  await expect(
    menu.getByRole('link', { name: 'Proyectos', exact: true }),
  ).toBeVisible();
  // The disclosure's own state swaps the tab for the close control.
  await expect(page.locator('[data-edge-closer]')).toBeVisible();

  // The Instagram control is a plain link that needs no script.
  await expect(page.locator('[data-instagram]')).toHaveAttribute(
    'href',
    APPROVED_INSTAGRAM,
  );

  await context.close();
});

test('client navigation remains stable across history changes', async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });

  await page.goto('/');
  const menu = page.locator('[data-edge-menu]');
  await menu.locator('summary').click();
  await menu.getByRole('link', { name: 'Proyectos', exact: true }).click();
  await expect(page).toHaveURL(/\/proyectos\/$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Proyectos' }),
  ).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Colmillo Studio' }),
  ).toBeAttached();
  expect(consoleErrors).toEqual([]);
});
