/*
 * REGISTERED CASE STUDIES — demonstration only.
 *
 * Authored studies for the provisional pieces of the archive, so the system
 * built in `src/data/caseStudy.ts` can be seen and tested end to end before a
 * single client asset exists. They are reachable in `astro dev` and in
 * `build:demo`, never in `dist/`: their slugs and titles are forbidden markers
 * in `scripts/check-production.mjs`, and `[slug].astro` only generates project
 * routes in demo mode.
 *
 * Two of the ten pieces are authored, on purpose:
 *
 *   demo-fauce-elastica  light, editorial, an identity-shaped rhythm — colour,
 *                        typography, a mosaic, one statement;
 *   demo-rastro-naranja  dark, immersive, a digital-shaped rhythm — a held
 *                        sequence of chapters, a video slot, an index.
 *
 * Read side by side they are the point of the whole system: one skeleton, two
 * pages that do not look like each other. The other eight keep the automatic
 * fallback, which is exactly what an approved project gets on the day its
 * entry lands and before anyone has written a single module.
 *
 * Nothing here is a claim. There is no client, no result, no metric and no
 * testimonial; every picture is an abstract CSS composition of the studio's
 * own vocabulary, and the copy says plainly that the page is a technical
 * demonstration. See `docs/CASE_STUDIES.md`.
 */
import type { CaseStudyInput } from './caseStudy';

/** Flagged in the page's own copy as well as in the notice above the hero. */
const DEMO_NOTE = 'Caso de demostración técnica';

const fauceElastica: CaseStudyInput = {
  client: 'Sin cliente: demostración interna',
  headline: 'Una identidad que cede sin romperse.',
  intro: [
    `${DEMO_NOTE}. Esta página existe para comprobar el sistema de casos de estudio de Colmillo: el tema por proyecto, el orden de los módulos, el ritmo editorial y la navegación al siguiente trabajo.`,
    'Las composiciones son formas abstractas dibujadas en CSS con la paleta del propio proyecto. No representan una marca, un encargo ni un resultado real.',
  ],
  deliverables: [
    'Dirección de arte',
    'Sistema de identidad',
    'Tipografía',
    'Aplicaciones',
  ],
  theme: {
    background: '#f7f3ec',
    foreground: '#1a1512',
    accent: '#cd5730',
    surface: '#e7ddcf',
    secondary: '#9d2d22',
    chrome: 'light',
  },
  layout: 'graphic',
  hero: { variant: 'full', media: { kind: 'art', variant: 'pressure' } },
  chapters: false,
  related: ['demo-pulso-molar'],
  placeholder: true,
  modules: [
    {
      type: 'text',
      chapter: { id: 'concepto', label: 'Concepto' },
      eyebrow: 'Concepto',
      title: 'La presión como sistema',
      body: [
        'El punto de partida del ensayo es sencillo: una forma que recibe presión por un borde y devuelve carácter en lugar de romperse. Todo lo demás se deriva de ahí.',
        'El módulo de texto admite tres anchos y tres alineaciones, de modo que un proyecto pueda respirar distinto sin cambiar de componente.',
      ],
      width: 'reading',
    },
    {
      type: 'fullMedia',
      media: {
        kind: 'art',
        variant: 'cut',
        ratio: 'cinematic',
        caption: 'Composición abstracta de demostración.',
      },
      bleed: true,
      reveal: 'bite',
    },
    {
      type: 'split',
      chapter: { id: 'identidad', label: 'Identidad' },
      eyebrow: 'Identidad',
      title: 'Un sistema que aguanta la deformación',
      body: [
        'El bloque partido sirve para explicar una decisión con su prueba al lado. En pantallas anchas alterna el lado de la pieza; en vertical se lee siempre el texto primero.',
      ],
      media: { kind: 'art', variant: 'layers', ratio: 'portrait' },
      side: 'end',
      press: true,
    },
    {
      type: 'palette',
      title: 'Paleta',
      colors: [
        { value: '#1a1512', name: 'Tinta' },
        { value: '#cd5730', name: 'Naranja' },
        { value: '#e7ddcf', name: 'Arena' },
        { value: '#9d2d22', name: 'Rojo' },
      ],
    },
    {
      type: 'statement',
      text: 'Una marca que no necesita presentarse.',
      accent: 'no necesita',
    },
    {
      type: 'type',
      sample: 'Aa Bb Cc',
      note: 'El espécimen usa la tipografía que el proyecto tenga licenciada; sin ella, la del sistema.',
    },
    {
      type: 'twoUp',
      items: [
        { kind: 'art', variant: 'bite', ratio: 'portrait' },
        { kind: 'art', variant: 'trace', ratio: 'landscape' },
      ],
      offset: true,
    },
    {
      type: 'gallery',
      chapter: { id: 'aplicaciones', label: 'Aplicaciones' },
      title: 'Aplicaciones',
      items: [
        { kind: 'art', variant: 'pressure', ratio: 'square' },
        { kind: 'art', variant: 'layers', ratio: 'portrait' },
        { kind: 'art', variant: 'cut', ratio: 'landscape' },
        { kind: 'art', variant: 'trace', ratio: 'square' },
      ],
    },
  ],
};

const rastroNaranja: CaseStudyInput = {
  client: 'Sin cliente: demostración interna',
  headline: 'Un rastro que se sigue solo.',
  intro: [
    `${DEMO_NOTE}. La segunda página comparte exactamente los mismos componentes que la primera y no se le parece: cambia el tema, el ritmo y la selección de módulos.`,
    'Aquí el proyecto se cuenta con capítulos sostenidos y una pieza audiovisual, que es como se contaría un trabajo digital.',
  ],
  deliverables: ['Estrategia', 'Sistema digital', 'Motion', 'Desarrollo'],
  theme: {
    background: '#121417',
    foreground: '#f2f1ef',
    accent: '#cd5730',
    surface: '#1e2228',
    secondary: '#e7ddcf',
    chrome: 'dark',
  },
  layout: 'immersion',
  hero: { variant: 'full', media: { kind: 'art', variant: 'trace' } },
  chapters: true,
  related: ['demo-muesca-doble'],
  placeholder: true,
  modules: [
    {
      type: 'text',
      chapter: { id: 'punto-de-partida', label: 'Punto de partida' },
      eyebrow: 'Punto de partida',
      title: 'Continuidad',
      body: [
        'Un proyecto digital se explica mejor mientras se mueve. Esta página lo prueba con un capítulo sostenido, una pieza a pantalla completa y un índice lateral.',
      ],
      width: 'reading',
    },
    {
      type: 'sticky',
      chapter: { id: 'sistema', label: 'Sistema' },
      title: 'Cómo se construye',
      steps: [
        {
          title: 'Concepto',
          body: 'La columna de la izquierda se sostiene mientras la pieza de la derecha cambia con el scroll. En vertical se convierte en una secuencia normal.',
          media: { kind: 'art', variant: 'trace', ratio: 'landscape' },
        },
        {
          title: 'Sistema',
          body: 'Cada capítulo lleva su propia pieza. El módulo no se usa en todos los proyectos: sólo cuando el contenido lo justifica.',
          media: { kind: 'art', variant: 'layers', ratio: 'landscape' },
        },
        {
          title: 'Movimiento',
          body: 'El cambio es una transición de opacidad y unos pocos píxeles, nunca un salto ni un zoom.',
          media: { kind: 'art', variant: 'pressure', ratio: 'landscape' },
        },
      ],
    },
    {
      type: 'fullMedia',
      media: { kind: 'art', variant: 'bite', ratio: 'wide' },
      bleed: true,
      reveal: 'bite',
    },
    {
      type: 'process',
      chapter: { id: 'proceso', label: 'Proceso' },
      title: 'Proceso',
      steps: [
        {
          label: 'Boceto',
          media: { kind: 'art', variant: 'cut', ratio: 'square' },
        },
        {
          label: 'Estructura',
          media: { kind: 'art', variant: 'layers', ratio: 'square' },
        },
        {
          label: 'Prueba',
          media: { kind: 'art', variant: 'pressure', ratio: 'square' },
        },
        {
          label: 'Pieza',
          media: { kind: 'art', variant: 'trace', ratio: 'square' },
        },
      ],
    },
    {
      type: 'statement',
      text: 'El movimiento presenta el trabajo; no compite con él.',
      accent: 'no compite',
    },
    {
      type: 'facts',
      chapter: { id: 'ficha', label: 'Ficha' },
      title: 'Ficha',
      items: [
        { label: 'Formato', value: 'Demostración técnica' },
        { label: 'Módulos', value: 'Catorce disponibles' },
        { label: 'Estado', value: 'No publicable' },
      ],
    },
  ],
};

/**
 * Slug to authored study. A project absent from this map — every approved one,
 * today — resolves through the automatic fallback in `resolveCaseStudy()`.
 */
export const caseStudies: Readonly<Record<string, CaseStudyInput>> = {
  'demo-fauce-elastica': fauceElastica,
  'demo-rastro-naranja': rastroNaranja,
};
