# COLMILLO STUDIO - DEPLOYMENT

Deployment has not started.

## Current Policy

- Do not push.
- Do not deploy.
- Do not create production hosting resources.
- Do not change DNS.
- Do not add analytics or tracking without explicit approval.

## Prepared Static Build Contract

- Install with `npm ci`.
- Validate with `npm run validate`.
- Generate the deployable output with `npm run build`.
- Publish only the generated `dist/` directory.
- Never publish `dist-demo/`; it is a local QA artifact containing explicit
  fictional content.
- Configure `PUBLIC_SITE_URL` with the approved HTTPS origin before the release
  build so canonical URLs and the sitemap use the real domain.
- Set `PUBLIC_RELEASE_APPROVED=true` only after the client asset intake,
  content, legal and visual review gates pass together with explicit release
  approval.
- Keep `PUBLIC_INDEXING_APPROVED=false` until the blocking `robots.txt` guard is
  deliberately replaced and a final SEO review is approved.
- Keep HTML revalidatable; use immutable, long-lived caching only for hashed
  files under `dist/_astro/`.
- Serve UTF-8 HTML/CSS/JavaScript and preserve the generated `404.html` behavior
  according to the selected host.
- Do not enable the release until the prelaunch `noindex` and blocking
  `robots.txt` decision is explicitly reversed.

No provider-specific configuration is committed because the hosting target is
still a client decision.

## To Decide Later

- Hosting provider.
- Domain.
- Production environment variables.
- Analytics requirements.
- Cookie consent requirements.
- Preview deployment workflow.

## Pre-Deployment Checklist

- Production build passes.
- QA checklist complete.
- Real assets installed.
- Legal pages finalized.
- Contact links verified.
- Placeholder content removed.
- Performance budget checked.
- User explicitly approves deployment.
- `npm run check:production` confirms that no development markers, raw GIFs or
  over-budget JavaScript assets are present, and now also blocks all known demo
  markers, titles and slugs.
- `npm run check:links` must report no missing local route or fragment.
- `npm run check:manifest` generates the manifest twice and verifies that it
  never includes or hashes a prior copy of itself.
- `npm run check:assets` reports the exact missing client files and becomes a
  blocking check when `REQUIRE_CLIENT_ASSETS=true` is used for release CI.
- `npm run release:check` is the final local/CI preflight. It requires the
  approved HTTPS origin, both explicit approval flags, a built `dist/`, and a
  non-blocking robots policy before any deployment action is considered.
