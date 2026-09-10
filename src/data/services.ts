import { demoMode } from './projects';

export type ServiceGlyphVariant =
  'strategy' | 'identity' | 'digital' | 'content';

export interface ServiceRecord {
  /** Stable identifier used for hooks and QA selectors. */
  id: string;
  title: string;
  /** Brief supporting copy. Deliberately short: the block is scannable. */
  description: string;
  glyph: ServiceGlyphVariant;
  /** Slug of an approved project. Kept null until real cases exist. */
  relatedProject: string | null;
  /** Real destination. Null keeps the entry non-interactive; never '#'. */
  href: string | null;
  demo: boolean;
}

/**
 * Provisional demonstration services.
 *
 * These exist only so the composition, the glyph system and the responsive
 * behaviour can be designed and QA'd before the client supplies an approved
 * services list. They follow the same isolation contract as `demoProjects`:
 * every record is flagged `demo`, the section carries `data-dev-placeholder`,
 * each description still opens with `Texto provisional de demostración.`, and
 * `check:production` keeps all three markers out of `dist/`.
 *
 * Replacing them with approved copy is a single-file change. See
 * `docs/CONTENT_NEEDED.md`.
 */
export const demoServices: ServiceRecord[] = [
  {
    id: 'estrategia',
    title: 'Estrategia',
    description:
      'Texto provisional de demostración. Buscamos el punto exacto de presión: qué defiende la marca y contra qué se define.',
    glyph: 'strategy',
    relatedProject: null,
    href: null,
    demo: true,
  },
  {
    id: 'identidad',
    title: 'Identidad',
    description:
      'Texto provisional de demostración. Sistemas visuales con carácter propio y reglas claras, capaces de sostenerse en cualquier formato.',
    glyph: 'identity',
    relatedProject: null,
    href: null,
    demo: true,
  },
  {
    id: 'digital',
    title: 'Digital',
    description:
      'Texto provisional de demostración. Piezas digitales donde el movimiento y la respuesta forman parte del mensaje, no de la decoración.',
    glyph: 'digital',
    relatedProject: null,
    href: null,
    demo: true,
  },
  {
    id: 'contenido',
    title: 'Contenido',
    description:
      'Texto provisional de demostración. Campañas pensadas para repetirse, mutar y seguir reconociéndose fuera de contexto.',
    glyph: 'content',
    relatedProject: null,
    href: null,
    demo: true,
  },
];

/**
 * Approved services are absent, so the section only receives the isolated
 * demonstration set. The standard build renders nothing.
 */
export const homeServices: ServiceRecord[] = demoMode ? demoServices : [];
