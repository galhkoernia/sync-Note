# SyncNote Architecture

## Current Implementation

The frontend is a Next.js App Router application under `frontend/src`. It renders the workspace and makes a browser request to `/api/v1/health`. Next.js rewrites that path to the server-only `BACKEND_URL` (default `http://localhost:8080`).

The Go service uses `net/http` and currently exposes only `GET /api/v1/health`. It has no database, authentication, document handlers, or real-time transport. Sample notes live only in frontend component state.

```text
Browser -> Next.js UI -> /api/v1/health rewrite -> Go HTTP server
```

## Planned Architecture

The intended system may grow to include authenticated REST document operations, durable document storage, and a separate real-time transport for editing and presence. A future design must define authorization, persistence semantics, synchronization, and reconnection behavior before implementing those capabilities.

PostgreSQL, Redis, WebSockets, presence, remote cursors, CRDTs, and collaborative editing are planned possibilities, not current dependencies or services. Their roles and the synchronization strategy remain subject to later design decisions.

## Current Boundaries

- `frontend/src/app`: Next.js routes, root layout, and global styles.
- `frontend/src/components/layout`: workspace shell.
- `frontend/src/lib/api`: typed API request and health client.
- `backend/cmd/server`: Go process entry point.
- `backend/internal`: reserved for implementation code when it has a concrete owner; no packages are needed yet.

The foundation intentionally uses no frontend state library, HTTP framework, ORM, or dependency-injection framework.