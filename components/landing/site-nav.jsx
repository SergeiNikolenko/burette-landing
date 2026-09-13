import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./theme-toggle";
import MobileNav from "./mobile-nav";

export default function SiteNav() {
  return (
    <header className="site-header">
      <div className="site-nav page-width">
        <a href="#top" className="wordmark" translate="no">
          Burette
          <span className="wordmark-description">Molecular workspace</span>
        </a>
        <nav aria-label="Sections" className="section-nav">
          <a href="#features">Overview</a>
          <a href="#formats">Formats</a>
          <a href="#codex">For agents</a>
          <Link href="/docs">Docs</Link>
        </nav>
        <div className="nav-actions">
          <a className="nav-github" href="/out/github-repo?surface=nav">GitHub</a>
          <ThemeToggle />
          <Button asChild size="sm" className="pill-button nav-download">
            <Link
              href="/download?source=nav"
              data-analytics-event="Download"
              data-analytics-location="nav"
              data-analytics-target="dmg"
            >
              Download
            </Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
