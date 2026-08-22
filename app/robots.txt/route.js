import { SITE_URL } from "../site-url.js";

// Redirect endpoints exist to attribute clicks, not to be indexed: /out/* and
// /download bounce straight to GitHub, so letting crawlers walk them wastes
// budget and can surface a redirect URL in results instead of the page itself.
const ROBOTS = `# Burette - https://github.com/SergeiNikolenko/Burette

User-agent: *
Allow: /
Disallow: /out/
Disallow: /download
Disallow: /api/

# No named AI-crawler groups here on purpose. Under RFC 9309 a crawler obeys
# only its most specific matching group, so a "User-agent: GPTBot / Allow: /"
# block would have exempted that bot from the three Disallow rules above - the
# opposite of what naming it was meant to express. The wildcard group already
# welcomes them, and llms.txt is the curated entry point.

Sitemap: ${SITE_URL}/sitemap.xml
`;

export const dynamic = "force-static";

export function GET() {
  return new Response(ROBOTS, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
