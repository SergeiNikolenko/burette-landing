// One place decides the public origin, because it has to agree across canonical
// links, Open Graph tags, robots.txt, sitemap.xml and llms.txt.
//
// The project's default Vercel domain (burette-landing.vercel.app) is behind
// Vercel SSO and answers 302, so pointing metadata at it makes every unfurl empty
// and advertises gated URLs to crawlers. The alias below is what actually serves
// the site. Once the preferred domain is public, set NEXT_PUBLIC_SITE_URL and
// everything here follows without another code change.
const FALLBACK_SITE_URL = "https://burrete-landing.vercel.app";

function normalise(value) {
  if (!value) return null;
  const withScheme = /^https?:\/\//.test(value) ? value : `https://${value}`;
  return withScheme.replace(/\/+$/, "");
}

export const SITE_URL =
  normalise(process.env.NEXT_PUBLIC_SITE_URL) ?? FALLBACK_SITE_URL;

export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");
