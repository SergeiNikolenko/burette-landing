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
uses deep blue surfaces and subdued clouds. Screenshots have no padded underlay. Keep controls restrained; colour
belongs to large surfaces and scientific imagery rather than decorative badges. The main download
control is text-only. Format groups are simple rows rather than nested cards.

At narrow widths, navigation forms a second row, stories stack, and supporting
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

## Interactive demonstration direction

The existing web demo is the source for a future live landing scene. Activate it
through an explicit control and keep the introductory illustration non-interactive.
The current public-plugin CSP permits the canonical landing origin and localhost,
but not arbitrary branch previews. The desktop runtime's existing `embed=hero`
mode locks clicks in both the app shell and viewer; use a distinct interactive
mode if a focused live showcase is introduced. Keep the mode and origin changes
in the owning Burette repository with its contract validation.

Use real bundled structures and trajectories. A small typed parent/frame bridge
should report readiness and errors, select permitted examples, and pause offscreen
work while preserving scene state. On mobile, design a focused viewer instead of
scaling down the complete desktop workspace. A prototype is not acceptance of the
final integration; validate loading, interaction, scroll ownership, and recovery
inside the actual permitted deployment origin.
