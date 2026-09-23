/*
 * REGISTERED CASE STUDIES — demonstration only.
 *
 * Authored studies for the ten provisional pieces of the archive, so the
 * project template built in `src/data/caseStudy.ts` can be seen and tested end
 * to end before a single client asset exists. They are reachable in `astro
 * dev` and in `build:demo`, never in `dist/`: their slugs, their titles and
 * their invented client names are all forbidden markers in
 * `scripts/check-production.mjs`, and `[slug].astro` only generates project
 * routes in demo mode.
 *
 * Since 2026-09-23 **every** project is registered, and every one of them is
 * built by the same `demoStudy()` below. That is the point of the file now:
 * the template is one shape and the archive shows it holding ten times, so
 * there is no longer an authored page and a fallback page that read as two
 * different products.
 *
 * None of them declares a palette either (client direction, 2026-09-23): every
 * project page stands on the site's own cream, which is what
 * `CASE_STUDY_THEME` resolves to when a project asks for nothing. The
 * per-project palette is still in the model and still validated, so an
 * approved project could take a surface of its own later; no demonstration
 * does.
 *
 * Nothing here is a claim. There is no real client, no result, no metric and
 * no testimonial; every picture is an abstract CSS composition of the studio's
 * own vocabulary, every brand name is invented, and the first line of every
 * project says plainly that the page is a technical demonstration. See
 * `docs/CASE_STUDIES.md`.
 */
import type { CaseStudyArt, CaseStudyInput, CaseStudyRatio } from './caseStudy';

/**
 * Said once at the top of every project, and a forbidden production marker, so
 * a reader of the demonstration is never left guessing whether the work is
 * real. It is the only place the pages admit it, now that the route no longer
 * carries a flag above the fold.
 */
const DEMO_NOTE = 'Caso de demostración técnica';

interface DemoStudy {
  client: string;
  /** The three chapters, in the template's own order. */
  strategy: string;
  execution: string;
  results: string;
  /** The two pieces beside the brief, as abstract compositions. */
  work: [CaseStudyArt, CaseStudyArt];
  ratios?: [CaseStudyRatio, CaseStudyRatio];
}

/**
 * One project, in the shape the template asks for and in no other. Every
 * demonstration goes through here, so none of them can drift into a different
 * structure: the only things a caller decides are the words and the two
 * compositions. There is deliberately no palette here — see the note above.
 */
const demoStudy = (study: DemoStudy): CaseStudyInput => ({
  client: study.client,
  spine: {
    strategy: { body: [`${DEMO_NOTE}. ${study.strategy}`] },
    execution: { body: [study.execution] },
    results: { body: [study.results] },
  },
  showcase: [
    {
      kind: 'art',
      variant: study.work[0],
      ratio: study.ratios?.[0] ?? 'square',
    },
    {
      kind: 'art',
      variant: study.work[1],
      ratio: study.ratios?.[1] ?? 'landscape',
    },
  ],
  placeholder: true,
});

/**
 * Slug to authored study. Every project in the archive is here, and every one
 * of them is the same template. A project absent from this map — every
 * approved one, today — still publishes the template through the automatic
 * fallback in `resolveCaseStudy()`, with its own cover and gallery beside the
 * brief and no chapters until its copy is signed off.
 */
export const caseStudies: Readonly<Record<string, CaseStudyInput>> = {
  'demo-fauce-elastica': demoStudy({
    client: 'Cerámica Nava',
    strategy:
      'El encargo ficticio pedía una identidad que aguantase la presión sin romperse: que se dejase comprimir por el formato y volviese sola a su sitio.',
    execution:
      'Se dibujó un sistema de formas que ceden por un borde y devuelven carácter, con una retícula que admite el aplastamiento como estado normal y no como excepción.',
    results:
      'La demostración comprueba que la plantilla sostiene un proyecto de identidad sin cambiar de estructura. No hay cifras porque no hay nada real que medir.',
    work: ['pressure', 'cut'],
  }),

  'demo-pulso-molar': demoStudy({
    client: 'Lácteos Brío',
    strategy:
      'La marca ficticia quería que su contenido tuviese cadencia propia en vez de seguir el ritmo de la plataforma de turno.',
    execution:
      'Se definió una serie corta, siempre con el mismo arranque y el mismo corte, para que la repetición trabajase a favor del reconocimiento.',
    results:
      'Aquí se ve la plantilla llevando un proyecto de contenido, con las mismas tres preguntas que responde cualquier otro.',
    work: ['trace', 'layers'],
    ratios: ['landscape', 'square'],
  }),

  'demo-rastro-naranja': demoStudy({
    client: 'Tinta Meridiana',
    strategy:
      'El punto de partida ficticio era una marca que se reconoce por lo que deja atrás y no por el tamaño de su logotipo.',
    execution:
      'Se trabajó un rastro gráfico que aparece siempre en el mismo sitio de cada pieza, de modo que la continuidad la sostiene la posición y no el color.',
    results:
      'Todos los proyectos del archivo se apoyan en el mismo crema, así que lo único que distingue una página de otra son su nombre, su texto y sus piezas.',
    work: ['trace', 'bite'],
    ratios: ['landscape', 'portrait'],
  }),

  'demo-muesca-doble': demoStudy({
    client: 'Ferretería Ovalle',
    strategy:
      'El planteamiento ficticio partía de una ausencia: quitar una parte de la forma y dejar que el hueco hiciese de firma.',
    execution:
      'Dos muescas en posiciones fijas, aplicadas a todo el sistema, para que la marca se reconozca incluso recortada o a un tamaño mínimo.',
    results:
      'Un proyecto puede no tener cifras que enseñar, y entonces este apartado es sólo prosa. La página está completa igualmente.',
    work: ['bite', 'cut'],
  }),

  'demo-capas-en-tension': demoStudy({
    client: 'Textil Arganza',
    strategy:
      'El encargo ficticio buscaba contar un catálogo extenso sin aplanarlo: que se viese la profundidad en vez de una lista.',
    execution:
      'Se montó un sistema de capas que se solapan en un orden fijo, con la tensión entre dos de ellas como recurso de portada.',
    results:
      'La plantilla no necesita más apartados para sostener un proyecto largo: la extensión vive en las piezas, no en la estructura.',
    work: ['layers', 'pressure'],
    ratios: ['landscape', 'landscape'],
  }),

  'demo-materia': demoStudy({
    client: 'Hormigones Sela',
    strategy:
      'La marca ficticia quería parecer lo que fabrica: densa, mate y sin brillo añadido.',
    execution:
      'Se redujo la paleta a dos tonos y una sola familia de formas, dejando que el peso visual lo diese la superficie y no el color.',
    results:
      'Aquí la plantilla lleva un proyecto de identidad sobria con los mismos tres apartados que uno ruidoso.',
    work: ['layers', 'trace'],
    ratios: ['square', 'landscape'],
  }),

  'demo-umbral': demoStudy({
    client: 'Banca Lindero',
    strategy:
      'El supuesto ficticio era una entrada: el momento en que alguien pasa de mirar a entrar, y cómo no interrumpirlo.',
    execution:
      'Se diseñó un paso continuo, sin cortes ni pantallas intermedias, con una sola acción visible en cada momento.',
    results:
      'Un proyecto puramente digital usa exactamente la misma página que uno de identidad. Esa es la comprobación.',
    work: ['cut', 'trace'],
    ratios: ['landscape', 'landscape'],
  }),

  'demo-volumen': demoStudy({
    client: 'Radio Peñalta',
    strategy:
      'El encargo ficticio pedía que se notase la cantidad de trabajo sin que el volumen se comiese cada pieza.',
    execution:
      'Se agrupó el contenido en bloques de tamaño desigual y ritmo constante, de manera que el conjunto se lea antes que el detalle.',
    results:
      'La plantilla enseña dos piezas por proyecto; el resto del volumen vive en el archivo, que es donde debe estar.',
    work: ['pressure', 'layers'],
  }),

  'demo-ritmo': demoStudy({
    client: 'Zapatillas Kime',
    strategy:
      'El planteamiento ficticio era que la marca tuviese un compás reconocible antes de que se lea su nombre.',
    execution:
      'Se fijó una alternancia de piezas largas y cortas, siempre en el mismo orden, para que la cadencia sea parte del reconocimiento.',
    results:
      'Aquí se comprueba que la estructura fija no impide que dos proyectos se lean distintos: lo que cambia son las piezas.',
    work: ['trace', 'pressure'],
    ratios: ['landscape', 'square'],
  }),

  'demo-fragmento': demoStudy({
    client: 'Editorial Quiebro',
    strategy:
      'La premisa ficticia era que una parte bastase para reconocer el todo, y que nunca hiciese falta enseñarlo entero.',
    execution:
      'Se recortó el sistema en fragmentos que funcionan solos, con reglas claras de por dónde se puede partir y por dónde no.',
    results:
      'Décimo y último caso de la demostración, con la misma estructura que los otros nueve.',
    work: ['cut', 'bite'],
    ratios: ['square', 'portrait'],
  }),
};
