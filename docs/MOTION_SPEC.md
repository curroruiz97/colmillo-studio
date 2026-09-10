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
- `MotionPreference.ts` combines the system preference with an explicit
  accessible toggle; reduced motion disables GSAP pins, cursor, magnetism,
  looping CSS motion and view-transition animation.
- `CustomCursor.ts` adds a pointer-events-free pressure cursor only for fine
  pointers. It stretches with pointer velocity, compresses on press and exposes
  short contextual labels on selected controls while retaining the native
  pointer and all focus affordances. It also publishes bounded pointer position
  and velocity variables used by the hero without starting another frame loop.
- `StickyHeader.ts` uses an intersection observer and toggles `inert` while the
  home hero is active, preventing hidden links from entering the tab order.
- `SectionStack.ts` gives each layer a clipped entrance and gently compresses
  the covered layer with transform/opacity and a coordinated pressure edge.
  Large screens receive sticky, rounded physical layers; mobile and
  reduced-motion layouts remain linear.
- `HorizontalProjects.ts` maps vertical scroll to a pinned horizontal track on
  capable screens, publishes continuous and discrete progress, marks the
  current card, adds bounded 2D depth to the active scene, and synchronizes
  focus and semantic previous/next controls. Native overflow and scroll snap
  remain the no-JavaScript, touch and reduced-motion fallback.
- `EdgeMenu.ts` drives the right-edge navigation through three states declared
  on the wrapper as `data-state`: `closed` leaves a full-height spine, which
  carries no travelling marker, and a small swelling of the handle inside the
  viewport, `peek` slides the whole
  handle in when a fine pointer comes within 72 px of the edge, and `open`
  brings in the editorial panel. Only transform and opacity animate; no shape
  morphs. The peek retracts at 152 px, which is wider than the revealed handle
  so moving onto it never cancels the reveal, and proximity is ignored entirely
  while the menu is open. Keyboard focus reveals the handle through the same
  state, so the peek is never the only way to find the navigation.

  The native `<details>` remains the control and stays usable without
  JavaScript. Where scripting is available the module moves the panel out of
  the disclosure so it can animate in both directions instead of being dropped
  from rendering the moment it closes. It supports Escape, the handle, a link
  and the backdrop as close paths, traps and restores focus, makes outside
  content inert, locks scrolling without shifting the layout, exposes the
  current numbered scene and keeps the motion preference reachable inside the
  panel. Under reduced motion the peek is disabled and the panel appears
  without travel.
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
