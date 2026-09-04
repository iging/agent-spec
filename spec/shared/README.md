# Shared Engineering, Design, & Writing Principles

## Role / Authority

- **Role:** Central index for shared conventions, coding principles, design guides, and writing rules.
- **Authority:** Cross-cutting guidance tier referenced by modules, templates, and runtime adapters.
- **Must not define:** Project-specific data models or framework core instructions.

---

## 1. Overview

The `shared/` directory organizes cross-cutting domain principles into structured sub-directories for agent guidance and quality enforcement.

## 2. Domain Catalogs

### Engineering (`shared/engineering/`)

- [`typescript-standards.md`](engineering/typescript-standards.md) — Type-system rules covering strict setup, erasable syntax, runtime validation, and advanced type derivation.
- [`naming-conventions.md`](engineering/naming-conventions.md) — Casing rules and clarity principles for files, components, hooks, functions, and identifiers.
- [`design-principles.md`](engineering/design-principles.md) — Structural design axioms covering SOLID, DRY, KISS, YAGNI, Law of Demeter, and encapsulation.
- [`function-design.md`](engineering/function-design.md) — Function shaping rules covering size, argument flow, side-effect honesty, guard clauses, JSDoc conventions, and file layout.
- [`module-organization.md`](engineering/module-organization.md) — Import-graph rules covering the barrel-file ban and direct imports.
- [`error-handling.md`](engineering/error-handling.md) — Exception design covering contract-first catches, exception translation, and the ban on exceptions as control flow.
- [`react-native-principles.md`](engineering/react-native-principles.md) — React Native and Expo foundation covering architecture posture, platform boundaries, list and image policies, storage security, and accessibility mapping.
- [`javascript-principles.md`](engineering/javascript-principles.md) — Modern JavaScript / TypeScript idiomatic patterns and conventions.
- [`nextjs-principles.md`](engineering/nextjs-principles.md) — Next.js App Router patterns, Server Components, and API route rules.
- [`php-principles.md`](engineering/php-principles.md) — Modern PHP architecture constraints, strict typing rules, security standards, and performance patterns.
- [`laravel-principles.md`](engineering/laravel-principles.md) — Laravel 11.x/12.x architecture constraints, Eloquent ORM performance rules, Livewire and Inertia stack boundaries, security standards, and Pest PHP testing guidelines.
- [`react-principles.md`](engineering/react-principles.md) — Modern React architecture constraints, Server Components, hook rules, state colocation, and accessibility standards.
- [`backend-development-principles.md`](engineering/backend-development-principles.md) — Framework-agnostic backend engineering standards for API integrity, validation, security, logging, and data persistence.
- [`frontend-development-principles.md`](engineering/frontend-development-principles.md) — Framework-agnostic frontend engineering standards for component architecture, state colocation, Core Web Vitals, and accessibility.
- [`security-best-practices.md`](engineering/security-best-practices.md) — Framework-agnostic baseline security standard for authentication, authorization, data protection, network security, and defense-in-depth.
- [`database-principles.md`](engineering/database-principles.md) — Framework-agnostic baseline standard for database schema design, query optimization, transaction boundaries, caching, and data modeling across SQL and NoSQL data stores.
- [`clean-architecture.md`](engineering/clean-architecture.md) — Framework-agnostic Clean Architecture standard, layer isolation rules, YAGNI anti-bloat guardrails, and greenfield/brownfield adaptation matrix.
- [`infrastructure-principles.md`](engineering/infrastructure-principles.md) — Framework-agnostic baseline standard for declarative Infrastructure as Code (IaC), immutable infrastructure, cloud resource isolation, least-privilege identity access, cost optimization, and multi-region resilience.
- [`cicd-deployment-principles.md`](engineering/cicd-deployment-principles.md) — Framework-agnostic baseline standard for continuous integration pipelines, automated deployment strategies (blue/green, canary), rollback safety, artifact versioning, and build security.
- [`performance-principles.md`](engineering/performance-principles.md) — Framework-agnostic baseline standard for application responsiveness, throughput optimization, latency reduction, memory management, caching topologies, and scalable systems design.
- [`observability-telemetry-principles.md`](engineering/observability-telemetry-principles.md) — Framework-agnostic baseline standard for structured logging, distributed tracing, metric instrumentations, alert design, OpenTelemetry collection, and incident visibility.
- [`feature-flag-principles.md`](engineering/feature-flag-principles.md) — Framework-agnostic baseline standard for feature toggles, dynamic configuration management, trunk-based development enablement, experimentation control, and flag lifecycle cleanup.
- [`incident-response-principles.md`](engineering/incident-response-principles.md) — Framework-agnostic baseline standard for production incident triage, severity classification, communication protocols, mitigation strategies, blameless postmortems, and preventative action tracking.
- [`tech-debt-principles.md`](engineering/tech-debt-principles.md) — Framework-agnostic baseline standard for identifying, quantifying, prioritizing, refactoring, and managing technical debt, architectural erosion, and legacy code modernization.

### Design (`shared/design/`)

- [`ui-ux-principles.md`](design/ui-ux-principles.md) — UI/UX design heuristics, accessibility baselines, and visual polish rules.
- [`html-css-principles.md`](design/html-css-principles.md) — Semantic HTML structure, responsive layouts, and CSS/Tailwind standards.
- [`design-tokens.md`](design/design-tokens.md) — Semantic token naming, spacing and type steps, motion easing assignments, icon tiers, and the component state matrix.

### Writing (`shared/writing/`)

- [`writing-rules.md`](writing/writing-rules.md) — Anti-AI prose constraints, banned marketing buzzwords, and concise documentation style.
