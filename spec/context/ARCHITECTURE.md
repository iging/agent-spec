# ARCHITECTURE — System Architecture

> **Purpose:** Describe the high-level architecture, module boundaries, data flows, client/server structure, and cross-cutting concerns so developer decisions align with system integrity. Tier-3 template — fill it in for your project.

_Last updated: September 3, 2026_

---

## 1. System Overview & High-Level Architecture

[PLACEHOLDER: Provide a high-level summary of the system topology, key services, entry points, and primary communication protocols.]

- **Dev Server Topology:** Native ES Modules (ESM) dev server powered by Vite 6.x and Esbuild pre-bundling.
- **Production Pipeline:** Multi-stage Rollup/Rolldown bundler engine with automated chunk optimization and asset hashing.
- **SSR/Edge Runtime Topology:** Streaming HTML responses via W3C Web Streams across Node.js, Vercel Edge, and Cloudflare Workers.

### Architecture Diagram

```mermaid
graph TD
  Client["Client App (Vite ESM / SPA)"] --> DevServer["Vite Dev Server (Esbuild)"]
  Client --> Edge["Edge SSR Gateway (Cloudflare / Vercel)"]
  Edge --> API["API Layer / Gateway"]
  API --> Auth["Auth Service"]
  API --> Services["Domain Services / Modules"]
  Services --> DB[("Database / Datastore")]
  Services --> Cache[("Cache / Redis")]
  Services --> ThirdParty["External Services / APIs"]
```

---

## 2. Layered Architecture & Conventions

[PLACEHOLDER: Detail the internal layered design pattern (e.g. Hexagonal, Clean Architecture, Layered MVC).]

- **Presentation / View Layer:** React 19 / Vue 3.5 / Svelte components, page routes, UI primitives.
- **Application / Domain Layer:** Business logic, domain entities, use cases, workflow orchestration.
- **Infrastructure / Data Access Layer:** Vite plugin pipeline, ORM repositories, third-party API adapters.

---

## 3. Directory & Domain Structure

[PLACEHOLDER: Detail directory organization and strict module boundary rules.]

```
src/
├── components/      # Shared reusable UI primitives
├── features/        # Feature modules grouped by domain
│   ├── auth/        # Feature domain (components, hooks, services)
│   └── dashboard/   # Feature domain
├── lib/             # Third-party configuration & SDK wrappers
├── services/        # API and data fetching clients
└── types/           # Shared domain TypeScript types
```

- **Module Boundary Rules:** Feature modules (`src/features/*`) must not import private internals from sibling features. Public APIs must be exposed via explicit module entries without barrel file wildcard re-exports.

---

## 4. Middleware & Request Pipeline

[PLACEHOLDER: Detail the HTTP request/response pipeline and middleware execution order.]

- **Step 1:** CORS & Rate Limiting Middleware
- **Step 2:** Authentication & Token Validation Middleware
- **Step 3:** Request Validation Middleware (Zod / Schema check)
- **Step 4:** Route Handler / Controller Execution
- **Step 5:** Global Error & Response Formatting Middleware

---

## 5. Client-Side Architecture

[PLACEHOLDER: Detail front-end state management, view hierarchy, and routing strategy.]

- **View Layer:** React / React Native / Vue components.
- **State Management:** Local component state, Server state (React Query / SWR), Global client state (Zustand / Redux Toolkit).
- **Routing Strategy:** File-system routing (Next.js / Expo Router) or declarative router (React Router).

---

## 6. Data Layer & Database Strategy

[PLACEHOLDER: Detail data persistence methods, ORM selection, connection pooling, and caching strategy.]

- **ORM / Query Builder:** Prisma / Drizzle / TypeORM / Kysely.
- **Caching Layer:** Redis / In-Memory cache for read-heavy operations.
- **Connection Management:** Connection pooling, read-replicas, and transaction management rules.

---

## 7. Authentication & Authorization Flow

[PLACEHOLDER: Describe the authentication mechanism and permission enforcement model.]

- **Auth Provider:** OAuth 2.0 / OIDC / Supabase Auth / NextAuth / Clerk.
- **Session Model:** JWT Bearer Tokens in HTTP-only cookies or SecureStore.
- **Authorization Model:** Role-Based Access Control (RBAC) or Attribute-Based Access Control (ABAC).

---

## 8. Key Data Flows & Sequence Diagrams

[PLACEHOLDER: Map out primary end-to-end data flows with sequence diagrams.]

```mermaid
sequenceDiagram
  autonumber
  actor User
  participant Client
  participant API
  participant Service
  participant DB

  User->>Client: Submit Form Action
  Client->>API: POST /api/v1/resource
  API->>Service: Validate & Execute Business Logic
  Service->>DB: Read / Write Query
  DB-->>Service: Return Result
  Service-->>API: Format Domain Response
  API-->>Client: 200 OK + JSON Payload
  Client-->>User: Update UI State
```

---

## 9. Domain Logic Highlights

[PLACEHOLDER: Explain non-obvious business rules, state machines, or complex calculations in the domain.]

- **Domain Calculation X:** Rules governing pricing, discounts, or metric aggregation.
- **State Machine Y:** Valid state transitions for orders, workflows, or entity lifecycles.

---

## 10. Cross-Cutting Concerns

[PLACEHOLDER: Specify standards for error handling, validation, security, and performance.]

- **Error Handling:** Standardized error payloads (`code`, `message`, `details`), error boundaries.
- **Input Validation:** Zero-trust schema validation at trust boundaries (API parameters, forms, `.env` schema).
- **Security:** Content Security Policy (CSP) nonce injection, Subresource Integrity (SRI), parameterized SQL queries, secret management (`VITE_` prefix isolation).
- **Observability & Logging:** Structured JSON logging (Pino / Winston), error monitoring (Sentry), APM tracing.
- **Performance Budgets:** Bundle size limits (< 150KB initial JS chunk), HMR latency target (< 50ms), build time target (< 15s).
