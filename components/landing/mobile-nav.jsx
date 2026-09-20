"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function MobileNav() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="mobile-nav-trigger" aria-label="Open menu">
          <Menu aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="landing-menu">
        <DialogTitle>Burette</DialogTitle>
        <DialogDescription className="sr-only">Explore Burette and its documentation.</DialogDescription>
        <nav aria-label="Mobile sections">
          <DialogClose asChild><a href="/features">Features</a></DialogClose>
          <DialogClose asChild><a href="/#formats">File formats</a></DialogClose>
          <DialogClose asChild><a href="/#codex">For agents</a></DialogClose>
          <DialogClose asChild><Link href="/docs">Documentation</Link></DialogClose>
          <DialogClose asChild><a href="/out/github-repo?surface=mobile-nav">GitHub ↗</a></DialogClose>
          <DialogClose asChild><Link href="/demo">Open the browser workspace ↗</Link></DialogClose>
        </nav>
      </DialogContent>
    </Dialog>
  );
}
