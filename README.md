# Burette Landing

Static landing page for Burette, the molecular file workspace for macOS.

The `/download` route records a lightweight Web Analytics page view, then
redirects to the `.dmg` asset from the latest `SergeiNikolenko/Burette`
GitHub release through `/api/download`.

Outbound links use `/out/:target` so clicks to GitHub, docs, releases, and
engine websites are visible as first-party Web Analytics page views before
redirecting to the external destination. The main page also emits Vercel custom
events for download clicks, outbound clicks, brew-copy intent, and scroll depth
when the project plan supports custom events.

The public site also serves `/support`, `/privacy`, `/terms`, `/robots.txt`, and
`/sitemap.xml`. Keep their canonical URLs aligned with the production domain.

## Local development

```sh
npm ci
npm run dev
```

Then open `http://localhost:3000/`. The root landing page, documentation under
`/docs`, download redirect, and outbound redirect pages all run through Next.js;
serving the repository root as static files does not expose assets from `public/`
or the application routes correctly.

Before opening a pull request, run:

```sh
npm test
npm run build
npm audit --omit=dev
```

The site check validates internal documentation routes, fragment links, local
assets, duplicate IDs, and image alternative text.

## Visual direction

See [Landing design](docs/landing-design.md) for the composition, references,
and responsive behaviour.
