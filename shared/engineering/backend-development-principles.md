---
name: Backend Development Principles
description: Framework-agnostic backend engineering standards for boundary input validation, API contract integrity, defense-in-depth, error handling, structured logging, and stateless resource management.
---

# Backend Development Principles

> **Purpose:** Baseline server-side engineering rules shared across backend environments and frameworks. Reference this file when designing API contracts, handling errors, managing state, or validating boundary inputs.

---

## Role / Authority

- **Role:** Framework-agnostic engineering standard for server-side architecture, API integrity, data storage, and backend security.
- **Authority:** Tier-3 shared engineering specification for backend applications across languages and runtimes.
- **Must not define:** Language-specific syntax rules or frontend presentation logic.

---

## 1. Boundary Input Validation and Sanitization

- Validate all incoming data at the controller boundary using strict schema parsers (for example Zod, Valibot, or native DTO schema validators).
- Treat all external input as untrusted. This includes query parameters, path parameters, request bodies, HTTP headers, and third-party webhooks.
- Reject invalid requests early with descriptive 400 Bad Request responses before executing business logic or database queries.

---

## 2. API Contract and Communication Standards

- Enforce uniform response envelopes for HTTP status codes, data payloads, and error objects.
- Use explicit HTTP status codes per RFC 9110: 200 OK for successful reads, 201 Created for resource generation, 204 No Content for successful deletions, 400 Bad Request for validation errors, 401 Unauthorized for missing authentication, 403 Forbidden for insufficient permissions, 404 Not Found for missing resources, 429 Too Many Requests for rate limits, and 500 Internal Server Error for unhandled exceptions.
- Design idempotent API endpoints per RFC 9110 Section 9.2. Ensure GET, HEAD, PUT, DELETE, OPTIONS, and TRACE operations produce identical server state regardless of execution frequency. Note that GET, HEAD, OPTIONS, and TRACE are safe (read-only) methods.

---

## 3. Defense-in-Depth Security

- Authenticate users using cryptographically signed tokens or secure session identifiers.
- Authorize requests at the controller handler boundary. Verify resource ownership explicitly. Never rely on client-side routing guards for access control.
- Enforce prepared SQL statements or parameterized ORM queries for all database access. Ban dynamic string concatenation in database queries.
- Hash passwords using robust password algorithms: choose Argon2id as a memory-hard algorithm (recommended m=19MB, t=2, p=1), or bcrypt with a cost factor of at least 10 (cost factor 12 recommended for server nodes).

---

## 4. Error Handling and Root Cause Chaining

- Never swallow exceptions or leave catch blocks empty.
- Wrap low-level driver or database errors inside domain-specific error instances while preserving root cause context through error cause properties (`Error.cause`) or exception chaining.
- Sanitize error responses sent to client applications. Never expose internal stack traces, database schema details, or server directory structures in production environments.

---

## 5. Structured Logging and Observability

- Output logs as single-line JSON objects containing ISO timestamps, log levels (INFO, WARN, ERROR), request correlation IDs (`X-Request-ID`), user identifiers, and action names.
- Attach a unique request correlation ID to log entries across asynchronous execution chains and microservices.
- Scrub sensitive attributes (for example passwords, tokens, credit card numbers, personal data) before serializing log records.

---

## 6. Data Integrity and Transaction Management

- Wrap multi-step state mutations inside atomic database transactions. Roll back changes completely if any operation fails.
- Enforce relational constraints (foreign keys, unique indexes, check constraints) at the database layer rather than relying exclusively on application code.
- Implement soft-deletes or audit log tables for critical financial and user records.

---

## 7. Statelessness and Resource Management

- Maintain stateless application nodes. Store session state and cache records in shared key-value stores (for example Redis).
- Manage database connections using connection pools with explicit acquire and idle timeout configurations.
- Implement rate limiting at API gateways or middleware boundaries to prevent resource exhaustion and brute-force attacks.


