import "./landing.css";
import { SITE_URL } from "./site-url.js";
import SiteNav from "@/components/landing/site-nav";
import Hero from "@/components/landing/hero";
import Faq from "@/components/landing/faq";
import ClosingCta from "@/components/landing/closing-cta";
import SiteFooter from "@/components/landing/site-footer";

export const metadata = {
  title: "Burette | Molecular Quick Look and workspace for macOS",
  description:
    "Press Space in Finder and see PDB, CIF, SDF, XYZ, trajectories and chemistry tables in interactive 3D. Free, open source, and everything stays on your Mac.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Burette | Molecular Quick Look and workspace for macOS",
    description:
      "Press Space in Finder and see molecular files in interactive 3D. Free, open source, nothing leaves your Mac.",
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
      <main>
        <Hero />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
