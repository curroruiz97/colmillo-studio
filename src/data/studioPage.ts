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

/** A sentence whose closing words are set in the accessible orange. */
export interface StudioAccentLine {
  text: string;
  accent?: string | undefined;
}

export interface StudioIntroCopy {
  /** Headline lines; the break is designed. A closing "." turns orange. */
  title: string[];
  lede: StudioAccentLine;
  body: string[];
  placeholder: boolean;
}

/** Which abstract composition stands in until the principle's image exists. */
export type StudioPrincipleArt = 'look' | 'stretch' | 'bite' | 'release';

export interface StudioPrinciple {
  /** Anchor slug: `#principio-<id>`. */
  id: string;
  index: string;
  name: string;
  description: string;
  /** Approved image for the stage, or null while the placeholder stands in. */
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
}

export const studioHero = { title: 'Studio' } as const;

/* ---------------------------------------------------------------- intro --- */

/** Approved "Somos Colmillo" copy. None yet: see `docs/CONTENT_NEEDED.md`. */
const approvedIntro: StudioIntroCopy | null = null;

/** Provisional copy supplied by the user on 2026-09-11 — NOT APPROVED. */
const demoIntro: StudioIntroCopy = {
  title: ['Somos', 'Colmillo.'],
  lede: {
    text: 'Un estudio creativo nacido con una idea sencilla: las marcas no deberían limitarse a estar ahí. Deberían',
    accent: 'provocar algo.',
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
 * Provisional principles supplied by the user on 2026-09-11 — NOT APPROVED.
 * Each `image` is the slot for its final picture (mirar, tensar, morder,
 * soltar); until then `art` picks the abstract placeholder.
 */
const demoPrinciples: StudioPrinciplesCopy = {
  title: 'Cómo hacemos las cosas',
  items: [
    {
      id: 'mirar',
      index: '01',
      name: 'Mirar',
      description:
        'Entender antes de tocar. Leer el contexto, hacer preguntas y encontrar aquello que merece nuestra atención.',
      image: null,
      art: 'look',
    },
    {
      id: 'tensar',
      index: '02',
      name: 'Tensar',
      description:
        'Llevar la idea un poco más lejos. Sacarla de lo cómodo hasta encontrar algo que tenga carácter.',
      image: null,
      art: 'stretch',
    },
    {
      id: 'morder',
      index: '03',
      name: 'Morder',
      description:
        'Convertir la intención en una forma reconocible. Clara, propia y difícil de ignorar.',
      image: null,
      art: 'bite',
    },
    {
      id: 'soltar',
      index: '04',
      name: 'Soltar',
      description:
        'Construir algo capaz de vivir, moverse y crecer cuando deja nuestras manos.',
      image: null,
      art: 'release',
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
  title: 'Los que muerden',
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
};

/** Splits a closing ".", "?" or "!" off a line so it can be set in orange. */
export function splitClosingMark(line: string): { text: string; mark: string } {
  const mark = /[.?!]$/.exec(line)?.[0] ?? '';
  return { text: mark ? line.slice(0, -1) : line, mark };
}
