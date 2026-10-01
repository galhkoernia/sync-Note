# ADR 0001: Foundation Scope

## Status

Accepted

## Context

SyncNote needs a runnable frontend/backend foundation before committing to persistence or real-time collaboration design. Introducing infrastructure before those requirements are resolved would increase the initial surface without improving the health-check milestone.

## Decision

- Use Next.js App Router, React, TypeScript, and Tailwind CSS for the frontend.
- Use Go's standard-library `net/http` for the initial backend.
- Expose only `GET /api/v1/health` in this milestone.
- Keep notes as explicitly temporary frontend-only state.
- Defer authentication, databases, Redis, WebSockets, and conflict-resolution technology.

## Consequences

The project can run locally with the frontend and backend as separate processes. Notes do not survive page reloads, and the static collaborator/share UI does not provide collaboration. Future architecture decisions must be documented when requirements become concrete.