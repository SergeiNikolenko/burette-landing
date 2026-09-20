# Features catalog — 21 September 2026

Route: `/features`. 66 capabilities in nine groups. Videos are loaded only after a click; selecting another demo unmounts the previous player. Offscreen videos pause. Mobile uses complete, contained frames, without a live molecular runtime.

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
