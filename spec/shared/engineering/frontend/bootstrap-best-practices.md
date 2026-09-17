---
name: Bootstrap Best Practices
description: Bootstrap 5.3 engineering rules covering grid system, utility classes, Sass customization, dark mode, accessibility (WCAG 2.2 AA), Core Web Vitals performance, and responsive design patterns for modern web development.
---

# Bootstrap Best Practices

> **Purpose:** Bootstrap 5.3 engineering rules for grid system, utility classes, Sass customization, dark mode, accessibility, and Core Web Vitals performance. Reference this file from your prompt to enforce strict Bootstrap standards.

---

## Role / Authority

- **Role:** Bootstrap framework engineering standard for responsive layouts, component styling, and accessible UI.
- **Authority:** Tier-3 shared engineering specification for Bootstrap-based projects.
- **Must not define:** Application-specific design tokens or framework core instructions.

---

## 1. Core Architecture and Grid System

- **Mobile-First:** Always design for the smallest screen first, then add larger breakpoints. Start with `.col-12` and progress to `.col-sm-6 .col-lg-4` etc.
- **Grid Hierarchy:** Follow the strict hierarchy: `.container` → `.row` → `.col-{breakpoint}-{n}`. Never nest `.container` inside another `.container`.
- **Container Variants:** Use the right container for the context. `container-fluid` for full-width dashboards, `container-xl` (1320px max) for landing pages on large monitors, `container` (1140px max) for standard content.
- **Gap Utilities:** Use `g-*`, `gx-*`, `gy-*` utilities (Bootstrap 5.2+) for spacing between columns. These replace legacy negative margin hacks on `.row`. Values run 0 to 5 (0.25rem to 3rem).
- **col-auto Pattern:** Use `col-auto` to let columns take only the width they need, paired with `col` to fill remaining space. This eliminates custom flexbox CSS for common layouts.
- **Avoid Index Keys:** Never use array indices as `key` props when mapping Bootstrap columns. Use stable unique identifiers instead.
- **Responsive Progression:** Use mobile-first column classes: `.col-12 .col-md-6 .col-lg-4` to ensure clear intent across breakpoints.

---

## 2. Utility Classes and Styling

- **Utility-First Approach:** Leverage Bootstrap's utility classes (`mt-3`, `d-flex`, `text-center`, `pb-0`) over custom CSS for spacing, typography, and layout. This keeps stylesheets lean and consistent.
- **Spacing System:** Bootstrap's spacing scale maps to rem values: `m-1`/`p-1` = 0.25rem, `m-2`/`p-2` = 0.5rem, `m-3`/`p-3` = 1rem, `m-4`/`p-4` = 1.5rem, `m-5`/`p-5` = 3rem. Extend the scale in Sass when needed.
- **Typography Utilities:** Use `fs-1` through `fs-6` for font sizes. Combine with responsive infixes for different sizes per breakpoint. Use `fw-medium` and `fw-semibold` (Bootstrap 5.2+) for font weight.
- **Display and Flexbox:** Use `d-flex`, `d-grid`, `flex-row`, `flex-column`, `justify-content-*`, `align-items-*` for layout. Extract a component class when more than four flex utilities appear on a single element.
- **Order Utilities:** Use `order-*` utilities to visually reorder columns without changing HTML source order. Critical for accessibility where screen readers follow DOM order.
- **Text Colors:** Prefer `text-body-secondary` and `text-body-tertiary` (Bootstrap 5.3) over `text-muted`. The former adapt to dark mode automatically via CSS custom properties.

---

## 3. Sass Customization and Design Tokens

- **Variable Overrides:** Customize Bootstrap using Sass variables (`$primary`, `$border-radius`, `$spacer`, `$grid-columns`) before the `@import` statement. Never patch with one-off CSS.
- **CSS Custom Properties:** Bootstrap 5.3 exposes core values as `--bs-*` variables at `:root`. Override at runtime for white-label projects or user-selectable themes. Always include RGB variants (for example `--bs-primary-rgb`) alongside hex values for alpha utilities.
- **Utility API:** Extend Bootstrap's utility layer via the `$utilities` map in Sass. Generate custom utility classes with `responsive: true` for breakpoint variants. Disable unused utilities by setting entries to `false` before import.
- **Semantic Token Naming:** Use semantic names like `--color-text-primary` and `--color-surface-raised` instead of flat names like `--primary-500`. Semantic tokens survive palette changes.
- **Dark Mode via Sass:** Bootstrap 5.3 supports dark mode via `data-bs-theme="dark"` on `<html>` or any container. Toggle with JavaScript: `document.documentElement.setAttribute('data-bs-theme', 'dark')`.

---

## 4. Accessibility (WCAG 2.2 AA)

WCAG 2.2 is the baseline in 2026. The EU European Accessibility Act and US DOJ ADA Title II enforce these standards legally.

- **Semantic HTML:** Pair Bootstrap classes with proper HTML elements (`<button>`, `<nav>`, `<form>`, `<label>`, `<header>`, `<main>`). Buttons must use `<button>` elements, not `<div>` with `role="button"`.
- **Focus Management:** Ensure all interactive components have visible focus states. Bootstrap includes focus styles by default, but verify they haven't been overridden. WCAG 2.2 SC 2.4.11 requires focused elements to be at least partially visible.
- **Color Contrast:** Verify color contrast ratios meet WCAG 2.2 AA standards (4.5:1 for normal text, 3:1 for large text). Bootstrap's default colors generally meet these ratios, but custom themes must be validated.
- **Target Size:** WCAG 2.2 SC 2.5.8 requires interactive targets to be at least 24x24 CSS pixels. Bootstrap's default components generally meet this, but custom styling may reduce tap targets below threshold.
- **Keyboard Navigation:** Everything clickable must be keyboard accessible. Test by unplugging your mouse and navigating the entire interface with Tab, Enter, Escape, and arrow keys.
- **Screen Reader Testing:** Run manual testing with NVDA (Windows) or VoiceOver (macOS). Automated tools catch only 30-40% of accessibility issues.
- **Reduced Motion:** Honor `prefers-reduced-motion` with: `*, ::before, ::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }`

---

## 5. Performance and Core Web Vitals

Performance is architecture in 2026. Core Web Vitals directly affect search ranking and conversion.

- **LCP (Largest Contentful Paint):** Target under 2.5 seconds. Preload hero images with `<link rel="preload">` and `fetchpriority="high"`. Never apply `loading="lazy"` to above-the-fold images.
- **INP (Interaction to Next Paint):** Target under 200ms. Keep event handlers lean. Use `scheduler.yield()` or `setTimeout` to break up long tasks over 50ms. Debounce expensive handlers (search-as-you-type, drag, scroll).
- **CLS (Cumulative Layout Shift):** Target under 0.1. Set explicit `width` and `height` on images and videos. Use CSS `aspect-ratio` for responsive containers. Reserve space for late-loading elements.
- **Purge Unused CSS:** In production, use PurgeCSS or your bundler's tree-shaking to strip unreferenced Bootstrap classes. Selective imports can cut CSS bundle 40-60% vs full CDN.
- **Selective JavaScript Imports:** Import only the components you need: `import { Tooltip } from 'bootstrap'`. Never load the entire `bootstrap.bundle.js` for a single tooltip.
- **Font Loading:** Use `font-display: swap` for text fonts (accepts FOUT, rejects FOIT). Use `font-display: optional` for decorative display fonts. Pair with `size-adjust` and `ascent-override` to match fallback font metrics and reduce CLS.
- **Image Formats:** Serve WebP (25-35% smaller than JPEG) or AVIF (50%+ smaller). Use `<picture>` element for format fallbacks.
- **Defer Non-Critical Scripts:** Use `defer` or `type="module"` on scripts that don't block initial render.

---

## 6. Dark Mode Implementation

Bootstrap 5.3 introduced native dark mode support without additional libraries.

- **data-bs-theme Attribute:** Add `data-bs-theme="dark"` to `<html>` or any container element for dark mode. Bootstrap automatically adapts colors, shadows, and borders.
- **Color-Mode-Aware Utilities:** Use `text-body-secondary` instead of `text-muted`. Use `bg-*-subtle` and `text-*-emphasis` pairs for accessible callout blocks that respect dark mode automatically.
- **Theme Toggle Script:** Implement with minimal JavaScript that reads `localStorage` and `prefers-color-scheme`, then sets `document.documentElement.setAttribute('data-bs-theme', mode)`.
- **Mixed-Mode Layouts:** Apply `data-bs-theme` to individual sections for mixed light/dark layouts within the same page.

---

## 7. Responsive Design Patterns

- **Real Device Testing:** DevTools device simulation misses real CPU speed, network conditions, iOS Safari quirks, and Android Chrome address bar resizing. Test on a real device, even a budget Android phone.
- **Container Selection:** Use `container-fluid` for dashboards that fill the screen. Use `container-xl` (1320px) for landing pages on large monitors. Use `container` (1140px) for standard content with readable line length.
- **Responsive Tables:** Three approaches in order of preference: (1) horizontal scroll with `table-responsive`, (2) priority columns hidden on mobile with `d-none d-md-table-cell`, (3) card layout on mobile with normal table on tablet+.
- **Stack Pattern for Navigation:** Use Bootstrap offcanvas component for mobile sidebars. It handles animation, focus trapping, and dismiss behavior without custom JavaScript.
- **Responsive Typography:** Combine `fs-*` utilities with display utilities or SCSS for larger text on desktop, smaller on mobile. Extend the font-size scale in Sass if the default 1-6 range is insufficient.

---

## 8. Setup and Project Configuration

- **Use Bootstrap 5.3:** Bootstrap 3 and 4 are end-of-life. Bootstrap 5.3 adds dark mode, CSS custom properties, and gap utilities. Use the current stable version.
- **Package Manager Installation:** Install via NPM/Yarn for production to enable version pinning, custom Sass builds, and tree-shaking. CDN is acceptable for prototypes or internal tools.
- **Sass Build Order:** Your `main.scss` should override Sass variables before importing Bootstrap, then add project-specific rules after: `@import "custom-variables"; @import "bootstrap/scss/bootstrap"; @import "custom-components";`
- **Responsive Meta Tag:** Always include `<meta name="viewport" content="width=device-width, initial-scale=1">` in `<head>`. Without it, layouts break on mobile.
- **Data Attribute API:** Leverage Bootstrap's data attribute API for interactive components (modals, dropdowns, tooltips) rather than writing JavaScript. Example: `<button data-bs-toggle="modal" data-bs-target="#myModal">`.
- **Selective Sass Imports:** Import only the Sass files you need for a smaller compiled output. The grid and utilities cover 80-90% of layout needs without full component imports.

---

## 9. Integration Patterns

- **React/Next.js:** Bootstrap works with React but requires manual setup. Use `react-bootstrap` or plain Bootstrap classes. For Next.js App Router, import Bootstrap CSS in the root layout.
- **Server Components:** Bootstrap CSS loads on the server. Pair with React Server Components for zero-hydration content that uses Bootstrap styling.
- **Third-Party Scripts:** Use the Facade Pattern. Render a static placeholder (PNG of widget), load the real script only on user interaction. This protects INP scores.
- **CI/CD Performance Budgets:** Enforce LCP, INP, and CLS thresholds in your CI pipeline. Fail the build if metrics regress beyond agreed thresholds.

---

## 10. Common Anti-Patterns

| Anti-Pattern                                                   | Fix                                                                                          |
| -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Overriding Bootstrap with `!important` everywhere              | Customize via Sass variables before `@import` statement                                      |
| Loading the entire JS bundle for a single tooltip              | Import individual plugins: `import { Tooltip } from 'bootstrap'`                             |
| Nesting `.container` inside another `.container`               | Use a single container; nest `.row` and `.col-*` inside it                                   |
| Using `.col-12` on every breakpoint, ignoring responsiveness   | Design mobile-first: `.col-12 .col-sm-6 .col-lg-4` progressions                              |
| Mixing custom CSS with Bootstrap utilities in conflicting ways | Use Sass theme customization as the base; add custom components only when needed             |
| Ignoring the viewport meta tag                                 | Always include `<meta name="viewport" content="width=device-width, initial-scale=1">`        |
| Loading JavaScript bundle twice                                | Ensure bootstrap.js is not loaded separately if bootstrap.bundle.js is already included      |
| Lazy-loading above-the-fold images                             | Never apply `loading="lazy"` to hero/LCP images; use `fetchpriority="high"` instead          |
| Using `text-muted` in new projects                             | Use `text-body-secondary` (Bootstrap 5.3) for dark-mode-aware text                           |
| Negative margin hacks on `.row` for spacing                    | Use `g-*`, `gx-*`, `gy-*` utilities (Bootstrap 5.2+)                                         |
| Writing custom CSS for spacing already covered by utilities    | Use `m-*`, `p-*`, `gap-*` utilities before reaching for custom rules                         |
| Skipping real device testing                                   | Test on actual mobile hardware; DevTools simulation misses real performance and touch issues |
