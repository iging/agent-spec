---
name: requesting-code-review
description: >-
  Pre-review audit protocol for summarizing pull request changes and verifying submission readiness.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Pre-Review Audit & Code Review Request Protocol

## 0. Identity

- **Role:** Pre-Review Quality Auditor & PR Specialist.
- **Authority:** Prepares code changes for peer or automated review.
- **Must not define:** Direct production code edits during review packaging.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-9, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                               |
| --- | ---------------- | ----------------------------------------------------------------------------------- |
| 1   | Task             | Perform pre-review compliance audit and generate structured review requests.        |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3   | Output Format    | Code review summary report or Pull Request description template.                    |
| 4   | Constraints      | Must verify clean diff, passing test suite, and compliance audit before submission. |
| 5   | Input            | Completed feature branch and implementation plan.                                   |
| 6   | Context          | Prevents submitting incomplete, un-tested, or bloated diffs for code review.        |
| 7   | Audience         | Code reviewers, maintainers, and automated review agents.                           |
| 8   | Success Criteria | Diff audited, tests green, anti-patterns cleared, PR description generated.         |
| 9   | Examples         | See Section 10.                                                                     |

## 2. Trigger Matrix

| Trigger                                               | Fire? | Notes                                |
| ----------------------------------------------------- | ----- | ------------------------------------ |
| Feature branch ready for code review or PR submission | YES   | Core trigger.                        |
| Pre-flight review check requested by user             | YES   | Core trigger.                        |
| Implementation tasks still in progress                | NO    | Finish plan implementation first.    |
| Test suite failing                                    | NO    | Run `systematic-debugging.md` first. |

## 3. Execution Workflow

### Step 1: Execute Compliance Audit

- **Action:** Run `node scripts/audit-compliance.js` across changed files.
- **Input:** Modified files in target branch.
- **Stop Condition:** Halt if compliance audit finds warnings or errors.
- **Validation:** Audit output returns zero errors.

### Step 2: Self-Review Diff Inspection

- **Action:** Inspect `git diff` against base branch. Check for unexpected file edits or leftover debug code.
- **Input:** Working branch diff.
- **Stop Condition:** Halt if unexpected files or commented debug logs are present.
- **Validation:** Diff contains only intentionally modified files.

### Step 3: Verify Test Coverage

- **Action:** Run complete test suite and capture execution evidence.
- **Input:** Test suite runner.
- **Stop Condition:** Halt if any test fails.
- **Validation:** Exit code is 0.

### Step 4: Generate Review Request

- **Action:** Construct structured PR description summarizing goals, spec reference, and verification evidence.
- **Input:** Clean diff and test results.
- **Stop Condition:** None.
- **Validation:** Review request document generated.

## 4. Output Specification

```markdown
# Pull Request Description

## Overview

[Summary of feature changes and architectural updates.]

## Spec Reference

`docs/superpowers/specs/2026-08-14-user-search-design.md`

## Verification Evidence

- Build Status: PASSED (`npm run build`)
- Test Status: PASSED (48 tests green)
- Compliance Audit: 0 issues (`node scripts/audit-compliance.js`)

## Key Files Modified

- `src/search/engine.ts`
- `tests/search/engine.test.ts`
```

## 5. Validation Gate

- [ ] `node scripts/audit-compliance.js` returns 0 issues.
- [ ] No extraneous file changes or debug artifacts present in diff.
- [ ] Complete test suite passes with zero failures.
- [ ] Structured PR description generated.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Submitting un-audited diffs wastes reviewer time on basic errors.
- **Over-execution threshold:** Requesting full formal code review for single-word doc fixes.
- **Calibration default:** Mandatory before creating any GitHub pull request or code review task.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                  | Mechanism                                           |
| ---- | ---------------------------- | --------------------------------------------------- |
| 1    | AP-4 (over-permissive agent) | Enforces automated compliance check on diff.        |
| 2    | AP-26 (no scope boundary)    | Audits git diff for scope creep outside task brief. |
| 3    | AP-9 (no verification)       | Attaches verified test execution logs.              |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation.

## 9. Portability Matrix

| Runtime     | Status   | Notes                                 |
| ----------- | -------- | ------------------------------------- |
| Claude Code | verified | Git and audit integration.            |
| Cursor      | verified | Terminal integration.                 |
| Copilot     | verified | Terminal integration.                 |
| Windsurf    | verified | Terminal integration.                 |
| Kiro        | verified | Execution runner.                     |
| Cline       | verified | Execution runner.                     |
| Raw API     | verified | Model-agnostic PR description writer. |

## 10. Examples

**Input:** "Prepare code review request for feature/user-search branch."
**Output:** Compliance verified, diff audited, PR description generated with test evidence.
