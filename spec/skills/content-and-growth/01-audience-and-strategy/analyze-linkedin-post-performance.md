---
name: analyze-linkedin-post-performance
description: >-
  Parse exported LinkedIn post metrics CSV datasets to identify top hook structures,
  format conversion rates, engagement outliers, and content topics to scale.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Analyze LinkedIn Post Performance

## 0. Identity

- **Role:** Social Analytics & Content Intelligence Analyst.
- **Authority:** Tier-5 Enterprise Skill for social media performance audit.
- **Must not define:** Direct analytics API integration or automated social publishing.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|---|---|
| 1 | Task | Audit raw LinkedIn export dataset, extract performance metrics, and generate action plan. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Analytics report document saved to `.context/analytics/[date]-linkedin-performance.md`. |
| 4 | Constraints | Must follow spartan writing rules. Zero em dashes, zero fluff, zero unverified assumptions. |
| 5 | Input | CSV export containing impressions, engagements, clicks, hook text, and post dates. |
| 6 | Context | Prevents vanity metric chasing, inaccurate performance conclusions, and random content posting. |
| 7 | Audience | Content leads, executive marketers, and growth engineers. |
| 8 | Success Criteria | Top 10% posts identified by engagement rate and actionable hook breakdown produced. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger Pattern | Fire? | Target Action |
|---|---|---|
| "Analyze LinkedIn post performance export" | YES | Parse dataset metrics and output performance report. |
| "Audit social analytics CSV file" | YES | Execute statistical breakdown on post impressions and clicks. |
| "Identify top converting post hooks" | YES | Group hooks by engagement multiplier and format type. |
| "Write React frontend button component" | NO | Engineering task. Route to implementation skill. |

## 3. Execution Workflow

### Step 1: Data Parsing & Normalization
- **Action:** Read CSV data. Extract post published date, hook text, post format (text, image, carousel, link), impressions, reactions, comments, and re-shares.
- **Input:** CSV export file path.
- **Stop Condition:** Stop if file is missing required metrics columns.
- **Validation:** Engagement rate calculated per post as `(reactions + comments + reshares) / impressions`.

### Step 2: Cohort & Format Segmentation
- **Action:** Group posts by format type and calculate mean impressions and median engagement rates. Identify statistical top 10% outliers.
- **Input:** Normalized metric records from Step 1.
- **Stop Condition:** Stop if total post count is less than 5 records.
- **Validation:** Formats sorted by engagement efficiency rather than total raw impressions.

### Step 3: Actionable Insights & Content Strategy Synthesis
- **Action:** Extract hook patterns from top performing cohort. Recommend 3 content categories to scale and 2 formats to deprecate.
- **Input:** Cohort analysis from Step 2.
- **Stop Condition:** Stop if recommendations lack concrete data evidence.
- **Validation:** Recommendations tie directly to parsed numerical metrics.

## 4. Output Specification

```markdown
# LinkedIn Performance Audit Report

## 1. Metric Overview
- Total Posts Analyzed: 45
- Total Impressions: 124,500
- Median Engagement Rate: 3.4%

## 2. Top Performing Cohort (Top 10%)
| Post Hook | Format | Impressions | Engagement Rate | Key Driver |
|---|---|---|---|---|
| "We replaced Redis with SQLite..." | Text + Code | 18,200 | 7.8% | Technical controversial claim |

## 3. Strategy Recommendations
- Scale: Text + Code snippets (7.8% avg engagement rate).
- Deprecate: External link previews (0.9% avg engagement rate).
```

## 5. Validation Gate

- [ ] Data parsed without math calculation errors.
- [ ] Top cohort selected using engagement rate rather than raw impression volume alone.
- [ ] Report strictly saved to `.context/analytics/` directory.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Summarizing post counts without calculating engagement rates or extracting hook patterns.
- **Over-execution threshold:** Building speculative statistical predictive models on tiny datasets under 10 posts.
- **Calibration default:** Provide clear metric tables, format breakdowns, and practical content adjustments.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|---|---|---|
| Step 1 | AP-1, AP-16 | Restricts file access strictly to user-provided CSV dataset path. |
| Step 2 | AP-4, AP-38 | Computes hard mathematical rates instead of subjective performance guesses. |
| Step 3 | AP-26, AP-44 | Restricts output report file creation strictly to `.context/analytics/` directory. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial release conforming to Tier-5 Enterprise SKILL standard.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---|---|---|
| Claude Code | verified | Direct workspace execution. |
| Cursor | verified | Supported via rule file. |
| Copilot | verified | Custom analytics instruction support. |
| Windsurf | verified | Fully compatible. |
| Kiro | verified | Fully compatible. |
| Cline | verified | Verified in active workspace. |
| Raw API | verified | Accurate data parsing. |

## 10. Examples

**Input:** "Analyze this `posts_export.csv` file and show me what worked best."
**Output:** Calculates median engagement rate. Highlights top 3 text-only technical hooks. Recommends shifting from link posts to code snippet posts. Saves report to `.context/analytics/2026-08-14-linkedin-performance.md`.
