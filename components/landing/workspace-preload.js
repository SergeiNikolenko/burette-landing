// Warm only the desktop presentation resources; do not create hidden renderers.
export async function preloadWorkspaceResources(signal) {
  const urls = [
    "/live-data/imatinib-poses.sdf",
    "/burette-viewer/rdkit/RDKit_minimal.js",
    "/burette-viewer/rdkit/RDKit_minimal.wasm",
    "/burette-viewer/grid.css",
    "/burette-viewer/grid-ui.js",
    "/burette-viewer/grid-viewer.js",
  ];
  async function warm() {
    while (urls.length && !signal.aborted) {
      const url = urls.shift();
      try {
        const response = await fetch(url, { signal, cache: "force-cache", priority: "low" });
        if (response.ok) await response.arrayBuffer();
      } catch { /* Normal scene loading remains the fallback. */ }
    }
  }
  await Promise.all([warm(), warm()]);
}
