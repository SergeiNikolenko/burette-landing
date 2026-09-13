"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import WorkspaceDemo from "./workspace-demo";
import { playWorkspaceStory } from "./workspace-choreography";
import { activeWorkspaceViewer, openWorkspaceScene, prepareWorkspaceScene, workspaceScenes } from "./workspace-presentation";

export default function MacbookWorkspace() {
  const root = useRef(null);
  const screen = useRef(null);
  const frame = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [theme, setTheme] = useState("light");
  const [playing, setPlaying] = useState(true);
  const [scene, setScene] = useState(0);
  const [scale, setScale] = useState(1);
  const userActive = useRef(false);
  const readyRef = useRef(false);
  const transition = useRef(0);
  const changing = useRef(false);
  const story = useRef(null);
  const paused = () => { story.current?.abort(); transition.current++; userActive.current = true; setPlaying(false); };
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
    setPlaying(true);
    const themes = new MutationObserver(sync);
    themes.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(root.current);
    const resize = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1280));
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
        await playWorkspaceStory(frame.current, workspaceScenes[scene], controller.signal);
        if (cancelled()) return;
        const next = (scene + 1) % workspaceScenes.length;
        const opened = await openWorkspaceScene(frame.current, workspaceScenes[next], cancelled);
        if (opened) setScene(next);
        else if (!cancelled()) setPlaying(false);
      } catch (error) {
        if (!cancelled()) { console.warn("Presentation paused:", error.message); setPlaying(false); }
      }
    })();
    return () => controller.abort();
  }, [playing, visible, ready, scene]);
  const choose = async index => {
    paused();
    const token = transition.current;
    const cancelled = () => transition.current !== token;
    changing.current = true;
    try {
      if (await openWorkspaceScene(frame.current, workspaceScenes[index], cancelled)
        && await prepareWorkspaceScene(frame.current, workspaceScenes[index], cancelled) && !cancelled()) {
        changing.current = false;
        setScene(index); userActive.current = false; setPlaying(true);
      }
    } finally { changing.current = false; }
  };
  return <div ref={root} id="live-demo" className="macbook-workspace">
    <div className="macbook-product">
      <div className="macbook-camera-band" aria-hidden="true" />
      <div ref={screen} className="macbook-screen">
        {mounted && <iframe key={theme} ref={frame} src={`/web-demo/index.html?presentation=${theme}`} title="Burette complete interactive workspace" style={{ width: 1280, height: 800, top: 26 * scale, transform: `scale(${scale})` }} />}
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
