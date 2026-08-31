# Workflow and Testing Standards Specification

## Role / Authority

- **Role:** Definition of local developer workflow loops, testing execution standards, Git commit conventions, and branch management strategies.
- **Authority:** Primary context reference for developer workflow standards.
- **Must not define:** Physical database indexes or cloud DNS record definitions.

---

## 1. Branching & Commit Standards

- **Branching Model:** `[PLACEHOLDER: BRANCHING_MODEL]` (e.g., Trunk-Based Development, GitHub Flow)
- **Commit Message Format:** Conventional Commits Specification v1.0.0 ([conventionalcommits.org](https://www.conventionalcommits.org))
- **Commit Types:** `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`.

---

## 2. Testing Execution Standards

- **Unit & Integration Testing:** Executed locally prior to opening PRs. See [`testing/test-strategy-and-suites.md`](../testing/test-strategy-and-suites.md).
- **Code Quality Checks:** Static linters and formatters enforced via pre-commit hooks. See [`quality-and-compliance/code-quality-and-static-analysis.md`](../quality-and-compliance/code-quality-and-static-analysis.md).
