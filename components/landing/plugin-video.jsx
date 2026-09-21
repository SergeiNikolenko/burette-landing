"use client";

// Supply src when the walkthrough is recorded.
export default function PluginVideo({ src }) {
  return <figure className="plugin-video page-width">
    {src ? <video onLoadedMetadata={({ currentTarget }) => { currentTarget.defaultPlaybackRate = 0.8; currentTarget.playbackRate = 0.8; }} controls playsInline preload="none" aria-label="Burette plugin walkthrough"><source src={src} type="video/mp4" /></video>
      : <div className="plugin-video-placeholder" role="img" aria-label="Space reserved for the Burette plugin video" />}
  </figure>;
}
