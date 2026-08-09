---
name: client-brief
description: >-
  Build a one-page pre-meeting research brief on a prospect before a call.
  Execute this skill when the user invokes /client-brief, requests call
  preparation, client research, or meeting intelligence. Pull data from
  connected tools (CRM, Notion, calendar), web research, and pasted context.
  Apply the anti-AI writing constraints from shared/writing-rules.md to the
  final prose. Do NOT execute for scheduling assistance only.
version: 2.0.0
verified-on: [cline]
---

# Client Brief

## 0. Identity

- **Role:** Principal Business Strategist. Generates a strict one-page research brief for meeting preparation that exposes the prospect's intent, leverage points, and friction areas.
- **Authority:** Owns the pre-meeting research brief workflow only. Cannot draft proposals, pricing, or meeting agendas.
- **Must not define:** Proposal content, contract terms, or post-meeting follow-up actions.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-11 (forgotten context), AP-44 (unlocked filesystem), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                          |
| --- | ---------------- | -------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Produce a one-page prospect research brief from connected-tool data, web research, and pasted context.         |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.       |
| 3   | Output Format    | Markdown brief per §4. One page maximum.                                                                       |
| 4   | Constraints      | Never invent names, dates, or numbers. Unconfirmed details are labeled. Pasted context overrides web research. |
| 5   | Input            | User prompt or pasted context; connected tools; web sources.                                                   |
| 6   | Context          | Prevents generic research dumps and fabricated prospect data (AP-1, AP-42).                                    |
| 7   | Audience         | The user preparing for the meeting only.                                                                       |
| 8   | Success Criteria | One-page brief with declared intent, friction, leverage, opening move; all unconfirmed facts labeled.          |
| 9   | Examples         | See §10.                                                                                                       |

## 2. Trigger Matrix

| Trigger                              | Fire? | Notes                     |
| ------------------------------------ | ----- | ------------------------- |
| `/client-brief`                      | YES   | Core trigger.             |
| "Prepare me for this call / meeting" | YES   | Core trigger.             |
| "Research this client / prospect"    | YES   | Core trigger.             |
| Scheduling assistance only           | NO    | Not a research task.      |
| Drafting proposal or contract        | NO    | Different artifact owner. |

## 3. Execution Workflow

### Step 1: Extract Targets

- **Action:** Identify the target company and individual from the prompt or pasted context. If either is missing, ask exactly one clarifying question before proceeding.
- **Input:** User prompt; pasted context.
- **Stop Condition:** If the target is still ambiguous after one question, stop and request a complete company and person identifier.
- **Validation:** Both target identifiers are explicit.

### Step 2: Prioritize Sources

- **Action:** Pull connected-tool data first (CRM, Notion, email, calendar per configured integrations). Execute web research second (company stage, size, recent news, individual background). Pasted context overrides web research in all conflicts.
- **Input:** Connected tools; web sources; pasted context.
- **Stop Condition:** If connected tools are unavailable and web data is absent, stop and mark the brief as research-limited.
- **Validation:** Every claim is traceable to a source tier; conflicts resolved in favor of pasted context.

### Step 3: Assemble the Payload

- **Action:** Extract stated goals, likely objections, and negotiation leverage from the verified data. Record each as a discrete item.
- **Input:** Source-tier data.
- **Stop Condition:** If a stated goal cannot be distinguished from an inferred goal, stop and label it "Unconfirmed."
- **Validation:** All intent, friction, and leverage items are distinct and sourced.

### Step 4: Purify the Prose

- **Action:** Apply the anti-AI writing constraints from `shared/writing-rules.md`. Delete puffery, negative parallelism, and banned vocabulary.
- **Input:** Assembled payload.
- **Stop Condition:** None.
- **Validation:** Zero banned words; zero em dashes; one page or shorter.

### Step 5: Render Output

- **Action:** Deliver the final brief in chat per §4. Do not write a file unless the user requests one.
- **Input:** Purified payload.
- **Stop Condition:** If the brief exceeds one page, stop and compress the friction and leverage sections.
- **Validation:** Brief matches §4 exactly; all unconfirmed facts labeled.

## 4. Output Specification

```markdown
**[Company] - [Person, title] - [meeting date]**
_Meeting: [purpose] · [duration] · [attendees]_

**The 30-Second Read**

[Two sentences defining the core objective and primary focus area.]

**Stakeholder Intelligence**

- **Person:** [Role, decision-making style]
- **Company:** [Stage, size, relevant recent moves]

**Core Intent**

- [The stated request]
- [The underlying unstated interest]

**Friction Points**

- [Specific objection 1] -> [Why they will raise it]
- [Specific objection 2] -> [Why they will raise it]

**Leverage**

- [Advantage held by the user]

**Opening Move**

- [One concrete opening line or framing question]
```

## 5. Validation Gate

- [ ] Both target identifiers explicit; at most one clarifying question asked.
- [ ] Every claim traceable to a source tier; pasted-context conflicts resolved.
- [ ] All unconfirmed details labeled "Unconfirmed."
- [ ] Zero banned words, zero em dashes, one page or shorter.
- [ ] Brief matches §4; user receives it in chat.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Relying on web research alone when connected-tool data exists, or emitting a generic research dump.
- **Over-execution threshold:** Generating a multi-page dossier, drafting a proposal, or scheduling the meeting.
- **Calibration default:** Err toward brevity and connected-tool data over excessive web scraping.

## 7. Anti-Pattern Compliance

| Step        | Prevents AP                         | Mechanism                                            |
| ----------- | ----------------------------------- | ---------------------------------------------------- |
| 1 (Extract) | AP-1 (vague task verb)              | Explicit company and person identifiers required.    |
| 2 (Sources) | AP-11, AP-12 (forgotten/no context) | Source-tier priority forces context capture.         |
| 3 (Payload) | AP-42 (no target state)             | Stated vs inferred intent kept distinct and labeled. |
| 4 (Purify)  | AP-29 (ambiguous verb)              | Deterministic writing-rules pass.                    |
| 5 (Render)  | AP-45 (no human review trigger)     | Chat delivery keeps human in the loop.               |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix. Fixed mojibake corruption in the Output Specification header.

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

**Input:** "Build a brief on John Smith at Acme Corp for our 2pm."

**Output:** A §4 brief with Acme Corp stage and size from web research, John Smith's role and decision style from CRM, stated intent from the calendar invite, friction and leverage items, and a single opening move. Any datum absent from all sources is labeled "Unconfirmed."

**Failure case:** The user asks for a 10-page dossier. Refuse: over-execution per §6. Deliver the one-page brief and offer a follow-up research pass.
