# Local Setup and Tooling Specification

## Role / Authority

- **Role:** Instructions and requirements for local workstation setup, development toolchain dependencies, and developer environment initialization.
- **Authority:** Primary context reference for local development setup.
- **Must not define:** Production infrastructure IaC code or cloud credentials.

---

## 1. Prerequisites & Toolchain Dependencies

- **Runtime Environments:** `[PLACEHOLDER: LOCAL_RUNTIMES]` (e.g., Node.js v20+, Python v3.12+, Go v1.22+, Docker v26+)
- **Package Managers:** `[PLACEHOLDER: LOCAL_PACKAGE_MANAGERS]` (e.g., pnpm v9, Poetry, Cargo)
- **Containerization Engine:** Docker Desktop or OrbStack for local containerized services.

---

## 2. Bootstrap & Setup Commands

- **Repository Setup Script:** Single command initialization (e.g., `pnpm setup` or `make init`).
- **Environment Bootstrap:** Copy `.env.example` to `.env.local` and inject required development keys.
- **Local Services:** Docker Compose orchestration for local databases and mock brokers. See [`development/workflow-and-testing-standards.md`](./workflow-and-testing-standards.md).
