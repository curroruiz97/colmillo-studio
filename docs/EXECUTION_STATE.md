# COLMILLO STUDIO - EXECUTION STATE

Persistent handoff document for Codex sessions. This describes the actual
repository state, not an aspirational roadmap.

## Last Updated

2026-09-09

## Current Phase

The technical foundation, isolated demonstration and full creative-polish phase
are complete. The active phase is Phase 4: approved client content and asset
intake. The intentional Phase 6/7 final-release and indexing gates remain
blocked by client deliverables and approvals.

The public Vercel URL currently serves a temporary, explicitly user-authorized
fictional demo. This is not approved final production content and does not
change the standard repository release contract.

## Repository Status at Handoff

- Repository root: `C:\Users\fruiz\Desktop\colmillo-studio`.
- Branch: `main`.
- Local HEAD: `f1e53bf Document authorized Vercel demo deployment`.
- Remote `origin/main`: `6032d56 Initial Colmillo Studio implementation`.
- Local `main` is one commit ahead of `origin/main`.
- Remote: `https://github.com/curroruiz97/colmillo-studio.git`.
- Pre-existing uncommitted user change: `package-lock.json` has 102 deleted
  `libc` metadata lines in optional platform packages. It was inspected and
  deliberately left untouched.
- This handoff updates this file and creates root-level `CLAUDE.md`.
- No commit, push, deployment, deletion, reset or history rewrite was performed
  during the handoff.
- GitHub is the source of truth. A future agent must inspect status and diffs
  before changing, committing or synchronizing anything.
- `.gitignore` was checked: it does not exclude `CLAUDE.md`,
  `COLMILLO_BUILD_SPEC.md` or `docs/`.

## Completed

- Preserved the Astro 7.3.1 static foundation, strict TypeScript, native CSS,
  GSAP/ScrollTrigger motion controller, semantic routes and prelaunch indexing
  guard.
- Added three typed fictional projects that are automatically available in
  development and in Astro `demo` mode. Every card and detail repeats
  `DEMO FICTICIA — NO PUBLICAR`.
- Added reusable project cards, accessible abstract CSS covers, project hero,
  service/year/summary metadata, responsive gallery, previous/next navigation
  and return to the project index.
- Added `build:demo`, which writes the twelve-page demonstration only to
  `dist-demo/`. The standard build remains nine pages and contains no demo
  routes, strings or assets.
- Completed the horizontal rail with fine-pointer GSAP enhancement, semantic
  controls, focus synchronization, continuous/discrete progress, active-card
  feedback, reduced-motion behavior and native horizontal overflow when
  JavaScript is disabled.
- Revisited the supplied live references and translated their durable ideas
  into Colmillo-specific behavior: a velocity/press-responsive contextual
  cursor, rounded sticky layers that visibly compress under the incoming
  section, a numbered side progress rail and an original CSS goodbye scene.
- Added permanent `/manifiesto/` and `/studio/` routes with unique metadata,
  explicit header/home/contact navigation and visually complete demonstration
  narratives. Provisional narrative blocks are visibly marked and excluded
  from the standard artifact.
- Rebuilt `/contacto/` as an orange editorial hero, dark channel stage and
  internal continuation map. Confirmed contact channels remain centralized and
  null, so no email, telephone or social profile was invented.
- Processed the user-supplied black and cream wordmarks with deterministic
  matte-to-alpha recovery, a tight crop and an even 12 px transparent margin.
  The responsive header now uses black on its cream treatment and cream on the
  dark Contacto treatment, with intrinsic dimensions and no JavaScript
  dependency. `check:brand` validates RGBA, dimensions, antialiased edges and
  clear space.
- Completed an additional responsive pass for the new routes and the existing
  route set at 1440×1000, 834×1112, 390×844 and 320×720. Removed the rem-based
  document minimum that caused overflow at 200% text sizing.
- Corrected the hero continuation link so it resolves to `#manifiesto` only
  when that section is rendered and otherwise resolves to `#contacto`.
- Expanded the dormant official hero media contract to desktop/mobile WebM and
  MP4 sources, explicit media queries, poster fallback, intrinsic dimensions,
  out-of-viewport pause and reduced-motion pause/static behavior.
- Moved tablet/desktop fixed controls into a reserved right rail and added
  mobile hero/footer clearance. Automated geometry checks cover hero, contact,
  footer, project copy and project navigation at 1440×1000, 834×1112 and
  390×844.
- Removed active ClientRouter navigation after rapid history QA exposed a
  rejected transition. Native navigation now owns back/forward; a short CSS
  bite reveal on `main` supplies non-blocking page-entry motion.
- Added safe environment parsing and types for every project environment
  variable. Invalid canonical origins and invalid boolean approvals fail
  closed.
- Added conditional favicon support, canonical normalization, `og:image` and
  `og:image:alt` support, project `article` metadata, and unique route
  descriptions. No unverifiable structured data was added.
- Added local route/fragment validation for all rendered anchors.
- Made `release-manifest.mjs` exclude any prior `release-manifest.json` before
  hashing; an automated double-run check proves stable file entries.
- Reduced layout work in magnetic interactions by caching bounds on pointer
  entry.
- Corrected the runbook to GPT-5.6 Sol, high reasoning and standard service.
- Replaced the competing fixed utilities with a mathematically centered menu
  trigger and a full-viewport editorial navigation surface. The panel includes
  numbered routes, project return, motion preference and legal links; Escape,
  focus containment/restoration and `inert` behavior are implemented while the
  native `<details>` fallback remains usable without JavaScript.
- Simplified the global header to logo plus current-route context until real
  contact channels exist. The supplied black/cream variants continue to switch
  by surface with intrinsic dimensions.
- Unified hero, editorial pages, stacked sections, project cards and cursor
  through bounded pointer, velocity, surface-tone and progress state. Added
  hero exit compression, whole-block editorial reveals, pressure edges and
  active-project depth without another dependency or permanent frame loop.
- Added responsive menu/project clearance and an automated ±1 px centering
  assertion across 1440×1000, 834×1112, 390×844 and 320×720.
- Tested cross-document View Transitions and removed them after reproducing a
  touch back/forward rejection. Native navigation and the short CSS entry remain
  authoritative; the entry does not scale the viewport and is disabled when
  scripting or motion is disabled.
- Removed root-level hover scaling from the hero CTA so its hit area stays
  stable without JavaScript; the visual pressure response now occurs on its
  content/pseudo-element.

## Work In Progress

- None. All reversible technical and demonstration work in the current plan is
  complete.

## Partially Implemented / Dormant Contracts

- The typed real-project collection and project presentation components are
  complete, but `src/content/projects/` has no approved entries.
- Contact UI and centralized channel configuration are complete. The approved
  email `hola@colmillostudio.com` and Instagram
  `https://www.instagram.com/colmillo.studio/` are published in the sticky
  header, the home contact section and `/contacto/`. The telephone channel
  remains `null` because no number has been supplied, so no `tel:` link is
  emitted anywhere.
- Hero/goodbye media contracts are wired, but the official files are absent and
  CSS fallback compositions remain active.
- Bootzy TM and More Sugar slots exist, but licensed WOFF2 files and
  corresponding `@font-face` declarations are intentionally absent.
- Canonical/Open Graph/favicon/release plumbing exists, but the approved domain,
  social image, favicon, final SEO copy and approvals are missing.
- Legal routes/layouts exist, but approved legal and business identity text is
  not present.
- The transparent wordmark PNG derivatives are validated; the original vector
  master and final brand manual are still missing.

## Intentional Blockers

- Favicon and original vector logo master for the final brand archive.
- Licensed Bootzy TM and More Sugar WOFF2 files.
- Final brand manual and spacing/background rules.
- Official hero and goodbye animation sources plus approved optimized
  WebM/MP4/poster derivatives.
- Public telephone number for the third sticky-header quick-access channel.
- Approved home copy, services, projects/media, remaining social links, legal
  text, SEO copy, social image, canonical domain and project ordering.
- Explicit final content, legal, visual, release and indexing approvals and an
  approved canonical domain/production configuration.

These are client/content/production decisions, not technical failures. The
temporary Vercel demo contains visibly labelled placeholders by explicit user
authorization; the standard `dist/` artifact remains free of them.

### Exact missing asset slots reported by `check:assets`

- Directories `public/assets/fonts/bootzy/` and
  `public/assets/fonts/more-sugar/`.
- At least one licensed WOFF2 file in each font directory.
- `public/assets/brand/favicon.svg`.
- Hero: `hero-desktop.webm`, `hero-desktop.mp4`, `hero-mobile.webm`,
  `hero-mobile.mp4` and `hero-poster.webp` under
  `public/assets/motion/hero/`.
- Goodbye: `goodbye.webm`, `goodbye.mp4` and `goodbye-poster.webp` under
  `public/assets/motion/goodbye/`.

Also missing are the original vector logo master, final brand manual, approved
copy/services, real project case studies and media, verified contact/social
data, legal/business text, SEO copy/social image, canonical domain, project
ordering and final approvals. `docs/CONTENT_NEEDED.md` is authoritative.

## Current Repository Facts

- Package manager: npm 10.9.2 with committed `package-lock.json`.
- Codex project default: `gpt-5.6-sol`, high reasoning effort, standard
  `default` service tier.
- Runtime observed during this handoff: Node 22.14.0.
- Git history is initialized on `main` and the public `origin` is
  `https://github.com/curroruiz97/colmillo-studio.git`. The initial publication
  was explicitly authorized by the user on 2026-09-09.
- Framework: Astro 7.3.1, static output; TypeScript 6.0.3 strictest mode.
- Motion: GSAP 3.15.0 + ScrollTrigger; centered native-details menu, shared
  pressure/surface state, native document navigation and CSS page entry reveal.
- Standard output: `dist/`, nine pages, demo forbidden.
- Demo output: `dist-demo/`, twelve pages including three fictional detail
  routes. It is currently deployed only under the documented temporary public
  demo exception and must not become the final production artifact.
- Project collection: typed local glob loader, currently empty and publication
  disabled until approved entries arrive.
- Prelaunch indexing: `noindex` and blocking `robots.txt` remain active.
- Header brand assets: supplied transparent black 906×242 and cream 865×232
  PNG wordmarks under `public/assets/brand/`.
- Current Vercel production deployment: `https://colmillo-studio.vercel.app/`,
  initially ready from commit `6032d56`. On 2026-09-09 the user explicitly
  authorized a temporary public demonstration; the Vercel project now
  overrides its build command with `npm run build:demo` and output directory
  with `dist-demo`. Deployment `HS87WdN3Xcf53FVTTCTzsz7cPj1v` reached Ready
  and was assigned to the public domain. The standard repository build remains
  unchanged.
- The local branch contains one unpushed documentation-only commit for this
  authorization. The repository policy rejected `git push` because the user
  authorized publication but did not explicitly request a source-control push.
  The unrelated pre-existing `package-lock.json` modification remains
  untouched.
- Vercel normally deploys production automatically from GitHub `main`; future
  agents must not manually deploy production. The project dashboard also showed
  a failed/overdue payment warning, which is an external account risk.

## Last Successful Validations

Fresh handoff verification on 2026-09-09:

- `npm.cmd run check`: passed; 67 files, 0 errors, 0 warnings and 0 hints.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: passed; nine static pages written to `dist/`.
- `npm.cmd run check:production`: passed; 16 generated files, 126,717
  uncompressed JavaScript bytes, no demo content, placeholders or GIFs.
- `npm.cmd run check:links`: passed; nine production HTML files checked.
- `npm.cmd run check:assets`: exited 0 in prelaunch mode and reported the 13
  intentional missing client asset/font slots.
- `npm.cmd run check:brand`: passed both wordmark contracts.
- `npm.cmd run check:hero`: passed the responsive hero contract.
- `npm.cmd run test:e2e`: 25 passed, 3 intentional skips.
- `npm.cmd run test:e2e:demo`: 29 passed, 10 intentional capability skips.
- `npm.cmd run format:check`: failed on the existing Windows checkout
  line-ending mismatch across 79 otherwise unrelated files. No mass formatting
  was performed.

Additional existing validation record:

- Standard production integrity: 16 generated files and 126,717 uncompressed
  JavaScript bytes before manifest generation; no demo content, development
  placeholders or GIFs.
- `npm.cmd run test:e2e`: 25 passed, 3 skipped. The skips are intentional
  capability-specific duplicates; the suite now includes centered-menu
  geometry, full-panel keyboard behavior and no-JavaScript stability.
- `npm.cmd run test:e2e:demo`: 29 passed, 10 skipped. The capability-gated
  cursor, side-progress, pinned-rail, compact-width and text-scaling assertions
  run only where meaningful; their touch duplicates are deliberately skipped.
- Demo link validation: twelve HTML files checked with no missing route or
  fragment.
- Visual Chromium QA completed at 1440×1000, 834×1112 and 390×844 across home,
  open/closed menu, project rail, project index/detail, Manifiesto, Studio,
  Goodbye, Contacto and 404. The polish pass corrected panel focus, mobile
  project navigation clearance, header hierarchy, page-entry viewport coverage
  and stable no-JavaScript CTA interaction. Legal routes remain included in the
  console/overflow suite. Reduced motion, fine pointer, touch and no-JavaScript
  states passed.
- Manifiesto, Studio and Contacto received dedicated top/interior screenshots at
  1440×1000, 834×1112, 390×844 and 320×720; root overflow remained zero. A 200%
  text-size probe also remained at zero overflow across the editorial, project
  index and privacy routes.
- Local performance assertions passed: CLS < 0.1, LCP < 2.5 s, no horizontal
  overflow and JavaScript below 220 KB.
- `npm.cmd run check:manifest`: passed after two consecutive generations; 16
  stable files, manifest self-entry excluded.
- `npm.cmd audit`: found 0 vulnerabilities.
- The invalid-environment probe rejected `PUBLIC_RELEASE_APPROVED=yes`.
- Release-mode asset intake intentionally exited 1 and listed the 13 missing
  official files/font slots.
- Live/local deployment diagnosis on 2026-09-09: Vercel built nine pages from
  commit `6032d56`; its CSS/JavaScript asset hashes match the freshly generated
  local `dist/`. The live page and `dist/` contain only `#inicio` and
  `#contacto`, while development and `dist-demo/` render seven home sections.
  The discrepancy is the intentional `DEV`/`demo` content gate, not stale
  deployment or browser cache. The live browser console reported no warnings
  or errors.
- Vercel framework settings saved on 2026-09-09 with the explicitly authorized
  temporary public-demo override. The demo remains visibly marked, `noindex`
  and blocked by `robots.txt`; final content and release gates remain open.
- Pre-deployment demo verification on 2026-09-09: `npm.cmd run test:e2e:demo`
  passed with 29 tests and 10 intentional capability skips after installing the
  matching Playwright Chromium headless shell. The standard
  nine-page build, production integrity, internal links, brand assets and hero
  contract also passed; the demo build generated all twelve expected pages.
- Targeted Prettier validation passed for `docs/DECISIONS.md`,
  `docs/DEPLOYMENT.md` and `docs/EXECUTION_STATE.md`. The repository-wide
  `format:check` currently reports the existing Windows checkout line-ending
  mismatch across 79 otherwise unmodified files, so no mass reformat was
  performed.
- Post-deployment browser QA on 2026-09-09 confirmed seven home sections, three
  visible fictional-demo notices, the horizontal project rail and all three
  demo project links on `https://colmillo-studio.vercel.app/`. The Fauce
  Elástica detail route and chained project navigation rendered successfully;
  metadata remains `noindex, nofollow` and the public browser console reported
  no warnings or errors.

## Known Issues and Limitations

- Repository-wide `format:check` exits 1 because of the existing 79-file
  Windows line-ending mismatch. This handoff intentionally did not reformat the
  application.
- The public Vercel URL serves fictional review content, not approved client
  content; its demo build override must be removed before final release.
- The Vercel account dashboard showed a failed/overdue payment warning.
- The uncommitted `package-lock.json` metadata deletion has unknown
  ownership/intent and must not be discarded or normalized without the user.
- Real projects, contact channels, official media/fonts, legal/business text,
  canonical metadata and final approvals are absent by design.

## Expected Failing Gates

- `npm.cmd run release:check`: intentionally blocked with exactly three missing
  prerequisites — canonical HTTPS origin, release approval and indexing
  approval.
- `REQUIRE_CLIENT_ASSETS=true npm run check:assets`: intentionally blocked by
  the 13 remaining official asset/font slots listed above. The two wordmarks
  are no longer reported missing.

## Changed Files

- This handoff created root-level `CLAUDE.md` and updated this state file only.
  The existing `package-lock.json` modification was not touched.

- Added project model/demo data under `src/data/` and reusable project
  components under `src/components/projects/`.
- Added `src/pages/manifiesto.astro` and `src/pages/studio.astro`; rebuilt
  `src/pages/contacto.astro`, primary navigation and home section routes.
- Updated project routes, home rail, hero, SEO/layout components, content schema
  and responsive/motion styles.
- Updated motion lifecycle to native navigation; removed the unused
  `PageTransitions.ts` module.
- Added demo Playwright configuration and expanded production/demo,
  accessibility, performance, overlap, history, console and no-JavaScript
  coverage.
- Added link, responsive-hero and manifest-idempotence scripts; hardened release
  and production checks.
- Added deterministic logo preparation and brand-alpha validation scripts;
  replaced the text wordmark with responsive supplied-image variants.
- Updated package scripts, environment declarations/examples, ignore rules and
  all affected project documentation.
- Documented the explicitly authorized temporary Vercel demo exception and its
  rollback procedure in `docs/DECISIONS.md`, `docs/DEPLOYMENT.md` and this
  state file.
- Rebuilt the global menu/header composition and added `EditorialMotion.ts` and
  `SurfaceTone.ts`; refined hero, stack, project and cursor controllers plus
  their responsive styles and Playwright contracts.
- Simplified the native-document motion bootstrap to one controller mount per
  page, eliminating a redundant initial Astro lifecycle remount found during
  repeated cursor QA.

## 2026-09-09 Session: First Content Intake and Hero Corrections

Claude Code session after the Codex handoff. Changes:

- Published the first two approved contact channels supplied directly by the
  user. `src/config/contact.ts` gained an optional `value` field so the real
  address is shown where there is room, while the sticky header keeps the short
  `Correo`/`Instagram` labels.
- Removed the `@media (max-width: 48rem)` rule that hid every header nav item
  except the last. It was dormant while the nav was empty and would now have
  hidden the email on small screens.
- Fixed the hero lockup. `.hero__kinetic` is a `<p>`, so it inherited
  `max-inline-size: var(--reading-width)` (48rem/768px). Above roughly 1330px
  the display font outgrew that cap and `MILLO` wrapped, rendering the hero as
  three lines. The element now opts out of the prose cap and both spans use
  `white-space: nowrap`, so the lockup is always `COL` / `MILLO`.
- Fixed CTA label centering. `.bite-button` centered its span as a flex item
  but left its text `start`-aligned, so any font that forced a second line
  rendered off-center. It now uses `text-align: center`, `text-wrap: balance`,
  `padding: 1.05rem 2rem` and `max-inline-size: 18.5rem`.
- Updated the foundations spec: the former "no invented contact links" test now
  asserts that only the approved destinations are published, that the header
  channels exist but stay hidden over the hero, and that no `tel:` link exists.

Browser verification at 1920×1080, 1440×1000, 1280×900, 1024×800, 834×1112,
390×844 and 320×720, including a deliberately wider display face to emulate
other font metrics and any future licensed face:

- `COL` and `MILLO` each measured exactly one visual line at every viewport.
- Document horizontal overflow measured 0 everywhere.
- Where the wider face forced the CTA onto two lines, both line centres
  measured 0px from the button axis.
- No browser console errors on the home or `/contacto/`.

Fonts were re-checked, not changed: `src/styles/fonts.css` still registers no
`@font-face`, and `--font-display`/`--font-handwritten` still fall back to
`system-ui`. The Bootzy TM and More Sugar slots are correct and dormant; only
the licensed WOFF2 files are missing.

Repository-wide `format:check` now reports 78 files instead of 79 because
`src/config/contact.ts` was rewritten with LF endings. No mass reformat was
performed; every changed file was verified to differ from Prettier only by the
pre-existing line-ending mismatch.

## 2026-09-09 Session: Horizontal Rail Pin Bug

Reported symptom: scrolling the home reached the projects section normally, the
section then disappeared, and it came back after scrolling further.

Root cause, reproduced by measuring the section across the whole page scroll at
1440x1000: during the pin the section reported `position: fixed` with
`top: -scrollY`, so it sat at the document origin and scrolled away. `main`
had a computed `transform: matrix(1, 0, 0, 1, 0, 0)` because `page-bite-in`
animated `transform` with `animation-fill-mode: both`, which made `main` the
containing block for every `position: fixed` descendant. See
`docs/DECISIONS.md`.

Fixes:

- Removed `transform` from the `page-bite-in` keyframe. The pinned section now
  measures `top: 0` and stays visible for the whole pin while the track
  advances horizontally.
- Constrained the enhanced rail to `100svh`. The section previously measured
  1421px against 1000px and 800px viewports, so the bottom of each card was
  unreachable during the pin. The card media now absorbs the leftover space.
- Added `the pinned project rail stays in view for the whole pin` to
  `tests/e2e/demo.spec.ts`. It samples four points across the pin, asserts the
  section stays on screen and fits the viewport while fixed, asserts the track
  advanced, and asserts no ancestor of the rail declares transform,
  perspective, filter or backdrop-filter. The test was confirmed to fail when
  the keyframe transform is reintroduced.

Demo suite is now 30 passed and 12 skipped. Production integrity reports
130,072 uncompressed JavaScript bytes, still inside the 220,000 budget.

## Concurrent Work By Another Session

While this session was running, another process added an unrelated manifesto
home scene to the working tree at 15:28-15:31 local time:

- new `src/scripts/motion/ManifestoMotion.ts` and
  `src/styles/manifesto-home.css` (untracked);
- modified `src/components/sections/IntroSection.astro`,
  `src/scripts/motion/MotionController.ts` and `src/styles/index.css`.

That work is not part of this session and was deliberately left untouched. It
changes the home layout: `#manifiesto` now contains a 3000px
`.manifesto-home__track`, so every section below it moved down by roughly
2000px. It uses a sticky stage with scrub rather than a ScrollTrigger pin, so
it was not affected by the containing-block bug. Its own QA has not been
performed by this session. Future agents must run `git status` before assuming
ownership of these files.

## 2026-09-09 Session: Home Manifesto Poster Sequence

Claude Code session, requested by the user. Only the home manifesto section was
redesigned; no other section was changed.

- Rebuilt `src/components/sections/IntroSection.astro` as a 300svh track with
  one sticky 100svh stage. The `h2` still contains all three words in reading
  order, so the accessible name behind `aria-labelledby="intro-title"` is
  unchanged.
- Added `src/styles/manifesto-home.css` and a new `sections` cascade layer in
  `src/styles/index.css`, placed after `components`. All new rules are isolated
  in that file; `layout.css` and `typography.css` were not touched.
- Added `src/scripts/motion/ManifestoMotion.ts` and registered it in
  `MotionController`. It uses `gsap.matchMedia`, a single scrubbed timeline with
  `invalidateOnRefresh`, and canvas-fraction offsets. Cleanup is `media.revert()`.
- The pointer micro-response reuses the existing `--pointer-shift-*` custom
  properties published by `CustomCursor`, so no new listener or frame loop
  exists. It is inert on touch and under reduced motion.
- Hardened the project rail test's scroll setup in `tests/e2e/demo.spec.ts`; its
  assertions are unchanged. See `docs/DECISIONS.md`.

Verification performed this session:

- `npm.cmd run check`: 0 errors, 0 warnings, 0 hints.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: 9 pages. `check:production`: passed, 132,018 JS bytes,
  no demo content or placeholders. `check:links`: passed.
- `npm.cmd run build:demo`: 12 pages.
- `npm.cmd run test:e2e`: 25 passed, 3 intentional skips.
- `npm.cmd run test:e2e:demo`: 30 passed, 12 intentional skips.
- Playwright screenshot pass at 1920x1080, 1440x900, 1366x768, 1024x1366,
  768x1024, 430x932, 390x844 and 320x720, covering all four scenes, reverse
  scroll and reduced motion. Horizontal document overflow measured 0 at every
  size, and an automated check asserts that no word or CTA is hidden under
  reduced motion.
- Browser inspection of the live dev server at 1920x855 for scenes 01 to 04.
- The hero `#manifiesto` anchor lands at 0px offset at 1366 and 1440.
- Prettier passes on every file added or edited this session except
  `src/styles/index.css`, which differs from Prettier only by the pre-existing
  repository-wide CRLF mismatch; its content is byte-identical otherwise. No
  mass reformat was performed.

Known limitation left in place deliberately: the old `.intro-section__*` rules
in `layout.css` are now unused. They were left untouched because they share
multi-selector rules with the studio and contact grids and another session was
editing that file concurrently.

## 2026-09-09 Session: Services Section Redesign

The home services block was a bare development placeholder: an index, the word
"Servicios" and a note. It has been rebuilt as an asymmetric editorial
composition. New files:

- `src/data/services.ts` — typed `ServiceRecord` plus four flagged
  demonstration services. `homeServices` is empty outside development and
  `demo` mode, so the standard build renders no services section at all.
- `src/components/ui/ServiceGlyph.astro` — four abstract glyphs built from
  Colmillo's own vocabulary: two circles under pressure, a bitten disc,
  compressed modules and a row of traces. Inline SVG, decorative, no icon set.
- `src/styles/services-section.css` — composition, glyph states and the
  responsive/short-viewport rules.
- `src/scripts/motion/ServicesMotion.ts` — entry reveals, scroll-driven active
  service and fine-pointer emphasis, with full cleanup.

Registered with two-line additions to `MotionController.ts` and
`src/styles/index.css`, both of which the parallel manifesto session had
already modified. `scripts/check-production.mjs` gained
`Texto provisional de demostración` as a forbidden marker.

Behaviour:

- Desktop places each entry at a different column, indent and type scale from
  explicit `nth-child` rules. Nothing is randomised.
- No content hides behind hover. Pointer and scroll only change emphasis; the
  inactive entries drop to 0.55 opacity and never disappear.
- Entries without an approved destination are plain articles. No `href="#"`,
  no `tabindex="0"` pseudo-controls.
- Tablet portrait and mobile switch to a structured vertical stack with rules
  between entries, keeping the large titles, numbers, glyphs and orange detail.
- Reduced motion and no JavaScript both render the complete static composition.

Visual QA at 1920x1080, 1440x900, 1366x768, 1024x1366, 768x1024, 430x932 and
390x844: no entry overlaps, no horizontal overflow, no console errors, and the
section stays between 1.44 and 2.09 viewport heights.

Two defects were found and fixed during QA:

- The first `notch` glyph read as a generic lightning bolt. Replaced with a
  bitten disc.
- The GSAP reveal left an inline `opacity` on each entry, which overrode the
  CSS rule that dims the inactive ones, so hover emphasis silently did nothing.
  The reveal now targets an inner block (`[data-service-inner]`) so the entry's
  own opacity stays CSS-owned.

Demo suite is now 34 passed and 14 skipped, with two new specs covering
readability in every mode and the asymmetry plus dimming range on a fine
pointer. Production integrity reports 132,077 uncompressed JavaScript bytes
against the 220,000 budget, and `dist/` contains no services markup at all.

## Exact Recommended Next Action

Continue Phase 4 intake. The outstanding items are the public telephone number,
the official licensed fonts, the hero/goodbye media, approved copy, real
projects, legal data, favicon/vector master and canonical domain. Then replace the gated demonstration content and repeat visual/content
approval before enabling either release or indexing. No further technical work
from the current creative-polish plan is pending. Do not push `main`, manually
deploy or alter Vercel until the user explicitly authorizes that separate
production-impacting action.
