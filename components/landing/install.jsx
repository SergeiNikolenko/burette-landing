import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BrewCommand from "./brew-command";

const PILLS = ["Homebrew cask", "MIT License", "macOS 12+", "Local-first"];

export default function Install() {
  return (
    <section
      id="install"
      className="border-border mx-auto max-w-[1200px] border-y px-5 py-20 sm:px-8"
    >
      <div className="grid items-center gap-11 lg:grid-cols-2">
        <div>
          <div className="mb-3.5 flex flex-wrap items-center gap-3.5">
            <span className="text-mono font-mono text-xs tracking-[0.16em] uppercase">
              Install
            </span>
            <Badge
              variant="outline"
              className="border-input text-nav gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs font-normal"
            >
              <span
                className="bg-brand size-[7px] shrink-0 rounded-full shadow-[0_0_0_4px_color-mix(in_srgb,var(--brand)_22%,transparent)]"
                aria-hidden="true"
              />
              macOS 12+ · Apple Silicon &amp; Intel
            </Badge>
          </div>

          <h2 className="text-foreground text-[clamp(26px,3.4vw,36px)] leading-[1.1] font-semibold tracking-[-0.03em]">
            Two lines with Homebrew.
          </h2>

          <p className="text-muted-foreground mt-4 max-w-[440px] text-[15px] leading-7 text-pretty">
            Install the cask, then open Burette once so macOS registers the
            Quick Look extension. If previews don&apos;t appear, run{" "}
            <span className="text-foreground font-medium">Reset Quick Look</span>{" "}
            from the command palette. Public downloads are ad-hoc signed rather
            than Apple-notarized, so macOS may ask you to approve the first
            launch.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2.5">
            {PILLS.map((pill) => (
              <li key={pill}>
                <Badge
                  variant="outline"
                  className="border-input text-nav rounded-full px-3.5 py-1.5 font-mono text-xs font-normal"
                >
                  {pill}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        <Card className="gap-0 overflow-hidden py-0">
          <CardHeader className="border-border border-b py-5">
            <CardTitle>Homebrew</CardTitle>
            <CardDescription>
              Run both commands, then open Burette once.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <ol className="divide-border divide-y">
              <li className="flex min-w-0 items-center gap-4 px-5 py-4">
                <span className="text-brand shrink-0 font-mono text-[11px] tracking-[0.12em]">
                  01
                </span>
                <BrewCommand
                  command="brew tap SergeiNikolenko/burette"
                  location="install-tap"
                  compact
                />
              </li>
              <li className="flex min-w-0 items-center gap-4 px-5 py-4">
                <span className="text-brand shrink-0 font-mono text-[11px] tracking-[0.12em]">
                  02
                </span>
                <BrewCommand
                  command="brew install --cask burette"
                  location="install-cask"
                  compact
                />
              </li>
              <li className="flex min-w-0 items-center gap-4 px-5 py-4">
                <span className="text-brand shrink-0 font-mono text-[11px] tracking-[0.12em]">
                  03
                </span>
                <span className="text-muted-foreground text-[13px] leading-6">
                  Open Burette once to register Quick Look.
                </span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
