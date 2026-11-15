import nextra from "nextra";
import { buretteRuntimeOrigin } from "./lib/burette-runtime.mjs";

const withNextra = nextra({
  contentDirBasePath: "/docs",
  defaultShowCopyCode: true,
});

export default withNextra({
  reactStrictMode: true,
  // the floating dev badge sits on top of the hero and gets into every screenshot
  devIndicators: false,
  async rewrites() {
    return [
      {
        source: "/web-demo/:path*",
        destination: `${buretteRuntimeOrigin}/web-demo/:path*`,
      },
      {
        source: "/burette-viewer/:path*",
        destination: `${buretteRuntimeOrigin}/burette-viewer/:path*`,
      },
      {
        source: "/demo-library/:path*",
        destination: `${buretteRuntimeOrigin}/demo-library/:path*`,
      },
      {
        source: "/demo-scenes/:path*",
        destination: `${buretteRuntimeOrigin}/demo-scenes/:path*`,
      },
      {
        source: "/api/xyzrender",
        destination: `${buretteRuntimeOrigin}/api/xyzrender`,
      },
    ];
  },
  outputFileTracingIncludes: {
    "/*": ["./download.html", "./out.html", "./public/live-data/**"],
  },
});
