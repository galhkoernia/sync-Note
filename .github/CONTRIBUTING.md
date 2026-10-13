# Contributing to SyncNote

Thanks for your interest in contributing. SyncNote is in its foundation milestone; review the current implementation and documentation before proposing functionality that is still planned.

## Repository setup

Clone the repository, then open a terminal in its root. The project has separate `frontend/` and `backend/` applications; install and run each from its own directory.

Prerequisites:

- Node.js 20.9 or later and npm.
- Go 1.27.1 or later.

Install frontend dependencies from the committed lockfile:

```bash
cd frontend
npm ci
```

In a separate terminal, start the backend:

```bash
cd backend
go run ./cmd/server
```

Start the frontend from another terminal:

```bash
cd frontend
npm run dev
```

The frontend is available at `http://localhost:3000`; the backend is available at `http://localhost:8080`.

## Development commands

Run frontend checks from `frontend/`:

```bash
npm run lint
npm run build
```

Run backend checks from `backend/`:

```bash
gofmt -l ./cmd/server/main.go
go vet ./...
go test ./...
```

`gofmt -l` reports files that need formatting without changing them. Apply formatting locally with `gofmt -w` on the Go files you changed.

## Branches and commits

Use short-lived branches created from an up-to-date `main`. Do not create permanent development, staging, frontend, or backend branches.

Use one of these prefixes:

- `feat/` — new features, e.g. `feat/note-crud`
- `fix/` — bug fixes, e.g. `fix/health-endpoint`
- `docs/` — documentation, e.g. `docs/contribution-guide`
- `refactor/` — code restructuring
- `test/` — testing
- `chore/` — maintenance
- `ci/` — CI/CD changes, e.g. `ci/github-actions`

Use clear commit subjects in the Conventional Commits style, such as `feat: add note CRUD` or `docs: clarify local setup`. Keep each commit focused.

## Pull Requests

1. Update your local `main`, then create a short-lived branch from it.
2. Make a focused change and update relevant documentation.
3. Run the applicable lint, test, and build commands above; include any limitations in the PR description.
4. Open a Pull Request targeting `main`, summarize the motivation and affected components, and link a related issue when one exists.
5. Address review feedback and ensure required checks pass before a maintainer merges.

Pull Requests and CI are the intended integration path. This document does not imply that branch protection or required checks have already been configured on GitHub.

## Testing expectations

Add or update tests for behavior changes when the relevant test structure exists. Run frontend lint and production build for frontend changes, and Go formatting verification, `go vet`, and tests for backend changes. For documentation-only changes, check links and commands affected by the edit.

## Security and secrets

Never commit credentials, tokens, private keys, real user data, or local environment files. Keep backend configuration server-side; do not expose secrets through `NEXT_PUBLIC_` variables. Use `frontend/.env.example` only for non-secret examples. Redact secrets and personal data from issue reports and logs. Report suspected vulnerabilities privately through a maintainer-provided security contact rather than disclosing them in a public issue; that contact must be configured before publication.

## Recommended GitHub repository settings

Configure these settings in GitHub repository settings; they are not activated by files in this repository:

- Protect `main` and require Pull Requests for changes.
- Require the relevant frontend and backend CI status checks before merging.
- Prevent force pushes and deletion of `main`.
- Allow maintainers to merge after required checks pass.

Choose the exact required checks based on the workflow jobs shown by GitHub after CI is enabled.
