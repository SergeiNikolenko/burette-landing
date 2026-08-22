import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const failures = [];

const contentFiles = await walk(contentRoot, (file) => file.endsWith(".mdx"));
const staticPages = [path.join(root, "index.html")];
const sourceFiles = [...staticPages, ...contentFiles];

const forbiddenPublicGuidance = /bunx\s+burette\b/u;

for (const file of sourceFiles) {
  const source = await readFile(file, "utf8");
  const label = path.relative(root, file);

  if (forbiddenPublicGuidance.test(source)) {
    failures.push(`${label}: directs users to an unrelated npm package`);
  }

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
if (landingSource.includes('class="pill">Notarized</span>')) {
  failures.push("index.html: claims notarization without release evidence");
}
if (!landingSource.includes("brew tap SergeiNikolenko/burette")) {
  failures.push("index.html: Homebrew install copy is missing the custom tap");
}

const pluginSource = await readFile(path.join(contentRoot, "plugin.mdx"), "utf8");
for (const toolName of ["preview_molecular_file", "preview_pdb_structure", "render_molecular_scene", "open_ketcher", "control_ketcher"]) {
  if (!pluginSource.includes(toolName)) failures.push(`content/plugin.mdx: missing hosted tool ${toolName}`);
}

if (!(await exists(path.join(contentRoot, "workflows", "native-compute.mdx")))) {
  failures.push("content/workflows/native-compute.mdx: missing native compute guide");
}
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
