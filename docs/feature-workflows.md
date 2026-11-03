# Expanded feature workflows

The `/features` catalog now includes protein superposition, molecular Stories,
docking pose review, similarity clustering and diverse selection, scaffolds and
R-groups, collection editing and merging, geometry optimization, quantitative
pose comparison, local folder watching, and FEP network inspection.

Capabilities without a reviewed capture use `textOnly: true`. They appear as
compact lists below the existing galleries, with no placeholder image or
recording promise. Media cards still require `captureStatus: approved` and
existing assets. Native calculations are identified as Apple Silicon Mac
workflows; these claims do not extend to the hosted widget or Quick Look.

## Media reused

These are existing Burette interface captures, not newly recorded client demos.
Their source is `apps/desktop/public/onboarding/guides/` in the Burette
repository; `contextual-guides.ts` identifies the demonstrated workflows.

| Published asset in `public/assets/features/` | Visible workflow |
| --- | --- |
| `trajectory-aligned.mp4` and `trajectory-aligned.webp` | Aligned adenylate kinase trajectory, replacing the molecular-vibration example |
| `pose-1.webp` | One docking pose in the receptor binding site |
| `fep-graph.webp` | Ligand transformation network in Graph view |

The trajectory is an unchanged 8.17-second, 960 × 540, 24 fps H.264 recording
(416,263 bytes), with no audio. Its six-frame contact sheet was visually
reviewed. The video checker reports optional audio/subtitle warnings; the page
supplies a workflow description, and the shared video component retains its
poster and reduced-motion behavior.

The docking still illustrates the binding-site view, not the act of switching
poses. The FEP still shows the graph, not a completed free-energy calculation.

## Client recordings still needed

Record the actual client and its Burette workspace; do not reuse the existing
ChatGPT video under a Claude or Codex title. Do not publish an empty chat,
reconstructed conversation, or unsupported calculation as a client demo.

### Claude: inspect a binding site

1. Start with the public 1HTB structure and an available Burette connection.
2. Ask: “Open 1HTB in Burette. Focus on a heme ligand and hide water.”
3. Wait for the real rendered result and the acknowledged scene changes.
4. Ask to show nearby residues, using the controls available in that client.
5. Finish on the binding-site view and a captured image.

### Codex: explain a structure

1. Ask the agent to create a three-step molecular Story: structure overview,
   ligand, and surrounding residues.
2. Show the actual generated Story opening in Burette.
3. Step through its scenes and finish on the saved MVSX artifact.

Target 30–60 seconds per client. Keep the real request and result visible,
remove unrelated private sidebar content from the recording frame, and retain
original recordings outside git. Confirm readiness and available actions in
each client before recording. These two videos have not been added to the site.

## Validation

The content update passed the repository site checks, runtime-route checks, and
production build. Browser review covered the new collection list in light and
dark themes at desktop and 390-pixel widths. The new list uses two columns on
desktop and one on mobile, without document-level horizontal overflow.

`npm audit --omit=dev` reports existing dependency findings (20 total, including
two critical). This content change does not modify dependency manifests or the
lockfile; a dependency upgrade remains separate work.
