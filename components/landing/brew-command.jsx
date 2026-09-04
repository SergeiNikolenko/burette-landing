"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

// The cask lives in a tap, so a bare `brew install --cask burette` fails on any
// machine that has not tapped it - which is every machine this button is for.
// The fully qualified name is one line that works from a cold Homebrew, so the
// chip shows and copies exactly the same string rather than copying a second,
// hidden `brew tap` line the way the old page did.
const COMMAND = "brew install --cask SergeiNikolenko/burette/burette";

// The old hero styled this as a copy chip but wired it to href="#install", so
// the click scrolled instead of copying and the gesture quietly lied. It copies
// now, and it sits at secondary weight next to the download button rather than
// competing with it as a third equal call to action.
export default function BrewCommand({
  command = COMMAND,
  location = "hero",
  compact = false,
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be denied; leaving the label alone is the honest
      // outcome, since claiming "Copied" would be worse than saying nothing.
    }
  }, [command]);

  const accessibleLabel = copied
    ? "Copied to clipboard"
    : `Copy command: ${command}`;

  if (compact) {
    return (
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <code className="text-foreground min-w-0 flex-1 truncate font-mono text-[13px]">
          <span className="text-mono select-none">$ </span>
          {command}
        </code>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={copy}
          data-analytics-event="Brew Copy"
          data-analytics-location={location}
          data-analytics-target="brew"
          aria-label={accessibleLabel}
        >
          {copied ? (
            <Check aria-hidden="true" data-icon="inline-start" />
          ) : (
            <Copy aria-hidden="true" data-icon="inline-start" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="lg"
      onClick={copy}
      data-analytics-event="Brew Copy"
      data-analytics-location={location}
      data-analytics-target="brew"
      aria-label={accessibleLabel}
      className="h-auto max-w-full py-3 text-left whitespace-normal"
    >
      <span className="text-mono select-none font-mono">$</span>
      <span className="min-w-0 break-words font-mono text-xs">{command}</span>
      {copied ? (
        <Check aria-hidden="true" data-icon="inline-end" />
      ) : (
        <Copy aria-hidden="true" data-icon="inline-end" />
      )}
    </Button>
  );
}
