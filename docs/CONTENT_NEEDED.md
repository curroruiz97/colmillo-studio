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
- Goodbye stage (rebuilt 2026-09-10 as a pan across one panoramic scene,
  architecture only), still to be decided before it can publish:
  - the panoramic visual itself, video or image. It fills the screen's height
    and spans 180-220% of its width (on a 16:9 desktop, roughly a 3.2:1 to
    3.9:1 frame), so it needs a composition that works as a left half and a
    right half, with calm areas where each block of copy sits. Portrait phones
    will crop it with `object-fit: cover`;
  - the copy for side A (left) and side B (right): a large title and an
    optional supporting line each;
  - whether side B carries a CTA, its label and destination;
  - the section's accessible name and the final transition.
  The copy in `src/data/goodbye.ts` is structural ("Titular A", "Titular B")
  and never reaches `dist/`.
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
- Studio/about page copy and approved process or methodology, if it should be
  published.
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
