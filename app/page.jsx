import "./landing.css";
import "./editorial.css";
import "./live-demo.css";
import "./home-stories.css";
import "./mobile.css";
import { SITE_URL } from "./site-url.js";
import SiteNav from "@/components/landing/site-nav";
import Hero from "@/components/landing/hero";
import Formats from "@/components/landing/formats";
import Features from "@/components/landing/features";
import CodexMcp from "@/components/landing/codex-mcp";
import Install from "@/components/landing/install";
import Faq from "@/components/landing/faq";
import ClosingCta from "@/components/landing/closing-cta";
import SiteFooter from "@/components/landing/site-footer";

export const metadata = {
  title: "Burette | Molecular workspace for macOS, Windows, and Linux",
  description:
    "Inspect PDB, CIF, SDF, XYZ, trajectories, and chemistry tables in interactive 3D on macOS, Windows, and Linux — plus Finder Quick Look on Mac. Free and open source.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Burette | Molecular workspace for macOS, Windows, and Linux",
    description:
      "Inspect molecular files in interactive 3D on macOS, Windows, and Linux, with Finder Quick Look on Mac. Free and open source.",
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
      <SiteNav />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <main id="main">
        <Hero />
        <Features />
        <Formats />
        <CodexMcp />
        <Install />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
