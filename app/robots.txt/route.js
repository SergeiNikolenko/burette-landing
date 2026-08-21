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

# Nothing here is behind an account, so the AI crawlers are welcome to the
# documentation. llms.txt below is a curated entry point for them.
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

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
