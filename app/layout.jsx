import { Head } from "nextra/components";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_URL } from "./site-url.js";

const geistSans = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "Sergei A. Nikolenko" }],
  title: {
    default: "Burette Docs",
    template: "%s | Burette Docs",
  },
  description:
    "Documentation for Burette across macOS, Finder Quick Look, iPhone, the public molecular plugin, and typed MCP tools.",
};

// The root layout deliberately holds nothing but the document shell. The nextra
// docs chrome used to live here, which meant every future page - including the
// landing - would have been wrapped in docs navigation. It now lives in
// app/docs/layout.jsx, next to the only routes that want it.
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      {/* nextra's Head renders the real <head> element, and it has to: the docs
          stylesheet reads --nextra-bg, --nextra-content-width and the
          --nextra-primary-* triple from it, and dropping it left every one of
          those empty. It only works as a direct child of <html>, and mounting a
          second head breaks hydration, so this is the page's only one and the
          theme script goes inside it as a child. */}
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var s=localStorage.getItem("burette-theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-theme",d?"dark":"light")}catch(e){document.documentElement.setAttribute("data-theme","light")}',
          }}
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
