import { readFile } from "node:fs/promises";
import path from "node:path";

const scenes = {
  structure: { file: "1htb.pdb", format: "pdb", label: "1HTB.pdb" },
  motion: { file: "sn2-mode.xyz", format: "xyz", label: "SN2 · vibrational mode", frames: 20 },
  collection: { file: "collection.json", format: "csv", label: "MOSES · 48 molecules" },
};
const json = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");
const asset = (name) => `/burette-viewer/${name}`;

// This adapter supplies data and configuration to the actual Burette runtimes.
// It does not implement a second molecule renderer or a simulated application UI.
export async function liveSceneHtml(scene, theme) {
  const example = Object.hasOwn(scenes, scene) ? scenes[scene] : null;
  if (!example) return null;
  const data = await readFile(path.join(process.cwd(), "public/live-data", example.file));
  const dark = theme === "dark";
  const grid = scene === "collection";
  const config = {
    format: example.format,
    molstarFormat: example.format,
    binary: false,
    renderer: grid ? "grid2d" : "molstar",
    documentId: `landing-${scene}`,
    label: example.label,
    sourcePath: example.label,
    sourceExtension: example.format,
    theme: dark ? "dark" : "light",
    canvasBackground: dark ? "black" : "white",
    themeTokens: {
      background: dark ? "#000000" : "#ffffff",
      foreground: dark ? "#edf3fa" : "#182431",
      accent: dark ? "#a9cff3" : "#265e94",
    },
    transparentBackground: false,
    appViewer: false,
    tauriViewer: false,
    pubChemSearch: false,
    molstarAvailable: true,
    molstarStyle: scene === "motion" ? "ball-and-stick" : "illustrative",
    molstarPowerPreference: "default",
    uiScale: 0.9,
    overlayOpacity: 0.96,
    showPanelControls: true,
    defaultLayoutState: { left: "hidden", right: "hidden", top: "hidden", bottom: "hidden" },
    trajectoryControls: !!example.frames,
    trajectoryFrameCount: example.frames || 0,
    rdkitWasmPath: asset("rdkit/RDKit_minimal.wasm"),
    ...(grid ? {
      mode: "grid2d", host: "landing", molecularGrid: true,
      recordsTotal: 48, recordsIncluded: 48, recordsTruncated: false,
      capabilities: { selection: true, export: true, substructureSearch: true, rendererSwitch: false },
    } : {}),
  };
  const scripts = grid
    ? ["rdkit/RDKit_minimal.js", "grid-ui.js", "grid-viewer.js"]
    : ["molstar.js", "burette-agent.js", "trajectory-smoothing.js", "molstar-preset-preview-controller.js", "superposition-panel.js", "molecule-preview-interactions.js", "color-picker.js", "scene-file-actions.js", "viewer.js"];
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<base href="/burette-viewer/"><title>Burette · ${example.label}</title>
<link rel="stylesheet" href="${asset(grid ? "grid.css" : "viewer-runtime.css")}">
${grid ? "" : `<link rel="stylesheet" href="${asset("molstar.css")}">`}
<style>html,body{margin:0;background:${dark ? "#000000" : "#fff"}}#status:empty{display:none}
${scene === "structure" ? "body:not(.is-interactive) :is(#buret-toolbar,.buret-viewport-rail,.buret-corner-toggle){visibility:hidden}" : ""}</style>
</head><body><div id="app"></div><div id="status">Loading ${example.label}…</div>
<script id="landing-scene-config" type="application/json">${json(config)}</script>
<script id="landing-scene-data" type="application/json">${json(grid ? JSON.parse(data) : data.toString("base64"))}</script>
<script src="/live/bridge.js"></script>
${grid ? "" : `<script src="${asset("viewer-shell.js")}"></script>`}
${scripts.map(name => `<script src="${asset(name)}"></script>`).join("\n")}
</body></html>`;
}
