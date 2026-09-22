# Homepage stories

The homepage introduces five highlights, followed by three detailed workflows:
Finder Quick Look, structure inspection, and collection browsing. Detailed controls,
trajectories, poses, and Chemical Space remain in the features catalog.

## Media

Reuse the existing recordings and posters under `public/assets/features/`.
The highlights are static images; only the three main demos load video as they
enter view. Playback remains at 0.8× and respects reduced motion and data saving.
No additional media payloads or dependencies were added.

The poses highlight uses `shot-sdf-poses.jpg` and keeps a red review outline.
Replace it with a complete comparison capture: open a multi-pose SDF, enable All,
click Align, hold the aligned result, then turn Align off. The current still shows
pose controls, not the complete alignment workflow.

## Recording priorities

- Finder: select file, press Space, rotate and zoom, then hold a useful view.
- Binding site: start with the whole protein, select the ligand, show its pocket.
- Poses: All, Align on, inspect, Align off.
- Motion: compare original and interpolated playback with the same camera.
- Chemical Space: select a cluster and reveal the corresponding compounds.

Each clip should show one complete action and hold its result. Avoid repeating
one recording across multiple detailed sections. Preserve the real interface.
