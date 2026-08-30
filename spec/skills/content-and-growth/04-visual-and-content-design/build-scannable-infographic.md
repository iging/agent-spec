---
name: build-scannable-infographic
description: >-
  Generate visual layout specifications and SVG blueprints for scannable infographics
  to summarize complex technical concepts in a single graphic.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Build Scannable Infographic

## 0. Identity

- **Role:** Technical Graphic Architect & Information Designer.
- **Authority:** Tier-5 Enterprise Skill for infographic layout and SVG generation.
- **Must not define:** Direct raster image manipulation without SVG specs.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                               |
| --- | ---------------- | ----------------------------------------------------------------------------------- |
| 1   | Task             | Generate SVG layout specification for a scannable single-page infographic.          |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3   | Output Format    | Standalone valid SVG file saved to `.context/infographics/[slug]-diagram.svg`.      |
| 4   | Constraints      | Spartan writing rules. High contrast colors, legible fonts, zero em dashes.         |
| 5   | Input            | Complex technical architecture breakdown or comparative data table.                 |
| 6   | Context          | Prevents cluttered unreadable diagrams and poor visual contrast.                    |
| 7   | Audience         | Developers, technical decision makers, and social media followers.                  |
| 8   | Success Criteria | Self-contained SVG diagram with high contrast and legible typography.               |
| 9   | Examples         | See Section 10.                                                                     |

## 2. Trigger Matrix

| Trigger Pattern                                | Fire? | Target Action                                    |
| ---------------------------------------------- | ----- | ------------------------------------------------ |
| "Build scannable infographic for architecture" | YES   | Output valid standalone SVG visual graphic file. |
| "Design visual summary diagram"                | YES   | Create high contrast SVG infographic blueprint.  |
| "Generate technical comparison chart visual"   | YES   | Build SVG visual layout specification.           |
| "Configure DNS records"                        | NO    | Engineering task. Route to infrastructure skill. |

## 3. Execution Workflow

### Step 1: Layout Grid Planning

- **Action:** Read topic. Select canvas size (1200x630). Divide canvas into Header, 2 Cards, and Footer takeaway.
- **Input:** Technical topic and data.
- **Stop Condition:** Stop if content contains more than 4 primary focus areas.
- **Validation:** Canvas grid coordinate layout calculated.

### Step 2: SVG Blueprint & Copy Authoring

- **Action:** Write SVG code. Define dark background (`#0F172A`), high contrast text (`#F8FAFC`), accent colors (`#38BDF8`), vector shapes, and text labels.
- **Input:** Layout grid from Step 1.
- **Stop Condition:** Stop if font size is under 14px anywhere on canvas.
- **Validation:** SVG code validated as syntactically correct XML.

### Step 3: Legibility & Spartan Check

- **Action:** Verify zero em dashes or forbidden words exist in text labels. Check alignment and padding.
- **Input:** SVG output from Step 2.
- **Stop Condition:** Stop if text elements overlap visual shapes.
- **Validation:** SVG saved to `.context/infographics/` directory.

## 4. Output Specification

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="100%" height="100%">
  <rect width="1200" height="630" fill="#0F172A" />
  <text x="60" y="80" font-family="sans-serif" font-size="36" font-weight="bold" fill="#F8FAFC">Monolith vs Microservices</text>
  <rect x="60" y="160" width="510" height="400" rx="12" fill="#1E293B" stroke="#334155" stroke-width="2" />
  <text x="90" y="210" font-family="sans-serif" font-size="24" font-weight="bold" fill="#38BDF8">Modular Monolith</text>
  <text x="90" y="260" font-family="sans-serif" font-size="16" fill="#CBD5E1">• Single deployment pipeline</text>
  <rect x="630" y="160" width="510" height="400" rx="12" fill="#1E293B" stroke="#334155" stroke-width="2" />
  <text x="660" y="210" font-family="sans-serif" font-size="24" font-weight="bold" fill="#F43F5E">Microservices</text>
  <text x="660" y="260" font-family="sans-serif" font-size="16" fill="#CBD5E1">• Independent releases</text>
</svg>
```

## 5. Validation Gate

- [ ] Standalone valid SVG code generated without external dependencies.
- [ ] Font size minimum 14px enforced across text elements.
- [ ] Visual background and text contrast ratio exceeds WCAG AAA (7:1).
- [ ] SVG file saved strictly to `.context/infographics/` path.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Returning markdown text bullet points instead of a visual SVG design specification.
- **Over-execution threshold:** Generating 10,000-line SVG files with complex unoptimized 3D paths.
- **Calibration default:** Focus on clean structural boxes, sharp typography, high contrast, and readable labels.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                        |
| ------ | ------------ | ---------------------------------------------------------------- |
| Step 1 | AP-1, AP-26  | Restricts canvas elements to max 4 focus areas for scannability. |
| Step 2 | AP-4, AP-38  | Mandates exact coordinate positioning and visual hierarchy.      |
| Step 3 | AP-26, AP-44 | File saved strictly under `.context/infographics/` directory.    |

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
| Raw API     | verified | Valid SVG rendering output.     |

## 10. Examples

**Input:** "Build an SVG infographic comparing REST vs GraphQL."
**Output:** Generates valid 1200x630 dark-mode SVG visual comparison. Saves to `.context/infographics/rest-vs-graphql-diagram.svg`.
