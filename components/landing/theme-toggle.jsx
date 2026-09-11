"use client";

import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "burette-theme";

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  // The pre-paint script in the root layout has already set data-theme, so the
  // first client render must not guess: it reads what is actually on the element.
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(currentTheme());
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = (event) => {
      // A manual choice outranks the system; the old build cleared the stored
      // value on every mount, so the toggle silently forgot itself on reload.
      let stored = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {}
      if (stored) return;
      const next = event.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    };
    media.addEventListener("change", onSystem);
    return () => media.removeEventListener("change", onSystem);
  }, []);

  const toggle = useCallback(() => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    setTheme(next);
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle color theme"
      aria-pressed={theme === "dark"}
      className="size-11 rounded-full"
    >
      {/* Both icons render and CSS picks one, so the button is correct on the
          server too and never flashes the wrong glyph before hydration. */}
      <Moon aria-hidden="true" className="size-4 dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-4 dark:block" />
    </Button>
  );
}
