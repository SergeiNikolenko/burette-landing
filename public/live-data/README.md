# Live landing examples

These are existing Burette sample files, copied without changing coordinates or
descriptor values. They are served locally by the landing; no remote scientific
calculation is requested by these examples.

- `1htb.pdb`: `samples/structures/proteins/1htb.pdb` in the Burette repository;
  Protein Data Bank entry [1HTB](https://www.rcsb.org/structure/1HTB).
- `bimp-mode.xyz`: `samples/structures/demo/bimp.v000.xyz`, all 20 original frames.
  This is a vibrational-mode example (172 atoms, frequency −333.88 cm⁻¹), not a
  molecular dynamics simulation or a prediction performed by this site.
- `collection.json`: first 48 rows, in source order, of
  `samples/large/moses_10k_descriptors_preview.csv`. Each item has `name` values
  `MOSES 1` through `MOSES 48` (no `mol_idx` field). This numbering matches
  the same row order in `samples/collections/tables/moses-properties.csv`; neither
  file is implied as the causal source of the other's naming.
  The interactive property map plots molecular weight against SLogP; it is not
  an inferred activity map, UMAP or a new similarity calculation.

Rendering uses the published Burette viewer and RDKit runtime through narrowly
scoped same-origin asset rewrites. The source-owned adapter lives in
`lib/live-scene.mjs` and `public/live/bridge.js`.

`caffeine-water.sdf` comes from Burette `samples/structures/small-molecules/multi-molecule.sdf`. Coordinates and bonds are unchanged; empty record titles are replaced with Caffeine and Water so SDF readers preserve the three header lines. It remains a small parser validation fixture; the hero now uses the pose set below.

`imatinib-poses.sdf`: eight recorded MATCHA predictions for imatinib/ABL1
entered into the landing with atoms, coordinates, and bonds preserved. Record
titles are normalized to `MATCHA pose 1` … `MATCHA pose 8` for display. The
presentation compares individual poses and their All overlay. No docking,
scoring, or affinity prediction runs on the landing.

The full workspace additionally uses its bundled PDB 7RPZ, caffeine CIF, and
`moses-properties.csv` (48 supplied descriptor rows). The source-owned browser
sample manifest and Properties plot live in Burette; the landing only opens and
operates those views.

For shared sample provenance and naming conventions, see
`Burette-presentation/docs/presentation-samples.md`.
