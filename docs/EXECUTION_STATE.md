# COLMILLO STUDIO - EXECUTION STATE

Persistent handoff document for Codex sessions. This describes the actual
repository state, not an aspirational roadmap.

## Last Updated

2026-09-10

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
