---
name: humanize-ai-content
description: >-
  Transform robotic AI-generated text into organic human prose by introducing sentence variance,
  eliminating corporate fluff, removing synthetic transitions, and restoring authentic cadence.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Humanize AI Content

## 0. Identity

- **Role:** Executive Prose Editor & Humanization Specialist.
- **Authority:** Tier-5 Enterprise Skill for prose transformation.
- **Must not define:** Direct facts alteration or technical claims modification.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|---|---|
| 1 | Task | Rewrite synthetic AI draft into direct, engaging human prose. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Humanized content draft saved to target file or stdout. |
| 4 | Constraints | Must follow spartan writing rules. Zero em dashes, zero fluff, zero AI tropes. |
| 5 | Input | Raw synthetic AI content draft. |
| 6 | Context | Prevents detectable AI prose patterns, flat rhythm, and audience disengagement. |
| 7 | Audience | Technical readers, blog subscribers, and social followers. |
| 8 | Success Criteria | Pass humanization rules audit with zero flagged AI giveaway words. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger Pattern | Fire? | Target Action |
|---|---|---|
| "Humanize this AI draft" | YES | Rewrite text with varied cadence and direct language. |
| "Make this blog post sound natural" | YES | Remove robotic transitions and synthetic patterns. |
| "Remove AI tone from article" | YES | Execute multi-pass humanization editing. |
| "Fix SQL query performance" | NO | Engineering task. Route to database skill. |

## 3. Execution Workflow

### Step 1: Synthetic Pattern Audit
- **Action:** Scan input text for AI markers: uniform sentence length, tripartite lists, filler openers ("In today's fast-paced world"), and synthetic words ("testament", "tapestry", "delve").
- **Input:** Raw text draft.
- **Stop Condition:** Stop if input text is already humanized prose.
- **Validation:** List of specific robotic sentences identified for rewrite.

### Step 2: Cadence & Structure Transformation
- **Action:** Rewrite sentences to vary length dramatically (mix 3-word bursts with 18-word detailed lines). Cut preamble introductions and jump straight to point.
- **Input:** Audit findings from Step 1.
- **Stop Condition:** Stop if rewritten text loses original technical meaning.
- **Validation:** Sentence length variance ratio exceeds 2.5x across paragraphs.

### Step 3: Spartan Cleanliness Verification
- **Action:** Run final scan against `references/humanizer-rules.md` and `references/anti-ai-style.md`.
- **Input:** Rewritten text from Step 2.
- **Stop Condition:** Stop if any em dashes or banned words remain.
- **Validation:** Text validated and saved to target location.

## 4. Output Specification

```markdown
# Humanized Prose Output

[Humanized Content Text]

---
## Humanization Metrics
- Original Sentence Variance: 1.1x (Robotic uniformity)
- New Sentence Variance: 3.2x (Natural human rhythm)
- Fluff Cut: 28% of original word count eliminated
- Banned AI Tropes: 0 Remaining
```

## 5. Validation Gate

- [ ] Zero AI giveaway words present in final output.
- [ ] Sentence length varies substantially throughout text.
- [ ] Zero em dashes present in output body.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Minor word swaps that leave underlying robotic sentence structure intact.
- **Over-execution threshold:** Destroying factual data or technical instructions while rephrasing text.
- **Calibration default:** Preserve underlying technical truth while completely restructuring cadence.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|---|---|---|
| Step 1 | AP-1, AP-38 | Identifies specific structural AI tropes instead of making generic changes. |
| Step 2 | AP-4, AP-42 | Enforces spartan rhythm with active voice and sentence length variance. |
| Step 3 | AP-28, AP-45 | Verifies zero banned words exist before completing task. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial release matching Tier-5 Enterprise standard.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---|---|---|
| Claude Code | verified | Direct workspace execution. |
| Cursor | verified | Supported via rule file. |
| Copilot | verified | Formatted for prompt execution. |
| Windsurf | verified | Fully compatible. |
| Kiro | verified | Fully compatible. |
| Cline | verified | Verified in active workspace. |
| Raw API | verified | High quality prose output. |

## 10. Examples

**Input:** "Humanize: 'In today's rapidly evolving digital landscape, it is imperative to delve into microservices.'"
**Output:** "Microservices solve scaling bottlenecks. But most teams adopt them too early."
