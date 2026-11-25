import { PlatformDownloadButton } from "./platform-download";

export default function ClosingCta() {
  return (
    <section className="closing-section page-width">
      <h2>Take a closer look.</h2>
      <p>Free and open source. Available for macOS, Windows, and Linux.</p>
      <PlatformDownloadButton source="closing" location="closing-cta" />
    </section>
  );
}
