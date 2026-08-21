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

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
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
      {/* nextra's own <Head /> renders a real <head> element, so it can only ever
          be a direct child of <html>. Rather than mount two of them, the docs
          layout no longer renders it and this single head serves every route;
          what it used to contribute (theme-color, favicon) is declared through
          the metadata export instead. */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{var s=localStorage.getItem("burette-theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-theme",d?"dark":"light")}catch(e){document.documentElement.setAttribute("data-theme","light")}',
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
