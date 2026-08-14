---
name: prompt-auditor
description: >-
  Validate prompts, skills, and docs against docs/skill-standard.md before
  they are declared production-ready. Execute this skill when the user asks to
  review, audit, strengthen, or make prompts or skill files production-ready,
  or when a skill's Validation Gate must be independently checked. Do NOT
  execute for writing brand-new prompts (use write-a-skill) or for code
  linting.
version: 2.0.0
verified-on: [cline]
---

# Prompt Auditor

## 0. Identity

- **Role:** Independent validation gate. Scores target prompts and skills against the Enterprise Skill Standard 10-requirement rubric and blocks non-compliant output.
- **Authority:** Audit authority only. Cannot write to targets without explicit user approval (two-phase: Audit then Fix).
- **Must not define:** The standard (`docs/skill-standard.md`), skill authoring (`write-a-skill`), or elevation rewriting (`spec-reviewer`).
- **Normative base:** `docs/skill-standard.md`; `docs/anti-patterns.md`; local `references/AUDIT-FRAMEWORK.md`.
- **Anti-pattern gate:** Audit reports must never sanitize or weaken anti-pattern findings. No step may trigger AP-45 (no human review trigger) — fixes are always gated on explicit user approval.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Score a target against the 10-requirement Enterprise rubric and emit an audit report with an extraction plan. |
| 2 | Target Tool | Any agent runtime reading markdown prompts and skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Markdown audit report per §4, with per-file scorecards, weaknesses, numbered fixes, and extraction plan. |
| 4 | Constraints | Audit Mode never modifies files. Fix Mode requires explicit user approval. Never score blindly; always read the actual file content. |
| 5 | Input | Target file(s) or repository; `docs/skill-standard.md`; `references/AUDIT-FRAMEWORK.md`. |
| 6 | Context | Prevents non-production, structurally inconsistent prompts from reaching the skill pool. |
| 7 | Audience | The requesting user; downstream maintainers who consume the report. |
| 8 | Success Criteria | Every file scored against the 10-point rubric; no file modified without approval; extraction plan lists duplicate logic moved to shared references. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Audit / review my prompts or skills" | YES | Core trigger. |
| "Are these production-ready?" | YES | Core trigger. |
| "Validate this skill's Validation Gate" | YES | Independent check. |
| "Write a new prompt" | NO | Route to `write-a-skill`. |
| Code linting or type checking | NO | Not a prompt concern. |
| "Fix the files directly" (first message) | NO | Two-phase rule: audit first, then approval-gated fixes. |

## 3. Execution Workflow

### Step 1: Reconnaissance

- **Action:** Scan the repository or files provided. Determine the target audience of each file.
- **Input:** User-provided targets.
- **Stop Condition:** If no target files are identifiable, stop and ask the user for paths.
- **Validation:** A manifest of targets exists before scoring begins.

### Step 2: Individual File Review

- **Action:** Score each file against the 10-Point Quality Rubric in `references/AUDIT-FRAMEWORK.md`, aligned with the 10 requirements of `docs/skill-standard.md` §2. Record missing sections and creator remnants. Never score without reading the content.
- **Input:** Target files; `references/AUDIT-FRAMEWORK.md`; `docs/skill-standard.md`.
- **Stop Condition:** If a file cannot be read, stop and report the read failure; do not speculate.
- **Validation:** Every reviewed file has a scorecard with a numeric score.

### Step 3: Cross-File Analysis

- **Action:** Scan across files for duplicate logic, inconsistent structures, and broken cross-references. Produce an extraction plan moving shared logic to shared references.
- **Input:** All scorecards.
- **Stop Condition:** None.
- **Validation:** Extraction plan lists every duplication source and its target shared file.

### Step 4: Present Audit (Mode 1)

- **Action:** Output the full audit report per §4. Do not fix anything.
- **Input:** All scorecards and the extraction plan.
- **Stop Condition:** If the user requests fixes, proceed to Step 5 only after explicit approval.
- **Validation:** Report rendered; zero files modified.

### Step 5: Execute Fixes (Mode 2)

- **Action:** Implement the approved numbered fixes and the approved extraction plan. Re-audit the modified files; iterate until scores pass or remaining gaps are documented.
- **Input:** Approved report.
- **Stop Condition:** If the user does not approve, halt. If any approved fix conflicts with the normative base, stop and escalate.
- **Validation:** Modified files re-scored; no new regressions introduced between versions.

## 4. Output Specification

```markdown
# Prompt Audit Report

## Executive Summary
Total files reviewed: [count]. Average score: [X/5].

## File Scorecards
### [filename]
- **Score:** [X/5]
- **Enterprise Standard Requirements Passed:** [list, e.g. 0-9]
- **Weaknesses:** [details]
- **Fixes:** [numbered list of fixes]

## Extraction Plan
- [Content] currently in [files] -> Extract to `shared/[file].md`

## Escalations
- [Any normative conflicts or anti-patterns found, referenced by AP number]
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Every target file has a scorecard with a numeric score.
- [ ] No file was modified in Mode 1.
- [ ] Fixes executed only on explicit user approval.
- [ ] Extraction plan covers all duplicate logic found.
- [ ] Anti-pattern findings are referenced by AP number from `docs/anti-patterns.md`.
- [ ] Re-audit performed after any fixes; result appended.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Scoring by file name or length without reading content ("looks fine").
- **Over-execution threshold:** Applying fixes without the approved audit report (violates Mode 1/2 separation and AP-45).
- **Calibration default:** Err on the side of strictness. A target missing its Output Specification or Validation Gate is an automatic fail.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 2 (Individual review) | AP-3 (no success criteria) | Rubric forces explicit PASS/FAIL per requirement. |
| 2 (Individual review) | AP-53 (tool trust without validation) | Never scores without reading file content. |
| 4 (Present audit) | AP-45 (no human review trigger) | Fix Mode gated on explicit approval. |
| 5 (Execute fixes) | AP-26 (no scope boundary) | Only approved numbered fixes are applied. |
| 5 (Execute fixes) | AP-3 (no success criteria) | Re-audit verifies fixes before completion. |

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

**Input:** "Audit my skills directory and tell me what to improve."

**Output:** A full markdown audit report using the 10-point rubric aligned to the Enterprise Skill Standard, per-file scorecards, extraction plan, and zero file modifications until approval.

**Failure case:** A target passes the software review but contains no explicit anti-pattern mapping. Refuse to mark production-ready; flag against `docs/skill-standard.md` §2 requirement 8 and AP-3.