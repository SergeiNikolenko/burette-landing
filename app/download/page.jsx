import "../landing.css";
import "../editorial.css";
import "../subpages.css";
import "../mobile.css";
import SiteNav from "@/components/landing/site-nav";
import SiteFooter from "@/components/landing/site-footer";
import DownloadPage from "@/components/landing/download-page";
import { normalizePlatformKey } from "../api/burette-release.js";

export const dynamic = "force-dynamic";

export const metadata = {
  title: { absolute: "Download Burette" },
  description: "Download Burette for macOS, Windows, and Linux.",
  robots: { index: false, follow: true },
};

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const rawPlatform = typeof params?.platform === "string" ? params.platform.trim() : "";
  const hasExplicitPlatform = Boolean(rawPlatform);
  const initialPlatform = hasExplicitPlatform ? normalizePlatformKey(rawPlatform) : "macos";

  return (
    <div className="landing subpage" id="top">
      <SiteNav />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <main id="main">
        <DownloadPage
          initialPlatform={initialPlatform}
          hasExplicitPlatform={hasExplicitPlatform}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
