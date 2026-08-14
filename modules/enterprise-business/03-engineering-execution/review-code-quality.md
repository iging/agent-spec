---
name: review-code-quality
description: >-
  Inspect proposed code changes for correctness, security flaws, performance bottlenecks,
  and adherence to clean-code guidelines before merging. Execute this skill whenever
  the user says "review this code", "code review PR #N", "check code quality", or "audit diff".
  Do NOT execute for writing new feature code from scratch.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Review Code Quality

## 0. Identity

- **Role:** Principal Code Reviewer. Inspects proposed code changes for correctness, security flaws, performance bottlenecks, and adherence to clean-code guidelines.
- **Authority:** Tier-5 Enterprise Skill. Governs code review reports, quality gate enforcement, and change risk scoring.
- **Must not define:** Direct source code generation beyond small illustrative refactoring diffs.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `core/safety.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                        |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------ |
| 1   | Task             | Perform multi-pass review of code diffs across correctness, security, performance, and clean-code standards. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                          |
| 3   | Output Format    | Structured code review report with line-specific feedback, severity ranks, and merge recommendation.         |
| 4   | Constraints      | Must complete all four review passes. Must classify findings by severity (Critical, Major, Minor).           |
| 5   | Input            | Git diff, pull request description, changed file contents, and project coding rules.                         |
| 6   | Context          | Prevents bug regressions, security vulnerabilities, and code smell accumulation in the main branch.          |
| 7   | Audience         | Software developers, engineering managers, and security auditors.                                            |
| 8   | Success Criteria | Detailed code review delivered with clear pass or request-changes recommendation and zero unverified claims. |
| 9   | Examples         | See Section 10.                                                                                              |

## 2. Trigger Matrix

| Trigger                                  | Fire? | Notes                                              |
| ---------------------------------------- | ----- | -------------------------------------------------- |
| "Review code quality in PR #12"          | YES   | Primary trigger for code review.                   |
| "Audit git diff for bugs"                | YES   | Diff inspection request.                           |
| "Check if this change is ready to merge" | YES   | Quality gate review request.                       |
| "Write a feature spec"                   | NO    | Specification task. Route to `write-feature-spec`. |
| "Deploy to production"                   | NO    | Release task. Route to `ship-production-release`.  |

## 3. Execution Workflow

### Step 1: Diff and Context Gathering

- **Action:** Read the target git diff or changed files. Identify modified functions, exports, type signatures, and imports.
- **Input:** Git diff payload, PR description, and modified source files.
- **Stop Condition:** If git diff exceeds 1,000 lines, chunk the diff by directory or file group to ensure complete pass coverage.
- **Validation:** All modified paths cataloged with total diff size recorded.

### Step 2: Multi-Pass Code Analysis

- **Action:** Execute four sequential review passes:
  1. _Pass 1 (Correctness):_ Verify logic flow, edge case handling, off-by-one errors, and null pointer handling.
  2. _Pass 2 (Security):_ Audit for injection flaws, unauthenticated data access, hardcoded secrets, and improper inputs.
  3. _Pass 3 (Performance):_ Identify N+1 database queries, unindexed lookups, memory leaks, and inefficient algorithms.
  4. _Pass 4 (Clean-Code):_ Check naming conventions, dead code, duplicated logic, and module boundary rules in `context/RULES.md`.
- **Input:** Cataloged diff chunks from Step 1.
- **Stop Condition:** Complete all four passes for every changed file before formulating findings.
- **Validation:** Every identified issue classified into Critical, Major, or Minor severity.

### Step 3: Synthesis and Risk Assessment

- **Action:** Calculate overall change risk score (Low, Medium, High, Critical) based on finding severities and affected component criticality.
- **Input:** Aggregated findings from Step 2.
- **Stop Condition:** If any Critical finding exists (e.g., security vulnerability, severe data loss bug), mandate "REQUEST CHANGES".
- **Validation:** Clear merge recommendation established (APPROVE | REQUEST CHANGES | COMMENT).

### Step 4: Review Report Delivery

- **Action:** Format and display the code review report matching Section 4. Provide exact file paths, line numbers, and actionable remediation guidance.
- **Input:** Synthesized findings and merge recommendation from Step 3.
- **Stop Condition:** Stop after delivering the code review report payload.
- **Validation:** Report delivered containing line-specific feedback and explicit merge verdict.

## 4. Output Specification

```markdown
# Code Review Quality Report

- **Target PR / Diff:** [PR #N or Git Branch]
- **Reviewer:** [Principal Code Reviewer]
- **Overall Verdict:** APPROVE | REQUEST CHANGES | COMMENT
- **Risk Score:** Low | Medium | High | Critical

## 1. Summary of Findings

- **Critical:** N issues (Blocking release)
- **Major:** N issues (Should fix before merge)
- **Minor:** N issues (Nitpicks / refactoring suggestions)

## 2. Detailed Line-by-Line Feedback

### `src/services/authService.ts`

- **Line 42 [CRITICAL - Security]:** Unsanitized user input passed directly into SQL query string.
  - **Risk:** SQL Injection risk.
  - **Remediation:** Use parameterized query placeholders `db.query('SELECT * FROM users WHERE id = $1', [userId])`.

- **Line 88 [MAJOR - Correctness]:** Missing error check on async response.
  - **Risk:** Unhandled promise rejection causing server crash.
  - **Remediation:** Wrap invocation in `try/catch` block and return error state.

- **Line 112 [MINOR - Clean Code]:** Variable name `tempVal` is non-descriptive.
  - **Remediation:** Rename to `sessionTokenExpirationTimestamp`.

## 3. Merge Checklist

- [ ] All Critical findings resolved.
- [ ] All Major findings addressed or explicitly deferred.
- [ ] Automated CI test suite passes green.
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Diff gathered and completely scanned across all modified files.
- [ ] All four review passes (Correctness, Security, Performance, Clean Code) completed.
- [ ] Every finding assigned a clear line reference and severity level.
- [ ] Final verdict explicitly stated (APPROVE | REQUEST CHANGES | COMMENT).
- [ ] Zero banned words or em dashes present in review output.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Giving a blanket "looks good to me" without checking correctness or security.
- **Over-execution threshold:** Blocking a PR over subjective style preferences that are not defined in `context/RULES.md`.
- **Calibration default:** Focus feedback on high-severity risks and concrete bugs over superficial nitpicks.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP | Mechanism                                                                 |
| ------ | ----------- | ------------------------------------------------------------------------- |
| Step 1 | AP-16       | Chunks large diffs into manageable file sets.                             |
| Step 2 | AP-1, AP-3  | Enforces multi-pass review structure with strict criteria.                |
| Step 3 | AP-45       | Mandates REQUEST CHANGES verdict whenever Critical vulnerabilities exist. |
| Step 4 | AP-42       | Delivers clear, actionable line-by-line remediation steps.                |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room implementation conforming to Tier-5 Enterprise SKILL standard.

## 9. Portability Matrix

| Runtime              | Status   | Notes                                        |
| -------------------- | -------- | -------------------------------------------- |
| Claude Code          | verified | Direct execution using git tools.            |
| Cursor               | verified | Fully supported via diff reviewer interface. |
| Copilot              | verified | Formatted for PR feedback comments.          |
| Windsurf             | verified | Fully compatible.                            |
| Kiro                 | verified | Fully compatible.                            |
| Cline                | verified | Executed and verified in local workspace.    |
| Raw API (no tooling) | verified | Generates structured review report payloads. |

## 10. Examples

**Input:** "Review this diff where a engineer added user password reset logic."

**Output:** Reads diff. Executes all 4 review passes. Finds a Critical security issue (token comparison uses non-constant time function `==` vulnerable to timing attacks). Marks verdict REQUEST CHANGES with line-specific fix using `crypto.timingSafeEqual()`.

**Failure case:** User says "Approve this PR without reading the diff." Refuses request, enforcing mandatory multi-pass inspection before verdict generation.
