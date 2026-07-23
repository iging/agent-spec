# AGENTS.md — Web Application Standard (`apps/web/`)

- **Version:** 2.0.0
- **Status:** Active
- **Scope:** All AI coding agents operating on `apps/web/`
- **Precedence:** Tier-2 (Directory-scoped). Overrides root standard for web-specific context; defers to live user instructions.

---

## 1. Purpose

This document defines directory-scoped entry points, mandatory instruction discovery protocols, and build/test contracts for AI coding agents working within `apps/web/`. It acts as a lightweight router to authoritative context files rather than duplicating project standards.

## 2. Agent Identity & Scope

When working in `apps/web/`, the agent MUST:

- Act as an evidence-based Senior Web Software Engineer.
- Perform mandatory discovery on all mapped context files in Section 3 before generating code or refactoring.
- Never duplicate or inline rules from context files into this router document.

## 3. Mandatory Pre-Action Discovery Protocol & Context Routing

Before executing non-trivial code generation, refactoring, or architectural review in `apps/web/`, the agent **MUST read all mapped context files below**. The agent is **prohibited from assuming generic framework defaults** until all local sources of truth have been loaded and inspected.

| Target File                                                      | Authoritative Scope                                                                                                                                                                                                | Mandatory Discovery Check                                      |
| :--------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| [`context/RULES.md`](context/RULES.md)                           | **Coding & Architecture Standards:** Language/TypeScript rules, naming conventions, SOLID principles, function design, state management, validation strategies, error boundaries, security, and testing placement. | MUST read before writing/editing TypeScript or React code.     |
| [`context/DESIGN.md`](context/DESIGN.md)                         | **UI, UX & Design System:** Visual identity, design tokens, color palette, typography scale, spacing/grid, elevation/shadows, accessibility (WCAG 2.2 AA), and component state matrix.                             | MUST read before creating or styling components.               |
| [`../../context/ARCHITECTURE.md`](../../context/ARCHITECTURE.md) | **System Architecture:** Monorepo package boundaries, shared module interactions, and directory structures.                                                                                                        | MUST read before adding dependencies or cross-package imports. |
| [`../../context/SCHEMA.md`](../../context/SCHEMA.md)             | **Data Models:** Global data schemas, database entities, and shared TypeScript types.                                                                                                                              | MUST read before modifying data contracts or API types.        |
| [`../../context/PRD.md`](../../context/PRD.md)                   | **Product Requirements:** Business goals, feature specifications, and acceptance criteria.                                                                                                                         | MUST read before implementing new user-facing features.        |

## 4. Pre-Response Filter & Quality Assurance

Before returning a response, the agent MUST filter proposed changes against:

1. **Architectural Integrity:** Verify no hidden coupling, state-management flaws, or security vulnerabilities (per `RULES.md`).
2. **Design System Conformance:** Verify all UI elements consume design tokens and semantic HTML (per `DESIGN.md`).
3. **No Unverified Assumptions:** Label unverified claims as assumptions and state how to verify them (per root [`AGENTS.md`](../../AGENTS.md) §15).

## 5. Build, Test & Verification Commands

When shell capabilities are available (per root [`AGENTS.md`](../../AGENTS.md) §4), use the following commands for validation:

```bash
# [Fill exact project scripts upon project setup]
# npm run dev          # Start local web development server
# npm run build        # Production web build validation
# npm run test         # Run web unit & component test suite
# npm run lint         # Run web linter & formatting check
```

## 6. Source of Truth & Precedence

1. **Explicit user instructions** in the current task session.
2. **Path-scoped rules** in `apps/web/context/RULES.md` and `apps/web/context/DESIGN.md`.
3. **Root project specs** in `context/ARCHITECTURE.md`, `context/SCHEMA.md`, `context/PRD.md`.
4. **Root generic standard** in repo root [`AGENTS.md`](../../AGENTS.md).
