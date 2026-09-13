"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ThemedImage from "./themed-image";
import { activeWorkspaceViewer, openWorkspaceScene, prepareWorkspaceScene, showWorkspaceProperties, workspaceScenes } from "./workspace-presentation";

// The actual application owns the chart, axis choices and Grid selection. Only
// mount it on request, and release it when it leaves the screen.
export default function PropertyMap({ autoLoad = false }) {
  const [active, setActive] = useState(autoLoad);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [scale, setScale] = useState(1);
  const root = useRef(null);
  const frame = useRef(null);
  useEffect(() => {
    const size = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1280));
    size.observe(root.current);
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) setActive(false); }, { rootMargin: "200px" });
    observer.observe(root.current);
    return () => { size.disconnect(); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!active) return;
    setReady(false); setFailed(false);
    let cancelled = false, busy = false;
    const timeout = setTimeout(() => { if (!cancelled) { setFailed(true); cancelled = true; clearInterval(timer); } }, 45000);
    const timer = setInterval(async () => {
      if (busy || !activeWorkspaceViewer(frame.current?.contentDocument)?.contentWindow?.BuretteViewer?.plugin) return;
      busy = true;
      try {
        const library = workspaceScenes.find(scene => scene.label === "Library");
        if (!await openWorkspaceScene(frame.current, library, () => cancelled) || !await prepareWorkspaceScene(frame.current, library, () => cancelled) || cancelled) return;
        const doc = frame.current.contentDocument;
        doc.querySelector('button[aria-label="Hide sidebar"]')?.click();
        if (await showWorkspaceProperties(frame.current, () => cancelled) && !cancelled) {
          setReady(true); clearTimeout(timeout); clearInterval(timer);
        }
      } catch { if (!cancelled) { setFailed(true); clearInterval(timer); clearTimeout(timeout); } }
      finally { busy = false; }
    }, 400);
    return () => { cancelled = true; clearInterval(timer); clearTimeout(timeout); };
  }, [active]);
  return <div className="real-property-workspace" ref={root}>
    {active ? <><iframe ref={frame} src="/web-demo/index.html?presentation=library" title="Chemical Space in the Burette workspace" style={{ width: 1280, height: 800, transform: `scale(${scale})` }} />
      {!ready && <div className="workspace-demo-loading" role="status">{failed ? <Button onClick={() => setActive(false)}>Close and try again</Button> : "Opening Chemical Space in Burette…"}</div>}
      <Button className="property-close" variant="secondary" size="sm" onClick={() => setActive(false)}>Close preview</Button></>
      : <><ThemedImage light="/assets/chemical-space-light.png" dark="/assets/chemical-space-dark.png" alt="Chemical Space in the Burette app" width={1804} height={1262} />
        <Button className="property-open pill-button" onClick={() => setActive(true)}>Explore Chemical Space</Button></>}
  </div>;
}
