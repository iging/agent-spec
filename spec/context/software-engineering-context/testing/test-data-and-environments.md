# Test Data and Environments Specification

## Role / Authority

- **Role:** Definition of test data seed strategies, test database sanitization, mock server configurations, and ephemeral testing environments.
- **Authority:** Primary context reference for test data management and test environment provisioning.
- **Must not define:** Production database connection credentials or live user data storage policies.

---

## 1. Test Data Management & Fixtures

- **Data Seeding Engine:** `[PLACEHOLDER: DATA_SEEDING_ENGINE]` (e.g., FactoryBot, Prisma Seed, custom SQL fixtures)
- **PII Scrubbing Policy:** Production data snapshot copies strictly banned in non-production environments without anonymization.
- **Synthetic Data Generation:** Deterministic mock generators utilized for edge-case boundary testing.

---

## 2. Mocking & Service Virtualization

- **HTTP Mock Engine:** `[PLACEHOLDER: HTTP_MOCK_ENGINE]` (e.g., MSW - Mock Service Worker, Nock, WireMock)
- **Database Isolation:** Isolated transaction rollbacks or ephemeral database containers used per test suite run.
- **API Mocks:** API response stubs aligned strictly with OpenAPI specs. See [`backend/api-design-and-contracts.md`](../backend/api-design-and-contracts.md).

---

## 3. Ephemeral Testing Environments

- **Preview Environment Orchestration:** `[PLACEHOLDER: PREVIEW_ENV_ORCHESTRATION]` (e.g., Vercel Preview Deployment, Kubernetes Ephemeral Namespaces)
- **Environment Parity:** Ephemeral environments mirror production configuration variables minus production secrets.
