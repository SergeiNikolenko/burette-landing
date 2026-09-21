# Features catalog — 21 September 2026

Route: `/features`. 63 feature cards in nine groups. Videos load when at least half-visible and play inline. Offscreen videos pause; only one integrated demo plays at a time. Reduced motion and Save-Data show static posters. Mobile uses complete, contained frames, without a live molecular runtime.

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
2. Demonstrations: click-only posters interrupted reading. Integrated silent loops now follow viewport visibility, without caption bars or player buttons; reduced-motion/Save-Data show static posters. Whole source frames remain visible.
3. Navigation: added the current category state to the desktop index. Mobile keeps a horizontally scrollable category list.
4. Missing evidence: replaced large empty panels with compact placeholders. A placeholder does not demonstrate the advertised workflow; new recordings are still needed.
5. Visual consistency: replaced old main-section media and carousel illustrations with supplied recordings/posters where available. Documentary screenshots elsewhere and the live hero runtime were not replaced.

Next highest-impact content work: record one action and one result per clip, keep the window scale fixed, avoid macOS desktop transitions and oversized recorded cursor zooms. Add dedicated Ketcher, ligand pocket, alignment, and compute outcomes. A large catalog alone does not prove time savings; do not add numerical performance or customer claims without evidence.

## Layout references and detail stills

Reviewed CleanShot Features and Apple Health in the browser. Adopt focused demonstrations and specific adjacent descriptions from CleanShot; use Apple Health as a reference for breathing room, grouped stories and varied image scale. Do not copy its scroll-driven effects or turn every section into a full-screen animation.

Removed added video borders, forced aspect ratios and caption bars. Videos retain their intrinsic proportions. Main-page demonstrations are capped at 880px; Chemical Space now uses the stable whole-window segment at 41–49 seconds rather than the enlarged cursor view. Detail rows precede short feature lists so full-width rows do not leave gaps between grid items.

Four real stills extracted at 1280px width:
- Tree view: `сцена с белком.mp4`, 36 s → `detail-tree.jpg`.
- xyzrender: `coolectiopns.mp4`, 42 s → `detail-xyzrender.jpg`.
- Property inspector: `coolectiopns.mp4`, 20 s → `detail-properties.jpg`.
- Smoothing controls: `QuikLook_dark.mp4`, 49 s → `detail-smoothing.jpg`.

These screenshots document the recorded version; they are not fabricated interface mockups. Each image reserves its actual dimensions and loads lazily.

## Review galleries

All nine feature lists are horizontal galleries with keyboard arrows, touch dragging, disabled edge controls and reduced-motion support. Red outlines mark review media. Real frames are reused only for corresponding capabilities; missing demonstrations have static, explicitly labelled skeletons.

`capture-sequence.png` was captured on 21 September 2026 in the real hosted Burette web demo: 1HTB → Sequence → selected TRP 15 (chain A). This is a browser screenshot, not packaged-native acceptance. Previous `detail-*` captures come from the supplied recordings. Replace a card image through its `screenshot` and `screenshotHeight` fields in `components/features/catalog.json`.

Videos now play at 0.8× speed across all three website video components.

## Copy review against CleanShot — 21 September

A separate read-only critic reviewed the catalog and home copy against CleanShot's live home and features pages. Findings: generic “next step” headlines, repeated introductions, internal terminology, overly long card descriptions, and equal emphasis on all capabilities. Replaced vague headlines, shortened 19 card descriptions, retained engine/platform qualifications, and placed specific tasks earlier in galleries. Three workflow anchors make binding-site inspection, pose comparison and collection filtering easier to find.

The largest remaining presentation gap is evidence: 54 review skeletons remain. Prioritize ligand pockets, All/Align, substructure search and linked Chemical Space selection for recording. Do not compensate with invented testimonials, performance figures or decorative media.

## Dedicated card media

Removed seven reused section posters from the feature cards. Five dedicated detail captures remain; other cards show explicit recording placeholders. Card media uses a contained 16:9 landscape area, wider slides and smaller corner radii. Trackpad gestures use the existing wheel-gestures plugin, with eased button navigation and reduced-motion support. Interactive 3D remains a placeholder until a dedicated rotation clip is recorded; a still image must not imply playback.

Integration curation: replaced seven equal-weight technical entries with four outcome-led stories: agent-assisted work, vector figures, external chemistry apps and scripting. Deep links are part of scripting; Dock details and the source-built iPhone app remain documented rather than promoted as major integration stories.

## Portrait card media review

Cards now use narrower columns and a 4:3 media area above their text. 13 of 63 cards have review media (10 stills and 3 distinct short clips); 50 retain explicit shot placeholders. All retain red review outlines. Card clips use the shared lazy video component at 0.8×, pause offscreen, and respect reduced motion and data saving. Sources and cut times are recorded in features-card-media.json.

## Filled screenshot review

All 63 cards now contain media: 60 stills and 3 clips. Fifty additional JPEG frames were extracted from the supplied recordings at 960px width. Thirty-four contextual frames carry an explicit Replace capture label; these are layout references, not evidence of the advertised action. All red review outlines remain. See features-fill-media.json for sources and timestamps, and features-shots-needed.md for replacements.
