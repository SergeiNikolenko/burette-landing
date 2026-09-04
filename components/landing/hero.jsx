import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductShot from "./product-shot";
import BrewCommand from "./brew-command";

// Two-column composition adapted from @shadcn-studio/hero-section-41.
// Keep a single real product image instead of the source block's carousel.
export default function Hero() {
  return (
    <section id="top" className="border-border border-b">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:py-24">
        <div className="min-w-0">
          <p className="text-muted-foreground mb-5 text-sm">Molecular files, at home on your Mac.</p>
          <h1 className="text-foreground max-w-[14ch] text-[clamp(40px,5vw,68px)] leading-[1.04] font-semibold tracking-[-0.045em] text-balance">
            Press Space. See the molecule.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-[43ch] text-lg leading-8 text-pretty">
            Preview a structure in Finder. Open it in Burette to compare files,
            explore a molecule collection, or edit a sketch.
          </p>
          <div className="mt-8 flex min-w-0 flex-col items-start gap-3">
            <Button asChild size="lg">
              <Link href="/download?source=hero" data-analytics-event="Download" data-analytics-location="hero" data-analytics-target="dmg">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                data-icon="inline-start"
              >
                <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 3.02-.84.99-2.21 1.76-3.36 1.67-.14-1.11.42-2.28 1.09-3.02.76-.85 2.1-1.55 3.39-1.67zM20.5 17.1c-.34.78-.5 1.13-.94 1.83-.61.97-1.47 2.19-2.53 2.2-.95.01-1.19-.62-2.47-.61-1.28 0-1.55.62-2.5.61-1.07-.01-1.88-1.1-2.49-2.08-1.71-2.72-1.89-5.92-.83-7.62.75-1.2 1.94-1.91 3.06-1.91 1.14 0 1.86.63 2.8.63.92 0 1.48-.63 2.8-.63 1 0 2.05.54 2.8 1.48-2.46 1.35-2.06 4.87.3 6.1z" />
              </svg>
                Download for macOS
              </Link>
            </Button>
            <BrewCommand />
          </div>
          <p className="text-muted-foreground mt-6 max-w-[44ch] text-xs leading-6">
            Free and open source · Local file previews<br />
            Apple Silicon and Intel · macOS 12+
          </p>
        </div>
        <ProductShot
          light="/assets/prev-light.png"
          dark="/assets/prev-dark.png"
          alt="A molecular structure open in Finder Quick Look with Burette"
          title="Finder · Quick Look"
          meta="Select a structure. Press Space."
          width={1742}
          height={1356}
          priority
          sizes="(min-width: 1024px) 760px, 100vw"
        />
      </div>
    </section>
  );
}
