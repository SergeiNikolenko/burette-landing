"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const PLATFORM_INFO = {
  macos: {
    key: "macos",
    label: "macOS",
    cta: "Download for macOS",
    href: "/download?platform=macos",
    target: "dmg",
  },
  windows: {
    key: "windows",
    label: "Windows",
    cta: "Download for Windows",
    href: "/download?platform=windows",
    target: "windows-exe",
  },
  linux: {
    key: "linux",
    label: "Linux",
    cta: "Download for Linux",
    href: "/download?platform=linux-deb",
    target: "linux-deb",
  },
};

export function detectVisitorPlatform() {
  if (typeof navigator === "undefined") return "macos";
  const hint = (navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || "").toLowerCase();
  if (hint.includes("win")) return "windows";
  if (hint.includes("linux") && !hint.includes("android")) return "linux";
  return "macos";
}

export function useVisitorPlatform() {
  const [platform, setPlatform] = useState("macos");
  useEffect(() => {
    setPlatform(detectVisitorPlatform());
  }, []);
  return platform;
}

export function PlatformDownloadButton({ source = "hero", location = "hero", size = "lg", label, className = "pill-button" }) {
  const platform = useVisitorPlatform();
  const info = PLATFORM_INFO[platform] || PLATFORM_INFO.macos;
  return (
    <Button asChild size={size} className={className}>
      <Link
        href={`${info.href}&source=${source}`}
        data-analytics-event="Download"
        data-analytics-location={location}
        data-analytics-target={info.target}
      >
        {label || info.cta}
      </Link>
    </Button>
  );
}

export function HeroPlatformLinks() {
  const platform = useVisitorPlatform();
  return (
    <p className="hero-note hero-platforms">
      <span>Also available:</span>
      {platform !== "macos" && (
        <Link href="/download?platform=macos&source=hero-alt" data-analytics-event="Download" data-analytics-location="hero-alt" data-analytics-target="dmg">
          macOS
        </Link>
      )}
      {platform !== "windows" && (
        <Link href="/download?platform=windows&source=hero-alt" data-analytics-event="Download" data-analytics-location="hero-alt" data-analytics-target="windows-exe">
          Windows
        </Link>
      )}
      {platform !== "linux" && (
        <a href="#install">Linux (.deb, .rpm, AppImage)</a>
      )}
      {platform === "linux" && (
        <a href="#install">.rpm &amp; AppImage</a>
      )}
      <span aria-hidden="true">·</span>
      <span>Free and open source.</span>
    </p>
  );
}
