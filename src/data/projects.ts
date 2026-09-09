import type { CollectionEntry } from 'astro:content';

export const DEMO_NOTICE = 'DEMO FICTICIA — NO PUBLICAR';

export type ProjectComposition = 'pressure' | 'cut' | 'trace' | 'approved';

export interface ProjectMediaItem {
  alt: string;
  caption?: string | undefined;
  height: number;
  src?: string | undefined;
  variant: ProjectComposition;
  width: number;
}

export interface ProjectRecord {
  demo: boolean;
  demoNotice?: typeof DEMO_NOTICE;
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
];

export function normalizeProject(
  project: CollectionEntry<'projects'>,
): ProjectRecord {
  return {
    demo: false,
    slug: project.id,
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
