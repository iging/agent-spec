# Batch Site Research Workflow Guide

## 0. Overview

This reference guide defines the execution protocol for batch research orchestration across up to 500 target URLs using `batch-site-research-scaffolder`.

---

## 1. Batch Ingestion and Cohort Partitioning

1. **Target Boundary:** Max 500 URLs per research execution run.
2. **De-duplication:** Normalize input URLs (remove URL query parameters and anchor fragments unless explicitly required) and eliminate duplicate domains.
3. **Cohort Sizing:** Partition target URLs into processing cohorts of 10 to 25 URLs to maintain context window stability and avoid runtime timeouts.
4. **Cohort Metadata:** Assign each cohort an operational tag based on domain type (e.g. Enterprise SaaS, Academic/Educational, E-Commerce, Developer Tooling).

---

## 2. Research Sub-Skill Orchestration Matrix

For each cohort, orchestrate sub-skills according to the target dimension required:

| Target Intelligence Dimension | Sub-Skill Orchestrated | Extracted Data Signals |
|---|---|---|
| Technology Stack & Architecture | `deep-research-synthesizer` | Frontend frameworks, backend services, API styles, hosting infrastructure |
| Domain Reputation & Brand | `social-sentiment-researcher` | 30-day sentiment indicators, community discussions, developer feedback |
| Integrity & Claim Verification | `editorial-fact-checker` | Compliance claims, SSL/TLS posture, OWASP alignment, WCAG accessibility indicators |

---

## 3. Governance Artifact Schemata

Upon completing research across cohorts, synthesize findings into three standardized markdown artifacts:

### 3.1 `context/SITE_INDEX.md`
Catalog of processed targets including domain name, cohort assignment, primary stack components, and last audited date.

### 3.2 `context/STC_ANALYSIS.md`
Detailed Stack, Technology, and Compliance (STC) breakdown detailing:
- Core language and framework distribution percentages across targets.
- Infrastructure and cloud vendor footprint.
- Accessibility (WCAG 2.2 AA) and security compliance observations.

### 3.3 `context/ARCHITECTURE.md` (Updated Context Template)
Incorporates synthesized architectural patterns and integration interfaces into existing workspace context templates, leaving unconfirmed items marked with `[PLACEHOLDER: ...]`.

---

## 4. Resilience and Fallback Protocol

- **Rate Limits & Network Errors:** If an external research source fails or returns rate-limit HTTP status codes, retry twice with exponential backoff. If failure persists, mark the specific domain as `[VERIFICATION_PENDING]` and continue cohort processing.
- **Malformed Content:** Skip unparseable non-HTML/non-JSON endpoints and log the omission in the audit summary.
- **Human Confirmation Gate:** Never write or overwrite workspace files until the user explicitly approves the synthesized blueprint presented in chat.
