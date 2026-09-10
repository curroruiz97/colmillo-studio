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
