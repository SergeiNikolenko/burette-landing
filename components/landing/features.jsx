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

const INSPECTION_DETAILS = [
  {
    label: "Viewport selection",
    body: "Select residues and ligands directly in the viewport, then isolate the selection for a closer look.",
  },
  {
    label: "Mol* trajectories",
    body: "Play supported trajectories, step through frames, and inspect how the structure changes.",
  },
];

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
    body: "Read documents, tables, images, and logs alongside molecular files.",
    light: "/assets/text-pic-light.png",
    dark: "/assets/text-pic-dark.png",
    alt: "A text file open beside the structure it describes",
  },
  {
    eyebrow: "xyzrender · single",
    title: "Export molecular figures as SVG",
    body: "Create vector artwork from supported molecular files with the optional xyzrender tool.",
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
function Showcase({
  eyebrow,
  title,
  mediaFirst = false,
  fullWidth = false,
  media,
  children,
}) {
  return (
    <div
      className={cn(
        "grid items-center gap-10 lg:gap-14",
        !fullWidth &&
          (mediaFirst
            ? "lg:grid-cols-[1.5fr_0.8fr]"
            : "lg:grid-cols-[0.8fr_1.5fr]"),
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
        Keep structures, molecule tables, and notes together. Move from a
        quick preview to a closer look at the files you are working with.
      </p>

      <div className="mt-14 flex flex-col gap-16 lg:gap-20">
        <Showcase
          eyebrow="Finder · Quick Look"
          title="A closer look, without opening the app."
          media={
            <ProductShot
              light="/assets/prev-light.png"
              dark="/assets/prev-dark.png"
              alt="A molecular structure displayed in Finder Quick Look with Burette"
              title="Burette · Quick Look"
              meta="Select a file in Finder and press Space"
              width={1742}
              height={1356}
              sizes="(min-width: 1024px) 620px, 100vw"
            />
          }
        >
          <p className="text-muted-foreground mt-3.5 max-w-[52ch] text-[15.5px] leading-[1.65] text-pretty">
            Select a molecular file in Finder and press Space to preview it.
            Open the same file in Burette when you want to inspect it alongside
            related structures, tables, and notes.
          </p>
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
              title="Burette · Collections"
              meta="Structures and properties in one view"
              width={1804}
              height={1262}
              sizes="(min-width: 1024px) 620px, 100vw"
            />
          }
        >
          <p className="text-muted-foreground mt-3.5 max-w-[52ch] text-[15.5px] leading-[1.65] text-pretty">
            Browse structures alongside their properties. Filter the collection,
            inspect a molecule, and export the rows you want to keep.
          </p>
        </Showcase>

        <Showcase
          eyebrow="Chemical Space · Apple Silicon Metal"
          title="Map molecular libraries, then act on what you find."
          fullWidth
          media={
            <ProductShot
              light="/assets/chemical-space-light.png"
              dark="/assets/chemical-space-dark.png"
              alt="Burette on the desktop with a molecule card grid, the Chemical Space panel showing a 3D UMAP of 1,513 molecules computed with Metal, and the molecular inspector open on one hit"
              title="Burette · Chemical Space"
              meta="BACE1 sample · linked map and molecule grid"
              width={2258}
              height={1522}
              sizes="(min-width: 1200px) 1136px, 100vw"
            />
          }
        >
          <p className="text-muted-foreground mt-3.5 max-w-[72ch] text-[15.5px] leading-[1.65] text-pretty">
            Explore a library in 2D or 3D, colour molecules by activity, and
            select points to inspect the matching structures. Review activity
            cliffs with both molecules and their values in view.
          </p>
          <Link href="/docs/workflows/native-compute" className="text-brand mt-5 inline-flex items-center gap-2 text-sm">
            Chemical Space guide <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Showcase>
      </div>

          <dl className="mt-16 grid gap-8 sm:grid-cols-2">
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
                    sizes="(min-width: 640px) 560px, 100vw"
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

      <div className="mt-16 grid gap-[18px] sm:grid-cols-2 lg:mt-20">
        {CARDS.map(({ eyebrow, title, body, light, dark, alt }) => (
          <Card key={title} className="gap-0 overflow-hidden py-0">
            <ProductShot
              light={light}
              dark={dark}
              alt={alt}
              width={1804}
              height={1262}
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
              Draw or edit a molecule, then open it in a viewer or export the
              structure for the next step.
            </CardDescription>
            <ul className="mt-3.5 flex flex-wrap gap-2">
              {["Ketcher", "⌘P"].map((item) => (
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


        <Link
          href="/docs/workflows/xtb"
          data-analytics-event="Docs Link"
          data-analytics-location="features"
          data-analytics-target="xtb"
          className="group"
        >
          <Card className="hover:border-input h-full justify-center gap-0 py-6 transition-colors">
            <CardHeader className="gap-2">
              <span className="text-mono font-mono text-[11px] tracking-[0.13em] uppercase">
                Optional local calculations
              </span>
              <CardTitle className="text-[17px]">
                Run xTB and CREST from the workspace
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <CardDescription className="text-[13.5px] leading-[1.55]">
                Configure a local job and review its reports and output files.
                Requires the optional xTB or CREST engine.
              </CardDescription>
              <span className="text-brand mt-3.5 inline-flex items-center gap-1.5 font-mono text-xs">
                Local calculation guide
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
