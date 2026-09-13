# Landing design

The landing presents Burette through three product stories: Finder Quick Look,
molecular collections, and Chemical Space. Large screenshots show the actual
application; a horizontal gallery opens eight feature stories: selection, trajectories, collections, Chemical Space, source text, figures, agents, and workspace tabs.

## References

- [Codex](https://chatgpt.com/codex/): centered introduction, clear primary action,
  restrained navigation, and generous space around product imagery.
- [Apple Health](https://www.apple.com/health/): section pacing, large visual
  subjects, and short text with a clear reading order.
- FOLD archive supplied for this redesign: neutral light/dark surfaces, large
  molecular subjects, and a progression from overview to closer inspection.
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/):
  layout, legibility, recognizable controls, and keyboard access.
- [shadcn/ui](https://ui.shadcn.com/docs/components/button) and
  [OpenAI Apps SDK UI](https://openai.github.io/apps-sdk-ui/): semantic colours,
  neutral controls, and restrained component styling.

## Implementation

Reuse the installed shadcn Button, Accordion, Dialog, and Carousel components. Custom
compositions in the landing components and `app/editorial.css` control the
page layout. The shadcn carousel uses Embla, with touch dragging, keyboard
navigation, horizontal wheel/trackpad gestures, and previous/next controls.
Vertical scrolling continues through the page. Touch input permits vertical
page movement while the carousel handles horizontal swipes. Reduced motion makes slide changes immediate.
Styles are scoped to `.landing` to preserve the Nextra documentation layout.

Use ordinary sans-serif labels. Reserve monospace for commands and file data.
Do not put explanatory prose in badges or add status dots to static statements.
Use a pale blue page and a soft cloud background behind the hero. Dark mode
uses a black background, neutral dark surfaces, and grey clouds. Screenshots have no padded underlay. Keep controls restrained; colour
belongs to large surfaces and scientific imagery rather than decorative badges. The main download
control is text-only. Format groups are simple rows rather than nested cards.

At narrow widths, a compact single-row header opens a shadcn navigation dialog, stories stack, and supporting
gallery cards keep a peek of the next slide. Main product screenshots retain an accessible enlargement
dialog with a close button, without a visible title strip or Enlarge badge. The introductory
workspace illustration remains non-interactive. Gallery cards open a feature dialog with live content, a video, or an uncropped screenshot; closing returns focus to the selected card. The theme button changes colours directly without a reveal animation.
The existing video controls and reduced-motion behaviour remain available.

The existing cloud renderer stops when hidden and respects reduced motion.
The ASCII effect is not imported. The introduction uses the existing multi-view
screenshot provisionally; the owner will supply replacement screenshots.
Standalone screenshot captions and explanatory modal headers are omitted.
The footer wordmark uses gentle positive tracking without kerning and stays fully visible.
Demo, documentation, plugin setup, downloads, and installation remain reachable.

## Live demonstrations

At widths of 640 CSS pixels and above, the hero loads the complete published Burette browser workspace, including its file tree, tabs, Ketcher entry point, and viewer tools. An unmodified official Apple MacBook Pro product bezel surrounds the app; its provenance and license exception are recorded in `public/assets/devices/README.md`. The live display covers the camera cutout without an extra black band; the original bezel image remains unchanged.

Presentation cycles through three real files: 7RPZ.pdb, caffeine.cif, and 1HTB.pdb. Each runs a 32-second camera sequence with gentle rotation, direction changes, and a bounded 12% zoom. It does not open menus, select atoms, change representations, or operate playback controls. Presentation starts enabled unless reduced motion is requested. Pointer or keyboard input pauses it; visitors can resume or choose any of the three progress indicators. Theme changes reload the workspace after synchronizing its stored preferences.
The introductory workspace illustration remains non-interactive.

Motion, SDF poses, and Library are excluded from the hero presentation. Their standalone feature sections remain available. The Chemical Space section shows the real similarity workflow screenshot.
The motion scene uses a real 20-frame BIMP vibrational-mode file. Playback starts on opening, with the native toolbar and playback panel collapsed. Visitors can expand these controls. There are no surrounding file-name bars or extra frame/smoothing action rows. The SDF collection in the hero demonstrates All instead.
The scene mounts on approach, without a screenshot poster. It is not presented as a molecular-dynamics run.
Data provenance is recorded in `public/live-data/README.md`.

`/live/[scene]` accepts only three named examples and serves bounded data to the
published renderer. `/web-demo/*` and `/burette-viewer/*` proxy the existing public
Burette deployment through the landing origin. This lets branch previews embed
the runtime under its same-origin framing policy. The full browser workspace
is also available in a larger shadcn dialog on request and is unloaded when that dialog closes. The hero workspace remains mounted to preserve interaction state while scrolling.

The parent/frame bridge checks both origin and window identity, whitelists
commands, and reports actual readiness and action outcomes. Offscreen standalone example frames
are removed to release their renderer; camera position is retained when an
acknowledgement arrives. Other edits and playback state reset on remount.
Unactivated viewers allow page scrolling. Loading deadlines expose retry controls
instead of leaving a blank frame. Runtime assets remain an external dependency
of the existing Burette deployment; they are not vendored by this landing.

## Validation

Run `npm test` for page links/assets, sample integrity, route whitelisting, and
frame message bounds. Manually verify the deployed preview in both themes at
390, 768, 1440, 1920, and 2560 CSS pixels. Check the actual molecular render,
ligand focus, surface, grid search, map selection, motion playback, dialog close,
and offscreen frame cleanup. Review typography, section pacing, image crops,
control contrast, and horizontal overflow against the reference pages.

Check the hero automatic cycle, pause on real input, theme synchronization, continuous top edge, and gallery dialogs at desktop and mobile widths. Runtime readiness and frame switching require a browser check in addition to the static tests.
The footer wordmark uses cap-height alignment to meet the lower page edge.

## Copy review

Headlines and descriptions name concrete actions. FAQ copy distinguishes local desktop files from hosted plugin processing and avoids claiming that Burette only supports a short preview workflow. On 2026-09-13 the public landing copy, feature descriptions, and FAQ were submitted to Pangram 4.0: 1,025 words scanned, 96% AI / 4% human. This is the detector result, not an authorship or copy-quality guarantee. No third-party humanizer was used.

The hero SDF example uses the published `openSdfMolstarDocument` host message and eight recorded MATCHA imatinib poses. It waits for that document, shows two individual poses, then selects All. Viewing these poses does not run docking or calculate affinity. Trajectory preparation waits for its own viewer, selects individual frames, and starts the native frame loop.

The agent section reserves an empty, neutral 16:9 space for a future video, with no poster, caption, or inactive play control. The existing recorded agent demo remains available in the feature gallery.

Below 640 CSS pixels, the hero uses an uncropped, enlargable real-app screenshot and does not mount the desktop runtime. Desktop canvas resolution follows the visible screen width with a 960 CSS-pixel minimum, preserving readable controls. Camera turns follow animation frames; tab transitions briefly fade the viewport while waiting for the next document. Reduced-motion preferences disable automatic presentation.

A small presentation pointer targets file tabs or sidebar files only. Coordinates account for nested scaled frames, and real input cancels pending actions.

Workspace startup uses the real Burette app icon, a theme-aware soft background, and a small indeterminate ring. The overlay fades only after actual viewer readiness; timeouts stop the ring and show the existing fallback. Reduced motion disables the spin and fade. The icon is derived from the desktop app’s bundle asset and limited to 128 pixels.

File changes use a 450 ms fade while the next document becomes ready. The hero no longer preloads SDF or RDKit/Grid resources for removed scenes. The header includes a GitHub link at every width. Native app/Finder actions in the browser show an informational availability notice.

A follow-up Pangram 4.0 scan on 2026-09-13 covered the revised main-page copy and all FAQ answers: 694 words, 100% AI. Gallery dialog descriptions were reviewed separately for accuracy but were not part of this follow-up submission. This check did not pass as human writing.

The presentation cursor follows the Computer Use visual reference: a compact outlined dark arrow with a soft blue glow. Its independent, dependency-free animation follows a curved path, banks during longer moves, and slows to a precise stop. Short menu moves use a shallow glide. Travel duration follows distance, with a 180 ms settle before click feedback. The visible tip stays aligned with the target through nested frame scaling. This is an adapted animation, not the Computer Use spring engine.

The next editorial pass rewrote feature descriptions, gallery copy and FAQ in ordinary working language. Pangram 4.0 checked 189 words of the main descriptions and returned Mixed: 56% AI / 44% human, with limited confidence for short text. Its first and last segments were marked human. The middle descriptions were revised again after that result; that final revision and the full FAQ/gallery have not been rescanned because the guest account has no credits left. This is not a passing result for the complete page.

## Loading budget

The desktop workspace mounts when approaching the hero viewport. On reported Data Saver or 2G/3G connections, the hero uses the same real screenshot as mobile, with the workspace still available on request. Backgrounding the page pauses the guided story and frame/pose loops. The cloud shader is capped at 650,000 pixels on desktop, 300,000 below 700 px, and 24 fps; Data Saver keeps a static frame. The MacBook bezel uses responsive Next image optimization. In a local 1,200 px WebP request, the dark bezel measured 6,638 bytes versus 1,003,800 bytes for the original PNG; this is an asset-size measurement, not a whole-page loading-time guarantee.

The presentation initializes the workspace in Illustrative and preserves its appearance throughout both camera sequences.

The active presentation dot expands to a 44 px capsule. Its fill follows completed viewing/rotation steps, stays still during preparation and on pause, and reaches the end before the next scene. Other dots retain their compact shape, labels, focus rings and click targets. Progress writes one CSS variable without rerendering the workspace; reduced motion disables capsule transitions. Resuming an interrupted story restarts that story and its progress.
