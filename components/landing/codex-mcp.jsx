import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CodexMcp() {
  return (
    <section
      id="codex"
      aria-labelledby="agents-title"
      className="agent-section"
    >
      <div className="page-width chapter-heading">
        <div>
          <p className="section-label">Burette for agents</p>
          <h2 id="agents-title">
            Your agent can
            <br />
            work here too.
          </h2>
        </div>
        <div>
          <p>
            Ask Codex to open a structure, focus on a ligand, or prepare a
            sequence of molecular views. The Burette plugin connects your agent to the tools
            in your workspace.
          </p>
          <Button asChild variant="outline" className="pill-button">
            <Link
              href="/docs/plugin"
              data-analytics-event="Docs Link"
              data-analytics-location="codex"
              data-analytics-target="plugin-guide"
            >
              Set up the plugin <span aria-hidden="true">↗</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
