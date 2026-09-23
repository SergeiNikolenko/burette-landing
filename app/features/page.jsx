import "../landing.css";
import "../editorial.css";
import "./features.css";
import "../mobile.css";
import SiteNav from "@/components/landing/site-nav";
import SiteFooter from "@/components/landing/site-footer";
import SkyCanvas from "@/components/landing/sky-canvas";
import Catalog from "@/components/features/catalog";
import { SITE_URL } from "../site-url";

export const metadata = {
  title: { absolute: "Features | Burette" },
  description: "Explore Burette: Finder previews, molecular structures, collections, Chemical Space, editing, and local calculations. See the real workspace in short demos.",
  alternates: { canonical: `${SITE_URL}/features` },
};

export default function FeaturesPage() {
  return <div className="landing feature-page" id="top"><SiteNav /><a className="skip-link" href="#main">Skip to content</a>
    <main id="main"><div className="feature-hero"><div className="feature-sky" aria-hidden="true"><SkyCanvas className="feature-clouds" /></div><header className="feature-heading page-width"><p>Explore Burette</p><h1>Explore structures.<br />Compare molecules.</h1><p>Preview structures in Finder. Compare compounds, inspect a binding site,<br className="feature-wide-break" /> or edit a molecule in the same Mac workspace.</p><nav className="feature-shortcuts" aria-label="Popular workflows"><a href="#selection">Inspect a binding site ↗</a><a href="#motion">Compare molecular poses ↗</a><a href="#collections">Filter a collection ↗</a></nav><a href="/download?source=features">Download for macOS ↗</a></header></div><Catalog />
    <section className="feature-end page-width"><h2>Bring your own files.</h2><p>Free and open source. Made for your Mac.</p><a href="/download?source=features-bottom">Download Burette ↗</a></section></main><SiteFooter /></div>;
}
