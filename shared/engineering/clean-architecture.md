---
name: Clean Architecture & Adaptive Layering Principles
description: Framework-agnostic engineering standard for Clean Architecture, layer isolation, YAGNI anti-bloat guardrails, and dual adaptation for greenfield and brownfield projects.
---

# Clean Architecture & Adaptive Layering Principles

## Role / Authority

- **Role:** Framework-agnostic Clean Architecture and structural organization standard for software systems.
- **Authority:** Cross-cutting engineering guidance tier referenced by feature modules, context templates, and runtime adapters.
- **Must not define:** Framework-specific syntax, database-specific query languages, or hardcoded directory paths.

---

## 1. Core Architecture Axioms

1. **The Dependency Rule:** Source code dependencies point strictly inward toward higher-level policies. Inner layers know nothing about outer layers.
   - Domain logic must not depend on database clients, HTTP frameworks, UI components, or external SDKs.
   - Outer layers (Controllers, Repositories, UI Views) depend on abstractions (interfaces, ports) declared in inner layers.
2. **Framework Independence:** Frameworks are external tools, not architecture drivers. Business rules remain usable, testable, and intact without any web framework, database engine, or UI renderer present.
3. **YAGNI & Anti-Bloat Guardrails:** Architecture exists to enable change, not to force speculative indirection.
   - Do NOT generate empty interfaces, single-implementation abstractions, or placeholder directories until concrete complexity demands them.
   - Do NOT create multi-file indirection chains for simple CRUD operations.
4. **Boundary Isolation:** Data cross-layer boundaries in plain data structures (DTOs, primitive types, or immutable records). Database entities or HTTP request objects must not leak into the Domain layer.

---

## 2. Dual Adaptation Matrix (Greenfield vs. Brownfield)

AI agents and software engineers must adapt architectural enforcement based on the current state of the repository.

### Mode A: Existing Codebase (Brownfield Adaptation)

- **Discovery First:** Inspect `package.json`, `go.mod`, `Cargo.toml`, or directory layout before creating any file.
- **Respect Established Patterns:** If the codebase uses feature-based colocation (e.g., `src/features/auth/`), apply clean boundaries _inside_ that feature folder (`components/`, `api/`, `model/`). Do not force a global `src/domain/` directory if the repository does not use global layer folders.
- **Zero Unsanctioned Restructuring:** Never rename, move, or split existing files or folders unless explicitly requested in the prompt.
- **Incremental Refactoring:** When adding a new capability to a legacy codebase, encapsulate new logic in clean boundaries while bridging to existing interfaces via adapters.

### Mode B: New Project From Scratch (Greenfield Adaptation)

- **Minimal Baseline:** Start with the simplest viable directory structure required for the initial user request.
- **Lazy Directory Creation:** Create directories (`domain/`, `use-cases/`, `adapters/`) only when files exist to fill them. Never commit empty `.gitkeep` directories or placeholder boilerplate.
- **Progressive Architecture Expansion:**
  - _Tier 1 (Simple Task / Prototype):_ Single file or simple module with clear separation of pure logic vs. IO.
  - _Tier 2 (Medium Feature Set):_ Separate domain rules from HTTP/database logic in colocated modules.
  - _Tier 3 (Large Multi-Domain Application):_ Full Clean Architecture layout with explicit domain entities, use-case interactors, input/output ports, and infrastructure adapters.

### 4-Step AI Auto-Discovery Protocol

Whenever an AI agent or engineer enters an unfamiliar repository, it MUST execute this discovery sequence before generating or modifying code:

1. **Step 1: Inspect Entry Points:** Scan routing, handlers, or app entry files (`app/`, `routes/`, `controllers/`, `handlers/`, `cmd/`, `main.go`) to identify how external requests enter the system.
2. **Step 2: Locate Business Rules:** Search for pure logic modules (files with zero framework or database imports) to locate the domain boundary.
3. **Step 3: Locate Data & IO Boundaries:** Identify database schemas, ORM models, API gateways, or messaging clients to locate infrastructure boundaries.
4. **Step 4: Lock Target Pattern:** Match the repository's structure to the Architectural Translation Matrix below and preserve those exact boundaries for all new code.

### Architectural Translation Matrix

Use this matrix to map Clean Architecture concepts to whichever pattern the target project uses:

| Target Architecture              | Domain Layer Equivalent            | Application Layer Equivalent | Adapter Layer Equivalent          | Infrastructure Layer Equivalent    |
| :------------------------------- | :--------------------------------- | :--------------------------- | :-------------------------------- | :--------------------------------- |
| **Clean Architecture**           | Enterprise Domain Entities & Rules | Use-Case Interactors & Ports | Controllers, Presenters, Gateways | Database, HTTP Server, UI Views    |
| **Hexagonal (Ports & Adapters)** | Core Domain                        | Primary & Secondary Ports    | Driving & Driven Adapters         | DB Drivers, HTTP Framework, Queues |
| **CQRS & Event-Driven**          | Aggregates & Domain Events         | Command & Query Handlers     | Event Producers & Consumers       | Event Store, Read DBs, Kafka       |
| **Traditional Layered (MVC)**    | Models & Entities                  | Service Layer                | Controllers & View Mappers        | ORM / DB Context, Views            |
| **Serverless / FaaS**            | Pure Business Functions            | Cloud Function Handlers      | Event Payload Mappers             | AWS Lambda, DynamoDB, S3           |
| **Micro-frontends**              | Core Feature State                 | State Actions & Custom Hooks | API Gateways & Federation         | Web Components, Shell Container    |

---

## 3. Layer Definitions & File Responsibilities

| Layer                  | Responsibility                                                                                            | Allowed Dependencies         | Prohibited Contents                                                        |
| :--------------------- | :-------------------------------------------------------------------------------------------------------- | :--------------------------- | :------------------------------------------------------------------------- |
| **Domain**             | Core enterprise business rules, entities, value objects, domain events, pure functions.                   | None (Stdlib only).          | Web frameworks, SQL queries, ORM annotations, HTTP clients, UI components. |
| **Application**        | Use-case interactors, application service interfaces, input/output port definitions, orchestration logic. | Domain layer.                | Direct database connections, raw request/response objects, UI state.       |
| **Interface Adapters** | Controllers, presenters, gateways, DTO mappers, API handlers, repository implementations.                 | Domain, Application layers.  | Core domain business rule logic, low-level driver setup.                   |
| **Infrastructure**     | Database drivers, web servers, UI views, external API clients, OS/filesystem calls, framework wiring.     | All layers (outermost ring). | Unisolated domain logic scattered across views or route handlers.          |

---

## 4. Anti-Hallucination File Creation Rules

When generating code or scaffolding features, agents MUST obey these anti-bloat constraints:

1. **The 1-File Rule for 1-Step Tasks:** If a request requires a simple utility or standalone handler, write it in a single clean file. Do not invent `interfaces/`, `services/`, and `models/` subdirectories for a 20-line script.
2. **No Speculative Interfaces:** Create interfaces only when:
   - Polymorphism is required (multiple implementations exist).
   - Boundary inversion is required (Domain/Application calling Infrastructure).
   - Mocking is strictly required for automated testing.
3. **No Pass-Through Wrappers:** Avoid creating classes or functions whose sole action is forwarding calls to an underlying library without adding domain rules, validation, or transformation.
4. **Boundary Transformation:** Map external DB/API models to domain types at the infrastructure boundary. Never pass raw database entities directly to client UI layers or public API responses.

---

## 5. Implementation Benchmarks

### Minimal Clean Boundaries (TypeScript / Node / Web)

```
src/
├── domain/                  # Enterprise Rules (Pure TS, No Framework Imports)
│   └── user.ts              # Entity + Invariant Validation
├── application/             # Use Cases & Port Interfaces
│   ├── ports.ts             # UserRepository interface definition
│   └── register-user.ts     # Use-case interactor function
├── infrastructure/          # Adapters & Drivers
│   ├── db-user-repository.ts# Database adapter implementing UserRepository port
│   └── http-user-handler.ts # Express/Next.js route handler
```

### Feature-Colocated Clean Boundaries (React / Next.js / Large Web Apps)

```
src/features/checkout/
├── domain/                  # Cart & Payment calculation logic (Pure JS/TS)
│   └── calculate-tax.ts
├── ui/                      # React Components & Presentation Layer
│   ├── CheckoutButton.tsx
│   └── OrderSummary.tsx
├── api/                     # Infrastructure Gateway Adapters
│   └── stripe-adapter.ts
```

### Mobile Clean Boundaries (React Native / Expo / Mobile Apps)

```
src/features/authentication/
├── domain/                      # 1. Pure Enterprise Domain Rules (No RN imports)
│   ├── user-session.ts          # Session entity & token validity rules
│   └── password-validator.ts    # Domain validation logic
├── application/                 # 2. Mobile Use Cases & Device Ports
│   ├── ports.ts                 # SecureStoragePort & BiometricsPort interfaces
│   └── login-usecase.ts         # Login interactor handling auth flow
├── adapters/                    # 3. View Models & State Stores
│   ├── auth-store.ts            # State adapter (Zustand / Redux / Observable)
│   └── auth-dto-mapper.ts       # Maps API responses to Domain UserSession
└── infrastructure/              # 4. Device Drivers, Native Storage & UI
    ├── expo-secure-storage.ts   # Device implementation of SecureStoragePort
    ├── expo-local-auth.ts       # Device implementation of BiometricsPort
    └── screens/                 # Mobile Screen Views (UI Layer)
        ├── LoginScreen.tsx      # SafeAreas, Pressable, FlashList, Inputs
        └── BiometricPrompt.tsx
```

### Modular Monolith Boundaries (Bounded Context Modules)

```
src/modules/
├── billing/                       # Bounded Context Module 1
│   ├── public-api.ts              # Public contract exposed to other modules
│   ├── domain/                    # Billing Domain Rules & Invoices
│   ├── application/               # ProcessPaymentUseCase
│   └── infrastructure/            # Stripe API & Payment DB Table
├── inventory/                     # Bounded Context Module 2
│   ├── public-api.ts              # Public contract exposed to other modules
│   ├── domain/                    # Stock & Reservation Rules
│   ├── application/               # ReserveStockUseCase
│   └── infrastructure/            # Inventory DB Table
└── shared-kernel/                 # Common Kernel (Value objects, Event Bus)
    └── event-bus.ts
```

### Microservices Boundaries (Autonomous Services / Monorepo)

```
services/
├── order-service/                  # Microservice A (Standalone Process)
│   ├── domain/                     # Order Entity & State Machine
│   ├── application/                # CreateOrderUseCase & PaymentGatewayPort
│   ├── adapters/                   # gRPC Mappers & Event Handlers
│   └── infrastructure/            # PostgreSQL DB & RabbitMQ Producer
└── notification-service/           # Microservice B (Standalone Process)
    ├── domain/                     # Notification Templates & Policy
    ├── application/                # SendEmailUseCase
    └── infrastructure/             # Twilio / SendGrid Adapter
```

---

## 6. Compliance Checklist

- [ ] Dependencies point inward toward Domain (Domain imports zero external frameworks).
- [ ] Greenfield projects start minimal without placeholder empty directories.
- [ ] Brownfield projects adapt to established folder structures and naming conventions.
- [ ] Every file created directly serves an active, explicitly requested requirement.
- [ ] Boundary mappers isolate external data structures from internal entities.
