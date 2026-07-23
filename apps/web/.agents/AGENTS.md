# AGENTS.md — Web Application Standard (`apps/web/`)

- **Version:** 2.0.1
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

Before executing non-trivial code generation, refactoring, or architectural review in `apps/web/`, the agent **MUST** follow this discovery sequence:
1. Identify the target domain of the user's request (e.g., UI component, state logic, API integration).
2. Locate the corresponding authoritative context files from the table below.
3. Read the actual contents of those files using file-read tools. **Do not assume generic framework defaults.**

| Target File                                                      | Authoritative Scope                                                                                                                                                                                                | Mandatory Discovery Check                                      |
| :--------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| [`context/RULES.md`](context/RULES.md)                           | **Coding & Architecture Standards:** Shared rules, web DOM defaults, state management, validation boundaries, error boundaries, web security, and testing.                                                         | MUST read before writing/editing TypeScript or React code.     |
| [`context/DESIGN.md`](context/DESIGN.md)                         | **UI, UX & Design System:** Visual identity, design tokens, color palette, typography scale, spacing/grid, elevation/shadows, accessibility (WCAG 2.2 AA), and component state matrix.                             | MUST read before creating or styling components.               |
| [`../../context/ARCHITECTURE.md`](../../../context/ARCHITECTURE.md) | **System Architecture:** Monorepo package boundaries, shared module interactions, and directory structures.                                                                                                        | MUST read before adding dependencies or cross-package imports. |
| [`../../context/SCHEMA.md`](../../../context/SCHEMA.md)             | **Data Models:** Global data schemas, database entities, and shared TypeScript types.                                                                                                                              | MUST read before modifying data contracts or API types.        |
| [`../../context/PRD.md`](../../../context/PRD.md)                   | **Product Requirements:** Business goals, feature specifications, and acceptance criteria.                                                                                                                         | MUST read before implementing new user-facing features.        |

### Edge-Case Handling (Missing or Placeholder Context)
- **File Not Found:** If a referenced context file does not exist, assume the project has not initialized that domain yet. Proceed using root `AGENTS.md` and industry best practices. Do NOT invent the context file.
- **Placeholder Values:** If a context file contains placeholder values (e.g., `[fill hex/HSL when project starts]`), explicitly ask the user for those values before committing to code generation.

## 4. Pre-Response Filter & Quality Assurance

Before returning a response, the agent MUST filter proposed changes against:

1. **Architectural Integrity:** Verify no hidden coupling, state-management flaws, or security vulnerabilities (per `RULES.md`).
2. **Design System Conformance:** Verify all UI elements consume design tokens and semantic HTML (per `DESIGN.md`).
3. **No Unverified Assumptions:** Label unverified claims as assumptions and state how to verify them (per root [`AGENTS.md`](../../../AGENTS.md) §9).

## 5. Build, Test & Verification Commands

When shell capabilities are available (per root [`AGENTS.md`](../../../AGENTS.md) §4), use the following commands for validation.
*Note: If commands below are commented out, the project has not been set up yet. Do not fabricate build commands.*

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
3. **Root project specs** in `../../../context/ARCHITECTURE.md`, `../../../context/SCHEMA.md`, `../../../context/PRD.md`.
4. **Root generic standard** in repo root [`AGENTS.md`](../../../AGENTS.md).
