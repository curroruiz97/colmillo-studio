/**
 * THE CATALOGUE
 *
 * One typed shape for what the shop sells, deliberately close to what both
 * candidate platforms expose, so the pages do not change when one is chosen:
 *
 *   here            Shopify Storefront API        WooCommerce Store API
 *   handle          product.handle                product.slug
 *   title           product.title                 product.name
 *   category        collection / productType      categories[0]
 *   options         product.options               attributes
 *   variants        product.variants              variations
 *   price (cents)   variant.price.amount × 100    prices.price (minor units)
 *   compareAt       variant.compareAtPrice        prices.regular_price
 *   available       variant.availableForSale      is_in_stock
 *
 * The one thing that is ours alone is `art`: there are no product photographs
 * yet, so each product is drawn by `ProductArt.astro` in the brand's palette.
 * When real media arrives it replaces `art` with images and nothing else moves.
 *
 * EVERYTHING BELOW IS A DEMONSTRATION (2026-09-28). The client has not decided
 * what the shop will sell, at what price, or on which platform. The names,
 * prices, descriptions and options are placeholders written to exercise the
 * layout — sizes, a sale price, a sold-out variant, a price that changes with
 * an option — and every page says so. None of it is to be published as fact;
 * see `docs/CONTENT_NEEDED.md`.
 */

export type ArtKind =
  | 'tee'
  | 'tote'
  | 'poster'
  | 'mug'
  | 'cap'
  | 'notebook'
  | 'stickers'
  | 'ball'
  | 'pin';

/** The four colours a drawing is painted with, as CSS colours. */
export interface ArtPalette {
  /** The tile the object stands on. */
  ground: string;
  /** The object itself. */
  body: string;
  /** Its marks and print. */
  accent: string;
  /** Lines, shadows and the darkest detail. */
  ink: string;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductVariant {
  /** Stable id; a platform's variant id once there is one. */
  id: string;
  /** Option name → value, one entry per option. */
  options: Record<string, string>;
  /** Minor units (céntimos). */
  price: number;
  compareAt?: number;
  available: boolean;
  /** A colour option repaints the drawing. */
  palette?: Partial<ArtPalette>;
}

export interface Product {
  handle: string;
  title: string;
  category: string;
  /** One line under the title in the grid. */
  kicker: string;
  description: string;
  details: string[];
  art: ArtKind;
  palette: ArtPalette;
  options: ProductOption[];
  variants: ProductVariant[];
  /** Always true until the client supplies the real catalogue. */
  demo: true;
}

export const CURRENCY = 'EUR';

const euros = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: CURRENCY,
});

/** Formats minor units the same way on the server and in the browser. */
export const formatPrice = (cents: number) => euros.format(cents / 100);

/* ------------------------------------------------------------ palettes -- */

const CREAM = '#fceeda';
const CREAM_DEEP = '#ead2b4';
const ORANGE = '#cd5730';
const INK = '#12100f';
const INK_SOFT = '#2a211d';
const RED = '#9d2d22';

/** Every variant of a product, from the cartesian product of its options. */
function variantsOf(
  handle: string,
  options: ProductOption[],
  make: (
    choice: Record<string, string>,
  ) => Omit<ProductVariant, 'id' | 'options'>,
): ProductVariant[] {
  let choices: Record<string, string>[] = [{}];
  for (const option of options) {
    choices = choices.flatMap((choice) =>
      option.values.map((value) => ({ ...choice, [option.name]: value })),
    );
  }
  return choices.map((choice) => ({
    id: [handle, ...Object.values(choice)]
      .join('-')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-'),
    options: choice,
    ...make(choice),
  }));
}

const DEMO_TEXT =
  'Texto de demostración. Aquí irá la descripción real del producto: de qué está hecho, cómo se usa y por qué existe.';

/* ------------------------------------------------------------ products -- */

const products: Product[] = [
  {
    handle: 'demo-poster-presion',
    title: 'Póster Presión',
    category: 'Papel',
    kicker: 'Edición numerada',
    description: DEMO_TEXT,
    details: [
      'Dato de demostración: papel y gramaje',
      'Dato de demostración: técnica de impresión',
      'Se envía enrollado (demostración)',
    ],
    art: 'poster',
    palette: { ground: ORANGE, body: CREAM, accent: ORANGE, ink: INK },
    options: [{ name: 'Tamaño', values: ['A3', 'A2'] }],
    variants: [],
    demo: true,
  },
  {
    handle: 'demo-camiseta-mordisco',
    title: 'Camiseta Mordisco',
    category: 'Textil',
    kicker: 'Algodón, corte recto',
    description: DEMO_TEXT,
    details: [
      'Dato de demostración: composición',
      'Dato de demostración: guía de tallas',
      'Dato de demostración: cuidados',
    ],
    art: 'tee',
    palette: { ground: CREAM_DEEP, body: CREAM, accent: ORANGE, ink: INK },
    options: [
      { name: 'Color', values: ['Crema', 'Tinta'] },
      { name: 'Talla', values: ['S', 'M', 'L', 'XL'] },
    ],
    variants: [],
    demo: true,
  },
  {
    handle: 'demo-pelota-antiestres',
    title: 'Pelota antiestrés',
    category: 'Objetos',
    kicker: 'Para apretar ideas',
    description: DEMO_TEXT,
    details: [
      'Dato de demostración: material',
      'Dato de demostración: medidas',
    ],
    art: 'ball',
    palette: { ground: INK_SOFT, body: ORANGE, accent: ORANGE, ink: INK },
    options: [],
    variants: [],
    demo: true,
  },
  {
    handle: 'demo-tote-tension',
    title: 'Tote Tensión',
    category: 'Textil',
    kicker: 'Bolsa de lona',
    description: DEMO_TEXT,
    details: [
      'Dato de demostración: tejido',
      'Dato de demostración: capacidad',
    ],
    art: 'tote',
    palette: { ground: INK, body: CREAM, accent: ORANGE, ink: INK },
    options: [{ name: 'Color', values: ['Crema', 'Naranja'] }],
    variants: [],
    demo: true,
  },
  {
    handle: 'demo-taza-colmillo',
    title: 'Taza Colmillo',
    category: 'Objetos',
    kicker: 'Cerámica esmaltada',
    description: DEMO_TEXT,
    details: [
      'Dato de demostración: capacidad',
      'Dato de demostración: apta para lavavajillas',
    ],
    art: 'mug',
    palette: { ground: RED, body: CREAM, accent: ORANGE, ink: INK },
    options: [],
    variants: [],
    demo: true,
  },
  {
    handle: 'demo-gorra-marca',
    title: 'Gorra Marca',
    category: 'Textil',
    kicker: 'Seis paneles',
    description: DEMO_TEXT,
    details: [
      'Dato de demostración: tejido',
      'Dato de demostración: cierre ajustable',
    ],
    art: 'cap',
    palette: { ground: CREAM_DEEP, body: INK, accent: ORANGE, ink: INK_SOFT },
    options: [{ name: 'Color', values: ['Tinta', 'Naranja'] }],
    variants: [],
    demo: true,
  },
  {
    handle: 'demo-cuaderno-boceto',
    title: 'Cuaderno Boceto',
    category: 'Papel',
    kicker: 'Tapa dura, goma elástica',
    description: DEMO_TEXT,
    details: [
      'Dato de demostración: número de páginas',
      'Dato de demostración: formato',
    ],
    art: 'notebook',
    palette: { ground: RED, body: INK, accent: ORANGE, ink: INK },
    options: [{ name: 'Papel', values: ['Liso', 'Punteado'] }],
    variants: [],
    demo: true,
  },
  {
    handle: 'demo-pin-colmillo',
    title: 'Pin Colmillo',
    category: 'Objetos',
    kicker: 'Esmalte duro',
    description: DEMO_TEXT,
    details: ['Dato de demostración: medidas', 'Dato de demostración: cierre'],
    art: 'pin',
    palette: { ground: INK_SOFT, body: CREAM, accent: ORANGE, ink: INK },
    options: [],
    variants: [],
    demo: true,
  },
  {
    handle: 'demo-pegatinas',
    title: 'Pack de pegatinas',
    category: 'Papel',
    kicker: 'Seis piezas troqueladas',
    description: DEMO_TEXT,
    details: ['Dato de demostración: acabado', 'Dato de demostración: medidas'],
    art: 'stickers',
    palette: { ground: ORANGE, body: CREAM, accent: INK, ink: INK },
    options: [],
    variants: [],
    demo: true,
  },
];

/*
 * Prices, availability and colour repaints per product. Kept apart from the
 * list above so the demo's deliberate edge cases are easy to find: a price
 * that changes with the size, a sale price, and a sold-out colour.
 */
const pricing: Record<
  string,
  (choice: Record<string, string>) => Omit<ProductVariant, 'id' | 'options'>
> = {
  'demo-poster-presion': (c) => ({
    price: c['Tamaño'] === 'A2' ? 3800 : 2800,
    available: true,
  }),
  'demo-camiseta-mordisco': (c) => ({
    price: 3200,
    available: !(c['Color'] === 'Tinta' && c['Talla'] === 'XL'),
    ...(c['Color'] === 'Tinta'
      ? { palette: { body: INK, accent: ORANGE, ground: CREAM_DEEP } }
      : {}),
  }),
  'demo-pelota-antiestres': () => ({ price: 1400, available: true }),
  'demo-tote-tension': (c) => ({
    price: 2400,
    available: true,
    ...(c['Color'] === 'Naranja'
      ? { palette: { body: ORANGE, accent: CREAM } }
      : {}),
  }),
  'demo-taza-colmillo': () => ({ price: 1800, available: true }),
  'demo-gorra-marca': (c) => ({
    price: 2900,
    available: c['Color'] !== 'Naranja',
    ...(c['Color'] === 'Naranja'
      ? { palette: { body: ORANGE, accent: INK } }
      : {}),
  }),
  'demo-cuaderno-boceto': () => ({ price: 1600, available: true }),
  'demo-pin-colmillo': () => ({ price: 900, compareAt: 1200, available: true }),
  'demo-pegatinas': () => ({ price: 800, available: true }),
};

for (const product of products) {
  const make = pricing[product.handle];
  if (!make) throw new Error(`No pricing for ${product.handle}`);
  product.variants = variantsOf(product.handle, product.options, make);
}

/* ---------------------------------------------------------------- reads -- */

/**
 * The only way pages read the catalogue. Once a platform is chosen these
 * become calls to its API at build time; the pages keep their signatures.
 */
export const catalog = {
  products: (): readonly Product[] => products,
  product: (handle: string) => products.find((p) => p.handle === handle),
  categories: (): string[] => [...new Set(products.map((p) => p.category))],
  /** The piece the home stage is built around. */
  featured: (): Product => products[0] as Product,
};

/** The lowest price among a product's variants, and whether any is on sale. */
export function priceRange(product: Product) {
  const prices = product.variants.map((v) => v.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const sale = product.variants.find((v) => v.compareAt !== undefined);
  return { min, max, compareAt: sale?.compareAt, from: min !== max };
}

export const firstAvailable = (product: Product) =>
  product.variants.find((v) => v.available) ?? product.variants[0];

/** Whether every variant is sold out. */
export const soldOut = (product: Product) =>
  product.variants.every((v) => !v.available);

/** A variant's palette: the product's, repainted by the variant's colour. */
export const paletteOf = (product: Product, variant?: ProductVariant) => ({
  ...product.palette,
  ...(variant?.palette ?? {}),
});
