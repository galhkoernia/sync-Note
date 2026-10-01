# SyncNote Security

## Current Implementation

The application has no user accounts, authentication, authorization, document persistence, or collaboration transport. The health endpoint is public and returns service status only. The frontend uses mock content and sends no credentials.

`BACKEND_URL` is read by the Next.js server rewrite and must not use a `NEXT_PUBLIC_` prefix. Only the example value is committed; local environment files are ignored.

## Planned Requirements

Before adding user or document operations, define authentication, session handling, document-level authorization, input validation, and safe logging. A future real-time transport must authenticate and authorize document access before joining a room, validate origins and message schemas, and enforce payload and connection limits.

Never store raw passwords or log passwords, raw session tokens, or authentication secrets. These are design requirements for future work, not claims about implemented controls.