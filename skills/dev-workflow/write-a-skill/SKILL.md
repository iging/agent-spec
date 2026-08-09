---
name: write-a-skill
description: >-
  Convert a plain-language description of desired behavior into a Tier-5
  enterprise SKILL.md following skills/_template/SKILL.md and
  docs/skill-standard.md. Execute this skill whenever the user says "make a
  skill", "write a skill", "turn this into a skill", or requests a globally
  persistent behavior constraint. Do NOT execute for one-off task
  instructions, MCP server development, or elevating an existing skill (use
  spec-reviewer).
version: 2.0.0
verified-on: [cline]
---

# Write a Skill

## 0. Identity

- **Role:** Authoring binder. Converts user intent into a Tier-5 `SKILL.md` structure that conforms to the Enterprise Skill Standard.
- **Authority:** Owns the authoring workflow only. Cannot alter the standard itself (`docs/skill-standard.md`).
- **Must not define:** The standard (see `docs/skill-standard.md`), elevation rewriting (`spec-reviewer`), or audit validation (`prompt-auditor`).
- **Normative base:** `skills/_template/SKILL.md`; `docs/skill-standard.md`; `docs/anti-patterns.md`; `prompts/dev-workflow/agent-config-generator.md` §2.
- **Anti-pattern gate:** No authored skill may encode AP-1–AP-56. Authoring never produces a skill lacking a Validation Gate or Output Specification (AP-3, AP-45).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Generate a Tier-5 `SKILL.md` from plain-language intent, plus `references/` if the domain is complex. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | `SKILL.md` conforming to `skills/_template/SKILL.md` (10 sections), optional `references/*.md`. |
| 4 | Constraints | Max 3 clarifying questions. Description under 1024 chars using `description: >-`. Body under ~200 lines (references absorb the rest). Imperative voice. No em dashes. |
| 5 | Input | Plain-language user description; normative base files. |
| 6 | Context | Prevents ad-hoc, non-production skills from entering the pool. |
| 7 | Audience | The requesting user and any downstream agent that loads the skill. |
| 8 | Success Criteria | Skill passes all 10 requirements of `docs/skill-standard.md` §2; every `[PLACEHOLDER]` resolved; frontmatter valid. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Make / write / turn this into a skill" | YES | Core trigger. |
| "I want a persistent behavior constraint" | YES | Core trigger. |
| "Elevate / enterprise-grade an existing skill" | NO | Route to `spec-reviewer`. |
| MCP server development | NO | Different tooling domain. |
| One-off task instruction | NO | Not reusable; do not author a skill. |

## 3. Execution Workflow

### Step 1: Intent Extraction

- **Action:** Extract the 5 intent dimensions: Target Task, Execution Trigger, Anti-Triggers, Output Specification, Execution Determinism. Ask a maximum of 3 clarifying questions if any critical dimension is undefined.
- **Input:** User request.
- **Stop Condition:** If intent remains ambiguous after 3 questions, stop and present the partial sketch for direction.
- **Validation:** All 5 dimensions recorded in the session as the skill contract.

### Step 2: YAML Frontmatter Generation

- **Action:** Generate the frontmatter block: `name` (lowercase, hyphens, ≤64 chars, matches folder name); `description: >-` (block scalar, ≤1024 chars, active-verb action sentence + triggers + exclusions with "Do NOT execute for..."); `version: 1.0.0`; `verified-on:` defaulting to the executing runtime.
- **Input:** Extracted contract from Step 1.
- **Stop Condition:** None.
- **Validation:** Frontmatter YAML parses; description obeys block-scalar format and length cap.

### Step 3: Body Generation (10-Section Template)

- **Action:** Fill `skills/_template/SKILL.md` sections 0–10 in order. Preserve placeholders only where the user has not supplied data. Map every workflow step to Action/Input/Stop Condition/Validation. Complete the Anti-Pattern Compliance table by mapping each step to the APs it prevents.
- **Input:** `skills/_template/SKILL.md`; the contract.
- **Stop Condition:** If a workflow step cannot be made deterministic, stop and ask the user for the missing policy.
- **Validation:** All 10 sections present; each step has all four fields; §7 table filled.

### Step 4: Reference Extraction

- **Action:** If the draft exceeds ~220 lines, move heavy material (schemata, tables, checklists) into `references/[semantic-name].md`. Keep `SKILL.md` under ~200 lines.
- **Input:** Draft body.
- **Stop Condition:** If the domain is simple, omit this step.
- **Validation:** `SKILL.md` under ~200 lines; every reference path resolves.

### Step 5: Self-Audit and Handoff

- **Action:** Run the authoring Validation Gate below. On pass, present the skill summary to the user. Optionally route to `prompt-auditor` for independent audit.
- **Input:** Complete draft.
- **Stop Condition:** If any validation item fails, fix the draft before presenting.
- **Validation:** All §5 checks pass; user sees a summary, not the full file dump.

## 4. Output Specification

```markdown
# New Skill Summary

- **Skill name:** [kebab-case folder name]
- **Trigger:** [1 sentence]
- **Exclusion:** [1 sentence]
- **Output:** [1 sentence]
- **Normative base:** [referenced files]
- **Tier:** 5 (Enterprise) — self-audited against docs/skill-standard.md §2
```

The authored `SKILL.md` conforms to `skills/_template/SKILL.md`.

## 5. Validation Gate

Run before declaring completion:

- [ ] All 10 template sections present, zero unreplaced `[PLACEHOLDER: ...]` in user-facing content.
- [ ] Frontmatter: `name` matches folder; `description: >-` block scalar ≤1024 chars; version present.
- [ ] Each workflow step has Action, Input, Stop Condition, Validation.
- [ ] Anti-Pattern Compliance table complete with AP numbers.
- [ ] No banned words or em dashes per `shared/writing-rules.md`.
- [ ] `SKILL.md` under ~200 lines; references resolve.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Generating a skill without a Validation Gate or Anti-Pattern Compliance map.
- **Over-execution threshold:** Authoring a skill for a one-off task, or creating `references/` for a trivial domain.
- **Calibration default:** Err toward producing a complete Tier-5 skill or refusing to author at all.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Intent extraction) | AP-1, AP-2 (vague task / two tasks) | 5-dimension contract forces a single concrete task. |
| 2 (Frontmatter) | AP-24 (no clear trigger) | Trigger + exclusion sentences in description. |
| 3 (Body) | AP-3, AP-28 (no criteria / stop) | Validation Gate + per-step Stop Conditions. |
| 3 (Body) | AP-26 (no scope boundary) | §0 Must-not-define + Trigger Matrix NO rows. |
| 4 (References) | AP-16, AP-31 (context dump) | Progressive loading caps main file size. |
| 5 (Self-audit) | AP-45 (no human review) | Summary handoff before full deployment. |

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

**Input:** "I want a skill that reviews my pull requests for merge-blocking bugs before I click merge."

**Output:** `pr-blocker-check/SKILL.md` with trigger description, explicit exclusions (e.g., not for feature work), deterministic review steps with a merge/no-merge validation gate, and an AP compliance map covering AP-1, AP-3, AP-45.

**Failure case:** The user asks for a skill that "aggressively rewrites all code with no approval". Refuse: it encodes AP-4 (over-permissive agent) and AP-45 (no human review trigger). Escalate to `docs/skill-standard.md` §2 requirement 8.