---
name: API Design Principles
description: API engineering rules covering REST, GraphQL, OpenAPI specifications, versioning, authentication, and error handling for modern web services.
---

# API Design Principles

> **Purpose:** API design engineering rules for REST, GraphQL, and OpenAPI specifications. Reference this file from your prompt to enforce strict API standards and consistent service contracts.

---

## 1. REST API Design

- **Resource-Noun URLs:** Use plural nouns for resource endpoints (`/users`, `/orders`, `/products`). Avoid verbs in URLs; use HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) to indicate actions.
- **HTTP Status Codes:** Return appropriate status codes. `200` for successful GET/PUT, `201` for created resources (POST), `204` for deleted resources, `400` for client errors, `401`/`403` for auth/authorization, `404` for not found, `500` for server errors.
- **Filtering and Pagination:** Use query parameters for filtering (`?status=active`), sorting (`?sort=created_at`), and pagination (`?page=2&limit=10`). Default page size should be reasonable (e.g., 20-50 items).
- **HTTP Methods Semantics:**
  - `GET`: Retrieve resource(ies). Must be idempotent and safe.
  - `POST`: Create a new resource. Not idempotent.
  - `PUT`: Replace a resource entirely. Must be idempotent.
  - `PATCH`: Partially update a resource. Idempotency depends on implementation.
  - `DELETE`: Remove a resource. Must be idempotent.
- **HATEOAS (Optional):** Include relevant links in responses to allow clients to discover related resources dynamically. Not mandatory for all APIs, but recommended for public-facing services.
- **Consistent Naming:** Use camelCase for JSON keys (`userId`, `createdAt`). Avoid snake_case unless the target audience expects it (e.g., legacy systems).

---

## 2. GraphQL Design

- **Schema-First Approach:** Define the GraphQL schema using SDL (Schema Definition Language) before writing resolvers. The schema is the contract; code generation follows.
- **Single Entry Point:** All GraphQL queries and mutations go through a single endpoint (`/graphql`). No per-operation URLs.
- **Type Safety:** Use precise GraphQL types (`String`, `Int`, `Float`, `Boolean`, `ID`). Avoid `Any` or `JSON` types unless absolutely necessary.
- **Nested Queries:** Allow clients to request exactly the data they need through nested fields. Prevent overly deep nesting (`user { posts { comments { ... } } }`) with depth limits or cost analysis.
- **Enums and Interfaces:** Use GraphQL enums for finite value sets. Use interfaces and unions for polymorphic types.
- **Deprecation Directive:** Mark deprecated fields with `@deprecated(reason: "...")`. Consumers must be notified 1+ major version before removal.

---

## 3. OpenAPI/Swagger Specification

- **Versioned Specs:** Store OpenAPI YAML/JSON files versioned in the repository (`openapi/v1.yaml`, `openapi/v2.yaml`). Never generate specs solely at runtime without source control.
- **Schemes and Hosts:** Explicitly declare `schemes: [https]` and `host: api.example.com`. Do not rely on defaults; explicit is clearer for clients.
- **Security Schemes:** Define `securitySchemes` for OAuth2, API keys, or Bearer tokens. Reference them in individual operation `security` blocks.
- **Tags and Documentation:** Use tags to group operations (`Users`, `Orders`, `Authentication`). Add human-readable descriptions for each endpoint.
- **Request/Response Models:** Define inline or referenced models for every request body and response type. Use `examples` fields to illustrate typical payloads.
- **CI/CD Validation:** Run `openapi validate` or `swagger-cli validate` as a CI step. Fail the build if the spec does not validate against the code.

---

## 4. API Versioning

- **URL Versioning (Preferred for Breaking Changes):** `/v1/users`, `/v2/users`. Use when the change is not backward-compatible.
- **Header Versioning:** `Accept: application/vnd.api+v1+json`. Good for minor versioning or when URL structure cannot change.
- **Deprecation, Not Removal:** Deprecate old versions with `Deprecation` header and timeline. Remove only after a minimum of 12 months and extensive consumer notification.
- **Feature Flags over Versioning:** When possible, use feature flags or feature-specific endpoints instead of major version bumps.

---

## 5. Authentication and Authorization

- **Bearer Tokens:** Use `Authorization: Bearer <jwt>` for stateless authentication. JWTs should be short-lived (15-30 minutes) with refresh token flow.
- **OAuth 2.0 / OpenID Connect:** For public or third-party integrations, use OIDC with well-known Discovery endpoint. Prefer established providers (Auth0, Keyclover, AWS Cognito) over rolling your own.
- **Scope-Based Authorization:** Attach scopes to tokens (`scope: read:users`, `scope: write:orders`). Check scopes on the server side for every protected resource.
- **Rate Limiting:** Implement per-IP or per-token rate limiting (`5 requests/minute`). Return `429 Too Many Requests` with `Retry-After` header.
- **Public vs. Private Endpoints:** Clearly mark which endpoints are public (no auth) vs. private (auth required). Document in OpenAPI under `security` requirements.

---

## 6. Error Handling and Responses

- **Standard Error Format:** All error responses follow a consistent shape:
  ```json
  {
    "error": "ValidationError",
    "message": "The field 'email' must be a valid email address.",
    "path": "email",
    "code": "INVALID_EMAIL",
    "status": 400
  }
  ```
- **Specific Error Codes:** Use application-specific error codes (`VALIDATION_ERROR`, `AUTH_FAILED`, `NOT_FOUND`, `CONFLICT`) alongside HTTP status codes.
- **Validation Errors:** Return `400 Bad Request` with detailed field-level errors when request validation fails. Include `field`, `received`, and `expected` or `reason`.
- **Not Found:** Return `404 Not Found` with a machine-readable error code. Include a `traceId` if distributed tracing is enabled.
- **Conflict:** Return `409 Conflict` when a resource cannot be created due to a conflict (e.g., duplicate email).
- **Timeout and Retry:** For idempotent operations (GET, PUT), recommend client-side retry with exponential backoff. For non-idempotent operations (POST, PATCH), recommend idempotency keys.

---

## 7. API Performance and Optimization

- **Response Compression:** Enable `gzip` or `brotli` compression for JSON responses over 1KB.
- **CDN Caching:** Set appropriate `Cache-Control` headers (`public, max-age=3600`) for GET responses that are safe to cache.
- **Selective Fields:** Allow clients to request specific fields (`?fields=id,name,email`) to reduce payload size.
- **Database Query Optimization:** Use indexing, read replicas, and connection pooling. Never expose N+1 query problems through the API.
- **Rate Limiting per Endpoint:** Different endpoints may have different thresholds. Admin endpoints: stricter. Public read endpoints: more lenient.

---

## 8. API Developer Experience

- **Interactive Docs:** Host OpenAPI specs on Swagger UI or Redoc for interactive exploration.
- **SDK Generation:** Generate client SDKs in popular languages (TypeScript, Python, Java) from the OpenAPI spec.
- **Change Log:** Maintain a changelog for API changes (deprecated fields, new endpoints, breaking changes).
- **SandBox/Testing Endpoint:** Provide a sandbox environment with mock data for developers to test integrations without affecting production.
- **Version Support Window:** Document the minimum supported API version for clients. Plan deprecation and removal timelines publicly.
