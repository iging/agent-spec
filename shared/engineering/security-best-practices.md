---
name: Security Best Practices
description: Framework-agnostic security standard for authentication, authorization, cryptography, input validation, AI guardrails, network transport, supply chain integrity, and audit logging.
---

# Security Best Practices

> **Purpose:** Universal application security baseline shared across client, server, and cloud tiers. Reference this file when implementing authentication, access control, cryptography, AI safety guardrails, or vulnerability prevention.

---

## Role / Authority

- **Role:** Framework-agnostic baseline security standard for authentication, authorization, data protection, network security, AI guardrails, supply chain integrity, and defense-in-depth across client, server, and cloud applications.
- **Authority:** Tier-3 shared engineering specification applicable across all backend, frontend, API, microservice, and cloud infrastructure architectures.
- **Must not define:** Vendor-specific SaaS configurations or specific framework SDK setup details.

---

## 1. Defense-in-Depth and Zero Trust Architecture

- Enforce the Principle of Least Privilege across all service-to-service, database, and identity access boundaries.
- Treat internal microservice networks as untrusted; authenticate and authorize every request explicitly regardless of origin.
- Fail securely by default. Design access control layers with explicit deny-all fallback rules.

---

## 2. Authentication and Identity Management

- Store user credentials using memory-hard or CPU-hard password hashing algorithms (Argon2id baseline `m=19MB, t=2, p=1` or bcrypt cost factor `>= 10`).
- Enforce OAuth 2.0 and OpenID Connect (OIDC) with Proof Key for Code Exchange (PKCE) for all public clients and single-page applications.
- Issue short-lived, cryptographically signed access tokens (JWTs) with mandatory signature verification, expiration (`exp`), issuer (`iss`), and audience (`aud`) checks.
- Implement Refresh Token Rotation (RTR) with automatic revocation of all associated refresh tokens upon reuse detection.

---

## 3. Authorization and Access Control

- Enforce server-side Role-Based (RBAC) or Attribute-Based (ABAC) access control checks on every API endpoint and data path.
- Prevent Broken Object-Level Authorization (BOLA / IDOR) by scoping resource query lookups directly to the authenticated user's or tenant's explicit context boundary.
- Prevent Broken Function-Level Authorization (BFLA) by enforcing privilege checks at the business logic layer rather than relying exclusively on network or route middleware.

---

## 4. Cryptography and Data Protection

- Enforce TLS 1.3 (or minimum TLS 1.2 with strong cipher suites) for all data in transit. Disable legacy protocols (SSLv3, TLS 1.0, TLS 1.1).
- Protect sensitive data at rest using authenticated symmetric encryption algorithms (AES-256-GCM or ChaCha20-Poly1305) with secure key rotation lifecycle controls.
- Prevent sensitive data leaks by redacting credentials, tokens, PII, and raw connection strings from application logs, metrics, error payloads, and diagnostic dumps.

---

## 5. Input Validation, Sanitization, and Injection Defense

- Validate all incoming network payloads against strict runtime schemas; reject unknown properties and malformed data types.
- Use parameterized SQL queries or prepared statements exclusively to eliminate SQL Injection (SQLi) vulnerabilities.
- Escape and sanitize dynamic data before rendering in HTML context to prevent Cross-Site Scripting (XSS).
- Validate and restrict outbound server requests against explicit domain allowlists to prevent Server-Side Request Forgery (SSRF).
- Set strict payload body size limits and request timeout bounds to prevent Denial of Service (DoS) attacks.

---

## 6. AI Safety and Agentic Guardrails

- Validate and sanitize all user input before passing it into LLM context windows to prevent Direct and Indirect Prompt Injection (OWASP LLM01).
- Restrict AI agent and sub-agent tool execution permissions under strict least-privilege boundaries (OWASP LLM07); require explicit user confirmation for destructive or state-changing tools.
- Treat raw LLM outputs as untrusted data; sanitize and parse outputs with strict runtime schemas before executing code, rendering dynamic UI, or performing database mutations (OWASP LLM02).

---

## 7. Browser, Network Transport, and Header Security

- Implement strict Content Security Policy (CSP) headers without `unsafe-inline` or `unsafe-eval` directives.
- Enforce HTTP Strict Transport Security (HSTS) with `max-age=31536000; includeSubDomains; preload`.
- Scope authentication cookies with `Secure`, `HttpOnly`, `SameSite=Strict` (or `SameSite=Lax` for necessary cross-site navigation), and use `__Host-` cookie prefixes.
- Configure Cross-Origin Resource Sharing (CORS) with explicit origin whitelists. Never allow `Access-Control-Allow-Origin: *` on endpoints accepting credentials.
- Set standard security headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin`.

---

## 8. Supply Chain, Secrets, and SBOM Integrity

- Never commit hardcoded secrets, API keys, or private certificates into source code control. Retrieve secrets at runtime from environment variables or secure key vaults.
- Pin all third-party dependencies with lockfile hash verification; generate Software Bill of Materials (SBOM) artifacts (CycloneDX or SPDX).
- Conduct continuous automated vulnerability scanning of application dependencies against CVE and GHSA databases in CI/CD pipelines.

---

## 9. Security Audit Alignment and Verification Gates

- Conduct line-by-line static analysis auditing of target codebases against OWASP Top 10 items and CWE IDs.
- Require concrete line-number references and severity rationale (Critical, High, Medium, Low) for all reported security findings.
- Distinguish confirmed, verified vulnerabilities from unverified findings to prevent tool hallucination and false positives.
- Maintain immutable, structured JSON security audit logs containing ISO 8601 timestamps, event types, identity subjects, client IP addresses, and request correlation IDs (`X-Request-ID`).
