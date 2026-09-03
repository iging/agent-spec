---
name: research-and-productivity
description: >-
  Root router for the Research & Productivity module, routing learning, productivity, and research requests to specialist sub-group routers and Tier-5 skills.
version: 2.0.0
verified-on: [cline]
---

# Research & Productivity Router

## 0. Identity

- **Role:** Research & Productivity Module Router and Dispatcher.
- **Authority:** Tier-5 normative root skill for `skills/research-and-productivity/`.
- **Must not define:** Direct skill execution or domain task implementation; delegates to sub-group routers or specialist sub-skills.
- **Normative base:** `core/decision-framework.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`, `docs/skill-standard.md`.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Classify user intent across learning, productivity, and research domains and dispatch to target skill or group router. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Structured routing decision and handoff to target sub-skill or group router. |
| 4 | Constraints | Router executes no domain-level task directly. |
| 5 | Input | User request related to interviewing, coaching, spreadsheets, ADHD adaptation, research synthesis, fact-checking, or sentiment analysis. |
| 6 | Context | Prevents unguided task execution and misdirected domain workflows. |
| 7 | Audience | Autonomous developer agents, research analysts, and productivity users. |
| 8 | Success Criteria | Request routed to target specialist skill or group router cleanly. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Domain Group | Trigger | Target Router / Skill Path |
|---|---|---|
| Learning | Interviewing user for build spec before non-trivial build | `learning/build-spec-interviewer/SKILL.md` |
| Learning | Step-by-step coaching for beginners | `learning/step-by-step-coach/SKILL.md` |
| Learning Group | General learning, coaching, or pre-build spec requests | `learning/SKILL.md` |
| Productivity | Formatting Excel spreadsheets & dashboards visually | `productivity/spreadsheet-style-formatter/SKILL.md` |
| Productivity | Structuring replies for ADHD cognitive adapter | `productivity/adhd-communication-adapter/SKILL.md` |
| Productivity | Programmatic Excel data manipulation & formulas | `productivity/excel-data-engine/SKILL.md` |
| Productivity Group | General spreadsheet, data engine, or communication requests | `productivity/SKILL.md` |
| Research | Multi-source corpus synthesis and insight extraction | `research/deep-research-synthesizer/SKILL.md` |
| Research | Claim-by-claim editorial fact checking | `research/editorial-fact-checker/SKILL.md` |
| Research | 7-source 30-day social sentiment research | `research/social-sentiment-researcher/SKILL.md` |
| Research | Batch research up to 500 URLs, extract stack/reputation, scaffold context | `research/batch-site-research-scaffolder/SKILL.md` |
| Research Group | General research, fact-checking, or sentiment requests | `research/SKILL.md` |

## 3. Execution Workflow

### Step 1: Analyze Request

- **Action:** Classify user request into learning, productivity, or research domain groups.
- **Input:** User prompt text.
- **Stop Condition:** Ask user if target domain is ambiguous.
- **Validation:** Matches Trigger Matrix row.

### Step 2: Resolve Target

- **Action:** Select target sub-skill or sub-group router under `skills/research-and-productivity/`.
- **Input:** Trigger Matrix.
- **Stop Condition:** Decline execution if request is out of scope.
- **Validation:** Target file exists on disk.

### Step 3: Handoff

- **Action:** Delegate control to target SKILL.md.
- **Input:** Resolved target path.
- **Stop Condition:** Handoff control.
- **Validation:** Sub-skill or sub-group router executes.

## 4. Output Specification

```json
{
  "module": "research-and-productivity",
  "target_skill": "skills/research-and-productivity/learning/build-spec-interviewer/SKILL.md"
}
```

## 5. Validation Gate

- [ ] Intent mapped to target sub-skill or group router.
- [ ] Target file exists on disk.
- [ ] Router executes no domain logic directly.

## 6. Anti-Triggers

- **Under-execution:** Bypassing pre-build interview for non-trivial app requests.
- **Over-execution:** Triggering a 7-source social scrape for simple historical fact questions.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|---|---|---|
| 1 | AP-1 (vague task) | Enforces domain classification before handoff. |
| 3 | AP-4 (over-permissive) | Root router cannot execute sub-skill tasks directly. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` — Module root router created for `skills/research-and-productivity/`.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---|---|---|
| Claude Code | verified | Module root dispatcher. |
| Cursor | verified | Module rules routing. |
| Copilot | verified | Custom instructions. |
| Windsurf | verified | Directive routing. |
| Kiro | verified | Skill runner handoff. |
| Cline | verified | System prompt loading. |
| Raw API | verified | Model-agnostic module router. |

## 10. Examples

**Input:** "Interview me before building my new app idea."
**Output:** Target `skills/research-and-productivity/learning/build-spec-interviewer/SKILL.md`.
