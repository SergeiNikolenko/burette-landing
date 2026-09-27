"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { track as trackEvent } from "@vercel/analytics";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const CAMPAIGN_PARAMS = ["ref"];
const SECTIONS = ["preview", "structures", "selection", "motion", "collections", "chemical-space", "compute", "editing", "integrations", "highlights", "faq", "docs", "install", "codex", "features", "formats", "top"];
const DEPTHS = [25, 50, 75, 100];

// Shared across client routes; reset per-page depth and video deduplication on navigation.
export default function Analytics() {
  const pathname = usePathname();
  useEffect(() => {
    const track = (name, payload = {}) => {
      trackEvent(name, { ...payload, path: pathname });
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
      const link = event.target.closest?.("a[href], button[data-analytics-event], button[aria-label], button[data-slot=carousel-next], button[data-slot=carousel-previous]");
      if (!link) return;
      if (link.tagName === "A") preserveCampaign(link);
      const url = link.tagName === "A" ? new URL(link.href, location.href) : null;
      const controlLabel = link.getAttribute("aria-label") || link.textContent?.trim() || "";
      const carouselAction = /^(Next|Previous) (slide|features)$/.test(controlLabel);
      let eventName = link.dataset.analyticsEvent;
      if (!eventName && carouselAction) eventName = "Carousel Navigation";
      if (!eventName && url?.origin === location.origin) {
        if (url.pathname === "/download") eventName = "Download";
        else if (url.pathname === "/demo") eventName = "Online Demo";
        else if (url.pathname.startsWith("/docs")) eventName = "Docs Link";
        else if (url.pathname.startsWith("/features") || url.hash) eventName = "Feature Link";
      }
      if (!eventName) return;
      track(eventName, {
        location: link.dataset.analyticsLocation || currentSection(),
        target: link.dataset.analyticsTarget || (url ? url.pathname + url.hash : controlLabel || "unknown"),
      });
    };

    const watched = new Set();
    const onPlaying = (event) => {
      const video = event.target;
      if (!video.matches?.("video[data-feature-demo]")) return;
      const label = video.getAttribute("aria-label") || "demo";
      if (watched.has(label)) return;
      watched.add(label);
      track("Video Started", { video: label, section: currentSection() });
    };
    document.addEventListener("playing", onPlaying, true);
    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("scroll", checkScrollDepth, { passive: true });
    checkScrollDepth();

    return () => {
      document.removeEventListener("playing", onPlaying, true);
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("scroll", checkScrollDepth);
    };
  }, [pathname]);

  return <VercelAnalytics />;
}
