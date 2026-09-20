import Link from "next/link";

const COLUMNS = [
  {
    heading: "Product",
    label: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/#formats", label: "Formats & engines" },
      { href: "/#codex", label: "Codex + MCP" },
      {
        href: "/demo",
        label: "Live demo",
        analytics: {
          event: "Online Demo",
          location: "footer",
          target: "demo",
        },
      },
      {
        href: "/download?source=footer",
        label: "Download",
        analytics: { event: "Download", location: "footer", target: "dmg" },
      },
    ],
  },
  {
    heading: "Docs",
    label: "Documentation",
    links: [
      {
        href: "/docs",
        label: "Documentation",
        analytics: {
          event: "Docs Link",
          location: "footer",
          target: "docs-home",
        },
      },
      {
        href: "/docs/plugin",
        label: "Plugin & MCP",
        analytics: {
          event: "Docs Link",
          location: "footer",
          target: "plugin-guide",
        },
      },
      { href: "/#faq", label: "FAQ" },
      { href: "/#install", label: "Install" },
    ],
  },
  {
    heading: "Project",
    label: "Project",
    links: [
      {
        href: "/out/github-repo?surface=footer",
        label: "GitHub",
        external: true,
        analytics: {
          event: "Outbound Link",
          location: "footer",
          target: "github-repo",
        },
      },
      {
        href: "/out/github-releases?surface=footer",
        label: "Releases",
        external: true,
        analytics: {
          event: "Outbound Link",
          location: "footer",
          target: "github-releases",
        },
      },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-border bg-card overflow-hidden border-t">
      <div className="mx-auto max-w-[1200px] px-5 pt-14 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-9 min-[430px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.15fr)] lg:gap-10">
          {COLUMNS.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.label}
              className="flex flex-col items-start gap-3"
            >
              <h2 className="text-foreground mb-1 text-[13px] font-semibold">
                {column.heading}
              </h2>
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener" }
                    : {})}
                  {...(link.analytics
                    ? {
                        "data-analytics-event": link.analytics.event,
                        "data-analytics-location": link.analytics.location,
                        "data-analytics-target": link.analytics.target,
                      }
                    : {})}
                  className="text-muted-foreground hover:text-foreground text-[13.5px] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}

          <div className="flex flex-col items-start gap-2.5 lg:items-end lg:text-right">
            <span className="text-foreground text-[17px] font-bold tracking-[-0.02em]">
              Burette
            </span>
            <p className="text-muted-foreground max-w-[26ch] text-[13px] leading-normal">
              Molecular Quick Look and workspace for macOS.
            </p>
            <p className="text-mono font-mono text-[11.5px] leading-relaxed">
              MIT License · macOS 12+
              <br />
              Apple Silicon &amp; Intel
            </p>
            <p className="text-mono font-mono text-[11.5px]">
              Published by Sergei A. Nikolenko
            </p>
          </div>
        </div>

        {/* Cap-height alignment lets the wordmark meet the page edge. */}
        <div
          aria-hidden="true"
          className="footer-signature pointer-events-none mt-8 select-none sm:mt-14"
        >
          <span className="block text-center font-medium tracking-[0.02em] [font-kerning:none] text-[var(--wordmark-fill)] whitespace-nowrap">
            BURETTE
          </span>
        </div>
      </div>
    </footer>
  );
}
