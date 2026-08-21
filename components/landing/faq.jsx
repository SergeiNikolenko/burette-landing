import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QUESTIONS = [
  {
    id: "free",
    q: "Is Burette really free?",
    a: (
      <>
        Yes. Burette is free and open source under the MIT license. There is no
        account, no sign-in, no trial and no paid tier. Download the .dmg or run{" "}
        <code>brew install --cask burette</code> and it works.
      </>
    ),
  },
  {
    id: "formats",
    q: "Which files can I preview with Space?",
    a: "Structures (PDB, CIF, mmCIF, SDF, MOL, MOL2, XYZ, GRO, BCIF), multi-frame XYZ and MD trajectories, chemistry tables (SMILES, SMI, CSV, TSV) and QM outputs (CUBE, LOG, OUT, PSI4, VASP) — around twenty extensions, all from Finder with a single keystroke.",
  },
  {
    id: "first-launch",
    q: "Do I have to open the app for Quick Look to work?",
    a: "Once. macOS only registers a Quick Look extension after its host app has been launched at least one time. Open Burette, then close it — previews keep working from Finder afterwards.",
  },
  {
    id: "preview-vs-workspace",
    q: "What is the difference between the preview and the workspace?",
    a: "Quick Look is for looking: interactive Mol* 3D, trajectory scrubbing, molecule grids, no window management. The workspace is for working: a tab per file, side-by-side comparison, RDKit grid filtering and export, Ketcher sketching, and local xTB or CREST jobs. Same renderers, more room.",
  },
  {
    id: "privacy",
    q: "Does anything leave my Mac?",
    a: "No. Files are parsed and rendered locally and nothing is uploaded. Structures, collections, calculations and exports stay on disk. Burette does not need network access to open a file.",
  },
  {
    id: "dependencies",
    q: "Do I need Python, RDKit or Mol* installed first?",
    a: (
      <>
        No. Mol*, RDKit and Ketcher ship inside the app. Only two things are
        optional external executables: <code>xyzrender</code> for
        publication-style artwork, and <code>xtb</code> / <code>crest</code> for
        local calculations. Burette detects them on your PATH and hides those
        features when they are absent.
      </>
    ),
  },
  {
    id: "not",
    q: "Is this a replacement for PyMOL, ChimeraX or Maestro?",
    a: "No, and it does not try to be. Those are modelling environments for figures and deep analysis. Burette is for the thirty seconds before you open one: confirm what a file is, look at it, compare a few, move on. It is also not a docking suite and not a cloud service.",
  },
  {
    id: "agents",
    q: "Can Codex or another agent drive Burette?",
    a: "Yes. The Burette plugin exposes a local MCP server with typed tools for structures, Mol* scenes, Ketcher edits, molecule collections, trajectories and workflow artifacts. It runs on your machine and talks to the running app — no cloud round-trip.",
  },
  {
    id: "requirements",
    q: "Which macOS versions and chips are supported?",
    a: "macOS 12 Monterey and later, on both Apple Silicon and Intel. Builds are signed and notarized. The Metal-accelerated Chemical Space path runs on Apple Silicon; on Intel the same analyses fall back to the CPU implementation.",
  },
];

// The questions that actually block installing a Finder extension are "is it
// free", "does anything leave my Mac" and "do I have to install RDKit first" -
// none of which the old page answered anywhere. The section is deliberately
// framed as what Burette does and does not do, rather than as a support FAQ.
export default function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-border mx-auto max-w-[1200px] border-b px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3.5">
            <span className="text-mono font-mono text-xs tracking-[0.16em] uppercase">
              Questions
            </span>
            <Badge
              variant="outline"
              className="border-input text-muted-foreground gap-2 rounded-full px-3 py-1"
            >
              <span className="bg-brand size-1.5 rounded-full" aria-hidden="true" />
              Free · local-first · MIT
            </Badge>
          </div>
          <h2
            id="faq-title"
            className="text-foreground max-w-[22ch] text-[clamp(26px,3.4vw,38px)] leading-[1.12] font-bold tracking-[-0.03em]"
          >
            What Burette does on your Mac — and what it never does.
          </h2>
        </div>

        <Accordion type="single" collapsible defaultValue="free" className="w-full">
          {QUESTIONS.map(({ id, q, a }) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger className="text-foreground hover:text-brand py-5 text-left text-[15.5px] font-medium hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground max-w-[64ch] pb-5 text-sm leading-relaxed [&_code]:border-border [&_code]:bg-muted [&_code]:text-foreground [&_code]:rounded-xs [&_code]:border [&_code]:px-1.5 [&_code]:py-px [&_code]:font-mono [&_code]:text-[13px]">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
