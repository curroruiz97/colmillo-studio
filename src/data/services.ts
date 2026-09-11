import {
  servicesContentIllustration,
  servicesDigitalIllustration,
  servicesIdentityIllustration,
  type BrandImage,
} from '@/config/assets';
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
  /**
   * This service's own illustration, shown in place of the shared one while
   * the service is on stage (the sequence cross-fades between them). Null
   * keeps the shared illustration. Transparent art on ink, decorative, ideally
   * with the shared file's 1202:696 proportion so the frame never changes.
   */
  image: BrandImage | null;
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
    image: null,
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
    image: servicesIdentityIllustration,
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
    image: servicesDigitalIllustration,
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
    image: servicesContentIllustration,
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

/**
 * The route behind the home section's `Abrir servicios ↗` CTA, beside the
 * heading. `/servicios/` exists since 2026-09-11 (in `primaryNavigation`).
 * Null would remove the CTA entirely: never a placeholder link, never '#'.
 */
export const servicesPage: { href: string | null; label: string } = {
  href: '/servicios/',
  label: 'Abrir servicios',
};
