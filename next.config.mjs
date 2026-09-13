import nextra from "nextra";

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
        destination: "https://burette-plugin-git-design-presentation-scenes-nikolenko-sergei.vercel.app/web-demo/:path*",
      },
      {
        source: "/burette-viewer/:path*",
        destination: "https://burette-plugin-git-design-presentation-scenes-nikolenko-sergei.vercel.app/burette-viewer/:path*",
      },
    ];
  },
  outputFileTracingIncludes: {
    "/*": ["./download.html", "./out.html", "./public/live-data/**"],
  },
});
