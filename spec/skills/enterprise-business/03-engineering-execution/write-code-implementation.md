---
name: write-code-implementation
description: >-
  Translate approved feature specifications and architectural designs into clean,
  production-ready source code with aligned unit tests. Execute this skill whenever
  the user says "implement feature X", "write code for spec Y", "build endpoint Z",
  or "code this ticket". Do NOT execute for high-level ideation or speculative planning.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Write Code Implementation

## 0. Identity

- **Role:** Lead Software Engineer. Translates approved feature specifications and architectural designs into production-ready source code adhering to repository clean-code standards.
- **Authority:** Tier-5 Enterprise Skill. Governs production code generation, bug resolution coding, and unit test alignment within assigned scope boundaries.
- **Must not define:** Product requirements, deployment pipeline changes, or release tag creation.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `context/RULES.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                  |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------ |
| 1   | Task             | Write production code and unit tests matching an approved feature specification or ticket.             |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                    |
| 3   | Output Format    | Modified source code files, new test files, and concise execution summary.                             |
| 4   | Constraints      | Must read feature spec before writing code. Must edit only allowed scope files. Must run verification. |
| 5   | Input            | Feature specification file, issue description, target files, and repository coding rules.              |
| 6   | Context          | Prevents out-of-scope edits, architectural drift, and untested production code additions.              |
| 7   | Audience         | Software developers, pull request reviewers, and continuous integration pipelines.                     |
| 8   | Success Criteria | Code implemented adhering to spec boundaries, type checker passes, and unit tests pass.                |
| 9   | Examples         | See Section 10.                                                                                        |

## 2. Trigger Matrix

| Trigger                           | Fire? | Notes                                    |
| --------------------------------- | ----- | ---------------------------------------- |
| "Implement code for spec X"       | YES   | Primary trigger for feature coding.      |
| "Build this API endpoint"         | YES   | Core feature implementation request.     |
| "Write code to fulfill issue #42" | YES   | Ticket execution request.                |
| "Brainstorm business strategy"    | NO    | Discovery task. Route to product demand. |
| "Review this pull request"        | NO    | Code review task. Route to code review.  |

## 3. Execution Workflow

### Step 1: Specification Pre-Check and Scope Lock

- **Action:** Read the target feature specification or ticket description. Identify allowed file edit boundaries, forbidden file paths, and acceptance criteria.
- **Input:** Feature specification path (`.context/specs/*`) or user task input.
- **Stop Condition:** If no explicit scope boundary exists, ask you to confirm allowed target files before editing.
- **Validation:** Allowed file paths locked in session memory.

### Step 2: Test-Driven Baseline Setup

- **Action:** Inspect existing test files or write a failing unit test that exercises the required new capability. Run the test to confirm baseline failure.
- **Input:** Target test directory and feature acceptance criteria.
- **Stop Condition:** If existing test suite fails prior to changes, notify you and resolve test baseline before feature coding.
- **Validation:** Test baseline confirmed red (failing) for the new requirement.

### Step 3: Production Code Implementation

- **Action:** Implement minimal, high-quality production source code to satisfy the feature requirements. Follow repository code conventions in `context/RULES.md` (clean functions, strict typing, zero unused parameters).
- **Input:** Target source files locked in Step 1.
- **Stop Condition:** Do not edit files outside the locked scope boundaries. Limit edits strictly to allowed paths.
- **Validation:** Source code written without syntax or type errors.

### Step 4: Verification and Green Gate

- **Action:** Execute the local verification command (e.g., `npm test`, `pytest`, `go test`, `cargo test`) and type checker.
- **Input:** Updated source code and test files.
- **Stop Condition:** If test or type check fails, iterate on implementation up to 3 times. If still failing, revert changes and present diagnosis.
- **Validation:** All tests pass green. Type checker reports zero errors.

## 4. Output Specification

````markdown
# Engineering Implementation Summary: [Feature Title]

- **Status:** Complete | Failed Verification
- **Engineer:** [Lead Software Engineer]
- **Target Spec:** `.context/specs/[slug]-feature-spec.md`

## 1. Files Modified

- `[src/path/file1.ts]`: Added core implementation logic.
- `[src/path/file1.test.ts]`: Added unit test coverage for new edge cases.

## 2. Verification Results

```bash
$ npm test
PASS src/path/file1.test.ts (2.1 s)
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
```
````

## 3. Scope Boundary Compliance Check

- [x] All edits confined to allowed target paths.
- [x] Zero changes to forbidden files (`package.json`, database migrations).
- [x] Zero unused imports or dead code introduced.

```

## 5. Validation Gate

Run before declaring completion:

- [ ] Target specification read and scope boundaries locked.
- [ ] Edits confined strictly to allowed file paths.
- [ ] Unit tests added or updated to cover new functionality.
- [ ] Verification command executed and reported green.
- [ ] Zero banned words or em dashes present in response text.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Modifying source files without executing tests or type checks to verify changes.
- **Over-execution threshold:** Refactoring unrelated subsystems or modifying global architecture during a focused feature ticket.
- **Calibration default:** Err toward smallest viable diff to pass test criteria.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| Step 1 | AP-4, AP-26 | Locks explicit file edit boundaries before modifying codebase. |
| Step 2 | AP-3, AP-48 | Enforces test-first or test-aligned verification gate. |
| Step 3 | AP-2, AP-14 | Keeps implementation strictly within single-task boundaries. |
| Step 4 | AP-28, AP-52 | Implements circuit breaker (3 iteration max) on verification failure. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room implementation conforming to Tier-5 Enterprise SKILL standard.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct execution using standard file and terminal tools. |
| Cursor | verified | Fully supported via workspace editor. |
| Copilot | verified | Formatted for step-by-step coding guidance. |
| Windsurf | verified | Fully compatible. |
| Kiro | verified | Fully compatible. |
| Cline | verified | Executed and verified in workspace environment. |
| Raw API (no tooling) | verified | Generates valid code diffs and implementation steps. |

## 10. Examples

**Input:** "Implement the login rate limiter spec at `.context/specs/auth-rate-limiter.md`."

**Output:** Reads spec file. Locks scope to `src/middleware/rateLimit.ts` and `src/middleware/rateLimit.test.ts`. Writes rate limiter middleware. Executes `npm test`. Confirms all 4 tests pass green. Displays execution summary.

**Failure case:** User says "Refactor the database migrations while implementing the login rate limiter." Refuses out-of-scope database migration edit, enforcing scope lock.

```
