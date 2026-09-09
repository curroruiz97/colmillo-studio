# COLMILLO STUDIO - CODEX OPERATING CONTRACT

This file defines how Codex must work in this repository. It does not replace
the product specification.

## Sources of Truth

The authoritative product and implementation specification is:

`COLMILLO_BUILD_SPEC.md`

Persistent project state:

`docs/EXECUTION_STATE.md`

Architectural and product decisions:

`docs/DECISIONS.md`

Missing client assets/content:

`docs/CONTENT_NEEDED.md`

Motion behavior:

`docs/MOTION_SPEC.md`

QA requirements:

`docs/QA_CHECKLIST.md`

Performance requirements:

`docs/PERFORMANCE_BUDGET.md`

Never silently override these documents.

When implementation reality conflicts with the master specification:

1. Verify the conflict against the actual repository.
2. Choose the safest reversible solution if it does not materially change the
   product.
3. Record the decision in `docs/DECISIONS.md`.
4. Ask the user only when the decision materially changes scope, visual
   direction, client requirements, licensing, or production behavior.

## Session Boot Protocol

At the beginning of every new Codex session, before editing files:

1. Confirm the repository root.
2. Run `git status --short`.
3. Read this `AGENTS.md`.
4. Read `COLMILLO_BUILD_SPEC.md` completely.
5. Read `docs/EXECUTION_STATE.md`.
6. Read `docs/DECISIONS.md`.
7. Read `docs/CONTENT_NEEDED.md`.
8. Inspect `README.md`.
9. Inspect `package.json` if present.
10. Identify the package manager from the lockfile if present.
11. Inspect relevant framework/build configuration if present.
12. Reconcile `EXECUTION_STATE` with the actual repository.
13. Do not trust previous session notes if they disagree with code.
14. Run the cheapest relevant baseline checks.
15. Determine the current implementation phase.

Only then begin work.

## Session Continuity

This is a long-running project. Never rely exclusively on conversation memory.

`docs/EXECUTION_STATE.md` is the persistent handoff between sessions.

At every meaningful phase boundary update it with:

- current phase;
- completed work;
- work in progress;
- exact blockers;
- relevant decisions;
- changed files;
- last successful validations;
- failing validations;
- next concrete action.

Before ending a session for any reason, update `EXECUTION_STATE`.

Never write "tests pass" unless the tests were actually executed. Never write
"build succeeds" unless the build was actually executed.

## Implementation Ownership

The primary Codex thread owns application code changes.

Subagents should primarily be used for:

- repository exploration;
- external reference research;
- framework documentation research;
- architecture review;
- motion review;
- accessibility review;
- QA review;
- regression analysis;
- performance analysis.

Do not allow multiple agents to simultaneously edit overlapping files.

For write-heavy work:

- one agent owns the implementation;
- other agents provide read-only findings;
- findings are merged by the primary agent.

Wait for delegated agents before making a decision that depends on their
research.

## Development Behavior

Do not stop after producing a plan. When a phase is actionable:

1. investigate;
2. plan;
3. implement;
4. validate;
5. inspect results;
6. fix regressions;
7. revalidate;
8. update project state.

Prefer complete vertical slices over many half-finished components.

Do not begin the next major phase while the current phase has known regressions
unless they are explicitly documented blockers.

## Protect Existing Work

Never execute destructive commands such as:

- `git reset --hard`
- `git clean -fd`
- `git checkout -- .`
- `git restore .`
- forced git pushes

Never overwrite uncommitted user work.

Before editing a file that already contains modifications:

1. inspect the diff;
2. understand who owns the changes;
3. preserve unrelated edits.

Do not remove dependencies, config, components or assets until their usage has
been verified.

## Content Integrity

Never invent production content.

Never fabricate:

- clients;
- projects;
- awards;
- testimonials;
- analytics;
- metrics;
- results;
- team members;
- email addresses;
- telephone numbers;
- locations;
- legal information;
- social profiles;
- credentials.

Missing information belongs in `docs/CONTENT_NEEDED.md`.

Placeholders are allowed only in development and must be clearly identifiable.
Development placeholders must not accidentally ship to production.

## Design Integrity

Colmillo must not become a generic agency template.

Every visual decision must support the established creative direction. The
interaction vocabulary should remain coherent:

- bite;
- pressure;
- compression;
- deformation;
- reveal;
- overlap;
- tension;
- release.

Avoid stacking unrelated visual effects simply because they are possible. The
references are inspiration, not source material.

Never copy source code, copy, assets, proprietary animation sequences, or
layouts pixel-for-pixel from reference sites.

## Dependency Discipline

Before installing a dependency:

1. inspect `package.json`;
2. check whether equivalent functionality already exists;
3. justify the dependency against the specification;
4. prefer native platform APIs when appropriate;
5. avoid duplicate animation or UI libraries.

Do not add React to the entire application for a small interactive feature. Do
not introduce WebGL unless the approved implementation genuinely requires it.

## Quality Gates

After each meaningful implementation slice, run the cheapest relevant
verification.

At major phase completion, run all available:

- typecheck;
- lint;
- unit tests;
- integration tests;
- Playwright critical flows;
- production build.

Fix regressions caused by the current change before moving on. Do not weaken
tests just to obtain a green run.

## Visual QA

For major visual changes:

1. run the website;
2. inspect the actual rendered result;
3. test relevant viewport sizes;
4. inspect browser console errors;
5. verify interaction behavior;
6. capture screenshots where useful;
7. compare implementation to the brief;
8. fix visual regressions before declaring completion.

Do not consider visual code correct only because it compiles.

## Responsive Requirement

Every interactive feature must explicitly handle:

- desktop;
- tablet;
- mobile;
- fine pointer;
- coarse pointer;
- keyboard;
- `prefers-reduced-motion`.

## Accessibility

Accessibility is part of implementation, not a later patch.

Preserve semantic HTML, keyboard navigation, visible focus, reduced motion,
screen-reader labeling, sufficient contrast, logical DOM order, and real links
and buttons.

The custom cursor must never replace actual interaction affordances. Motion must
never be required to consume content.

## Performance

Animation quality does not justify a broken experience.

Prefer transform, opacity, SVG masks, clip paths, and efficient GSAP timelines.

Avoid layout thrashing, permanent expensive filters, multiple permanent
animation loops, autoplaying many videos, unnecessary WebGL, and enormous client
bundles.

Measure before adding complexity.

## Failure Handling

If a command fails:

1. read the actual error;
2. determine whether it existed before the current change;
3. fix the root cause when related;
4. do not repeatedly rerun the same command without changing anything;
5. document unrelated pre-existing failures.

Do not hide warnings without understanding them.

## Stop Conditions

Continue autonomously unless one of these conditions occurs:

- a required credential is missing;
- an official licensed asset is required;
- user work could be destroyed;
- an action affects production;
- a deployment is required;
- a domain/DNS change is required;
- a decision materially changes scope;
- a client-facing claim cannot be verified;
- a licensing decision is required.

Technical implementation decisions that are reversible do not require user
confirmation.

## Definition of Done

A feature is done when:

- it matches the specification;
- it renders correctly;
- interaction works;
- responsive behavior works;
- reduced-motion behavior exists where relevant;
- accessibility has been considered;
- relevant tests pass;
- there are no new console errors;
- the project builds;
- documentation/state is updated.

## End-of-Session Protocol

Before ending:

1. run relevant verification;
2. inspect git status;
3. inspect the final diff;
4. update `docs/EXECUTION_STATE.md`;
5. update `docs/DECISIONS.md` if required;
6. update `docs/CONTENT_NEEDED.md` if required;
7. state exactly what was completed;
8. state exactly what remains;
9. state the next recommended action.

Never leave the repository in an unexplained state.
