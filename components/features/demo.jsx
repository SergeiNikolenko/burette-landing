"use client";

import { useEffect, useRef } from "react";
import "./demo.css";
import media from "./media-sizes.json";

export default function Demo({ id, title }) {
  const video = useRef(null);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection;
    const automatic = () => !motion.matches && !connection?.saveData && !/2g/.test(connection?.effectiveType || "");
    let visible = false;
    const play = () => {
      if (!element.getAttribute("src")) element.src = `/assets/features/${id}.mp4`;
      element.defaultPlaybackRate = 0.8;
      element.playbackRate = 0.8;
      element.play().catch(() => {});
    };
    const update = () => {
      if (visible && !document.hidden && automatic()) play();
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
  const size = media[id];
  return <figure className="integrated-demo">
    <video ref={video} data-feature-demo width={size.width} height={size.height} poster={`/assets/features/${id}.jpg`} muted loop playsInline preload="none" aria-label={title}
      onPlay={() => { document.querySelectorAll("video[data-feature-demo]").forEach(other => { if (other !== video.current) other.pause(); }); }} />
  </figure>;
}
