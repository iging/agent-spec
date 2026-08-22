---
name: Shared HTML/CSS Principles
description: Reusable, deterministic semantic HTML and CSS architecture constraints for generating robust frontend interfaces.
---

# Shared HTML/CSS Principles

> **Purpose:** Reusable, deterministic semantic HTML and CSS architecture constraints. Reference this file from your prompt to enforce strict machine-readable markup and scalable CSS design.

---

## 1. Semantic HTML and AI Readability

Apply these rules strictly to ensure the Document Object Model (DOM) is parseable by screen readers and AI agents.

- **Native First:** Enforce the use of native HTML5 sectioning elements (`<article>`, `<section>`, `<nav>`, `<aside>`, `<main>`). Do not use `<div>` or `<span>` for structural layout boundaries.
- **Strict Heading Hierarchy:** Enforce strict sequential order (`<h1>` through `<h6>`). Never skip heading levels for visual formatting. Use CSS exclusively for font sizing.
- **Form Semantics:** Mandate the use of `<label>` elements linked to their corresponding native inputs through the `for` attribute matching the input's `id`, or by wrapping the input inside the label. Avoid custom pseudo-inputs unless strictly necessary for complex UI.
- **Document Foundation:** Place exactly one `<main>` tag per page to identify the primary content payload.

---

## 2. Modern CSS Architecture

Apply these rules to eliminate specificity conflicts and prevent style regressions in large codebases.

- **Cascade Layers:** Enforce the use of the CSS `@layer` directive (e.g., `reset`, `base`, `components`, `utilities`) to explicitly manage style priority.
- **Ban `!important`:** The `!important` flag is strictly BANNED. Resolve conflicts using proper `@layer` ordering or increased selector specificity.
- **Component Scoping:** Mandate strict component-level scoping using either CSS Modules or a utility-first framework (e.g., Tailwind CSS v4 `@theme`). Global CSS stylesheets, excluding root variables and resets, are BANNED.

---

## 3. Advanced Layouts and Responsiveness

- **Container Queries:** Require `@container` queries instead of viewport-based `@media` queries for component-level layouts. This guarantees components remain fully modular and responsive regardless of their parent container.
- **Fluid Typography:** Mandate CSS math functions like `clamp()` for responsive text sizing and spacing. Do not write dozens of static breakpoints for minor screen shifts.
- **Logical Properties:** Replace physical CSS properties (e.g., `margin-left`, `padding-right`) with logical CSS properties (e.g., `margin-inline-start`, `padding-inline-end`). This automatically supports internationalization and right-to-left (RTL) reading modes.
- **Modern Layout Modules:** Use CSS Grid for two-dimensional page structures (rows and columns) and Flexbox for one-dimensional component alignment.

---

## 4. Interactive CSS

- **The `:has()` Selector:** Enforce the CSS `:has()` pseudo-class to style parent containers based on the state of their children. Avoid writing JavaScript for basic state-driven visual updates.
- **Native Interactivity:** Prioritize native HTML/CSS features over importing heavy third-party JavaScript libraries. The Popover API (`popover` attribute with `popovertarget`) is Baseline 2024 and safe in all engines. Guard scroll-driven animations (`animation-timeline` with `scroll()` or `view()`) behind `@supports (animation-timeline: scroll())`. They are not yet Baseline across all engines: Chrome supports them since 115 and Safari since 26, while other engines are still catching up.
