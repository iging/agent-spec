---
name: content-and-growth
description: Root router and lifecycle dispatcher for Tier-5 Content & Growth AI Agent Skills.
version: 3.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Content & Growth Router & Lifecycle Dispatcher

## 0. Identity

- **Role:** Content & Growth Lifecycle Dispatcher.
- **Authority:** Tier-5 normative root skill for `skills/content-and-growth/`.
- **Must not define:** Direct text drafting or visual rendering.
- **Normative base:** `shared/writing/writing-rules.md`, `docs/anti-patterns.md`, `docs/skill-standard.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                 |
| --- | ---------------- | ------------------------------------------------------------------------------------- |
| 1   | Task             | Inspect prompts and dispatch matching sub-skills under `skills/content-and-growth/`. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.   |
| 3   | Output Format    | Structured routing decision and target skill execution handoff.                       |
| 4   | Constraints      | No direct content editing within router. Dispatch strictly to sub-skills.             |
| 5   | Input            | User request, raw draft, topic idea, post analytics, or SEO task.                     |
| 6   | Context          | Prevents generic copy generation, voice drift, and uncalibrated asset rendering.      |
| 7   | Audience         | Content creators, ghostwriters, growth marketers, and engineering teams.              |
| 8   | Success Criteria | Exactly one primary target sub-skill path resolved deterministically.                 |
| 9   | Examples         | See Section 10.                                                                       |

## 2. Trigger Matrix

| User Intent / Trigger Pattern | Targeted Phase                 | Target Skill File Path                                              |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------- |
| Reverse engineer viral post   | `01-audience-and-strategy`     | `01-audience-and-strategy/reverse-engineer-viral-recipe.md`         |
| Analyze LinkedIn metrics      | `01-audience-and-strategy`     | `01-audience-and-strategy/analyze-linkedin-post-performance.md`     |
| Calibrate voice profile       | `02-voice-and-humanization`    | `02-voice-and-humanization/calibrate-personal-voice.md`             |
| Anchor author voice           | `02-voice-and-humanization`    | `02-voice-and-humanization/anchor-author-voice.md`                  |
| Humanize AI content           | `02-voice-and-humanization`    | `02-voice-and-humanization/humanize-ai-content.md`                  |
| Purge AI giveaway words       | `02-voice-and-humanization`    | `02-voice-and-humanization/purge-ai-giveaway-words.md`              |
| Red pen critique loop         | `02-voice-and-humanization`    | `02-voice-and-humanization/execute-red-pen-editing-loop.md`         |
| Generate LinkedIn hooks       | `03-social-copywriting`        | `03-social-copywriting/generate-linkedin-hooks.md`                  |
| Author viral LinkedIn post    | `03-social-copywriting`        | `03-social-copywriting/author-viral-linkedin-post.md`               |
| Draft video script            | `03-social-copywriting`        | `03-social-copywriting/author-high-retention-video-script.md`       |
| Build presentation deck       | `04-visual-and-content-design` | `04-visual-and-content-design/build-editorial-presentation-deck.md` |
| Render infographic PNG        | `04-visual-and-content-design` | `04-visual-and-content-design/build-scannable-infographic.md`       |
| Build social carousel         | `04-visual-and-content-design` | `04-visual-and-content-design/build-editorial-social-carousel.md`   |
| Optimize technical SEO        | `05-distribution-and-seo`      | `05-distribution-and-seo/optimize-frontend-technical-seo.md`        |
| Generate creative prompts     | `06-creative-storytelling`     | `06-creative-storytelling/generate-creative-prompts.md`             |

## 3. Execution Workflow

### Step 1: Analyze Intent

- **Action:** Read prompt. Extract goal, media type, and voice constraints.
- **Stop Condition:** Stop and ask user if intent is ambiguous.
- **Validation:** Intent matches a row in Trigger Matrix.

### Step 2: Resolve Target Skill Path

- **Action:** Select exact sub-skill path corresponding to phase.
- **Stop Condition:** Decline execution if no sub-skill matches.
- **Validation:** Target file exists under `skills/content-and-growth/`.

### Step 3: Handoff Execution

- **Action:** Invoke target sub-skill with contextual inputs.
- **Stop Condition:** Handoff transfers control to sub-skill.
- **Validation:** Sub-skill executes internal workflow.

## 4. Output Specification

```json
{
  "phase": "02-voice-and-humanization",
  "target_skill": "skills/content-and-growth/02-voice-and-humanization/humanize-ai-content.md",
  "reasoning": "Selected based on request to remove robotic tone."
}
```

## 5. Validation Gate

- [ ] Intent mapped strictly to one phase.
- [ ] Target sub-skill file exists.
- [ ] Router executes zero direct edits.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Direct drafting inside router bypassing specialized skills.
- **Over-execution threshold:** Routing simple 2-word typos through multi-stage workflow.
- **Calibration default:** Route multi-step content requests.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism                                  |
| ---- | ----------- | ------------------------------------------ |
| 1    | AP-1        | Requires explicit target intent mapping.   |
| 2    | AP-26       | Enforces strict path isolation per domain. |
| 3    | AP-4        | Router cannot edit content files directly. |

## 8. Versioning & Changelog

- **Version:** 3.0.0
- **Changelog:**
  - `3.0.0`: Router creation for Tier-5 Content & Growth suite.

## 9. Portability Matrix

| Runtime     | Status   | Notes                         |
| ----------- | -------- | ----------------------------- |
| Claude Code | verified | Direct sub-skill invocation.  |
| Cursor      | verified | `.cursorrules` route support. |
| Copilot     | verified | Custom instruction support.   |
| Windsurf    | verified | Directive integration.        |
| Kiro        | verified | Skill path linking.           |
| Cline       | verified | System prompt directive.      |
| Raw API     | verified | Model-agnostic router.        |

## 10. Examples

**Input:** "Audit this blog post and delete all AI giveaway words."
**Output:** Phase `02-voice-and-humanization`, target `skills/content-and-growth/02-voice-and-humanization/purge-ai-giveaway-words.md`.
