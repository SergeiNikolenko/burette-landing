import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Which extension reaches which renderer. This is the only thing the old
// section actually told the reader that the hero had not already said - the
// eyebrow counter, the h2 and the twenty-chip marquee (duplicated in the DOM so
// it could scroll seamlessly) all repeated the same list of file endings four
// more times, and none of them said what happens to a file once it is opened.
const ROUTES = [
  {
    engine: "Mol* interactive 3D",
    note: "Default path for most structures.",
    extensions: ["PDB", "CIF", "MMCIF", "SDF", "MOL2", "XYZ", "GRO"],
  },
  {
    engine: "RDKit molecule grids",
    note: "Search, sort, SMARTS, export.",
    extensions: ["SMILES", "SMI", "CSV", "TSV", "SD"],
  },
  {
    engine: "External xyzrender",
    note: "SVG artwork for QM outputs.",
    extensions: ["CUBE", "LOG", "OUT", "PSI4", "VASP", "MAE"],
  },
];

export default function Formats() {
  return (
    <section
      id="formats"
      aria-labelledby="formats-title"
      className="border-border mx-auto max-w-[1200px] border-b px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mb-3.5 flex flex-wrap items-center gap-3.5">
        <span className="text-mono font-mono text-xs tracking-[0.16em] uppercase">
          Supported files
        </span>
        {/* The count used to animate from 0 to 20+ on scroll, which meant the
            server HTML read "0 formats" until the script ran, and the number
            arrived looking like a marketing odometer rather than a fact. */}
        <Badge
          variant="outline"
          className="border-input text-nav gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs font-normal"
        >
          <span
            className="bg-brand size-[7px] shrink-0 rounded-full shadow-[0_0_0_4px_color-mix(in_srgb,var(--brand)_22%,transparent)]"
            aria-hidden="true"
          />
          20+ formats, one keystroke
        </Badge>
      </div>

      <h2
        id="formats-title"
        className="text-foreground max-w-[620px] text-[clamp(28px,4vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em] text-balance"
      >
        Each file goes to the renderer that suits it.
      </h2>

      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {ROUTES.map(({ engine, note, extensions }) => (
          <Card key={engine} className="gap-0 py-6">
            <CardHeader className="gap-1.5">
              <CardTitle className="text-base">{engine}</CardTitle>
              <CardDescription className="text-[13px]">{note}</CardDescription>
            </CardHeader>
            <CardContent className="pt-[18px]">
              <ul className="flex flex-wrap gap-2">
                {extensions.map((extension) => (
                  <li key={extension}>
                    <Badge
                      variant="outline"
                      className="border-input text-nav rounded-xs px-2.5 py-1 font-mono text-xs font-normal"
                    >
                      {extension}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
