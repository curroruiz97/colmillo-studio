# COLMILLO STUDIO - CASE STUDIES

How `/proyectos/<slug>/` is built, and how to add a project to it.

The principle, in one line: **every case study shares one structure and none of
them shares an art direction.** The skeleton, the components, the typography,
the motion vocabulary and the chrome are the studio's; the palette, the pace
and the choice and order of the modules belong to the project.

## Where things live

| Purpose                              | File                                          |
| ------------------------------------ | --------------------------------------------- |
| Model, defaults and fallback         | `src/data/caseStudy.ts`                       |
| Approved frontmatter (Zod guard)     | `src/data/caseStudyFields.ts`                 |
| Demonstration studies (demo only)    | `src/data/caseStudies.ts`                     |
| Route                                | `src/pages/proyectos/[slug].astro`            |
| Shell, theme, canvas                 | `src/layouts/CaseStudyLayout.astro`           |
| Components                           | `src/components/case-study/`                  |
| Modules                              | `src/components/case-study/modules/`          |
| Styles                               | `src/styles/case-study.css`                   |
| Motion (route chunk)                 | `src/scripts/motion/CaseStudyPageMotion.ts`   |
| Browser coverage                     | `tests/e2e/case-study.demo.spec.ts`           |

## Adding a project

1. Put the media under `public/assets/projects/<slug>/`.
2. Create `src/content/projects/<slug>.md` with the archive's own fields
   (`title`, `summary`, `year`, `categories`, `format`, `cover`, `coverAlt`,
   `order`, `draft`) — see `docs/CONTENT_MODEL.md`.
3. Add a `caseStudy:` block to the same frontmatter (everything below is
   optional).
4. Set `draft: false` and, for the first approved project,
   `contentAvailability.projects = true` in `src/config/content.ts`.
5. Run `npm.cmd run check`, `npm.cmd run build` and
   `npm.cmd run test:e2e`.

**A project with no `caseStudy:` block still publishes a complete page.**
`resolveCaseStudy()` builds it from what the archive already has: the cover
becomes the hero, the summary becomes the introduction, and each gallery image
becomes a full-width module, alternating bleed. Authoring is how a project
stops looking like the others, never how it starts working.

## Schema

```yaml
caseStudy:
  client: Nombre del cliente # omit it and no "Cliente" row is shown
  headline: La idea del proyecto en una línea.
  intro:
    - Primer párrafo.
    - Segundo párrafo.
  deliverables: [Dirección de arte, Identidad, Web, Motion]
  theme:
    background: '#f7f3ec'
    foreground: '#1a1512'
    accent: '#cd5730'
    surface: '#e7ddcf'
    secondary: '#9d2d22'
    chrome: light # light | dark
  layout: editorial # editorial | immersion | graphic | minimal
  hero:
    variant: full # full | contained | split
  chapters: false
  related: [otro-slug]
  seo:
    title: ...
    description: ...
  modules: [...]
```

Only literal hex colours are accepted. Anything else falls back to the
studio's own colour instead of reaching the stylesheet, because the value is
written into a style attribute (`safeColor()`).

## Theme

The six values become custom properties on the page's root, and everything —
sections, modules, marks, the abstract placeholders, the focus ring — reads
them:

```
--cs-bg  --cs-fg  --cs-accent  --cs-surface  --cs-secondary
```

The same background and foreground are given to the document, so an overscroll
at either end and the shared footer continue the project rather than showing
the site's white.

`chrome` does two things at once: it chooses the global wordmark's derivative
(`light` → black, `dark` → cream) and the surface tone the shared cursor
follows. Set it to whatever the **first screen** is, not the rest of the page.

**Contrast is the author's responsibility.** Keep body copy at 4.5:1 against
`--cs-bg` and use `--cs-accent` only for large type, rules and marks. The two
demonstration themes measure about 15:1 and 15.6:1 for body copy.

## Layout variants

They change the air, the measure and the density of the media — never the
components, so a project can never drift out of the studio's typography.

| Variant     | Feel                                    |
| ----------- | --------------------------------------- |
| `editorial` | the default; balanced text and media    |
| `immersion` | more air, wider measure, media-led      |
| `graphic`   | tighter, denser; for identity work      |
| `minimal`   | much more air, narrow measure           |

## Hero variants

`full` (default) is one piece of media at the size of the screen with the
project's name over its foot. `contained` holds the media inside the measure
under the name. `split` is the composition `/studio/` and `/servicios/` use.

The name is always the page's only `h1` and always real text, so the route is
readable and indexable with no CSS, no JavaScript and no picture at all.

## Modules

`modules` is an ordered list. Two projects with the same modules in a different
order are two different pages.

| #   | `type`      | What it is                                          |
| --- | ----------- | --------------------------------------------------- |
| 01  | `fullMedia` | one piece, `bleed` to both edges or inside the measure |
| 02  | `text`      | eyebrow, heading, paragraphs; `align`, `width`      |
| 03  | `split`     | copy one side, media the other (`side`)             |
| 04  | `twoUp`     | two pieces, own proportions, optional `offset`      |
| 05  | `gallery`   | a short controlled mosaic                           |
| 06  | `video`     | one large video (`mode: loop \| controls`)          |
| 07  | `statement` | one sentence at the size of the screen              |
| 08  | `sticky`    | chapters held while their picture changes           |
| 09  | `process`   | a short horizontal strip                            |
| 10  | `quote`     | a real, approved quotation                          |
| 11  | `facts`     | verifiable pairs only                               |
| 12  | `palette`   | the project's colours as large fields               |
| 13  | `type`      | the project's own typography at scale               |
| 14  | `sequence`  | frames of one movement, crossfaded by the scroll    |

Any module may open a chapter:

```yaml
- type: split
  chapter: { id: identidad, label: Identidad }
```

### Media

Every module's media is one of three shapes:

```yaml
{ kind: image, src: /assets/projects/x/a.webp, width: 1600, height: 1000,
  alt: '', ratio: landscape, focus: '50% 20%', caption: '...' }
{ kind: video, mp4: ..., webm: ..., poster: ..., width: , height: ,
  alt: '', mode: loop }
{ kind: art, variant: pressure }   # abstract placeholder, no file needed
```

`ratio` is art direction, not the file's proportion: `portrait` (4:5),
`square`, `landscape` (3:2), `cinematic` (16:9), `wide` (21:9) or `auto`. An
empty `alt` makes the piece decorative; informative media must describe itself.

`art` draws an abstract composition in the **project's own palette**
(`pressure`, `cut`, `trace`, `bite`, `layers`). It is what stands in while a
slot is empty, and it is the only imagery the demonstration uses: no
photograph, mockup or client asset is ever invented.

## Optional effects

Motion presents the work; it never competes with it. Rule of thumb: for every
two or three quiet modules, at most one strong moment.

- **`reveal: bite`** — the studio's signature. An organic concave wave uncovers
  the picture as it arrives, the same geometry as the archive's pressure dent
  (`bitePath()` in `PressSurface.ts`). **Budgeted: the renderer honours the
  first three on a page and drops the rest.** Available on `fullMedia` and
  `video`.
- **`press: true`** — the picture gives a few pixels under a fine pointer.
  Available on `fullMedia` and `split`. Never on a surface that also bites.
- **`sticky`** — only when the content really is a sequence. It becomes a plain
  list of steps on phones, short windows and under reduced motion.
- **`chapters: true`** — only for a long project: the index needs more than two
  chapters to appear at all, and it is hidden below 1200 px.

Everything above is off under `prefers-reduced-motion`, on coarse pointers
where it is a pointer effect, and with no JavaScript. Nothing is required to
read the page.

## Related projects and the end of the page

`related` is an ordered list of slugs. The first one that is **published**
becomes the stage at the end of the page; without it the next project in the
archive's order is used, and the list wraps, so the portfolio has no dead end.

Under that stage there are exactly two routes: the whole archive, and one
discreet line to Contacto. Do not add a third.

## What never goes in a case study

Invented clients, results, metrics, awards, testimonials, team members or
quotations. A `quote` module exists only where a real, approved quotation does;
a `facts` module carries verifiable data only. Missing material belongs in
`docs/CONTENT_NEEDED.md`.

## Adding a new module

1. Add its interface to the union in `src/data/caseStudy.ts`.
2. Add its `type` to the enum in `src/data/caseStudyFields.ts`.
3. Create `src/components/case-study/modules/Module<Name>.astro`, taking a
   single `module` prop.
4. Register it in `src/components/case-study/CaseStudyModules.astro`. The
   `satisfies Record<CaseStudyModuleType, unknown>` there fails the typecheck
   until you do.
5. Add its rules to `src/styles/case-study.css`, under the project's custom
   properties and never with a hard-coded colour.
6. If it needs behaviour, add one `init…` to
   `src/scripts/motion/CaseStudyPageMotion.ts` that returns its own cleanup,
   and make sure the module is complete without it.
