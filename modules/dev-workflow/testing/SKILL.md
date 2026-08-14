---
name: testing
description: >-
  Testing group router for software development lifecycle workflows, routing test requests to automated unit, integration, and E2E testing sub-skills and reference catalogs.
version: 2.0.0
verified-on: [cline]
---

# Dev Workflow Testing Group Router

## 0. Identity

- **Role:** Dev Workflow Testing Dispatcher.
- **Authority:** Normative group router for `modules/dev-workflow/testing/`.
- **Must not define:** Direct test execution or test file code generation; hands off execution to sub-skills.
- **Normative base:** `core/decision-framework.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                             |
| --- | ---------------- | --------------------------------------------------------------------------------- |
| 1   | Task             | Classify testing requests and dispatch to `write-a-test` or reference material.   |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.  |
| 3   | Output Format    | Structured routing decision and handoff to testing sub-skill or reference doc.    |
| 4   | Constraints      | Router generates no test implementation code directly.                            |
| 5   | Input            | User request to write, fix, optimize, or reference tests.                         |
| 6   | Context          | Prevents unguided test creation and incorrect runner configurations.              |
| 7   | Audience         | Autonomous developer agents and software engineers.                               |
| 8   | Success Criteria | Exactly one target testing skill or reference path resolved deterministically.   |
| 9   | Examples         | See Section 10.                                                                   |

## 2. Trigger Matrix

| Category      | Trigger                               | Target Skill File Path                                     |
| ------------- | ------------------------------------- | ---------------------------------------------------------- |
| Test Creation | Write unit, integration, or E2E test  | `testing/write-a-test/SKILL.md`                            |
| Test Repair   | Fix flaky test or assertion error     | `testing/write-a-test/SKILL.md`                            |
| Testing Core  | Core testing conventions & assertions | `testing/write-a-test/references/core/`                   |
| Testing Adv   | Advanced mocking & fixtures           | `testing/write-a-test/references/advanced/`               |
| Architecture  | Test pyramid structure & boundaries   | `testing/write-a-test/references/architecture/`           |
| Browser APIs  | Playwright, DOM events, UI testing    | `testing/write-a-test/references/browser-apis/`         |
| Debugging     | Test debugging & flake elimination    | `testing/write-a-test/references/debugging/`            |
| Frameworks    | Vitest, Jest, Playwright configs      | `testing/write-a-test/references/frameworks/`           |
| CI/CD Infra   | Test runner execution in CI           | `testing/write-a-test/references/infrastructure-ci-cd/` |
| Test Patterns | Common test design patterns catalog   | `testing/write-a-test/references/testing-patterns/`      |

## 3. Execution Workflow

### Step 1: Analyze Request

- **Action:** Classify request into test writing, fixing, or reference lookup.
- **Input:** User prompt text.
- **Stop Condition:** Ask user if target layer is ambiguous.
- **Validation:** Matches Trigger Matrix.

### Step 2: Resolve Target

- **Action:** Select target path under `modules/dev-workflow/testing/`.
- **Input:** Trigger Matrix.
- **Stop Condition:** Decline execution if out of scope.
- **Validation:** Target file exists.

### Step 3: Handoff

- **Action:** Delegate to `testing/write-a-test/SKILL.md` or reference path.
- **Input:** Resolved target.
- **Stop Condition:** Handoff control.
- **Validation:** Sub-skill executes.

## 4. Output Specification

```json
{
  "group": "testing",
  "target_skill": "modules/dev-workflow/testing/write-a-test/SKILL.md"
}
```

## 5. Validation Gate

- [ ] Intent mapped to target sub-skill or reference path.
- [ ] Target file exists on disk.
- [ ] Router executes no test code modifications directly.

## 6. Anti-Triggers

- **Under-execution:** Failing to route leads to unstandardized tests.
- **Over-execution:** Routing manual QA checklist requests to test runners.

## 7. Anti-Pattern Compliance

| Step | Prevents AP            | Mechanism                                             |
| ---- | ---------------------- | ----------------------------------------------------- |
| 1    | AP-1 (vague task)      | Demands classification before handoff.                |
| 3    | AP-4 (over-permissive) | Group router cannot write or edit test code directly. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` — Group router created for `modules/dev-workflow/testing/`.

## 9. Portability Matrix

| Runtime     | Status   | Notes                          |
| ----------- | -------- | ------------------------------ |
| Claude Code | verified | Testing sub-skill dispatcher.  |
| Cursor      | verified | Testing rules routing.         |
| Copilot     | verified | Custom instructions.           |
| Windsurf    | verified | Testing directive routing.     |
| Kiro        | verified | Skill runner handoff.          |
| Cline       | verified | System prompt loading.         |
| Raw API     | verified | Model-agnostic testing router. |

## 10. Examples

**Input:** "Write a Vitest integration test for the user repository."
**Output:** Target `modules/dev-workflow/testing/write-a-test/SKILL.md`.
