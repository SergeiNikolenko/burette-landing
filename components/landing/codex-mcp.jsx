import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CAPABILITIES = [
  "Open structures",
  "Inspect the workspace",
  "Focus a ligand",
  "Create molecular Stories",
  "Edit molecules",
  "Create review panels",
];

const TOOLS = [
  "burette.get_context",
  "burette.open_workspace",
  "burette.observe_workspace",
  "burette.control_viewer",
];

export default function CodexMcp() {
  return (
    <section
      id="codex"
      className="border-border bg-card border-y"
    >
      <div className="mx-auto grid min-w-0 grid-cols-1 max-w-[1200px] items-center gap-11 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">
        <div className="min-w-0">
          <div className="mb-3.5 flex flex-wrap items-center gap-3.5">
            <span className="text-mono font-mono text-xs tracking-[0.16em] uppercase">
              Codex plugin · local MCP
            </span>
            {/* The original chip had an animated conic-gradient border. It needs
                a keyframe this stylesheet does not define, and an accent that
                orbits a static claim is decoration pretending to be status - so
                the live dot stays and the beam goes. */}
            <Badge
              variant="outline"
              className="border-input text-nav gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs font-normal"
            >
              <span
                className="bg-brand size-[7px] shrink-0 rounded-full shadow-[0_0_0_4px_color-mix(in_srgb,var(--brand)_22%,transparent)]"
                aria-hidden="true"
              />
              Local app connection
            </Badge>
          </div>

          <h2 className="text-foreground text-[clamp(28px,4vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em] text-balance">
            Let Codex operate the same molecular workspace.
          </h2>

          <p className="text-muted-foreground mt-4 max-w-[520px] text-[15px] leading-7 text-pretty">
            Ask Codex to open a structure, focus a ligand, or edit a molecule
            in Burette. The plugin connects to the running app through a local
            MCP server.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {CAPABILITIES.map((item) => (
              <li key={item}>
                <Badge
                  variant="outline"
                  className="border-input text-nav rounded-full px-3.5 py-1.5 font-mono text-xs font-normal"
                >
                  {item}
                </Badge>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild className="h-11 rounded-md px-[18px] text-sm">
              <Link
                href="/docs/plugin"
                data-analytics-event="Docs Link"
                data-analytics-location="codex"
                data-analytics-target="plugin-guide"
              >
                Plugin guide
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-input text-nav h-11 rounded-md px-[18px] text-sm"
            >
              <a
                href="https://github.com/SergeiNikolenko/Burette/tree/main/plugins/burette-agent"
                target="_blank"
                rel="noopener"
                data-analytics-event="Outbound Link"
                data-analytics-location="codex"
                data-analytics-target="plugin-source"
              >
                Source in Burette
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        {/* The panel used an indigo/blue radial wash that existed nowhere else
            on the page and fought the green accent two paragraphs away. Same
            depth, brand hue: one page, one accent. */}
        <div
          className="bg-muted border-border flex min-w-0 items-center rounded-xl border p-[clamp(22px,3vw,40px)]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--brand) 16%, transparent), transparent 58%), radial-gradient(circle at 86% 86%, color-mix(in srgb, var(--brand) 9%, transparent), transparent 60%)",
          }}
        >
          <div className="border-input bg-background/85 min-w-0 w-full overflow-hidden rounded-lg border shadow-[var(--shadow-card)]">
            <div className="border-border flex items-center justify-between gap-4 border-b px-4 py-3">
              <span className="text-mono font-mono text-[11px] tracking-[0.12em] uppercase">
                Burette · local MCP
              </span>
              <Badge
                variant="outline"
                className="border-input text-nav gap-2 rounded-full px-2.5 py-1 font-mono text-xs font-normal"
              >
                <span
                  className="bg-brand size-[7px] shrink-0 rounded-full shadow-[0_0_0_4px_color-mix(in_srgb,var(--brand)_22%,transparent)]"
                  aria-hidden="true"
                />
                Local
              </Badge>
            </div>

            <div className="flex min-w-0 flex-col gap-4 p-3 sm:p-5">
              <div className="border-border bg-muted text-foreground break-words rounded-sm border p-3 sm:p-4 font-mono text-[13px] leading-[1.75]">
                <div>
                  <span className="text-mono">$</span> bun run install:plugin
                </div>
                <div>
                  <span className="text-brand">@Burette</span> open this
                  structure and focus the ligand
                </div>
              </div>

              {/* Numbered because the four tools are a call order, not a menu:
                  context first, then open, observe, control. */}
              <ol className="text-nav grid gap-2 break-all font-mono text-xs">
                {TOOLS.map((tool, index) => (
                  <li
                    key={tool}
                    className="border-border rounded-xs border px-[11px] py-2.5"
                  >
                    <span className="text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="ml-2">{tool}</span>
                  </li>
                ))}
              </ol>

              <a
                href="https://github.com/SergeiNikolenko/Burette/blob/main/docs/agent-platform.md"
                target="_blank"
                rel="noopener"
                data-analytics-event="Outbound Link"
                data-analytics-location="codex"
                data-analytics-target="agent-platform"
                className="text-brand inline-flex items-center gap-1 font-mono text-xs underline-offset-4 hover:underline"
              >
                Read the agent integration guide
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
