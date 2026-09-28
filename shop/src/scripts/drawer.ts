import { cart, MAX_QUANTITY } from '@shop/scripts/cart';
import { optionsLabel, paletteFor, variantOf } from '@shop/scripts/catalog';
import { formatPrice } from '@shop/data/catalog';
import { artStyle } from '@shop/data/palette';
import { productPath } from '@shop/data/paths';

/**
 * The cart's drawer and every count of it on the page.
 *
 * The drawer is a native modal `<dialog>`: `showModal()` gives focus
 * containment, Escape, an inert page and focus returning to the button that
 * opened it. This module only draws its lines, wires their controls and
 * keeps the counts in the bar and the dock true.
 */

const motionReduced = () =>
  document.documentElement.dataset.motion === 'reduced';

let announcer: HTMLElement | null = null;
export function announce(message: string) {
  if (!announcer) return;
  // Cleared first, so the same message twice is still read twice.
  announcer.textContent = '';
  window.setTimeout(() => {
    if (announcer) announcer.textContent = message;
  }, 60);
}

const pieces = (count: number) =>
  `${count} ${count === 1 ? 'pieza' : 'piezas'}`;

export function initDrawer(): { open: () => void } {
  const dialog = document.querySelector<HTMLDialogElement>('[data-cart]');
  const list = document.querySelector<HTMLElement>('[data-cart-lines]');
  const template =
    document.querySelector<HTMLTemplateElement>('[data-cart-line]');
  announcer = document.querySelector('[data-cart-announcer]');
  if (!dialog || !list || !template) return { open: () => undefined };

  const empty = dialog.querySelector<HTMLElement>('[data-cart-empty]');
  const foot = dialog.querySelector<HTMLElement>('[data-cart-foot]');
  const subtotal = dialog.querySelector<HTMLElement>('[data-cart-subtotal]');
  const heading = dialog.querySelector<HTMLElement>(
    '[data-cart-heading-count]',
  );
  const demo = dialog.querySelector<HTMLElement>('[data-cart-demo]');
  const counts = document.querySelectorAll<HTMLElement>('[data-cart-count]');
  const countLabels = document.querySelectorAll<HTMLElement>(
    '[data-cart-count-label]',
  );

  const drawLine = (variantId: string, quantity: number) => {
    const found = variantOf(variantId);
    if (!found) return null;
    const { product, variant } = found;
    const node = template.content.firstElementChild?.cloneNode(true);
    if (!(node instanceof HTMLElement)) return null;
    node.dataset.variant = variantId;
    const href = productPath(product.handle);

    const media = node.querySelector<HTMLAnchorElement>('.cart-line__media');
    const art = document
      .querySelector<HTMLTemplateElement>(
        `[data-art-template="${product.handle}"]`,
      )
      ?.content.firstElementChild?.cloneNode(true);
    if (media) {
      media.href = href;
      media.setAttribute('style', artStyle(paletteFor(product, variant)));
      if (art) media.append(art);
    }
    const title = node.querySelector<HTMLAnchorElement>('[data-line-title]');
    if (title) {
      title.href = href;
      title.textContent = product.title;
    }
    const options = node.querySelector<HTMLElement>('[data-line-options]');
    const label = optionsLabel(product, variant);
    if (options) {
      options.textContent = label;
      options.hidden = label === '';
    }
    const price = node.querySelector<HTMLElement>('[data-line-price]');
    if (price) price.textContent = formatPrice(variant.price * quantity);
    const qty = node.querySelector<HTMLOutputElement>('[data-line-qty]');
    if (qty) qty.value = String(quantity);

    const name = `${product.title}${label ? `, ${label}` : ''}`;
    node
      .querySelector('[data-line-stepper]')
      ?.setAttribute('aria-label', `Cantidad de ${name}`);
    const less = node.querySelector<HTMLButtonElement>('[data-line-less]');
    less?.setAttribute(
      'aria-label',
      quantity === 1 ? `Quitar ${name}` : `Una menos de ${name}`,
    );
    const more = node.querySelector<HTMLButtonElement>('[data-line-more]');
    more?.setAttribute('aria-label', `Una más de ${name}`);
    if (more) more.disabled = quantity >= MAX_QUANTITY;
    node
      .querySelector('[data-line-remove]')
      ?.setAttribute('aria-label', `Quitar ${name} de la cesta`);
    return node;
  };

  const render = () => {
    const lines = cart.lines();
    const count = cart.count();

    // Keep focus on the same control across a redraw of its line.
    const active = document.activeElement;
    const focusedLine =
      active instanceof HTMLElement && list.contains(active)
        ? {
            variant: active.closest<HTMLElement>('.cart-line')?.dataset.variant,
            hook: ['data-line-less', 'data-line-more', 'data-line-remove'].find(
              (hook) => active.hasAttribute(hook),
            ),
          }
        : null;

    list.replaceChildren(
      ...lines
        .map((line) => drawLine(line.variant, line.quantity))
        .filter((node): node is HTMLElement => node !== null),
    );

    if (focusedLine?.variant) {
      const again = list.querySelector<HTMLElement>(
        `.cart-line[data-variant="${focusedLine.variant}"] [${focusedLine.hook}]`,
      );
      (
        again ?? dialog.querySelector<HTMLElement>('[data-cart-close]')
      )?.focus();
    }

    const isEmpty = lines.length === 0;
    if (empty) empty.hidden = !isEmpty;
    if (foot) foot.hidden = isEmpty;
    list.hidden = isEmpty;
    if (subtotal) subtotal.textContent = formatPrice(cart.subtotal());
    if (heading) heading.textContent = isEmpty ? '' : `(${count})`;
    counts.forEach((node) => {
      node.textContent = String(count);
      node
        .closest<HTMLElement>('.cart-button')
        ?.toggleAttribute('data-filled', count > 0);
    });
    countLabels.forEach((node) => {
      node.textContent = isEmpty ? ', vacía' : `, ${pieces(count)}`;
    });
    if (demo && isEmpty) demo.hidden = true;
  };

  /* ------------------------------------------------------------ open -- */

  const open = () => {
    if (dialog.open) return;
    render();
    dialog.showModal();
  };
  const close = () => dialog.close();

  document.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    if (target?.closest('[data-cart-open]')) {
      event.preventDefault();
      open();
    }
  });

  dialog.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    // A click on the dialog box itself, outside its content, is the backdrop.
    if (target === dialog) {
      close();
      return;
    }
    if (target?.closest('[data-cart-close]')) close();

    const line = target?.closest<HTMLElement>('.cart-line');
    const variant = line?.dataset.variant;
    if (!variant) return;
    const quantity = cart.quantityOf(variant);
    const found = variantOf(variant);
    const name = found?.product.title ?? '';
    if (target?.closest('[data-line-more]')) {
      cart.set(variant, quantity + 1);
      announce(`${name}: ${quantity + 1}`);
    } else if (target?.closest('[data-line-less]')) {
      cart.set(variant, quantity - 1);
      announce(
        quantity - 1 > 0 ? `${name}: ${quantity - 1}` : `${name} quitado`,
      );
    } else if (target?.closest('[data-line-remove]')) {
      cart.remove(variant);
      announce(`${name} quitado de la cesta`);
    }
  });

  dialog
    .querySelector('[data-cart-checkout]')
    ?.addEventListener('click', () => {
      if (demo) {
        demo.hidden = false;
        demo.animate?.(
          motionReduced()
            ? []
            : [
                { transform: 'translateY(0.4rem)', opacity: 0 },
                { transform: 'none', opacity: 1 },
              ],
          { duration: 320, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
        );
      }
    });

  cart.subscribe(render);
  render();
  return { open };
}

/* ------------------------------------------------------ add feedback -- */

/** The cart control actually on screen: the bar's, or the touch dock. */
function cartTarget() {
  return document.querySelector<HTMLElement>('[data-cart-open]');
}

/**
 * A small orange disc leaves the product and drops into the cart along an
 * arc; the cart squashes as it lands and springs back. Nothing moves under
 * reduced motion: the count and the announcement say it.
 */
export function flyToCart(from: Element) {
  const target = cartTarget();
  if (!target) return Promise.resolve();
  const bump = () => {
    target.classList.remove('is-bumped');
    void target.offsetWidth;
    target.classList.add('is-bumped');
  };
  if (motionReduced() || typeof document.body.animate !== 'function') {
    return Promise.resolve();
  }

  const start = from.getBoundingClientRect();
  const end = target.getBoundingClientRect();
  const size = 28;
  const x0 = start.left + start.width / 2 - size / 2;
  const y0 = start.top + start.height / 2 - size / 2;
  const x1 = end.left + end.width / 2 - size / 2;
  const y1 = end.top + end.height / 2 - size / 2;
  // The arc's apex: above both ends, so the disc is thrown, not slid.
  const lift = Math.max(
    12,
    Math.min(y0, y1) - Math.max(80, Math.abs(x1 - x0) * 0.25),
  );

  const disc = document.createElement('span');
  disc.className = 'fly-disc';
  disc.setAttribute('aria-hidden', 'true');
  document.body.append(disc);

  const at = (t: number) => {
    const u = 1 - t;
    const x = x0 + (x1 - x0) * t;
    const y = u * u * y0 + 2 * u * t * lift + t * t * y1;
    const scale = 1 - 0.55 * t;
    return {
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      offset: t,
    };
  };
  const frames = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1].map(at);
  const flight = disc.animate(frames, {
    duration: 640,
    easing: 'cubic-bezier(0.35, 0, 0.25, 1)',
    fill: 'forwards',
  });
  return flight.finished
    .catch(() => undefined)
    .then(() => {
      disc.remove();
      bump();
    });
}
