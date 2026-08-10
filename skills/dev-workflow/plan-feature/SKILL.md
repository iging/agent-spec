---
name: plan-feature
description: >-
  Focused task planning for a single feature or bug. Executes a Narrow to Broad
  research pattern to build a localized implementation plan without scanning
  the entire codebase. Execute this skill when the user requests a plan for a
  single feature, bug fix, or refactor, or asks "how would you approach" a
  localized change. Do NOT execute for bulk backlog generation, massive system
  architecture (use prd-generator), or writing the implementation itself.
version: 2.0.0
verified-on: [cline]
---

# Plan Feature

## 0. Identity

- **Role:** Principal Technical Project Manager. Investigates a single, narrow feature request, identifies immediate dependencies, and outputs a localized, actionable task proposal using the Narrow to Broad research pattern.
- **Authority:** Owns the planning workflow only. Stops at the plan; never writes implementation code.
- **Must not define:** Product requirements at scale (see `prd-generator`); full project foundation (see `define-foundation`); implementation details beyond the plan.
- **Normative base:** target project's `context/PRD.md` if the feature traces to a story; `shared/*-principles.md` relevant to the domain; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task verb), AP-26 (no scope boundary), or AP-42 (no target state). The plan always declares in-scope and out-of-scope boundaries before handoff.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Produce a localized implementation plan for one feature, bug, or refactor without global codebase scanning. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Proposed Task template per §4 with type, why, includes, and excludes. |
| 4 | Constraints | Strict Narrow→Broad pattern. Never scan the global architecture. Never write or modify code. Stop at the plan. |
| 5 | Input | User's feature/bug request; the target file or focus point; `.agents/` workspace rules. |
| 6 | Context | Prevents context dumps and wasted tokens from whole-repo scans on single-feature work. |
| 7 | Audience | The requesting user (approval) and the implementation agent that executes the approved plan. |
| 8 | Success Criteria | Localized plan produced with explicit scope boundaries; zero files modified; plan approved before execution. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Plan this feature / bug fix / refactor" | YES | Core trigger. |
| "How would you approach [localized change]?" | YES | Core trigger. |
| Single-file or single-component work | YES | Core trigger. |
| Bulk backlog generation | NO | Use `prd-generator`. |
| Massive system architecture / greenfield | NO | Use `prd-generator`. |
| "Implement it now" | NO | Plan then execute separately; stop at the plan first. |

## 3. Execution Workflow

### Step 1: Identify Area

- **Action:** Determine the target domain (Frontend, Backend, Tests, or Global Components) from the user's prompt.
- **Input:** User prompt.
- **Stop Condition:** If the domain cannot be inferred, stop and ask which domain the change targets.
- **Validation:** Domain recorded before any file access.

### Step 2: Narrow Context Load

- **Action:** Read the target file the user provided. Read only the direct dependencies (imports, props) of that file. Read only the workspace rules relevant to that domain from the `.agents/` configuration. Do not scan unrelated directories.
- **Input:** Target file; direct dependencies; domain rules.
- **Stop Condition:** If a direct dependency cannot be located, stop and ask rather than widening the scan.
- **Validation:** Files read are limited to the target plus its direct dependencies; no global architecture scan executed.

### Step 3: Synthesize Boundaries

- **Action:** Define exactly what is in scope for the requested change and what is out of scope. Write the Includes and Excludes lists.
- **Input:** Narrow context.
- **Stop Condition:** If the include/exclude boundary is ambiguous, stop and resolve it with the user.
- **Validation:** Every adjacent file not touched is named in Excludes; every file to change is in Includes.

### Step 4: Handoff

- **Action:** Present the Proposed Task for approval. Do not begin writing implementation code or modifying files.
- **Input:** Synthesized plan.
- **Stop Condition:** If the user requests changes, revise the plan and re-present. If the user requests implementation, mark the plan approved and end the skill's execution.
- **Validation:** Plan rendered per §4; zero files modified.

## 4. Output Specification

```markdown
**Proposed Task:** [Clear title]
**Type:** FEATURE / BUG / REFACTOR
**Why:** [1-2 sentences of technical justification]
**Scope:**

- **Includes:** [Specific files/logic to be modified]
- **Excludes:** [Adjacent files/logic to remain untouched]
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Domain identified before file access.
- [ ] Only the target file and its direct dependencies were read.
- [ ] Global architecture scan did not occur.
- [ ] Includes and Excludes lists are explicit.
- [ ] Zero files modified; no implementation code written.
- [ ] Plan rendered using the §4 template.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Scanning the whole repository instead of the narrow focus point, or failing to declare Excludes.
- **Over-execution threshold:** Writing code, modifying files, executing builds, or broadening into full-system architecture planning.
- **Calibration default:** Err toward a tighter focus. When uncertain about scope, ask instead of expanding the search.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Identify) | AP-1 (vague task verb) | Domain forced before any file access. |
| 2 (Narrow load) | AP-16, AP-31 (context dump) | Reads capped at target + direct dependencies. |
| 3 (Boundaries) | AP-26 (no scope boundary) | Includes/Excludes mandatory. |
| 3 (Boundaries) | AP-42 (no target state) | Scope declaration defines the change precisely. |
| 4 (Handoff) | AP-45 (no human review trigger) | Plan approval gate before any execution. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-08) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | untested | |
| Cursor | untested | |
| Copilot | untested | |
| Windsurf | untested | |
| Kiro | untested | |
| Cline | verified | Executed in current workspace. |
| Raw API (no tooling) | untested | |

## 10. Examples

**Input:** "I want to fix the column width in the SpreadsheetTable component."

**Output:** The agent reads ONLY `SpreadsheetTable.tsx` and its direct CSS/props. It does not scan the entire frontend. It outputs the Proposed Task template bounding the scope strictly to the table's width constraints.

**Failure case:** The user says "also check every other table component and refactor them all". Refuse: that violates the single-feature scope of the skill (AP-2) and the Narrow→Broad rule. Route the wider ask to `prd-generator`.