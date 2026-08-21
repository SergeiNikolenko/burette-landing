"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// The old page attached `autoplay preload="metadata"` to a 19 MB clip and then
// called play() at mount plus ten more times on a 500 ms interval, so it was
// fetched in full on every visit - including the visits that never scrolled
// this far, and the ones on a phone tethered to a hotspot. The file is under a
// megabyte now, but "small" is not a reason to spend it before it is wanted.
//
// preload="none" means the poster is the only byte cost until the block is
// actually on screen; the observer then starts the download and the playback in
// one gesture, and pauses again when the block leaves. Controls stay on, so the
// clip is still reachable when autoplay is refused or motion is unwelcome.
export default function LazyVideo({
  src,
  poster,
  label,
  width,
  height,
  className,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = "auto";
          // A rejected play() is the browser exercising its autoplay policy,
          // not an error: the controls are already there to recover with.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      aria-label={label}
      preload="none"
      muted
      loop
      controls
      playsInline
      className={cn("w-full", className)}
    />
  );
}
