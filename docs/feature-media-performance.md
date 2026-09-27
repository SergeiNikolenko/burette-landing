# Feature media delivery

The feature gallery keeps recorded videos in the page flow. Agent workspace coverage is deliberately retained with `mediaPending: true` at the user's request; it has no placeholder screenshot.

Optimized 62 poster/still assets to WebP quality82, maximum1280px width, preserving aspect ratios. Source total8,006,284bytes; optimized total2,875,220bytes (64%smaller). Originals remain available. This measures asset size, not page-load time.

Video posters are native lazy-loaded images with explicit dimensions. They remain visible until the actual `playing` event, including when autoplay is denied. An IntersectionObserver prepares video metadata within400px, and starts playback only when half the video is visible. Offscreen/hidden-tab playback pauses. Reduced-motion/data-saving preferences suppress automatic video loading. Theme changes reset the player to the corresponding recorded source. Playback stays0.8×. Visible neighbouring videos no longer pause each other.

Browser validation: at the top of `/features`, no video source was attached; at Selection, both visible videos played at0.8× and paused after navigating to Integrations. At390px the document width remained390px with no broken loaded images. Production build and site asset/link checks passed. These checks do not establish a network-independent instant-loading guarantee.

Delivery approach follows https://web.dev/articles/lazy-loading-video and the modern-web-guidance image/preload priority guides. Features-page LCP is text; below-fold media remains lazy rather than competing with that content.
