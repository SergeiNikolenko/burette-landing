import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const failures = [];

const contentFiles = await walk(contentRoot, (file) => file.endsWith(".mdx"));
const staticPages = [path.join(root, "index.html")];
const sourceFiles = [...staticPages, ...contentFiles];

for (const file of sourceFiles) {
  const source = await readFile(file, "utf8");
  const label = path.relative(root, file);

  for (const href of attributeValues(source, "href")) {
    if (href.startsWith("#")) {
      if (file !== path.join(root, "index.html")) continue;
      const id = decodeURIComponent(href.slice(1));
      if (id && !hasHtmlId(source, id)) failures.push(`${label}: missing fragment target ${href}`);
      continue;
    }
    if (!href.startsWith("/docs")) continue;
    const route = href.split(/[?#]/u)[0];
    const targets = docsFilesForRoute(route);
    if (targets.length === 0 || !(await anyExists(targets))) failures.push(`${label}: missing docs route ${route}`);
  }

  for (const src of [...attributeValues(source, "src"), ...markdownImageSources(source)]) {
    if (src.includes("${") || /^(?:data:|https?:|\/\/)/u.test(src)) continue;
    const clean = src.split(/[?#]/u)[0];
    if (clean.startsWith("/_vercel/")) continue;
    const target = staticPages.includes(file)
      ? path.join(root, "public", clean.replace(/^\.\//u, "").replace(/^\//u, ""))
      : clean.startsWith("/assets/")
      ? path.join(root, "public", clean)
      : clean.startsWith("assets/")
        ? path.join(root, "public", clean)
        : path.resolve(path.dirname(file), clean);
    if (!(await exists(target))) failures.push(`${label}: missing local asset ${src}`);
  }

  if (file === path.join(root, "index.html")) {
    const ids = attributeValues(source, "id");
    for (const id of new Set(ids.filter((value, index) => ids.indexOf(value) !== index))) {
      failures.push(`${label}: duplicate id #${id}`);
    }
    for (const tag of source.matchAll(/<img\b[^>]*>/giu)) {
      if (!/\balt\s*=\s*["'][^"']*["']/iu.test(tag[0])) {
        failures.push(`${label}: image is missing alt text: ${tag[0].slice(0, 100)}`);
      }
    }
  }
}

const landingSource = await readFile(path.join(root, "index.html"), "utf8");
const outboundLinks = attributeValues(landingSource, "href").filter((href) => href.startsWith("/out/"));
const outboundRoute = path.join(root, "app", "out", "[target]", "route.js");
if (outboundLinks.length > 0 && !(await exists(outboundRoute))) {
  failures.push("index.html: outbound links have no /out/[target] route");
}

const navSource = landingSource.slice(
  landingSource.indexOf("<!-- ============ NAV ============ -->"),
  landingSource.indexOf("<!-- ============ HERO ============ -->"),
);
if (!navSource.includes('href="/demo"')) {
  failures.push("index.html: primary navigation is missing the online demo link");
}

const heroSource = landingSource.slice(
  landingSource.indexOf("<!-- ============ HERO ============ -->"),
  landingSource.indexOf("<!-- ============ FORMATS ============ -->"),
);
if (!heroSource.includes('href="/demo"')) {
  failures.push("index.html: hero is missing the online demo link");
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

for (const requiredLandingCopy of [
  "Free &amp; open source · No account",
  "Native Metal on Apple Silicon",
  "Chemical Space · Apple Silicon Metal",
  "10,000-molecule benchmark",
]) {
  if (!landingSource.includes(requiredLandingCopy)) failures.push(`index.html: missing ${requiredLandingCopy}`);
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

function attributeValues(source, name) {
  return Array.from(source.matchAll(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`, "giu")), (match) => match[1]);
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
