---
name: execute-root-cause-debugging
description: >-
  Investigate software defects, analyze error logs, isolate root causes through
  systematic hypothesis testing, and propose minimal corrective fixes. Execute
  this skill whenever the user says "debug this error", "why is this failing",
  "fix bug X", or "investigate stack trace". Do NOT execute for feature ideation.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Execute Root Cause Debugging

## 0. Identity

- **Role:** Senior Root Cause Debugging Specialist. Investigates software defects, analyzes error logs, isolates root causes through systematic hypothesis testing, and proposes minimal corrective fixes.
- **Authority:** Tier-5 Enterprise Skill. Governs defect diagnosis, log analysis, and root cause verification.
- **Must not define:** System-wide architecture overhauls or unrequested feature additions.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                         |
| --- | ---------------- | --------------------------------------------------------------------------------------------- |
| 1   | Task             | Isolate root cause of bugs or stack traces and provide minimal, verified fix recommendations. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.           |
| 3   | Output Format    | Root cause analysis document with failing test case and targeted code patch recommendation.   |
| 4   | Constraints      | Must prove root cause with a reproducible test case before modifying source code.             |
| 5   | Input            | Error log, stack trace, failing input sample, and relevant repository source code.            |
| 6   | Context          | Prevents superficial symptom masking, speculative code edits, and unverified bug fixes.       |
| 7   | Audience         | Software engineers, QA teams, and site reliability responders.                                |
| 8   | Success Criteria | Root cause isolated, reproducible failing test created, minimal patch verified green.         |
| 9   | Examples         | See Section 10.                                                                               |

## 2. Trigger Matrix

| Trigger                                     | Fire? | Notes                                                          |
| ------------------------------------------- | ----- | -------------------------------------------------------------- |
| "Debug this error stack trace"              | YES   | Primary trigger for debugging.                                 |
| "Why is this API returning 500?"            | YES   | Root cause investigation request.                              |
| "Investigate memory leak in worker process" | YES   | Technical defect diagnosis request.                            |
| "Design system architecture for feature Y"  | NO    | Architecture task. Route to `design-system-architecture`.      |
| "Write user manual documentation"           | NO    | Documentation task. Route to `author-technical-documentation`. |

## 3. Execution Workflow

### Step 1: Symptom & Log Analysis

- **Action:** Read the user error report, stack trace, and relevant log output. Trace the execution path from entry point down to exception callsite.
- **Input:** Error stack trace, log output, and affected source files.
- **Stop Condition:** If error details are missing, ask you for exact error logs or steps to reproduce before proceeding.
- **Validation:** Exception callsite and failing stack frame pinpointed.

### Step 2: Hypothesis Formulation & Reproduction Test

- **Action:** Formulate up to 3 testable hypotheses for the root cause. Author a minimal, automated test case that reliably reproduces the reported failure.
- **Input:** Pinpointed stack frame from Step 1.
- **Stop Condition:** Verify that the test case fails with the exact same error output reported by you.
- **Validation:** Reproduction test established and confirmed red (failing).

### Step 3: Root Cause Isolation & Verification

- **Action:** Inspect target variable states, boundary conditions, type coercions, or async race conditions. Isolate the exact single line or logic flaw responsible for the bug.
- **Input:** Failing reproduction test from Step 2.
- **Stop Condition:** Reject speculative fixes that do not address the isolated underlying cause.
- **Validation:** Single root cause identified and verified.

### Step 4: Minimal Patch Creation and Verification

- **Action:** Apply the smallest viable code patch to resolve the isolated root cause. Re-run the reproduction test and overall test suite.
- **Input:** Isolated root cause and target source files.
- **Stop Condition:** If tests fail or new regressions are introduced, revert patch and refine hypothesis.
- **Validation:** Reproduction test passes green. Zero regressions reported.

## 4. Output Specification

````markdown
# Root Cause Investigation Report

- **Defect Title:** [Short description of bug]
- **Investigator:** [Senior Root Cause Debugging Specialist]
- **Status:** Resolved | Unreproducible

## 1. Executive Diagnosis

[Concise summary of what went wrong and why]

## 2. Root Cause Analysis

- **Failing Callsite:** `[src/path/file.ts:line_number]`
- **Underlying Cause:** [e.g., Unhandled null pointer when user profile lacks optional email field]
- **Reproduction Test:** `[tests/bugs/issue-404.test.ts]`

## 3. Minimal Remediation Patch

```diff
--- a/src/path/file.ts
+++ b/src/path/file.ts
@@ -42,3 +42,3 @@
-  const email = user.profile.email.toLowerCase();
+  const email = user.profile?.email?.toLowerCase() ?? '';
```
````

## 4. Verification Output

```bash
$ npm test tests/bugs/issue-404.test.ts
PASS tests/bugs/issue-404.test.ts (1.2 s)
1 test passed, 0 failed.
```

```

## 5. Validation Gate

Run before declaring completion:

- [ ] Error stack trace analyzed to identify failing callsite.
- [ ] Reproducible failing test created before modifying source code.
- [ ] Underlying root cause isolated without speculative guessing.
- [ ] Minimal patch applied and verified green against existing test suite.
- [ ] Zero banned words or em dashes present in report text.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Patching symptoms (e.g., wrapping code in generic try/catch) without identifying why the error occurred.
- **Over-execution threshold:** Refactoring adjacent modules or rewriting non-failing subsystems while debugging a targeted defect.
- **Calibration default:** Focus strictly on isolating the minimal diff needed to pass the reproduction test.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| Step 1 | AP-1, AP-11 | Pinpoints exact stack frame and error callsite upfront. |
| Step 2 | AP-3, AP-48 | Forces reproducible test creation before code modification. |
| Step 3 | AP-38, AP-40 | Eliminates speculation by requiring proof of root cause. |
| Step 4 | AP-26, AP-52 | Confines patch to minimal viable diff and verifies against regressions. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room implementation conforming to Tier-5 Enterprise SKILL standard.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct execution using log search and test tools. |
| Cursor | verified | Fully supported via workspace debugger. |
| Copilot | verified | Formatted for step-by-step root cause analysis. |
| Windsurf | verified | Fully compatible. |
| Kiro | verified | Fully compatible. |
| Cline | verified | Executed and verified in local workspace. |
| Raw API (no tooling) | verified | Generates valid root-cause analysis payloads. |

## 10. Examples

**Input:** "Investigate why `TypeError: Cannot read property 'id' of undefined` occurs in `orderProcessor.js` line 54."

**Output:** Reads `orderProcessor.js`. Identifies missing check when `order.customer` is null. Creates reproduction test `tests/reproduce-order-null.test.js`. Confirms test fails. Fixes callsite using optional chaining. Re-runs test. Confirms test passes green. Delivers root cause report.

**Failure case:** User says "Wrap the entire orderProcessor.js file in try/catch to suppress errors." Refuses symptom masking, enforcing root cause isolation instead.

```
