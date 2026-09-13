// Supply src when the new walkthrough is recorded; the cover does not imply
// that a playable video is already available.
export default function PluginVideo({ src }) {
  return <figure className="plugin-video page-width">
    {src ? <video controls playsInline preload="none" poster="/assets/burette-chatgpt-plugin-demo-poster.jpg" aria-label="Burette plugin walkthrough"><source src={src} type="video/mp4" /></video>
      : <img src="/assets/burette-chatgpt-plugin-demo-poster.jpg" alt="Burette molecular viewer inside a conversation" loading="lazy" />}
    <figcaption><span>Burette for agents</span><span>{src ? "Plugin walkthrough" : "Video walkthrough coming soon"}</span></figcaption>
  </figure>;
}
