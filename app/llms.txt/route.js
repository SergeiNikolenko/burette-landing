import { SITE_URL } from "../site-url.js";

// https://llmstxt.org - a curated, link-first summary for language models, kept
// deliberately short. The long tail lives under ## Optional so a model with a
// small budget can stop after the sections above it.
const LLMS = `# Burette

> A free, open-source molecular workspace for macOS, Windows, and Linux.
> Press Space in macOS Finder for interactive 3D Quick Look previews, or open
> the desktop workspace on macOS, Windows, and Linux for tabs, Mol* 3D, RDKit
> grids, ligand interaction maps, molecular sketching, and local xTB or CREST runs.

Burette is MIT-licensed and runs on macOS 12+ (Apple Silicon), Windows 10/11 (x64),
and 64-bit x86 Linux (WebKitGTK 4.1). It has no account, no telemetry and no server component:
files are parsed and rendered on the machine, and it needs no network access to
open a file. Mol*, RDKit and the molecular editor are bundled; \`xyzrender\`, \`xtb\` and
\`crest\` are optional external executables that Burette detects on PATH.

Install from GitHub Releases (.dmg/.zip for macOS, .exe for Windows, .deb/.rpm/.AppImage for Linux) or \`brew tap SergeiNikolenko/burette && brew install --cask burette\` on macOS.

## Docs

- [Documentation home](${SITE_URL}/docs): Map of every guide, by surface and workflow.
- [Install Burette](${SITE_URL}/docs/get-started/install): macOS (Homebrew, .dmg/.zip), Windows (.exe), and Linux (.deb/.rpm/.AppImage) installation and updates.
- [Quick Start](${SITE_URL}/docs/get-started/quick-start): From install to a first preview in Finder.
- [Supported Formats](${SITE_URL}/docs/formats): Every extension Burette reads and which engine renders it.
- [Engines](${SITE_URL}/docs/engines): How Mol*, RDKit, the molecular editor, xyzrender, xTB and CREST are wired together.

## Surfaces

- [Finder Quick Look](${SITE_URL}/docs/surfaces/quick-look): The Space-bar preview - what it renders and what it deliberately does not.
- [Desktop Workspace](${SITE_URL}/docs/surfaces/desktop): Tabs, 3D inspection, molecule grids, sketching and export.
- [iPhone Preview App](${SITE_URL}/docs/surfaces/mobile): The iOS companion that hosts the same grid viewer.

## Workflows

- [SDF and Molecule Collections](${SITE_URL}/docs/workflows/collections): Opening libraries as searchable, filterable grids.
- [xTB Calculations](${SITE_URL}/docs/workflows/xtb): Running local semi-empirical jobs against an open structure.
- [CREST and PRISM](${SITE_URL}/docs/workflows/crest-prism): Conformer ensembles and their result artifacts.
- [Native Compute and Chemical Space](${SITE_URL}/docs/workflows/native-compute): Metal-accelerated (Apple Silicon) and CPU (Windows/Linux) neighbour graphs, UMAP and TMAP layouts, Butina clustering, activity cliffs.
- [Drag and Drop](${SITE_URL}/docs/workflows/drag-and-drop): Moving structures between Burette and other apps.

## Agents

- [Burette Plugin and MCP](${SITE_URL}/docs/plugin): A local MCP server exposing typed tools for structures, Mol* scenes, editor sketches, molecule collections, trajectories and workflow artifacts. It runs on the user's machine and talks to the running app, with no cloud round-trip.

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
