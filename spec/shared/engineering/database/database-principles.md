---
name: Database Principles (SQL & NoSQL)
description: Framework-agnostic standard for SQL schema design, query indexing, ACID transaction management, zero-downtime migrations, document modeling, key-value stores, graph/vector search, and database security.
---

# Database Principles (SQL & NoSQL)

> **Purpose:** Baseline data persistence rules shared across SQL and NoSQL databases. Reference this file when designing relational schemas, writing indexes, structuring document or key-value models, or planning zero-downtime migrations.

---

## Role / Authority

- **Role:** Framework-agnostic baseline standard for database schema design, query optimization, transaction boundaries, caching, and data modeling across SQL and NoSQL data stores.
- **Authority:** Tier-3 shared engineering specification applicable across backend architectures, ORMs, query builders, and data access layers.
- **Must not define:** Vendor cloud infrastructure billing configs or client-side UI state management.

---

## 1. SQL Schema Design and Data Normalization

- Design relational schemas to 3rd Normal Form (3NF) baseline to eliminate redundancy; selectively denormalize only for proven read performance bottlenecks.
- Use explicit non-null constraints (`NOT NULL`) by default; require justification for nullable fields.
- Choose surrogate keys (UUIDv7 or ULID for time-ordered locality) for global entities; use natural unique keys for domain lookups with explicit `UNIQUE` constraints.
- Enforce foreign key constraints with explicit cascade behaviors (`ON DELETE RESTRICT` or `ON DELETE CASCADE`) to preserve referential integrity.

---

## 2. SQL Indexing and Query Performance

- Index foreign key columns, high-cardinality search predicates, and `JOIN` condition columns.
- Respect the Leftmost Prefix Rule for composite indexes: order columns by equality predicates first, range predicates second, and sort keys third.
- Use covering indexes (`INCLUDE` clauses) to enable Index-Only Scans and eliminate heap lookups for hot query paths.
- Analyze execution plans (`EXPLAIN ANALYZE`) to identify full table scans, high buffer reads, and inefficient join algorithms before deploying queries to production.
- Use partial or filtered indexes (`WHERE status = 'ACTIVE'`) to minimize index storage overhead for subset queries.

---

## 3. Transactions, ACID, and Concurrency Control

- Keep database transactions lean and execution times minimal to reduce lock contention and block durations.
- Select appropriate transaction isolation levels: use `READ COMMITTED` for standard operations; use `REPEATABLE READ` or `SERIALIZABLE` when preventing phantom reads or race conditions is critical.
- Use Optimistic Concurrency Control (version timestamp or token increment) for low-contention resource updates; use Pessimistic Locking (`SELECT FOR UPDATE`) sparingly for critical inventory or financial mutations.
- Order multi-table lock acquisitions deterministically across all application paths to prevent deadlocks.

---

## 4. Zero-Downtime Schema Migrations

- Execute schema changes using the Expand-Contract (Parallel Writes) migration pattern: introduce new columns/tables in Expand, migrate data asynchronously, update code to read/write new structures, and drop legacy structures in Contract.
- Use non-blocking DDL commands (e.g. `CREATE INDEX CONCURRENTLY` in PostgreSQL) for zero-downtime execution on active tables.
- Maintain idempotent, version-controlled migration scripts. Never modify previously executed migration files in production history.

---

## 5. Document Database Modeling (MongoDB / DocumentDB)

- Model data based on application access patterns: embed child data for 1-to-1 or bounded 1-to-N relationships accessed together; reference documents for unbounded 1-to-N or N-to-M relationships.
- Prevent the Unbounded Array anti-pattern; cap embedded array size or migrate to separate child collections when arrays grow indefinitely.
- Enforce structural consistency using server-side JSON Schema validation (`$jsonSchema`).

---

## 6. Key-Value and Distributed Data Stores (Redis / DynamoDB / Cassandra)

- Namespace key structures predictably (e.g. `tenant:{tenant_id}:session:{session_id}`) with mandatory TTL expiration policies on volatile keys.
- Prevent Cache Stampedes using Probabilistic Early Expiration (XFetch algorithm) or distributed mutex locks on cache misses.
- Design DynamoDB/Cassandra models query-first: select partition keys to distribute write traffic evenly across nodes and prevent partition hotspots.

---

## 7. Graph and Vector Database Design (Neo4j / pgvector)

- Model property graphs with clear node labels and directed relationship types; index node property lookups for traversal entry points.
- Select vector indexing algorithms (HNSW for high QPS, IVFFlat for memory efficiency) matching scale and accuracy requirements.
- Combine vector similarity search with sparse lexical filters (Hybrid Search) to preserve precise keyword matching alongside semantic search.

---

## 8. Database Security, Connection Management, and Reliability

- Eliminate SQL Injection (SQLi) by executing all dynamic queries through parameterized prepared statements without exception.
- Configure client connection pools using empirical scaling formulas (`Pool Size = (CPU Cores * 2) + Spindle Count`) with idle connection eviction and connection leak detection.
- Encrypt data in transit with TLS 1.3/1.2 and data at rest with AES-256 authenticated symmetric encryption.
- Maintain Write-Ahead Logging (WAL), automated point-in-time recovery (PITR), and routinely test database restoration procedures.
