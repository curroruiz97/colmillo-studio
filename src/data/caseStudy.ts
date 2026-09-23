/*
 * CASE STUDY MODEL — /proyectos/[slug]/
 *
 * One structure, many art directions. Every case study shares the same
 * skeleton — hero, metadata, introduction, a sequence of modules, the next
 * project — but each one carries its own palette, its own rhythm and its own
 * choice and order of modules, so two projects never read alike while both
 * stay unmistakably Colmillo.
 *
 * Nothing here invents content. A project that declares no case study at all
 * still publishes a complete page: `resolveCaseStudy()` builds a minimal one
 * from the record the archive already has (cover, summary, gallery). Authoring
 * is therefore additive, never required, and the first approved project works
 * the moment its entry exists.
 *
 * The three sources, in order of precedence:
 *
 *   1. an approved collection entry (`src/content/projects/*.md`), whose
 *      frontmatter is validated by `caseStudyFields` in `src/content.config.ts`;
 *   2. a registered study in `src/data/caseStudies.ts` (demo build only);
 *   3. the automatic fallback below.
 *
 * See `docs/CASE_STUDIES.md` for the authoring guide.
 */
import type { ProjectCategory, ProjectRecord } from './projects';

/* ----------------------------------------------------------------- media --- */

/**
 * The shape a piece of media takes in its frame. `auto` keeps the file's own
 * proportion; every other value is art direction and crops with `cover`.
 */
export type CaseStudyRatio =
  'portrait' | 'square' | 'landscape' | 'cinematic' | 'wide' | 'auto';

/**
 * Abstract compositions in the studio's own vocabulary, drawn in CSS
 * (`case-study.css`). They stand in while a project has no file for a slot and
 * are the only "images" the demonstration uses: no photograph, mockup or
 * client asset is ever invented.
 */
export type CaseStudyArt = 'pressure' | 'cut' | 'trace' | 'bite' | 'layers';

interface MediaBase {
  ratio?: CaseStudyRatio | undefined;
  /** Approved caption. Never write one to explain a placeholder. */
  caption?: string | undefined;
}

export interface CaseStudyImage extends MediaBase {
  kind: 'image';
  src: string;
  width: number;
  height: number;
  /** Empty marks the piece decorative; informative media must describe itself. */
  alt: string;
  /** `object-position`, for a crop that must keep its subject. */
  focus?: string | undefined;
}

export interface CaseStudyVideo extends MediaBase {
  kind: 'video';
  webm?: string | undefined;
  mp4?: string | undefined;
  poster: string;
  width: number;
  height: number;
  alt: string;
  /**
   * `loop` plays silently on screen with no controls; `controls` waits for the
   * visitor and keeps its sound. Not every video is a loop.
   */
  mode?: 'loop' | 'controls' | undefined;
}

export interface CaseStudyArtwork extends MediaBase {
  kind: 'art';
  variant: CaseStudyArt;
}

export type CaseStudyMedia = CaseStudyImage | CaseStudyVideo | CaseStudyArtwork;

/* ----------------------------------------------------------------- theme --- */

/**
 * The project's palette. It is published as custom properties on the page's
 * root (`--cs-bg` and friends, `case-study.css`), so changing a case study's
 * identity is changing these six values and nothing else.
 *
 * `chrome` says which global wordmark reads on the first screen: `light` for a
 * pale hero (the black mark), `dark` for a deep one (the cream mark). It also
 * drives the surface tone the shared cursor follows.
 */
export interface CaseStudyTheme {
  background: string;
  foreground: string;
  accent: string;
  /** Plates, frames and quiet fields inside the page. */
  surface: string;
  /** A second accent for palettes, rules and marks; may equal `accent`. */
  secondary: string;
  chrome: 'light' | 'dark';
}

/**
 * The studio's own colours: what a project gets when it asks for nothing.
 * The ground is the site's light surface (`--color-brand-cream`) and the
 * recessed field is `--color-brand-cream-deep`, which keeps the plates and
 * quiet fields readable against it; the neutral #f2ede7 they used while the
 * site was white is within 1.02:1 of cream and would disappear on it.
 */
export const CASE_STUDY_THEME: CaseStudyTheme = {
  background: '#fceeda',
  foreground: '#12100f',
  accent: '#cd5730',
  surface: '#ead2b4',
  secondary: '#9d2d22',
  chrome: 'light',
};

/**
 * Only literal hex colours are accepted. The value reaches a stylesheet, and
 * frontmatter is client-authored, so anything else falls back to the studio's
 * own colour rather than being written out.
 */
const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

export const safeColor = (
  value: string | undefined,
  fallback: string,
): string => (value !== undefined && HEX.test(value) ? value : fallback);

export function resolveTheme(
  theme: Partial<CaseStudyTheme> | undefined,
): CaseStudyTheme {
  return {
    background: safeColor(theme?.background, CASE_STUDY_THEME.background),
    foreground: safeColor(theme?.foreground, CASE_STUDY_THEME.foreground),
    accent: safeColor(theme?.accent, CASE_STUDY_THEME.accent),
    surface: safeColor(theme?.surface, CASE_STUDY_THEME.surface),
    secondary: safeColor(
      theme?.secondary ?? theme?.accent,
      CASE_STUDY_THEME.secondary,
    ),
    chrome: theme?.chrome === 'dark' ? 'dark' : 'light',
  };
}

/* ----------------------------------------------------------------- spine --- */

/**
 * THE SPINE — the one structure every case study shares.
 *
 * The modules below are art direction: a project chooses them and their order,
 * so two pages never read alike. The spine is the opposite, and deliberately
 * so (client direction, 2026-09-23): every project answers the same three
 * questions, in the same order, under the same names, so the portfolio can be
 * read as a set rather than as a series of one-offs.
 *
 *   Estrategia   what we thought
 *   Ejecución    what we made
 *   Resultados   what it did
 *
 * An author cannot rename, reorder or add a beat; the canonical order below is
 * the only one there is. The one thing a project decides is how much of it it
 * can answer yet: a beat with no approved copy is simply not rendered, and a
 * project with none at all publishes exactly the page it publishes today. That
 * is the rule that keeps the template honest — it never writes a narrative a
 * project has not been given.
 */
export interface CaseStudyFigure {
  /** The figure as it is to be read, with its unit: "+128%", "4,5 M", "12". */
  value: string;
  /** What it counts. Never a claim the client has not approved. */
  label: string;
}

export interface CaseStudyBeatInput {
  body: string[];
  /**
   * The piece of work that takes the held frame while this beat is being
   * read. Without one the beat keeps whatever the previous beat put there.
   */
  media?: CaseStudyMedia | undefined;
  /**
   * Only on `results`, and only ever verifiable, approved numbers. The studio
   * does not invent a metric, and a beat with none is complete without them.
   */
  figures?: CaseStudyFigure[] | undefined;
}

/** What an author fills in. The keys are the template; there are no others. */
export interface CaseStudySpineInput {
  strategy?: CaseStudyBeatInput | undefined;
  execution?: CaseStudyBeatInput | undefined;
  results?: CaseStudyBeatInput | undefined;
}

export type CaseStudyBeatKey = keyof CaseStudySpineInput;

/** The canonical order, its anchors and its names. Not data: the template. */
export const CASE_STUDY_BEATS: {
  key: CaseStudyBeatKey;
  id: string;
  label: string;
}[] = [
  { key: 'strategy', id: 'estrategia', label: 'Estrategia' },
  { key: 'execution', id: 'ejecucion', label: 'Ejecución' },
  { key: 'results', id: 'resultados', label: 'Resultados' },
];

/** A beat, resolved: always numbered, always named, always with a frame. */
export interface CaseStudyBeat {
  key: CaseStudyBeatKey;
  id: string;
  label: string;
  /** Its place in the canonical order, from 1, for the numeral and the rail. */
  index: number;
  body: string[];
  media: CaseStudyMedia;
  figures: CaseStudyFigure[];
}

/* --------------------------------------------------------------- modules --- */

/**
 * A module may open a chapter. With `chapters: true` on the project those
 * chapters become the route's internal index; without it they are only
 * anchors, and a short project shows no index at all.
 */
export interface CaseStudyChapter {
  /** Anchor: `/proyectos/<slug>/#<id>`. */
  id: string;
  label: string;
}

interface ModuleBase {
  chapter?: CaseStudyChapter | undefined;
}

/**
 * The studio's signature on this route: an organic concave mask, the same
 * geometry as the pressure dent on the archive's cards, opening off the media
 * as it arrives. It is deliberately rationed — the renderer keeps the first
 * three on a page and ignores the rest — so it stays a mark and never a
 * mannerism.
 */
export type CaseStudyReveal = 'bite';

/** 01 — one piece of media, edge to edge or inside the measure. */
export interface FullMediaModule extends ModuleBase {
  type: 'fullMedia';
  media: CaseStudyMedia;
  /** Touching both edges of the screen, or held inside the wide container. */
  bleed?: boolean | undefined;
  reveal?: CaseStudyReveal | undefined;
  /** Gives a few pixels under a fine pointer (the shared dent). */
  press?: boolean | undefined;
}

/** 02 — an editorial block: eyebrow, title, paragraphs. */
export interface TextModule extends ModuleBase {
  type: 'text';
  eyebrow?: string | undefined;
  title?: string | undefined;
  body: string[];
  align?: 'start' | 'center' | 'end' | undefined;
  width?: 'narrow' | 'reading' | 'wide' | undefined;
}

/** 03 — copy on one side, media on the other. */
export interface SplitModule extends ModuleBase {
  type: 'split';
  eyebrow?: string | undefined;
  title?: string | undefined;
  body: string[];
  media: CaseStudyMedia;
  /** Which side the media takes on wide screens. */
  side?: 'start' | 'end' | undefined;
  press?: boolean | undefined;
}

/** 04 — two pieces side by side, each keeping its own proportion. */
export interface TwoUpModule extends ModuleBase {
  type: 'twoUp';
  items: [CaseStudyMedia, CaseStudyMedia];
  /** Drops the second piece a little, so the pair is never symmetrical. */
  offset?: boolean | undefined;
}

/** 05 — a small controlled mosaic, never a copy of the archive's grid. */
export interface GalleryModule extends ModuleBase {
  type: 'gallery';
  items: CaseStudyMedia[];
  title?: string | undefined;
}

/** 06 — one large video, looping silently or with real controls. */
export interface VideoModule extends ModuleBase {
  type: 'video';
  media: CaseStudyVideo;
  bleed?: boolean | undefined;
  reveal?: CaseStudyReveal | undefined;
}

/** 07 — one sentence at the size of the screen. A break in the rhythm. */
export interface StatementModule extends ModuleBase {
  type: 'statement';
  text: string;
  /** A fragment of `text` set in the project's accent. */
  accent?: string | undefined;
}

/** 08 — chapters that hold while their media changes beside them. */
export interface StickyModule extends ModuleBase {
  type: 'sticky';
  title?: string | undefined;
  steps: { title: string; body: string; media: CaseStudyMedia }[];
}

/** 09 — a short horizontal sequence: sketch, test, decision, piece. */
export interface ProcessModule extends ModuleBase {
  type: 'process';
  title?: string | undefined;
  steps: { label: string; note?: string | undefined; media: CaseStudyMedia }[];
}

/** 10 — a real, approved quotation. Never written by the studio. */
export interface QuoteModule extends ModuleBase {
  type: 'quote';
  text: string;
  author?: string | undefined;
  role?: string | undefined;
}

/** 11 — verifiable facts only: scope, duration, markets, platforms. */
export interface FactsModule extends ModuleBase {
  type: 'facts';
  title?: string | undefined;
  items: { label: string; value: string }[];
}

/** 12 — the project's colours as large fields, not swatch cards. */
export interface PaletteModule extends ModuleBase {
  type: 'palette';
  title?: string | undefined;
  colors: { value: string; name?: string | undefined }[];
}

/**
 * 13 — the project's own typography at scale. It never loads a face: the
 * sample is set in `stack`, which must name fonts the project is licensed to
 * serve, and falls back to the page's own type when it is absent.
 */
export interface TypeModule extends ModuleBase {
  type: 'type';
  sample: string;
  note?: string | undefined;
  stack?: string | undefined;
}

/** 14 — frames of one movement, crossfaded by the scroll. */
export interface SequenceModule extends ModuleBase {
  type: 'sequence';
  frames: CaseStudyImage[];
  title?: string | undefined;
}

export type CaseStudyModule =
  | FullMediaModule
  | TextModule
  | SplitModule
  | TwoUpModule
  | GalleryModule
  | VideoModule
  | StatementModule
  | StickyModule
  | ProcessModule
  | QuoteModule
  | FactsModule
  | PaletteModule
  | TypeModule
  | SequenceModule;

export type CaseStudyModuleType = CaseStudyModule['type'];

/* ------------------------------------------------------------ case study --- */

/**
 * How the shared skeleton is paced. It never changes the components, only the
 * air between them, the measure of the copy and how dense the media is, so a
 * strategy project can read as an essay and a digital one as a reel.
 */
export type CaseStudyLayout = 'editorial' | 'immersion' | 'graphic' | 'minimal';

/** The first screen. `full` is the default: the project's own universe. */
export type CaseStudyHeroVariant = 'full' | 'contained' | 'split';

export interface CaseStudyHero {
  media: CaseStudyMedia;
  variant: CaseStudyHeroVariant;
}

export interface CaseStudySeo {
  title?: string | undefined;
  description?: string | undefined;
  image?: string | undefined;
  imageAlt?: string | undefined;
}

/** Everything a case study page renders, already resolved and complete. */
export interface CaseStudy {
  slug: string;
  title: string;
  client: string | null;
  year: number | null;
  categories: ProjectCategory[];
  services: string[];
  deliverables: string[];
  /** The project's own headline beside the metadata. Its idea in one line. */
  headline: string | null;
  intro: string[];
  /**
   * The fixed narrative every project shares, already numbered and with its
   * frame resolved. Empty when the project has no approved copy for any beat,
   * and the route then simply does not render the section.
   */
  spine: CaseStudyBeat[];
  /**
   * The pieces that stand beside the brief, in order. Two is the shape the
   * template is built for — an image and a film, or two images — but the
   * column takes whatever a project supplies.
   */
  showcase: CaseStudyMedia[];
  hero: CaseStudyHero;
  theme: CaseStudyTheme;
  layout: CaseStudyLayout;
  modules: CaseStudyModule[];
  /** Whether the internal index is offered (only worth it on long projects). */
  chapters: boolean;
  /** Approved slugs, in order; the first one is the "next project" stage. */
  related: string[];
  seo: CaseStudySeo;
  /** Provisional content: flagged on the page and excluded from `dist/`. */
  placeholder: boolean;
}

/** What an author supplies. Everything is optional but the modules' shape. */
export interface CaseStudyInput {
  client?: string | undefined;
  headline?: string | undefined;
  intro?: string[] | undefined;
  spine?: CaseStudySpineInput | undefined;
  showcase?: CaseStudyMedia[] | undefined;
  deliverables?: string[] | undefined;
  hero?:
    | {
        media?: CaseStudyMedia | undefined;
        variant?: CaseStudyHeroVariant | undefined;
      }
    | undefined;
  theme?: Partial<CaseStudyTheme> | undefined;
  layout?: CaseStudyLayout | undefined;
  modules?: CaseStudyModule[] | undefined;
  chapters?: boolean | undefined;
  related?: string[] | undefined;
  seo?: CaseStudySeo | undefined;
  placeholder?: boolean | undefined;
}

/** The abstract compositions cycle, so a fallback page is never one texture. */
const FALLBACK_ART: CaseStudyArt[] = [
  'pressure',
  'cut',
  'trace',
  'bite',
  'layers',
];

const artFor = (index: number): CaseStudyArtwork => ({
  kind: 'art',
  variant: FALLBACK_ART[index % FALLBACK_ART.length] ?? 'pressure',
});

/**
 * Turns a piece of the archive's own media into case-study media. The archive
 * stores either an approved file or one of the abstract compositions, and both
 * keep their meaning here.
 */
function fromRecordMedia(
  media: ProjectRecord['cover'],
  index: number,
  ratio?: CaseStudyRatio,
): CaseStudyMedia {
  if (!media.src) {
    return {
      ...artFor(index),
      ...(media.caption ? { caption: media.caption } : {}),
      ...(ratio ? { ratio } : {}),
    };
  }
  return {
    kind: 'image',
    src: media.src,
    width: media.width,
    height: media.height,
    alt: media.alt,
    ...(media.caption ? { caption: media.caption } : {}),
    ...(ratio ? { ratio } : {}),
  };
}

/**
 * The spine, resolved against the canonical order.
 *
 * Three rules, and they are the whole of it:
 *
 *   1. a beat with no approved body copy does not exist — nothing is written
 *      on a project's behalf, so the section grows as a project is signed off
 *      rather than appearing full of placeholders on day one;
 *   2. the order and the names come from `CASE_STUDY_BEATS`, never from the
 *      author, so every project reads the same way;
 *   3. a beat with no media of its own keeps the frame the previous beat put
 *      there, and the first beat falls back to the hero's own piece. The held
 *      frame is therefore never empty and never shows anything the project did
 *      not already supply.
 */
function resolveSpine(
  input: CaseStudySpineInput | undefined,
  heroMedia: CaseStudyMedia,
): CaseStudyBeat[] {
  if (!input) return [];
  let frame = heroMedia;
  const beats: CaseStudyBeat[] = [];
  for (const beat of CASE_STUDY_BEATS) {
    const authored = input[beat.key];
    const body = authored?.body?.filter((line) => line.trim().length > 0) ?? [];
    if (body.length === 0) continue;
    frame = authored?.media ?? frame;
    beats.push({
      key: beat.key,
      id: beat.id,
      label: beat.label,
      /* The numeral is the beat's place in the template, not in this page, so
         a project that can only answer the last question is still "03". */
      index: CASE_STUDY_BEATS.indexOf(beat) + 1,
      body,
      media: frame,
      figures: beat.key === 'results' ? (authored?.figures ?? []) : [],
    });
  }
  return beats;
}

/**
 * The complete case study for a project.
 *
 * Anything the author did not supply is taken from the record the archive
 * already holds, so a project with no authored study still publishes a hero
 * (its cover), an introduction (its summary and narrative) and its gallery as
 * full-width pieces. Nothing is invented: every value here already existed.
 */
export function resolveCaseStudy(
  project: ProjectRecord,
  input?: CaseStudyInput | undefined,
): CaseStudy {
  const intro =
    input?.intro && input.intro.length > 0
      ? input.intro
      : project.narrative.length > 0
        ? project.narrative
        : [project.summary];

  /* One value for both the hero and the spine's first frame. */
  const heroMedia: CaseStudyMedia =
    input?.hero?.media ?? fromRecordMedia(project.cover, 0, 'cinematic');

  const modules: CaseStudyModule[] =
    input?.modules && input.modules.length > 0
      ? input.modules
      : project.gallery.map((media, index) => ({
          type: 'fullMedia' as const,
          media: fromRecordMedia(media, index + 1),
          bleed: index % 2 === 1,
        }));

  return {
    slug: project.slug,
    title: project.title,
    client: input?.client ?? null,
    year: project.year,
    categories: project.categories,
    services: project.services,
    deliverables: input?.deliverables ?? [],
    headline: input?.headline ?? null,
    intro,
    spine: resolveSpine(input?.spine, heroMedia),
    /*
     * What the column shows when a project has not directed it: the cover the
     * archive already holds and the first piece of its gallery. Both are
     * approved media that already exist, so the template is complete on the
     * day a project lands and nothing is invented to fill it.
     */
    showcase:
      input?.showcase && input.showcase.length > 0
        ? input.showcase
        : [
            heroMedia,
            ...project.gallery
              .slice(0, 1)
              .map((media, index) => fromRecordMedia(media, index + 1)),
          ],
    hero: { media: heroMedia, variant: input?.hero?.variant ?? 'full' },
    theme: resolveTheme(input?.theme),
    layout: input?.layout ?? 'editorial',
    modules,
    chapters: input?.chapters === true,
    related: input?.related ?? [],
    seo: input?.seo ?? {},
    placeholder: input?.placeholder ?? project.demo,
  };
}

/** Whether a module carries something the internal index can point at. */
export const chapterOf = (
  module: CaseStudyModule,
): CaseStudyChapter | undefined => module.chapter;
