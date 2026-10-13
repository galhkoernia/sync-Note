# SyncNote Backend

![Go](https://img.shields.io/badge/Go-00ADD8?logo=go&logoColor=white)
![REST API](https://img.shields.io/badge/REST-API-2563EB)
![HTTP](https://img.shields.io/badge/HTTP-net%2Fhttp-64748B)
![Status](https://img.shields.io/badge/Status-Foundation-yellow)

The **SyncNote Backend** is the server-side component of SyncNote, an open-source-oriented collaborative note-taking platform.

It is developed using Go and the standard library `net/http`.

The backend is intended to provide authenticated document operations, persistent data management, access control, and reliable collaboration services.

The current implementation is intentionally minimal and exposes only a health endpoint.

This README establishes the backend's long-term architectural boundaries, engineering principles, and development direction.

---

## 1. Technology Stack

| Technology | Responsibility | Status |
|---|---|---|
| Go | Backend implementation | Current |
| `net/http` | HTTP server and routing | Current |
| JSON | HTTP response representation | Current |
| REST API | Planned document and account operations | Partial |
| PostgreSQL | Proposed persistent database | Planned |
| WebSocket | Proposed real-time transport | Planned |
| Redis | Possible future distributed coordination | Not required |

PostgreSQL, WebSocket, and Redis are not currently installed or integrated.

The initial backend intentionally avoids unnecessary frameworks, ORMs, and dependency-injection containers.

Technology decisions should be supported by requirements and architectural evaluation.

## 2. Backend Responsibilities

The backend is intended to own:

- HTTP request handling.
- API contract enforcement.
- Request validation.
- Authentication and session enforcement.
- Document-level authorization.
- Document CRUD operations.
- Persistent data access.
- Document ownership and sharing rules.
- Authoritative document state.
- Collaboration session authorization.
- Real-time operation validation.
- Synchronization and concurrency guarantees.
- Operational logging and error handling.

The backend does not own:

- Frontend page rendering.
- Workspace visual design.
- Browser navigation.
- Client-side editor presentation.
- UI animation.
- Client-side component state.

Security-sensitive operations must not depend on the frontend for enforcement.

## 3. Current Implementation

The current backend provides:

- A Go HTTP server.
- A public service health endpoint.
- JSON health responses.

Current endpoint:

```http
GET /api/v1/health
```

Expected successful response:

```json
{
  "status": "ok",
  "service": "syncnote-api"
}
```

HTTP status:

```text
200 OK
```

The endpoint reports service availability only.

It does not verify database health, user authentication, document storage, or collaboration readiness.

## 4. Project Structure

Current documented backend boundaries:

```text
backend/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
├── go.mod
└── README.md
```

Responsibilities:

- `cmd/server/` — application entry point and server initialization.
- `internal/` — reserved for implementation packages when concrete responsibilities exist.
- `go.mod` — Go module definition.

Do not create internal packages merely to imitate a complex architecture.

As features are introduced, organize code around clearly defined responsibilities and dependency boundaries.

Exact future package structure must follow implemented requirements.

## 5. Development Requirements

Prerequisites:

- Go 1.27.1 or later, as specified by the repository setup requirements.

Start the backend:

```bash
go run ./cmd/server
```

Default backend address:

http://localhost:8080

Health endpoint:

http://localhost:8080/api/v1/health

Verify the service:

```bash
curl http://localhost:8080/api/v1/health
```

Expected JSON:

```json
{
  "status": "ok",
  "service": "syncnote-api"
}
```

## 6. API Design Principles

Backend APIs should follow consistent, documented contracts.

Requirements:

- Use versioned API routes.
- Apply appropriate HTTP methods.
- Return predictable status codes.
- Validate request data.
- Use structured JSON responses.
- Avoid exposing internal errors.
- Apply authentication where required.
- Enforce document-level authorization.
- Support pagination for collection endpoints where appropriate.
- Define concurrency semantics for document updates.

The current API is:

```text
/api/v1/health
```

Potential future resources include:

```text
/api/v1/documents
/api/v1/users
/api/v1/auth
```

These resource paths are conceptual and are not currently implemented or approved API contracts.

The source of truth is:

`../docs/API_CONTRACT.md`

## 7. Planned Document Management

The backend will eventually support persistent document operations.

Core requirements:

- Create documents.
- Retrieve documents.
- List accessible documents.
- Update documents.
- Delete documents.
- Associate documents with owners.
- Enforce document access permissions.
- Track document changes.
- Prevent unintended overwrites.

The document resource model and routes must be finalized before implementation.

Document persistence must not depend on process memory.

## 8. Database Architecture

The current backend does not use a database.

PostgreSQL is the proposed primary persistence solution.

Before implementation:

- Define the document data model.
- Define user and ownership relationships.
- Define access permission representation.
- Define database constraints.
- Select a migration strategy.
- Define transaction boundaries.
- Select an appropriate Go database access approach.
- Define connection pooling behavior.
- Define persistence failure handling.

Potential conceptual entities:

```text
User
Document
DocumentAccess
```

These are domain concepts, not finalized database tables.

Do not treat example fields or conceptual entities as production schema definitions.

The authoritative planning reference is:

`../docs/DATA_MODEL.md`

## 9. Authentication & Authorization

The backend must enforce account identity and document-level authorization.

Planned authentication responsibilities:

- Account creation.
- User authentication.
- Session validation.
- Session expiration.
- Session revocation.
- Secure credential handling.

Planned authorization responsibilities:

- Verify document ownership.
- Check collaborator access.
- Enforce edit and read permissions.
- Prevent unauthorized document sharing.
- Prevent privilege escalation.
- Revoke access when permissions change.
- Authorize real-time document sessions.

The authentication implementation has not been selected.

No production authentication behavior should be assumed from the current foundation.

## 10. Real-Time Collaboration

Real-time document collaboration is a core future backend capability.

The backend must eventually support:

- Authenticated collaboration connections.
- Authorized document sessions.
- Validated editing operations.
- Distribution of remote changes.
- Concurrent editing safety.
- Synchronization state recovery.
- Reconnection handling.
- Reliable persistence.
- Participant presence.

WebSocket is a potential communication transport.

However, WebSocket does not independently resolve concurrent editing conflicts.

A synchronization strategy must be chosen before implementing collaborative editing.

Potential approaches include:

- Operation-based synchronization.
- Operational transformation.
- Conflict-free replicated data types (CRDTs).

No approach has been selected.

The protocol design must define:

- Message structure.
- Connection authentication.
- Document authorization.
- Operation ordering.
- Version semantics.
- Acknowledgments.
- Persistence guarantees.
- Error handling.
- Recovery and resynchronization.

See:

`../docs/REALTIME_PROTOCOL.md`

## 11. Data Consistency

Document integrity is a fundamental backend responsibility.

The system must eventually define guarantees for:

- Durable document storage.
- Concurrent modifications.
- Document revision management.
- Duplicate operations.
- Delayed or reordered messages.
- Client reconnections.
- Backend restarts.
- Data recovery after failures.

Do not assume that receiving or broadcasting an operation means it has been durably saved.

A successful persistence acknowledgment must follow explicitly defined durability semantics.

The backend must prevent silent loss of acknowledged document changes.

## 12. Error Handling

Backend errors should be handled consistently.

Principles:

- Validate input before processing.
- Distinguish client and server errors.
- Use appropriate HTTP status codes.
- Return predictable error responses.
- Avoid exposing stack traces or internal implementation details.
- Log errors with useful operational context.
- Never log passwords, raw session tokens, or authentication secrets.

A standardized error response schema must be finalized before document APIs are introduced.

## 13. Security Requirements

Security is a foundational requirement rather than a final-stage feature.

Backend implementation must consider:

- Secure authentication.
- Session management.
- Server-side authorization.
- Request validation.
- Request body limits.
- Rate limiting.
- Safe error responses.
- Protection against credential disclosure.
- Safe database operations.
- Secret management.
- Secure production configuration.
- WebSocket origin validation.
- Real-time connection limits.
- Real-time message validation.

Every protected document operation must verify the caller's access.

Never trust client-provided ownership or permission claims without server-side verification.

Refer to:

`../docs/SECURITY.md`

## 14. Logging & Observability

As functionality grows, the backend should introduce observability appropriate to its complexity.

Planned capabilities:

- Structured application logs.
- Request correlation where useful.
- HTTP error monitoring.
- Database error visibility.
- Real-time connection metrics.
- Synchronization failure monitoring.
- Operational health checks.

Logs must not expose sensitive user content, credentials, or secrets.

The current public health endpoint is a minimal availability check, not a comprehensive operational monitoring system.

## 15. Testing Strategy

Backend development should include tests appropriate to each feature.

Areas:

- HTTP handler behavior.
- API response contracts.
- Input validation.
- Database operations.
- Authentication.
- Authorization.
- Document ownership.
- Document sharing.
- Concurrent editing.
- Synchronization recovery.
- Connection lifecycle.

Run tests:

```bash
go test ./...
```

Check formatting:

```bash
gofmt -l ./cmd/server/main.go
```

Format the current entry-point file:

```bash
gofmt -w ./cmd/server/main.go
```

As the backend grows, formatting and validation should cover all maintained Go packages.

Tests should focus on behavior, contracts, and correctness rather than implementation details alone.

## 16. Performance & Scalability

The backend should prioritize correctness before infrastructure complexity.

Principles:

- Use Go concurrency deliberately.
- Handle shared mutable state safely.
- Respect request cancellation.
- Avoid unbounded goroutines and connections.
- Use timeouts and resource limits.
- Measure performance before optimization.
- Avoid introducing caching without a demonstrated need.
- Avoid distributed coordination infrastructure before multi-instance requirements justify it.

Redis is not a required foundation dependency.

Scaling architecture should evolve according to measured traffic and operational requirements.

## 17. Deployment Principles

The production backend will eventually require:

- Secure environment configuration.
- HTTPS or appropriate TLS termination.
- Database connectivity.
- Controlled schema migrations.
- Health and readiness behavior.
- Structured logging.
- Safe shutdown behavior.
- Appropriate request limits.
- Backup and recovery procedures.
- Monitoring and error reporting.

No production deployment architecture has been finalized.

Containerization and infrastructure choices should be justified separately.

## 18. Development Roadmap

| Milestone | Backend Focus |
|---|---|
| Foundation | Go HTTP server and health endpoint |
| Persistence | Database and document CRUD |
| Authentication | Identity, sessions, and ownership |
| Editor Support | Save reliability and revisions |
| Sharing | Document permissions and collaboration access |
| Real-Time | Synchronization and concurrent editing |
| Presence | Collaboration participant lifecycle |
| Stabilization | Security, testing, and reliability |
| Public Beta | Deployment and operational readiness |
| Open Source | API documentation and maintainability |

Milestones describe intended development direction, not completed implementation.

## 19. Architectural Baseline

The following principles establish the long-term backend baseline:

1. Go remains the backend implementation language unless an explicit architecture decision supersedes it.
2. The Go standard library is preferred where it adequately meets project requirements.
3. Backend services own authoritative data operations.
4. Public APIs follow explicit, versioned contracts.
5. Database operations and persistence guarantees are enforced server-side.
6. Authentication and authorization are backend responsibilities.
7. Real-time document access requires authentication and authorization.
8. Concurrent editing must use an explicitly designed synchronization model.
9. New infrastructure is introduced only when technically justified.
10. Security, reliability, and data integrity take priority over architectural complexity.

Changes to these foundational decisions require an explicit architectural review and corresponding documentation updates.

## 20. Related Documentation

- [Project README](../README.md)
- [Frontend README](../frontend/README.md)
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
**Module:** Backend  
**Main Developer:** galhkoernia  
**Status:** Foundation Development

*The backend is responsible for secure, reliable, and consistent document operations while maintaining clear architectural boundaries and avoiding unnecessary infrastructure complexity.*