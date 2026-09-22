# Public documentation review — September 23, 2026

Scope: all 17 MDX guides in `content/`. Baseline: Burette release tag
`v2026.9.9`; local uncommitted app changes were excluded. Hosted MCP tools/list
was checked separately and returned the five documented tools. This review is
source/contract validation, not a new scientific benchmark or packaged native
acceptance run.

| Guides | Evidence in Burette at the release tag | Resolution |
| --- | --- | --- |
| Overview, quick start, desktop | README, docs/molstar-workflows.md, apps/desktop/src/lib/shell-commands.ts, docs/renderer-support.md | Task-based navigation; distinguish preview, desktop, compute, and host surfaces. Qualify topology reconstruction and smoothing. |
| Install | Release assets, .github/workflows/release.yml, package.json, docs/installing-building.md | Remove obsolete 2.3.8 claim and blanket signing statement; add updates and installer prerequisites. Release assets are DMG and ZIP. |
| Formats, engines | config/preview-formats.json, docs/renderer-support.md | Registry verified: 31 families / 118 extensions. Registration, decoding, and paired inputs remain distinct. |
| Quick Look and troubleshooting | docs/quicklook-debugging.md, shell-commands.ts, docs/security-and-permissions.md | Grid previews are supported. Diagnose the failing surface; prefer app reset before manual cache commands; review diagnostics before sharing. |
| Mobile | ios/BuretteMobile/README.md | Source-built only; DataWarrior summary is not desktop grid decoding. |
| Collections, drag/drop | docs/renderer-support.md, apps/desktop/src/lib/drop-actions.ts, apps/desktop/src/lib/structure-drag.ts | Include DataWarrior/reaction scope without extending strict collection merge support. Avoid promising all text stays only in memory. |
| Native compute | docs/gpu-compute-status.md, docs/molstar-workflows.md | Add Chemical Space steps, projection interpretation, frozen scopes, backend provenance, partial/cancelled results, and scientific limits. |
| xTB | apps/desktop/src-tauri/src/commands/xtb_runtime.rs, xtb.rs, config/xtb, apps/desktop/src/lib/direct-chemistry-guard.ts | Managed install requires Pixi or Conda; existing executable and global install remain alternatives. 300-atom guard verified. |
| CREST/PRISM | commands/conformer.rs, apps/desktop/src/lib/chemistry-settings.ts | Document prerequisite package managers; install hints, one-hour default, and guard checked. |
| Plugin | package.json, config/native-widget.json, scripts/stage-native-widget.mjs | Installer uses pinned widget package, not the legacy marketplace. |
| Development | docs/installing-building.md, docs/vite-plus.md, package scripts | Add actual setup prerequisites and Vite+ flow; use neutral isolated development flavor. |

The packaged plugin source is pinned to
`751c61a3ae56ce3e807a75c10225b906660ca543`. Its local-viewer registrations and
install-local script establish the inline tool names, 8-file / 16-MiB bound,
and `burette@burette-widget` identity. The staged native bundle is generated.
Hosted contracts separately verify the 3-MiB attachment and eight-scene-action
bounds. Directory approval is not inferred from a responding MCP endpoint.

Existing calculation recipes were retained where supported by source. No
engine was installed and no calculation or plugin install was executed merely
to verify documentation. Signing credentials and App Directory approval were
not inferred from build configuration.
