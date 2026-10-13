import { type DemoDocument, type WorkspaceView } from "@/lib/workspace/demo-data";
import { DocumentList, EmptyState } from "./document-list";
export function WorkspaceHome({
  view,
  documents,
  query,
  onQuery,
  onSelect,
  onCreate,
}: {
  view: WorkspaceView;
  documents: DemoDocument[];
  query: string;
  onQuery: (query: string) => void;
  onSelect: (id: string) => void;
  onCreate: () => void;
}) {
  const sorted = [...documents].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const visible =
    view === "Search"
      ? sorted.filter((doc) =>
          `${doc.title} ${doc.content}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
        )
      : sorted;
  return (
    <section className="workspace-content" aria-label={view}>
      <div className="eyebrow">YOUR SPACE TO THINK</div>
      <div className="view-heading">
        <div>
          <h1>
            {view === "Home"
              ? "Welcome back, Galuh."
              : view === "Recent"
                ? "Recently edited"
                : view === "Search"
                  ? "Find an idea."
                  : "Your documents"}
          </h1>
          <p>
            {view === "Home"
              ? "A little space for your notes, ideas, and what comes next."
              : view === "Recent"
                ? "Pick up where you left off in this demo workspace."
                : view === "Search"
                  ? "Search titles and content in your local drafts."
                  : "Everything you’re working on, in one quiet place."}
          </p>
        </div>
        <button className="primary-button" onClick={onCreate}>
          + New document
        </button>
      </div>
      {view === "Search" && (
        <label className="search-field">
          <span className="sr-only">Search documents</span>
          <span aria-hidden="true">⌕</span>
          <input
            autoFocus
            type="search"
            placeholder="Search your documents…"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
          />
          <kbd>Local</kbd>
        </label>
      )}
      {view === "Home" && sorted.length > 0 && (
        <section className="recent-section">
          <h2>Recent documents</h2>
          <DocumentList documents={sorted.slice(0, 2)} onSelect={onSelect} />
        </section>
      )}
      <section>
        <div className="list-heading">
          <h2>
            {view === "Home"
              ? "All documents"
              : view === "Search"
                ? "Search results"
                : "Local drafts"}
          </h2>
          <span>
            {visible.length} {visible.length === 1 ? "document" : "documents"}
          </span>
        </div>
        {visible.length ? (
          <DocumentList documents={visible} onSelect={onSelect} />
        ) : (
          <EmptyState
            title={
              documents.length ? "No matching documents" : "Make room for your first idea"
            }
            description={
              documents.length
                ? "Try a different title or phrase."
                : "Create a local draft and start writing. This demo does not save after reload."
            }
            onCreate={documents.length ? undefined : onCreate}
          />
        )}
      </section>
      <p className="workspace-footnote">
        Demo content · No persistence or live collaboration
      </p>
    </section>
  );
}
