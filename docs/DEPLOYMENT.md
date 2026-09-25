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
2. ~~**Prune `public/`.**~~ **Done 2026-09-25.** `dist/` went from 80 MB to
   22 MB. The client masters (`FINAL ANIMACION.mp4`, `WEB.mp4`, `animacion
   hero final.webm`, `video hero studio.mp4`, `frame video.png`) moved to
   `media-src/`, where the repository already keeps originals and where
   nothing is published; two superseded hero and Studio generations were
   removed. `check-client-assets.mjs` was stale in the same place — it still
   required the first hero generation, so the release gate was guarding files
   the site had stopped using — and now names the delivery `heroMedia`
   actually points at.
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

## Retired 2026-09-25: Vercel

Vercel hosted the authorised temporary demo from 2026-09-10 to 2026-09-25. Its
build override was removed first, so it stopped serving the fictional build,
and the project was retired once `pre.colmillostudio.com` took over the
preview role. The policy block at the top of this file is history.

## How publishing works now

Nothing deploys automatically. Two paths, both deliberate:

1. **From the server** — the client's working copy is a clone at
   `~/colmillo-studio` on the Plesk subscription, with Node 22.23.2 at
   `/opt/plesk/node/22/bin`. `./publicar.sh pre` builds the demo and publishes
   it to the password-protected preview; `./publicar.sh pre real` puts the
   standard build there instead; `./publicar.sh dominio` publishes the
   standard build to the live domain and asks for a typed `PUBLICAR` first,
   because that is the launch. The script validates before it copies anything
   and refuses an empty build.
2. **From GitHub** — `.github/workflows/deploy.yml`, manual trigger only, as a
   fallback for when the server is unreachable. It needs the SSH secrets
   listed in the file's own header.

GitHub remains the source of truth. There are now two working copies, so the
rule is `git pull` before editing and `git push` after; a Plesk subscription
is not a backup.

The document root is `~/httpdocs`, the preview is `~/pre.colmillostudio.com`,
and the archived WordPress is on a free Plesk temporary domain with its own
database.
