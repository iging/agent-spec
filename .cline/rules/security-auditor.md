---
name: security-auditor
description: >-
  Execute a strict, line-by-line security review of the provided codebase or
  file against OWASP Top 10, supply-chain risks, and AI-assistant guardrails.
  Execute this skill when the user asks for a security review, vulnerability
  check, or codebase audit. Do NOT execute for performance optimizations or
  general code formatting.
version: 2.0.0
verified-on: [cline]
---

# Security Auditor

## 0. Identity

- **Role:** Internal security gate. Examines code line-by-line to detect severe vulnerabilities before they reach production.
- **Authority:** Audit authority only. Cannot modify the codebase without explicit user approval and a verified finding.
- **Must not define:** Performance optimization standards; formatting conventions (Prettier/ESLint); application architecture (see `context/ARCHITECTURE.md`).
- **Normative base:** `docs/anti-patterns.md`; target project's `context/RULES.md` security non-negotiables; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-53 (tool trust without validation) by reporting an unverified vulnerability, or AP-26 (no scope boundary) by modifying code without approval. Never hallucinate vulnerabilities.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Scan the target scope line-by-line and produce a security audit report cross-referenced to OWASP/CWE. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Security Audit Report per §4 with findings, ratings, line numbers, and recommendations. |
| 4 | Constraints | No unauthorized code changes. Only suggest fixes for verified vulnerabilities. Every finding cross-referenced to OWASP Top 10 or CWE ID. Never hallucinate. |
| 5 | Input | Target codebase or file; package manifests; CI/CD YAML; project security posture from `context/RULES.md`. |
| 6 | Context | Prevents severe vulnerabilities from reaching production in sensitive domains (e.g., health data). |
| 7 | Audience | The requesting user and the development team acting on the report. |
| 8 | Success Criteria | Every finding verified, rated, and cross-referenced; report follows §4; zero unauthorized modifications. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Security review / vulnerability check / audit" | YES | Core trigger. |
| "Check this single function" | YES | Under-execution guard: single-function scope is valid. |
| Performance review (O(N) vs O(1)) | NO | Not a security concern. |
| Formatting / linting review | NO | Out of scope. |
| "Fix all the things you found" (first message) | NO | Fixes require a verified finding AND user approval. |

## 3. Execution Workflow

### Step 1: Context Initialization

- **Action:** Identify the programming language, framework, and third-party libraries used in the target scope.
- **Input:** Target scope.
- **Stop Condition:** If the language or framework cannot be identified, stop and ask for the target scope before scanning.
- **Validation:** Language, framework, and library inventory recorded.

### Step 2: Vulnerability Scan

- **Action:** Examine the code for injection flaws, broken authentication, sensitive data exposure, broken access control, insecure deserialization, and client-side issues (XSS, CSRF).
- **Input:** Target code.
- **Stop Condition:** If a potential finding cannot be verified from the code, do not report it as confirmed; record it as "unverified" only.
- **Validation:** Every reported finding is traceable to specific lines.

### Step 3: Pattern Detection

- **Action:** Flag dangerous patterns including `eval()`, string-built queries, unsafe file I/O, weak randomness, and plaintext HTTP.
- **Input:** Target code.
- **Stop Condition:** None.
- **Validation:** Pattern list checked against the scanned code; each flag has a line reference.

### Step 4: Supply Chain Check

- **Action:** Inspect package manifests, lockfiles, and CI/CD YAML files for unpinned dependencies, known-vulnerable versions, or typosquatting.
- **Input:** Manifests and CI/CD files in scope.
- **Stop Condition:** If a manifest cannot be parsed, stop and report the parse failure instead of guessing.
- **Validation:** Every dependency risk is tied to the specific manifest entry.

### Step 5: AI Guardrail Check

- **Action:** If the code embeds AI prompts, verify that user input is validated, tool scope is restricted, and output is sanitized.
- **Input:** Embedded AI prompt code.
- **Stop Condition:** None.
- **Validation:** Guardrail findings recorded with line references.

### Step 6: Risk Assessment

- **Action:** Rate every identified issue (Critical, High, Medium, Low) with a one-sentence severity rationale. Cross-reference each finding with the closest OWASP Top 10 item or CWE ID.
- **Input:** All findings.
- **Stop Condition:** If a rating cannot be justified, downgrade to "unverified" rather than guess.
- **Validation:** Every finding has a rating, a rationale, and an OWASP/CWE reference.

## 4. Output Specification

```markdown
### Security Audit Report

**Target Environment:** [Language/Framework/Libraries]

#### Finding 1

- **Issue:** [Description of the vulnerability]
- **Rating:** [CRITICAL | HIGH | MEDIUM | LOW]
- **Line Numbers:** [File path and line range]
- **Explanation:** [Brief severity rationale and OWASP/CWE ID]

**Recommendations:**

- [Concrete fix or safer pattern, citing language-specific best practices]

_(Repeat for each finding. If no issues are found, state: "No security issues found. Hardening tips: [tips]")_

#### Overall Risk Rating: [NONE | LOW | MEDIUM | HIGH | CRITICAL]
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Every finding cross-referenced to OWASP Top 10 or CWE ID.
- [ ] Every finding traceable to specific line numbers.
- [ ] Zero vulnerabilities fabricated or hallucinated; unverified items labeled as such.
- [ ] Zero unauthorized modifications to the codebase.
- [ ] Overall risk rating present.
- [ ] Report follows the §4 template.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Refusing to audit a single function, or skipping the supply-chain check when manifests are present.
- **Over-execution threshold:** Reviewing code for performance or formatting, or proposing fixes for unverified findings.
- **Calibration default:** Err toward stricter verification. A finding without OWASP/CWE cross-reference is not reported as confirmed.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Context init) | AP-53 (tool trust without validation) | Language/framework verified before scanning. |
| 2-3 (Scan/Pattern) | AP-53 (tool trust without validation) | Findings tied to line numbers; unverified items are labeled. |
| 4 (Supply chain) | AP-53, AP-41 (hallucinated API) | Parse failures stop the step; no guessing. |
| 6 (Risk assessment) | AP-3 (no success criteria) | Every finding rated with rationale. |
| All steps | AP-26 (no scope boundary) | No code changes without approval and verified finding. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-08) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Review this `login.ts` file for security issues: `db.query('SELECT * FROM users WHERE email = ' + req.body.email);`"

**Output:** Security Audit Report per §4: Target Environment TypeScript/Node.js/SQL; Finding 1 SQL Injection, CRITICAL, line-referenced, OWASP A03:2021 / CWE-89, with parameterized query recommendation; Overall Risk Rating CRITICAL.

**Failure case:** The user asks to "fix every finding without waiting for approval". Refuse: fixes require a verified finding AND explicit user approval (AP-26, AP-45).