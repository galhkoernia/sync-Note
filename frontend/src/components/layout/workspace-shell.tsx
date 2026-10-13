"use client";

import { useEffect, useState } from "react";
import { getHealth } from "@/lib/api/health";

type Note = {
  id: string;
  title: string;
  content: string;
};

type HealthStatus = "loading" | "connected" | "unavailable";

const initialNotes: Note[] = [
  {
    id: "weekly-planning",
    title: "Weekly planning",
    content:
      "A few things to keep in view this week.\n\nReview the project outline and decide what belongs in the first release.\n\nCollect open questions before the next planning session.",
  },
  {
    id: "project-notes",
    title: "Project notes",
    content:
      "Ideas and references for the project.\n\nKeep the first version focused on a dependable writing space and a small, clear application shell.",
  },
  {
    id: "reading-list",
    title: "Reading list",
    content:
      "Notes to return to later.\n\nAdd a title or start writing here.",
  },
];

const healthLabels: Record<HealthStatus, string> = {
  loading: "Checking API",
  connected: "API connected",
  unavailable: "API unavailable",
};

export function WorkspaceShell() {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedId, setSelectedId] = useState(initialNotes[0].id);
  const [healthStatus, setHealthStatus] = useState<HealthStatus>("loading");
  const [hasChanges, setHasChanges] = useState(false);
  const selectedNote = notes.find((note) => note.id === selectedId) ?? notes[0];

  useEffect(() => {
    let isMounted = true;

    getHealth()
      .then(() => {
        if (isMounted) setHealthStatus("connected");
      })
      .catch(() => {
        if (isMounted) setHealthStatus("unavailable");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  function createNote() {
    const note: Note = {
      id: crypto.randomUUID(),
      title: "Untitled note",
      content: "",
    };

    setNotes((currentNotes) => [note, ...currentNotes]);
    setSelectedId(note.id);
    setHasChanges(false);
  }

  function updateSelectedNote(field: "title" | "content", value: string) {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === selectedId ? { ...note, [field]: value } : note,
      ),
    );
    setHasChanges(true);
  }

  return (
    <div className="workspace">
      <aside className="sidebar" aria-label="Workspace navigation">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            s
          </span>
          <span>SyncNote</span>
        </div>

        <button className="new-note" onClick={createNote} type="button">
          <span className="plus" aria-hidden="true">
            +
          </span>
          New note
        </button>

        <div className="section-label">Documents</div>
        <nav className="document-list" aria-label="Documents">
          {notes.map((note) => (
            <button
              aria-current={note.id === selectedNote.id ? "page" : undefined}
              className="document-link"
              key={note.id}
              onClick={() => {
                setSelectedId(note.id);
                setHasChanges(false);
              }}
              type="button"
            >
              {note.title || "Untitled note"}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="api-status" data-status={healthStatus} role="status">
            <span className="status-dot" aria-hidden="true" />
            {healthLabels[healthStatus]}
          </div>
          <div className="profile">
            <span className="profile-avatar" aria-hidden="true">
              G
            </span>
            <span>
              Guest
              <span className="profile-caption">Local workspace</span>
            </span>
          </div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="document-header">
          <div className="document-heading">
            <h1>{selectedNote.title || "Untitled note"}</h1>
            <div className="document-state">
              {hasChanges ? "Unsaved changes" : "Sample document · not saved"}
            </div>
          </div>
          <div className="header-actions">
            <div className="collaborators" aria-label="Static collaborator examples">
              <span className="collaborator-avatar" aria-hidden="true">
                JD
              </span>
              <span className="collaborator-avatar" aria-hidden="true">
                AM
              </span>
            </div>
            <button
              className="share-button"
              disabled
              title="Sharing is not available yet"
              type="button"
            >
              Share
            </button>
          </div>
        </header>

        <section className="editor-scroll" aria-label="Document editor">
          <div className="editor">
            <textarea
              aria-label="Document title"
              className="editor-title"
              onChange={(event) => updateSelectedNote("title", event.target.value)}
              placeholder="Untitled note"
              rows={1}
              value={selectedNote.title}
            />
            <textarea
              aria-label="Document content"
              className="editor-content"
              onChange={(event) => updateSelectedNote("content", event.target.value)}
              placeholder="Start writing..."
              value={selectedNote.content}
            />
          </div>
        </section>
      </main>
    </div>
  );
}