import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductShot from "./product-shot";

export default function Hero() {
  return (
    <section id="top" className="hero-section">
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
          <Button asChild variant="ghost" size="lg" className="pill-button">
            <Link
              href="/demo"
              data-analytics-event="Online Demo"
              data-analytics-location="hero"
              data-analytics-target="demo"
            >
              Try in your browser <span aria-hidden="true">↗</span>
            </Link>
          </Button>
        </div>
        <p className="hero-note">Free and open source.</p>
      </div>
      <div className="hero-stage page-width">
        <ProductShot
          light="/assets/main-light.png"
          dark="/assets/main-dark.png"
          alt="Burette showing the 3HTB protein structure in its molecular workspace"
          width={1804}
          height={1262}
          ratio="1.65 / 1"
          priority
          sizes="(min-width: 1200px) 1120px, 94vw"
        />
      </div>
      <p className="hero-caption">
        From a quick look in Finder to a workspace for structures, collections,
        and calculations.
      </p>
    </section>
  );
}
