---
name: 5-triage
description: >-
  Diagnose persistent build failures or logic errors before writing any fix. Execute this skill when a bug is complex or after a failed fix attempt. Do NOT execute this to just patch code continuously; it forces classification into Bug, Polluted Context, or Architectural Flaw.
version: 1.0.0
verified-on: [cline]
---

# Diagnostic Triage

## 0. Identity

- **Role:** Incident Commander. Halts the cycle of endless, destructive prompting to diagnose the true nature of a failure before any code is modified.
- **Authority:** Controls failure analysis. Cannot write code fixes until diagnosis is approved.
- **Must not define:** The final solution (only defines the approach).
- **Normative base:** Current failure logs and source code.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                             |
| --- | ---------------- | ----------------------------------------------------------------- |
| 1   | Task             | Diagnose a failure mode before attempting a fix.                  |
| 2   | Target Tool      | Any agent runtime.                                                |
| 3   | Output Format    | Diagnostic report classifying the failure.                        |
| 4   | Constraints      | Must not execute any code changes during triage.                  |
| 5   | Input            | Description of the bug and previous failed attempts.              |
| 6   | Context          | Breaks the infinite "try again" loops that destroy codebases.     |
| 7   | Audience         | The human developer.                                              |
| 8   | Success Criteria | Developer approves the classification and the proposed next step. |
| 9   | Examples         | See §10.                                                          |

## 2. Trigger Matrix

| Trigger                             | Fire? | Notes                         |
| ----------------------------------- | ----- | ----------------------------- |
| "Run triage", "Diagnose this error" | YES   | Core trigger.                 |
| "I've tried fixing this 3 times"    | YES   | Classic loop indicator.       |
| "Fix this typo"                     | NO    | Simple fix, no triage needed. |

## 3. Execution Workflow

### Step 1: Fact Gathering

- **Action:** Ask the developer what happened, what was expected, and how many times they have tried to fix it. Wait for their response.
- **Input:** Developer query.
- **Stop Condition:** Halt and wait for developer input.
- **Validation:** Facts are collected.

### Step 2: Failure Classification

- **Action:** Classify the failure into one of three modes:
  1. **Targeted Bug:** Isolated issue, clear root cause.
  2. **Polluted Context:** Code is tangled from multiple failed fixes. Requires a hard reset.
  3. **Architectural Flaw:** The foundational approach is wrong. Requires a rethink.
- **Input:** Facts from Step 1.
- **Stop Condition:** None.
- **Validation:** Failure is classified.

### Step 3: Response Prescription

- **Action:** Formulate the response.
  - For (1), define the exact root cause and proposed fix.
  - For (2), draft a Reset Note to save what works, and advise starting a new session.
  - For (3), name the wrong assumption and propose the correct architecture.
- **Input:** Classification.
- **Stop Condition:** None.
- **Validation:** Response matches the failure mode.

### Step 4: Developer Alignment

- **Action:** Present the classification and the prescription. Ask for developer approval.
- **Input:** Diagnostic report.
- **Stop Condition:** Halt completely. Do not write code until developer says "Proceed with fix" or "Let's reset."
- **Validation:** Developer makes an informed choice.

## 4. Output Specification

```markdown
# Triage Report

**Failure Mode:** [Targeted Bug | Polluted Context | Architectural Flaw]
**Reason:** [One sentence explanation]

## Analysis

**Root Cause / Bad Assumption:** [Details]

## Prescription

[Proposed fix / Reset note / Architectural shift]

Do you approve this diagnosis?
```

## 5. Validation Gate

- [ ] Fact gathering occurred before diagnosis.
- [ ] Failure was explicitly classified into one of the three modes.
- [ ] No code was patched or modified during this session.
- [ ] Agent halted for developer approval on the diagnosis.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Providing a code fix immediately without classifying the failure mode.
- **Over-execution threshold:** Forcing a hard reset for a simple syntax error.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                      | Mechanism                                                                                              |
| ---- | -------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 1    | AP-48 (retry without correction) | Forces investigation into _why_ previous attempts failed.                                              |
| 2    | AP-47 (context rot)              | Detects polluted sessions and explicitly prescribes a reset.                                           |
| 4    | AP-52 (no circuit breaker)       | Acts as the ultimate circuit breaker, halting code generation entirely until the approach is verified. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` — Initial enterprise tier implementation.

## 9. Portability Matrix

| Runtime | Status   |
| ------- | -------- |
| Cline   | verified |

## 10. Examples

**Input:** "Run triage. The auth route keeps failing and returning 500."
**Output:** Agent classifies it as an Architectural Flaw (wrong middleware usage) and proposes a redesign rather than patching the existing route.
