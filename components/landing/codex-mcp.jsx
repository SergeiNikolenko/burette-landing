import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CAPABILITIES = [
  "Open structures",
  "Inspect scene state",
  "Control Mol*",
  "Render reports",
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
      <div className="mx-auto grid max-w-[1200px] items-center gap-11 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">
        <div>
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
              Skills + typed tools
            </Badge>
          </div>

          <h2 className="text-foreground text-[clamp(28px,4vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em] text-balance">
            Let Codex operate the same molecular workspace.
          </h2>

          <p className="text-muted-foreground mt-4 max-w-[520px] text-[15px] leading-7 text-pretty">
            The Burette plugin combines focused workflow skills with a local
            stdio MCP server. Codex can open a structure, observe the active
            workspace, run allowlisted Mol* actions, and render bounded review
            panels while keeping local-file provenance explicit.
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
          className="bg-muted border-border flex items-center rounded-xl border p-[clamp(22px,3vw,40px)]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--brand) 16%, transparent), transparent 58%), radial-gradient(circle at 86% 86%, color-mix(in srgb, var(--brand) 9%, transparent), transparent 60%)",
          }}
        >
          <div className="border-input bg-background/85 w-full overflow-hidden rounded-lg border shadow-[var(--shadow-card)]">
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

            <div className="flex flex-col gap-4 p-5">
              <div className="border-border bg-muted text-foreground rounded-sm border p-4 font-mono text-[13px] leading-[1.75]">
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
              <ol className="text-nav grid gap-2 font-mono text-xs">
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
                className="text-brand inline-flex items-center gap-1 font-mono text-xs hover:underline hover:underline-offset-4"
              >
                Read the MCP contract in the main repository
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
