# SyncNote Frontend

![Next.js](https://img.shields.io/badge/Next.js-Black?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Status](https://img.shields.io/badge/Status-Foundation-yellow)

The **SyncNote Frontend** is the user-facing application of SyncNote, an open-source-oriented collaborative note-taking platform.

It is built with Next.js App Router, React, TypeScript, and Tailwind CSS.

The frontend is responsible for presenting the workspace, managing user interactions, integrating with backend APIs, and eventually supporting real-time collaborative document editing.

This README defines the frontend's architectural responsibilities, development conventions, and long-term engineering boundaries.

---

## 1. Technology Stack

| Technology | Responsibility |
|---|---|
| Next.js | Application framework and routing |
| React | Component-based user interface |
| TypeScript | Static typing |
| Tailwind CSS | Styling and responsive layouts |
| Fetch API | Communication with backend services |
| Geist | Application typography |

The foundation intentionally avoids unnecessary dependencies.

A global state management library, rich-text editor library, and real-time client library have not yet been selected.

Additional dependencies should be introduced only when supported by concrete requirements.

## 2. Project Responsibilities

The frontend owns:

- Application routes and layouts.
- Workspace navigation.
- Document listing and selection interfaces.
- Document editing interactions.
- User-facing form validation.
- Loading, empty, error, and connection states.
- Communication with backend APIs.
- Responsive interface behavior.
- Accessibility and visual consistency.
- Future real-time collaboration presentation.

The frontend does not own:

- Database persistence.
- Authoritative document storage.
- Authentication authority.
- Server-side access control.
- Document ownership enforcement.
- Authoritative synchronization state.
- Conflict resolution guarantees.

These responsibilities belong to backend services and the agreed synchronization architecture.

## 3. Project Structure

The existing frontend uses the following boundaries:

```text
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── layout/
│   └── lib/
│       └── api/
├── public/
├── .env.example
├── package.json
└── README.md
```

Responsibilities:

- `src/app/` — application routes, layouts, and global styling.
- `src/components/layout/` — workspace shell and layout components.
- `src/lib/api/` — typed HTTP integration and backend health client.
- `public/` — public static assets.

This describes established directory boundaries, not an exhaustive file inventory.

Additional components and modules should be organized according to concrete product requirements.

Avoid creating generic abstractions or directories without a clear responsibility.

## 4. Development Requirements

Prerequisites:

- Node.js 20.9 or later.
- npm.
- A running SyncNote Go backend for backend-dependent functionality.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

http://localhost:3000

## 5. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

The current backend URL defaults to:

```env
BACKEND_URL=http://localhost:8080
```

The application uses a Next.js rewrite to forward `/api/v1/*` requests to the Go backend.

`BACKEND_URL` is a server-side configuration value.

Do not expose it through a `NEXT_PUBLIC_` prefix.

Never commit local environment files containing secrets.

## 6. API Communication

The frontend communicates with the backend through versioned API routes.

Current endpoint:

```http
GET /api/v1/health
```

Current communication flow:

```text
Browser
   |
   v
Next.js Application
   |
   v
/api/v1/health
   |
   v
Next.js Rewrite
   |
   v
Go Backend
```

The frontend should not duplicate backend business logic.

Future integrations must:

- Follow documented API contracts.
- Use typed request and response definitions.
- Handle HTTP and network errors.
- Present appropriate loading states.
- Avoid assuming successful persistence without confirmation.
- Respect authentication and authorization requirements.
- Avoid silently overwriting newer document changes.

The authoritative API specification is maintained in:

`../docs/API_CONTRACT.md`

## 7. Component Architecture

Components should have clearly defined responsibilities.

Recommended principles:

- Separate presentation from API integration when useful.
- Prefer reusable components when genuine reuse exists.
- Keep component interfaces explicit and typed.
- Avoid unnecessary prop drilling or abstractions.
- Use semantic HTML.
- Preserve keyboard accessibility.
- Avoid tightly coupling unrelated features.
- Minimize unnecessary client-side state.

The existing design system uses CSS variables and Tailwind CSS.

Do not introduce a UI component library solely for visual convenience.

Any new UI dependency must be justified against the existing design system.

## 8. State Management

The foundation uses React component state for temporary note content.

This state is not persistent.

Future frontend development must distinguish:

**Local UI State**

- Sidebar visibility.
- Dialog visibility.
- Selected interface tabs.
- Temporary user interactions.

**Server State**

- Persisted documents.
- Document metadata.
- User account information.
- Sharing permissions.

**Editor State**

- Active document content.
- Local editing operations.
- Unsaved changes.
- Undo and redo behavior.

**Real-Time State**

- Connection status.
- Remote editing operations.
- Collaborator presence.
- Synchronization status.

These are conceptual state categories, not a requirement to introduce separate state libraries.

Choose state-management mechanisms according to demonstrated complexity.

## 9. Document Editor

The editor is the central interaction surface of SyncNote.

Future capabilities include:

- Persistent document editing.
- Reliable autosave.
- Save status feedback.
- Document loading and recovery.
- Collaborative editing.
- Remote cursor visualization.
- Conflict-safe synchronization.

The final editor technology and content format have not been selected.

Plain text, Markdown, and rich-text approaches require architectural evaluation.

Do not commit to an editor framework or document serialization model without an explicit design decision.

## 10. Real-Time Collaboration

Real-time collaboration is planned but not yet implemented.

The frontend will eventually need to:

- Establish authenticated real-time connections.
- Join authorized document sessions.
- Submit local editing operations.
- Receive and apply remote changes.
- Handle connection interruption.
- Recover synchronization state after reconnection.
- Display collaborator presence.
- Present accurate synchronization status.

WebSocket is a potential transport mechanism.

The synchronization algorithm remains undecided.

The frontend must not treat message delivery as proof of durable persistence.

Refer to:

`../docs/REALTIME_PROTOCOL.md`

## 11. Design System

SyncNote follows a minimal, content-focused interface design.

Core principles:

- Prioritize document readability.
- Keep navigation compact.
- Maintain consistent spacing and typography.
- Use restrained borders and shadows.
- Provide clear interactive feedback.
- Support responsive layouts.
- Preserve accessibility.
- Distinguish connected, disconnected, saving, saved, and error states.

Current semantic tokens include:

```css
--background
--foreground
--surface
--surface-muted
--border
--muted-foreground
--primary
--success
--danger
```

The source of truth for visual conventions is:

`../docs/DESIGN_SYSTEM.md`

## 12. Security Boundaries

The frontend must not be treated as a trusted security boundary.

Rules:

- Never embed backend secrets in browser code.
- Never rely only on hidden UI controls for authorization.
- Avoid storing sensitive tokens in unsafe browser storage.
- Validate user input for usability while relying on backend validation for security.
- Handle unauthorized and expired sessions.
- Avoid leaking private documents through client-side state or logs.
- Follow appropriate content-rendering safeguards.

Authentication and document access must be enforced by the backend.

## 13. Development Standards

All frontend development should follow these principles:

- Use TypeScript consistently.
- Maintain clear component responsibilities.
- Prefer readable, maintainable implementations.
- Avoid introducing dependencies without need.
- Preserve existing functional behavior during UI refinement.
- Keep backend integration aligned with documented contracts.
- Handle empty, loading, and error states.
- Avoid unnecessary architectural complexity.
- Update relevant documentation when functionality changes.

## 14. Development Checks

Lint:

```bash
npm run lint
```

Production build:

```bash
npm run build
```

Before merging relevant changes:

- Verify TypeScript compatibility.
- Verify affected UI behavior.
- Verify API integration where applicable.
- Verify responsive behavior.
- Verify accessibility basics.
- Confirm no unintended backend assumptions were introduced.

## 15. Development Roadmap

| Milestone | Frontend Focus |
|---|---|
| Foundation | Workspace shell and backend health integration |
| Persistent Notes | Document CRUD and autosave UI |
| Authentication | Account and session interfaces |
| Editor Experience | Reliable editing and workspace polish |
| Sharing | Collaborator and permission interfaces |
| Real-Time | Synchronization client and remote edits |
| Presence | Participant and cursor indicators |
| Stabilization | Accessibility, tests, and performance |
| Public Beta | Production readiness |
| Open Source | Contributor documentation and maintenance |

The roadmap does not imply that planned functionality already exists.

## 16. Architectural Baseline

The following principles are established as the long-term frontend baseline:

1. Next.js App Router remains the frontend application framework unless an explicit architectural decision supersedes it.
2. TypeScript remains the primary application language.
3. Tailwind CSS and semantic design tokens remain the styling foundation.
4. Go backend services remain responsible for authoritative business operations.
5. Frontend API integration follows documented contracts.
6. Document content and synchronization must not rely exclusively on browser memory.
7. Authentication and authorization must not depend on frontend controls.
8. New dependencies require technical justification.
9. Real-time synchronization must follow an approved protocol.
10. Maintainability, correctness, and accessibility take priority over unnecessary UI complexity.

Changes to these baseline decisions require documented justification and review rather than incidental implementation changes.

## 17. Related Documentation

- [Project README](../README.md)
- [Product Requirements](../docs/PRD.md)
- [Architecture](../docs/ARCHITECTURE.md)
- [API Contract](../docs/API_CONTRACT.md)
- [Data Model](../docs/DATA_MODEL.md)
- [Design System](../docs/DESIGN_SYSTEM.md)
- [Realtime Protocol](../docs/REALTIME_PROTOCOL.md)
- [Security](../docs/SECURITY.md)
- [Development Roadmap](../TODO.md)

---

**Project:** SyncNote  
**Module:** Frontend  
**Main Developer:** galhkoernia  
**Status:** Foundation Development

*The frontend is responsible for delivering a reliable user experience while respecting backend authority and documented architectural boundaries.*