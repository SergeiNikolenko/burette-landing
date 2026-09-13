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

    };
    addEventListener("message", handle);
    return () => { clearTimeout(timeout); removeEventListener("message", handle); };
  }, [mounted, theme]);

  const start = () => { setMounted(true); setInteractive(true); };
  return (
    <div ref={root} id={id} className={`live-scene live-scene-${scene}`} data-status={status}>
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
      {status === "error" && <Button variant="ghost" onClick={start}>Reload preview</Button>}

    </div>
  );
}
