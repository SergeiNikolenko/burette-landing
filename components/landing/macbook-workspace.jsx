"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import WorkspaceDemo from "./workspace-demo";
import ProductShot from "./product-shot";
import { pointAtControl } from "./presentation-pointer";
import { playWorkspaceStory } from "./workspace-choreography";
import { activeWorkspaceViewer, openWorkspaceScene, prepareWorkspaceScene, workspaceScenes } from "./workspace-presentation";

export default function MacbookWorkspace() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = matchMedia("(min-width: 900px)");
    const sync = () => setDesktop(query.matches);
    sync(); query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return <div id="live-demo">{desktop ? <DesktopPresentation /> : <div className="mobile-workspace-preview">
    <ProductShot light="/assets/main-light.png" dark="/assets/main-dark.png" alt="Burette molecular workspace" width={1804} height={1262} ratio="1804 / 1262" priority />
  </div>}</div>;
}

function DesktopPresentation() {
  const root = useRef(null);
  const screen = useRef(null);
  const frame = useRef(null);
  const pointer = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [theme, setTheme] = useState("light");
  const [playing, setPlaying] = useState(true);
  const [scene, setScene] = useState(0);
  const [viewport, setViewport] = useState({ width: 1280, height: 800, scale: 1 });
  const [switching, setSwitching] = useState(false);
  const userActive = useRef(false);
  const readyRef = useRef(false);
  const transition = useRef(0);
  const changing = useRef(false);
  const story = useRef(null);
  const paused = () => { if (pointer.current) pointer.current.dataset.visible = "false"; story.current?.abort(); transition.current++; userActive.current = true; setPlaying(false); };
  useEffect(() => {
    const sync = () => {
      const next = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
      try {
        const saved = JSON.parse(localStorage.getItem("burette.shell") || "{}");
        localStorage.setItem("burette.shell", JSON.stringify({ ...saved, state: { ...saved.state, preferences: { ...saved.state?.preferences, theme: next } } }));
      } catch { /* The workspace can still use its system theme. */ }
      setTheme(next);
      setMounted(true);
    };
    sync();
    setPlaying(!matchMedia("(prefers-reduced-motion: reduce)").matches);
    const themes = new MutationObserver(sync);
    themes.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(root.current);
    const resize = new ResizeObserver(([entry]) => {
      const width = Math.max(960, Math.min(1440, Math.round(entry.contentRect.width)));
      const scale = entry.contentRect.width / width;
      setViewport({ width, height: Math.round(entry.contentRect.height / scale - 26), scale });
    });
    resize.observe(screen.current);
    return () => { themes.disconnect(); observer.disconnect(); resize.disconnect(); };
  }, []);
  useEffect(() => {
    if (!mounted) return;
    transition.current++;
    setReady(false); readyRef.current = false; setFailed(false); setScene(0);
    const attached = new Set();
    const onInput = event => { if (event.isTrusted) paused(); };
    const attach = doc => {
      if (!doc || attached.has(doc)) return;
      attached.add(doc);
      for (const type of ["pointerdown", "keydown"]) doc.addEventListener(type, onInput, { capture: true, passive: true });
    };
    let checking = false;
    let alive = true;
    const timer = setInterval(async () => {
      if (checking) return;
      checking = true;
      try {
        const doc = frame.current?.contentDocument;
        const viewer = activeWorkspaceViewer(doc);
        const currentDocs = [doc, viewer?.contentDocument];
        for (const old of attached) if (!currentDocs.includes(old)) {
          for (const type of ["pointerdown", "keydown"]) old.removeEventListener(type, onInput, true);
          attached.delete(old);
        }
        currentDocs.forEach(attach);
        const state = !readyRef.current && await viewer?.contentWindow?.BuretteAgent?.run({ command: "capabilities" });
        if (alive && state?.ok && state.result.ready) { setReady(true); readyRef.current = true; clearTimeout(deadline); }
      } catch { /* The selected document may be changing. */ }
      finally { checking = false; }
    }, 700);
    const deadline = setTimeout(() => { if (alive) setFailed(true); }, 45000);
    return () => {
      alive = false; clearInterval(timer); clearTimeout(deadline);
      for (const doc of attached) for (const type of ["pointerdown", "keydown"]) doc.removeEventListener(type, onInput, true);
    };
  }, [mounted, theme]);
  useEffect(() => {
    if (!visible) {
      for (const viewer of frame.current?.contentDocument?.querySelectorAll("iframe.viewer-iframe") || []) {
        viewer.contentDocument?.querySelector('button[aria-label="Stop frame loop"]')?.click();
      }
    }
  }, [visible]);
  useEffect(() => {
    if (!playing || !visible || !ready || changing.current) return;
    const controller = new AbortController();
    story.current = controller;
    const token = ++transition.current;
    const cancelled = () => controller.signal.aborted || transition.current !== token;
    (async () => {
      try {
        if (!await prepareWorkspaceScene(frame.current, workspaceScenes[scene], cancelled)) {
          if (!cancelled()) setPlaying(false);
          return;
        }
        if (cancelled()) return;
        await playWorkspaceStory(frame.current, workspaceScenes[scene], controller.signal, element => pointAtControl(frame.current, pointer.current, element, cancelled));
        if (cancelled()) return;
        const next = (scene + 1) % workspaceScenes.length;
        setSwitching(true);
        await new Promise(resolve => setTimeout(resolve, 180));
        if (cancelled()) return;
        const opened = await openWorkspaceScene(frame.current, workspaceScenes[next], cancelled, element => pointAtControl(frame.current, pointer.current, element, cancelled))
          && await prepareWorkspaceScene(frame.current, workspaceScenes[next], cancelled);
        if (cancelled()) return;
        setSwitching(false);
        if (opened) setScene(next);
        else if (!cancelled()) setPlaying(false);
      } catch (error) {
        if (!cancelled()) { console.warn("Presentation paused:", error.message); setPlaying(false); }
      }
    })();
    return () => { controller.abort(); if (pointer.current) pointer.current.dataset.visible = "false"; setSwitching(false); };
  }, [playing, visible, ready, scene]);
  const choose = async index => {
    paused();
    const token = transition.current;
    const cancelled = () => transition.current !== token;
    changing.current = true;
    setSwitching(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 180));
      if (cancelled()) return;
      if (await openWorkspaceScene(frame.current, workspaceScenes[index], cancelled)
        && await prepareWorkspaceScene(frame.current, workspaceScenes[index], cancelled) && !cancelled()) {
        changing.current = false;
        setScene(index); userActive.current = false; setPlaying(true);
      }
    } finally { changing.current = false; setSwitching(false); }
  };
  return <div ref={root} className="macbook-workspace">
    <div className="macbook-product">
      <div className="macbook-camera-band" aria-hidden="true" />
      <div ref={screen} className="macbook-screen" data-switching={switching}>
        {mounted && <iframe key={theme} ref={frame} src={`/web-demo/index.html?presentation=${theme}`} title="Burette complete interactive workspace" style={{ width: viewport.width, height: viewport.height, top: 26 * viewport.scale, transform: `scale(${viewport.scale})` }} />}
        <svg ref={pointer} className="presentation-pointer" viewBox="0 0 24 30" width="19" height="24" aria-hidden="true"><path d="M3 2v22l6-5 4 9 4-2-4-8h8Z" fill="#202124" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" /></svg>
        {!ready && <div className="macbook-loading" role="status">{failed ? "Open the workspace to try Burette." : "Opening Burette…"}</div>}
      </div>
      <img className="macbook-product-bezel" src={`/assets/devices/macbook-pro-${theme === "dark" ? "space-black" : "silver"}.png`} alt="MacBook Pro showing Burette" width={4260} height={2840} />
    </div>
    <div className="presentation-controls">
      <div role="group" aria-label="Workspace examples">
        {workspaceScenes.map((item, index) => <button key={item.label} disabled={!ready} onClick={() => choose(index)} aria-label={`Show ${item.label.toLowerCase()}`} aria-pressed={scene === index}><span /></button>)}
      </div>
      <Button variant="ghost" size="sm" disabled={!ready} onClick={() => { userActive.current = false; setPlaying(!playing); }}>{playing ? "Pause presentation" : "Play presentation"}</Button>
      <WorkspaceDemo label="Open workspace" />
    </div>
  </div>;
}
