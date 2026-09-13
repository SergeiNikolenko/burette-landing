import { sceneWindow } from "./workspace-presentation";

// A quiet camera loop on the real file. User input aborts at the current view.
export async function playWorkspaceStory(frame, scene, signal, onProgress = () => {}) {
  const win = sceneWindow(frame);
  const plugin = win?.BuretteViewer?.plugin;
  const camera = plugin?.canvas3d?.camera;
  const structures = plugin?.managers?.structure?.hierarchy?.current?.structures || [];
  const spheres = structures.map(s => s.cell.obj?.data?.boundary?.sphere).filter(Boolean);
  if (!camera || !spheres.length) throw new Error("Scene camera is not ready");
  const center = spheres[0].center;
  const radius = Math.max(...spheres.map(s => Math.hypot(...s.center.map((v, i) => v - center[i])) + s.radius));
  const base = camera.getFocus(center, radius * 1.2 * Math.max(1, win.innerHeight / win.innerWidth));
  camera.setState(base, 1100);
  onProgress(0);
  let elapsed = 0;
  let previous = performance.now();
  const duration = 32000;
  const offset = base.position.map((value, i) => value - base.target[i]);
  while (elapsed < duration) {
    const now = await new Promise(requestAnimationFrame);
    if (signal.aborted) throw new DOMException("Presentation paused", "AbortError");
    if (!document.hidden) elapsed += Math.min(50, now - previous);
    previous = now;
    const progress = Math.min(1, elapsed / duration);
    onProgress(progress);
    if (elapsed < 1200) continue;
    const phase = Math.min(1, (elapsed - 1200) / (duration - 1200));
    const ease = 0.5 - Math.cos(Math.PI * phase) / 2;
    const yaw = scene.direction * 0.85 * Math.sin(ease * Math.PI * 1.3);
    const pitch = 0.1 * Math.sin(ease * Math.PI * 2);
    const zoom = 1 - 0.12 * Math.sin(ease * Math.PI);
    const x = offset[0] * Math.cos(yaw) + offset[2] * Math.sin(yaw);
    const z = -offset[0] * Math.sin(yaw) + offset[2] * Math.cos(yaw);
    camera.setState({
      ...base,
      position: [
        base.target[0] + x * zoom,
        base.target[1] + (offset[1] * Math.cos(pitch) - z * Math.sin(pitch)) * zoom,
        base.target[2] + (offset[1] * Math.sin(pitch) + z * Math.cos(pitch)) * zoom,
      ],
    }, 0);
  }
}
