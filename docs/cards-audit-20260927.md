# Feature card media audit — 2026-09-27

Baseline: catalog and actual media inspected before new user recordings are integrated. All 62 remaining cards reviewed using nine labelled contact sheets of the actual image files or video posters. Density maps is excluded because the user explicitly requested removal. This is a visual semantic audit, not a claim that all video frames or application functionality passed.

## Main finding

Many images are genuine application screenshots but illustrate a different feature. Authentic-looking icons do not fix a semantic mismatch. Red replacement markers must remain until the named feature is actually visible; never clear them merely because a screenshot is real.

The FeatureCards component has no feature-specific illustrative icons. Visible feature icons are inside recorded application UI. Carousel arrows are interface controls. No synthetic application icons were identified in the reviewed stills. Tiny toolbar glyphs need full-size UI checking if changing them; this audit does not certify every glyph pixel.

## Per-card findings

| Section | Card | Decision | Evidence / next action |
|---|---|---|---|
| preview | Finder Quick Look | Keep | Real Quick Look title bar and molecule clearly visible. |
| preview | Interactive 3D | Review motion | Poster is a real viewer, but a still cannot establish smooth rotation; review full clip. |
| preview | Light and dark | Keep | Clear light-theme viewer; add corresponding dark frame or theme pairing to demonstrate both. |
| preview | Molecular thumbnails | Keep | Finder/Desktop files include recognisable rendered structure thumbnails; some other files remain generic icons. |
| preview | Open in Burette | Review | Quick Look Open with Burette control is visible; does not demonstrate completed handoff. |
| preview | Spectrum previews | Keep | Actual spectrum plot and summary visible. |
| structures | Illustrative appearance | Keep | Illustrative setting and outlined molecule visible, though hover preview competes for attention. |
| structures | Representation styles | Keep | Tree and rendered cartoon/stick combination visible. |
| structures | Scene tree | Keep | Real hierarchy and contextual controls clearly visible. |
| structures | Show, hide, isolate | Review | Real tree and simplified protein visible; exact hide/isolate action needs sequential comparison. |
| structures | Colour controls | Keep | Real colour palette and opacity control visible. |
| structures | Crystal structures | Replace | Ordinary 1HTB protein cartoon; no unit cell, lattice or symmetry depiction. |
| structures | Mesoscale scenes | Replace | Single 7RPZ protein, not a mesoscale assembly. |
| selection | Sequence selection | Keep | Highlighted sequence range and selected 3D region are both visible; final card-scale readability still needs rendered QA. |
| selection | Ligand pockets | Keep | Ligand with actual surrounding translucent pocket surface. |
| selection | Lasso selection | Keep | A subset of fullerene atoms is highlighted; still demonstrates result, not lasso gesture. |
| selection | Measurements | Replace | Selection view has no distance/angle/dihedral annotation or numeric result. Use new Measurements recording. |
| selection | Surfaces for your selection | Replace | Shows Ghost Surface preset hover preview, not a surface scoped to the selection. |
| selection | Extract a subset | Review | Contextual molecule actions visible but no saved subset/result demonstrated; inspect full-size export action before approval. |
| selection | Structure superposition | Replace | Single protein/tree screenshot; no second structure, alignment or comparison. |
| motion | Trajectory playback | Keep | Multi-frame XYZ with frame controls clearly visible. Do not describe this as MD or smoothing evidence. |
| motion | Trajectory smoothing | Review | Smooth control visible but static capture does not demonstrate smoothing. Need distinct before/after motion. |
| motion | Pose alignment | Review | Multiple poses and Align control visible, but screenshot alone cannot establish before/after alignment. |
| motion | Topology and trajectory | Replace | Same BIMP XYZ as playback; no paired topology/trajectory loading. |
| motion | SDF poses | Keep | Molecular pose navigator and single pose visible. |
| motion | Molecular Stories | Replace | Spin/Rock/Wiggle menu is camera/motion control, not a demonstrated multi-step story. |
| collections | Cards and tables | Keep | Real collection table with molecular thumbnails and properties. |
| collections | Substructure search | Keep | SMARTS query and matching highlighted rings visible. |
| collections | 3D inside a collection | Review | Ball-and-stick thumbnails visible, but still cannot establish interactive embedded 3D rather than static renders. |
| collections | Structures and properties | Keep | Selected molecule and molecular property summary visible together. |
| collections | Search, sort, and filter | Keep | Actual histogram/range filter and collection shown. |
| collections | Open a molecule in its own tab | Keep | Selected-molecule document tab and standalone viewer visible. |
| collections | Combine collections | Replace | Context menu opens a molecule in New Tab; no combining workflow/result. |
| collections | Selection and export | Keep | Selected card and export actions visible. |
| collections | Browse large collections | Keep | Collection grid and search controls visible; numerical scale claims require source evidence. |
| collections | DataWarrior files | Replace | Ketcher sketch with CSV/SMI tabs, no DWAR document. |
| chemical-space | A map of your molecules | Keep poster; review motion | Real chemical-space point cloud and molecular grid; poster does match general map claim. |
| chemical-space | Linked selection | Replace | Point cloud/grid are present but no clear selected points and linked selected cards. |
| chemical-space | Similarity search | Replace | Chemical Space not calculated placeholder; no query or ranked similarity results. |
| chemical-space | Clustering | Replace | Chemical Space not calculated placeholder; no coloured clusters or memberships. |
| chemical-space | Choose a diverse subset | Replace | Unselected map with no diversity selection/output. |
| chemical-space | Activity colouring | Replace | Activity field is None and map is building; no activity colouring shown. |
| chemical-space | Activity cliffs | Replace | Single hovered molecule in uncoloured map; no cliff pair or activity comparison. |
| compute | Conformer generation | Replace | Existing pose viewer and tool buttons, no generated conformer workflow/result. |
| compute | MMFF refinement | Replace | Pose view has xTB/CREST/PRISM controls; no MMFF result shown. |
| compute | Pose scoring | Replace | Multi-pose viewer without scores or ranked table. |
| compute | Semiempirical energies | Replace | Protein composition/tools panel, no computed energy value. |
| compute | xTB calculations | Review | Real xTB tool control visible; no calculation result. Approve only as setup UI, not result. |
| compute | CREST and PRISM | Review | Real CREST/PRISM buttons visible; no sampling or pruning output. |
| compute | Keep working during calculations | Review | Actual chemical-space progress with collection present; unrelated to native compute if copy promises that workflow. |
| editing | Ketcher sketches | Keep | Actual molecular sketch and editor tools visible. |
| editing | Edit collection molecules | Keep poster; review motion | Ketcher and Save to collection visible; full clip needed to establish save-back. |
| editing | Sketch to 3D | Replace | Only 2D collection and property panel, no sketch-to-3D result. Use new supplied recording. |
| editing | Text editing | Replace | Composition panel, no text editor. |
| editing | Project folders | Review | Sidebar present but minimal hierarchy and empty viewer; use fuller actual project tree. |
| editing | Tabs and docks | Keep | Document tab plus left and right panes visible. |
| editing | Command palette | Replace | Right-click context menu, not command palette. |
| editing | Drag files into your workspace | Keep | Actual file drag and drop target visible. |
| integrations | Ask your agent to open a structure | Replace | Protein alone; no agent conversation/action evidence. |
| integrations | Make a figure for your paper | Replace | Collection thumbnails, not standalone figure/render/export. Use new xyzrender recording. |
| integrations | Continue in your preferred chemistry app | Replace | Protein hover label, no external app chooser or handoff. |
| integrations | Automate repeatable steps | Replace | Collection grid with no automation/script/agent evidence. |

## Replacement order from supplied new recordings

1. Measurements: actual numbered measurement result.
2. Sketch to 3D: editor → generated 3D structure.
3. xyzrender: settings → finished figure, not molecular grid.
4. Chemical Space: actual selected region, matching cards, completed clusters/activity results only if recorded.
5. Poses: All → Align on → Align off, without representing a static pose overlay as verified alignment.
6. Pocket and substructure: new matched light/dark cuts can replace older valid single-theme stills.

Do not distribute a single generic source frame across unrelated cards. Where the new videos do not demonstrate a feature, retain a truthful review marker or remove/defer the card; do not manufacture evidence.

## Newly supplied footage: positive matches after sheet inspection

Contact sheets inspected: `03`, `06`, `07`, `08`, `09`, `10`, `11` in Desktop/Burette/Recording Review 2026-09-27. Sampling establishes available subject matter, not full-frame clip acceptance.

- Source03: completed 58.76° dihedral annotation is accurate Measurements imagery; avoid earlier selection-only frames.
- Source06: completed Activity cliffs panel with count129, pair structures, similarity/delta/SALI columns is accurate Activity cliffs imagery. pIC50 legend and coloured map also demonstrate Activity colouring.
- Source07: pIC50-coloured map is a valid dark counterpart for Activity colouring; sampled frames do not show an activity-cliff pair panel.
- Source06 grouping menu only establishes a grouping command, not a completed clustering result. Sampled maps do not prove linked selection or diverse subset selection.
- Sources08/09: actual Ketcher editing followed by generated 3D structure. Strong Sketch to 3D replacement. Source09 also shows generated16pose navigation, overlay and spread; use generation transition to support Conformer generation, not existing poses alone.
- Sources10/11: genuine xyzrender finished figure/settings and GIF export controls. Strong Make a figure replacement. Avoid edge-on rotating paper and intermediate saving/blank frames as posters.
