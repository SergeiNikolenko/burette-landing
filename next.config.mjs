import nextra from "nextra";

const withNextra = nextra({
  contentDirBasePath: "/docs",
  defaultShowCopyCode: true,
});

export default withNextra({
  reactStrictMode: true,
  outputFileTracingIncludes: {
    "/*": ["./download.html", "./out.html"],
  },
});
