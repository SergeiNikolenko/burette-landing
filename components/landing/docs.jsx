import Link from "next/link";
import { ArrowRight } from "lucide-react";

const DOC_CARDS = [
  {
    href: "/docs/get-started/install",
    target: "getting-started",
    title: "Getting started",
    body: "Install, first launch, and how Quick Look picks up the extension.",
    cta: "Install guide",
  },
  {
    href: "/docs/formats",
    target: "formats",
    title: "Formats & engines",
    body: "Which extension routes to Mol*, RDKit grids or xyzrender.",
    cta: "Reference",
  },
  {
    href: "/docs/troubleshooting",
    target: "troubleshooting",
    title: "Troubleshooting",
    body: (
      <>
        Previews not showing? Run{" "}
        <span className="text-foreground font-mono">burette doctor</span> or
        reset Quick Look.
      </>
    ),
    cta: "Fix previews",
  },
  {
    href: "/docs/plugin",
    target: "plugin-guide",
    title: "Codex plugin & MCP",
    body: "Install the local plugin and review its typed molecular tool surface.",
    cta: "Plugin guide",
  },
  {
    href: "/docs/workflows/drag-and-drop",
    target: "drag-and-drop",
    title: "Drag & collections",
    body: "Route drops by target, then append, merge, edit, and export molecular collections safely.",
    cta: "Workflow guide",
  },
  {
    href: "/docs/workflows/xtb",
    target: "xtb-crest",
    title: "xTB & CREST",
    body: "Install local engines, configure bounded jobs, and review reports, ensembles, and recovery artifacts.",
    cta: "Calculation guide",
  },
];

const SHORTCUTS = [
  { action: "Quick Look preview", keys: "Space" },
  { action: "Command palette", keys: "⌘ P" },
  { action: "Next / previous frame", keys: "← →" },
  { action: "Cycle tabs", keys: "⌘ ⇥" },
  { action: "Toggle theme", keys: "⌘ ⇧ L" },
];

export default function Docs() {
  return (
    <section
      id="docs"
      className="border-border mx-auto max-w-[1200px] border-b px-5 py-20 sm:px-8 lg:py-24"
    >
      <div className="mb-3.5 flex flex-wrap items-center gap-3.5">
        <span className="text-mono font-mono text-xs tracking-[0.16em] uppercase">
          Docs
        </span>
        <span className="border-input text-nav inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs">
          <span
            className="bg-brand size-[7px] shrink-0 rounded-full shadow-[0_0_0_4px_color-mix(in_srgb,var(--brand)_22%,transparent)]"
            aria-hidden="true"
          />
          Source, plugin, releases
        </span>
      </div>

      <h2 className="text-foreground max-w-[640px] text-[clamp(28px,4vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em] text-balance">
        Read it, run it, fix it.
      </h2>

      <p className="text-muted-foreground mt-3 max-w-[620px] text-[15px] leading-7 text-pretty">
        Install notes, platform guides, target-aware drag and drop, molecule
        collections, local xTB and CREST workflows, and recovery steps.
      </p>

      <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-[1.15fr_1fr]">
        <ol className="grid gap-3.5 sm:grid-cols-2">
          {DOC_CARDS.map((card, index) => (
            <li key={card.href} className="flex">
              {/* The whole card is the link, not just the arrow row: a 22px-padded
                  block with a single destination should have a single hit area. */}
              <Link
                href={card.href}
                data-analytics-event="Docs Link"
                data-analytics-location="docs"
                data-analytics-target={card.target}
                className="group border-border bg-card hover:border-input flex flex-1 flex-col gap-2 rounded-lg border p-[22px] transition-colors"
              >
                <span className="text-brand font-mono text-[11px] tracking-[0.12em] uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground text-base font-semibold">
                  {card.title}
                </span>
                <p className="text-subtle flex-1 text-[13px] leading-[1.55]">
                  {card.body}
                </p>
                <span className="text-brand inline-flex items-center gap-1.5 font-mono text-xs">
                  {card.cta}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div className="border-border bg-card flex flex-col rounded-lg border px-6 py-6.5">
          <h3 className="text-mono mb-4 font-mono text-[11px] tracking-[0.12em] uppercase">
            Keyboard
          </h3>
          {/* A definition list rather than rows of spans: "action → keys" is
              exactly the term/description relationship, and it gives screen
              readers the pairing that the visual gap only implies. */}
          <dl className="flex flex-col gap-3.5">
            {SHORTCUTS.map(({ action, keys }) => (
              <div
                key={action}
                className="flex items-center justify-between gap-3"
              >
                <dt className="text-muted-foreground text-sm">{action}</dt>
                <dd>
                  <kbd className="text-foreground border-input bg-card rounded-xs border border-b-2 px-2 py-[3px] font-mono text-xs">
                    {keys}
                  </kbd>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto pt-5">
            <h3 className="text-mono mb-2.5 font-mono text-[11px] tracking-[0.12em] uppercase">
              Fix previews
            </h3>
            <p className="text-foreground border-border bg-muted block rounded-xs border px-3.5 py-2.5 text-[13px]">
              Command palette →{" "}
              <span className="font-medium">Reset Quick Look</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
