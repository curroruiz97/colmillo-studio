# COLMILLO STUDIO - QA CHECKLIST

## Baseline

- `git status --short` inspected.
- Existing failures documented before edits.
- Package manager identified.
- Lockfile preserved.
- Phase 0 audit recorded in `docs/EXECUTION_STATE.md`.

## Build

- Typecheck passes.
- Lint passes.
- Tests pass.
- Production build passes.
- No new warnings ignored without investigation.
- `npm.cmd run validate` passes.
- `npm.cmd run check:production` passes.
- `npm.cmd run check:links` passes against production and demo artifacts.
- `npm.cmd run check:brand` verifies both header wordmarks are non-interlaced
  RGBA PNGs with the expected intrinsic dimensions, antialiased alpha and an
  even 12 px transparent safety margin.
- `npm.cmd run check:manifest` proves two consecutive manifests are stable and
  exclude `release-manifest.json` itself.

## Visual

- Desktop viewport inspected.
- Tablet viewport inspected.
- Mobile viewport inspected.
- Hero media renders correctly.
- CTA is visible and works.
- Edge menu works.
- The native scrollbar is hidden while wheel, trackpad, keyboard, touch,
  programmatic and anchor scrolling all still move the page, with no horizontal
  overflow introduced.
- The edge rail carries no travelling progress marker.
- The spine is flush against the right viewport edge and only a sliver of the
  handle is inside it while closed, at 1920×1080, 1440×1000, 1366×768,
  834×1112 and 390×844.
- Fine-pointer proximity to the right edge reveals the handle, moving away
  retracts it, and an open panel ignores proximity entirely.
- Keyboard focus reveals the handle without any pointer.
- The panel traps/restores focus, applies `inert` outside, closes from the
  handle, a link, the backdrop and Escape, and keeps its motion preference
  operable.
- Opening locks scrolling without moving the layout horizontally or losing the
  scroll position.
- Every navigation label stays on one line with no horizontal overflow at
  1920×1080, 1440×900, 1366×768, 1024×1366, 768×1024, 430×932, 390×844 and
  320×720.
- The open panel never hides its own content behind the handle.
- A coarse pointer gets a permanently visible handle of at least 44 px and page
  content clears it.
- The edge rail reports the current numbered scene.
- Section stacking does not obscure content.
- Horizontal projects section works and has fallback.
- Project tiles reveal their title on hover and keyboard focus, and keep it
  visible on touch screens; the contextual cursor label never replaces native
  pointer/focus behavior.
- No pinned project tile is cut off at the bottom of the viewport, and the
  closing `Ver proyectos` route ends the rail fully on screen.
- Five fictional projects exercise the rail, listing, detail gallery and
  circular previous/next navigation in the isolated demo.
- Goodbye section works or is documented as awaiting asset.
- Verified at 1440×1000, 834×1112 and 390×844 with Chromium screenshots from
  the static demo artifact.
- Manifiesto, Studio and Contacto top/interior states verified at the three
  reference viewports plus 320×720.
- Black-on-light and cream-on-dark header logo variants render without
  stretching, clipping, background mattes or collisions at all target widths.

## Accessibility

- Keyboard navigation works.
- Focus states are visible.
- Icon links have labels.
- Links and buttons are semantic.
- Reduced-motion mode works.
- Contrast checked.
- DOM order remains logical.
- Production and demo Playwright suites cover semantic navigation, focus,
  reduced motion, fine/coarse pointers, no-JavaScript behavior, history and
  console errors. Final counts: production 25 passed/3 intentional
  capability-specific skips; demo 29 passed/10 expected capability-gated skips
  on touch projects.
- Automated compact-width coverage checks all primary/editorial routes at
  320 px; a separate regression applies 200% root text sizing at 390 px. Both
  enforce zero horizontal overflow and visible in-viewport headings.

## Performance

- Media dimensions defined.
- GIFs converted to video before production.
- Images optimized.
- No unnecessary large dependency added.
- No layout shift introduced by media.
- Animations avoid layout thrashing.
- Measured generated JavaScript: 126,717 uncompressed bytes total; no raw GIFs.
- Automated layout-shift and horizontal-overflow checks pass in desktop and
  mobile Chromium.

## Content Integrity

- No invented clients.
- No invented metrics.
- No invented testimonials.
- No fake contact details in production.
- Placeholders are clearly marked.
- Missing items are recorded in `CONTENT_NEEDED.md`.
- Development-only markers are absent from `dist`.
- Demo titles, banners, slugs and routes are absent from `dist`.
- Demo-specific browser coverage runs only through `test:e2e:demo` against
  `dist-demo/`; the normal suite explicitly ignores the demo spec.

## Release Guard

- No push unless explicitly requested.
- No deployment unless explicitly requested.
- No production analytics without explicit decision.
- No domain/DNS changes without explicit decision.
- Prelaunch `noindex` and blocking `robots.txt` remain active.
