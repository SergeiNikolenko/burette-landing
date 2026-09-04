import Link from "next/link";
import { AsciiFluid } from "@/components/ui/ascii-fluid";
import { Button } from "@/components/ui/button";
import SkyCanvas from "./sky-canvas";
import ProductShot from "./product-shot";
import BrewCommand from "./brew-command";

// Centered composition from @shadcn-studio/hero-section-01, with Burette's sky.
export default function Hero() {
  return (
    <section id="top" className="hero-sky relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <SkyCanvas className="pointer-events-none absolute inset-0 size-full" />
        <AsciiFluid className="hero-ascii-fluid" cellSize={12} force={1} dissipation={0.05} brush={0.22} />
        <div className="hero-scrim pointer-events-none absolute inset-0" />
        <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t to-transparent" />
      </div>
      <div className="relative mx-auto max-w-[1200px] px-5 pt-14 pb-8 text-center sm:px-8 sm:pt-18 lg:pt-20">
        <h1 className="hero-title mx-auto max-w-[15ch] text-[clamp(40px,6vw,72px)] leading-[1.04] font-semibold tracking-[-0.045em] text-balance">
          Press Space. See the molecule.
        </h1>
        <p className="hero-description mx-auto mt-6 max-w-[49ch] text-base leading-7 text-pretty sm:text-lg sm:leading-8">
          Molecular previews, straight from Finder. A full workspace for
          structures, molecule collections, and the files around them.
        </p>
        <div className="hero-install mt-8 flex min-w-0 flex-col items-center justify-center gap-3 min-[760px]:flex-row">
          <Button asChild size="lg" className="h-12 rounded-full px-6">
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
        <p className="hero-description mx-auto mt-5 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs leading-5">
          <span>Free and open source · Local file previews</span><span aria-hidden="true">·</span>
          <span>macOS 12+ · Apple Silicon &amp; Intel</span>
        </p>
        <div className="mx-auto mt-10 max-w-[1080px] text-left sm:mt-12">
          <ProductShot
            light="/assets/main-light.png"
            dark="/assets/main-dark.png"
            alt="Burette displaying a protein structure in the molecular workspace"
            width={1804}
            height={1262}
            priority
            sizes="(min-width: 1200px) 1080px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
