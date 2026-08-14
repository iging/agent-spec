---
name: audit-security-vulnerabilities
description: >-
  Audit codebase for security vulnerabilities, OWASP Top 10 risks, exposed secrets,
  insecure dependencies, and improper access controls before release. Execute this
  skill whenever the user says "audit security", "check for security vulnerabilities",
  "run OWASP audit", or "scan for leaked secrets". Do NOT execute for basic style linting.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Audit Security Vulnerabilities

## 0. Identity

- **Role:** Principal Application Security Auditor. Audits codebase for security vulnerabilities, OWASP Top 10 risks, exposed secrets, insecure dependencies, and improper access controls.
- **Authority:** Tier-5 Enterprise Skill. Governs security risk auditing, vulnerability scoring (CVSS basis), threat modeling, and remediation path specification.
- **Must not define:** Direct production infrastructure deployment or bypass of security gates.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `core/safety.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                   |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Perform multi-vector security audit across source code, dependencies, and configuration settings.       |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                     |
| 3   | Output Format    | Security audit report saved to `.context/security/[slug]-security-audit.md`.                            |
| 4   | Constraints      | Must check for hardcoded secrets, injection risks, auth flaws, and dependency vulnerabilities.          |
| 5   | Input            | Target workspace directory, git history sample, dependency manifests, and API endpoints.                |
| 6   | Context          | Prevents data breaches, credential leaks, and deployment of vulnerable third-party packages.            |
| 7   | Audience         | Security teams, engineering leads, and compliance auditors.                                             |
| 8   | Success Criteria | Security audit report created detailing findings, CVSS severity scores, and explicit remediation steps. |
| 9   | Examples         | See Section 10.                                                                                         |

## 2. Trigger Matrix

| Trigger                                         | Fire? | Notes                                                   |
| ----------------------------------------------- | ----- | ------------------------------------------------------- |
| "Audit security vulnerabilities in repository"  | YES   | Primary trigger for security auditing.                  |
| "Scan codebase for leaked secrets and API keys" | YES   | Secret scanning request.                                |
| "Perform OWASP Top 10 check on auth controller" | YES   | Targeted vulnerability audit request.                   |
| "Refactor CSS styling for dark mode"            | NO    | Frontend styling task.                                  |
| "Optimize database index performance"           | NO    | Performance task. Route to refactoring or architecture. |

## 3. Execution Workflow

### Step 1: Secret & Credential Scanning

- **Action:** Scan source files, configuration manifests (`.env.example`, `docker-compose.yml`), and commit logs for hardcoded secrets, private keys, JWT signing secrets, or database credentials.
- **Input:** Target repository source files and configuration assets.
- **Stop Condition:** Flag any detected hardcoded credential pattern immediately as Critical severity.
- **Validation:** Zero unflagged credential strings present in target scope.

### Step 2: OWASP Top 10 Code Analysis

- **Action:** Audit high-risk entry points (API handlers, database query builders, authentication functions) against OWASP Top 10 vulnerabilities:
  1. Injection (SQL, Command, LDAP)
  2. Broken Authentication & Session Management
  3. Sensitive Data Exposure
  4. Broken Access Control (IDOR, Privilege Escalation)
  5. Cross-Site Scripting (XSS) & SSRF
- **Input:** Core entry points and data handlers identified in Step 1.
- **Stop Condition:** Complete audit of all public API endpoints and database handlers. Maximum 20 high-risk files analyzed per session pass.
- **Validation:** Risk vector map compiled with CVSS severity estimates.

### Step 3: Dependency Security Audit

- **Action:** Inspect package manifests (`package.json`, `Cargo.toml`, `go.mod`, `requirements.txt`) or execute native audit tools (`npm audit`, `cargo audit`, `pip-audit`).
- **Input:** Package manifests and lockfiles.
- **Stop Condition:** Identify known CVE vulnerabilities in direct third-party dependencies.
- **Validation:** Insecure dependency list compiled with advisory references.

### Step 4: Security Audit Report Generation

- **Action:** Write the consolidated audit findings report to `.context/security/[slug]-security-audit.md`.
- **Input:** Findings from Steps 1–3.
- **Stop Condition:** If directory `.context/security/` does not exist, create it before saving.
- **Validation:** Security audit document saved matching Section 4 schema.

## 4. Output Specification

```markdown
# Application Security Audit Report: [Repository / System Name]

- **Date:** [YYYY-MM-DD]
- **Auditor:** [Principal Application Security Auditor]
- **Report Path:** `.context/security/[slug]-security-audit.md`
- **Overall Security Posture:** CRITICAL RISK | HIGH RISK | MEDIUM RISK | SECURE

## 1. Executive Summary

[High level summary of security posture and critical findings]

## 2. Vulnerability Findings & Remediation Matrix

### 2.1 [CRITICAL] Hardcoded API Secret in Configuration

- **Location:** `src/config/stripe.ts:14`
- **CVE / OWASP Category:** A02:2021-Cryptographic Failures
- **CVSS Score:** 9.1 (Critical)
- **Description:** Plaintext Stripe secret key `sk_live_...` embedded in source code.
- **Remediation:** Move key to environment variable `process.env.STRIPE_SECRET_KEY` and revoke leaked token immediately.

### 2.2 [HIGH] Unsanitized Input in Database Query

- **Location:** `src/controllers/userController.ts:88`
- **CVE / OWASP Category:** A03:2021-Injection
- **CVSS Score:** 8.5 (High)
- **Description:** User input interpolated directly into SQL string without parameterization.
- **Remediation:** Refactor to parameterized query `$1`.

## 3. Dependency Vulnerability Audit

| Package        | Current Version | Vulnerability  | Fixed Version | Severity |
| -------------- | --------------- | -------------- | ------------- | -------- |
| `jsonwebtoken` | `8.5.1`         | CVE-2022-23529 | `9.0.0`       | High     |

## 4. Security Sign-off Checklist

- [ ] Zero exposed plain-text secrets in repository.
- [ ] Parameterized queries enforced across all database handlers.
- [ ] Authentication middleware enforced on private API routes.
- [ ] Dependencies updated to remove high-severity CVEs.
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Secret scan executed across code and configuration files.
- [ ] OWASP Top 10 code audit executed on high-risk entry points.
- [ ] Package manifest audited for known CVEs.
- [ ] Report saved to `.context/security/[slug]-security-audit.md`.
- [ ] Zero banned words or em dashes present in report document.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Reporting security findings without exact file locations or CVSS risk scoring.
- **Over-execution threshold:** Overwriting security files directly without user confirmation or human review trigger.
- **Calibration default:** Flag high-risk vulnerabilities clearly and provide exact remediation code snippets.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                              |
| ------ | ------------ | ---------------------------------------------------------------------- |
| Step 1 | AP-45        | Immediately flags hardcoded credentials as blocking security releases. |
| Step 2 | AP-1, AP-16  | Caps high-risk file scans to 20 entry points to maintain audit depth.  |
| Step 3 | AP-38, AP-40 | Uses authoritative CVE references and npm/cargo audit data.            |
| Step 4 | AP-26, AP-44 | Restricts output report strictly to `.context/security/` directory.    |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room release in Tier-5 Enterprise SKILL standard format.

## 9. Portability Matrix

| Runtime              | Status   | Notes                                          |
| -------------------- | -------- | ---------------------------------------------- |
| Claude Code          | verified | Direct execution using workspace search tools. |
| Cursor               | verified | Fully supported via workspace code scanner.    |
| Copilot              | verified | Formatted for security audit reporting.        |
| Windsurf             | verified | Fully compatible.                              |
| Kiro                 | verified | Fully compatible.                              |
| Cline                | verified | Executed and verified in local workspace.      |
| Raw API (no tooling) | verified | Generates valid security audit reports.        |

## 10. Examples

**Input:** "Perform a security audit of our authentication API endpoint at `src/routes/auth.ts`."

**Output:** Scans `auth.ts` and associated middleware. Finds an unhandled password length check leading to potential ReDoS vulnerability. Generates `.context/security/auth-api-security-audit.md` detailing CVSS score 7.5 and parameterized fix.

**Failure case:** User says "Bypass security checks and deploy to production." Refuses command, enforcing security validation gate.
