import "../landing.css";
import "../editorial.css";
import "../subpages.css";
import "../mobile.css";
import Link from "next/link";
import EditorialPage from "@/components/landing/editorial-page";
import { SITE_URL } from "../site-url.js";

export const metadata = {
  title: { absolute: "Support | Burette" },
  description:
    "Support channels for the Burette desktop applications, public plugin, and Finder Quick Look extension.",
  alternates: { canonical: `${SITE_URL}/support` },
};

export default function SupportPage() {
  return (
    <EditorialPage eyebrow="Help" title="Support">
      <p>
        Use the links below for help with Burette on macOS, Windows, and Linux, Finder
        Quick Look, the public hosted plugin, or the local Codex integration.
      </p>

      <h2>Documentation</h2>
      <p>
        Start with the <Link href="/docs">Burette documentation</Link>. The{" "}
        <Link href="/docs/get-started/install">installation guide</Link> covers macOS,
        Windows, and Linux setup, and the{" "}
        <Link href="/docs/plugin">Burette Plugin and MCP guide</Link> explains the hosted
        workspace, supported attachments, production MCP endpoint, and local workspace
        plugin.
      </p>

      <h2>Public support</h2>
      <p>
        Open an issue in the{" "}
        <a
          href="https://github.com/SergeiNikolenko/Burette/issues"
          target="_blank"
          rel="noopener"
        >
          Burette issue tracker
        </a>
        . Include your platform and Burette version or hosted tool name, molecular format,
        expected behavior, and a minimal reproducible example when it is safe to share.
      </p>
      <p>
        Do not attach confidential molecular structures, signed attachment URLs,
        credentials, protected health information, private file paths, or proprietary logs
        to a public issue.
      </p>

      <h2>Security and privacy</h2>
      <p>
        Report a suspected vulnerability through a{" "}
        <a
          href="https://github.com/SergeiNikolenko/Burette/security/advisories/new"
          target="_blank"
          rel="noopener"
        >
          private GitHub security advisory
        </a>
        . Read the <Link href="/privacy">Privacy Policy</Link> for hosted-file processing,
        recipients, retention, and user controls.
      </p>

      <h2>Service status</h2>
      <p>
        The public MCP endpoint is{" "}
        <a href="https://burette-plugin.vercel.app/mcp" target="_blank" rel="noopener">
          burette-plugin.vercel.app/mcp
        </a>
        . Its health check is available at{" "}
        <a
          href="https://burette-plugin.vercel.app/api/health"
          target="_blank"
          rel="noopener"
        >
          burette-plugin.vercel.app/api/health
        </a>
        .
      </p>
    </EditorialPage>
  );
}
