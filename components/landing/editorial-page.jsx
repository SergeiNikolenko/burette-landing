import SiteNav from "./site-nav";
import SiteFooter from "./site-footer";
import SkyCanvas from "./sky-canvas";

export default function EditorialPage({ eyebrow, title, effectiveDate, children }) {
  return (
    <div className="landing subpage" id="top">
      <SiteNav />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <main id="main">
        <div className="subpage-hero">
          <div className="subpage-sky" aria-hidden="true">
            <SkyCanvas className="subpage-clouds" />
          </div>
          <header className="editorial-doc-header subpage-hero-copy">
            {eyebrow && <p className="section-label">{eyebrow}</p>}
            <h1>{title}</h1>
            {effectiveDate && (
              <p className="editorial-doc-meta">Effective date: {effectiveDate}</p>
            )}
          </header>
        </div>
        <article className="editorial-doc-body">{children}</article>
      </main>
      <SiteFooter />
    </div>
  );
}
