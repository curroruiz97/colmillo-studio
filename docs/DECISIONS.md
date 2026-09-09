# COLMILLO STUDIO - DECISIONS

## 2026-09-04 - Project Folder

Decision: Create the local project at
`C:\Users\Usuario\Documents\Codex\colmillo-web`.

Reason: No existing Colmillo folder was found in likely Desktop/Documents
locations. This path keeps the work inside the user's Codex documents area and
does not overwrite existing work.

## 2026-09-04 - Default Build Stack

Decision: Use Astro + TypeScript strict mode as the default implementation stack
when the site build begins.

Reason: The project needs static, indexable content with focused interactive
islands and strong performance. Astro fits that shape better than a full SPA.

## 2026-09-04 - Motion Stack

Decision: Prefer CSS, SVG masks/clip paths, GSAP and ScrollTrigger for the first
motion implementation. Use Lenis only if it materially improves the scroll feel.

Reason: This supports the requested interaction quality without starting with a
large WebGL or SPA dependency.

## 2026-09-04 - Logo Handling

Decision: Keep the attached raster logo as reference only, stored under
`public/assets/incoming/`.

Reason: The image has a white background and should not become the production
logo on the cream site background without official transparent/SVG source.

## 2026-09-04 - Deployment

Decision: No push or deployment during configuration.

Reason: The user explicitly requested no push or deployment.

## 2026-09-04 - Package Manager and Version Compatibility

Decision: Use npm with a committed `package-lock.json`. Pin Astro to 7.3.1 and
TypeScript to 6.0.3 for the Phase 1 baseline.

Reason: No package manager or lockfile existed. Astro 7.3.1 was the current
stable release when Phase 1 began. Although TypeScript 7.0.2 was current,
`@astrojs/check` 0.9.10 declared support only for TypeScript 5 and 6. Pinning the
latest compatible TypeScript avoids forcing an invalid peer dependency tree.

## 2026-09-04 - Prelaunch Indexing Guard

Decision: Keep all pages `noindex`, publish a blocking `robots.txt`, and enable
the sitemap integration only when `PUBLIC_SITE_URL` is configured.

Reason: The final domain, legal text, contact details and portfolio content are
missing. This prevents an incomplete build from being indexed and avoids
inventing a canonical origin. The guard must be deliberately removed during
release preparation after content and legal QA.

## 2026-09-04 - Empty Project Collection

Decision: Define the project schema now, use an explicit empty loader, and keep
project publication disabled in centralized content config until the first
approved entry arrives.

Reason: A fake demonstration project would violate content integrity. Avoiding
calls to an empty collection also keeps Astro builds free of empty-collection
warnings. `docs/CONTENT_MODEL.md` records the activation procedure.

## 2026-09-04 - Phase 1 Visual Baseline

Decision: Use system fonts and a text wordmark in the foundation UI. Keep the
raster logo reference and unlicensed font names out of rendered assets.

Reason: The official transparent logo and licensed Bootzy TM/More Sugar WOFF2
files have not been supplied. This preserves layout and accessibility work
without manufacturing substitute brand assets.

## 2026-09-04 - End-to-End Server

Decision: Run Playwright against the generated `dist` folder through a minimal
Node static server with an inactivity shutdown.

Reason: Astro 7 intentionally backgrounds dev/preview servers in detected agent
environments, which conflicts with Playwright's web-server lifecycle on this
Windows host. Testing the production output is deterministic and requires no
extra server dependency.

## 2026-09-04 - Codex Model Default

Decision: Set the project-scoped Codex defaults to `gpt-5.6-sol`, medium
reasoning effort and `service_tier = "default"`.

Reason: The user requested GPT-5.6 Sol with standard processing rather than
Fast mode to reduce usage. The existing `colmillo-fast` profile selects Terra,
and the build profile selects high reasoning; the project default now records
the requested balanced configuration explicitly.

## 2026-09-04 - Progressive Home Content Gate

Decision: Build the complete home-section and motion architecture, but render
sections that depend on unapproved copy only in development until their
availability flags are enabled.

Reason: This permits visual and technical iteration without publishing invented
services, studio copy or project data. The production build keeps the approved
hero identity, exact CTA and contact destination while remaining prelaunch and
`noindex`.

## 2026-09-04 - Native Scroll and Motion Lifecycle

Decision: Keep native browser scrolling, use GSAP/ScrollTrigger only for
capability-gated enhancements, and mount/clean every motion feature through a
single controller across Astro client navigations.

Reason: Lenis is not necessary for the current visual result. Native scrolling
reduces bundle cost and avoids conflicts with hashes, keyboard focus, sticky
layers and reduced-motion fallbacks.

## 2026-09-04 - Media Activation Slots

Decision: Centralize hero and goodbye WebM, MP4, poster and intrinsic dimensions
in `src/config/assets.ts`; keep both slots `null` until optimized official files
are approved.

Reason: The component architecture can accept real media without changing its
semantic or responsive structure, while the CSS fallback avoids broken images
and raw GIF delivery.

## 2026-09-04 - Production Integrity Budget

Decision: Fail validation when development markers or raw GIFs enter `dist`,
when one JavaScript asset exceeds 150 KB, or when total JavaScript exceeds
220 KB uncompressed.

Reason: These reversible guardrails enforce the current content-integrity and
performance requirements before deployment assets increase the payload.

## 2026-09-06 - Empty Collection Warning Guard

Decision: Keep Astro's glob loader automatic when project Markdown/MDX exists,
but use a typed empty loader while the directory is empty.

Reason: This preserves zero-edit activation for the first approved project and
avoids a noisy build warning before any client content arrives.

## 2026-09-06 - Codex Reasoning Effort

Decision: Set the project-scoped Codex default to `gpt-5.6-sol` with
`model_reasoning_effort = "high"` and `service_tier = "default"`.

Reason: The requested configuration prioritizes deeper reasoning while keeping
standard processing rather than Fast mode.

## 2026-09-06 - Isolated Fictional Project Demonstration

Decision: Keep three explicitly fictional typed project records in
`src/data/projects.ts`, enable them automatically in Astro development and in a
dedicated `demo` build mode, and write that build only to `dist-demo/`.

Reason: Complete project interactions and visual QA require enough content to
exercise the rail and detail navigation before approved client cases exist.
Separating the demo from the content collection keeps the standard `dist/`
artifact free of demo routes and allows a blocking integrity scan.

## 2026-09-06 - Native Navigation With CSS Entry Reveal

Decision: Remove Astro ClientRouter from the active layout and use native
document navigation plus a short CSS bite reveal on `main`.

Reason: Rapid back/forward testing exposed a rejected browser transition with
the client router. Native navigation is deterministic, works without
JavaScript, reduces the client payload and preserves a restrained branded entry
motion that is disabled for reduced-motion users.

## 2026-09-06 - Fixed Control Clearance

Decision: Reserve a right-side content rail on tablet/desktop, place both fixed
controls in that rail at separate vertical positions, and retain bottom corner
controls on mobile with explicit hero/footer clearance.

Reason: Visual QA at 1440×1000 and 834×1112 found collisions between fixed
controls and meaningful hero/project copy. The rail is reversible and protects
content without changing the approved visual direction.

## 2026-09-06 - Safe Environment and Release Metadata

Decision: Treat invalid canonical origins or non-literal approval flags as
unapproved, emit canonical/OG/favicon tags only when their prerequisites exist,
and exclude an existing release manifest from its own input set.

Reason: Prelaunch defaults must fail closed. Conditional metadata avoids broken
or unverifiable publication data, and self-exclusion makes repeated release
manifest generation stable.

## 2026-09-06 - Reference Translation, Not Replication

Decision: Translate the supplied references into Colmillo's own interaction
vocabulary: a contextual pressure cursor, sticky layers that compress as the
next section covers them, a compact numbered side rail, and a vertical-scroll
to horizontal-project scene with native overflow fallback. Keep the goodbye
placeholder as an original development-only CSS composition until the official
animation arrives.

Reason: The useful interaction principles can be verified on the current live
sites, but their branding, assets and exact choreography are not source
material. `mosaic.com` has also changed since the original brief, so the cursor
requirement is treated as intent rather than copied from an obsolete build.

## 2026-09-06 - Permanent Editorial Routes With Isolated Demo Copy

Decision: Add `/manifiesto/` and `/studio/` as permanent routes and redesign
`/contacto/` as a complete editorial destination. Keep all unapproved manifesto
and studio narrative inside the existing development/demo gate while allowing
the standard artifact to expose only the semantic route shell, internal
navigation and approved brand labels.

Reason: Manifiesto and Studio need to be real, linkable pages, but route
completeness does not authorize invented production claims. This split lets the
responsive experience be designed and tested now without weakening the
production demo-content guard.

## 2026-09-06 - Responsive Minimum Is Pixel-Based, Not Font-Based

Decision: Remove the `20rem` minimum inline size from the document and verify
the editorial route set at 320 px and with a 200% root font size.

Reason: A rem-based document minimum expands to 640 CSS pixels when users double
text size, creating horizontal overflow. Layouts now reflow independently of
font scaling instead of imposing a wider viewport.

## 2026-09-06 - Supplied Raster Wordmarks

Decision: Supersede the earlier reference-only logo decision after the user
supplied explicit black and cream logo variants. Remove only their uniform
mattes with deterministic alpha recovery, retain the complete `studio`
lettering, crop to the detected artwork with a 12 px transparent margin, and
use the black mark on the standard cream header and the cream mark on the dark
Contacto header.

Reason: A generative extraction visibly altered the official artwork and was
discarded. Recovering alpha mathematically from the source matte/ink colors
preserves the original contours, spacing, color and antialiasing. The paired
header treatment gives each supplied variant sufficient contrast without
inventing or vectorizing a new logo. `check:brand` locks dimensions and alpha
invariants; the original vector master and official clear-space rules remain
client deliverables.

## 2026-09-07 - Centered Menu as the Primary Navigation Gesture

Decision: Plan the next creative-polish phase around a menu trigger centered
horizontally at the bottom of the viewport. The navigation remains minimal, but
its panel becomes a full-surface editorial gesture instead of a small lateral
popover. Simplify the header so it does not duplicate navigation while real
quick-contact channels remain unavailable.

Reason: The user explicitly requested a centered menu and a substantially more
modern, professional interaction layer. Treating the menu as the primary global
gesture creates a clear hierarchy and a reusable motion pattern. The existing
semantic `<details>` fallback, native navigation, keyboard support, reduced
motion and production content guards remain non-negotiable.

## 2026-09-07 - Full-Surface Menu and Unified Pressure System

Decision: Implement the centered menu as the sole primary navigation gesture,
move the motion preference into its full-viewport panel, simplify the header to
route context, and share pointer/surface/scroll state across the existing GSAP
features without introducing a second animation loop or another dependency.

Reason: Browser inspection confirmed that one strong navigation surface creates
a clearer hierarchy than several competing fixed utilities. The shared state
lets hero, editorial pages, project cards and cursor feel related while keeping
each component to one primary gesture and preserving native navigation,
keyboard behavior, coarse-pointer fallbacks and the JavaScript budget.

## 2026-09-07 - Cross-Document View Transitions Rejected After Touch QA

Decision: Do not activate cross-document View Transitions or shared project
transition names. Retain native document navigation and the short CSS page
entry, with no entry animation when scripting or reduced motion is disabled.

Reason: The progressive implementation produced `Transition was skipped`
during real back/forward testing in the 834 px and 390 px touch profiles. The
visual gain did not justify a history-navigation regression. Removing the
feature also avoids dormant transition metadata and keeps the fallback
deterministic.

## 2026-09-09 - Explicitly Authorized Public Demo on Vercel

Decision: Publish the isolated demonstration temporarily at
`https://colmillo-studio.vercel.app/` by overriding the Vercel project build
command to `npm run build:demo` and its output directory to `dist-demo`. Keep
all `DEMO FICTICIA — NO PUBLICAR` notices visible and retain the prelaunch
`noindex`/blocking robots safeguards.

Reason: After being told that the local experience contains fictional projects
and provisional copy, the user explicitly authorized publishing it. Keeping
the exception in Vercel rather than changing `npm run build` preserves the
repository's clean production artifact and makes rollback a two-setting
operation. This authorization does not approve the fictional content as real
client work, remove the outstanding content requirements or authorize search
indexing.

## 2026-09-09 - First Approved Contact Channels

Decision: Publish the client-supplied email `hola@colmillostudio.com` and
Instagram profile `https://www.instagram.com/colmillo.studio/` in the
centralized contact configuration, and keep `phone` unpublished. Add an
optional `value` field so the real address is visible where there is room while
the sticky header keeps short labels.

Reason: The user supplied these two channels directly, so they are approved
content rather than invented data. Publishing them activates the sticky-header
quick access required by the brief. No telephone number was supplied, so that
channel stays `null` and no `tel:` link is emitted. The mobile rule that hid all
but the last header nav item was removed because it would have hidden the email
on small screens now that the nav carries real channels.

## 2026-09-09 - Hero Display Word Is Not Prose

Decision: Exempt `.hero__kinetic` from the global `p { max-inline-size:
var(--reading-width) }` measure cap and force `white-space: nowrap` on its two
spans.

Reason: The hero word inherited the 48rem readability cap intended for
paragraphs. Above roughly 1330px the display font grew past 768px, so `MILLO`
wrapped and the hero read as three lines (`COL` / `MILL` / `O`) instead of the
intended `COL` / `MILLO`. `nowrap` makes the two-line lockup independent of the
active font metrics, which also protects it once licensed Bootzy TM arrives.
`.hero` and `.hero__stage` already clip, so a wider face cannot create document
overflow.

## 2026-09-09 - CTA Label Centering

Decision: Give `.bite-button` `text-align: center`, `text-wrap: balance`, wider
optical padding (`1.05rem 2rem`) and a slightly larger `max-inline-size`
(18.5rem).

Reason: The label was centered as a flex item but its own lines were
start-aligned, so any font whose metrics forced a second line rendered visibly
off-center. The rounded bite shape also eats into the horizontal edges, so the
text needed more optical padding to stop touching the curve. Verified with a
deliberately wider display face: both wrapped lines now center within 0px of
the button axis.

## 2026-09-09 - The Page Entry Must Not Animate Transform On `main`

Decision: Remove `transform: translateY(0.6rem)` from the `page-bite-in`
keyframe. The entry reveal now animates only `opacity` and `clip-path`.

Reason: `body > main` uses `animation: 260ms var(--ease-bite) both
page-bite-in`. With `animation-fill-mode: both` the animated properties stay
applied after the animation ends, so `main` kept a computed
`transform: matrix(1, 0, 0, 1, 0, 0)` instead of `none`. A non-`none` transform
makes an element the containing block for every `position: fixed` descendant.
ScrollTrigger pins the horizontal project rail with `position: fixed`, so the
pinned section resolved against `main` at the document origin instead of the
viewport: it scrolled out of view for the entire pin and reappeared only when
the pin released. `clip-path` and `opacity` produce the same bite reveal
without creating a containing block. A regression test asserts that no ancestor
of the rail declares transform, perspective, filter or backdrop-filter.

## 2026-09-09 - The Pinned Rail Fits The Viewport

Decision: While `data-horizontal-enhanced` is set, the projects section is
exactly `100svh` with `grid-template-rows: auto minmax(0, 1fr)`, the track
fills the remaining row, and the card cover drops its fixed aspect ratio to
absorb the leftover space. The native overflow fallback used by touch, reduced
motion and no JavaScript keeps its taller intrinsic layout.

Reason: A pin freezes vertical scrolling, so anything below the fold is
unreachable for the whole pin. The section measured 1421px against viewports of
1000px and 800px, which cut off the bottom of every card including its title,
summary and year. Constraining the section to the viewport is the only way the
whole card stays reachable while the rail plays. Verified at 1920×1080,
1440×1000, 1440×800, 1280×720 and 834×1112: the card is fully inside the
viewport and clears the fixed menu trigger at every size.

## 2026-09-09 - Home Manifesto As A Scroll-Driven Poster Sequence

Decision: Rebuild the home manifesto as one section containing a 300svh track
with a single `position: sticky` 100svh stage. A scrubbed GSAP timeline moves
`Morder.`, `Presionar.`, `Dejar marca.`, the tension/release shape and the
editorial micro-elements through four compositions with deliberate pauses
between them. The section opts out of the shared `.stack-section` sticky
behaviour on desktop; the following section still covers it, so the layered
identity is unchanged.

The CSS describes the final composition and the timeline only applies transform
offsets that resolve to `transform: none`, so reduced motion, coarse pointers
and no JavaScript inherit a finished static poster rather than a stripped one.
Coarse pointers and short viewports get a linear editorial stack with reveals
and never the pin. The shape is three layers - positioned box, travelling inner
layer, deforming skin - so it can be compressed and stretched without squashing
its label, and its bite is a surface-coloured disc astride the contour rather
than a second outline.

New styles live in `src/styles/manifesto-home.css` under a new `sections`
cascade layer placed after `components`, and the timeline in
`src/scripts/motion/ManifestoMotion.ts` mounts through the existing
`MotionController`.

Reason: The previous composition was a single static grid and read as one
unchanging block. A sticky stage keeps native vertical scroll, adds no wheel
interception and no scroll trap, and lets scale, position and emptiness carry
the personality instead of added effects. The new cascade layer was necessary
because layer order beats specificity: component-layer rules such as
`p { max-inline-size: var(--reading-width) }` would otherwise win over the
section's own layout, which is the same class of bug already recorded for the
hero display word. Timeline offsets are fractions of the measured canvas with
`invalidateOnRefresh`, so the choreography survives 1024-1920px and resize
without per-breakpoint tuning. The pointer response reuses the bounded
`--pointer-shift-*` variables `CustomCursor` already publishes, so no second
listener or frame loop was introduced.

## 2026-09-09 - Project Rail Test Scrolls Are Re-Applied, Not Assumed

Decision: In `tests/e2e/demo.spec.ts`, the project rail test re-applies its
scroll until the rail actually sits at the top of the viewport instead of
trusting one absolute jump. Its assertions are unchanged.

Reason: The helper computed `getBoundingClientRect().top + scrollY` before
scrolling and jumped once. With sticky sections above it that reading is not a
stable document offset, and after the home grew the single jump landed 977px
short, so the hover point fell outside the viewport and the cursor assertion
failed against an element that was never hovered. The browser-verified user
path is unaffected: the hero `#manifiesto` anchor lands at 0px offset at 1366
and 1440. The fix hardens the harness rather than relaxing the contract.

## 2026-09-09 - Services As A Composition, Not A Card Grid

Decision: Rebuild the home services section as an asymmetric editorial
composition — "the workshop" — with a typed data source
(`src/data/services.ts`), an abstract Colmillo glyph per service
(`src/components/ui/ServiceGlyph.astro`), a sticky vertical marker, an
oversized backdrop word and pointer emphasis driven by
`src/scripts/motion/ServicesMotion.ts`.

Reason: The previous section was a bare development placeholder — a title and a
note — not a card grid. It communicated nothing about the studio's range. The
new composition takes spatial freedom from one reference and per-service
editorial depth from another, expressed entirely through Colmillo's existing
cream/ink/orange system and its bite, pressure and trace vocabulary. Positions
come from explicit `nth-child` rules, never randomness, so the layout is
reproducible and reviewable.

## 2026-09-09 - Services Never Hide Content Behind Hover

Decision: Every service always renders its number, glyph, title, short line and
full description. Pointer and scroll only change emphasis: the active entry
keeps full opacity, the rest drop to 0.55, the glyph compresses to
`scale(0.96, 1.03)` and the backdrop word and sticky marker follow. Services
without an approved destination render as plain articles, never as links with
`href="#"` and never as `tabindex="0"` pseudo-controls.

Reason: A hover-revealed description would need a focus equivalent, and the
only honest way to build one for entries that have no real destination is a
fake control. Keeping all copy in the DOM gives keyboard, touch, screen-reader,
reduced-motion and no-JavaScript users the complete section, and lets the
composition stay a pure visual enhancement. The active service is tracked from
scroll position as well as from the pointer, so the editorial focus is truthful
without any pointer at all.

## 2026-09-09 - Services Opt Out Of The Sticky Stack

Decision: On screens wider than 64rem the services section is `position:
relative` with a `min-block-size` of roughly 150svh, and compresses its
editorial padding and offsets below 58rem of viewport height.

Reason: `.stack-section` is `position: sticky` on desktop, so a section taller
than the viewport would pin itself and leave its own lower half unreachable —
the same class of trap as the project rail pin. The manifesto section already
opts out for the same reason. Height-aware compression keeps the section
between 1.4 and 2.1 viewport heights at 1920x1080, 1440x900, 1366x768,
1024x1366, 768x1024, 430x932 and 390x844, so the section never overstays.

## 2026-09-09 - Provisional Services Are Isolated Demo Data

Decision: `src/data/services.ts` ships four flagged demonstration services that
resolve to an empty array outside development and `demo` mode. The section
renders a visible `DEMO FICTICIA — NO PUBLICAR` notice, carries
`data-dev-placeholder`, and `check:production` now also blocks the string
`Texto provisional de demostración`.

Reason: No approved services list exists, and none may be invented. The repo
already solved this for case studies with `demoProjects`, so services follow
the same isolation contract: the composition and its interaction can be
designed and QA'd now, `dist/` stays clean, and swapping in approved copy is a
single-file change.
