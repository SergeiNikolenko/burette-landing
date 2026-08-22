import { BURETTE_RELEASES_URL, fetchLatestBuretteRelease } from "../burette-release.js";

export const dynamic = "force-dynamic";

export async function GET() {
  return redirectToLatestDmg();
}

export async function HEAD() {
  return redirectToLatestDmg();
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

async function redirectToLatestDmg() {
  const release = await fetchLatestBuretteRelease();
  if (!release) return redirect(BURETTE_RELEASES_URL);

  return redirect(release.downloadUrl, {
    ...(release.tag ? { "X-Burette-Release": release.tag } : {}),
    "X-Burette-Asset": release.assetName,
  });
}
