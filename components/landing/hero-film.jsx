"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// The launch film plays muted in the hero, then hands over to the workspace.
// Reduced motion and Data Saver keep the poster until the visitor presses Play.
// It pauses while it is off screen or the tab is in the background.
// Clicking the film replays it full screen with sound and native controls.
export function useHeroFilm() {
  const [video, setVideo] = useState(null);
  const position = useRef(0);
  const [film, setFilm] = useState(true);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(true);
  const [failed, setFailed] = useState(false);
  const [ending, setEnding] = useState(false);

  useLayoutEffect(() => {
    const connection = navigator.connection;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let initial = true;
    const sync = () => {
      const restricted = motion.matches || !!connection?.saveData;
      if (initial || restricted) setPaused(restricted);
      initial = false;
    };
    sync();
    motion.addEventListener("change", sync);
    connection?.addEventListener?.("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      connection?.removeEventListener?.("change", sync);
    };
  }, []);

  useEffect(() => {
    const element = video;
    if (!film || !element) return;
    const bounds = element.getBoundingClientRect();
    let alive = true;
    let onScreen = bounds.bottom > 0 && bounds.top < innerHeight &&
      bounds.right > 0 && bounds.left < innerWidth;
    const sync = () => {
      if (!onScreen || document.hidden || paused) return element.pause();
      element.play().catch((error) => {
        if (!alive) return;
        if (error.name === "NotAllowedError" || error.name === "NotSupportedError") setPaused(true);
        if (error.name === "NotSupportedError") setFailed(true);
      });
    };
    const guardPlayback = () => {
      if (!onScreen || document.hidden || paused) element.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    observer.observe(element);
    element.addEventListener("play", guardPlayback);
    document.addEventListener("visibilitychange", sync);
    // Start immediately when visible; do not wait for the observer's first callback.
    sync();
    return () => {
      alive = false;
      observer.disconnect();
      element.removeEventListener("play", guardPlayback);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [film, video, paused]);

  useEffect(() => {
    if (!video) return;
    const sync = () => {
      video.controls = document.fullscreenElement === video;
      setMuted(video.muted);
    };
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, [video]);

  return {
    playing: film,
    // Give the film a head start before warming the workspace underneath it.
    ending: !film || ending,
    video: setVideo,
    muted,
    paused,
    failed,
    togglePause: () => {
      if (!paused) { setPaused(true); video?.pause(); return; }
      if (failed || video?.error) video?.load();
      setFailed(false);
      setPaused(false);
      // Keep play() in the user gesture for browsers that refuse autoplay.
      video?.play().catch((error) => {
        if (error.name !== "AbortError") setPaused(true);
      });
    },
    toggleSound: () => setMuted((value) => !value),
    watch: () => {
      if (!video) return;
      if (failed || video.error) video.load();
      position.current = 0;
      video.currentTime = 0;
      // Unmute, play and enter full screen inside the click gesture.
      video.muted = false;
      setMuted(false);
      setFailed(false);
      setPaused(false);
      video.play().catch((error) => {
        if (error.name !== "AbortError") setPaused(true);
      });
      if (video.requestFullscreen) video.requestFullscreen().catch(() => {});
      else video.webkitEnterFullscreen?.();
    },
    finish: () => { setEnding(true); setFilm(false); },
    replay: () => {
      position.current = 0;
      setFailed(false);
      setPaused(false);
      setFilm(true);
    },
    onError: () => { setFailed(true); setPaused(true); },
    onLoadedMetadata: ({ currentTarget }) => {
      if (position.current > 0) currentTarget.currentTime = position.current;
    },
    onTimeUpdate: ({ currentTarget }) => {
      position.current = currentTarget.currentTime;
      if (currentTarget.currentTime >= 8) setEnding(true);
    },
  };
}

export function HeroFilm({ film }) {
  const description = useId();
  if (!film.playing) return null;
  return (
    <>
    <p id={description} className="sr-only">
      A musical demonstration with no speech. Pressing Space in Finder opens a
      molecular structure in Quick Look. Burette previews proteins, molecules,
      trajectories, spectra and collections, with Finder thumbnails and over 100
      file types. The workspace compares structures side by side, browses compound
      collections, maps chemical space, exports figures, and shows docking poses
      and ligand pockets. An agent opens 1HTB and focuses on NAD. The film ends:
      Burette. Press Space. See the molecule. Free and open source.
    </p>
    <video
      ref={film.video}
      className="hero-film"
      poster="/assets/burette-film-poster.jpg"
      muted={film.muted}
      autoPlay={!film.paused}
      playsInline
      preload={film.paused ? "none" : "auto"}
      aria-label="Burette launch film"
      aria-describedby={description}
      // Native controls handle clicks while the film is full screen.
      onClick={() => { if (!document.fullscreenElement) film.watch(); }}
      onEnded={film.finish}
      onError={(event) => {
        // A source whose media query does not match also emits an error.
        // React bubbles that event; only an actual video error needs a retry.
        if (event.target === event.currentTarget) film.onError();
      }}
      onLoadedMetadata={film.onLoadedMetadata}
      onTimeUpdate={film.onTimeUpdate}
    >
      <source
        src="/assets/burette-film-720.mp4"
        type="video/mp4"
        media="(max-width: 900px)"
      />
      <source src="/assets/burette-film.mp4" type="video/mp4" onError={film.onError} />
    </video>
    </>
  );
}

export function FilmControls({ film }) {
  return (
    <>
      <Button variant="ghost" size="sm" onClick={film.togglePause}
        data-analytics-event="Launch Film" data-analytics-location="hero"
        data-analytics-target={film.paused ? "play" : "pause"}>
        {film.failed ? "Retry film" : film.paused ? "Play film" : "Pause film"}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={film.toggleSound}
        data-analytics-event="Launch Film"
        data-analytics-location="hero"
        data-analytics-target={film.muted ? "unmute" : "mute"}
      >
        {film.muted ? "Unmute" : "Mute"}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={film.finish}
        data-analytics-event="Launch Film"
        data-analytics-location="hero"
        data-analytics-target="skip"
      >
        Skip film
      </Button>
    </>
  );
}
