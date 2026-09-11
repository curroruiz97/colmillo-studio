# COLMILLO STUDIO - CONTENT NEEDED

## Brand

- Official brand manual.
- Original vector logo master (SVG, PDF or editable source) for future
  large-format and non-header uses. The supplied black/cream raster wordmarks
  are already cleaned and active in the header. Until it arrives, the home
  intro uses `src/components/intro/wordmarkGlyphs.ts`, a verified trace of the
  black PNG (`scripts/trace-wordmark.mjs`, 0.33 px worst deviation). When the
  master arrives, replace the traced paths with its COLMILLO letters and keep
  the same data shape (`d`, `outer`, `counter`, `counterCentre`,
  `counterPolygon`).
- Favicon source at `public/assets/brand/favicon.svg`.
- Rules for logo spacing, scaling and background usage.

## Fonts

- Licensed WOFF2 webfont files for Bootzy TM under
  `public/assets/fonts/bootzy/`.
- Licensed WOFF2 webfont files for More Sugar under
  `public/assets/fonts/more-sugar/`.
- Confirmation of body text font.

## Motion Assets

Received on 2026-09-10:

- Hero loop master at `public/assets/WEB.webm` (VP9, 5040x2160, 30 fps,
  12.933 s, with an unused Opus track). The approved derivatives are generated
  from it by `npm run media:hero` and published under
  `public/assets/motion/hero/`.

- Studio character loop at `public/assets/video estudio.mp4` (H.264,
  1280x720, 24 fps, 6 s, with an unused AAC track). The home Studio derivatives
  are generated from it by `npm run media:studio` and published under
  `public/assets/motion/studio/`.

Open questions on the supplied Studio loop:

- Confirmation of the technical loop treatment. The clip does not return to its
  first frame, so the derivative sinks into the paper over its last third of a
  second and rises out of it over its first, replacing the jump with a short
  breath. Every frame is kept in order; the alternative is the untreated hard
  jump every six seconds.
- Confirmation that the empty paper above and below the drawing may be cropped
  and that its beige paper may become the page white. Since 2026-09-10 the
  published derivatives are `studio-*-white.*`: the ink and the orange keep
  their values, and the paper-coloured areas inside the drawing (the sneakers,
  the light highlights on the band) turn white with the paper. The previous
  cream set is kept beside them.
- A decision on where the 1.5 MB master should live. Like the hero master, it
  is copied into `dist/` because it sits under `public/`, even though nothing
  references it; `media-src/` is the recommended home. The same applies to
  `public/assets/frame video.png` (1 MB, unreferenced).

Still missing:

- Goodbye animation source and approved derivatives under
  `public/assets/motion/goodbye/` (`goodbye.webm`, `goodbye.mp4`,
  `goodbye-poster.webp`).
- Goodbye stage (a pan across one panoramic scene), still to be decided
  before it can publish:
  - approval of the photograph on trial since 2026-09-11
    (`public/assets/bg panoramica.png`, published as
    `public/assets/goodbye/goodbye-panorama.webp`), its rights, and ideally a
    larger master: at 2048x768 it is upscaled 1.17x at 1440x900, 1.41x at
    1920x1080 and 1.69x at 2560x1080 (twice that on 2x displays). About
    5400px wide would be sharp on every tested screen. If the composition
    changes, the copy boxes in `goodbye-section.css` must be re-measured;
  - a decision on where the 1.8 MB PNG master should live: it sits under
    `public/`, so it is copied into `dist/` although nothing references it;
  - copy supplied by the user on 2026-09-11 and live in the demo: side A "Las
    buenas ideas necesitan presión.", the CTA "Nosotros sabemos dónde
    apretar." linked to `/contacto/`, and the note "Estrategia · Identidad ·
    Digital · Contenido". Still open: the small line above the CTA,
    "¿Hablamos?", which is provisional and needs approval or replacement;
  - the section's accessible name (currently "Despedida").
  The record in `src/data/goodbye.ts` stays flagged as a placeholder while the
  photograph and the kicker are unapproved, so the section never reaches
  `dist/`.
- Permission to convert GIF assets to WebM/MP4 for production performance.

Open questions on the supplied hero master:

- Confirmation that removing the empty sheet on the left and right of the
  drawing is acceptable. The derivatives crop the 7:3 master to 4:3 around the
  drawing; only blank paper is removed and the original file is untouched.
- Resolved 2026-09-10: the light surfaces are white at the client's request,
  so the drawing's sheet stays white. The published derivatives are
  `hero-*-white.*`; the original cream set is kept beside them.
- A decision on the superseded cream derivatives
  (`public/assets/motion/hero/hero-*.{webm,mp4}`, `hero-poster.webp`,
  `public/assets/motion/studio/studio-loop.*`, `studio-poster.webp`, about
  5.9 MB). They are unreferenced but still copied into `dist/` because they sit
  under `public/`. They were kept rather than overwritten; moving them to
  `media-src/` is the recommended tidy-up once the white set is approved.
- A decision on where the 3.15 MB raw master should live. Everything under
  `public/` is copied verbatim into `dist/`, so the untouched client file is
  currently published even though nothing references it.

## Contact

Received and published on 2026-09-09:

- Public email address: `hola@colmillostudio.com`.
- Public Instagram profile: `https://www.instagram.com/colmillo.studio/`.

Still missing:

- Public phone number. The brief asks for telephone quick access in the sticky
  header; the channel stays unpublished until a real number is confirmed.
- Contact form requirements, if any.
- Privacy/legal consent copy if a form is used.

## Content

- Final home copy.
- Final manifesto page copy.
- Services list. The home section is built and waiting: replace the flagged
  demonstration entries in `src/data/services.ts` with approved names and one
  short description each, then enable `contentAvailability.services`. Each
  service can also carry a real destination and a related project when those
  exist. The design has no slot for a second accent line, so do not budget one.
- Services page. Since 2026-09-11 `/servicios/` exists (another session,
  in `primaryNavigation`) and the home section's `Abrir servicios ↗` CTA,
  beside the heading, points at it through `servicesPage.href` in
  `src/data/services.ts`. The page's own copy is still provisional.
- Per-service illustrations: received 2026-09-11 for Identidad, Digital and
  Contenido and live in the home sequence (Estrategia keeps the shared art).
  Still open: where the three 1600x900 PNG masters should live. They sit in
  `public/assets/` (about 2.3 MB), so they are copied into `dist/` although
  only their WebP derivatives are referenced; `media-src/` is the recommended
  home, and `npm run media:services` already reads from there first. Also a
  confirmation that their opaque near-black clothing is intended (the shared
  illustration's clothing is transparent).
- `/studio/` page (rebuilt 2026-09-11, fully designed; demo build only for the
  provisional blocks). Everything below lives in `src/data/studioPage.ts`
  unless noted; filling an `approved…` record publishes that block:
  - hero loop: a square-ish WebM + MP4 pair and a WebP poster of the first
    frame for `studioHeroMedia` in `src/config/assets.ts` (subject centred:
    it is masked to a disc with a bite out of its top-right shoulder). Until
    then the disc shows a geometric placeholder;
  - "Somos Colmillo" copy: approval or replacement of the provisional
    headline, lede and paragraph supplied on 2026-09-11 (`approvedIntro`);
  - the four principles (Mirar, Tensar, Morder, Soltar): approval of their
    provisional descriptions and one image each (`image` on every item; any
    ratio, cropped with `object-fit: cover` to 4:5 on desktop and 5:4 on
    phones), with alternative text (`approvedPrinciples`);
  - the team: real names, roles, portraits (4:5 or taller, at least 1200 px
    on the long side), alternative text and optional links
    (`approvedTeam`). The six current entries are structural placeholders and
    set no team size;
  - confirmation of the section titles "Somos Colmillo", "Cómo hacemos las
    cosas" (or "Nuestra forma de hacer las cosas") and "Los que muerden" (or
    "El equipo").
- Home Studio copy: one editorial headline that sets in at most two lines (about
  18 characters per line) and one supporting sentence of about one line. The section is built and waiting in
  `src/data/studio.ts`; the current demonstration headline ("Tensamos cada idea
  hasta que muerde.") and lede are placeholders and must not be published. Fill
  `approvedStudio`, then enable `contentAvailability.studio`.
- Project/client list.
- Project descriptions.
- Project media.
- Approved alternative text and optional captions for every project image.
- Approved project ordering (the `order` field). It drives the home rail,
  which shows the first five, the archive and previous/next navigation.
- One upright cover per project for the home rail: 4:5 or 3:4, at least
  1600 px on the long side. It is cropped with `object-fit: cover`, so keep the
  subject away from the bottom-left corner, where the title cut-out rises.
- Project assets under `public/assets/projects/<approved-slug>/`.
- Testimonials only if real and approved.
- Approved default SEO title and description.
- Approved social sharing image and alternative text.

## Legal

- Legal business name.
- CIF/NIF if needed.
- Registered address if needed.
- Privacy policy text.
- Cookie policy text.
- Terms or legal notice text.

## Deployment

- Domain.
- Hosting target.
- Analytics decision.
- Cookie/consent requirements.
- Approval to remove the prelaunch `noindex` and blocking `robots.txt` guard.

Run `npm.cmd run check:assets` after delivery. It reports missing intake items;
use `REQUIRE_CLIENT_ASSETS=true` in release CI to make the check blocking.
`npm.cmd run check:brand` separately verifies the dimensions, RGBA alpha and
transparent clear space of the supplied header wordmarks.
