import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ClosingCta() {
  return (
    <section className="closing-section page-width">
      <h2>Take a closer look.</h2>
      <p>Burette is free and open source. Made for your Mac.</p>
      <Button asChild size="lg" className="pill-button">
        <Link
          href="/download?source=closing"
          data-analytics-event="Download"
          data-analytics-location="closing-cta"
          data-analytics-target="dmg"
        >
          Download for macOS
        </Link>
      </Button>
    </section>
  );
}
