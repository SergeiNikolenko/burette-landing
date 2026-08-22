import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import ProductShot from "./product-shot";
import LazyVideo from "./lazy-video";

// Lasso selection and trajectory playback used to be showcase chapters of their
// own, with the same weight as "here is the workspace". They are neither: both
// are things you do to a structure that is already on screen. So they keep their
// screenshots - claims about what you can see should be shown - but as a pair of
// evidence tiles under the 3D block rather than as two more headlines.
const INSPECTION_DETAILS = [
  {
    label: "Viewport selection",
    body: "Draw a lasso across the viewport to select and isolate residues and ligands directly in 3D. Pick a binding pocket without hunting a sequence list. The selection carries into measurements, isolation, and export.",
  },
  {
    label: "Mol* trajectories",
    body: "Multi-frame XYZ and MD trajectories play back in place. Prev / Next / All and a frame counter drive the native Mol* trajectory controls, so a run reads like a short clip.",
  },
];

const CHEMICAL_SPACE_CLAIMS = [
  "10,000-molecule benchmark",
  "2D + 3D",
  "CPU-checked Metal results",
];

// The old grid asked for three columns and supplied five cards, so the bottom
// row always ended on a third of visible nothing. Six cards over two columns
// fill every row and give each screenshot twice the width to be read at.
const CARDS = [
  {
    eyebrow: "Tabbed workspace",
    title: "One tab per file",
    body: "Compare structures, inputs, and outputs side by side. Tabs keep their renderer state as you switch.",
    light: "/assets/multi-light.png",
    dark: "/assets/multi-dark.png",
    alt: "Burette workspace with one file per tab",
  },
  {
    eyebrow: "Documents + preview",
    title: "Office files, code, and logs beside structures",
    body: "Use Retab-based viewers for PDF, DOCX, XLSX, PPTX, CSV, images, markdown, code, text, and email artifacts.",
    light: "/assets/text-pic-light.png",
    dark: "/assets/text-pic-dark.png",
    alt: "A text file open beside the structure it describes",
  },
  {
    eyebrow: "xyzrender · single",
    title: "Publication-ready SVG artwork",
    body: "Render single-frame XYZ and QM outputs (CUBE, LOG, PSI4, VASP…) as clean, depth-cued vector figures for slides and papers.",
    light: "/assets/xyzr-light.png",
    dark: "/assets/xyzr-dark.png",
    alt: "A single molecule drawn by xyzrender as a vector figure",
  },
  {
    eyebrow: "xyzrender · grid",
    title: "A whole collection as SVG cards",
    body: "Batch-render an entire library through xyzrender for consistent, publication-style cards you can drop straight into a figure.",
    light: "/assets/xyzr-grid-light.png",
    dark: "/assets/xyzr-grid-dark.png",
    alt: "A molecule collection batch-rendered as xyzrender SVG cards",
  },
];

// Text stays first in the DOM in every block - the media is the illustration of
// a claim, so it should be read second no matter which side it is painted on.
function Showcase({ eyebrow, title, mediaFirst = false, media, children }) {
  return (
    <div
      className={cn(
        "grid items-center gap-10 lg:gap-14",
        mediaFirst
          ? "lg:grid-cols-[1.15fr_1fr]"
          : "lg:grid-cols-[1fr_1.15fr]",
      )}
    >
      <div className={mediaFirst ? "lg:order-2" : undefined}>
        <div className="text-mono font-mono text-[11px] tracking-[0.14em] uppercase">
          {eyebrow}
        </div>
        <h3 className="text-foreground mt-3 text-[clamp(24px,3vw,32px)] leading-[1.12] font-semibold tracking-[-0.025em] text-balance">
          {title}
        </h3>
        {children}
      </div>
      <div className={mediaFirst ? "lg:order-1" : undefined}>{media}</div>
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="border-border mx-auto max-w-[1200px] border-b px-5 py-20 sm:px-8 sm:py-24"
    >
      {/* Every other section opens with an eyebrow and an h2; this one opened
          with a screenshot, so a reader scrolling past had no idea the five
          blocks below belonged together or what they were an answer to. */}
      <span className="text-mono mb-3.5 block font-mono text-xs tracking-[0.16em] uppercase">
        Workspace
      </span>

      <h2
        id="features-title"
        className="text-foreground max-w-[22ch] text-[clamp(28px,4vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em] text-balance"
      >
        The workspace picks up where the preview stops.
      </h2>

      <p className="text-muted-foreground mt-4 max-w-[62ch] text-[15px] leading-7 text-pretty">
        Same renderers, more room: a tab per file, molecule grids you can filter
        and export, a chemical space map built on the Mac's own GPU, and local
        calculations that never ask for an account.
      </p>

      <div className="mt-14 flex flex-col gap-16 lg:gap-20">
        <Showcase
          eyebrow="Finder Quick Look · Mol* 3D"
          title="Inspect a structure before opening an app."
          media={
            <ProductShot
              light="/assets/prev-light.png"
              dark="/assets/prev-dark.png"
              alt="A Burette Quick Look preview floating over the macOS desktop with no app window open"
              title="Finder · Quick Look"
              meta="Space, no app window"
              width={1742}
              height={1356}
              ratio="1.28 / 1"
              sizes="(min-width: 1024px) 620px, 100vw"
            />
          }
        >
          <p className="text-muted-foreground mt-3.5 max-w-[52ch] text-[15.5px] leading-[1.65] text-pretty">
            Finder previews open in interactive 3D: chains, residues, ligands,
            and surfaces are visible before you decide what to do with the file.
          </p>

          <dl className="mt-7 grid gap-6 sm:grid-cols-2">
            {INSPECTION_DETAILS.map(({ label, body }, index) => (
              <div key={label}>
                {index === 0 ? (
                  <LazyVideo
                    src="/assets/lasso.mp4"
                    poster="/assets/lasso-poster.jpg"
                    label="Demonstration of lasso selection in the molecular viewport"
                    width={1280}
                    height={978}
                    className="border-input bg-muted mb-3.5 rounded-md border"
                  />
                ) : (
                  <ProductShot
                    light="/assets/second-light.png"
                    dark="/assets/second-dark.png"
                    alt="Mol* trajectory playback with frame controls and a frame counter"
                    width={1804}
                    height={1262}
                    ratio="1.43 / 1"
                    sizes="(min-width: 640px) 300px, 100vw"
                    className="mb-3.5 rounded-md"
                  />
                )}
                <dt className="text-mono font-mono text-[11px] tracking-[0.13em] uppercase">
                  {label}
                </dt>
                <dd className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {body}
                </dd>
              </div>
            ))}
          </dl>
        </Showcase>

        {/* Five blocks in a row all put the words left and the picture right, so
            the eye stopped registering the boundary between them. Alternating
            the media gives the second block a start of its own. */}
        <Showcase
          eyebrow="Collections · DataWarrior · reactions"
          title="Triage whole libraries as a grid."
          mediaFirst
          media={
            <ProductShot
              light="/assets/grid-table-light.png"
              dark="/assets/grid-table-dark.png"
              alt="RDKit molecule grid with structure cards and property columns"
              width={1804}
              height={1262}
              ratio="1.43 / 1"
              sizes="(min-width: 1024px) 620px, 100vw"
            />
          }
        >
          <p className="text-muted-foreground mt-3.5 max-w-[52ch] text-[15.5px] leading-[1.65] text-pretty">
            Open SDF, SMILES, CSV, TSV, DataWarrior, RXN, or RDF as a searchable
            grid: filter, edit, analyze, compare reactions, map Chemical Space,
            review activity cliffs, and export.
          </p>
        </Showcase>

        <Showcase
          eyebrow="Chemical Space · Apple Silicon Metal"
          title="Map molecular libraries, then act on what you find."
          media={
            /* This block used to be a hand-drawn SVG of invented nodes and
               edges sitting directly under the claims "1,513 molecules · Metal"
               and "10,000-molecule benchmark". Backing a specific number with a
               drawing is the one thing this audience will not forgive, so it is
               the real window instead. */
            <ProductShot
              light="/assets/chemical-space-light.png"
              dark="/assets/chemical-space-dark.png"
              alt="Burette on the desktop with a molecule card grid, the Chemical Space panel showing a 3D UMAP of 1,513 molecules computed with Metal, and the molecular inspector open on one hit"
              title="Burette · Chemical Space"
              meta="bace1_sar.csv · 1,513 molecules · Metal"
              width={2258}
              height={1522}
              ratio="1.48 / 1"
              sizes="(min-width: 1024px) 620px, 100vw"
            />
          }
        >
          <p className="text-muted-foreground mt-3.5 max-w-[52ch] text-[15.5px] leading-[1.65] text-pretty">
            Build an exact Metal Tanimoto neighbour graph, explore UMAP or TMAP
            views, cluster with Butina, colour by activity, and surface activity
            cliffs. Selections stay linked to the molecule grid for review and
            export.
          </p>

          <ul className="mt-5 flex flex-wrap gap-2.5">
            {CHEMICAL_SPACE_CLAIMS.map((claim) => (
              <li key={claim}>
                <Badge
                  variant="outline"
                  className="border-input text-muted-foreground rounded-full px-3.5 py-1.5 font-mono text-xs font-normal"
                >
                  {claim}
                </Badge>
              </li>
            ))}
          </ul>
        </Showcase>
      </div>

      <div className="mt-16 grid gap-[18px] sm:grid-cols-2 lg:mt-20">
        {CARDS.map(({ eyebrow, title, body, light, dark, alt }) => (
          <Card key={title} className="gap-0 overflow-hidden py-0">
            <ProductShot
              light={light}
              dark={dark}
              alt={alt}
              width={1804}
              height={1262}
              ratio="16 / 10"
              sizes="(min-width: 1200px) 580px, (min-width: 640px) 50vw, 100vw"
              className="rounded-none border-0"
            />
            <Separator />
            <CardHeader className="gap-2 pt-5">
              <span className="text-mono font-mono text-[11px] tracking-[0.13em] uppercase">
                {eyebrow}
              </span>
              <CardTitle className="text-[17px]">{title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-2 pb-6">
              <CardDescription className="text-[13.5px] leading-[1.55]">
                {body}
              </CardDescription>
            </CardContent>
          </Card>
        ))}

        <Card className="justify-center gap-0 py-6">
          <CardHeader className="gap-2">
            <span className="text-mono font-mono text-[11px] tracking-[0.13em] uppercase">
              Sketch &amp; command
            </span>
            <CardTitle className="text-[17px]">Ketcher + ⌘P palette</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <CardDescription className="text-[13.5px] leading-[1.55]">
              Draw a molecule, then send it to Mol*, xyzrender, or a grid from
              the command palette.
            </CardDescription>
            <ul className="mt-3.5 flex flex-wrap gap-2">
              {["Ketcher", "⌘P", "iPhone app"].map((item) => (
                <li key={item}>
                  <Badge
                    variant="outline"
                    className="border-input text-muted-foreground rounded-xs px-2.5 py-1 font-mono text-xs font-normal"
                  >
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* The xTB card used to sit alone in a full-width strip below the grid,
            which made the one card that is also a link the easiest to miss. */}
        <Link
          href="/docs/workflows/native-compute"
          data-analytics-event="Docs Link"
          data-analytics-location="features"
          data-analytics-target="native-compute"
          className="group"
        >
          <Card className="hover:border-input h-full justify-center gap-0 py-6 transition-colors">
            <CardHeader className="gap-2">
              <span className="text-mono font-mono text-[11px] tracking-[0.13em] uppercase">
                Native compute · Chemical Space
              </span>
              <CardTitle className="text-[17px]">
                Cluster, search, embed, and review activity cliffs
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <CardDescription className="text-[13.5px] leading-[1.55]">
                Run provenance-aware Apple Silicon jobs, then explore linked
                2D/3D maps without installing an external engine.
              </CardDescription>
              <span className="text-brand mt-3.5 inline-flex items-center gap-1.5 font-mono text-xs">
                Native compute guide
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </CardContent>
          </Card>
        </Link>
      </div>
    </section>
  );
}
