# API Contract

## Current Implementation

### Health

`GET /api/v1/health` returns HTTP 200 when the Go service is running.

Response content type: `application/json`

```json
{
  "status": "ok",
  "service": "syncnote-api"
}
```

The endpoint is currently unauthenticated and reports service availability only. The frontend requests it at `/api/v1/health`; the Next.js rewrite proxies to `BACKEND_URL` without exposing that variable to browser code.

## Planned API

Document, account, and sharing endpoints are not defined or implemented yet. Their resource shapes, authorization rules, error format, and versioning details must be agreed before those routes are added.