"use client";

import { useEffect, useRef, useState } from "react";
import Demo from "./demo";
import FeatureCards from "./cards";
import groups from "./catalog.json";

export default function Catalog() {
  const [current, setCurrent] = useState("preview");
  const root = useRef(null);
  useEffect(() => {
    const update = () => {
      const sections = [...root.current.querySelectorAll("section[id]")];
      const passed = sections.filter(section => section.getBoundingClientRect().top <= 180);
      setCurrent((passed.at(-1) || sections[0]).id);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div ref={root} className="feature-layout page-width">
    <nav className="feature-index" aria-label="Feature categories">{groups.map((g) => <a href={`#${g.id}`} key={g.id} aria-current={current === g.id ? "location" : undefined}>{({preview:"Quick Look",structures:"3D viewer",selection:"Selection & analysis",motion:"Motion & poses",collections:"Collections","chemical-space":"Chemical Space",compute:"Calculations",editing:"Workspace & editing",integrations:"Integrations"})[g.id]}</a>)}</nav>
    <div className="feature-sections">{groups.map((group, index) => <section id={group.id} className="feature-group" key={group.id}>
      <p className="feature-number">{String(index + 1).padStart(2, "0")} / {String(groups.length).padStart(2, "0")}</p>
      <h2>{group.title}</h2><p className="feature-intro">{group.intro}</p>
      <Demo id={group.media} title={group.title} />
      <FeatureCards group={group} />
      {group.id === "collections" && <Demo id="collection-3d" title="From collection to molecular view" />}
      <a className="feature-guide" href={group.docs}>Read the guide <span aria-hidden="true">↗</span></a>
    </section>)}</div>
  </div>;
}
