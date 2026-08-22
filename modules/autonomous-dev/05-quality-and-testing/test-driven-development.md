---
name: test-driven-development
description: >-
  Strict Red-Green-Refactor implementation engine requiring falsifiable test failure before production coding.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Test-Driven Development (TDD) Implementation Engine

## 0. Identity

- **Role:** TDD Execution & Code Quality Specialist.
- **Authority:** Enforces strict Red-Green-Refactor engineering workflow.
- **Must not define:** Architectural design specs, executes individual task implementation via TDD.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-9, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Implement feature tasks strictly using the Red-Green-Refactor execution cycle. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Verified unit tests and production code implementation. |
| 4 | Constraints | Must write failing unit test first. Must verify test fails for expected reason before writing production code. |
| 5 | Input | Task specification from implementation plan. |
| 6 | Context | Prevents untested code, false-positive tests, and unverified implementation logic. |
| 7 | Audience | Autonomous implementer agents and software engineers. |
| 8 | Success Criteria | Test written, fails initially, passes with minimal production code, refactored cleanly. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Implementing any code task or feature step | YES | Core trigger. |
| Bug fix requiring regression proof | YES | Core trigger. |
| Task is pure markdown documentation | NO | Skip TDD cycle. |
| Code changes already completed without tests | NO | Halt and add failing test retrospective. |

## 3. Execution Workflow

### Step 1: Red Phase (Falsifiable Failure)

- **Action:** Write minimal unit test covering the requirement. Run test runner.
- **Input:** Task brief requirements.
- **Stop Condition:** Halt if test passes immediately (indicates invalid test or pre-existing logic).
- **Validation:** Test fails with explicit expected error message.

### Step 2: Green Phase (Minimal Implementation)

- **Action:** Write the minimal production code necessary to make the failing test pass.
- **Input:** Failing test output and error location.
- **Stop Condition:** If code changes exceed minimum needed for current test, stop refactoring.
- **Validation:** Test runner returns 100% pass status for the test file.

### Step 3: Refactor Phase (Clean & Maintainable)

- **Action:** Refactor production and test code to adhere to `shared/engineering/function-design.md`, `shared/engineering/naming-conventions.md`, and `shared/engineering/design-principles.md`.
- **Input:** Passing code state.
- **Stop Condition:** Halt if any refactoring breaks existing test suite.
- **Validation:** Code is clean and full test suite remains green.

## 4. Output Specification

```markdown
# TDD Cycle Completion Summary

- Task: `Implement Token Validator`
- Red Phase Verified: Test failed with `TokenExpiredError expected`
- Green Phase Verified: Test passed (15ms execution)
- Refactor Verified: Code cleaned, test suite green (24 tests total)
```

## 5. Validation Gate

- [ ] Unit test written prior to production code modification.
- [ ] Test failure observed and verified with expected error message.
- [ ] Production code modified only to pass failing test.
- [ ] Refactored code passes complete unit test suite.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Writing production code before tests creates unverified software.
- **Over-execution threshold:** Running TDD cycle on plain markdown documentation files.
- **Calibration default:** Mandatory for all software code modifications.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-9 (no verification) | Mandates observed test failure before production edits. |
| 2 | AP-6 (build-whole-thing) | Enforces minimal code writing to pass specific test. |
| 3 | AP-4 (over-permissive agent) | Validates test pass after every refactoring edit. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Test runner integration. |
| Cursor | verified | Terminal runner integration. |
| Copilot | verified | Terminal runner integration. |
| Windsurf | verified | Terminal runner integration. |
| Kiro | verified | Test execution. |
| Cline | verified | Test execution. |
| Raw API | verified | Model-agnostic TDD workflow guide. |

## 10. Examples

**Input:** "Implement user token validation using TDD."
**Output:** Failing test written, verified failure, minimal implementation written, test passed, code refactored.
