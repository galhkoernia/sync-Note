# SyncNote Data Model

## Current Implementation

There is no backend data model or persistence layer. Three sample notes and newly created notes exist only in browser memory and are lost when the page state is discarded.

## Planned Model

Future persistence will need to represent at least users, documents, and document access. A durable document will need a stable identifier, ownership/access rules, title, content representation, and timestamps. Exact fields, constraints, migrations, and storage technology have not been selected.

PostgreSQL is a possible future persistence choice, not a current dependency. This document is a planning boundary, not a schema specification.