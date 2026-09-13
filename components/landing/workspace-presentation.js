export const workspaceScenes = [
  { label: "Structures", path: "/BuretteDemo/proteins/1HTB.pdb" },
  { label: "Molecules", path: "/BuretteDemo/small-molecules/multi-molecule.sdf", title: "caffeine-water.sdf" },
  { label: "Motion", path: "/BuretteDemo/structures/bimp.v000.xyz" },
  { label: "Crystals", path: "/BuretteDemo/crystals/caffeine.cif" },
];

export function activeWorkspaceViewer(doc) {
  const title = doc?.querySelector('[role="tablist"][aria-label="Open structures"] [aria-selected="true"]')?.textContent;
  return [...(doc?.querySelectorAll("iframe.viewer-iframe") || [])].find(viewer => viewer.title === title);
}

// Use the published workspace's real file tree; keep this adapter separate from
// the landing UI so changes to the hosted shell have one integration boundary.
export async function openWorkspaceScene(frame, scene) {
  const doc = frame?.contentDocument;
  if (!doc) return false;
  activeWorkspaceViewer(doc)?.contentDocument?.querySelector('button[aria-label="Stop frame loop"]')?.click();
  const back = doc.querySelector('button[aria-label="Back to app"]');
  back?.click();
  for (let attempt = 0; attempt < 6; attempt++) {
    const item = doc.querySelector(`[data-sidebar-structure-path="${scene.path}"]`);
    if (item) {
      if (scene.label === "Molecules") {
        const existing = [...doc.querySelectorAll('[role="tab"]')].find(tab => tab.textContent.includes(scene.title));
        if (existing) { existing.click(); return true; }
        const win = activeWorkspaceViewer(doc)?.contentWindow;
        if (!win?.__mqlPost) return false;
        const response = await fetch("/live-data/caffeine-water.sdf");
        if (!response.ok) return false;
        const text = await response.text();
        win.__mqlPost("openSdfMolstarDocument", "Open SDF collection", {
          documentId: win.BuretteConfig?.documentId, title: scene.title,
          textBase64: btoa(text), controlLabel: "Molecule",
        });
        return true;
      }
      item.click(); return true;
    }
    doc.querySelector('button[aria-label="Show sidebar"]')?.click();
    for (const button of doc.querySelectorAll('button[aria-label]')) {
      const label = button.getAttribute('aria-label');
      if (/^Show \d+ more files/.test(label) || (label.startsWith("Expand ") && scene.path.includes(label.slice(7)))) button.click();
    }
    await new Promise(resolve => requestAnimationFrame(resolve));
  }
  return false;
}

// Wait for the selected document, not merely the previous viewer's readiness.
export async function prepareWorkspaceScene(frame, scene, cancelled = () => false) {
  const name = scene.title || scene.path.split("/").pop();
  let individualFrames = false;
  for (let attempt = 0; attempt < 80 && !cancelled(); attempt++) {
    const doc = frame?.contentDocument;
    const viewer = activeWorkspaceViewer(doc);
    const win = viewer?.contentWindow;
    const selected = doc?.querySelector('[role="tab"][aria-selected="true"]')?.textContent;
    const config = win?.BuretteConfig;
    const source = config?.sourcePath || config?.label || "";
    if (selected?.includes(name) && source.includes(name)) {
      const controls = viewer.contentDocument;
      const all = [...controls.querySelectorAll("button")].find(button => button.textContent.trim() === "All");
      if (scene.label === "Molecules" && all && !all.disabled) {
        if (all.getAttribute("aria-pressed") !== "true") all.click();
        return true;
      }
      if (scene.label === "Motion") {
        if (!individualFrames && all?.getAttribute("aria-pressed") === "true") {
          all.click();
          individualFrames = true;
        } else {
          const play = controls.querySelector('button[aria-label="Play frame loop"]');
          if (play && !play.disabled) play.click();
          if (controls.querySelector('button[aria-label="Stop frame loop"]')) return true;
        }
      } else if (scene.label !== "Molecules" && controls.querySelector("canvas")) return true;
    }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  return false;
}
