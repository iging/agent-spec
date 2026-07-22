# DESIGN — Design & Output Conventions (Web)

> **Purpose:** Define visual/brand identity, design tokens, Component & Semantic HTML5 structure, layout primitives, and accessibility conventions for `apps/web/`. Grounded in `context/DESIGN.md`.

_Last updated: 2026-07-22_

---

## 1. Brand Identity & Art Direction

- **Brand Voice:** Professional, modern, minimal, friendly.
- **Visual Aesthetic:** Clean, modern, accessible web UI with semantic HTML structures.
- **Design Philosophy:** Content-first, high contrast, smooth micro-interactions. Prioritize readability and clarity over decorative elements.

---

## 2. Color Palette & Semantic Tokens

- **Design Tokens:** CSS custom properties (`var(--bg-primary)`, `var(--text-main)`).
- **Primary Accent:** `var(--color-primary)` — [fill hex/HSL when project starts].
- **Secondary Accent:** `var(--color-secondary)` — [fill hex/HSL when project starts].
- **Backgrounds & Surfaces:**
  - Background Base: `var(--bg-base)`
  - Surface Elevation 1 (Cards, Modals): `var(--bg-surface-1)`
  - Surface Elevation 2 (Dropdowns, Tooltips): `var(--bg-surface-2)`
- **Semantic State Tokens:**
  - Success: `var(--color-success)`
  - Warning: `var(--color-warning)`
  - Danger / Error: `var(--color-error)`
  - Info: `var(--color-info)`

---

## 3. Theme Variants (Light / Dark / Custom)

- **Theme Switching:** Dark mode support via CSS `prefers-color-scheme` or `data-theme` attribute on `<html>`. Maintain WCAG AA contrast targets.
- **Light Theme Tokens:** Overrides for background, text, and border tokens for light mode.
- **Dark Theme Tokens:** Default/custom dark palette tokens with adjusted surface elevations and text contrast.

---

## 4. Typography Scale & Font Stack

- **Font Family (Body & UI):** `Inter, system-ui, sans-serif` — [customize when project starts].
- **Font Family (Monospace / Code):** `Fira Code, JetBrains Mono, monospace`.
- **Type Scale:**
  - `Display / H1`: 36px / 2.25rem (Bold, line-height 1.2)
  - `H2`: 28px / 1.75rem (SemiBold, line-height 1.3)
  - `H3`: 22px / 1.375rem (SemiBold, line-height 1.35)
  - `H4`: 18px / 1.125rem (Medium, line-height 1.4)
  - `Body Base`: 16px / 1rem (Regular, line-height 1.5)
  - `Body Small / Caption`: 14px / 0.875rem (Regular, line-height 1.4)
- **Heading Hierarchy (`<h1>`–`<h6>`):** Maintain a strict linear heading hierarchy. Exactly one `<h1>` per page.
- **Text & Inline Semantics:** Use `<p>` for blocks of prose text. Use `<a>` with descriptive anchor text for hyperlinks. Use `<ol>` for sequential steps, `<ul>` for bulleted lists. Use `<q>` for inline quotes and `<blockquote>` for block quotes. Use `<em>` for stress emphasis, `<strong>` for strong importance, `<mark>` for search highlighting, and `<code>`/`<pre>` for preformatted code.

---

## 5. Spacing, Grid & Layout System

- **Spacing Scale (4pt Base):** `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`.
- **Grid Breakpoints:**
  - Mobile (`sm`): 640px
  - Tablet (`md`): 768px
  - Desktop (`lg`): 1024px
  - Large Desktop (`xl`): 1280px
- **Layout Containers:** `max-width: 1200px` with responsive horizontal padding.
- **Structural Containers (Semantic HTML5):** Replace generic `<div>` wrappers with semantic HTML5 elements:
  - `<header>`: Site headers, logos, and top navigation.
  - `<nav>`: Primary and secondary navigation link blocks.
  - `<main>`: Primary content of the page. Exactly **one** `<main>` per page. Must **never** be nested inside `<header>`, `<footer>`, `<article>`, or `<aside>`.
  - `<section>`: Thematically grouped content under a common heading.
  - `<article>`: Self-contained, reusable content (e.g. blog posts, card widgets, news items).
  - `<aside>`: Tangential sidebars or callouts.
  - `<footer>`: Page or section footers containing copyright, contact, or legal links.
- **CSS Layout Primitives:** Grid and Flexbox layouts wrapped inside semantic layout containers (`<header>`, `<main>`, `<section>`, `<article>`).

---

## 6. Border Radius, Elevation & Borders

- **Border Radius Tokens:** `radius-sm` (4px), `radius-md` (8px), `radius-lg` (12px), `radius-full` (9999px).
- **Borders & Dividers:** `1px solid var(--border-color)`.

---

## 7. Shadows, Motion & Animations

- **Shadow Tokens:** `shadow-sm` (subtle card lift), `shadow-md` (dropdown/popover), `shadow-lg` (modal/dialog).
- **Transition Speed:** Fast (150ms), Medium (300ms), Slow (500ms) with `cubic-bezier(0.4, 0, 0.2, 1)` easing.
- **Reduced Motion:** Respect `@media (prefers-reduced-motion: reduce)` by suppressing non-essential animations.

---

## 8. Accessibility Guidelines

- **Conformance Target:** WCAG 2.2 AA.
- **Contrast Minimums:** 4.5:1 for normal text, 3:1 for large text and UI components.
- **Screen Reader Navigation:** Semantic HTML tags enable screen readers to parse and navigate page landmarks accurately.
- **Keyboard Navigation:** Explicit, visible focus rings on all interactive elements. Use `outline: 2px solid var(--color-primary); outline-offset: 2px;` as default focus style. Never use `outline: none` without a visible replacement.
- **Interactive Elements:** Ensure unique, descriptive `id` attributes for form controls and clear focus rings for keyboard navigation.
- **Testing:** Automated testing with Lighthouse / Axe, paired with manual keyboard and screen reader testing.

---

## 9. Component Style Rules

- **Separation of Structure and Style:** HTML tags define structure and meaning; CSS handles visual presentation. Never use tags like `<h1>` or `<strong>` solely for font sizing or bolding. Group media using `<figure>` and `<figcaption>`.
- **Styling Conventions:** Centralize CSS variables for theme states. Avoid inline `style` attributes for dynamic styling; use CSS classes or style props.
- **Buttons:** Clear primary/secondary variants with distinct hover, focus, active, and disabled states.
- **Form Inputs:** Consistent label placement, helper text, and error states with red border + error message pattern.
- **Modals & Cards:** Backdrop blur, overlay click-to-dismiss handlers, and focus trapping within modal content.

---

## 10. Product Tour & Interaction Patterns

- **Toast Notifications:** Fixed position top-right or bottom-center with auto-dismiss (3–5s). Include close button for manual dismissal.
- **Modal Focus Trapping:** Standardized modal focus trapping so keyboard Tab stays within the modal while open.
- **Onboarding / Product Tour:** Step-by-step modal tooltips highlighting key features.

---

## 11. Output Conventions (Non-UI Projects)

- N/A for Web UI App.
