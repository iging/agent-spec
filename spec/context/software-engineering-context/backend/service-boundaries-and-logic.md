# Service Boundaries and Logic Specification

## Role / Authority

- **Role:** Definition of backend service domain boundaries, business logic partitioning, service interfaces, and transactional scope.
- **Authority:** Primary reference context for backend domain service boundaries.
- **Must not define:** Physical database schema tables or client CSS rules.

---

## 1. Domain Service Boundaries

- **Domain Partitioning:** `[PLACEHOLDER: DOMAIN_PARTITIONING_STRATEGY]` (e.g., Bounded Contexts per Domain-Driven Design)
- **Service Inventory:** `[PLACEHOLDER: SERVICE_INVENTORY_LIST]`
- **Standard Reference:** Eric Evans Domain-Driven Design Bounded Contexts ([domainlanguage.com](https://www.domainlanguage.com))

---

## 2. Business Logic & Isolation Rules

- **Clean Architecture Boundaries:** Domain models isolated from external frameworks, database ORMs, and web handlers.
- **Transactional Units:** Database transactions scoped within domain service operations. See [`database/data-lifecycle-and-integrity.md`](../database/data-lifecycle-and-integrity.md).
