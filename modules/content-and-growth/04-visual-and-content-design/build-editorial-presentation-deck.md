---
name: build-editorial-presentation-deck
description: >-
  Build structured presentation slide deck outlines, layout blueprints, and visual slide copy
  optimized for high technical clarity, single-idea slides, and clean visual hierarchy.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Build Editorial Presentation Deck

## 0. Identity

- **Role:** Presentation Architect & Visual Content Specialist.
- **Authority:** Tier-5 Enterprise Skill for slide deck design and copy structuring.
- **Must not define:** Direct binary PowerPoint file manipulation or font rendering.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                          |
| --- | ---------------- | ---------------------------------------------------------------------------------------------- |
| 1   | Task             | Create slide-by-slide presentation blueprint with layout notes and high-density copy.          |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.            |
| 3   | Output Format    | Presentation deck markdown document saved to `.context/decks/[slug]-presentation.md`.          |
| 4   | Constraints      | Must follow spartan writing rules. 1 idea per slide. Zero em dashes, zero text wall slides.    |
| 5   | Input            | Presentation topic, target audience, speaker time limit, core argument.                        |
| 6   | Context          | Prevents cluttered slides, boring bullet lists, and loss of audience focus during keynotes.    |
| 7   | Audience         | Technical conference attendees, executive stakeholders, and engineering teams.                 |
| 8   | Success Criteria | Slide outline built with title, primary takeaway, visual asset placement, and presenter notes. |
| 9   | Examples         | See Section 10.                                                                                |

## 2. Trigger Matrix

| Trigger Pattern                                         | Fire? | Target Action                                       |
| ------------------------------------------------------- | ----- | --------------------------------------------------- |
| "Build presentation deck outline for technical keynote" | YES   | Create slide-by-slide layout blueprint document.    |
| "Design slides for architecture review"                 | YES   | Draft single-idea visual slides with speaker notes. |
| "Outline talk slides about cloud migration"             | YES   | Structure slide deck narrative flow.                |
| "Configure PostgreSQL replication"                      | NO    | Engineering task. Route to database skill.          |

## 3. Execution Workflow

### Step 1: Presentation Narrative Arc

- **Action:** Read topic input. Define 3-act slide structure: Problem Statement (Slides 1-3), Technical Solution (Slides 4-8), Results & Architecture (Slides 9-12).
- **Input:** Presentation topic and time limit.
- **Stop Condition:** Stop if slide count exceeds 1 slide per 2 minutes of presentation time.
- **Validation:** Slide total mapped strictly to presentation duration.

### Step 2: Slide Layout & Copy Authoring

- **Action:** For each slide, write: Slide Title (max 6 words), Core Takeaway (1 sentence), Main Visual Asset (Diagram/Code/Stat), and Presenter Notes (2-3 sentences).
- **Input:** Narrative arc from Step 1.
- **Stop Condition:** Stop if any slide contains more than 3 bullet points.
- **Validation:** Single-idea slide rule enforced across all slides.

### Step 3: Spartan Rules & Layout Check

- **Action:** Verify zero em dashes or banned words exist. Check layout clarity and contrast.
- **Input:** Deck blueprint from Step 2.
- **Stop Condition:** Stop if slides lack presenter notes or visual asset cues.
- **Validation:** Blueprint saved to `.context/decks/` directory.

## 4. Output Specification

```markdown
# Presentation Deck: Distributed Database Migration

## Slide 1: Title & Hook

- **Headline:** Zero-Downtime Migration to Distributed SQL
- **Visual Asset:** Split screen showing old vs new architecture latency.
- **Core Takeaway:** Migrating databases does not require downtime windows.
- **Presenter Notes:** Welcome audience. Emphasize that zero-downtime is discipline, not luck.

## Slide 2: Problem Statement

- **Headline:** The Cost of Scheduled Maintenance
- **Visual Asset:** Stat callout: "$45,000 lost per hour of downtime".
- **Core Takeaway:** Maintenance windows erode customer trust and revenue.
- **Presenter Notes:** Share incident from last Q3 when 2-hour window stretched to 6 hours.
```

## 5. Validation Gate

- [ ] Every slide restricted to 1 primary core idea.
- [ ] Presenter notes provided for every slide entry.
- [ ] Zero bullet point lists with more than 3 items per slide.
- [ ] Deck blueprint saved strictly to `.context/decks/` path.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Outputting raw text paragraphs without slide boundary markers or layout guidance.
- **Over-execution threshold:** Designing 50-slide decks for 10-minute lightning talks.
- **Calibration default:** Enforce 1 slide per 2 minutes, clear visual asset cues, and tight copy.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                 |
| ------ | ------------ | --------------------------------------------------------- |
| Step 1 | AP-1, AP-26  | Restricts slide volume strictly to time limit constraint. |
| Step 2 | AP-4, AP-38  | Caps bullet counts to force high information density.     |
| Step 3 | AP-26, AP-44 | Output saved strictly to `.context/decks/` directory.     |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial release matching Tier-5 Enterprise standard.

## 9. Portability Matrix

| Runtime     | Status   | Notes                           |
| ----------- | -------- | ------------------------------- |
| Claude Code | verified | Direct workspace execution.     |
| Cursor      | verified | Supported via rule file.        |
| Copilot     | verified | Formatted for prompt execution. |
| Windsurf    | verified | Fully compatible.               |
| Kiro        | verified | Fully compatible.               |
| Cline       | verified | Verified in active workspace.   |
| Raw API     | verified | Clear slide blueprint output.   |

## 10. Examples

**Input:** "Build a 6-slide deck outline for introducing TypeScript strict mode."
**Output:** Generates 6 single-idea slides featuring type safety metrics and compiler flags. Saves to `.context/decks/typescript-strict-mode-deck.md`.
