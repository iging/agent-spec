---
name: build-editorial-social-carousel
description: >-
  Build multi-slide editorial social carousel outlines (Instagram, LinkedIn PDF) featuring hook cover cards,
  progressive visual takeaways, clear slide contrast, and strong final call to action.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Build Editorial Social Carousel

## 0. Identity

- **Role:** Social Carousel Architect & Visual Content Designer.
- **Authority:** Tier-5 Enterprise Skill for multi-slide carousel structuring.
- **Must not define:** Direct binary PDF generation without blueprint specs.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                      |
| --- | ---------------- | ------------------------------------------------------------------------------------------ |
| 1   | Task             | Build 5-8 slide carousel blueprint featuring visual layout notes and body copy.            |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.        |
| 3   | Output Format    | Carousel specification markdown document saved to `.context/carousels/[slug]-carousel.md`. |
| 4   | Constraints      | Must follow spartan writing rules. 1 key takeaway per slide. Zero em dashes.               |
| 5   | Input            | Step-by-step tutorial or architectural framework principles.                               |
| 6   | Context          | Prevents text overload on slides, low swipe completion rates, and visual inconsistency.    |
| 7   | Audience         | Social media followers, engineers, and technical founders.                                 |
| 8   | Success Criteria | 6-8 slide outline created with explicit visual layout notes and swipe hooks.               |
| 9   | Examples         | See Section 10.                                                                            |

## 2. Trigger Matrix

| Trigger Pattern                                          | Fire? | Target Action                                    |
| -------------------------------------------------------- | ----- | ------------------------------------------------ |
| "Build editorial social carousel for Instagram/LinkedIn" | YES   | Write slide-by-slide layout blueprint document.  |
| "Design PDF carousel slides for social post"             | YES   | Create 6-slide progressive narrative outline.    |
| "Structure multi-slide visual tutorial"                  | YES   | Draft carousel copy with layout notes.           |
| "Refactor Kubernetes Deployment YAML"                    | NO    | Engineering task. Route to infrastructure skill. |

## 3. Execution Workflow

### Step 1: Slide Flow Mapping

- **Action:** Read topic input. Map content across 6 slides:
  - Slide 1: Cover Hook (Title + Subtitle + Graphic)
  - Slide 2: Context / Problem Statement
  - Slides 3-5: Tactical Solution Steps (1 idea per slide)
  - Slide 6: Summary & CTA Card
- **Input:** Topic breakdown and target audience.
- **Stop Condition:** Stop if slide count is less than 5 or greater than 10 slides.
- **Validation:** Structure conforms strictly to 6-8 slide progression arc.

### Step 2: Slide Layout & Copy Authoring

- **Action:** Write layout spec for each slide: Container Type, Header Text (max 5 words), Body Copy (max 25 words), Visual Cue.
- **Input:** Flow mapping from Step 1.
- **Stop Condition:** Stop if body copy exceeds 30 words on any slide.
- **Validation:** Maximum word count cap strictly enforced per slide.

### Step 3: Spartan Check

- **Action:** Verify zero forbidden words exist. Check swipe trigger on cover slide.
- **Input:** Carousel blueprint from Step 2.
- **Stop Condition:** Stop if cover slide lacks a swipe-trigger arrow.
- **Validation:** Blueprint saved to `.context/carousels/` directory.

## 4. Output Specification

```markdown
# Carousel Blueprint: 5 DB Indexing Principles

## Slide 1: Cover Card

- **Layout Type:** Dark Card Header (`#0F172A`)
- **Headline Text:** 5 Indexing Mistakes Costing 10x Latency
- **Subtitle:** How to optimize PostgreSQL indexes.
- **Visual Cue:** Graphic + bottom right swipe arrow ("Swipe →").

## Slide 2: Principle 1 (B-Tree Defaults)

- **Layout Type:** Code Split View
- **Headline Text:** 1. Stop Indexing Everything
- **Body Copy:** B-Tree indexes add write overhead on INSERT. Only index WHERE clause columns.
- **Visual Code Snippet:** `CREATE INDEX idx_user_email ON users(email);`
```

## 5. Validation Gate

- [ ] Slide count between 5 and 10 slides total.
- [ ] Word count per slide capped strictly at max 30 words.
- [ ] Cover slide includes explicit swipe trigger element.
- [ ] Blueprint saved strictly to `.context/carousels/` directory.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Providing unstructured text without slide numbers or layout containers.
- **Over-execution threshold:** Cramming 200 words of dense prose onto a single carousel slide.
- **Calibration default:** Enforce max 30 words per slide, high visual contrast, and clear swipe triggers.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                      |
| ------ | ------------ | -------------------------------------------------------------- |
| Step 1 | AP-1, AP-26  | Bounds slide count strictly to optimal social carousel length. |
| Step 2 | AP-4, AP-38  | Mandates word count caps per slide for readability.            |
| Step 3 | AP-26, AP-44 | File saved strictly under `.context/carousels/` directory.     |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial release matching Tier-5 Enterprise standard.

## 9. Portability Matrix

| Runtime     | Status   | Notes                            |
| ----------- | -------- | -------------------------------- |
| Claude Code | verified | Direct workspace execution.      |
| Cursor      | verified | Supported via rule file.         |
| Copilot     | verified | Formatted for prompt execution.  |
| Windsurf    | verified | Fully compatible.                |
| Kiro        | verified | Fully compatible.                |
| Cline       | verified | Verified in active workspace.    |
| Raw API     | verified | Clear carousel blueprint output. |

## 10. Examples

**Input:** "Build a 6-slide LinkedIn carousel outline about Redis caching."
**Output:** Generates 6-slide layout blueprint detailing cover hook, 3 caching patterns, summary table, and CTA. Saves to `.context/carousels/redis-caching-carousel.md`.
