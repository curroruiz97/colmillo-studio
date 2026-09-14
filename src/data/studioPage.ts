import { demoMode } from './projects';

/*
 * `/studio/` content, in one place.
 *
 * Every block follows the isolation contract of `studio.ts` and
 * `services.ts`: an `approved…` record (null until the client signs it off),
 * a flagged demonstration record for development and `build:demo`, and
 * nothing in the standard build. A section whose record resolves to `null` is
 * not rendered, and a flagged record makes its section carry
 * `data-dev-placeholder`, which `check:production` forbids in `dist/`.
 *
 * The hero title and the closing call to action were given by the user as
 * final wording, so they ship in both builds.
 */

export interface StudioImage {
  src: string;
  /** Empty only when the picture adds nothing to the text beside it. */
  alt: string;
  width: number;
  height: number;
}

/**
 * A sentence with a few words set in orange: `text`, then `accent`, then
 * `after` (usually the closing punctuation, kept out of the colour).
 */
export interface StudioAccentLine {
  text: string;
  accent?: string | undefined;
  after?: string | undefined;
}

export interface StudioIntroCopy {
  /** Sentence case, one moderate heading. */
  title: string;
  /** First paragraph; its accent is orange. */
  lede: StudioAccentLine;
  /** Further paragraphs, set exactly like the lede (one editorial piece). */
  body: string[];
  placeholder: boolean;
}

/** Which abstract composition stands in until the principle's image exists. */
export type StudioPrincipleArt = 'look' | 'think' | 'make' | 'launch';

export interface StudioPrinciple {
  /** Anchor slug: `#principio-<id>`. */
  id: string;
  name: string;
  description: string;
  /**
   * Approved picture for the right-hand column, or null while the placeholder
   * stands in. It is a decorative companion of the text (rendered with empty
   * alternative text), so its `alt` is not published. 4:5 or taller.
   */
  image: StudioImage | null;
  art: StudioPrincipleArt;
}

export interface StudioPrinciplesCopy {
  title: string;
  items: StudioPrinciple[];
  placeholder: boolean;
}

export interface StudioMember {
  name: string;
  role: string;
  /** Portrait, 4:5 or taller, at least 1200 px on the long side. */
  photo: StudioImage | null;
  /** Optional personal link (portfolio, LinkedIn…). */
  href?: string | undefined;
}

export interface StudioTeamCopy {
  title: string;
  lede: string;
  members: StudioMember[];
  placeholder: boolean;
}

export interface StudioCloseCopy {
  /** A closing "?" is set in orange. */
  title: string;
  action: { label: string; href: string };
  /**
   * The section's photograph: a black field on the left for the copy and the
   * sculpture on the right. Decorative (empty alternative text).
   */
  image: StudioImage;
}

export const studioHero = { title: 'Studio' } as const;

/* ---------------------------------------------------------------- intro --- */

/** Approved "Somos Colmillo" copy. None yet: see `docs/CONTENT_NEEDED.md`. */
const approvedIntro: StudioIntroCopy | null = null;

/** Provisional copy supplied by the user on 2026-09-11 — NOT APPROVED. */
const demoIntro: StudioIntroCopy = {
  title: 'Somos Colmillo',
  lede: {
    text: 'Un estudio creativo nacido con una idea sencilla: las marcas no deberían limitarse a estar ahí. Deberían',
    accent: 'provocar algo',
    after: '.',
  },
  body: [
    'Trabajamos entre estrategia, identidad, diseño y digital para construir marcas con una voz propia y una forma reconocible de estar en el mundo.',
  ],
  placeholder: true,
};

export const studioIntro: StudioIntroCopy | null =
  approvedIntro ?? (demoMode ? demoIntro : null);

/* ----------------------------------------------------------- principles --- */

/** Approved principles. None yet: see `docs/CONTENT_NEEDED.md`. */
const approvedPrinciples: StudioPrinciplesCopy | null = null;

/**
 * Provisional principles — NOT APPROVED. Structure supplied by the user on
 * 2026-09-11; the four steps renamed and their temporary copy supplied on
 * 2026-09-14 (Mirar, Pensar, Crear, Lanzar). Each `image` is the slot for its
 * final picture; until then `art` picks the abstract placeholder.
 */
const demoPrinciples: StudioPrinciplesCopy = {
  title: 'Cómo hacemos las cosas',
  items: [
    {
      id: 'mirar',
      name: 'Mirar',
      description:
        'Entender el contexto, escuchar, preguntar y encontrar dónde está realmente el problema.',
      image: null,
      art: 'look',
    },
    {
      id: 'pensar',
      name: 'Pensar',
      description:
        'Convertir lo aprendido en una dirección clara antes de empezar a diseñar.',
      image: null,
      art: 'think',
    },
    {
      id: 'crear',
      name: 'Crear',
      description:
        'Dar forma a la idea y construir una identidad, pieza o experiencia con personalidad propia.',
      image: null,
      art: 'make',
    },
    {
      id: 'lanzar',
      name: 'Lanzar',
      description:
        'Ponerla en movimiento, hacerla vivir y seguir afinándola cuando entra en contacto con el mundo.',
      image: null,
      art: 'launch',
    },
  ],
  placeholder: true,
};

export const studioPrinciples: StudioPrinciplesCopy | null =
  approvedPrinciples ?? (demoMode ? demoPrinciples : null);

/* ----------------------------------------------------------------- team --- */

/** Approved team. None yet: see `docs/CONTENT_NEEDED.md`. */
const approvedTeam: StudioTeamCopy | null = null;

/**
 * Structural placeholders — NOT PEOPLE. No name, role or face is invented:
 * every entry reads "Nombre" / "Rol" and shows a flat placeholder portrait.
 * The count only demonstrates the grid's rhythm; the real list sets it.
 */
const placeholderMember: StudioMember = {
  name: 'Nombre',
  role: 'Rol',
  photo: null,
};

const demoTeam: StudioTeamCopy = {
  title: 'Equipo',
  lede: 'Las personas detrás de Colmillo.',
  members: Array.from({ length: 6 }, () => ({ ...placeholderMember })),
  placeholder: true,
};

export const studioTeam: StudioTeamCopy | null =
  approvedTeam ?? (demoMode ? demoTeam : null);

/* ---------------------------------------------------------------- close --- */

export const studioClose: StudioCloseCopy = {
  title: '¿Hacemos algo juntos?',
  action: { label: 'Hablemos', href: '/contacto/' },
  // Supplied by the user on 2026-09-14 for this section
  // (`bg cta studio.png`); WebP derivative, 2048x768.
  image: {
    src: '/assets/motion/studio/studio-cta.webp',
    alt: '',
    width: 2048,
    height: 768,
  },
};

/** Splits a closing ".", "?" or "!" off a line so it can be set in orange. */
export function splitClosingMark(line: string): { text: string; mark: string } {
  const mark = /[.?!]$/.exec(line)?.[0] ?? '';
  return { text: mark ? line.slice(0, -1) : line, mark };
}
