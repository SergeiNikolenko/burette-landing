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
  // Untrimmed input used to throw at module load (crashing the build with an
  // opaque error) and an uppercase scheme slipped through the test, producing
  // "https://HTTPS://host" in every canonical, OG and sitemap URL.
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    return `${url.protocol}//${url.host}`;
  } catch {
    return null;
  }
}

export const SITE_URL =
  normalise(process.env.NEXT_PUBLIC_SITE_URL) ?? FALLBACK_SITE_URL;

