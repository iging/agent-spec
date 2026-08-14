---
name: interrogate-product-demand
description: >-
  Interrogate early-stage product ideas using six forcing questions to expose
  demand reality, user status quo, narrowest wedge, and future fit before writing
  code. Execute this skill whenever the user says "brainstorm this", "is this
  worth building", "help me think through this product", or "office hours". Do NOT
  execute for existing code reviews or bug investigation.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Interrogate Product Demand

## 0. Identity

- **Role:** Product Discovery Lead. Evaluates early product ideas and feature concepts through structured interrogation to validate user demand before engineering begins.
- **Authority:** Tier-5 Enterprise Skill. Governs early discovery and ideation workflows.
- **Must not define:** System architecture details, database schemas, code implementation, or deployment pipelines.
- **Normative base:** `core/decision-framework.md`, `core/output-policy.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                            |
| --- | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Interrogate product ideas through six sequential forcing questions and produce a design specification document.  |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                              |
| 3   | Output Format    | Structured design document saved to `.context/design-docs/[slug]-[branch]-product-concept.md`.                   |
| 4   | Constraints      | Must not touch source code files. Maximum 6 interrogation steps. Must stop for user responses between questions. |
| 5   | Input            | User product concept description, optional competitor links, and user target profile.                            |
| 6   | Context          | Prevents building features or products that lack clear user demand or differentiation.                           |
| 7   | Audience         | Product managers, technical leads, and founders evaluating feature viability.                                    |
| 8   | Success Criteria | Document created containing explicit answers to all six forcing questions with clear go or no-go recommendation. |
| 9   | Examples         | See Section 10.                                                                                                  |

## 2. Trigger Matrix

| Trigger                                      | Fire? | Notes                                          |
| -------------------------------------------- | ----- | ---------------------------------------------- |
| "Brainstorm this idea"                       | YES   | Primary trigger for product discovery.         |
| "Is this worth building?"                    | YES   | Demand evaluation request.                     |
| "Help me think through this product concept" | YES   | Structured product interrogation request.      |
| "Refactor the authentication middleware"     | NO    | Implementation task. Route to coding workflow. |
| "Fix bug in payment gateway"                 | NO    | Debugging task. Route to root-cause debugging. |

## 3. Execution Workflow

### Step 1: Mode Selection and Context Initialization

- **Action:** Read the repository state to determine project context. Present two operating modes to you: Startup Mode (for commercial products needing market demand validation) or Builder Mode (for open-source, hackathon, or internal developer tools). Ask you to select the operating mode.
- **Input:** Current workspace repository structure and your initial product concept statement.
- **Stop Condition:** Wait for your choice between Startup Mode and Builder Mode before continuing.
- **Validation:** Your operating mode choice is recorded as a session variable.

### Step 2: Sequential Forcing Question Interrogation

- **Action:** Ask the six forcing questions one at a time. Wait for your answer before proceeding to the next question.
  1. _Demand Reality:_ What specific evidence proves users need this solution right now?
  2. _Status Quo:_ How do target users solve this problem today without your tool?
  3. _Desperate Specificity:_ Who is the single most desperate user persona for this exact capability?
  4. _Narrowest Wedge:_ What is the absolute smallest version of this product that delivers immediate value?
  5. _Observation:_ What non-obvious insight about user behavior makes this approach work?
  6. _Future Fit:_ How does this narrow wedge expand into a defensible platform over time?
- **Input:** Your responses to each sequential question.
- **Stop Condition:** Pause after each question. Do not combine questions into a single turn.
- **Validation:** All six question responses are collected without missing entries.

### Step 3: Synthesis and Friction Analysis

- **Action:** Analyze your responses to identify contradictions, unverified assumptions, or weak value propositions. Highlight any missing demand evidence or overly broad initial scope.
- **Input:** Collected responses from Step 2.
- **Stop Condition:** If critical demand evidence is missing in Startup Mode, flag the risk to you and ask if you want to revise or proceed.
- **Validation:** Synthesis identifies at least one key strength and one primary adoption risk.

### Step 4: Design Document Generation

- **Action:** Write the validated product concept document to `.context/design-docs/[slug]-[branch]-product-concept.md`. Do not modify any application code files.
- **Input:** Synthesized interrogation results from Step 3.
- **Stop Condition:** If destination directory `.context/design-docs/` does not exist, create it before writing.
- **Validation:** File is saved to disk and contains complete markdown output matching Section 4.

## 4. Output Specification

```markdown
# Product Concept Design Document: [Product Name]

- **Date:** [YYYY-MM-DD]
- **Mode:** [Startup Mode | Builder Mode]
- **Status:** [Validated Concept | High Risk Concept]

## 1. Executive Summary

[Concise summary of the concept and recommendation]

## 2. Demand Interrogation Breakdown

### 2.1 Demand Reality

[Evidence of active user pain and existing demand]

### 2.2 Status Quo

[Current workaround mechanisms used by target audience]

### 2.3 Desperate Specificity

[Exact primary user persona profile]

### 2.4 Narrowest Wedge

[Smallest viable deliverable scope]

### 2.5 Unique Behavioral Observation

[Key insight driving product adoption]

### 2.6 Expansion Path

[Longer term defensive roadmap]

## 3. Risk and Friction Analysis

- **Primary Risk:** [Main adoption blocker]
- **Mitigation:** [Concrete step to reduce risk]

## 4. Recommended Action

- [ ] Proceed to feature specification (`write-feature-spec`)
- [ ] Conduct user interviews before writing code
- [ ] Pivot wedge scope to narrower use case
```

## 5. Validation Gate

Run before declaring completion:

- [ ] All six forcing questions asked sequentially and answered by you.
- [ ] Operating mode selected and recorded.
- [ ] No application code files modified during execution.
- [ ] Design document created at `.context/design-docs/[slug]-[branch]-product-concept.md`.
- [ ] Zero banned words or em dashes present in output.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Proceeding to spec writing without answering all six forcing questions.
- **Over-execution threshold:** Asking technical architecture questions or attempting to generate database schemas during ideation.
- **Calibration default:** Err toward non-execution if the user provides existing complete specs and asks directly for code implementation.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                                                                                 |
| ------ | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Step 1 | AP-1, AP-14  | Forces clear operating mode and audience definition upfront.                                                              |
| Step 2 | AP-6, AP-28  | Sequential one-by-one interrogation prevents broad build-the-whole-thing assumptions and enforces strict stop conditions. |
| Step 3 | AP-38, AP-40 | Flags unverified speculation and requires explicit evidence for demand claims.                                            |
| Step 4 | AP-26, AP-44 | Restricts output strictly to `.context/design-docs/` directory and locks application codebase.                            |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Clean-room release in Tier-5 Enterprise SKILL standard format.

## 9. Portability Matrix

| Runtime              | Status   | Notes                                            |
| -------------------- | -------- | ------------------------------------------------ |
| Claude Code          | verified | Direct execution using standard toolset.         |
| Cursor               | verified | Compatible with workspace file creation.         |
| Copilot              | verified | Formatted for prompt-based execution.            |
| Windsurf             | verified | Fully compatible.                                |
| Kiro                 | verified | Fully compatible.                                |
| Cline                | verified | Executed and validated in workspace environment. |
| Raw API (no tooling) | verified | Works cleanly in standard chat contexts.         |

## 10. Examples

**Input:** "I have an idea for an AI app that auto-generates social media posts for local bakeries. Is this worth building?"

**Output:** Selects Startup Mode. Asks Question 1: "What specific evidence proves local bakery owners are actively looking for automated social media tools right now?" Collects responses through all six questions. Generates `.context/design-docs/bakery-ai-main-product-concept.md` recommending a narrow wedge focused purely on daily menu updates rather than full social management.

**Failure case:** User says "Build a REST API for my bakery app." Skill refuses activation because request is an implementation task, routing user to engineering plan review instead.
