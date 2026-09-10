# COLMILLO STUDIO - MOTION SPEC

## Motion Vocabulary

The motion language should feel like bite, pressure, compression, deformation,
reveal, overlap, tension and release.

## Global Rules

- Motion is progressive enhancement.
- Core content must be usable without JavaScript.
- Respect `prefers-reduced-motion`.
- Avoid permanent expensive animation loops.
- Do not make motion required for navigation or comprehension.
- Cursor effects never replace real affordances.

## Hero

- Full first-screen media experience.
- Looping video in production, not raw GIF.
- CTA remains reachable and readable.
- Reduced-motion users receive a poster/static version.
- The loop is the only loud element. The label, the CTA and the continuation
  control sit around a large field of empty cream and never compete with it.
- The loop carries a real alpha channel and is composited directly on the cream
  surface. It is decorative and hidden from assistive technology; every control
  around it is a real link.

## Cursor

- Desktop pointer enhancement only.
- Reacts to links, buttons, media and project cards.
- Must not hide the native focus state.
- Disable or simplify on coarse pointers.

## Section Stack

- Sections overlap as physical layers.
- Maintain DOM reading order.
- Avoid scroll hijacking that traps the user.
- Provide a simple stacked layout on small screens if needed.

## Horizontal Projects

- Vertical scroll drives horizontal project progression on capable devices.
- Keyboard and reduced-motion users must be able to navigate all projects.
- Project cards must remain accessible links.

## Goodbye

- Uses final client animation once supplied.
- Until then, use only a clearly marked development placeholder or static
  structure.

## Page Transitions

- Original but restrained.
- Must not block back/forward navigation.
- Must fail gracefully when JavaScript is disabled.

## Implementation Status

- `MotionController.ts` mounts each feature once per native document and cleans
  optional enhancements when the explicit motion preference changes.
- `MotionPreference.ts` mirrors `prefers-reduced-motion` onto
  `html[data-motion]` and announces changes; reduced motion disables GSAP pins,
  cursor, magnetism, looping CSS motion and view-transition animation. The
  visible manual toggle was retired on 2026-09-10, so the system preference is
  the only source, and the module clears the override the toggle used to store.
- `CustomCursor.ts` adds a pointer-events-free pressure cursor only for fine
  pointers. It stretches with pointer velocity, compresses on press and exposes
  short contextual labels on selected controls while retaining the native
  pointer and all focus affordances. It also publishes bounded pointer position
  and velocity variables used by the hero without starting another frame loop.
- `SectionStack.ts` gives each layer a clipped entrance and gently compresses
  the covered layer with transform/opacity and a coordinated pressure edge.
  Large screens receive sticky, rounded physical layers; mobile and
  reduced-motion layouts remain linear.
- `HorizontalProjects.ts` maps vertical scroll to a pinned horizontal track on
  capable screens, publishes continuous and discrete progress, marks the
  current card, adds bounded 2D depth to the active scene, and synchronizes
  focus and semantic previous/next controls. Native overflow and scroll snap
  remain the no-JavaScript, touch and reduced-motion fallback.
- `EdgeMenu.ts` drives the right-edge navigation through one state machine:
  `closed`, `tracking`, `open` and `open-collapsed`, published as `data-state`
  (closed | tracking | open) plus `data-close` (expanded | collapsed) while
  open. Closed, the navigation is only a small orange tab, 20 px inside the
  edge at mid-height; there is no spine, label or progress readout. Within
  64 px of the edge a fine pointer arms `tracking`: the tab reaches to 40 px and
  follows the pointer vertically, never horizontally, through one
  `gsap.quickTo` on the carrier (0.36 s, `power2.out`) on the shared ticker. It
  stops below the Instagram control's band (the exclusion zone) and above the
  foot of the viewport, and returns to mid-height past 104 px. Opening turns
  the tab into a thin ink close control in the same place; it retracts to a
  12 px sliver after 2.6 s without the pointer or focus on it, returns when the
  pointer re-enters the hot zone or the control takes focus, and retracts again
  1.4 s after they leave. Touch keeps the full control, because nothing could
  bring it back.

  The native `<details>` remains the control and stays usable without
  JavaScript. Where scripting is available the module moves the panel out of
  the disclosure so it can animate in both directions instead of being dropped
  from rendering the moment it closes. It supports Escape, the close control, a
  link and the backdrop as close paths, traps and restores focus, makes outside
  content (and the Instagram control) inert, locks scrolling without shifting
  the layout and exposes the current numbered scene in the panel. The backdrop
  is an ink veil at 34% with a 6 px blur, applied only while open. Under
  reduced motion tracking is disabled, the tab stays at rest and the panel,
  routes and close control change state without travel.
- `InstagramBadge.ts` folds the single global Instagram control, in place in
  the top-right corner, from its hero pose - `INSTAGRAM ↗`, scaled 1.3 from
  1024 px and 1.15 from 768 px around its own top-right corner - into a round
  compact control carrying the Instagram glyph (inline SVG), over the first 30%
  of a viewport of scroll. It is one continuous scroll-linked change of the
  same element. The scale is a GSAP `quickSetter` write; the three-piece pill,
  the word, the arrow and the glyph derive from one `--ig-p` progress value.
  Hovering or focusing the compact control opens it back to the full word.
  Reduced motion swaps the fold for one state change halfway through the
  range; other routes are compact from the start.
- `EditorialMotion.ts` reveals whole editorial blocks and deforms route marks
  by scroll progress; it never splits readable text into animated letters.
- `SurfaceTone.ts` switches the shared cursor contrast from intersection state
  rather than sampling layout on every frame.
- The development goodbye fallback is an original CSS jaw/letter composition
  with a scroll-driven compression. It is not a substitute for the official
  asset and cannot enter the standard build.
- Page entry uses a short CSS bite reveal on `main`; native document navigation
  owns links and history. This replaced ClientRouter after real back/forward QA
  exposed a rejected transition (`Transition was skipped`). The CSS reveal
  never delays navigation and is removed in reduced-motion and no-JavaScript
  modes. A later cross-document View Transition probe reproduced the same touch
  history rejection and was removed completely.
- Magnetic controls cache their bounds on pointer entry, avoiding a layout read
  on every pointer-move event.
- Official hero slots accept mobile and desktop WebM/MP4 sources plus a poster
  and intrinsic dimensions. Observers pause media outside the viewport, a
  `visibilitychange` listener pauses it in a backgrounded tab, and reduced
  motion hides and pauses the video.
- The still frame is *not* rendered beneath the loop any more. The delivered
  WebM is transparent, so a poster underneath it would show a second frame of
  the animation through the drawing. `.hero__poster` is therefore hidden by
  default and revealed only under reduced motion; everyone else gets the same
  file through the video's own `poster` attribute, at no extra request.
- `HeroMotion.ts` owns playback state and the exit compression only. The hero
  composition itself is complete CSS: it renders identically with no
  JavaScript.
