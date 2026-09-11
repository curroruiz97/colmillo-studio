# Colmillo Studio Web

Static Astro foundation for the new Colmillo Studio portfolio.

## Current Status

The technical foundation, creative-polish pass, complete development
demonstration and automated QA layers are implemented. Development exposes
five unmistakably fictional projects with a horizontal rail, case-study pages,
galleries and previous/next navigation. The interaction layer now uses a
centered full-surface menu, simplified route-aware header, surface-responsive
fine-pointer cursor, pressure-based stacked sections, editorial reveals and a
vertical-scroll horizontal project scene with native/reduced-motion fallbacks.
The standard site includes dedicated Studio, Servicios and redesigned Contacto
routes; their unapproved narrative content remains confined to development/demo
mode.
The standard production build excludes every demo route, string and asset.
The user-supplied black and cream wordmarks are now cleaned, transparent and
active in the responsive header. The favicon, vector brand master, approved
copy, real projects, contact details and legal content remain client-dependent,
so the site stays protected from indexing.

See `docs/EXECUTION_STATE.md` for the verified handoff and next action.

## Requirements

- Node.js 22.12 or newer.
- npm (the committed `package-lock.json` is authoritative).

## Local Development

```powershell
npm.cmd install
npm.cmd run dev
```

Use `npm.cmd` in this Windows environment to bypass a PowerShell wrapper warning
caused by restricted access to the user's global npm prefix.

## Validation

```powershell
npm.cmd run check
npm.cmd run lint
npm.cmd run format:check
npm.cmd run check:assets
npm.cmd run check:brand
npm.cmd run build
npm.cmd run check:production
npm.cmd run check:links
npm.cmd run check:manifest
npm.cmd run test:e2e
npm.cmd run test:e2e:demo
```

The first Playwright run also needs its managed browser:

```powershell
npm.cmd exec playwright -- install chromium
```

## Environment

Copy `.env.example` to `.env` only when an approved canonical domain exists:

```text
PUBLIC_SITE_URL=https://approved-domain.example
```

Without that value, sitemap generation remains disabled. The current
`noindex` metadata and blocking `public/robots.txt` are deliberate prelaunch
safeguards and must not be removed until release approval.

Invalid origins or approval values are treated as unapproved. Approval flags
accept only the exact strings `true` or `false`.

## Development Demonstration

`npm.cmd run dev` automatically exposes the five fictional project routes.
For a deterministic static demo artifact and its dedicated browser suite, run:

```powershell
npm.cmd run build:demo
npm.cmd run test:e2e:demo
```

The isolated output is `dist-demo/`. It is never the deployable artifact. Only
`dist/` may enter release checks, and `check:production` fails if any demo
marker, slug or title reaches that directory.

## Assets

The supplied header wordmarks live at
`public/assets/brand/colmillo-wordmark-black.png` and
`public/assets/brand/colmillo-wordmark-cream.png`. Both are cropped RGBA PNGs
with an even transparent safety margin and intrinsic dimensions in the markup.
`npm.cmd run check:brand` verifies those invariants. Recreate them from the
client originals with `scripts/prepare-logo-assets.ps1`; the script performs a
deterministic matte extraction and never redraws the lettering.

The earlier white-background reference remains under `public/assets/incoming/`
for provenance only. A vector master, favicon and official clear-space rules
are still requested before release.

No push or deployment workflow is run automatically.
