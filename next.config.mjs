import nextra from "nextra";

const withNextra = nextra({
  contentDirBasePath: "/docs",
  defaultShowCopyCode: true,
});

export default withNextra({
  reactStrictMode: true,
  // the floating dev badge sits on top of the hero and gets into every screenshot
  devIndicators: false,
  outputFileTracingIncludes: {
    "/*": ["./download.html", "./out.html"],
  },
});
