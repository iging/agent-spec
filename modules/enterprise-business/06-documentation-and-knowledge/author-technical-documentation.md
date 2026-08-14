---
name: author-technical-documentation
description: >-
  Author and maintain clear, accurate technical documentation, API specifications,
  architecture guides, and onboarding manuals. Execute this skill whenever the user says
  "author documentation", "write API docs", "update architecture guide", or "write user manual".
  Do NOT execute for code implementation tasks.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Author Technical Documentation

## 0. Identity

- **Role:** Lead Technical Staff Writer. Authors and maintains clear, accurate technical documentation, API specifications, architecture guides, and onboarding manuals.
- **Authority:** Tier-5 Enterprise Skill. Governs technical document structure, API documentation standards, user guides, and documentation style compliance.
- **Must not define:** Source code implementations or release tag commands.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                           |
| --- | ---------------- | ----------------------------------------------------------------------------------------------- |
| 1   | Task             | Author technical documentation following structured Diátaxis or Role/Authority frameworks.      |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.             |
| 3   | Output Format    | Markdown documentation file saved under `docs/`, `.context/`, or target repository folder.      |
| 4   | Constraints      | Must follow spartan writing rules. Zero banned words. Zero em dashes. Zero semicolons in prose. |
| 5   | Input            | Target subject matter, source code, API schemas, or architectural notes.                        |
| 6   | Context          | Prevents outdated documentation, ambiguous API references, and fragmented project onboarding.   |
| 7   | Audience         | Software developers, API integrators, system operators, and technical stakeholders.             |
| 8   | Success Criteria | Technical document delivered matching Section 4 schema with zero writing rule violations.       |
| 9   | Examples         | See Section 10.                                                                                 |

## 2. Trigger Matrix

| Trigger                                           | Fire? | Notes                                                    |
| ------------------------------------------------- | ----- | -------------------------------------------------------- |
| "Author technical documentation for API endpoint" | YES   | Primary trigger for documentation authoring.             |
| "Write architecture guide for new adopters"       | YES   | System guide request.                                    |
| "Update onboarding manual in docs/"               | YES   | User manual request.                                     |
| "Implement the Node.js API controller"            | NO    | Feature coding. Route to `write-code-implementation`.    |
| "Debug database connection error"                 | NO    | Debugging task. Route to `execute-root-cause-debugging`. |

## 3. Execution Workflow

### Step 1: Subject Matter & Audience Analysis

- **Action:** Inspect target source files, API definitions, or architecture context. Determine the target document classification based on Diátaxis framework (Tutorial, How-To Guide, Reference, Explanation).
- **Input:** Source code, API schemas, or system specifications.
- **Stop Condition:** Limit background context reading to 10 files maximum.
- **Validation:** Document classification, audience role, and key objectives identified.

### Step 2: Content Structuring & Drafting

- **Action:** Outline and write the document following the Role/Authority pattern or structured technical template. Maintain spartan prose, active voice, short sentences, and explicit code blocks.
- **Input:** Target subject analysis from Step 1.
- **Stop Condition:** Strictly enforce writing constraints. Zero banned words, zero em dashes, zero semicolons in prose, zero hashtags in prose.
- **Validation:** Full document draft created matching structural requirements.

### Step 3: Verification & Accuracy Audit

- **Action:** Verify all code examples, API endpoint URLs, schema definitions, and file paths against actual source code to ensure 100% technical accuracy.
- **Input:** Draft document and actual workspace source code.
- **Stop Condition:** If any code example is outdated or inaccurate, update example to match source code reality.
- **Validation:** Code examples and references confirmed valid against codebase.

### Step 4: Documentation Artifact Delivery

- **Action:** Save the completed technical document to the target path (e.g., `docs/api-guide.md`, `.context/docs/[slug]-guide.md`).
- **Input:** Verified document from Step 3.
- **Stop Condition:** Stop after writing file to disk and presenting delivery summary.
- **Validation:** Document written to target file path.

## 4. Output Specification

````markdown
# [Technical Document Title]

- **Classification:** Reference | How-To Guide | Tutorial | Explanation
- **Author:** [Lead Technical Staff Writer]
- **Target Audience:** Developers | System Operators | Integrators
- **Document Path:** `[docs/path/file.md]`

## 1. Executive Summary

[Concise, high-level summary of the documented component or process]

## 2. System Overview & Prerequisites

- **Required Runtimes:** [e.g., Node.js v18+, PostgreSQL 14+]
- **Configuration Dependencies:** [Required environment variables]

## 3. Core Technical Reference / Step-by-Step Guide

### Step 1: Initialization

[Clear explanation with code block]

```bash
$ npm install @company/sdk
```
````

### Step 2: API Usage Example

```typescript
import { Client } from "@company/sdk";
const client = new Client({ apiKey: process.env.API_KEY });
```

## 4. Troubleshooting & Common Pitfalls

- **Issue:** `UNAUTHORIZED_KEY_ERROR`
  - **Resolution:** Verify `API_KEY` is present in environment variables.

```

## 5. Validation Gate

Run before declaring completion:

- [ ] Diátaxis framework classification assigned.
- [ ] Code examples verified against actual source code.
- [ ] Writing constraints enforced (zero banned words, zero em dashes).
- [ ] Document saved to target file path.
- [ ] Zero unverified claims or placeholders present in output.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Writing vague prose without concrete code examples or file path references.
- **Over-execution threshold:** Refactoring production source code or adding new API endpoints while writing documentation.
- **Calibration default:** Focus on accuracy, clarity, and spartan prose formatting.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| Step 1 | AP-1, AP-16 | Caps context reading scan to 10 source files. |
| Step 2 | AP-42 | Enforces spartan prose rules and structural Diátaxis templates. |
| Step 3 | AP-38, AP-40 | Verifies every code snippet against source code files. |
| Step 4 | AP-26, AP-44 | Writes documentation strictly to specified output paths. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room implementation conforming to Tier-5 Enterprise SKILL standard.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct execution using standard file tools. |
| Cursor | verified | Fully supported via workspace editor. |
| Copilot | verified | Formatted for step-by-step documentation writing. |
| Windsurf | verified | Fully compatible. |
| Kiro | verified | Fully compatible. |
| Cline | verified | Executed and verified in local workspace. |
| Raw API (no tooling) | verified | Generates valid markdown technical documents. |

## 10. Examples

**Input:** "Author technical documentation for our REST API payment webhooks."

**Output:** Reads `src/routes/webhooks.ts`. Categorizes document as API Reference. Authors `docs/payment-webhooks.md` with request schemas, signature verification code snippets, and HTTP response codes.

**Failure case:** User says "Use fluffy, marketing-style prose to describe the API endpoints." Refuses marketing prose, enforcing spartan technical writing standards.

```
