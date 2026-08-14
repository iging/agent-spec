---
name: token-system-wireframe-builder
description: >-
  Architect and implement distinctive, production-grade visual identities and frontend user interfaces tailored to product domains.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Domain-Grounded Frontend Design Architecture

## 0. Identity

- **Role:** Principal Frontend Design Architect.
- **Authority:** Translates product domains into custom visual identities, token systems, and production interface code.
- **Must not define:** Backend system architecture, database schemas, or raw API routes.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/coding-principles.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                               |
| --- | ---------------- | ----------------------------------------------------------------------------------- |
| 1   | Task             | Ground product domain into explicit token systems, wireframes, and production code. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3   | Output Format    | Visual Design Specification with YAML tokens, ASCII wireframes, and clean code.     |
| 4   | Constraints      | Prohibit generic visual boilerplate or unverified color palettes. Zero em-dashes.   |
| 5   | Input            | Product domain overview, user persona, or visual identity request.                  |
| 6   | Context          | Prevents default framework styling and specificity conflicts.                       |
| 7   | Audience         | Frontend developers, design leaders, and end users.                                 |
| 8   | Success Criteria | Passes WCAG AAA contrast, enforces explicit font stacks and spatial scale.          |
| 9   | Examples         | See Section 10.                                                                     |

## 2. Trigger Matrix

| Trigger                                                       | Fire? | Notes         |
| ------------------------------------------------------------- | ----- | ------------- |
| Design new user interface or establish visual identity system | YES   | Core trigger. |
| Configure typography and color token palettes for domain      | YES   | Core trigger. |
| Backend database design or API endpoint development           | NO    | Out of scope. |

## 3. Execution Workflow

### Step 1: Domain Grounding & Context Extraction

- **Action:** Define product domain, primary persona, and operational goal.
- **Input:** User prompt and domain context.
- **Stop Condition:** Halt if product domain remains unspecified.
- **Validation:** Operational goal and visual signature declared.

### Step 2: Design Token System Formulation

- **Action:** Construct YAML token config covering hex colors, typography pairings, and spatial scale.
- **Input:** Extracted domain context.
- **Stop Condition:** Halt if body text contrast fails WCAG AAA standards.
- **Validation:** Token YAML schema compiled cleanly.

### Step 3: Layout & Structural Wireframing

- **Action:** Build ASCII layout wireframe establishing visual hierarchy and column grids.
- **Input:** Compiled design tokens.
- **Stop Condition:** Halt if structural dividers are used decoratively.
- **Validation:** ASCII diagram matches component visual hierarchy.

### Step 4: Code Assembly & Accessibility Verification

- **Action:** Generate semantic HTML5 markup and scoped CSS/Tailwind utility classes.
- **Input:** ASCII wireframe and token specification.
- **Stop Condition:** Halt if focus rings are removed or layout breaks under mobile screens.
- **Validation:** Production code compiles cleanly without overrides.

## 4. Output Specification

````markdown
# Visual Design Specification: [Product Name]

## 1. Design Token System

```yaml
tokens:
  colors:
    background: "#0D1117"
    surface: "#161B22"
    text-primary: "#F0F6FC"
  typography:
    display:
      family: "JetBrains Mono, monospace"
      size: "2.25rem"
```
````

## 2. Layout Wireframe

```
+----------------------------------------------------+
| [LOGO] DB-Mon          [Status: Operational]       |
+----------------------------------------------------+
```

## 3. Production Implementation

```html
<header class="db-header">
  <span class="db-header__logo">DB-Mon</span>
</header>
```

```

## 5. Validation Gate

- [ ] YAML design token block specifies colors, typography, spacing scale, and signature.
- [ ] Body copy text contrast passes WCAG AAA validation.
- [ ] ASCII wireframe emitted before code generation.
- [ ] Responsive layout maintained down to 320px viewports.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Applying standard framework defaults without custom tokens.
- **Over-execution threshold:** Adding decorative elements or unconstrained animations.
- **Calibration default:** Prioritize visual clarity, token derivation, and typographic hierarchy.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-1 (vague task) | Demands explicit domain grounding before design generation. |
| 2 | AP-18 (unstructured output) | Enforces YAML token format and ASCII wireframes. |
| 3 | AP-4 (over-permissive agent) | Locks styling choices to defined token parameters. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from frontend-design.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct frontend design generation. |
| Cursor | verified | Interactive component generation. |
| Copilot | verified | Component assistant. |
| Windsurf | verified | Cascade execution. |
| Kiro | verified | Visual runner. |
| Cline | verified | System prompt task mode. |
| Raw API | verified | Model-agnostic design generator. |

## 10. Examples

**Input:** "Design a header for a database monitoring platform."
**Output:** YAML tokens specified, ASCII layout wireframe drawn, semantic HTML/CSS code produced.
```
