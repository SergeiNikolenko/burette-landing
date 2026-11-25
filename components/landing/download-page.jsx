"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import BrewCommand from "./brew-command";
import SkyCanvas from "./sky-canvas";
import { detectVisitorPlatform } from "./platform-download";

const PLATFORM_TABS = [
  { id: "macos", label: "macOS" },
  { id: "windows", label: "Windows" },
  { id: "linux-deb", label: "Linux (.deb)" },
  { id: "linux-rpm", label: "Linux (.rpm)" },
  { id: "linux-appimage", label: "AppImage" },
];

const PROFILES = {
  macos: {
    label: "macOS",
    pageTitle: "Download Burette for macOS",
    lede: "Four short steps take you from the disk image to your first molecular Quick Look.",
    downloadCta: "Download DMG",
    fallbackSpecs: ["macOS 12+", "Apple Silicon"],
    steps: [
      {
        title: "Open the DMG",
        body: "Double-click the downloaded Burette disk image in your Downloads folder.",
      },
      {
        title: "Install Burette",
        body: "Drag Burette.app into Applications and approve first launch in System Settings if prompted.",
      },
      {
        title: "Register Quick Look",
        body: "Opening Burette once registers its Finder preview and thumbnail extensions with macOS.",
      },
      {
        title: "Press Space",
        body: "Select a PDB, CIF, SDF, XYZ, trajectory, or chemistry table in Finder.",
      },
    ],
    cliLabel: "Or install with Homebrew",
    commands: [
      { command: "brew tap SergeiNikolenko/burette", location: "download-macos-tap" },
      { command: "brew install --cask burette", location: "download-macos-cask" },
    ],
  },
  windows: {
    label: "Windows",
    pageTitle: "Download Burette for Windows",
    lede: "Per-user x64 installer for Windows 10 and 11. No administrator rights required.",
    downloadCta: "Download Windows installer",
    fallbackSpecs: ["Windows 10 & 11", "x64"],
    steps: [
      {
        title: "Run the installer",
        body: (
          <>
            Launch <code>Burette_*_x64-setup.exe</code> from your Downloads folder.
          </>
        ),
      },
      {
        title: "Confirm SmartScreen",
        body: "Release installers are currently unsigned, so choose More info → Run anyway on first launch.",
      },
      {
        title: "Finish setup",
        body: (
          <>
            Installs into <code>%LOCALAPPDATA%\Burette</code>, fetches WebView2 if missing, and adds Start menu shortcuts.
          </>
        ),
      },
      {
        title: "Open molecules",
        body: "Double-click PDB, CIF, SDF, MOL2, XTC, or XYZ files, or launch Burette from Start.",
      },
    ],
    commands: [],
  },
  "linux-deb": {
    label: "Linux (.deb)",
    pageTitle: "Download Burette for Linux (.deb)",
    lede: "Debian and Ubuntu x86_64 package with desktop launcher and molecular MIME associations.",
    downloadCta: "Download .deb",
    fallbackSpecs: ["Debian & Ubuntu", "x86_64", "WebKitGTK 4.1"],
    steps: [
      {
        title: "Install the package",
        body: (
          <>
            Run <code>sudo apt install ./Burette_*_amd64.deb</code> in your Downloads folder.
          </>
        ),
      },
      {
        title: "Desktop integration",
        body: "Registers molecular MIME types, the desktop launcher entry, and burette:// links.",
      },
      {
        title: "Launch Burette",
        body: "Open Burette from your application launcher or pass structure files from the terminal.",
      },
      {
        title: "Inspect structures",
        body: "Open PDB, CIF, SDF, XYZ, trajectories, and compound tables in side-by-side tabs.",
      },
    ],
    cliLabel: "Install command",
    commands: [
      { command: "sudo apt install ./Burette_*_amd64.deb", location: "download-linux-deb" },
    ],
  },
  "linux-rpm": {
    label: "Linux (.rpm)",
    pageTitle: "Download Burette for Linux (.rpm)",
    lede: "Fedora, RHEL, and openSUSE x86_64 package with desktop launcher and MIME associations.",
    downloadCta: "Download .rpm",
    fallbackSpecs: ["Fedora & RHEL", "x86_64", "WebKitGTK 4.1"],
    steps: [
      {
        title: "Install the package",
        body: (
          <>
            Run <code>sudo dnf install ./Burette-*.x86_64.rpm</code> in your Downloads folder.
          </>
        ),
      },
      {
        title: "Desktop integration",
        body: "Registers molecular MIME types, the desktop launcher entry, and burette:// links.",
      },
      {
        title: "Launch Burette",
        body: "Open Burette from your application launcher or pass structure files from the terminal.",
      },
      {
        title: "Inspect structures",
        body: "Open PDB, CIF, SDF, XYZ, trajectories, and compound tables in side-by-side tabs.",
      },
    ],
    cliLabel: "Install command",
    commands: [
      { command: "sudo dnf install ./Burette-*.x86_64.rpm", location: "download-linux-rpm" },
    ],
  },
  "linux-appimage": {
    label: "AppImage",
    pageTitle: "Download Burette for Linux (AppImage)",
    lede: "Portable x86_64 Linux bundle ready to run on any distro with WebKitGTK 4.1.",
    downloadCta: "Download AppImage",
    fallbackSpecs: ["Portable Linux", "x86_64", "WebKitGTK 4.1"],
    steps: [
      {
        title: "Install the package",
        body: (
          <>
            Mark it executable with <code>chmod +x Burette_*_amd64.AppImage</code>.
          </>
        ),
      },
      {
        title: "Run the AppImage",
        body: (
          <>
            Launch <code>./Burette_*_amd64.AppImage</code> directly or integrate it with AppImageLauncher.
          </>
        ),
      },
      {
        title: "System WebKitGTK",
        body: "Uses the system WebKitGTK 4.1 runtime provided by Ubuntu 22.04+, Debian 12+, and Fedora 39+.",
      },
      {
        title: "Inspect structures",
        body: "Open PDB, CIF, SDF, XYZ, trajectories, and compound tables in side-by-side tabs.",
      },
    ],
    cliLabel: "Run command",
    commands: [
      {
        command: "chmod +x Burette_*_amd64.AppImage && ./Burette_*_amd64.AppImage",
        location: "download-linux-appimage",
      },
    ],
  },
};

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return null;
  const mb = bytes / 1024 / 1024;
  return `${mb.toFixed(mb > 10 ? 0 : 1)}\u00a0MB`;
}

function buildDownloadUrl(platform, search) {
  const params = new URLSearchParams(search || "");
  params.set("platform", platform);
  return `/api/download?${params.toString()}`;
}

export default function DownloadPage({ initialPlatform = "macos", hasExplicitPlatform = false }) {
  const [platform, setPlatform] = useState(
    PROFILES[initialPlatform] ? initialPlatform : "macos",
  );
  const [autoStartedPlatform, setAutoStartedPlatform] = useState(
    PROFILES[initialPlatform] ? initialPlatform : "macos",
  );
  const [querySearch, setQuerySearch] = useState("");
  const [release, setRelease] = useState(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const search = window.location.search;
    setQuerySearch(search);

    let resolved = PROFILES[initialPlatform] ? initialPlatform : "macos";
    if (!hasExplicitPlatform) {
      const detected = detectVisitorPlatform();
      resolved = detected === "windows" ? "windows" : detected === "linux" ? "linux-deb" : "macos";
      setPlatform(resolved);
    }
    setAutoStartedPlatform(resolved);

    const controller = new AbortController();
    fetch("/api/release", { cache: "no-store", signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (data) setRelease(data);
      })
      .catch(() => {});

    if (!startedRef.current) {
      startedRef.current = true;
      const params = new URLSearchParams(search);
      try {
        track("Download Started", {
          location: "download-page",
          platform: resolved,
          source: params.get("source") || "unknown",
        });
      } catch {}

      const target = buildDownloadUrl(resolved, search);
      const timer = window.setTimeout(() => {
        window.location.assign(target);
      }, 900);
      return () => {
        window.clearTimeout(timer);
        controller.abort();
      };
    }

    return () => controller.abort();
  }, [initialPlatform, hasExplicitPlatform]);

  const profile = PROFILES[platform] || PROFILES.macos;
  const asset =
    release?.platforms?.[platform] ||
    (platform === "macos" && release?.assetName
      ? { assetName: release.assetName, sizeBytes: release.sizeBytes }
      : null);

  useEffect(() => {
    document.title = profile.pageTitle;
  }, [profile.pageTitle]);

  const selectPlatform = (nextPlatform) => {
    setPlatform(nextPlatform);
    try {
      const params = new URLSearchParams(window.location.search);
      params.set("platform", nextPlatform);
      const nextSearch = `?${params.toString()}`;
      setQuerySearch(nextSearch);
      window.history.replaceState(null, "", `/download${nextSearch}`);
    } catch {}
  };

  const onTabKeyDown = (event, index) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % PLATFORM_TABS.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + PLATFORM_TABS.length) % PLATFORM_TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = PLATFORM_TABS.length - 1;
    else return;
    event.preventDefault();
    const target = PLATFORM_TABS[next];
    selectPlatform(target.id);
    document.getElementById(`download-tab-${target.id}`)?.focus();
  };

  const isAutoPlatform = platform === autoStartedPlatform;
  const downloadHref = buildDownloadUrl(platform, querySearch);
  const formattedSize = formatBytes(asset?.sizeBytes);

  return (
    <>
      <section className="subpage-hero">
        <div className="subpage-sky" aria-hidden="true">
          <SkyCanvas className="subpage-clouds" />
        </div>
        <div className="download-heading subpage-hero-copy page-width">
          <p className="section-label">{profile.label}</p>
          <h1>{isAutoPlatform ? "Burette is downloading." : profile.pageTitle}</h1>
          <p className="download-lede">{profile.lede}</p>

          <div
            className="install-tabs download-tabs"
            role="tablist"
            aria-label="Download platform"
          >
            {PLATFORM_TABS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`download-tab-${item.id}`}
                aria-selected={platform === item.id}
                aria-controls="download-panel"
                tabIndex={platform === item.id ? 0 : -1}
                className="install-tab"
                onClick={() => selectPlatform(item.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="download-asset-bar" aria-live="polite">
            {asset?.assetName ? (
              <>
                <span className="download-asset-name">{asset.assetName}</span>
                {formattedSize && (
                  <>
                    <span className="download-asset-sep" aria-hidden="true" />
                    <span>{formattedSize}</span>
                  </>
                )}
                {release?.tag && (
                  <>
                    <span className="download-asset-sep" aria-hidden="true" />
                    <span>{release.tag}</span>
                  </>
                )}
                {asset.checksumUrl && (
                  <>
                    <span className="download-asset-sep" aria-hidden="true" />
                    <a
                      className="download-checksum-link"
                      href={asset.checksumUrl}
                      target="_blank"
                      rel="noopener"
                    >
                      SHA-256 <span aria-hidden="true">↗</span>
                    </a>
                  </>
                )}
              </>
            ) : (
              profile.fallbackSpecs.map((spec, index) => (
                <Fragment key={spec}>
                  {index > 0 && <span className="download-asset-sep" aria-hidden="true" />}
                  <span>{spec}</span>
                </Fragment>
              ))
            )}
          </div>

          <div className="download-actions">
            <Button asChild size="lg" className="pill-button">
              <a
                href={downloadHref}
                data-download-again
                data-analytics-event="Download"
                data-analytics-location="download-page"
                data-analytics-target={platform}
              >
                {isAutoPlatform ? "Download again" : profile.downloadCta}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="pill-button">
              <Link href="/docs/get-started/install">Installation guide</Link>
            </Button>
            <a
              className="text-link"
              href="/out/github-releases?surface=download-page"
              target="_blank"
              rel="noopener"
            >
              All GitHub releases <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section
        id="download-panel"
        role="tabpanel"
        aria-labelledby={`download-tab-${platform}`}
        className="download-content page-width"
      >
        <div className="download-steps" aria-label="Installation steps">
          {profile.steps.map((step, index) => (
            <article key={step.title} className="download-step">
              <span className="download-step-num">{String(index + 1).padStart(2, "0")}</span>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </article>
          ))}
        </div>

        {profile.commands.length > 0 && (
          <div className="download-cli">
            <p className="download-cli-label">{profile.cliLabel}</p>
            <ol className="install-commands" aria-label={profile.cliLabel}>
              {profile.commands.map((item) => (
                <li key={item.command}>
                  <BrewCommand
                    command={item.command}
                    location={item.location}
                    compact
                  />
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>
    </>
  );
}
