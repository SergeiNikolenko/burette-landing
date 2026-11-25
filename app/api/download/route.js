import { BURETTE_RELEASES_URL, fetchLatestBuretteRelease, normalizePlatformKey } from "../burette-release.js";

export const dynamic = "force-dynamic";

export async function GET(request) {
  return redirectToLatestAsset(request);
}

export async function HEAD(request) {
  return redirectToLatestAsset(request);
}

function redirect(location, extraHeaders = {}) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
      "Cache-Control": "no-store, max-age=0",
      ...extraHeaders,
    },
  });
}

async function redirectToLatestAsset(request) {
  const platform = normalizePlatformKey(new URL(request.url).searchParams.get("platform"));
  const release = await fetchLatestBuretteRelease();
  if (!release) return redirect(BURETTE_RELEASES_URL);
  const asset = release.platforms?.[platform] || null;
  if (!asset) return redirect(release.releaseUrl || BURETTE_RELEASES_URL);

  return redirect(asset.downloadUrl, {
    ...(release.tag ? { "X-Burette-Release": release.tag } : {}),
    "X-Burette-Asset": asset.assetName,
    "X-Burette-Platform": platform,
  });
}
