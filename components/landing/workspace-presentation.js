import { workspaceScenes } from "./workspace-scenes";
export { workspaceScenes } from "./workspace-scenes";

export function activeWorkspaceViewer(doc) {
  const active = doc?.querySelector('.page-surface[data-active="true"] iframe.viewer-iframe:not([data-read-only="true"])');
  if (active) return active;
  const title = doc?.querySelector('[role="tablist"][aria-label="Open structures"] [aria-selected="true"]')?.textContent.trim();
  const viewers = [...(doc?.querySelectorAll("iframe.viewer-iframe") || [])];
  return viewers.find(viewer => viewer.title === title) || (viewers.length === 1 ? viewers[0] : null);
}
const button = (doc, label) => doc?.querySelector(`button[aria-label="${label}"]`);
export const sceneWindow = frame => activeWorkspaceViewer(frame?.contentDocument)?.contentWindow;
export async function openWorkspaceScene(frame, scene, cancelled = () => false, indicate = async () => {}) {
  const doc = frame?.contentDocument;
  if (!doc || cancelled()) return false;
  button(sceneWindow(frame)?.document, "Stop frame loop")?.click();
  button(doc, "Back to app")?.click();
  button(doc, "Hide bottom dock")?.click();
  button(doc, "Hide right dock")?.click();
  const name = scene.title || scene.path.split("/").pop();
  const existing = [...doc.querySelectorAll('[role="tablist"][aria-label="Open structures"] [role="tab"]')].find(tab => tab.textContent.trim() === name);
  if (existing) { await indicate(existing); if (cancelled()) return false; existing.click(); return true; }
  if (scene.asset) {
    const win = sceneWindow(frame);
    if (!win?.__mqlPost) return false;
    const response = await fetch(scene.asset);
    if (!response.ok || cancelled()) return false;
    const text = await response.text();
    if (cancelled()) return false;
    win.__mqlPost("openSdfMolstarDocument", "Open SDF collection", {
      documentId: win.BuretteConfig?.documentId, title: scene.title,
      textBase64: btoa(text), controlLabel: "Pose",
    });
    return true;
  }
  for (let attempt = 0; attempt < 8 && !cancelled(); attempt++) {
    const item = doc.querySelector(`[data-sidebar-structure-path="${scene.path}"]`);
    if (item) { await indicate(item); if (cancelled()) return false; item.click(); return true; }
    button(doc, "Show sidebar")?.click();
    for (const control of doc.querySelectorAll('button[aria-label]')) {
      const label = control.getAttribute("aria-label");
      if (/^Show \d+ more files/.test(label) || (label.startsWith("Expand ") && scene.path.includes(label.slice(7)))) control.click();
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  return false;
}
export async function prepareWorkspaceScene(frame, scene, cancelled = () => false) {
  const name = scene.title || scene.path.split("/").pop();
  for (let attempt = 0; attempt < 100 && !cancelled(); attempt++) {
    const viewer = activeWorkspaceViewer(frame?.contentDocument);
    const win = viewer?.contentWindow;
    const title = frame?.contentDocument?.querySelector('[role="tablist"][aria-label="Open structures"] [aria-selected="true"]')?.textContent.trim();
    if (title === name && (win?.BuretteViewer?.plugin?.managers?.structure?.hierarchy?.current?.structures?.length || (scene.label === "Library" && win?.document.querySelector('.grid-card, .mol-card, [role="searchbox"], input[type="search"]')))) {
      return true;
    }
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  return false;
}
