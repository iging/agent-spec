---
name: Shared HTML/CSS Principles
description: Reusable, deterministic semantic HTML and CSS architecture constraints for generating robust frontend interfaces.
---

# Shared HTML/CSS Principles

> **Purpose:** Reusable, deterministic semantic HTML and CSS architecture constraints. Reference this file from your prompt to enforce strict machine-readable markup and scalable CSS design.

---

## 1. Semantic HTML, Native Controls, and AI Readability

Apply these rules strictly to ensure the Document Object Model (DOM) is parseable by screen readers and AI agents.

- **Native First:** Enforce native HTML5 sectioning elements (`<article>`, `<section>`, `<nav>`, `<aside>`, `<main>`). Do not use `<div>` or `<span>` for structural layout boundaries.
- **Strict Heading Hierarchy:** Enforce strict sequential order (`<h1>` through `<h6>`). Never skip heading levels for visual formatting. Use CSS exclusively for font sizing.
- **Native Dialogs and Interactivity:** Use native `<dialog>` for modals (calling `.showModal()` for automatic focus trapping) and `<details>`/`<summary>` for accordions. Do not re-implement accessible dialog or disclosure patterns in JavaScript when native elements exist.
- **Form Semantics:** Mandate `<label>` elements linked to native inputs through `for` attributes matching input `id` attributes, or by wrapping inputs inside labels. Avoid custom pseudo-inputs unless required for complex custom controls.
- **Layout Stability and Media CLS Guardrails:** Reserve layout space for images and media by specifying explicit `width` and `height` attributes or setting `aspect-ratio` in CSS to prevent Cumulative Layout Shift (CLS).
- **Document Foundation:** Place exactly one `<main>` tag per page to identify the primary content payload.

---

## 2. Modern CSS Architecture

Apply these rules to eliminate specificity conflicts and prevent style regressions in large codebases.

- **Cascade Layers:** Enforce the CSS `@layer` directive (for example `reset`, `base`, `components`, `utilities`) to explicitly manage style priority across the cascade.
- **Ban `!important`:** The `!important` flag is strictly BANNED. Resolve conflicts using proper `@layer` ordering or increased selector specificity.
- **Component Scoping:** Mandate component-level scoping using CSS Modules or utility-first frameworks (for example Tailwind CSS v4 `@theme`). Global CSS stylesheets, excluding root custom properties and resets, are BANNED.

---

## 3. Advanced Layouts, Subgrid, and Responsiveness

- **Container Queries:** Require `@container` queries instead of viewport-based `@media` queries for component-level layout shifts. Components remain modular regardless of parent container width.
- **Fluid Typography and Spacing:** Mandate CSS math functions like `clamp()` for responsive text sizing and fluid spacing. Avoid writing dozens of static breakpoints for minor screen shifts.
- **Logical Properties:** Replace physical CSS properties (for example `margin-left`, `padding-right`) with logical CSS properties (for example `margin-inline-start`, `padding-inline-end`). This supports internationalization and right-to-left (RTL) rendering automatically.
- **Modern Layout Modules & CSS Subgrid:** Use CSS Grid for two-dimensional page layouts, Flexbox for one-dimensional component alignment, and **CSS Subgrid** (`grid-template-rows: subgrid`) to align internal card headers, bodies, and footers across multi-column card grids.

---

## 4. Interactive CSS and Entry Transitions

- **The `:has()` Selector:** Enforce the CSS `:has()` pseudo-class to style parent containers based on child state. Avoid writing JavaScript for basic state-driven visual updates.
- **Native Interactivity:** Prioritize native HTML/CSS features over importing heavy third-party JavaScript libraries. The Popover API (`popover` attribute with `popovertarget`) is Baseline 2024 and safe across engines.
- **Entry Transitions (`@starting-style`):** Animate native popover and dialog openings using CSS `@starting-style` and `transition-behavior: allow-discrete` without JavaScript animation libraries.
- **Feature-Guarded Animations:** Guard scroll-driven animations (`animation-timeline: scroll()` or `view()`) behind `@supports (animation-timeline: scroll())`. They are supported in Chrome (since 115) and Safari (since 26), while other engines are catching up.
- **Focus Rings:** Enforce distinct focus rings using `:focus-visible` meeting WCAG 2.2 contrast rules. Never suppress focus outlines (`outline: none`) without providing a visible replacement.
