# Realtime Protocol

## Current Implementation

There is no real-time transport, synchronization protocol, presence service, or remote cursor support. The current editor changes local component state only.

## Planned Design Work

A future protocol must specify connection authentication, document authorization, join/leave behavior, message validation and size limits, ordering/version semantics, reconnect and resynchronization behavior, and how concurrent edits avoid silent data loss.

WebSockets are a possible transport. The conflict-resolution model (including whether an operation-based or CRDT approach is appropriate) has not been selected. Redis and other distributed coordination infrastructure are also not present. No message shapes in this document should be treated as an implemented contract.