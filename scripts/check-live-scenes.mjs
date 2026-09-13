import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { liveSceneHtml } from "../lib/live-scene.mjs";

const parse = (html, id) => JSON.parse(html.match(new RegExp(`<script id="${id}"[^>]*>(.*?)</script>`, "s"))[1]);
for (const scene of ["structure", "motion", "collection"]) {
  const html = await liveSceneHtml(scene, "dark");
  const config = parse(html, "landing-scene-config");
  const data = parse(html, "landing-scene-data");
  if (scene !== "collection") {
    assert.ok(html.indexOf("/burette-viewer/sequence-panel.js") > 0);
    assert.ok(html.indexOf("/burette-viewer/sequence-panel.js") < html.indexOf("/burette-viewer/viewer.js"));
  }
  assert.equal(config.theme, "dark");
  assert.equal(config.canvasBackground, "black");
  if (scene === "structure") assert.match(Buffer.from(data, "base64").toString(), /^ATOM /m);
  if (scene === "motion") {
    const lines = Buffer.from(data, "base64").toString().trim().split(/\r?\n/);
    let frames = 0;
    for (let i = 0; i < lines.length;) {
      const atoms = Number(lines[i]);
      assert.ok(atoms > 0 && Number.isInteger(atoms));
      assert.ok(lines.slice(i + 2, i + atoms + 2).every(line => /^\S+\s+-?[\d.]+\s+-?[\d.]+\s+-?[\d.]+/.test(line)));
      i += atoms + 2;
      frames++;
    }
    assert.equal(frames, config.trajectoryFrameCount);
  }
  if (scene === "collection") {
    assert.equal(data.length, 48);
    data.forEach((row, index) => {
      assert.equal(row.index, index);
      assert.ok(row.smiles.length > 0);
      for (const key of ["Molecular weight", "SLogP", "TPSA"]) assert.ok(Number.isFinite(Number(row.props[key])));
    });
  }
}
assert.equal(await liveSceneHtml("../secrets", "light"), null);
assert.equal(await liveSceneHtml("__proto__", "light"), null);
assert.equal(parse(await liveSceneHtml("structure", "unrecognized"), "landing-scene-config").theme, "light");

const bridge = await readFile(new URL("../public/live/bridge.js", import.meta.url), "utf8");
const events = new Map();
const replies = [];
const selections = [];
const actions = [];
const parent = { postMessage: message => replies.push(message) };
const origin = "https://preview.example";
const window = {
  addEventListener: (name, handler) => events.set(name, handler),
  postMessage: message => selections.push(message),
  BuretteViewerActions: { run: async action => { actions.push(action); return { ok: true }; } },
};
vm.runInNewContext(bridge, {
  window, parent, location: { origin },
  document: { getElementById: id => ({ textContent: JSON.stringify(id.endsWith("config") ? { mode: "grid2d" } : []) }) },
});
const message = (body, overrides = {}) => events.get("message")({ origin, source: parent, data: { source: "burette-landing-host", ...body }, ...overrides });
await message({ type: "action", action: "overview" }, { origin: "https://other.example" });
await message({ type: "action", action: "overview" }, { source: {} });
await message({ type: "action", action: "not-an-action" });
assert.deepEqual(actions, []);
await message({ type: "action", action: "overview" });
assert.deepEqual(JSON.parse(JSON.stringify(actions)), [{ type: "reset_camera", args: { durationMs: 0 } }]);
assert.equal(replies.at(-1).ok, true);
actions.length = 0;
await message({ type: "action", action: "smooth" });

await message({ type: "action", action: "frames" });
assert.deepEqual(JSON.parse(JSON.stringify(actions)), [
  { type: "set_sdf_pose_mode", mode: "single" },
  { type: "apply_trajectory_smoothing", outputFrames: 80 },
  { type: "set_trajectory_smoothing_view", view: "original" },
  { type: "set_sdf_pose_mode", mode: "single" },
]);
actions.length = 0;
window.BuretteViewerActions.run = async action => { actions.push(action); return { ok: false }; };
await message({ type: "action", action: "smooth" });
assert.deepEqual(JSON.parse(JSON.stringify(actions)), [{ type: "set_sdf_pose_mode", mode: "single" }]);
assert.equal(replies.at(-1).ok, false);
await message({ type: "select", indexes: [-1, 7, 48, "8", 2.5], filterToSelection: true });
assert.deepEqual(JSON.parse(JSON.stringify(selections[0].body)), { type: "chemicalSpaceSelectionChanged", sourceRecordIds: [7], focusSourceRecordId: 7, filterToSelection: true });
console.log("Live scene data, route bounds, and frame bridge checks passed.");

const sdf = await readFile(new URL("../public/live-data/caffeine-water.sdf", import.meta.url), "utf8");
const records = sdf.split("$$$$").filter(record => record.trim());
assert.equal(records.length, 2);
for (const record of records) {
  const lines = record.replace(/^\n/, "").split("\n");
  assert.ok(lines[0].trim(), "SDF record must have a title before its program and comment lines");
  assert.match(lines[3], /V2000/);
  assert.ok(record.includes("M  END"));
}
