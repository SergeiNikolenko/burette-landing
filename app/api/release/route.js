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
          platforms: Object.fromEntries(
            Object.entries(release.platforms || {}).map(([key, asset]) => [
              key,
              {
                assetName: asset.assetName,
                sizeBytes: asset.sizeBytes,
                ...(asset.checksumName ? { checksumName: asset.checksumName } : {}),
                ...(asset.checksumUrl ? { checksumUrl: asset.checksumUrl } : {}),
              },
            ]),
          ),
        }
      : { tag: null, assetName: null, sizeBytes: null, publishedAt: null, releaseUrl: BURETTE_RELEASES_URL, platforms: {} },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
