import { SITE_URL } from "./site-url.js";

export function legalPage({ path, title, description, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | Burette</title>
<meta name="description" content="${description}">
<meta name="author" content="Sergei A. Nikolenko">
<link rel="canonical" href="${SITE_URL}${path}">
<meta property="og:title" content="${title} | Burette">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
<meta property="og:image" content="${SITE_URL}/assets/burette-quicklook.png">
<meta name="theme-color" content="#0a0a0a">
<style>
  * { box-sizing: border-box; }
  :root { color-scheme: light dark; --bg: #fff; --surface: #fbfbfa; --border: #e8e8e5; --text: #0a0a0a; --body: #52524e; --accent: #0f8f72; }
  @media (prefers-color-scheme: dark) { :root { --bg: #09090b; --surface: #0d0d10; --border: #26262b; --text: #ededed; --body: #a2a29e; --accent: #2ac59c; } }
  html, body { margin: 0; }
  body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  a { color: var(--accent); }
  header, footer { border-color: var(--border); background: var(--surface); }
  header { border-bottom: 1px solid var(--border); }
  nav, main, footer div { width: min(100% - 40px, 760px); margin: 0 auto; }
  nav { min-height: 64px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
  nav a { color: var(--text); text-decoration: none; }
  nav strong { font-size: 19px; letter-spacing: -.02em; }
  main { padding: 72px 0 88px; }
  h1 { margin: 0 0 12px; font-size: clamp(38px, 8vw, 58px); letter-spacing: -.045em; line-height: 1.02; }
  h2 { margin: 42px 0 12px; font-size: 22px; letter-spacing: -.02em; }
  p, li { color: var(--body); font-size: 16px; line-height: 1.7; }
  .effective { margin: 0 0 42px; font-size: 14px; }
  footer { border-top: 1px solid var(--border); }
  footer div { min-height: 76px; display: flex; align-items: center; justify-content: space-between; gap: 20px; color: var(--body); font-size: 14px; }
  footer span { display: flex; gap: 18px; }
  @media (max-width: 560px) { main { padding-top: 48px; } footer div { align-items: flex-start; flex-direction: column; justify-content: center; } }
</style>
</head>
<body>
<header><nav><a href="/"><strong>Burette</strong></a><a href="/docs">Documentation</a></nav></header>
<main>
  <h1>${title}</h1>
  <p class="effective">Effective date: July 10, 2026</p>
  ${body}
</main>
<footer><div><span>Published by Sergei A. Nikolenko under the MIT License.</span><span><a href="/support">Support</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="https://github.com/SergeiNikolenko/Burette">GitHub</a></span></div></footer>
</body>
</html>`;
}
