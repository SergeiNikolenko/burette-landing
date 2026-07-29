const OWNER = "SergeiNikolenko";
const REPO = "Burette";

export const BURETTE_RELEASES_URL = `https://github.com/${OWNER}/${REPO}/releases`;
const LATEST_RELEASE_URL = `https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`;

export async function fetchLatestBuretteRelease() {
  try {
    const response = await fetch(LATEST_RELEASE_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "burette-landing-release-metadata",
      },
      cache: "no-store",
    });
    if (!response.ok) return null;

    const release = await response.json();
    const assets = Array.isArray(release.assets) ? release.assets : [];
    const dmg = assets.find((asset) => (
      typeof asset.name === "string"
      && asset.name.toLowerCase().endsWith(".dmg")
      && typeof asset.browser_download_url === "string"
    ));
    if (!dmg) return null;

    return {
      tag: typeof release.tag_name === "string" ? release.tag_name : null,
      assetName: dmg.name,
      sizeBytes: Number.isFinite(dmg.size) ? dmg.size : null,
      publishedAt: typeof release.published_at === "string" ? release.published_at : null,
      downloadUrl: dmg.browser_download_url,
      releaseUrl: typeof release.html_url === "string" ? release.html_url : BURETTE_RELEASES_URL,
    };
  } catch {
    return null;
  }
}
