import { SITE_URL } from "../site-url.js";

// https://llmstxt.org - a curated, link-first summary for language models, kept
// deliberately short. The long tail lives under ## Optional so a model with a
// small budget can stop after the sections above it.
const LLMS = `# Burette

> A free, open-source macOS app that renders molecular files. Press Space in
> Finder and a PDB, CIF, SDF, XYZ, trajectory or chemistry table opens as an
> interactive 3D structure through Quick Look, with no app window and no upload.
> When a preview is not enough, the same file opens in a workspace with tabs,
> Mol* 3D, RDKit grids, Ketcher sketching, and local xTB or CREST runs.

Burette is MIT-licensed, signed and notarized, and requires macOS 12 or later on
Apple Silicon or Intel. It has no account, no telemetry and no server component:
files are parsed and rendered on the machine, and it needs no network access to
open a file. Mol*, RDKit and Ketcher are bundled; \`xyzrender\`, \`xtb\` and
\`crest\` are optional external executables that Burette detects on PATH.

Install with \`brew install --cask burette\` or the .dmg from GitHub Releases.

## Docs

- [Documentation home](${SITE_URL}/docs): Map of every guide, by surface and workflow.
- [Install Burette](${SITE_URL}/docs/get-started/install): Homebrew cask, .dmg, first launch, and registering the Quick Look extension.
- [Quick Start](${SITE_URL}/docs/get-started/quick-start): From install to a first preview in Finder.
- [Supported Formats](${SITE_URL}/docs/formats): Every extension Burette reads and which engine renders it.
- [Engines](${SITE_URL}/docs/engines): How Mol*, RDKit, Ketcher, xyzrender, xTB and CREST are wired together.

## Surfaces

- [Finder Quick Look](${SITE_URL}/docs/surfaces/quick-look): The Space-bar preview - what it renders and what it deliberately does not.
- [Desktop Workspace](${SITE_URL}/docs/surfaces/desktop): Tabs, 3D inspection, molecule grids, sketching and export.
- [iPhone Preview App](${SITE_URL}/docs/surfaces/mobile): The iOS companion that hosts the same grid viewer.

## Workflows

- [SDF and Molecule Collections](${SITE_URL}/docs/workflows/collections): Opening libraries as searchable, filterable grids.
- [xTB Calculations](${SITE_URL}/docs/workflows/xtb): Running local semi-empirical jobs against an open structure.
- [CREST and PRISM](${SITE_URL}/docs/workflows/crest-prism): Conformer ensembles and their result artifacts.
- [Native Compute and Chemical Space](${SITE_URL}/docs/workflows/native-compute): Metal-accelerated neighbour graphs, UMAP and TMAP layouts, Butina clustering, activity cliffs.
- [Drag and Drop](${SITE_URL}/docs/workflows/drag-and-drop): Moving structures between Burette and other apps.

## Agents

- [Burette Plugin and MCP](${SITE_URL}/docs/plugin): A local MCP server exposing typed tools for structures, Mol* scenes, Ketcher edits, molecule collections, trajectories and workflow artifacts. It runs on the user's machine and talks to the running app, with no cloud round-trip.

## Optional

- [Troubleshooting](${SITE_URL}/docs/troubleshooting): Common failures and how to diagnose them.
- [Quick Look Troubleshooting](${SITE_URL}/docs/troubleshooting/quick-look): When previews do not appear - macOS only registers the extension after the host app has been launched once.
- [Development](${SITE_URL}/docs/development): Building Burette from source.
- [Support](${SITE_URL}/support): How to report a problem.
- [Privacy](${SITE_URL}/privacy): What the app and the site do and do not collect.
- [Terms](${SITE_URL}/terms): License and terms of use.
- [Source on GitHub](https://github.com/SergeiNikolenko/Burette): Issues, releases and the MIT license.
`;

export const dynamic = "force-static";

export function GET() {
  return new Response(LLMS, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
