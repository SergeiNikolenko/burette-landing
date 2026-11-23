export default function PluginVideo({ src, poster, caption }) {
  return (
    <figure className="plugin-video page-width">
      {src ? (
        <video
          controls
          playsInline
          preload="metadata"
          poster={poster}
          aria-label="Burette plugin walkthrough in Codex"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div
          className="plugin-video-placeholder"
          role="img"
          aria-label="Space reserved for the Burette plugin video"
        />
      )}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
