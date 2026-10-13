import { useLayoutEffect, useRef, useState } from "react";
import {
  demoUsers,
  documentTitle,
  formatDate,
  type DemoDocument,
} from "@/lib/workspace/demo-data";
export function DocumentEditor({
  document,
  onUpdate,
  onDelete,
}: {
  document: DemoDocument;
  onUpdate: (field: "title" | "content", value: string) => void;
  onDelete: () => void;
}) {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const actionsRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useLayoutEffect(() => {
    for (const element of [titleRef.current, contentRef.current]) {
      if (element) {
        element.style.height = "auto";
        element.style.height = `${element.scrollHeight}px`;
      }
    }
  }, [document.title, document.content]);
  const words = document.content.trim() ? document.content.trim().split(/\s+/).length : 0;
  return (
    <section className="editor" aria-label={`Edit ${documentTitle(document)}`}>
      <div className="editor-toolbar">
        <span className="draft-label">Local draft</span>
        <div className="document-actions">
          <button
            ref={actionsRef}
            className="icon-button"
            aria-label="Document actions"
            aria-expanded={menuOpen}
            aria-controls="document-actions"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ···
          </button>
          {menuOpen && (
            <div
              id="document-actions"
              className="action-popover"
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setMenuOpen(false);
                  actionsRef.current?.focus();
                }
              }}
            >
              <button
                className="danger-text"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete();
                }}
              >
                Delete document
              </button>
            </div>
          )}
        </div>
      </div>
      <textarea
        ref={titleRef}
        aria-label="Document title"
        className="editor-title"
        placeholder="Untitled document"
        rows={1}
        value={document.title}
        onChange={(event) => onUpdate("title", event.target.value)}
      />
      <div className="editor-metadata">
        <span>By {demoUsers.find((user) => user.id === document.authorId)?.name}</span>
        <span>Edited {formatDate(document.updatedAt)}</span>
        <span>Demo document</span>
      </div>
      <div className="writing-rule" />
      <textarea
        ref={contentRef}
        aria-label="Document content"
        className="editor-content"
        placeholder="Start writing. Make this space yours…"
        value={document.content}
        onChange={(event) => onUpdate("content", event.target.value)}
      />
      <footer className="editor-footer">
        <span>
          {words} {words === 1 ? "word" : "words"} · Plain text
        </span>
        <span>Not saved · this session only</span>
      </footer>
    </section>
  );
}
