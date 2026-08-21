import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SkyCanvas from "./sky-canvas";
import MolecularField from "./molecular-field";
import ProductShot from "./product-shot";
import BrewCommand from "./brew-command";

const PROOF = [
  "Free and open source, no account",
  "Apple Silicon and Intel",
  "Notarized, macOS 12+",
  "Nothing leaves your Mac",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="border-border relative overflow-hidden border-b"
    >
      {/* Three background layers, each with one job: the sky carries the
          atmosphere, the molecular field says "this is for chemists", and the
          scrim keeps the type legible over both. The sky is masked so the
          clouds part around the headline column instead of being covered by a
          flat wash. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <SkyCanvas className="absolute inset-0 size-full" />
        <MolecularField className="absolute inset-0 size-full" />
        <div className="from-background via-background/45 absolute inset-0 bg-gradient-to-r to-transparent" />
        <div className="from-background absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-12 px-5 pt-20 pb-16 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:pt-28 lg:pb-24">
        <div className="max-w-2xl">
          <Badge
            variant="outline"
            className="border-input text-mono rounded-full px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] uppercase"
          >
            Molecular previews for macOS
          </Badge>

          {/* 72px at weight 600 on a ~660px column, not 66px at 700 across 840px:
              the narrower measure is what turns a headline into a poster instead
              of a centred banner. */}
          <h1 className="text-foreground mt-6 text-[clamp(38px,6.4vw,72px)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance">
            Press Space. See the molecule.
          </h1>

          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-8 text-pretty">
            Burette previews PDB, CIF, SDF, XYZ, trajectories and chemistry
            tables straight from Finder — no window, no upload, no account. When
            a preview is not enough, the same file opens in a workspace with
            tabs, Mol* 3D, RDKit grids, Ketcher and local xTB.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-md px-6 text-[15px] font-semibold"
            >
              <Link
                href="/download?source=hero"
                data-analytics-event="Download"
                data-analytics-location="hero"
                data-analytics-target="dmg"
              >
                Download for macOS
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <BrewCommand />
          </div>

          <p className="text-mono mt-4 font-mono text-xs">
            Free · MIT · macOS 12+ ·{" "}
            <Link
              href="/demo"
              data-analytics-event="Online Demo"
              data-analytics-location="hero"
              data-analytics-target="demo"
              className="hover:text-foreground underline underline-offset-4 transition-colors"
            >
              try the browser build
            </Link>{" "}
            (no Quick Look there)
          </p>

          {/* Checked claims rather than bordered pills: four verifiable
              statements read as arguments, a row of chips reads as legalese. */}
          <ul className="text-muted-foreground mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {PROOF.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check aria-hidden="true" className="text-brand size-4" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ProductShot
          light="/assets/main-light.png"
          dark="/assets/main-dark.png"
          alt="Burette previewing 3HTB.pdb in the Mol* illustrative renderer"
          title="Burette · Quick Look"
          meta="3HTB.pdb · Mol* illustrative"
          width={1804}
          height={1262}
          ratio="1.48 / 1"
          priority
          sizes="(min-width: 1024px) 640px, 100vw"
          className="lg:mt-10"
        />
      </div>
    </section>
  );
}
