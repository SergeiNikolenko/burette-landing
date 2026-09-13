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
  `samples/large/moses_10k_descriptors_preview.csv`. Names use the existing
  `mol_idx`. SMILES, molecular weight, SLogP, TPSA and ring count are unchanged.
  The interactive property map plots molecular weight against SLogP; it is not
  an inferred activity map, UMAP or a new similarity calculation.

Rendering uses the published Burette viewer and RDKit runtime through narrowly
scoped same-origin asset rewrites. The source-owned adapter lives in
`lib/live-scene.mjs` and `public/live/bridge.js`.
