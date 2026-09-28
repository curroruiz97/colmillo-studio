import { variantOf } from '@shop/scripts/catalog';

/**
 * THE CART
 *
 * Lives in the visitor's browser (`localStorage`), because there is no
 * commerce platform behind the shop yet (2026-09-28). A line is only a
 * variant id and a quantity; everything shown about it is read from the
 * catalogue at the time it is shown.
 *
 * When a platform is chosen this module is the one seam to replace: Shopify's
 * Cart API (`cartCreate`, `cartLinesAdd`, `cartLinesUpdate`, then the cart's
 * `checkoutUrl`) or WooCommerce's Store API (`/wp-json/wc/store/v1/cart/*`,
 * then its checkout page) take the same three verbs this exposes — add, set
 * and remove — and the drawer keeps drawing from `lines()`.
 *
 * Another tab changing the cart is picked up through the `storage` event.
 */

export interface CartLine {
  variant: string;
  quantity: number;
}

const KEY = 'colmillo-tienda-cesta';
export const MAX_QUANTITY = 10;

type Listener = () => void;
const listeners = new Set<Listener>();

const clamp = (quantity: number) =>
  Math.max(0, Math.min(MAX_QUANTITY, Math.round(quantity)));

function read(): CartLine[] {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown;
    if (!Array.isArray(stored)) return [];
    return stored
      .filter(
        (line): line is CartLine =>
          typeof line?.variant === 'string' &&
          typeof line?.quantity === 'number' &&
          // A variant the catalogue no longer has is dropped quietly.
          variantOf(line.variant) !== undefined,
      )
      .map((line) => ({ ...line, quantity: clamp(line.quantity) }))
      .filter((line) => line.quantity > 0);
  } catch {
    return [];
  }
}

let lines: CartLine[] = [];

function write() {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    // Private mode or full storage: the cart still works for this page.
  }
  listeners.forEach((listener) => listener());
}

export const cart = {
  init() {
    lines = read();
    window.addEventListener('storage', (event) => {
      if (event.key !== KEY) return;
      lines = read();
      listeners.forEach((listener) => listener());
    });
  },
  lines: (): readonly CartLine[] => lines,
  count: () => lines.reduce((sum, line) => sum + line.quantity, 0),
  subtotal: () =>
    lines.reduce(
      (sum, line) =>
        sum + (variantOf(line.variant)?.variant.price ?? 0) * line.quantity,
      0,
    ),
  quantityOf: (variant: string) =>
    lines.find((line) => line.variant === variant)?.quantity ?? 0,
  /** Adds up to the per-line limit; returns how many were actually added. */
  add(variant: string, quantity = 1) {
    const found = variantOf(variant);
    if (!found?.variant.available) return 0;
    const line = lines.find((item) => item.variant === variant);
    const before = line?.quantity ?? 0;
    const after = clamp(before + quantity);
    if (line) line.quantity = after;
    else if (after > 0) lines = [...lines, { variant, quantity: after }];
    write();
    return after - before;
  },
  set(variant: string, quantity: number) {
    const next = clamp(quantity);
    lines = lines
      .map((line) =>
        line.variant === variant ? { ...line, quantity: next } : line,
      )
      .filter((line) => line.quantity > 0);
    write();
  },
  remove(variant: string) {
    lines = lines.filter((line) => line.variant !== variant);
    write();
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
