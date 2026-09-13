import Link from "next/link";
import { Button } from "@/components/ui/button";
import LiveScene from "./live-scene";
import WorkspaceDemo from "./workspace-demo";
import SkyCanvas from "./sky-canvas";

export default function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-sky" aria-hidden="true">
        <SkyCanvas className="hero-clouds" />
      </div>
      <div className="hero-copy">
        <p className="section-label">Molecular workspace for Mac</p>
        <h1>
          Press Space.
          <br />
          See the molecule.
        </h1>
        <p className="hero-description">
          Explore structures and molecular collections, straight from Finder.
        </p>
        <div className="hero-actions">
          <Button asChild size="lg" className="pill-button">
            <Link
              href="/download?source=hero"
              data-analytics-event="Download"
              data-analytics-location="hero"
              data-analytics-target="dmg"
            >
              Download for macOS
            </Link>
          </Button>
          <WorkspaceDemo />
        </div>
        <p className="hero-note">Free and open source.</p>
      </div>
      <div className="hero-stage page-width">
        <LiveScene
          device
          id="live-demo"
          scene="structure"
          label="1HTB.pdb"
          light="/assets/main-light.png"
          dark="/assets/main-dark.png"
          autoLoad
        />
      </div>
    </section>
  );
}
