import Link from "next/link";
import Demo from "@/components/features/demo";
import FeatureCarousel from "./feature-carousel";
import LiveScene from "./live-scene";

export default function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="feature-section"
    >
      <div className="section-intro page-width">
        <div className="intro-copy">
          <h2 id="features-title">
            Open in Finder.
            <br />
            Keep working in Burette.
          </h2>
          <p>
            Inspect a file in Finder, then open it in Burette to keep working.
            Compare structures side by side, edit molecules in Ketcher, and export
            the structures you need.
          </p>
        </div>
        <Demo id="protein" title="Inspect a protein and its ligand" />
      </div>
      <article className="product-chapter chapter-split page-width">
        <div className="chapter-heading">
          <div>
            <p className="section-label">Finder Quick Look</p>
            <h3>
              A closer look.
              <br />
              Right in Finder.
            </h3>
          </div>
          <div>
            <p>
              Select a molecular file in Finder and press Space. Rotate the structure
              and zoom in on a ligand or residue directly in the preview.
            </p>
            <Link className="text-link" href="/docs/surfaces/quick-look">
              Explore Quick Look <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="media-stage">
          <Demo id="finder" title="Open a structure in Finder Quick Look" />
        </div>
      </article>
      <article className="product-chapter chapter-wide page-width">
        <div className="chapter-heading">
          <div>
            <p className="section-label">Molecular collections</p>
            <h3>
              Browse your library.
              <br />
              Choose your compounds.
            </h3>
          </div>
          <div>
            <p>
              Search an SDF collection, browse structure cards, and compare properties
              in the table. Select compounds to inspect or export.
            </p>
            <Link className="text-link" href="/docs/workflows/collections">
              Explore collections <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="media-stage">
          <Demo id="collections" title="Browse a molecular collection" />
        </div>
      </article>
      <article className="product-chapter chapter-wide page-width">
        <div className="chapter-heading">
          <div>
            <p className="section-label">Chemical Space</p>
            <h3>
              Find related molecules
              <br />
              in your library.
            </h3>
          </div>
          <div>
            <p>
              Find structurally similar compounds in a collection. Select a group
              on the map to inspect its molecules and properties.
            </p>
            <Link className="text-link" href="/docs/workflows/native-compute">
              Explore Chemical Space <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <Demo id="space" title="Explore a molecular collection in Chemical Space" />
      </article>
      <FeatureCarousel />
      <article className="product-chapter chapter-split page-width">
        <div className="chapter-heading">
          <div><p className="section-label">Molecular motion</p><h3>Let it run.<br />Stop where it matters.</h3></div>
          <div><p>Play, pause, and step through this 20-frame vibrational mode. In the Mac app, smoothing interpolates between frames for more continuous playback.</p></div>
        </div>
        <LiveScene autoLoad scene="motion" label="BIMP · molecular motion" />
      </article>
    </section>
  );
}
