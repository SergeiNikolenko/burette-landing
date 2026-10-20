import assert from "node:assert/strict";
import nextConfig from "../next.config.mjs";
import { GET } from "../app/demo/route.js";

// Exercise the published routes: preview URLs freeze the demo on an old build.
const response = await GET();
assert.deepEqual(
  { status: response.status, location: response.headers.get("location") },
  { status: 307, location: "https://burette-plugin.vercel.app/web-demo/index.html" },
);
assert.deepEqual(await nextConfig.rewrites(), [
  {
    source: "/web-demo/:path*",
    destination: "https://burette-plugin.vercel.app/web-demo/:path*",
  },
  {
    source: "/burette-viewer/:path*",
    destination: "https://burette-plugin.vercel.app/burette-viewer/:path*",
  },
]);
console.log("Standalone and embedded demos follow the shared production runtime.");
