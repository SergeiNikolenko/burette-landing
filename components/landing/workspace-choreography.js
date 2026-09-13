import { sceneWindow } from "./workspace-presentation";

// All steps operate the real workspace and its Mol* scene. Cancelling hands the
// current camera and controls to the visitor, without resetting their view.
export async function playWorkspaceStory(frame, scene, signal, indicate = async () => {}) {
  const win = sceneWindow(frame);
  const doc = win?.document;
  const plugin = win?.BuretteViewer?.plugin;
  const click = async label => {
    const control = doc?.querySelector(`button[aria-label="${label}"]`);
    if (!control) return;
    await indicate(control);
    if (!signal.aborted) control.click();
  };
  const run = async action => {
    if (signal.aborted) throw new DOMException("Presentation paused", "AbortError");
    if (!win?.BuretteViewerActions?.run) throw new Error("Scene actions are not ready");
    const result = await win?.BuretteViewerActions?.run(action);
    if (result?.ok === false) throw new Error(result.error?.message || "Scene action unavailable");
  };
  const wait = async ms => {
    let remaining = ms;
    while (remaining > 0 && !signal.aborted) {
      const step = Math.min(50, remaining);
      await new Promise(resolve => setTimeout(resolve, step));
      if (!document.hidden) remaining -= step;
    }
    if (signal.aborted) throw new DOMException("Presentation paused", "AbortError");
  };
  const fit = () => {
    const structures = plugin?.managers?.structure?.hierarchy?.current?.structures || [];
    const spheres = structures.map(s => s.cell.obj?.data?.boundary?.sphere).filter(Boolean);
    if (!spheres.length) return;
    const center = spheres[0].center;
    const radius = Math.max(...spheres.map(s => Math.hypot(...s.center.map((v, i) => v - center[i])) + s.radius));
    const camera = plugin.canvas3d.camera;
    camera.setState(camera.getFocus(center, radius * 1.18 * Math.max(1, win.innerHeight / win.innerWidth)), 900);
  };
  const turn = async (angle = 0.5, duration = 2800) => {
    const camera = plugin?.canvas3d?.camera;
    if (!camera) return;
    const base = camera.getSnapshot();
    const d = base.position.map((v, i) => v - base.target[i]);
    let elapsed = 0;
    let previous = performance.now();
    while (elapsed < duration) {
      if (signal.aborted) throw new DOMException("Presentation paused", "AbortError");
      const now = await new Promise(requestAnimationFrame);
      if (!document.hidden) elapsed += Math.min(50, now - previous);
      previous = now;
      const a = angle * (0.5 - Math.cos(Math.PI * Math.min(1, elapsed / duration)) / 2);
      camera.setState({ ...base, position: [base.target[0] + d[0] * Math.cos(a) + d[2] * Math.sin(a), base.position[1], base.target[2] - d[0] * Math.sin(a) + d[2] * Math.cos(a)] }, 0);
    }
  };
  if (scene.label === "Library") {
    const cards = [...doc.querySelectorAll('button')].find(b => b.textContent.trim() === "Cards");
    await indicate(cards);
    if (signal.aborted) return;
    cards?.click();
    await wait(6000);
    for (const index of [2, 6, 10]) {
      const card = doc.querySelector(`.buret-card[data-index="${index}"]`);
      card?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      await wait(600);
      await indicate(card);
      if (signal.aborted) return;
      card?.click();
      await wait(5000);
    }
    return;
  }
  const selectStyle = async (kind, value) => {
    await click("Expand controls");
    if (doc.querySelector('[aria-label="Mol* representation preset"]')?.getAttribute("aria-expanded") !== "true") {
      await click("Mol* representation preset");
    }
    await wait(1400);
    const option = doc.querySelector(`[data-buret-molstar-${kind}="${value}"]`);
    if (!option) throw new Error("The style menu is not ready");
    await indicate(option);
    await wait(600);
    if (signal.aborted) return;
    option.click();
    await wait(2400);
    if (doc.querySelector('[aria-label="Mol* representation preset"]')?.getAttribute("aria-expanded") === "true") {
      await click("Mol* representation preset");
    }
  };
  await wait(2200);
  // The viewer already supplies the default appearance. Only the SDF overlay
  // needs a different one to make its transparent poses legible.
  if (scene.label === "Molecules") await selectStyle("appearance", "default");
  fit();
  await wait(950);
  if (scene.label === "Structures") {
    await run({ type: "hide_waters" });
    await wait(1400);
    await turn(0.7, 6000);
    await run({ type: "focus_ligand", selector: { comp_id: "6IC" }, showNeighborhood: true, radiusA: 5, extraRadius: 8, durationMs: 1800 });
    const pocket = plugin.managers.structure.selection.getBoundary().sphere;
    plugin.managers.camera.focusSphere(pocket, { durationMs: 1800, extraRadius: 5, zoomOut: false });
    await wait(6000);
    await turn(-0.35, 4000);
    await wait(5000);
    await selectStyle("preset", "illustrative-surface");
    await wait(9000);
  } else if (scene.label === "Motion") {
    await run({ type: "set_sdf_pose_mode", mode: "single" });
    await click("Show playback controls");
    await click("Play frame loop");
    await wait(10000);
    await click("Stop frame loop");
    await click("Next frame");
    await wait(4000);
    await turn(0.3, 4000);
    await click("Play frame loop");
    await wait(12000);
  } else if (scene.label === "Molecules") {
    await selectStyle("preset", "ball-and-stick");
    await click("Show playback controls");
    const single = [...doc.querySelectorAll('.buret-docking-pose-all')].find(button => button.getAttribute("aria-pressed") === "true");
    if (single) { await indicate(single); if (signal.aborted) return; single.click(); }
    await wait(5000);
    await click("Next pose");
    await wait(5000);
    const all = doc.querySelector('.buret-docking-poses .buret-docking-pose-all');
    if (!all) throw new Error("The All control is not ready");
    await indicate(all);
    if (signal.aborted) return;
    all.click();
    await wait(4500);
    fit();
    await wait(1200);
    await click("Play pose loop");
    await turn(0.45, 5000);
    await wait(14000);
  } else if (scene.label === "Crystals") {
    await wait(1500);
    await turn(0.55, 5000);
    for (const structure of plugin.managers.structure.hierarchy.current.structures) {
      if (signal.aborted) return;
      await plugin.builders.structure.tryCreateUnitcell(structure.model.cell, { cellColor: 0x87bcea, cellScale: 1, ref: "model", attachment: "corner" }, { isHidden: false });
    }
    await turn(-0.3, 4000);
    await wait(9000);
  }
}
