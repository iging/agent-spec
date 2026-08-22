---
name: Design Tokens
description: Semantic token naming, color ramps, spacing steps, typography steps, motion easing and duration assignments, icon sizing tiers, and the component state matrix for design-system-driven interfaces.
---

# Design Tokens

> **Purpose:** The vocabulary of the design system: which tokens exist, how they are named, and how components consume them. Reference this file whenever you generate styles, name CSS custom properties, pick icons, or animate transitions. Behavioral rules live in `ui-ux-principles.md`. CSS architecture lives in `html-css-principles.md`.

---

## 1. Semantic Color Tokens

- **Two Layers:** Maintain a raw ramp per hue numbered 100 to 900 in steps of 100, plus a semantic layer mapping user-facing roles to ramp steps. Components consume the semantic layer only.
- **Naming Namespaces:** Use these hyphenated prefixes. Dots are invalid inside CSS custom properties, so `bg.primary` style notation is banned.
  - `bg-` for surfaces: `--bg-primary`, `--bg-surface`
  - `text-` for foreground text: `--text-primary`, `--text-muted`
  - `border-` for borders and dividers: `--border-default`
  - `brand-` for brand accents: `--brand-primary`
  - `status-` for feedback: `--status-success`, `--status-warning`, `--status-error`, `--status-info`
- **Ramp Discipline:** Derive each ramp from one hue. Never hand-pick adjacent steps independently.
- **Theme Switching:** Redefine semantic token values per theme under `prefers-color-scheme` and re-verify contrast in both modes per `ui-ux-principles.md`.

---

## 2. Spacing Tokens

- **Base Unit:** 4px. Every margin, padding, gap, and border-radius is a multiple of 4.
- **Named Steps:** `space-1` 4px, `space-2` 8px, `space-3` 12px, `space-4` 16px, `space-6` 24px, `space-8` 32px, `space-12` 48px, `space-16` 64px.
- **Layout Grid:** Twelve columns. Gutters between 16 and 24px. Page margins between 24 and 48px at desktop widths.

---

## 3. Typography Tokens

- **Named Steps:** `text-xs` 12px, `text-sm` 14px, `text-base` 16px, `text-lg` 18px, `text-xl` 20px, `text-2xl` 24px, `text-3xl` 32px, `text-4xl` 40px. Body copy uses `text-base`. Heading mappings follow `ui-ux-principles.md`: H3 uses `text-xl`, H2 uses `text-2xl`, H1 uses `text-4xl`.
- **Line Height Bands:** Headings 1.1 to 1.3. Body text 1.5 minimum. Compact UI labels 1.0 to 1.2.
- **Weight Roles:** Regular 400 body, Medium 500 labels, Semibold 600 subheadings, Bold 700 headings, ExtraBold 800 display only.

---

## 4. Motion Tokens

- **Easing Assignments:** `ease-out` for anything entering or appearing. `ease-in` for anything exiting or leaving. `ease-in-out` for movement and resizing inside the viewport.
- **Duration Assignments:** 100ms for micro-feedback such as hover tints, toggles, and fades. 150 to 200ms for small elements such as button presses and tooltips. 200 to 300ms for medium surfaces such as modals and dropdowns. Up to 400ms for large movements such as page transitions. 500ms is the hard ceiling per `ui-ux-principles.md`.
- **Reduced Motion:** Apply all motion tokens only inside `@media (prefers-reduced-motion: no-preference)` per `ui-ux-principles.md`.

---

## 5. Icon System

- **One Library Per Project:** Choose exactly one set and stick with it. Approved options: Lucide, Phosphor, Heroicons, Radix Icons. Never mix sets.
- **Size Tiers:** 16px inline with text. 20px default UI glyphs. 24px navigation and primary controls. 32px feature highlights. 48px hero moments.
- **Rendering Rules:** 2px stroke weight throughout per `ui-ux-principles.md`. Rounded caps and joins. Draw on a 24 by 24 grid with optical alignment. Color icons through `currentColor` so they inherit text tokens automatically.
- **Hit Areas:** The visual glyph never equals the interactive area. Tappable icons reserve at least 44 by 44px per `ui-ux-principles.md`.

---

## 6. Component State Matrix

Every interactive component implements and documents all six states before shipping:

1. Default resting appearance.
2. Hover response.
3. Active pressed response.
4. Focus-visible ring meeting contrast rules in `ui-ux-principles.md`.
5. Disabled appearance with non-text contrast exemptions noted.
6. Loading state for any trigger performing an async operation.
