# Motion Directory Rules

Motion code must remain modular, accessible and measurable.

- Respect `prefers-reduced-motion`.
- Avoid permanent expensive loops.
- Keep GSAP timelines outside Astro component markup when practical.
- Use `data-*` hooks instead of visual-only classes.
- Provide touch and keyboard fallbacks for hover-based effects.
- Do not make content inaccessible when animation fails.
