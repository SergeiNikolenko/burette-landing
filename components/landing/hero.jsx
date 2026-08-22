import Link from "next/link";
import { Button } from "@/components/ui/button";
import SkyCanvas from "./sky-canvas";
import MolecularField from "./molecular-field";
import ProductShot from "./product-shot";
import BrewCommand from "./brew-command";

export default function Hero() {
  return (
    <section id="top" className="border-border relative overflow-hidden border-b">
      {/* The sky and the molecular field are the background image this layout is
          built around, so the copy sits centred on top of them rather than in a
          column beside a screenshot. Two scrims: one over the whole field to
          hold the type, one at the foot so the section does not end on an edge. */}
      {/* This wrapper must stay hit-testable: MolecularField listens for
          pointermove on its parent to drive the cursor lens, and
          pointer-events-none here meant elementFromPoint never returned it, so
          the lens was dead on every desktop visit. The layers inside are opted
          out individually instead, and the copy above sits at z-10, so nothing
          here can steal a click from a button. */}
      <div className="absolute inset-0" aria-hidden="true">
        <SkyCanvas className="pointer-events-none absolute inset-0 size-full" />
        <MolecularField className="pointer-events-none absolute inset-0 size-full" />
        <div className="from-background/80 via-background/30 pointer-events-none absolute inset-0 bg-gradient-to-b to-transparent" />
        <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 pt-24 text-center sm:px-8 lg:pt-32">
        {/* No eyebrow, no claim chips, no caveat line under the button. Every one
            of those was a caption competing with the one sentence that has to
            land, and the claims they carried are all made again further down. */}
        <h1 className="text-foreground mx-auto max-w-[15ch] text-[clamp(40px,6.6vw,74px)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance">
          Press Space. See the molecule.
        </h1>

        <p className="text-muted-foreground mx-auto mt-6 max-w-[58ch] text-lg leading-8 text-pretty">
          Preview PDB, CIF, SDF, XYZ, trajectories and chemistry tables straight
          from Finder — then open the same file in a full workspace.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full px-7 text-[15px] font-semibold"
          >
            <Link
              href="/download?source=hero"
              data-analytics-event="Download"
              data-analytics-location="hero"
              data-analytics-target="dmg"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="size-4"
              >
                <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 3.02-.84.99-2.21 1.76-3.36 1.67-.14-1.11.42-2.28 1.09-3.02.76-.85 2.1-1.55 3.39-1.67zM20.5 17.1c-.34.78-.5 1.13-.94 1.83-.61.97-1.47 2.19-2.53 2.2-.95.01-1.19-.62-2.47-.61-1.28 0-1.55.62-2.5.61-1.07-.01-1.88-1.1-2.49-2.08-1.71-2.72-1.89-5.92-.83-7.62.75-1.2 1.94-1.91 3.06-1.91 1.14 0 1.86.63 2.8.63.92 0 1.48-.63 2.8-.63 1 0 2.05.54 2.8 1.48-2.46 1.35-2.06 4.87.3 6.1z" />
              </svg>
              Download for macOS
            </Link>
          </Button>

          <BrewCommand />
        </div>

        {/* One quiet line rather than four chips in the copy block. The two
            questions that actually stop an install - is it free, does it phone
            home - are answered in full in the FAQ, but they cannot be absent
            from everything above it. */}
        <p className="text-mono mx-auto mt-9 font-mono text-[11px] tracking-[0.1em] uppercase">
          Free and open source · Nothing leaves your Mac · Apple Silicon and
          Intel · Notarized, macOS 12+
        </p>

        <ProductShot
          light="/assets/main-light.png"
          dark="/assets/main-dark.png"
          alt="Burette previewing 3HTB.pdb in the Mol* illustrative renderer"
          width={1804}
          height={1262}
          ratio="1.9 / 1"
          priority
          sizes="(min-width: 1200px) 1080px, 100vw"
          className="mx-auto mt-12 max-w-[1080px] text-left"
        />
      </div>
    </section>
  );
}
