# Avogadro features: landing copy and clips still to record

The Features page already carries the new `geometry` and `quantum` groups and
the cards that have a screenshot. The two home stories below are written but
not yet in `components/landing/features.jsx`, because each needs a looping clip
and poster in `public/assets/features/` with its size in
`components/features/media-sizes.json`. Add a story only when its clip exists.

## Home stories

Both go after `#structure-story`, as `<article id="…-story">` with an eyebrow,
a two-line headline and a paragraph, shown with `<Demo id>`. No caption under
the media.

### `#geometry-story`

- Eyebrow: Edit the geometry
- Headline: Drag an atom. / The molecule follows.
- Body: Change a bond length or torsion, freeze what must stay, and let the
  structure relax. One Undo returns to where you started.
- Docs link: `/docs/workflows/geometry`
- Clip: `geometry-story` (lead: Auto Optimize; then Optimize with constraints).

### `#calculation-story`

- Eyebrow: Read your calculation
- Headline: Open the output. / See the orbitals.
- Body: Play vibrational modes, show an orbital surface, and switch between
  the fields in a cube file. Export an input file for the next run.
- Docs link: `/docs/workflows/calculations`
- Clip: `calculation-story`.

## Clips to record

Record each in light and dark at the same window size, one action and one
result per state, from the staged browser-shell screens described in the
Burette showcase plan.

| Clip | States | Sample | Used by |
| --- | --- | --- | --- |
| Auto Optimize | Start, Drag, Relaxed, Stop, Undo | Water trimer SDF or Ar₆ cluster XYZ (to be added to Burette `samples/`) | `#geometry-story` lead; Highlights card; `geometry` group card |
| Optimize with constraints | Freeze, Hold distance, ⌥⌘O, Cancel, Undo | A distorted SDF that visibly relaxes (to be added) | `#geometry-story`; `geometry` group card for Optimize Geometry |
| Geometry editing | Measure, Edit value, Undo/Redo, Z-matrix | `s-1-phenylethanol.xyz` | `geometry` group media |
| Calculation results | Vibration, Orbital, Switch field, Recolour | Formaldehyde CJSON and a HOMO/LUMO Cube | `#calculation-story`; `quantum` group media |
| Builders and insertion | Build peptide, Insert, Metal complex, Undo | `caffeine.sdf` | `editing` Builders card; Highlights card |
| Metal complexes | Pick terpyridine, switch Other sites mer → another set, Preview, Create | `caffeine.sdf` | `editing` Metal complexes card |
| Right-click an atom | Right-click, Edit geometry, row focused, type a value | `s-1-phenylethanol.xyz` | `editing` Right-click an atom card |

## Cards not yet on the Features page

They have copy but no reviewed screenshot or clip:

| Group | Title | Description |
| --- | --- | --- |
| `geometry` | Auto Optimize | Drag an atom and the molecule relaxes around it. |
| `geometry` | Optimize Geometry | Press ⌥⌘O and watch the structure relax. One Undo takes it back. |
| `motion` | Compare frames | Show every frame at once and superimpose them on the current one. |
| `compute` | External energy models | Use semiempirical methods or your own energy plugin from the same menu. |
| `quantum` | Programs from Avogadro packages | Needs Mac app screenshots of More programs and Open › With cclib; the card is text only until then. |
