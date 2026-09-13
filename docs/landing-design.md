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

The hero loads the complete published Burette browser workspace immediately, including its file tree, tabs, Ketcher entry point, and viewer tools. An unmodified official Apple MacBook Pro product bezel surrounds the app; its provenance and license exception are recorded in `public/assets/devices/README.md`. A continuous CSS display band covers the camera cutout; the original bezel image remains unchanged.

Presentation mode selects four real bundled files at 12-second intervals while visible. A narrow file-tree adapter owns this integration with the published shell. Presentation starts enabled on every page load, as requested. Pointer or keyboard input inside the app pauses it; scrolling no longer stops the presentation. Visitors can pause, resume, or choose an example with the dots. Theme changes reload the embedded workspace after synchronizing its stored theme preference. The old external file-name bar and scientific action row are absent.
The introductory workspace illustration remains non-interactive.

Collections use the published Burette RDKit grid with 48 source-ordered MOSES
records. The descriptor map plots supplied molecular weight and SLogP values;
selecting a point or using the keyboard-accessible selector updates a large
RDKit SVG structure and a three-property summary. This is a descriptor plot, not a computed chemical-space embedding.
The motion scene uses a real 20-frame BIMP vibrational-mode file, with native
playback and frame controls. Explicit actions switch between the original 20
frames and 80 smoothed/interpolated frames. Playback starts when the example opens. The SDF collection in the hero demonstrates All instead.
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

The hero SDF example uses the published `openSdfMolstarDocument` host message, then waits for that specific document before selecting All. `caffeine-water.sdf` retains the bundled sample coordinates and bonds, with explicit record names to avoid blank-header parsing failures. Trajectory preparation waits for its own viewer, selects individual frames, and starts the native frame loop.
