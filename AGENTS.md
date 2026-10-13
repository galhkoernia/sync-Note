# SyncNote Agent Guidance

Before changing behavior or structure, consult the relevant project documentation:

- `docs/ARCHITECTURE.md` defines implemented boundaries and distinguishes current functionality from planned possibilities.
- `docs/DESIGN_SYSTEM.md` defines the current frontend visual and interaction principles.
- Consult the relevant API, data model, security, and real-time documents when working in those areas.

## Architecture

- Preserve the frontend/backend boundary: Next.js owns the UI and API client; the Go service currently uses the standard library `net/http` and exposes only the documented health endpoint.
- Treat authentication, persistence, PostgreSQL, Redis, WebSockets, collaboration, and other roadmap items as unimplemented until they are explicitly designed and documented.
- Keep changes within the existing directory responsibilities in `docs/ARCHITECTURE.md`. Avoid adding frameworks, state libraries, or infrastructure dependencies without a concrete requirement.
- Keep API behavior aligned with the documented contracts. Do not imply that in-memory sample notes are persisted or collaborative.

## Frontend and design system

- Follow `docs/DESIGN_SYSTEM.md`: keep content primary, use the existing semantic CSS variables, restrained borders and shadows, and the established neutral palette.
- Prefer semantic controls, visible focus states, and layouts usable at narrow viewport widths. Communicate statuses with text or labels as well as color.
- Reuse existing project patterns; do not introduce a component library or speculative rich-text, presence, or sharing features.
- Keep TypeScript types explicit and handle loading, empty, and error states where relevant.

## Reliability and security

- Keep secrets server-side, never commit credentials or local environment files, and do not expose backend-only configuration via `NEXT_PUBLIC_`.
- Validate errors explicitly; do not silently turn failures into successful-looking fallback behavior.
- Add or update relevant tests and documentation when behavior changes. Use the scripts and Go module already present rather than inventing commands or dependencies.
- For Next.js-specific changes, follow the installed version's documentation and the guidance in `frontend/AGENTS.md`.
