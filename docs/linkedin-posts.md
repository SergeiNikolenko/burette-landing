# LinkedIn post drafts: Avogadro features in Burette

Drafts only; nothing here has been posted. Screenshot files are in
`Burette-media/avogadro-parity/<stage-folder>/`. Docs links are relative to
`https://burette-landing.vercel.app`.

---

## 0. Burette now covers what scientists used Avogadro for, in the browser and on the Mac

You can now edit a molecule's geometry, optimize it with constraints, read a quantum chemistry output, and write the next input file in Burette.

Over the last weeks we went through the workflows people open Avogadro for and built each one into Burette: bond, angle and torsion editing with a Z-matrix view, force-field optimization with frozen atoms, vibrations and orbitals from calculation files, peptide, DNA and metal-complex builders, editable crystal cells, and input files for ORCA, Gaussian, Psi4 and CP2K.

They sit next to what Burette already did: Finder previews, proteins, collections and trajectories. On the Mac, xTB and Avogadro energy plugins join the same optimization menu.

Each workflow has a guide. Feedback on what is still missing is welcome.

#ComputationalChemistry #Cheminformatics

- Attach: `stage-02-geometry/3-edited-1.8.png`, `stage-05-calculation-files/orbitals-light-lumo-surface.png`, `stage-08-builders/light-metal-inserted.png`, `stage-09-crystal-scenes/light-reopen-supercell.png`
- Link: `/docs` (or `/features` for the overview)

---

## 1. Type a bond length and the molecule follows

You can now change a bond length, angle or torsion in an XYZ file by typing the value.

Measure a distance in the 3D view and choose Set distance… from its menu. The Geometry panel opens on the matching row; type 1.8 Å and the atoms move there. Undo and Redo step through every edit.

Convert to Z-matrix switches to an internal-coordinate view at any time. Copy Z-matrix puts it on the clipboard, and Export Z-matrix saves a file that reopens with the same geometry.

#ComputationalChemistry #MolecularModeling

- Attach: `stage-02-geometry/1-measurement-menu.png`, `stage-02-geometry/3-edited-1.8.png`, `stage-02-geometry/5-zmatrix-copy.png`
- Link: `/docs/workflows/geometry#edit-bonds-angles-and-torsions-xyz`

---

## 2. Freeze part of a molecule and optimize the rest

You can now hold atoms, distances, angles or torsions in place while a force field relaxes the rest of the structure.

In the Edit panel of a MOL or SDF file, select atoms and choose Freeze, or Hold distance, Hold angle or Hold dihedral with a target you type. In the Geometry panel of an XYZ file, pin an atom or a value.

Optimize shows the latest step and its energy while it runs. The result names the force field and minimizer, says whether the run converged and how far each held value ended from its target. Open steps plays the whole optimization back as a trajectory. One Undo returns to the start.

#ComputationalChemistry #MolecularModeling

- Attach: `stage-03-optimization/constraints-light.png`, `stage-03-optimization/optimized-light.png`, `stage-03-optimization/steps-light.png`
- Link: `/docs/workflows/geometry#freeze-atoms-and-hold-distances`

---

## 3. Press ⌥⌘O and watch the structure relax

You can now optimize the active structure from the keyboard and see each step in the 3D view as it runs.

Optimize Geometry (⌥⌘O) is in the Structure menu and the command palette. The energy updates as the atoms move, Cancel returns to the starting geometry, and the finished run is one Undo step. Calculate Energy gives a single-point energy, and Configure Optimization… sets the force field, minimizer, step limit and convergence thresholds.

Auto Optimize goes further: the molecule keeps relaxing while you drag an atom with the pointer, with the energy change shown in the toolbar. Stop keeps the result as one Undo step.

#ComputationalChemistry #MolecularModeling

- Attach: `stage-03a-energy-models/edit-optimized-light.png` (replace with the Auto Optimize clip once it is recorded)
- Link: `/docs/workflows/geometry#optimize-geometry-and-related-commands`

---

## 4. A force field that fits your elements

You can now leave the force field on Automatic and let Burette pick one that has parameters for every element in your structure.

Automatic tries MMFF94, then UFF. A structure without bonds, such as an argon cluster, gets Lennard-Jones. A force field that cannot describe one of your elements is disabled, and its tooltip names the element: for tetramethyltin, MMFF94 is greyed out and UFF runs. The result line always says which model was used.

In the Mac app, the same menu also lists GFN2-xTB, GFN1-xTB and GFN-FF through your xTB installation, and energy models from installed Avogadro Python packages (Mac app only).

#ComputationalChemistry #ForceFields

- Attach: `stage-03a-energy-models/edit-menu-light.png`, `stage-03a-energy-models/geometry-menu-light.png`
- Link: `/docs/workflows/geometry#choosing-a-force-field` and `/docs/workflows/geometry#external-energy-models-mac-app`

---

## 5. Write the input file for your next calculation

You can now export a ready input file for ORCA, Gaussian, Psi4 or CP2K from an SDF, MOL, PDB, CIF, POSCAR or XYZ file.

Export input file… is in the command palette, the Edit panel's More actions, and the Geometry and Z-matrix panels. Choose the program, the calculation (single point, optimization or frequencies), method, basis, charge and multiplicity, and Cartesian or Z-matrix coordinates for ORCA, Gaussian and Psi4.

Atoms keep their order, so constraint numbers match the structure. Frozen atoms and held distances from the Edit panel go into optimization inputs. Copy the text or save the file.

#QuantumChemistry #ComputationalChemistry

- Attach: `stage-04-quantum-input/sdf-light-gaussian-zmatrix.png`, `stage-04-quantum-input/sdf-dark-orca-cartesian.png`
- Link: `/docs/workflows/calculations#export-an-input-file`

---

## 6. Open a calculation and see its vibrations and orbitals

You can now open a Chemical JSON file from Avogadro and play its vibrational modes or show an orbital surface.

Vibrations lists each mode with frequency, IR intensity and Raman activity, draws the spectrum and animates the selected mode. Orbitals lists energies and occupations with HOMO and LUMO marked and shows the surface you pick. Files with several geometries get a coordinate-set selector, and a unit cell opens in the Crystal panel. Gaussian optimization logs with a printed basis keep their orbitals.

A Cube file with several orbitals now offers a Field selector, and you can choose the colours of the positive and negative lobes, then export the field you see.

#QuantumChemistry #ComputationalChemistry

- Attach: `stage-05-calculation-files/vibrations-light-animating.png`, `stage-05-calculation-files/orbitals-light-lumo-surface.png`, `stage-06-cube-fields/fields-light-lumo-recoloured.png`
- Link: `/docs/workflows/calculations`

---

## 7. Plot a distance across every frame of a trajectory

You can now measure a distance, angle or dihedral over a whole XTC or DCD trajectory and save the values as CSV.

Open a PDB with its trajectory and choose Show plots. Type the atom numbers, click Scan all frames, and Burette reads the trajectory in pages without moving the scene; Cancel stops it. The chart marks the current frame, and Export CSV writes one row per frame with its time. This works in the browser as well.

For frames you want to compare by eye, All shows every frame at once and Align superimposes them on the current one. Both are kept when you save the scene.

#MolecularDynamics #ComputationalChemistry

- Attach: `stage-07-trajectory-plots/xtc-light-scan.png`, `stage-07-trajectory-plots/dcd-dark-scan.png`
- Link: `/docs/workflows/trajectories`

---

## 8. Build a peptide or a metal complex and add it to your file

You can now build a peptide, a DNA or RNA strand, or a metal complex from the Compute menu and insert it into the MOL or SDF file you are editing.

Each builder previews the structure before you commit. Insert places the new molecule beside the existing one as one Undo step, and the view widens to show both. Metal–donor bonds of a complex arrive as dative bonds, and the Edit panel can set a dative bond to a metal by hand.

PDB and mmCIF files keep their residues; for those, the builders open the result as a new document you can combine in a scene.

#ComputationalChemistry #MolecularModeling

- Attach: `stage-08-builders/light-peptide-inserted.png`, `stage-08-builders/light-metal-inserted.png`, `stage-08-builders/light-edit-dative.png`
- Link: `/docs/workflows/builders`

---

## 9. Crystal scenes that reopen ready to edit, and export to more formats

You can now save a crystal as a scene and reopen it with the cell still editable.

Open a CIF or POSCAR file, build a supercell, and save the scene. When you reopen it, the Crystal panel shows the saved cell, and further edits are Undo steps that the next save keeps. Export in the Crystal panel writes the current cell as CIF, POSCAR, extended XYZ or CJSON.

For any structure, Export → Structure now also writes MOL, XYZ and CJSON, and Compressed Copy… saves a gzip of the current file, such as caffeine.sdf.gz.

#Crystallography #MaterialsScience

- Attach: `stage-09-crystal-scenes/light-reopen-supercell.png`, `stage-10-structure-export/light-crystal-export.png`, `stage-10-structure-export/light-export-structure-menu.png`
- Link: `/docs/workflows/crystals` and `/docs/formats#export-a-structure`

---

## 10. Script the same edits from Python

You can now build, edit and export a molecule from a Python script, without touching the interface.

The Burette plugin includes a Python client that needs only the standard library and Node.js. A few lines build ethanol from SMILES, replace the oxygen with sulfur, export the result as XYZ, MOL and CJSON, write ORCA and Gaussian inputs, and reopen the file to continue on it. Each edit is applied all or none, and jobs never change the document you have open.

Agents get the same jobs, plus orthographic projection and views down the x, y or z axis.

#Python #Cheminformatics #ComputationalChemistry

- Attach: `stage-11-automation/light-ortho-x-window.png`
- Link: `/docs/plugin#script-a-molecule-from-python`

---

## 11. Right-click an atom to edit it

You can now open the right tool straight from an atom in the 3D view.

Right-click an atom in an XYZ file and choose Edit geometry: the Geometry panel opens on that atom's row, ready for a new bond length or angle. In a MOL or SDF file, Edit atoms and bonds opens the editor on the same atom. Properties… shows the formula, masses, charge, polar surface area, cLogP and MMFF94 energy of the molecule you clicked.

#ComputationalChemistry #MolecularModeling

- Attach: `stage-12-context-menu/light-xyz-menu.png`, `stage-12-context-menu/light-xyz-tool.png`, `stage-12-context-menu/light-props-tool.png`
- Link: `/docs/workflows/geometry`

---

## 12. Ferrocene, terpyridine and edta in a few clicks

You can now build a metal complex from 76 ligands, haptic rings and multidentate chelates included.

Choose a metal, its oxidation state and one of eleven geometries, from linear to square antiprismatic. Pick a ligand for one site, and a chelate fills every site it reaches, keeping its own bite angles. For terpyridine in an octahedron you choose between the meridional sets; tacn and Tp go facial. Ferrocene takes two cyclopentadienyl rings at 1.67 Å from the iron to each ring centre. The total charge follows every change, and RDKit and Open Babel read each result back with the charge we show.

The ligands come from Avogadro's library. We added the hydrogens and formal charges that several of its files were missing, so a built complex is a valid molecule from the start.

#Chemistry #InorganicChemistry #ComputationalChemistry

- Attach: `stage-12-metal-complexes/light-ru-terpy2.png`, `stage-12-metal-complexes/light-ferrocene.png`, `stage-12-metal-complexes/dark-fe-edta.png`
- Link: `/docs/workflows/builders#metal-complexes`

---

## 13. Your Avogadro packages work in Burette

You can now use the input generators and file readers of Avogadro Python packages in the Burette Mac app.

Install a package from Settings › Extensions and set it up once. Export input file then lists its programs under More programs: avogadro-generators alone adds Dalton, GAMESS-UK, MOLPRO, MOPAC, NWChem, PySCF, Q-Chem, TeraChem and others, each with its own option pages and a live preview of every generated file. avogadro-cclib adds Open › With cclib, which turns a Gaussian or ORCA log into a molecule you can view and edit.

Packages run only after you set them up, and their results open as new documents next to your files.

#ComputationalChemistry #OpenSource

- Attach: screenshots of More programs (ORCA options) and Open › With cclib from the packaged Mac app, still to capture
- Link: `/docs/workflows/calculations#programs-and-readers-from-avogadro-packages-mac-app`

---

## 14. Charges, dipole and thermochemistry from your logs

You can now see the charges and the dipole your calculation printed, right on the molecule.

Open a Gaussian, ORCA, Psi4, NWChem, Q-Chem or xTB output and the Info dock lists its charge models. Colour the atoms by charge, label each atom with its value, or draw the dipole arrow, one ångström per debye. For p-nitroaniline the 8.9 D arrow runs from the nitro group to the amino group, as it should. A frequency job adds the zero-point energy, enthalpy, Gibbs energy and entropy, the same numbers the program printed.

Building this also turned up two older bugs: Gaussian logs written with freq=hpmodes did not open, and colouring atoms by xTB charges painted only one atom of each colour. Both are fixed.

#ComputationalChemistry #QuantumChemistry

- Attach: `stage-14-charges-thermochemistry/light-p-nitroaniline-charges-dipole.png`, `stage-14-charges-thermochemistry/dark-p-nitroaniline-charges-dipole.png`
- Link: `/docs/workflows/calculations#charges-dipole-and-thermochemistry`

---

## 15. Orbital diagrams and convergence plots

Burette now draws the molecular orbital diagram of your calculation.

Open an output with orbitals and the Orbitals panel shows the levels around the HOMO–LUMO gap, with the electrons as arrows. For an unrestricted job the α and β channels stand side by side on one energy axis. Click a level and its surface appears in 3D; the arrow keys walk through the levels.

Optimization logs from Gaussian, ORCA, Psi4, Q-Chem and NWChem now also plot each step's maximum and RMS force and step on a log scale, with the program's threshold as a dashed line. You see at once which criterion held the job back.

#ComputationalChemistry #QuantumChemistry

- Attach: `stage-15-orbital-diagram-convergence/light-ch2-uhf-orbital-diagram.png`, `stage-15-orbital-diagram-convergence/dark-dvb-gopt-convergence.png`
- Link: `/docs/workflows/calculations#orbital-level-diagram`
