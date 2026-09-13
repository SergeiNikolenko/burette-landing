import { sceneWindow } from "./workspace-presentation";

// All steps operate the real workspace and its Mol* scene. Cancelling hands the
// current camera and controls to the visitor, without resetting their view.
export async function playWorkspaceStory(frame, scene, signal) {
  const win = sceneWindow(frame);
  const doc = win?.document;
  const plugin = win?.BuretteViewer?.plugin;
  const click = label => doc?.querySelector(`button[aria-label="${label}"]`)?.click();
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
    cards?.click();
    await wait(2500);
    for (const index of [2, 6, 10]) {
      const card = doc.querySelector(`.buret-card[data-index="${index}"]`);
      card?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      await wait(600);
      card?.click();
      await wait(2000);
    }
    return;
  }
  await run({ type: "set_molstar_style", style: "illustrative" });
  await wait(800);
  fit();
  await wait(950);
  if (scene.label === "Structures") {
    await run({ type: "hide_waters" });
    await wait(1400);
    await turn(0.7, 3200);
    await run({ type: "focus_ligand", selector: { comp_id: "6IC" }, showNeighborhood: true, radiusA: 5, extraRadius: 8, durationMs: 1800 });
    const pocket = plugin.managers.structure.selection.getBoundary().sphere;
    plugin.managers.camera.focusSphere(pocket, { durationMs: 1800, extraRadius: 5, zoomOut: false });
    await wait(2600);
    await turn(-0.35, 2000);
    await wait(2200);
    // Same builder as the real scene-tree Surface action; retain cartoon context.
    for (const structure of plugin.managers.structure.hierarchy.current.structures) {
      if (signal.aborted) return;
      if (structure.components.some(c => c.cell?.transform?.tags?.includes("presentation-surface"))) continue;
      const component = await plugin.builders.structure.tryCreateComponentStatic(structure.cell, "polymer", { tags: ["presentation-surface"] });
      if (component) await plugin.builders.structure.representation.addRepresentation(component, { type: "molecular-surface", typeParams: { alpha: 0.16 }, color: "chain-id" });
    }
    await wait(2500);
  } else if (scene.label === "Motion") {
    await run({ type: "set_sdf_pose_mode", mode: "single" });
    click("Show playback controls");
    click("Play frame loop");
    await wait(4200);
    click("Stop frame loop");
    await run({ type: "apply_trajectory_smoothing", outputFrames: 80 });
    click("Show playback controls");
    click("Play frame loop");
    await wait(5000);
  } else if (scene.label === "Molecules") {
    await run({ type: "set_sdf_pose_mode", mode: "single" });
    click("Show playback controls");
    await run({ type: "set_sdf_pose_index", index: 0 });
    await wait(2000);
    await run({ type: "set_sdf_pose_index", index: 2 });
    await wait(2000);
    await run({ type: "set_sdf_pose_mode", mode: "all" });
    fit();
    await turn(0.45, 2600);
    await wait(3000);
  } else if (scene.label === "Crystals") {
    await wait(1500);
    await turn(0.55, 2500);
    for (const structure of plugin.managers.structure.hierarchy.current.structures) {
      if (signal.aborted) return;
      await plugin.builders.structure.tryCreateUnitcell(structure.model.cell, { cellColor: 0x87bcea, cellScale: 1, ref: "model", attachment: "corner" }, { isHidden: false });
    }
    await turn(-0.3, 2000);
    await wait(3000);
  }
}
