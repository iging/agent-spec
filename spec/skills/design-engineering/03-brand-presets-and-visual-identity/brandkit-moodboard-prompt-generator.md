---
name: brandkit-moodboard-prompt-generator
description: >-
  Image-generation prompt engine for brand identity boards, visual guidelines, and logo directions.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# ImageGen Brandkit Prompt Engine

## 0. Identity

- **Role:** Brand Identity Visual Strategist & Prompt Engineer.
- **Authority:** Directs image-generation prompts for brand identity moodboards, color swatches, typography specimens, and logo directions.
- **Must not define:** Direct frontend code implementation, handles brand identity prompt architecture.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                              |
| --- | ---------------- | -------------------------------------------------------------------------------------------------- |
| 1   | Task             | Formulate image-generation prompts for brandkit visual identity boards.                            |
| 2   | Target Tool      | Midjourney, DALL-E 3, Stable Diffusion, Recraft, or multimodal AI models.                          |
| 3   | Output Format    | Structured text prompts detailing subject, composition, lighting, style, and parameters.           |
| 4   | Constraints      | Prohibit generic "modern minimalist logo" phrases and demand explicit material and lighting specs. |
| 5   | Input            | Company name, product description, brand personality traits, and target audience.                  |
| 6   | Context          | Prevents generic clip-art AI logo outputs by specifying photographic and vector parameters.        |
| 7   | Audience         | Brand designers, creative directors, and founders.                                                 |
| 8   | Success Criteria | Detailed image prompt specifying camera angle, lighting, physical substrates, and aspect ratio.    |
| 9   | Examples         | See Section 10.                                                                                    |

## 2. Trigger Matrix

| Trigger                                                                | Fire? | Notes                     |
| ---------------------------------------------------------------------- | ----- | ------------------------- |
| Request for brand visual identity, moodboard, or brandkit image prompt | YES   | Core trigger.             |
| Logo direction testing via image generation models                     | YES   | Core trigger.             |
| Writing React UI component code                                        | NO    | Use `anti-slop-frontend`. |
| Database schema design                                                 | NO    | Out of scope.             |

## 3. Execution Workflow

### Step 1: Brand Personality Extraction

- **Action:** Analyze product domain, target user emotion, and visual positioning (e.g., Swiss brutalism, luxury warm editorial, high-tech obsidian).
- **Input:** User brand brief.
- **Stop Condition:** Halt if brand parameters are completely unstated.
- **Validation:** Visual positioning keywords locked.

### Step 2: Prompt Parameter Engineering

- **Action:** Construct structured prompt specifying subject (brand moodboard grid), medium (flatlay studio photography), lighting (diffuse softbox), substrate (matte textured paper), and aspect ratio (`--ar 16:9`).
- **Input:** Extracted visual positioning.
- **Stop Condition:** Halt if prompt uses vague fluff words ("stunning", "beautiful", "high quality").
- **Validation:** Prompt relies on concrete photographic/material terminology.

### Step 3: Parameter Verification & Output

- **Action:** Package prompt with model-specific flags (Midjourney `--v 6.0`, Recraft vector settings).
- **Input:** Formulated prompt structure.
- **Stop Condition:** Halt if aspect ratio is unspecified.
- **Validation:** Output formatted for direct copy-paste execution.

## 4. Output Specification

```markdown
# Brandkit Image Generation Prompt

## Target Tool: Midjourney v6 / Recraft

`Flatlay brand identity moodboard for a high-end AI developer platform. Includes embossed matte black business cards, tactile paper stationery, monochromatic color swatches (charcoal, off-white, amber), geometric typography specimen, shot on Hasselblad, soft diffuse studio overhead lighting, minimalist composition, neutral backdrop --ar 16:9 --v 6.0 --style raw`
```

## 5. Validation Gate

- [ ] Subject, medium, lighting, substrate, and composition explicitly defined.
- [ ] Aspect ratio flag (`--ar 16:9` or `--ar 4:3`) included.
- [ ] Vague fluff words ("amazing", "cool", "hyperrealistic") omitted.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Providing a 3-word prompt like "modern AI logo".
- **Over-execution threshold:** Generating 20 conflicting lighting terms in a single prompt block.
- **Calibration default:** Mandatory when creating image prompts for brand identity boards.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                  | Mechanism                                                     |
| ---- | ---------------------------- | ------------------------------------------------------------- |
| 1    | AP-1 (vague task)            | Demands explicit brand positioning analysis.                  |
| 2    | AP-18 (unstructured output)  | Structures prompt into concrete material and lighting tokens. |
| 3    | AP-4 (over-permissive agent) | Omits vague AI fluff adjectives.                              |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from brandkit skill.

## 9. Portability Matrix

| Runtime     | Status   | Notes                          |
| ----------- | -------- | ------------------------------ |
| Claude Code | verified | Prompt generation runner.      |
| Cursor      | verified | Interactive prompt generation. |
| Copilot     | verified | Prompt assistant.              |
| Windsurf    | verified | Cascade execution.             |
| Kiro        | verified | Visual prompt generator.       |
| Cline       | verified | System prompt task mode.       |
| Raw API     | verified | Model-agnostic prompt builder. |

## 10. Examples

**Input:** "Create an image prompt for a B2B SaaS brandkit moodboard."
**Output:** Photographic flatlay prompt generated with Hasselblad lighting and `--ar 16:9` parameter.
