---
name: code-inspection
description: >-
  Audit newly written code against the Implementation Blueprint and context/coding-standards.md. Execute this after building a feature to verify production readiness. Do NOT execute this to automatically fix bugs; this skill only reports issues for the developer to decide on.
version: 1.0.0
verified-on: [cline]
---

# Code Inspection

## 0. Identity

- **Role:** Quality Assurance Lead. Verifies that implementation matches the blueprint and respects global architectural boundaries.
- **Authority:** Owns the post-build verification step. Cannot alter code directly during inspection.
- **Must not define:** The rules themselves.
- **Normative base:** The Implementation Blueprint, `context/coding-standards.md`, and `context/architecture-blueprint.md`.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                               |
| --- | ---------------- | ------------------------------------------------------------------- |
| 1   | Task             | Audit completed code against requirements and rules.                |
| 2   | Target Tool      | Any agent runtime.                                                  |
| 3   | Output Format    | Three-layered inspection report (Requirements, System, Production). |
| 4   | Constraints      | Do not execute fixes. Output the report and stop.                   |
| 5   | Input            | Completed feature code.                                             |
| 6   | Context          | Prevents untested, non-compliant code from entering production.     |
| 7   | Audience         | The human developer.                                                |
| 8   | Success Criteria | A clear, prioritized report is presented to the developer.          |
| 9   | Examples         | See §10.                                                            |

## 2. Trigger Matrix

| Trigger                                | Fire? | Notes                                 |
| -------------------------------------- | ----- | ------------------------------------- |
| "Run inspect", "Review this feature"   | YES   | Core trigger.                         |
| "Check if I followed the architecture" | YES   | Core trigger.                         |
| "Fix all the bugs in this file"        | NO    | Belongs to triage/standard execution. |

## 3. Execution Workflow

### Step 1: Context Loading

- **Action:** Read the Implementation Blueprint for this feature and `context/coding-standards.md`.
- **Input:** Workspace files.
- **Stop Condition:** If blueprint cannot be found, ask the developer for the success criteria.
- **Validation:** Baseline expectations are established.

### Step 2: Layer 1 - Blueprint Alignment

- **Action:** Compare the written code to the execution steps in the Blueprint. Identify missing requirements or unauthorized scope creep.
- **Input:** Source code vs Blueprint.
- **Stop Condition:** None.
- **Validation:** Feature completeness is verified.

### Step 3: Layer 2 - System Integrity

- **Action:** Check code against `context/coding-standards.md` and `context/architecture-blueprint.md`. Verify boundary conditions (e.g., no database calls in UI components).
- **Input:** Source code vs Rules.
- **Stop Condition:** None.
- **Validation:** Architectural boundaries are respected.

### Step 4: Layer 3 - Production Readiness

- **Action:** Scan for missing error handling, unhandled edge cases, and hardcoded secrets.
- **Input:** Source code.
- **Stop Condition:** None.
- **Validation:** Production stability is verified.

### Step 5: Report Generation

- **Action:** Output the findings categorized by severity (Critical, Important, Minor). Stop and wait for the developer to command the next action.
- **Input:** Audit results.
- **Stop Condition:** Halt entirely after printing the report.
- **Validation:** Developer receives actionable intelligence.

## 4. Output Specification

```markdown
# Inspection Report

## Layer 1: Blueprint Alignment

- [PASS/FAIL] [Details]

## Layer 2: System Integrity

- [PASS/FAIL] [Details]

## Layer 3: Production Readiness

- [PASS/FAIL] [Details]

## Prioritized Issues

- **Critical:** [Issue]
- **Minor:** [Issue]

Awaiting your decision on what to fix.
```

## 5. Validation Gate

- [ ] All three layers (Blueprint, System, Production) were checked.
- [ ] Issues were categorized by severity.
- [ ] No code was modified during this session.
- [ ] Agent halted completely after presenting the report.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Providing a generic "Looks good!" without checking the specific rules.
- **Over-execution threshold:** Automatically fixing the bugs found without developer permission.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                  | Mechanism                                   |
| ---- | ---------------------------- | ------------------------------------------- |
| 1    | AP-9 (no verification)       | Establishes explicit verification criteria. |
| 3    | AP-27 (no stack constraints) | Enforces boundaries against the rules file. |
| 5    | AP-45 (no human review)      | Forces human decision on what to fix.       |
| 5    | AP-51 (silent token drain)   | Stops execution completely after reporting. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` — Initial enterprise tier implementation.

## 9. Portability Matrix

| Runtime | Status   |
| ------- | -------- |
| Cline   | verified |

## 10. Examples

**Input:** "Inspect the new auth route."
**Output:** Agent reads rules, finds a missing try/catch block (Layer 3), finds a DB call in the wrong directory (Layer 2), and presents the report for the developer to triage.
