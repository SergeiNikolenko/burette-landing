import Link from "next/link";
import { PlatformDownloadButton } from "./platform-download";
import ThemeToggle from "./theme-toggle";
import MobileNav from "./mobile-nav";

export default function SiteNav() {
  return (
    <header className="site-header">
      <div className="site-nav page-width">
        <a href="/#top" className="wordmark" translate="no">
          Burette
        </a>
        <nav aria-label="Sections" className="section-nav">
          <a href="/features">Features</a>
          <a href="/#formats">Formats</a>
          <a href="/#codex">For agents</a>
          <Link href="/docs">Docs</Link>
        </nav>
        <div className="nav-actions">
          <a className="nav-github" href="/out/github-repo?surface=nav">GitHub</a>
          <ThemeToggle />
          <PlatformDownloadButton
            source="nav"
            location="nav"
            size="sm"
            label="Download"
            className="pill-button nav-download"
          />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
