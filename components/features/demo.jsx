"use client";

import { useEffect, useRef, useState } from "react";
import "./demo.css";

export default function Demo({ id, title }) {
  const video = useRef(null);
  const manualPause = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection;
    const automatic = () => !motion.matches && !connection?.saveData && !/2g/.test(connection?.effectiveType || "");
    let visible = false;
    const play = () => {
      if (!element.getAttribute("src")) element.src = `/assets/features/${id}.mp4`;
      element.play().catch(() => setPlaying(false));
    };
    const update = () => {
      if (visible && !document.hidden && automatic() && !manualPause.current) play();
      else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= .5;
      update();
    }, { threshold: [0, .5] });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); motion.removeEventListener("change", update); element.pause(); };
  }, [id]);
  if (!id) return <p className="feature-media-pending">Video walkthrough coming soon.</p>;
  return <figure className="integrated-demo">
    <video ref={video} data-feature-demo poster={`/assets/features/${id}.jpg`} muted loop playsInline preload="none" aria-label={title}
      onPlay={() => { document.querySelectorAll("video[data-feature-demo]").forEach(other => { if (other !== video.current) other.pause(); }); setPlaying(true); }}
      onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }} />
    <figcaption><span>{title}</span>{failed ? <span>Video unavailable</span> : <button aria-label={`${playing ? "Pause" : "Play"} ${title}`} onClick={() => {
      const element = video.current;
      manualPause.current = playing;
      if (playing) element.pause();
      else { if (!element.getAttribute("src")) element.src = `/assets/features/${id}.mp4`; element.play().catch(() => setPlaying(false)); }
    }}>{playing ? "Pause" : "Play"}</button>}</figcaption>
  </figure>;
}
