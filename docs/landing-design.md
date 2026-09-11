# Landing design

The landing presents Burette through three product stories: Finder Quick Look,
molecular collections, and Chemical Space. Large screenshots show the actual
application; compact supporting studies cover lasso selection and trajectories.

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

Reuse the installed shadcn Button, Accordion, and Dialog components. Custom
compositions in the landing components and `app/editorial.css` control the
page layout; they do not introduce another component or animation library.
Styles are scoped to `.landing` to preserve the Nextra documentation layout.

Use ordinary sans-serif labels. Reserve monospace for commands and file data.
Do not put explanatory prose in badges or add status dots to static statements.
Use a warm off-white page and broad, pale sage backgrounds around molecular
imagery. Dark mode uses deep green surfaces. Keep controls restrained; colour
belongs to large surfaces and scientific imagery rather than decorative badges. The main download
control is text-only. Format groups are simple rows rather than nested cards.

At narrow widths, navigation forms a second row, stories stack, and supporting
media becomes a single column. Screenshots retain an accessible enlargement
dialog with a close button, without a visible title strip or Enlarge badge. The theme button changes colours directly without a reveal animation.
The existing video controls and reduced-motion behaviour remain available.

The removed cloud and ASCII components are no longer imported by the landing.
Demo, documentation, plugin setup, downloads, and installation remain reachable.
