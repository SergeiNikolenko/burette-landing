import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";

// The docs chrome and nextra's stylesheet live here rather than in the root
// layout, so the landing route does not inherit documentation navigation and
// nextra's CSS is not loaded for visitors who never open /docs.
export default async function DocsLayout({ children }) {
  const navbar = (
    <Navbar
      logo={<strong>Burette Docs</strong>}
      logoLink="/docs"
      projectLink="https://github.com/SergeiNikolenko/Burette"
    />
  );

  return (
    <>
      <Layout
        navbar={navbar}
        pageMap={await getPageMap("/docs")}
        docsRepositoryBase="https://github.com/SergeiNikolenko/burette-landing/tree/main"
        editLink="Edit this page on GitHub"
        feedback={{
          content: "Report a docs issue",
          labels: "docs",
        }}
        sidebar={{ defaultMenuCollapseLevel: 1 }}
        toc={{ title: "On this page" }}
        footer={
          <Footer>
            <span>
              Published by Sergei A. Nikolenko under the MIT License. ·{" "}
              <a href="/support">Support</a> · <a href="/privacy">Privacy</a> ·{" "}
              <a href="/terms">Terms</a>
            </span>
          </Footer>
        }
      >
        {children}
      </Layout>
    </>
  );
}
