import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// The page used to end on a list of links to other projects - molstar.org,
// rdkit.org - so the most qualified visitor, the one who read to the bottom,
// was handed someone else's homepage instead of a download.
//
// The card inverts against the page. That works in both themes for free because
// --primary/--primary-foreground already swap: near-black on near-white in the
// light theme, near-white on near-black in the dark one. The button inverts a
// second time, making it the single highest-contrast object on the page at the
// exact point where the decision gets made.
export default function ClosingCta() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 pt-6 pb-24 sm:px-8">
      <div className="bg-primary text-primary-foreground relative flex flex-wrap items-end justify-between gap-9 overflow-hidden rounded-xl p-8 shadow-[var(--shadow-card)] sm:p-12 dark:shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-primary-foreground)_10%,transparent),0_40px_90px_-50px_rgb(0_0_0/0.9)]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_0%,color-mix(in_srgb,var(--color-primary-foreground)_14%,transparent),transparent_44%)]"
          aria-hidden="true"
        />

        <div className="relative max-w-[62ch]">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-primary-foreground)_22%,transparent)] bg-[color-mix(in_srgb,var(--color-primary-foreground)_9%,transparent)] px-3.5 py-1.5 font-mono text-xs text-[color-mix(in_srgb,var(--color-primary-foreground)_84%,transparent)]">
            <span
              className="bg-brand size-1.5 rounded-full shadow-[0_0_0_4px_color-mix(in_srgb,var(--brand)_26%,transparent)]"
              aria-hidden="true"
            />
            Free · MIT · No account
          </span>

          <h2 className="mt-5 text-[clamp(28px,4vw,46px)] leading-[1.06] font-bold tracking-[-0.035em] text-balance">
            Press Space. See the molecule.
          </h2>

          <p className="mt-4 max-w-[52ch] text-[clamp(15px,1.5vw,17.5px)] leading-relaxed text-[color-mix(in_srgb,var(--color-primary-foreground)_68%,transparent)]">
            Install once, and every PDB, CIF, SDF, XYZ, trajectory and chemistry
            table in Finder opens in interactive 3D. Open the workspace when you
            need tabs, grids, sketching or local xTB.
          </p>
        </div>

        <div className="relative flex shrink-0 flex-col items-start gap-3 sm:items-end">
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-12 rounded-md px-6 text-[15px] font-semibold"
          >
            <Link
              href="/download?source=closing"
              data-analytics-event="Download"
              data-analytics-location="closing-cta"
              data-analytics-target="dmg"
            >
              Download for macOS
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <span className="font-mono text-[12.5px] text-[color-mix(in_srgb,var(--color-primary-foreground)_52%,transparent)]">
            $ brew install --cask burette
          </span>
        </div>
      </div>
    </div>
  );
}
