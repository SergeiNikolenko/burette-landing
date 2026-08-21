import { BURETTE_RELEASES_URL } from "@/app/api/burette-release.js";

const OWNER = "SergeiNikolenko";
const REPO = "Burette";

// Rendered on the server and revalidated hourly, so a visitor's browser never
// calls api.github.com. The old nav did that on every page load: a fourth
// third-party origin, an unauthenticated 60-requests-per-hour-per-IP limit, and
// an odd look on a page whose pitch is "no account, nothing leaves your Mac".
//
// It also shows the release rather than the star count. A star count only helps
// once it is higher than a visitor would already guess; below a few hundred it
// reads as "abandoned side project" precisely where the install decision is made.
// A recent release date answers the same worry and keeps getting better.
async function latestTag() {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "burette-landing-release-metadata",
        },
        next: { revalidate: 3600 },
      },
    );
    if (!response.ok) return null;
    const release = await response.json();
    return {
      tag: typeof release.tag_name === "string" ? release.tag_name : null,
      publishedAt:
        typeof release.published_at === "string" ? release.published_at : null,
      url:
        typeof release.html_url === "string"
          ? release.html_url
          : BURETTE_RELEASES_URL,
    };
  } catch {
    return null;
  }
}

export default async function ReleaseBadge() {
  const release = await latestTag();
  if (!release?.tag) return null;

  const month = release.publishedAt
    ? new Date(release.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <a
      href={release.url}
      target="_blank"
      rel="noopener"
      data-analytics-event="Outbound Link"
      data-analytics-location="nav"
      data-analytics-target="github-releases"
      className="border-input text-muted-foreground hover:text-foreground hover:border-brand/60 hidden items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs transition-colors sm:inline-flex"
    >
      <span className="bg-brand size-1.5 rounded-full" aria-hidden="true" />
      {release.tag}
      {month ? <span className="text-mono">· {month}</span> : null}
    </a>
  );
}
