"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

let toolkit;

export default function MoleculePortrait({ molecule }) {
  const root = useRef(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: "240px" });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!ready) return;
    let cancelled = false;
    setError(false);
    toolkit ||= window.initRDKitModule({ locateFile: name => `/burette-viewer/rdkit/${name}` });
    toolkit.then(rdkit => {
      if (cancelled) return;
      const mol = rdkit.get_mol(molecule.smiles);
      try {
        if (!mol) throw new Error("Invalid molecule");
        setSvg(mol.get_svg(440, 280));
      } finally { mol?.delete(); }
    }).catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, [ready, molecule]);
  return <div ref={root} className="molecule-portrait" role="img" aria-label={`Chemical structure of ${molecule.name}`}>
    {visible && <Script src="/burette-viewer/rdkit/RDKit_minimal.js" onReady={() => setReady(true)} onError={() => setError(true)} />}
    {error ? <p>Structure unavailable. Select another molecule.</p> : svg
      ? <div dangerouslySetInnerHTML={{ __html: svg }} />
      : <p>Drawing the molecule…</p>}
  </div>;
}
