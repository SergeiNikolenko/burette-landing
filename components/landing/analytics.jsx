"use client";

import Script from "next/script";
import { useEffect } from "react";

const CAMPAIGN_PARAMS = ["ref"];
const SECTIONS = ["faq", "docs", "install", "codex", "features", "formats", "top"];
const DEPTHS = [25, 50, 75, 100];

// Every landing component carries data-analytics-event / -location / -target
// attributes, but the code that read them lived in the old index.html and did
// not survive the port. The attributes were still there, so nothing looked
// broken while downloads, outbound clicks, brew copies and scroll depth all
// silently stopped being recorded. This is that listener, moved into React.
export default function Analytics() {
  useEffect(() => {
    const track = (name, payload = {}) => {
      if (typeof window.va === "function") window.va("event", name, payload);
    };

    const campaignQuery = () => {
      const current = new URLSearchParams(window.location.search);
      const preserved = new URLSearchParams();
      current.forEach((value, key) => {
        if (key.startsWith("utm_") || CAMPAIGN_PARAMS.includes(key)) {
          preserved.set(key, value);
        }
      });
      return preserved;
    };

    // Campaign parameters have to survive the hop through /download and /out/,
    // otherwise every attributed visit loses its source at the redirect.
    const preserveCampaign = (link) => {
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (!url.pathname.startsWith("/download") && !url.pathname.startsWith("/out/")) return;
      campaignQuery().forEach((value, key) => {
        if (!url.searchParams.has(key)) url.searchParams.set(key, value);
      });
      link.href = url.pathname + url.search + url.hash;
    };

    const currentSection = () => {
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom > 160) return id;
      }
      return "unknown";
    };

    const reached = new Set();
    const checkScrollDepth = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const depth = Math.min(100, Math.round((window.scrollY / maxScroll) * 100));
      for (const threshold of DEPTHS) {
        if (depth >= threshold && !reached.has(threshold)) {
          reached.add(threshold);
          track("Scroll Depth", {
            depth: String(threshold),
            section: currentSection(),
          });
        }
      }
    };

    const onClick = (event) => {
      const link = event.target.closest?.("a[href], button[data-analytics-event]");
      if (!link) return;
      if (link.tagName === "A") preserveCampaign(link);
      const eventName = link.dataset.analyticsEvent;
      if (!eventName) return;
      track(eventName, {
        location: link.dataset.analyticsLocation || "unknown",
        target: link.dataset.analyticsTarget || "unknown",
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("scroll", checkScrollDepth, { passive: true });
    checkScrollDepth();

    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("scroll", checkScrollDepth);
    };
  }, []);

  return (
    <>
      <Script id="va-queue" strategy="beforeInteractive">
        {`window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };`}
      </Script>
      <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      <Script src="/_vercel/speed-insights/script.js" strategy="afterInteractive" />
    </>
  );
}
