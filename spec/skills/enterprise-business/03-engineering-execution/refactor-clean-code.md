---
name: refactor-clean-code
description: >-
  Restructure existing source code to improve maintainability, readability, and
  performance without altering external system behavior. Execute this skill whenever
  the user says "refactor this file", "clean up code", "reduce code complexity",
  or "eliminate code smell". Do NOT execute for adding new feature capabilities.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Refactor Clean Code

## 0. Identity

- **Role:** Principal Software Refactoring Engineer. Restructures existing source code to improve maintainability, readability, and performance without altering external system behavior.
- **Authority:** Tier-5 Enterprise Skill. Governs behavior-preserving code refactoring and structural cleanup.
- **Must not define:** New feature additions or public API breaking changes.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `context/RULES.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                      |
| --- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Restructure code to eliminate smells (long methods, duplicate logic, high complexity) preserving behavior. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                        |
| 3   | Output Format    | Refactored source code diffs and test suite execution verification logs.                                   |
| 4   | Constraints      | Must verify green test suite before and after refactoring. Zero external behavior changes allowed.         |
| 5   | Input            | Target source file paths, existing unit test suite, and repository clean-code rules.                       |
| 6   | Context          | Prevents code decay, technical debt accumulation, and unverified breaking refactors.                       |
| 7   | Audience         | Software engineers and code reviewers.                                                                     |
| 8   | Success Criteria | Code complexity reduced, dead code removed, zero broken tests, zero API changes.                           |
| 9   | Examples         | See Section 10.                                                                                            |

## 2. Trigger Matrix

| Trigger                                   | Fire? | Notes                                                         |
| ----------------------------------------- | ----- | ------------------------------------------------------------- |
| "Refactor this long function"             | YES   | Primary trigger for code refactoring.                         |
| "Clean up code smells in user controller" | YES   | Code cleanup request.                                         |
| "Reduce cognitive complexity in module X" | YES   | Complexity reduction request.                                 |
| "Add OAuth2 authentication"               | NO    | Feature implementation. Route to `write-code-implementation`. |
| "Investigate production outage"           | NO    | Debugging task. Route to `execute-root-cause-debugging`.      |

## 3. Execution Workflow

### Step 1: Safety Baseline & Test Suite Verification

- **Action:** Run existing automated unit and integration tests for the target code paths. Verify that all tests pass green before touching source files.
- **Input:** Target source files and associated test suite.
- **Stop Condition:** If tests are missing or failing, write or fix tests to establish a green safety baseline before refactoring.
- **Validation:** Test baseline confirmed 100% green.

### Step 2: Code Smell Identification & Strategy Selection

- **Action:** Inspect target files against `context/RULES.md` clean-code guidelines. Identify specific code smells (e.g., functions over 30 lines, nested conditionals, duplicate logic, magic numbers). Select standard refactoring patterns (Extract Function, Replace Conditional with Polymorphism, Inline Temp).
- **Input:** Baseline source code from Step 1.
- **Stop Condition:** Limit refactoring scope to identified code smells inside specified files. Do not alter public exported function signatures.
- **Validation:** Clear list of targeted code smells and selected refactoring patterns established.

### Step 3: Incremental Refactoring Execution

- **Action:** Apply refactoring patterns in small, atomic steps. Re-run tests after every individual transformation to verify behavior preservation.
- **Input:** Identified smells and refactoring plan from Step 2.
- **Stop Condition:** If any atomic step causes a test failure, revert that step immediately and choose an alternative approach.
- **Validation:** Source code refactored cleanly with zero test failures.

### Step 4: Verification and Metrics Comparison

- **Action:** Run full repository test suite and static analysis tools. Compare cyclomatic complexity, line counts, and readability before and after.
- **Input:** Refactored codebase.
- **Stop Condition:** Stop after displaying metrics comparison and green test results.
- **Validation:** Tests pass green. Cyclomatic complexity or line count reduced.

## 4. Output Specification

````markdown
# Refactoring Execution Summary

- **Target File:** `[src/path/targetFile.ts]`
- **Engineer:** [Principal Software Refactoring Engineer]
- **Status:** Completed | Reverted

## 1. Code Smells Eliminated

- **Smell 1:** Long monolithic function (`calculateTaxRate`, 95 lines) -> Extracted into 3 focused helper functions.
- **Smell 2:** Nested ternary operators -> Replaced with explicit guard clauses.
- **Smell 3:** Duplicate validation logic -> Consolidated into `validateAddress()`.

## 2. Refactoring Metrics Comparison

| Metric                       | Before | After | Improvement             |
| ---------------------------- | ------ | ----- | ----------------------- |
| Total Lines of Code          | 340    | 260   | -23.5%                  |
| Max Cyclomatic Complexity    | 18     | 6     | -66.7%                  |
| Public API Signature Changes | 0      | 0     | 0% (Behavior Preserved) |

## 3. Verification Command Output

```bash
$ npm test src/path/targetFile.test.ts
PASS src/path/targetFile.test.ts (1.8 s)
12 tests passed, 0 failed.
```
````

```

## 5. Validation Gate

Run before declaring completion:

- [ ] Green test baseline verified prior to refactoring.
- [ ] Refactoring executed in atomic steps with zero public API signature changes.
- [ ] Code complexity and line count reduced.
- [ ] Final verification command executed and reported green.
- [ ] Zero banned words or em dashes present in output.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Renaming variables without restructuring complex logic or reducing cyclomatic complexity.
- **Over-execution threshold:** Changing public API contracts or adding unrequested features during a refactoring task.
- **Calibration default:** Prioritize safety and behavior preservation over aggressive stylistic rewrites.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| Step 1 | AP-3, AP-48 | Mandates green test baseline before modifying code. |
| Step 2 | AP-4, AP-26 | Forbids public API breaking changes or scope expansion. |
| Step 3 | AP-28, AP-52 | Applies immediate rollback on test failure during atomic steps. |
| Step 4 | AP-42 | Delivers clear metrics proof of behavior preservation. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room implementation conforming to Tier-5 Enterprise SKILL standard.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct execution using standard workspace tools. |
| Cursor | verified | Fully supported via workspace editor. |
| Copilot | verified | Formatted for step-by-step refactoring guidance. |
| Windsurf | verified | Fully compatible. |
| Kiro | verified | Fully compatible. |
| Cline | verified | Executed and verified in local workspace. |
| Raw API (no tooling) | verified | Generates valid refactoring diffs. |

## 10. Examples

**Input:** "Refactor `orderCalculator.ts` to reduce complexity and remove duplicate code."

**Output:** Runs `npm test orderCalculator.test.ts`. Confirms all 8 tests pass green. Extracts 2 sub-functions (`calculateDiscount`, `applyShippingFee`). Replaces nested `if` statements with guard clauses. Re-runs tests. Confirms 8 tests pass green. Shows complexity reduction table.

**Failure case:** User says "Refactor `orderCalculator.ts` and change the return format of `calculateOrder Total()`." Refuses API signature change, preserving existing interface behavior.

```
