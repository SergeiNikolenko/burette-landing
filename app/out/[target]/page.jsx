import "../../landing.css";
import "../../editorial.css";
import "../../subpages.css";
import "../../mobile.css";
import SiteNav from "@/components/landing/site-nav";
import SiteFooter from "@/components/landing/site-footer";
import OutboundRedirect, { OUTBOUND_DESTINATIONS } from "@/components/landing/outbound-redirect";

export const metadata = {
  title: { absolute: "Opening link | Burette" },
  robots: { index: false, follow: true },
};

export function generateStaticParams() {
  return Object.keys(OUTBOUND_DESTINATIONS).map((target) => ({ target }));
}

export default async function OutPage({ params }) {
  const { target } = await params;
  return (
    <div className="landing subpage" id="top">
      <SiteNav />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <main id="main">
        <OutboundRedirect target={target} />
      </main>
      <SiteFooter />
    </div>
  );
}
