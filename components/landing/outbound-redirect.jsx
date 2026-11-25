"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import SkyCanvas from "./sky-canvas";

export const OUTBOUND_DESTINATIONS = {
  "github-repo": {
    label: "GitHub repository",
    url: "https://github.com/SergeiNikolenko/Burette",
  },
  "github-readme": {
    label: "GitHub README",
    url: "https://github.com/SergeiNikolenko/Burette#readme",
  },
  "github-issues": {
    label: "GitHub Issues",
    url: "https://github.com/SergeiNikolenko/Burette/issues",
  },
  "github-releases": {
    label: "GitHub Releases",
    url: "https://github.com/SergeiNikolenko/Burette/releases",
  },
  molstar: {
    label: "Mol*",
    url: "https://molstar.org",
  },
  xyzrender: {
    label: "xyzrender",
    url: "https://github.com/aligfellow/xyzrender",
  },
  rdkit: {
    label: "RDKit",
    url: "https://www.rdkit.org",
  },
  ketcher: {
    label: "Ketcher",
    url: "https://github.com/epam/ketcher",
  },
};

export default function OutboundRedirect({ target = "github-repo" }) {
  const entry = OUTBOUND_DESTINATIONS[target] || OUTBOUND_DESTINATIONS["github-repo"];
  const host = new URL(entry.url).host;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    try {
      track("Outbound Redirect", {
        target,
        surface: params.get("surface") || "unknown",
      });
    } catch {}

    const timer = window.setTimeout(() => {
      window.location.replace(entry.url);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [target, entry.url]);

  return (
    <section className="subpage-hero">
      <div className="subpage-sky" aria-hidden="true">
        <SkyCanvas className="subpage-clouds" />
      </div>
      <div className="outbound-shell subpage-hero-copy page-width">
        <p className="section-label">Redirecting</p>
        <h1>Opening {entry.label}…</h1>
        <p>Taking you to the external page now.</p>
        <span className="outbound-host">{host}</span>
        <div className="outbound-actions">
          <Button asChild size="lg" className="pill-button">
            <a id="manual-link" href={entry.url} rel="noopener">
              Open manually
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
