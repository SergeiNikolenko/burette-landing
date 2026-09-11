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
    a: "macOS 12 Monterey and later, on both Apple Silicon and Intel. Public downloads are ad-hoc signed rather than Apple-notarized, so macOS may ask you to approve the first launch. The Metal-accelerated Chemical Space path runs on Apple Silicon; on Intel the same analyses fall back to the CPU implementation.",
  },
];

export default function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="faq-section page-width"
    >
      <div className="faq-layout">
        <div>
          <p className="section-label">A few practical details</p>
          <h2 id="faq-title">Good to know.</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {QUESTIONS.map(({ id, q, a }) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger className="text-foreground py-5 text-left text-[15.5px] font-medium hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground max-w-[64ch] pb-5 text-sm leading-relaxed">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
