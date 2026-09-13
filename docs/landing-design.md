# Landing design

The landing presents Burette through three product stories: Finder Quick Look,
molecular collections, and Chemical Space. Large screenshots show the actual
application; a horizontal gallery covers lasso selection, trajectories, and molecular artwork.

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
workspace illustration and gallery images are not clickable. The theme button changes colours directly without a reveal animation.
The existing video controls and reduced-motion behaviour remain available.

The existing cloud renderer stops when hidden and respects reduced motion.
The ASCII effect is not imported. The introduction uses the existing multi-view
screenshot provisionally; the owner will supply replacement screenshots.
Standalone screenshot captions and explanatory modal headers are omitted.
The footer wordmark uses gentle positive tracking without kerning and stays fully visible.
Demo, documentation, plugin setup, downloads, and installation remain reachable.

## Live demonstrations

The hero loads the real Burette Mol* viewer with the bundled 1HTB structure.
Explicit controls activate interaction, focus a ligand, reset the camera, and add
a molecular surface. A small adapter resolves the hierarchy state cell for the
surface builder; repeated surface requests do not accumulate representations.
The introductory workspace illustration remains non-interactive.

Collections use the published Burette RDKit grid with 48 source-ordered MOSES
records. The descriptor map plots supplied molecular weight and SLogP values;
selecting a point or using the keyboard-accessible selector filters the adjacent
native grid. This is a descriptor plot, not a computed chemical-space embedding.
The motion scene uses a real 20-frame SN2 vibrational-mode file, with native
playback and frame controls. It is not presented as a molecular-dynamics run.
Data provenance is recorded in `public/live-data/README.md`.

`/live/[scene]` accepts only three named examples and serves bounded data to the
published renderer. `/web-demo/*` and `/burette-viewer/*` proxy the existing public
Burette deployment through the landing origin. This lets branch previews embed
the runtime under its same-origin framing policy. The full browser workspace
opens in a shadcn dialog only on request and is unloaded when closed.

The parent/frame bridge checks both origin and window identity, whitelists
commands, and reports actual readiness and action outcomes. Offscreen frames
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
