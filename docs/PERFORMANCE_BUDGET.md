# COLMILLO STUDIO - PERFORMANCE BUDGET

## Initial Targets

- LCP mobile: under 2.5 s on reasonable test conditions.
- CLS: under 0.1.
- INP: keep interactions responsive under animation load.
- JavaScript: keep initial client bundle minimal.
- Media: no raw GIF delivery in production for hero or goodbye loops.

## Media Rules

- Convert GIF animation sources to WebM and MP4.
- Create poster images.
- Use responsive sources for hero media.
- Define width, height or aspect ratio for all media containers.
- Lazy-load non-critical project media.

## Animation Rules

- Prefer `transform` and `opacity`.
- Use `will-change` sparingly and remove when no longer needed.
- Avoid permanent filters and blur on large elements.
- Avoid multiple independent `requestAnimationFrame` loops.
- Avoid scroll handlers that force layout reads and writes in the same frame.

## Dependency Rules

- Justify every production dependency.
- Do not add a heavy UI framework for isolated interactions.
- Do not add WebGL unless CSS/SVG/GSAP cannot meet the visual requirement.
- Prefer framework-native and browser-native solutions.

## Verification

- Run production build.
- Inspect bundle output.
- Use Lighthouse or equivalent browser performance checks when the app exists.
- Test reduced-motion and mobile behavior.

## Current Measurement

- Production build JavaScript: 126,717 bytes uncompressed across generated
  assets, below the 220,000-byte total budget and 150,000-byte per-file guard.
- `npm.cmd run check:production`: passed with no raw GIFs or development
  markers in `dist`.
- Playwright layout-shift, horizontal-overflow and script-transfer checks pass
  for desktop and mobile Chromium.
- Playwright records Largest Contentful Paint locally and enforces the 2.5 s
  target when running against the static production artifact.
- Development project visuals use CSS only and add no image transfer. The
  standard build emits neither their routes nor their strings/assets.
- Magnetic interactions measure element bounds on pointer entry rather than on
  every pointer move.
- Project progress coalesces native scroll work with `requestAnimationFrame`;
  pinned progress uses ScrollTrigger's update cycle and only rewrites card state
  when the discrete active index changes.
- Pointer position/velocity reuse the existing custom-cursor event stream;
  surface contrast uses `IntersectionObserver`, and editorial motion reuses
  ScrollTrigger. No second permanent animation loop was added.
- No Lenis, WebGL, React or additional UI dependency was introduced.
