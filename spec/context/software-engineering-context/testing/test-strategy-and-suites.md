# Test Strategy and Suites Specification

## Role / Authority

- **Role:** Specification of testing philosophy, test pyramid distribution, automation frameworks, and continuous integration testing gates.
- **Authority:** Primary context reference for test architecture and quality assurance standards.
- **Must not define:** Application runtime business logic or infrastructure provisioning code.

---

## 1. Testing Philosophy & Test Pyramid

Standard Reference: Martin Fowler Test Pyramid ([martinfowler.com](https://martinfowler.com/articles/practical-test-pyramid.html))

- **Unit Testing Target:** `[PLACEHOLDER: UNIT_TEST_COVERAGE_TARGET]` (e.g., > 80% line coverage for domain logic)
- **Integration Testing Focus:** Service boundary interactions, database persistence, and API contract validations.
- **End-to-End (E2E) Target:** Critical user journey flows executed in browser automation environments.

---

## 2. Test Automation Frameworks

- **Unit Test Runner:** `[PLACEHOLDER: UNIT_TEST_RUNNER]` (e.g., Vitest, Jest, PyTest)
- **Integration Testing Tool:** `[PLACEHOLDER: INTEGRATION_TEST_RUNNER]` (e.g., Supertest, Testcontainers)
- **E2E Testing Framework:** `[PLACEHOLDER: E2E_TEST_RUNNER]` (e.g., Playwright, Cypress)

---

## 3. CI/CD Testing Gates & Assertions

- **PR Validation Gate:** All unit and integration tests must pass prior to pull request merge.
- **Flakiness Threshold:** Tests with intermittent failures quarantined immediately and tracked as technical debt.
- **Workflow Baseline:** See [`development/workflow-and-testing-standards.md`](../development/workflow-and-testing-standards.md).
