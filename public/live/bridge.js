(() => {
  "use strict";
  const config = JSON.parse(document.getElementById("landing-scene-config").textContent);
  const data = JSON.parse(document.getElementById("landing-scene-data").textContent);
  const origin = location.origin;
  const send = (type, detail = {}) => {
    if (parent !== window) parent.postMessage({ source: "burette-landing-scene", type, ...detail }, origin);
  };
  window.BuretteConfig = config;
  window.BuretteInlineMode = true;
  window.BurettePanelControlsVisible = true;
  window.BuretteDebug = false;
  if (config.mode === "grid2d") window.BuretteGridRecords = data;
  else window.BuretteDataBase64 = data;
  window.__mqlDebug = () => {};
  window.__mqlPost = (type, message, payload) => {
    if (type === "ready" && (config.mode !== "grid2d" || payload?.rdkitLoaded)) send("ready", { scene: config.documentId });
    if (type === "error") send("error", { message: String(message).slice(0, 300) });
    if (type === "gridMenuStateChanged") send("selection", { indexes: (payload?.selectedSourceIndexes || []).slice(0, 48) });
    if (type === "trajectorySmoothingChanged") smoothed = payload?.view === "smoothed";
  };
  // Native and browser Burette runtimes share this host-message contract.
  window.webkit = { messageHandlers: { burette: { postMessage(body) {
    window.__mqlPost(body.type, body.message, body);
  } } } };
  window.__mqlAction = () => {};
  window.addEventListener("burette-agent-ready", async () => {
    const result = await window.BuretteAgent.run({ command: "capabilities" });
    if (result.ok && result.result.ready) send("ready", { scene: config.documentId });
  });
  const actions = {
    overview: { type: "reset_camera", args: { durationMs: 0 } },
    ligand: { type: "focus_ligand", index: 0, durationMs: 0, extraRadius: 5 },
    surface: { type: "show_surface" },
    frames: { type: "set_sdf_pose_mode", mode: "single" },
    smooth: { type: "apply_trajectory_smoothing", outputFrames: 80 },
    all: { type: "set_sdf_pose_mode", mode: "all" },
  };
  let smoothed = false;
  async function motionView(name) {
    const run = action => window.BuretteViewerActions.run(action);
    if (smoothed) {
      const original = await run({ type: "set_trajectory_smoothing_view", view: "original" });
      if (!original.ok) return original;
      smoothed = false;
    }
    if (name === "smooth") {
      const single = await run(actions.frames);
      if (!single.ok) return single;
    }
    const result = await run(actions[name]);
    if (name === "smooth" && result.ok) smoothed = true;
    return result;
  }
  let surfaceShown = false;
  // The published scene action passes a hierarchy wrapper where Mol* expects
  // its state cell. Use the same runtime builder with the resolved cell here.
  async function showSurface() {
    if (surfaceShown) return { ok: true };
    const plugin = window.BuretteViewer?.plugin;
    const structures = plugin?.managers?.structure?.hierarchy?.current?.structures || [];
    let count = 0;
    for (const structure of structures) {
      const component = await plugin.builders.structure.tryCreateComponentStatic(structure.cell, "polymer");
      if (!component) continue;
      await plugin.builders.structure.representation.addRepresentation(component, {
        type: "molecular-surface", typeParams: { alpha: 0.35 }, color: "chain-id",
      }, { tag: "landing-molecular-surface" });
      count++;
    }
    surfaceShown = count > 0;
    return { ok: surfaceShown };
  }
  let busy = false;
  window.addEventListener("message", async (event) => {
    if (event.origin !== origin || event.source !== parent) return;
    const body = event.data;
    if (body?.source !== "burette-landing-host") return;
    if (body.type === "interaction") {
      document.body.classList.toggle("is-interactive", body.enabled === true);
      return;
    }
    if (body.type === "suspend") {
      const canvas = window.BuretteViewer?.plugin?.canvas3d;
      send("suspended", { camera: canvas?.camera?.getSnapshot?.() || null });
      return;
    }
    if (body.type === "restore" && body.camera && typeof body.camera === "object") {
      window.BuretteViewer?.plugin?.canvas3d?.camera?.setState(body.camera, 0);
      return;
    }
    if (body.type === "select" && config.mode === "grid2d") {
      const indexes = Array.isArray(body.indexes)
        ? body.indexes.filter(i => Number.isInteger(i) && i >= 0 && i < 48).slice(0, 48) : [];
      window.postMessage({ source: "burette-grid-host", body: { type: "chemicalSpaceSelectionChanged", sourceRecordIds: indexes, focusSourceRecordId: indexes[0], filterToSelection: body.filterToSelection === true } }, origin);
      return;
    }
    if (body.type !== "action" || !Object.hasOwn(actions, body.action) || busy) return;
    busy = true;
    try {
      const result = body.action === "surface" ? await showSurface()
        : ["frames", "smooth", "all"].includes(body.action) ? await motionView(body.action)
        : await window.BuretteViewerActions.run(actions[body.action]);
      send("action-result", { action: body.action, ok: result?.ok === true, message: result?.error?.message?.slice(0, 200) });
    } catch {
      send("action-result", { action: body.action, ok: false, message: "This scene could not complete the action." });
    } finally { busy = false; }
  });
})();
