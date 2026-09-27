# Website analytics

Vercel Web Analytics is mounted once in `app/layout.jsx` through its Next.js integration. It covers direct visits and client navigation on React pages, including Features and Docs. Standalone download, outbound redirect and legal HTML load the Web Analytics script independently. Speed Insights is intentionally not loaded.

Custom events: Download (intent), Download Started (download-page redirect attempt, not completed file transfer), Outbound Link / Outbound Redirect, Online Demo (entry click, not workspace readiness), Docs Link, Feature Link, Carousel Navigation (arrow buttons), Brew Copy (successful clipboard write), Scroll Depth and Video Started (once per video label per page visit). Each React event carries a pathname, not molecular file content. Video loops and theme changes do not count as new starts on the same page.

The external web-demo runtime has a separate deployment; this site does not claim to measure completed initialization or molecular activity inside it. Carousel drag/swipe is not an arrow-button event. Ad blockers can prevent measurement. Validate request acceptance separately from dashboard aggregation; a loaded script alone is not proof of recorded events.

Media: `Light and dark.mp4` from the user is represented by `light-and-dark.mp4`, source interval 2.5–11.6s, 960×770, H.264, 60fps, 858531 bytes, silent. The initial blank loading scene is omitted. Six sampled frames were reviewed; original Desktop file is unchanged.
