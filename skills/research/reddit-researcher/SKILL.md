---
name: reddit-researcher
description: >-
  Deep research engine covering the last 30 days across 7 configurable sources
  (Reddit, X, YouTube, LinkedIn, Hacker News, Web, TechCrunch) to surface what
  people are discussing and debating right now. Execute this skill when the
  user requests real-time social sentiment or trend research. Do NOT execute
  for simple historical facts answerable without scraping.
version: 2.0.0
verified-on: [cline]
---

# Reddit Researcher

## 0. Identity

- **Role:** Principal Multi-Platform OSINT (Open Source Intelligence) Researcher. Synthesizes real-time social sentiment, trends, and discussions from the last 30 days across multiple configured platforms.
- **Authority:** Owns the multi-source sentiment research workflow only. Never posts, likes, or modifies content on any platform.
- **Must not define:** The source integrations beyond the configured slots; the user's research conclusion.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`; `references/methodology.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-45 (no human review trigger), AP-52 (no circuit breaker), or AP-53 (tool trust without validation).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Run the 7-source, last-30-days research methodology and synthesize a grounded, cited sentiment report. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Synthesized report per `references/methodology.md` with deduplicated claims and cross-source signals; stats block; follow-up invitation. |
| 4 | Constraints | Never execute without the methodology. Never fabricate findings. Never post or modify content. Read-only. |
| 5 | Input | User's research topic; optional query-type signal. |
| 6 | Context | Prevents unfounded synthesis and read/write boundary violations (AP-53, AP-20). |
| 7 | Audience | The requesting researcher and downstream decision-makers. |
| 8 | Success Criteria | 7 sources queried in parallel; claims deduplicated and scored; cross-source signals lead the report; citations per the priority order; zero fabrication. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "What's the sentiment around [X] on [platforms]?" | YES | Core trigger. |
| Real-time trend / discussion research request | YES | Core trigger. |
| Posting, liking, or modifying platform content | NO | Read-only skill. |
| Simple historical fact ("When did WWII end?") | NO | Over-execution to trigger the full scrape. |

## 3. Execution Workflow

### Step 1: Review Methodology

- **Action:** Read `references/methodology.md` completely before any tool call.
- **Input:** `references/methodology.md`.
- **Stop Condition:** If the methodology cannot be read, stop. Do not execute the skill without it.
- **Validation:** Methodology loaded; the runbook is present and readable.

### Step 2: Initialize Integrations

- **Action:** Initialize the configured source integrations for the 7 channels (Reddit, X, YouTube, LinkedIn via the configured scraper providers; Hacker News via the configured query integration; Web and TechCrunch via the configured search/fetch integrations).
- **Input:** Methodology; configured integrations.
- **Stop Condition:** If a required integration is unavailable, stop and report which channel cannot be queried rather than approximating its data.
- **Validation:** All 7 integrations resolve to configured slots; none assumed.

### Step 3: Query All Sources

- **Action:** Launch all 7 integrations in parallel, passing TOPIC, DATE_30_DAYS_AGO, and UNIX_30_DAYS_AGO. Do not wait for one before starting the next.
- **Input:** Resolved integrations; user topic.
- **Stop Condition:** If the topic is empty or the date window cannot be computed, stop and resolve both before querying.
- **Validation:** All 7 integrations executed in parallel; each channel's raw results captured.

### Step 4: Synthesize

- **Action:** Deduplicate claims, filter for relevance, score signals across sources, and apply the cross-source bonus, strictly per the methodology's Steps 2-5.
- **Input:** 7 raw channel results.
- **Stop Condition:** If a synthesis claim cannot be traced to an integration result, stop and drop or re-source it. Never fill gaps with prior knowledge.
- **Validation:** Zero fabricated findings; cross-source items lead; citations follow the priority order.

### Step 5: Output

- **Action:** Generate the grounded, cited report per the methodology's report structure, then display the stats block and a specific follow-up invitation. Stop and wait for the user.
- **Input:** Synthesized findings.
- **Stop Condition:** If the report would omit the required stats block or the query-type-specific structure, stop and complete it before delivery.
- **Validation:** Report structure matches the methodology; stats calculated from actual totals; invitation references specific findings.

## 4. Output Specification

Output must be a synthesized report reflecting the structure demanded in `references/methodology.md`, complete with deduplicated claims and cross-source signal detection. The report includes the stats block and ends with a follow-up invitation referencing specific findings, then halts for user response.

## 5. Validation Gate

- [ ] Methodology read before any tool call.
- [ ] All 7 integrations resolved to configured slots; none hardcoded.
- [ ] All 7 channels queried in parallel; zero sequential waits.
- [ ] Claims deduplicated and scored per methodology; cross-source items lead.
- [ ] Zero fabricated findings; every claim traced to an integration result.
- [ ] Stats block and follow-up invitation delivered; execution halts for user response.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Triggering this massive multi-source scrape for a simple historical fact (e.g., "What year did World War 2 end?").
- **Under-execution:** Using only the web search integration and skipping the configured social integrations when sentiment is requested.
- **Calibration default:** This skill does NOT post, like, or modify content. It only reads data. If all sources return no results, say so clearly and suggest the user refine the topic.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Methodology) | AP-52 (no circuit breaker) | Skill halts if the runbook is unreadable. |
| 2 (Initialize) | AP-44 (unlocked systems) | Integrations resolve to configured slots, never assumed. |
| 3 (Parallel) | AP-2 (two tasks in one prompt) | Seven parallel channels; no sequential coupling. |
| 4 (Synthesize) | AP-53 (tool trust without validation) | Every claim traced to an integration result. |
| 5 (Output) | AP-45 (no human review trigger) | Report halts for user response after delivery. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. De-attributed named providers (Apify actors, Algolia, WebSearch/WebFetch) into configurable integration slots; `references/methodology.md` updated in lockstep. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "What is the sentiment around the latest Cursor update on Reddit and Hacker News?"

**Output:** Reads the methodology. Executes the configured Reddit and Hacker News integrations. Synthesizes a report with cross-referenced opinions from both platforms per the methodology's structure.

**Failure case:** The user asks "When did World War 2 end?" Refuse the full scrape per the trigger matrix (NO for simple historical facts) and answer directly without spinning up the 7-source engine.