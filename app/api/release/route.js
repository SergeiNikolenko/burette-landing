import { BURETTE_RELEASES_URL, fetchLatestBuretteRelease } from "../burette-release.js";

export const dynamic = "force-dynamic";

export async function GET() {
  const release = await fetchLatestBuretteRelease();
  return Response.json(
    release
      ? {
          tag: release.tag,
          assetName: release.assetName,
          sizeBytes: release.sizeBytes,
          publishedAt: release.publishedAt,
          releaseUrl: release.releaseUrl,
        }
      : { tag: null, assetName: null, sizeBytes: null, publishedAt: null, releaseUrl: BURETTE_RELEASES_URL },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
