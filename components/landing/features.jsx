import Link from "next/link";
import Demo from "@/components/features/demo";
import Highlights from "./highlights";

export default function Features() {
  return <section id="features" aria-label="Explore Burette">
    <Highlights />
    <div className="home-stories page-width">
      <article id="quick-look-story" className="home-story home-story-wide">
        <header className="home-section-heading"><div><p className="section-label">Start in Finder</p><h2>Open a file.<br />Find something worth exploring.</h2></div><div><p className="home-story-description">Select a molecular file and press Space. Rotate it, zoom in, and see what is inside before opening the workspace.</p><Link className="text-link" href="/features#preview">Explore Quick Look ↗</Link></div></header>
        <Demo id="finder" title="Open and rotate a molecular structure in Finder Quick Look" />
      </article>
      <article id="structure-story" className="home-story home-story-split">
        <header><p className="section-label">Inspect the structure</p><h2>The whole protein.<br />The detail you need.</h2><p className="home-story-description">Find chains and ligands in the scene tree. Hide what gets in the way, select a component, and bring it into view.</p><Link className="text-link" href="/features#selection">Explore selection and analysis ↗</Link></header>
        <Demo id="selection" title="Use the scene tree to inspect a protein and its components" />
      </article>
      <article id="collection-story" className="home-story home-story-wide">
        <header className="home-section-heading"><div><p className="section-label">Work with a collection</p><h2>Many compounds.<br />A clear next step.</h2></div><div><p className="home-story-description">Browse molecular structures, compare their properties, and narrow your selection. Export the compounds you want to work with.</p><Link className="text-link" href="/features#collections">Explore collections ↗</Link></div></header>
        <Demo id="collections" title="Browse structure cards and compare properties in a molecular collection" />
      </article>
    </div>
  </section>;
}
