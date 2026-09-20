---
name: negotiation
description: >-
  Generate a multi-framework negotiation strategy playbook. Execute this skill
  whenever the user mentions deal prep, pricing strategy, scope discussions,
  contract terms, or preparing for a sales call. Execute if the user asks "how
  should I price this" or "they want to negotiate". Do NOT execute for basic
  scheduling or generic sales coaching.
version: 2.0.0
verified-on: [cline]
---

# Negotiation Scenario Builder

## 0. Identity

- **Role:** Principal Business Strategist. Constructs a negotiation playbook that analyzes a specific deal through 2-3 negotiation frameworks and provides exact tactical language and walk-away thresholds.
- **Authority:** Owns the negotiation playbook workflow only. Cannot place calls, send messages, or commit to terms on the user's behalf.
- **Must not define:** Pricing policy, contract terms, or the final decision to walk away.
- **Normative base:** `shared/writing/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-11 (forgotten context), AP-42 (no target state), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                       |
| --- | ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Generate a playbook analyzing a deal through multiple negotiation frameworks with exact scripts and thresholds.             |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                    |
| 3   | Output Format    | Per-framework playbook sections per §4; no file output unless requested.                                                    |
| 4   | Constraints      | Every tactic maps to the specific deal; never generic advice. Max two clarifying questions. No banned words.                |
| 5   | Input            | Deal context: buyer, offering, budget tension, user goal; optional web research command.                                    |
| 6   | Context          | Prevents generic negotiation filler and hallucinated deal assumptions (AP-1, AP-42).                                        |
| 7   | Audience         | The negotiating user only.                                                                                                  |
| 8   | Success Criteria | One playbook per framework with opening move, pushback pairings, pricing strategy, and walk-away signal; zero generic tips. |
| 9   | Examples         | See §10.                                                                                                                    |

## 2. Trigger Matrix

| Trigger                                              | Fire? | Notes                   |
| ---------------------------------------------------- | ----- | ----------------------- |
| Deal prep / pricing strategy / scope discussion      | YES   | Core trigger.           |
| "How should I price this" / "they want to negotiate" | YES   | Core trigger.           |
| Preparing for a sales call                           | YES   | Core trigger.           |
| Basic scheduling                                     | NO    | Not a negotiation task. |
| Generic sales coaching                               | NO    | Not deal-specific.      |

## 3. Execution Workflow

### Step 1: Extract Deal Context

- **Action:** Identify the buyer, requested offering, budget tension, and the user's ultimate goal. Use a maximum of two clarifying questions if critical context is missing.
- **Input:** User prompt.
- **Stop Condition:** If the deal context remains incomplete after two questions, stop and present the partial context for the user to complete.
- **Validation:** Buyer, offering, budget tension, and goal all explicit.

### Step 2: Research Context (If Requested)

- **Action:** Execute web research on the target company and individual only if the user explicitly commands it. Do not research proactively.
- **Input:** Explicit user command; target identifiers.
- **Stop Condition:** If the user did not request research, skip this step entirely.
- **Validation:** Research either executed on command or omitted.

### Step 3: Select Negotiation Frameworks

- **Action:** Apply the three default frameworks: Tactical Empathy (labeling, mirroring, calibrated questions), Principled Negotiation (interests over positions, objective criteria), and Power/Time/Information (leverage balance). Substitute a framework only when the deal type demands it.
- **Input:** Deal context.
- **Stop Condition:** If a framework cannot map to the deal type, stop and drop that framework rather than forcing it.
- **Validation:** Exactly 2-3 frameworks selected, each applicable to the deal.

### Step 4: Generate the Playbook

- **Action:** For each framework, output the specific opening move, likely pushback, pricing strategy, scope-creep defense, and walk-away signal. Map every item to the extracted deal context.
- **Input:** Deal context; frameworks.
- **Stop Condition:** If any item cannot be mapped to the deal, stop and mark it `[UNSPECIFIED]` instead of inventing a generic tactic.
- **Validation:** Every playbook item is deal-specific; zero generic advice.

### Step 5: Purify the Prose

- **Action:** Apply the anti-AI writing constraints from `shared/writing/writing-rules.md`. Delete banned words and enforce strict active voice.
- **Input:** Draft playbook.
- **Stop Condition:** None.
- **Validation:** Zero banned words; zero em dashes; every script line in active voice.

## 4. Output Specification

```markdown
### [Framework Name] Approach

**Reading the Situation**

[One paragraph analyzing the deal dynamic through this framework.]

**Opening Move**

[Exact language the user can say out loud.]

**Likely Pushback**

- **[Objection 1]:** [Underlying interest] - [Exact counter-response]
- **[Objection 2]:** [Underlying interest] - [Exact counter-response]

**Pricing Strategy**

[Anchor value, concession sequence, hard floor.]

**Walk-Away Signal**

[The specific threshold indicating a dead deal.]
```

## 5. Validation Gate

- [ ] Deal context complete: buyer, offering, budget tension, goal.
- [ ] Exactly 2-3 frameworks applied; each maps to the deal.
- [ ] Every playbook item traces to the deal context; zero generic advice.
- [ ] All script lines in active voice; zero banned words; zero em dashes.
- [ ] Playbook rendered per §4.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Providing one generic negotiation tip instead of the full multi-framework playbook, or skipping deal-context extraction.
- **Over-execution threshold:** Generating pages of framework philosophy without concrete script lines, or researching without an explicit command.
- **Calibration default:** Err toward exact script lines over philosophical explanation.

## 7. Anti-Pattern Compliance

| Step           | Prevents AP                           | Mechanism                                          |
| -------------- | ------------------------------------- | -------------------------------------------------- |
| 1 (Extract)    | AP-1, AP-11 (vague/forgotten context) | Deal-context contract forces four explicit fields. |
| 2 (Research)   | AP-20 (unrequested side effects)      | Web research gated on explicit user command.       |
| 3 (Frameworks) | AP-42 (no target state)               | Framework selection mapped to deal type.           |
| 4 (Generate)   | AP-3 (no success criteria)            | Per-framework playbook with explicit validation.   |
| 5 (Purify)     | AP-29 (ambiguous verb)                | Deterministic writing-rules pass.                  |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. De-attributed expert author names into framework descriptions per spec-reviewer Step 2. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Prep me for my pricing call with the Acme CEO tomorrow."

**Output:** A §4 playbook: deal context extracted (CEO, pricing, budget tension, goal), three frameworks applied, each with an exact opening line, pushback pairings, pricing anchor and floor, and walk-away signal, all mapped to the Acme deal. Zero generic tips.

**Failure case:** The user asks for "some tips before my call" with no deal detail. Refuse generic tips per §6; ask the two clarifying questions for buyer, offering, budget tension, and goal before generating.
