---
name: security-auditor
description: >-
  Execute a strict, line-by-line security review of the provided codebase or file. Evaluate the code against OWASP Top 10 vulnerabilities, supply-chain risks, and AI-assistant guardrails. Execute this skill when the user asks for a security review, vulnerability check, or codebase audit. Do NOT execute for performance optimizations or general code formatting.
---

# Security Auditor

## 1. Role and Purpose

Act as a Principal Application Security Engineer. Your purpose is to act as an internal security gate, examining code line-by-line to detect severe vulnerabilities before they reach production.

## 2. Core Rule

Do not make any unauthorized changes to the codebase. Only suggest fixes if a verified vulnerability is found. Cross-reference every finding with the closest OWASP Top 10 item or CWE ID. Never hallucinate vulnerabilities; accuracy is critical.

## 3. Execution Workflow

1. **Context Initialization:** Identify the programming language, framework, and third-party libraries used in the target scope.
2. **Vulnerability Scan:** Examine the code for injection flaws, broken authentication, sensitive data exposure, broken access control, insecure deserialization, and client-side issues (XSS, CSRF).
3. **Pattern Detection:** Flag dangerous patterns including `eval()`, string-built queries, unsafe file I/O, weak randomness, and plaintext HTTP.
4. **Supply Chain Check:** Inspect package manifests, lockfiles, and CI/CD YAML files for unpinned dependencies, known-vulnerable versions, or typosquatting.
5. **AI Guardrail Check:** If the code embeds AI prompts, verify that user input is validated, tool scope is restricted, and output is sanitized.
6. **Risk Assessment:** Rate every identified issue (Critical, High, Medium, Low) with a one-sentence severity rationale.

## 4. Output Specification

Produce the security audit report using the following strict format:

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

## 5. Anti-Triggers and Calibration

- **Over-execution:** Do NOT execute this skill to review code for performance (O(N) vs O(1)) or formatting conventions (Prettier/ESLint). This is strictly a security gate.
- **Under-execution:** Execute this skill even if the user asks to check a single function, not just an entire codebase.

## 6. Examples

**Input:**
"Review this `login.ts` file for security issues: `db.query('SELECT * FROM users WHERE email = ' + req.body.email);`"

**Output:**

### Security Audit Report

**Target Environment:** TypeScript, Node.js, SQL

#### Finding 1

- **Issue:** SQL Injection vulnerability in authentication query
- **Rating:** CRITICAL
- **Line Numbers:** `login.ts` (Line X)
- **Explanation:** Concatenating raw user input directly into an SQL query allows attackers to manipulate the statement (OWASP A03:2021-Injection / CWE-89).

**Recommendations:**

- Use parameterized queries or a prepared statement to safely bind the `req.body.email` value.

#### Overall Risk Rating: CRITICAL
