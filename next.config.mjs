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
    ];
  },
  outputFileTracingIncludes: {
    "/*": ["./download.html", "./out.html", "./public/live-data/**"],
  },
});
