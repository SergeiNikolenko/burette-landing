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
        Yes. Burette is free and open source under the MIT license. The desktop app
        needs no account or subscription. Download the .dmg or follow the
        Homebrew instructions above and run{" "}
        <code>brew install --cask burette</code>.
      </>
    ),
  },
  {
    id: "formats",
    q: "Which files can I preview with Space?",
    a: "Structures (PDB, CIF, mmCIF, SDF, MOL, MOL2, XYZ, GRO, BCIF), multi-frame XYZ and MD trajectories, chemistry tables (SMILES, SMI, CSV, TSV) and QM outputs (CUBE, LOG, OUT, PSI4, VASP). See the formats guide for the complete list and renderer requirements.",
  },
  {
    id: "first-launch",
    q: "Do I have to open the app for Quick Look to work?",
    a: "Open Burette once after installation to register the extension. You can then close the app and use previews from Finder.",
  },
  {
    id: "preview-vs-workspace",
    q: "What is the difference between the preview and the workspace?",
    a: "Quick Look lets you inspect structures, scrub trajectories, and browse molecule grids from Finder. Open the workspace for file tabs, side-by-side views, collection filtering and export, Ketcher editing, and local calculations.",
  },
  {
    id: "privacy",
    q: "Does anything leave my Mac?",
    a: "The desktop app opens local molecular files on your Mac without uploading them. Online integrations have their own data paths: files shared with a hosted plugin or AI provider are processed by those services. See the privacy policy for details.",
  },
  {
    id: "dependencies",
    q: "Do I need Python, RDKit or Mol* installed first?",
    a: (
      <>
        No. Mol*, RDKit and Ketcher ship inside the app. Optional tools include <code>xyzrender</code> for
        vector illustrations, and <code>xtb</code> / <code>crest</code> for
        local calculations. See the engines guide for installation options
        and other supported tools.
      </>
    ),
  },
  {
    id: "not",
    q: "Is this a replacement for PyMOL, ChimeraX or Maestro?",
    a: "Burette is useful for inspecting files from Finder, comparing molecules, editing structures, and preparing calculations. You can keep using your existing modelling tools for the workflows you already rely on.",
  },
  {
    id: "agents",
    q: "Can Codex or another agent drive Burette?",
    a: "Yes. The local plugin lets an agent open files, control molecular views, edit in Ketcher, and work with collections and trajectories. A separate hosted plugin provides browser-based molecular tools. The plugin guide explains setup and availability.",
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
