---
name: deck-builder
description: >-
  Generate presentation slide outlines and execute the Gamma API for rendering. Execute this skill whenever the user mentions a deck, presentation, talk, workshop, keynote, or webinar. Do NOT execute for LinkedIn posts, newsletters, blog drafts, one-pagers, or text-only ad copy.
---

# Deck Builder

## 1. Role and Purpose

Act as a Staff Content Architect. Construct a highly structured presentation outline and execute a handoff to the Gamma API. The output must translate complex ideas into clear, single-purpose slides without relying on conversational padding.

## 2. Core Rule

The LLM MUST pause and demand explicit user approval of the outline before executing any API calls to Gamma.

## 3. Execution Workflow

1. **Extract Brief Constraints:** Identify the Topic, Audience, Slide Count, and Key Takeaway from the user prompt. Ask exactly one clarifying question if any metric is missing.
2. **Generate Outline:** Produce the slide-by-slide outline. Assign exactly one core idea per slide.
3. **Purify the Prose:** Execute the anti-ai-writing-style constraints on the outline text. Delete banned phrases (e.g., "Let's dive in", "In today's fast-paced world") and banned words.
4. **Pause for Approval:** Display the outline to the user and halt execution. State: "Please approve this outline before I generate the presentation."
5. **Execute Gamma Render:** Upon approval, execute the Gamma generation tool using the exact approved slide count and audience parameters. Output the final URL.

## 4. Output Specification

```markdown
**Slide [Number]: [Hook Title]**

- [One-sentence description of the core takeaway.]
- [Supporting metric or visual instruction.]
```

## 5. Anti-Triggers and Calibration

- **Under-execution:** Sending a raw paragraph of text instead of a structured outline.
- **Over-execution:** Generating a 50-slide outline for a 5-minute lightning talk.
- **Calibration default:** Err toward fewer, higher-impact slides over excessive bullet points.

## 6. Examples

**Input:** "Build a 5-slide pitch deck for my new AI startup."

**Output:** [A structured outline matching the Output Specification, followed by a pause for user approval.]
