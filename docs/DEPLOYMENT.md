# COLMILLO STUDIO - DEPLOYMENT

An explicitly authorized temporary demonstration is deployed on Vercel at
`https://colmillo-studio.vercel.app/`. It is not a final client release.

## Current Policy

- The Vercel project temporarily overrides the build command with
  `npm run build:demo` and the output directory with `dist-demo`.
- Keep all fictional-content notices visible while this exception is active.
- Keep the deployment `noindex` and retain the blocking `robots.txt`.
- Do not treat this public demo as approval of its provisional content.
- Do not create production hosting resources.
- Do not change DNS.
- Do not add analytics or tracking without explicit approval.

Rollback: restore the Vercel Build Command and Output Directory overrides to
their Astro defaults, then redeploy. The repository's standard `npm run build`
continues to produce the protected `dist/` artifact.

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

## Decided On 2026-09-24

- **Domain:** `colmillostudio.com` (singular — it matches the approved
  mailbox; a "colmillostudios" in the original request was a typo and is
  confirmed wrong).
- **Host:** the client's own Plesk server at IONOS, where the domain already
  resolves. See `DECISIONS.md` for why. This closes "Hosting provider" and
  "Domain" in *To Decide Later* above.
- **First thing on the domain:** the holding page in `holding/`, not the site.

### The holding page

`holding/` is three files and no build step: `index.html` (its CSS and the
sculpture inlined), `colmillo.png` (the orange wordmark) and `robots.txt`.
Upload the three to the vhost's document root. That is the whole deployment.

It is deliberately outside the Astro build. The standard `npm run build` still
publishes a `/proyectos/` with no approved project in it, and the Vercel
project is still overridden to the fictional demo; a page that cannot reach
either cannot leak either.

It keeps `noindex` and a blocking `robots.txt`, in line with the prelaunch
policy. Its copy is provisional — see `CONTENT_NEEDED.md`.

### Still to do before the site itself goes up

1. **Retire the Vercel demo.** Restore the Build Command and Output Directory
   overrides to their Astro defaults, or remove the project. While the
   override stands, any domain pointed at it serves the nineteen-page
   fictional demo.
2. **Prune `public/`.** `dist/` is 80 MB of which the built pages reference
   7.5 MB: 71.3 MB across 37 files is published and never requested, including
   two ~21 MB client masters (`FINAL ANIMACION.mp4`, `WEB.mp4`) that anyone
   can download from the site today. All are tracked in git, so moving the
   masters to `media-src/` and dropping the superseded derivatives loses
   nothing. Re-run `check:hero` afterwards.
3. **Deploy pipeline.** A GitHub Action running `npm ci`, `npm run validate`,
   `npm run build` and shipping `dist/` over SSH. Build in CI, never on the
   server, so Plesk needs no Node. Keep dated release folders and a symlink so
   a rollback is one command.
4. **Server configuration.** Brotli/gzip, HTTP/2, the cache contract above
   (revalidatable HTML, immutable only for `dist/_astro/`), the generated
   `404.html`, and Let's Encrypt via Plesk.
5. **The form.** `contactFormEndpoint` in `src/data/contactPage.ts` is the
   only code change needed once the endpoint exists on the same host.
6. **The gates.** `PUBLIC_SITE_URL=https://colmillostudio.com/`, and
   `PUBLIC_RELEASE_APPROVED` / `PUBLIC_INDEXING_APPROVED` only when the
   content, legal and SEO reviews are explicitly approved. `robots.txt` blocks
   everything until that is deliberately reversed.
