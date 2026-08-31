# Agent Context Templates Index

## Role / Authority

- **Role:** Central index catalog for project context specification templates.
- **Authority:** Tier-4 normative guidance for project adopters implementing `agent-spec`.
- **Must not define:** Runtime tool logic or IDE-specific adapter configurations.

---

## 1. Overview

The `context/` directory provides project-specific configuration templates to be completed by adopters when integrating `agent-spec` into a target repository. All templates contain `[PLACEHOLDER: ...]` markers designed to be populated with project details while maintaining strict architectural boundaries.

## 2. Template Catalog

| Template                             | Role & Description                                                                       | Primary Use Case                                              |
| :----------------------------------- | :--------------------------------------------------------------------------------------- | :------------------------------------------------------------ |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | High-level system architecture, component topology, and data flow patterns.              | System design alignment, component boundary checks.           |
| [`DESIGN.md`](DESIGN.md)             | UI/UX visual standards, design token hierarchies, and component styling rules.           | Frontend implementation, design system enforcement.           |
| [`PRD.md`](PRD.md)                   | Product Requirements Document defining business goals, user personas, and feature specs. | Scope verification, requirement traceability.                 |
| [`RULES.md`](RULES.md)               | Project-specific engineering invariants, strict constraints, and non-negotiables.        | Governance, safety gating, compliance verification.           |
| [`SCHEMA.md`](SCHEMA.md)             | Data model specifications, database entities, and API contract definitions.              | Migration drafting, API endpoint generation, data validation. |
| [`TASKS.md`](TASKS.md)               | Task decomposition tracking and work item state management.                              | Autonomous execution planning, work breakdown structures.     |

## 3. Sub-Directories

- [`engineering-loop-sample/`](engineering-loop-sample/) — Sample configuration demonstrating end-to-end autonomous engineering loop context binding.
- [`software-engineering-context/`](software-engineering-context/) — Reusable 23-domain enterprise software engineering context taxonomy catalog for persistent system knowledge.
