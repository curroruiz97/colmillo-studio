# COLMILLO STUDIO - EXECUTION STATE

Persistent handoff document for Codex sessions. This describes the actual
repository state, not an aspirational roadmap.

## Last Updated

2026-09-14 (latest session at the end of this file)

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
- Local HEAD at the 2026-09-10 session: `44b0650 Publish approved contact
  channels, fix scroll defects and rebuild services`.
- `origin/main` is at the same commit; the branch was published on 2026-09-10 at
  the user's explicit request and local and remote are in sync.
- The 2026-09-10 edge-menu work and the concurrent hero-media work are both
  uncommitted at the time of writing.
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
- Replaced the competing fixed utilities with a single primary navigation
  gesture carrying numbered routes, project return, motion preference and legal
  links; Escape, focus containment/restoration and `inert` behavior are
  implemented while the native `<details>` fallback remains usable without
  JavaScript. Superseded on 2026-09-10: the centered bottom trigger and its
  full-viewport panel were replaced by the right-edge Colmillo Edge Menu, which
  keeps every one of those guarantees. See the 2026-09-10 session below.
- Simplified the global header to logo plus current-route context until real
  contact channels exist. The supplied black/cream variants continue to switch
  by surface with intrinsic dimensions.
- Unified hero, editorial pages, stacked sections, project cards and cursor
  through bounded pointer, velocity, surface-tone and progress state. Added
  hero exit compression, whole-block editorial reveals, pressure edges and
  active-project depth without another dependency or permanent frame loop.
- Added responsive menu/project clearance across 1440×1000, 834×1112, 390×844
  and 320×720. Superseded on 2026-09-10: the centering assertion was replaced by
  an edge-anchoring assertion, because the trigger is no longer centered.
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
- Demo output: `dist-demo/`, fourteen pages including five fictional detail
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


## 2026-09-10 Session: Colmillo Edge Menu

Claude Code session, requested by the user: replace the primary navigation with
a right-edge rail modelled on the *behaviour* of hellomonday.com, expressed in
Colmillo's own art direction. Only the navigation was redesigned.

### What replaced what

The centered bottom trigger (`MENU | 01`) and its full-surface panel are gone.
Deleted: `src/components/layout/SideMenu.astro`, `src/scripts/motion/SideMenu.ts`
and every `.side-menu*` rule in `src/styles/motion.css`, including its
fine-pointer hover block and its `max-width: 48rem` block. No dead selectors,
hooks or test references remain; searching `src`, `tests` and `scripts` for
`side-menu` returns nothing.

New files:

- `src/components/layout/EdgeMenu.astro` - wrapper, spine, `<details>`
  disclosure whose `<summary>` is the handle, panel and backdrop button.
- `src/scripts/motion/EdgeMenu.ts` - state machine, focus containment, `inert`,
  scroll lock and reported scene.
- `src/styles/edge-menu.css` - imported into the existing `components` layer.

Two-line registrations in `MotionController.ts`, `BaseLayout.astro` and
`src/styles/index.css`.

### Behaviour

Three states on `[data-edge-menu]` as `data-state`:

- `closed`: a full-height spine (14 px desktop, 8 px phone) tapered at both
  ends, plus a 24 px swelling of the handle at mid-height. The spine carries no
  travelling marker: it is a stable graphic edge.
- `peek`: one passive `pointermove` listener arms the reveal when a fine pointer
  comes within 72 px of the right edge; the handle slides fully in (89-108 px
  depending on width) showing a vertical `MENU`, three editorial rules of
  unequal length and `01/05`. It retracts past 152 px, which is wider than the
  revealed handle so moving onto it cannot cancel the reveal. Keyboard focus
  triggers the same reveal, so the peek is never the only route in. Disabled
  under reduced motion and on coarse pointers.
- `open`: the panel travels in on `translateX` alone. Its ink surface has large
  elliptical tapers at both ends, a 4 rem bite cut out of the contour with a
  radial-gradient mask, and a 2 px orange pressure edge. Routes reveal on a
  46 ms stagger. The handle becomes a `CERRAR` tab. Proximity is ignored while
  open.

Close paths: the handle, Escape, any link, and the backdrop. Focus moves to the
first route on open and returns to the handle on Escape. `main`, the sticky
header and the footer become `inert`. The scroll lock publishes
`--scroll-lock-gutter` so a classic scrollbar, where one exists, cannot move the
layout when it is removed.

### Measured geometry

| Viewport | Panel | Handle inside | Route type |
| --- | --- | --- | --- |
| 1920x1080 | 704 px (37%) | 108 px | 58 px |
| 1440x900 | 662 px (46%) | 94 px | 54 px |
| 1366x768 | 628 px (46%) | 89 px | 52 px |
| 1024x1366 | 544 px (53%) | 46 px | 45 px |
| 768x1024 | 492 px (64%) | 46 px | 40 px |
| 430x932 | 430 px (100%) | 46 px | 35 px |
| 390x844 | 390 px (100%) | 46 px | 32 px |

Zero horizontal overflow and zero console errors at every size, no label wraps,
and the panel never needs its own scrollbar at any of them.

### Content

Only the five real routes, from `primaryNavigation`: Inicio, Manifiesto, Studio,
Proyectos, Contacto. The panel footer shows the two approved channels from
`contactChannels` (`hola@colmillostudio.com`, `@colmillo.studio`), the projects
link, the motion toggle and the legal routes. Nothing was invented, and no
Servicios entry was added because Services is a demo-gated home section with no
route of its own.

### Defects found and fixed during QA

- Route labels wrapped onto two lines at 1920 under viewport-relative sizing.
  Now sized from the panel with a container query. See `docs/DECISIONS.md`.
- The active mark and the header/footer controls sat under the handle. The panel
  content now clears it, and the mark moved beside the label.
- Reserving the rail on `body` shrank every full-bleed section and left a cream
  band down the right edge of the hero. Moved to the inner containers.
- The 46 px touch handle covered the project hero summary at 390 px.
- The scene observer compared each section's ratio of itself, so a short fully
  visible section outranked the tall one filling the screen: the rail reported
  `03` while the reader was on Contacto, and the spec was intermittently red.
- The handle inherited `data-surface-tone`, so it vanished on a section whose
  declared tone and actual media disagree.

### Verification performed this session

- `npm.cmd run check`: 0 errors, 0 warnings, 0 hints.
- `npx.cmd eslint src tests`: clean.
- `npm.cmd run build`: 9 pages. `check:production`: passed, 133,670 uncompressed
  JavaScript bytes against the 220,000 budget, no demo content, placeholders or
  GIFs. `check:links`, `check:brand` and `check:hero`: passed.
- `npm.cmd run build:demo`: 12 pages.
- Demo Playwright suite: 37 passed, 14 intentional skips, run five consecutive
  times with no flakes after the observer fix.
- Production Playwright suite: 32 passed, 6 intentional skips, and 2 failures
  that belong to concurrent work (below). Run three times.
- Chromium screenshot pass at 1920x1080, 1440x900, 1366x768, 1024x1366,
  768x1024, 430x932 and 390x844, covering closed, peek, open and the rail over a
  light surface, plus reduced motion and keyboard focus.

New specs: closing from the rail and the backdrop, the panel being unreachable
while closed, the rail's anchoring at five widths, proximity reveal and retract,
proximity being ignored while open, the scroll lock not moving the layout, every
label staying on one line at eight widths, and the open panel never hiding
content behind its own handle.

### Concurrent work by another session - do not assume ownership

While this session was running, another process delivered the official hero
media. Its files are `public/assets/WEB.webm`, `public/assets/motion/hero/`,
`scripts/prepare-hero-media.mjs`, `src/styles/hero-section.css`, plus edits to
`src/components/sections/HeroSection.astro`, `src/config/assets.ts` and
`src/scripts/motion/HeroMotion.ts`. That work was left completely untouched.
Both sessions added an import to `src/styles/index.css`; both imports are
present and neither overwrote the other.

Three consequences, all theirs to resolve:

- `tests/e2e/foundations.spec.ts:74` (`the hero uses its static fallback while
  official media stays disabled`) now fails in both production projects, because
  the rewritten hero no longer renders `[data-hero-stage]` and the media slots in
  `src/config/assets.ts` are populated. That spec asserts the pre-intake
  contract and needs updating as part of the intake.
- `npm.cmd run lint` reports 4 errors in `scripts/prepare-hero-media.mjs`: an
  unused `rm` import and three undefined `Buffer` references. Linting `src` and
  `tests` alone is clean.
- The home hero still declares `data-surface-tone="dark"` while its new media is
  cream, so shared tone-following chrome now resolves against the wrong
  background. The edge handle no longer depends on the tone, but the spine and
  the custom cursor still do.

### Exact recommended next action

Phase 4 intake continues and is unchanged by this session; the navigation itself
has nothing pending. Before this working tree is green, the hero intake session
must reconcile its failing spec, its lint errors and the hero's declared surface
tone. Do not push `main`, deploy or alter Vercel without explicit authorization.

### 2026-09-10 follow-up: hidden scrollbar and a marker-free rail

Two adjustments requested after the navigation was accepted.

- `src/styles/globals.css` hides the document scrollbar with
  `scrollbar-width: none`, `-ms-overflow-style: none` and
  `html::-webkit-scrollbar { display: none }`. Only the indicator is removed;
  the document remains a scroll container. `.edge-menu__content` hides its own
  the same way so the panel matches on short viewports.
- The orange progress marker was removed from the rail:
  `.edge-menu__spine::after`, the `accent` tone override for it, and the
  `--edge-mark-size` and `--edge-progress` custom properties are gone, together
  with the single `setProperty` call in `EdgeMenu.ts` that fed them. The section
  observer is unchanged, because it still drives the numbered readouts and
  `aria-current="location"`.

Consequence worth knowing: with no reserved scrollbar the layout viewport is now
the full viewport, so the spine sits flush against the true right edge
(`right` measured 1920 at a 1920 px viewport, previously 1905). The scroll-lock
gutter now resolves to 0 px everywhere and is retained only as a guard.

Verified at 1920x1080, 1440x900, 1366x768, 1024x1366, 768x1024, 430x932,
390x844 and 320x720: reserved scrollbar space 0, horizontal overflow 0, and
wheel, keyboard, touch, programmatic and anchor scrolling all still move the
page. Opening the menu still locks scrolling with no horizontal shift and
restores the position on close. No console errors at any size.

Full repository validation after the change: `check` 0/0/0, `lint` clean across
the whole repository, `build` 9 pages, `check:production` passed at 133,553
JavaScript bytes, `check:links`, `check:brand` and `check:hero` passed,
`build:demo` 12 pages, production suite 38 passed with 6 skips, demo suite
37 passed with 14 skips over three consecutive runs.

Two new specs guard this: the native scrollbar being hidden while wheel,
keyboard, programmatic and anchor scrolling still work, and the rail generating
no pseudo-element marker.

Note that the hero-media session's earlier failing spec and lint errors have
since been resolved by that session; the whole repository now lints clean and
both suites are green.

## 2026-09-10 Session: Home Hero Rebuilt Around The Client Loop

Claude Code session, requested by the user. Only the hero was redesigned. The
right-edge menu was being built by a parallel session and was not touched; the
hero only reserves clearance for it through `--edge-rail-clearance`.

### Client asset analysed

`public/assets/WEB.webm`, supplied by the user and left byte-for-byte untouched.
Measured with ffprobe and by sampling frames: VP9 profile 0, 5040x2160 (7:3),
30 fps, 12.933 s, 3,150,513 bytes, `yuv420p` with no alpha, plus an unused
stereo Opus track. The drawing is black line art on a uniform sheet measured at
RGB(250, 250, 250); the ink sits near RGB(40, 40, 40) and the image is
effectively neutral (U/V within 126-130). Across all 388 frames the drawing
never leaves 12.9%-67.5% horizontally, so a third of the master is blank paper.
The last scene returns to the first, so the loop closes.

The figures contain large interior white areas - faces, shirts, shoes, a
handbag, a cathedral - drawn in exactly the sheet colour, so no threshold can
tell "background" from "inside the drawing" by value alone.

### Derivatives

`scripts/prepare-hero-media.mjs` (new, wired as `npm run media:hero`) generates
the approved files. It requires ffmpeg on `PATH` or `FFMPEG_PATH`; ffmpeg is not
a repository dependency. It crops the master to 4:3 around the drawing (blank
paper only), maps every channel to `cream * min(1, value / 250)` so the sheet
becomes `--color-brand-cream`, and cuts every pixel at or above luminance 240 to
alpha 0. Nothing else is graded, and timing, duration and 30 fps are preserved.
Re-running it produces byte-identical output.

Published to `public/assets/motion/hero/` and activated in
`src/config/assets.ts`: `hero-desktop.webm` 2,116,549 (VP9 + alpha, 1440x1080),
`hero-desktop.mp4` 1,329,372, `hero-mobile.webm` 737,041 (768x576),
`hero-mobile.mp4` 546,069, `hero-poster.webp` 14,172. `check:assets` now reports
8 missing slots instead of 13.

Two attempts were rejected on evidence before this one; both are recorded in
`docs/DECISIONS.md`. A border-seeded flood fill left interior white opaque, and
after encoding it landed 1-3 levels off the page cream, which read as a faint
rectangle on the flat canvas. A binary global cut fixed that exactly but cost
file size, recovered with alternate reference frames, `-cpu-used 1` and CRF 52.

### Hero composition

- `HeroSection.astro` rebuilt: label, visually hidden `h1`, the loop, the CTA
  under it and `SEGUIR` in an orange disc in the bottom-right corner.
- The provisional kinetic `COLMILLO` stage and the "fallback provisional"
  notice are gone from the markup, the styles and the keyframes.
- New `src/styles/hero-section.css` in the `sections` layer. The dead hero rules
  were removed from `layout.css` and the three orphaned keyframes from
  `motion.css`; `.section-kicker`/`.section-index` and `.goodbye-section__media`
  were preserved where they shared a selector with the hero.
- Surface changed from ink to cream (`data-surface-tone="light"`), decorations
  inverted to ink: a solid disc bleeding off the bottom-left, an open ring off
  the top-right and one thin orange trace that leaves the canvas on both sides.
  Mobile keeps only the disc. No new colours.
- `HeroMotion.ts` no longer references the removed stage. It owns playback and
  the exit compression, and now also pauses in a backgrounded tab.
- `check-hero-contract.mjs` additionally asserts that the cream baked into the
  derivatives equals `--color-brand-cream`.

### Defects found and fixed during QA

- The transparent loop revealed the poster underneath it, showing two frames of
  the animation at once. `.hero__poster` is now hidden except under reduced
  motion.
- On coarse pointers the loop overlapped the edge-menu handle at 768, 430, 390
  and 320 px. The stage keeps the rail clearance and the width cap is measured
  against the paper that is actually left.
- On a 1024x1366 tablet the CTA sat 250 px below the loop. Replaced the `1fr`
  stage row with an explicit height budget.
- On mobile the ink disc covered "ESTUDIO CREATIVO". Moved to the bottom-left.
- The CTA wrapped to two lines at 1920 while fitting one at 1440. The hero CTA
  raises the shared 18.5rem measure cap to `min(100%, 24rem)`.
- A reused output buffer in the preparation script could be handed to the
  encoder stream twice; each frame now gets its own buffer.

### Verification performed this session

- `npm.cmd run check`: 72 files, 0 errors, 0 warnings, 0 hints.
- `npm.cmd run lint`: passed.
- `npm.cmd run build`: 9 pages. `check:production`: passed, 22 files, 133,553
  JavaScript bytes, no demo content or placeholders. `check:links`: passed.
  `check:hero`: passed. `check:assets`: 8 intentional missing slots.
- `npm.cmd run test:e2e`: 38 passed, 6 intentional skips.
- `npm.cmd run test:e2e:demo`: 40 passed, 14 intentional skips, including a new
  spec asserting the loop's share of the first screen, the CTA centred under it,
  `SEGUIR` in the bottom-right corner and no horizontal overflow.
- Playwright geometry and screenshot pass at 1920x1080, 1440x900, 1366x768,
  1024x1366, 768x1024, 430x932, 390x844 and 320x720, in three modes: full
  motion, `prefers-reduced-motion: reduce` and JavaScript disabled. No overlap
  between the loop, CTA, `SEGUIR` and the edge-menu handle at any size, zero
  horizontal overflow and no console errors anywhere.
- Firefox was installed and the hero verified in Gecko at 1440x900: the VP9
  alpha WebM plays and composites correctly, no console errors, no overflow.
  Chromium and Firefox are the two engines actually exercised; WebKit was not
  installed, and the cream-flattened colour plane is what protects a decoder
  that ignores WebM alpha.
- Measured the rendered result against the page colour: 85% of sampled pixels
  are exactly the page cream and the worst near-background deviation is 12
  levels on a single antialiased line edge, down from a flat 1-3 level offset
  across whole interior regions before the fix.
- Prettier passes on every file touched this session except
  `scripts/check-hero-contract.mjs`, `tests/e2e/foundations.spec.ts` and
  `package.json`, which differ from Prettier only by the pre-existing
  repository-wide CRLF mismatch; that was verified by diffing with line endings
  normalised. No mass reformat was performed.

### Open items for the user

- `public/assets/WEB.webm` is published in `dist/` (3.15 MB, unreferenced)
  because Astro copies all of `public/`. The file was deliberately not moved or
  deleted. Moving it out of `public/` and pointing `HERO_SOURCE` at the new
  location is the recommended fix once the user confirms.
- The 4:3 crop and compositing the drawing on cream are both creative decisions
  taken on the user's brief; both are listed in `docs/CONTENT_NEEDED.md` for
  explicit confirmation.
- ffmpeg is required to regenerate the derivatives and is not vendored.

## Session: hero wordmark, minimal scroll hint and decor depth (2026-09-10)

Four scoped adjustments to the existing hero, requested by the user. Nothing
outside the hero was touched: the loop, its sources, the CTA label, the edge
menu, the palette and every other section are unchanged.

### What changed

- **Wordmark replaces the "Estudio creativo" label.** The eyebrow paragraph and
  its orange dot are gone. `.hero__logo` renders the already validated
  `public/assets/brand/colmillo-wordmark-black.png` at its intrinsic 906x242
  ratio, sized `clamp(6.5rem, 9vw, 9rem)` and left in the existing page gutter.
  It is decorative (`alt=""`, `aria-hidden`) because the visually hidden `h1`
  already announces "Colmillo Studio". The dimensions now live in a new
  `brandWordmark` export in `src/config/assets.ts`, matching what
  `check-brand-assets.mjs` enforces, so the two cannot drift.
- **`SEGUIR` removed, replaced by a hairline scroll hint.** The orange disc,
  its label, arrow, hover pressure and focus ring are deleted, along with the
  `followHref` prop and its call site in `index.astro`. `.hero__scroll` is a
  4-px ink dot that drifts down ~17.6 px while fading out over 1.5 s and
  restarts, centred on the CTA's axis in the stage's third row. It carries no
  text, no disc, no border and no background.
- **The hint is ornament, not an affordance.** It is `aria-hidden` and
  `pointer-events: none`. The route out of the first screen is the CTA and the
  edge menu, both unchanged, so no navigation was lost with the removed link.
  `foundations.spec.ts` no longer asserts a "Seguir" link.
- **The orange trace now sits behind the ink shapes.** It previously won on
  source order alone and crossed over them in places. `.hero__shape--orbit` is
  pinned to `z-index: 0` and the disc and ring to `1`, giving the intended
  cream -> orange line -> ink shapes -> loop -> UI depth. Its path, thickness
  and colour are untouched.

### Why the hint is CSS and not GSAP

`reduced-motion.css` already collapses every animation to `0.01ms` with a single
iteration under both `prefers-reduced-motion: reduce` and the site's own
`html[data-motion='reduced']` toggle. With no fill mode, the dot therefore falls
back to its base styles — parked at the top, fully opaque — for free. A CSS
keyframe needs no JavaScript, adds no bytes to the motion bundle and nothing to
tear down, so no library was added and GSAP keeps only the existing hero exit
compression (its `.hero__follow` target was retargeted to `.hero__scroll`).

### Height budget

`--hero-reserved` was rebuilt around the new furniture: two page gutters, the
wordmark block, two stage gaps plus the hint's own tighter `--hero-scroll-gap`,
the CTA and the hint. The hint hangs closer to the CTA than the CTA hangs to
the loop, so it reads as a footnote to the button rather than a third peer.

### Verification performed this session

- `npm.cmd run check`: 72 files, 0 errors, 0 warnings, 0 hints.
- `npm.cmd run lint`: passed. `check:hero`, `check:brand`, `check:links`,
  `check:production` (22 files, 133,553 JS bytes) and `check:assets` all passed.
- `npm.cmd run test:e2e`: 39 passed, 7 intentional skips.
- `npm.cmd run test:e2e:demo`: 40 passed, 14 intentional skips. The hero
  composition spec was updated to assert the hint centred under the CTA with
  air between them and inside the first screen, and the wordmark above the loop
  in the top-left, in place of the old `SEGUIR` corner assertions.
- Playwright geometry sweep at 1920x1080, 1440x900, 1440x1000, 1366x768,
  834x1112, 390x844 and 320x720: no overlap between the wordmark, loop, CTA,
  hint and the edge-menu handle; zero horizontal overflow; the orange trace
  behind both ink shapes at every size. The loop keeps 50%, 54%, 62%, 46%, 78%,
  86% and 83% of the viewport width respectively.
- Sampled the dot's computed transform and opacity over time in three modes:
  full motion loops 0 -> 17.5 px with opacity 1 -> 0 and restarts;
  `prefers-reduced-motion: reduce` and `localStorage` `colmillo-motion=reduced`
  both hold it static at y=0, opacity 1. No console errors.

### Notes for the next session

- `npm.cmd run format:check` still reports the pre-existing repository-wide
  line-ending mismatch (71 files). Every file touched this session was checked
  against Prettier ignoring line endings and is clean; no mass reformat was
  made.
- Nothing here unblocks Phase 4. The wordmark was already an approved asset;
  no new client content, copy or claim was introduced.

## Session: hero lift, opaque loop box and foot-anchored ink mass (2026-09-10)

Three scoped hero adjustments requested by the user, plus the deployment of the
previous session's work.

### Deployment

- `4c0f3b5` was pushed to GitHub at 08:22:59Z and produced **no** Vercel
  deployment. The project was neither paused nor billing-blocked: an anonymous
  request served 200 OK, and a request for a non-existent route returned a real
  404 from the build (`X-Vercel-Cache: MISS`), which a paused project could not
  do. `"live": false` in the Projects API is **not** the pause flag; do not read
  it as one.
- The cause was a one-off failure of the GitHub webhook delivery. An empty
  commit (`7dd61cd`) re-fired it and the deployment went `READY` immediately, so
  the Git integration itself is healthy. If a push ever fails to build again, an
  empty commit is the cheap unblock.
- The public demo now serves the current work. `noindex`, `robots.txt`
  `Disallow: /` and the demo artifact boundary were all re-verified after the
  deploy.

### Hero changes

- **The group hangs high.** `--hero-bottom-space` reserves paper under the hint
  and `.hero__stage` splits the unused height through two `fr` spacer rows
  (`--hero-stage-lead` 0.32fr to `--hero-stage-trail` 1fr). Row gaps moved from
  the grid `gap` to margins on `.hero__cta` and `.hero__scroll` so the spacers
  do not inherit them; this also retired the hint's old negative-margin trim.
- **The loop's box is opaque.** `.hero__media-frame` is filled with
  `--color-brand-cream`. The loop has a real alpha channel, so without it every
  decorative shape showed through the drawing's empty paper.
- **The orange trace is gone.** Once the box was opaque the hairline ellipse was
  cut dead at two invisible vertical edges and read as a rendering fault. The
  user authorised removal in the same instruction. The hero decor is now two ink
  shapes; `.hero__shape--orbit` is removed from markup and styles.
- **The ink disc lands on the foot.** `inset-block-end: 0` on both the desktop
  and stack rules, with the size reduced so a fully visible mass does not
  dominate. It still bleeds off the left edge, which was never in question.

### Verification performed this session

- `check`: 0 errors. `lint`, `check:hero`, `check:links` and `check:production`
  (22 files, 133,138 JS bytes) pass.
- `test:e2e` 39 passed; `test:e2e:demo` 40 passed. The hero composition spec
  gained three guards: real paper under the hint, the ink disc never cut by the
  bottom edge, and no orange trace in the DOM.
- Geometry sweep at 1920x1080, 1440x900, 1440x1000, 1366x768, 834x1112, 390x844
  and 320x720: clean at every size. Settled screenshots confirm the disc bottom
  sits exactly on the fold at all of them and the loop box resolves to
  `rgb(252, 238, 218)`.
- The loop now holds 42%, 45%, 53%, 38%, 78%, 86% and 83% of viewport width at
  those sizes. It is deliberately smaller than before: the lift is paid for out
  of its height budget.

### Notes for the next session

- hellomonday.com, the reference the user gave for the vertical placement, draws
  its hero into a full-viewport WebGL `<canvas>`, so there is no DOM geometry to
  measure against and no height to match exactly. The lift was implemented from
  the principle, not from a measurement, and is tunable through
  `--hero-bottom-space` and the two stage weights.
- `format:check` still reports the pre-existing repository-wide line-ending
  mismatch. Files touched this session were checked against Prettier ignoring
  line endings and are clean.

## 2026-09-10 Session: Home Manifesto Scroll Choreography

Claude Code session, requested by the user. Only the home manifesto section and
its own styles, motion module and asset entry were touched. A concurrent session
was rewriting the hero and the services section in the same working tree
throughout; none of its files were modified here. See the notes at the end.

### What changed

- `src/components/sections/IntroSection.astro`. The tension/release circle
  (`__shape`, `__skin`, `__bite`, `__shape-label`) and the vertical "Manifiesto"
  label (`__tag`) were removed with their markup, styles and timeline tracks.
  "Morder." and "Presionar." now share a `.manifesto-home__band` wrapper; the
  `h2` still contains the three concepts in reading order, so the accessible
  name behind `aria-labelledby="intro-title"` is unchanged. A `<noscript>` block
  with `is:inline` drops the tall track and the pin when scripting is off.
- `src/config/assets.ts` gained `manifestoIllustration`, the client-supplied
  `public/assets/manifesto.png` with its intrinsic 1600x900. The file has a real
  alpha channel and its drawn ink occupies 1032x634 inside that frame, so the
  layout sizes the box for the padding rather than for the ink.
- `src/styles/manifesto-home.css`. The desktop composition is now a header band
  at 24%, "Dejar marca." at 48%, the illustration on the right and the CTA
  bottom-left. `will-change: transform` is gone from the words; their
  `font-size` is `calc(var(--manifesto-word) * var(--word-scale))`. The track is
  420svh (was 300svh) to carry six poses with rests between them.
- `src/scripts/motion/ManifestoMotion.ts`. One scrubbed timeline of 100 units:
  00-15 "Morder." held oversized, 15-30 it travels into the band, 34-46
  "Presionar." rises behind a clip mask, 50-66 it travels up beside "Morder.",
  70-84 "Dejar marca." lifts in, 88-100 the illustration seats itself and the
  CTA appears. Rests sit between every move. The illustration participates
  throughout with bounded offsets (3% of canvas width, 5.5% of its height, 0.9
  to 1 scale) and no parallax, rotation or blur.
- `tests/e2e/demo.spec.ts` gained two manifesto specs and one fix; see below.

### Why the words look sharp now

Documented in full in `docs/DECISIONS.md`. In short: the blur was
`will-change: transform` plus a held `scale(1.72)`, so the glyphs were
rasterised once at 105.6 px and stretched. Type now scales through `font-size`,
`force3D` is off, and every rest pose is an identity transform.

### Verification performed this session

- `check`: 0 errors, 0 warnings, 0 hints. `lint` passes. Prettier passes on
  every file touched here.
- `build` 9 pages; `check:production` passes (22 files, 131,626 JS bytes, well
  inside the 220,000 budget); `check:links`, `check:brand`, `check:hero`,
  `check:assets` and `check:manifest` all pass. `build:demo` 12 pages.
- `test:e2e`: 39 passed, 7 intentional skips.
- Timeline sweep at 1920x1080 in 2% steps, forwards and then backwards: the
  largest disagreement between the two directions at the same progress was
  0.1 px, and the trail is monotonic with visible plateaus at every rest. There
  are no jumps and no hysteresis.
- Screenshots of every pose at 1920x1080, 1440x900 and 1366x768 against the dev
  server and again against the built `dist-demo` artifact. No overlap between
  the band, "Dejar marca.", the illustration and the CTA at any of them;
  horizontal overflow 0 everywhere; console clean.
- Composition and stacking checked at 834x1112, 390x844, 320x720, under
  `prefers-reduced-motion: reduce` at 1920 and 390, and at 200% text sizing.
  Mobile stacks "Morder." then "Presionar." then "Dejar marca." then the
  illustration then the CTA, with reveals only and no pin. Reduced motion
  renders the finished poster in one viewport with everything at `opacity: 1`.
- Frame cost over a full scrub at 1920x1080, median/p90/p99: manifesto
  17.4/31.8/42.6 ms against 16.6/19.7/22 for the services section and
  29/32/37 for the existing pinned project rail.

Not verified in a real Chrome window: partway through the session the browser
extension lost site access to `localhost:4321` and every screenshot and
evaluation timed out. All visual QA above was done through Playwright's
Chromium at full resolution, against both the dev server and the built artifact.
An earlier live-Chrome pass in the same session did render the poses correctly.

### Tests

- `the home manifesto builds its composition without scaling the type` asserts
  the circle and the vertical label are gone, the illustration is present with
  its intrinsic dimensions and an empty `alt`, and — at progress 0, 0.48 and 1 —
  that every word's computed transform is a pure translation. That last check is
  the regression guard for the blur.
- `the home manifesto is a finished poster under reduced motion` asserts the
  section collapses to roughly one viewport and every element is visible.
- One existing assertion was corrected: the pinned rail spec compared
  `Math.round(rect.top)` with `0` using `toBe`, which fails on `-0`. A top of
  -0.4 px is exactly pinned, and the next line already tolerates a pixel, so the
  comparison is now `Math.abs(state.top) <= 1`. Nothing about the rail changed.

### Concurrent work by another session

While this session ran, another process rewrote the hero and the services
section in the same working tree: `HeroSection.astro`, `hero-section.css`,
`ServicesSection.astro`, `ServiceGlyph.astro`, `services-section.css`,
`src/data/services.ts`, and additions to `demo.spec.ts` and these two documents.
None of it was touched here.

That work is mid-flight and currently leaves four failing demo specs, all of
them in the services section: it no longer renders `DEMO FICTICIA — NO PUBLICAR`
inside `#servicios`, which three specs assert, and the asymmetry spec fails with
it. These failures reproduce with the manifesto work reverted and are not caused
by it. A future session must not "fix" them without talking to the owner of that
change.

### Follow-up the same day: sentence case and the bite CTA

- "Morder." and "Presionar." are now sentence case: `text-transform: uppercase`
  was dropped from `.manifesto-home__word`. The markup already carried the
  sentence-case text, so the accessible name is unchanged. The lead offset for
  "Presionar." is measured, so the narrower lowercase widths needed no retuning.
- "Abrir manifiesto" is now the hero's bite button (`.bite-button`, the same ink
  slab shadow as `.hero__cta`, `data-magnetic`), in sentence case like the hero
  label and without the old arrow. The timeline hook `data-manifesto-cta` moved
  to a wrapper `div`, because the magnetic module and the timeline both drive
  `transform` and would overwrite each other on one element. The keyboard
  reveal rule is now `:focus-within` on that wrapper.
- Checked at 1920x1080, 1366x768, 390x844 and 320x720: no overlap, overflow 0,
  console clean.

## 2026-09-10 Session: Sticky Header Removed

At the user's request the fixed header with the wordmark and the email and
Instagram quick links no longer exists on any route.

- Deleted `src/components/layout/SiteHeader.astro` and
  `src/scripts/motion/StickyHeader.ts`; unwired them from `BaseLayout.astro`,
  `MotionController.ts` and the `EdgeMenu.ts` inert list.
- Removed every `.site-header*` and `.wordmark*` rule from `layout.css` and
  `edge-menu.css`, and the unused `--z-header` token. `--header-height` stays
  because section top padding depends on it.
- Removed the header-only Playwright coverage in `foundations.spec.ts` (quick
  contact nav assertions, logo variant/ratio tests, header visibility test).
- Updated `MOTION_SPEC.md`, `QA_CHECKLIST.md`, `CLAUDE.md` and `DECISIONS.md`.
- Pre-existing uncommitted work from other sessions was preserved. No commit or
  push.

## 2026-09-10 Session: Services Section Simplified And Redesigned

At the user's request the home services block was rebuilt from an oversized,
decorated composition into a quiet editorial spread. Structure only takes its
hierarchy from `beans.agency`; no reference code, copy, asset or layout was
copied. Only the services section and its own files were touched.

### What changed

- `src/components/sections/ServicesSection.astro` — new markup: a
  `.services-section__lede` (eyebrow `02 / Colmillo / Servicios` plus
  `Nuestros servicios`), the `ol` of four entries, and the CTA as the last DOM
  child. Removed the ghost word, the sticky marker, the demo badge and the
  per-service number.
- `src/components/ui/ServiceGlyph.astro` — four new hand-drawn vignettes
  (`strategy`, `identity`, `digital`, `content`) in the hero loop's register:
  solid cream clothing and hair, an open outlined head, a ground line and one
  orange accent each. Still `aria-hidden` and `focusable="false"`.
- `src/data/services.ts` — glyph variants renamed to the new set; `number` and
  `demoNotice` dropped from `ServiceRecord`; descriptions shortened by roughly a
  line each. `demo: true` and the `Texto provisional de demostración.` opening
  are unchanged, so the section still emits `data-dev-placeholder` and stays out
  of `dist/`.
- `src/styles/services-section.css` — rewritten. Desktop is
  `minmax(0, 1fr) minmax(0, 2fr)` with `grid-template-rows: auto auto 1fr`, so
  the list spans every row and the CTA stays docked under the title instead of
  drifting to the middle. The list itself is an even 2x2. Below 64rem the
  heading stacks above the services, CTA last; below 48rem it is one column.
  All the ghost, marker, number and dim rules are gone.
- `src/scripts/motion/ServicesMotion.ts` — reduced to a per-entry reveal.
- `src/styles/layout.css` — `.services-section h2` no longer inherits the orange
  heading colour; only `.projects-section h2` does.
- `tests/e2e/demo.spec.ts` — the two services specs were rewritten for the new
  heading, the removed decoration, the `data-dev-placeholder` contract, the
  left/right split, the non-uniform indents and the no-dimming hover.

### Defects found and fixed during QA

- A single section-level ScrollTrigger on a block over 1200px tall never fired
  reliably and left all four entries at `opacity: 0`. Replaced with one trigger
  per entry, the pattern `EditorialMotion.ts` already uses.
- The first pass rendered one service per screen at 1920x1080. Section padding
  is now `clamp(4.5rem, 9vw, 8rem)`, the list gap `clamp(2.5rem, 4.5vw, 3.75rem)`
  and entries `42ch`, so roughly two and a half entries share a screen.
- The `identity` glyph read as a skull, then as a generic avatar. It is now the
  same character holding up a mask with a fang.
- At 200% text the `02` in the eyebrow broke across two lines. The eyebrow wraps,
  its spans do not.

### Verification performed this session

- `npm.cmd run check`: 0 errors, 0 warnings, 0 hints.
- `npx.cmd eslint src tests`: clean. `npx.cmd prettier --check` on every touched
  file: clean.
- `npm.cmd run build`: 9 pages. `check:production` passed (131,630 JS bytes, no
  demo content, placeholders or GIFs). `check:links`, `check:brand` and
  `check:hero` passed.
- `npm.cmd run build:demo`: 12 pages. `test:e2e:demo`: 42 passed, 18 skipped.
  `test:e2e`: 39 passed, 7 skipped.
- Rendered and inspected at 1920x1080, 1440x900, 1366x768, 834x1112, 390x844 and
  320x720: no horizontal overflow, no clipped text and no console errors at any
  size. Verified separately: hover raises the description from `0.72` to `1` and
  shifts the title 3.2px; reduced motion leaves all four entries at `opacity: 1`;
  200% text sizing produces no overflow; the CTA keeps a visible focus ring and
  points at `/proyectos/`.

### Not done

- No commit, push or deployment. The sticky-header removal from the concurrent
  session was present in the working tree during the final validation runs above
  and was preserved untouched.

## 2026-09-10 Session: Services Grid Corrected To An Even 2x2

Follow-up to the entry above, at the user's direction: the staircase was wrong.
Only layout, alignment, spacing and the left margin changed — no typography,
colour, copy, glyph, button or component was touched.

### What changed

- `src/styles/services-section.css` only, plus the layout assertions in
  `tests/e2e/demo.spec.ts`.
- Desktop (>64rem): `.services-section__list` is now
  `repeat(2, minmax(0, 1fr))` with `align-items: start`,
  `column-gap: clamp(2rem, 4vw, 4.5rem)` and
  `row-gap: clamp(3.5rem, 7vw, 6rem)`. Estrategia/Identidad share a top edge and
  Digital/Contenido share a top edge, both by grid row, not by hand.
- The alternating `--service-indent` rules and the custom property are deleted.
- `.services-section__inner` gained
  `padding-inline: clamp(1.5rem, 4.5vw, 5.5rem) clamp(0.5rem, 1.5vw, 2rem)` and
  `padding-block: clamp(5.5rem, 11vw, 10rem)` on desktop, so the heading block no
  longer sits against the page gutter. Entries capped at `32ch`.
- 48rem to 64rem keeps the 2x2 under a stacked heading (`34ch` entries); below
  48rem is unchanged from the previous session: one column, CTA last.
- The short-desktop rule now only tightens `row-gap` and `padding-block`, so it
  can no longer flatten the two columns.

### Defects found and fixed during QA

- The first tablet attempt put the 2x2 block before the shared `max-width: 64rem`
  block, whose `gap` shorthand then reset both axes and collapsed it back to one
  column. The tablet block now comes last and the shared block sets `row-gap`
  only.
- The tablet breakpoint was `min-width: 48.01rem`, so a 768px viewport fell
  through to one column. It is `min-width: 48rem`.
- The rewritten Playwright assertions indexed the measured boxes directly, which
  `tsconfig` strictest rejects under `noUncheckedIndexedAccess`. They destructure
  and guard instead.

### Verification performed this session

- `npm.cmd run check`: 0 errors, 0 warnings, 0 hints. `npx.cmd eslint src tests`:
  clean. `npx.cmd prettier --check` on every touched file: clean.
- `npm.cmd run build`: 9 pages. `check:production` passed (134,661 JS bytes, no
  demo content, placeholders or GIFs). `check:links` passed.
- Rendered and inspected the built demo at 1920x1080, 1440x900, 1366x768,
  1024x800, 834x1112, 768x1024, 767x1024, 390x844 and 320x720: the 2x2 reads
  immediately on desktop, the whole section fits one screen from 1366 up, and
  there is no horizontal overflow, clipped text or console error at any size.

## 2026-09-10 Session: Manifesto Fourth Phase ("Romper.")

Claude Code session, requested by the user. Only the home manifesto was touched:
`IntroSection.astro`, `manifesto-home.css`, `ManifestoMotion.ts`, the two
manifesto specs in `tests/e2e/demo.spec.ts`, and these docs. No commit, push or
deployment.

### What changed

- New black concept "Romper." after "Presionar." in `.manifesto-home__band`,
  same class and treatment. The `h2` still reads the concepts in order.
- Timeline, now 136 units: 00-15 Morder held, 15-30 Morder to band, 34-46
  Presionar rises, 50-66 Presionar lands beside Morder, 70-82 Romper rises,
  86-102 Romper lands beside Presionar, 106-120 Dejar marca, 124-136 figure
  and CTA. The Romper phase copies the Presionar phase unit for unit. Every
  pre-existing move keeps its duration, ease and offsets.
- Desktop track 420svh to 535svh, so scroll per unit is unchanged.
- Desktop rest size is nine tenths of the old size (`clamp(3.06rem, 5.58vw,
  5.58rem)`), gap `clamp(1.6rem, 4.2vw, 5.4rem)`. Protagonist scales went to
  1.88 and 1.6 so the oversized poses keep their old pixel size (Presionar
  128.56px at 1440 before and after). The lead offset sums every earlier
  sibling's natural width plus a gap.
- Below 64rem the words stack as a staircase: Romper indents 16% on mobile and
  30% on tablet, and gets its own once-only reveal.
- "Dejar marca.", the illustration, the CTA and the figure's offsets are
  untouched, apart from starting 36 units later.

### Verification

- `check` 0/0/0, `lint` clean, Prettier clean on touched files, `build` 9 pages,
  `check:production` passed (134,661 JS bytes), `build:demo` 12 pages. The
  manifesto is absent from `dist/`, as before.
- Forward and reverse sweeps in 1% steps against a static `dist-demo` at
  1440x1000 and 1920x1080: 0.00px disagreement at every progress point. Romper is
  never visible before Presionar has landed. Console clean.
- Final band at 1440: Morder 120-387, Presionar 448-774, Romper 835-1118 of a
  band ending at 1270. At 1920 Romper ends at 1278 of 1438. 1040x768, 1280x800
  and 1366x768 fit on one line. Overflow is 0 everywhere.
- 834x1112, 390x844, 320x720 and reduced motion at 1440/390 were rendered: all
  four words visible, Romper black, overflow 0.
- Demo manifesto specs pass, now with a Romper pose at 84/136.

### Failures not caused by this work

Another process was editing the tree during this session: new untracked
`InstagramBadge.*`, deleted `MotionControls.astro`, and edits to
`EdgeMenu.astro`, `index.css`, `motion.css`, `reduced-motion.css` and
`MotionPreference.ts`. With that work in the build:

- the standard suite fails 29 specs (edge menu, Instagram control, navigation,
  performance). `dist/` contains no manifesto markup, and `initManifestoMotion`
  returns immediately without its track;
- the demo spec `the open panel never hides behind its own close control` fails
  because `.hero__inner` intercepts the click on `[data-edge-trigger]`.

Leave those to the owner of that work.

### Follow-up the same day: header removed, "Dejar marca." and CTA raised

- At the user's request the manifesto no longer shows the `01` index, the
  `Colmillo / Studio` kicker or the rule under them. Their markup, styles and
  timeline tracks are gone, including the mobile reveal target.
- Desktop only: "Dejar marca." moved from 48% to 42% of the stage. The CTA is
  now anchored at 64% from the top instead of 8% from the bottom, so it sits
  about 125px under "Dejar marca." at 1440x1000 and 1920x1080, and 80px at
  1366x768. The timeline, the band and the illustration are unchanged. The CTA
  then moved from 6% to 12% so its left edge lines up with "Dejar marca.".
  Small screens keep their stacked flow, now without the header.

## 2026-09-10 Session: Edge Menu Second Iteration And Global Instagram Control

Claude Code session (`colmillo-studio-cd`), requested by the user. Only the edge
menu, its overlay, the close control, the new Instagram control and the minimum
stacking needed for them were touched. The hero composition, video, CTA,
Manifesto, Services, projects and footer were not modified; the hero files are
read, never written. File ownership was agreed with the concurrent session
(`colmillo-studio-67`) before editing.

### What changed

- `EdgeMenu.astro`, `EdgeMenu.ts`, `edge-menu.css` - evolved, not rebuilt. The
  `<details>` fallback, relocated panel, focus trap, `inert`, scroll lock and
  scene observer are unchanged in principle. Removed: the spine, the visible
  `MENÚ` label, the handle's `01/05` readout, the three-state `peek` model, "Ver
  archivo completo" and the motion toggle. Added: a carrier moved on Y by one
  `gsap.quickTo`, the orange tab, the thin ink close control with an orange
  grip, the auto-collapse timers and the Instagram exclusion zone.
- State machine: `closed | tracking | open | open-collapsed`, published as
  `data-state` (closed | tracking | open) plus `data-close` (expanded |
  collapsed).
- Backdrop: `rgb(10 9 8 / 34%)` + `blur(6px)` only while open. Panel padding
  `clamp(2.25rem, 6.5vh, 4.5rem)` top and bottom, larger gaps.
- `MotionPreference.ts` keeps mirroring `prefers-reduced-motion` onto
  `html[data-motion]` (every reduced-motion rule and module still works); the
  toggle handling is gone and the retired `colmillo-motion` key is cleared.
  Deleted `MotionControls.astro` and `.motion-toggle` (`.bite-button` untouched).
- New `InstagramBadge.astro` / `InstagramBadge.ts` / `instagram-badge.css`,
  registered in `BaseLayout.astro`, `MotionController.ts` and `index.css`;
  `--z-social: 85` in `tokens.css`. The href is `contactChannels.instagram`.
- `reduced-motion.css`: edge rules retargeted to the tab and close control;
  routes carry no transition under reduced motion.
- Docs: `MOTION_SPEC.md`, `DECISIONS.md` (seven entries), `CLAUDE.md` (three
  stale lines about the menu and the motion preference).

### Measured behaviour (Playwright, demo build)

| Viewport | Tab closed / tracking | Tab Y clamp | Badge hero box | Badge compact box |
| --- | --- | --- | --- | --- |
| 1920x1080 | 20 / 40 px | 84 px .. bottom-20 | 1580-1756 x 210-262 (x1.3) | 1724-1860 x 28-68 |
| 1440x900 | 20 / 40 px | 84 px .. bottom-20 | 1187-1363 x 125-177 (x1.3) | 1244-1380 x 28-68 |
| 1366x768 | 20 / 40 px | 84 px .. bottom-20 | 1121-1297 x 117-169 (x1.3) | 1170-1306 x 28-68 |
| 1024x1366 touch | 40 px static | - | 817-993 x 81-133 (x1.3) | 858-993 x 25-65 |
| 768x1024 touch | 40 px static | - | ring hidden: label fold only | 609-745 x 20-60 |
| 430x932 touch | 40 px static | - | label fold only | 283-414 x 16-52 |
| 390x844 touch | 40 px static | - | label fold only | 243-374 x 16-52 |

At every size: no overlap between badge and tab or between badge and loop, CTA,
hint or wordmark; zero horizontal overflow; zero console errors. Close control:
expanded on open, collapsed after the hold, re-expanded on approach and on
focus, re-collapsed 1.4 s after leaving; backdrop and Escape close; the badge is
hidden and inert while open and returns after. Keyboard: Tab reaches the tab,
Enter focuses Inicio, Shift+Tab wraps onto the close control and expands it,
Escape restores focus. Reduced motion: the tab never tracks and the badge
switches once at half the range. No JavaScript: the tab opens the full-screen
panel and the close control is shown. 320x720: no overflow.

### Defects found and fixed during QA

- `gsap.quickSetter(el, 'scale')` does not expand the shorthand; the hero scale
  never applied. Now `scaleX` and `scaleY`.
- The summary's centre sat 3 px off the visible tab, so a click at the element
  centre (Playwright, voice control) fell through to the page. The summary box
  is now the width of the closed sliver; the close sliver is 12 px.
- Without JavaScript the close control inherited a 420 ms `visibility` delay.
- Under reduced motion the routes still appeared one by one (inherited
  visibility through their stagger delay).

### Verification performed this session

- `npm run check`: 0 errors, 0 warnings, 0 hints. `eslint src tests`: clean.
  Repository-wide `npm run lint` passes except while the concurrent session's
  temporary root script `.shots-services.mjs` exists (6-11 `no-undef` errors
  for `window`, `document`, `console`, `process`); it is not part of this work.
  Prettier: every file touched by this session passes (the repository-wide
  line-ending mismatch is pre-existing and untouched).
- `npm run build`: 9 pages. `check:production`: passed, 134,552 JS bytes.
  `check:links`, `check:brand`, `check:hero`: passed. `build:demo`: 12 pages.
- Production suite: 41 passed, 9 intentional skips. One earlier run showed a
  single mobile `lcp > 0` miss in `performance.spec.ts` under three parallel
  workers; it passed 3/3 in isolation and in the final full run.
- Demo suite: 42 passed, 18 intentional skips, 3 failures in a spec that
  belongs to the concurrent session (below).

### Failures not caused by this work

`the route into the archive closes the project rail` (new, concurrent session,
`ProjectsHorizontal.astro` in progress) fails in all three demo projects: it
measures the CTA without scrolling to the rail (bottom 8,321 px against a
1,000 px viewport). The earlier note in the Manifesto section about 29 failing
standard specs referred to this session's work in progress; those are resolved.

### Known and accepted

- The site-wide custom cursor ring is orange, so over an orange-filled control
  (the hovered close control, the CTAs) it paints over part of the ink label.
  Pre-existing cursor behaviour, not changed here.
- `COLMILLO_BUILD_SPEC.md` still lists `MotionControls.astro` and an explicit
  motion toggle; the user's instruction supersedes it (recorded in DECISIONS).

### Next action

Nothing pending for the navigation or the Instagram control. Do not push `main`,
deploy or alter Vercel without explicit authorization.

## 2026-09-10 Session: Services Stripped Back, Archive Route Moved

Third pass on the services block, at the user's direction, plus the one change
it forced in the project rail.

### What changed

- `src/components/sections/ServicesSection.astro` — removed the
  `02 / Colmillo / Servicios` eyebrow, the orange accent line under each title
  and the `Ver proyectos` button.
- `src/data/services.ts` — `shortDescription` removed from `ServiceRecord` and
  from all four demonstration entries; nothing rendered it any more.
  `docs/CONTENT_NEEDED.md` updated so the client is not asked for a second line.
- `src/styles/services-section.css` — service titles are
  `--color-brand-orange`; `.service-entry__short`, the eyebrow rules and the CTA
  rule deleted. Desktop padding `clamp(7rem, 14vw, 13rem)`, list row gap
  `clamp(5rem, 10vw, 9rem)`, list `padding-block-start: clamp(3.5rem, 7vw, 7rem)`.
  The `(max-height: 58rem)` branch was raised to match, since that is what a
  1440x900 or 1366x768 laptop actually uses.
- `src/components/sections/ProjectsHorizontal.astro` — new
  `.projects-section__outro` holding the `Ver proyectos` bite button, last child
  of `#proyectos`.
- `src/styles/layout.css` — outro and CTA rules; the enhanced rail grid is now
  `auto minmax(0, 1fr) auto`; the enhanced track drops its `--section-space`
  bottom padding; a short-desktop branch trims the button's own padding.
- `tests/e2e/demo.spec.ts` — services spec asserts the removed furniture and the
  orange title colour; two new specs cover the moved route and the card copy
  clearance under the pin.

### Defects found and fixed during QA

- The first version of the moved-CTA spec read the button's rect without
  scrolling to `#proyectos`, so it measured a position thousands of pixels below
  the fold and failed in all three demo projects. Reported by the concurrent
  session; both project specs now walk down until the section top reaches the
  viewport top, which is where the rail pins.
- Adding the CTA row to the pinned grid clipped the project card summary at
  1366x768 (2px over) and left zero clearance at 1280x720. Fixed by dropping the
  enhanced track's dead `--section-space` bottom padding; clearance is now
  72-108px from 1280x720 through 1920x1080, better than before the CTA existed.
- The services padding and gap increases initially had no visible effect at
  1440x900 or 1366x768: both viewports are under `max-height: 58rem`, so the
  short-screen branch was overriding them.

### Verification performed this session

- `npm.cmd run check`: 0 errors, 0 warnings, 0 hints. `npm.cmd run lint`
  (repo-wide `eslint .`): clean. `npx.cmd prettier --check` on every touched
  file: clean.
- `npm.cmd run build`: 9 pages. `check:production` passed (133,915 JS bytes, no
  demo content, placeholders or GIFs). `check:links`, `check:brand` and
  `check:hero` passed.
- `npm.cmd run build:demo`: 12 pages. `test:e2e:demo`: 45 passed, 18 skipped.
  `npm.cmd run test:e2e`: 41 passed, 9 skipped. Both suites include the
  concurrent session's edge-menu v2 and Instagram control work.
- Rendered and inspected the built demo at 1920x1080, 1440x900, 1366x768,
  1280x720, 1024x800, 834x1112, 390x844 and 320x720. No horizontal overflow, no
  clipped text and no console error at any size. Measured on each: the closing
  route stays inside the viewport for the whole pin wherever the rail is
  enhanced, and below the rail in normal flow where it is not.

## 2026-09-10 Session: Section seams removed site-wide

User request: remove the separator line between the hero and the manifesto,
then every other section separator. See `docs/DECISIONS.md` ("Sections Meet
Without A Drawn Seam").

- `src/styles/layout.css` — `.stack-section` drops its 2px `currentColor`
  top rule and lift `box-shadow`; the shared centre notch
  (`.stack-section::after, .manifesto-statement::after`) and the desktop bite
  tab (`.stack-section::before`, under `min-width: 64.01rem`) are deleted. The
  tab was clipped by the section's `overflow: clip`, so only its two side
  walls survived as short ticks hanging from the rule. `.manifesto-statement`
  and `.site-footer` drop their top rule.
- Kept: rounded top corners, the `-2rem` desktop overlap and the
  `SectionStack.ts` clip-path reveal.
- `src/styles/manifesto-home.css` — carries no seam override (an interim
  manifesto-only override from the same session was removed as redundant).
- Verified on the dev server: home at 1440x1000 (full and reduced motion) and
  390x844, every boundary (hero/manifesto, manifesto/servicios,
  proyectos/studio, studio/goodbye, goodbye/contacto, contacto/footer) and
  `/manifiesto/` statements. No rule, notch, ticks or console errors. Prettier
  clean on both touched stylesheets.
- `src/scripts/motion/EdgeMenu.ts` — the reported home scene now breaks
  ratio ties in favour of the later section. Found because the demo spec
  "the edge rail reports the current home scene" failed deterministically
  after the seam removal (read `03`, expected `05`): with `#contacto` centred,
  the sticky `#studio` sits fully under it with the identical 0.1 ratio in the
  centre band, and the first-registered entry won. The 2px border had only
  been masking this by changing registration order (verified: the old CSS
  passed 3/3, the new CSS failed 5/5 before the fix, 5/5 passed after).
- Final validation: `build:demo` (12 pages) and `test:e2e:demo` 45 passed,
  18 skipped; `build` (9 pages), `check:production` passed (133,948 JS bytes),
  `test:e2e` 41 passed, 9 skipped; `check` 0 errors/warnings/hints; `lint`
  clean; Prettier clean on every touched file.

## 2026-09-10 Session: Services Illustration

Fourth and final pass on the services block, at the user's direction: add the
supplied illustration to the heading column. Nothing else in the section
changed — no copy, colour, glyph, typeface or button.

### What changed

- `media-src/servicios.png` — the client's original 1536x1024 file, moved out of
  `public/` so it is preserved but not published.
- `public/assets/servicios-trimmed.png` — 1202x696, the drawn ink with the
  transparent margin cropped off, 259 KB against the original's 284 KB.
- `scripts/trim-transparent-png.mjs` — new. Crops the fully transparent margin
  from an 8-bit RGBA PNG with adaptive per-row filtering, leaving the source
  untouched. Zero dependencies; it decodes and re-encodes with `node:zlib`.
- `src/config/assets.ts` — `servicesIllustration` with intrinsic dimensions and
  the palette/alpha notes.
- `src/components/sections/ServicesSection.astro` — decorative `<img>` under the
  heading, `alt=""`, `loading="lazy"`.
- `src/styles/services-section.css` — `.services-section__illustration`; the
  desktop split becomes `minmax(0, 0.62fr) minmax(0, 1fr)` and the list becomes
  `align-self: center` with no top padding.
- `tests/e2e/demo.spec.ts` — the illustration must decode and stay decorative;
  the 2x2 spec now also asserts the art is over 360px wide and that the first
  service row starts above it.

### Defects found and fixed during QA

- The 2x2 layout spec written in the previous session was absent from both the
  working tree and `HEAD`: it was lost when the concurrent session rewrote the
  demo suite for the rebuilt project rail. Restored, and extended for the art.
- The first crop re-encoded larger than the original (292 KB) because it used a
  single filter type. Adaptive per-row filtering brought it to 259 KB.
- `grid-template-columns: minmax(0, 0.52fr) minmax(0, 1fr)` is 34.2% — barely
  different from the `1fr 2fr` it replaced, so the services moved only 10px.
  `0.62fr` is the value that actually shifts them.

### Environment note

The machine ran out of memory during this session: free physical memory reached
0.34 GB and free virtual 0.02 GB, with Canva (1.8 GB across 12 processes) and
Chrome (1.7 GB across 29) the largest consumers. `astro build` failed twice with
a Rust allocator error and the Playwright suites failed wholesale with V8 OOM
and worker crashes. Nothing was wrong with the code: `--workers=1` runs clean.
If the suites fail with `worker process exited unexpectedly` or
`Zone Allocation failed`, check free memory before debugging the tests.

### Verification performed this session

- `npm.cmd run check`: 0 errors, 0 warnings, 0 hints. `npm.cmd run lint`
  (repo-wide): clean. `npx.cmd prettier --check` on every touched file: clean.
- `npm.cmd run build`: 9 pages. `check:production` passed (23 files, 132,644 JS
  bytes). `check:links` and `check:assets` passed.
- `npm.cmd run build:demo`: 14 pages. Demo suite `--workers=1`: 48 passed, 21
  skipped. Production suite: 41 passed, 9 skipped.
- Rendered and measured the built demo at 1920x1080, 1440x900, 1366x768,
  834x1112, 390x844 and 320x720. Drawn art width 470 / 428 / 405 / 480 / 358 /
  288 px; the 2x2 holds two columns and two aligned rows from 768 up and becomes
  one column below it; section height 930 / 745 / 683 px stays inside the
  viewport on every desktop size; no horizontal overflow and no console errors
  anywhere.

## 2026-09-10 Session: Home Project Rail Rebuilt Images-First

Claude Code session at the user's request. Only the home `#proyectos` section
and what it directly needs (tile component, project data/order, page queries,
motion module, styles, tests, docs) were touched. Hero, Manifesto, Services,
the edge menu, the Instagram control, the cursor and every other section were
not modified. See `docs/DECISIONS.md` ("The Project Rail Is Images First, On
Cream").

Reference studied live on https://thatlot.co.uk/ at 1920x911: upright pieces
of 320x560 with about 175 px of air above and below, 48 px gaps, 16 px radius,
the title in an overlay that appears on hover and a "View all" at the end of
the rail. Only proportions, rhythm and behaviour were taken; no asset, copy,
code or exact layout.

### What changed

- `src/components/projects/ProjectTile.astro` (new): the whole tile is one
  link to `/proyectos/<slug>/`; image, then a cream cut-out carrying an `h3`
  title and an orange arrow. The cover is `decorative` inside the link.
- `src/components/sections/ProjectsHorizontal.astro`: cream section, compact
  header (`Proyectos` + subtitle whose instruction follows the gesture:
  "Baja" pinned, "Desliza" native), a moving track holding the `<ol>` of tiles
  and, after it, the `Ver proyectos` outro. Counter, arrows, meter, section
  index and the old under-rail CTA removed.
- `src/scripts/motion/HorizontalProjects.ts`: pin + scrub kept; travel is
  `track.scrollWidth - viewport.clientWidth`, re-measured on refresh. Progress,
  prev/next and active-card code removed. Focus inside the rail scrolls the
  page to the pin position where the focused tile or CTA is fully visible.
- `src/styles/projects-section.css` (new, `sections` layer) holds the whole
  rail; the old rail rules were deleted from `layout.css`, which gains the
  `bite` and `layers` placeholder compositions. `reduced-motion.css` loses the
  obsolete card overrides.
- `src/data/projects.ts`: two more fictional demo projects,
  `HOME_PROJECT_LIMIT = 5`, `sortProjectEntries()`. `content.config.ts` gains
  an optional integer `order`. Home, archive and `[slug]` use the same order.
- `ProjectMedia.astro`: optional `decorative` prop.
- `tests/e2e/demo.spec.ts`: five projects; new specs for hover reveal and
  click-through, touch titles without hover, the closing route at the end of
  the rail, and no tile cut off across the pin; shared `scrollRailToTop` and
  `projectPin` helpers (the pin is located with `.pin-spacer:has(#proyectos)`).

### Measured (demo build)

| Viewport | Mode | Tile 4:5 / 3:4 (px) | CTA x at rail end |
| --- | --- | --- | --- |
| 1920x1080 | pinned | 561x702 / 453x603 | 1522-1746 |
| 1440x900 | pinned | 463x578 / 373x497 | 1085-1290 |
| 1280x720 | pinned | 361x452 / 291x389 | 953-1155 |
| 1440x900 reduced | native | 389x486 / 313x418 | 1098-1303 |
| 834x1112 touch | pinned | 534x667 / 430x574 | 546-748 |
| 390x844 touch | native snap | 281x351 (uniform) | 117-319 |
| 320x720 touch | native snap | 230x288 (uniform) | 47-249 |

No horizontal overflow and no console errors in any of the seven cases. The
pin spec asserts every tile's bottom stays at least 24 px above the viewport
bottom at five points of the pin (1440x1000); in Chrome at 1920x911 the tiles
measured 571 px tall with their bottom at 829 at every pin position.

### Defects found and fixed during QA

- The title started flush with the image edge and touched the rounded corner;
  the cut-out now has a 0.35 rem inline start.
- On phones the closing route snapped under the edge-menu tab: the outro's
  `scroll-snap-align: end` aligned to the plain gutter. `scroll-padding-inline`
  now carries the same end clearance as the track.
- The subtitle floated at the arbitrary right edge of the 90 rem shell; it now
  sits next to the heading.

### Verification performed this session

- `npm.cmd run check` (with `NODE_OPTIONS=--max-old-space-size=6144`; the
  default heap ran out of memory once on this machine): 73 files, 0 errors,
  0 warnings, 0 hints. `eslint src tests`: clean. Prettier clean on every
  touched file (`--end-of-line auto`).
- To avoid rebuilding the shared `dist/` and `dist-demo/` under the concurrent
  session, both artifacts were built into the session scratchpad and tested
  there with temporary Playwright configs (deleted afterwards).
  - Standard build: 9 pages. `check:links` passed; `check:production` (run on
    the scratch output through a patched copy of the script) passed with
    132,644 JS bytes, no demo content, placeholders or GIFs.
  - Demo build: 14 pages. Demo suite: 48 passed, 21 intentional skips.
  - Production suite: 40 passed, 9 skipped, 1 failed:
    `the edge menu closes from the rail and from outside the panel`
    (mobile-chromium; the panel content intercepted the scrim click). It
    passed 3/3 in isolation and the standard build renders no project
    section, so it is load-related flakiness in the edge-menu spec, not this
    change.
- `scripts/serve-dist.mjs` shuts itself down after 10 s without requests; a
  single-worker run of the long pin specs let it die mid-run and produced
  connection-refused failures that are not real. With a steady server the
  pin specs passed 12/12 (three repeats each).
- Rendered and inspected 1920x1080, 1440x900, 1280x720, 1440x900 reduced
  motion, 834x1112 touch, 390x844 and 320x720 (start and end of the rail) plus
  the hover state in Chrome.

### Concurrent work by another session - not touched

`src/components/sections/ServicesSection.astro`, `src/styles/services-section.css`,
`src/config/assets.ts`, `scripts/trim-transparent-png.mjs`,
`public/assets/servicios*.png` and `media-src/` changed during this session
and belong to another session. They are included in any local build.

### Next action

Replace the demo projects with approved entries in `src/content/projects/`
(cover, title, slug, `order`, `draft: false`) and enable
`contentAvailability.projects`; the home rail picks up the first five. Nothing
was committed, pushed or deployed.

## 2026-09-10 Session: Services Section Full-Screen Layout

Layout-only pass on "Nuestros servicios", at the user's request. No copy,
colour, glyph, image, type or behaviour changed; only the desktop
(`min-width: 64.01rem`) rules in `src/styles/services-section.css` moved.
Tablet and mobile render exactly as before (measured at 1024, 834 and 390).

### What changed

- The section and its inner are `min-block-size: 100svh` on desktop (it was
  62svh from `layout.css`). Minimum, not fixed: a low window grows the section.
- Top padding is `clamp(4.5rem, 11svh, 8rem)`; the old short-screen
  `padding-block` override was removed so one rule covers every height.
- The grid is `minmax(40%, 1fr) auto`: the right column is exactly the 2x2's
  own width (entries keep their 32ch measure and the original gaps), the left
  column takes the rest and sizes the illustration, capped at 44rem.
- `align-items: end` on the row plus a stretched lede (`space-between`) puts
  the foot of the illustration and the foot of the DIGITAL/CONTENIDO row on
  one line. `align-content: start` keeps the row at its natural height so
  the art sits directly under the title and the spare height is left below.
- On fine pointers only, the 2x2 overhangs the shell's right edge by
  `clamp(1.5rem, 3vw, 3rem)` plus half of any air the capped 90rem shell
  leaves on very wide screens (`--services-overhang`). It stays 76px clear of
  the viewport edge at 1366 and 1440. Touch keeps zero overhang because its
  shell is right-aligned against the fully visible edge tab.

### Measured (before -> after)

| Viewport | Section height | Title top | Image width | Image/grid bottom | Grid x |
| --- | --- | --- | --- | --- | --- |
| 1920x1080 | 930 -> 1080 | 208 -> 119 | 470 -> 704 (1.50x) | 642/722 -> 688/688 | 709 -> 956 |
| 1440x900 | 745 -> 900 | 135 -> 99 | 428 -> 596 (1.39x) | 545/610 -> 606/606 | 608 -> 754 |
| 1366x768 | 683 -> 768 | 115 -> 84 | 405 -> 533 (1.32x) | 509/568 -> 553/553 | 576 -> 683 |

No horizontal overflow at any measured width (1920, 1440, 1366, 1280, 1100,
1024, 834, 390), reduced and full motion, and no console errors.

### Follow-up: fill the screen, air under the title

The user reported the block still did not fill their screen and asked for the
illustration and services to sit lower, with a margin under the title.

- `align-content: start` was removed, so the single row stretches to the
  full `100svh`: the title holds the top, the illustration and the 2x2 hold
  the foot, and the spare height is the margin between them.
- Foot padding is `clamp(4.5rem, 16svh, 12rem)` (head stays
  `clamp(4.5rem, 11svh, 8rem)`).
- The illustration keeps a minimum `margin-block-start: clamp(2.5rem, 6svh,
  4.5rem)` and is also capped at `77.7svh` of width (~45% of the screen's
  height at its ratio), so short laptop screens keep air under the title.

| Viewport | Title | Illustration (w) | Grid | Title -> art gap | Air below |
| --- | --- | --- | --- | --- | --- |
| 1920x1080 | 119-240 | 500-907 (704) | 394-907 | 260 | 173 |
| 1920x953 | 105-226 | 393-801 (704) | 287-801 | 167 | 152 |
| 1536x730 | 80-202 | 285-613 (567) | 139-613 | 83 | 117 |
| 1440x900 | 99-221 | 411-756 (596) | 281-756 | 190 | 144 |
| 1366x768 | 84-204 | 336-645 (533) | 193-645 | 132 | 123 |

The section equals the viewport height at every one of these sizes. Demo
rebuilt in the scratchpad; the services specs passed again (4 passed, 2
intentional skips). Prettier clean.

### Verification

- Rendered and inspected 1920x1080, 1440x900 and 1366x768 in the dev server.
- Demo built into the session scratchpad (shared `dist-demo/` untouched); the
  two services specs in `demo.spec.ts` passed on fine-1440, touch-834 and
  touch-390 (4 passed, 2 intentional desktop-only skips).
- Prettier clean on `services-section.css`.

### Next action

Nothing was committed, pushed or deployed. If the user approves the layout,
commit `src/styles/services-section.css` and this file together.

## 2026-09-10 Session: Home Studio Rebuilt Around The Character Loop

Claude Code session at the user's request. Only the home `#studio` section and
what it strictly needs were touched. Hero, Manifesto, Services, Projects, the
edge menu, the Instagram control and the footer were not modified. Structure
takes its hierarchy from beans.agency (big text left, big visual right, air);
no code, copy, asset, colour, typeface or motion was copied. See
`docs/DECISIONS.md` (three entries dated 2026-09-10: the cream spread, the
normalised loop, stack triggers in page order).

### What changed

- `src/components/sections/StudioSection.astro` rewritten: `03 Colmillo /
  Studio` label, headline from `homeStudio`, one lede, the shared bite button
  `Abrir Studio` -> `/studio/`, and the decorative loop (`muted loop
  playsinline preload="none"`, `aria-hidden`, poster). Orange surface, split
  `COLMILLO / STUDIO` title, the `Presion / Materia / Movimiento` seal, the
  underlined `.section-route` and the visible dev note are gone.
- `src/data/studio.ts` (new): `approvedStudio` (null), the flagged demo copy
  "Tensamos / cada idea / hasta que / muerde." plus one lede, and a structural
  fallback. Demo copy sets `data-dev-placeholder`; the section stays gated out
  of `dist/` by `contentAvailability.studio` (verified: 0 Studio markers).
- `src/styles/studio-section.css` (new, `sections` layer) and its import in
  `index.css`. Two columns `0.7fr / 1.3fr` from 64rem or 56rem landscape; the
  loop runs past the content measure to the right gutter, clear of the edge
  rail. Portrait tablet stacks text then loop; phones stack headline, lede,
  loop, CTA. Edge feather mask inside the paper the ink never reaches.
- `src/scripts/motion/StudioMotion.ts` (new) and its registration in
  `MotionController.ts`: plays the loop only near the viewport and in a
  visible tab, starts the first pass on the poster frame, one once-only entry
  timeline (no pin, scrub, blur or scale). Reduced motion: no playback.
- `MotionController.ts`: `ScrollTrigger.sort()` before refresh on mount and
  restart. Pre-existing bug: every stack layer after the pinned rail measured
  its compression one pin length early, so Studio (and Goodbye/Contacto) sat
  at `opacity: 0.84` while still entering. Now `1` until the next layer comes.
- `src/config/assets.ts`: `studioMedia` (`LoopMedia`, 1280x512,
  `posterTime: 8 / 24`).
- `scripts/prepare-studio-media.mjs` (new, `npm run media:studio`): crop,
  paper normalisation onto the cream, 8-frame rise/sink at the ends, no audio.
  Outputs `public/assets/motion/studio/studio-loop.webm` (551,497 B),
  `studio-loop.mp4` (499,878 B), `studio-poster.webp` (93,324 B). The master
  `public/assets/video estudio.mp4` is byte-identical (hash checked).
- Dead code removed: `.studio-section__grid/__seal/__title` and every
  `.section-route` rule in `layout.css`; `[data-deformable]` in `motion.css`
  and in the cursor's target selector (`CustomCursor.ts`), which nothing else
  used. `.stack-section--orange` kept as a generic modifier.
- `tests/e2e/demo.spec.ts`: two Studio specs (composition, retired furniture,
  CTA, loop attributes, geometry per project, no premature compression,
  playback; reduced-motion poster) and, at the intro session's request, a
  top-level `beforeEach` that opts out of the home intro via
  `homeIntro.storageKey`.
- Docs: `DECISIONS.md`, `MOTION_SPEC.md` (new Studio section),
  `CONTENT_NEEDED.md` (Studio copy, loop-treatment and master-placement
  questions).

### Measured

Master: H.264 High 1280x720, 24 fps, 6.000 s, 144 frames, 1.85 Mb/s, AAC
stereo, 1,495,208 B. Paper mode RGB 250/236/216 (BT.709), +-2 noise; ink rows
169-583, columns 107-1225. No scene cut; last vs first frame SSIM 0.77 against
0.997 for neighbours, so it does not loop by itself. Derivative: ink margins
9.8/9.4/8.3/4.2% (top/bottom/left/right), outside every feather; wrap is paper
to paper; poster equals frame 8 (SSIM 0.994) and its paper is exactly
252/238/218. In Chrome the playing paper renders 252/238/219 over a
252/238/218 page. MP4 fallback plays and loops in real Chrome.

| Viewport | Title box | Loop box | Section |
| --- | --- | --- | --- |
| 1920x1080 | 56,243 569x325 | 753,323 1087x435 | 1080 |
| 1440x900 | 43,207 427x244 | 565,288 808x323 | 900 |
| 1366x768 | 41,159 369x211 | 535,231 766x306 | 768 |
| 1024x768 land. | 32,185 296x173 | 390,272 551x220 | 768 |
| 834x1112 | 25,247 274x156 | 25,633 732x293 | 1112 |
| 390x844 | 17,142 273x156 | 17,405 357x143 | 741 |

Overflow 0 and console clean everywhere, including reduced motion (1440, 390),
320x720 and 200% text (1440, 390). Keyboard: one Tab from the rail's `Ver
proyectos` lands on `Abrir Studio`, in view, topmost, `:focus-visible`.

### Verification

- `astro check`: 83 files, 0 errors, 0 warnings, 0 hints. ESLint clean and
  Prettier clean (`--end-of-line auto`) on every touched file.
- Both artifacts built into the session scratchpad (shared `dist/` and
  `dist-demo/` untouched, concurrent sessions active): standard 9 pages,
  `check:production` passed (28 files, 138,760 JS bytes incl. the concurrent
  intro), `check:links` passed; demo 14 pages.
- Demo suite: 54 passed, 21 intentional skips. Production suite: 56 passed,
  10 skips (includes the concurrent intro specs).

### Open items for the user

- Approved Studio headline and lede (placeholder in `src/data/studio.ts`).
- Confirmation of the loop treatment (rise/sink to paper instead of the hard
  jump), the crop and the paper lift. All in `docs/CONTENT_NEEDED.md`.
- `public/assets/video estudio.mp4` (1.5 MB) and `public/assets/frame
  video.png` (1 MB) are published in `dist/` unreferenced; `media-src/` is the
  recommended home (then run `media:studio` with `STUDIO_SOURCE`). Not moved,
  per the brief.
- ffmpeg is not vendored; this session used a build left in an earlier
  session's scratchpad via `FFMPEG_PATH`.

Nothing was committed, pushed or deployed.

## 2026-09-10 Session: Home Entry Intro (COLMILLO Loader)

Run concurrently with the Studio session above, in the same working tree.
Ownership was coordinated between the two sessions; neither reverted the
other's edits.

### Completed

- Home-only entry intro: COLMILLO is set letter by letter, the final O's
  counter opens onto the already-rendered home and the O grows (translating and
  scaling at once) until its counter contains the viewport. ~2.3 s at
  1440x900. Full behaviour in `docs/MOTION_SPEC.md` ("Home Entry Intro");
  choices in `docs/DECISIONS.md` (2026-09-10, "Home Entry Intro: A Verified
  Trace, And Ink On Cream").
- Letters are a verified trace of the official black PNG
  (`scripts/trace-wordmark.mjs` -> generated
  `src/components/intro/wordmarkGlyphs.ts`): 0.33 px worst deviation from the
  50% alpha iso-line, no pixel flips inside/out. Replace with the vector master
  when it arrives (CONTENT_NEEDED, Brand).
- Theme: ink letters on cream. The brief preferred cream on ink; filmed side by
  side, a cream O over the cream home read as a filled disc and lost the hole.
  `theme: 'ink'` in `src/config/intro.ts` restores it.
- Once per tab session (`repeat: 'session'`, sessionStorage
  `colmilloIntroPlayed`); `repeat: 'always'` replays it on every full load.
  Deep links (`#...`) and back/forward never play it. At the user's request
  ("al recargar inicio sí que muestre el loader") a reload of the home plays
  it again (`replayOnReload: true`) and opens onto the hero even when reloaded
  mid-page: Chrome restores the old position despite `scrollRestoration =
  'manual'`, so `HomeIntro.ts` pins the page to the top while it is covered;
  restoration is handed back (`'auto'`) at the end. Returning to the home
  through a link still does not replay it.
- Reduced motion: still wordmark 0.35 s, 0.3 s fade, no expansion. No
  JavaScript: no overlay. Failsafes: 4 s head timer, 9 s module guard, 7 s CSS.
- Hero loop held on its first frame while covered and released by
  `colmillo:introreveal`; hero settles from 1.02 around `50% 20%` (centred, it
  pushed the corner wordmark off a phone's top edge).

### Files

- New: `src/config/intro.ts`, `src/components/intro/HomeIntro.astro`,
  `src/components/intro/HomeIntroBoot.astro`,
  `src/components/intro/wordmarkGlyphs.ts` (generated),
  `src/scripts/motion/HomeIntro.ts`, `src/styles/home-intro.css`,
  `scripts/trace-wordmark.mjs`, `tests/e2e/intro.spec.ts`.
- Edited: `BaseLayout.astro` (`head` and `overlay` slots), `index.astro`
  (mounts the intro), `MotionController.ts` (`initHomeIntro` once per document;
  the Studio session's `ScrollTrigger.sort()` lines are theirs and must stay),
  `HeroMotion.ts` (hold/release), `tokens.css` (`--z-intro: 200`, under the
  skip link), `index.css` (import), `foundations.spec.ts` (intro opt-out).
  `demo.spec.ts` received the same opt-out from the Studio session.

### Validation (actually run)

- `eslint` on every touched file: 0 problems. `astro check`: 0 errors.
  Prettier: clean on every intro file.
- Frame-by-frame films with a paused Playwright clock at 1440x900, 834x1112,
  390x844, 2560x1080 and 320x720: coverage complete, no cut letters, no
  console errors; the overlay closes, scroll unlocks, the hero plays, no
  transform is left behind.
- Isolated build (outside `dist/`): intro + foundations + performance specs on
  Desktop Chrome and Pixel 7, 55 passed then intro spec 15/15 after fixing a
  settle race in the test itself. The Studio session later reported the
  production suite at 56 passed / 10 skipped and the demo suite at 54 / 21,
  both including the intro.
- Bundle: one 138,672 B script (budget 150,000 B largest / 220,000 B total);
  about 11 KB of headroom remains on the largest-asset budget. The overlay is
  only in `index.html`; no demo markers. `check:brand` passes.
- Not run against `dist/` by this session: `check:production`,
  `check:links` (both read `dist/`, which was left to the parallel session).
  Run them before any release.

### Next

- User review of the theme decision (comparison frames were sent in-session).
- Replace the traced glyphs once the vector master arrives.

Nothing was committed, pushed or deployed.

## 2026-09-10 Follow-up: Studio Label Removed, Inset, Two-Line Headline

User adjustments to the Studio section above. Only Studio files, its demo spec
and docs were touched. See `docs/DECISIONS.md` ("Studio: No Label, More Inset,
Two-Line Headline").

- `03 Colmillo / Studio` removed from `StudioSection.astro`,
  `studio-section.css` and the `StudioMotion.ts` timeline.
- Two-column text inset `--page-gutter + clamp(1.5rem, 4.5vw, 5.5rem)`, aligned
  with the services heading; stacked tablets gain `clamp(1rem, 4vw, 2.5rem)`;
  phones keep the site gutter.
- Headline in two lines: `StudioTitleLine.accent` is now the closing words
  (string) set in orange; demo copy "Tensamos cada idea / hasta que muerde.".
  Columns `0.95fr / 1.05fr`; loop 626px at 1440 (was 808), 841px at 1920.
- Measured: two lines, zero overflow, clean console at 1920x1080, 1680x1050,
  1440x900, 1366x768, 1280x720, 1024x768, 1024x1366, 834x1112, 768x1024,
  390x844 and 320x720; 200% text at 1440 and 390 without overflow.
- Spec: asserts no label, at most two lines, text inset > 80px, loop wider
  than the text and than 40% of the viewport.
- `astro check` 0/0/0, ESLint and Prettier clean; scratch demo build 14 pages,
  demo suite 54 passed / 21 skipped.

Nothing was committed, pushed or deployed.

## 2026-09-10 Follow-up: Larger Manifesto Illustration

User request: make the manifesto illustration clearly larger, growing down and
to the right into the empty lower-right corner, without moving its top edge,
the texts, the CTA or the scroll animation. Only `src/styles/manifesto-home.css`
(desktop figure rules), one assertion in `tests/e2e/demo.spec.ts` and this log
were touched. `ManifestoMotion.ts` is unchanged.

- The figure is now anchored by its top-left corner instead of `right: -6%`:
  tall desktops `inset-inline-start: 55.5%`, width `max(59%, 48vw)` (the `vw`
  term keeps wide screens filling the corner once the canvas is capped); short
  desktops (<= 50rem tall) `57%` / `57%`. `inset-block-start` stays 37% / 35%.
- Drawn-ink width before -> after: 1920x1080 429 -> 597 px, 1440x900 381 -> 489,
  1366x768 329 -> 446, 1280x800 307 -> 416, 1040x768 245 -> 333. The ink top
  moves 13-20 px down (more air under "Romper."). Final air: ink to "Dejar
  marca." 95-116 px (78 at 1040), ink to viewport right 53-62 px (289 at 1920),
  ink bottom 143-272 px above the stage floor. Overflow 0, console clean.
- A 21-step scroll sweep at 1920x1080, 1440x900 and 1366x768 found no ink past
  the stage at any progress. The oversized "Romper." rising at centre crosses
  the drawing's top as it did before (slightly less than before).
- The spec compared "Dejar marca." with the figure box, which includes the
  PNG's transparent margin; it now requires 48 px between the text and the
  drawn ink (310/1600 into the image). Demo manifesto specs: 5 passed, 4
  skipped. ESLint clean; Prettier clean on both touched source files.
- The white light surfaces in the verification captures come from the
  concurrent `tokens.css` change, not from this work.

Nothing was committed, pushed or deployed.

## 2026-09-10 Follow-up: Services Full Screen, Wider Art-to-Services Gap

User request: the home services section fills the screen height and leaves
more room between the illustration and the services, shrinking the art if
needed. Only `src/styles/services-section.css`, its demo spec and this file
were touched.

- `min-block-size: 100svh` on the section and its shell now applies at every
  width (sections layer, so it outranks the 62svh floor and the mobile `auto`
  reset in `layout.css`). Still a floor, not a fixed height, so 200% text and
  short windows grow the section instead of clipping it.
- Desktop: column gap `clamp(2.5rem, 3.5vw, 4.5rem)` ->
  `clamp(4.5rem, 8vw, 9rem)`; illustration cap `min(44rem, 77.7svh)` ->
  `min(40rem, 69svh)`.
- Tablet/mobile (<=64rem): shell gap `clamp(2.5rem, 8vw, 4rem)` ->
  `clamp(3.5rem, 10vw, 6rem)`, `align-content: space-between` (extra height
  lands between the art and the services), illustration capped at 26rem.
- Measured (section height / art width / art-to-services gap): 1440x1000
  1000 / 531 / 115 (was 596 / 50); 1366x768 768 / 472 / 109 (was 533 / 48);
  1280x720 720 / 428 / 102 (was 460 / 45); 1536x695 695 / 480 / 221;
  1920x1080 1080 / 640 / 173. Tablet 834x1112 now 1112 (was 1038). Phones
  are taller than one screen by content (390x844 1298). No horizontal
  overflow at any size including 1024x640 and 320x720.
- Spec: the desktop services test also asserts section height >= viewport
  and an art-to-2x2 gap >= 80px.
- `astro check` 0/0/0, ESLint and Prettier clean. Demo suite 53 passed / 21
  skipped / 1 failed: `[touch-390] the studio spread pairs an editorial
  headline with the loop` read `shellOpacity` 0.9487 vs a 0.95 floor under
  six parallel workers; it passed 5/5 run alone. Timing-sensitive assertion
  in the Studio spec, not a services regression. `dist/` was not rebuilt.

Nothing was committed, pushed or deployed.

## 2026-09-10 Session: Light Surfaces Move From Cream To White

Client direction relayed by the user: every light/cream background becomes pure
white `#ffffff`; the intentionally dark sections stay as designed; the hero's
large ring and its scroll dot turn orange `#cd5730`. No layout, type, copy,
size, animation, edge menu, Instagram control or scroll architecture changed.
Full rationale in `docs/DECISIONS.md` ("Light Surfaces Are White; The Loops Are
Re-Baked, Not Re-Tinted").

### What changed

- `tokens.css`: `--color-background` now resolves to `--color-white`. Light
  surfaces read the token instead of `--color-brand-cream`: `hero-section.css`
  (surface and loop frame), `layout.css` (`.stack-section--cream`,
  `.manifesto-statement--cream`, `.contact-section`, `.site-footer`),
  `projects-section.css` (section, title cut-out and its fillets),
  `studio-section.css` (video box), `home-intro.css` (light intro ground).
  `SeoHead.astro` `theme-color` is `#ffffff`. `--color-brand-cream` is kept for
  cream type/borders/details on dark surfaces, which were not touched.
- `hero-section.css`: `.hero__shape--ring` border and `.hero__scroll-dot` fill
  are `--color-brand-orange`; nothing else about them changed.
- Media, from the untouched masters, originals kept (not overwritten):
  `public/assets/motion/hero/hero-desktop-white.webm` (2,132,957 B, VP9+alpha),
  `hero-desktop-white.mp4` (1,398,420), `hero-mobile-white.webm` (745,694),
  `hero-mobile-white.mp4` (594,671), `hero-poster-white.webp` (13,870);
  `public/assets/motion/studio/studio-loop-white.webm` (588,570),
  `studio-loop-white.mp4` (520,993), `studio-poster-white.webp` (106,288).
  `src/config/assets.ts` points `heroMedia` and `studioMedia` at them.
- `scripts/prepare-hero-media.mjs` and `scripts/prepare-studio-media.mjs` gained
  `--paper=white|cream` (default white, `-white` suffix; `cream` reproduces the
  original unsuffixed set). Studio's white mode unmixes paper/ink/orange so
  only the paper is lifted. ffmpeg is still not vendored; this session used
  the build in an earlier session's scratchpad through `FFMPEG_PATH`.
- `scripts/check-hero-contract.mjs` now checks both scripts' `CREAM`/`WHITE`
  constants against the tokens and that the referenced loop files match
  `--color-background`.
- Tests: `foundations.spec.ts` expects the `-white` hero sources and poster and
  asserts a white hero/frame, orange ring and orange dot; `demo.spec.ts`
  expects a white Studio surface and `studio-poster-white.webp`.
- Comments and docs: `HeroSection.astro`, `StudioSection.astro`,
  `src/config/intro.ts`, `MOTION_SPEC.md`, `CONTENT_NEEDED.md`, `DECISIONS.md`.
- Not needing a white version (measured 0% opaque cream, real alpha):
  `manifesto.png`, `servicios-trimmed.png`, both wordmarks.

### Verification

- `npm.cmd run check`: 83 files, 0 errors, 0 warnings, 0 hints.
- ESLint and Prettier (`--end-of-line auto`) clean on every touched file.
  Repository-wide `npm run lint` fails only on `.measure-tmp.mjs`, a temporary
  root script belonging to a concurrent session, not on this work.
- Both artifacts built into the session scratchpad (shared `dist/` and
  `dist-demo/` untouched, concurrent sessions active): standard 9 pages,
  `check:production` passed (36 files, 138,899 JS bytes), `check:links`
  passed; demo 14 pages. Both reference only the `-white` loop files.
  `check:hero`, `check:brand` passed; `check:assets` prelaunch as before.
- Production suite 58 passed / 10 skipped; demo suite 54 passed / 21 skipped
  (temporary configs against the scratch builds, deleted afterwards).
- Media measured: hero white WebM opaque light-pixel warmth 0.4 (was 27), 0%
  near-cream; MP4 fallback 83% white (was 83% cream); 388 frames, 30 fps,
  12.933 s as before. Studio paper averages 255 against the master's 250/236/216;
  ink and orange within 1-2 levels; 144 frames, 24 fps.
- Screenshots at 1440x1000, 390x844 and 1440x1000 reduced motion of hero,
  manifesto, services, projects, Studio and contact, plus `/manifiesto/`,
  `/studio/`, `/proyectos/`, a project detail and `/contacto/` (all `body`
  white): no beige rectangle around any image or video (near-cream pixels 0%
  on hero, manifesto, Studio and contact; the remaining cream is the services
  section's cream type/illustration on ink and the demo covers' CSS art),
  horizontal overflow 0.

### Open items for the user

- Approve the white loops. The Studio loop's paper-coloured interior details
  (sneakers, highlights on the band) are now white with the paper.
- The superseded cream loop files (~5.9 MB) are still under `public/` and
  therefore copied into `dist/` unreferenced; move them to `media-src/` once
  the white set is approved (CONTENT_NEEDED).

Nothing was committed, pushed or deployed.

### 2026-09-10 follow-up: services now holds the screen (sticky)

User screenshot (`public/Captura de pantalla 2026-09-10 151522.png`, left by
the user; it sits in `public/`, so it would ship with any build until it is
moved) showed the project rail's cream edge under the services section.

- Cause: `.services-section { position: relative }` in the sections layer
  outranked the shared `.stack-section { position: sticky }` in layout.css
  (pre-existing since the committed version). The section was exactly 100svh
  but scrolled away normally, so any wheel position past its exact top
  exposed the rail below it.
- Fix: the `position` declaration was removed from `.services-section`; the
  stack rules now apply (sticky at >=64.01rem and min-height 40rem, relative
  otherwise and under reduced motion). The rail (z-index 8, cream) slides
  over it; nothing else stacks under it.
- Measured with wheel scrolling at 1906x916: section top 0 / height 916 for
  the whole cover while the rail rises from 900 to 300. Content fits one
  screen at 1100x650, 1280x640, 1366x768, 1440x900 and 1906x916, so the
  sticky layer never hides its own foot. No horizontal overflow.
- Spec: the desktop services test asserts `position: sticky`.
- Demo suite (3 workers) 54 passed / 21 skipped / 0 failed.

Nothing was committed, pushed or deployed.

### 2026-09-10 follow-up: service titles in sentence case

User request: service titles with a capital initial only. The data in
`src/data/services.ts` was already sentence case ("Estrategia", ...); the
capitals came from `text-transform: uppercase` on `.service-entry__title`,
now removed. The demo spec asserts `text-transform: none`. Services demo
tests 4 passed / 2 skipped; Prettier clean.

Nothing was committed, pushed or deployed.

### 2026-09-10 follow-up: deeper foot on the services section

User request: more padding at the bottom of the services section.

- Desktop shell foot `clamp(4.5rem, 16svh, 12rem)` ->
  `clamp(6rem, 22svh, 16rem)`; tablet/mobile shell padding gains a separate
  foot `clamp(8rem, 20vw, 14rem)` (head unchanged at `clamp(6rem, 13vw,
  10rem)`).
- Desktop windows at or under 42rem high trim the foot to
  `clamp(6rem, 18svh, 16rem)` so the sticky section still measures exactly
  one screen (it grew 2-5px at 1280x640 and 1100x650 without the trim).
- Air under the lowest content (section height): 1906x916 180px (was 125);
  1440x900 176; 1366x768 147; 1920x1080 216; 1280x640 93; 1100x650 95;
  834x1112 145; 390x844 106. Every desktop size measures one screen, no
  horizontal overflow.
- Services demo tests 4 passed / 2 skipped; Prettier clean.

Nothing was committed, pushed or deployed.

## 2026-09-10 Follow-up: Edge Tab Turns Ink Over Orange, Sentence-Case Routes

User request: the orange edge tab vanished on orange backgrounds; it must turn
black there. The menu's route labels must show only a capital initial. See
`docs/DECISIONS.md` ("The Edge Tab Turns Ink Over Orange; Routes In Sentence
Case"). Only `EdgeMenu.ts`, `edge-menu.css`, `foundations.spec.ts` and docs were
touched; panel, close control, tracking, Instagram control and scroll are
unchanged.

- `EdgeMenu.ts` samples the colour painted under the tab (first opaque,
  non-faded background at its resting point, menu excluded) on scroll (plus a
  180 ms settle sample), resize, vertical move and `animationend`, at most once
  per frame, never while open, and sets `data-tab-tone="accent"` on orange.
- `edge-menu.css`: `[data-tab-tone='accent']` paints the tab ink with cream
  rules, with a 160 ms colour transition; `.edge-menu__list strong` lost
  `text-transform: uppercase`.
- `foundations.spec.ts`: new specs "the edge tab turns ink over an orange
  surface and back" (`/contacto/` hero, then the ink channels, then the home)
  and "menu routes are written in sentence case".

Verification: `astro check` 0/0/0; ESLint and Prettier clean on touched files;
scratch builds 9 and 14 pages; production suite 62 passed / 10 skipped. A
tab-versus-pixel sweep (the pixel beside the tab compared with the published
tone) over `/`, `/manifiesto/`, `/studio/`, `/contacto/` and `/proyectos/` at
1440x1000 and 390x844, 267 settled positions: 0 mismatches except one boundary
position on mobile `/contacto/`, where the ink section's rounded top corner
sits exactly at the tab's height and the tab straddles both colours. Labels
measured one line at both sizes; no console errors.

Failures seen in the demo suite that belong to concurrent work, not this
change: the services title `text-transform` assertion (an earlier build, since
fixed by that session) and "the goodbye stage swaps its copy in place under
reduced motion" (goodbye rebuild in progress).

Nothing was committed, pushed or deployed.

## 2026-09-10 Session: Goodbye Stage Rebuilt As A Panorama (Phase 1)

User request: rebuild the pre-footer goodbye following the structure of the
"How we do this?" block on beans.agency, architecture only — no final visual,
copy, transition or CTA. See `docs/DECISIONS.md` ("The Goodbye Is A Viewport
Over One Panoramic Scene") and `docs/MOTION_SPEC.md` ("Goodbye").

### What it is now

- One scene element, wider than the screen (200cqw by default;
  `clamp(180cqw, height × ratio, 220cqw)` once `goodbyeVisual` holds an asset),
  inside a clipped viewport. Section `100svh`, `overflow: hidden`.
- Side A shows the scene's left side under block A ("Siguiente" arrow beside
  its headline). The arrow pans the whole scene left until its right side is
  flush with the screen (side B, block B with a "Volver" arrow); back pans it
  home. `translateX(calc((100cqw - 100%) * var(--goodbye-progress)))`; GSAP
  only eases the progress (1.1 s `power3.inOut`). Nothing is measured, so
  resizing on side B stays flush.
- Swipe on touch, ArrowLeft/ArrowRight on the arrows, focus handed to the
  arriving arrow, requests ignored mid-travel, no autoplay. Reduced motion
  jumps; no JavaScript rests on side A with both blocks listed.
- Visual slot `goodbyeVisual` (video | image, `null`); until then a text-free
  placeholder panorama (ink, orange horizon, hairline marks, disc left, ring
  right). Copy in `src/data/goodbye.ts`: structural "Titular A"/"Titular B",
  flagged, so the section stays out of `dist/` (verified: 0 goodbye markup).

### Files

- Rewritten: `src/components/sections/GoodbyeSection.astro`,
  `src/data/goodbye.ts`, `src/styles/goodbye-section.css`; new
  `src/scripts/motion/GoodbyePanorama.ts`; `MotionController.ts` registers it;
  `src/config/assets.ts` (`goodbyeMedia` became `goodbyeVisual`);
  `src/pages/index.astro` renders from `homeGoodbye`.
- Removed: the CSS jaw/"ADIÓS" fallback from `layout.css` and `motion.css`,
  its scrub from `SectionStack.ts`, and this session's first-pass slider
  `GoodbyeSlides.ts` (the user corrected the concept mid-session).
- Specs in `tests/e2e/demo.spec.ts`: the pan (one scene, same size throughout,
  flush at both sides, focus hand-over, swipe back on touch), the reduced-motion
  jump, and the no-JavaScript rest state.
- Docs: `MOTION_SPEC.md`, `DECISIONS.md`, `CONTENT_NEEDED.md`,
  `CONTENT_MODEL.md`, `CLAUDE.md`.

### Verification (actually run)

- `astro check` 0/0/0; `npm run lint` clean; Prettier clean on touched files.
- `build` 9 pages; `check:production` passed (37 files, 145,778 JS bytes, incl.
  concurrent work; the largest asset budget is 150,000, so headroom is thin);
  `check:links` passed. `build:demo` 14 pages.
- Demo suite 63 passed / 21 skipped; goodbye specs 54/54 over 6 repeats on all
  three profiles. Production suite 62 passed / 10 skipped.
- Scratch sweep at 1920x1080, 1440x900, 1366x768, 834x1112, 390x844, 320x720,
  reduced 1440 and no-JS 1440: scene exactly 2x the viewport, side B flush
  right, back at 0, overflow 0, no console errors; screenshots inspected.
- Root cause of the reduced-motion spec failure on touch profiles:
  `reduced-motion.css` gives every element a 0.01ms transition
  (`transition-property` defaults to `all`), so a synchronous change lands on
  the next frame; the spec now waits two frames. Not a module defect.

### Important: an earlier state of this work is on `origin/main`

Commit `786c9a2` ("Hold services full screen, add the home intro, Studio and
goodbye stages", 15:46, the user's identity) was created and pushed by another
process during this session. It contains this session's superseded slider
(`GoodbyeSlides.ts`, "Titular 01/02/03"), so the public Vercel demo probably
shows that version. The panorama is uncommitted. This session did not commit,
push or deploy.

Also uncommitted in the tree and NOT this session's: `ProjectTile.astro`,
`projects-section.css`, `ProjectTilePress.ts` (and its registration in
`MotionController.ts`), and `public/Captura de pantalla 2026-09-10 151522.png`.

### Next action

Phase 2 of the goodbye: choose the panoramic visual (see `CONTENT_NEEDED.md`),
the copy for sides A and B, the CTA, and tune the travel and the copy
hand-over. Commit the panorama files together once the user approves.

## 2026-09-10 Session: Project Tile Hover Bends The Image

Claude Code session at the user's request. Only the hover of the home project
tiles changed; the horizontal scroll, image sizes and ratios, number of
projects, section background, `Ver proyectos` CTA, project pages and every
other section are untouched. See `docs/DECISIONS.md` ("Project Tiles Bend
Under The Pointer Instead Of Zooming") and `docs/MOTION_SPEC.md`.

### What changed

- `src/scripts/motion/ProjectTilePress.ts` (new): nearest-edge dent via
  `clip-path: path()`, pointer targets once per frame, GSAP easing, cleanup.
- `src/scripts/motion/MotionController.ts`: one import and one call, after
  `initHorizontalProjects()`. The file also carries another session's
  uncommitted goodbye change (`GoodbyePanorama`), preserved as found.
- `src/components/projects/ProjectTile.astro`: the media is wrapped in
  `.project-tile__surface[data-tile-surface]`.
- `src/styles/projects-section.css`: frame transitions/background and all
  hover/active scale and radius rules removed; surface rule added.
- `tests/e2e/demo.spec.ts`: two new specs ("a project tile bends at the edge
  under the pointer and springs back", "reduced motion keeps the project tile
  still on hover"). The file also holds another session's uncommitted goodbye
  specs; `prettier --write` was run on the whole file, formatting only.
- Docs: `MOTION_SPEC.md`, `DECISIONS.md`, this file, `CLAUDE.md` module list.

### Verification

- Reference analysed in Chrome (hellomonday.com): grid is a PIXI canvas with a
  mask; nearest segment found with a point-to-edge search and dragged in.
- Playwright visual pass against the dev server at 1440x1000, 1920x1080 and
  1440x1000 reduced motion, cursor at right, left, top, bottom, centre,
  top-right corner, right-low, moving along an edge, pressed, mid-entry and
  mid-leave. Frame and all five tile boxes identical to rest at every position,
  frame and media `transform: none`, document overflow 0, inline `clip-path`
  empty again after leaving, no console errors. Reduced motion: no clip at any
  position, title revealed.
- `eslint` clean and Prettier clean on every touched file.
- Scratch builds (shared `dist/`, `dist-demo/` untouched): standard 9 pages,
  no rail markup; demo 14 pages. Largest/total JavaScript 145,778 bytes (budget
  150,000 / 220,000) - within budget but the largest-asset margin is now small.
- Rail-scoped demo specs on the scratch build: 11 passed, 13 capability skips.
  Full demo suite on the same build: 65 passed, 25 skipped, 0 failed
  (temporary `playwright.press-qa.config.ts`, deleted afterwards).
  `astro check`: 87 files, 0 errors, 0 warnings, 0 hints.

Nothing was committed, pushed or deployed.

## 2026-09-10 Session: No Band Of An Older Section Between Layers

User report: during some scroll transitions a horizontal band of the previous
section or background flashed between two sections. Only the defect was fixed;
sticky, pin, horizontal rail, scrub, triggers and every animation are
unchanged. See `docs/DECISIONS.md` ("A Reveal Band Only Ever Shows The Section
Before It").

### Root causes (measured, not assumed)

A scratch probe hit-tested the incoming layer's clipped band (top strip,
rounded corners, side strips, +-0.5px around the seam) for every pair of
adjacent home sections at 1920x1080, 1440x900, 1366x768 and 390x844: settled
positions downwards, the same upwards, real wheel flicks down and up sampled
mid-flight, and a resize to 1280x720 and back.

- Services and Studio are `sticky` with `main` as containing block, so they
  stayed stuck at the top until the end of the page. The rail and the goodbye
  stage after them are not sticky and scroll away, so the NEXT layer opened its
  band onto the old layer: services ink (its copy and illustration) between the
  white rail and white Studio - the reported band - and Studio through the top
  of Contacto. Reproduced in every desktop size and mode.
- The clip used `inset(7% ...)`, a percentage of the layer's own height: ~340px
  on the 535svh manifesto track, which cut "Morder." while it entered.
- Not causes, checked: pin spacing and `end` (the pin covers exactly one
  screen), margins (the one `-2rem` overlap only ever shows the manifesto),
  transparent containers (all hits were layers, never an unpainted gap), and
  subpixel seams (a 1px step on the services top edge is anti-aliasing of its
  own half-pixel clip, identical before and after; no overlap was added).

### Changes

- `src/scripts/motion/SectionStack.ts`: on the sticky query, a sticky layer gets
  `data-stack-released` once the element after it reaches the top (unless that
  element is sticky too) and loses it when the reader scrolls back above that
  point. The clip band is `min(layer, viewport) * 7%` in px, recomputed on
  refresh (`invalidateOnRefresh`), with both tween ends in one shape.
- `src/styles/layout.css`: `.stack-section[data-stack-released] { position:
  relative }` inside the existing sticky media block.
- `tests/e2e/demo.spec.ts`: new spec "no older stack layer shows through a
  reveal band" (fine-1440). It fails on the pre-fix build and passes after.
- `docs/MOTION_SPEC.md` (SectionStack paragraph) and `docs/DECISIONS.md`.

### Verification

- Probe after the fix: zero leaks in every pair, viewport and mode above, and
  under `prefers-reduced-motion: reduce`. Horizontal overflow 0 at every size;
  no console warnings or errors. (Before: 7 leaking families per desktop size.)
  One remaining resize sample was checked over 3 s and is the rail legitimately
  covering the stuck services layer, identical before the fix.
- `astro check` 87 files 0/0/0; ESLint and Prettier (`--end-of-line auto`)
  clean on every touched file.
- Scratch builds (shared `dist/`, `dist-demo/` untouched): standard 9 pages,
  `check:production` (patched copy on the scratch output) passed with 146,439
  JS bytes; demo 14 pages.
- Demo suite: 66 passed, 27 skipped, 0 failed. Production suite: 62 passed,
  10 skipped, 0 failed. Temporary `playwright.seamfix-*.config.ts` files were
  deleted afterwards.
- Not done: inspection in the user's own Chrome, whose tab ran in the
  background (`visibilityState: hidden`, so rAF and ScrollTrigger were paused);
  all rendering checks ran in headless Chromium instead.

Nothing was committed, pushed or deployed.

## 2026-09-11 Session: Goodbye Side B Becomes A Solid CTA Panel

User request: second iteration of the panoramic pre-footer, changing only the
right-hand state and adding a clear back control, after the structure of the
beans.agency end state (visual + solid side strip + CTA + round back button).
The pan, the single scene, `100svh`, side A and every other section are
unchanged. See `docs/DECISIONS.md` ("Goodbye Side B Is The Scene Beside A
Solid CTA Panel") and `docs/MOTION_SPEC.md` ("Goodbye").

### What changed

- `src/data/goodbye.ts`: side B is now a `GoodbyePanel` (optional kicker and a
  CTA `{ label, href, destination }`). Demo record: the approved claim "Haz que
  tu marca muerda" -> `/contacto/` (read from `primaryNavigation`); kicker
  "¿Hablamos?" provisional. Still flagged, so still absent from `dist/`.
- `GoodbyeSection.astro`: side A untouched; side B is `.goodbye-panel`
  (`[data-goodbye-stop="end"]`) holding the back button (hung outside the
  panel over the scene) and the headline link with the arrow disc set into its
  last word.
- `goodbye-section.css`: solid `#cd5730` panel, ink type, one white mark in
  the kicker. Width `clamp(21rem, 31vw, 38rem)`, 37% up to 80rem; along the
  bottom (`min(44%, 30rem)`) on phones and portrait tablets. The scene stops
  at the panel's edge through the same custom property. CTA hover/focus/press
  states; back-button pressure radius. Transitions off inside the stage under
  reduced motion.
- `GoodbyePanorama.ts`: one timeline played/reversed (scene, panel +0.08 s,
  copy from 0.55 s, back button from 0.86 s); settle moves focus, makes the
  other side `inert` and dispatches an `animationend` so the edge tab
  re-samples its tone.
- `tests/e2e/demo.spec.ts`: the goodbye specs now assert the panel off-screen
  on side A, flush right on side B with the scene meeting it, the 28-40% share
  and full height at 1440, the bottom layout on touch, the back button whole
  and clear of the panel, the CTA's `/contacto/` href, the new back name
  ("Volver a la vista anterior"), focus after the reduced jump, and the no-JS
  panel.
- Docs: `MOTION_SPEC.md`, `DECISIONS.md`, `CONTENT_NEEDED.md`,
  `CONTENT_MODEL.md`, `CLAUDE.md`, this file.

### Defects found and fixed during QA

- Reduced motion: focus was lost after the jump back. Measured cause: the
  site-wide 0.01ms `all` transition runs on every descendant for inherited
  `visibility`, so the arriving arrow stayed hidden for 1-2 frames and
  `focus()` did nothing; the same lag made the edge tab miss the orange.
  A two-frame wait was tried and was still flaky; transitions inside the stage
  are now off under reduced motion and settling is synchronous.
- Phones: a 50% bottom panel put its top edge exactly where the touch tab
  rests, so the tab straddled orange and ink. Now 44%.
- A spec counted the off-screen (but opaque) panel as shown; the helper now
  requires the element to be on screen.
- Spec race under full-suite load: the scene is flush at 1.10 s but the stage
  settles (side A turns `inert`) when the timeline ends, ~1.16 s, after the
  back button lands. Side A is already `visibility: hidden` in that window,
  so it is not reachable; the spec now waits for the settled state.

A QA artefact, not a site defect, for future sessions: in Chromium headless
mobile emulation, `page.screenshot()` followed by a synthetic mouse click
mid-travel leaves `getBoundingClientRect()` reporting stale mid-travel boxes
while the computed transforms are already at rest and no animation runs.
Measure computed styles or avoid that sequence. Also, `serve-dist.mjs` exits
after 10 s without requests, so long scripted sessions need a keep-alive.

### Verification (actually run)

- Scratch Playwright sweep (not committed) at 1920x1080, 1440x900, 1366x768,
  1180x820, 1024x768, 834x1112, 390x844, 320x720, plus reduced motion at 1440
  and 390 and no-JS at 1440: forward, mid-travel, back, three round trips,
  a request for the other side mid-travel ignored, resize to 85% width on
  side B and back, Enter/Space/Tab/Shift+Tab with focus hand-over, console.
  All checks passed: panel off-screen on A and flush right on B, scene meeting
  the panel within 1px after resize, back button whole and >= 10px from the
  panel, CTA >= 16px from every panel edge, section = viewport height on the
  side layouts, overflow 0, edge tab ink over the panel, no console errors.
- Measured side B: 1920 panel 595px (31%), CTA 67px type on 3 lines; 1440
  446px (31%), 49px; 1366 423px (31%); 1180 437px (37%); 1024 379px (37%);
  834 bottom panel 480px; 390 371px; 320 317px.
- Screenshots inspected at every size above for states A, mid, B, CTA hover
  and focus, back hover, no-JS and mid-return.
- `astro check` 86 files 0/0/0; ESLint and Prettier (`--end-of-line auto`)
  clean on every touched file.
- `build` 9 pages, `check:production` passed (37 files, 147,107 JS bytes
  including the concurrent contact work below), `check:links` passed, no
  goodbye markup in `dist/index.html`. `build:demo` 14 pages.
- Goodbye specs 9/9 on all three demo profiles. Full demo suite after the
  spec-race fix: 66 passed, 27 skipped, 0 failed; a second run had one
  failure in the unrelated Studio spread spec (touch-390), which then passed
  9/9 in isolation (`--repeat-each=3`), so it is intermittent under load. An
  earlier run's single failure of "demo routes render without browser
  errors" also passed 3/3 in isolation. Production suite: 62 passed,
  10 skipped.

### Concurrent work by another session - not this session's

During this session another process modified
`src/components/sections/ContactSection.astro`, `src/styles/layout.css`,
`src/styles/index.css` and `src/scripts/motion/MotionController.ts` (two lines
registering `initContactBite()` after `initGoodbyePanorama()`), and added
`src/scripts/motion/ContactBite.ts`, `ContactBiteMotion.ts` and
`src/styles/contact-section.css`. None of it was touched here. The demo builds
used for this QA include it.

Nothing was committed, pushed or deployed.

## 2026-09-11 Session: Home Contact Close Rebuilt As "La Última Mordida"

Claude Code session at the user's request. Only the home `#contacto` section
and what it strictly needs were touched. Hero, Manifesto, Services, Projects,
Studio, Goodbye, the edge menu, the Instagram control, the cursor, the footer
and the intro were not modified. Design and rejected alternatives in
`docs/DECISIONS.md` ("The Contact Close Is A Poster"); motion in
`docs/MOTION_SPEC.md` ("Contact Close").

### What it is now

- A poster on white: kicker (orange dot + "Contacto"), "HAZ QUE / TU MARCA"
  in black caps and "muerda" larger, orange, italic, stepped right. One orange
  disc (about 37% of the width on desktop) bleeds off the right edge and has
  already taken the end of "muerda"; an inverted copy of the headline rides
  inside it, so letters under orange turn white (ink for "muerda"). Phones and
  portrait tablets stack headline, disc, rows.
- The two approved channels (`contactChannels`, no new URL) as full-width
  editorial rows: Correo presses horizontally with an orange stroke and a
  runner; Instagram shows a tape of the handle while hovered or focused.
- Fine pointer: heavy lean (max 42 x 32 px, 1.15 s `quickTo`), per-line
  pressure, a squash-notch-release bite (~0.65 s) on "muerda" or the disc.
  Touch: entrance only. Reduced motion: short fade, nothing else.
- The section is exactly one screen on desktop (1920x1080, 1440x900,
  1366x768 all measure the viewport) and grows with its content elsewhere.

### Files

- Rewritten: `src/components/sections/ContactSection.astro` (markup plus a
  home-only script that registers the chunk loader on the section).
- New: `src/styles/contact-section.css` (`sections` layer),
  `src/scripts/motion/ContactBite.ts` (lifecycle, run by `MotionController`),
  `src/scripts/motion/ContactBiteMotion.ts` (the motion chunk).
- Two-line registrations: `src/styles/index.css` (import after the goodbye
  one), `src/scripts/motion/MotionController.ts` (import and call after
  `initGoodbyePanorama()`).
- `src/styles/layout.css`: the old contact-only rules and selectors removed
  (`.contact-section`, `__grid`, `h2`, `__links`, `__value`, and the contact
  members of shared intro selectors). The intro members were kept.
- `tests/e2e/demo.spec.ts`: three specs appended at the end (poster and
  channels on all profiles; lean, pressure, bite and tape on fine-1440;
  reduced motion). `docs/MOTION_SPEC.md`, `docs/DECISIONS.md`, `CLAUDE.md`
  (module list) and this file.

### Bundle budget (important for every session)

Measured on scratch builds: the shared motion bundle without any contact
motion is 149,102 bytes against the 150,000 largest-asset budget. A dynamic
`import()` inside that bundle adds Vite's preload helper and cost 1,629 bytes,
which broke the budget (150,731). The loader therefore lives in the section's
own script and GSAP is handed to the chunk instead of imported, so GSAP is not
split out: shared bundle 149,342, `ContactBiteMotion` 4,884,
`ContactSection` script 1,467; total 155,693 of 220,000. Only about 650 bytes
of headroom remain in the shared bundle for everyone.

### Defects found and fixed during QA

- The disc did not render: a GSAP `from()` on `--sx/--sy` read its end back as
  0 and collapsed the clip ellipse. Now `fromTo`.
- Under reduced motion the headline stayed invisible: the `from()` fade
  recorded a from-state already on the lines as its end (0 -> 0). Every
  entrance tween is now a `fromTo`; the reveal also uses `end: 'max'`,
  `onRefresh` and an in-view check so a deep link cannot skip it.
- Desktop sections were 50-70 px taller than the screen; the vertical rhythm
  was tightened until they measure exactly one screen.
- "tu marca" overflowed its stage at 390 and 320 px and at 200% text; the
  headline size is capped at 18.5cqw of the stage.
- At 1440 the disc stopped short of "muerda"; its centre, size and the word's
  indent were retuned so the bite is visible at rest.
- A `@vite-ignore` attempt to drop the preload helper left the chunk unemitted
  (a 404 in production); reverted in favour of the section-script loader.

### Verification (actually run)

- Rendered and measured on the dev server at 1920x1080, 1440x900, 1366x768,
  1024x1366, 768x1024, 430x932, 390x844 and 320x720, plus 200% text at 1440
  and 390, no JavaScript at 1440 and 390, reduced motion at 1440 and 390, and
  a resize sweep 1440 -> 1024x1366 -> 1366x768 -> 1440: horizontal overflow 0,
  the inverted copy within 0 px of the real word everywhere, no console errors
  from this section.
- Interaction on a fine pointer: lean -36.7 px at the disc's edge (bounded),
  lines 2-3 pressure ~0.87, bite state with squash 41.6%/45.8% and a 41 px
  notch, cursor pressed pose and release, Correo and Instagram hover states,
  tape off after leaving, Tab to both rows with `:focus-visible`, scroll back
  and forth leaves everything shown.
- `astro check`: 1 error, in `tests/e2e/demo.spec.ts:715`
  (`offsetHeight` on `HTMLElement | SVGElement`) inside the concurrent
  services session's uncommitted test hunk, not this work; before that hunk
  landed the check was 88 files 0/0/0. ESLint repo-wide: clean. Prettier
  (`--end-of-line auto`) clean on every touched file.
- Scratch builds (shared `dist/` and `dist-demo/` untouched): standard 9
  pages, demo 14. `check:production` (patched copy on the scratch output)
  passed, 40 files, 155,693 JS bytes. `check:links` passed on both.
- Demo suite on the scratch demo build: 74 passed, 31 skipped, 0 failed.
  Production suite on the scratch standard build: 62 passed, 10 skipped,
  0 failed. Temporary `playwright.contact-*.config.ts` files were deleted.
- After the final 18.5cqw headline cap, both artifacts were rebuilt in the
  scratchpad: `check:production` passed (44 files, 156,088 JS bytes, the new
  total including concurrent sessions' work), `check:links` passed, and the
  layout-sensitive demo specs (contact, compact 320px, 200% text, fixed
  controls, reveal band, edge-rail scene) ran 17 passed, 10 skipped, 0 failed.

### Open items for the user

- The kicker "Contacto" and the cursor label "Escribir" are structural labels,
  not client copy; no other text was added.
- The shared bundle is ~650 bytes under its budget; the next motion addition
  anywhere will need a split (for example GSAP in its own vendor chunk via
  `astro.config`) or a budget decision.

Nothing was committed, pushed or deployed.

## 2026-09-11 Session: Services Rebuilt As A Sticky Editorial Sequence

Claude Code session at the user's request. Only the home services section was
redesigned; hero, manifesto, the project rail, Studio, goodbye and contact were
not touched. See `docs/DECISIONS.md` ("Services Becomes A Sticky Editorial
Sequence") and the new "Services" section of `docs/MOTION_SPEC.md`.

### What changed

- `src/components/sections/ServicesSection.astro`: track > sticky stage >
  two zones. Left: title, illustration, CTA slot, `01 / 04` readout with a 2px
  orange line. Right: the four services, each with an `aria-hidden` number,
  name, description, hairline rule and glyph. A home-only `<script>` hands the
  lazy loader to the section, as `ContactSection.astro` does.
- `src/styles/services-section.css`: rewritten. Linear list by default; the
  sequence layout only under `[data-services-enhanced]` on wide, tall screens.
  The section is `position: relative` everywhere (no longer a sticky layer).
- `src/scripts/motion/ServicesMotion.ts`: stub in the shared bundle; switches
  the layout synchronously, mounts the chunk, falls back to the list if it
  fails, and keeps the one-shot reveal for the linear layout.
- `src/scripts/motion/ServicesSequence.ts` (new, lazy chunk, 1,930 bytes): the
  scrubbed timeline, readout, illustration press and focus hand-off.
- `src/data/services.ts`: `servicesPage` (`href: null`, label `Abrir
  servicios`). No services page exists; by the user's decision the CTA is not
  rendered until a real route is set there.
- `tests/e2e/demo.spec.ts`: the 2x2 spec was replaced by "services hand the
  stage from one to the next, then let the rail in" (one service painted per
  step, counter, fixed anchor, reverse scroll, a single seam onto the rail and
  the rail pinning only after services leave) and "reduced motion lists the
  services without the sequence"; the readability spec now checks numbering,
  the absent CTA and painted opacity on touch; the reveal-band spec expects
  services `relative`. The file also carries another session's concurrent
  goodbye/contact specs, left as found.
- Docs: `DECISIONS.md`, `MOTION_SPEC.md`, `CONTENT_NEEDED.md` (services page
  route), `CLAUDE.md` (module list), this file.

### Measured (dev server and scratch builds, headless Chromium)

- Section 2.80 viewports at 1920x1080, 1440x900, 1366x768, 1280x720 and
  1100x650; the stage stays at `top: 0` through the whole track; counter and
  line follow the playhead; at each boundary every service is at opacity 0 (no
  two names overlap); the rail's top is at the viewport's bottom exactly when
  the stage lets go, and the rail is `position: fixed` only once services are
  off screen.
- Fast wheel flicks down and up through manifesto -> services -> rail: no
  frame where the rail is pinned while services is visible, no other layer
  inside the services band (the only extra hits were the dev toolbar and the
  pre-existing reveal band's side strips over the white manifesto).
- Resize mid-sequence to 1280x720 and back: the playhead returned to the same
  service. Horizontal overflow 0 everywhere. No console errors from services.
- Linear: 834x1112, 390x844 and 1440x900 reduced motion show every service
  painted, in order; the heading column stays in view on wide reduced motion.
- The CTA was checked by injecting it (it is not rendered): accessible name
  "Abrir servicios", arrow via `content: '↗' / ''`.

### Verification

- `astro check`: 91 files, 0 errors, 0 warnings, 0 hints. ESLint and Prettier
  (`--end-of-line auto`) clean on every touched file.
- Scratch builds (shared `dist/` and `dist-demo/` untouched): standard 9 pages,
  `check:production` (patched copy on the scratch output) passed with 43 files
  and 156,285 JS bytes, largest asset 147,735 (it was 150,731, over budget,
  before the timeline moved to its own chunk); no services markup in `dist/`.
  Demo 14 pages.
- Demo suite on the scratch build: 74 passed / 31 skipped / 0 failed before the
  split; after it, 67 passed / 31 skipped / 7 failed, all seven in the goodbye
  specs, whose files another session rewrote at 09:41-09:42 during that run.
  The only 404 on the static demo is that session's missing
  `/assets/goodbye/goodbye-panorama.webp`. Production suite: 62 passed,
  10 skipped, 0 failed. The temporary `playwright.services-*.config.ts` files
  were deleted afterwards.

### Open items for the user

- A services page route for `servicesPage.href` (`CONTENT_NEEDED.md`).
- The brief's 55-65vh per service and 220-280vh overall cannot both hold with
  four services; 280svh was kept (45svh per step). `--services-step` is the one
  value to change.

Nothing was committed, pushed or deployed.

### 2026-09-11 follow-up: numbers removed, sizes and art position adjusted

User request. The `01`-`04` above each service name are gone (markup, CSS and
spec, which now asserts none exist; the `01 / 04` readout stays). Heading
`clamp(2.9rem, 5.6vw, 5rem)`; service names smaller at every width (5.5rem max
in the sequence); on wide screens the illustration is 88% of its column and
centred in it (the user chose "centred in its column" over a three-zone
layout). Re-probed at 1440x900, 1920x1080 and 390x844: sequence, handovers,
release onto the rail and rail pin unchanged, no console errors, overflow 0.
`astro check` 0/0/0, ESLint and Prettier clean.

Nothing was committed, pushed or deployed.

### 2026-09-11 follow-up: art and service centred as a pair, per-service images

User request, composition only (scroll logic, timings and copy unchanged). In
the sequence layout the heading (top-left) and the readout (bottom-left) stay
as anchors; the illustration and the service on stage form one pair centred
on the viewport, the art beside the copy and centred on the name and
description. The art grew rather than shrank (461px at 1440, 576px at 1920).
`ServiceRecord.image` (null for all four) adds a layer to a new art frame
(`[data-services-art]`), and `ServicesSequence.ts` cross-fades layers at a
handover (same window and ease both ways, opacities summing to one); the
press/pose now acts on the frame. See `DECISIONS.md` and `MOTION_SPEC.md`.

- Measured at 1440x900, 1920x1080, 1366x768 and 1100x650: pair 0px from the
  viewport centre, art-to-copy gap 50-80px, art centre 13-16px from the
  copy's, heading unmoved. The cross-fade was verified with a temporary image
  on Identidad (reverted): layers 1.00/0.00 -> 0.50/0.50 at the boundary ->
  0.00/1.00, forwards and backwards, no console errors.
- `astro check` 0/0/0; ESLint and Prettier clean. Scratch builds: standard 9
  pages, `check:production` passed (158,289 JS bytes, largest 147,558; the
  sequence chunk is 2,316 bytes). Services and layout-sensitive demo specs on
  the scratch build (temporary config deleted): 16 passed, 14 skipped,
  0 failed. The sequence spec now also asserts the pair's centring, gap,
  vertical alignment and art width.
- Note: at 1100x650 the art's top sits 23px under the heading's last line;
  every larger size has more room.

Nothing was committed, pushed or deployed.

### 2026-09-11 follow-up: the client's per-service illustrations

User request: Identidad, Digital and Contenido get their own illustrations
(`public/assets/servicio *.png`, supplied by the user, left untouched);
Estrategia keeps `servicios-trimmed.png`. Structure, scroll effect and copy
unchanged. See `DECISIONS.md` (third follow-up) and `MOTION_SPEC.md`.

- New `scripts/prepare-services-media.mjs` (`npm run media:services`, sharp):
  alpha-channel trim, 1200px wide, WebP with alpha, into
  `public/assets/services/` (identidad 1200x658 141 KB, digital 1200x574
  125 KB, contenido 1200x610 113 KB). Constants added after
  `servicesIllustration` in `src/config/assets.ts` (the file also carries
  another session's goodbye change, left as found); `src/data/services.ts`
  points the three services at them.
- `services-section.css`: service layers `object-fit: contain`, anchored at
  the frame's foot. `ServicesSequence.ts`: cross-fade with complementary
  opacity plus scale 0.99/1.015 and -4/+6px, and an `IntersectionObserver`
  (150% margin) that switches the lazy layers to eager and decodes them.
- Spec: the sequence test asserts, at every step, that exactly that service's
  layer is painted and loaded; the touch branch asserts the service layers are
  hidden in the list.
- Measured on the dev server: at 1440x900 and on a 1180x820 touch tablet (which
  runs the sequence) the painted layer is shared/1/2/3 per step, 0.50/0.50 at
  each boundary, correct in reverse; the frame keeps its size (461x267 and
  384x222); overflow 0; no console errors or 4xx. At 390x844 the list shows the
  shared art and the three layers are never fetched. Reduced motion keeps the
  list (no sequence, so no change of art), as decided for the section.
- `astro check` 0/0/0; ESLint and Prettier clean on touched files. Scratch
  builds: `check:production` passed (157,777 JS bytes), `dist/` references no
  service art. Services and layout-sensitive demo specs: 21 passed,
  12 skipped, 0 failed (temporary config deleted).

Open: the PNG masters sit in `public/` and ship in `dist/` unreferenced
(~2.3 MB); moving them to `media-src/` is recommended. Their clothing is opaque
near-black, unlike the shared art's transparent clothing; kept as supplied.

Nothing was committed, pushed or deployed.

### 2026-09-11 follow-up: more air under the heading

User request. Only the sequence stage's upper spacer row changed
(`minmax(clamp(3rem, 9svh, 6rem), 0.85fr)`). Heading-to-art 64 -> 81px at
1440x900, 108px at 1920x1080, 69px at 1366x768, 23 -> 59px at 1100x650; the
pair still clears the readout (53-212px), stays centred (0px) and aligned with
the copy (13-16px). No console errors; Prettier clean.

Nothing was committed, pushed or deployed.

### 2026-09-11 follow-up: `Abrir servicios ↗` beside the heading

User request. `/servicios/` now exists (another session's staged rename of
`manifiesto.astro`, listed in `primaryNavigation`; not touched here), so
`servicesPage.href` is `/servicios/` and the existing bite-button CTA renders.
It moved from the foot into a new `.services-section__head` beside the `h2`
(flex, centred, gap `clamp(2.5rem, 5vw, 5rem)`, wraps when narrow); in the
sequence the head takes the heading's grid cell, so the pair, the readout and
the air under the heading are unchanged. The spec now asserts one CTA to
`/servicios/` named "Abrir servicios", and on fine-1440 at least 32px beside
the heading and level with it.

- Measured: gap 72px at 1440x900, 80px at 1920x1080, 55px at 1100x650, 42px
  at 834x1112, all centred on the heading (0px); at 390x844 and in the
  reduced-motion two-column list it wraps 28px under the heading. No overflow,
  no console errors.
- `astro check` 0/0/0; ESLint and Prettier clean. Scratch builds:
  `check:production` passed (157,777 JS bytes). Services and layout-sensitive
  demo specs: 20 passed, 10 skipped, 0 failed (temporary config deleted).

Nothing was committed, pushed or deployed.

## 2026-09-11 Session: The Goodbye Pans Across The Supplied Photograph

User request: try `public/assets/bg panoramica.png` (saved with a space, not
the `bg-panoramica.png` the brief named) as the goodbye's panoramic scene,
keeping 100vh and the smooth arrow-driven pan, with the copy in the
photograph's black fields. Only the goodbye was touched. See
`docs/DECISIONS.md` ("The Goodbye Pans Across A Photograph; The Orange Panel
Goes") and `docs/MOTION_SPEC.md` ("Goodbye").

### What changed

- `scripts/prepare-goodbye-media.mjs` (new): measures the master (2048x768,
  sRGB, no alpha) and writes `public/assets/goodbye/goodbye-panorama.webp`
  (quality 92, 104,946 bytes, same size). The PNG is untouched. Uses the
  `sharp` Astro already installs; run `node scripts/prepare-goodbye-media.mjs`.
- `src/config/assets.ts`: `goodbyeVisual` is that image (on trial).
- `GoodbyeSection.astro`: writes `--goodbye-ratio`; side A is `.goodbye-start`;
  side B is `.goodbye-end` (back button + `.goodbye-end__copy` with kicker and
  the CTA headline), replacing the orange `.goodbye-panel`.
- `goodbye-section.css` rewritten: wide layout (aspect >= 5:4, enhanced) with
  the photograph full-bleed and the copy boxes cut from the scene's width at
  the measured fractions (side A within 26%, CTA from 69% and above 68% of the
  height, back button bottom-right past 76%); band layout (portrait, square
  and no-JS) with the photograph on top fading into the ink and the copy
  below. White type, orange only on the arrows and one small mark.
- `GoodbyePanorama.ts`: the panel tween and the edge-tab `animationend` signal
  are gone; the copy leaves by 28% and arrives from 76% of the pan, the back
  button from 86% (about 1.3 s overall), so fixed copy never crosses the
  bright photograph.
- `src/data/goodbye.ts`: one comment. `tests/e2e/demo.spec.ts`: the goodbye
  specs now check the real image, the copy in the black fields (from the
  scene box and the measured fractions), the band layout on touch, and sample
  the travel on every frame in the page instead of a fixed 450ms wait.
- Docs: `MOTION_SPEC.md`, `DECISIONS.md`, `CONTENT_NEEDED.md`, `CLAUDE.md`.

### Defects found and fixed during QA

- The wide copy layer's grid row was content-sized, so side B's box was 0px
  tall and the back button sat mid-screen. One `1fr` row now fills the layer.
- "¿HABLAMOS?" faded in over the orange piece mid-pan; side A's title was
  crossed by the piece's tip at ~40% opacity. Retimed (above).
- The mid-travel spec was timing-dependent and failed once under full-suite
  load on touch-390; it now samples frames in the page.

### Verification (actually run)

- Scratch Playwright sweep at 1920x1080, 2560x1080, 1440x900, 1366x768,
  1280x1024, 1180x820, 1024x768, 844x390, 834x1112, 768x1024, 390x844 and
  320x720, plus reduced motion at 1440 and 390 and no-JS at 1440. All checks
  passed: section = viewport height on the wide layout (>= on the band), one
  image and one scene size throughout, `img` box undistorted, flush on both
  sides and after a resize on side B, three round trips, a request mid-travel
  ignored, Enter/Space/Tab focus hand-over, overflow 0, no console errors, and
  every copy element visible over the photograph (opacity > 0.08) on its black
  on every frame of both directions.
- Screenshots inspected at every size for A, mid-travel, B, back-mid and
  focus, plus the seams entering the goodbye from Studio and leaving it into
  Contacto at 1440 and 390: no band of another colour (the stack's clipped
  strip shows the white body next to white Studio/Contacto).
- Measured upscale of the 2048px master: 1.0 at 1366x768 and 1024x768, 1.17 at
  1440x900, 1.33 at 1280x1024, 1.41 at 1920x1080, 1.69 at 2560x1080.
- `astro check` 91 files 0/0/0; ESLint and Prettier clean on touched files.
- `build` 9 pages, `check:production` passed (44 files, 156,108 JS bytes,
  including concurrent services/contact work), `check:links` passed, no
  goodbye markup in `dist/index.html`. `build:demo` 14 pages.
- Goodbye specs 27/27 with `--repeat-each=3`; full demo suite 74 passed,
  31 skipped, 0 failed; production suite 62 passed, 10 skipped.

The services session above saw 7 goodbye failures and a 404 for the WebP
because its run overlapped this rewrite; both are resolved by this session's
files.

### Open items for the user

- Approval and rights for the photograph, and a larger master for sharpness.
- The edge menu's tab stays orange over the orange leather on side A at about
  1280-1440px wide (it only reads CSS backgrounds). Out of this scope.
- Side A's copy ("Titular A") is still a placeholder; the section stays
  demo-only until it is approved.

Nothing was committed, pushed or deployed.

## 2026-09-11 Session: Contact Close, Second Pass (Soft Sculpture, Sentence Case)

User direction: keep the structure and the interaction, but replace the flat
orange disc with a protagonist 3D-feeling piece, move the section to sentence
case, give the headline far more air above the channels, and refine the
rows. Only the contact close was touched. See `docs/DECISIONS.md` ("The
Contact Close: A Soft Sculpture, Sentence Case, More Air") and
`docs/MOTION_SPEC.md` ("Contact Close").

### What changed

- New `src/scripts/motion/ContactSculpture.ts`: pure geometry for an inflated
  orange cushion with a large, soft-shouldered scoop missing from the side
  that faces "muerda" (superellipse minus a sphere, smooth SDF subtraction),
  plus the positions of its light, shade, scoop wall, lip and contact shadow.
  Used by the server render and by the motion, so both draw the same object.
- `ContactSection.astro` rewritten: sentence-case eyebrow "Contacto" and
  headline ("Haz que / tu marca / muerda"), the SVG sculpture rendered at rest
  from the geometry, the channel rows (label, address, arrow, stroke). The
  disc, the inverted headline copy, the rule-top notch, the Instagram tape and
  the stroke runner are gone. The loader script is unchanged.
- `contact-section.css` rewritten: headline left, sculpture right bleeding off
  the edge, channels bottom-left in a 36rem column with a floor of 9svh of air;
  lighter rows (20% ink hairlines, orange stroke, diagonal arrow on hover and
  focus); stacked layout for phones and portrait tablets; reduced-motion
  overrides.
- `ContactBiteMotion.ts` rewritten around the sculpture: one entrance
  choreography (eyebrow, lines, "muerda" deform-reveal, sculpture released
  from a squash, rows), the eased pointer state redrawing the SVG (turn, dent
  and swell, bite opening, drift <= 18px, ~1 s inertia), pressure moving
  "muerda" 1-3px, and the bite (squash plus a deeper scoop).
- `tests/e2e/demo.spec.ts`: my three contact specs rewritten (sentence case,
  collision-free layout and air; follow, dent, 1-3px press on "muerda", bite,
  exact return to rest, diagonal arrow; reduced motion). Only lines inside
  that block were touched or reformatted.
- `CLAUDE.md` module line, `docs/MOTION_SPEC.md`, `docs/DECISIONS.md`.
- `MotionController.ts`, `index.css` and `layout.css` were not touched in
  this pass.

### Measured

| Viewport | Section | Air headline -> rows | Sculpture vs text/rows |
| --- | --- | --- | --- |
| 1920x1080 | 1080 | 159 | clear |
| 1440x900 | 900 | 124 | clear |
| 1366x768 | 768 | 89 | clear |
| 1024x1366 | 1469 (stacked) | sculpture between | clear |
| 768x1024 | 1200 (stacked) | sculpture between | clear |
| 430x932 | 932 | sculpture between | clear |
| 390x844 | 859 | sculpture between | clear |

Horizontal overflow 0 and console clean at every size and under reduced
motion. Interaction on a fine pointer: pressure 0.31 -> 0.67 as the pointer
approaches (inertia), "muerda" moves 2.1px, bite state with the cursor's
pressed pose and release, outline back to exactly its resting path after
leaving, row arrow +5.6/-5.6px, keyboard `:focus-visible` on both rows. One
redraw costs about 0.8 ms and only runs when the state changed.

### Verification (actually run)

- `astro check`: 91 files, 0 errors, 0 warnings, 0 hints. ESLint clean on
  every touched file; Prettier (`--end-of-line auto`) clean on every touched
  file.
- Scratch builds (shared `dist/` and `dist-demo/` untouched): standard 9
  pages, demo 14. `check:production` (patched copy on the scratch output)
  passed: 44 files, 157,998 JS bytes; largest asset 147,558 (the shared
  bundle; another session's lazy services chunk moved Vite's preload helper
  into its own 1,342-byte chunk), `ContactBiteMotion` 6,774, the section
  script 193. `check:links` passed on both.
- Demo suite: 74 passed, 31 skipped, 0 failed; the three contact specs also
  passed three times in a row (21 passed, 6 capability skips). Production
  suite: 62 passed, 10 skipped, 0 failed. Temporary `playwright.contact-*`
  configs were deleted.
- One spec failure found and fixed on the way: the follow test's pointer path
  crossed the piece, so the early pressure read higher than the settled one.
  It now approaches from outside the piece's reach.

### Open items for the user

- Portrait tablets stack the sculpture between the headline and the rows, so
  the section is taller than one screen there (1469px at 1024x1366).
- The eyebrow "Contacto" and the cursor label "Escribir" are structural
  labels, not client copy.

Nothing was committed, pushed or deployed.

## 2026-09-11 Session: Contact Close, Third Pass (Bite Buttons, Sculpture CTA)

Adjustments only, at the user's request; the section was not rebuilt. See
`docs/DECISIONS.md` ("Contact Close: Bite Buttons, And The Sculpture Is The
CTA") and `docs/MOTION_SPEC.md` ("Contact Close").

### What changed

- The eyebrow "Contacto" and its orange dot are gone (markup, CSS, entrance).
- The headline is centred vertically on the stage, with the buttons' height
  mirrored above it, so the headline itself sits on the sculpture's centre
  (1-3px apart at 1920, 1440 and 1366). "muerda" stays orange and italic.
- The channel rows are replaced by two of the hero's `bite-button`s side by
  side under the headline, "Correo ↗" and "Instagram ↗", with the hero CTA's
  `0 0.4rem 0` ink shadow and `data-magnetic`. Their computed radius, shadow,
  fill and border equal `.hero__cta`'s; the hover squeeze is the shared one.
  Phones narrow their side padding so both fit on one line.
- The sculpture is a link to `/contacto/` (accessible name "Contacto"). Only
  its painted form takes the pointer; the white around it is not a hit area,
  and the link's box ends at the stage edge, clear of the edge rail. On hover
  and keyboard focus, in 160 ms: `cursor: pointer`, the form presses 6px onto
  a hard ink shadow in its own silhouette, and "Contacto ↗" appears set into
  the piece; `:active` presses it 14px; keyboard focus adds an ink ring on the
  real silhouette. Touch shows the note and the shadow at rest. The live 3D
  interaction (follow, dent, bite, pressure on "muerda") is unchanged.
- Cursor: the three controls keep the active ring with no text, because the
  shared cursor label is set in capitals.
- Files: `src/components/sections/ContactSection.astro`,
  `src/styles/contact-section.css`, `src/scripts/motion/ContactBiteMotion.ts`
  (the eyebrow tween removed), my contact specs in `tests/e2e/demo.spec.ts`,
  `docs/MOTION_SPEC.md`, `docs/DECISIONS.md`, this file. `MotionController.ts`,
  `index.css` and `layout.css` were not touched.

### Defect found and fixed during QA

The first mouse probe showed no hover and no navigation on the sculpture:
the left block (z-index 2) spans the whole stage and swallowed the pointer
over it. The block now takes no pointer events, the headline shrinks to its
own width and the headline and buttons opt back in. Keyboard focus worked
throughout.

### Verification (actually run)

- Seven sizes plus reduced motion on the dev server: no eyebrow; buttons on
  one line everywhere; no collision between the sculpture and the type or
  buttons; the link box never past the stage; desktop sections exactly one
  screen; horizontal overflow 0; console clean.
- Fine pointer: hover presses the form (`matrix(.985, 0, 0, .975, 0, 6)`),
  shows the shadow and the note, `:active` goes to 14px, a click opens
  `/contacto/`; the empty corner of the link box hits no link; button span
  squeezes to `.97/.94` like the hero's; keyboard focus shows the ring.
- `astro check` 91 files 0/0/0; ESLint and Prettier clean on every touched
  file (the spec reformat touched only lines inside the contact block).
- Scratch builds: standard 9 pages, demo 14; `check:production` passed, 44
  files, 157,903 JS bytes, largest 147,558, `ContactBiteMotion` 6,679;
  `check:links` passed on both. Demo suite: 74 passed, 31 skipped, 0 failed.
  Production suite: 62 passed, 10 skipped, 0 failed. Temporary
  `playwright.contact-*` configs were deleted.

Nothing was committed, pushed or deployed.

## 2026-09-11 Session: Contact Close, Fourth Pass (Type Scale, Cursor Disc)

Adjustments only, at the user's request. See `docs/DECISIONS.md` ("Contact
Close: Manifesto Type Scale, The Hero's Cursor Disc").

### What changed

- Headline at the manifesto's word sizes: desktop
  `clamp(3.06rem, 5.58vw, 5.58rem)` (80px at 1440, 89px at 1920), portrait
  tablets `clamp(4rem, 11vw, 7rem)`, phones `clamp(2.2rem, 12.4vw, 4.6rem)`;
  "muerda" stays 1.3x, orange and italic (104px at 1440).
- The text block is set in from the gutter by `clamp(1.5rem, 4.5vw, 5.5rem)`,
  as the services and Studio headings are (65px at 1440); portrait tablets
  `clamp(1rem, 4vw, 2.5rem)`; phones keep the site gutter.
- "Correo ↗" and "Instagram ↗" start exactly where "muerda" starts (0px at
  every size).
- Hovering the sculpture shows the cursor's "Contacto" disc, as the hero CTA
  does (`data-cursor-label="Contacto"`, measured identical to the hero). The
  note set into the piece is kept for keyboard focus and touch only; the press
  onto the ink shadow and the link to `/contacto/` are unchanged.
- Files: `src/components/sections/ContactSection.astro` (one attribute),
  `src/styles/contact-section.css`, my contact specs in
  `tests/e2e/demo.spec.ts`, `docs/MOTION_SPEC.md`, `docs/DECISIONS.md`, this
  file.

### Verification (actually run)

- Seven sizes plus reduced motion on the dev server: headline centred on the
  sculpture (1-3px), buttons on one line and aligned with "muerda", no
  collision, overflow 0, desktop exactly one screen, console clean.
- Fine pointer: the cursor reads `data-labelled="true"` with "Contacto" over
  the piece, the note stays hidden, the press still applies and a click opens
  `/contacto/`.
- `astro check` 91 files 0/0/0; ESLint and Prettier clean on every touched
  file (the spec reformat touched only lines inside the contact block).
- Scratch builds: standard 9 pages, demo 14; `check:production` passed, 44
  files, 158,289 JS bytes, largest 147,558, `ContactBiteMotion` 6,679;
  `check:links` passed on both. Demo suite: 74 passed, 31 skipped,
  0 failed. Production suite: 62 passed, 10 skipped, 0 failed. Temporary
  `playwright.contact-*` configs were deleted.

Nothing was committed, pushed or deployed.

## 2026-09-11 Session: Edge Menu Order, Servicios Route, Fixed Active State

Navigation only, at the user's request. See `docs/DECISIONS.md` ("Edge Menu:
Servicios Replaces Manifiesto, Route-Only Active State").

### What changed

- `primaryNavigation`: Inicio, Studio, Servicios, Proyectos, Contacto.
- `src/pages/manifiesto.astro` renamed (staged `git mv`) to
  `src/pages/servicios.astro`; `/manifiesto/` no longer exists. Heading,
  title, index and mark read Servicios / 03; "Siguiente" now Proyectos.
- `EdgeMenu.astro`/`EdgeMenu.ts`: the home-scene IntersectionObserver and the
  `data-section-link` attributes are gone; the active item is only the
  server-rendered `aria-current="page"` from the URL, so on `/` it is always
  Inicio (readout 01).
- Links repointed to `/servicios/`: `contacto.astro` route cards (reordered to
  Studio, Servicios, Proyectos), `IntroSection.astro` CTA ("Ver servicios"),
  `studio.astro` "Siguiente Servicios".
- Tests: route lists and labels updated; the demo "reports the current home
  scene" test became "keeps Inicio active across the home scenes"; new
  foundations test "the active route follows the URL, never the home scroll".
- Docs: `MOTION_SPEC.md`, `CONTENT_MODEL.md`, `QA_CHECKLIST.md`, `README.md`,
  `DECISIONS.md`, this file.

### Verification (actually run)

- `astro check` 91 files 0/0/0; ESLint clean; Prettier clean on touched files
  apart from the known CRLF mismatch.
- Scratch builds: standard 9 pages, demo 14; `check:links` passed on both; no
  `/manifiesto/` href remains in either artifact.
- Production suite: 64 passed, 10 skipped, 0 failed. Demo suite: 73 passed,
  31 skipped, 1 failed - `services hand the stage from one to the next`
  (`[data-layer] shared` instead of `1`), in the services sequence another
  terminal was editing at the same time (`ServicesSequence.ts`,
  `services-section.css`, `demo.spec.ts` modified 12:16-12:18). Not caused by
  the navigation change; left to that work.
- Temporary `playwright.navtmp*` configs were deleted.

Nothing was committed, pushed or deployed.

## 2026-09-11 Session: Contact Close Headline About 15% Larger

At the user's request ("aumente un poco el tamaño del titulo"), only the
`--f` token in `src/styles/contact-section.css` changed; indents, the 1.3x
"muerda", button alignment and the sculpture are derived from it and
untouched.

- Desktop `clamp(3.5rem, 6.4vw, 6.4rem)` (92px at 1440, "muerda" 120px),
  portrait tablets `clamp(4.6rem, 12.6vw, 8rem)`, phones
  `clamp(2.5rem, 14.2vw, 5.3rem)`; the `21cqw` cap is kept.
- Verified on the dev server at 1440x1000 (full motion), 1280x720, 834x1112,
  390x844 and 320x720 (reduced motion, touch): headline clear of the
  sculpture, buttons still under "muerda", overflow 0, console clean. At 320
  the two buttons stack on two lines (not compared against the old size).

Nothing was committed, pushed or deployed.

## 2026-09-11 Session: Goodbye Copy

User request: copy only in the panoramic goodbye; structure, photograph,
pan, easing, timing, positions and buttons unchanged.

- `src/data/goodbye.ts`: side A "Las buenas ideas necesitan presión."; CTA
  "Nosotros sabemos dónde apretar." (still the `/contacto/` link with the
  arrow set into its last word); new optional `note` field, "Estrategia ·
  Identidad · Digital · Contenido". The kicker "¿Hablamos?" is unchanged. The
  record stays flagged (photograph on trial, kicker provisional), so `dist/`
  is unchanged.
- `GoodbyeSection.astro`: the headline and the note share one
  `.goodbye-end__headline` wrapper that carries `data-goodbye-reveal`, so the
  timeline still reveals exactly two items and its timing is identical.
- `goodbye-section.css`: `.goodbye-end__note` (label size, sentence case,
  white at 72%). Nothing else changed.
- `tests/e2e/demo.spec.ts`: the goodbye specs look for the new link name and
  the new wrapper (three lines).

Verification: `astro check` 92 files 0/0/0; ESLint and Prettier clean on the
touched files; `build:demo` 14 pages. The scratch sweep (twelve sizes, reduced
motion, no-JS, every frame of both directions) passed: all copy, the note
included, stays on the photograph's black. Screenshots inspected at 1920,
1366, 844x390 and 390. Goodbye specs 9/9.

Open for the user: at 390px the side A headline hyphenates "necesi-tan"
because `.goodbye-start__title` has `hyphens: auto` (pre-existing; "Titular
A" never broke). Setting it to `manual` would keep "necesitan" whole; not done
because the brief was copy only.

Nothing was committed, pushed or deployed.

## 2026-09-11 Session: /studio/ Redesign

User request: rebuild `/studio/` completely (hero, "Somos Colmillo", four
principles, team, close) in the home's language, reusing the project-tile
dent; no fabricated content; the home and other pages untouched.

- New: `src/components/studio/` (`StudioHero`, `StudioIntro`,
  `StudioPrinciples`, `StudioTeam`, `StudioCTA`), `src/data/studioPage.ts`,
  `src/styles/studio-page.css` (imported in `index.css`, layer `sections`),
  `src/scripts/motion/PressSurface.ts` (the dent extracted from
  `ProjectTilePress.ts`, behaviour unchanged), `StudioPage.ts` (loader run by
  `MotionController`), `StudioPageMotion.ts` (route-only chunk; its dynamic
  import lives in the page's own script), `tests/e2e/studio.demo.spec.ts`,
  `tests/e2e/studio.spec.ts`.
- Changed: `src/pages/studio.astro` (rewritten: the demo `studio-process`,
  the "S" mark, "02 / Studio", the kicker, the flag and the "Siguiente" cards
  are gone), `ProjectTilePress.ts` (calls `PressSurface`),
  `src/config/assets.ts` (+ `studioHeroMedia`, `null`), `MotionController.ts`
  (+ `initStudioPage`), `index.css` (+1 import), `layout.css` (dead
  `studio-process` and `editorial-page__mark--studio` rules removed),
  `playwright.config.ts` / `playwright.demo.config.ts` (route the new specs),
  `tests/e2e/demo.spec.ts` (one Studio assertion), `DECISIONS.md`,
  `MOTION_SPEC.md`, `CONTENT_NEEDED.md`, `CLAUDE.md`.
- Standard build: `/studio/` renders the hero (geometric placeholder disc, no
  development note) and the close only. The intro, principles and team are
  demo-only because their copy is provisional and the team is placeholders.
- JS budget: with the motion in the shared bundle it measured 152,176 bytes
  against 150,000. Now: shared 147,021, Studio chunk 5,150, total 163,444.

Verification (executed): `astro check` 0/0/0; ESLint clean; Prettier applied
to every new file; `build` 9 pages; `check:production` passed; `build:demo`
14 pages. Standard Playwright suite 66 passed / 10 skipped (before the page
script moved into the layout slot), then `studio.spec.ts` + performance 4/4.
Demo: `studio.demo.spec.ts` 12 passed / 6 skipped over the three projects;
the Studio-related `demo.spec.ts` tests (destinations, 320px, 200% text,
routes without errors) 8 passed / 4 skipped. The full `demo.spec.ts` was not
run. Scratch QA on the demo build at 1920x1080, 1440x900, 1366x768,
1024x1366, 768x1024, 430x932 and 390x844: overflow 0, console clean;
screenshots inspected; hover, keyboard (arrows, Home, End, Tab), touch tap,
reduced motion, no JavaScript, the dent and its release, and two motion
restarts checked.

Incident: the concurrent dev server on :4321 (another terminal) cached a
failed resolution of `./studio-page.css`, because the `@import` landed a few
seconds before the file. Every route there returns 500 until it is restarted
(`astro dev stop`, then `npm run dev`). Builds are unaffected. It was not
restarted from this session because the process belongs to another terminal.

Open: the hero loop, the four principle images, the team, and approval of the
copy and section titles (`CONTENT_NEEDED.md`).

Nothing was committed, pushed or deployed.

## 2026-09-14 Session: Home Hero Loop Replaced By The Client's Final Video

User request: swap only the home hero animation for
`public/assets/motion/hero/animacion hero final.webm`; no redesign. Run while
another terminal was editing `/studio/` (its `src/components/studio/*`,
`src/data/studioPage.ts` and the `studioHeroMedia` comment in `assets.ts` are
not part of this work).

### The master, measured

VP9 3840x2160 (16:9), 30 fps, 19.883 s, 3,778,945 bytes, bt709 tv range, plus
an unused Opus track. No alpha (no `alpha_mode`). Two defects, measured per
frame with ffmpeg `signalstats` and in Chromium: frames 0-5.40 s sit on Y 232
(`#fafafa`-`#fbfbfb`), frames 5.43-19.88 s on Y 235 (`#ffffff`) with a ~3 px
black line on all four edges, so the page would show a faint grey box, then a
frame, and a background jump at every wrap. The user chose a clean derivative
(original untouched). Drawn content across all frames spans x 690-3086 of 3840
and the full height (a book falls in from the top edge at ~11.3-12.1 s).

### Derivatives (ffmpeg 9.0.1 essentials, via an earlier scratchpad build)

Master per target (desktop 1440x1080, mobile 768x576):
`-an -vf crop=2832:2124:504:18,scale=W:H:flags=lanczos,format=rgb24,lutrgb=r|g|b='min(255,val*255/250)':enable='lt(t,5.42)',lutrgb=r|g|b='if(gte(val,248),255,val)',format=yuv420p -c:v ffv1`
with bt709/tv tags. The crop is 4:3 (fits the existing frame), removes the
frame line and only blank paper; the lift touches only the grey segment.
Then WebM `libvpx-vp9 -b:v 0 -crf 40` (mobile 42) `-row-mt 1 -auto-alt-ref 1
-lag-in-frames 25 -deadline good -cpu-used 1`, MP4 `libx264 -profile:v high
-crf 23 -preset slow -movflags +faststart`, poster frame 0 `libwebp -quality 86`.

- `hero-final-desktop-white.webm` 975,502 B; `.mp4` 1,332,820 B
- `hero-final-mobile-white.webm` 452,142 B; `.mp4` 630,456 B
- `hero-final-poster-white.webp` 24,612 B (1440x1080)

Decoded check on all four files, every frame: left/right strips Y 235
(#fff) throughout, no dark pixel on any edge except the falling book.

### What changed

- `src/config/assets.ts`: `heroMedia` points at the `hero-final-*-white` set,
  `width`/`height` 1440x1080 (was 1920x1440, same 4:3), comment rewritten.
- `tests/e2e/foundations.spec.ts`: expected sources and poster.
- Not changed: `HeroSection.astro` (autoplay, muted, loop, playsinline, no
  controls, `preload="metadata"`, poster, `<source media>` switch at 48rem),
  `hero-section.css` (frame 4:3, `object-fit: contain`, white frame),
  `HeroMotion.ts` (viewport/tab pause, intro hold), reduced-motion poster.
  The earlier `hero-*-white` and cream files and the master stay in place.

### Verification (actually run)

- `check:hero` passed (8 files baked for white); Prettier clean on both files;
  ESLint clean; `astro check` 103 files 0/0/0; `build` 9 pages;
  `check:production` passed (58 files, 163,444 JS bytes); `build:demo` 14.
- Playwright: foundations + intro 62 passed / 10 skipped; demo `-g hero`
  (composition, fixed controls) 6/6.
- Dev server at 1440x1000, 1920x1080, 834x1112 (touch), 390x844, 320x720:
  the right source loads (desktop webm / mobile webm), playing and advancing,
  wraps from 19.6 s to 0.6 s still playing, frame and hero `rgb(255,255,255)`,
  no border/filter/blend, pixels 3 px inside and outside all four frame edges
  all 255, CLS 0, overflow 0, no console errors. Frame geometry identical to
  before the swap under the same conditions. Reduced motion: video hidden,
  new poster shown. Screenshots inspected at 1440, 390 and reduced motion.

Open: the master (3.8 MB) sits in `public/` and ships in `dist/` unreferenced
(left there at the user's instruction; `media-src/` is the usual home). The
animation's last and first frames are different poses, so the wrap is a cut
in the drawing itself (background now continuous).

Nothing was committed, pushed or deployed.

## 2026-09-14 Session: /studio/ Second Design Pass (Dark Editorial)

User request: a second design pass on `/studio/` only (Hello Monday product
page as tone reference): whole route charcoal, hero corrected, content
centred, smaller type, "Somos Colmillo" simplified with an entry animation,
"Cómo hacemos las cosas" redesigned without numbers. Run concurrently with
the home hero video swap above (another terminal); that work (`heroMedia` in
`assets.ts`, `foundations.spec.ts`, the `hero-final-*` files and its section
of this document) was not touched. See `DECISIONS.md` (2026-09-14).

- Changed: `src/components/studio/StudioHero.astro`, `StudioIntro.astro`,
  `StudioPrinciples.astro` (rewritten), `StudioCTA.astro`, `StudioTeam.astro`
  (container and tone only), `src/styles/studio-page.css` (rewritten),
  `src/scripts/motion/StudioPageMotion.ts` (reveal rule, principles as
  disclosures, drift removed), `src/data/studioPage.ts` (intro title
  "Somos Colmillo", accent split, principle `index` removed),
  `src/config/assets.ts` (`studioHeroMedia` comment only),
  `tests/e2e/studio.demo.spec.ts` (rewritten), `tests/e2e/studio.spec.ts`,
  `tests/e2e/demo.spec.ts` (one selector), `CLAUDE.md` (one line),
  `MOTION_SPEC.md`, `CONTENT_NEEDED.md`, `DECISIONS.md`.
- No shared component, token, layout or other route was modified. The dark
  document/footer on this route is a scoped `html:has([data-studio-page])`
  override in `studio-page.css`.

Measured on the demo build (scratch Playwright script, fine pointer at
landscape sizes, touch at portrait sizes):

| Viewport | Title / frame middle | Frame L-R | h2 | h3 | Principles list / picture |
| --- | --- | --- | --- | --- | --- |
| 1920x1080 | 540 / 540 | 960-1760 | 80 | 56 | 668 / 380 px |
| 1440x900 | 450 / 450 | 720-1373 | 64.8 | 43.2 | 668 / 380 px |
| 1366x768 | 384 / 384 | 683-1301 | 61.5 | 41 | 668 / 380 px |
| 1024x1366 | stacked | 83-941 | 46 | 30.7 | 498 / 283 px |
| 768x1024 | stacked | 75-693 | 40 | 28.8 | 358 / 204 px |
| 430x932 | stacked | 16-362 | 40 | 28.8 | picture under list, 288 px |
| 390x844 | stacked | 16-322 | 40 | 28.8 | picture under list, 288 px |

At every size: horizontal overflow 0, console clean, no "Loop pendiente",
no disc, no 01-04 in the principles, the open description directly under
its name, the chosen picture in view after hover/tap, and a full-document
paint sample (two x positions, three heights, every 40% of a screen) found
only `#1f1f1f`, the placeholder surfaces and the team portrait blocks - no
light band anywhere, footer included. Keyboard (arrows, End, wrap) and
reduced motion checked; screenshots inspected at all seven sizes.

Verification (executed): `astro check` 103 files 0/0/0; `npm run lint`
clean; Prettier applied to every rewritten file and clean on the edited
ones; `build` 9 pages; `check:production` passed (58 files, 162,421 JS
bytes); `check:links` passed; `build:demo` 14 pages. Demo Playwright suite
(all of `demo.spec.ts` + `studio.demo.spec.ts`): 93 passed / 45 skipped.
Standard suite: 65 passed / 10 skipped / 1 failed - `performance.spec.ts`
(home), which ran concurrently with the demo suite; rerun alone it passed
2/2.

Open: the hero loop, the four principle pictures, the team, and approval of
the provisional copy and section titles (`CONTENT_NEEDED.md`).

Nothing was committed, pushed or deployed.

## 2026-09-14 Session: Goodbye Headline Held To Three Lines

User request: on the home, "Las buenas ideas necesitan presión." (goodbye
stage, side A) must take three lines at most.

Before: 4 lines at 1920x1080, 1366x768, 1280x720 and 844x390 - the wide
column is cut to the photograph's black field, but the type followed the
viewport, not that column. At 360 and 320 px wide it kept 3 lines only by
hyphenating "necesi-tan".

Change (`src/styles/goodbye-section.css` only): both layouts cap the title's
font size at the width left beside the arrow divided by 7.3em ("ideas
necesitan", the widest line, measures ~6.9em in the system face), with
`hyphens: manual`. Wide: `(--goodbye-w * 0.26 - gutter - arrow - gap) / 7.3`,
the arrow size now shared as `--goodbye-travel-size`; floor lowered to
1.25rem for landscape phones. Band: `(100vw - 2 gutters - edge clearance -
4.25rem) / 7.3`. The divisor is tied to this headline; retune it if the copy
changes. Fonts are smaller where the old size broke the rule (1920: 104 ->
77 px, 1366: 76 -> 53 px, 390: 39 -> 36 px); unchanged elsewhere.

Verified on the dev server (Playwright, 21 viewports from 2560x1440 to
320x720, landscape phones included): 3 lines or fewer everywhere (2 on
tablets), no word split, no horizontal overflow, console clean. Screenshots
after real scrolling inspected at 1920x1080, 1366x768, 1280x720 (reduced
motion), 844x390, 740x360, 390x844, 360x740 and 320x720: the copy stays in
the black field and clear of the arrow. Prettier clean on the file;
`build:demo` 14 pages; the three goodbye tests in `demo.spec.ts` passed on
all three demo projects (9/9).

Nothing was committed, pushed or deployed.

## 2026-09-14 Session: /studio/ Third Refinement Pass

User request: refine `/studio/` only (alignment, copy, step names, team
composition, close, one continuous scroll element). Built on the uncommitted
second pass; the untracked `hero-final-*` home files and other routes were
not touched. See `DECISIONS.md` (third pass) and `MOTION_SPEC.md`.

- New: `src/components/studio/StudioRing.astro`,
  `src/scripts/motion/StudioOrbit.ts`.
- Changed: `src/pages/studio.astro` (orbit element), `StudioHero.astro`,
  `StudioIntro.astro`, `StudioPrinciples.astro`, `StudioTeam.astro`,
  `StudioCTA.astro`, `src/data/studioPage.ts`, `src/styles/studio-page.css`,
  `src/scripts/motion/StudioPage.ts` (passes ScrollTrigger),
  `StudioPageMotion.ts` (orbit mount, ring/detail reveals, picture follows
  the open row), `tests/e2e/studio.demo.spec.ts`, `CLAUDE.md`,
  `MOTION_SPEC.md`, `DECISIONS.md`, `CONTENT_NEEDED.md`.

Measured at 1440x900 (demo, dev server): Somos title/text, principles, team
and close content all start at x 144 and end at 1296; Somos text 668 px =
principles list 668 px; team tops 0 / +65 / +29 px; picture 336x420, offset
-24 px (Mirar) to lower rows; close title one line, 97 px box, no clipping
ancestor. Orbit sampled every 150 px of scroll from top to bottom: position
continuous (no step above ~220 px per 150 px scrolled), opacity 0.51-0.85,
back on the hero stop after fast jumps top/bottom/middle/top; lands on the
Somos ring within 4 px and on the close dot, then fades to 0. Pointer 60 px
from the ring leans/stretches it and it settles back. Pixel 7: orbit not
displayed, still ring shown, overflow 0. Reduced motion: orbit not
displayed, still ring static. Console clean. Screenshots inspected: hero,
Somos (rest and in transit), principles, team, close (and zoomed dot and
title glyphs), pointer response, 390 Somos and close, reduced Somos.

Verification (executed): `astro check` 105 files 0/0/0; ESLint clean on
the changed scripts, data and spec; Prettier applied to changed files;
`build` 9 pages; `check:production` passed (58 files, 168,694 JS bytes);
`check:links` passed; `build:demo` 14 pages; `studio.demo.spec.ts` on the
three demo projects 29 passed / 22 skipped (desktop-only tests skip on
touch).

Open: approval of the renamed steps' copy, the "Equipo" title, the orbit as
a permanent element, and all content still listed in `CONTENT_NEEDED.md`.

Nothing was committed, pushed or deployed.

### Follow-up (same day): Somos Colmillo text at full section width

User request: the "Somos Colmillo" text should be as wide as the section
below. Its paragraphs now span the whole 72rem container (the width of
"Cómo hacemos las cosas": title, list and picture), same type as before; the
still ring (and the orbit's stop) moved up beside the rule and heading, in
the picture's column. `studio-page.css`, `StudioIntro.astro` comment and the
container test in `studio.demo.spec.ts` changed.
Because full-width text sits between the Somos stop and the principles stop,
the orbit's path must cross it; the orbit now docks at Somos when the ring is
30% down the screen and fades to 12% wherever its box covers text blocks
(`TEXT_BLOCKS` in `StudioOrbit.ts`, rects measured on ScrollTrigger refresh,
no layout reads per frame). Measured with a scroll sweep (every 40 px) at
1440x900, 1920x1080, 1366x768 and 1100x800.

## 2026-09-14 Session: /studio/ Close Rebuilt On The CTA Photograph

User request: redesign only the Studio close with
`public/assets/motion/studio/bg cta studio.png`. Parallel-terminal files
(`FINAL ANIMACION.mp4`, `WEB.mp4`, `hero-final-*`, `goodbye-section.css`,
`assets.ts`, `foundations.spec.ts`, `demo.spec.ts`) were not touched.

Files: `src/components/studio/StudioCTA.astro` (rewritten),
`src/data/studioPage.ts` (`image` on the close),
`src/styles/studio-page.css` (close block rewritten),
`src/scripts/motion/StudioPageMotion.ts` (`initClose`; unused hairline
reveal removed), `src/scripts/motion/StudioOrbit.ts` (comment only),
`tests/e2e/studio.demo.spec.ts`, new
`public/assets/motion/studio/studio-cta.webp`; docs `MOTION_SPEC.md`,
`DECISIONS.md`, this file. The PNG master is untouched (it ships in `dist/`
unreferenced, 2.1 MB; `media-src/` would be its usual home - left for the
user to decide).

Measured on the dev server (copy left-right / sculpture start / section
height): 1920x1080 160-850 / 927 / 1024; 1440x900 67-607 / 738 / 900;
1366x768 65-577 / 678 / 768; 1024x768 55-439 / 568 / 768; iPad Mini and
Pixel 7 stacked (copy on top, band below). Overflow 0 everywhere, console
clean, fast scroll top/bottom/middle settles with clip `inset(0%)`, pointer
shift -2.4/3.2 px over the sculpture and 0 over the copy, reduced motion
clip `none` and image transform `none`. Screenshots inspected: 1440, 1920,
1024, entrance at 90% and 60%, title glyph crop, tablet, phone, reduced.

Verification: `astro check` 0/0/0; ESLint and Prettier clean on the changed
files; `build` 9 pages; `check:production` passed (62 files, 171,024 JS
bytes); `check:links` passed; `build:demo` 14 pages; Playwright demo
`studio.demo.spec.ts` + `demo.spec.ts` 105 passed / 57 skipped, standard
`studio.spec.ts` 2 passed.

Nothing was committed, pushed or deployed.

## 2026-09-14 Session: /studio/ Hero Loop Published

The user supplied `public/assets/motion/studio/video hero studio.mp4` (H.264
1280x720, 24 fps, 144 frames, 6.02 s, with an AAC track) for the `/studio/`
hero. It is kept untouched. `studioHeroMedia` in `src/config/assets.ts` now
points at three derivatives in `public/assets/motion/studio-page/`:
`studio-hero-loop.webm` (VP9, 570 KB), `studio-hero-loop.mp4` (H.264 High,
faststart, no audio, 592 KB) and `studio-hero-poster.webp` (27 KB), all
960x720. The component, layout and motion code were already written for the
slot, so nothing else in the hero changed (`autoplay muted loop playsinline`,
no controls, `preload="metadata"`, `object-fit: contain`, paused off screen, in
a hidden tab and under reduced motion by `initHeroLoop`).

What the derivatives change, and why (measured on every frame):

- Crop 960x720 at x=192. The drawing spans x 259-1086, y 106-654 over the whole
  clip, so a 4:3 crop keeps every drawn pixel with at least 66 px of air and
  matches the existing 4:3 frame. No `cover`, no scaling of the art.
- Seam. The master's last pose is not its first: the 144->1 difference was
  15.4 against a normal frame step of 1.4 (max 3.9), and no frame comes close
  to frame 1. Frames 9-136 play unchanged and the last eight dissolve into the
  first eight (a 12-frame dissolve read as a double exposure and was dropped).
  Encoded wrap difference 3.9, inside the normal step range.
- Ground. The master's flat ground is #161616 (19-25, no vignette), which read
  as a darker rounded box on the route's #1f1f1f. A black-level lift
  `v + 9.85 * (1 - v/255)` per channel puts it at 31; cream strokes go 240 ->
  241. Screenshots now show edge pixel 31 inside and outside the frame.

Tooling: no ffmpeg on PATH; the ffmpeg binary bundled with the user's Remotion
project (`@remotion/compositor-win32-x64-msvc`) decoded and encoded, sharp did
the crop/dissolve/lift on PNG frames. VP9 `-crf 34 -b:v 0 -row-mt 1
-deadline good -cpu-used 1`; x264 `-preset slow -crf 22 -profile:v high
-movflags +faststart`; both `-pix_fmt yuv420p -an`, 24 fps.

Why `studio-page/`: `check:hero` treats every `/assets/motion/(hero|studio)/`
path in `assets.ts` as a white-baked home loop and failed on the charcoal set;
the slot's own comment had reserved `motion/studio-page/`.

Tried and reverted: widening the hero measure to 110rem so the frame reaches
~46% of a 1920 screen. It moved the hero's left edge 80 px, which the Studio
close aligns to (`studio.demo.spec.ts` "the close is a photographic stage"
failed), so the layout is unchanged: the frame is 45.3% of 1440, 45.2% of
1366 and 41.7% of 1920 (capped by the 100rem measure).

Measured in Google Chrome on `dist-demo`: playing from `studio-hero-loop.webm`
at 1920x1080, 1440x900, 1366x768, 1024x1366, 834x1112, 768x1024, 430x932,
390x844 and 320x720; frame vertically centred on landscape (offset 0), title
over frame on portrait; overflow 0; no hero placeholder; no 4xx or page
errors; seeking to 0.5 s before the end continued at 0.26 s still playing;
reduced motion paused at 0 on the poster.

Verification: `astro check` 0/0/0; ESLint clean on the changed files; `build`
9 pages and `build:demo` 14 pages; `check:hero` passed (8 files);
`check:production` passed (66 files, 171,024 JS bytes); Playwright standard
`studio.spec.ts` 2 passed, demo `studio.demo.spec.ts` 31 passed / 26 skipped.
Tests updated: both Studio specs now expect the loop (muted, loop, autoplay,
playsInline, no controls, `aria-hidden`) instead of the placeholder.

Files: `src/config/assets.ts` (`studioHeroMedia`), `tests/e2e/studio.spec.ts`,
`tests/e2e/studio.demo.spec.ts`, `docs/CONTENT_NEEDED.md` (hero loop item),
this file; new `public/assets/motion/studio-page/` (3 files). Open for the
client: approval of the crop, dissolve and lift, or a re-export on #1f1f1f
with matching first/last poses. Nothing was committed, pushed or deployed.

## 2026-09-14 Session: /servicios/ Rebuilt As A Stack Of Editorial Layers

User request: redesign `/servicios/` completely, keeping the overlapping
section effect as the page's main mechanic: charcoal hero ("Servicios."),
Estrategia (white), Identidad (orange), Digital (black), Contenido (white)
and a black closing decision ("Ahora toca verlo en acción.", "Ver proyectos"
and "Hablemos"). Working tree was clean at start (HEAD `2853c70`, in sync
with `origin/main`). A dev server from another terminal was running on
`localhost:4321`; it was used for QA and left running. See `DECISIONS.md`
and `MOTION_SPEC.md` ("Services Page").

- New: `src/components/services/ServicesHero.astro`, `ServiceSection.astro`,
  `ServicesClose.astro`, `ServiceMedia.astro`; `src/data/servicesPage.ts`;
  `src/scripts/motion/ServicesPage.ts`, `ServicesPageMotion.ts` (route
  chunk); `src/styles/services-page.css`; `tests/e2e/services.spec.ts`,
  `tests/e2e/services.demo.spec.ts`.
- Changed: `src/pages/servicios.astro` (rewritten), `src/config/assets.ts`
  (`PageMedia` type, `servicesHeroMedia = null`), `src/styles/index.css` (one
  import), `MotionController.ts` (mounts `initServicesPage`),
  `SectionStack.ts` (`[data-stack-content]` accepted beside
  `.content-shell`), `SurfaceTone.ts` (last surface in document order crossing
  the band, see `DECISIONS.md`), `tests/e2e/demo.spec.ts` (Servicios
  assertions), `playwright.config.ts` / `playwright.demo.config.ts` (new demo
  spec registered), `CLAUDE.md`, `MOTION_SPEC.md`, `DECISIONS.md`,
  `CONTENT_NEEDED.md`, this file.
- Not touched: other routes' markup/CSS, the home services data, global
  cursor/menu/Instagram/footer components, Vercel, git history.
- Standard build: the four layers are provisional copy, so `dist/` renders
  the hero and the close only (no `data-dev-placeholder`). Demo build and dev
  render all six layers.

Measured on the dev server (scratch Playwright scripts; landscape sizes with
a fine pointer, portrait sizes with touch). At 1920x1080, 1440x900 and
1366x768 all six layers are sticky, each service rests 26svh (234 px at 900)
before the next rises, content fits the screen (1366x768 included), a hit-test
sweep every 6% of a screen plus fast jumps bottom/top/middle found no point
where anything but a layer or the footer is painted, and every layer's content
is at full opacity after arrival. At 1024x1366, 768x1024, 430x932 and 390x844
layers are relative and tucked 1.25-2rem under the previous one; same sweep,
no gap. All seven: horizontal overflow 0, hero height = viewport, h1
"Servicios", h2 Estrategia/Identidad/Digital/Contenido/close, "Servicios"
current in the menu, console clean. Surface tone at rest: light, accent, dark,
light (was "dark" everywhere before the `SurfaceTone.ts` fix); cursor ring ink
over the orange. Capability hover: text 5 px, dot 1, rule drawn, art -6 px.
Close hover/focus swap fill and slab. Reload in the middle of Digital and a
1440->1366 resize mid-page: bands and compression still correct. Reduced
motion at 1440 and 390: layers relative, no rest margin, no hero entrance,
nothing hidden, no gap. Home tone sweep (every 450 px at 1440): one 5 px
window at services/projects where the centre still shows services.
Screenshots inspected: every layer rising and at rest at 1440, 1920 and 1366,
tablets and phones, capability hover, close hover and focus, reduced-motion
boundaries, and the standard build (hero/close) at 1440 and 390.

Verification (executed): `astro check` 114 files 0/0/0; ESLint clean on every
changed script, data, page, component and spec; Prettier applied to the new
files and clean on the edited ones (`SectionStack.ts` and `SurfaceTone.ts`
only differ by their pre-existing CRLF working copy); `build` 9 pages;
`check:production` passed (68 files, 174,659 JS bytes; shared bundle 147,369
bytes, route chunk ~3.1 KB); `check:links` passed; `build:demo` 14 pages.
Playwright, run one suite after the other: standard (all specs, desktop
Chromium + Pixel 7) 68 passed / 10 skipped; demo (`demo.spec.ts`,
`studio.demo.spec.ts`, `services.demo.spec.ts` on fine-1440, touch-834 and
touch-390) 117 passed / 63 skipped / 0 failed. A first run of the new sweep
test hit the 30 s default while seven workers shared the CPU; it now sets
90 s and samples every 16% of a screen.

Open for the client (`CONTENT_NEEDED.md`): approval of the service claims,
descriptions and capabilities; final media per service (the home
illustrations stand in on dark plates); the hero piece; optional CTAs and
related projects; the close wording. Now-unused `.editorial-page*` and
`.manifesto-statement*` rules remain in `layout.css` for a separate clean-up.

Nothing was committed, pushed or deployed.

## 2026-09-15 Session: /studio/ Principles And Team On The Hero Measure

User request: widen only "Cómo hacemos las cosas" and "Equipo" on `/studio/`
so they use the hero's wider grid; no other change to structure, type, motion,
copy or other sections/routes. The working tree already held the other
terminal's uncommitted `/servicios/` work (listed above); no Studio file was
dirty, and none of that work was touched. See `DECISIONS.md`.

- `src/styles/studio-page.css`: `.studio-principles__inner` and
  `.studio-team__inner` set `--studio-measure: 100rem` (was 72rem), the
  hero's and the close's value; the side padding is unchanged (page gutter +
  edge-rail clearance, 65-80 px on desktop). Team wide grid:
  `repeat(3, minmax(0, 24rem))` with `justify-content: space-between` (the
  gap stays as a minimum), so portraits reach both edges instead of scaling up.
  Comments updated. Somos Colmillo stays on 72rem.
- `tests/e2e/studio.demo.spec.ts`: the shared-container test now checks the
  hero/principles/team edges at 1920, 1440, 1366 and 1100, and that Somos
  Colmillo's paragraphs fill its own, narrower container.

Measured on the dev server (content edges, px): 1920 hero/principles/team
160-1760 (before 384-1536), 1440 67-1373 (before 144-1296), 1366 65-1301
(before 107-1259). Principles list 928/757/717 px wide (was 668), picture
still 336 px, h3 size unchanged. Portraits 384/384/376 px wide (was
333/346/348), columns at 160/768/1376 on 1920, vertical steps unchanged
(0/80/38 at 1920, 0/65/29 at 1440). Below about 1290 px nothing changes.
No horizontal overflow, console clean; screenshots inspected at all three
widths.

Verification (executed): `astro check` 114 files 0/0/0; Prettier and ESLint
clean on both changed files; `studio.demo.spec.ts` run against the dev server
on fine-1440/touch-834/touch-390 (temporary scratch config, to avoid
rebuilding the shared `dist-demo` while another terminal works): 31 passed,
26 skipped, 0 failed. `build:demo` and the full suites were not re-run.

Nothing was committed, pushed or deployed.

## 2026-09-15 Session: /studio/ Team As Landscape Editorial Portraits

User request: only the "Equipo" section, structured like the Mondayteers
grid on hellomonday.com/about (inspiration only; its lazy grid did not mount
in headless Chromium, so the user's explicit numbers were followed): three
members, equal landscape pictures (about 560x400), three wide columns across
the section, a very soft 40-90 px step, no card look, name/role under each
picture on its left edge, the existing press dent kept. Nothing else on the
route or elsewhere changed; the other terminal's `/servicios/` work untouched.

- `src/data/studioPage.ts`: demo team has 3 placeholder members (was 6).
- `src/styles/studio-page.css` (team only): frame `aspect-ratio: 7 / 5` for
  every member (the middle 3:4 override is gone), `border-radius: 0.25rem`,
  more air above the name (`clamp(1.1rem, 1.6vw, 1.6rem)`). Wide screens:
  `repeat(3, minmax(0, 1fr))`, gap `clamp(1.25rem, 2.2vw, 2.75rem)`; first
  member `margin-block-start: clamp(3rem, 4.5vw, 5.5rem)`, second 0, third
  `clamp(1.5rem, 2.4vw, 3rem)`. Tablets (>= 40rem): two columns, the second a
  `clamp(1.5rem, 3vw, 2.5rem)` step. Phones: one full-width column, the old
  narrow alternating layout removed.
- `PressSurface.ts` unchanged: depth and span already scale from the short
  side (about 22 px deep on a 505x361 picture); inspected on right, top and
  bottom edges at 1440, no stretching.
- `StudioTeam.astro`: header comment only.
- `tests/e2e/studio.demo.spec.ts`: 3 members; the step test now checks equal
  landscape frames and name alignment on every project, full-width columns
  and the soft step on fine-1440, two columns on touch-834, one on touch-390.

Measured on the dev server (frame WxH; member tops relative to the second):
1920 505x361, columns 160/707/1255 to 1760, +86/0/+46; 1440 414x296,
67 to 1373, +65/0/+35; 1366 392x280, +62/0/+33; 834 two columns 327x234,
second +25; 390 one column 306x219. Name 23-31 px under its picture, on its
left edge. No horizontal overflow, console clean.

Verification (executed): `astro check` 0/0/0; Prettier and ESLint clean on
the changed files; `studio.demo.spec.ts` on the dev server (scratch config):
33 passed, 24 skipped, 0 failed. `build:demo` and the full suites were not
re-run.

Nothing was committed, pushed or deployed.

## 2026-09-15 Session: /studio/ Somos Colmillo Starts On The Next Section's Edge

User request: align "Somos Colmillo" so its start coincides with the next
section ("Cómo hacemos las cosas"). Measured first: after the widening
earlier today it started to the right of it (1920: 384 vs 160; 1440: 144 vs
67; 1366: 107 vs 65), so the start was moved onto that edge.

- `src/styles/studio-page.css`: `.studio-intro__inner` sets
  `--studio-measure: 100rem` (the principles' container); `.studio-intro__copy`
  gets `max-inline-size: 72rem`, so the paragraphs keep their former line
  length and type. Grid (58/33, 9% gap), rule, heading, ring and motion
  unchanged.
- `StudioIntro.astro`: header comment only.
- `tests/e2e/studio.demo.spec.ts`: the container test includes
  `.studio-intro__inner` again; paragraphs start on the principles' edge and
  are at most 72rem wide.

Measured on the dev server: rule/heading/text start at 160 (1920), 67 (1440)
and 65 (1366), the same as the principles' heading and list; paragraphs 1152
px wide; the still ring is centred over the principles' picture column (1496
at 1920, 1157 at 1440). 1100, 834 and 390 identical to before. No overflow,
console clean; screenshots inspected at 1920, 1440 and 1366.

Verification (executed): `astro check` 0/0/0; Prettier and ESLint clean on
the changed files; `studio.demo.spec.ts` on the dev server (scratch config):
33 passed, 24 skipped, 0 failed. `build:demo` and the full suites were not
re-run.

Nothing was committed, pushed or deployed.

## 2026-09-15 Session: /servicios/ Media Unified, Layers Alternate

User request: layout adjustments only on the four service layers. Git was
checked first: another terminal is working on `/studio/`
(`studio-page.css`, `studio.demo.spec.ts`, docs); none of its files were
touched and the doc notes here were appended at the end.

- `src/data/servicesPage.ts`: `mediaScale` removed; Contenido `layout`
  becomes `media-text`.
- `src/components/services/ServiceSection.astro`: `data-media-scale`
  removed (comment updated).
- `src/styles/services-page.css`: the `bleed` and `compact` rules removed,
  so every layer uses the shared 4:3 plate; comment updated.
- `tests/e2e/services.demo.spec.ts`: asserts the alternating layouts and
  that the four plates share one layout size (`offsetWidth`/`offsetHeight`,
  because a covered layer is scaled by the stack's compression).
- `docs/DECISIONS.md` (2026-09-15 entry).

Measured on the dev server with each layer at rest: plates on the right,
left, right, left; frames 698x524 (1920x1080), 657x493 (1440x900), 622x467
(1366x768) in all four layers; horizontal overflow 0; no page errors.
Screenshots inspected at 1920 and 1440 for Estrategia, Identidad, Digital and
Contenido.

Verification (executed): `astro check` 0/0/0; ESLint and Prettier clean on
the changed files; `build:demo` 14 pages; `build` 9 pages;
`check:production` passed (68 files, 174,659 JS bytes);
`services.demo.spec.ts` on fine-1440/touch-834/touch-390 12 passed / 6
skipped; `services.spec.ts` 2 passed. The full suites were not re-run.

Nothing was committed, pushed or deployed.

### Follow-up (2026-09-15): Identidad claim in two lines

User request: Identidad's claim should set in two lines like the other
services, changing the wording if needed. Measured before: 3 lines at
1920x1080 and 390x844 (63 characters). The provisional claim in
`src/data/servicesPage.ts` became "Una marca se reconoce antes de leer su
nombre." (46 characters). Measured after on the dev server: all four claims
take 2 lines at 1920x1080, 1440x900, 1366x768, 1024x1366, 768x1024, 430x932
and 390x844. Prettier and ESLint clean. `CONTENT_NEEDED.md` already lists the
claims as awaiting approval. Nothing was committed, pushed or deployed.

## 2026-09-15 Session: /servicios/ Hero Loop Published

Scope: the /servicios/ hero only (user direction). Service layers, stack,
close, /studio/, home, navigation, edge menu and cursor untouched.

- Files: `src/config/assets.ts` (`servicesHeroMedia` filled),
  `src/components/services/ServicesHero.astro`, `src/styles/services-page.css`
  (hero block only), `public/assets/services/servicios-hero-poster.webp` (new),
  `tests/e2e/services.demo.spec.ts` (new hero loop test, reduced-motion pause
  check), `tests/e2e/services.spec.ts` (loop ships in `dist`),
  `docs/CONTENT_NEEDED.md`, `docs/DECISIONS.md`.
- Source file kept under its name with spaces; referenced URL-encoded.
- Verified against the dev server with Playwright at 1440x1000, 1112x834,
  834x1112, 390x844, 320x720, 1280x640 and reduced motion at 390: MP4 206,
  playing and advancing, `autoplay loop muted playsinline`, no controls, CLS 0,
  no horizontal overflow, 16:9 frame inside the viewport, no overlap with the
  title, no console errors; paused under reduced motion.
- Open: the loop's wrap is a small cut (last frame differs from the first);
  the file carries an unused audio track. Both listed in `CONTENT_NEEDED.md`.

## 2026-09-15 Session: /servicios/ Plates Press Like The Studio Team

Scope: hover interaction on the four service plates only.

- Files: `src/components/services/ServiceSection.astro` (fixed frame wrapping
  the plate surface), `src/components/services/ServiceMedia.astro` (optional
  `press` prop -> `data-press-surface`), `src/styles/services-page.css`
  (`.service-layer__frame` / `.service-layer__surface` only),
  `src/scripts/motion/ServicesPage.ts` and `ServicesPageMotion.ts`
  (`initPress`), `docs/DECISIONS.md`.
- Verified on the dev server with Playwright: at 1440 a fine pointer bends the
  nearest edge on all four plates, frame stays 657x493, clip clears on leave;
  no dent at 834 touch or under reduced motion; no console errors.
- Checks: `astro check` 0 errors, ESLint and Prettier clean on the changed
  files, `build:demo` OK, `services.demo.spec.ts` 18 passed / 6 skipped.
  Another session is rebuilding the close at the same time; a first run
  against a build taken mid-way through that work failed three close-related
  assertions, and the rerun on a fresh build passed.

## 2026-09-15 Session: /servicios/ Close Rebuilt As A Centred Scene

Scope: the /servicios/ close only (user direction). Hero, service layers,
their images and alternation, stack, /studio/, home, navigation, edge menu
and cursor untouched. Other terminals were editing the hero, the plates'
press and docs at the same time; only the close's blocks were edited.

- Files: `src/components/services/ServicesClose.astro` (rewritten),
  `src/data/servicesPage.ts` (`ServicesCloseCopy.image`, `servicesClose.image`),
  `src/styles/services-page.css` (close block only),
  `src/scripts/motion/ServicesPageMotion.ts` (`initClose` and the header
  bullet), `public/assets/services/servicios-cta.webp` (new),
  `tests/e2e/services.demo.spec.ts` (hover assertion updated, new close scene
  test), `docs/MOTION_SPEC.md`, `docs/DECISIONS.md`, `docs/CONTENT_NEEDED.md`.
- The supplied PNG is kept untouched. Copy and destinations are unchanged.
- Build: two wings of the same picture anchored to the edges, pushed out only
  as far as a centred room needs (CSS container units); portrait/phones use a
  top band and a bottom band. Scrubbed scene (zoom 1.08 -> 1, wings pressing
  in); heading and buttons play once at `top 55%`. Compact bite buttons; no
  `data-magnetic` (its GSAP inline `translate: none` cancels the press) and
  `!important` on their transition (the `motion` layer's `.bite-button`
  transition otherwise wins).
- Verified with Playwright on the dev server at 1920x1080, 1440x900, 1366x768,
  1024x768, 834x1112, 390x844 and 320x720 (screenshots inspected, entry
  states at 85/60/35/0% on 1440, reduced motion at 1440 and 390): horizontal
  overflow 0, no console errors, copy centred, two-line heading from 390 up,
  no seams after the portrait inner fades, hover presses 3.52 px.
- Checks: `astro check` 0/0/0; ESLint and Prettier clean on the changed files;
  scratch `build:demo` (14 pages) and `build` (9 pages) in the scratchpad,
  not `dist*/`; `services.demo.spec.ts` 18 passed / 6 skipped;
  `services.spec.ts` 2 passed; `check-production` on the scratch `dist`:
  72 files, 175,513 JS bytes, passed. On the dev server the gap tests fail
  only on the Astro dev toolbar element; they pass on the build.
- Open: a larger master for the scene (upscaled on desktop) and moving the
  PNG out of `public/` (both in `CONTENT_NEEDED.md`); the /studio/ close
  button likely has the same `data-magnetic`/press conflict (not changed).

Nothing was committed, pushed or deployed.

## 2026-09-15 Session: Edge Menu Panel Without Numbers, Narrower, Live Channels

Scope: the global edge menu's open panel only (user direction). Trigger, tab,
close control, scrim, panel animation, colours, route order, active state,
logo and page content untouched. Another terminal was editing `EdgeMenu.ts`
(`paintedBackground`, `SiteLogo` inert), the hero, the tokens and the new
`SiteLogo` files at the same time; none of that was touched.

- Files: `src/components/layout/EdgeMenu.astro`, `src/styles/edge-menu.css`,
  `tests/e2e/foundations.spec.ts` (route test no longer reads a number; new
  test `the edge panel lists routes and channels without numbers or legal
  links`), `tests/e2e/demo.spec.ts` (number assertion and `.edge-menu__legal`
  selector removed), `docs/DECISIONS.md`.
- Removed: route numbers (`.edge-menu__index`), the `01 / 05` readout
  (`.edge-menu__position`, `data-edge-position`) and the legal links
  (`.edge-menu__legal`); the footer keeps the legal line.
- Width about 13% narrower: `min(46vw, 44rem)` -> `min(40vw, 38.5rem)`
  (662 -> 576 px at 1440); coarse `min(72vw, 30rem)` -> `min(63vw, 26.5rem)`;
  up to 68rem `min(64vw, 34rem)` -> `min(56vw, 30rem)`; phones stay full width.
  Start padding `clamp(2.75rem, 5vw, 5rem)`. Route type `8.2cqi` -> `9.2cqi`,
  so it stays about 53 px at 1440.
- Channels come from `contactChannels`: `mailto:` stays in place; Instagram
  (`https://www.instagram.com/colmillo.studio/`, the same source as the global
  Instagram control) gets `target="_blank"`, `rel="noopener noreferrer"` and
  a visually hidden "(se abre en una pestaña nueva)". Hover/focus: orange
  value, a 1 px underline drawn in from the left, a 0.2rem lean; cursor pointer.
- Vertical rhythm: rows slightly taller (`clamp(0.45rem, 1.6vh, 1.25rem)`) and
  the navigation carries `margin-block-end: clamp(0rem, 5vh, 3.5rem)`, so the
  channels get more air than the wordmark; zeroed under `max-height: 34rem`.
- Verified with Playwright on `dist-demo` (open panel on /servicios/) at
  1440x1000, 1280x720, 1280x520, 1100x800 fine, 1024x768, 834x1112, 390x844,
  320x720 touch and 1440 reduced motion, screenshots inspected: no numbers or
  legal links, no overlap with the close control, no row overflow, no panel
  scroll, horizontal overflow 0, no console errors.
- Checks: `astro check` 0/0/0; Prettier and ESLint clean on the changed files;
  `build` 9 pages, `build:demo` 14 pages; demo edge tests 5 passed / 4 skipped;
  foundations edge/menu/footer tests 23 passed / 6 skipped after the fix, and
  `closes from the rail and from outside the panel` passed 3/3 on
  mobile-chromium in isolation (it failed once in the grouped run, the known
  scrim-click flake recorded above).
- Open: the user wrote `hola@colmilloestudio.com`; the approved address in
  `contactChannels` (and `DECISIONS.md`, `CONTENT_NEEDED.md`) is
  `hola@colmillostudio.com`. It was kept pending confirmation.
- Follow-up (same day, user direction): the address and the handle are no
  longer shown. The links are the words "Correo" and "Instagram" themselves
  (`.edge-menu__channel-label`, cream, uppercase, 900), side by side in a
  wrapping flex row; hover/focus keeps the orange, the drawn hairline and the
  0.2rem lean. Same destinations and `target`/`rel`. The foundations test now
  also asserts the two words and that neither value appears. Rechecked at the
  same nine viewports (one row even at 320), `astro check` 0/0/0, Prettier and
  ESLint clean, both builds, channel/scrim tests 6 passed.

Nothing was committed, pushed or deployed.

## 2026-09-15 Session: Global Wordmark And Instagram Pill On Every Route

User request: the home's top-left logo and top-right Instagram behaviour on
every route, one global implementation, logo tone per hero, nothing else
touched. Run while another terminal was changing the edge menu panel
(`EdgeMenu.astro`, `edge-menu.css`, `demo.spec.ts`, panel tests in
`foundations.spec.ts`); those changes were not touched. See `DECISIONS.md`
(2026-09-15, "One Global Wordmark...").

- New: `src/components/layout/SiteLogo.astro`, `src/styles/site-logo.css`
  (imported in `index.css`, layer `components`),
  `src/scripts/motion/SiteLogo.ts`, `src/scripts/motion/paintedBackground.ts`.
- Changed: `BaseLayout.astro` (+ `headerTheme` prop, renders `SiteLogo`),
  `studio.astro` and `servicios.astro` (`headerTheme="dark"`),
  `HeroSection.astro` (logo `<img>` -> empty `.hero__logo` box),
  `hero-section.css` (token + `aspect-ratio`), `tokens.css`
  (`--brand-logo-inline`, z comment), `InstagramBadge.astro` (always hero
  mode), `InstagramBadge.ts` (no `[data-hero]` requirement; range capped to
  the page's scroll; `end` measures), `EdgeMenu.ts` (uses
  `paintedBackground`, logo in the `inert` set), `HomeIntro.ts` (readiness
  waits on the global mark), `MotionController.ts` (+ `initSiteLogo`),
  `tests/e2e/foundations.spec.ts` (+ per-route wordmark/Instagram test, logo
  `inert` with the menu open), `tests/e2e/services.demo.spec.ts` (logo in
  `CHROME`), `CLAUDE.md`, `MOTION_SPEC.md`, `DECISIONS.md`.

Verified on `dist-demo` with a scratch Playwright script (1440x900 fine,
834x1112, 390x844 and 320x720 touch; `/`, `/studio/`, `/servicios/`,
`/proyectos/`, `/contacto/`, a demo project): one wordmark and one Instagram
control per route, `img.hero__logo` gone, wordmark at 43,43 (1440), 25,25
(834), 16,16 (390/320), identical to the old hero position; pill on entry,
compact at 15% of a viewport, same corner; tone light/dark/dark/light/light/
light on entry and switching over ink, orange and white layers while
scrolling; overflow 0; console clean. Screenshots inspected. Menu open on
`/studio/`: scrim on top of the mark, mark `inert`, badge hidden, restored on
Escape; Tab order skip link -> wordmark; clicking the mark lands on `/` with
tone light and `aria-current="page"`. Reduced motion on `/servicios/`: one
state change. No JavaScript: server tone (cream on Studio, black on home) and
the full pill.

Checks: `astro check` 0/0/0; ESLint clean on changed files; Prettier clean on
new files (HeroSection/hero-section warnings are the pre-existing line-ending
mismatch; the remaining `foundations.spec.ts` warning is in the other
terminal's panel test); `build` 9 pages; `build:demo` 14 pages;
`check:production` (176,664 JS bytes), `check:links`, `check:brand`,
`check:hero` passed. Standard Playwright: wordmark/Instagram/reduced-motion
tests 9 passed / 1 skipped; `intro.spec.ts` + `performance.spec.ts` 19
passed / 1 skipped. Full `foundations.spec.ts` before the short-page fix:
44 passed / 9 skipped / 5 failed - the new route test (fixed, then passed)
and the other terminal's `edge panel lists routes...` (references an
undefined `approvedMail`) and the known mobile scrim-click flake. Demo
Playwright (`services.demo.spec.ts` + `demo.spec.ts` fixed-controls, hero,
320px, 200% text): 36 passed / 12 skipped.

Nothing was committed, pushed or deployed.

### Follow-up (same day): the wordmark is no longer fixed

User correction: the logo must only appear at the start and scroll away, not
stay pinned. `site-logo.css` now uses `position: absolute` (anchored to the
document at the same gutter and size), `SiteLogo.astro` renders only the
derivative chosen by `headerTheme`, and the scroll-sampled tone was removed:
`SiteLogo.ts` and `paintedBackground.ts` deleted, `EdgeMenu.ts` back to its
own inline sampling (only the logo stays in its `inert` set),
`MotionController.ts` no longer mounts it. The Instagram control is unchanged
(fixed, pill on every route, folds to the circle). `foundations.spec.ts`
asserts the mark leaves the viewport on scroll. `DECISIONS.md`,
`MOTION_SPEC.md` and `CLAUDE.md` updated to match.

## 2026-09-15 Session: Laptop Responsive Pass (1280-1600 Wide, Short Heights)

User request: laptops must keep the large-desktop composition, only more
compact; no redesign. Run while other terminals had uncommitted work in
`EdgeMenu.astro`, `edge-menu.css`, `foundations.spec.ts`, `DECISIONS.md` and
this file; none of it was touched. See `DECISIONS.md` (2026-09-15, "Laptops
Keep The Wide Layout, Scaled By Height").

- Audit first (scratch Playwright script over a scratch `build:demo`): home,
  `/servicios/`, `/studio/`, `/contacto/`, `/proyectos/` at 1920x1080,
  1600x900, 1536x864, 1440x900, 1366x768, 1280x800 and at real browser-window
  heights (1920x969, 1600x789, 1536x730, 1440x789, 1366x657, 1366x620,
  1280x689, 1280x580), with a per-shot measurement of vertically cut elements.
  Nominal sizes were mostly sound; the break was height: below 640 px of
  window the wide layouts switched to tablet/linear (manifesto unpinned and
  cut, home services as a list, `/servicios/` without the stack), and at
  620-730 px the `/servicios/` layers and the home services stage filled the
  whole height (readout at the stage's foot, rule under the Instagram band).
- Files: `src/styles/layout.css`, `manifesto-home.css`,
  `services-section.css`, `services-page.css`, `studio-page.css`,
  `contact-section.css`, `src/components/sections/IntroSection.astro`,
  `src/scripts/motion/SectionStack.ts`, `ManifestoMotion.ts`,
  `ServicesMotion.ts`, `ServicesPageMotion.ts`, `docs/MOTION_SPEC.md`,
  `docs/DECISIONS.md`.
- Changes: wide threshold `min-height` 40rem -> 34rem everywhere (CSS, the
  manifesto `noscript` style, four motion queries); `min(vw, svh)` terms
  inside the existing clamps for the manifesto, home services, `/servicios/`
  layers, `/studio/` headings/spacing and the contact headline (large screens
  resolve to the previous values); `--stack-overflow` so a sticky layer taller
  than the screen reaches its foot before holding.
- A first version published `--stack-overflow` on every stack section and
  shifted the manifesto and services tracks (both `position: relative`) by
  thousands of pixels; caught by the audit's scroll positions and fixed by
  publishing it only for sticky or released layers, with released layers
  reset to `top: 0`.
- Verified after the fix: 1920x1080 scroll positions identical to before and
  screenshots unchanged; manifesto pinned and composed, home services
  sequence with the readout inside the stage, `/servicios/` layers whole with
  air at 1366x620 and 1280x580; 1024x768 keeps the tablet layouts (width
  breakpoint unchanged); horizontal overflow 0 on every shot; no console
  errors. Scratch checks: at 1100x560 with 150% root text every service layer
  is taller than the screen, sticks at `-overflow` and the last capability is
  reachable before the close covers it; reduced motion at 1366x620 and
  1440x900 keeps the still poster and plain layers; resizing 1366x620 ->
  900 -> 560 -> 1000x700 -> 1366x620 switches pin/sequence on and off
  consistently. The scrolled "enter" states still show the covered layer's
  heading being covered by the rising one: that is the stack's existing
  vocabulary and was not changed.
- Checks: `astro check` 0/0/0; ESLint and Prettier clean on the changed files
  and docs; `test:e2e:demo` 125 passed / 61 skipped; `test:e2e` 72 passed /
  10 skipped; `check:production` passed (72 files, 175,981 JS bytes). Both
  suites rebuilt `dist-demo/` and `dist/`.

Nothing was committed, pushed or deployed.

## 2026-09-16 Session: /proyectos/ Rebuilt As The Portfolio

User request: a complete redesign of `/proyectos/`, with Hello Monday's Work
page as a structural reference only (hero, category filter, asymmetric
masonry, strong hover, editorial feel, clickable pieces) expressed entirely in
Colmillo's language. Run while other terminals had uncommitted work in
`EdgeMenu.astro`, `IntroSection.astro`, `ManifestoMotion.ts`,
`SectionStack.ts`, `ServicesMotion.ts`, `ServicesPageMotion.ts`, six
stylesheets, `foundations.spec.ts`, `DECISIONS.md`, `MOTION_SPEC.md` and this
file; none of it was touched. Only two lines of `foundations.spec.ts` were
changed, both about this route. See `DECISIONS.md` (2026-09-16,
"/proyectos/ Is The Portfolio, Not An Archive Of Demos").

- New files: `src/components/projects/ProjectsHero.astro`,
  `ProjectsFilters.astro`, `ProjectsCard.astro`, `ProjectsClose.astro`;
  `src/styles/projects-page.css`; `src/scripts/motion/ProjectsPage.ts` and
  `ProjectsPageMotion.ts`; `tests/e2e/projects.demo.spec.ts` and
  `projects.spec.ts`.
- Rewritten: `src/pages/proyectos/index.astro`.
- Changed: `src/data/projects.ts` (categories, format, featured on
  `ProjectRecord`; five neutral provisional pieces added after the existing
  five, so the home rail's first five and every existing test are unchanged),
  `src/content.config.ts` (the same two fields on the collection schema),
  `src/config/assets.ts` (`projectsHeroMedia`, `null`),
  `src/styles/index.css`, `src/scripts/motion/MotionController.ts`,
  `scripts/check-production.mjs` (the five new slugs and the two missing
  titles added to the forbidden markers; the bare words "Materia", "Umbral",
  "Volumen", "Ritmo" and "Fragmento" were deliberately not added, since a
  substring match on common Spanish nouns would fail on approved copy),
  `playwright.config.ts` and `playwright.demo.config.ts`,
  `tests/e2e/demo.spec.ts` and two lines of `tests/e2e/foundations.spec.ts`
  (the route's wordmark theme is now `dark`; the production assertion moved
  from the retired `.project-card` to `[data-project-item]`).
- The route is now hero (the `/servicios/` title split and size, a 16:9 slot
  for the loop), gallery (sticky filter, twelve-column masonry) and black
  close. The hero was charcoal in the first pass and is white since the
  user's follow-up the same day, so hero and gallery are one sheet. Standard build: nine pages, and with no approved
  project the gallery is not rendered at all, so the route is the hero and the
  close. Demo build: nineteen pages (ten project routes) and the complete
  composition.
- A first pass used Studio's 40fr/50fr hero split with `clamp(3rem, 9vw,
  10rem)`; caught in the screenshot pass, where "Proyectos." overflowed its
  column at 1440 and the orange full stop wrapped to a second line. Fixed by
  taking the `/servicios/` values, then measured: one line at every tested
  width. A second pass stacked the five filter words over the first picture on
  a phone; fixed with a single sideways-scrolling row below 48rem.
- Verified with a scratch Playwright pass over a scratch `build:demo` at
  1920x1080, 1600x900, 1440x900, 1366x768, 1024x768 and 390x844: horizontal
  overflow 0 everywhere, no console errors, the title on one line, the grid at
  twelve columns from 1024.16 px and one column below 768, four formats with
  distinct widths and heights, the filter reducing to exactly its own pieces
  and back to ten, the band stuck at `top: 0` deep in the gallery without
  touching the Instagram control or the edge tab, and the categories readable
  on keyboard focus.
- Checks: `astro check` 0/0/0; ESLint clean; Prettier clean on every new and
  changed file (the repository-wide `format:check` still reports its
  pre-existing line-ending mismatch, now 48 files, none of them touched here);
  `test:e2e:demo` 147 passed / 69 skipped; `test:e2e` 76 passed / 10 skipped;
  `check:assets`, `check:brand`, `check:hero`, `check:production` (74 files,
  179,863 JS bytes) and `check:links` on both artifacts all passed.
- Left in place deliberately: `src/components/projects/ProjectCard.astro` and
  the `.project-card*` rules in `src/styles/layout.css` are now dead — nothing
  imports or matches them since the index stopped using them. `layout.css` had
  uncommitted work from another terminal, so removing half the pair would have
  left an inconsistency; both should go together in a later pass.
- Still open: the hero loop, real projects, their categories, formats and
  covers, and approval of the closing copy — all recorded in
  `CONTENT_NEEDED.md`.

Nothing was committed, pushed or deployed.

### Follow-up the same day: the /proyectos/ hero on white

User direction: the hero's background should be the page's own white like the
rest of the route, with the title, the wordmark and everything else following.

- `projects-page.css`: `.projects-hero` takes `--color-white` and
  `--color-brand-ink`; the empty media slot goes from `#292929` with a white
  hairline to `rgb(18 16 15 / 0.04)` with an ink one, so it is still a shade
  off the paper and still reads as a decision; `--pj-charcoal` is gone.
- The rounded lift between hero and gallery was removed with it (`--pj-lift`,
  the negative margin, the two start radii and the block padding that paid for
  them): two white surfaces need no seam, and the brief was explicit about not
  adding curves that do not earn their place.
- The canvas is no longer forced to ink. `html:has([data-projects-page])` kept
  `--color-background: ink` so the footer would continue the black close; with
  a white hero that would have shown black on an overscroll above the page.
  The override is gone and the footer is painted ink directly on this route
  instead, so the top of the page matches the hero and the route still ends on
  one dark field.
- `ProjectsHero.astro` publishes `data-surface-tone="light"` (the cursor keeps
  its default colours) and the route passes `headerTheme="light"`, so the
  wordmark is the black derivative again.
- Tests updated with it: `projects.demo.spec.ts` (white hero, ink text, the
  footer's ink), `projects.spec.ts` (white hero, `light` wordmark) and the
  `/proyectos/` row of `foundations.spec.ts` back to `light`.
- Re-verified: `astro check` 0/0/0, ESLint and Prettier clean,
  `test:e2e:demo` 147 passed / 69 skipped, `test:e2e` 76 passed / 10 skipped,
  `check:production` (74 files, 179,863 JS bytes) and `check:links` on both
  artifacts. Screenshot pass at 1440x900 confirms the white first screen, the
  seamless hero-to-gallery sheet and the unchanged black close and footer.

### Second follow-up the same day: the whole route on white

User direction: the closing CTA and the footer should be white too.

- `.projects-close` takes `--color-white` and `--color-brand-ink` (the "?"
  stays brand orange, and the bite button swaps its translucent black offset
  for the solid ink one the home rail's CTA uses on white), and publishes
  `data-surface-tone="light"`.
- The `html:has([data-projects-page]) .site-footer` overrides are gone: the
  footer is the shared one again. Nothing on the route touches the canvas, the
  footer or `--color-background` any more, so an overscroll at either end
  shows the same paper, and `--pj-light` is no longer used.
- The grid's bottom padding dropped from `--pj-space` to
  `clamp(1.5rem, 3vw, 3rem)`. With no change of surface left to mark the end
  of the gallery, the sticky filter hung over the closing question for about
  130 px; the route's breath before the question now lives in the close's own
  top padding alone, so the band releases right after the last piece. Total
  air between the last piece and the question is unchanged in feel (about
  190 px at 1440 instead of 290).
- Tests: the archive spec now asserts gallery, close and footer share the one
  white and that the close's text is ink.
- Re-verified: `astro check` 0/0/0, ESLint and Prettier clean,
  `test:e2e:demo` 147 passed / 69 skipped, `test:e2e` 76 passed / 10 skipped,
  `check:production` (74 files, 179,863 JS bytes), `check:links` on both
  artifacts, and a screenshot pass at 1440x900 from the first screen to the
  footer.

## 2026-09-16 Session: The Case Study System (/proyectos/[slug]/)

User request: build the complete system of individual project pages, with
hellomonday.com's project pages as a structural reference only, so that every
case study shares one structure and none of them shares an art direction. Run
while other terminals had uncommitted work in `EdgeMenu.astro`,
`IntroSection.astro`, `ManifestoMotion.ts`, `SectionStack.ts`,
`ServicesMotion.ts`, `ServicesPageMotion.ts`, eight stylesheets, several specs
and the docs; none of it was touched beyond the five one-line hooks listed
below. See `DECISIONS.md` (2026-09-16, "Case Studies Are A System, Not A
Template") and the authoring guide `docs/CASE_STUDIES.md`.

### What was built

- New model `src/data/caseStudy.ts`: theme (six values), layout variant,
  hero variant, fourteen module types as a discriminated union, chapters,
  related projects, SEO, and `resolveCaseStudy()`, which builds a complete
  page from the archive's own record when a project authors nothing.
- New `src/data/caseStudyFields.ts` (Zod guard for approved frontmatter) and
  `src/data/caseStudies.ts` (two authored demonstration studies, demo only).
- New `src/layouts/CaseStudyLayout.astro`, seventeen components under
  `src/components/case-study/`, `src/styles/case-study.css`,
  `src/scripts/motion/CaseStudyPage.ts` and `CaseStudyPageMotion.ts`.
- Rewritten `src/pages/proyectos/[slug].astro`.
- `bitePath()` exported from `PressSurface.ts`: the bite reveal reuses the
  pressure dent's own outline geometry instead of a second implementation.
- New `tests/e2e/case-study.demo.spec.ts` (12 specs).
- Five one-line hooks in files other terminals also hold: the stylesheet
  import in `index.css`, the module registration in `MotionController.ts`, the
  schema spread in `content.config.ts`, and the spec file registration in both
  Playwright configs. Two markers added to `check-production.mjs` and three
  selector lines updated in `demo.spec.ts`, all about this route.
- `/proyectos/` itself was not touched: its cards already linked to
  `/proyectos/<slug>/`.

### Deliberately not done

Cross-document View Transitions for a card-to-hero expansion. ClientRouter was
removed from this repository on 2026-09-10 after back/forward QA, and a later
probe reproduced the same touch history rejection; the motion architecture is
one controller mount per native document. The brief conditioned the effect on
being robust, so the intent is served by the hero's own entrance and the next
project's growth instead. Recorded in `DECISIONS.md` as its own future task.

### Defects found in QA and fixed

- The bite reveal stayed at full depth and left the picture behind its own
  mask. `initBite` created its triggers before `initSticky` changed the page's
  height, and nothing refreshed afterwards because the chunk arrives after
  `MotionController` has already refreshed. The layout-changing modules are
  now mounted first and the chunk refreshes ScrollTrigger once at the end.
- The next-project stage rendered as a narrow column with the title broken one
  letter per line. Keeping the legacy `project-navigation` class so an
  existing overlap test would still match pulled in `layout.css`'s
  `grid-template-columns: 1fr auto 1fr` and its bordered links. The class was
  dropped and the two lines of `demo.spec.ts` that measured it now point at
  the new elements.
- The chapter index, fixed against the left edge, sat over the copy. A page
  that has one now reserves its width in the container's start padding.
- The abstract placeholder, drawn in container units for a media frame, read
  as three stray blobs across a whole screen. In a full-bleed hero it is held
  to a centred square of the screen's shorter side.

### Verification performed this session

- `npm.cmd run check`: 151 files, 0 errors, 0 warnings, 0 hints.
- `npm.cmd run lint`: clean across the repository.
- Prettier: clean on every file created or changed this session.
- `npm.cmd run build`: 9 pages (unchanged: no project route is generated
  while no project is approved). `npm.cmd run build:demo`: 19 pages
  (unchanged: the ten provisional pieces, now with case studies).
- `npm.cmd run check:production`: passed, 76 files, 185,605 uncompressed
  JavaScript bytes against the 220,000 budget, no demo content or placeholders.
- `npm.cmd run check:links`: 9 and 19 HTML files, both artifacts clean.
- `check:assets` (prelaunch slots unchanged), `check:brand`, `check:hero`:
  passed.
- `npm.cmd run test:e2e:demo`: 177 passed, 75 intentional skips, 0 failures.
- `npm.cmd run test:e2e`: 75 passed, 10 skips, and the known pre-existing
  mobile scrim-click flake in `foundations.spec.ts:297`, which passed 3/3 when
  re-run in isolation. It is unrelated to this work.
- Scratch Playwright sweep over `dist-demo` at 1920x1080, 1600x900, 1536x864,
  1440x900, 1366x768, 1024x768, 430x932, 390x844 and 320x720, across the two
  authored studies and one fallback study: horizontal overflow 0 everywhere,
  0 at 200% root text on both routes, no console errors, no overlap between
  the fixed chrome and the page's copy, and each project's own background
  measured on the document. Screenshots inspected at 1440 and 390 for the
  hero, the introduction, the modules, the sticky story, the bite reveal and
  the next-project stage.

### Left in place deliberately

`src/components/projects/ProjectHero.astro`, `ProjectGallery.astro`,
`ProjectNavigation.astro` and `src/layouts/ProjectLayout.astro` are now unused
(verified: nothing imports them), as are their `.project-hero*`,
`.project-story*`, `.project-gallery*` and `.project-navigation*` rules in
`layout.css`. They were not deleted because `layout.css` has uncommitted work
from another terminal and the previous session left the `.project-card` pair
for the same reason; components and rules should go together in one later pass.

### Still open

The client's real projects. Everything the system needs from them is listed in
`docs/CONTENT_NEEDED.md` under "Case studies", and nothing there blocks a
launch: a project with no authored study already publishes a complete page.

Nothing was committed, pushed or deployed.

## 2026-09-16 Session: /proyectos/ Hero Loop Published

Scope: the `/proyectos/` hero media only, at the user's request. The filter,
the masonry, the cards, the press dent, the close, the footer, the global
chrome and every other route were not touched. Other terminals were working in
the same tree throughout; nothing of theirs was reverted or rewritten.

### What changed

- `public/assets/projects/video hero proyectos.mp4` — the delivered file,
  renamed only to drop the stray space before its extension (it arrived as
  `video hero proyectos .mp4`) so it sits on the public path the user
  specified. Not re-encoded, cropped or colour-corrected.
- `public/assets/projects/proyectos-hero-poster.webp` (new, 32,152 B,
  1280x720) — the loop's first frame, drawn to a canvas in Chromium and
  written with sharp at quality 86, the same route the `/servicios/` poster
  took.
- `src/config/assets.ts` — `projectsHeroMedia` filled: MP4 only (no WebM was
  delivered), poster, 1280x720, `fit: 'contain'`, `alt: ''`. The space in the
  file name is URL-encoded in the reference, as on `/servicios/`.
- `src/styles/projects-page.css` — hero block only: the mask that fades the
  loop's outer 8% into the sheet, the `max-content minmax(0, 1fr)` split and
  height cap for the landscape composition, and the portrait bleed.

Nothing else was edited. The entrance was not rewritten: the hero's existing
CSS entrance (`projects-rise` on the title, `projects-arrive` on the media)
already runs from the first paint and is skipped under reduced motion.

### The file, measured

Measured frame by frame in Chromium (Playwright, 36 samples across the loop):
H.264, 1280x720 (16:9), 24 fps, 144 frames, 6.016 s, with an audio track the
page never plays. The ground holds 243-244, 241-242, 237-238 (about #f4f2ee)
from the first frame to the last, and the drawing never leaves the middle 83%
— at least 8.75% clear on the left, 8.13% right, 9.44% top, 8.33% bottom.

Two consequences, both recorded in `docs/CONTENT_NEEDED.md`:

- that ground is about eleven levels under the route's white, so drawn as a
  plain rectangle it reads as a pale panel with a hard edge on the sheet. The
  hero therefore fades the outer 8% of the picture into the page with two
  intersecting linear-gradient masks — the widest band that cannot touch a
  drawn pixel. No filter, tint, blend mode, border or shadow goes near the
  drawing, and the hero keeps `--color-white`, so the route is still one sheet
  (the demo spec's white assertion still passes). The remaining field inside
  the band measures 243-244 against the page's 255: visible as paper, with no
  edge. A re-export on pure white, or the ground lift the home hero master was
  given in September, would remove it outright;
- the last frame is not the first (mean absolute difference 15.4/255 on a
  320x180 sample), so each pass wraps with a small cut, exactly like the
  `/servicios/` loop.

### The composition

With the loop present the landscape split changes the way `/servicios/` does:
`max-content minmax(0, 1fr)` with `column-gap: clamp(1.5rem, 4vw, 5rem)`, so
the title keeps its own width and the panorama takes the rest of the measure,
capped by `calc((100svh - 12rem) * 16 / 9)` so a short laptop window keeps the
wide composition. The route's type scale was left alone.

Measured on the dev server, frame width as a share of the hero's inner
measure: 1920x1080 46.8% (824x464), 1600x900 50.6% (810x456), 1536x864 50.5%
(776x436), 1440x900 50.3% (724x407), 1366x768 50.1% (684x385), 1280x800 49.9%
(638x359). The title holds one line at every width and never meets the frame
(smallest gap 51 px at 1280, before the file's own empty margin). 1920 sits
under the range because the title is at its clamp maximum there while the
shell stops at 100rem.

Portrait stacks title over loop, and phones bleed it to the screen edge but
the edge menu's rail, as `/servicios/` does: 1024x1366 89.3% (915x514),
834x1112 88.2% (736x414), 390x844 93.8% (366x206, starting at x=0), 320x720
92.5% (296x167). The bleed is only safe because of the mask above.

### Verified

On the dev server at 1920x1080, 1600x900, 1536x864, 1440x900, 1366x768,
1280x800, 1024x1366, 834x1112, 390x844 and 320x720: MP4 206, `readyState` 4,
playing and advancing (about 0.92 s of playback per second of wall clock),
`muted loop playsinline autoplay`, `controls` false, `preload="metadata"`,
computed `object-fit: contain`, `filter: none`, `mix-blend-mode: normal`,
rendered box exactly 16:9 (1.778) at every size, horizontal overflow 0,
cumulative layout shift 0 and no console or page errors anywhere.

Reduced motion at 1440 and 390: the video is paused at frame 0 on its poster,
the media's entrance animation resolves to `none`, overflow 0. With JavaScript
disabled at 1440 the loop still autoplays and wraps on its own attributes and
the entrance still runs, so the hero needs no script.

Checks: `astro check` 152 files, 0 errors / 0 warnings / 0 hints; Prettier and
ESLint clean on the two changed source files; `npm run build` 9 pages;
`check:production` passed (80 files, 185,605 JS bytes) with the MP4 and the
poster in `dist/assets/projects/`; `check:links` passed; `projects.spec.ts`
6/6 on desktop Chromium and Pixel 7.

`build:demo` and the demo matrix were deliberately not run: another terminal
was working in the same tree and `dist-demo` is shared. The hero is identical
in both builds, and the dev server the measurements above come from is demo
mode.

Nothing was committed, pushed or deployed.

## 2026-09-16 - /proyectos/ Close Rebuilt As A Scene

The archive's closing CTA now stands inside the client's panoramic picture
supplied this day. Rationale and the alternatives rejected are in
`docs/DECISIONS.md`; the open approvals are in `docs/CONTENT_NEEDED.md`.

### Changed

- `scripts/prepare-projects-media.mjs` (new) and `media:projects` in
  `package.json`: writes `public/assets/projects/proyectos-cta.webp` from the
  untouched master `bg cta proyectos.png`, and prints the figures the layout is
  built on so they can be re-derived rather than trusted.
- `src/config/assets.ts`: `projectsCloseScene` (2172x724), `null` restores the
  plain white close.
- `src/components/projects/ProjectsClose.astro`: rewritten — a decorative
  two-wing scene, the question, a supporting line and two bite buttons.
- `src/pages/proyectos/index.astro`: passes `lede` and `actions` instead of a
  single `label`/`href`.
- `src/styles/projects-page.css`: the close section rewritten.
- `tests/e2e/projects.spec.ts`, `tests/e2e/projects.demo.spec.ts`: one test
  each for the scene, its two routes and its geometry.
- `CLAUDE.md`, `docs/DECISIONS.md`, `docs/CONTENT_NEEDED.md`,
  `docs/MOTION_SPEC.md`.

### The three defects found by looking, and their fixes

Each was found in a rendered screenshot, not in the code.

- **The section read as a warm grey panel.** The two wings are half the screen
  each, so between them they cover the whole width, and the master's paper is
  254,253,251 against the page's #ffffff. `media:projects` now scales every
  channel by 255/251, clamping the paper to pure white; the picture has no
  boundary on the page at all. Approval of that lift is open.
- **Only the orange ribbon survived.** Drawn at the section's full height the
  file is blown up to about 165% of the screen's width and the metal blocks are
  cropped away. The drawn height is now capped
  (`min(100cqh, clamp(20rem, 42vw, 34rem))`) and the wings are centred.
- **A straight edge cut the sculptures mid-sheet.** The master is itself a
  crop, so its top and bottom are given the same fade as the inner edges.

A fourth was found by arithmetic before it was rendered: with the wings' reach
clamped to `(100cqw - room) / 2` and `room` also the copy's width, the ink lands
exactly on the copy's edge (0 px of air at 1440). `--pj-cta-clear` is now the
copy's room plus air, and the two are deliberately different numbers.

### Verified

Scratch Playwright sweep over `dist-demo` at 1920x1080, 1440x1000, 1440x900,
1366x768, 1024x768, 834x1112, 430x932, 390x844 and 320x720, screenshotting the
close and measuring the sculptures on the rendered pixels with the copy hidden
(measuring it visible only finds the title): horizontal overflow 0 everywhere,
the section's `background-color` #ffffff everywhere, and 0.00% of the copy's own
box carrying scene ink at every width, the darkest pixel behind it 250-255.
Air between the ink and the copy across landscape widths: 114-161 px on the
left, 88-125 px on the right. 200% root text at 390: overflow 0. Reduced
motion at 1440: every reveal resolves to opacity 1, so the finished
composition is simply there. Screenshots inspected at 1920, 1440, 1024, 834,
390 and 320.

Checks, all green with this work in place: `astro check` 152 files, 0 errors /
0 warnings / 0 hints; ESLint clean; Prettier clean repository-wide (the
79-file line-ending mismatch recorded in `CLAUDE.md` was no longer present);
`npm run build` 9 pages and `build:demo` 19 pages; `check:production` passed
(80 files, 185,605 JS bytes — the close adds no JavaScript, it reuses the
route's existing `[data-projects-reveal]`); `check:links`, `check:assets`,
`check:brand` and `check:hero` passed.

### The suites, once the tree compiled

Both suites were blocked for part of this session: another terminal's
in-progress contact page imported `@/scripts/motion/ContactPageMotion` before
that file existed, and both suites build first. They were run once it compiled.

- `projects.spec.ts` against the standard artifact: 6/6 passed.
- `projects.demo.spec.ts` against the demo artifact: 28 passed, 8 skipped, 0
  failed.
- Still failing, and none of it this work: `foundations.spec.ts` (`essential
  routes render`, `the edge tab turns ink over an orange surface and back`,
  `every route carries one wordmark and one folding Instagram control`) and
  `demo.spec.ts:127`. Every one of them asserts against `/contacto/`, which is
  being rebuilt in the other terminal: the built page no longer carries
  `contact-page__hero` (it is `contact-hero` now), its level-1 heading is no
  longer "Haz que tu marca muerda" and `.contact-page__routes` is gone. Re-run
  them once that page settles.
- `npm run lint` reports 30 errors, all of them in `.tmp-qa-contacto.mjs` and
  `.tmp-qa-form.mjs`, two scratch QA scripts the other terminal has at the
  repository root. They were left untouched.

Nothing was committed, pushed or deployed.

## 2026-09-16 - The /proyectos/ Close Fills The Screen And Joins The Stack

User direction, straight after the scene above: the close should take the whole
height and rise over the section before it as the `/servicios/` layers do.
Rationale in `docs/DECISIONS.md`.

### Changed

- `src/components/projects/ProjectsHero.astro` and `ProjectsClose.astro`:
  `data-stack-section` on both, so the route joins the shared
  `SectionStack.ts` instead of growing an effect of its own. No CSS keys off
  that attribute — only the `.stack-section` class, which is deliberately not
  added — so neither section gains sticky positioning, a radius or a clip of
  its own.
- `src/styles/projects-page.css`: the close is `max(38rem, 100svh)`, rides
  `--pj-cta-lift` up over what precedes it, sits at `z-index: 2` over the
  gallery and clips, so the stack's rounded band is real.
- `tests/e2e/projects.demo.spec.ts`: a test for the stack, and two corrected
  assertions (below).
- `CLAUDE.md`, `docs/DECISIONS.md`, `docs/MOTION_SPEC.md`.

The gallery is deliberately not a layer: it is many screens tall and carries
its own sticky filter, and `.stack-section` would impose `overflow: clip`,
`min-block-size: 100svh` and sticky positioning on it. The hero is one only
because `initSectionStack` does nothing with fewer than two sections and the
standard build has no gallery between them.

### Two false assertions of mine, found by finally running them

The closing-scene test had never executed — the tree did not compile when it
was written. Two of its assertions were wrong and the CSS was right both times:

- `inner.width <= end.left - start.right`: a wing's box is capped at
  `min(50cqw, …)` and is mostly the picture's empty paper, so the boxes
  legitimately overlap the copy's. What has to clear the copy is the ink, and
  that is measured on rendered pixels, not in the DOM.
- `start.right <= centre`: true on landscape screens, false on portrait ones,
  where the wings are bands at the top and the foot and may be wider than half
  the screen because they never share a row. The invariant is now that the two
  wings never overlap as rectangles, which holds in both layouts.

### Verified

Scratch Playwright sweep at 1920x1080, 1440x900, 1366x768, 1024x768, 834x1112,
390x844 and 320x720, on both artifacts: the close settles at exactly the
viewport height at every size (1080/1080, 900/900, 768/768, 1112/1112,
844/844; 740 at 320x720, where the portrait bands' padding makes it taller than
the screen), horizontal overflow 0 everywhere, and mid-reveal it carries about
50 px of top radius behind a 1.57% side inset — the stack's band, opening. The
hero's computed `clip-path` at the first paint is `inset(0px 0%)` at every
width, so marking it as a layer costs no clipped flash. Reduced motion and
JavaScript disabled: `clip-path` `none`, full height, nothing hidden.

On an all-white route the band is legible only because the scene is coloured:
the sculptures are what the rounded corners clip as the close rises.

Checks: `astro check` 158 files, 0 errors; `npm run build` 9 pages and
`build:demo` 19; `check:production` passed (82 files, 194,777 JS bytes against
the 220,000 budget — the close itself still adds no JavaScript, reusing
`SectionStack.ts` and the route's existing `[data-projects-reveal]`; the rise
since this session's earlier 185,605 is the concurrent contact work);
`check:links` passed; Prettier clean on every file of this work.

Nothing was committed, pushed or deployed.

---

## Session: `/contacto/` rebuilt (2026-09-16, Claude Code)

### What was asked

A complete redesign of `/contacto/`, the last main route still on the early
editorial template, to the level of the home, `/studio/`, `/servicios/` and
`/proyectos/`. No external reference: the brief was to design it out of the
system already built. Scope was limited to the route.

### What the route is now

Two scenes and the shared footer, and nothing else.

- **01 Hero** — charcoal `#1f1f1f`, one screen tall, `position: sticky`. No
  media column: one typographic block ("Cuéntanos qué tienes entre manos.",
  sentence case, orange disc for the full stop) over about 60% of the measure,
  the supporting line under it, and the rest of the screen empty for the
  route's one graphic: an unfinished orange trajectory, an open arc of about
  305 degrees with a 55-degree opening, drawn off-round, anchored to a corner
  so it always reads as a fragment. A small disc sits on the line.
- **02 Brief** — the white sheet scrolls over the sticky hero and takes the
  screen. About 35/65 from 64.01rem: a sticky left block (Hablemos., one line,
  the two approved channels) and a large editorial form set straight into the
  sheet — small label, large control, hairline rule, no box anywhere. Five
  fields (Nombre*, Correo*, Empresa / proyecto, Servicio, Mensaje*), the
  service selector a native radio group drawn as Colmillo pills, and the shared
  bite button on its ink slab.
- **Footer** — the global one, untouched, on the same white.

Everything the request asked to remove is gone: "04 / Contacto", "El siguiente
movimiento", the repeated `<h1>`, the 01/02 channel numbering, "Mientras tanto"
and the internal route map. The edge menu marks Contacto as the current route.

### Files added

- `src/data/contactPage.ts` — every word the route renders, plus
  `contactFormEndpoint`.
- `src/components/contact/ContactHero.astro`, `ContactOrbit.astro`,
  `ContactForm.astro`.
- `src/styles/contact-page.css`.
- `src/scripts/motion/ContactPage.ts` (the module `MotionController` owns) and
  `ContactPageMotion.ts` (the route-only chunk, 8,799 bytes built).
- `tests/e2e/contacto.spec.ts`.

### Files changed

- `src/pages/contacto.astro` — rewritten; `headerTheme="dark"`, hands over the
  chunk's loader.
- `src/scripts/motion/MotionController.ts` — two lines: the import and
  `initContactPage()` in `startEnhancements`.
- `src/styles/index.css` — one `@import` for `contact-page.css`.
- `tests/e2e/foundations.spec.ts` — the route's `<h1>`; the wordmark theme for
  `/contacto/` (now `dark`); and the edge-tab test, which asserted that the
  contact hero was brand orange. Verified in the built site: **no section of
  the standard build paints a field of brand orange any more**, so that test
  now covers what `dist` has (the tab stays orange over the charcoal hero and
  the white sheet) and the ink case moved to `demo.spec.ts`, where the orange
  `Identidad` layer of `/servicios/` exists.
- `tests/e2e/demo.spec.ts` — the `/contacto/` assertions, and the edge tab's
  ink case over that orange service layer.
- `docs/DECISIONS.md`, `docs/MOTION_SPEC.md`, `docs/CONTENT_NEEDED.md` —
  appended.

### Not changed, on purpose

- `src/styles/layout.css` still holds the old `.contact-page__*` rules, now
  dead (about 170 lines, several of them in selector lists shared with
  `.editorial-page__*`). The file is modified in the working tree from another
  terminal, so removing them was left as a follow-up rather than risked here.
- No other page, component or global was touched.

### The form, and what is missing

There is no server, API route, server action or mail provider anywhere in this
repository — verified: `output: 'static'`, no adapter, no integration in
`astro.config.mjs` or `package.json`, and no `<form>` existed before this one.
None was added. `contactFormEndpoint` in `src/data/contactPage.ts` is `null`
and decides the submit path:

- null (today): the browser validates with the page's own copy and then hands
  the finished brief to the visitor's mail client as a prepared draft. The
  status says exactly that and shows the address beside it. Nothing claims the
  site sent anything; "Enviado"/"Recibido" can only be reached through the
  other branch.
- set: the brief is POSTed as JSON and the form reports what actually happened,
  `success` only on a response that came back ok.

With no JavaScript the form's own `action` does the same handoff natively.
`docs/CONTENT_NEEDED.md` lists what the client must supply before that switch
is thrown (endpoint, inbox, spam handling, retention).

### Verified

`astro check` 158 files, 0 errors / 0 warnings / 0 hints. ESLint and Prettier
clean on every file touched. `npm run build` 9 pages; `check:production` passed
(82 files, 194,873 JS bytes); `check:links` passed. The shared motion bundle is
148,909 bytes against the 150,000 budget — about 1.1 KB of headroom, worth
watching before the next module is added to `MotionController`.

`npx playwright test` — 106 tests, all passing at `--workers=2`. At the default
worker count one pre-existing test, `foundations.spec.ts` "the edge menu closes
from the rail and from outside the panel" on Pixel 7, times out under CPU
contention; it passes alone and with the whole `foundations.spec.ts` file, it
never touches `/contacto/`, and the new spec only made the contention likelier
by adding a sixth file.

Measured on the dev server and the built site at 1920x1080, 1600x900, 1536x864,
1440x900, 1366x768, 1024x768, 430x932, 390x844 and 320x720: horizontal overflow
0 everywhere, no console or page errors anywhere, the hero title two lines from
1366 up and three below, two columns from 1025 up and one below, the pulse
present only in the two-column brief. At 200% text (1440, 1366, 390, 320)
overflow stays 0 and the two columns hold. Reduced motion: the arc is drawn and
its disc still, every block present, the pulse stationary, the form unchanged.
With JavaScript disabled: four text controls, five radios, the submit and the
real `mailto:` action, the `<h1>` and both channels.

Nothing was committed, pushed or deployed. `build:demo` and the demo matrix
were deliberately not run: another terminal is working in the same tree and
`dist-demo` is shared. The route is identical in both builds, and the dev
server every measurement above comes from is demo mode.

### Working tree note

`.tmp-qa-close.mjs`, an untracked scratch file from another terminal, was
present at the start of this session and is gone at the end of it. It was not
removed by this session — only this session's own `.tmp-qa-*` scripts were, by
name.

## 2026-09-16 - The Three Legal Pages, Written From A Technical Audit

Claude Code session, user direction: finish the first version by building the
legal notice, privacy policy and cookie policy properly and wiring them into
the site — auditing what the site actually does first, and inventing no legal
data. Decisions in `docs/DECISIONS.md`; the client request list is the new
root-level `LEGAL_TODO.md`.

### The audit that the wording rests on

Performed over the source, the built artifacts and the live deployment
(`curl` of `https://colmillo-studio.vercel.app/`, plus the Vercel project
itself through its API):

- no analytics, tag manager, pixel or marketing script anywhere in `src/`,
  `public/` or `package.json`; the served HTML carries four scripts, all
  first-party Astro chunks, no `<iframe>`, and no `_vercel/insights` or
  `_vercel/speed-insights` injection. The Vercel project has neither product
  enabled;
- no `Set-Cookie` header on the response and no `document.cookie` in the
  codebase: the site sets no cookies at all;
- exactly one browser storage write: `colmilloIntroPlayed` (sessionStorage,
  `true`, cleared with the tab). `MotionPreference.ts` only removes the
  retired `colmillo-motion` key;
- system typefaces and self-hosted video, so no external subresource host;
- Instagram is a plain outbound `<a>`, not an embed;
- no form backend: `output: 'static'`, no adapter, no API route,
  `contactFormEndpoint` null. The form composes a draft in the visitor's own
  mail client; the site transmits nothing.

Consequences: **no consent banner and no consent checkbox were built**, and
both omissions are argued in the documents themselves rather than assumed.

### Added

- `src/data/legalPages.ts`: the three documents as typed data — a small block
  model (paragraph, subheading, list, note, table) and an inline model of
  text, links and `pending(...)` markers, so no clause is ever `set:html` and
  no wording lives in a component. The contact address is read from
  `src/config/contact.ts`, never typed out.
- `src/components/legal/LegalRich.astro` and `LegalBody.astro`: the renderers.
  Numbered `<section>`s with stable ids, an accessible scrollable table region
  and the `[PENDIENTE: …]` chip, whose literal text is in the DOM so it
  survives copy-paste, print and the release gate.
- `src/styles/legal-page.css`: the route's design. White sheet, ink text,
  orange marks, an 800 px reading column at 19 px on a 1.75 line-height, a
  sticky in-page index from 64rem, a print stylesheet, and the `/contacto/`
  privacy-line rules (kept here, not in `contact-page.css`, because a parallel
  session owned that file).
- `LEGAL_TODO.md`: exactly what to ask the client, with a ready-to-send
  template and a section on what does *not* need asking because it is already
  verified.

### Changed

- `src/layouts/LegalLayout.astro`: rebuilt around a `doc` prop. Root class is
  `legal-route`, so the stale `.legal-page` rule in `layout.css` was left
  untouched. It no longer forces `noindex`; the routes now follow the
  site-wide prelaunch gate, which is still closed, so behaviour is unchanged.
- `src/pages/aviso-legal.astro`, `privacidad.astro`, `cookies.astro`: each now
  selects its document. They ship identically in both builds — these are real
  documents with missing data marked, not provisional demo copy.
- `src/components/contact/ContactForm.astro` and `src/data/contactPage.ts`: a
  short privacy line beside the submit button linking to `/privacidad/`. No
  checkbox: consent is not the legal basis, and the site does not transmit the
  brief. Both facts are recorded in the code comment.
- `src/styles/index.css`: one import.
- `scripts/release-check.mjs`: walks `dist/` and blocks a release while any
  `[PENDIENTE:` marker survives. Verified working — it now reports
  `aviso-legal/index.html` and `privacidad/index.html`, and correctly does not
  report `cookies/index.html`, which has no missing data.
- `docs/CONTENT_NEEDED.md`, `docs/DECISIONS.md`.

The footer needed no change: it already used the global component, already
linked the three routes and already rendered `© {new Date().getFullYear()}`.

### Verified

- `astro check` 162 files, 0 errors / 0 warnings / 0 hints; `eslint .` clean;
  Prettier clean on every file of this work.
- `npm run build` 9 pages; `npm run build:demo` 19 pages.
- `check:production` passed (82 files, 194,873 JS bytes against the 220,000
  budget — the legal routes add no JavaScript at all); `check:links` passed on
  both `dist` and `dist-demo`.
- `release:check` blocked with 4 checks, the fourth being the new legal gate.
- Playwright `foundations.spec.ts` + `contacto.spec.ts`: 67 passed, 9 skipped,
  0 failed. Demo `compact 320px` and `200 percent text sizing`: 2 passed,
  4 capability-skipped.
- Scratch Playwright sweep of the three routes at 1920x1080, 1440x900,
  1366x768, 1024x768, 430x932, 390x844 and 320x720: horizontal overflow 0
  everywhere, every H1 inside the frame, the cookie table never wider than the
  viewport, two columns at and above 1366 and one column at and below 1024
  with the index read first. 200% root text at 390: overflow 0 on all three.
  Reduced motion: complete page. No console errors at any size. The temporary
  script was deleted.
- Browser inspection at 1440x900 of `/aviso-legal/`, `/cookies/` and
  `/contacto/`: the wordmark, Instagram control, edge tab and footer are the
  shared ones; measured 800 px reading column, 19 px body, 33.25 px line
  height, sticky index, red dashed pending chips, and the privacy line sitting
  on the same row as the submit button.

### Open

- Every `[PENDIENTE: …]` value in `LEGAL_TODO.md`: holder's name, NIF/CIF,
  address, legal form, mail provider, processor agreements, transfer
  safeguard, retention period. Nothing registral was written, because the
  holder's legal form is unknown.
- The email spelling is still unresolved (`colmillostudio` in the repo,
  `colmilloestudio` written twice by the user). It was not changed; the legal
  pages follow `src/config/contact.ts`, so one correction there fixes all.
- Professional legal review before release.

Nothing was committed, pushed or deployed.

### Committed and pushed (correcting the line above)

At the user's explicit request, immediately after the session above, the whole
working tree was committed as `10c36c3` and pushed to `origin/main`
(`60f7baf..10c36c3`). The commit carries this session's legal work together
with the parallel sessions' `/proyectos/`, case-study and `/contacto/` work,
because those efforts share files — `src/styles/index.css`, `CLAUDE.md` and the
three `docs/` records — and could not be split cleanly.

Before committing, the whole tree was revalidated: `astro check` 162 files with
0 errors, `eslint` clean, `build` 9 pages, `build:demo` 19 pages,
`check:production` and `check:links` both passing. No build artifact was
staged; the scratch `.tmp-qa-*.mjs` files and the pending `package-lock.json`
deletion had already been resolved by the parallel session and were not
touched.

Release impact: Vercel deploys `main` automatically, and its build command is
still overridden to `npm run build:demo` with output `dist-demo`, so this push
updates the temporary, explicitly authorised public demo at
`https://colmillo-studio.vercel.app/`. That artifact stays `noindex` behind the
blocking `robots.txt`, and none of the release gates were opened:
`PUBLIC_SITE_URL`, `PUBLIC_RELEASE_APPROVED` and `PUBLIC_INDEXING_APPROVED` are
all still unset or false, and `release:check` additionally blocks on the
outstanding `[PENDIENTE: …]` legal markers.

Verified live after the deployment reported READY: `/aviso-legal/` and
`/cookies/` return 200 with the correct titles and H1s, the four and zero
`[PENDIENTE: …]` markers respectively, the footer's three legal links and the
dynamic `© 2026`. `noindex, nofollow` is present, `robots.txt` still answers
`Disallow: /`, and the response still sets no cookie.

## 2026-09-22 - Silent Loops Start On Their Own, Including Where A Browser Refuses

Client report: on a phone the videos do not play by themselves; a play control
has to be pressed. Requested behaviour: every loop plays on its own, in a loop,
from the moment the site is opened.

### What was wrong

Nothing in the markup. Every loop is authored `muted loop playsinline` with no
`controls`, the first-screen ones carry `autoplay`, and the ones below the fold
carry `preload="none"` and are started by their own module as they arrive. All
of that is correct and is untouched.

The defect is the refusal path. Some browsers reject a silent autoplay even
though it is muted and inline: iOS in Low Power Mode, Chrome with Data Saver,
Safari with a per-site "Auto-Play: Never". They ignore the `autoplay` attribute
and reject `play()` with `NotAllowedError`. Every call site swallowed that
rejection (`.catch(() => undefined)`) and never tried again, so the loop stayed
parked on its poster with the platform's own start badge over it — which is
exactly the play button the client was pressing. On a phone this is the common
case, because Low Power Mode is.

### What was done

- New `src/scripts/motion/VideoLoop.ts`: `playLoop(video)` and
  `stopLoop(video)`. `playLoop` forces `muted`/`playsInline` as properties (an
  autoplay policy reads the property, not the attribute) and, when the browser
  answers `NotAllowedError`, keeps the element and retries it at the first
  gesture the document sees — `pointerdown`, `touchstart`, `touchend`,
  `keydown`, `scroll` or `click`, in capture, installed only while something is
  waiting and removed as soon as nothing is. Inside a gesture the same call is
  allowed, so the loops start by themselves as soon as the visitor does
  anything at all, with no control of ours added to the page.
- Only `NotAllowedError` is remembered. `play()` also rejects with
  `AbortError` when a later `pause()` interrupts it, which is routine here (a
  loop scrolling out mid-request); retrying that would restart a loop its own
  module has just parked. `stopLoop` cancels a pending retry as it pauses, so a
  loop that has since left the screen is never resurrected by a gesture.
- Every loop call site now goes through the pair: `HeroMotion.ts`,
  `StudioMotion.ts`, `GoodbyePanorama.ts`, `ProjectsPageMotion.ts`,
  `ServicesPageMotion.ts`, `StudioPageMotion.ts`, `CaseStudyPageMotion.ts`.
- No rule was relaxed. Reduced motion, off screen, covered by the next stack
  layer and a backgrounded tab still decide whether a loop is asked to play at
  all; this only makes the request itself survive a refusal.

### Verified

- `astro check` 163 files, 0 errors; `eslint` clean; Prettier clean on all nine
  touched files (the repository-wide check still reports its pre-existing
  line-ending mismatch in 40 untouched files, which was left alone).
- `build` 9 pages, `build:demo` 19 pages, `check:production` passing at
  196,093 JS bytes (budget 220,000), `check:links` passing.
- `playwright test` 98 passed / 10 skipped; `playwright test --config
  playwright.demo.config.ts` 186 passed / 75 skipped.
- New regression test in `tests/e2e/foundations.spec.ts`, "a loop a browser
  refuses to start plays at the first gesture": an init script reproduces Low
  Power Mode (the `autoplay` attribute ignored, `play()` rejected with
  `NotAllowedError` until a gesture) and asserts the hero loop is parked on
  arrival and running after one keypress. It was confirmed to fail with the
  retry disabled and to pass with it, on both the desktop and the Pixel 7
  project.
- Scratch Playwright sweep on a Pixel 7 over `/`, `/studio/`, `/servicios/` and
  `/proyectos/` of `dist-demo`, with correct video MIME types and range
  support. Autoplay allowed: every loop on screen was already playing on
  arrival, with no gesture. Low Power Mode simulated: every loop was parked on
  arrival and playing after a single tap, including the home Studio loop
  further down the page. The temporary script lives only in the session
  scratchpad and was not added to the repository.

### Open

- `src/data/caseStudy.ts` still offers `mode: 'controls'` for a case-study
  video, which renders real controls and is the visitor's to start. No approved
  or demo entry uses it, so nothing on the site shows controls today; if a
  future piece is meant to autoplay, it must be authored as a loop.
- Nothing was committed, pushed or deployed.
