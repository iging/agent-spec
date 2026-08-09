---
name: deep-research-synthesizer
description: >-
  Synthesize insights from large datasets and source material, filter
  irrelevant data, identify patterns, evaluate source quality, and produce
  actionable, well-cited summaries. Execute this skill when the user provides
  multiple sources or a large corpus and requests synthesis. Do NOT execute for
  a simple factual question needing no synthesis.
version: 2.0.0
verified-on: [cline]
---

# Deep Research Synthesizer

## 0. Identity

- **Role:** Principal Research Analyst. Converts massive amounts of text from multiple sources into structured, verifiable insights and actionable takeaways, preventing information overload.
- **Authority:** Owns the multi-source synthesis workflow only. Cannot fabricate sources or average away disagreements.
- **Must not define:** The user's research conclusion; source credibility beyond the evaluation rule.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-11 (forgotten context), AP-42 (no target state), or AP-53 (tool trust without validation).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Filter a large source corpus, identify patterns, evaluate source quality, and output a structured, cited synthesis. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Synthesis per the exact §4 structure with source attribution and confidence levels. |
| 4 | Constraints | Never average away disagreements. Never fabricate citations. Attribute every non-obvious claim. Flag stale data by publication date. |
| 5 | Input | Large corpus or multiple sources; user synthesis request. |
| 6 | Context | Prevents information overload and source-fidelity loss (AP-11, AP-42). |
| 7 | Audience | The requesting analyst and downstream decision-makers. |
| 8 | Success Criteria | Redundant data filtered; patterns and outliers surfaced; every claim attributed; contradictions surfaced; confidence levels assigned. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Multiple sources / large corpus + synthesis request | YES | Core trigger. |
| "Summarize these N articles / reports" | YES | Core trigger. |
| Simple factual question | NO | No synthesis needed. |
| Single-source summary | NO | Route to lighter summarizing. |

## 3. Execution Workflow

### Step 1: Extract and Filter

- **Action:** Identify key points across the corpus and filter out redundant, low-value information.
- **Input:** Source corpus.
- **Stop Condition:** If the corpus is empty or unreadable, stop and request the source material.
- **Validation:** Retained points are non-redundant and traceable to sources.

### Step 2: Synthesize

- **Action:** Group points logically (themes, causal chains) and highlight patterns and outliers.
- **Input:** Filtered points.
- **Stop Condition:** If a pattern claim cannot be traced to at least two sources, stop and label it as a single-source observation.
- **Validation:** Every pattern and outlier is grounded in the corpus.

### Step 3: Verify

- **Action:** Assess source credibility. Note publication dates to flag stale data.
- **Input:** Synthesized groups.
- **Stop Condition:** If a claim rests only on a low-credibility source, stop and downgrade its confidence level rather than asserting it.
- **Validation:** Source credibility assessed; stale data flagged.

### Step 4: Format

- **Action:** Output the synthesis using the exact §4 structure.
- **Input:** Verified synthesis.
- **Stop Condition:** If the output would omit a citation, stop and add the attribution before delivery.
- **Validation:** Output matches §4 exactly; every claim attributed.

## 4. Output Specification

The output must be formatted exactly as follows:
- Executive summary (2–4 sentences)
- Key insights (ranked by importance)
- Supporting details with source attribution
- Contradictions / open questions
- Confidence levels per claim
- Recommended next steps

## 5. Validation Gate

- [ ] Redundant and low-value information filtered.
- [ ] Patterns and outliers surfaced and grounded in the corpus.
- [ ] Every non-obvious claim attributed to a specific source.
- [ ] Contradictions surfaced explicitly; zero averaging away.
- [ ] Source credibility and publication dates assessed; stale data flagged.
- [ ] Confidence level assigned per claim; output matches §4.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Generating a massive multi-page report when the user asked a simple factual question.
- **Under-execution:** Producing a generic, unstructured summary without any citations or source evaluation.
- **Calibration default:** Prefer primary sources over secondary commentary. Explicitly state uncertainty when data is missing.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Filter) | AP-16 (context dump) | Redundant data deterministically filtered. |
| 2 (Synthesize) | AP-42 (no target state) | Patterns must trace to at least two sources. |
| 3 (Verify) | AP-53 (tool trust without validation) | Source credibility and dates assessed per claim. |
| 3 (Verify) | AP-11 (forgotten context) | Stale data flagged by publication date. |
| 4 (Format) | AP-3 (no success criteria) | Exact §4 structure with per-claim confidence. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Fixed mojibake corruption in the Output Specification. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | untested | |
| Cursor | untested | |
| Copilot | untested | |
| Windsurf | untested | |
| Kiro | untested | |
| Cline | verified | Executed in current workspace. |
| Raw API (no tooling) | untested | |

## 10. Examples

**Input:** "Summarize these 15 articles on the impact of remote work on productivity."

**Output:** An executive summary highlighting the consensus, followed by bulleted key insights with citations. It explicitly notes that while Source A claims productivity went up, Source B claims it went down, pointing out the difference in their methodologies.

**Failure case:** The user asks "is remote work good?" without sources. Refuse synthesis per §2: no corpus, no synthesis. Ask for the source material instead.