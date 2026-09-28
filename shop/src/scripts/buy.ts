import type { ProductVariant } from '@shop/data/catalog';
import { formatPrice } from '@shop/data/catalog';
import { altGround, artStyle } from '@shop/data/palette';
import { cart, MAX_QUANTITY } from '@shop/scripts/cart';
import {
  optionsLabel,
  paletteFor,
  productOf,
  variantOf,
  type ClientProduct,
} from '@shop/scripts/catalog';
import { announce, flyToCart } from '@shop/scripts/drawer';

/**
 * Choosing and adding.
 *
 * Every `[data-buy]` form resolves its variant from the checked radios,
 * repaints every drawing in its `[data-buy-scope]` for a colour, shows the
 * variant's price and marks the values that would lead to a sold-out
 * variant. Submitting adds to the cart, throws the disc and, on the product
 * page, opens the drawer once it lands.
 *
 * The grid's "+" adds a product with nothing to choose in one tap, bites the
 * card it came from and leaves the drawer closed, so browsing is not
 * interrupted.
 */

const chosenOf = (form: HTMLFormElement) => {
  const choice: Record<string, string> = {};
  form
    .querySelectorAll<HTMLInputElement>('input[data-option]:checked')
    .forEach((input) => {
      if (input.dataset.option) choice[input.dataset.option] = input.value;
    });
  return choice;
};

const matches = (variant: ProductVariant, choice: Record<string, string>) =>
  Object.entries(choice).every(
    ([name, value]) => variant.options[name] === value,
  );

const paint = (
  element: HTMLElement,
  product: ClientProduct,
  variant?: ProductVariant,
) => {
  const palette = paletteFor(product, variant);
  const ground =
    element.dataset.ground === 'alt' ? altGround(palette) : palette.ground;
  for (const rule of artStyle({ ...palette, ground }).split(';')) {
    const [name, value] = rule.split(':');
    if (name && value) element.style.setProperty(name, value);
  }
};

function bindForm(form: HTMLFormElement, openDrawer: () => void) {
  const product = productOf(form.dataset.handle ?? '');
  if (!product) return;
  const scope = form.closest<HTMLElement>('[data-buy-scope]') ?? form;
  const submit = form.querySelector<HTMLButtonElement>('[data-buy-submit]');
  const label = form.querySelector<HTMLElement>('[data-buy-label]');
  const qty = form.querySelector<HTMLInputElement>('[data-qty]');
  const onProductPage = scope.matches('.product');

  const current = () => {
    const choice = chosenOf(form);
    return product.variants.find((variant) => matches(variant, choice));
  };

  const sync = () => {
    const choice = chosenOf(form);
    const variant = current();

    Object.entries(choice).forEach(([name, value]) => {
      const chosen = form.querySelector<HTMLElement>(
        `[data-buy-chosen="${CSS.escape(name)}"]`,
      );
      if (chosen) chosen.textContent = value;
    });

    // A value is "out" when, with the other choices as they are, it leads to
    // a sold-out variant.
    form
      .querySelectorAll<HTMLInputElement>('input[data-option]')
      .forEach((input) => {
        const name = input.dataset.option ?? '';
        const trial = { ...choice, [name]: input.value };
        const target = product.variants.find((v) => matches(v, trial));
        const out = !target?.available;
        const pill = input.closest<HTMLElement>('.pill');
        pill?.toggleAttribute('data-out', out);
        let note = pill?.querySelector<HTMLElement>('.pill__out');
        if (out && pill && !note) {
          note = document.createElement('span');
          note.className = 'visually-hidden pill__out';
          note.textContent = ' (agotado)';
          pill.append(note);
        } else if (!out) note?.remove();
      });

    scope.querySelectorAll<HTMLElement>('[data-buy-price]').forEach((node) => {
      if (variant) node.textContent = formatPrice(variant.price);
    });
    scope.querySelectorAll<HTMLElement>('[data-buy-art]').forEach((node) => {
      paint(node, product, variant);
    });

    const available = Boolean(variant?.available);
    if (submit) submit.disabled = !available;
    if (label) label.textContent = available ? 'Añadir a la cesta' : 'Agotado';
  };

  const setQty = (value: number) => {
    if (!qty) return;
    qty.value = String(Math.max(1, Math.min(MAX_QUANTITY, value || 1)));
  };

  form.addEventListener('change', (event) => {
    if ((event.target as Element).matches('input[data-option]')) sync();
    if (event.target === qty) setQty(Number(qty?.value));
  });
  form.addEventListener('click', (event) => {
    const target = event.target as Element;
    if (target.closest('[data-qty-less]')) setQty(Number(qty?.value) - 1);
    if (target.closest('[data-qty-more]')) setQty(Number(qty?.value) + 1);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const variant = current();
    if (!variant?.available) return;
    const added = cart.add(variant.id, Number(qty?.value) || 1);
    const name = `${product.title}${product.options.length ? `, ${optionsLabel(product, variant)}` : ''}`;
    if (added === 0) {
      announce(`Ya tienes el máximo de ${name} en la cesta`);
      openDrawer();
      return;
    }
    announce(`Añadido a la cesta: ${name}${added > 1 ? ` (${added})` : ''}`);
    const art = scope.querySelector('[data-buy-art]') ?? form;
    submit?.classList.add('is-biting');
    window.setTimeout(() => submit?.classList.remove('is-biting'), 420);
    void flyToCart(art).then(() => {
      if (onProductPage) openDrawer();
    });
  });

  sync();
}

function bindQuickAdd() {
  document.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>(
      '[data-quick-add]',
    );
    if (!button) return;
    const found = variantOf(button.dataset.variant ?? '');
    if (!found) return;
    const added = cart.add(found.variant.id, 1);
    announce(
      added
        ? `Añadido a la cesta: ${found.product.title}`
        : `Ya tienes el máximo de ${found.product.title} en la cesta`,
    );
    if (!added) return;
    const card = button.closest<HTMLElement>('[data-card]');
    const tile = card?.querySelector('[data-card-tile]') ?? button;
    card?.classList.remove('is-bitten');
    void card?.offsetWidth;
    card?.classList.add('is-bitten');
    window.setTimeout(() => card?.classList.remove('is-bitten'), 900);
    void flyToCart(tile);
  });
}

export function initBuy(openDrawer: () => void) {
  document
    .querySelectorAll<HTMLFormElement>('form[data-buy]')
    .forEach((form) => bindForm(form, openDrawer));
  bindQuickAdd();
}
