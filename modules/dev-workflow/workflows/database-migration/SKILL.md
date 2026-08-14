---
name: database-migration
description: >-
  Safely plans and executes database schema changes and migration scripts,
  enforcing zero-downtime and type-sync discipline. Execute this skill when the
  user needs to add a table, alter a column, change the data model, or sync
  dependent types. Do NOT execute for read-only queries, application business
  logic, or schema design from scratch (use define-foundation).
version: 2.0.0
verified-on: [cline]
---

# Database Migration

## 0. Identity

- **Role:** Principal Database Administrator. Plans and executes schema changes while ensuring data integrity, zero-downtime deployments, and type safety across the stack.
- **Authority:** Owns schema change execution. Cannot modify production data without explicit, highlighted user approval for destructive operations.
- **Must not define:** The data model itself (see project `context/SCHEMA.md`); application business rules (see `context/RULES.md`); ORM configuration specifics (project may use Prisma, Drizzle, or Dexie local-first schema).
- **Normative base:** project `context/SCHEMA.md`; `context/ARCHITECTURE.md` data flow sections; `shared/engineering/nextjs-principles.md` and `shared/engineering/coding-principles.md` for type-sync discipline; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-44 (unlocked filesystem) — destructive commands are always approval-gated. No step may leave dependent types desynced (AP-29, no target state).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                                                                                                         |
| --- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Convert a schema-change request into a safe migration plan and execution, with dependent type sync.                                                                                                                           |
| 2   | Target Tool      | Any agent runtime reading markdown skills and executing CLI migration commands: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline.                                                                                          |
| 3   | Output Format    | Schema diff + migration commands per §4. Destructive operations are paused for approval before any command.                                                                                                                   |
| 4   | Constraints      | Never execute destructive commands without explicit, highlighted approval. Always check default values for new columns on populated tables. Never leave frontend types desynced. Default to multi-phase for breaking changes. |
| 5   | Input            | Schema-change request; current schema per `context/SCHEMA.md`; ORM/DB tooling in the project.                                                                                                                                 |
| 6   | Context          | Prevents data loss, downtime, and type-sync drift in production databases.                                                                                                                                                    |
| 7   | Audience         | The requesting developer and any agent that consumes the synced types afterward.                                                                                                                                              |
| 8   | Success Criteria | Migration generated; destructive ops approved; dependent types synced; schema diff matches `context/SCHEMA.md` contracts.                                                                                                     |
| 9   | Examples         | See §10.                                                                                                                                                                                                                      |

## 2. Trigger Matrix

| Trigger                                   | Fire? | Notes                                            |
| ----------------------------------------- | ----- | ------------------------------------------------ |
| "Add a column / table / index"            | YES   | Core trigger.                                    |
| "Change the data model / run a migration" | YES   | Core trigger.                                    |
| Alter, drop, or backfill data             | YES   | Trigger fires, but executes only after approval. |
| Read-only SQL query or report             | NO    | Not a migration.                                 |
| Application business logic                | NO    | Out of scope.                                    |
| Schema design from scratch                | NO    | Use `define-foundation`.                         |

## 3. Execution Workflow

### Step 1: Define Goal

- **Action:** Understand the business entity changing. Record the current schema state from `context/SCHEMA.md` and the ORM.
- **Input:** User request; `context/SCHEMA.md`.
- **Stop Condition:** If the change contradicts `context/SCHEMA.md`, stop and surface the contradiction before proceeding.
- **Validation:** Clear statement of the entity, field, index, or relation changing.

### Step 2: Draft Schema

- **Action:** Update the ORM schema (e.g., Prisma, Drizzle, or local-first Dexie schema) with the new fields, indices, and relations. Keep branded-ID and union-literal conventions per `shared/engineering/coding-principles.md`.
- **Input:** Current schema.
- **Stop Condition:** If the draft requires a decision not in the request (e.g., nullability, relation style), stop and ask the user.
- **Validation:** Draft schema parses; references existing models correctly.

### Step 3: Safety Analysis

- **Action:** Analyze if the change is breaking. If dropping columns or making nullable columns required, propose a multi-phase zero-downtime plan. Verify whether new columns on populated tables require default values.
- **Input:** Draft schema; production state knowledge.
- **Stop Condition:** If a destructive or breaking operation is required, STOP and present the multi-phase plan for approval before any execution.
- **Validation:** Every breaking change has a written multi-phase plan; every new column on a populated table has a default or is nullable.

### Step 4: Generate Migration

- **Action:** Generate the SQL migration or ORM commands that implement the approved draft.
- **Input:** Approved schema draft.
- **Stop Condition:** If the generated migration includes a destructive command not in the approved plan, stop and re-present.
- **Validation:** Migration file generated; matches the approved schema diff.

### Step 5: Sync Types

- **Action:** Update dependent frontend TypeScript types or Zod schemas so the stack never drifts. Verify branded IDs and union literals carry through.
- **Input:** Migration; frontend types.
- **Stop Condition:** If a dependent type cannot be located, stop and ask rather than guess.
- **Validation:** Grep confirms no stale types reference the old schema shape.

## 4. Output Specification

```markdown
## Schema Changes

[Schema diff]

## Migration Commands

[Generated commands or ORM statements]

## Approval Status

- Destructive operations: [PENDING APPROVAL | APPROVED | NOT APPLICABLE]
- Multi-phase plan: [none | phases listed]
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Schema diff presented and matches the approved draft.
- [ ] Destructive operations carried the explicit, highlighted approval gate.
- [ ] New columns on populated tables have defaults or are nullable.
- [ ] Migration commands generated; no unapproved destructive command included.
- [ ] Dependent frontend types and Zod schemas synced; zero stale references.
- [ ] `context/SCHEMA.md` contracts respected (branded IDs, union literals).

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Adding a required column to a populated table without a default, or leaving frontend types desynced.
- **Over-execution threshold:** Running `prisma db push` (or equivalent) against a production database instead of generating a migration file.
- **Calibration default:** Default to multi-phase deployments for any breaking change.

## 7. Anti-Pattern Compliance

| Step                   | Prevents AP                 | Mechanism                                            |
| ---------------------- | --------------------------- | ---------------------------------------------------- |
| 3 (Safety analysis)    | AP-44 (unlocked filesystem) | Destructive ops paused for explicit approval.        |
| 3 (Safety analysis)    | AP-42 (no target state)     | Population + default-value check enforced.           |
| 4 (Generate migration) | AP-28 (no stop condition)   | Unapproved destructive commands halt the run.        |
| 5 (Sync types)         | AP-29 (no integration)      | Type sync is mandatory; stale references are a fail. |
| 2 (Draft schema)       | AP-41 (hallucinated API)    | Draft binds to ORM tooling actually in the project.  |
| All steps              | AP-26 (no scope boundary)   | Only schema-shape changes; business logic untouched. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-08) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime              | Status   | Notes                                             |
| -------------------- | -------- | ------------------------------------------------- |
| Claude Code          | untested |                                                   |
| Cursor               | untested |                                                   |
| Copilot              | untested |                                                   |
| Windsurf             | untested |                                                   |
| Kiro                 | untested |                                                   |
| Cline                | verified | Executed in current workspace.                    |
| Raw API (no tooling) | untested | CLI command execution required; raw API unlikely. |

## 10. Examples

**Input:** "Add a bio column to the User table."

**Output:** Schema diff updates the ORM schema with `bio` nullable or defaulted; migration commands generated per §4; dependent TypeScript/Zod types synced; approval status NOT APPLICABLE (non-destructive). No `prisma db push` against production.

**Failure case:** The user says "just drop the old column and run it". Refuse: the destructive operation requires the explicit highlighted approval gate; run the safety analysis and present the multi-phase plan first (AP-44, AP-28).
