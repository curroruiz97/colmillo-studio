# COLMILLO STUDIO - IMPLEMENTATION PLAN

## Phase 0: Repository Start

- Confirm root and git status.
- Read project instructions and master spec.
- Detect package manager and existing framework.
- If empty, scaffold Astro with TypeScript strict mode.
- Add base quality tooling.
- Update execution state.

## Phase 1: Foundations

- Create tokens for color, type, spacing, layout and motion.
- Create global CSS layers.
- Create base layout, SEO head and navigation data.
- Create contact data module with placeholders clearly marked.
- Create routes for home, manifesto, studio, contact, project pages, legal pages
  and 404.
- Add content collections for projects.

## Phase 2: Static Experience

- Build hero with placeholder/fallback media behavior.
- Build intro, services, projects, studio, goodbye and contact sections.
- Keep all content readable without JavaScript.
- Add real links only when content exists.

## Phase 3: Motion System

- Add motion preference controller.
- Add custom cursor as progressive enhancement.
- Add sticky contact header after hero exit.
- Add side menu.
- Add section stacking behavior.
- Add horizontal projects scroll behavior.
- Add magnetic/deformable interaction system.

## Phase 4: Real Assets and Content

- Integrated the supplied black and cream raster wordmarks as transparent,
  tightly cropped header assets with automated alpha/crop validation.
- Obtain the original vector logo master, favicon and official clear-space
  rules for the final brand archive.
- Convert hero GIF source to optimized WebM/MP4 and poster.
- Convert goodbye GIF source to optimized WebM/MP4 and poster.
- Install licensed webfont files only after user supplies them.
- Add final services, projects, contact and legal content.

## Phase 5: QA

- Run typecheck, lint, tests and build.
- Run Playwright checks for critical flows.
- Inspect desktop, tablet and mobile viewports.
- Inspect reduced-motion behavior.
- Check console errors.
- Check contrast and keyboard navigation.
- Update all docs.

Implemented additionally: an isolated three-project fictional demonstration,
production demo-leak guard, local route/fragment checker, idempotent release
manifest check and exact 1440/834/390 browser matrix. These do not unblock any
client-dependent Phase 4 deliverable.

## Phase 6: Deployment Prep

- Document hosting assumptions.
- Document environment variables.
- Prepare deployment checklist.
- Do not deploy without explicit user approval.

## Phase 8: Creative Polish

- Completed from `docs/CREATIVE_POLISH_PLAN.md`.
- Centered menu trigger, full-surface navigation panel, simplified header and
  complete keyboard/touch/reduced-motion/no-JavaScript fallbacks are active.
- Shared pressure/surface variables, hero handoff, editorial reveals, project
  depth, contact response and capability-specific responsive choreography are
  active without new dependencies.
- Progressive cross-document transitions were tested and removed after touch
  history QA exposed a browser rejection. Native navigation plus the stable CSS
  entry remains the deliberate final behavior.
