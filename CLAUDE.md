# COLMILLO STUDIO - CLAUDE CODE OPERATING GUIDE

This is the primary onboarding and operating document for Claude Code in this
repository. It complements, and does not replace, the authoritative product
specification in `COLMILLO_BUILD_SPEC.md`.

## Mandatory Read Order Before Any Change

Read these files in this order, completely, before editing:

1. `CLAUDE.md`
2. `COLMILLO_BUILD_SPEC.md`
3. `docs/EXECUTION_STATE.md`
4. `docs/DECISIONS.md`
5. `docs/CONTENT_NEEDED.md`
6. `docs/MOTION_SPEC.md` if it exists
7. `package.json`
8. The relevant source files for the requested task

Also read `AGENTS.md`, any nearer nested `AGENTS.md`, `README.md`, the relevant
framework/build/test configuration and any other `docs/*` file governing the
task. Code is authoritative when old notes conflict with current behavior;
record verified conflicts instead of silently overriding the master spec.

## Required Working Protocol

**INVESTIGATE -> PLAN -> IMPLEMENT -> VALIDATE -> VISUALLY INSPECT -> FIX ->
REVALIDATE -> UPDATE STATE**

Do not stop at a plan when work is actionable. Do not merely make code compile.
For visual changes, run the site and inspect the rendered result at relevant
viewports, pointer capabilities and motion preferences whenever tooling permits.
Check browser console output. Fix regressions, re-run the appropriate checks and
update `docs/EXECUTION_STATE.md` after every meaningful implementation phase so
future sessions can continue without reconstructing history.

## Product and Objective

Colmillo Studio is a Spanish-language creative studio portfolio/agency website.
Its goal is to express an authored editorial identity through real client work,
strong typography and a coherent motion vocabulary. It must not become a generic
agency template. The interaction language is bite, pressure, compression,
deformation, reveal, overlap, tension and release.

References are inspiration only. Never copy reference source code, proprietary
assets, copy, animation sequences or layouts pixel-for-pixel.

## Current Phase and Public State

The technical foundation, routes, responsive behavior, motion system, isolated
demo, creative polish and automated QA are implemented. The active phase is
**Phase 4: approved client content and asset intake**. Final release/indexing is
blocked by missing client materials and explicit approvals.

A temporary, explicitly user-authorized demo is visible at
`https://colmillo-studio.vercel.app/`. Vercel currently overrides its command to
`npm run build:demo` and output to `dist-demo`. The demo is visibly fictional and
`noindex`; it is not an approved final production release. Read
`docs/DEPLOYMENT.md` and `docs/DECISIONS.md` before touching hosting settings.

## Architecture and Stack

- Node requirement `>=22.12.0`; handoff runtime Node 22.14.0 and npm 10.9.2.
- Astro 7.3.1 static output with TypeScript 6.0.3 strictest settings.
- GSAP 3.15.0 plus ScrollTrigger for optional progressive motion.
- `@astrojs/sitemap` only when a valid public HTTPS origin exists.
- Semantic Astro components and layered CSS; no React, Lenis, smooth-scroll
  abstraction or WebGL.
- Playwright for production/demo browser QA; ESLint and Prettier for static QA.

The site fails closed. Missing or invalid environment values must not silently
enable canonical URLs, release, indexing or client content.

### Standard and demo artifacts

- `npm run build` -> `dist/`: nine static pages, no fictional projects,
  development notices or demo routes.
- `npm run build:demo` -> `dist-demo/`: nineteen pages including ten
  provisional project routes, each flagged on its own page, and provisional
  demo sections.
- `demoMode` is true only in Astro development or `--mode demo`.
- Keep both artifacts isolated. The current Vercel demo override is a documented
  temporary exception, not a new final-release rule.

## Repository Structure

```text
colmillo-studio/
|-- CLAUDE.md                    # This onboarding/operating guide
|-- AGENTS.md                    # Repository-wide operating contract
|-- COLMILLO_BUILD_SPEC.md       # Authoritative product/implementation spec
|-- README.md
|-- package.json / package-lock.json
|-- astro.config.mjs / tsconfig.json / eslint.config.js
|-- .prettierrc.mjs / .prettierignore / .editorconfig / .env.example
|-- playwright.config.ts         # dist: desktop Chromium + Pixel 7
|-- playwright.demo.config.ts    # dist-demo: fine 1440, touch 834, touch 390
|-- .codex/                      # Existing Codex agents and safety rules
|-- docs/
|   |-- EXECUTION_STATE.md       # Current persistent handoff; keep updated
|   |-- DECISIONS.md             # Architectural/product decision log
|   |-- CONTENT_NEEDED.md        # Missing authoritative client inputs
|   |-- CONTENT_MODEL.md         # Project/content schema guidance
|   |-- MOTION_SPEC.md           # Motion behavior and fallbacks
|   |-- QA_CHECKLIST.md          # Required QA coverage
|   |-- PERFORMANCE_BUDGET.md    # Performance limits
|   |-- DEPLOYMENT.md            # Release contract/demo exception
|   `-- other plans, runbooks and historical handoffs
|-- public/
|   |-- robots.txt               # Currently blocks all indexing
|   `-- assets/
|       |-- brand/               # Validated black/cream wordmark PNGs
|       |-- incoming/            # Intake only; not direct production use
|       `-- projects/            # Approved public project media destination
|-- scripts/                     # Asset/build/link/release validation tools
|-- src/
|   |-- content.config.ts / env.d.ts
|   |-- config/                  # Assets/contact/content/navigation/site flags
|   |-- content/projects/        # Approved entries; currently empty
|   |-- data/projects.ts         # Types/loader + isolated fictional demos
|   |-- layouts/ / pages/
|   |-- components/layout/       # Header, footer, edge menu, SEO, motion
|   |-- components/sections/     # Home sections
|   |-- components/projects/     # Project UI
|   |-- components/ui/
|   |-- scripts/motion/          # GSAP progressive-enhancement modules
|   `-- styles/                  # Tokens, layout, motion and fallbacks
`-- tests/
    |-- AGENTS.md
    `-- e2e/                     # Production, demo and performance specs
```

Generated `dist/`, `dist-demo/`, `.astro/`, Playwright output and dependencies
are ignored and are not sources of truth.

## Commands

Use `npm.cmd` in Windows PowerShell if execution policy blocks `npm.ps1`.

```powershell
npm.cmd ci
npm.cmd run dev
npm.cmd run build
npm.cmd run build:demo
npm.cmd run preview
npm.cmd run check
npm.cmd run lint
npm.cmd run format:check
npm.cmd run check:assets
npm.cmd run check:brand
npm.cmd run check:hero
npm.cmd run check:production
npm.cmd run check:links
npm.cmd run check:manifest
npm.cmd run test:e2e
npm.cmd run test:e2e:demo
npm.cmd run validate
npm.cmd run release:check
npx.cmd playwright install chromium
```

`release:check` is expected to fail until canonical URL, release approval and
indexing approval exist. `check:assets` reports missing client slots but exits 0
in prelaunch unless `REQUIRE_CLIENT_ASSETS=true`. The current repository-wide
`format:check` reports 79 files because of a pre-existing Windows line-ending
mismatch; do not create a mass formatting diff without explicit scope/review.

## Design System

Colors from `src/styles/tokens.css`:

- cream `#fceeda`;
- orange `#cd5730`;
- accessible orange text/focus `#b54d2a`;
- ink `#12100f`;
- soft ink `#2a211d`;
- deep cream `#ead2b4`;
- red `#9d2d22`;
- white `#ffffff`.

Since 2026-09-10 (client direction) every light surface is white through
`--color-background`; cream stays for type, borders and details on the ink
surfaces. The hero and Studio loops are baked for the background colour
(`-white` files, enforced by `check:hero`). White, ink and orange surfaces
create editorial contrast. Rounded stacked
layers, pressure edges, cutouts and restrained deformation carry the visual
language. Do not add unrelated palettes/effects. Maintain sufficient contrast.

Typography:

- intended display face: licensed Bootzy TM;
- intended handwritten/accent face: licensed More Sugar;
- body: system UI stack.

The licensed font files are absent. `fonts.css` intentionally registers neither
font and the tokens use system fallbacks. Never download, approximate, trace or
present an unlicensed substitute as the real brand typeface. Preserve fluid
`clamp()` sizing, 200% text resizing and no horizontal overflow.

## Motion and GSAP/ScrollTrigger Architecture

`src/scripts/motion/MotionController.ts` is the single lifecycle owner. It
registers ScrollTrigger and initializes/cleans:

- `MotionPreference.ts`: mirrors the system preference onto `html[data-motion]`
  (the manual toggle was retired on 2026-09-10);
- `CustomCursor.ts`: fine-pointer position, velocity/pressure and labels;
- `EditorialMotion.ts`: scroll reveals and editorial marks;
- `HeroMotion.ts`: hero compression and viewport-aware media playback;
- `SurfaceTone.ts`: visible-surface chrome/cursor tone (the last surface in
  document order crossing the middle band, so a rising stack layer wins);
- `InstagramBadge.ts`: the global Instagram control's pill-to-circle fold, on
  every route;
- `EdgeMenu.ts`: right-edge navigation states (Y-following tab, auto-collapsing
  close control), focus/inert/Escape behavior, scroll lock and home progress;
- `SectionStack.ts`: rounded stack reveal/compression;
- `HorizontalProjects.ts`: desktop pin/scrub plus native scroll-snap fallback;
- `ServicesMotion.ts`: switches the home services to their sticky sequence
  layout and mounts `ServicesSequence.ts` (lazy chunk) for the scrubbed
  one-service-at-a-time handover;
- `ProjectTilePress.ts`: fine-pointer edge dent on the home project tiles,
  through the shared `PressSurface.ts` (also used by the Studio team);
- `StudioPage.ts`: mounts `StudioPageMotion.ts` (route-only chunk) for the
  `/studio/` reveals, the principles disclosures (one open at a time on
  hover/focus/tap/keys, picture on the right following the open row), the
  team portraits' dent and the Colmillo orbit (`StudioOrbit.ts`: one thin
  orange ring travelling between section stops on wide screens, a still ring
  elsewhere); the hero entrance there is CSS. Since 2026-09-14 the whole route is charcoal
  (`#1f1f1f`, scoped in `studio-page.css`);
- `ServicesPage.ts`: mounts `ServicesPageMotion.ts` (route-only chunk) for
  `/servicios/`: each stack layer's staggered arrival, the close's paths and
  loops that play only when visible and uncovered. The layers themselves stack
  through `SectionStack.ts` (sticky, `data-stack-content`); since 2026-09-14
  the route is a charcoal hero, white/orange/black/white service layers and a
  black close (`services-page.css`);
- `ProjectsPage.ts`: mounts `ProjectsPageMotion.ts` (route-only chunk) for
  `/proyectos/`: the hero loop's viewport-aware playback, the per-piece
  reveals, the category filter (hide, let CSS Grid repack, then carry every
  surviving piece between its two measured boxes) and the sticky filter band's
  `data-stuck`. The masonry's dent reuses `PressSurface.ts`. The filter is
  published by this chunk, so a page without JavaScript shows the complete
  archive and no dead control;
- `ContactBite.ts`: loads `ContactBiteMotion.ts` on demand for the home contact
  close (entrance, the soft sculpture's live pose from `ContactSculpture.ts`,
  pressure on "muerda", bite);
- `MagneticElements.ts`: bounded pointer response with cached bounds.

Motion must support full/reduced preferences, fine/coarse pointers, keyboard,
touch and no JavaScript. Prefer transform, opacity, SVG masks and clip paths.
Avoid layout thrashing, permanent expensive filters, uncontrolled loops and
motion required for content access. Preserve native scroll and navigation.

## Responsive Strategy

- Use fluid tokens and capability queries, not device labels alone.
- Desktop fine pointer may receive pinned rail, cursor and magnetic enhancement.
- Tablet/mobile retain touch-safe layout and native project overflow.
- Automated targets: 1440x1000, 834x1112, 390x844, compact 320x720 and 200%
  text sizing on editorial routes.
- Fixed controls must not overlap hero/contact/footer/project content.
- Every interaction must cover desktop, tablet, mobile, fine pointer, coarse
  pointer, keyboard and `prefers-reduced-motion`.

## Accessibility Requirements

Preserve semantic HTML, logical DOM order, landmarks, skip navigation, visible
focus, real controls and truthful labels/ARIA state. Keep menu focus
containment/restoration and outside `inert` without breaking the native
`<details>` fallback. Use useful alt text for informative media and hide
decorative media correctly. Never require motion, hover, custom cursor or
JavaScript to consume content. Preserve reduced motion, text resizing and
sufficient contrast.

## Performance Requirements

Read `docs/PERFORMANCE_BUDGET.md`. Enforced build budgets are:

- largest uncompressed JavaScript asset <= 150,000 bytes;
- total uncompressed JavaScript <= 220,000 bytes;
- no raw GIFs in production;
- Playwright targets CLS < 0.1 and LCP < 2.5 s;
- no horizontal document overflow.

Supply intrinsic media dimensions, responsive sources and posters. Pause video
outside the viewport and under reduced motion. Measure before adding complexity
or dependencies.

## Content Integrity: Never Fabricate

Never invent clients, projects, awards, testimonials, analytics, metrics,
results, team members, email addresses, telephone numbers, locations, legal or
business identity, social profiles, credentials, services, case-study claims,
SEO claims or project ordering presented as approved.

Unknown information belongs in `docs/CONTENT_NEEDED.md`. Development
placeholders must be unmistakable and must never enter `dist/`. Validate facts,
licenses and publication approval before enabling client material.

## Asset Handling

- Raw intake stays in `public/assets/incoming/` during review and is not directly
  referenced by production.
- Validated brand derivatives live in `public/assets/brand/`.
- Approved project media belongs in `public/assets/projects/`.
- Licensed fonts belong in `public/assets/fonts/bootzy/` and
  `public/assets/fonts/more-sugar/` as WOFF2.
- Official motion uses the exact slots in `src/config/assets.ts` and
  `docs/CONTENT_NEEDED.md`.
- Preserve originals and create named optimized derivatives with dimensions.
- Run asset, brand and hero checks after asset work. Never ship unknown rights.

## Git and Deployment Workflow

- GitHub is the source of truth:
  `https://github.com/curroruiz97/colmillo-studio.git`.
- Vercel automatically deploys production from `main`.
- Claude must **not manually deploy production**.
- A push to `main` can affect the public URL. Do not push unless the user
  explicitly requests it and the release impact is understood.
- Do not commit unless requested. Keep commits scoped and inspect final diffs.
- Before editing, run `git status --short --branch`, inspect diffs and determine
  ownership. Inspect existing code before replacing anything. Preserve working
  functionality and user work.
- Prohibited: `git reset --hard`, `git clean -fd`, `git checkout -- .`,
  `git restore .`, forced push and history rewriting.
- Never discard or overwrite uncommitted work. Verify usage before replacing
  components, config, assets or dependencies.
- Current state: local `main` is one commit ahead at `f1e53bf`; `origin/main` is
  `6032d56`; `package-lock.json` has a pre-existing uncommitted 102-line metadata
  deletion that must be preserved pending user direction.

## Completed Work

- Static shell, permanent routes and fail-closed SEO/release gates.
- Home/editorial/contact/project layouts and shared visual system.
- Isolated typed fictional demo with ten project routes.
- `/proyectos/` as the portfolio (2026-09-16): one white sheet end to end —
  a hero in the `/studio/` and `/servicios/` composition with a 16:9 slot for
  its loop (ink title, black wordmark, `headerTheme="light"`), a sticky
  category filter, a twelve-column asymmetric masonry whose spans and
  proportions come from each project's `format`, and a closing scene. No
  section paints a field of its own and the footer keeps the shared white, so
  the work is the only colour on the route. The standard build renders the
  hero and the close only while no project is approved.
- `/proyectos/` close as a scene (2026-09-16): the client's panoramic picture
  with the decision standing in the gap it leaves — the question with its
  orange mark, one supporting line and two bite buttons (`Hablemos` to
  Contacto, `Ver servicios` to Servicios). Its paper is lifted to pure white
  by `npm run media:projects`, so the picture has no edge on the sheet, only
  its sculptures; each end is drawn as its own wing at a capped height, faded
  on three sides, and pushed out only as far as keeps the copy's room clear.
  Portrait screens put one end in a band at the top and the other at the foot.
  It fills a whole screen and joins the route's stack (`data-stack-section` on
  the hero and on it), so it rises over the archive behind a rounded band the
  way the `/servicios/` layers do; what makes that read on an all-white route
  is the scene, because the sculptures carry colour even where the ground does
  not. Copy and the paper lift are provisional (`docs/CONTENT_NEEDED.md`).
- `/contacto/` as a conversation that starts (2026-09-16): a charcoal hero one
  screen tall with no media column — one typographic block over about 60% of
  the measure and, in the empty rest of it, the route's own graphic: an
  unfinished
  orange trajectory with an opening and a disc walking its line — then one
  white sheet that rises over the sticky hero and holds the whole brief. That
  brief is a sticky left block (Hablemos., one line, the approved address and
  profile) beside a large editorial form set straight into the page: small
  label, large control, hairline rule, no box anywhere. Five fields, the
  service selector a native radio group drawn as pills, the shared bite button
  on its ink slab, and a small orange ring in the margin that glides to the
  field with focus. Nothing else: the edge menu is the navigation. No asset is
  added and nothing claims a message was sent — see below.
- Responsive project rail with desktop ScrollTrigger enhancement and native
  touch/no-JavaScript/reduced-motion fallbacks.
- Colmillo Edge Menu: a small orange tab on the right edge that follows a fine
  pointer vertically, a panel over a blurred backdrop and a close control that
  retracts to a sliver, with a native `<details>` fallback, focus containment,
  a non-shifting scroll lock and the reported home scene. Second iteration on
  2026-09-10 (see `docs/DECISIONS.md`).
- Global Instagram control: one element in the top-right corner that folds in
  place from `INSTAGRAM ↗` into a round Instagram-glyph control, fed by
  `contactChannels.instagram`. Since 2026-09-15 every route starts as the pill.
- Global wordmark (2026-09-15): `SiteLogo.astro` in `BaseLayout`, a link home
  in the top-left corner of every route's first screen at the home hero's
  size; not fixed, it scrolls away with the page. Each
  route passes `headerTheme` (`light` default; `/studio/` and `/servicios/`
  are `dark`); the home hero keeps an empty `.hero__logo` box of the same size.
- Surface-aware cursor; the system reduced-motion preference is the only motion
  source (the sticky header and the manual motion toggle were both removed on
  2026-09-10 at the user's request).
- Responsive official hero contract and CSS hero fallback.
- Goodbye stage (2026-09-10, photograph on trial since 2026-09-11): a viewport
  over one panoramic photograph that pans from its left end to its right; the
  copy sits in the photograph's black fields (the CTA "Haz que tu marca
  muerda" -> Contacto on the right) and a round back button reverses the same
  timeline (`GoodbyePanorama.ts`). Portrait screens use a photo band with the
  copy below. Photo approval and side A copy are still open.
- Validated black/cream wordmark PNGs.
- Production/demo Playwright matrices and integrity/link/asset/brand/hero/release
  checks.
- Temporary Vercel demo authorization and rollback context documented.

## Unfinished Work and Known Issues

- No approved project entries exist, so `/proyectos/` publishes its hero and
  its close alone in the standard build.
- Contact channels, legal/business text, approved copy/services/social/SEO data
  and canonical domain are absent.
- `/contacto/` has no submit endpoint. This repository has no server, API
  route, server action or mail provider, and none may be added without
  authorisation. `contactFormEndpoint` in `src/data/contactPage.ts` is `null`,
  so the form validates and then hands the brief to the visitor's own mail
  client, saying exactly that; setting that constant is the only code change
  needed to submit for real. See `docs/CONTENT_NEEDED.md`.
- The route's copy is the user's provisional wording (2026-09-16) and is
  pending approval, and the approved address `hola@colmillostudio.com` differs
  by one letter from the one written in that request.
- `.contact-page__*` in `src/styles/layout.css` is dead since the rebuild and
  is waiting for a cleanup pass.
- Licensed fonts, vector logo/favicon/brand manual and official hero/goodbye
  media are absent.
- Standard build intentionally withholds unapproved content; release/indexing
  gates are closed.
- Vercel serves the temporary fictional demo and showed a payment-failed/overdue
  account warning.
- Repository Prettier check fails on the existing 79-file line-ending mismatch.
- Local Git is ahead and dirty as detailed above and in `EXECUTION_STATE.md`.

## Exact Recommended Next Action

Begin Phase 4 only after receiving an authoritative client bundle. Ask for and
validate the first approved content/assets in `docs/CONTENT_NEEDED.md`, then
populate existing config, project collection and media slots while leaving
release/indexing disabled. Preserve the demo/production boundary; re-run static,
browser and visual QA. Do not invent information, change visual direction, push
`main` or change Vercel without explicit authorization.
