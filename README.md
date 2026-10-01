# SyncNote

SyncNote is a real-time collaborative note-taking application in its foundation milestone. The current project provides a Next.js notes workspace and a small Go REST health endpoint; document persistence and collaboration are planned, not implemented.

## Technology

- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS
- Backend: Go standard library `net/http`
- Current API: `GET /api/v1/health`

## Repository

```text
frontend/   Next.js application
backend/    Go API service
docs/       Product, architecture, API, design, and security notes
```

## Prerequisites

- Node.js 20.9 or later and npm
- Go 1.27.1 or later

## Setup

Copy `frontend/.env.example` to `frontend/.env.local` if you need to change the backend URL. The default is `http://localhost:8080`.

Terminal 1:

```sh
cd backend
go run ./cmd/server
```

Terminal 2:

```sh
cd frontend
npm install
npm run dev
```

Frontend: <http://localhost:3000>

Backend: <http://localhost:8080>

Health endpoint: <http://localhost:8080/api/v1/health>

Proxied health endpoint: <http://localhost:3000/api/v1/health>

## Development Checks

```sh
cd frontend
npm run lint
npm run build
```

```sh
cd backend
gofmt -w ./cmd/server/main.go
go test ./...
```

## Current Status

The UI contains temporary in-memory sample notes, editable text fields, static collaborator examples, and a browser API health status. Notes are not persisted. Authentication, document APIs, PostgreSQL, Redis, WebSocket synchronization, presence, and conflict-safe editing are planned only. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the implementation boundary.