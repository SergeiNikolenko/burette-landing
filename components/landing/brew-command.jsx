"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

const COMMAND = "brew install --cask burette";

// The old hero styled this as a copy chip but wired it to href="#install", so
// the click scrolled instead of copying and the gesture quietly lied. It copies
// now, and it sits at secondary weight next to the download button rather than
// competing with it as a third equal call to action.
export default function BrewCommand() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be denied; leaving the label alone is the honest
      // outcome, since claiming "Copied" would be worse than saying nothing.
    }
  }, []);

  return (
    <button
      type="button"
      onClick={copy}
      data-analytics-event="Brew Copy"
      data-analytics-location="hero"
      data-analytics-target="brew"
      className="border-input text-muted-foreground hover:text-foreground hover:border-foreground/25 inline-flex h-12 shrink-0 items-center gap-2.5 rounded-md border px-4 font-mono text-[13px] whitespace-nowrap transition-colors"
    >
      <span className="text-mono select-none">$</span>
      {COMMAND}
      {copied ? (
        <Check aria-hidden="true" className="text-brand size-3.5" />
      ) : (
        <Copy aria-hidden="true" className="size-3.5 opacity-70" />
      )}
      <span className="sr-only">
        {copied ? "Copied to clipboard" : "Copy the Homebrew command"}
      </span>
    </button>
  );
}
