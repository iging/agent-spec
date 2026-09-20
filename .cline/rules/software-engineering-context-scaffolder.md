---
name: software-engineering-context-scaffolder
description: >-
  Scaffolds, audits, and maintains the 23 Enterprise Software Engineering Context domains across greenfield and brownfield repositories. Execute this skill when initializing project context, auditing documentation drift, or provisioning governance templates in .agents/context/ or context/. Do NOT execute this skill to generate application code or modify core spec/ rules.
version: 2.0.0
verified-on: [cline]
---

# Software Engineering Context Scaffolder

## 0. Identity

- **Role:** Principal Software Engineering Workspace Architect. Provisions, audits, and synchronizes the 23 Enterprise Software Engineering Context domains across greenfield and brownfield codebases.
- **Authority:** Owns workspace context template provisioning, documentation drift auditing, and `.agents/context/` scaffolding workflows.
- **Must not define:** Core normative standards (`spec/core/`); application feature code; direct database migrations.
- **Normative base:** `spec/core/decision-framework.md`, `spec/shared/writing/writing-rules.md`, `spec/docs/anti-patterns.md`, `spec/docs/skill-standard.md`.
- **Anti-pattern gate:** Blocks AP-1 (vague task), AP-3 (no success criteria), AP-11 (forgotten context), AP-26 (no scope boundary), AP-44 (unlocked filesystem), and AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                         |
| --- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Audit repository context, discover stack indicators, scaffold required context domains, and verify zero drift.                |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                      |
| 3   | Output Format    | Structured Context Scaffolding Audit & Action Plan markdown document adhering to Section 4.                                   |
| 4   | Constraints      | Require explicit user confirmation before writing files. Preserve `[PLACEHOLDER: ...]` markers on unconfirmed facts.          |
| 5   | Input            | Target repository path, stack manifest files, existing documentation files, or scaffolding request.                           |
| 6   | Context          | Prevents AI context drift, ungrounded code generation, and missing domain governance across 23 enterprise areas.              |
| 7   | Audience         | Software architects, engineering leads, autonomous developer agents, and codebase maintainers.                                |
| 8   | Success Criteria | Stack discovered, context gap report generated, requested context domain templates scaffolded cleanly, human review recorded. |
| 9   | Examples         | See Section 10.                                                                                                               |

## 2. Trigger Matrix

| Trigger                                                                    | Fire? | Notes                                      |
| -------------------------------------------------------------------------- | ----- | ------------------------------------------ |
| "Scaffold context files / setup engineering context / bootstrap workspace" | YES   | Core trigger.                              |
| "Audit context drift / check documentation completeness across 23 domains" | YES   | Core trigger.                              |
| "Adapt agent-spec governance to this repository"                           | YES   | Core trigger.                              |
| "Write implementation code for authentication"                             | NO    | Feature implementation task; out of scope. |
| "Modify spec/core/ rules"                                                  | NO    | Core standard is immutable; out of scope.  |

## 3. Execution Workflow

### Step 1: Codebase Audit & Stack Discovery

- **Action:** Inspect repository manifests (`package.json`, `Cargo.toml`, `pyproject.toml`, `go.mod`), directory structure, and existing context files. Classify current health of all 23 domains per `references/context-domains.md`.
- **Input:** Target repository path and manifest files.
- **Stop Condition:** Stop and ask user if repository root cannot be determined.
- **Validation:** 23 domains classified into HEALTHY, DRIFTED, or MISSING states.

### Step 2: Gap Analysis & Blueprint Proposal

- **Action:** Synthesize findings into a Context Blueprint report. Highlight missing core domains (1-7) versus extended engineering domains (8-23). Present action plan to user.
- **Input:** Step 1 domain inventory.
- **Stop Condition:** Halt and wait for user confirmation before creating or modifying any context files.
- **Validation:** Explicit human review approval recorded.

### Step 3: Template Provisioning & Pre-filling

- **Action:** Scaffold confirmed domain templates into `.agents/context/` or `context/`. Pre-fill confirmed codebase facts while strictly preserving `[PLACEHOLDER: ...]` markers for unconfirmed details.
- **Input:** Approved blueprint and stack indicators.
- **Stop Condition:** If writing a file would overwrite existing non-placeholder user content without confirmation, stop and request permission.
- **Validation:** Files created; all unconfirmed facts retain `[PLACEHOLDER]` format.

### Step 4: Verification & Audit Compliance

- **Action:** Run repository audit script (`node scripts/audit-compliance.js` where applicable) to confirm zero syntax or structural errors. Check that no em dashes or banned fluff words exist in scaffolded markdown.
- **Input:** Provisioned context files.
- **Stop Condition:** Stop if compliance audit reports structural errors.
- **Validation:** Zero compliance script errors; writing rules satisfied.

### Step 5: Handoff & Maintenance Plan

- **Action:** Present the completion summary detailing created files, remaining placeholders to populate, and recommended next steps for feature planning.
- **Input:** Verified workspace state.
- **Stop Condition:** Present summary block and halt.
- **Validation:** Output matches Section 4 specification.

## 4. Output Specification

Produce the summary block using the exact structure below:

```markdown
# Context Scaffolding Audit & Plan

- **Target Project:** [Project Name / Path]
- **Discovered Stack:** [Languages, Frameworks, DBs]
- **Audited Domains:** 23 Total ([N] Healthy, [N] Drifted, [N] Missing)

## Provisioned Context Templates

- `.agents/context/PRD.md`: [Status & summary]
- `.agents/context/ARCHITECTURE.md`: [Status & summary]
- `.agents/context/SCHEMA.md`: [Status & summary]
- `.agents/context/RULES.md`: [Status & summary]

## Remaining Placeholders

- [Domain File]: [List of placeholders needing human input]

## Next Steps

1. Fill remaining `[PLACEHOLDER]` fields in `.agents/context/`.
2. Run feature planning via `blueprint-session` or `plan-feature`.
```

## 5. Validation Gate

- [ ] All 23 software engineering context domains audited and categorized.
- [ ] Explicit user confirmation received before writing files.
- [ ] Provisioned templates preserve `[PLACEHOLDER: ...]` markers on unconfirmed facts.
- [ ] No em dashes or banned words used in scaffolded content.
- [ ] Compliance audit verified cleanly.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Do NOT attempt to write application feature code or run database migrations inside this skill.
- **Under-execution:** Do NOT write context files without checking actual repository manifests first.
- **Calibration:** Always default to asking confirmation before modifying existing context files.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                 | Mechanism                                                         |
| ---- | --------------------------- | ----------------------------------------------------------------- |
| 1    | AP-1 (vague task)           | Audits codebase state to establish facts before action.           |
| 2    | AP-45 (no human review)     | Halts for explicit user approval before provisioning files.       |
| 3    | AP-44 (unlocked filesystem) | Gates file creation/overwrites on user permission.                |
| 3    | AP-42 (no target state)     | Preserves `[PLACEHOLDER]` markers instead of inventing fake data. |
| 4    | AP-3 (no success criteria)  | Validates scaffolded files against repository compliance scripts. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-31) — Initial Tier-5 enterprise skill release for `software-engineering-context-scaffolder` supporting 23 context domains.

## 9. Portability Matrix

| Runtime     | Status   | Notes                                  |
| ----------- | -------- | -------------------------------------- |
| Claude Code | verified | Full interactive context scaffolding.  |
| Cursor      | verified | System prompt & rule execution.        |
| Copilot     | verified | Interactive workspace context builder. |
| Windsurf    | verified | Cascade flow integration.              |
| Kiro        | verified | Steering model execution.              |
| Cline       | verified | Task step-by-step scaffolding flow.    |
| Raw API     | verified | Model-agnostic context domain engine.  |

## 10. Examples

**Input:** "Audit and scaffold engineering context for our Next.js + TypeScript repo."

**Output:**

```markdown
# Context Scaffolding Audit & Plan

- **Target Project:** my-nextjs-app
- **Discovered Stack:** TypeScript, Next.js 15, React 19, Tailwind CSS, Prisma
- **Audited Domains:** 23 Total (2 Healthy, 1 Drifted, 20 Missing)

## Provisioned Context Templates

- `.agents/context/PRD.md`: Created with MVP vs V2 structure
- `.agents/context/ARCHITECTURE.md`: Created with pre-filled Next.js App Router data flow
- `.agents/context/SCHEMA.md`: Created with Prisma entity placeholders
- `.agents/context/RULES.md`: Created with non-negotiable security boundaries

## Remaining Placeholders

- `.agents/context/PRD.md`: [PLACEHOLDER: Core Problem Statement]
- `.agents/context/SCHEMA.md`: [PLACEHOLDER: Database Connection String & Models]

## Next Steps

1. Fill remaining `[PLACEHOLDER]` fields in `.agents/context/`.
2. Run feature planning via `blueprint-session` or `plan-feature`.
```
