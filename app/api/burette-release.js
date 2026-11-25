const OWNER = "SergeiNikolenko";
const REPO = "Burette";

export const BURETTE_RELEASES_URL = `https://github.com/${OWNER}/${REPO}/releases`;
const LATEST_RELEASE_URL = `https://api.github.com/repos/${OWNER}/${REPO}/releases/latest`;

const PLATFORM_MATCHERS = {
  macos: [
    (name) => name.endsWith(".dmg"),
    (name) => name.endsWith(".zip") && !name.includes("windows") && !name.includes("linux"),
  ],
  windows: [
    (name) => name.endsWith("-setup.exe"),
    (name) => name.endsWith(".exe"),
  ],
  "linux-deb": [(name) => name.endsWith(".deb")],
  "linux-rpm": [(name) => name.endsWith(".rpm")],
  "linux-appimage": [(name) => name.endsWith(".appimage")],
};

const CHECKSUM_MATCHERS = {
  macos: [(name) => name.endsWith(".dmg.sha256"), (name) => name.endsWith(".zip.sha256")],
  windows: [(name) => name.endsWith("-windows.sha256")],
  "linux-deb": [(name) => name.endsWith("-linux.sha256")],
  "linux-rpm": [(name) => name.endsWith("-linux.sha256")],
  "linux-appimage": [(name) => name.endsWith("-linux.sha256")],
};

export function normalizePlatformKey(value) {
  const raw = typeof value === "string" ? value.trim().toLowerCase() : "";
  if (raw === "mac" || raw === "macos" || raw === "darwin" || raw === "dmg") return "macos";
  if (raw === "win" || raw === "windows" || raw === "exe" || raw === "nsis") return "windows";
  if (raw === "linux" || raw === "linux-deb" || raw === "deb") return "linux-deb";
  if (raw === "linux-rpm" || raw === "rpm") return "linux-rpm";
  if (raw === "linux-appimage" || raw === "appimage") return "linux-appimage";
  return "macos";
}

function pickAsset(assets, matchers) {
  for (const match of matchers) {
    const found = assets.find((asset) => (
      typeof asset.name === "string"
      && typeof asset.browser_download_url === "string"
      && match(asset.name.toLowerCase())
    ));
    if (found) {
      return {
        assetName: found.name,
        sizeBytes: Number.isFinite(found.size) ? found.size : null,
        downloadUrl: found.browser_download_url,
      };
    }
  }
  return null;
}

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
    const platforms = {};
    for (const [key, matchers] of Object.entries(PLATFORM_MATCHERS)) {
      const asset = pickAsset(assets, matchers);
      if (asset) {
        const checksum = pickAsset(assets, CHECKSUM_MATCHERS[key] || []);
        platforms[key] = checksum
          ? { ...asset, checksumName: checksum.assetName, checksumUrl: checksum.downloadUrl }
          : asset;
      }
    }
    const macos = platforms.macos || null;
    if (!macos && Object.keys(platforms).length === 0) return null;

    return {
      tag: typeof release.tag_name === "string" ? release.tag_name : null,
      assetName: macos ? macos.assetName : null,
      sizeBytes: macos ? macos.sizeBytes : null,
      publishedAt: typeof release.published_at === "string" ? release.published_at : null,
      downloadUrl: macos ? macos.downloadUrl : null,
      releaseUrl: typeof release.html_url === "string" ? release.html_url : BURETTE_RELEASES_URL,
      platforms,
    };
  } catch {
    return null;
  }
}
