import ThemedVideo from "@/components/themed-video";

export default function PluginVideo({
  src,
  poster,
  light,
  dark,
  lightPoster,
  darkPoster,
  caption,
}) {
  const hasVideo = Boolean(src || light || dark);

  return (
    <figure className="plugin-video page-width">
      {hasVideo ? (
        <ThemedVideo
          src={src}
          poster={poster}
          light={light}
          dark={dark}
          lightPoster={lightPoster}
          darkPoster={darkPoster}
          themeSource="data-theme"
          ariaLabel="Burette plugin walkthrough in Codex"
        />
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
