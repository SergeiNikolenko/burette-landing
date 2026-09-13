export const workspaceScenes = [
  { label: "Structures", path: "/BuretteDemo/proteins/1HTB.pdb" },
  { label: "Molecules", path: "/BuretteDemo/small-molecules/multi-molecule.sdf" },
  { label: "Motion", path: "/BuretteDemo/structures/bimp.v000.xyz" },
  { label: "Crystals", path: "/BuretteDemo/crystals/caffeine.cif" },
];

// Use the published workspace's real file tree; keep this adapter separate from
// the landing UI so changes to the hosted shell have one integration boundary.
export async function openWorkspaceScene(frame, scene) {
  const doc = frame?.contentDocument;
  if (!doc) return false;
  const back = doc.querySelector('button[aria-label="Back to app"]');
  back?.click();
  for (let attempt = 0; attempt < 6; attempt++) {
    const item = doc.querySelector(`[data-sidebar-structure-path="${scene.path}"]`);
    if (item) { item.click(); return true; }
    doc.querySelector('button[aria-label="Show sidebar"]')?.click();
    for (const button of doc.querySelectorAll('button[aria-label]')) {
      const label = button.getAttribute('aria-label');
      if (/^Show \d+ more files/.test(label) || (label.startsWith("Expand ") && scene.path.includes(label.slice(7)))) button.click();
    }
    await new Promise(resolve => requestAnimationFrame(resolve));
  }
  return false;
}
