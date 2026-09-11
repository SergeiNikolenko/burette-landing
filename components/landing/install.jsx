import Link from "next/link";
import BrewCommand from "./brew-command";

export default function Install() {
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
            On your Mac.
            <br />
            In a moment.
          </h2>
          <p className="install-note">macOS 12+ · Apple Silicon and Intel</p>
          <Link className="text-link" href="/docs/get-started/install">
            Installation guide <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div>
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
            Open Burette once to enable Finder previews. Public downloads are
            ad-hoc signed; macOS may ask you to approve the first launch.
          </p>
        </div>
      </div>
    </section>
  );
}
