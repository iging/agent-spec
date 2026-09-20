---
name: research
description: >-
  Research group router for research and productivity, routing multi-source synthesis, editorial fact-checking, and social sentiment research requests to specialist sub-skills.
version: 2.0.0
verified-on: [cline]
---

# Research Group Router

## 0. Identity

- **Role:** Research Sub-Group Router and Dispatcher.
- **Authority:** Normative group router for `skills/research-and-productivity/research/`.
- **Must not define:** Direct synthesis, fact verification, or social scraping execution; delegates to sub-skills.
- **Normative base:** `core/decision-framework.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`, `docs/skill-standard.md`.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Classify research requests and dispatch to `deep-research-synthesizer`, `editorial-fact-checker`, `social-sentiment-researcher`, or `batch-site-research-scaffolder`. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Structured routing decision and handoff to target research sub-skill. |
| 4 | Constraints | Router executes no research synthesis or fact checking directly. |
| 5 | Input | User request for multi-source research synthesis, pre-publication fact-checking, 30-day social sentiment analysis, or batch site research. |
| 6 | Context | Prevents ungrounded research claims and unverified publication facts. |
| 7 | Audience | Research analysts, content editors, and intelligence specialists. |
| 8 | Success Criteria | Exactly one target research sub-skill resolved deterministically. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Category | Trigger | Target Skill File Path |
|---|---|---|
| Deep Synthesis | Synthesize insights across multiple sources/corpus, extract patterns & outliers | `research/deep-research-synthesizer/SKILL.md` |
| Editorial Fact Checker | Extract & verify factual claims against primary sources before publication | `research/editorial-fact-checker/SKILL.md` |
| Social Sentiment | Execute 7-source 30-day social sentiment OSINT research runbook | `research/social-sentiment-researcher/SKILL.md` |
| Batch Site Research | Ingest up to 500 URLs, orchestrate research sub-skills, scaffold governance context | `research/batch-site-research-scaffolder/SKILL.md` |

## 3. Execution Workflow

### Step 1: Analyze Request

- **Action:** Classify request into deep synthesis, editorial fact-checking, or social sentiment research.
- **Input:** User prompt text.
- **Stop Condition:** Ask user if intent is ambiguous.
- **Validation:** Matches Trigger Matrix.

### Step 2: Resolve Target

- **Action:** Select target sub-skill path under `skills/research-and-productivity/research/`.
- **Input:** Trigger Matrix.
- **Stop Condition:** Decline execution if out of scope.
- **Validation:** Target SKILL.md exists.

### Step 3: Handoff

- **Action:** Delegate control to target SKILL.md.
- **Input:** Resolved target.
- **Stop Condition:** Handoff control.
- **Validation:** Sub-skill executes.

## 4. Output Specification

```json
{
  "group": "research",
  "target_skill": "skills/research-and-productivity/research/social-sentiment-researcher/SKILL.md"
}
```

## 5. Validation Gate

- [ ] Research intent mapped to target sub-skill path.
- [ ] Target SKILL.md exists on disk.
- [ ] Router executes no research logic directly.

## 6. Anti-Triggers

- **Under-execution:** Publishing claims without primary-source verification.
- **Over-execution:** Running 7-source scraper engine for simple historical facts.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|---|---|---|
| 1 | AP-1 (vague task) | Demands classification before handoff. |
| 3 | AP-4 (over-permissive) | Group router delegates execution to sub-skills. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` — Research group router created for `skills/research-and-productivity/research/`.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---|---|---|
| Claude Code | verified | Research sub-skill dispatcher. |
| Cursor | verified | Research rules routing. |
| Copilot | verified | Custom instructions. |
| Windsurf | verified | Research directive routing. |
| Kiro | verified | Skill runner handoff. |
| Cline | verified | System prompt loading. |
| Raw API | verified | Model-agnostic research router. |

## 10. Examples

**Input:** "Fact-check this draft newsletter before we send it out to subscribers."
**Output:** Target `skills/research-and-productivity/research/editorial-fact-checker/SKILL.md`.
