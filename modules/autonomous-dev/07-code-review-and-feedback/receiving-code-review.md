---
name: receiving-code-review
description: >-
  Systematic feedback processing engine for executing requested code review modifications via TDD.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Code Review Feedback Processing Engine

## 0. Identity

- **Role:** Code Review Feedback Execution Specialist.
- **Authority:** Processes code review comments and executes requested modifications cleanly.
- **Must not define:** Blind unverified code changes, validates reviewer requests against requirements.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/coding-principles.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-9, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                 |
| --- | ---------------- | ------------------------------------------------------------------------------------- |
| 1   | Task             | Parse, validate, and execute requested code review modifications.                     |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.   |
| 3   | Output Format    | Updated code implementation with passing test suite and review response summary.      |
| 4   | Constraints      | Must evaluate each review item. Must write a failing test before applying code edits. |
| 5   | Input            | Code review comments or PR reviewer feedback log.                                     |
| 6   | Context          | Prevents hasty code modifications, regressions, and un-tracked reviewer suggestions.  |
| 7   | Audience         | Autonomous implementer agents and code reviewers.                                     |
| 8   | Success Criteria | All review comments addressed, TDD cycle executed for changes, tests green.           |
| 9   | Examples         | See Section 10.                                                                       |

## 2. Trigger Matrix

| Trigger                                                        | Fire? | Notes                                                      |
| -------------------------------------------------------------- | ----- | ---------------------------------------------------------- |
| Received code review feedback on pull request                  | YES   | Core trigger.                                              |
| User requests processing of reviewer comments                  | YES   | Core trigger.                                              |
| Review feedback contains invalid or contradictory requirements | YES   | Process valid parts, flag contradiction for user decision. |
| Code review is fully approved without changes                  | NO    | Proceed to `finishing-a-development-branch.md`.            |

## 3. Execution Workflow

### Step 1: Parse & Categorize Feedback Items

- **Action:** Extract individual feedback comments into a structured Action Item Checklist.
- **Input:** Raw code review comments.
- **Stop Condition:** Halt if any review comment is ambiguous or contradictory.
- **Validation:** Checklist items mapped to specific target files and line numbers.

### Step 2: Implement Modifications via TDD

- **Action:** For each action item, write or update a test to cover the requested change, then update code.
- **Input:** Action Item Checklist.
- **Stop Condition:** If any modification breaks existing tests, resolve regression before proceeding.
- **Validation:** Unit tests for requested changes pass.

### Step 3: Run Full Suite Verification

- **Action:** Run complete test suite and static analysis audit.
- **Input:** Workspace working tree.
- **Stop Condition:** Halt if project test suite fails.
- **Validation:** Test runner returns status code 0.

### Step 4: Formulate Review Response Report

- **Action:** Construct structured response document listing resolved review items and test evidence.
- **Input:** Passing test results and updated diff.
- **Stop Condition:** None.
- **Validation:** Response report generated for code reviewer.

## 4. Output Specification

```markdown
# Code Review Feedback Resolution Report

- **Review Items Processed:** 3
- **Items Resolved:** 3
- **Tests Added/Updated:** 2 unit tests
- **Full Test Suite Status:** PASSED (50 tests green)

## Action Items Resolution Detail

1. `Add null check in validator.ts` -> Resolved with test `tests/validator.test.ts`.
2. `Rename parseHeader function for clarity` -> Refactored cleanly.
3. `Update JSDoc annotations` -> Documentation updated.
```

## 5. Validation Gate

- [ ] Every reviewer comment parsed and mapped to an action item.
- [ ] Code modifications applied following TDD cycles.
- [ ] Project test suite passes with exit code 0.
- [ ] Structured response report generated.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Applying review changes without running tests causes regressions.
- **Over-execution threshold:** Re-architecting entire systems for minor code style feedback.
- **Calibration default:** Mandatory when addressing PR review comments.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                  | Mechanism                                                   |
| ---- | ---------------------------- | ----------------------------------------------------------- |
| 1    | AP-1 (vague task)            | Categorizes feedback into explicit file-level action items. |
| 2    | AP-9 (no verification)       | Mandates test creation/updates for review changes.          |
| 3    | AP-4 (over-permissive agent) | Validates overall project health post-refactor.             |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation.

## 9. Portability Matrix

| Runtime     | Status   | Notes                              |
| ----------- | -------- | ---------------------------------- |
| Claude Code | verified | Direct feedback handling.          |
| Cursor      | verified | Direct feedback handling.          |
| Copilot     | verified | Direct feedback handling.          |
| Windsurf    | verified | Cascade integration.               |
| Kiro        | verified | Feedback executor.                 |
| Cline       | verified | Feedback executor.                 |
| Raw API     | verified | Model-agnostic response generator. |

## 10. Examples

**Input:** "Process PR feedback comments: add null check and update docstrings."
**Output:** Test written for null check, code updated, docstrings added, test suite green.
