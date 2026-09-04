---
name: Testing Principles
description: Testing engineering rules covering unit, integration, and E2E testing strategies, test isolation, mock guidelines, CI/CD test integration, and clean testing practices from senior engineer transcript.
---

# Testing Principles

> **Purpose:** Testing engineering rules for unit, integration, and end-to-end test strategies. Reference this file from your prompt to enforce strict testing standards and maintain test quality at scale.

---

## 1. Testing Pyramid and Strategy

- **Unit Tests (70%+ of suite):** Fast, isolated tests for individual functions, components, and utilities. Must not depend on external services or databases. Use mocks/stubs only for external dependencies.
- **Integration Tests (20% of suite):** Test interactions between two or more components, services, or APIs. Verify data flow, API contracts, and service integrations without full UI rendering.
- **E2E Tests (10% of suite):** End-to-end tests that simulate real user journeys. Critical paths only (login, checkout, form submission). Run in staged environments, not on every PR.
- **Anti-Pattern:** Do not place business logic verification in E2E tests. Keep E2E focused on user flows, not validation rules.
- **TDD Foundation:** Test-Driven Development dictates that tests are written before production code; each test defines the minimal implementation needed. The test fails first (does not even compile), then just enough production code is written to pass, and no more. This ensures the unit test base of the pyramid is populated from the start.

---

## 2. Unit Testing Guidelines

- **Test Isolation:** Each unit test must be independent. No shared state, no global test fixtures that bleed across tests. Use `beforeEach`/`afterEach` for cleanup, not module-level globals.
- **Arrange-Act-Assert:** Structure every test file with clear sections: setup (`Arrange`), execution (`Act`), and verification (`Assert`). This improves readability and maintenance.
- **Mock External Dependencies:** Use mocks or stubs for database calls, HTTP requests, file systems, and clock/time dependencies. Never write unit tests that hit real external services.
- **Test Data Factories:** Use factory functions or libraries (e.g., `factory-girl`, `faker`) to generate consistent test data. Avoid hard-coded data objects that break when models change.
- **No `any` in Test Types:** TypeScript test files must use strict typing. `expect(fn()).not.toBe(null)` is preferred over `expect(fn()).toBeTruthy()` when the intent is null-checking.
- **One Concept Per Test:** Never pack multiple behaviors into a single test. When one test covers several concepts, it documents none of them and the reader has to untangle what each line checks. Split into separate focused tests: one for member creation, one for password safety, one for duplicate handling. Each focused test has a single responsibility, making failure diagnosis immediate.

---

## 3. Integration Testing Guidelines

- **API Contract Testing:** Verify request/response shapes match OpenAPI/Swagger definitions. Use code-generated types from the API spec to prevent drift.
- **Database Transaction Rolling Back:** After each integration test, roll back database transactions. Do not rely on manual cleanup or `TRUNCATE` statements that slow the suite.
- **Service Mocking Boundaries:** Mock external APIs at the HTTP client layer, not inside the service implementation. Tests should verify the code calls the client correctly, not that the external API behaves correctly.
- **Test Containers (Optional):** For database-dependent integration tests, use test containers (Docker-in-Dependencies) to spin up ephemeral databases. Teardown is automatic on test completion.

---

## 4. End-to-End Testing Guidelines

- **Critical Paths Only:** E2E tests must cover happy paths and error paths for critical user journeys (authentication, checkout, profile updates). Do not test every UI component.
- **Page Object Model:** Use the Page Object pattern to encapsulate DOM interactions. This reduces duplication and makes UI changes less likely to break tests.
- **Visual Regression (Optional):** If using visual regression tools (Chromatic, Percy), limit to major components and ensure baseline images are maintained across branches.
- **Flaky Test Policy:** Any test that fails randomly 2+ times must be marked with `@flaky` tag and investigated. Flaky tests erode trust in the entire suite. Bisect to find root cause (timing, ordering, shared state).
- **CI/CD Gate:** E2E tests must pass on the CI/CD pipeline before merge. Never merge with known failing E2E tests.
- **Behavior Verification:** Tests keep code flexible, maintainable, and reusable by verifying behavior, not implementation. When behavior changes, a failing test pins the exact location; when code is slow or poorly structured, tests enable safe refactoring. E2E tests serve the same purpose at the user-journey level — they declare what the system does, not how it does it.

---

## 5. Mock and Stub Guidelines

- **Mock What You Don't Own:** Mock external systems (APIs, databases, message queues, file systems). Do not mock types or interfaces defined in your own codebase — that defeats the purpose of unit testing.
- **Avoid Over-Mocking:** Do not mock at levels deeper than necessary. If you find yourself mocking 5 levels deep, consider whether the design is too layered or if integration tests would be more appropriate.
- **Use Real Implementations When Possible:** Prefer in-memory implementations (e.g., `mongoose::memory` for MongoDB, `sqlite::memory` for SQLite) over full mocks when testing database-adjacent logic.
- **Stub Clock/Time:** Use `fake timers` (`jest.useFakeTimers()`, `nock` for HTTP timeouts) only when testing time-dependent logic. Restore real timers after each test.
- **Readable Test Setups:** A readable test setup reduces the need for excessive mocking. Build the world the test needs with clear facts, not mechanical steps. Separate setup logic into suite-level fixtures so it serves the whole suite instead of cluttering a single test. This aligns with the principle that a test should be readable like clean code is readable — the reader should instantly understand what is being verified.

---

## 6. CI/CD Test Integration

- **Test Execution Order:** Run unit tests on every PR. Run integration tests on feature branches or nightly. Run E2E tests on merge to main or on tagging releases.
- **Test Timeout Limits:** Set hard timeouts per test suite level. Unit tests: < 10 minutes. Integration tests: < 30 minutes. E2E: < 5 minutes per critical path.
- **Code Coverage Thresholds:** Enforce minimum coverage on critical modules (> 80%) but do not obsess over global coverage percentages. A test that covers 100% of dead code is worse than one that covers 80% of runtime paths.
- **Artifact Retention:** Keep test failure screenshots, traces, and logs for 7 days in CI storage. Enable test result visualization (GitHub Checks, Jira, Slack) for faster triage.
- **Test Environment Parity:** CI test environment must mirror production enough to catch configuration-related failures. Use the same database version, same node/browser versions, same environment variables where possible.
- **Fast, Independent, Self-Validating:** Slow tests get skipped; independent tests prevent cascading failures from shared state. Must pass in CI and on a laptop without network; no environment-dependent flakiness. Result must be a simple boolean (green/red) without manual log evaluation. Write tests just before the production code that makes them pass; writing after often leads to tightly coupled, untestable code. Fast, independent tests are the prerequisite for the CI/CD gate strategy.

---

## 7. Test Maintenance and Refactoring

- **Treat Tests as Production Code:** Tests require the same code review, linting, and refactoring attention as production code. A broken test is a bug report.
- **Refactor Tests with Production Changes:** When production code changes signature or behavior, update the corresponding tests immediately. Do not leave "TODO: fix test later" comments.
- **Delete Redundant Tests:** If a feature is removed, delete its tests. Do not leave orphaned tests that assert removed functionality.
- **Document Test Intent:** Add a one-sentence comment at the top of each test or `describe` block explaining what behavior is being verified and why it matters.
