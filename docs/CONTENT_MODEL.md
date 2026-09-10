# COLMILLO STUDIO - CONTENT MODEL

## Projects

Projects use the Astro collection declared in `src/content.config.ts`.
No approved entries exist yet. Three typed fictional records live in
`src/data/projects.ts` exclusively for development and `--mode demo` builds.

Each approved Markdown or MDX entry will require:

- `title`: public project title;
- `summary`: approved short description;
- `year`: integer publication/project year;
- `services`: approved list of services, empty by default;
- `cover`: local project image;
- `coverAlt`: meaningful alternative text for that image;
- `gallery`: zero or more local images with alternative text and an optional
  approved caption;
- `featured`: whether the project appears in featured placements;
- `draft`: whether the entry is excluded from static output.

The Markdown body is reserved for the approved case-study narrative and media
structure. It must not contain invented clients, results, awards or metrics.

## Activation Procedure

When the first approved project arrives:

1. Store its media under `public/assets/projects/<approved-slug>/` or migrate to
   Astro-managed source assets if image optimization is required.
2. Add the approved Markdown or MDX entry under `src/content/projects/`.
3. Add the approved entry; the collection already uses Astro's local glob
   loader for `**/*.{md,mdx}`.
4. Set `contentAvailability.projects` to `true` in
   `src/config/content.ts`.
5. Keep unfinished entries marked `draft: true`.
6. Run typecheck, build and project-route Playwright coverage.

## Fictional Demonstration

- `import.meta.env.DEV` automatically enables the demo during `astro dev`.
- `npm run build:demo` uses Astro mode `demo` and writes only to `dist-demo/`.
- Every demo card and detail page repeats `DEMO FICTICIA — NO PUBLICAR`.
- The covers and gallery frames are local CSS compositions with intrinsic
  aspect ratios and meaningful accessible labels; there are no third-party
  downloads.
- The standard `npm run build` generates no demo detail paths.
- `check:production` scans `dist/` for the banner, demo slugs and demo titles.
- `test:e2e:demo` verifies five projects, detail navigation, history,
  horizontal enhancement, editorial routes, 320 px layouts, 200% text sizing,
  native no-JavaScript overflow and fixed controls.

## Contact

Contact channels are centralized in `src/config/contact.ts`. Unknown values are
stored as `null`; components render only confirmed non-null channels. Never add
a dummy `mailto:`, `tel:` or social URL.

## Editorial Pages

`/manifiesto/` and `/studio/` are permanent semantic routes with unique
metadata and real internal navigation. Their richer narrative blocks are
enabled only in development and `demo` mode, repeat the fictional-demo marker
and use `data-dev-placeholder`. The standard build retains the page structure
but never emits provisional manifesto, methodology or studio claims. Replace
the demo blocks with approved content rather than promoting their current copy.

## Prelaunch Content

Development-only status notes use `import.meta.env.DEV` and
demo mode with `data-dev-placeholder`. Production validation scans `dist` to
ensure those markers and messages are absent.

## Motion Media

Hero and goodbye media are configured in `src/config/assets.ts`. Each approved
video slot requires local WebM and MP4 sources, a poster, and intrinsic
width/height. The goodbye slot, `goodbyeVisual`, may instead be a still image
(`kind: 'image'`, with intrinsic width/height). Keep a slot `null` until all
derivatives exist and have been visually checked. The goodbye slides' copy
lives in `src/data/goodbye.ts` (`approvedGoodbye`).
`npm run check:production` rejects raw GIFs in the generated site.
`npm run check:assets` reports missing official files without blocking prelaunch;
set `REQUIRE_CLIENT_ASSETS=true` in release CI to make the intake mandatory.

## Home Copy Gates

`src/config/content.ts` controls publication of the intro, services, projects
and studio sections. Development may render their structural preview, but each
flag must remain `false` until the corresponding copy or content is client
approved. The project flag also requires at least one non-draft collection entry.
