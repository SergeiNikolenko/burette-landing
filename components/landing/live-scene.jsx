"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ThemedImage from "./themed-image";

export default function LiveScene({ scene, label, light, dark, autoLoad = false, id, selection }) {
  const root = useRef(null);
  const frame = useRef(null);
  const camera = useRef(null);
  const visible = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState("idle");
  const [interactive, setInteractive] = useState(scene === "motion");
  const [theme, setTheme] = useState("light");
  const [action, setAction] = useState(null);
  const [notice, setNotice] = useState("");
  const send = (type, detail = {}) => frame.current?.contentWindow?.postMessage(
    { source: "burette-landing-host", type, ...detail }, window.location.origin,
  );

  useEffect(() => {
    if (selection) { setMounted(true); setInteractive(true); }
  }, [selection]);

  useEffect(() => {
    if (status === "ready") send("interaction", { enabled: interactive });
  }, [status, interactive]);

  useEffect(() => {
    if (status === "ready" && selection) send("select", { indexes: [selection.index], filterToSelection: true });
  }, [selection, status]);

  useEffect(() => {
    const sync = () => setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let releaseTimer;
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      clearTimeout(releaseTimer);
      if (entry.isIntersecting && autoLoad) setMounted(true);
      if (!entry.isIntersecting && frame.current) {
        send("suspend");
        setInteractive(false);
        releaseTimer = setTimeout(() => {
          if (!visible.current) { setMounted(false); setStatus("idle"); }
        }, 600);
      }
    }, { rootMargin: "240px 0px" });
    observer.observe(root.current);
    return () => { clearTimeout(releaseTimer); observer.disconnect(); };
  }, [autoLoad]);

  useEffect(() => {
    if (!mounted) return;
    setStatus("loading");
    setAction(null);
    setNotice("");
    const timeout = setTimeout(() => { setStatus("error"); setMounted(false); }, 45000);
    const handle = (event) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow) return;
      const data = event.data;
      if (data?.source !== "burette-landing-scene") return;
      if (data.type === "ready") {
        clearTimeout(timeout);
        setStatus("ready");
        if (camera.current) send("restore", { camera: camera.current });
      }
      if (data.type === "suspended" && !visible.current) {
        camera.current = data.camera || null;
        setMounted(false);
        setStatus("idle");
      }
      if (data.type === "error") { clearTimeout(timeout); setStatus("error"); setMounted(false); }
      if (data.type === "action-result") {
        setAction(null);
        setNotice(data.ok ? { overview: "Whole structure in view.", ligand: "Ligand in focus.", surface: "Molecular surface shown.", frames: "20 original frames. Play or step through them above.", smooth: "Smoothed motion · 80 interpolated frames.", all: "All 20 original frames overlaid in one view." }[data.action] || "" : "That view could not be shown. Try resetting the scene.");
      }
    };
    addEventListener("message", handle);
    return () => { clearTimeout(timeout); removeEventListener("message", handle); };
  }, [mounted, theme]);

  useEffect(() => {
    if (!action) return;
    const timeout = setTimeout(() => {
      setAction(null);
      setNotice("This view is taking too long. Try another view.");
    }, 15000);
    return () => clearTimeout(timeout);
  }, [action]);

  const start = () => { setMounted(true); setInteractive(true); };
  const run = (name) => { setInteractive(true); setAction(name); send("action", { action: name }); };
  return (
    <div ref={root} id={id} className={`live-scene live-scene-${scene}`} data-status={status}>
      <div className="live-scene-bar">
        <span>{label}</span>
        <Button variant="ghost" size="sm" onClick={interactive ? () => setInteractive(false) : start}>
          {interactive ? "Done exploring" : status === "ready" ? "Explore" : "Try it live"}
        </Button>
      </div>
      <div className="live-scene-display">
      <div className="live-scene-viewport">
        {scene !== "motion" && <ThemedImage light={light} dark={dark} alt={label} width={1804} height={1262} className="live-poster" sizes="(min-width: 1200px) 1200px, 94vw" priority={autoLoad} />}
        {mounted && <iframe
          ref={frame}
          src={`/live/${scene}?theme=${theme}&v=2`}
          title={`Interactive Burette: ${label}`}
          className={status === "ready" ? "scene-ready" : ""}
          tabIndex={interactive ? 0 : -1}
          inert={!interactive}
          style={{ pointerEvents: interactive ? "auto" : "none" }}
        />}
        {!interactive && status === "ready" && <button className="scene-activate" onClick={start} aria-label={`Interact with ${label}`} />}
      </div>
      </div>
      <div className="live-scene-tools">
        {scene === "structure" && status === "ready" ? <div role="group" aria-label="Structure views">
          <Button variant="ghost" size="sm" disabled={!!action} onClick={() => run("overview")}>Whole structure</Button>
          <Button variant="ghost" size="sm" disabled={!!action} onClick={() => run("ligand")}>Focus on a ligand</Button>
          <Button variant="ghost" size="sm" disabled={!!action} onClick={() => run("surface")}>Show surface</Button>
        </div> : scene === "motion" && status === "ready" ? <div role="group" aria-label="Motion views">
          <Button variant="ghost" size="sm" disabled={!!action} onClick={() => run("frames")}>Original frames</Button>
          <Button variant="ghost" size="sm" disabled={!!action} onClick={() => run("smooth")}>Smooth motion</Button>
          <Button variant="ghost" size="sm" disabled={!!action} onClick={() => run("all")}>All · overlay</Button>
        </div> : <span>{scene === "motion" ? "20 frames · vibrational-mode example" : scene === "collection" ? "48 molecules · search, select and compare" : "A real structure, rendered with Burette."}</span>}
        <span role="status" className="live-scene-status">
          {status === "loading" ? "Preparing the scene…" : status === "error" ? "Scene unavailable. Please try again." : notice}
        </span>
      </div>
    </div>
  );
}
