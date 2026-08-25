import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const failures = [];

const contentFiles = await walk(contentRoot, (file) => file.endsWith(".mdx"));
// The landing is React now, so the checks read its component sources. JSX keeps
// href/src/alt as plain quoted attributes, which is all these regexes need.
const landingRoot = path.join(root, "components", "landing");
const landingFiles = [
  path.join(root, "app", "page.jsx"),
  ...(await walk(landingRoot, (file) => file.endsWith(".jsx"))),
];
const staticPages = [path.join(root, "download.html")];
const sourceFiles = [...staticPages, ...landingFiles, ...contentFiles];

const isLanding = (file) => landingFiles.includes(file);
// Fragment links resolve across the whole page, not within one component, so
// anchors are validated against every landing source concatenated.
const landingSource = (
  await Promise.all(landingFiles.map((file) => readFile(file, "utf8")))
).join("\n");

const forbiddenPublicGuidance = /bunx\s+burette\b/u;

for (const file of sourceFiles) {
  const source = await readFile(file, "utf8");
  const label = path.relative(root, file);

  if (forbiddenPublicGuidance.test(source)) {
    failures.push(`${label}: directs users to an unrelated npm package`);
  }

  for (const href of attributeValues(source, "href")) {
    if (href.startsWith("#")) {
      if (!isLanding(file)) continue;
      const id = decodeURIComponent(href.slice(1));
      if (id && !hasHtmlId(landingSource, id)) failures.push(`${label}: missing fragment target ${href}`);
      continue;
    }
    if (!href.startsWith("/docs")) continue;
    const route = href.split(/[?#]/u)[0];
    const targets = docsFilesForRoute(route);
    if (targets.length === 0 || !(await anyExists(targets))) failures.push(`${label}: missing docs route ${route}`);
  }

  const assetRefs = [
    ...attributeValues(source, "src"),
    ...attributeValues(source, "light"),
    ...attributeValues(source, "dark"),
    ...attributeValues(source, "poster"),
    ...markdownImageSources(source),
  ];
  for (const src of assetRefs) {
    if (src.includes("${") || /^(?:data:|https?:|\/\/)/u.test(src)) continue;
    const clean = src.split(/[?#]/u)[0];
    if (clean.startsWith("/_vercel/")) continue;
    const target = staticPages.includes(file) || isLanding(file)
      ? path.join(root, "public", clean.replace(/^\.\//u, "").replace(/^\//u, ""))
      : clean.startsWith("/assets/")
      ? path.join(root, "public", clean)
      : clean.startsWith("assets/")
        ? path.join(root, "public", clean)
        : path.resolve(path.dirname(file), clean);
    if (!(await exists(target))) failures.push(`${label}: missing local asset ${src}`);
  }

  if (isLanding(file)) {
    // Comments routinely mention tags in prose ("bolted onto an <img> from JS"),
    // and matching those reports a missing alt on a tag that does not exist.
    const code = source
      .replace(/\/\*[\s\S]*?\*\//gu, "")
      .replace(/(^|[^:])\/\/[^\n]*/gu, "$1");
    for (const tag of code.matchAll(/<img\b[^>]*?\/?>/gsu)) {
      if (!/\balt\s*=\s*[{"']/u.test(tag[0])) {
        failures.push(`${label}: image is missing alt text: ${tag[0].slice(0, 100)}`);
      }
    }
  }
}

{
  const ids = attributeOnlyValues(landingSource, "id");
  for (const id of new Set(ids.filter((value, index) => ids.indexOf(value) !== index))) {
    failures.push(`landing: duplicate id #${id}`);
  }
}

// main added this guard after the public builds stopped being notarized. It read
// index.html, which no longer exists, so it is retargeted at the landing sources
// - the claim itself moved into the hero's claims line and the FAQ.
if (/\bNotarized\b/u.test(landingSource)) {
  failures.push("landing: claims notarization without release evidence");
}

const pluginSource = await readFile(path.join(contentRoot, "plugin.mdx"), "utf8");
const hostedPluginSource = pluginSource.slice(
  pluginSource.indexOf("## Public hosted plugin"),
  pluginSource.indexOf("## Local Codex workspace plugin"),
);
for (const toolName of ["preview_molecular_file", "preview_pdb_structure", "render_molecular_scene", "open_ketcher", "control_ketcher"]) {
  if (!hostedPluginSource.includes(toolName)) failures.push(`content/plugin.mdx: missing hosted tool ${toolName}`);
}

if (!(await exists(path.join(contentRoot, "workflows", "native-compute.mdx")))) {
  failures.push("content/workflows/native-compute.mdx: missing native compute guide");
}
const outboundLinks = attributeValues(landingSource, "href").filter((href) => href.startsWith("/out/"));
const outboundRoute = path.join(root, "app", "out", "[target]", "route.js");
if (outboundLinks.length > 0 && !(await exists(outboundRoute))) {
  failures.push("landing: outbound links have no /out/[target] route");
}

// The browser demo has to stay reachable from the primary navigation. It used to
// be pinned to the hero, but the hero now leads with one download button and the
// demo sits in the nav, so the check follows it there.
const navSource = await readFile(path.join(landingRoot, "site-nav.jsx"), "utf8");
if (!navSource.includes('href: "/demo"')) {
  failures.push("site-nav.jsx: primary navigation is missing the online demo link");
}
const heroSource = await readFile(path.join(landingRoot, "hero.jsx"), "utf8");
if (!heroSource.includes("<AsciiFluid") || !heroSource.includes('className="hero-ascii-fluid"')) {
  failures.push("hero.jsx: cloud background is missing the ASCII fluid layer");
}
// main added this after the cask moved into a tap: the copyable command has to
// carry both steps or it fails on exactly the machines the button is for. The
// command now lives in its own component rather than in the hero markup.
const brewSource = await readFile(path.join(landingRoot, "brew-command.jsx"), "utf8");
if (!brewSource.includes("brew tap SergeiNikolenko/burette") || !brewSource.includes("brew install --cask burette")) {
  failures.push("brew-command.jsx: Homebrew command is missing the custom tap or install step");
}

if (!(await exists(path.join(root, "app", "demo", "route.js")))) {
  failures.push("demo.html: missing /demo route");
}

const downloadSource = await readFile(path.join(root, "download.html"), "utf8");
for (const requiredCopy of [
  "Burette is downloading.",
  "Open the DMG",
  "Register Quick Look",
  "Press Space",
  "Apple Silicon &amp; Intel",
]) {
  if (!downloadSource.includes(requiredCopy)) failures.push(`download.html: missing ${requiredCopy}`);
}
if (!(await exists(path.join(root, "app", "api", "release", "route.js")))) {
  failures.push("download.html: missing /api/release metadata route");
}

// Claims a visitor decides on. They have moved between components before and
// would be easy to lose in a refactor without anyone noticing.
const landingText = landingSource.replace(/\s+/gu, " ");
for (const requiredLandingCopy of [
  "Free and open source",
  "Nothing leaves your Mac",
  "Apple Silicon and Intel",
  "macOS 12+",
]) {
  if (!landingText.includes(requiredLandingCopy)) failures.push(`landing: missing ${requiredLandingCopy}`);
}

// nextra's Head is the only definer of --nextra-bg, --nextra-content-width and
// the --nextra-primary-* triple that its own stylesheet reads in a dozen places.
// Dropping it left the docs with an unbounded content width, a transparent
// navbar and links the colour of body text, and nothing here noticed.
{
  const rootLayout = await readFile(path.join(root, "app", "layout.jsx"), "utf8");
  if (!/<Head[\s>]/u.test(rootLayout)) {
    failures.push("app/layout.jsx: nextra <Head> is missing, so the docs CSS variables are undefined");
  }
}

// The hero animation guards are the load-bearing part of the WebGL background.
{
  const sky = await readFile(path.join(landingRoot, "sky-canvas.jsx"), "utf8");
  for (const guard of ["visibilitychange", "IntersectionObserver", "webglcontextlost", "prefers-reduced-motion"]) {
    if (!sky.includes(guard)) failures.push(`sky-canvas.jsx: hero animation is missing its ${guard} guard`);
  }
}

// Inside a <picture>, the browser commits to the first source whose type and
// media match and does NOT fall back when that file 404s. So an AVIF variant
// missing next to a PNG is a broken image, not a slower one - cheap to check,
// expensive to discover in production.
{
  const assetsDir = path.join(root, "public", "assets");
  const entries = await readdir(assetsDir);
  const pngs = entries.filter((name) => name.endsWith(".png"));
  const present = new Set(entries);
  for (const png of pngs) {
    const avif = `${png.slice(0, -4)}.avif`;
    if (!present.has(avif)) {
      failures.push(`public/assets: ${png} has no ${avif} sibling for the <picture> AVIF source`);
    }
  }

  // The hero image sits in the LCP path; the old build shipped a 411 KB PNG there.
  for (const [name, budget] of [["main-dark.avif", 200_000], ["main-light.avif", 200_000]]) {
    if (!present.has(name)) continue;
    const { size } = await stat(path.join(assetsDir, name));
    if (size > budget) {
      failures.push(`public/assets/${name} is ${Math.round(size / 1024)} KB, over the ${budget / 1024} KB LCP budget`);
    }
  }

  // 120fps screen recordings are how a landing page ends up shipping 19 MB of video.
  for (const name of entries.filter((entry) => entry.endsWith(".mp4"))) {
    const { size } = await stat(path.join(assetsDir, name));
    if (size > 8_000_000) {
      failures.push(`public/assets/${name} is ${Math.round(size / 1048576)} MB, over the 8 MB video budget`);
    }
  }
}

if (failures.length > 0) {
  console.error("Site checks failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Site checks passed (${sourceFiles.length} pages checked).`);
}

async function walk(directory, accept) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const candidate = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await walk(candidate, accept));
    else if (accept(candidate)) output.push(candidate);
  }
  return output;
}

// DOM ids only ever appear as JSX attributes; the object-literal form belongs to
// data keys (an Accordion item value, say), which are not ids at all.
function attributeOnlyValues(source, name) {
  return Array.from(
    source.matchAll(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`, "giu")),
    (match) => match[1],
  );
}

function attributeValues(source, name) {
  return Array.from(source.matchAll(new RegExp(`\\b${name}\\s*[:=]\\s*["']([^"']+)["']`, "giu")), (match) => match[1]);
}

function markdownImageSources(source) {
  return Array.from(source.matchAll(/!\[[^\]]*\]\(([^\s)]+)(?:\s+["'][^"']*["'])?\)/gu), (match) => match[1]);
}

function hasHtmlId(source, id) {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  return new RegExp(`\\bid\\s*=\\s*["']${escaped}["']`, "iu").test(source);
}

function docsFilesForRoute(route) {
  if (route === "/docs" || route === "/docs/") return [path.join(contentRoot, "index.mdx")];
  if (!route.startsWith("/docs/")) return [];
  const relative = route.slice("/docs/".length).replace(/\/$/u, "");
  return [
    path.join(contentRoot, `${relative}.mdx`),
    path.join(contentRoot, relative, "index.mdx"),
  ];
}

async function anyExists(files) {
  return (await Promise.all(files.map(exists))).some(Boolean);
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}
