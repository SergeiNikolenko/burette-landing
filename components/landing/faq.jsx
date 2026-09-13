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
    a: "Yes. No subscription, no account, and no paid tier. The source is on GitHub under the MIT license.",
  },
  {
    id: "formats",
    q: "Which files can I preview with Space?",
    a: "PDB, CIF, SDF and XYZ are a few common ones. There’s also support for molecular tables, trajectories and quantum-chemistry outputs. Check the formats guide for your file type; some need an optional renderer.",
  },
  {
    id: "first-launch",
    q: "Do I have to open the app for Quick Look to work?",
    a: "Only once, after installing it. That registers the Finder extension. After that, Burette can stay closed while you use Quick Look.",
  },
  {
    id: "preview-vs-workspace",
    q: "What is the difference between the preview and the workspace?",
    a: "Quick Look is handy for checking a file without leaving Finder. In the workspace you get tabs, views next to each other, and Ketcher for editing. Collection export and local calculation tools live there too.",
  },
  {
    id: "privacy",
    q: "Does anything leave my Mac?",
    a: "Opening a file in the Mac app doesn’t upload it. If you send a file to an AI service or the hosted plugin, that service receives it. The privacy policy covers those connections.",
  },
  {
    id: "dependencies",
    q: "Do I need Python, RDKit or Mol* installed first?",
    a: "The usual viewing tools are bundled: Mol*, RDKit and Ketcher. You’ll need a separate install for extras such as xyzrender, xTB or CREST. Start with the app; add those tools when you need them.",
  },
  {
    id: "not",
    q: "Is this a replacement for PyMOL, ChimeraX or Maestro?",
    a: "There’s no need to switch. Use Burette for the quick check or the comparison in front of you, then send the file to your usual modelling application from the app menu.",
  },
  {
    id: "agents",
    q: "Can Codex or another agent drive Burette?",
    a: "Yes, through the Burette plugin. An agent can open a local file, change the view, or edit a molecule in Ketcher. There’s also a hosted version for browser use. Follow the plugin guide for the version you want.",
  },
  {
    id: "requirements",
    q: "Which macOS versions and chips are supported?",
    a: "macOS 12 or later, on Apple Silicon and Intel. Chemical Space uses Metal on Apple Silicon and CPU calculations on Intel. The public build isn’t Apple-notarized yet: macOS may ask you to approve the first launch.",
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
