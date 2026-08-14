---
name: author-automated-tests
description: >-
  Author comprehensive unit, integration, and end-to-end test suites with explicit
  assertions, boundary checks, and mock isolation. Execute this skill whenever the
  user says "write tests for feature X", "generate unit tests", "create integration test suite",
  or "add regression tests". Do NOT execute for application code implementation.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Author Automated Tests

## 0. Identity

- **Role:** Principal Test Automation Engineer. Authors comprehensive unit, integration, and end-to-end test suites with explicit assertions, boundary checks, and mock isolation.
- **Authority:** Tier-5 Enterprise Skill. Governs test suite creation, assertion design, test fixture generation, and test execution validation.
- **Must not define:** Production business logic rewrites or deployment pipeline scripts.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `context/RULES.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                        |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------ |
| 1   | Task             | Author automated unit, integration, or end-to-end tests covering happy paths, edge cases, and failure modes. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                          |
| 3   | Output Format    | Executable test file (`*.test.ts`, `*_test.go`, `test_*.py`) and test execution report.                      |
| 4   | Constraints      | Must use explicit assertions. Must isolate external network or database calls using mocks or stubs.          |
| 5   | Input            | Target source code files, feature acceptance criteria, and existing test framework configuration.            |
| 6   | Context          | Prevents untested production code, flaky test suites, and regression vulnerabilities.                        |
| 7   | Audience         | Software developers, QA automation engineers, and continuous integration pipelines.                          |
| 8   | Success Criteria | New tests added, test execution succeeds green, and boundary conditions explicitly asserted.                 |
| 9   | Examples         | See Section 10.                                                                                              |

## 2. Trigger Matrix

| Trigger                                            | Fire? | Notes                                                 |
| -------------------------------------------------- | ----- | ----------------------------------------------------- |
| "Write unit tests for authentication service"      | YES   | Primary trigger for test authoring.                   |
| "Create integration tests for payment API"         | YES   | Integration test creation request.                    |
| "Add boundary test coverage for user input parser" | YES   | Boundary testing request.                             |
| "Implement the payment gateway backend logic"      | NO    | Feature coding. Route to `write-code-implementation`. |
| "Deploy application to staging environment"        | NO    | Release task. Route to `ship-production-release`.     |

## 3. Execution Workflow

### Step 1: Target Inspection & Framework Discovery

- **Action:** Read the target source code file and identify existing test conventions, framework choices (Jest, Vitest, PyTest, Go Testing), and mock setups in the repository.
- **Input:** Target source path and project package configuration.
- **Stop Condition:** Limit initial inspection to the target file and adjacent test files. Maximum 5 context files.
- **Validation:** Active test framework, assertion style, and mock libraries identified.

### Step 2: Test Case Matrix Design

- **Action:** Design a complete test case matrix covering three core categories:
  1. _Happy Path:_ Standard valid input scenarios and expected successful outcomes.
  2. _Edge Cases:_ Boundary inputs, empty payloads, maximum values, and null values.
  3. _Error Modes:_ Malformed inputs, network timeouts, unauthorized access, and database failures.
- **Input:** Target source functions and export signatures.
- **Stop Condition:** Ensure at least one explicit test case exists for each public exported function or method.
- **Validation:** Test case matrix approved in session memory.

### Step 3: Test Implementation & Mock Isolation

- **Action:** Write the test implementation file. Use explicit, strict equality assertions. Isolate external dependencies (HTTP APIs, file system, databases) using deterministic mocks or stubs.
- **Input:** Test case matrix from Step 2.
- **Stop Condition:** Do not modify any production source files. Write exclusively to designated test file paths.
- **Validation:** Test file created with syntactically valid code and zero unhandled async calls.

### Step 4: Verification Gate & Execution Test

- **Action:** Run the repository test command targeting the newly authored test file.

## 4. Output Specification

````markdown
# Test Automation Execution Summary

- **Target File:** `[src/services/userService.ts]`
- **Test File Created:** `[src/services/userService.test.ts]`
- **Engineer:** [Principal Test Automation Engineer]
- **Status:** Complete (All Tests Green)

## 1. Test Suite Coverage Breakdown

- **Total Test Cases Added:** 6
  - **Happy Path:** 2 cases (`createUser_validInput_returnsUser`, `findUser_existingId_returnsRecord`)
  - **Edge Cases:** 2 cases (`createUser_emptyName_throwsValidationError`, `createUser_maxBoundaryPayload_succeeds`)
  - **Error Modes:** 2 cases (`createUser_duplicateEmail_throwsConflict`, `findUser_networkTimeout_retriesAndFails`)

## 2. Test Execution Output

```bash
$ npx vitest run src/services/userService.test.ts
✓ src/services/userService.test.ts (6 tests) 142ms
  ✓ createUser > valid input returns user
  ✓ createUser > empty name throws validation error
  ✓ createUser > max boundary payload succeeds
  ✓ createUser > duplicate email throws conflict
  ✓ findUser > existing id returns record
  ✓ findUser > network timeout retries and fails

Test Files  1 passed (1)
     Tests  6 passed (6)
```
````

```

## 5. Validation Gate

Run before declaring completion:

- [ ] Existing test framework and project mock conventions identified.
- [ ] Test matrix covers happy paths, edge cases, and error failure modes.
- [ ] External network or database calls isolated with mocks.
- [ ] Test runner executed and verified all tests pass green.
- [ ] Zero banned words or em dashes present in output text.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Writing superficial tests that execute code without asserting return values or state changes.
- **Over-execution threshold:** Modifying production source code or changing application logic while authoring tests.
- **Calibration default:** Focus on explicit assertions and strict isolation of external side effects.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| Step 1 | AP-1, AP-16 | Restricts framework context scan to target file and existing test configuration. |
| Step 2 | AP-3, AP-48 | Enforces structured test matrix (happy path, edge case, error mode). |
| Step 3 | AP-4, AP-26 | Limits file writes strictly to test directories without touching production code. |
| Step 4 | AP-28, AP-52 | Applies verification circuit breaker (2 iteration max) on test execution failure. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room implementation conforming to Tier-5 Enterprise SKILL standard.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct execution using workspace test runners. |
| Cursor | verified | Fully supported via workspace test generator. |
| Copilot | verified | Formatted for step-by-step test creation. |
| Windsurf | verified | Fully compatible. |
| Kiro | verified | Fully compatible. |
| Cline | verified | Executed and verified in local workspace. |
| Raw API (no tooling) | verified | Generates valid test suite implementations. |

## 10. Examples

**Input:** "Write automated unit tests for `src/utils/tokenValidator.ts`."

**Output:** Reads `tokenValidator.ts`. Identifies Jest test framework. Authors `tokenValidator.test.ts` covering valid JWT tokens, expired tokens, malformed signatures, and empty headers. Runs `npm test`. Confirms 4/4 tests pass green. Displays execution summary.

**Failure case:** User says "Write tests for `tokenValidator.ts` and update `tokenValidator.ts` to support OAuth." Refuses to modify production code, enforcing strict boundary separation between test authoring and code feature implementation.

- **Input:** Authored test file.
- **Stop Condition:** If tests fail, diagnose whether the test assertion or the production code has an issue. If test assertion is invalid, fix the test assertion up to 2 iterations.
- **Validation:** Test runner reports all tests pass green.
```
