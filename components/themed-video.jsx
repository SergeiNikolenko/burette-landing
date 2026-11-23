"use client";

import { useEffect, useRef, useState } from "react";

function resolveTheme(themeSource) {
  if (typeof document === "undefined") return "light";
  const root = document.documentElement;
  const useLandingTheme =
    themeSource === "data-theme" ||
    (themeSource === "auto" && Boolean(document.querySelector(".landing")));

  if (useLandingTheme) {
    const dataTheme = root.getAttribute("data-theme");
    if (dataTheme === "dark" || dataTheme === "light") return dataTheme;
  } else {
    if (root.classList.contains("dark")) return "dark";
    if (root.classList.contains("light")) return "light";
    const dataTheme = root.getAttribute("data-theme");
    if (dataTheme === "dark" || dataTheme === "light") return dataTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemedVideo({
  light,
  dark,
  lightPoster,
  darkPoster,
  src,
  poster,
  ariaLabel,
  className,
  style,
  themeSource = "auto",
}) {
  const videoRef = useRef(null);
  const pendingResumeRef = useRef(null);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const sync = () => {
      const next = resolveTheme(themeSource);
      setTheme((prev) => {
        if (prev && prev !== next) {
          const el = videoRef.current;
          if (el && el.readyState > 0 && el.currentTime > 0) {
            pendingResumeRef.current = {
              time: el.currentTime,
              playing: !el.paused && !el.ended,
            };
          }
        }
        return next;
      });
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, [themeSource]);

  const activeSrc = theme
    ? theme === "dark"
      ? dark || src || light
      : light || src || dark
    : undefined;

  const activePoster = theme
    ? theme === "dark"
      ? darkPoster || poster || lightPoster
      : lightPoster || poster || darkPoster
    : undefined;

  return (
    <video
      key={activeSrc || "pending"}
      ref={videoRef}
      controls
      playsInline
      preload="metadata"
      src={activeSrc}
      poster={activePoster}
      aria-label={ariaLabel}
      className={className}
      style={style}
      onLoadedMetadata={(event) => {
        const resume = pendingResumeRef.current;
        if (!resume) return;
        pendingResumeRef.current = null;
        const el = event.currentTarget;
        const targetTime = Number.isFinite(el.duration)
          ? Math.min(resume.time, Math.max(0, el.duration - 0.05))
          : resume.time;
        try {
          el.currentTime = targetTime;
        } catch {}
        if (resume.playing) {
          el.play().catch(() => {});
        }
      }}
    />
  );
}
