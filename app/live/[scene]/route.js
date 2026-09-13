import { liveSceneHtml } from "@/lib/live-scene.mjs";

export async function GET(request, { params }) {
  const { scene } = await params;
  const theme = new URL(request.url).searchParams.get("theme");
  const html = await liveSceneHtml(scene, theme);
  if (!html) return new Response("Unknown example", { status: 404 });
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; worker-src 'self' blob:; frame-ancestors 'self'; object-src 'none'; base-uri 'self'",
    },
  });
}
