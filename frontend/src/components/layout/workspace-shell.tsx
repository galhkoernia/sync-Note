"use client";

import { useEffect, useState } from "react";
import { getHealth } from "@/lib/api/health";
import {
  demoDocuments,
  demoUsers,
  documentTitle,
  type DemoDocument,
  type WorkspaceView,
} from "@/lib/workspace/demo-data";
import { WorkspaceSidebar, type HealthStatus } from "./workspace-sidebar";
import { WorkspaceDialog } from "./workspace-dialog";
import { WorkspaceHome } from "../workspace/workspace-home";
import { DocumentEditor } from "../workspace/document-editor";

export function WorkspaceShell() {
  const [documents, setDocuments] = useState(demoDocuments);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<WorkspaceView>("Home");
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [healthStatus, setHealthStatus] = useState<HealthStatus>("loading");
  const selected = documents.find((doc) => doc.id === selectedId);
  const deleting = documents.find((doc) => doc.id === deleteId);
  useEffect(() => {
    let mounted = true;
    getHealth()
      .then(() => {
        if (mounted) setHealthStatus("connected");
      })
      .catch(() => {
        if (mounted) setHealthStatus("unavailable");
      });
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const closeDrawer = () => {
      if (!media.matches) setDrawerOpen(false);
    };
    media.addEventListener("change", closeDrawer);
    return () => media.removeEventListener("change", closeDrawer);
  }, []);
  function navigate(nextView: WorkspaceView) {
    setView(nextView);
    setSelectedId(null);
    setDrawerOpen(false);
  }
  function select(id: string) {
    setSelectedId(id);
    setDrawerOpen(false);
  }
  function createDocument() {
    const doc: DemoDocument = {
      id: crypto.randomUUID(),
      title: "",
      content: "",
      updatedAt: new Date().toISOString(),
      authorId: demoUsers[0].id,
    };
    setDocuments((current) => [doc, ...current]);
    select(doc.id);
  }
  function updateDocument(field: "title" | "content", value: string) {
    setDocuments((current) =>
      current.map((doc) =>
        doc.id === selectedId
          ? { ...doc, [field]: value, updatedAt: new Date().toISOString() }
          : doc,
      ),
    );
  }
  function deleteDocument() {
    setDocuments((current) => current.filter((doc) => doc.id !== deleteId));
    if (selectedId === deleteId) navigate("Documents");
    setDeleteId(null);
  }
  const sidebarProps = {
    documents,
    view,
    selectedId,
    healthStatus,
    onNavigate: navigate,
    onSelect: select,
    onCreate: createDocument,
  };
  return (
    <div className={`workspace ${sidebarOpen ? "" : "sidebar-collapsed"}`}>
      <a className="skip-link" href="#workspace-main">
        Skip to workspace
      </a>
      {sidebarOpen && (
        <div className="desktop-sidebar">
          <WorkspaceSidebar {...sidebarProps} onClose={() => setSidebarOpen(false)} />
        </div>
      )}
      {drawerOpen && (
        <WorkspaceDialog
          title="Workspace navigation"
          drawer
          onClose={() => setDrawerOpen(false)}
        >
          <WorkspaceSidebar {...sidebarProps} onClose={() => setDrawerOpen(false)} />
        </WorkspaceDialog>
      )}
      <main className="main-panel" id="workspace-main" tabIndex={-1}>
        <header className="document-header">
          <div className="breadcrumb">
            <button
              className="icon-button desktop-toggle"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <button
              className="icon-button mobile-toggle"
              aria-label="Open navigation"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              ☰
            </button>
            <button className="breadcrumb-home" onClick={() => navigate("Home")}>
              Workspace
            </button>
            <span aria-hidden="true">/</span>
            <span className="truncate">{selected ? documentTitle(selected) : view}</span>
          </div>
          <div className="header-actions">
            {selected ? (
              <>
                <div
                  className="collaborators"
                  aria-label="Demo collaborators: Galuh Kurnia and Ekawati; no live presence"
                >
                  {demoUsers.map((user) => (
                    <span key={user.id} className="avatar" title={`${user.name} · demo`}>
                      {user.initials}
                    </span>
                  ))}
                </div>
                <button className="secondary-button" onClick={() => setShareOpen(true)}>
                  Share <span className="share-caption">· Preview</span>
                </button>
              </>
            ) : (
              <span className="demo-label">Demo workspace</span>
            )}
          </div>
        </header>
        <div className="workspace-scroll">
          {selected ? (
            <DocumentEditor
              key={selected.id}
              document={selected}
              onUpdate={updateDocument}
              onDelete={() => setDeleteId(selected.id)}
            />
          ) : (
            <WorkspaceHome
              key={view}
              view={view}
              documents={documents}
              query={query}
              onQuery={setQuery}
              onSelect={select}
              onCreate={createDocument}
            />
          )}
        </div>
      </main>
      {shareOpen && (
        <WorkspaceDialog title="Sharing preview" onClose={() => setShareOpen(false)}>
          <span className="demo-label">Demo · Coming soon</span>
          <p>
            Sharing and live collaboration are not available yet. These people are static
            examples; no invitation or document is sent.
          </p>
          <div className="preview-users">
            {demoUsers.map((user) => (
              <div className="profile" key={user.id}>
                <span className="avatar">{user.initials}</span>
                <span>
                  {user.name}
                  <span className="profile-caption">
                    {user.id === "galuh"
                      ? "Workspace user · demo"
                      : "Collaborator example · demo"}
                  </span>
                </span>
              </div>
            ))}
          </div>
          <div className="dialog-buttons">
            <button className="secondary-button" onClick={() => setShareOpen(false)}>
              Close preview
            </button>
            <button className="primary-button" disabled>
              Invite · Coming soon
            </button>
          </div>
        </WorkspaceDialog>
      )}
      {deleting && (
        <WorkspaceDialog title="Delete this document?" onClose={() => setDeleteId(null)}>
          <p>
            “{documentTitle(deleting)}” will be removed from this local session. This
            action cannot be undone.
          </p>
          <div className="dialog-buttons">
            <button
              className="secondary-button"
              autoFocus
              onClick={() => setDeleteId(null)}
            >
              Keep document
            </button>
            <button className="danger-button" onClick={deleteDocument}>
              Delete document
            </button>
          </div>
        </WorkspaceDialog>
      )}
    </div>
  );
}
