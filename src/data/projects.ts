import type { CollectionEntry } from 'astro:content';

export const DEMO_NOTICE = 'DEMO FICTICIA — NO PUBLICAR';

export type ProjectComposition =
  'pressure' | 'cut' | 'trace' | 'bite' | 'layers' | 'approved';

/**
 * The studio's four services, and the only categories `/proyectos/` filters
 * by. A project may belong to several of them, so the filter is a membership
 * test and never a per-project rule.
 */
export const PROJECT_CATEGORIES = [
  { id: 'estrategia', label: 'Estrategia' },
  { id: 'identidad', label: 'Identidad' },
  { id: 'digital', label: 'Digital' },
  { id: 'contenido', label: 'Contenido' },
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]['id'];

const CATEGORY_LABELS = new Map<string, string>(
  PROJECT_CATEGORIES.map((category) => [category.id, category.label]),
);

export const categoryLabel = (id: string): string =>
  CATEGORY_LABELS.get(id) ?? id;

/**
 * Art direction for the archive's masonry: the shape a piece takes in the
 * grid, independent of the file's own proportion. It decides both the card's
 * aspect ratio and how many columns it spans (`projects-page.css`), so the
 * composition is directed from the data and never from a per-card rule.
 */
export const PROJECT_FORMATS = [
  'portrait',
  'square',
  'landscape',
  'wide',
] as const;

export type ProjectFormat = (typeof PROJECT_FORMATS)[number];

export interface ProjectMediaItem {
  alt: string;
  caption?: string | undefined;
  height: number;
  src?: string | undefined;
  variant: ProjectComposition;
  width: number;
}

export interface ProjectRecord {
  categories: ProjectCategory[];
  demo: boolean;
  demoNotice?: typeof DEMO_NOTICE;
  featured: boolean;
  format: ProjectFormat;
  gallery: ProjectMediaItem[];
  narrative: string[];
  services: string[];
  slug: string;
  summary: string;
  title: string;
  year: number;
  cover: ProjectMediaItem;
}

const makeDemoMedia = (
  variant: Exclude<ProjectComposition, 'approved'>,
  alt: string,
  caption: string,
): ProjectMediaItem => ({
  alt,
  caption,
  height: 900,
  variant,
  width: 1440,
});

export const demoProjects: ProjectRecord[] = [
  {
    demo: true,
    demoNotice: DEMO_NOTICE,
    slug: 'demo-fauce-elastica',
    categories: ['identidad', 'digital'],
    format: 'portrait',
    featured: true,
    title: 'Fauce Elástica',
    year: 2099,
    services: ['Identidad ficticia', 'Dirección visual experimental'],
    summary:
      'Ensayo ficticio sobre una identidad que se comprime, muerde el borde y vuelve a respirar.',
    narrative: [
      'Este caso existe únicamente para comprobar el ritmo editorial, las rutas y la respuesta del sistema de proyecto.',
      'Las formas son composiciones abstractas locales. No representan una marca, un cliente ni un encargo real.',
    ],
    cover: makeDemoMedia(
      'pressure',
      'Composición abstracta naranja comprimida por dos formas oscuras.',
      'Portada abstracta de demostración.',
    ),
    gallery: [
      makeDemoMedia(
        'pressure',
        'Círculos irregulares que presionan una superficie naranja.',
        'Estudio de presión y liberación.',
      ),
      makeDemoMedia(
        'cut',
        'Plano crema con recortes dentados y una pieza negra central.',
        'Sistema ficticio de recortes.',
      ),
    ],
  },
  {
    demo: true,
    demoNotice: DEMO_NOTICE,
    slug: 'demo-pulso-molar',
    categories: ['contenido', 'digital'],
    format: 'landscape',
    featured: false,
    title: 'Pulso Molar',
    year: 2099,
    services: ['Campaña ficticia', 'Movimiento conceptual'],
    summary:
      'Laboratorio ficticio de pulsos, repeticiones y piezas que cambian de forma bajo presión.',
    narrative: [
      'La secuencia prueba un proyecto con una cadencia más gráfica y titulares extensos sin afirmar resultados comerciales.',
      'Todo el material se genera con CSS y SVG local para evitar dependencias y derechos de terceros.',
    ],
    cover: makeDemoMedia(
      'cut',
      'Formas dentadas color crema atraviesan un campo rojo oscuro.',
      'Portada abstracta de demostración.',
    ),
    gallery: [
      makeDemoMedia(
        'cut',
        'Bandas dentadas claras se solapan sobre un fondo rojo oscuro.',
        'Prueba ficticia de ritmo.',
      ),
      makeDemoMedia(
        'trace',
        'Líneas naranjas dejan un rastro curvo sobre una superficie oscura.',
        'Prueba ficticia de trayectoria.',
      ),
      makeDemoMedia(
        'pressure',
        'Una forma naranja flexible ocupa el centro de un plano crema.',
        'Prueba ficticia de escala.',
      ),
    ],
  },
  {
    demo: true,
    demoNotice: DEMO_NOTICE,
    slug: 'demo-rastro-naranja',
    categories: ['estrategia', 'identidad'],
    format: 'wide',
    featured: true,
    title: 'Rastro Naranja',
    year: 2099,
    services: ['Sistema ficticio', 'Exploración editorial'],
    summary:
      'Caso ficticio que ensaya una huella continua entre portada, galería y navegación encadenada.',
    narrative: [
      'La composición deliberadamente abstracta permite revisar portadas, textos alternativos y proporciones sin inventar activos de cliente.',
      'El proyecto desaparece por completo del build estándar y queda protegido por comprobaciones automáticas.',
    ],
    cover: makeDemoMedia(
      'trace',
      'Un trazo naranja serpentea entre discos crema sobre fondo negro.',
      'Portada abstracta de demostración.',
    ),
    gallery: [
      makeDemoMedia(
        'trace',
        'Trazos naranjas conectan tres discos irregulares sobre fondo oscuro.',
        'Rastro ficticio continuo.',
      ),
      makeDemoMedia(
        'pressure',
        'Dos volúmenes oscuros comprimen una figura naranja.',
        'Cierre abstracto ficticio.',
      ),
    ],
  },
  {
    demo: true,
    demoNotice: DEMO_NOTICE,
    slug: 'demo-muesca-doble',
    categories: ['identidad'],
    format: 'landscape',
    featured: false,
    title: 'Muesca Doble',
    year: 2099,
    services: ['Identidad ficticia', 'Sistema gráfico de prueba'],
    summary:
      'Ensayo ficticio de una forma que pierde un pedazo y convierte la ausencia en marca.',
    narrative: [
      'Caso de relleno que existe para comprobar el ritmo de cinco piezas en el carril de la portada.',
      'No representa ninguna marca, cliente ni encargo real y no entra en el build estándar.',
    ],
    cover: makeDemoMedia(
      'bite',
      'Disco negro con un mordisco circular sobre un fondo crema tostado.',
      'Portada abstracta de demostración.',
    ),
    gallery: [
      makeDemoMedia(
        'bite',
        'Un disco oscuro pierde un pedazo redondo junto a un punto naranja.',
        'Estudio ficticio de ausencia.',
      ),
      makeDemoMedia(
        'layers',
        'Capas redondeadas de colores apiladas sobre fondo oscuro.',
        'Estudio ficticio de capas.',
      ),
    ],
  },
  {
    demo: true,
    demoNotice: DEMO_NOTICE,
    slug: 'demo-capas-en-tension',
    categories: ['estrategia', 'contenido'],
    format: 'square',
    featured: false,
    title: 'Capas en Tensión',
    year: 2099,
    services: ['Campaña ficticia', 'Ritmo editorial de prueba'],
    summary:
      'Laboratorio ficticio de capas que se empujan unas a otras hasta encontrar su sitio.',
    narrative: [
      'Caso de relleno para revisar cómo cierra el carril y cómo encadena la navegación entre proyectos.',
      'Las formas se generan con CSS local; no hay activos, clientes ni resultados detrás.',
    ],
    cover: makeDemoMedia(
      'layers',
      'Tres capas redondeadas roja, naranja y crema apiladas sobre fondo oscuro.',
      'Portada abstracta de demostración.',
    ),
    gallery: [
      makeDemoMedia(
        'layers',
        'Capas redondeadas que se solapan de abajo arriba sobre fondo oscuro.',
        'Prueba ficticia de solapamiento.',
      ),
      makeDemoMedia(
        'pressure',
        'Una forma naranja flexible presionada por anillos oscuros.',
        'Prueba ficticia de presión.',
      ),
    ],
  },
  {
    demo: true,
    demoNotice: DEMO_NOTICE,
    slug: 'demo-materia',
    categories: ['identidad', 'estrategia'],
    format: 'portrait',
    featured: false,
    title: 'Materia',
    year: 2099,
    services: ['Identidad ficticia', 'Sistema de prueba'],
    summary:
      'Estudio ficticio sobre el peso de una forma y el aire que necesita alrededor.',
    narrative: [
      'Pieza de relleno para componer la retícula del archivo con proporciones verticales.',
      'No representa ninguna marca, cliente ni encargo real y no entra en el build estándar.',
    ],
    cover: makeDemoMedia(
      'layers',
      'Capas redondeadas apiladas que se desplazan levemente entre sí.',
      'Portada abstracta de demostración.',
    ),
    gallery: [
      makeDemoMedia(
        'pressure',
        'Una figura naranja cede bajo dos volúmenes oscuros.',
        'Estudio ficticio de peso.',
      ),
    ],
  },
  {
    demo: true,
    demoNotice: DEMO_NOTICE,
    slug: 'demo-umbral',
    categories: ['digital'],
    format: 'landscape',
    featured: false,
    title: 'Umbral',
    year: 2099,
    services: ['Producto ficticio', 'Exploración de interfaz'],
    summary:
      'Ensayo ficticio sobre el momento exacto en que una interfaz deja pasar a alguien.',
    narrative: [
      'Pieza de relleno para componer la retícula del archivo con proporciones apaisadas.',
      'No representa ninguna marca, cliente ni encargo real y no entra en el build estándar.',
    ],
    cover: makeDemoMedia(
      'cut',
      'Un plano claro se abre en dos mitades dentadas sobre fondo oscuro.',
      'Portada abstracta de demostración.',
    ),
    gallery: [
      makeDemoMedia(
        'trace',
        'Un trazo naranja atraviesa una abertura estrecha.',
        'Estudio ficticio de paso.',
      ),
    ],
  },
  {
    demo: true,
    demoNotice: DEMO_NOTICE,
    slug: 'demo-volumen',
    categories: ['contenido'],
    format: 'square',
    featured: false,
    title: 'Volumen',
    year: 2099,
    services: ['Contenido ficticio', 'Dirección de piezas'],
    summary:
      'Laboratorio ficticio sobre cuánto puede crecer una pieza antes de romper su marco.',
    narrative: [
      'Pieza de relleno para componer la retícula del archivo con proporciones cuadradas.',
      'No representa ninguna marca, cliente ni encargo real y no entra en el build estándar.',
    ],
    cover: makeDemoMedia(
      'bite',
      'Un disco oscuro pierde un pedazo redondo junto a un punto naranja.',
      'Portada abstracta de demostración.',
    ),
    gallery: [
      makeDemoMedia(
        'layers',
        'Capas redondeadas que se empujan hacia arriba.',
        'Estudio ficticio de volumen.',
      ),
    ],
  },
  {
    demo: true,
    demoNotice: DEMO_NOTICE,
    slug: 'demo-ritmo',
    categories: ['digital', 'contenido'],
    format: 'portrait',
    featured: false,
    title: 'Ritmo',
    year: 2099,
    services: ['Contenido ficticio', 'Movimiento de prueba'],
    summary:
      'Ensayo ficticio de una cadencia que se acelera y se detiene sin perder el paso.',
    narrative: [
      'Pieza de relleno para componer la retícula del archivo con proporciones verticales.',
      'No representa ninguna marca, cliente ni encargo real y no entra en el build estándar.',
    ],
    cover: makeDemoMedia(
      'trace',
      'Trazos naranjas conectan discos irregulares sobre fondo oscuro.',
      'Portada abstracta de demostración.',
    ),
    gallery: [
      makeDemoMedia(
        'cut',
        'Bandas dentadas claras se solapan sobre un fondo oscuro.',
        'Estudio ficticio de cadencia.',
      ),
    ],
  },
  {
    demo: true,
    demoNotice: DEMO_NOTICE,
    slug: 'demo-fragmento',
    categories: ['estrategia', 'digital'],
    format: 'wide',
    featured: false,
    title: 'Fragmento',
    year: 2099,
    services: ['Estrategia ficticia', 'Sistema de prueba'],
    summary:
      'Caso ficticio sobre una parte que explica el conjunto mejor que el conjunto.',
    narrative: [
      'Pieza de relleno para componer la retícula del archivo con proporciones panorámicas.',
      'No representa ninguna marca, cliente ni encargo real y no entra en el build estándar.',
    ],
    cover: makeDemoMedia(
      'pressure',
      'Una forma naranja flexible comprimida entre dos anillos oscuros.',
      'Portada abstracta de demostración.',
    ),
    gallery: [
      makeDemoMedia(
        'bite',
        'Un disco oscuro pierde un pedazo redondo sobre un plano claro.',
        'Estudio ficticio de fragmento.',
      ),
    ],
  },
];

/** How many pieces the home rail shows; the archive keeps every entry. */
export const HOME_PROJECT_LIMIT = 5;

/**
 * Orders approved entries by their optional `order` field, then by slug, so
 * the client's approved sequence drives the home rail, the archive and the
 * previous/next links from one place.
 */
export function sortProjectEntries(
  entries: CollectionEntry<'projects'>[],
): CollectionEntry<'projects'>[] {
  return [...entries].sort(
    (a, b) =>
      (a.data.order ?? Number.POSITIVE_INFINITY) -
        (b.data.order ?? Number.POSITIVE_INFINITY) || a.id.localeCompare(b.id),
  );
}

export function normalizeProject(
  project: CollectionEntry<'projects'>,
): ProjectRecord {
  return {
    demo: false,
    slug: project.id,
    categories: project.data.categories,
    format: project.data.format,
    featured: project.data.featured,
    title: project.data.title,
    summary: project.data.summary,
    year: project.data.year,
    services: project.data.services,
    narrative: [],
    cover: {
      alt: project.data.coverAlt,
      height: project.data.cover.height,
      src: project.data.cover.src,
      variant: 'approved',
      width: project.data.cover.width,
    },
    gallery: project.data.gallery.map((media) => ({
      alt: media.alt,
      caption: media.caption,
      height: media.image.height,
      src: media.image.src,
      variant: 'approved',
      width: media.image.width,
    })),
  };
}

export const demoMode = import.meta.env.DEV || import.meta.env.MODE === 'demo';
