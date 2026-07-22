# DESIGN — Design System & Output Conventions

> **Purpose:** Define visual/brand identity, design tokens, component styling, layout primitives, and accessibility conventions so UI implementation is consistent and high-quality. Tier-3 template — fill it in for your project.

_Last updated: [DATE]_

---

## 1. Brand Identity & Art Direction

[PLACEHOLDER: Describe the visual personality, tone of voice, and core design principles.]

- **Brand Voice:** [e.g., Professional, modern, minimal, friendly]
- **Visual Aesthetic:** [e.g., Sleek dark mode, glassmorphism, clean typography, vibrant accent highlights]
- **Design Philosophy:** [e.g., Content-first, high contrast, smooth micro-interactions]

---

## 2. Color Palette & Semantic Tokens

[PLACEHOLDER: Define exact color values and semantic design tokens.]

- **Primary Accent:** `var(--color-primary)` (e.g., `#6366F1` / HSL values)
- **Secondary Accent:** `var(--color-secondary)` (e.g., `#EC4899`)
- **Backgrounds & Surfaces:**
  - Background Base: `var(--bg-base)`
  - Surface Elevation 1 (Cards, Modals): `var(--bg-surface-1)`
  - Surface Elevation 2 (Dropdowns, Tooltips): `var(--bg-surface-2)`
- **Semantic State Tokens:**
  - Success: `var(--color-success)` (e.g., `#22C55E`)
  - Warning: `var(--color-warning)` (e.g., `#F59E0B`)
  - Danger / Error: `var(--color-error)` (e.g., `#EF4444`)
  - Info: `var(--color-info)` (e.g., `#3B82F6`)

---

## 3. Theme Variants (Light / Dark / Custom)

[PLACEHOLDER: Explain how theme variants are configured and toggled.]

- **Light Theme Tokens:** Overrides for background, text, and border tokens.
- **Dark Theme Tokens:** Default/custom dark palette tokens.
- **Theme Switching:** Managed via CSS classes (`.dark`), `data-theme` attribute, or theme context providers.

---

## 4. Typography Scale & Font Stack

[PLACEHOLDER: Specify font families, weights, font size scale, and line heights.]

- **Font Family (Body & UI):** `Inter, system-ui, sans-serif`
- **Font Family (Monospace / Code):** `Fira Code, JetBrains Mono, monospace`
- **Type Scale:**
  - `Display / H1`: 36px / 2.25rem (Bold, line-height 1.2)
  - `H2`: 28px / 1.75rem (SemiBold, line-height 1.3)
  - `H3`: 22px / 1.375rem (SemiBold, line-height 1.35)
  - `H4`: 18px / 1.125rem (Medium, line-height 1.4)
  - `Body Base`: 16px / 1rem (Regular, line-height 1.5)
  - `Body Small / Caption`: 14px / 0.875rem (Regular, line-height 1.4)

---

## 5. Spacing, Grid & Layout System

[PLACEHOLDER: Define spacing scale, container max-widths, and grid breakpoints.]

- **Spacing Scale (4pt Base):** `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`
- **Grid Breakpoints:**
  - Mobile (`sm`): 640px
  - Tablet (`md`): 768px
  - Desktop (`lg`): 1024px
  - Large Desktop (`xl`): 1280px
- **Layout Containers:** `max-width: 1200px` with responsive horizontal padding.

---

## 6. Border Radius, Elevation & Borders

[PLACEHOLDER: Define corner rounding tokens and border styles.]

- **Border Radius Tokens:** `radius-sm` (4px), `radius-md` (8px), `radius-lg` (12px), `radius-full` (9999px)
- **Borders & Dividers:** `1px solid var(--border-color)`

---

## 7. Shadows, Motion & Animations

[PLACEHOLDER: Define elevation shadows, transition durations, and keyframe animations.]

- **Shadow Tokens:** `shadow-sm`, `shadow-md`, `shadow-lg`
- **Transition Speed:** Fast (150ms), Medium (300ms), Slow (500ms) with `cubic-bezier(0.4, 0, 0.2, 1)` easing.
- **Reduced Motion:** Respect `@media (prefers-reduced-motion: reduce)` by suppressing non-essential animations.

---

## 8. Accessibility Guidelines

[PLACEHOLDER: Standardize accessibility requirements.]

- **Conformance Target:** WCAG 2.2 AA.
- **Contrast Minimums:** 4.5:1 for normal text, 3:1 for large text and UI components.
- **Keyboard Navigation:** Explicit, visible focus rings on all interactive elements.
- **Screen Reader Support:** Semantic HTML markup or React Native `accessibilityRole` / `accessibilityLabel` properties.

---

## 9. Component Style Rules

[PLACEHOLDER: Define rules for common UI component states (default, hover, focus, active, disabled).]

- **Buttons:** Clear primary/secondary variants with distinct hover and disabled states.
- **Form Inputs:** Consistent label placement, helper text, and error states.
- **Modals & Cards:** Backdrop blur, overlay click handlers, and focus trapping.

---

## 10. Product Tour & Interaction Patterns

[PLACEHOLDER: Define UX patterns for onboarding, modals, toast notifications, and guided tours.]

- **Toast Notifications:** Fixed position top-right or bottom-center with auto-dismiss (3-5s).
- **Onboarding / Product Tour:** Step-by-step modal tooltips highlighting key features.

---

## 11. Output Conventions (Non-UI Projects)

[PLACEHOLDER: For CLIs, libraries, or background services — define output format (JSON / table / log shape), message tone, error formatting, and exit code standards.]
