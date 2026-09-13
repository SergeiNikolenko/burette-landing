import { Button } from "@/components/ui/button";

export default function WorkspaceDemo({ label = "Try in your browser" }) {
  return <Button asChild variant="ghost" size="lg" className="pill-button">
    <a href="/demo" target="_blank" rel="noopener noreferrer" data-analytics-event="Online Demo" data-analytics-location="hero" data-analytics-target="browser-workspace">{label}</a>
  </Button>;
}
