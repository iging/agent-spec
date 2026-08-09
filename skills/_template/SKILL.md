---
name: your-skill-name
description: >-
  [One concrete active-verb sentence defining the skill action.] Execute this
  skill whenever the user triggers [TRIGGER 1], [TRIGGER 2], or [TRIGGER 3].
  Do NOT execute for [EXCLUSION 1] or [EXCLUSION 2].
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# [Skill Name]

## 0. Identity

- **Role:** [Defines the skill's responsibility and scope in one sentence.]
- **Authority:** [Normative tier level and ownership boundaries.]
- **Must not define:** [Clear boundaries of what this skill does NOT own.]
- **Normative base:** [List the governing files, e.g. `core/decision-framework.md`, `shared/coding-principles.md`, `context/RULES.md`. May be empty if the skill is fully self-contained.]
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | [The concrete action — one sentence.] |
| 2 | Target Tool | [Which agents/runtimes this runs in: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or any.] |
| 3 | Output Format | [Exact shape of the deliverable — path, file name, structure.] |
| 4 | Constraints | [Hard rules: what may/may not be touched, stack locks, budget caps.] |
| 5 | Input | [Specific inputs the skill consumes — files, user replies, environment.] |
| 6 | Context | [The situation the skill exists for; the failure mode it prevents.] |
| 7 | Audience | [Who consumes the output — user, agent, downstream pipeline.] |
| 8 | Success Criteria | [Deterministic, verifiable "done" conditions.] |
| 9 | Examples | [Reference to the Examples section below.] |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| [Trigger 1] | YES | [What fires the skill.] |
| [Trigger 2] | YES | [What fires the skill.] |
| [Trigger 3] | NO | [Explicit exclusion — never fire.] |

## 3. Execution Workflow

Numbered, deterministic steps. Every step has an **Action**, **Input**, **Stop Condition**, and **Validation**.

### Step 1: [Step Name]

- **Action:** [What to do, stated as a strict command.]
- **Input:** [What the step reads.]
- **Stop Condition:** [When to halt and ask the user instead of proceeding.]
- **Validation:** [How to confirm the step succeeded before moving on.]

### Step 2: [Step Name]

- **Action:**
- **Input:**
- **Stop Condition:**
- **Validation:**

### Step 3: [Step Name]

- **Action:**
- **Input:**
- **Stop Condition:**
- **Validation:**

## 4. Output Specification

[Exact markdown template in a fenced block. Delete this section if output format is not fixed.]

## 5. Validation Gate

Run before declaring completion. All items must pass:

- [ ] [Validation check 1]
- [ ] [Validation check 2]
- [ ] [Validation check 3]

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** [Scenario where failing to execute causes harm.]
- **Over-execution threshold:** [Scenario where executing causes harm.]
- **Calibration default:** Err toward [execution / non-execution].

## 7. Anti-Pattern Compliance

This section maps every step to the anti-patterns it prevents.

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| [Step 1] | AP-[#] | [How the step structurally prevents the pattern.] |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` — Initial enterprise elevation per `docs/skill-standard.md`.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | [Environment-specific notes, e.g. tool permissions.] |
| Cursor | verified | |
| Copilot | verified | |
| Windsurf | verified | |
| Kiro | verified | |
| Cline | verified | |
| Raw API (no tooling) | verified | [Any model-agnostic caveats.] |

## 10. Examples

**Input:** [Concrete scenario.]

**Output:** [Expected deliverable.]

**Failure case:** [Scenario where the skill must refuse or escalate.]