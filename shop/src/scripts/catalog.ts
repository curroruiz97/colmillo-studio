import type { ArtPalette, ProductVariant } from '@shop/data/catalog';

/**
 * The catalogue as the browser sees it: the JSON the layout embeds, read
 * once. Prices and names always come from here, never from what the cart
 * stored, so a cart saved yesterday shows today's catalogue.
 */
export interface ClientProduct {
  handle: string;
  title: string;
  palette: ArtPalette;
  options: string[];
  variants: ProductVariant[];
}

let byHandle: Map<string, ClientProduct> | null = null;
let byVariant: Map<
  string,
  { product: ClientProduct; variant: ProductVariant }
> | null = null;

function load() {
  if (byHandle && byVariant) return;
  byHandle = new Map();
  byVariant = new Map();
  const source = document.getElementById('shop-catalog')?.textContent ?? '[]';
  for (const product of JSON.parse(source) as ClientProduct[]) {
    byHandle.set(product.handle, product);
    for (const variant of product.variants) {
      byVariant.set(variant.id, { product, variant });
    }
  }
}

export function productOf(handle: string): ClientProduct | undefined {
  load();
  return byHandle?.get(handle);
}

export function variantOf(id: string) {
  load();
  return byVariant?.get(id);
}

/** "Negro · L", or nothing for a product without options. */
export function optionsLabel(product: ClientProduct, variant: ProductVariant) {
  return product.options.map((name) => variant.options[name]).join(' · ');
}

export const paletteFor = (
  product: ClientProduct,
  variant?: ProductVariant,
): ArtPalette => ({ ...product.palette, ...(variant?.palette ?? {}) });
