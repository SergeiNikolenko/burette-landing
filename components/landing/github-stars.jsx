import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const OWNER = "SergeiNikolenko";
const REPO = "Burette";

// Fetched on the server and revalidated every five minutes. The original did
// this from the browser on every page load, which put a fourth third-party origin in the
// critical path, spent the unauthenticated 60-per-hour-per-IP budget on real
// visitors, and sat oddly on a page whose pitch is "no account, nothing leaves
// your Mac". Same button, no request from the visitor.
async function fetchStars() {
  try {
    const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "burette-landing-star-count",
      },
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    const repository = await response.json();
    return Number.isInteger(repository?.stargazers_count)
      ? repository.stargazers_count
      : null;
  } catch {
    return null;
  }
}

export default async function GithubStars() {
  const stars = await fetchStars();
  const label =
    stars === null
      ? null
      : new Intl.NumberFormat("en", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(stars);

  return (
    <Button asChild variant="ghost" size="sm">
    <a
      href="https://github.com/SergeiNikolenko/Burette"
      target="_blank"
      rel="noopener"
      data-analytics-event="Outbound Link"
      data-analytics-location="nav"
      data-analytics-target="github-repo"
      aria-label={
        stars === null
          ? "Burette on GitHub"
          : `Burette on GitHub, ${stars} stars`
      }

    >
      <Github aria-hidden="true" data-icon="inline-start" />

      <span className="hidden xl:inline">GitHub</span>

      {label ? (
        <span className="hidden min-[380px]:inline tabular-nums">{label}</span>
      ) : null}


    </a>
    </Button>
  );
}
