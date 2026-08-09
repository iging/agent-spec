---
name: evaluate-pr-suggestions
description: >-
  Evaluates automated PR bot code suggestions against the project's strict architecture and agent-spec anti-patterns to filter out hallucinations and generic advice. Execute this skill whenever the user pastes a PR comment, asks to review a code suggestion, or asks to evaluate automated feedback. Proactively execute this skill if you detect the user pasting an automated GitHub Actions bot comment containing code suggestions. Do NOT execute for manual code reviews between humans or general debugging requests.
version: 2.0.0
verified-on: [cline]
---

# Evaluate PR Suggestions

## 0. Identity

- **Role:** Principal Software Engineer and Systems Architect. Evaluates automated PR code suggestions against the project's constraint documents, preventing the blind application of generic "best practices" that violate project-specific rules.
- **Authority:** Owns the automated-suggestion evaluation workflow only. Never evaluates human code reviews.
- **Must not define:** The project's architecture itself; manual code review between humans.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`; `references/REVIEW-SOURCES.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dump), AP-29 (ambiguous verb), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                                                                                            |
| --- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Extract the suggestion, cross-reference it against the review sources (mandatory + project-specific), determine the verdict (APPLICABLE / NEEDS MODIFICATION / REJECT), and output per the strict specification. |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                                                                                                         |
| 3   | Output Format    | Markdown evaluation per the Output Specification template.                                                                                                                                                       |
| 4   | Constraints      | Never accept an automated suggestion at face value. If a suggestion violates any listed constraint, it must be rejected.                                                                                         |
| 5   | Input            | An automated PR bot comment containing a code suggestion.                                                                                                                                                        |
| 6   | Context          | Prevents blind application of generic bot advice (AP-16, AP-29).                                                                                                                                                 |
| 7   | Audience         | The user who must decide whether to apply the suggestion.                                                                                                                                                        |
| 8   | Success Criteria | Every suggestion cross-referenced against all review sources; verdict determined; precise action (edits, modified code, or polite rejection message) produced.                                                   |
| 9   | Examples         | See §10.                                                                                                                                                                                                         |

## 2. Trigger Matrix

| Trigger                                            | Fire? | Notes                                     |
| -------------------------------------------------- | ----- | ----------------------------------------- |
| User pastes a PR bot comment with code suggestions | YES   | Core trigger, even without "review this". |
| "Review this PR code suggestion"                   | YES   | Core trigger.                             |
| Human co-worker PR review                          | NO    | Out of scope.                             |
| General debugging request                          | NO    | Out of scope.                             |

## 3. Execution Workflow

### Step 1: Identify Suggestion

- **Action:** Extract the specific code change and the targeted file from the automated PR comment.
- **Input:** Automated PR comment.
- **Stop Condition:** None.
- **Validation:** Suggestion and target file isolated.

### Step 2: Load Review Sources

- **Action:** Read `references/REVIEW-SOURCES.md` to load the mandatory sources (AGENTS.md, anti-patterns, writing-rules) and the project-specific architecture/design/schema documents filled in by the adopter.
- **Input:** `references/REVIEW-SOURCES.md`.
- **Stop Condition:** Do not skip this step — sources must be loaded before any verdict.
- **Validation:** All review sources identified.

### Step 3: Cross-Reference Checks

- **Action:** Check the suggestion against the architecture/design constraints first, then against the anti-pattern and writing rules. Quote the specific rule for any violation.
- **Input:** Suggestion + review sources.
- **Stop Condition:** If a suggestion violates any constraint, it is not accepted — record the violation and proceed to REJECT.
- **Validation:** Every source consulted; violations quoted.

### Step 4: Determine Verdict

- **Action:** Categorize the suggestion: APPLICABLE, NEEDS MODIFICATION, or REJECT based on the checks.
- **Input:** Cross-reference results.
- **Stop Condition:** None.
- **Validation:** Verdict matches the evidence.

### Step 5: Output Verdict

- **Action:** Generate the evaluation using the strict Output Specification.
- **Input:** Verdict + analysis + action.
- **Stop Condition:** None.
- **Validation:** Output follows the template exactly.

## 4. Output Specification

```markdown
## Suggestion Review: [Brief summary of suggestion]

**Verdict:** 🟢 APPLICABLE | 🟡 NEEDS MODIFICATION | 🔴 REJECT (VIOLATION)

**Analysis:**
[Explain why the suggestion passes or fails based purely on the project's architecture and agent-spec rules. Quote the specific rule it violates if rejecting.]

**Action:**
[If Applicable: Propose the precise file edits to apply it.]
[If Needs Modification: Provide the modified, compliant code.]
[If Reject: Provide a polite rejection message the user can paste back into the GitHub PR comment.]
```

## 5. Validation Gate

- [ ] Suggestion and target file extracted from the PR comment.
- [ ] `references/REVIEW-SOURCES.md` loaded (mandatory + project-specific sources).
- [ ] Cross-referenced against architecture/design, then anti-patterns and writing rules.
- [ ] Violation rules quoted for any REJECT; compliant edits/modified code for ACCEPT/MODIFY.
- [ ] Verdict is one of APPLICABLE / NEEDS MODIFICATION / REJECT.
- [ ] Output follows the strict Output Specification template.

## 6. Anti-Triggers and Calibration

- **Over-triggering:** Do NOT execute this skill when the user asks to review a human co-worker's Pull Request. This skill is specifically tuned for catching generic hallucinations from automated bots.
- **Under-triggering:** Execute this skill even if the user just pastes the bot comment without explicitly saying "review this".
- **Calibration:** Every suggestion is cross-referenced against the project's own constraint documents, never evaluated on generic "best practice" merit alone.

## 7. Anti-Pattern Compliance

| Step                | Prevents AP                     | Mechanism                                                             |
| ------------------- | ------------------------------- | --------------------------------------------------------------------- |
| 2 (Load)            | AP-16 (context dump)            | Review sources are the bounded constraint set, not free-form context. |
| 3 (Cross-Reference) | AP-1 (vague task verb)          | Architecture → anti-pattern → writing-rule checks are explicit.       |
| 4 (Verdict)         | AP-3 (no success criteria)      | Three deterministic verdict buckets with quoted-rule evidence.        |
| 5 (Output)          | AP-45 (no human review trigger) | User receives an actionable reply to paste back into the PR.          |
| 5 (Output)          | AP-29 (ambiguous verb)          | Each verdict maps to exactly one action type.                         |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. **Parameterized:** replaced hardcoded project file paths (`context/ARCHITECTURE.md`, `DESIGN.md`, `SCHEMA.md`) with `references/REVIEW-SOURCES.md` (mandatory sources + adopters fill project-specific placeholders). Replaced the PillSync-specific example with a portable generic one. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime              | Status   | Notes                          |
| -------------------- | -------- | ------------------------------ |
| Claude Code          | untested |                                |
| Cursor               | untested |                                |
| Copilot              | untested |                                |
| Windsurf             | untested |                                |
| Kiro                 | untested |                                |
| Cline                | verified | Executed in current workspace. |
| Raw API (no tooling) | untested |                                |

## 10. Examples

**Input:** "Review this PR bot suggestion: 'The API client uses `fetch` directly. Consider migrating to axios for interceptors.'"

**Output:**

## Suggestion Review: Migrate fetch to axios

**Verdict:** 🟡 NEEDS MODIFICATION

**Analysis:** The project's `AGENTS.md` forbids nonstandard networking layers without explicit approval, but it does not ban interceptors outright. The suggestion is partially compliant — an interceptor use case exists (auth token refresh), so a `fetch` wrapper with an interceptor pattern would satisfy the same need without a dependency change.

**Action:** Provide the modified, compliant code using the project's existing `fetch` wrapper with an interceptor function, no new dependency.
