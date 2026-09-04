import "./landing.css";
import { SITE_URL } from "./site-url.js";
import Analytics from "@/components/landing/analytics";
import SiteNav from "@/components/landing/site-nav";
import Hero from "@/components/landing/hero";
import Formats from "@/components/landing/formats";
import Features from "@/components/landing/features";
import CodexMcp from "@/components/landing/codex-mcp";
import Install from "@/components/landing/install";
import Docs from "@/components/landing/docs";
import Faq from "@/components/landing/faq";
import ClosingCta from "@/components/landing/closing-cta";
import SiteFooter from "@/components/landing/site-footer";

export const metadata = {
  title: "Burette | Molecular Quick Look and workspace for macOS",
  description:
    "Preview molecular structures, browse molecule tables, and inspect supported trajectories from Finder. A free, open-source molecular workspace for macOS.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Burette | Molecular Quick Look and workspace for macOS",
    description:
      "Preview structures in Finder, browse molecule collections, and explore Chemical Space in a free, open-source workspace for macOS.",
    images: [
      {
        url: "/assets/burette-quicklook.png",
        alt: "Burette showing a molecular structure in macOS Finder Quick Look",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return (
    <div className="landing bg-background text-foreground min-w-0">
      <Analytics />
      <SiteNav />
      <main>
        <Hero />
        <Features />
        <Formats />
        <CodexMcp />
        <Install />
        <Docs />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
