# Code Ownership and Review Policies Specification

## Role / Authority

- **Role:** Rules for repository code ownership, CODEOWNERS assignments, pull request review gates, and branch protection settings.
- **Authority:** Primary context reference for code review policies and repository governance.
- **Must not define:** Database schema column types or frontend CSS theme variables.

---

## 1. Code Ownership & CODEOWNERS Mapping

- **CODEOWNERS Configuration:** `.github/CODEOWNERS` or `.gitlab/issue_templates/` used to enforce domain team review approvals.
- **Domain Team Assignments:**
  - Infrastructure / IaC: `@team-platform`
  - Core API / Services: `@team-backend`
  - Web & UI Components: `@team-frontend`
  - Security Specifications: `@team-security`

---

## 2. Pull Request Review Gates

- **Minimum Approvals Required:** `[PLACEHOLDER: MIN_PR_APPROVALS]` (e.g., minimum 2 peer code reviews required for production merges).
- **Mandatory CI Checks:** All static analysis, linting, unit tests, and security scanners must pass before merge button enablement.
- **Linear Commit History:** Squash-and-merge or rebase merge policies enforced on default branch.

---

## 3. Branch Protection & Security Governance

- **Protected Branches:** Default branch (`main` / `master`) protected against direct commits or force pushes.
- **Security Scans:** Automated secret scanning and SAST checks executed on every PR. See [`security/security-and-threat-model.md`](../security/security-and-threat-model.md).
