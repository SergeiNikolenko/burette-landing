import { workspaceScenes } from "./workspace-scenes";
export { workspaceScenes } from "./workspace-scenes";

export function activeWorkspaceViewer(doc) {
  return doc?.querySelector('.page-surface[data-active="true"] iframe.viewer-iframe:not([data-read-only="true"])');
}
const button = (doc, label) => doc?.querySelector(`button[aria-label="${label}"]`);
export const sceneWindow = frame => activeWorkspaceViewer(frame?.contentDocument)?.contentWindow;
export async function showWorkspaceProperties(frame, cancelled = () => false) {
  const doc = frame?.contentDocument;
  button(doc, "Hide right dock")?.click();
  button(doc, "Show bottom dock")?.click();
  for (let attempt = 0; attempt < 100 && !cancelled(); attempt++) {
    const tab = [...doc.querySelectorAll('[role="tab"]')].find(tab => tab.textContent.trim() === "Chemical Space");
    if (tab && tab.getAttribute("aria-selected") !== "true") tab.click();
    button(doc, "Plot molecular properties")?.click();
    if (doc.querySelector('[data-property-point]')) {
      const divider = doc.querySelector('[role="separator"][aria-label="Resize bottom dock"]');
      divider?.focus({ preventScroll: true });
      for (let step = 0; step < 5 && Number(divider?.getAttribute("aria-valuenow")) > 50 && !cancelled(); step++) {
        divider.dispatchEvent(new doc.defaultView.KeyboardEvent("keydown", { key: "ArrowUp", code: "ArrowUp", bubbles: true, cancelable: true }));
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      return !cancelled();
    }
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  return false;
}
export async function openWorkspaceScene(frame, scene, cancelled = () => false) {
  const doc = frame?.contentDocument;
  if (!doc || cancelled()) return false;
  button(sceneWindow(frame)?.document, "Stop frame loop")?.click();
  button(doc, "Back to app")?.click();
  button(doc, "Hide bottom dock")?.click();
  button(doc, "Hide right dock")?.click();
  const name = scene.title || scene.path.split("/").pop();
  const existing = [...doc.querySelectorAll('[role="tablist"][aria-label="Open structures"] [role="tab"]')].find(tab => tab.textContent.trim() === name);
  if (existing) { existing.click(); return true; }
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
    if (item) { item.click(); return true; }
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
