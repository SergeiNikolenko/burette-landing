import Link from "next/link";
import ProductShot from "./product-shot";
import ThemedImage from "./themed-image";
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
            Your files.
            <br />
            Ready to explore.
          </h2>
          <p>
            Select a file in Finder and press Space. Rotate a protein, inspect a
            ligand, or browse a collection. Open the workspace for editing and side-by-side views.
          </p>
        </div>
        <ThemedImage
          light="/assets/multi-light.png"
          dark="/assets/multi-dark.png"
          alt="Multiple molecular views open in the Burette workspace"
          width={1804}
          height={1262}
          className="w-full aspect-[1.43/1] rounded-lg object-cover object-top"
          sizes="(min-width: 900px) 600px, 90vw"
        />
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
              Inspect chains, residues, ligands, and surfaces in 3D without
              opening a separate workspace.
            </p>
            <Link className="text-link" href="/docs/surfaces/quick-look">
              Explore Quick Look <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="media-stage">
          <ProductShot
            light="/assets/prev-light.png"
            dark="/assets/prev-dark.png"
            alt="A molecular Quick Look preview open directly from Finder"
            width={1742}
            height={1356}
            ratio="1.6 / 1"
            sizes="(min-width: 1200px) 1040px, 90vw"
          />
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
              Move between structures and properties. Filter a molecular
              library, compare compounds, and export the selection you want to
              work with.
            </p>
            <Link className="text-link" href="/docs/workflows/collections">
              Explore collections <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="media-stage">
          <ProductShot light="/assets/grid-table-light.png" dark="/assets/grid-table-dark.png" alt="A molecular collection in the Burette workspace" width={1804} height={1262} ratio="1804 / 1262" />
        </div>
      </article>
      <article className="product-chapter chapter-wide page-width">
        <div className="chapter-heading">
          <div>
            <p className="section-label">Chemical Space</p>
            <h3>
              See the shape
              <br />
              of your library.
            </h3>
          </div>
          <div>
            <p>
              Map structural similarities across a collection. Select a region
              to explore related molecules together.
            </p>
            <Link className="text-link" href="/docs/workflows/native-compute">
              Explore Chemical Space <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <ProductShot light="/assets/chemical-space-light.png" dark="/assets/chemical-space-dark.png" alt="Chemical Space in the Burette workspace" width={1804} height={1262} ratio="1804 / 1262" />
      </article>
      <FeatureCarousel />
      <article className="product-chapter chapter-split page-width">
        <div className="chapter-heading">
          <div><p className="section-label">Molecular motion</p><h3>Every frame.<br />In your hands.</h3></div>
          <div><p>Play, pause, or step through a molecular trajectory. Smooth the motion between frames to follow small changes more easily.</p></div>
        </div>
        <LiveScene autoLoad scene="motion" label="BIMP · molecular motion" />
      </article>
    </section>
  );
}
