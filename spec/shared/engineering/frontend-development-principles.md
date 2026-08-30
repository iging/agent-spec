---
name: Frontend Development Principles
description: Framework-agnostic frontend engineering standards for component architecture, state hierarchy colocation, interface resilience, Core Web Vitals performance, and WCAG accessibility.
---

# Frontend Development Principles

> **Purpose:** Baseline client-side engineering rules shared across UI frameworks. Reference this file when building user interfaces, orchestrating state, optimizing Core Web Vitals, or ensuring accessibility.

---

## Role / Authority

- **Role:** Framework-agnostic engineering standard for client-side user experience, state management, web performance, and interface accessibility.
- **Authority:** Tier-3 shared engineering specification for client-side applications across frameworks (React, Vue, Svelte, or native Web API).
- **Must not define:** Backend data persistence or server database queries.

---

## 1. Single Responsibility and Component Architecture

- Separate presentation components from container logic. Presentation components render UI elements; container logic handles data fetching and state orchestration.
- Enforce component purity. Components must produce identical rendering outputs given identical props and state.
- Keep component files concise. Extract sub-components when Cognitive Complexity exceeds standard thresholds.

---

## 2. State Hierarchy and Colocation

- Colocate state as close to its point of use as possible. Avoid unnecessary global state wrappers.
- State taxonomy:
  - **Local UI State:** Toggle flags, active tab indexes, form field inputs.
  - **Server State:** Cached API responses (managed via query caches or native server components).
  - **URL State:** Search queries, pagination indexes, filter selections (stored in URL query parameters for shareability).
- Derived state must be computed during render rather than duplicated in local state variables.

---

## 3. Interface Resilience and Degraded States

- Handle four distinct UI states for asynchronous boundaries: Loading, Success, Empty, and Error.
- Wrap application sub-trees inside Error Boundaries to prevent a single component failure from breaking the full page layout.
- Provide optimistic UI updates with immediate feedback and automatic rollback logic on network failure.

---

## 4. Web Performance and Core Web Vitals

- **Cumulative Layout Shift:** Set explicit width and height attributes or CSS aspect ratios on images and media containers to prevent layout shifts.
- **Largest Contentful Paint:** Preload critical hero assets and eliminate blocking JavaScript bundles from the initial render path.
- **Interaction to Next Paint:** Keep event handlers lean. Yield execution back to the main browser thread for heavy computational tasks.

---

## 5. Interface Accessibility

- Use native semantic HTML elements (`<main>`, `<nav>`, `<article>`, `<header>`, `<button>`, `<a>`) rather than unsemantic `<div>` click handlers.
- Ensure interactive elements feature visible focus indicators (`:focus-visible`) and meet WCAG 2.2 target sizing requirements: a minimum target size of 24 by 24 CSS pixels for Level AA compliance (SC 2.5.8), or 44 by 44 CSS pixels for Level AAA compliance (SC 2.5.5).
- Respect user system preferences. Support dark mode themes (`color-scheme`) and reduced motion settings (`prefers-reduced-motion`).

---

## 6. Defensive Data Handling and Form Security

- Validate client-side form inputs in real time, but re-verify all inputs on submit before network dispatch.
- Parse external API responses defensively using runtime schemas before passing payloads into UI components.
- Sanitize HTML rendering to prevent Cross-Site Scripting (XSS) attacks. Avoid unsafe direct HTML insertions into the DOM.
