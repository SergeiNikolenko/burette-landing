import StartupSymbol from "./startup-symbol";

export default function WorkspaceLoading({ ready, failed, children }) {
  return <div className="workspace-loading" data-ready={ready} aria-hidden={ready}>
    <div className="workspace-loading-content" role={ready ? undefined : "status"}>
      <StartupSymbol disabled={ready} />
      <span className="workspace-loading-name">Burette</span>
      <div className="workspace-loading-message">
        {!failed && <span className="workspace-loading-spinner" aria-hidden="true" />}
        {failed ? children : <span>Opening workspace</span>}
      </div>
    </div>
  </div>;
}
