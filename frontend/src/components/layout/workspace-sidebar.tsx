import {
  demoUsers,
  documentTitle,
  type DemoDocument,
  type WorkspaceView,
} from "@/lib/workspace/demo-data";

export type HealthStatus = "loading" | "connected" | "unavailable";

const labels = {
  loading: "Checking API",
  connected: "API connected",
  unavailable: "API unavailable",
};

const navigation: { view: WorkspaceView; symbol: string }[] = [
  { view: "Home", symbol: "⌂" },
  { view: "Search", symbol: "⌕" },
  { view: "Recent", symbol: "◷" },
  { view: "Documents", symbol: "▤" },
];

export function WorkspaceSidebar({
  documents,
  view,
  selectedId,
  healthStatus,
  onNavigate,
  onSelect,
  onCreate,
  onClose,
}: {
  documents: DemoDocument[];
  view: WorkspaceView;
  selectedId: string | null;
  healthStatus: HealthStatus;
  onNavigate: (view: WorkspaceView) => void;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onClose: () => void;
}) {
  return (
    <aside className="sidebar" aria-label="Workspace navigation">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">
          s
        </span>
        <span>SyncNote</span>
        <button
          className="icon-button collapse-button"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          «
        </button>
      </div>
      <div className="workspace-label">
        Personal workspace <span className="demo-label">Demo</span>
      </div>
      <nav className="primary-nav" aria-label="Main navigation">
        {navigation.map(({ view: item, symbol }) => (
          <button
            key={item}
            className="nav-link"
            aria-current={!selectedId && view === item ? "page" : undefined}
            onClick={() => onNavigate(item)}
          >
            <span className="nav-symbol" aria-hidden="true">
              {symbol}
            </span>
            {item}
          </button>
        ))}
      </nav>
      <div className="sidebar-section">
        <span className="section-label">Your documents</span>
        <button className="icon-button" aria-label="New document" onClick={onCreate}>
          +
        </button>
      </div>
      <nav className="sidebar-documents" aria-label="Documents">
        {documents.map((doc) => (
          <button
            key={doc.id}
            className="document-link"
            aria-current={doc.id === selectedId ? "page" : undefined}
            onClick={() => onSelect(doc.id)}
          >
            <span aria-hidden="true">▤</span>
            <span className="truncate">{documentTitle(doc)}</span>
          </button>
        ))}
        {!documents.length && (
          <p className="sidebar-empty">Your next idea starts here.</p>
        )}
      </nav>
      <button className="new-note" onClick={onCreate}>
        + New document
      </button>
      <div className="sidebar-footer">
        <p className="demo-notice">
          Demo workspace · drafts stay in this tab until reload.
        </p>
        <div className="api-status" data-status={healthStatus} role="status">
          <span className="status-dot" aria-hidden="true" />
          {labels[healthStatus]}
        </div>
        <div className="profile">
          <span className="avatar">GK</span>
          <span>
            {demoUsers[0].name}
            <span className="profile-caption">Personal workspace · demo</span>
          </span>
        </div>
      </div>
    </aside>
  );
}
