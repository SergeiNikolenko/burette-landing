"use client";

import { useEffect, useRef, useState } from "react";
import "./demo.css";
import media from "./media-sizes.json";

function VideoScene({ id, title, size }) {
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const element = video.current;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection;
    const automatic = () => !motion.matches && !connection?.saveData && !/2g/.test(connection?.effectiveType || "");
    let visible = false;
    let near = false;
    const prepare = () => {
      if (!element.getAttribute("src")) {
        element.preload = "metadata";
        element.src = `/assets/features/${id}.mp4`;
      }
      element.defaultPlaybackRate = 0.8;
      element.playbackRate = 0.8;
    };
    const update = () => {
      if (!document.hidden && automatic()) {
        if (near || visible) prepare();
        if (visible) { element.play().catch(() => {}); return; }
      }
      element.pause();
    };
    const warmup = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      update();
    }, { rootMargin: "400px 0px" });
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= .15;
      update();
    }, { threshold: [0, .15] });
    warmup.observe(element);
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", update);
    connection?.addEventListener?.("change", update);
    return () => {
      warmup.disconnect(); observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      motion.removeEventListener("change", update);
      connection?.removeEventListener?.("change", update);
      element.pause();
    };
  }, [id]);
  return <figure className="integrated-demo">
    <div className="demo-frame" style={{ aspectRatio: `${size.width} / ${size.height}` }}>
      <img className="demo-poster" src={size.poster || `/assets/features/${id}.jpg`} alt="" width={size.width} height={size.height} loading="lazy" decoding="async" />
      <video ref={video} data-feature-demo width={size.width} height={size.height} muted loop playsInline preload="none" aria-label={title} style={{ opacity: playing ? 1 : 0 }}
        onPlaying={() => setPlaying(true)} onError={() => setPlaying(false)} />
    </div>
  </figure>;
}

export default function Demo({ id, title }) {
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    const sync = () => setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  if (!id) return null;
  const size = media[id];
  const sourceId = size[theme || "light"] || id;
  return <VideoScene key={sourceId} id={sourceId} title={title} size={media[sourceId] || size} />;
}
