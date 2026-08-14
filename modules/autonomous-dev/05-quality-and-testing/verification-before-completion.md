---
name: verification-before-completion
description: >-
  Mandatory audit gate requiring fresh command execution and falsifiable evidence before marking work complete.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Pre-Completion Verification & Evidence Audit Protocol

## 0. Identity

- **Role:** Quality Assurance & Task Completion Auditor.
- **Authority:** Enforces strict verification policies before declaring tasks or plans complete.
- **Must not define:** Implementation planning, evaluates completed work state.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/coding-principles.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-3, AP-4, AP-9, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                   |
| --- | ---------------- | --------------------------------------------------------------------------------------- |
| 1   | Task             | Audit implementation evidence using fresh command execution before task declaration.    |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.     |
| 3   | Output Format    | Verification audit log with terminal output snippets proving passing tests.             |
| 4   | Constraints      | Must run commands fresh. Must not rely on historical memory or previous test logs.      |
| 5   | Input            | Active workspace state and task plan.                                                   |
| 6   | Context          | Prevents false completion declarations, hallucinated test passes, and regression leaks. |
| 7   | Audience         | Autonomous agents and release auditors.                                                 |
| 8   | Success Criteria | Fresh execution log proves build, test, and lint commands return exit code 0.           |
| 9   | Examples         | See Section 10.                                                                         |

## 2. Trigger Matrix

| Trigger                                        | Fire? | Notes                    |
| ---------------------------------------------- | ----- | ------------------------ |
| Task or plan completion claim about to be made | YES   | Core trigger.            |
| Pre-PR submission check                        | YES   | Core trigger.            |
| Work is actively in progress                   | NO    | Run TDD cycle first.     |
| Single file inspection query                   | NO    | Skip verification audit. |

## 3. Execution Workflow

### Step 1: Execute Fresh Build Command

- **Action:** Run primary build or compilation command freshly in terminal.
- **Input:** Project root build command (e.g. `npm run build` or `go build`).
- **Stop Condition:** Halt immediately if build command fails.
- **Validation:** Exit code is 0 with clean output.

### Step 2: Execute Fresh Test Suite

- **Action:** Run complete test suite freshly in terminal.
- **Input:** Test command (e.g. `npm test` or `pytest`).
- **Stop Condition:** Halt immediately if any test fails.
- **Validation:** All tests pass with 0 failures.

### Step 3: Falsifiability Sanity Check

- **Action:** Verify that tests actually test code logic (e.g. state mutation or assertion audit).
- **Input:** Code diff and test assertions.
- **Stop Condition:** Halt if test assertions pass regardless of return values (tautological tests).
- **Validation:** Assertions are falsifiable and bound to actual code path.

### Step 4: Generate Evidence Audit Report

- **Action:** Output structured Verification Evidence block containing raw command execution output.
- **Input:** Execution results from Steps 1-3.
- **Stop Condition:** None.
- **Validation:** Evidence block generated and validated.

## 4. Output Specification

```markdown
# Verification Audit Report

- **Build Command:** `npm run build` (Exit Code: 0)
- **Test Command:** `npm test` (Exit Code: 0, 48 passing, 0 failing)
- **Lint Command:** `node scripts/audit-compliance.js` (Exit Code: 0, 0 issues)
- **Audit Verdict:** VERIFIED_COMPLETE
```

## 5. Validation Gate

- [ ] All verification commands executed freshly in current session step.
- [ ] Terminal output captured directly without manual editing.
- [ ] Build, test, and lint commands return exit code 0.
- [ ] No tautological or placeholder assertions present in tests.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Claiming work is complete based on memory causes broken main builds.
- **Over-execution threshold:** Running complete integration suite after typing single doc comments.
- **Calibration default:** Mandatory prior to setting any plan task checkbox to `[x]`.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                | Mechanism                                  |
| ---- | -------------------------- | ------------------------------------------ |
| 1    | AP-9 (no verification)     | Mandates fresh build command execution.    |
| 2    | AP-3 (no success criteria) | Validates exit code 0 across test runner.  |
| 3    | AP-9 (false pass)          | Audits test assertions for falsifiability. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation.

## 9. Portability Matrix

| Runtime     | Status   | Notes                              |
| ----------- | -------- | ---------------------------------- |
| Claude Code | verified | Command runner execution.          |
| Cursor      | verified | Terminal output capture.           |
| Copilot     | verified | Terminal output capture.           |
| Windsurf    | verified | Terminal output capture.           |
| Kiro        | verified | Command execution.                 |
| Cline       | verified | Terminal runner.                   |
| Raw API     | verified | Model-agnostic verification guide. |

## 10. Examples

**Input:** "Verify task completion before marking plan step finished."
**Output:** Build, test, and compliance audit executed freshly, exit code 0 verified.
