// One place decides the public origin, because it has to agree across canonical
// links, Open Graph tags, robots.txt, sitemap.xml and llms.txt.
//
// The correctly spelled production alias is the canonical public origin. Keep
// the environment override for previewing the same build under another host.
const FALLBACK_SITE_URL = "https://burette-landing.vercel.app";
const LEGACY_SITE_URL = "https://burrete-landing.vercel.app";

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

const configuredSiteUrl = normalise(process.env.NEXT_PUBLIC_SITE_URL);

// A stale Vercel environment value must not resurrect the misspelled origin
// after its alias has been removed. Other explicit preview origins still work.
export const SITE_URL =
  configuredSiteUrl && configuredSiteUrl !== LEGACY_SITE_URL
    ? configuredSiteUrl
    : FALLBACK_SITE_URL;
