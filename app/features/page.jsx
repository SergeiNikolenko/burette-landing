import "../landing.css";
import "../editorial.css";
import "./features.css";
import SiteNav from "@/components/landing/site-nav";
import SiteFooter from "@/components/landing/site-footer";
import Catalog from "@/components/features/catalog";
import { SITE_URL } from "../site-url";

export const metadata = {
  title: { absolute: "Features | Burette" },
  description: "Explore Burette: Finder previews, molecular structures, collections, Chemical Space, editing, and local calculations. See the real workspace in short demos.",
  alternates: { canonical: `${SITE_URL}/features` },
};

export default function FeaturesPage() {
  return <div className="landing feature-page" id="top"><SiteNav /><a className="skip-link" href="#main">Skip to content</a>
    <main id="main"><header className="feature-heading page-width"><p>Explore Burette</p><h1>More ways to work<br />with molecules.</h1><p>From a quick look in Finder to a collection you can search,<br className="feature-wide-break" /> compare, and explore. See what fits your next step.</p><a href="/download?source=features">Download for macOS ↗</a></header><Catalog />
    <section className="feature-end page-width"><h2>Bring your own files.</h2><p>Free and open source. Made for your Mac.</p><a href="/download?source=features-bottom">Download Burette ↗</a></section></main><SiteFooter /></div>;
}
