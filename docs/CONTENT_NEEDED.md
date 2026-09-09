# COLMILLO STUDIO - CONTENT NEEDED

## Brand

- Official brand manual.
- Original vector logo master (SVG, PDF or editable source) for future
  large-format and non-header uses. The supplied black/cream raster wordmarks
  are already cleaned and active in the header.
- Favicon source at `public/assets/brand/favicon.svg`.
- Rules for logo spacing, scaling and background usage.

## Fonts

- Licensed WOFF2 webfont files for Bootzy TM under
  `public/assets/fonts/bootzy/`.
- Licensed WOFF2 webfont files for More Sugar under
  `public/assets/fonts/more-sugar/`.
- Confirmation of body text font.

## Motion Assets

- Hero loop source animation and approved derivatives under
  `public/assets/motion/hero/` (`hero-desktop.webm`, `hero-desktop.mp4`,
  `hero-mobile.webm`, `hero-mobile.mp4`, `hero-poster.webp`).
- Goodbye animation source and approved derivatives under
  `public/assets/motion/goodbye/` (`goodbye.webm`, `goodbye.mp4`,
  `goodbye-poster.webp`).
- Permission to convert GIF assets to WebM/MP4 for production performance.

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
  demonstration entries in `src/data/services.ts` with approved names, short
  lines and descriptions, then enable `contentAvailability.services`. Each
  service can also carry a real destination and a related project when those
  exist.
- Studio/about page copy and approved process or methodology, if it should be
  published.
- Project/client list.
- Project descriptions.
- Project media.
- Approved alternative text and optional captions for every project image.
- Approved project ordering for previous/next navigation.
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
