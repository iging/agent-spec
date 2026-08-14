---
name: write-a-test
description: >-
  Write, debug, and optimize robust automated tests. Execute this skill when the user asks to write Unit tests, Integration tests, or End-to-End (E2E) tests. Use this skill to fix flaky tests, mock APIs, configure test runners (Vitest, Playwright), or test complex UI flows. Do NOT execute this skill for manual testing or manual QA checklists.
version: 2.0.0
verified-on: [cline]
---

# Write a Test

## 0. Identity

- **Role:** Principal SDET (Software Development Engineer in Test). Writes bulletproof, deterministic tests across the testing pyramid (Unit, Integration, E2E), eliminating flakiness and ensuring total coverage by adhering to established reference guidelines.
- **Authority:** Owns the automated-test writing workflow only. Never applies manual-testing or QA-checklist patterns.
- **Must not define:** The application's business logic; deployment/infrastructure behavior outside the test runners.
- **Normative base:** `shared/writing/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`; `references/` (core, advanced, architecture, browser-apis, debugging, frameworks, infrastructure-ci-cd, testing-patterns).
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dump), AP-29 (ambiguous verb), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Identify the testing layer, consult the matching reference documents, draft the test in the strict framework convention, then enforce determinism (auto-retry assertions, zero side-effects). |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Test code in the strict framework convention for the targeted layer (Vitest for Unit/Integration, Playwright for E2E). |
| 4 | Constraints | Never write brittle tests relying on arbitrary timeouts, hardcoded wait states, or implementation details. Always use user-facing locators (`getByRole`) for UI. Consult the matching reference before writing code. |
| 5 | Input | A request to write/fix/optimize automated tests, mock APIs, configure runners, or test complex UI flows. |
| 6 | Context | Prevents flaky, implementation-coupled tests (AP-16, AP-29). |
| 7 | Audience | The developer running the suite and the CI pipeline. |
| 8 | Success Criteria | Test written to the layer's reference standard; user-facing locators used; all UI assertions `await expect()`; unit tests zero side-effects. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Write a unit/integration/E2E test" | YES | Core trigger. |
| Fixing flaky tests, mocking APIs, configuring runners | YES | Core trigger. |
| Manual testing plans / manual QA checklists | NO | Out of scope. |
| Load testing / infra-deploy checks outside app test runners | NO | Out of scope. |

## 3. Execution Workflow

### Step 1: Identify Layer

- **Action:** Determine the testing layer: fast Unit test (pure logic/components in isolation), Integration test (bounded contexts), or full E2E test (full browser stack).
- **Input:** Task.
- **Stop Condition:** None.
- **Validation:** Layer determined (Unit / Integration / E2E).

### Step 2: Consult References (MANDATORY)

- **Action:** Read the relevant documentation from `references/`. For E2E rely heavily on E2E best practices (e.g. `references/core/locators.md`). For Unit tests apply isolated mocking strategies.
- **Input:** Layer.
- **Stop Condition:** If no matching reference was read before writing code, stop and consult it — consulting is mandatory before any code.
- **Validation:** Matching reference consulted.

### Step 3: Draft the Test

- **Action:** Write the test code. Use Vitest for Unit/Integration and Playwright for E2E. Utilize the Page Object Model (POM) and explicit fixtures where applicable.
- **Input:** Reference + task.
- **Stop Condition:** If the draft uses CSS/XPath where a user-facing locator exists, stop and replace with `getByRole`/`getByLabel` per the priority order.
- **Validation:** Test drafted in the layer's strict convention.

### Step 4: Enforce Determinism

- **Action:** Verify all UI assertions are `await expect()` to utilize auto-retry, and unit tests have zero side-effects.
- **Input:** Draft test.
- **Stop Condition:** If any arbitrary timeout or hardcoded wait state remains, stop and remove it.
- **Validation:** Deterministic; no flakiness sources.

## 4. Output Specification

Produce the test code using the strict framework conventions for the targeted layer.

**Unit/Integration (Vitest):**

```typescript
import { describe, it, expect, vi } from "vitest";

describe("[Module Name]", () => {
  it("[Specific Scenario]", () => {
    // Isolated logic assertion
  });
});
```

**E2E (Playwright):**

```typescript
import { test, expect } from "@playwright/test";

test.describe("[Feature Name]", () => {
  test("[Specific Scenario]", async ({ page }) => {
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("Success")).toBeVisible();
  });
});
```

## 5. Validation Gate

- [ ] Testing layer identified (Unit / Integration / E2E).
- [ ] Matching reference consulted before writing code (mandatory).
- [ ] Strict framework convention used (Vitest / Playwright).
- [ ] User-facing locators throughout; no arbitrary timeouts or hardcoded waits.
- [ ] All UI assertions auto-retry via `await expect()`.
- [ ] Unit tests have zero side-effects.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Executing this skill for manual testing plans, load testing, or infrastructure/deployment checks outside of the application test runners.
- **Under-execution:** Skipping the skill for basic configuration changes — execute even for editing `vitest.config.ts` or `playwright.config.ts`.
- **Calibration:** Priority order for locators: role → label → text → test ID → CSS/XPath (last resort).

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 2 (Consult) | AP-1 (vague task verb) | Reference consultation is mandatory before any code. |
| 2 (Consult) | AP-16 (context dump) | Reference documents are the bounded source of conventions. |
| 3 (Draft) | AP-29 (ambiguous verb) | User-facing locator priority order is deterministic. |
| 4 (Determinism) | AP-3 (no success criteria) | Zero-timeout + auto-retry + zero-side-effect are hard rules. |
| 4 (Determinism) | AP-45 (no human review trigger) | Determinism pass before test delivery. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | untested | |
| Cursor | untested | |
| Copilot | untested | |
| Windsurf | untested | |
| Kiro | untested | |
| Cline | verified | Executed in current workspace. |
| Raw API (no tooling) | untested | |

## 10. Examples

**Input:** "Write a test for the login button."

**Output:** The agent determines the layer. If E2E, it reads `references/core/locators.md` and generates a Playwright test using `getByRole('button', { name: /log in/i })`. If Unit, it generates a Vitest component test isolating the button logic.