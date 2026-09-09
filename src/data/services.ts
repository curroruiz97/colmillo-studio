import { DEMO_NOTICE, demoMode } from './projects';

export type ServiceGlyphVariant = 'pressure' | 'notch' | 'module' | 'trace';

export interface ServiceRecord {
  /** Stable identifier used for hooks and the editorial panel. */
  id: string;
  /** Editorial numbering shown in the composition. */
  number: string;
  title: string;
  /** One line that always stays visible next to the title. */
  shortDescription: string;
  /** Longer editorial copy mirrored by the sticky panel. */
  description: string;
  glyph: ServiceGlyphVariant;
  /** Slug of an approved project. Kept null until real cases exist. */
  relatedProject: string | null;
  /** Real destination. Null keeps the entry non-interactive; never '#'. */
  href: string | null;
  demo: boolean;
  demoNotice?: typeof DEMO_NOTICE;
}

/**
 * Provisional demonstration services.
 *
 * These exist only so the composition, the glyph system, the editorial panel
 * and the responsive behaviour can be designed and QA'd before the client
 * supplies an approved services list. They follow the same isolation contract
 * as `demoProjects`: every record is flagged, the section renders a visible
 * `DEMO FICTICIA — NO PUBLICAR` notice, and `check:production` keeps all of it
 * out of `dist/`.
 *
 * Replacing them with approved copy is a single-file change. See
 * `docs/CONTENT_NEEDED.md`.
 */
export const demoServices: ServiceRecord[] = [
  {
    id: 'estrategia',
    number: '01',
    title: 'Estrategia',
    shortDescription: 'Dónde muerde la marca.',
    description:
      'Texto provisional de demostración. Antes de dibujar nada buscamos el punto exacto de presión: qué defiende la marca, contra qué se define y qué tiene que provocar para que alguien la recuerde.',
    glyph: 'pressure',
    relatedProject: null,
    href: null,
    demo: true,
    demoNotice: DEMO_NOTICE,
  },
  {
    id: 'identidad',
    number: '02',
    title: 'Identidad',
    shortDescription: 'Sistemas que se reconocen solos.',
    description:
      'Texto provisional de demostración. Construimos sistemas visuales con carácter propio y reglas claras, capaces de sostenerse en cualquier formato sin perder la mordida.',
    glyph: 'notch',
    relatedProject: null,
    href: null,
    demo: true,
    demoNotice: DEMO_NOTICE,
  },
  {
    id: 'digital',
    number: '03',
    title: 'Digital',
    shortDescription: 'Interfaces con temperatura.',
    description:
      'Texto provisional de demostración. Diseñamos y construimos piezas digitales donde el movimiento, el ritmo y la respuesta forman parte del mensaje, no de la decoración.',
    glyph: 'module',
    relatedProject: null,
    href: null,
    demo: true,
    demoNotice: DEMO_NOTICE,
  },
  {
    id: 'contenido',
    number: '04',
    title: 'Contenido',
    shortDescription: 'Piezas que dejan rastro.',
    description:
      'Texto provisional de demostración. Producimos campañas y piezas de contenido pensadas para repetirse, mutar y seguir reconociéndose cuando se sacan de contexto.',
    glyph: 'trace',
    relatedProject: null,
    href: null,
    demo: true,
    demoNotice: DEMO_NOTICE,
  },
];

/**
 * Approved services are absent, so the section only receives the isolated
 * demonstration set. The standard build renders nothing.
 */
export const homeServices: ServiceRecord[] = demoMode ? demoServices : [];
