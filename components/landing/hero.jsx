import MacbookWorkspace from "./macbook-workspace";
import { HeroPlatformLinks, PlatformDownloadButton } from "./platform-download";
import WorkspaceDemo from "./workspace-demo";
import SkyCanvas from "./sky-canvas";

export default function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-sky" aria-hidden="true">
        <SkyCanvas className="hero-clouds" />
      </div>
      <div className="hero-copy">
        <p className="section-label">Molecular workspace for macOS, Windows, and Linux</p>
        <h1>
          Press Space.
          <br />
          See the molecule.
        </h1>
        <p className="hero-description">
          Preview molecular files in Finder on Mac. Open Burette on macOS, Windows, and Linux to compare, edit, and export.
        </p>
        <div className="hero-actions">
          <PlatformDownloadButton source="hero" location="hero" />
          <WorkspaceDemo />
        </div>
        <HeroPlatformLinks />
      </div>
      <div className="hero-stage page-width">
        <MacbookWorkspace />
      </div>
    </section>
  );
}
