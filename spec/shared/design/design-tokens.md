---
name: Design Tokens
description: 3-tier token architecture, semantic token naming, OKLCH color ramps, spacing steps, elevation, typography, motion easing and duration assignments, icon sizing tiers, and the component state matrix.
---

# Design Tokens

> **Purpose:** The vocabulary of the design system: which tokens exist, how they are named, and how components consume them. Reference this file when generating styles, naming CSS custom properties, picking icons, or animating transitions. Behavioral rules live in `ui-ux-principles.md`. CSS architecture lives in `html-css-principles.md`.

---

## 1. 3-Tier Token Architecture

- **Tier 1 — Global Primitives (`primitive-`):** Raw scales representing absolute values (for example `--primitive-blue-500: oklch(0.55 0.2 250)`, `--primitive-space-4: 16px`). Primitives are system internals; components must not consume Tier 1 tokens directly.
- **Tier 2 — Semantic Contextual (`bg-`, `text-`, `border-`, `brand-`, `status-`):** Purpose-driven tokens mapping user-facing UI roles to primitive values (for example `--bg-primary`, `--text-muted`). Components consume Tier 2 tokens by default.
- **Tier 3 — Component Scoped (`cmp-`):** Specific overrides scoped to a single component (for example `--cmp-button-bg-hover`). Use Tier 3 tokens when a component requires unique state layers without polluting the global semantic space.

---

## 2. Semantic Color Tokens and Perceptual Ramps

- **OKLCH Perceptual Uniformity:** Derive color ramps in OKLCH or perceptually uniform color spaces to ensure consistent contrast step spacing across light and dark modes. Maintain raw ramps numbered 100 to 900 in steps of 100 per hue.
- **Naming Namespaces:** Use hyphenated prefixes for CSS custom properties. Dots are invalid inside custom property names (for example `bg.primary` is banned):
  - `bg-` for background surfaces: `--bg-primary`, `--bg-surface`, `--bg-subtle`
  - `text-` for text foregrounds: `--text-primary`, `--text-secondary`, `--text-muted`
  - `border-` for borders and dividers: `--border-default`, `--border-subtle`, `--border-focus`
  - `brand-` for brand accents: `--brand-primary`, `--brand-secondary`
  - `status-` for system feedback: `--status-success`, `--status-warning`, `--status-error`, `--status-info`
- **Ramp Discipline:** Derive each ramp from one base hue. Never hand-pick adjacent steps independently.
- **Theme Switching:** Redefine semantic token values per theme under `@media (prefers-color-scheme: dark)` or class-based theme containers. Re-verify contrast ratios in both modes per `ui-ux-principles.md`.

---

## 3. Spacing, Radius, and Stacking Tokens

- **Base Spacing Unit:** 4px. Every margin, padding, gap, and dimension is a multiple of 4.
- **Named Spacing Steps:** `space-1` (4px), `space-2` (8px), `space-3` (12px), `space-4` (16px), `space-6` (24px), `space-8` (32px), `space-12` (48px), `space-16` (64px).
- **Layout Grid:** Twelve columns. Gutters between 16px and 24px. Page margins between 24px and 48px at desktop widths.
- **Border Radius Steps:** `radius-none` (0px), `radius-sm` (4px), `radius-md` (8px), `radius-lg` (12px), `radius-xl` (16px), `radius-full` (9999px).
- **Z-Index Stacking Hierarchy:** `z-deep` (-1), `z-default` (0), `z-dropdown` (1000), `z-sticky` (1100), `z-fixed` (1200), `z-modal` (1300), `z-popover` (1400), `z-toast` (1500).

---

## 4. Typography and Layout Tokens

- **Named Text Steps:** `text-xs` (12px), `text-sm` (14px), `text-base` (16px), `text-lg` (18px), `text-xl` (20px), `text-2xl` (24px), `text-3xl` (32px), `text-4xl` (40px). Body copy uses `text-base`. Heading mappings follow `ui-ux-principles.md`: H3 uses `text-xl`, H2 uses `text-2xl`, H1 uses `text-4xl`.
- **Line Height Bands:** Headings 1.1 to 1.3. Body text 1.5 minimum. Compact UI labels 1.0 to 1.2.
- **Weight Roles:** Regular 400 body, Medium 500 labels, Semibold 600 subheadings, Bold 700 headings, ExtraBold 800 display only.
- **Responsive Viewport Breakpoints:** `breakpoint-sm` (640px), `breakpoint-md` (768px), `breakpoint-lg` (1024px), `breakpoint-xl` (1280px), `breakpoint-2xl` (1536px).

---

## 5. Elevation and Motion Tokens

- **Elevation Shadows:** `shadow-none` (none), `shadow-sm` (0 1px 2px rgba(0,0,0,0.05)), `shadow-md` (0 4px 6px -1px rgba(0,0,0,0.1)), `shadow-lg` (0 10px 15px -3px rgba(0,0,0,0.1)), `shadow-xl` (0 20px 25px -5px rgba(0,0,0,0.1)).
- **Easing Assignments:** `ease-out` for elements entering or appearing. `ease-in` for elements exiting or leaving. `ease-in-out` for movement and resizing inside the viewport.
- **Duration Assignments:** 100ms for micro-feedback (hover tints, toggles, fades). 150ms to 200ms for small elements (button presses, tooltips). 200ms to 300ms for medium surfaces (modals, dropdowns). Up to 400ms for large movements (page transitions). 500ms is the hard ceiling per `ui-ux-principles.md`.
- **Reduced Motion:** Apply all motion tokens only inside `@media (prefers-reduced-motion: no-preference)` per `ui-ux-principles.md`.

---

## 6. Icon System Specifications

- **One Library Per Project:** Choose exactly one set and stick with it. Approved options: Lucide, Phosphor, Heroicons, Radix Icons. Never mix sets.
- **Size Tiers:** 16px inline with text. 20px default UI glyphs. 24px navigation and primary controls. 32px feature highlights. 48px hero moments.
- **Rendering Rules:** 2px stroke weight throughout per `ui-ux-principles.md`. Rounded caps and joins. Draw on a 24 by 24 grid with optical alignment. Color icons through `currentColor` so they inherit text tokens automatically.
- **Hit Areas:** The visual glyph never equals the interactive area. Tappable icons reserve at least 44 by 44px per `ui-ux-principles.md`.

---

## 7. Component State Matrix & State Layers

Every interactive component implements and documents all six states before shipping:

1. **Default:** Resting appearance using semantic surface and text tokens.
2. **Hover:** Micro-feedback via state overlay tint (`color-mix(in oklch, var(--text-primary) 8%, transparent)`) or explicit hover token.
3. **Active:** Pressed state response with increased overlay opacity (12% to 16%) or active transform step.
4. **Focus-Visible:** Distinct outline or focus ring meeting WCAG 2.2 contrast rules per `ui-ux-principles.md`.
5. **Disabled:** Non-interactive appearance with non-text contrast exemptions noted.
6. **Loading:** Spinner or skeleton overlay for triggers performing async operations.

