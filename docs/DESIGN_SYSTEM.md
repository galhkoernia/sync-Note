# SyncNote Design System

## Current Interface

The first workspace uses a light, neutral palette, compact sidebar navigation, restrained borders, and an open writing surface. Geist is loaded through `next/font`. The shell uses CSS variables in `frontend/src/app/globals.css` and avoids a component-library dependency.

Current semantic tokens include `--background`, `--foreground`, `--surface`, `--surface-muted`, `--border`, `--muted-foreground`, `--primary`, `--success`, and `--danger`.

The document list, title, and content are temporary frontend state. Collaborator initials and the disabled Share control are static examples, not functional collaboration UI.

## Principles

- Keep document content visually primary.
- Prefer semantic controls and clear focus states.
- Use color and labels together for connection status.
- Keep borders subtle, radii restrained, and shadows minimal.
- Make the workspace usable at narrow viewport widths.

## Future Components

Add reusable primitives only when real UI needs them. A rich-text editor, presence UI, and share flow are future design work and are not represented as implemented components.