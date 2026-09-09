# Phase 7 — Release Handoff

Phase 7 is the operational handoff layer after implementation, QA and release
preflight. It does not deploy, create hosting resources or change DNS.

## Generate the handoff artifact

```powershell
npm.cmd run build
npm.cmd run check:production
npm.cmd run check:links
npm.cmd run check:manifest
npm.cmd run release:manifest
```

This writes `dist/release-manifest.json` with the build version, runtime,
approval flags, file sizes and SHA-256 hashes. The file is an audit artifact and
must be generated again for every release candidate; it is not a substitute for
the hosting provider's deployment manifest. The generator deliberately excludes
any existing manifest before hashing; `check:manifest` verifies this across two
consecutive runs.

## Handoff gates

- `npm.cmd run validate` passes.
- `npm.cmd run test:e2e` passes against `dist`.
- `npm.cmd run test:e2e:demo` passes against isolated `dist-demo` for local
  portfolio interaction coverage.
- `npm.cmd run check:assets` passes with `REQUIRE_CLIENT_ASSETS=true`.
- `npm.cmd run check:brand` confirms both header logos remain cropped RGBA
  assets with intrinsic dimensions and transparent safety margins.
- `npm.cmd run release:check` passes with the approved HTTPS origin,
  `PUBLIC_RELEASE_APPROVED=true` and `PUBLIC_INDEXING_APPROVED=true`.
- Legal, contact, project and social content is approved.
- The selected host, cache policy, rollback method and deployment owner are
  recorded before any production action.

## Current handoff state

The supplied raster header wordmarks are integrated. The handoff is not
releasable because the favicon/vector brand master, motion, font and content
assets are still missing. The prelaunch `noindex` and blocking `robots.txt`
safeguards remain enabled.
