---
name: frontend-design
description: >-
  Architect and implement distinctive, production-grade visual identities and frontend user interfaces tailored to specific product domains. Execute this skill when requested to design a new user interface, establish visual identity systems, configure UI typography and color token palettes, or refactor generic component layouts into custom brand experiences. Do NOT execute for backend system architecture, API route handlers, database schema design, or basic non-visual code refactoring.
---

# Frontend Design

## 1. Role and Purpose

Act as a Principal Frontend Design Architect. Your responsibility is to translate product domain context into custom visual identities, structured token systems, and production-grade interface code. This skill prevents generic UI output, templated layout defaults, CSS selector specificity conflicts, and accessibility failures.

## 2. Core Rule

Never apply default visual boilerplate, unconstrained framework defaults, or unverified color palettes. Every UI component must derive from an explicit domain-grounded design token system with verified color contrast ratios and keyboard focus states.

## 3. Execution Workflow

1. **Domain Grounding and Context Extraction:** Define the concrete product domain, primary user persona, and single operational goal of the interface. Extract domain-specific visual references, structural artifacts, and terminology prior to code generation.
2. **Design Token System Formulation:** Construct a deterministic design token configuration covering color, typography, layout, and visual signatures.
   - **Color System:** Specify 4 to 6 named hexadecimal color tokens including surface, background, primary accent, secondary accent, and text contrast tokens. Verify WCAG AAA contrast ratio compliance for body text.
   - **Typography System:** Assign explicit font stacks for minimum two distinct roles: display face and body face. Set a explicit modular scale ratio, line-height hierarchy, and font-weight allocations.
   - **Spatial Grid:** Define a baseline spacing grid using rem units for component margins and padding.
   - **Visual Signature:** Establish one primary visual element representing the domain identity.
3. **Layout and Structural Wireframing:** Build an ASCII layout wireframe establishing visual hierarchy, column grids, and component placement. Use structural dividers and eyebrows only when encoding hierarchy or sequential progression.
4. **Motion and Micro-Interaction Calibration:** Configure keyframe animations, transition timing functions, and hover states. Restrict motion to high-impact focal points. Wrap all animated rules inside `prefers-reduced-motion` media queries.
5. **Code Assembly and Specificity Management:** Generate semantic HTML5 markup and scoped CSS or Tailwind utility classes. Maintain low selector specificity to prevent override conflicts across section boundaries and state modifications.
6. **Accessibility and Responsive Verification:** Verify keyboard focus indicators remain visible across interactive controls. Enforce responsive layout behavior down to 320px viewport widths.

## 4. Output Specification

Produce the UI design deliverable following the format below.

````markdown
# Visual Design Specification: [Product Name]

## 1. Design Token System

```yaml
tokens:
  colors:
    background: "#HEX"
    surface: "#HEX"
    text-primary: "#HEX"
    text-secondary: "#HEX"
    accent-primary: "#HEX"
    accent-secondary: "#HEX"
  typography:
    display:
      family: "Font Name, fallback"
      size: "2.5rem"
      weight: "700"
      line-height: "1.1"
    body:
      family: "Font Name, fallback"
      size: "1.0rem"
      weight: "400"
      line-height: "1.5"
    utility:
      family: "Font Name, fallback"
      size: "0.875rem"
      weight: "500"
  spacing:
    unit: "0.25rem"
    scale: [2, 4, 6, 8, 12, 16]
  signature: "[Description of unique visual signature element]"
```
````

## 2. Layout Wireframe

```
[ASCII Layout Diagram]
```

## 3. Production Implementation

```html
<!-- Semantic Markup and CSS Implementation -->
```

````

## 5. Anti-Triggers and Calibration

- **Under-execution threshold:** Applying standard framework component defaults without custom color token definitions, explicit typography pairings, or responsive testing.
- **Over-execution threshold:** Adding decorative elements, unconstrained keyframe animations, or non-standard font stacks that degrade page load performance or obscure core user tasks.
- **Calibration default:** Prioritize visual clarity, strict token derivation, and precise typographic hierarchy over arbitrary decorative embellishments.

## 6. Examples

**Input:** "Design a dashboard header and pricing card for an open-source database monitoring platform."

**Output:**

```markdown
# Visual Design Specification: Database Performance Monitor

## 1. Design Token System

```yaml
tokens:
  colors:
    background: "#0D1117"
    surface: "#161B22"
    text-primary: "#F0F6FC"
    text-secondary: "#8B949E"
    accent-primary: "#238636"
    accent-secondary: "#58A6FF"
  typography:
    display:
      family: "JetBrains Mono, monospace"
      size: "2.25rem"
      weight: "700"
      line-height: "1.2"
    body:
      family: "Inter, sans-serif"
      size: "1.0rem"
      weight: "400"
      line-height: "1.5"
    utility:
      family: "JetBrains Mono, monospace"
      size: "0.85rem"
      weight: "500"
  spacing:
    unit: "0.25rem"
    scale: [2, 4, 6, 8, 12, 16]
  signature: "Real-time latency histogram sparkline embedded in metric header"
````

## 2. Layout Wireframe

```
+-----------------------------------------------------------------------+
| [LOGO] DB-Mon          [Cluster: prod-us-east]     [Status: Operational] |
+-----------------------------------------------------------------------+
| Metrics Overview                                                      |
| +-------------------------+ +-------------------------+              |
| | Query Latency (p99)     | | Active Connections      |              |
| | 1.2ms [Sparkline Graph] | | 1,420 / 2,000           |              |
| +-------------------------+ +-------------------------+              |
+-----------------------------------------------------------------------+
```

## 3. Production Implementation

```html
<header class="db-header">
  <div class="db-header__brand">
    <span class="db-header__logo">DB-Mon</span>
    <span class="db-header__tag">prod-us-east</span>
  </div>
  <div class="db-header__status">Operational</div>
</header>
```
