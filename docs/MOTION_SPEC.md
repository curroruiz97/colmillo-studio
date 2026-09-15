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
  control sit around a large field of empty white and never compete with it.
- The loop carries a real alpha channel and is composited directly on the white
  surface (`hero-*-white.*`, baked for `--color-background`). It is decorative and hidden from assistive technology; every control
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
- A layer names the part that compresses under the next one with
  `data-stack-content`; the home sections keep using their `.content-shell`.
  `/servicios/` is built entirely from stack layers (see "Services Page").

## Horizontal Projects

- Vertical scroll drives horizontal project progression on capable devices.
- Keyboard and reduced-motion users must be able to navigate all projects.
- Project cards must remain accessible links.
- The rail is images first: at rest a tile is only its picture. The title is
  revealed by a page-coloured cut-out that bites up into the image's bottom-left corner
  on hover and keyboard focus, and stays open on screens without hover.
- Hover is pressure, not zoom: under a fine pointer the image edge nearest the
  cursor bends inwards as a soft dent (`ProjectTilePress.ts`), inside a frame
  that never scales, moves or resizes. Leaving releases it to the exact
  rectangle.
- The rail ends on the `Ver proyectos` route; it is the last piece of the
  moving track, never a row under it.
- The pinned rail never cuts a tile off at the bottom of the viewport.

## Services

Rebuilt on 2026-09-11 as a sticky editorial sequence (see `DECISIONS.md`).

- Wide screens with motion allowed (`>= 64.01rem` wide, `>= 40rem` tall): a
  track of `100svh + count x 45svh` (280svh) with one sticky 100svh stage.
  Nothing is pinned, and the section itself is never a sticky stack layer.
- Composition (2026-09-11 follow-up): the heading, with the `Abrir servicios
  ↗` CTA beside it (a wide gap, centred on the heading's two lines), holds the
  top-left corner and the `01 / 04` readout (with its 2px orange line) the
  bottom-left; both are anchors and never move. The illustration and the
  service on stage form one pair centred on the viewport, art on the left,
  close to the copy without touching it, and centred vertically on the name
  and description. The service on stage changes, every name on the same line.
- The illustration frame holds stacked layers: the shared illustration
  (Estrategia) plus the client's own art for Identidad, Digital and Contenido
  (2026-09-11, WebP derivatives from `npm run media:services`). The shared art
  sets the frame's size; every service layer fills it with `object-fit:
  contain` anchored at the foot, so each drawing is whole, the same size and
  on the same ground line. At each handover the frame cross-fades from the
  leaving service's art to the arriving one's: both over the same 0.4 of a
  step centred on the boundary, `sine.inOut`, so their opacities always sum to
  one and the frame never dims; the leaving art settles to `scale 0.99, y -4px`
  and the arriving one lands from `scale 1.015, y 6px`, both from the foot.
  It runs inside the copy's own handover, so art and text change together.
- The service layers are `loading="lazy"`; once the track is within 150% of
  a viewport an `IntersectionObserver` switches them to eager and decodes them,
  so no handover waits on the network. The list layout (phones, portrait
  tablets, reduced motion, no JavaScript) keeps only the shared illustration
  and never fetches them.
- `ServicesSequence.ts`: one timeline scrubbed (0.8) by the track, one unit
  per service, every handover centred on a step boundary. The outgoing service
  rises 14% and is transparent just before the boundary; the incoming rises
  from 26% below and fades in right after it, its name, copy and glyph
  16px apart on a 0.035 stagger, and its hairline rule draws in from the left.
  The two are never on stage together. Names only translate (`force3D: false`),
  never scale.
- The illustration presses 6px down (`scaleY 0.988`) at each handover and
  settles into a per-service pose within +-7px. It is one flat PNG, so nothing
  inside it moves on its own.
- The readout and the orange line follow the same playhead. The readout is
  `aria-hidden`; every service stays in the DOM in reading order, and focus
  inside a service that is not on stage scrolls the page to its step.
- Release: when the track ends the stage leaves with ordinary scroll and the
  project rail follows directly under it. The rail pins only once the services
  are off screen, so the two scroll ranges never overlap.
- `ServicesMotion.ts` switches the layout synchronously and mounts the
  timeline from its lazy chunk; a chunk that fails to load returns the section
  to its list.
- Linear everywhere else (no JavaScript, reduced motion, tablets, phones,
  short windows): a vertical list with every service painted. Wide screens
  hold the heading column with CSS `sticky`; phones and tablets reveal each
  entry once (22px, 0.62s).

## Studio

- A pause, not a sequence: no pin, no scrub, no travelling letters, no blur and
  no scaling. The character loop is the only protagonist.
- `StudioMotion.ts` runs one entry timeline, once: the two headline lines
  rising out of their own clips, then the lede and the CTA wrapper, while
  the loop lifts 26px from transparent. The CTA link keeps the shared magnetic
  pull; the reveal lives on its wrapper so the two transforms never collide.
- The loop plays only while it is within 20% of the viewport and the tab is
  visible, and is fetched only then (`preload="none"`, no `autoplay`). Each pass
  rises out of the paper and sinks back into it over eight frames; the first
  pass starts on the poster frame so the still hands straight over to motion.
- Reduced motion and no JavaScript render the finished spread with the loop
  parked on its poster, which is the first frame it would play.

## Goodbye

Rebuilt on 2026-09-10 as a viewport over one panoramic scene. Since
2026-09-11 the scene is a photograph (on trial, `goodbyeVisual`) and side B is
type on the photograph's own black, not a panel. Its copy lives in
`src/data/goodbye.ts`.

- One scene element (`[data-goodbye-scene]`): the `goodbyeVisual` still, a
  2048x768 photograph (`public/assets/goodbye/goodbye-panorama.webp`), or a
  structural placeholder panorama while the slot is `null`. `object-fit:
  cover` at full height, no frame or radius. Its width is the visual at full
  height, `clamp(135cqw, 100cqh × ratio, 200cqw)` (230cqw on the band layout),
  with the ratio written by the component as `--goodbye-ratio`.
- Two positions. Side A shows the photograph's left end with the first block
  in its left black field; the arrow pans the whole scene left until its right
  end is flush with the screen and the CTA arrives in the right black field.
  The orange piece in the middle is on screen in both positions and is the
  link between them. The visual is never swapped, faded, zoomed or cut.
- The distance is exact by construction: the viewport is a size container and
  the scene is `translateX(calc((100cqw - 100%) * var(--goodbye-progress)))`.
  `GoodbyePanorama.ts` only eases `--goodbye-progress` between 0 and 1.
- Wide layout (aspect 5:4 and wider): the photograph fills the 100svh stage.
  The copy layer is the same box and a size container, so the copy is cut from
  the scene's width with fractions measured on the photograph: side A inside
  its first 26% (black to 29%), the CTA from 69% (black above 70% of the
  height from 66%) and above 68% of the height, the back button in the
  bottom-right corner (black at every height past 76%). On these aspects the
  scene is never cropped sideways, so a fraction of the scene is a fraction of
  the photograph.
- Band layout (narrower than 5:4, and without JavaScript): the photograph runs
  across the top (`clamp(15rem, 54svh, 44rem)`) and fades into the ink through
  a mask; the two blocks alternate below it in one cell, the back button
  leading the CTA. The section keeps `100svh` as a minimum.
- The CTA is the headline ("Nosotros sabemos dónde apretar.", with a discreet
  note of the four services under it; both arrive as one line of the reveal)
  linked to `/contacto/`, white,
  a heavy white underline and an orange disc with an ink arrow set into the
  last word; the kicker carries a small orange bitten mark. Hover and focus
  press the line 0.2rem forward, thicken the underline and push the arrow a
  further 0.3rem; pressing scales the disc to 0.9. No glow, bounce, blur or
  zoom.
- One GSAP timeline, played forward to arrive and reversed to go back, so the
  return is the exact inverse: scene 0-1.1 s `power3.inOut`; side A's block
  drifts out by 0.31 s; the CTA lines drift in from 0.84 s (0.06 s stagger);
  the back button scales in from 0.95 s; about 1.3 s in all. The copy is fixed
  to the screen while the photograph moves under it, so those times are the
  measured window in which it only ever overlaps black (checked every frame,
  both ways, from 320 to 2560px).
- Keyboard focus moves from the pressed control to the arriving side's control
  once the travel settles; the side not on screen is `inert`. Requests during a
  travel are ignored.
- No dots, counter, cards, thumbnails or autoplay. Input: the arrows (click,
  Enter, Space; ArrowLeft/ArrowRight while one has focus) and, on touch, a
  horizontal swipe (drag left reveals the right side). Vertical gestures stay
  native scroll (`touch-action: pan-y pinch-zoom`).
- Phones and windows under 32rem tall keep `100svh` as a minimum and grow with
  their content instead of cutting it.
- Reduced motion jumps between the sides with no travel and parks a video scene
  on its poster; transitions inside the stage are switched off so the jump (and
  the focus hand-over) lands in the same frame. No JavaScript: the band layout,
  the scene resting on its left side, both blocks listed and the arrows hidden.

## Contact Close ("la última mordida")

Reworked on 2026-09-11 (second pass): a soft sculpture replaces the disc, and
the section is in sentence case. See `DECISIONS.md`.

- The section's own script registers a loader on the section; `ContactBite.ts`
  (run by `MotionController`) mounts `ContactBiteMotion.ts` from it and hands
  it GSAP, so neither the chunk nor Vite's import helper enters the shared
  motion bundle. A chunk that fails to load leaves the still composition,
  which is complete.
- The sculpture is SVG whose geometry comes from `ContactSculpture.ts` (pure,
  no DOM): a body path, light and shade gradients, the scoop's inner wall, a
  light lip and a contact shadow. The still pose is rendered on the server;
  the motion only redraws the same parts from an eased state
  (`px/py/presence` of the pointer, `sx/sy` squash, `bite` depth). The SVG
  is `aria-hidden`; the piece is a link to `/contacto/` (see below).
- Entrance, once, from `top 70%` with `end: 'max'` and an in-view check:
  lines at 0.1 and 0.2, "muerda" revealed from its left edge
  while it lets go of `scaleX .9 / scaleY 1.08` at 0.34, the sculpture rising
  from `sx 1.1 / sy .86` and a deeper scoop back into its shape
  (`back.out(1.5)`, 1.15 s) from 0.3–0.34, the channel buttons at 0.82.
  About 1.8 s end to end, no cartoon bounce. Every tween is a `fromTo`.
- Fine pointer only: one passive `pointermove` feeds `gsap.quickTo`s
  (0.95 s follow; 1.2 s drift). The piece turns towards the pointer (light,
  shade and scoop move; the scoop's parallax changes the silhouette), dents
  where the pressure comes from and swells on the far side, opens its bite a
  few units when approached, and drifts at most 18px. It fades out 0.9 radii
  beyond the body. One `gsap.ticker` callback, registered only while the
  section is on screen, redraws (about 0.8 ms) only when the state changed.
  Leaving returns it to exactly its resting outline.
- Pressure couples to "muerda": `translateX(-3px * press)` plus a 0.4%
  squeeze, so the word gives way 1-3px.
- Bite: the pointer entering the body, or touching "muerda": squash to
  0.95 / 1.045 with a deeper scoop in 0.15 s, release at 0.18 s with
  `back.out(1.7)`; about 0.65 s. "muerda" is squeezed through `--bite`. The
  existing cursor shows its `data-pressed` pose; "muerda" carries an empty
  `data-cursor-label` (active ring, no text).
- The channels are two of the hero's `bite-button`s side by side under the
  headline ("Correo ↗", "Instagram ↗"): the same shape, orange, ink border,
  `0 0.4rem 0` ink shadow, magnetic pull and hover squeeze, nothing of their
  own except narrower side padding on phones.
- The sculpture is a link to `/contacto/`. Only its painted form takes the
  pointer (`pointer-events: visiblePainted`; the link box and the white around
  it do not), so the empty corners are never a hit area, and the link's box
  ends at the stage edge, clear of the fixed rail. CSS only, 160 ms: on hover
  and keyboard focus the form presses down 6px (`scale .985/.975` from its
  foot) onto a hard ink shadow in its own silhouette. A pointer gets the
  cursor's "Contacto" disc (`data-cursor-label="Contacto"`, exactly as on the
  hero CTA); keyboard focus and touch get "Contacto ↗" set into the piece
  instead. `:active` presses it 14px, all the way onto the shadow.
  Keyboard focus also draws an ink ring on the real silhouette. Without hover
  the note and the shadow stay visible, since they are the only affordance.
- The headline is centred on the stage (the buttons' height mirrored above
  it) and the sculpture's centre sits on the same line. It uses the
  manifesto's word sizes (desktop `clamp(3.06rem, 5.58vw, 5.58rem)`, portrait
  tablets `clamp(4rem, 11vw, 7rem)`, phones `clamp(2.2rem, 12.4vw, 4.6rem)`;
  "muerda" 1.3x), is set in from the gutter like the services and Studio
  headings (phones keep the gutter), and the buttons start where "muerda"
  starts.
- Touch: the entrance only; the still sculpture. Reduced motion: a 0.45 s
  fade with 10 px of travel and the still sculpture; the hover and focus
  states still change in place.

## Studio Page (/studio/)

Rebuilt on 2026-09-11 (see `DECISIONS.md`). There is no pin, scrub, parallax
or permanent loop. Movement follows an interaction or an arrival.

- Loading: `StudioPage.ts` (shared bundle, a few lines) mounts
  `StudioPageMotion.ts`, a route-only chunk whose dynamic import lives in
  `src/pages/studio.astro`, and hands it GSAP and `PressSurface`, exactly as
  the home contact close does. The shared bundle stays under its 150 KB
  budget. A chunk that fails leaves the complete static page.
- Second design pass on 2026-09-14: the route is calmer than the home. The
  pointer drift on the principles' pictures was removed, and the principles
  no longer clip or zoom their pictures in from the foot.
- Hero, once from the first paint, in CSS so it never waits for the chunk:
  the title rises out of its clip (`translateY(108%)` to rest, 1.05 s, GSAP's
  `power3.out` curve, at 0.1 s), then the frame settles from `opacity 0,
  translateY(18px)` (1.2 s, `power2.out` curve, at 0.36 s); no scale. When
  `studioHeroMedia` is supplied the loop plays only on screen in a visible
  tab. Reduced motion: no entrance; the loop rests on its poster.
- Reveals: every `[data-reveal-group]` draws its `[data-reveal-rule]` in from
  the left (`scaleX 0`, 0.9 s), lifts its `[data-reveal-line]` lines out of
  their `.studio-line` clips (0.95 s, 0.09 stagger; the team heading and the
  close) and settles its `[data-reveal-fade]` blocks (`y 20`, opacity, 0.8 s,
  0.12 stagger, from 0.08 s, or 0.3 s after lines), once, at `top 78%`, all
  `power3.out`. "Somos Colmillo": rule and heading together, then the lede,
  then the paragraph, about 1.1 s in all; no blur, no bounce, no parallax.
  Reduced motion: one simultaneous 0.45 s opacity fade, no stagger.
- Principles (CSS transitions on the states `StudioPageMotion.ts` writes):
  exactly one principle is open. Its name brightens from white 50% to
  `#f5f5f5` and steps 6 px in (420 ms `--ease-bite`), its top rule draws in
  orange from the left (`scaleX`, 2 px, 560 ms) and its description opens
  under it (`grid-template-rows 0fr` to `1fr`, 520 ms, opacity after 120 ms).
  The row that closes collapses in the same 520 ms, so the list keeps its
  height and a row only grows downwards from under the pointer that opened
  it. The closed rows collapse without a transition on the first paint
  (`data-settling` for two frames). On the right, the arriving picture fades
  in (420 ms), rises 16 px and opens a light top clip (`inset(10% 0 0 0)` to
  `inset(0)`) over 720 ms; the leaving one fades out in place (360 ms). No
  zoom, no tilt, no scroll-jacking. Reduced motion: the same states, changed
  at once. On a tap, once the rows have settled, a picture under the list that
  is off screen is scrolled into view with the least movement.
- Team: each portrait arrives once (`autoAlpha`, `y 56`, 1 s, `top 90%`);
  nothing moves afterwards. Under a fine pointer with motion allowed each
  portrait's surface takes the home rail's dent (`PressSurface.ts`, same
  values). Touch, coarse pointers, keyboard and reduced motion: still
  pictures; reduced motion reveals with opacity only.
- Close: the shared bite button, cream offset slab on ink, `:active` sinks it
  0.28 rem; the arrow nudges on hover and focus; magnetic pull as elsewhere.
- Third pass (2026-09-14):
  - Principles picture: beside the list it slides (`translate`, 720 ms
    `--ease-bite`) so its middle is level with the open row, clamped to the
    list's height plus 24 px; changes keep the fade/16 px rise, no zoom.
  - Close: the question is no longer a clipped line; it settles (`y 20`,
    opacity), then the button (0.16 s stagger), then the hairline draws out
    to its orange dot (`clip-path` inset, 0.9 s `power2.inOut`).
  - "Somos Colmillo" still ring turns in on entry (opacity, `scale 0.82`,
    `rotation -40`, 1.4 s `power2.out`).
  - Colmillo orbit (`StudioOrbit.ts`, route chunk): over 64rem with motion
    allowed, one fixed ring (z-index -1 inside the isolated page, so behind
    all content; `pointer-events: none`) travels between five stops marked
    in each section's empty space (`[data-orbit-station]`: under the hero
    title, the "Somos Colmillo" ring slot, the gutter between list and
    picture, between "Equipo" and its line, the close dot). Scroll position
    between two stops blends place, size (90/120/70/100/50 px), tilt,
    proportion and dot angle with `sine.inOut`, smoothed by `quickTo`
    (0.6 s); opacity 0.7-0.85, 30% fainter mid-journey, y kept in 8-92% of
    the viewport. It appears after the hero entrance (1.2 s delay, 1.4 s)
    and, once landed around the close dot, fades out (0.7 s delay, 1.2 s).
    At "Somos Colmillo" it lands exactly on the still ring, which hides
    (docked when the ring is 30% down the screen, beside the heading and
    above the full-width text). Where its box covers text (Somos paragraphs,
    principles title and list, the "Equipo" glyphs and line, the close
    title; transform-free document boxes measured on refresh) it fades to
    12% of its opacity (0.2 s) once a sixth of its box is over text, so a
    crossing never competes with the copy.
    Fine pointer within 110 px of its line: leans up to 12 px, stretches 7%
    along / squeezes 4.5% across the pointer direction, tilts up to 6° and
    slides its dot up to 24°, with 0.9 s `power2.out` inertia, and settles
    back. One matrix transform, one opacity and one dot angle per frame from
    a ticker that sleeps when idle; no layout reads on pointer moves (stops
    are measured on ScrollTrigger refresh). Narrower screens: no travel, the
    still ring stays and a fine pointer bends it the same way. Touch: still
    ring only. Reduced motion: no orbit, no response, still ring.
- Cleanup: every listener, observer, tween and ScrollTrigger is released; the
  tab roles and ARIA state are removed and rebuilt on a motion-preference
  restart, which keeps the principle that was on stage.

## Services Page (/servicios/)

Rebuilt on 2026-09-14 (see `DECISIONS.md`). The page is a stack of editorial
layers and the shared section stack is its main mechanic. There is no pin,
scrubbed timeline or scroll interception.

- Layers, in order: hero (charcoal `#1f1f1f`), Estrategia (white), Identidad
  (orange), Digital (black), Contenido (white), close (black). Every one is a
  `.stack-section` / `[data-stack-section]` with `data-stack-content` on the
  part that compresses.
- Stacked (at least 64.01rem wide and 40rem tall, motion allowed): every layer
  is sticky (`layout.css`). The next one rises over it with `SectionStack.ts`'s
  rounded entrance band (clip inset of 7% of the screen, 2.5% at the sides,
  5rem radius, opening to nothing between `top 92%` and `top 38%`, scrub 0.6)
  while the covered layer's content compresses (`yPercent -1.8`, `scale
  0.972`, `opacity 0.84`). Each service layer rests fully on screen for
  `--sv-hold` (`clamp(8rem, 26svh, 16rem)`, a bottom margin) before the next
  one rises; nothing moves while it rests. The hero does not rest, so the
  first scroll starts the first rise, and it is never clipped or rounded.
- Arrival (`ServicesPageMotion.ts`, a route chunk loaded like Studio's): once a
  layer's top passes 58% of the screen, its rule draws in (`scaleX`, 0.8 s)
  with the title, claim and description (`y 24`, opacity, 0.85 s, 0.1 stagger,
  from 0.04 s), then the capabilities' label, rows and optional button (`y
  12`, 0.7 s, 0.045 stagger, from 0.32 s), then the plate (`y 28`, opacity and
  a top clip `inset(14% 0 0 0)` opening, 1 s, from 0.4 s). All `power3.out`,
  once. No scale, blur or bounce.
- Linear (narrower or shorter screens, portrait tablets): layers follow one
  another in normal flow, each tucked `--sv-overlap` (1.25-2rem) under the
  previous one with that radius on its top corners, so the corners show the
  previous surface, never a gap. The stack's inline band and compression are
  overridden in `services-page.css` there. Copy and plate reveal on their own
  triggers (`top 84%` and `top 90%`).
- Capabilities (fine pointer only, CSS): the row's name shifts 5 px (360 ms),
  its rule draws in from the left (560 ms), an accent dot scales in on the
  right (360 ms) and the plate's art lifts 6 px (a photograph scales 1.02).
  Rows are plain list items, not links; touch and keyboard lose nothing.
- Close (rebuilt 2026-09-15 as a full scene): the client's panoramic picture
  drawn as two wings anchored to the screen's edges, the copy centred in the
  black between them (`services-page.css`). One scrubbed timeline
  (`ServicesPageMotion.ts`, `top bottom` to `top 12%`, scrub 0.8, reversible,
  never holds the scroll): the scene settles from `scale 1.08` and
  `yPercent 2.5` to rest; the wings travel in from 6.5% of the width further
  out (`power1.inOut`); the heading rises from `y 36` and opacity 0.06 between
  40% and 74% of the travel, the two buttons from `y 22` and opacity 0 between
  56% and 88% (0.06 stagger). Both are complete before the section reaches the
  top. The stack's own entrance band runs alongside. Buttons: the shared bite
  button (orange on a cream slab, light on an orange slab); hover and focus
  press it 0.22rem into its slab, `:active` 0.4rem; the arrow moves 0.14em.
  No `data-magnetic`: the shared pull writes an inline `translate: none`
  through GSAP and would cancel the press. Reduced motion and no JavaScript:
  no timeline, the final composition.
- Hero: the entrance is CSS, from the first paint: the title rises out of its
  clip (1 s, `power3.out` curve, at 0.1 s) and the media settles (opacity,
  18 px, 1.1 s, `power2.out` curve, at 0.3 s).
- Loops (the hero or a service, once supplied) play only while on screen, not
  covered by the next layer (a ScrollTrigger on that layer's `top top`) and in
  a visible tab; never under reduced motion, where the poster is the picture.
- Tone: layers declare `light`, `accent` or `dark`; over the orange layer the
  shared cursor's ring and core turn ink (route CSS).
- Reduced motion: layers are relative, with no rest, band, compression or hero
  entrance; arrivals are a 0.45 s opacity fade; layers keep the tucked overlap.
  No JavaScript: the sticky stack still applies where CSS makes it sticky and
  every element is visible.
- Cleanup: every tween, trigger, observer and listener is released by the
  chunk's cleanup on a motion-preference restart.

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
  reduced-motion layouts remain linear. The entrance band is 7% of the screen
  (`min(layer, viewport)`), never 7% of a taller layer. A sticky layer returns
  to `position: relative` (`data-stack-released`) once the section right after
  it covers the screen, so a later section's reveal band can only ever show
  the section directly before it or the page, never an older stuck layer.
- `HorizontalProjects.ts` pins the section and scrubs the track sideways on
  screens at least 769 px wide with motion allowed. The travel is the track's
  real `scrollWidth` minus the viewport's width, re-measured on every
  ScrollTrigger refresh; the wheel is never intercepted. Keyboard focus moves
  the page to the point of the pin where the focused tile or the closing route
  is fully visible. The enhanced layout sizes every tile from the rail's own
  height through container query units (`100cqh`), so the pieces fit the
  pinned viewport by construction. Native overflow with mandatory scroll snap
  remains the phone, reduced-motion and no-JavaScript experience. The counter,
  arrows, progress meter and active-card dimming were retired on 2026-09-10.
- Project tile hover (2026-09-10, replaces the former 0.982 frame / 1.06
  image scale and animated top-right radius): `ProjectTilePress.ts` bends only
  the edge nearest a fine pointer inwards, modelled on the *behaviour* of the
  project grid on hellomonday.com (a vector mask whose nearest segment is
  dragged in while the corners stay pinned) without its code, WebGL or
  values. The dent is a `clip-path: path()` on `.project-tile__surface`, the
  layer inside the fixed `.project-tile__frame` that holds the picture and its
  loading ground, so the page shows through the bite and nothing around the
  tile moves. Geometry: a rounded outline one pixel outside the frame, with
  two tangent cubic curves per dented edge meeting at a peak that follows the
  pointer along that edge (kept 16% of the run from a corner; a flank shortens
  near a corner so the pressure gathers there). Half width 0.3 of the short
  side; depth 0.06 of the short side clamped to 16-34 px (about 31 px at
  1440, 34 px at 1920), scaled from 50% with the cursor at the centre to 100%
  at the edge, ×1.2 while the button is down. Another edge only takes over
  once it is 6% of the short side closer. The pointer sets targets at most
  once per animation frame; GSAP eases them (0.42 s `power3.out` in, 0.4 s
  `power2.out` for an edge being handed over, 0.46 s `power3.out` on leave),
  and the inline `clip-path` is removed once every edge is back at rest. The
  title's CSS cut-out reveal runs alongside, unchanged; the label sits outside
  the surface so the dent never clips it. `:focus-visible` gets the reveal
  without a dent; `(hover: none)` keeps it open; touch pointers, coarse
  pointers and reduced motion never bind the module and keep a still image.
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
  the layout and shows the current route's number in the panel. The active
  route (orange, `aria-current="page"`) comes from the URL alone and never
  follows scroll: on `/` "Inicio" stays active while any home section is in
  view. The backdrop
  is an ink veil at 34% with a 6 px blur, applied only while open. Under
  reduced motion tracking is disabled, the tab stays at rest and the panel,
  routes and close control change state without travel.

  Tab tone: the tab is brand orange except over an orange surface, where it
  turns ink with cream rules (a 160 ms colour transition). The module samples
  the colour actually painted under the tab - the first opaque background
  among the hit-testable elements at that point, the menu and faded layers
  excluded - at most once per frame after a scroll, a resize, a vertical move
  or an entry animation, plus once more 180 ms after scrolling settles. It
  publishes `data-tab-tone="accent"`; it does not read `data-surface-tone`.
  Route labels are sentence case, as written in `primaryNavigation`, in this
  order: Inicio, Studio, Servicios, Proyectos, Contacto.
- `InstagramBadge.ts` folds the single global Instagram control, in place in
  the top-right corner, from its hero pose - `INSTAGRAM ↗`, scaled 1.3 from
  1024 px and 1.15 from 768 px around its own top-right corner - into a round
  compact control carrying the Instagram glyph (inline SVG), over the first 30%
  of a viewport of scroll. It is one continuous scroll-linked change of the
  same element. The scale is a GSAP `quickSetter` write; the three-piece pill,
  the word, the arrow and the glyph derive from one `--ig-p` progress value.
  Hovering or focusing the compact control opens it back to the full word.
  Reduced motion swaps the fold for one state change halfway through the
  range. Since 2026-09-15 every route starts in the hero pose and folds over
  the same range; on a route too short to scroll 30% of a viewport the range
  is the page's own scroll, so the fold still completes at the bottom.
- The global wordmark (`SiteLogo.astro`) has no motion: it sits in the
  top-left corner of the first screen, anchored to the document, and scrolls
  away with the page. Its black/cream derivative comes from the route's
  `headerTheme`.
- `EditorialMotion.ts` reveals whole editorial blocks and deforms route marks
  by scroll progress; it never splits readable text into animated letters.
- `SurfaceTone.ts` switches the shared cursor contrast from intersection state
  rather than sampling layout on every frame. Since 2026-09-14 the tone is the
  last surface in document order that crosses the middle band (38-62% of the
  screen): it is painted above the one before, which a sticky layer keeps
  intersecting while covered. It no longer compares `intersectionRatio`.
- The former goodbye fallback (a CSS jaw/letter composition with a
  scroll-driven compression) was removed on 2026-09-10 with its keyframes and
  its `SectionStack.ts` scrub; see "Goodbye" above for the stage that replaced
  it.
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

## Home Entry Intro

- `HomeIntro.ts` plays once per browser tab session on the home only
  (`src/config/intro.ts`: `repeat: 'session'`, key `colmilloIntroPlayed`;
  `'always'` replays it on every full load). Reloading the home plays it again
  (`replayOnReload`, requested by the user on 2026-09-10); returning to the
  home through a link does not. The O always opens onto the hero: while the
  page is covered it is pinned to the top, because Chrome restores a reload's
  old scroll position even with `scrollRestoration = 'manual'` set in the head
  (measured: `scrollY` 907 right after a mid-page reload). The head script
  still sets `'manual'` and the intro hands restoration back (`'auto'`) when
  it ends, so later history traversals remember their position. A deep link to a fragment and a
  back/forward traversal never play it; other routes do not carry it.
- Sequence (~2.3 s at 1440×900, measured with a paused Playwright clock): the
  solid page-white ground for 0.2 s; C-O-L-M-I-L-L-O set one letter at a time
  (0.1 s apart, 0.46 s `power3.out`, rising 14 px from `scaleY(0.96)`, no
  blur, bounce or rotation); every landing nudges the letters already set by
  1.5 px and releases them; a ~0.2 s beat with a 3 px orange seed in the final
  O's counter; the counter opens from its centre (0.3 s) onto the real home;
  the O grows (1.2 s) while travelling to the viewport centre until its counter
  contains the whole viewport; the rest of the word holds, then fades.
- The O's growth is interpolated in log space (`power3.inOut`) with the centre
  travelling on `power2.inOut`, so it translates and scales at once. It eases
  towards 1.35× the covering scale and the overlay is removed the moment the
  counter covers the viewport, so the ease's slow tail is never on screen.
- Geometry: one SVG in the units of the traced wordmark. The ground is a
  60,000-unit rectangle with the final O's silhouette cut out (even-odd), in
  the same transformed group as the O, so the hole and the O grow together.
  The transform is an SVG attribute, re-rasterised every frame: the O stays
  vector-sharp at any scale. The covering scale is solved from the counter's
  own polygon for every point of the viewport's outline, so 21:9, 16:9, 4:3,
  portrait and 320 px screens are all covered.
- The letters are the official wordmark: `scripts/trace-wordmark.mjs` extracts
  the 50% iso-line of `colmillo-wordmark-black.png` with marching squares and
  refuses to write unless the curves stay within 0.45 source px of it (0.33 px
  measured) and no re-rasterised pixel flips inside/out.
- Theme: ink letters on the page's light ground (`--color-background`, white
  since 2026-09-10; the config value is still named `'cream'`). A light O
  opening onto the light home reads as a filled disc; the ink O keeps its ring
  against the page and the site is unmistakably seen through its counter.
  `theme: 'ink'` restores cream letters on ink.
- Handover: `colmillo:introreveal` fires at 62% of the covering scale and
  releases the hero loop from its first frame (held and rewound while covered;
  `pause()` also clears the autoplay flag); the hero settles from 1.02 around
  `50% 20%`. `colmillo:introend` follows ~0.1 s later: overlay hidden, the
  `html[data-intro]` scroll lock and cursor hold removed.
- Readiness: the O only opens after the global wordmark and the loop's poster
  have decoded, waiting at most 1.2 s more; nothing below the fold is awaited.
- Input: a key, wheel or touch plays the rest at 3.2× instead of cutting it.
  The overlay is `aria-hidden`, never traps focus and sits under the skip link.
- Reduced motion: the still wordmark for 0.35 s, a 0.3 s fade, the page. No
  expansion.
- Failure: without JavaScript the overlay is `display: none`. If the module
  never claims the head script's attribute, a 4 s timer returns the page; the
  module has a 9 s guard; a CSS animation hides the overlay after 7 s.
- Close as a photographic stage (2026-09-14, supersedes the close bullets
  above: no hairline or dot any more). `initClose` in `StudioPageMotion.ts`:
  - transition from the team: the media layer's `clip-path` goes from
    `inset(26% 0 0 0)` to `inset(0)` between `top bottom` and `top 30%`
    (scrub 0.5), so the photograph's black rises over the charcoal from the
    foot and follows the scroll both ways;
  - entrance once at `top 65%`: the image settles from `scale 1.06`, `x 28`
    (origin 70% 50%, 1.4 s), the question from `y 32`/opacity at 0.3 s
    (0.9 s), the button from `y 22`/opacity at 0.48 s (0.8 s), `power3.out`;
  - drift: image `y -16` to `16` px across the section (scrub 0.8); the image
    is 5rem taller than its frame so no edge shows;
  - fine pointer: the frame (1rem larger than the section) moves up to 7 px
    horizontally and 4 px vertically away from the sculpture, only on the
    sculpture's side (weight 0 left of 45% of the width), `quickTo` 1.1 s;
    section box read on pointer entry/after scroll, never per move;
  - the orbit's last stop is the section's top edge; it slips under the
    rising photograph and fades.
  Reduced motion and no JavaScript: no clip, scale, drift or pointer shift.
