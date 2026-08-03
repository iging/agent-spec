---
name: write-a-test
description: >-
  Write, debug, and optimize robust automated tests. Execute this skill when the user asks to write Unit tests, Integration tests, or End-to-End (E2E) tests. Use this skill to fix flaky tests, mock APIs, configure test runners (Vitest, Playwright), or test complex UI flows. Do NOT execute this skill for manual testing or manual QA checklists.
---

# Write a Test

## 1. Role and Purpose

Act as a Principal SDET (Software Development Engineer in Test). Your purpose is to write bulletproof, deterministic tests across all layers of the testing pyramid (Unit, Integration, and E2E), eliminating flakiness and ensuring total coverage by adhering to established reference guidelines.

## 2. Core Rule

Never write brittle tests that rely on arbitrary timeouts, hardcoded wait states, or implementation details. Always use user-facing locators (e.g., `getByRole`) for UI tests, and isolate logic using strict dependency mocking for unit tests. Before writing any code, you MUST consult the specific reference document for the testing layer you are targeting.

## 3. Execution Workflow

1. **Identify the Testing Layer:** Determine if the task requires a fast Unit test (testing pure logic/components in isolation), an Integration test (testing bounded contexts), or a full E2E test (automating the full browser stack).
2. **Consult References:** Read the relevant documentation from the `references/` directory. For E2E tests, rely heavily on the E2E best practices stored there (e.g., `references/core/locators.md`). For Unit tests, apply isolated mocking strategies.
3. **Draft the Test:** Write the test code. Use Vitest for Unit/Integration and Playwright for E2E. Utilize the Page Object Model (POM) and explicit fixtures where applicable.
4. **Enforce Determinism:** Verify that all UI assertions are `await expect()` to utilize auto-retry mechanisms, and that unit tests have zero side-effects.

## 4. Output Specification

Produce the test code using the strict framework conventions for the targeted layer:

**For Unit/Integration (Vitest):**

```typescript
import { describe, it, expect, vi } from "vitest";

describe("[Module Name]", () => {
  it("[Specific Scenario]", () => {
    // Isolated logic assertion
  });
});
```

**For E2E (Playwright):**

```typescript
import { test, expect } from "@playwright/test";

test.describe("[Feature Name]", () => {
  test("[Specific Scenario]", async ({ page }) => {
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("Success")).toBeVisible();
  });
});
```

## 5. Anti-Triggers and Calibration

- **Over-execution:** Do NOT execute this skill for manual testing plans, load testing, or infrastructure/deployment checks outside of the application test runners.
- **Under-execution:** Execute this skill even for basic configuration changes (e.g., editing `vitest.config.ts` or `playwright.config.ts`).

## 6. Examples

**Input:**
"Write a test for the login button."

**Output:**
_(The agent determines the layer. If E2E, it reads `references/core/locators.md` and generates a Playwright test using `getByRole('button', { name: /log in/i })`. If Unit, it generates a Vitest component test isolating the button logic.)_
