const OWNER = "SergeiNikolenko";
const REPO = "Burette";

// Fetched on the server and revalidated hourly. The original did this from the
// browser on every page load, which put a fourth third-party origin in the
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
      next: { revalidate: 3600 },
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
      className="group bg-primary text-primary-foreground inline-flex min-h-[42px] items-center justify-center gap-2.5 rounded-sm px-4 text-sm leading-none font-semibold whitespace-nowrap shadow-[0_1px_2px_rgb(0_0_0/0.12)] transition-transform duration-200 ease-[cubic-bezier(.34,1.56,.64,1)] hover:scale-105 active:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-[17px] shrink-0">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>

      <span className="hidden min-[1001px]:inline">GitHub</span>

      {label ? (
        <span className="min-w-[2ch] text-center tabular-nums">{label}</span>
      ) : null}

      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-[17px] shrink-0 transition-transform duration-250 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:rotate-12 group-hover:scale-110 group-hover:text-[#facc15] motion-reduce:transition-none motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100"
      >
        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.164.75a.53.53 0 0 1 .294.904l-3.737 3.642a2.12 2.12 0 0 0-.61 1.878l.882 5.143a.53.53 0 0 1-.769.559l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.559l.883-5.143a2.12 2.12 0 0 0-.61-1.878l-3.737-3.642a.53.53 0 0 1 .294-.904l5.165-.75a2.12 2.12 0 0 0 1.594-1.16z" />
      </svg>
    </a>
  );
}
