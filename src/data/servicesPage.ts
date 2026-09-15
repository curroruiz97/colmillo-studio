import {
  servicesContentIllustration,
  servicesDigitalIllustration,
  servicesIdentityIllustration,
  servicesIllustration,
  type BrandImage,
  type PageMedia,
} from '@/config/assets';
import { demoMode } from './projects';

/*
 * `/servicios/` content, in one place.
 *
 * The four service layers follow the isolation contract of `studioPage.ts`:
 * an `approvedServices` record (null until the client signs the copy off), a
 * flagged provisional record for development and `build:demo`, and nothing in
 * the standard build. Each layer rendered from a provisional record carries
 * `data-dev-placeholder`, which `check:production` forbids in `dist/`.
 *
 * The hero title and the closing call to action were given by the user as the
 * page's wording, so they ship in both builds.
 */

/** The layer's surface. `light` is white, `accent` orange, `dark` black. */
export type ServiceTheme = 'light' | 'accent' | 'dark';

/**
 * Which side the copy takes on wide screens; phones always read copy first.
 * The layers alternate (text-media, media-text, text-media, media-text) and
 * every layer's plate has the same size (`services-page.css`).
 */
export type ServiceLayout = 'text-media' | 'media-text';

export interface ServiceLink {
  label: string;
  href: string;
}

export interface ServiceLayer {
  /** Section anchor: `/servicios/#servicio-<slug>`. */
  slug: string;
  /** Sentence case. */
  title: string;
  /** One short line under the title. */
  claim: string;
  description: string;
  /** Four to six short items; they are not links. */
  capabilities: string[];
  /** Image or loop for the layer's plate; null shows an abstract plate. */
  media: PageMedia | null;
  /**
   * Optional button under the capabilities (the shared bite button). Only for
   * a real destination: never a placeholder link.
   */
  cta: ServiceLink | null;
  /**
   * Slugs of approved projects to link from this service once case studies
   * exist. Not rendered yet.
   */
  relatedProjects: string[];
  theme: ServiceTheme;
  layout: ServiceLayout;
}

export interface ServicesPageCopy {
  layers: ServiceLayer[];
  placeholder: boolean;
}

export interface ServicesCloseCopy {
  /** A closing full stop is drawn as the orange disc. */
  title: string;
  /** Two paths: the work, then the conversation. */
  actions: [ServiceLink, ServiceLink];
  /** The scene behind the close: sculptures at both ends, a black centre. */
  image: BrandImage;
}

export const servicesHero = { title: 'Servicios' } as const;

/**
 * The client's own illustration for each service (the home sequence uses the
 * same files). Transparent line art drawn for an ink ground, so every layer
 * sets it on a dark plate. Decorative: the copy beside it says everything.
 */
const illustration = (image: BrandImage): PageMedia => ({
  kind: 'image',
  ...image,
  alt: '',
  fit: 'contain',
});

/** Approved service copy. None yet: see `docs/CONTENT_NEEDED.md`. */
const approvedServices: ServicesPageCopy | null = null;

/**
 * Provisional copy supplied by the user on 2026-09-14 — NOT APPROVED. Claims,
 * descriptions and capabilities are all editable here; the order of the
 * array is the order of the layers.
 */
const provisionalServices: ServicesPageCopy = {
  layers: [
    {
      slug: 'estrategia',
      title: 'Estrategia',
      claim: 'Antes de diseñar, hay que saber dónde apretar.',
      description:
        'Entendemos el contexto, el mercado y la marca para encontrar una dirección clara antes de empezar a construir.',
      capabilities: [
        'Posicionamiento',
        'Arquitectura de marca',
        'Estrategia creativa',
        'Concepto',
        'Investigación',
      ],
      media: illustration(servicesIllustration),
      cta: null,
      relatedProjects: [],
      theme: 'light',
      layout: 'text-media',
    },
    {
      slug: 'identidad',
      title: 'Identidad',
      // Shortened on 2026-09-15 so it sets in two lines, like the others.
      claim: 'Una marca se reconoce antes de leer su nombre.',
      description:
        'Construimos sistemas visuales con carácter propio, capaces de funcionar con coherencia en cualquier formato.',
      capabilities: [
        'Identidad visual',
        'Dirección de arte',
        'Sistemas gráficos',
        'Tipografía',
        'Guidelines',
      ],
      media: illustration(servicesIdentityIllustration),
      cta: null,
      relatedProjects: [],
      theme: 'accent',
      layout: 'media-text',
    },
    {
      slug: 'digital',
      title: 'Digital',
      claim: 'Interfaces que también tienen personalidad.',
      description:
        'Diseñamos experiencias digitales donde estructura, movimiento y contenido forman parte de una misma idea.',
      capabilities: [
        'UX / UI',
        'Web',
        'Producto digital',
        'Motion',
        'Desarrollo creativo',
      ],
      media: illustration(servicesDigitalIllustration),
      cta: null,
      relatedProjects: [],
      theme: 'dark',
      layout: 'text-media',
    },
    {
      slug: 'contenido',
      title: 'Contenido',
      claim: 'Piezas que siguen funcionando cuando salen de contexto.',
      description:
        'Creamos campañas y contenidos pensados para repetirse, adaptarse y seguir siendo reconocibles.',
      capabilities: [
        'Campañas',
        'Social',
        'Dirección creativa',
        'Foto / vídeo',
        'Motion / piezas digitales',
      ],
      media: illustration(servicesContentIllustration),
      cta: null,
      relatedProjects: [],
      theme: 'light',
      layout: 'media-text',
    },
  ],
  placeholder: true,
};

export const servicesLayers: ServicesPageCopy | null =
  approvedServices ?? (demoMode ? provisionalServices : null);

export const servicesClose: ServicesCloseCopy = {
  title: 'Ahora toca verlo en acción.',
  actions: [
    { label: 'Ver proyectos', href: '/proyectos/' },
    { label: 'Hablemos', href: '/contacto/' },
  ],
  // Supplied by the user on 2026-09-15 for this section
  // (`img cta servicios.png`, kept untouched); WebP derivative (sharp,
  // quality 90, smart subsampling). The sculptures reach 23% of the width
  // from the left and start at 73% from the right; the black is about #0c0c0c.
  image: {
    src: '/assets/services/servicios-cta.webp',
    width: 2206,
    height: 713,
  },
};

/** Splits a closing full stop off a line so it can be drawn as the disc. */
export function splitFullStop(line: string): { text: string; stop: boolean } {
  const stop = line.endsWith('.');
  return { text: stop ? line.slice(0, -1) : line, stop };
}
