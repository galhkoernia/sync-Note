<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## SyncNote frontend guidance

Follow the repository-root `AGENTS.md` and consult `../docs/ARCHITECTURE.md` and `../docs/DESIGN_SYSTEM.md` before frontend changes.

- Preserve the documented frontend/backend boundary and treat roadmap features as unimplemented until designed.
- Use existing semantic CSS variables and the neutral palette; keep content primary, borders and shadows restrained, and layouts usable on narrow screens.
- Prefer semantic controls and visible focus states. Convey status with labels or text as well as color.
- Avoid speculative UI, new component libraries, or dependencies without a concrete requirement.
- Keep API calls aligned with documented contracts and handle loading, empty, and error states.
