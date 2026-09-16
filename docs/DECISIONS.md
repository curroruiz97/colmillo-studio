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

## 2026-09-10 - The Colmillo Edge Menu Replaces The Centered Trigger

Decision: Retire the centered bottom trigger and the full-surface panel, and
make the primary navigation a right-edge rail with three states declared on the
wrapper as `data-state`: `closed`, `peek` and `open`. `SideMenu.astro` and
`SideMenu.ts` were deleted, their rules were removed from `motion.css`, and the
replacement lives in `EdgeMenu.astro`, `EdgeMenu.ts` and `edge-menu.css`.

Reason: The user asked for the interaction pattern of a navigation that lives
just outside the viewport and answers to proximity, expressed in Colmillo's own
art direction rather than copied. A rail against the edge also frees the bottom
of every viewport, which previously needed explicit clearance in the pinned
project rail and the footer. The reference supplied the behaviour only; the
shape, palette, typography, timings and copy are the project's own.

Superseded: the 2026-09-07 decisions that made the centered trigger and the
full-surface panel the primary navigation gesture. Everything they protected -
the semantic `<details>` fallback, native navigation, keyboard support, reduced
motion and the production content guards - is preserved.

## 2026-09-10 - The Panel Leaves The Disclosure Once JavaScript Runs

Decision: Keep the panel inside `<details>` in the markup, and on
initialisation move it out to become a sibling, marking the wrapper
`data-enhanced`. CSS drives an enhanced panel from `data-state` and falls back
to a plain full-screen panel owned by the native disclosure when the attribute
is absent. The cleanup restores the original position.

Reason: A closed `<details>` does not render its content, so the panel could
only ever animate in, never out; closing snapped. Author CSS cannot override
that, because Chrome hides the content through a slot in the UA shadow tree
rather than through the light-DOM children - verified in the browser, where
forcing `display: block` on the panel of a closed disclosure still measured
0 px high. `details::details-content` would solve it but is too recent to rely
on. Relocating the panel keeps one accessible control, keeps the no-JavaScript
path working, and lets both directions of the transition be authored normally.

## 2026-09-10 - Navigation Type Is Sized From The Panel, Not The Viewport

Decision: Make `.edge-menu__panel` a `container-type: inline-size` query
container and size the route labels with `clamp(1.6rem, 8.2cqi, 4rem)`, with
`overflow-wrap: normal` so a label can never break mid-word. A Playwright test
asserts that every label renders on one line at eight widths.

Reason: Viewport-relative sizing broke the fit, because the panel's share of
the viewport changes with the breakpoints while its paddings do not: `4.7vw`
wrapped `MANIFIESTO`, `PROYECTOS` and `CONTACTO` onto two lines at 1920. Sizing
from the panel keeps comparable headroom everywhere. The query container is the
panel and not the scrolling content box, so the font size cannot chase a
scrollbar that its own height brings and removes. The global
`overflow-wrap: anywhere` rule would otherwise split a route name mid-word, and
the licensed Bootzy TM face will change these metrics, so the one-line
assertion is the guard rather than a fixed size.

## 2026-09-10 - The Rail Reservation Goes On Containers, Not On `body`

Decision: On coarse pointers, where the whole tappable handle stays inside the
viewport, reserve `--edge-rail-clearance` on `.content-shell`, `.site-footer`,
the fixed header's end inset and the full-bleed project card. Do not put the
reservation on `body`.

Reason: The 46 px touch handle measurably covered the project hero summary and
a capability item at 390 px. Padding `body` fixed the overlap but shrank every
full-bleed section, leaving a cream band down the right edge of the dark hero.
The inner containers already exist on every route, so reserving there keeps
backgrounds reaching the edge behind the rail. `body` keeps only the scroll-lock
gutter, which `EdgeMenu.ts` publishes as `--scroll-lock-gutter` so the two
reservations compose instead of overwriting each other.

## 2026-09-10 - Content Is Not Displaced When The Panel Opens

Decision: Do not translate `main` when the edge menu opens, even though a small
leftward shift would suit Colmillo's pressure vocabulary. The pressure is
expressed by the panel's own contour, its orange edge and the staggered reveal
of the routes instead.

Reason: The 2026-09-09 decision records that any transform on `main` makes it
the containing block for every fixed descendant, which sends ScrollTrigger's
pinned project rail to the document origin for the whole pin. A regression test
asserts that no ancestor of the rail declares a transform. The user's brief
explicitly allowed dropping the effect if it conflicted with sticky or
ScrollTrigger behaviour, and it does.

## 2026-09-10 - The Reported Scene Is The One Crossing The Viewport Centre

Decision: Narrow the scene observer's root to a band around the viewport centre
(`rootMargin: '-45% 0px -45% 0px'`) and keep a ratio per tracked section rather
than comparing only the sections present in one callback batch.

Reason: `intersectionRatio` is a fraction of the target, not of the viewport, so
a short section fully in view scored 1.0 while the tall section actually filling
the screen scored far less - the rail reported `03 STUDIO` while the reader was
on Contacto. Comparing within a single batch hid this behind intermittent
ordering and made the test flaky rather than wrong. The centre band normally
leaves one candidate and matches what the reader is looking at. `SurfaceTone`
already narrows its root the same way.

## 2026-09-10 - The Handle Does Not Follow The Surface Tone

Decision: The edge handle is brand orange with ink text on every surface. Only
the spine and its progress mark follow `data-surface-tone`.

Reason: The handle is the affordance, and access to the navigation is the first
priority in the brief. Tying it to the tone made it disappear the moment a
section's declared tone and its actual media disagreed, which is exactly what
the home hero showed once the official cream hero media was wired while the
section still declared `data-surface-tone="dark"`. Orange reads on both cream
and ink, and it matches the coarse-pointer treatment, so the affordance is now
one thing everywhere.

Amended the same day at the user's request: the hover state was briefly
`--color-brand-red` and is now brand orange throughout. The closed and peeking
handle therefore does not change colour under the cursor - its travel into the
viewport is the response - and only the open state's transparent outlined tab
fills on hover.

## 2026-09-10 - The Native Scrollbar Is Hidden And The Rail Carries No Marker

Decision: Hide the document scrollbar in `globals.css` with `scrollbar-width`,
`-ms-overflow-style` and `html::-webkit-scrollbar`, and hide the edge panel's own
the same way. Remove the orange progress marker from the edge rail, together
with `.edge-menu__spine::after`, its `accent` tone override, the
`--edge-mark-size` and `--edge-progress` custom properties and the
`setProperty` call that fed them.

Reason: Both were requested directly. Only the indicator is removed, never the
behaviour: the document is still a scroll container, so wheel, trackpad,
keyboard, touch, scroll anchoring, programmatic and anchor scrolling are
untouched, and that is asserted at eight widths. Removing the marker leaves the
rail a stable graphic edge rather than a second progress readout competing with
the numbered one the handle and the panel already carry; the section observer is
unchanged because it still drives those readouts and `aria-current="location"`.

Two consequences are worth recording. With no reserved scrollbar the layout
viewport equals the visual viewport, so fixed chrome anchored to `right: 0` now
sits flush against the true edge and `--scroll-lock-gutter` resolves to 0 px; the
compensation is kept only as a guard for engines that still reserve the space.
And the page loses the scrollbar as a visible position indicator - the deliberate
trade for the cleaner edge, mitigated by the numbered scene readout that the rail
and panel already publish.

## 2026-09-10 - The Hero Loop Is Delivered Pre-Composited For Cream

Decision: derive the hero loop from the supplied master with its sheet mapped to
`--color-brand-cream` and then cut out, and treat the result as an asset that is
only valid on a cream surface. `npm run check:hero` compares the cream baked
into `scripts/prepare-hero-media.mjs` with the token and fails if they diverge.

Reason: the master is black line art on a uniform sheet measured at
RGB(250, 250, 250), and the hero surface is flat cream. Mapping the sheet to the
page colour makes every antialiased edge blend ink into cream before encoding,
so no keying step has to invent an edge and no halo is possible. Cutting the
sheet afterwards is then exact, because the pixels being cut are already the
page colour.

The trade is that the derivative cannot be moved onto another background without
being regenerated. That is recorded in the script header, in
`docs/CONTENT_NEEDED.md` and enforced by the token check.

## 2026-09-10 - The Sheet Is Cut Everywhere, Not Only Where It Touches The Border

Decision: make every pixel at or above luminance 240 transparent, including the
white *inside* the drawing - faces, shirts, shoes, the handbag, the cathedral.

Reason: the first implementation isolated the background with a 4-connected
flood fill seeded from the frame border, which is the textbook way to keep
interior white opaque. Measured against the rendered page that was wrong. Those
interior areas are large, flat and exactly the sheet colour, so after encoding
they landed 1 to 3 levels away from the cream behind them and read as a faint
rectangle over the flat page - visible in a 1920x1080 capture.

Because the sheet and the page are the same colour, letting the page show
through the drawing is identical in appearance and exact in value. The cost is
file size: the alpha plane becomes a detailed mask instead of one large region,
which took the desktop WebM from 1.65 MB to 4.27 MB at the same CRF. It was
brought back to 2.12 MB with alternate reference frames, a slower preset and
CRF 52, verified against the rendered result rather than against a metric.
Exactness on the first screen was judged worth the remaining 0.5 MB.

## 2026-09-10 - The Hero Is A Centred Canvas, Not The Editorial Measure

Decision: the hero opts out of `.content-shell`. Its inner grid is full width
with page gutters, and the loop is centred on the viewport.

Reason: `.content-shell` is left-aligned from the page gutter above 48rem and
capped at 90rem, which is right for the editorial routes but left the loop
sitting at x=764 on a 1920 viewport while `SEGUIR` sat at x=1769. The first
screen reads as one composition rather than as a column, so it is centred; every
other section keeps the shared measure.

## 2026-09-10 - The Hero Loop Sizes From A Height Budget

Decision: the loop's height is `min(100svh - --hero-reserved, width cap * 3/4)`,
where `--hero-reserved` is the sum of the gutters, the label line, the two gaps,
the CTA and the sliver reserved for the bottom-right control.

Reason: two earlier attempts each failed one half of the range. A fixed `svh`
cap pushed the CTA off a 1366x768 window; letting the loop fill a `1fr` row put
250 px of empty paper between the loop and the CTA on a 1024x1366 tablet, which
contradicts the requirement that the CTA sit directly under the animation. The
budget satisfies both: the loop shrinks on a short window and stops growing on a
tall one, and the group stays centred. Verified at 1920x1080, 1440x900,
1366x768, 1024x1366, 768x1024, 430x932, 390x844 and 320x720.

## 2026-09-10 - The Hero Poster Is Only Rendered Under Reduced Motion

Decision: `.hero__poster` is `display: none` by default and revealed only when
motion is reduced.

Reason: the previous hero video was opaque and covered the poster beneath it.
The delivered loop is transparent, so the poster showed through the drawing and
two different frames of the animation were visible at once. Everyone else
receives the same file through the video's own `poster` attribute, so the still
frame still paints before the first decoded frame and nothing extra is
downloaded.

## 2026-09-10 - The Loop's Box Is Opaque And The Orange Trace Is Gone

Decision: `.hero__media-frame` is filled with `--color-brand-cream`, and the
hairline orange ellipse (`.hero__shape--orbit`) was removed from the markup and
the styles. The hero's decor is now two ink shapes.

Reason: the loop carries a real alpha channel, so every decorative shape behind
it showed straight through the drawing's empty paper — the trace appeared to run
across the artwork rather than behind it. Filling the loop's box with the page
colour is invisible against the cream surface and fixes that for every shape at
once.

It also made the trace unshippable. Once the box was opaque the ellipse was cut
dead at two invisible vertical edges, terminating in mid-air on both sides of
the loop, which reads as a rendering fault rather than as a line passing behind
the artwork. Verified at 1920x1080 and 1440x900 before removing it. The
alternatives were both worse: masking the trace to dissolve near the loop needs
a mask keyed to a box that moves with the viewport, and reshaping its path to
avoid the loop was explicitly out of scope. The user authorised removal in the
same instruction that asked for the trace to sit behind the loop.

## 2026-09-10 - The Hero Group Hangs High With A Weighted Split

Decision: the first screen reserves `--hero-bottom-space` under the scroll hint,
and `.hero__stage` distributes whatever height the group does not use through
two flexible spacer rows weighted `--hero-stage-lead` to `--hero-stage-trail`
(0.32fr to 1fr).

Reason: the brief was to lift the loop, CTA and hint towards the top of the
screen. Reserving foot space alone does nothing, because the loop's height
budget simply expands to eat it; anchoring the stage to the top with
`align-content: start` did lift it, but on a tall narrow screen the loop is
capped by width rather than height, and every one of the ~364 px of leftover
went to the foot, stranding the CTA at 40% of a 390x844 screen with half the
canvas empty. The weighted split lifts the group hard on a wide screen, where
the slack is small, and still leaves a proportionate margin above it on a tall
one. The spacers collapse to zero by themselves when the loop has taken every
pixel, so short windows are unaffected.

The same foot space is what lets `.hero__shape--disc` land on the bottom edge
instead of bleeding through it.

## 2026-09-10 - Home Manifesto Type Scales Through `font-size`, Never `transform`

Decision: the three manifesto words carry a `--word-scale` custom property that
feeds their `font-size`. The scroll timeline animates that property, sets
`force3D: false`, and gives the words no `will-change`. The only transform a
word ever receives is a translation that lands on exactly zero.

Reason: the oversized "Morder." was visibly soft. It was not a filter and not an
accident of the font: `.manifesto-home__word` declared `will-change: transform`
and the timeline held the word at `scale(1.72)`, so Chrome rasterised the glyphs
once at 105.6 px and stretched that texture to an effective 181 px. GSAP's
default `force3D: 'auto'` compounds it by promoting the element to its own layer
for the whole duration of a scrubbed tween, which also resamples sub-pixel
translations. Animating the real font size makes the browser shape and rasterise
actual glyphs at the actual size in every frame, so the word is as sharp at
169 px as ordinary HTML text, and every rest pose is an exact font size with an
identity transform rather than a fractional scale.

The cost is a layout and a glyph-cache miss per frame while a word is
travelling. Measured over a full scrub of the section at 1920x1080 that took the
median frame from 16.6 ms to 24.8 ms. Quantising `--word-scale` to 1/50 through
a GSAP `modifiers` function brought it back to 17.4 ms — consecutive frames
mostly ask for the same size — while every rest value (1, 1.44, 1.7) stays an
exact multiple, so the poses are untouched. Two device pixels of granularity are
invisible on a word that is mid-flight.

Rejected: keeping `transform: scale` and compensating with a filter, which hides
the symptom and costs more; and rasterising at the largest size and only ever
scaling down, which is still a stretched texture at every intermediate value.

## 2026-09-10 - The Manifesto Pair Is Laid Out By Flex, Not By Percentages

Decision: "Morder." and "Presionar." share `.manifesto-home__band`, a flex row
on desktop. Their resting positions come from that layout; only their
protagonist poses are expressed as offsets, and "Presionar." reaches the left
margin through a distance measured from the rendered width of "Morder." at
refresh time.

Reason: the two words have to end up side by side with real editorial air
between them, at 1024px through 1920px, and the display face is still unlicensed
— `--font-display` currently resolves to the system stack and will change when
Bootzy TM arrives. Two hand-placed percentages would encode today's metrics and
collide or gap the day the real face lands. A flex row with a `clamp()` gap
cannot collide, whatever the metrics.

The one coupling this creates is deliberate: while "Morder." is oversized it
pushes its sibling's layout position sideways. That happens only between
progress 0 and 0.3, where "Presionar." is at `opacity: 0`, and the pair's layout
is final from progress 0.34 onwards, so nothing visible ever depends on it.

## 2026-09-10 - The Sticky Contact Header Is Removed

Decision: Delete the fixed site header (wordmark plus the "Correo" and
"Instagram" quick links) on every route, together with `SiteHeader.astro`,
`StickyHeader.ts`, their styles, the `--z-header` token and the tests that
covered them.

Reason: explicit user request. The approved contact channels remain published in
the home contact section and the footer, and the edge menu keeps navigation and
its own wordmark, so no content or route becomes unreachable. `--header-height`
is kept because section top padding still reads from it.

## 2026-09-10 - Services Is An Editorial Spread, Not A Poster

Decision: Rebuild the home services block as a two-column editorial spread. The
heading (`02 / Colmillo / Servicios`, `Nuestros servicios` and the CTA) holds the
left third and the four services occupy the right two thirds. The oversized
backdrop word, the sticky vertical
`SERVICIOS 01` marker, the per-service `01`-`04` numbering and the visible
`DEMO FICTICIA — NO PUBLICAR` badge are all gone, together with their CSS,
their motion hooks and the `number`/`demoNotice` fields on `ServiceRecord`.
The heading dropped from `clamp(3.4rem, 12vw, 11rem)` uppercase to
`clamp(2.4rem, 4.6vw, 4rem)` sentence case, and the service titles, accent lines
and body copy all came down with it.

Reason: the block was the loudest thing on the page after the hero and the
manifesto, and it was competing with both. It is the one section that exists to
be scanned, so hierarchy now runs heading > title > accent > body, and the air
does the composing instead of decoration. Beans' left-heading / right-list
structure is the reference for the *hierarchy* only; the palette, the
illustration, the shapes and the motion stay Colmillo's.

## 2026-09-10 - The Provisional Services Marker Moved Into The Copy

Decision: The services section no longer renders the red `DEMO FICTICIA — NO
PUBLICAR` badge. The provisional status is still carried by
`data-dev-placeholder` on the section and by the `Texto provisional de
demostración.` sentence that opens every service description.

Reason: the badge was one of the elements the user asked to remove, and both
remaining markers are already in the `check:production` forbidden list, so the
standard build still cannot ship this copy. Nothing became less honest: the
first thing a reader sees under every service title is still the sentence that
says the text is provisional. Project cards and the editorial pages keep their
badges, because those present fabricated *work*, not placeholder prose.

## 2026-09-10 - Services Motion Is Only A Reveal

Decision: `ServicesMotion.ts` now does one thing: reveal each entry once, from
`opacity: 0` and `y: 22`, on its own ScrollTrigger. The scroll-driven active
service, the backdrop-word and marker synchronisation, the `gsap.matchMedia`
pointer override and the dim-the-others state were all deleted. Hover and focus
live entirely in CSS, behind `(min-width: 64.01rem) and (hover: hover) and
(pointer: fine)`: the title shifts 3.2px, the description lifts from `0.72` to
full opacity and the vignette compresses to `scale(0.96, 1.05)`.

Reason: the section had to feel calmer than the manifesto, and the old module
owned scroll state for decoration that no longer exists. A single per-entry
trigger is also the pattern `EditorialMotion.ts` already uses; a section-level
trigger on a block over 1200px tall did not reliably fire and left every entry
at `opacity: 0`. Nothing is dimmed any more, so no entry is ever less readable
than another.

## 2026-09-10 - Service Glyphs Are Hand-Drawn Vignettes

Decision: Replace the four abstract glyphs (`pressure`, `notch`, `module`,
`trace`) with four original vignettes (`strategy`, `identity`, `digital`,
`content`) of the same character: an open outlined head, solid cream hair and
clothing, round-capped limbs, a faint ground line and exactly one orange
accent — a flag, a mask with a fang, a screen answering a touch, a page being
written.

Reason: the abstract set read as a generic icon library, which is the opposite
of the brief, and it shared nothing with the client's hero loop. The hero draws
filled black clothing over an open face on cream; on ink the same hand inverts to
cream, so the vignettes and the loop now read as one illustrator. They are
decorative and stay `aria-hidden`, so the service title still carries all the
meaning.

## 2026-09-10 - The Services Grid Is An Even 2x2, Not A Staircase

Decision: On screens wider than 64rem the four services sit in a plain
`repeat(2, minmax(0, 1fr))` grid with `align-items: start`: Estrategia and
Identidad on the first row, Digital and Contenido on the second, equal column
widths, `column-gap: clamp(2rem, 4vw, 4.5rem)` and
`row-gap: clamp(3.5rem, 7vw, 6rem)`. The alternating percentage indent that made
the entries step down a diagonal is gone, and `--service-indent` with it.
`.services-section__inner` also gained its own
`padding-inline: clamp(1.5rem, 4.5vw, 5.5rem) clamp(0.5rem, 1.5vw, 2rem)`.
Between 48rem and 64rem the heading stacks above the services but the 2x2 is
kept; below 48rem it is one column.

Reason: explicit user direction after seeing the diagonal. Regular positions
read as calm and ordered where the staircase read as restless, and the section
exists to be scanned. The extra inline padding is the editorial indent every
other home section gets from its leading spacer column; this one has no spacer
because the index lives inside the eyebrow, so it pays for the indent directly
and no longer sits hard against the page gutter. Entries are capped at `32ch`,
well under their column, so nothing turns into a card; there are still no boxes,
borders or per-entry backgrounds.

The side effect is that the section is now shorter than the viewport on a
desktop screen (about 870px at 1920x1080 against a `min-block-size` of `62svh`).
That is fine because it opted out of the sticky stack already: it is
`position: relative` while its neighbours are `position: sticky`.

## 2026-09-10 - The Manifesto Gains "Romper." As A Fourth Phase

Decision: "Romper." joins the black header band after "Presionar.", with the
same class, colour and type treatment. It gets its own rise (70-82) and its own
travel into the band (86-102), a unit-for-unit copy of the "Presionar." phase.
"Dejar marca." and the closing illustration/CTA phase move later by the same
36 units, and the desktop track grows from 420svh to 535svh, so each move still
costs the same scroll distance (320svh per 100 units before, 435svh per 136
units now).

To fit three words on one line, the desktop rest size drops to nine tenths
(`clamp(3.06rem, 5.58vw, 5.58rem)`) and the band gap to
`clamp(1.6rem, 4.2vw, 5.4rem)`. The protagonist scales were divided by the same
0.9 (1.7 to 1.88, 1.44 to 1.6), so the oversized poses keep their previous size.
The lead offset is now the natural width of every earlier sibling in the band
plus one gap each, measured, never guessed. Below 64rem the words stack as a
staircase: "Romper." indents twice as far as "Presionar." (16% on mobile, 30% on
tablet) before "Dejar marca." returns to the margin.

Reason: explicit user request, with the constraint that every word keeps its
own moment and nothing else in the section changes.

## 2026-09-10 - Edge Menu, Second Iteration: The Closed State Is One Orange Tab

Decision: Remove the full-height black spine, the vertical `MENÚ` label and the
`01/05` readout from the closed edge menu. Closed, the navigation is a single
orange (`#cd5730`) tab, 20 px inside the right edge at mid-height. The `peek`
state becomes `tracking`: within 64 px of the edge a fine pointer makes the tab
reach to 40 px and follow the pointer on Y only. The Y travel is one
`gsap.quickTo` (0.36 s, `power2.out`) on a carrier element, driven from the
existing passive `pointermove`; no new frame loop. The tab never climbs into
the Instagram control's band (the exclusion zone), never leaves the viewport,
and returns to mid-height when the pointer leaves (past 104 px), the document
or the window. Touch keeps a static, fully visible tab with three short rules;
reduced motion keeps it static too.

Reason: explicit user request for a far less invasive closed state whose only
hint is a small tab. The state machine is one union
(`closed | tracking | open | open-collapsed`) published as `data-state` plus
`data-close`, so no combination of flags can contradict another.

## 2026-09-10 - The Close Control Retracts To A Sliver

Decision: When the panel opens, the tab becomes a thin ink close control
outlined in cream with an orange grip, in the same place. It retracts to a
12 px sliver after 2.6 s unless the pointer is in the hot zone or the control
has focus, comes back on approach or focus, and retracts again 1.4 s after they
leave. Escape, a link and the backdrop still close. On touch the control stays
fully out, because no hover could bring it back.

Reason: explicit user request. The sliver is 12 px rather than the 6-8 px first
tried because the summary's own box is sized to the closed sliver and its
centre must land on a visible piece in every state (see the next entry).

## 2026-09-10 - The Summary's Box Is The Size Of The Closed Sliver

Decision: The `<summary>` is not a hit area; only its visible pieces are, and
the summary box itself is only as wide as the closed tab's sliver, with the tab
and the close control overflowing from its right edge.

Reason: With a carrier-sized summary its centre sat 3 px left of the visible
tab, so a click at the element's centre - what Playwright, voice control and
other assistive tools do - fell through to the page. Nine specs caught it.

## 2026-09-10 - The Open Menu Sits Over A Blurred Ink Backdrop

Decision: The backdrop is `rgb(10 9 8 / 34%)` with `backdrop-filter:
blur(6px)`, applied only while open and held until the fade-out ends. The panel
gains vertical air (`clamp(2.25rem, 6.5vh, 4.5rem)` at both ends and larger
gaps).

Reason: explicit user request to push the page, and the hero loop in
particular, behind the navigation. The blur was measured in Chromium at every
target size with no dropped interaction and no console errors; it exists only
while the menu is open, so it costs nothing otherwise. No glassmorphism: the
panel itself stays opaque ink.

## 2026-09-10 - The Archive Link And The Manual Motion Toggle Are Retired

Decision: Remove "Ver archivo completo" / "Ver proyectos" and the
"Reducir movimiento" button from the panel, together with
`MotionControls.astro`, the `.motion-toggle` styles and the toggle handling in
`MotionPreference.ts`. The module still mirrors `prefers-reduced-motion` onto
`html[data-motion]` and still announces changes, so every reduced-motion rule
keeps working. It clears the `colmillo-motion` key the toggle used to store.

Reason: explicit user request. A stored `reduced` override would otherwise keep
a returning visitor in reduced motion with no control left to undo it.
Projects stay reachable through the `Proyectos` route in the same list.
Conflict recorded: `COLMILLO_BUILD_SPEC.md` still lists `MotionControls.astro`
and an explicit motion toggle; the user's instruction supersedes it here.

## 2026-09-10 - Under Reduced Motion The Routes Carry No Transition

Decision: `.edge-menu__row` gets `transition: none` under reduced motion.

Reason: The previous rule kept `visibility` in the rows' transition list, so
each row inherited the panel's visibility through its stagger delay and the
routes still appeared one by one for about 0.27 s under reduced motion. Found in
QA: a capture 0.3 s after opening showed "Contacto" missing.

## 2026-09-10 - One Global Instagram Control That Folds Into The Corner

Decision: Add `InstagramBadge.astro`, `InstagramBadge.ts` and
`instagram-badge.css`: a single link to `contactChannels.instagram.href`
(nothing hardcoded) fixed at the top right, 3.75 rem from the edge on a fine
pointer so it always clears the tab. On the home it starts scaled up (1.3 wide,
1.15 tablet) and seated on the hero ring's lower-left stroke - measured from the
ring's layout box, so the hero files were not touched - reading
`INSTAGRAM ↗`. Over the first 30% of a viewport of scroll it rides up with the
ring, then contracts and slides into the corner as `IG ↗`. It is one element
throughout. The pill is three pieces (cap, middle, cap) so it contracts through
transforms alone while its ink outline stays whole; the travelling cap eats the
word from the left. The compact pill opens back to the full word on hover and
focus. It hides and turns inert while the menu is open, because the panel
already carries the same link. Phones and routes without the hero start
compact; reduced motion changes state once instead of folding.

Reason: explicit user request. Orange with an ink outline was chosen over an
ink pill so it reads on cream, on ink and on the orange contact hero alike, and
it matches the tab as the family of global chrome. Hero hover is a press into
its own ink offset; compact hover is the expansion.

## 2026-09-10 - Services Keeps One Colour, On The Titles

Decision: The services block drops the `02 / Colmillo / Servicios` eyebrow and
the orange accent line under each title, and the service titles themselves
become `--color-brand-orange`. `shortDescription` is removed from
`ServiceRecord` and from `docs/CONTENT_NEEDED.md`, because nothing renders it
any more. Section padding rises to `clamp(7rem, 14vw, 13rem)`, the grid row gap
to `clamp(5rem, 10vw, 9rem)`, and the list gets
`padding-block-start: clamp(3.5rem, 7vw, 7rem)` so the quadrant starts below the
heading's baseline instead of level with it.

Reason: explicit user direction. Three orange elements per entry plus an orange
eyebrow made the block busier than the manifesto it is supposed to calm down
after. One orange per entry, on the name, is the whole colour budget.
`--color-brand-orange` on ink clears 4.5:1, and these are large bold headings,
so it clears AA with room to spare — `--color-brand-orange-aa` is the darker
variant for orange on cream and would be worse here.

Note that the `(max-height: 58rem)` short-screen branch is what a 1440x900 or
1366x768 laptop actually gets, so its padding and gaps were raised too; tuning
only the tall-screen values would have changed nothing on the machines most
likely to view this.

## 2026-09-10 - The Archive Route Closes The Project Rail

Decision: `Ver proyectos` moves out of the services block and becomes
`.projects-section__outro`, the last child of `#proyectos`. When the rail is
enhanced the section grid becomes `auto minmax(0, 1fr) auto` — header, rail,
route — so the rail is the only flexible row and the button can never be pushed
past the bottom of a pinned viewport.

Reason: explicit user direction, and it is where the action belongs: the reader
has just been shown the work. It also leaves the services block with no
competing affordance at all.

The cost is real and had to be paid for: a pinned section owns exactly one
viewport, so the button spends card height. At 1280x720 that clipped the card
summary. It is paid by `padding-block-end: 0` on the enhanced track — the
track's `--section-space` bottom padding exists so the *native overflow*
fallback clears the section edge, and under a pinned rail with its own closing
row it was more than 150px of dead space. Card copy clearance is now 72-108px
from 1280x720 up, better than before the button existed. On a short desktop the
button also gives back its own padding.

## 2026-09-10 - The Instagram Control Stays In The Corner And Shows The Glyph

Decision: Amends the entry above ("One Global Instagram Control That Folds Into
The Corner"). The hero pose is no longer seated on the ring's stroke and no
longer rides up with it: from the first screen the control sits in the
top-right corner, scaled up (1.3 from 1024 px, 1.15 from 768 px, 1 on phones)
around its own top-right corner, and the fold only shrinks it in place. The
compact state is no longer `IG ↗`: the pill folds all the way into a circle as
tall as the control, the arrow fades with the word, and the Instagram glyph -
inline SVG in `currentColor`, no external icon - fades in. Hover and focus still
open it back to `INSTAGRAM ↗`.

Reason: explicit user feedback: the control must be in the top-right corner at
the start of the page, and the compact state must be the Instagram icon rather
than the letters. The ring measurement and the ride were removed from
`InstagramBadge.ts`; the hero files remain untouched.

## 2026-09-10 - Sections Meet Without A Drawn Seam

Decision: Every section boundary drops its drawn seam. `.stack-section` loses
its 2px `currentColor` top rule, its lift `box-shadow`, its centre notch
(`::after`, shared with `.manifesto-statement`) and its desktop bite tab
(`::before`); `.manifesto-statement` loses its top rule; `.site-footer` loses
its top rule. The rounded top corners, the `-2rem` desktop overlap and the
`SectionStack.ts` clip-path reveal are kept, so the stacking still reads
through shape and colour change rather than a line.

Reason: explicit user request, first for the hero-to-manifesto boundary and
then for every section. On the cream-to-cream joins the rule read as a stray
divider, and the bite tab - clipped by the section's own `overflow: clip` -
only survived as two short ticks hanging from it. This consciously narrows the
"bordes y muescas inspirados en mordiscos" language in
`COLMILLO_BUILD_SPEC.md`; bite shapes remain in buttons, glyphs and hero decor.

## 2026-09-10 - The Project Rail Is Images First, On Cream

Decision: The home `#proyectos` section is rebuilt around large upright images
on the cream surface, following the proportions and rhythm studied on That Lot
(upright pieces with generous air above and below, wide gaps, a title revealed
on hover and a closing "view all" at the end of the rail) without taking its
assets, copy, code or exact layout:

- Background `--color-brand-cream`, ink type, `data-surface-tone="light"`.
  Orange is limited to the closing button and the hover arrow.
- New `ProjectTile.astro` replaces `ProjectCard.astro` in the rail only; the
  archive keeps the card. No number, year, summary, frame, decorative ring or
  demo flag is rendered in the rail.
- Tiles alternate a full-height 4:5 and a 0.86-height 3:4 that share the bottom
  line. Pinned, every size derives from the rail height through container query
  units, capped at a height of 80cqw on tall, narrow screens.
- Hover and focus: the frame compresses to 0.982 and its top-right radius
  grows, the image scales to 1.06, and a cream cut-out with concave fillets
  rises from the bottom-left corner with the title and an orange arrow. Screens
  without hover keep the cut-out open.
- The `1 / n` counter, the arrows and the progress meter are removed. Scroll
  moves the rail, keyboard focus reveals each tile and native swipe covers
  touch, so they duplicated the interaction; the counter was also wrong as
  soon as the number of projects changed.
- `Ver proyectos` moves from under the rail into the track, after the last
  tile, so the rail ends on it. This supersedes the placement in "The Archive
  Route Closes The Project Rail".
- The home shows at most `HOME_PROJECT_LIMIT` (5) projects, ordered by a new
  optional `order` field in the collection schema and then by slug; the
  archive and previous/next navigation use the same order.
- Two more fictional demo projects (`demo-muesca-doble`,
  `demo-capas-en-tension`) and two abstract CSS compositions (`bite`,
  `layers`) fill the five-piece structure in the demo build only. The demo flag
  stays on the archive and on every case study page; it is no longer repeated
  on the home tiles, at the user's explicit request.
- The rail cover is decorative inside its link (`alt=""`) because the visible
  title names the link; the case study keeps the full alternative text.

Reason: explicit user brief. The previous orange cards clipped at the bottom on
short desktops, carried five pieces of furniture per card and read as a
dashboard rather than a portfolio.

## 2026-09-10 - The Services Illustration Is Cropped, Not Padded

Decision: The client's `servicios.png` ships as `servicios-trimmed.png`
(1202x696), cropped to its drawn ink by `scripts/trim-transparent-png.mjs`. The
untouched 1536x1024 original moves to `media-src/servicios.png`, beside the hero
source, so it is preserved in the repo without being published.

Reason: the manifesto illustration keeps its padding because its layout sizes
the box for the padding. This one is sized by its grid column, so a fifth of the
column would have been empty pixels and the drawn art would have come out around
300px wide instead of the 380-470px the composition needs. Cropping is also the
cheaper artifact: 259 KB against 284 KB, and `dist/` no longer carries 283 KB of
an image nothing references.

The art needs no plate, border or blend mode. It has a real alpha channel and is
drawn in `#d25731` and `#f6e5cf` — the brand orange and cream — so on the ink
surface the outlines read cream, the accents read orange and the clothing is
transparent, letting the section show through. That is the hero loop's own trick
inverted, which is why the two read as one hand.

## 2026-09-10 - The Illustration Never Pushes The Services Down

Decision: The services grid is `minmax(0, 0.62fr) minmax(0, 1fr)` — a little
over a third for the heading column, the rest for the 2x2 — and the list is
`align-self: center` with no top padding, so the quadrant centres against the
heading column instead of hanging from the top of the row.

Reason: the illustration lives under the title in the same column, so with the
previous `align-items: start` plus a top padding it would have set the row height
and dragged the services down with it. Centring makes the two columns answer each
other whatever the art's height, and the section still fits the viewport at
1366x768 (683px), 1440x900 (745px) and 1920x1080 (930px).

The split is also what moves the services right: the art is sized by its column,
not by a fixed width, so widening the column is the same lever as enlarging the
illustration. It buys 380-470px of drawn art from 1366 up while the right column
still holds two entry columns of roughly 280-330px, so nothing is crowded.

## 2026-09-10 - Studio Becomes A Cream Spread Around The Character Loop

Decision: The home `#studio` section drops the full orange surface, the split
`COLMILLO / STUDIO` display title, the `Presion / Materia / Movimiento` seal,
the underlined `.section-route` link and the visible development note. It is now
a cream (`--color-brand-cream`) editorial spread: a small `03 Colmillo / Studio`
label, a four-line headline, one supporting sentence and the shared bite button
`Abrir Studio` on the left; the client's character loop on the right, about 55%
of the viewport wide, with no frame, card, border or shadow.

Reason: explicit user brief, structurally inspired by beans.agency (large text
on one side, one large visual on the other, a lot of air). Only the proportions
were taken; no code, copy, asset, colour, typeface or motion was copied.

- Desktop is `minmax(0, 0.7fr) minmax(0, 1.3fr)`. The text keeps the page's left
  gutter like every other section, while the loop is allowed past the content
  measure to the right gutter, stopping short of the edge-menu rail. The loop is
  vertically centred; two `fr` spacer rows hang the text a little above centre.
- Two columns from 64rem, or from 56rem in landscape; a portrait tablet stacks
  text then loop; a phone stacks headline, lede, loop, then the CTA, and lets
  the loop reach into the touch rail's reserved strip because its right margin
  is blank paper.
- The headline is demonstration copy (`src/data/studio.ts`, `placeholder:
  true`), so the section carries `data-dev-placeholder`. It is built from the
  brand's own words and states no service, client or claim. The whole section
  remains gated out of `dist/` by `contentAvailability.studio`; if it is ever
  enabled before approved copy exists it falls back to the structural title.
- The loop is decorative: `aria-hidden`, no pointer events and therefore no
  custom-cursor label.
- Motion is deliberately small: one entry timeline (label, lines rising out of
  their own clips, lede and CTA, the loop lifting 26px from transparent). No pin,
  no scrub, no blur, no scale. The retired `[data-deformable]` hook was removed
  from `motion.css` and from the cursor's target selector; nothing else used it.

## 2026-09-10 - The Studio Loop Is Normalised, Not Keyed

Decision: `public/assets/video estudio.mp4` stays untouched. The published
derivatives under `public/assets/motion/studio/` are generated by
`npm run media:studio` (`scripts/prepare-studio-media.mjs`): cropped to the
drawing's rows plus ~48px of paper (1280x512), every channel mapped
`min(cream, value * cream / floor)` so the paper lands on the page cream, audio
dropped, and the first and last 8 frames rising from and sinking into the paper
so the file's wrap joins paper to paper.

Reason:

- An MP4 has no alpha, and the paper already measured within three levels of
  `#fceeda` (mode RGB 250/236/216, noise +-2). Keying would have risked halos
  around the line art for no gain; lifting the paper onto the page colour makes
  the video's background *be* the section. In Chrome the playing loop's paper
  measures RGB 252/238/219 against the page's 252/238/218, the poster matches
  exactly, and the box's edges are feathered with a mask inside the paper the
  drawing never reaches, so no edge exists for a one-level offset to draw.
- The clip does not loop. Its last frame differs from its first as much as
  frames three seconds apart (SSIM 0.77 against 0.997 for neighbours), there is
  no scene cut, and no internal frame comes back near the first, so there is no
  clean loop point to trim to. Fading the last 8 frames into the paper and the
  first 8 out of it makes the wrap join paper to paper, so the jump becomes a
  third of a second's breath at the end of each pass instead of a teleport. No
  frame is reordered; a crossfade was rejected because the figures stand in
  different places and would ghost. A first attempt rotated the file to start
  at the master's midpoint instead: the wrap was equally seamless, but the dip
  then arrived 2.7 s into the very first pass and the story began halfway
  through, so it was replaced. The poster is frame 8, the first complete
  picture, and `StudioMotion.ts` starts the first pass there
  (`studioMedia.posterTime`) so the still never flashes to blank paper.
- 507 KB (MP4) / 573 KB (WebM) against 1,495 KB for the master with its unused
  AAC track; the page loads only one of them, only when the section is near the
  viewport (`preload="none"`, played by `StudioMotion.ts`, no `autoplay`
  attribute because it would override the preload hint).

## 2026-09-10 - Stack Triggers Refresh In Page Order

Decision: `MotionController.ts` calls `ScrollTrigger.sort()` before refreshing,
on first mount and on every motion-preference restart.

Reason: found while building the Studio section. `SectionStack.ts` is registered
before `HorizontalProjects.ts`, so its triggers were created before the rail's
pin existed and were refreshed in creation order, without the pin's spacing.
Every stack layer after the rail (Studio, Goodbye, Contacto) therefore measured
its "next section arriving" range about one pin length early: at 1440x900
Studio's content was already fully compressed (`opacity: 0.84`) while the section
was still entering at top 567, with the next layer 2,295px away. The same state
is visible in the pre-change screenshots of the old orange section. Sorting is
GSAP's documented remedy; after it the content holds `opacity: 1` until the next
layer actually arrives. Sections before the rail keep their order, so nothing
above it changes. A demo spec guards it (`shellOpacity > 0.95` with Studio at
the top of the viewport).

## 2026-09-10 - Home Entry Intro: A Verified Trace, And Ink On Cream

Decision: The home opens with COLMILLO set letter by letter, after which the
final O grows until the page, already rendered underneath, is seen through its
counter (`HomeIntro.ts`, see MOTION_SPEC). Three choices needed recording.

1. Letters. There is no vector master and scaling the PNG's O 40x would
   pixelate it, so `scripts/trace-wordmark.mjs` extracts the 50% iso-line of
   the official black PNG's alpha channel (marching squares, sub-pixel), keeps
   it on smooth centripetal Catmull-Rom curves and refuses to write unless the
   curves stay within 0.45 source px of the iso-line (0.33 px measured, on the
   M) and no re-rasterised pixel flips inside/out (worst 0.36 alpha). This is
   not a redrawing: it supersedes nothing in the 2026-09-06 raster-wordmark
   decision, which still governs the header, and it is replaced as soon as the
   vector master arrives (CONTENT_NEEDED). Only COLMILLO is traced; `studio`
   is not part of the gesture.
2. Theme. The brief preferred cream letters on ink and asked to test which
   connects better with the hero. Filmed frame by frame at 1440x900 with a
   paused clock, the ink version fails the brief's central requirement: the
   home is cream, so once the counter opens a cream O over a cream page reads
   as a filled cream disc, and the hole - the whole concept - disappears at the
   moment it matters. Ink letters on cream keep the ring against the page, so
   the site is unmistakably seen through the O, and the passing ink ring echoes
   the hero's own ink ring. Cream is the default; `theme: 'ink'` in
   `src/config/intro.ts` restores the other version in one line.
3. Frequency. Once per tab session (sessionStorage, `colmilloIntroPlayed`), as
   the brief preferred; `repeat: 'always'` switches it. Deep links and history
   traversal never play it. Every other e2e spec opts out through the same key;
   `tests/e2e/intro.spec.ts` covers the intro itself.

Reason: The intro must be the brand's own mark, sharp at any scale and legible
as a window, not a fade. No dependency was added: HTML, one SVG, CSS and the
existing GSAP. The shared bundle stays inside budget (138,672 B against the
150,000 B largest-asset limit), and the performance spec passes with the intro
running (CLS < 0.1, LCP < 2.5 s) on desktop Chromium and Pixel 7.

## 2026-09-10 - Studio: No Label, More Inset, Two-Line Headline

Decision: at the user's request the `03 Colmillo / Studio` label is removed
(markup, styles, timeline); on the two-column spread the text is inset by
`--page-gutter + clamp(1.5rem, 4.5vw, 5.5rem)`, the same line as the services
heading (108px at 1440, 142px at 1920); and the headline sets in at most two
lines ("Tensamos cada idea / hasta que muerde.", with the orange carried by the
closing word through `StudioTitleLine.accent`).

Reason: the text sat on the bare gutter (43px at 1440). Two lines need a wider
text column, so the split moved from `0.7fr / 1.3fr` to `0.95fr / 1.05fr` and
the loop gave up the width: 626px at 1440 (was 808), 841px at 1920 (was 1087),
still the larger column. Type is sized per layout so the longer line fits its
column (`3.8vw` two-column, `7.4vw` stacked tablet, and on phones the viewport
less two gutters and the touch rail divided by the line's ~9.6em); measured two
lines at every size from 320x720 to 1920x1080. Only enlarged text may wrap
further, never overflow. The demo spec asserts at most two lines, no label, and
the inset.

## 2026-09-10 - Light Surfaces Are White; The Loops Are Re-Baked, Not Re-Tinted

Decision: at the client's request every light surface moves from
`--color-brand-cream` (#fceeda) to pure white (#ffffff). `--color-background`
now resolves to `--color-white`, and every light surface reads that token
instead of naming cream: `body`, the hero and its loop frame, the
`.stack-section--cream` and `.manifesto-statement--cream` modifiers (manifesto,
Studio, `/manifiesto/`), the project rail and its title cut-out and fillets,
Studio's video box, the home contact section, the footer, the intro's light
ground and `theme-color`. Class names and the intro's `'cream'` theme value
keep their names to avoid churn; they now mean "the light surface".

Deliberately unchanged, because there cream is a detail and not a background:
cream type, borders and hover fills on the ink surfaces (edge menu, services,
Studio process, contact channels), the custom cursor on dark surfaces, the
cream wordmark, the services illustration's own cream fills, the cream strips
inside the fictional demo covers' CSS art, the demo flag and the dev note.

The hero's open ring and its scroll dot change from ink to
`--color-brand-orange`. Size, position, stroke, radius, motion and timing are
untouched; the ink disc stays ink.

Media. Every asset used on a light surface was measured. `manifesto.png`,
`servicios-trimmed.png` and the wordmarks are transparent (0% opaque cream), so
they were not touched. Both loops had the cream baked in and got new
`-white` derivatives from the untouched masters; the cream originals are kept:

- Hero (`npm run media:hero`, default `--paper=white`): the same pipeline with
  the paper target set to white. The master is neutral grey, so
  `255 * min(1, v / 250)` is a uniform 2% lift and the ink keeps its colour.
  Same crop, alpha cut, CRF, preset, frame count (388), rate (30 fps) and
  duration (12.933 s). Measured: opaque light pixels warmth (R-B) 0.4 against
  27 before, 0% near-cream, and the MP4 fallback 83% white instead of 83% cream.
- Studio (`npm run media:studio`, default `--paper=white`): the master's paper
  is beige (250/236/216), so a per-channel gain onto white would have pushed
  the ink and the orange by up to 18% in blue. Each pixel is instead unmixed as
  a blend of the measured paper, black ink (18/18/18) and orange (226/119/62);
  only the paper's share is lifted. Measured against the master: paper averages
  255, ink and orange move by 1-2 levels (codec only; the lossless poster's
  ink is within 2), and the loop treatment, crop, 144 frames and 24 fps are
  unchanged. Paper-coloured areas inside the drawing (sneakers, the band's
  light highlights) turn white with the paper, as the hero's interior whites
  already do.

`npm run check:hero` now asserts, for both preparation scripts, that the baked
`CREAM` and `WHITE` constants equal their tokens, and that every hero/Studio
file referenced by `src/config/assets.ts` is the set baked for
`--color-background`. Moving the background token without regenerating the
loops now fails the check instead of drawing a rectangle.

Reason: client direction. Doing it through the token and through
regenerated media, rather than a search-and-replace of `#fceeda` or a CSS blend
on the videos, keeps the dark surfaces and the cream details exactly as
designed and gives the loops the same exactness on white that they had on
cream. Contrast only improves: every dark-on-light pair gains luminance
difference (ink on white about 19:1, `--color-brand-orange-aa` about 5.2:1).

## 2026-09-10 - The Edge Tab Turns Ink Over Orange; Routes In Sentence Case

Decision: at the user's request the closed edge tab is brand orange everywhere
except over an orange surface, where it turns `--color-brand-ink` with cream
rules. This amends "The Handle Does Not Follow The Surface Tone": it still does
not follow the declared `data-surface-tone`, because that value can disagree
with a section's media, which is how the handle once vanished. `EdgeMenu.ts`
instead samples the colour actually painted under the tab (first opaque
background under the tab's resting point, ignoring the menu itself and layers
faded below 50% opacity) and publishes `data-tab-tone="accent"` when it is
within 28 levels of `#cd5730`. Sampling is event-driven - scroll (one frame
plus one settle 180 ms later), resize, vertical travel and `animationend` -
never a frame loop, and never while the panel is open. Without JavaScript the
tab stays orange.

The panel's route labels drop `text-transform: uppercase` and render as
written in `primaryNavigation`: "Inicio", "Manifiesto", "Studio", "Proyectos",
"Contacto". Size, tracking, weight and the one-line guarantee are unchanged.

Reason: an orange affordance on an orange surface (the `/contacto/` hero, the
orange manifesto statement) disappears; ink reads there at about 4.9:1 and is
already the brand's dark. The route labels follow the capital-initial rule the
user set for the navigation.

## 2026-09-10 - The Goodbye Is A Viewport Over One Panoramic Scene

Decision: the pre-footer goodbye is rebuilt as a full-screen viewport over a
single panoramic scene wider than the screen. It opens on the scene's left side
with a first editorial block; a round arrow pans the whole scene left until its
right side fills the screen and a second block appears; a back arrow pans it
home. It replaces the CSS jaw/"ADIÓS" fallback, which is deleted with its
keyframes and its `SectionStack.ts` scrub. The structure follows the "How we do
this?" block on beans.agency; no code, copy, image, colour or motion was taken.

A first pass the same day built it as a text slider over a static visual
(`GoodbyeSlides.ts`, three slides). The user corrected the concept — one visual
that travels, not copy that changes — and that module and its specs were
replaced.

- The travel is resolved in CSS, not measured: the viewport is a size
  container, so `translateX(calc((100cqw - 100%) * progress))` is exactly the
  scene's overhang for any screen, asset or resize. GSAP eases only the
  progress number, which keeps the easing in GSAP (1.1 s `power3.inOut`) and
  leaves nothing to re-measure.
- The scene is 200cqw by default and `clamp(180cqw, height × ratio, 220cqw)`
  with a real asset, so the pan always has somewhere to go and never grows
  absurd on a portrait phone.
- One arrow per block, beside its headline, so each reads as one composition.
  Focus is moved to the arriving block's arrow once it is visible, so the
  keyboard is never left on a block that has just become `inert`.
- Under reduced motion the jump is written synchronously, but the site-wide
  `reduced-motion.css` rule gives every element `transition-duration: 0.01ms`
  with the default `transition-property: all`, so any property change lands on
  the next frame. A same-frame read still sees the old side (measured: the
  inline `--goodbye-progress: 1` was already set while the box had not moved).
  The reader sees an instant change; specs wait two frames before measuring.
  This also explains the intermittent failure of the superseded slider spec.
- The section renders only from `homeGoodbye` (approved copy, or the flagged
  placeholders in development and demo mode). The visual slot became
  `goodbyeVisual`, a video or an image, because which one is still open.
  Until then the scene is a text-free placeholder panorama (ink, an orange
  horizon, hairline marks, a disc on the left side and a ring on the right) so
  the travel can be judged.

Reason: user brief and correction (phase 1: architecture only; copy, visual,
final motion and CTA are the next phase's decisions). Every choice above is
reversible.

## 2026-09-11 - Goodbye Side B Is The Scene Beside A Solid CTA Panel

Decision: the goodbye's side B no longer sets copy over the scene. A solid
Colmillo-orange panel slides in from the right edge with the pan and holds the
CTA; the scene's right side fills the rest; a large round back button sits on
the scene at the panel's edge. The pan, the single scene, `100svh` and side A
are unchanged. Structure after the "How we do this?" end state on
beans.agency (visual + solid side strip + CTA + back disc); no colour,
typography, copy or motion was taken.

- The scene now stops at the panel's edge, not the screen's
  (`--goodbye-scene-end`, the same property as the panel width), so what is
  visible is the scene's real right side rather than a part hidden under the
  panel. Along-the-bottom layouts set it to 0.
- CTA copy: the approved claim "Haz que tu marca muerda" (build spec §10),
  linked to the real `/contacto/` route read from `primaryNavigation`. The
  kicker "¿Hablamos?" is provisional and lives in `src/data/goodbye.ts` with
  the rest of the flagged demo record.
- One timeline played and reversed, instead of one timeline per direction, so
  the return is by construction the inverse of the arrival.
- The back button is a child of the panel positioned outside it, so its
  distance from the boundary is one CSS length at every width and it travels
  out with the panel.
- The edge menu's tab only re-samples its tone after scroll, resize, pointer
  moves or a document `animationend`. The panel changes the colour at the
  right edge without any of those, so the stage dispatches an `animationend`
  (`goodbye-settle`) when it settles instead of editing the edge menu.
- Reduced motion: `reduced-motion.css` gives every element a 0.01ms `all`
  transition. Because `visibility` is inherited, each intermediate element
  (`.goodbye-stop__head`, the SVG) transitioned its own copy and the arriving
  arrow stayed hidden for one or two frames, so focus silently failed to move
  (measured). Transitions inside `[data-goodbye]` are off under reduced motion.
- Phones and portrait tablets get the panel along the bottom (44%, growing
  with its copy); a 50% panel put its edge exactly where the touch tab rests.

Reason: explicit user brief (second iteration of the goodbye, right state
only).

## 2026-09-11 - The Goodbye Pans Across A Photograph; The Orange Panel Goes

Decision: the goodbye's scene is the photograph the user supplied
(`public/assets/bg panoramica.png`, 2048x768), on trial through
`goodbyeVisual`. Side B's solid orange panel is removed: the CTA is white type
on the photograph's right black field, the back button sits in its black
bottom-right corner. Pan, `100svh`, the single scene, one reversible timeline
and side A's structure are unchanged. This supersedes the panel decision above.

- Why the panel goes: the brief asks for "fotografía + tipografía +
  movimiento", texts in the photograph's black fields and no large graphic
  elements; a 31% orange strip would have covered exactly the right black field
  the CTA is meant to use.
- The copy boxes come from the photograph, not from eyeballing: black below
  luma 38 from 0 to 29% of its width and from 76% on, and from 66% on above 70%
  of its height; the orange piece and the blocks live in 30-74%. The copy layer
  is a size container of the same box as the viewport, so it reads the scene's
  width in the same units and the boxes hold at every size.
- The scene width became `clamp(135cqw, height × ratio, 200cqw)`: 1.35x is
  enough travel to read as a camera move, and at 16:9 it keeps the whole
  orange piece in frame on both sides. The wide layout starts at 5:4, where the
  scene is never cropped sideways, so a fraction of the scene is a fraction of
  the photograph.
- Narrower screens get a band layout (photograph on top, fading into the ink,
  copy alternating below) instead of squeezing the desktop logic; it is also
  the no-JavaScript layout.
- Timing: the copy is fixed while the photograph moves, and the first cut drew
  "¿HABLAMOS?" over the orange piece mid-travel. The copy now leaves by 28% and
  arrives from 76% of the pan, the window measured at 1024-2560px, verified on
  every frame of both directions at twelve sizes.
- Delivered as one lossy WebP (quality 92, 105 KB) at the master's own size by
  `scripts/prepare-goodbye-media.mjs`; the PNG is untouched. The master is
  upscaled on screen (1.17x at 1440x900, 1.41x at 1920x1080, 1.69x at
  2560x1080, double that on 2x displays), so a larger master is needed for full
  sharpness.
- Known limitation, not fixed here because the edge menu is out of scope: the
  edge menu's tab turns ink only over CSS orange backgrounds, not photograph
  pixels. On side A at 1280-1440px wide its resting point falls on the orange
  leather.

Reason: explicit user brief (test the supplied photograph as the goodbye's
scene, keep the pan and 100vh, text in the black fields).

## 2026-09-10 - Project Tiles Bend Under The Pointer Instead Of Zooming

Decision: The home rail tile hover no longer scales anything. The frame's
`scale(0.982)`, its animated top-right radius, the image's `scale(1.06)` and
the `:active` `scale(0.962)` are removed. A fine pointer now bends only the
image edge nearest to it inwards (`ProjectTilePress.ts`), inside a frame that
keeps its exact box. The title's cut-out reveal is unchanged.

- Reference studied live: on hellomonday.com the project images are drawn in a
  WebGL (PIXI) canvas under a vector mask. On pointer entry the grid finds the
  mask segment nearest the cursor and drags that segment's intermediate point
  inwards with a GSAP ease while the corners stay pinned and the picture does
  not move. Only that behaviour was taken; no code, shader, asset or value.
- Technique, chosen in the requested order: an animated asymmetric
  `border-radius` cannot produce a dent in a straight edge; a pseudo-element
  or mask concavity would add a second painted colour or a mask image per
  frame; an SVG mask needs per-tile SVG markup; perspective tilts the whole
  image (rejected: "rotate de toda la tarjeta", "3D exagerado"). A
  `clip-path: path()` generated per frame gives a true curve, needs no markup
  beyond one wrapper, is supported by every current engine and costs one
  style write per animation frame on one tile while it moves.
- The clip sits on a new `.project-tile__surface`, not on the frame, so the
  title's cut-out (outside the surface) is never clipped by the dent, and the
  loading ground moved onto the surface so no second colour can show in the
  bite. The page colour shows through, which matches the cut-out.
- Magnitude is deliberately contained (16-34 px, about 6% of the tile's short
  side) and localised (half width 0.3 of the short side); a first pass at
  7.5% spanning the whole edge read as a cut side rather than pressure.
- Touch, coarse pointers, keyboard focus and reduced motion get no dent: the
  module is not bound there, which keeps the image still as briefed.

Reason: explicit user brief ("la imagen se dobla", not "la tarjeta hace zoom").

## 2026-09-10 - A Reveal Band Only Ever Shows The Section Before It

Decision: two corrections in `SectionStack.ts`, with no change to the stack's
choreography, triggers, scrub, pin, sticky behaviour or timing.

- A sticky stack layer returns to `position: relative`
  (`.stack-section[data-stack-released]` in `layout.css`) once the element
  right after it reaches the top of the screen, and re-sticks as soon as the
  reader scrolls back above that point. Only on the sticky query and only when
  that next element is not sticky itself.
- The entrance clip's top band is `min(layer, viewport) * 7%` in px, computed
  on refresh, instead of `inset(7% ...)`. Both ends of the tween now share one
  shape (`inset(Y 2.5% 0px round 5rem 5rem 0rem 0rem)` to all zeros).

Reason: user report of a horizontal band of the previous section or background
flashing between sections. Measured by hit-testing the incoming layer's band at
1920x1080, 1440x900 and 1366x768, slow, reverse, fast and across a resize:

- A sticky layer's containing block is `main`, so Services and Studio stayed
  stuck at the top until the end of the page, behind everything after them.
  When the section after them is not sticky (the pinned rail, the goodbye
  stage), it scrolls away and the next layer opens its rounded band straight
  onto the old one: the services ink, with its copy and illustration, showed as
  a dark band and dark corners between the white rail and white Studio, and
  Studio showed through the top of Contacto.
- A percentage inset resolves against the layer's own height. On the 535svh
  manifesto track 7% was ~340px, so its first word was cut while it entered;
  on every one-screen layer the px band equals the old 7%.

Rejected: hiding the covered layer with `visibility` or `opacity`, which drops
it from the accessibility tree or leaves invisible focusable content; a
negative margin or a 1-2px overlap, since no seam was found (the boundary rows
hit the right layers at +-0.5px and match before and after); `pinSpacing` or
`end` changes, since the pin was not the cause. Releasing is invisible: sticky
and relative take the same room, the layer is fully covered at that moment, and
if a frame lags on the way back the layer is at its own flow position right
above the covering section, never a foreign surface.

## 2026-09-11 - The Contact Close Is A Poster: Type, One Disc, Pressure

Decision: the home `#contacto` becomes "la última mordida": the approved claim
set as a poster ("HAZ QUE / TU MARCA" in black caps, "muerda" larger, orange,
italic, stepped right), one large orange disc bleeding off the right edge that
has already taken the end of "muerda", and the two approved channels as
full-width editorial rows. Motion is described in `docs/MOTION_SPEC.md`
("Contact Close").

- Legibility comes from inversion, not from avoiding overlap: an inverted,
  `aria-hidden` copy of the headline rides inside the disc, so wherever
  orange lies under a letter the letter turns white (ink for "muerda"). The
  copy is placed by the stage's container units (`100cqw`), not by
  measurement, so it lines up without JavaScript and under reduced motion.
- The pressure works per line, on the whole word, with the origin on the side
  away from the disc, so the side nearest the mass gives way most.
- Only what the disc gains on its resting position presses a line, so the
  composed rest overlap does not read as permanent pressure.
- The motion is a separate chunk loaded by `ContactBite.ts`: the shared motion
  bundle was 146 KB against a 150 KB largest-asset budget.
- Microdetails are limited to two: the kicker's orange pressure dot and a
  small U-shaped dent in the channels' top rule, under the disc's centre.
- Cursor labels reuse the existing system: "Escribir" on Correo, the existing
  "Abrir" on Instagram, an empty label on "muerda" (active ring, no text), and
  the existing pressed pose during a bite. No second cursor.

Rejected: a mouth, teeth or jaw (the brief forbids a literal bite); another
character illustration (already used in Studio, Services and the hero);
`mix-blend-mode`, which turns ink over orange into an off-palette blue; splitting
the headline into letters, which screen readers can read letter by letter; a
measured (JavaScript) position for the inverted copy, which would fail without
scripts; Canvas or WebGL.

Found during QA and recorded because it is easy to repeat: a GSAP `from()` on a
custom property read its end value back as 0 and collapsed the disc's clip to
nothing, and a `from()` on the lines under reduced motion recorded a from-state
already on the element as its end, so the fade ran 0 -> 0. Every entrance tween
is now a `fromTo`.

## 2026-09-11 - Services Becomes A Sticky Editorial Sequence

Decision (explicit user request): on wide screens with motion allowed
(`>= 64.01rem` wide, `>= 40rem` tall) the home services section is a track of
`100svh + count x 45svh` (280svh for four) holding one sticky 100svh stage.
The left zone (~42%: title, the client illustration, the CTA slot and a small
`01 / 04` readout with a 2px orange line) is the anchor and never moves. The
right zone (~58%) shows one service at a time: its number, its sentence-case
orange name at `clamp(3.4rem, 6.4vw, 7rem)`, the description, a hairline rule
and its glyph. No cards, no carousel, no pin.

Reasons and consequences:

- The section is `position: relative` at every width and its stage is sticky
  inside its track, exactly as the manifesto does. This supersedes the
  2026-09-10 follow-up in which services held the screen as a sticky stack
  layer while the rail slid over it, so `SectionStack`'s release no longer
  applies to it. The timeline's trigger is the non-sticky track, so its
  measurements are clean; when the track ends ordinary scroll releases the
  stage and the rail, which pins only once its own top reaches the screen's,
  follows right under it. The two scroll ranges are one viewport apart by
  construction: no competing triggers and no pin spacing to reconcile.
- The two services never share the stage. A first version cross-faded them,
  and at each boundary both names sat at 0.3-0.45 opacity over each other,
  illegible. Now the outgoing service is transparent 0.04 of a step before
  the boundary and the incoming one starts at it: a short empty beat, then the
  arrival.
- The layout switch is synchronous and the timeline is lazy. `ServicesMotion.ts`
  (shared bundle) sets `data-services-enhanced` inside `gsap.matchMedia`, so
  every later trigger measures the final height on the first refresh and a
  deep link never lands short. The timeline is `ServicesSequence.ts`, a 1.9 KB
  chunk loaded by the section's own script (the `ContactBite` pattern). In the
  shared bundle it made the largest asset 150,731 bytes against the 150,000
  budget; split, the largest is 147,735. A chunk that fails to load removes the
  sequence layout and refreshes, so the section reads as a list again.
- The per-service numbers return (the user asked for `01` above each name). They
  are `aria-hidden`: the ordered list already counts.
- The illustration is one flat PNG, so its microreaction is limited to the
  whole image: a 6px press (`scaleY 0.988`) at each handover and a settled pose
  within +-7px per service. Nothing of it is redrawn, deformed or swapped.
- `Abrir servicios ↗` is the family's bite button with a cream slab on ink; the
  arrow is CSS generated content with empty alternative text. No services page
  exists, so the user chose (2026-09-11) to wire it to `servicesPage.href` in
  `src/data/services.ts`, which is null: the CTA is not rendered at all until a
  real route is set there.
- The brief asked for 220-280vh overall and 55-65vh per service; four services
  cannot have both. The section keeps to 280svh, so each service owns 45svh of
  scroll while the stage holds (the first is also on screen while the section
  enters, the last while it leaves). `--services-step` in
  `services-section.css` is the single value to change.
- Linear fallback everywhere else (no JavaScript, reduced motion, `<= 64rem`,
  under 40rem tall): the same markup as a vertical list with every service
  painted. Wide screens keep the two zones with the heading column held by CSS
  `sticky`; phones and tablets reveal each entry once.

Follow-up the same day (user request): the per-service numbers are removed
again (the `01 / 04` readout stays); the heading grows to
`clamp(2.9rem, 5.6vw, 5rem)`; the service names shrink to
`clamp(2.9rem, 5vw, 5.5rem)` in the sequence (`clamp(2.8rem, 4.8vw, 5.2rem)`
wide linear, `clamp(2.6rem, 6vw, 3.8rem)` tablet, `clamp(2.3rem, 9vw, 3.4rem)`
phone); and on wide screens the illustration is held to 88% of its column and
centred in it, horizontally and vertically, between the heading and the
readout.

Second follow-up the same day (user request), composition only; the scroll
logic, timings and copy are unchanged. In the sequence layout the heading and
the readout stay anchored left, while the illustration and the service on
stage become one pair centred on the viewport. The heading block uses
`display: contents` so its pieces join the stage grid: columns
`1fr | art | minmax(0, 30rem) | 1fr` inside equal side padding (the shell's
gutter plus the section's indent, so the heading keeps its exact line), rows
`heading | 0.6fr | pair | 1fr | readout`. The art is never smaller than
before (`min(clamp(24rem, 32vw, 36rem), 72svh)`), the gap is
`clamp(2.5rem, 4.5vw, 5rem)`, and a bottom margin equal to the rule and glyph
under each service's copy centres the art on the name and description.
Measured: pair offset 0px from the viewport centre and art-to-copy centre
13-16px at 1100x650 to 1920x1080. Per-service images are prepared:
`ServiceRecord.image` (null for all four today) adds a layer to the art frame
and the timeline cross-fades to it while that service is on stage.

Third follow-up the same day (user request): the client's illustrations for
Identidad, Digital and Contenido are live in the sequence; Estrategia keeps
the shared one. The 1600x900 RGBA PNGs are untouched; `npm run media:services`
(`scripts/prepare-services-media.mjs`, sharp) crops their transparent margin
measured on the alpha channel (a colour trim would have eaten the opaque
near-black clothing), scales them to 1200px wide and writes WebP with alpha
(141, 125 and 113 KB against 770, 716 and 827 KB). Each layer is contained in
the shared art's frame and anchored at its foot, so no drawing is cropped, all
four read at the same size and the figures share one ground line. The
cross-fade adds a hair of scale and travel (0.99 / 1.015, -4 / +6px) to the
complementary opacity. Kept as supplied, and flagged: unlike the shared art,
whose clothing is transparent, these three paint their clothing in opaque
near-black (about RGB 11-16 against the ink's 18,16,15); on screen it reads as
the ink. The list layout still shows only the shared illustration, as before.

Fourth follow-up (user request): more air between the heading and the pair.
The upper spacer row is now `minmax(clamp(3rem, 9svh, 6rem), 0.85fr)` (was
`minmax(0, 0.6fr)`): heading-to-art 81px at 1440x900 (was 64), 108px at
1920x1080, 59px at 1100x650 (was 23). Centring and art-to-copy alignment are
unchanged.

Fifth follow-up (user request): `Abrir servicios ↗` now sits beside the
heading. `/servicios/` exists (created by another session and listed in
`primaryNavigation`), so `servicesPage.href` is `/servicios/` and the CTA
renders. It is the same bite button as before (orange, ink outline, cream slab
on ink, CSS arrow with empty alt text, press into the slab, shared magnetic
pull and "Abrir" cursor label), moved out of the foot into
`.services-section__head` with the `h2`: a flex line, centred on the
heading's two lines, gap `clamp(2.5rem, 5vw, 5rem)`, wrapping under the
heading when the line is too narrow. In the sequence the head takes the
heading's grid cell, so nothing else moves; the foot now holds only the
readout. Measured gap 55-80px from 1100 to 1920; on phones and in the narrower
reduced-motion column it wraps under the heading.

## 2026-09-11 - The Contact Close: A Soft Sculpture, Sentence Case, More Air

Decision (user direction, second pass on "la última mordida"): the flat
orange disc and the inverted copy of the headline inside it are replaced by
one soft orange sculpture, and the whole section moves to sentence case.

- The sculpture is procedural SVG (`src/scripts/motion/ContactSculpture.ts`):
  an inflated cushion (a superellipse, n = 2.8, with low harmonics) minus a
  sphere, joined by a smooth SDF subtraction, so a large scoop with rounded,
  clay-like shoulders is missing from the side facing "muerda". Volume comes
  from matte light and shade overlays, the scoop's inner wall, a light lip
  along it, a faint bounce light and a contact shadow; no glossy highlight.
  The same pure module renders the still pose on the server and the live
  pose in `ContactBiteMotion.ts`, so every device sees the same object.
- The interaction redraws the geometry rather than rotating a picture: the
  piece turns towards the pointer (the light, the shade and the scoop move;
  the scoop's parallax changes the silhouette), dents where the pressure comes
  from and swells on the far side, opens its bite a few units when approached,
  drifts at most 18px, and follows with about one second of inertia. Pressure
  moves "muerda" 1-3px. The bite is a squash plus a deeper scoop (~0.65 s).
  One redraw costs about 0.8 ms and runs only when something changed.
- Composition: eyebrow, headline and "muerda" on the left; the sculpture on
  the right, bleeding off the edge; the channels bottom-left in a 36rem
  column with a floor of 9svh of air plus whatever the screen leaves. Desktop
  is exactly one screen. Phones and portrait tablets stack headline,
  sculpture, channels.
- Type: headline, eyebrow and labels in sentence case; no `text-transform`.
  The rows are lighter: a small label, the address as the main line, 20% ink
  hairlines, an orange stroke on hover and focus, and the arrow nudging
  diagonally. The Instagram tape and the stroke runner of the first pass were
  removed as part of that refinement.

Rejected: WebGL or a 3D library (a dependency, and `CLAUDE.md` rules out
WebGL); a CSS `rotateX/rotateY` of a flat image, which the brief explicitly
does not want and which reads as a tilting card; a generated raster, which
cannot deform live and would need rights review; the line-art fallback, not
needed because the SVG sculpture held up in review.

## 2026-09-11 - Contact Close: Bite Buttons, And The Sculpture Is The CTA

Decision (user direction, third pass, adjustments only): the eyebrow
"Contacto" and its dot are removed; the channel rows become two of the hero's
`bite-button`s side by side under the headline ("Correo ↗", "Instagram ↗");
the headline is centred vertically on the sculpture's centre; and the whole
sculpture becomes a link to `/contacto/`.

- The buttons reuse `.bite-button` and the hero CTA's own `0 0.4rem 0` ink
  shadow and `data-magnetic`, verified equal in computed style to
  `.hero__cta` (radius, shadow, fill, border). Only their side padding narrows
  on phones so both fit on one line.
- The sculpture stays the sculpture: only its painted form is the hit area,
  and its button language is borrowed, not a frame around it: on hover it
  presses onto a hard ink shadow in its own silhouette (the buttons' shadow),
  and a small "Contacto ↗" appears set into it. Touch shows both at rest.
- The link's box is cut at the stage edge while the drawing overflows it, so
  the fixed edge rail never covers link content.
- The cursor keeps its active ring but no text on these three controls: its
  shared label is set in capitals, which the sentence-case rule for this
  section excludes. The global cursor was not changed.

Rejected: a new button style for the channels (the brief asks for the hero's
exactly); an ink outline around the sculpture on hover, which would turn it
into a conventional button; a rectangular hit area, which made the white
around the piece clickable.

## 2026-09-11 - Contact Close: Manifesto Type Scale, The Hero's Cursor Disc

Decision (user direction, fourth pass): the headline drops to the manifesto's
word sizes (80px at 1440, "muerda" 104px against the manifesto's ~107px
orange mark); the text block is set in from the gutter like the services and
Studio headings; the two buttons start exactly where "muerda" starts; and
hovering the sculpture shows the cursor's "Contacto" disc, as the hero CTA
does (`data-cursor-label="Contacto"`).

This supersedes, for the sculpture only, the previous entry's choice of a
cursor ring without text: the user asked for the hero's disc explicitly. The
Correo and Instagram buttons keep the ring without text. The note
"Contacto ↗" set into the piece no longer appears under a pointer (the disc
says it); it stays for keyboard focus and touch, which have no cursor.

## 2026-09-11 - Edge Menu: Servicios Replaces Manifiesto, Route-Only Active State

Decision (user direction, navigation only): the primary navigation is exactly
01 Inicio, 02 Studio, 03 Servicios, 04 Proyectos, 05 Contacto. "Manifiesto"
leaves the menu. The existing `/manifiesto/` page is reused as `/servicios/`
(`git mv` to `src/pages/servicios.astro`; heading, title, index `03 /
Servicios` and the placeholder note changed, layout and classes unchanged). No
duplicate page and no redirect page are created.

The active item (orange, `aria-current="page"`, panel readout) is decided by
the URL alone. On `/` "Inicio" stays active while the reader scrolls through
the home Studio, services, projects or contact scenes; the scroll observer
that used to report the home scene (`aria-current="location"`) was removed
from `EdgeMenu.ts`. Design, animation, hover and open/close are unchanged.

Internal links that pointed at `/manifiesto/` now point at `/servicios/`: the
contact page's route cards (Studio 01, Servicios 02, Proyectos 03) and the home
manifesto CTA, relabelled "Ver servicios" so its text matches its destination.
The editorial "Siguiente" chain follows the menu: Studio -> Servicios ->
Proyectos. The home `#manifiesto` section id is a home anchor, not a route,
and is unchanged.

Supersedes, for the route labels only, the 2026-09-10 entry listing
"Inicio", "Manifiesto", "Studio", "Proyectos", "Contacto".

## 2026-09-11 - /studio/ Is Rebuilt As Five Moments Around One Interaction

Decision (user direction): the demonstration Studio page (the "S" mark,
"02 / Studio", the "Colmillo Studio" kicker, the demo flag and the
`studio-process` grid) is replaced by five components in
`src/components/studio/`: a minimal hero ("Studio" and one audiovisual piece
in a bitten disc), "Somos Colmillo", "Cómo hacemos las cosas" (four
principles), "Los que muerden" (team) and one ink close ("¿Hacemos algo
juntos?", "Hablemos" to `/contacto/`). Hello Monday's product and about pages
informed the list-plus-stage interaction and the people grid; no code, copy,
layout or sequence is taken from them.

- Content lives in `src/data/studioPage.ts`; the hero loop slot is
  `studioHeroMedia` in `src/config/assets.ts` (`null` shows a geometric
  placeholder). The intro, principles and team copy is provisional (supplied
  by the user on 2026-09-11) and the team entries are structural placeholders,
  so those three blocks resolve to `null` in the standard build: `dist/`
  renders the hero and the close only. The hero title and the close were
  given as final wording and ship in both builds.
- Principles title: "Cómo hacemos las cosas", the user's shorter alternative,
  which sets in two balanced lines; "Nuestra forma de hacer las cosas" is a
  one-line change in the data file.
- The principles are progressively enhanced from a table of contents with four
  complete panels into an ARIA vertical tab list (mouse or pen hover, focus,
  click or tap, arrows, Home, End). Descriptions sit on the stage under the
  picture rather than under each title, so the list never changes height
  under the pointer: an accordion opening below the hovered row would move the
  following rows under a stationary cursor and flicker between principles.
- Colour journey: white, white, white, white, ink. Orange is only an accent.
- The home rail's dent was extracted from `ProjectTilePress.ts` into
  `PressSurface.ts` (`bindPressSurface(trigger, surface, frame)` and
  `canPress()`) with its geometry, easing and eligibility unchanged. The rail
  calls it exactly as before; the team portraits bind it on their frames, so
  names and roles, outside the surface, never deform.
- The editorial "Siguiente" cards (Servicios, Contacto) are removed from
  Studio: the brief asks for one simple close, and navigation stays with the
  edge menu. The Studio -> Servicios link of the previous entry therefore no
  longer exists on this page.
- Motion: the hero entrance is CSS; everything else lives in
  `StudioPageMotion.ts`, a route-only chunk mounted by the small
  `StudioPage.ts` in `MotionController` (the `ContactBite` pattern). Keeping
  it in the shared bundle measured 152,176 bytes against the 150,000-byte
  budget. No pin, scrub, parallax or permanent loop (see `MOTION_SPEC.md`).

## 2026-09-14 - /studio/ Second Pass: A Dark, Calm Editorial Route

Decision (user direction, Hello Monday's product page as a tone reference
only: no colour, type, code, copy or layout taken): `/studio/` becomes one
continuous charcoal route, clearly different from the white, playful home.
The structure of 2026-09-11 is kept; its look and the principles'
interaction change.

- Surface: `#1f1f1f` everywhere, text `#f5f5f5`, secondary white 65%, rules
  white 15%, orange `#cd5730` as the only accent. It is scoped in
  `studio-page.css` through `html:has([data-studio-page])` overriding
  `--color-background`/`--color-text`, so `html`, `body` and the shared
  footer are charcoal on this route only and no light band can appear; no
  shared component or token file changed. Sections are transparent and all
  declare `data-surface-tone="dark"`. Orange is used for text only at 24 px
  and up (3.9:1 on the charcoal).
- Container: a Studio-only `.studio-shell` with symmetric side padding (page
  gutter plus the edge rail's clearance; phones keep it on the right only)
  and a measure per section (hero 100rem, principles/team/close 72rem, intro
  52rem). The shared `.content-shell` is left-anchored on wide screens, which
  is what pushed the content to the right; it is untouched for other routes.
- Type: one moderate scale, h2 `clamp(2.5rem, 4.5vw, 5rem)`, principle names
  `clamp(1.8rem, 3vw, 3.5rem)`, body 18-22 px; only the hero h1 stays large.
- Hero: the bitten orange disc, its ring/core placeholder and the
  "Loop pendiente" note are gone. Title left (~40%) and a 4:3 frame right
  (~50%, `object-fit: contain`), both on the viewport's middle line by grid
  alignment. The empty slot is a plain surface with no text in both builds.
- "Somos Colmillo": one centred 52rem column (rule, heading, lede with
  "provocar algo" in orange, paragraph); the giant two-line headline and the
  offset right column are gone.
- Principles: numbers removed. This reverses the 2026-09-11 choice of
  descriptions on a separate stage: each description now opens directly
  under its name, as the user asked. The flicker that choice avoided is
  handled by keeping exactly one row open, so one row closes while another
  opens in the same 520 ms, the list keeps its height, and a row only grows
  downwards from under the pointer that opened it. The ARIA tab list became
  disclosure buttons (`aria-expanded`, closed descriptions `inert`) created
  inside each heading by the script; without JavaScript every description is
  open. Picture: ~33% column, 4:5, fading in with a 16 px rise and a light
  top clip, no zoom; the pointer drift was removed. Pictures are decorative
  companions of the text and render with empty alternative text.
- Team and close: container, surface and type only; the close is no longer a
  separate ink panel with a rounded top.

## 2026-09-14 - /studio/ Third Pass: Alignment, Plainer Steps, Colmillo Orbit

Decision (user direction; no change of visual direction, structure or other
routes):

- One container: "Somos Colmillo", principles, team and close share the
  72rem `.studio-shell` measure (the principles' width). Somos uses the
  principles' grid (58fr text / 9% air / 33fr), so its text column ends
  exactly where the list does.
- Somos copy: both paragraphs now share one treatment (colour, size
  `clamp(1.375rem, 2vw, 2rem)`, weight, measure, leading). Checked visually
  at 1440 and 390: it breathes, so the second paragraph was kept rather than
  removed.
- Principles renamed Mirar / Pensar / Crear / Lanzar with the user's
  temporary copy (ids `mirar`, `pensar`, `crear`, `lanzar`; placeholder art
  keys `look`, `think`, `make`, `launch`). Layout and interaction unchanged;
  the picture is a touch smaller (21rem max, was the full 33% column) so it
  has room to follow the open row.
- Team: title "Equipo"; wide-screen steps reduced to about 0 / +65 / +30 px
  (were 0 / +160 / +65); big placeholder numbers removed, only a quiet
  "Retrato pendiente".
- Close: glyph clipping came from the `.studio-line` reveal clip (0.14em
  foot padding against a 1.04 leading). The close title no longer uses a
  clipping line (fade-up instead) and sets a 1.12 leading; the shared clip
  padding grew to 0.14em/0.26em with matching negative margins for the team
  heading. Title larger, button under it, a hairline ending in an orange dot.
- Colmillo orbit: a hairline orange ring with a dot (drawn in
  `StudioRing.astro`, idea from the home hero's open ring, not its
  component) travels the page on wide screens behind the content, landing on
  one stop per section and fading out at the close dot. Stops are empty
  markers placed in CSS, so composition stays in the stylesheet. It is not
  shown on phones/tablets under 64rem, on touch-only journeys or under
  reduced motion, where the Somos ring is a still element. ScrollTrigger is
  passed into the route chunk with GSAP so no library is duplicated.

## 2026-09-14 - /studio/ Close Becomes A Photographic Stage

Decision (user direction; only the close changed): the close uses the
user-supplied `public/assets/motion/studio/bg cta studio.png` (2048x768,
black field left, orange/black sculpture right) as a full-bleed photograph.

- Rendered as an `<img>` (`object-fit: cover`) in an `overflow: hidden`
  layer, not a CSS background, so entrance, drift and pointer shift are GPU
  transforms. Derivative `studio-cta.webp` (sharp, quality 90, smart
  subsampling, 176,220 B): quality 80 (95,706 B) showed 16 px macroblocks in
  the near-black at normal viewing.
- Landscape (>= 48rem): `min(100svh, 64rem)` tall (at least 36rem),
  `object-position: 32% 50%`, which keeps the sculpture's left edge at about
  half the width from 1024 to 1920 px wide (measured 568/1024, 738/1440,
  678/1366, 927/1920). Portrait and phones: copy on the black at the top and
  the photograph in a band from 44% down, faded in with a mask from the
  photo's own black (`#040404`, sampled), focus 60%; no overlay needed.
- The copy uses the hero's 100rem measure instead of the 72rem editorial
  grid: on the 72rem grid the copy started at x 384 on a 1920 screen and ran
  into the sculpture. The route is bookended by its two full-bleed moments
  on the same left edge.
- The hairline + orange dot detail was removed (the photograph carries the
  ending; no added decoration). The orbit's close stop moved to the
  section's top edge.
- Button: unchanged shared bite button with the cream slab; hover now
  presses it part way (`translate 0.18rem`), a click all the way.

## 2026-09-14 - /servicios/ Becomes A Stack Of Editorial Layers

Decision (user direction): the demonstration Servicios page ("03 /
Servicios", the "Colmillo Studio" kicker, the S/03 mark, the demo flag, three
manifesto statements and the "Siguiente / Ir a" cards) is replaced by a hero,
four service layers and a closing decision. The overlapping-section effect
that page already used (sticky `.stack-section` plus `SectionStack.ts`) is
kept, not rewritten, and becomes the page's main mechanic. See
`MOTION_SPEC.md` ("Services Page").

- Components in `src/components/services/`: `ServicesHero`, `ServiceSection`
  (one component, rendered four times from data), `ServicesClose` and the
  shared media slot `ServiceMedia`. Copy lives in `src/data/servicesPage.ts`
  (`slug`, `title`, `claim`, `description`, `capabilities`, `media`, `cta`,
  `relatedProjects`, `theme`, `layout`, `mediaScale`); the hero's slot is
  `servicesHeroMedia` (`PageMedia`: image, or loop with poster) in
  `src/config/assets.ts`.
- Isolation: the four layers are provisional copy supplied by the user, so
  `approvedServices` is null and they render only in development and
  `build:demo`, carrying `data-dev-placeholder`. The hero title "Servicios."
  and the close ("Ahora toca verlo en acción.", "Ver proyectos" to
  `/proyectos/`, "Hablemos" to `/contacto/`) were given as the page's wording
  and ship in both builds, as on Studio.
- The page does not reuse the home's `src/data/services.ts`: it needs claims,
  capabilities and layout variants, and the home section's flagged copy is
  left untouched. The slugs match, so the two can be merged once approved copy
  exists.
- Colour journey: charcoal hero, white, orange, black, white, black close.
  `html:has([data-services-page])` scopes `--color-background` to the ink, so
  the footer continues the close and no light can show at a rounded corner.
- Media: each layer uses the client's service illustration (the shared one
  for Estrategia), the files the home sequence already shows. They are drawn
  for an ink ground (cream strokes, orange shapes), so they sit on an ink plate
  (charcoal on the black layer) and are decorative (empty `alt`). With the hero
  slot empty the frame shows four plates stacked at its foot in the layers'
  order, with no text, in both builds (the Studio precedent of a plain surface).
- Variations inside one grid: Identidad puts the plate first, Digital lets it
  run to the screen's edge, Contenido makes it smaller and settles it at the
  foot of the copy.
- Rest: each service stays whole on screen for `clamp(8rem, 26svh, 16rem)` of
  scroll before the next one rises. Without it a layer was fully visible for
  a single instant. The scroll is never intercepted; nothing moves while a
  layer rests.
- Linear fallback (phones, portrait tablets, short windows, reduced motion):
  plain sections tucked under one another with rounded tops. `SectionStack.ts`
  applies its band and compression at every width, which suits the home but
  would open a gap between non-sticky layers, so `services-page.css` overrides
  them there. The home is unchanged.
- Motion lives in a route chunk (`ServicesPageMotion.ts`, about 3.1 KB)
  mounted by `ServicesPage.ts`, the Studio pattern, because the shared bundle
  sits at 147 KB of its 150 KB budget.
- Section ids are `servicio-<slug>`: `main#contenido` is the skip link's
  target, and the Contenido slug duplicated it.
- Shared modules, minimal changes: `SectionStack.ts` also accepts
  `[data-stack-content]` for what compresses (home sections keep
  `.content-shell`). `SurfaceTone.ts` now picks the last surface in document
  order that crosses the middle band instead of the largest
  `intersectionRatio`. The ratio is relative to the target, so a full-screen
  section never passes about 0.24 of the band and only reports the ratio it had
  when it entered: on the new page the tone stayed "dark" on every layer (a
  cream cursor on white). On the home the tone now changes when the next
  surface enters the band's lower edge; a sweep every 450 px at 1440x900 found
  one 5 px window, at the services/projects boundary, where the centre still
  showed services.
- Over the orange layer the cursor's ring and core are ink, set in the route's
  CSS with `!important` because the cursor rules sit in a later cascade layer.
- Now unused by any route and left for a separate clean-up:
  `.editorial-page*`, `.manifesto-page__body` and `.manifesto-statement*` in
  `layout.css`.
- `demo.spec.ts` ("complete demo destinations") no longer expects the demo
  flag or the "Siguiente Proyectos" card on `/servicios/`.

## 2026-09-15 - /studio/ Principles And Team Take The Hero Measure

- User direction: the two sections felt boxed in the centre. They now use the
  hero's `--studio-measure: 100rem` on the same `.studio-shell` padding, so
  hero, principles, team and close share one panoramic edge. This supersedes
  the third pass's single 72rem container for these two sections; Somos
  Colmillo keeps 72rem on purpose (not in scope).
- The existing padding (page gutter + edge-rail clearance, 65-80 px on
  desktop) already matches the requested `clamp(32px, 5vw, 80px)` and keeps
  the edge menu's tab clear, so it was kept rather than replaced.
- Principles: only the container grows; the 58/33 grid, the 21rem picture
  cap and the type scale are unchanged, so the list gets longer rules and the
  picture more air, not more size.
- Team: three columns capped at 24rem with `space-between`; the spare width
  becomes space between portraits rather than larger portraits. Steps, frame
  ratios, name/role placement and the tablet/phone layouts are unchanged.
  (Superseded the same day by the landscape team below.)

## 2026-09-15 - /studio/ Team Becomes Landscape Editorial Portraits

- User direction, with the Mondayteers grid of hellomonday.com/about as the
  structural reference (no code, assets or exact layout copied): three equal
  landscape pictures filling the section, a very soft step, no card look.
- 7:5 rather than 4:3, to match the user's "about 560x400 / 600x430". On the
  100rem measure three columns cannot reach 560 px, so they fill the width
  instead (505 px at 1920, 414 px at 1440).
- Step order is first lower, second highest, third in between, all set with
  `margin-block-start` (no transforms, so the reveal and the press dent are
  unaffected). Differences stay 30-90 px on desktop, 25 px on tablets, none
  on phones.
- The corner drops from `--studio-radius` to 0.25rem on these frames only, so
  they read as photographs; the rest of the route keeps its radius.
- The demo shows 3 placeholders instead of 6; the approved list will set the
  real count, and further rows repeat the same 3-column step.
- `PressSurface.ts` is shared with the home rail and already proportional to
  the short side, so the dent needed no change for the landscape format.

## 2026-09-15 - /studio/ Somos Colmillo Back On The Shared Grid

- User direction: "Somos Colmillo" should start where the next section
  starts. The request said "to the right", but the section already started
  to the right of the principles after the morning's widening, so the start
  moved left onto their edge; that is the stated goal.
- The container takes the 100rem measure (hero, principles, team and close
  now share one edge again), while the paragraphs are held to 72rem: the full
  1600 px would give lines of about 100 characters at this size.
- The ring stays in the 33% column, so it now sits over the principles'
  picture column, as the component's shared-grid intent describes.

## 2026-09-15 - /servicios/ Service Layers Share One Plate And Alternate

Decision (user direction, layout only): the four service layers use one
media system and a strict alternation. This supersedes the "variations"
bullet of the 2026-09-14 /servicios/ entry.

- Sides: Estrategia text/plate, Identidad plate/text, Digital text/plate,
  Contenido plate/text (Contenido was text/plate).
- One plate for all four, as Estrategia and Identidad already had it: the
  same 5fr/6fr grid (6fr/5fr when the plate leads), the same gap and vertical
  centring, a 4:3 frame capped by the screen's height, the same radius, and
  the illustration contained at 84% inside it. Digital's plate no longer runs
  to the screen's edge and Contenido's is no longer the smaller 5:4 plate at
  the foot of the copy.
- The `mediaScale` field (`regular` / `bleed` / `compact`) and its CSS were
  removed rather than kept with a single value; `layout` is the only
  composition variant left. Copy, colours, type, stacking and motion are
  unchanged.
- Measured frames, identical in all four layers: 698x524 at 1920x1080,
  657x493 at 1440x900, 622x467 at 1366x768.

## 2026-09-15 - /servicios/ Hero Carries The Client Loop On Its Own Black

Decision (user direction, hero only): the client's final loop
(`public/assets/services/video hero servicios.mp4`) fills `servicesHeroMedia`
and the hero is recomposed around it, following the /studio/ hero without
copying it. Nothing below the hero changes.

- The file is published as delivered, under its own name; the space is
  URL-encoded in the slot (`video%20hero%20servicios.mp4`). No derivative,
  crop, re-encode or colour lift, as asked. The poster
  (`servicios-hero-poster.webp`) is its first frame, extracted in Chromium.
- Integration by ground, not by filter: sampled across the clip the file's
  black decodes to #0d0d0b, far from the route's charcoal #1f1f1f, so the
  hero's ground becomes #0d0d0b while the slot holds a loop (`data-hero-media`;
  the empty slot keeps charcoal and its plates). The frame has no radius,
  plate or ground; a 6% edge mask over empty ground absorbs decoder variance.
  Rendered at 1440x1000, the loop's edge and the page differ by under one
  level.
- Layout: the frame takes the file's 16:9 with `object-fit: contain` (the
  drawing spans x 209-1113, y 112-621 of 1280x720, so nothing is cropped).
  Landscape screens: title at its own width, loop taking the rest of the
  measure (782x440 at 1440x1000, 537x302 at 1112x834), gap
  `clamp(1.5rem, 4vw, 5rem)`, height cap `(100svh - 12rem) * 16/9`. Portrait
  and phones: title over the loop, which bleeds to the screen's left edge and
  stops at the edge menu's rail (338 px at 390, 268 px at 320; 680 px at 834).
- Entrance, CSS, skipped under reduced motion: title opacity + 0.16em rise
  (0.9 s), media opacity + scale 0.98 -> 1 (1 s, 0.25 s later). Playback reuses
  `ServiceMedia.astro` and `ServicesPageMotion.ts` loops: on screen, uncovered,
  visible tab, never under reduced motion.

## 2026-09-15 - /servicios/ Close Becomes A Centred Scene

Decision (user direction, close only): the close uses the user-supplied
`public/assets/services/img cta servicios.png` as a full-bleed scene, with the
copy centred in the picture's empty black, not beside it as on /studio/.
Nothing above the close changes.

- The picture is 2206x713 (about 3.1:1): sculptures reach 23% of the width
  from the left and start at 73% from the right (measured with sharp), and
  its black averages #0c0c0c. A single `cover` layer at screen height would
  crop the sculptures off any 16:10 screen, and at the picture's own
  proportion the section would be far shorter than a screen. So it is drawn
  twice, one "wing" per side, each the section's full height and anchored to
  its own edge. A wing is pushed outwards only as far as keeps a centred room
  (`clamp(34rem, 52cqw, 60rem)`) clear, computed in CSS from the scene's
  container units; the inner edges fade into the section's `#0c0c0c`. Wide
  screens show the sculptures whole; 16:10 screens crop their outer ends.
- Portrait screens and phones: the left wing becomes a band across the top
  and the right one across the foot (`clamp(11rem, max(30svh, 46vw), 26rem)`
  tall), each faded towards the copy and on its inner side.
- Motion (the brief's pressure -> framing -> message): scroll-linked, not a
  fade of the section. The scene zooms out from 1.08 while the wings press in
  from further out, then the heading and the buttons arrive. Scrubbed both
  ways; the copy completes before the section reaches the top.
- Copy kept as it was ("Ahora toca verlo en acción." with the orange disc,
  `Ver proyectos` -> `/proyectos/`, `Hablemos` -> `/contacto/`). No eyebrow or
  secondary text was added: none exists. The heading is smaller than the
  service titles (`clamp(2.125rem, 4.4vw, 4.75rem)`, 11em measure, two lines
  at 1440 and 1920).
- The large pebble cards were replaced by two compact shared bite buttons
  side by side (stacked on phones, equal width and clear of the edge tab). No
  ring or other decoration was added. `data-magnetic` was tried and removed:
  `MagneticElements.ts` tweens `x`/`y` with GSAP, which writes an inline
  `translate: none` and cancels the CSS press into the slab. The /studio/
  close button carries both and likely has the same conflict (not changed
  here).
- Derivative `servicios-cta.webp` (sharp, quality 90, smart subsampling,
  138,820 B), following the /studio/ close's finding that lower qualities
  band in near-black.

## 2026-09-15 - /servicios/ Service Plates Take The Studio Team's Press Dent

Decision (user direction, interaction only): the four service plates
(Estrategia, Identidad, Digital, Contenido) give under a fine pointer with the
exact dent of the /studio/ team portraits, reusing `PressSurface.ts` rather
than a new effect.

- Markup mirrors the team cards: `.service-layer__frame` is fixed geometry
  (`data-press-frame`: 4:3, radius, `overflow: hidden`) and the plate inside
  it, `.service-layer__surface` (`ServiceMedia` with `press`, carrying
  `data-press-surface` and the plate colour), is the only thing clipped. The
  layer's own surface shows through the bite.
- Bound in `ServicesPageMotion.ts` (`initPress`, same shape as `initTeam`);
  `ServicesPage.ts` hands over `bindPressSurface` and `canPress` from the
  shared bundle, so nothing is duplicated.
- Unchanged: frame size (657x493 at 1440x1000 before, during and after a
  press), radius, proportion, `object-fit: contain`, the capability hover,
  stacking, alternation, copy and the close. Touch, coarse pointers, keyboard
  and reduced motion keep the still plate (`canPress()`).

## 2026-09-15 - Edge Menu Panel: No Numbers, No Legal Links, Narrower

Decision (user direction, open panel only): the panel drops the route numbers,
the `01 / 05` readout and the legal links, and is about 13% narrower. The legal
links live in the footer. Email and Instagram stay the live channels from
`contactChannels`; Instagram opens in a new tab (`noopener noreferrer`), the
`mailto:` link does not.

- Width: `min(40vw, 38.5rem)` on fine pointers, `min(63vw, 26.5rem)` on coarse,
  `min(56vw, 30rem)` up to 68rem, full width on phones as before. The route
  type rises to `9.2cqi` so its absolute size matches the wider panel.
- Channel hover is colour plus a hairline drawn from the left and a 0.2rem
  lean, the same vocabulary as the route rows, never a fill.
- Follow-up: the channels show only their names, "Correo" and "Instagram",
  side by side; the words are the links and the address and handle are not
  displayed in the panel.
- The navigation is lifted by half of a `5vh` bottom margin, giving the
  channels more air than the wordmark without changing the panel height.
- Unchanged: tab, tracking, close control, scrim, panel travel, colours, order,
  the orange active state with its mark and the no-JavaScript disclosure.

## 2026-09-15 - One Global Wordmark And The Instagram Pill On Every Route

Decision (user direction): the home's top-left wordmark and top-right
Instagram behaviour become global chrome, one implementation each, in
`BaseLayout`.

- Wordmark: `SiteLogo.astro` (+ `site-logo.css`), a link home
  (`aria-label="Colmillo Studio, inicio"`, `aria-current` on the home) at the
  home hero's exact size and gutter: `--brand-logo-inline` (the former
  `--hero-logo-inline` value, now a token) at `--page-gutter` from the top and
  left. It is `position: absolute` against the document, not fixed: it only
  shows on the first screen and scrolls away with it (user correction the
  same day; a first fixed version with a scroll-sampled tone was removed
  together with its `SiteLogo.ts` and `paintedBackground.ts`). It shares
  `--z-social` with the Instagram control, so it stays above the hero and
  under the edge menu, whose scrim covers it while the panel is open;
  `EdgeMenu.ts` adds it to the `inert` outside set.
- The home hero no longer renders its own `<img>`: `.hero__logo` is an empty
  `aria-hidden` box of the same size, so the loop, CTA and hint keep their
  positions and the global mark lands exactly where the old one was.
  `HomeIntro.ts` waits for the global mark's image instead.
- Tone: every route declares its hero through `BaseLayout`'s `headerTheme`
  (`light` default -> `colmillo-wordmark-black.png`; `dark` ->
  `colmillo-wordmark-cream.png`); only that derivative is rendered.
  `/studio/` (charcoal) and `/servicios/` (#0d0d0b hero) pass `dark`. `/`,
  `/proyectos/`, project pages, legal pages and 404 are white. `/contacto/`
  is orange and stays `light`: ink on #cd5730 is about 4.5:1, cream about
  3.7:1.
- Instagram: `InstagramBadge.astro` always renders `data-mode="hero"` and
  `InstagramBadge.ts` no longer requires `[data-hero]`, so every route starts
  as the pill (`INSTAGRAM ↗`, same scale steps) and folds into the round glyph
  control over the same 30% of a viewport. New: on a page that cannot scroll
  that far (the empty standard `/proyectos/`) the range is the page's own
  scroll, so the fold still completes. Colours, outline, plate, hover and the
  menu hand-off are unchanged; orange with the ink outline already reads on
  white, ink, charcoal and orange.

## 2026-09-15 - Laptops Keep The Wide Layout, Scaled By Height

Decision (user direction: a laptop must show the same composition as a large
monitor, only more compact; no redesign).

- Root cause: the wide compositions (pinned manifesto, services sequence,
  sticky stack on the home and `/servicios/`) required `min-height: 40rem`
  (640 px). A 1366x768 or 1280x800 laptop draws a browser window of roughly
  580-660 px once the browser's own bars and the taskbar are counted, so it
  fell into the tablet/linear layouts: the manifesto lost its pin, the home
  services became a list, `/servicios/` lost the stack.
- The wide threshold is now `(min-width: 64.01rem) and (min-height: 34rem)`
  (linear below `33.99rem`), the same short-window line the hero and the edge
  menu already used. It changed together in `layout.css`,
  `manifesto-home.css`, `services-section.css`, `services-page.css`, the
  manifesto's `noscript` style and the four motion queries
  (`ManifestoMotion.ts`, `ServicesMotion.ts`, `SectionStack.ts`,
  `ServicesPageMotion.ts`). Width breakpoints are unchanged: structural changes
  still start at 64rem.
- Scaling instead of breakpoints: inside the wide layouts the display type,
  the air and the art take `min(<vw term>, <svh term>)` inside the existing
  `clamp()`s, so they follow the scarcer of width and height. Every height
  term only binds below about 900-1000 px of height, so 1920x1080 and taller
  resolve to exactly the previous values (verified: identical scroll
  positions and screenshots). Applied to the manifesto words, mark and
  drawing width (the `max-height: 50rem` 57% override is gone, the size is
  continuous), the home services heading, service name, art (also capped by
  the height left after heading, spacer, furniture and readout), furniture
  gaps, spacer and foot padding, the `/servicios/` title, claim, body, block
  padding (floor 4.5rem so the rule clears the Instagram control) and
  capability rows, the `/studio/` h2/h3 and section spacing, and the home
  contact headline.
- Sticky layers taller than the screen (a very short window, enlarged text)
  no longer lose their foot: `SectionStack.ts` publishes
  `--stack-overflow` (height minus screen, only for sticky or released
  layers) on every ScrollTrigger `refreshInit`, and `layout.css` sticks the
  layer that far above the top, so it scrolls to its foot and then holds. A
  released layer resets to `top: 0`. Layers that fit keep `top: 0`, and
  without JavaScript the value is 0.
- Unchanged: colours, copy, assets, animations and their choreography,
  left/right alternation, the stack's entrance band, buttons, the edge menu,
  the wordmark and the Instagram control, and every layout below 64rem.

## 2026-09-16 - /proyectos/ Is The Portfolio, Not An Archive Of Demos

Decision (user direction: rebuild the route as the studio's main portfolio,
with Hello Monday's Work page as a structural reference only — never a visual
copy — and everything expressed in Colmillo's own language).

- Structure: hero, filter, masonry, close. The hero repeats `/studio/` and
  `/servicios/` exactly (title left on charcoal `#1f1f1f`, media frame right,
  both on the viewport's middle line, the full stop as an orange disc), so the
  three editorial routes open the same way. The white gallery then climbs
  `--pj-lift` over the hero with a rounded head — the only curve on the page —
  and the black close returns to the tone the footer continues. No beige
  anywhere: light surfaces are white (2026-09-10 client direction).
- The title takes `/servicios/`'s split (46fr/44fr) and size
  (`clamp(3.5rem, 8vw, 10.5rem)`) rather than Studio's, because "Proyectos."
  and "Servicios." are the same ten characters: a narrower column or a larger
  size wraps the orange full stop onto a second line. Measured on one line at
  1920, 1600, 1440, 1366, 1024 and 390.
- The hero's media slot is built at its final size and proportion (16:9) and
  holds a plain `#292929` surface with a hairline while `projectsHeroMedia` is
  `null`. No "pending" note: it has to read as a decision. The loop replaces
  the surface and nothing else moves.
- Masonry: one twelve-column grid, `grid-auto-flow: row dense`, and every
  piece takes its columns and its proportion from its own `format` —
  `portrait` 4:5/5 cols, `square` 1:1/5, `landscape` 3:2/7, `wide` 16:9/12.
  Art direction lives in the data, not in per-card CSS, so the client's
  ordering and shapes drive the composition and a new project needs no rule of
  its own. `dense` is deliberate: when a filter removes one half of a pairing
  it repacks the rows instead of leaving two-column holes. The cost is that
  the visual order can differ from the DOM order; for a set of independent
  pieces with no reading sequence that was judged the right trade.
- The rows step because formats carry a `margin-block-start` (landscape a
  little, square more) from 48rem up. It is a margin, never a transform, so
  the filter's own movement never fights it.
- Tablets read the same grid at two even columns (span 6, `wide` 12) and keep
  every proportion; phones read one column and keep them too. Laptops are not
  a separate case: 1366, 1440, 1536 and 1600 all read the twelve-column
  composition with less air.
- The filter is the studio's four real services plus "Todos", and only the
  categories that have a piece are offered. A project may belong to several
  and appears under each: the test is membership, never a rule per project.
  The row is published by the route's chunk and hidden until then
  (`data-filters-ready`), because a control that cannot work should not be
  shown; without JavaScript the archive is simply complete. Sticky from 48rem
  with its end padding reserving the Instagram control's corner; phones scroll
  the row sideways rather than stacking five lines over the first picture, and
  never a dropdown.
- The change of set is one short movement, about half a second: the leaving
  pieces fade, the grid repacks, every piece that stays is carried between its
  two measured boxes, the arriving ones fade in. The layout is never animated,
  only the offset between two settled states. Reduced motion changes the set
  with no movement at all.
- Hover is the site's existing pressure dent (`PressSurface.ts`), the third
  place it is used after the home rail and the Studio portraits — no new hover
  system was written. Fine pointers only; touch, keyboard and reduced motion
  keep the still picture.
- Each piece's name is always in the page, under its picture; the categories
  and the arrow are what hover or focus adds, and a screen without hover keeps
  them open. Nobody needs a pointer to learn a project's name.
- Content: the route publishes approved entries only. With none approved the
  standard build renders the hero and the close and no gallery at all, so
  nothing provisional reaches `dist/`. Development and `build:demo` show ten
  provisional pieces with neutral, non-brand names; the archive itself carries
  no "DEMO FICTICIA" band (user direction) but every project page still does,
  and the route stays `noindex` behind the blocking `robots.txt`. The five
  older demo pieces were kept and five neutral ones added, so the home rail
  (first five) and every existing test are unchanged.
- Removed: the "Archivo" kicker, the demo band on the index, the 01/02/03
  numbers, the fictional years, the visible summaries and the old orange
  cards.

## 2026-09-16 - The /proyectos/ Hero Stands On White

Decision (user direction, the same day as the rebuild above: the hero's
background should be the page's own white like the rest of the route, and the
title, the wordmark and the rest should follow).

- The hero keeps its composition — title left, 16:9 media frame right, both on
  the viewport's middle line, the orange disc for the full stop — and only
  changes surface: white ground, ink title, the black wordmark
  (`headerTheme="light"`), `data-surface-tone="light"` so the cursor keeps its
  default colours. `/studio/` and `/servicios/` are unchanged; the archive is
  now the one editorial route that opens on the paper.
- The empty media slot follows: `rgb(18 16 15 / 0.04)` with an ink hairline
  instead of `#292929` with a white one. Still a shade off the paper, still no
  note, still the final size and proportion.
- The rounded lift between hero and gallery went with it. It existed to make
  the change from charcoal to white a lift rather than a cut; between two
  white surfaces it is a curve that earns nothing, and the brief ruled those
  out. Hero and gallery are now one sheet and the route's only change of
  surface is the black close.
- The route no longer forces the canvas to ink. That override existed so the
  footer would continue the black close, but with a white hero it would have
  shown black on an overscroll above the page. The footer is painted ink
  directly on this route instead: the top of the page matches the hero, the
  bottom still ends on one dark field.
- Unchanged: the masonry and its formats, the filter and its movement, the
  pressure dent, the reveals, the close's copy and button, and every
  breakpoint.

## 2026-09-16 - Case Studies Are A System, Not A Template

Decision (user direction: build the complete system of individual project
pages, with hellomonday.com's project pages as a structural reference only —
never a visual copy — and every case study designed for its own project while
sharing components).

- The principle: **one structure, one set of components, and an art direction
  per project.** What is always Colmillo is the skeleton, the typography, the
  clipped lines, the pressure dent, the bite, the bite button, the cursor, the
  edge menu, the wordmark and the Instagram control. What belongs to the
  project is its palette, its pace and its choice and order of modules.
- Model in `src/data/caseStudy.ts`: theme (six values), layout variant
  (`editorial | immersion | graphic | minimal`), hero variant
  (`full | contained | split`, default `full`), an ordered list of fourteen
  module types, optional chapters, related projects and SEO.
- **Nothing is required.** `resolveCaseStudy()` builds a complete page from the
  record the archive already holds — cover as hero, summary as introduction,
  gallery as full-width modules — so the first approved project publishes a
  finished case study the day its entry lands, before anyone authors a module.
  Authoring is how a project stops looking like the others, never how it
  starts working.
- Three sources, in order: approved frontmatter (validated by
  `src/data/caseStudyFields.ts`), a registered demonstration study
  (`src/data/caseStudies.ts`, demo build only), then the fallback.
- Theme as data, never as a rule per pathname: the six colours become custom
  properties on the page's root, and the same background and foreground are
  given to the document, so an overscroll and the shared footer continue the
  project. `chrome` picks the wordmark's derivative and the cursor's surface
  tone. Only literal hex values are accepted (`safeColor()`), because the
  colours arrive from client-authored frontmatter and reach a style attribute.
- One renderer, one registry, one cast. `CaseStudyModules.astro` maps
  `module.type` to a component and is kept honest by
  `satisfies Record<CaseStudyModuleType, unknown>`: a new module type that
  nobody registered fails the typecheck. The data stays a discriminated union
  end to end.
- **The bite reveal is the signature and is rationed.** An organic concave wave
  uncovers a picture as it arrives, and it is literally the archive's pressure
  dent at the scale of a whole picture: `bitePath()` was added to
  `PressSurface.ts` and reuses its existing outline geometry, so the two can
  never drift into two different effects. The renderer honours the first three
  requests on a page and drops the rest.
- **Cross-document View Transitions were not reintroduced** for the
  card-to-hero expansion the brief asks about. This repository removed
  ClientRouter on 2026-09-10 after real back/forward QA, and a later
  cross-document probe reproduced the same touch history rejection
  (`Transition was skipped`); the motion architecture since then is one
  controller mount per native document. Reintroducing it would change the
  lifecycle of every route for one effect the brief itself conditioned on
  robustness. The same intent is served by the hero's own entrance — the media
  settles out of `scale(1.06)` while the name rises out of its clip, then
  drifts slowly as the first screen is left — and by the next project growing
  from inside the measure to the full width. Revisit only as its own task,
  with its own QA.
- The route's progress indicator and its internal index are one element, not
  two: a hairline against the left edge (the right belongs to the edge menu)
  with the chapters hanging off it and one accent mark travelling down it. It
  appears only when a project asks for chapters, has more than two, and the
  screen is at least 1200 px wide; otherwise the page carries nothing.
- The page ends on the work: the next project fills the screen as one link,
  and under it exactly two quiet routes, the archive and one discreet line to
  Contacto. No third call to action, and no row of three cards.
- `previous` was dropped. The next project and the archive are the two ways
  onward, which is what the brief asked for; the old `ProjectHero`,
  `ProjectGallery` and `ProjectNavigation` components and `ProjectLayout` are
  superseded (see the execution state for what was left in place).
- `/proyectos/` itself was not touched. The archive's cards already linked to
  `/proyectos/<slug>/`, so connecting the portfolio to the system needed no
  change to the concurrent redesign at all.

## 2026-09-16 - The Whole /proyectos/ Route Is One White Sheet

Decision (user direction, immediately after the white hero: the closing CTA
and the footer should be white as well).

- The close keeps its shape — one question with the orange mark, one bite
  button to Contacto, centred — and loses its black field. On white the button
  takes the solid ink offset the home rail's route into the archive already
  uses, so the same button reads the same way on both pages.
- The route stops overriding the footer and the canvas entirely. `/studio/`
  and `/servicios/` still carry their own dark canvas because their last
  section is dark; `/proyectos/` no longer has one, so the shared footer and
  the shared white are exactly right and an overscroll at either end shows the
  page's own paper.
- With no change of surface left to mark where the gallery ends, the grid's
  bottom padding was cut from `--pj-space` to `clamp(1.5rem, 3vw, 3rem)`. The
  breath before the question now comes from the close's own top padding, and
  the sticky filter releases right after the last piece instead of hanging
  over the closing question.
- The consequence is deliberate: the pictures and the orange marks are the
  only colour on the route, which is the strongest argument a portfolio can
  make. Nothing else changed — composition, masonry, filter, dent, reveals and
  breakpoints are as recorded above.

## 2026-09-16 - The /proyectos/ Close Becomes A Scene, On White

Decision (user direction, close only): the archive's closing CTA is rebuilt
around the user-supplied `public/assets/projects/bg cta proyectos.png`, in the
spirit of the `/studio/` and `/servicios/` closes but adapted to this route's
white. Nothing above the close changed.

- **The paper is lifted, and that is what makes the scene possible.** The
  master is 2172x724 (exactly 3:1) with sculptures at both ends and empty
  paper between them, but that paper is 254,253,251 — under the page's
  #ffffff. Drawn as delivered it tinted the whole section a warm grey panel
  with visible edges against the sheet, which the 2026-09-16 "one white sheet"
  decision above forbids. `npm run media:projects` scales every channel by
  255/251 (the hero master's own kind of white-point lift), clamping the paper
  to pure white; the drawing moves by one or two levels. The picture then has
  no boundary on the page at all, only its sculptures, so it can be drawn at
  any size or position with no seam, band or plate. Approval is open
  (`docs/CONTENT_NEEDED.md`).
- **Two wings, as on `/servicios/`.** The picture's clear middle is only 38%
  of its width, so a single layer either crops the sculptures away or squeezes
  the copy. Each end is drawn as its own wing and pushed outwards only as far
  as keeps `--pj-cta-clear` free. That figure is deliberately wider than
  `--pj-cta-room`, the copy's own width: with the two equal, the reach clamp
  lands the ink exactly on the copy's edge (measured: 0 px of air at 1440).
  With the margin there is 114-161 px on the left and 88-125 px on the right
  across every landscape width tested.
- **The drawn height is capped, not tied to the section.** At the section's
  full height the file is blown up to about 165% of the screen's width and
  everything but the orange ribbon is cropped away — the metal blocks, and
  with them the composition, disappear. Held to `min(100cqh, clamp(20rem,
  42vw, 34rem))` the whole sculpture is legible and the two ends read as marks
  entering the sheet rather than as a background.
- **Three fades per wing, and the top and bottom are not decoration.** The
  master is itself a crop, so its sculptures meet its frame; drawn shorter than
  the section, that frame cut a straight edge across the orange in the middle
  of the page. Fading the top and bottom dissolves them into the sheet, which
  is what this route's hero already does with its own ground.
- Copy: the question and its orange mark are kept ("¿Hacemos el siguiente?"),
  with one new supporting line and a second route, "Ver servicios" to
  `/servicios/` — the mirror of the `/servicios/` close's "Ver proyectos".
  Linking the archive to itself would have been a dead end. All of it is
  provisional and recorded for approval.
- The buttons are the two compact bite buttons of the `/servicios/` close in
  this route's colours (orange on an ink slab, white on an orange slab), and
  they carry no `data-magnetic` for the same reason recorded there: the shared
  pull writes an inline `translate: none` and cancels the press into the slab.
  The old single button's `data-magnetic` went with it.
- The section still paints no field of its own: its `background-color` is
  `--color-white`, which is what the route's two suites already assert, so the
  sheet decision above survives intact.

## 2026-09-16 - The /proyectos/ Close Fills The Screen And Joins The Stack

Decision (user direction, immediately after the scene above): the close should
take the whole height and rise over the section before it, the way the
`/servicios/` layers do.

- It reuses `SectionStack.ts` rather than growing a private effect: the hero
  and the close carry `data-stack-section`, the close is `max(38rem, 100svh)`
  like the `/servicios/` close, and it rides `--pj-cta-lift`
  (`clamp(1.25rem, 5vw, 2rem)`, the `--sv-overlap` figure) up over what
  precedes it.
- **The gallery is deliberately not a layer.** It is many screens tall and
  carries its own sticky filter band, and `.stack-section` brings
  `overflow: clip`, `min-block-size: 100svh` and sticky positioning, each of
  which would fight one of those. Keeping it out costs the compression of the
  previous layer and nothing else.
- **The hero is a layer only because the stack needs two.** `initSectionStack`
  returns early below two sections, and the standard build has no gallery, so
  without the hero the effect would exist in the demo and be missing from the
  artifact that ships. Marking it is free: no CSS keys off
  `data-stack-section` (only the `.stack-section` class, which is not added),
  so the hero gains no sticky, no radius and no clip of its own, and its
  reveal is a no-op because its trigger is already past at the first paint.
  That was the one risk worth measuring, and it was measured: the hero's
  computed `clip-path` at load is `inset(0px 0%)` at every tested width, so
  there is no clipped flash.
- **On a white route the band is legible only because of the scene.** The
  `/servicios/` layers read because each is a different colour; here the
  rounded corners and the reveal band are white on white. What the eye follows
  is the picture: the sculptures are clipped by the rounded band and grow with
  it. The effect was kept because the scene supplies the contrast the ground
  cannot.
- Reduced motion and no JavaScript: `SectionStack.ts` returns before creating a
  tween under reduced motion, so the close is a full screen with no clip in
  both cases (verified).

## 2026-09-16 - The /proyectos/ Hero Loop Is Published On Its Own Ground

Decision, on the delivered `video hero proyectos.mp4` (user direction: swap
the placeholder for the final loop, no filters, tints, blend modes, overlays,
thick borders or card shadows, and let the illustration read).

- The file is published exactly as delivered, under its own name and
  referenced URL-encoded, the way `/servicios/` publishes its loop. It is not
  re-encoded, cropped, re-timed or colour-corrected. The only change to it was
  dropping a stray space before its extension so the public path is the one
  the brief named.
- Its ground is #f4f2ee — about eleven levels under `--color-white` — and the
  route is one white sheet from the hero to the footer, so the hero cannot
  take the file's ground the way `/servicios/` takes its black. Instead the
  picture's outer 8% fades into the page with two intersecting linear-gradient
  masks. 8% is the widest band that cannot touch a drawn pixel: measured frame
  by frame, the drawing keeps at least 8.13% of empty ground on every side.
  The result is a sheet of paper with no edge rather than a pale panel with a
  hard one. Nothing else is applied — no filter, tint, blend mode, border,
  radius or shadow — and `.projects-hero` keeps `--color-white`.
- The frame is the file's own 16:9 with `object-fit: contain`, so no head,
  hand or floating piece is ever cropped and nothing is stretched. The video
  is not scaled up inside its wrapper: a scale would push the drawing into the
  fade band, and presence was bought with the split instead.
- That split follows `/servicios/`: with the loop present the landscape
  columns become `max-content minmax(0, 1fr)` with a smaller gap, so the loop
  takes about half the hero's measure at every laptop width instead of the
  44fr the empty slot was given. The route's type scale was not touched — the
  title and the orange full stop still have to hold one line, which is why the
  share drops slightly at 1920, where the title is at its clamp maximum.
- Portrait phones bleed the loop to the screen edge but the edge menu's rail,
  again as `/servicios/` does. The bleed is only defensible because the fade
  band means no seam can meet the screen's edge.
- The master's two defects — a ground that is not the page's white, and a last
  frame that is not its first, so each pass wraps with a small cut — are
  recorded in `docs/CONTENT_NEEDED.md` rather than patched over. A re-export
  on pure white would let the mask go.

## 2026-09-16 — `/contacto/` rebuilt as a conversation that starts

The route was the last one still carrying the early editorial template: an
orange hero with the site's own claim repeated as its `<h1>`, a numbered list of
channels on an ink stage and a "Mientras tanto" map back into Studio, Servicios
and Proyectos. It was rebuilt at the user's direction to the level of the other
four routes.

- **Two scenes and the footer, nothing else.** 01 a charcoal hero, 02 the white
  brief, then the shared footer. The closing "direct contact" strip the brief
  in the request allowed was deliberately not built: the address and the profile
  already sit in the brief's left block, so a second copy would be the same two
  links twice on a page whose whole argument is restraint. The map back into the
  site went with it — the edge menu is the navigation, and it marks Contacto as
  the current route.
- **Everything the route removes:** "04 / Contacto", "El siguiente movimiento",
  the repeated "Haz que tu marca muerda" `<h1>` (it stays where it belongs, on
  the home close and as the goodbye stage's call), the 01/02 numbering on the
  channels, "Mientras tanto" and every trace of a secondary page. `.contact-page__*`
  in `layout.css` is now dead; it was left in place because that file is being
  edited from another terminal (see `EXECUTION_STATE.md`).
- **The hero is not another split.** `/studio/`, `/servicios/` and `/proyectos/`
  all put a title on the left and a media frame on the right. Contacto has no
  media column at all: one typographic block over about 60% of the measure, the
  supporting line under it, and the rest of the screen left empty for one
  graphic. Sentence case, the orange disc for its full stop, and the type
  capped so the pair always fits a 1366x768 laptop window.
- **The graphic is an unfinished trajectory**, not another decorative ring: an
  open arc of about 305 degrees with a 55-degree opening, drawn off-round (every
  quadrant a slightly different reach, control points that do not mirror), a
  hairline in `#cd5730`, anchored to a corner so what is on screen is always a
  fragment of a longer path. No WebGL, no canvas, no image: one inline `<path>`
  and one disc.
- **The white sheet rises over the hero on sticky layout**, not on the shared
  `SectionStack`. The hero is `position: sticky; top: 0` at exactly one screen
  tall and the brief scrolls over it, so the effect exists with no JavaScript
  and under reduced motion. It is not the `/servicios/` stack: no reveal band,
  no compression of what is underneath, and the top radius is a token
  (`clamp(0.5rem, 1.4vw, 1.5rem)`) that motion flattens to nothing as the sheet
  lands, rather than the 5rem band the stack opens with.
- **The form is set into the sheet, not into a card.** A field is a small label,
  a large control and a hairline rule; the rules carry the structure. No box,
  no panel, no shadow, no grey. The only shadow on the route is the submit
  button's physical slab, the one `/servicios/` already uses.
- **Five fields: Nombre, Correo, Empresa / proyecto, Servicio, Mensaje.**
  Presupuesto and Plazos were considered and left out: at a first contact they
  ask a visitor to commit to numbers they rarely have, and any answer they would
  give fits in the message. Adding either is one entry in `contactFields`.
- **The service selector is a native radio group.** The pills are the radios'
  own labels and the inputs are only visually hidden, so arrow keys, the tab
  sequence, the announcement and the no-JavaScript path all come for free.
- **Nothing claims a message was sent.** There is no server, API route, server
  action or mail provider anywhere in this repository (`output: 'static'`, no
  adapter, no integration), and none was added — that needs the client's
  authorisation. `contactFormEndpoint` in `src/data/contactPage.ts` is `null`
  and decides the submit path: while it is null the finished brief is handed to
  the visitor's own mail client as a prepared draft and the status says exactly
  that, with the address beside it in case nothing opened. "Enviado" and
  "Recibido" exist in the copy but can only be reached through the endpoint
  branch, which a real 2xx has to answer. With no JavaScript the form's own
  `action` does the same thing natively.
- **Colour:** charcoal `#1f1f1f`, white, and `#cd5730` for the arc, the disc,
  the full stops and the selected pill. Every orange word — a focused label, an
  error, the status line — uses the accessible `#b54d2a`. No new palette, no
  gradient, no beige, no photograph, no video: this is the lightest route on the
  site and adds no asset at all.

## 2026-09-16 - The Legal Pages Are Written From An Audit, Not From A Template

Decision: write `/aviso-legal/`, `/privacidad/` and `/cookies/` against a
technical audit of what this site actually does, publish them with the
holder's identity marked as missing rather than filled with plausible data,
and build no cookie consent mechanism.

The audit, performed on 2026-09-16 over the source and over the deployed
artifact at `https://colmillo-studio.vercel.app/`:

- no analytics, tag manager, pixel, heatmap or marketing script exists in
  `src/`, `public/` or `package.json`. The served HTML contains no third-party
  `<script>`, no `<iframe>`, and no `_vercel/insights` or
  `_vercel/speed-insights` injection; the Vercel project has neither product
  enabled;
- the response carries no `Set-Cookie` header, and `document.cookie` appears
  nowhere in the codebase. The site sets no cookies at all;
- the only browser storage written is `colmilloIntroPlayed` (sessionStorage,
  value `true`, cleared when the tab closes), which stops the home intro
  replaying. `MotionPreference.ts` only *removes* the retired
  `colmillo-motion` localStorage key; it never writes one;
- typefaces are the system stack and video is self-hosted, so no external host
  is contacted for a subresource;
- Instagram is a plain outbound link, not an embed, so Meta sets nothing while
  a visitor is on this site;
- the contact form has no backend: the project is `output: 'static'` with no
  adapter or API route and `contactFormEndpoint` is `null`, so the browser
  composes a draft in the visitor's own mail client and the site transmits
  nothing.

Reason, point by point:

- **No consent banner.** Article 22.2 of the LSSI-CE requires consent for
  storage that is not strictly necessary. There is no such storage here: the
  one session key is first-party, carries no identifier, never reaches the
  server and dies with the tab. Publishing a consent dialogue for it would ask
  permission for nothing and add to consent fatigue. `/cookies/` states this
  explicitly, including the commitment to implement consent *before* enabling
  any future analytics or embed.
- **No consent checkbox on the form.** Consent is not the legal basis for
  answering a message somebody chose to write. The basis is a pre-contractual
  measure at the data subject's request (art. 6.1.b RGPD) or legitimate
  interest in replying (art. 6.1.f). A checkbox would also imply the site
  transmits the brief, which it does not. A short privacy line next to the
  submit button, linking to `/privacidad/`, is what the situation requires.
- **Missing data is marked, never invented.** No business name, NIF, address
  or registral data exists anywhere in this repository, so every such value is
  a `pending(...)` marker rendering as a red, dashed `[PENDIENTE: …]` chip.
  Nothing registral was written at all, because the holder's legal form is
  unknown and a company's Registro Mercantil entry cannot be guessed.
  `scripts/release-check.mjs` now walks `dist/` and refuses a release while a
  single marker survives, so the honest gap cannot reach production silently.
  `LEGAL_TODO.md` is the request list for the client.
- **Vercel is named because it is verified**, not assumed: the `Server: Vercel`
  header, the project in the client's own account and `docs/DEPLOYMENT.md` all
  agree. Its processor agreement and international-transfer safeguard are
  marked pending rather than asserted.
- **The approved address is not typed into the documents.** They read it from
  `src/config/contact.ts`, so the unresolved `colmillostudio` /
  `colmilloestudio` spelling is corrected in one place when the client
  confirms it.

## 2026-09-16 - Legal Routes Follow The Site-Wide Indexing Gate

Decision: stop forcing `noindex` inside `LegalLayout.astro`. The legal routes
now inherit `SeoHead`'s default, which is `siteConfig.isPrelaunch`.

Reason: the layout passed `noindex` unconditionally, which would have kept the
legal notice, privacy policy and cookie policy out of the index permanently,
even after release approval. A public site's legal disclosures are meant to be
reachable and citable. Behaviour today is unchanged — `isPrelaunch` is `true`,
so all nine routes stay `noindex` behind the same single gate — and the change
is one prop.

## 2026-09-16 - The Legal Routes Use `legal-route`, Not `.legal-page`

Decision: name the new legal root class `legal-route` and leave the existing
`.legal-page` rule in `layout.css` untouched.

Reason: that rule belongs to the previous `.content-shell` version of these
pages and would have added its own padding to the new composition. A parallel
session had `layout.css` open, so the reversible choice was a new class name
rather than an edit to a file owned by other uncommitted work. The same
reasoning put the `/contacto/` privacy-line rules in `legal-page.css` instead
of `contact-page.css`; both are noted in the stylesheet itself.
