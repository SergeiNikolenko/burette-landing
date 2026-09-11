import Link from "next/link";
import ProductShot from "./product-shot";
import LazyVideo from "./lazy-video";

export default function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="feature-section"
    >
      <div className="section-intro page-width">
        <p className="section-label">From preview to workspace</p>
        <h2 id="features-title">
          Your files.
          <br />
          Ready to explore.
        </h2>
        <p>
          Select a file in Finder and press Space. Rotate a protein, inspect a
          ligand, or browse a collection. Open Burette when you want to keep
          working.
        </p>
      </div>
      <article className="product-chapter page-width">
        <div className="chapter-heading">
          <div>
            <p className="section-label">Finder Quick Look</p>
            <h3>
              One key.
              <br />
              Into the structure.
            </h3>
          </div>
          <div>
            <p>
              See chains, residues, ligands, and surfaces in interactive 3D.
              Right where your files already are.
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
      <article className="product-chapter page-width">
        <div className="chapter-heading">
          <div>
            <p className="section-label">Molecular collections</p>
            <h3>
              Find what matters.
              <br />
              Keep the context.
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
          <ProductShot
            light="/assets/grid-table-light.png"
            dark="/assets/grid-table-dark.png"
            alt="Molecular structures and property columns in the Burette collection grid"
            width={1804}
            height={1262}
            ratio="1.6 / 1"
            sizes="(min-width: 1200px) 1040px, 90vw"
          />
        </div>
      </article>
      <article className="product-chapter page-width">
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
              Explore a molecular map. Colour by activity, look for clusters,
              and follow a selection back to its structures and properties.
            </p>
            <Link className="text-link" href="/docs/workflows/native-compute">
              Explore Chemical Space <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="media-stage">
          <ProductShot
            light="/assets/chemical-space-light.png"
            dark="/assets/chemical-space-dark.png"
            alt="Burette Chemical Space showing a molecular map linked to the collection and inspector"
            width={2258}
            height={1522}
            ratio="1.48 / 1"
            sizes="(min-width: 1200px) 1040px, 90vw"
          />
        </div>
      </article>
      <div className="detail-studies page-width">
        <article>
          <LazyVideo
            src="/assets/lasso.mp4"
            poster="/assets/lasso-poster.jpg"
            label="Draw a lasso in Burette to select residues and ligands in the molecular viewport"
            width={1280}
            height={978}
          />
          <h3>Select it where you see it.</h3>
          <p>
            Draw around a pocket or ligand. Use the selection for measurements,
            isolation, and export.
          </p>
        </article>
        <article>
          <ProductShot
            light="/assets/second-light.png"
            dark="/assets/second-dark.png"
            alt="Trajectory playback and frame controls in Burette"
            width={1804}
            height={1262}
            ratio="1280 / 978"
            sizes="(min-width: 900px) 530px, 90vw"
          />
          <h3>Follow every frame.</h3>
          <p>
            Play a molecular trajectory, pause on a moment, and step through the
            structure frame by frame.
          </p>
        </article>
      </div>
    </section>
  );
}
