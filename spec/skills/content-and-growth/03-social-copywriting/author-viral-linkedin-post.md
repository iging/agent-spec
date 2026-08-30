---
name: author-viral-linkedin-post
description: >-
  Author high-performing text posts optimized for LinkedIn feed readability, short paragraph rhythm,
  technical authenticity, and high comment engagement without sensationalism.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Author Viral LinkedIn Post

## 0. Identity

- **Role:** Executive Social Copywriter & Feed Strategist.
- **Authority:** Tier-5 Enterprise Skill for high-engagement LinkedIn post creation.
- **Must not define:** Direct engagement pod coordination or fake social metrics.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|---|---|
| 1 | Task | Write complete LinkedIn post from human story or technical case study. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Formatted LinkedIn post text saved to `.context/posts/[date]-[slug].md`. |
| 4 | Constraints | Must follow spartan writing rules. Max 1,300 chars, short lines, zero em dashes. |
| 5 | Input | Raw experience, code snippet, lesson learned, target audience. |
| 6 | Context | Prevents wall-of-text formatting, generic self-congratulation, and zero-comment posts. |
| 7 | Audience | Tech leaders, engineers, product managers, and founders. |
| 8 | Success Criteria | Post includes 2-line hook, body narrative, code or metric evidence, and clear CTA. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger Pattern | Fire? | Target Action |
|---|---|---|
| "Author viral LinkedIn post about engineering lesson" | YES | Write structured short-form text post. |
| "Draft LinkedIn post from this story" | YES | Convert raw story into high-readability post. |
| "Write social post for feature release" | YES | Draft value-focused technical release post. |
| "Debug memory leak in Go service" | NO | Engineering task. Route to debugging skill. |

## 3. Execution Workflow

### Step 1: Story & Evidence Structuring
- **Action:** Read user story or case study. Extract hook event, turning point, quantitative metric, and core takeaway.
- **Input:** Raw story input.
- **Stop Condition:** Stop if story lacks a concrete outcome or lesson.
- **Validation:** Structure divided into Hook, Conflict, Evidence, and Takeaway.

### Step 2: Feed Line-Formatting Pass
- **Action:** Format text into short, scannable lines (1-2 sentences per paragraph max). Place blank lines between paragraphs. Ensure first 2 lines act as curiosity hook.
- **Input:** Structured story from Step 1.
- **Stop Condition:** Stop if total post exceeds 1,300 characters.
- **Validation:** Visual whitespace ratio exceeds 40%.

### Step 3: Spartan Rules & Call-To-Action Optimization
- **Action:** Check for forbidden words (`delve`, `utilize`, `game-changer`). Ensure ending includes a low-friction open question for comments.
- **Input:** Formatted draft from Step 2.
- **Stop Condition:** Stop if post ends with sales pitch or external link.
- **Validation:** Clean post saved to `.context/posts/` directory.

## 4. Output Specification

```markdown
# LinkedIn Post Output

We deleted 12,000 lines of microservices code last week.
Our API latency dropped by 65%.

Here is what happened:

Two years ago, we split our monolith into 8 microservices.
We thought it would help us scale.

Instead, it created:
- Distributed tracing nightmares
- 4x higher AWS bills
- Network latency on every user request

Last month, we merged 5 services back into the core codebase.

The result:
- P99 latency fell from 340ms to 110ms
- Monthly infrastructure costs dropped $3,200
- On-call alerts decreased by 80%

Microservices solve organizational scaling problems, not code problems.
If your team is under 15 engineers, keep your monolith clean.

What is your experience with service consolidation?
```

## 5. Validation Gate

- [ ] Hook line limited to 2 lines feed preview.
- [ ] Paragraphs restricted to max 2 sentences each.
- [ ] Post ends with an open-ended question rather than link.
- [ ] Post saved strictly to `.context/posts/` path.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Writing dense wall-of-text paragraphs that get hidden in feed collapse.
- **Over-execution threshold:** Using cringe humble-bragging tropes or fake emotional stories.
- **Calibration default:** Keep copy technical, authentic, line-spaced, and metrics-driven.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|---|---|---|
| Step 1 | AP-1, AP-38 | Grounds post in real metrics and engineering lessons. |
| Step 2 | AP-4, AP-26 | Restricts line length and character counts for social feed optics. |
| Step 3 | AP-26, AP-44 | Restricts output saving strictly to `.context/posts/` directory. |

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
| Raw API | verified | High engagement post generated. |

## 10. Examples

**Input:** "Write a post about why we switched from Kubernetes to bare metal servers for cost savings."
**Output:** Formats short-line post detailing $8,000 monthly cost reduction. Ends with open question on cloud spend. Saves to `.context/posts/2026-08-14-bare-metal-migration.md`.
