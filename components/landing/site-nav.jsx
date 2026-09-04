import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./theme-toggle";
import GithubStars from "./github-stars";

export default function SiteNav() {
  return (
    <header className="border-border/70 bg-background/85 sticky top-0 z-100 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-[1200px] items-center justify-between gap-2 px-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-5 sm:px-8">
        <a href="#top" className="text-foreground w-fit text-xl font-semibold tracking-[-0.035em]">Burette</a>
        <nav aria-label="Project links" className="flex items-center gap-1 sm:gap-3">
          <Link href="/docs" className="text-muted-foreground hover:text-foreground inline-flex h-11 items-center text-sm transition-colors">Docs</Link>
          <span aria-hidden="true" className="text-subtle hidden sm:inline">/</span>
          <GithubStars />
        </nav>
        <div className="flex items-center justify-end gap-1 sm:gap-3">
          <ThemeToggle />
          <Button asChild size="sm" className="h-10 rounded-full px-3 sm:px-5">
            <Link href="/download?source=nav" aria-label="Download for macOS" data-analytics-event="Download" data-analytics-location="nav" data-analytics-target="dmg">
              <Download aria-hidden="true" data-icon="inline-start" />
              <span className="hidden min-[375px]:inline">Download</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
