import { SITE_URL } from "../site-url.js";

const URLS = [
  { path: "", priority: "1.0", changefreq: "weekly" },
  { path: "/docs", priority: "0.8", changefreq: "weekly" },
  { path: "/docs/get-started/install", priority: "0.7", changefreq: "monthly" },
  { path: "/docs/formats", priority: "0.7", changefreq: "monthly" },
  { path: "/docs/plugin", priority: "0.7", changefreq: "monthly" },
  { path: "/support", priority: "0.4", changefreq: "monthly" },
  { path: "/docs/troubleshooting", priority: "0.5", changefreq: "monthly" },
  { path: "/docs/engines", priority: "0.6", changefreq: "monthly" },
  { path: "/docs/workflows/native-compute", priority: "0.6", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
];

const LASTMOD = new Date().toISOString().slice(0, 10);

export const dynamic = "force-static";

export function GET() {
  const entries = URLS.map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  ).join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
