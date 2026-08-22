---
name: Shared UI/UX Principles
description: Reusable, deterministic UI/UX and UX writing constraints for any prompt generating or modifying user interfaces.
---

# Shared UI/UX Principles

> **Purpose:** Reusable, deterministic UI/UX and UX writing constraints for any prompt generating or modifying user interfaces. Reference this file from your prompt to enforce strict aesthetic, accessibility, and behavioral standards.

---

## 1. Enterprise Accessibility (WCAG 2.2)

Apply these rules to guarantee neuro-inclusive and legally compliant interfaces. For products serving EU consumers, the European Accessibility Act has been enforceable since June 28, 2025 across e-commerce, banking, and consumer services, with penalties reaching EUR 100,000 under some national implementations.

- **Semantic HTML:** You MUST use native HTML elements (`<button>`, `<nav>`, `<main>`). Using `<div onClick={...}>` for interactive elements is strictly BANNED.
- **Keyboard Operability:** Ensure every interactive element is reachable via keyboard (`Tab`). Trap focus securely within open modals.
- **Non-Text Contrast:** Give icons, control boundaries, and state indicators at least 3:1 contrast against adjacent colors (WCAG 1.4.11). Never strip the default focus outline without supplying an author-built replacement (failure technique F78).
- **Focus Not Obscured:** Sticky headers, cookie banners, and floating footers must never fully hide the currently focused element (WCAG 2.4.11).
- **Accessible Authentication:** Sign-in and sign-up flows must not require cognitive tests such as memorizing secrets, solving puzzles, or retyping codes, unless an alternative exists such as paste-enabled inputs, password-manager support, or passkeys (WCAG 3.3.8).
- **Dragging Alternatives:** Every drag-based interaction such as sliders or sortable lists needs a single-tap or keyboard equivalent (WCAG 2.5.7).
- **Screen Reader Support:** Add descriptive `aria-label` attributes to any button or link lacking visible text (e.g., icon-only buttons).
- **Motion Accessibility:** Respect system preferences. Wrap all non-essential UI animations in `@media (prefers-reduced-motion: no-preference)` to protect users with vestibular sensitivities.

---

## 2. Visual Structure and Layout

Apply these rules strictly to all layout generation and CSS styling. Avoid arbitrary values.

- **Grid and Spacing:** Use a strict 4px baseline grid. All padding, margins, gaps, and border-radii MUST be multiples of 4 (e.g., 4, 8, 12, 16, 24, 32, 48). Never use arbitrary spacing values like 15px or 33px.
- **Typography Hierarchy:**
  - **H1 (Page Title):** 2.5rem (40px), Font Weight 700. Maximum one per page.
  - **H2 (Section Header):** 1.5rem (24px), Font Weight 600.
  - **H3 (Subsection):** 1.25rem (20px), Font Weight 600.
  - **Body text:** 1rem (16px), Font Weight 400, Line Height 1.5.
- **Elevation (Shadows):** Never generate custom box-shadows. Use only these three tiers:
  - `shadow-sm`: `0 1px 2px rgba(0,0,0,0.05)` for buttons, borders, subtle cards.
  - `shadow-md`: `0 4px 6px rgba(0,0,0,0.1)` for dropdowns, hover states.
  - `shadow-lg`: `0 10px 15px rgba(0,0,0,0.15)` for modals, popovers.
- **Color Contrast:** Ensure all text passes WCAG AA contrast ratios (minimum 4.5:1 for standard text, 3:1 for large text).
- **Alignment:** Never center-align paragraphs of body text. Left-align body text. Center only small discrete elements like buttons or single-line headers.

---

## 3. Cognitive Load and Information Architecture

- **Progressive Disclosure:** Do not overwhelm the user with dense data grids or massive forms. Hide advanced or secondary settings behind "Show More" toggles or accordion panels.
- **Predictability (Jakob’s Law):** Use standard industry patterns for navigation menus and form structures. Do not invent novel UI behaviors requiring users to relearn basic interactions.

---

## 4. Interactions and Behaviors

Enforce these behavioral states on all interactive elements.

- **Responsive Bounds:** Build mobile-first. Write base styles for the smallest viewport and add layouts with `min-width` media queries at standard tiers such as `min-width: 640px`, `min-width: 768px`, and `min-width: 1024px`. Never assume desktop-only usage. Do not mix `max-width` overrides into a `min-width` system because stacked opposing queries create specificity conflicts. For component-level adaptation, prefer container queries per `html-css-principles.md`.
- **Interactive States:** Every button, link, and interactive element MUST have explicitly defined `:hover`, `:focus-visible`, and `:active` states.
  - Use `:focus-visible` rather than `:focus` so keyboard users get a strong ring while pointer users do not see redundant outlines.
  - The focus indicator itself must hold 3:1 contrast against both the page background and the unfocused component state. A 2px solid outline with an offset satisfies the WCAG 2.4.13 size guidance (e.g., `outline: 2px solid var(--color-focus); outline-offset: 2px;`).
- **Touch Targets:** Any clickable element must have a minimum height and width of 44px. This matches the Apple Human Interface Guidelines and WCAG 2.5.5 Target Size Enhanced (Level AAA). Treat 24 by 24 CSS pixels (WCAG 2.5.8 Target Size Minimum, Level AA) as the legal compliance floor, never as the design target.
- **Micro-interactions (Closing the Loop):** Provide immediate visual feedback for user actions. Use disabled states, loading spinners, or toast notifications instantly upon submission to confirm system status. Time feedback per Nielsen Norman Group limits: acknowledge input within 100ms so interactions feel instantaneous, keep simple feedback animations near 100ms, reserve 200 to 300ms for large transitions such as modals, and never exceed 500ms.

---

## 5. Visual Elements and Theming

- **Theme Scaling (CSS Variables):** Hardcoded hex colors (e.g., `#10B981`) are BANNED inside component styles. You MUST use CSS variables (e.g., `var(--color-success)`) mapped to a global theme provider to guarantee instant Light/Dark mode compatibility. Drive mode switching from the `prefers-color-scheme` media query by default, and re-verify all contrast ratios in both modes because a palette passing on white can fail on dark surfaces.
- **Color Palette Constraint:** Limit the palette to 1 Primary color, 1 Secondary color, 1 Destructive color (red), and a grayscale spectrum.
- **Status Colors:**
  - Success: Green mapped to `var(--color-success)`
  - Warning: Yellow/Orange mapped to `var(--color-warning)`
  - Error: Red mapped to `var(--color-error)`
  - Info: Blue mapped to `var(--color-info)`
- **Iconography:** Use consistent stroke widths (e.g., 2px) and a consistent icon set. Never mix filled and outlined icons in the same UI unless denoting active/inactive states.

---

## 6. Defensive UX and Content Strategy

Apply these rules to all user-facing text and workflows.

- **Destructive Confirmation:** Any user action resulting in data deletion MUST trigger a confirmation modal. Do not rely on "Undo" toasts for irreversible actions.
- **Inline Validation:** Validate form inputs inline as the user types or removes focus (onBlur) to prevent errors before submission.
- **Action-Oriented CTAs:** Button text MUST start with a strong verb.
  - Allowed: "Save changes", "Create account", "Send message".
  - Banned: "Submit", "Click here", "OK", "Next".
- **Empty States:** Never leave a screen completely blank. If no data exists, explicitly state the reason and provide a clear CTA to create data.
- **Error Messages:** Error messages MUST state exactly what went wrong and how to fix the issue without blaming the user.
  - Allowed: "This password needs at least 8 characters."
  - Banned: "Invalid input", "An error occurred", "You entered the wrong password".
- **Consistency in Terminology:** Choose exactly one term per concept and apply it universally (e.g., never mix "Sign In" and "Log In").
