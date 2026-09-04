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
        <code>brew install --cask SergeiNikolenko/burette/burette</code>, then open
        Burette once to enable Finder previews.
      </>
    ),
  },
  {
    id: "formats",
    q: "Which files can I preview with Space?",
    a: "Preview molecular structures, molecule collections, chemistry tables, and supported trajectories in Finder. See Supported files for formats and optional renderer requirements.",
  },
  {
    id: "first-launch",
    q: "Do I have to open the app for Quick Look to work?",
    a: "Once. macOS only registers a Quick Look extension after its host app has been launched at least one time. Open Burette, then close it — previews keep working from Finder afterwards.",
  },
  {
    id: "preview-vs-workspace",
    q: "What is the difference between the preview and the workspace?",
    a: "Quick Look lets you inspect structures, browse molecule grids, and play supported trajectories from Finder. Open the workspace for file tabs, collection filtering and export, molecule sketching, Chemical Space, and optional local xTB or CREST calculations.",
  },
  {
    id: "privacy",
    q: "How does Burette handle my files?",
    a: "Burette parses and renders local files on your Mac. Connected agents and external services follow their own data settings.",
  },
  {
    id: "dependencies",
    q: "Do I need Python, RDKit or Mol* installed first?",
    a: (
      <>
        No. Mol*, RDKit and Ketcher ship inside the app. Install the optional{" "}
        <code>xyzrender</code> tool for vector artwork, or <code>xtb</code> and{" "}
        <code>crest</code> for local calculations.
      </>
    ),
  },
  {
    id: "not",
    q: "Is this a replacement for PyMOL, ChimeraX or Maestro?",
    a: "Burette complements those tools with quick file inspection and a lightweight molecular workspace: preview structures, compare files, browse collections, and explore Chemical Space.",
  },
  {
    id: "agents",
    q: "Can Codex or another agent drive Burette?",
    a: "Yes. Ask an agent to open a structure, focus a ligand, edit a molecule, or inspect a collection. The Burette plugin connects to the running app through a local MCP server. Your agent provider's data settings still apply.",
  },
  {
    id: "requirements",
    q: "Which macOS versions and chips are supported?",
    a: "macOS 12 Monterey and later, on both Apple Silicon and Intel. Public downloads are ad-hoc signed rather than Apple-notarized, so macOS may ask you to approve the first launch. The Metal-accelerated Chemical Space path runs on Apple Silicon; on Intel the same analyses fall back to the CPU implementation.",
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
              Free · local-first · MIT
            </Badge>
          </div>
          <h2
            id="faq-title"
            className="text-foreground max-w-[22ch] text-[clamp(26px,3.4vw,38px)] leading-[1.12] font-bold tracking-[-0.03em]"
          >
            Before you install.
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
