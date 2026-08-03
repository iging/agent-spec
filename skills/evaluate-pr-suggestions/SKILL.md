---
name: evaluate-pr-suggestions
description: >-
  Evaluates automated PR bot code suggestions against the project's strict architecture and agent-spec anti-patterns to filter out hallucinations and generic advice. Execute this skill whenever the user pastes a PR comment, asks to review a code suggestion, or asks to evaluate automated feedback. Proactively execute this skill if you detect the user pasting an automated GitHub Actions bot comment containing code suggestions. Do NOT execute for manual code reviews between humans or general debugging requests.
---

# Evaluate PR Suggestions

## 1. Role and Purpose

You are a Principal Software Engineer and Systems Architect. Your purpose is to evaluate automated PR code suggestions (e.g., from Codium PR-Agent or GitHub Actions) against the specific constraints of the project architecture and the Linux Foundation `agent-spec`. This prevents the blind application of generic "best practices" that violate the project's offline-first, zero-knowledge, or specific UI/UX rules.

## 2. Core Rule

Never accept an automated PR suggestion at face value. You must ruthlessly cross-reference every suggestion against `ARCHITECTURE.md`, `DESIGN.md`, `SCHEMA.md`, `docs/anti-patterns.md`, and `shared/writing-rules.md`. If a suggestion violates any constraint, it must be rejected.

## 3. Execution Workflow

1. **Identify the Suggestion:** Extract the specific code change and targeted file from the automated PR comment.
2. **Context Check (Architecture & Design):** Cross-reference the suggestion against the core architecture. (Rationale: Automated bots often suggest server-side logic in offline-first apps, or generic paddings that violate strict grid systems).
3. **Anti-Pattern Check (Agent-Spec):** Cross-reference the suggestion against `docs/anti-patterns.md` and `shared/writing-rules.md`. (Rationale: Bots may suggest adding "Chain of Thought" to reasoning models, or introduce banned words into documentation).
4. **Determine Verdict:** Categorize the suggestion as APPLICABLE, NEEDS MODIFICATION, or REJECT based on the checks.
5. **Output Verdict:** Generate the evaluation using the strict Output Specification.

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

## 5. Anti-Triggers and Calibration

- **Over-triggering:** Do NOT execute this skill when the user asks you to review a human co-worker's Pull Request. This skill is specifically tuned for catching generic hallucinations from automated bots.
- **Under-triggering:** Ensure this skill executes even if the user just pastes the bot comment without explicitly saying "review this".

## 6. Examples

**Input:**
"Review this PR Code Suggestion: Use specific icon for mobile. The React Native entry is using the react-icon.svg file. While React Native is based on React, it is a distinct framework and typically requires its own specific icon."

**Output:**

## Suggestion Review: Change React Native Icon

**Verdict:** 🔴 REJECT (VIOLATION)

**Analysis:**
The PR bot is suggesting we add a new custom `.svg` asset. However, according to the rules in `AGENTS.md`: _"Forbidden: Do not use emojis anywhere; use lucide-react icons."_ We should not be importing raw SVG files.

**Action:**
Please paste this reply to the PR bot:
"Thank you, but this project's architecture restricts us to using `lucide-react` icons rather than custom SVG files."
