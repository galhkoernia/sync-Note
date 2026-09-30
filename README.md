# SyncNote

Real-time collaborative note-taking application.

## Stack

- Next.js
- React
- TypeScript
- Go
- PostgreSQL
- Redis
- WebSocket

## Project Structure

frontend/    Next.js client application
backend/     Go backend service
docs/        Product and engineering documentation

## Development

### Frontend

cd frontend
npm install
npm run dev

### Backend

cd backend
go run ./cmd/server

Frontend:
http://localhost:3000

Backend:
http://localhost:8080

Health check:
http://localhost:3000/api/v1/health