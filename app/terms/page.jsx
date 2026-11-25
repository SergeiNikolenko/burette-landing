import "../landing.css";
import "../editorial.css";
import "../subpages.css";
import "../mobile.css";
import Link from "next/link";
import EditorialPage from "@/components/landing/editorial-page";
import { SITE_URL } from "../site-url.js";

export const metadata = {
  title: { absolute: "Terms of Use | Burette" },
  description:
    "Terms for using the Burette website, public molecular plugin, desktop applications, Quick Look extensions, and Codex plugin.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <EditorialPage eyebrow="Legal" title="Terms of Use" effectiveDate="July 10, 2026">
      <p>
        These terms cover the Burette website, public molecular plugin and MCP service,
        desktop applications for macOS, Windows, and Linux, Finder Quick Look extensions,
        and local Codex plugin.
      </p>
      <p>
        Burette is open-source software distributed under the{" "}
        <a
          href="https://github.com/SergeiNikolenko/Burette/blob/main/LICENSE"
          target="_blank"
          rel="noopener"
        >
          MIT License
        </a>
        . By using the software, you agree to comply with that license and with the terms
        of any third-party software or services you choose to use with Burette.
      </p>

      <h2>User responsibilities</h2>
      <p>
        You are responsible for having permission to access and process the molecular
        files, systems, and network resources supplied to Burette, ChatGPT, or Codex. Do
        not use the software to bypass access controls, disclose confidential data without
        authorization, or perform unlawful activity.
      </p>
      <p>
        Agent-generated actions and molecular summaries should be reviewed before they are
        used for scientific, medical, regulatory, or safety-critical decisions. Burette is
        a visualization and review workspace, not a substitute for qualified professional
        judgment or validated scientific software.
      </p>

      <h2>Downloads and third-party services</h2>
      <p>
        Downloads are provided through GitHub Releases. The hosted plugin relies on
        OpenAI, Vercel, and, for public PDB lookups, RCSB. Documentation may link to
        additional third-party tools and services. Burette does not control their
        availability, content, security, retention, or terms.
      </p>

      <h2>Availability and warranty</h2>
      <p>
        The software and website are provided &ldquo;as is&rdquo;, without warranty of any
        kind, as described in the MIT License. Features, supported formats, downloads,
        integrations, and website content may change. The maintainers are not responsible
        for third-party services, models, or tools used through Burette or Codex.
      </p>

      <h2>Support</h2>
      <p>
        See the <Link href="/support">support page</Link> for public help. Report
        sensitive security issues through a{" "}
        <a
          href="https://github.com/SergeiNikolenko/Burette/security/advisories/new"
          target="_blank"
          rel="noopener"
        >
          private security advisory
        </a>
        .
      </p>
    </EditorialPage>
  );
}
