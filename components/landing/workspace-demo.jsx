"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function WorkspaceDemo() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const frame = useRef(null);
  useEffect(() => {
    if (!open) return;
    setReady(false);
    setFailed(false);
    let cancelled = false;
    const deadline = setTimeout(() => { setFailed(true); clearInterval(timer); }, 45000);
    const timer = setInterval(async () => {
      try {
        const viewer = frame.current?.contentDocument?.querySelector("iframe.viewer-iframe");
        const agent = viewer?.contentWindow?.BuretteAgent;
        if (!agent) return;
        const state = await agent.run({ command: "capabilities" });
        if (!cancelled && state.ok && state.result.ready) {
          setReady(true);
          clearTimeout(deadline);
          clearInterval(timer);
        }
      } catch { /* A frame can navigate while the startup check is running. */ }
    }, 500);
    return () => { cancelled = true; clearInterval(timer); clearTimeout(deadline); };
  }, [open]);
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button variant="ghost" size="lg" className="pill-button" data-analytics-event="Online Demo" data-analytics-location="hero" data-analytics-target="embedded-demo">Try in your browser</Button>
    </DialogTrigger>
    <DialogContent className="workspace-demo-dialog">
      <div className="workspace-demo-heading">
        <DialogTitle>Burette</DialogTitle>
        <a href="/demo" target="_blank" rel="noopener noreferrer">Open separately ↗</a>
      </div>
      <DialogDescription className="sr-only">Explore the real Burette workspace with sample structures. Close this dialog to return to the page.</DialogDescription>
      <div className="workspace-demo-stage">
        <iframe ref={frame} src="/web-demo/index.html" title="Burette browser workspace" />
        {!ready && <div className="workspace-demo-loading" role="status">
          {failed ? <>The workspace could not start here. <a href="/demo" target="_blank" rel="noopener noreferrer">Open it separately ↗</a></> : "Opening Burette…"}
        </div>}
      </div>
    </DialogContent>
  </Dialog>;
}
