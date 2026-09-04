import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./theme-toggle";
import GithubStars from "./github-stars";

const LINKS = [
  { href: "#features", label: "Features" },
  {
    href: "/demo",
    label: "Demo",
    analytics: { event: "Online Demo", location: "nav", target: "demo" },
  },
  { href: "/docs", label: "Docs" },
];

export default function SiteNav() {
  return (
    <header className="border-border/80 bg-background/70 sticky top-0 z-100 border-b backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
        <a href="#top" className="text-foreground text-xl font-bold tracking-[-0.02em]">
          Burette
        </a>

        <nav
          aria-label="Sections"
          className="text-muted-foreground hidden items-center gap-7 text-sm min-[1001px]:flex"
        >
          {LINKS.map(({ href, label, analytics }) => (
            <a
              key={href}
              href={href}
              {...(analytics
                ? {
                    "data-analytics-event": analytics.event,
                    "data-analytics-location": analytics.location,
                    "data-analytics-target": analytics.target,
                  }
                : {})}
              className="hover:text-foreground transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <GithubStars />
          <Link
            href="/docs"
            className="text-muted-foreground hover:text-foreground text-sm transition-colors max-[1000px]:inline min-[1001px]:hidden"
          >
            Docs
          </Link>
          <ThemeToggle />
          <Button
            asChild
            size="sm"
            className="h-9.5 rounded-sm px-4 font-medium max-[460px]:hidden"
          >
            <Link
              href="/download?source=nav"
              data-analytics-event="Download"
              data-analytics-location="nav"
              data-analytics-target="dmg"
            >
              Download
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
