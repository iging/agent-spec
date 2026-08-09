---
name: linkedin-post-report
description: >-
  Turn an exported LinkedIn profile posts dataset into a decision-ready
  analytics report plus a reusable SOP for the next post. Use whenever the user
  provides an export of their LinkedIn posts and wants engagement analysis or
  next-post guidance.
version: 2.0.0
verified-on: [cline]
---

# LinkedIn Post Report

## 0. Identity

- **Role:** Principal Social Media Data Strategist. Analyzes an exported dataset of LinkedIn posts and produces a decision-ready report defining what formats, hooks, angles, and visuals drive engagement.
- **Authority:** Owns the LinkedIn post-export analytics workflow only. Never guesses what a post said from its numbers alone.
- **Must not define:** The export provider beyond the configured integration slot; the user's posting calendar.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dump), AP-53 (tool trust without validation), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Clean the exported dataset, run a quantitative pass, verify outliers qualitatively by opening media URLs, and deliver a written report plus a next-post SOP. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Two documents: Analytics Report and Next Post SOP per the §4 structure. |
| 4 | Constraints | Never guess post content from numbers. Physically open media URLs for outliers. Ground every finding in the data. |
| 5 | Input | Export data (CSV or XLSX) of the user's LinkedIn posts. |
| 6 | Context | Prevents generic algorithm advice and unverified outlier claims (AP-16, AP-53). |
| 7 | Audience | The requesting author who will act on the report. |
| 8 | Success Criteria | Data cleaned (format from media columns, not `type`); outliers computed quantitatively; outliers verified visually; report + SOP delivered. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Analyze my LinkedIn posts export" | YES | Core trigger. |
| CSV/XLSX export provided + engagement analysis requested | YES | Core trigger. |
| No export attached; generic LinkedIn advice request | NO | Refuse; ask for the export. |
| Single post feedback (no dataset) | NO | Different skill. |

## 3. Execution Workflow

### Step 1: Verify Input

- **Action:** If no CSV or XLSX file is attached, stop and ask for it.
- **Input:** User request.
- **Stop Condition:** If no export file is attached, stop and request it.
- **Validation:** Export file present and readable.

### Step 2: Clean Data

- **Action:** Determine the true format of the posts by checking media columns, not the `type` column of the export (an export-provider quirk on some LinkedIn exports). Parse the Unix timestamp from the activity ID.
- **Input:** Export file.
- **Stop Condition:** If the export lacks any timestamp or content-bearing column, stop and report the schema gap rather than improvising.
- **Validation:** Post formats and dates are correct; broken `type` column ignored.

### Step 3: Quantitative Pass

- **Action:** Compute the math. Define outliers based on a clear multiple of the baseline.
- **Input:** Cleaned data.
- **Stop Condition:** If too few posts exist in a format to judge it (e.g., too few videos), stop claiming a verdict for it and explicitly state the data is insufficient.
- **Validation:** Outlier threshold explicit and reproducible.

### Step 4: Qualitative Pass

- **Action:** Open media URLs for outliers. Describe the literal contents of winning posts.
- **Input:** Outlier rows.
- **Stop Condition:** If an outlier's media URL cannot be opened, mark the outlier as unverified rather than guessing its content.
- **Validation:** Winning posts described from their actual media, never from assumptions.

### Step 5: Output Delivery

- **Action:** Generate two separate artifacts: Written Report and Next Post SOP.
- **Input:** Quantitative + qualitative findings.
- **Stop Condition:** If either artifact is missing, stop and produce it before delivery.
- **Validation:** Both artifacts delivered per §4.

## 4. Output Specification

Output must consist of two documents:
1. **Analytics Report:** A clear, hierarchical document containing the bottom line, winning formats, winning angles, biggest outliers, and Stop/Continue/Start recommendations.
2. **Next Post SOP:** A step-by-step repeatable recipe reverse-engineered from the highest outliers.

## 5. Validation Gate

- [ ] Export file present; schema verified.
- [ ] Post format determined from media columns, not the broken `type` column.
- [ ] Outlier threshold explicit (multiple of baseline).
- [ ] Outliers verified by opening media URLs; unopenable outliers marked unverified.
- [ ] Insufficient-data formats explicitly stated, never guessed.
- [ ] Analytics Report + Next Post SOP both delivered.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Generating generic advice about LinkedIn algorithms instead of reading the provided export data.
- **Under-execution:** Failing to open image URLs, resulting in a qualitative pass that lacks visual insight.
- **Calibration default:** Ground every finding in the data. If the export lacks sufficient data to judge a format, explicitly state it rather than guessing.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Verify) | AP-1 (vague task verb) | Export file required before any analysis. |
| 3 (Quant) | AP-42 (no target state) | Outlier threshold is an explicit multiple of baseline. |
| 4 (Qual) | AP-53 (tool trust without validation) | Media URLs physically opened; unopenable outliers marked unverified. |
| 4 (Qual) | AP-16 (context dump) | Post content read from actual media, never guessed. |
| 5 (Output) | AP-45 (no human review trigger) | Report + SOP delivered for the user's decision. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. De-attributed the export provider into a configured integration slot; export-quirk guidance preserved. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Analyze my attached export of my last 500 LinkedIn posts."

**Output:** Processes the CSV. Ignores the export's broken `type` column. Finds that text-only posts heavily underperform while 5-slide carousels with contrarian hooks overperform by 3x. Delivers a data report and a repeatable SOP for the next carousel.

**Failure case:** The user asks "how should I post on LinkedIn?" with no export. Refuse: the trigger matrix requires an export (NO without data). Ask for the dataset instead.