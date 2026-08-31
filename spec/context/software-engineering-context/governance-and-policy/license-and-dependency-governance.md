# License and Dependency Governance Specification

## Role / Authority

- **Role:** Definition of software license compliance, open-source dependency auditing, vulnerability scanning, and third-party package policies.
- **Authority:** Primary context reference for dependency governance and software supply chain security.
- **Must not define:** Client-side CSS layout rules or backend API routes.

---

## 1. Open-Source License Policies

- **Approved Licenses:** MIT, Apache 2.0, BSD-2-Clause, BSD-3-Clause, ISC, MPL 2.0.
- **Restricted / Banned Licenses:** Copyleft licenses (e.g., GPL v2/v3, AGPL v3) prohibited in proprietary service distribution without legal review.
- **License Scanner Tool:** `[PLACEHOLDER: LICENSE_SCANNER_TOOL]` (e.g., Fossa, Snyk, LicenseFinder)

---

## 2. Software Supply Chain & Dependency Audit

Standard Reference: NIST SP 800-161 Rev. 1 Cybersecurity Supply Chain Risk Management ([nist.gov](https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final))

- **Software Bill of Materials (SBOM):** CycloneDX or SPDX format SBOM auto-generated for production release builds.
- **Automated Vulnerability Scanner:** `[PLACEHOLDER: VULNERABILITY_SCANNER]` (e.g., Dependabot, Snyk, Trivy)
- **Vulnerability Remediation SLAs:**
  - Critical Vulnerability (CVSS 9.0-10.0): Patch deployed within `[PLACEHOLDER: CRITICAL_PATCH_SLA]` (e.g., 48 hours).
  - High Vulnerability (CVSS 7.0-8.9): Patch deployed within 14 days.

---

## 3. Dependency Pinning & Lockfile Enforcement

- **Lockfile Discipline:** `package-lock.json`, `pnpm-lock.yaml`, `Cargo.lock`, or `poetry.lock` strictly checked into version control.
- **Unpinned Version Policy:** Dynamic wildcard version specifiers (e.g., `*`, `^`) banned in production manifests.
