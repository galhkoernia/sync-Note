# SyncNote Product Requirements

## Product

SyncNote is intended to become a real-time collaborative note-taking application. The first engineering milestone establishes a usable frontend shell, a Go service health check, and clear project boundaries. It does not yet provide a persistent or collaborative notes product.

## Current Implementation

- A single workspace view with temporary sample notes and editable title/content fields.
- A browser request that reports the Go API health endpoint as connected or unavailable.
- `GET /api/v1/health` in the Go backend.
- Notes and collaborator examples are frontend-only and are not persisted or synchronized.

## Planned Capabilities

- User accounts and authenticated access.
- Create, list, edit, and delete persistent documents.
- Share documents with authorized users.
- Concurrent editing, presence, and remote cursors.
- Reconnection and conflict-safe synchronization.

## Initial Product Principles

- Keep the editor central and the application chrome compact.
- Make connection and persistence states explicit.
- Never imply that an unsaved local draft is durable or synchronized.
- Add infrastructure only when a milestone requires it.

## Out of Scope for the Foundation

Authentication, databases, Redis, WebSockets, rich-text editor libraries, persistence, real sharing, real presence, AI features, and deployment infrastructure are not implemented in this milestone.