"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BrewCommand from "./brew-command";
import { detectVisitorPlatform } from "./platform-download";

const PLATFORMS = [
  { id: "macos", label: "macOS" },
  { id: "windows", label: "Windows" },
  { id: "linux", label: "Linux" },
];

export default function Install() {
  const [active, setActive] = useState("macos");
  useEffect(() => {
    setActive(detectVisitorPlatform());
  }, []);
  const onTabKeyDown = (event, index) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % PLATFORMS.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + PLATFORMS.length) % PLATFORMS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = PLATFORMS.length - 1;
    else return;
    event.preventDefault();
    const target = PLATFORMS[next];
    setActive(target.id);
    document.getElementById(`install-tab-${target.id}`)?.focus();
  };

  return (
    <section
      id="install"
      aria-labelledby="install-title"
      className="install-section page-width"
    >
      <div className="chapter-heading">
        <div>
          <p className="section-label">Installation</p>
          <h2 id="install-title">
            Install Burette.
            <br />
            On your desktop.
          </h2>
          <p className="install-note">macOS 12+ (Apple Silicon) · Windows 10/11 (x64) · Linux (x86_64)</p>
          <Link className="text-link" href="/docs/get-started/install">
            Installation guide <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div>
          <div className="install-tabs" role="tablist" aria-label="Operating system">
            {PLATFORMS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`install-tab-${item.id}`}
                aria-selected={active === item.id}
                aria-controls={`install-panel-${item.id}`}
                tabIndex={active === item.id ? 0 : -1}
                className="install-tab"
                onClick={() => setActive(item.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            id="install-panel-macos"
            role="tabpanel"
            aria-labelledby="install-tab-macos"
            hidden={active !== "macos"}
          >
            <div className="install-downloads">
              <Button asChild size="sm" className="pill-button">
                <Link
                  href="/download?platform=macos&source=install"
                  data-analytics-event="Download"
                  data-analytics-location="install"
                  data-analytics-target="dmg"
                >
                  Download DMG
                </Link>
              </Button>
              <a className="text-link install-releases-link" href="/out/github-releases?surface=install-macos" target="_blank" rel="noopener">
                All releases <span aria-hidden="true">↗</span>
              </a>
            </div>
            <ol
              className="install-commands"
              aria-label="Homebrew installation commands"
            >
              <li>
                <BrewCommand
                  command="brew tap SergeiNikolenko/burette"
                  location="install-tap"
                  compact
                />
              </li>
              <li>
                <BrewCommand
                  command="brew install --cask burette"
                  location="install-cask"
                  compact
                />
              </li>
            </ol>
            <p className="install-note">
              Move Burette.app to Applications and open it once to register Finder Quick Look. Public builds are ad-hoc signed; approve first launch in System Settings → Privacy &amp; Security.
            </p>
          </div>

          <div
            id="install-panel-windows"
            role="tabpanel"
            aria-labelledby="install-tab-windows"
            hidden={active !== "windows"}
          >
            <div className="install-downloads">
              <Button asChild size="sm" className="pill-button">
                <Link
                  href="/download?platform=windows&source=install"
                  data-analytics-event="Download"
                  data-analytics-location="install"
                  data-analytics-target="windows-exe"
                >
                  Download Windows installer (.exe)
                </Link>
              </Button>
              <a className="text-link install-releases-link" href="/out/github-releases?surface=install-windows" target="_blank" rel="noopener">
                All releases <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="install-note">
              Per-user installer for Windows 10 and 11 (x64); no administrator rights required. WebView2 is included or fetched automatically. Release installers are unsigned, so SmartScreen asks for confirmation on first run.
            </p>
          </div>

          <div
            id="install-panel-linux"
            role="tabpanel"
            aria-labelledby="install-tab-linux"
            hidden={active !== "linux"}
          >
            <div className="install-downloads">
              <Button asChild size="sm" className="pill-button">
                <Link
                  href="/download?platform=linux-deb&source=install"
                  data-analytics-event="Download"
                  data-analytics-location="install"
                  data-analytics-target="linux-deb"
                >
                  Download .deb
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="pill-button">
                <Link
                  href="/download?platform=linux-rpm&source=install"
                  data-analytics-event="Download"
                  data-analytics-location="install"
                  data-analytics-target="linux-rpm"
                >
                  Download .rpm
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="pill-button">
                <Link
                  href="/download?platform=linux-appimage&source=install"
                  data-analytics-event="Download"
                  data-analytics-location="install"
                  data-analytics-target="linux-appimage"
                >
                  AppImage
                </Link>
              </Button>
            </div>
            <ol
              className="install-commands"
              aria-label="Linux installation commands"
            >
              <li>
                <BrewCommand
                  command="sudo apt install ./Burette_*_amd64.deb"
                  location="install-linux-deb"
                  compact
                />
              </li>
              <li>
                <BrewCommand
                  command="sudo dnf install ./Burette-*.x86_64.rpm"
                  location="install-linux-rpm"
                  compact
                />
              </li>
              <li>
                <BrewCommand
                  command="chmod +x Burette_*_amd64.AppImage && ./Burette_*_amd64.AppImage"
                  location="install-linux-appimage"
                  compact
                />
              </li>
            </ol>
            <p className="install-note">
              64-bit x86 Linux with WebKitGTK 4.1 (Ubuntu 22.04+, Debian 12+, Fedora 39+). SHA-256 checksums are published on GitHub Releases.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
