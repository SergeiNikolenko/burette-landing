"use client";

import { useEffect, useRef, useState } from "react";
import groups from "./catalog.json";

function Demo({ id, title, active, onPlay }) {
  const video = useRef(null);
  useEffect(() => {
    if (!active || !video.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.current?.pause();
    });
    observer.observe(video.current);
    return () => observer.disconnect();
  }, [active]);
  if (!id) return <div className="feature-placeholder"><span>Demo coming soon</span></div>;
  return <div className="feature-demo">
    {active ? <video ref={video} src={`/assets/features/${id}.mp4`} poster={`/assets/features/${id}.jpg`} controls autoPlay muted playsInline preload="none" aria-label={title} /> :
      <button onClick={onPlay} aria-label={`Watch ${title}`}><img src={`/assets/features/${id}.jpg`} alt={title} loading="lazy" decoding="async" width="1280" height="854" /><span className="feature-play">Watch demo <span aria-hidden="true">↗</span></span></button>}
  </div>;
}

export default function Catalog() {
  const [active, setActive] = useState(null);
  return <div className="feature-layout page-width">
    <nav className="feature-index" aria-label="Feature categories">{groups.map((g) => <a href={`#${g.id}`} key={g.id}>{({preview:"Quick Look",structures:"3D viewer",selection:"Selection & analysis",motion:"Motion & poses",collections:"Collections","chemical-space":"Chemical Space",compute:"Calculations",editing:"Workspace & editing",integrations:"Integrations"})[g.id]}</a>)}</nav>
    <div className="feature-sections">{groups.map((group, index) => <section id={group.id} className="feature-group" key={group.id}>
      <p className="feature-number">{String(index + 1).padStart(2, "0")} / {String(groups.length).padStart(2, "0")}</p>
      <h2>{group.title}</h2><p className="feature-intro">{group.intro}</p>
      <Demo id={group.media} title={group.title} active={active === group.id} onPlay={() => setActive(group.id)} />
      <div className="feature-list">{group.features.map((feature) => <article key={feature.title}><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>
      {group.id === "collections" && <Demo id="collection-3d" title="From collection to molecular view" active={active === "collection-3d"} onPlay={() => setActive("collection-3d")} />}
      <a className="feature-guide" href={group.docs}>Read the guide <span aria-hidden="true">↗</span></a>
    </section>)}</div>
  </div>;
}
