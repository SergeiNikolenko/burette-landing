# Features catalog — 21 September 2026

Route: `/features`. 66 capabilities in nine groups. Videos load when at least half-visible and play inline. Offscreen videos pause; only one integrated demo plays at a time. Reduced motion and Save-Data use manual playback. Mobile uses complete, contained frames, without a live molecular runtime.

## Evidence

Baseline: checked-in `content/surfaces/desktop.mdx`, `content/workflows/collections.mdx`, `content/workflows/native-compute.mdx`, `content/engines.mdx`.
Recent merged Burette PRs checked (full bodies for #760, #754, #750; merged titles for the remainder):
- #760: residue/chain/protein/ligand surfaces and 5 Å pocket surface.
- #754: native Metal conformer workflow and compact trajectory controls.
- #750: inline Mol* 2D/3D grid inspection and opening in a full tab.
- #758/#753: palette and preserving illustrative appearance across style changes.
- #749/#747/#752: deep links, Dock actions, CLI.
- #745/#743: V3000 poses and Maestro/DataWarrior parsing.

Merged-source availability does not certify every released package or browser surface. The page identifies Apple Silicon desktop compute, optional engines, and source-built iPhone previews. Existing videos show the supplied app version, not a claim that every latest control is visible.

## Media

Originals remain untouched in `/Users/nikolenko/Desktop/Burette`.
`features-media.json` records source names, start times, and durations in seconds. Each cut has a 1280px H.264 MP4 (24fps, CRF26, no audio, faststart) and JPEG poster at the recorded posterTime. Public assets live in `public/assets/features/`. Seven cuts total; raw recordings are not committed.

## Record next

1. **Calculations (placeholder):** Ketcher sketch → Generate 3D → completed ensemble → MMFF result. 15–25 s. Separately capture xTB and CREST with their engine names visible.
2. **Workspace/editing (placeholder):** edit a grid row in Ketcher, save it back, inspect in 3D. 12–18 s. Capture source text and side-by-side docks separately.
3. **Integrations (placeholder):** agent request → real Burette workspace → saved artifact. 20–30 s. Separate short clips for Dock actions and external-app handoff.
4. **New surface tools:** pick ligand → Surface of ligand → 5 Å pocket. Hold the finished view for 3 s. 12–18 s.
5. **Selection/Sequence:** lasso → isolate → measurement; separate residue-range selection. Current selection clip only shows scene-tree/component work.
6. **Poses:** SDF All → Align on → Align off. Current motion clip demonstrates trajectory playback, not pose alignment.
7. **Chemical Space:** linked lasso selection, activity colours/cliffs, similarity and diverse export. Current clip demonstrates the map after computation.
8. **Other dedicated stills:** density map, crystal symmetry, Mesoscale, spectrum, and source-built iPhone preview.

Keep a stable window size, hide personal files, avoid recording startup waits, and leave 2–3 s around each action. Record full interface; crop only when a separate close-up makes the interaction clearer.

## Presentation refinement

Removed the Finder opening wait. The main page now uses the supplied footage for protein, Quick Look, collection and Chemical Space blocks. Carousel posters are extracted from those recordings; uncovered source/artwork/agent/workspace stories use explicit placeholders. Live molecular demo behavior and documentation screenshots remain separate.

## Critical review against CleanShot

1. Discovery: the first version used generic copy and too much space before product evidence. Shortened the introduction and named concrete molecular tasks. Conversion impact has not been measured.
2. Demonstrations: click-only posters interrupted reading. Integrated silent loops now follow viewport visibility, with explicit pause and manual playback for reduced-motion/Save-Data. Whole source frames remain visible.
3. Navigation: added the current category state to the desktop index. Mobile keeps a horizontally scrollable category list.
4. Missing evidence: replaced large empty panels with compact placeholders. A placeholder does not demonstrate the advertised workflow; new recordings are still needed.
5. Visual consistency: replaced old main-section media and carousel illustrations with supplied recordings/posters where available. Documentary screenshots elsewhere and the live hero runtime were not replaced.

Next highest-impact content work: record one action and one result per clip, keep the window scale fixed, avoid macOS desktop transitions and oversized recorded cursor zooms. Add dedicated Ketcher, ligand pocket, alignment, and compute outcomes. A large catalog alone does not prove time savings; do not add numerical performance or customer claims without evidence.
