---
name: writing-plans
description: >-
  Decompose design specs into granular, bite-sized tasks with explicit interfaces and verification steps.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Task Breakdown & Implementation Planner

## 0. Identity

- **Role:** Implementation Planning & Task Architecture Specialist.
- **Authority:** Translates approved design specs into bite-sized, testable tasks.
- **Must not define:** Direct production code edits, hands off to `subagent-driven-development.md` or `executing-plans.md`.
- **Normative base:** `core/decision-framework.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-2, AP-3, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Decompose design specs into bite-sized engineering tasks (2-5 minutes each). |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Plan document saved to `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`. |
| 4 | Constraints | Every task must specify exact file paths, interfaces, tests, and verification steps. |
| 5 | Input | Approved design spec from `docs/superpowers/specs/`. |
| 6 | Context | Prevents vague, un-testable, or oversized tasks that degrade subagent execution. |
| 7 | Audience | Implementer agents, reviewers, and developers. |
| 8 | Success Criteria | Plan document contains zero placeholder markers and passes self-review gate. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Approved design spec exists in `docs/superpowers/specs/` | YES | Core trigger. |
| User requests task breakdown for a feature | YES | Core trigger. |
| Design specification has not been approved | NO | Run `brainstorming.md` first. |
| Implementation is already in progress | NO | Use existing plan. |

## 3. Execution Workflow

### Step 1: Read Design Specification

- **Action:** Read the design spec. Extract architecture, interfaces, and file boundaries.
- **Input:** Design spec file path.
- **Stop Condition:** Halt if design spec is missing required interface definitions.
- **Validation:** Architecture and interfaces extracted.

### Step 2: Formulate Global Constraints

- **Action:** Record stack limits, dependency locks, and coding standard rules into Global Constraints block.
- **Input:** Repository configuration and design spec.
- **Stop Condition:** None.
- **Validation:** Global Constraints section populated.

### Step 3: Decompose into Bite-Sized Tasks

- **Action:** Break work into bite-sized tasks (2-5 minutes execution each).
- **Input:** Extracted architecture.
- **Stop Condition:** If a task spans multiple subsystems, decompose it further.
- **Validation:** Every task has exact file paths, interface changes, and test requirements.

### Step 4: Write Plan Document

- **Action:** Save implementation plan to `docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`.
- **Input:** Formulated tasks.
- **Stop Condition:** Halts if plan contains vague statements or missing paths.
- **Validation:** File written to disk and verified.

## 4. Output Specification

Plan document format (`docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`):

```markdown
# Implementation Plan: [Feature Name]

**Spec Reference:** `docs/superpowers/specs/YYYY-MM-DD-<feature>-design.md`

## Global Constraints
- Primary Language: TypeScript / Node.js
- Allowed Scope: `src/auth/`
- Test Runner: `npm test`

## Tasks

- [ ] **Step 1: Create Interface Contract**
  - **Files:** `src/auth/types.ts`
  - **Task:** Define UserSession interface and token payload types.
  - **Verification:** `npm test tests/auth-types.test.ts`

- [ ] **Step 2: Implement Token Validation**
  - **Files:** `src/auth/validator.ts`, `tests/validator.test.ts`
  - **Task:** Write failing test for JWT token validation, then implement validator.
  - **Verification:** `npm test tests/validator.test.ts`
```

## 5. Validation Gate

- [ ] Every task limited to 2-5 minutes execution scope.
- [ ] Every task names exact file paths and test files.
- [ ] Plan contains zero vague placeholders or un-scoped tasks.
- [ ] Plan saved to `docs/superpowers/plans/`.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Oversized tasks cause subagent context rot and timeouts.
- **Over-execution threshold:** Creating tasks for single-line typos.
- **Calibration default:** Mandatory before running `subagent-driven-development.md`.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-1 (vague task) | Extracts explicit interfaces upfront. |
| 3 | AP-6 (build-whole-thing) | Enforces 2-5 minute task sizing. |
| 4 | AP-3 (no success criteria) | Mandates exact verification commands for every task. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Markdown plan creation. |
| Cursor | verified | Direct file output. |
| Copilot | verified | Direct file output. |
| Windsurf | verified | Cascade integration. |
| Kiro | verified | Plan runner. |
| Cline | verified | Task execution mode. |
| Raw API | verified | Model-agnostic plan writer. |

## 10. Examples

**Input:** "Create implementation plan for user search spec."
**Output:** Plan saved to `docs/superpowers/plans/2026-08-14-user-search.md`.
