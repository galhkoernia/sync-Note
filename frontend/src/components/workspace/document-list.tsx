import {
  demoUsers,
  documentTitle,
  formatDate,
  type DemoDocument,
} from "@/lib/workspace/demo-data";
export function DocumentList({
  documents,
  onSelect,
}: {
  documents: DemoDocument[];
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="document-rows">
      {documents.map((doc) => (
        <li key={doc.id}>
          <button className="document-row" onClick={() => onSelect(doc.id)}>
            <span className="document-glyph" aria-hidden="true">
              ▤
            </span>
            <span className="row-copy">
              <strong>{documentTitle(doc)}</strong>
              <span>
                {doc.content.replace(/\s+/g, " ").slice(0, 100) ||
                  "A blank page, ready for your ideas."}
              </span>
            </span>
            <span className="row-metadata">
              <span>{demoUsers.find((user) => user.id === doc.authorId)?.name}</span>
              <span>{formatDate(doc.updatedAt)} · Local draft</span>
            </span>
            <span className="row-arrow" aria-hidden="true">
              ↗
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
export function EmptyState({
  title,
  description,
  onCreate,
}: {
  title: string;
  description: string;
  onCreate?: () => void;
}) {
  return (
    <div className="empty-state">
      <span className="empty-glyph" aria-hidden="true">
        ▤
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      {onCreate && (
        <button className="primary-button" onClick={onCreate}>
          + New document
        </button>
      )}
    </div>
  );
}
