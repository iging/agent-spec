---
name: Bootstrap Best Practices
description: Bootstrap 5 engineering rules covering grid system, utility classes, customization, accessibility, and performance guidelines for modern web development.
---

# Bootstrap Best Practices

> **Purpose:** Bootstrap 5 engineering rules for grid system, utility classes, customization, accessibility, and performance. Reference this file from your prompt to enforce strict Bootstrap standards.

---

## 1. Core Architecture and Grid System

- **Mobile-First:** Always design for the smallest screen first, then add larger breakpoints. Start with `.col-12` and progress to `.col-sm-6 .col-lg-4` etc.
- **Grid Hierarchy:** Follow the strict hierarchy: `.container` → `.row` → `.col-{breakpoint}-{n}`. Never nest `.container` inside another `.container`.
- **Avoid Index Keys:** Never use array indices as `key` props when mapping Bootstrap columns. Use stable unique identifiers instead.
- **Responsive Progression:** Use mobile-first column classes: `.col-12 .col-md-6 .col-lg-4` to ensure clear intent across breakpoints.

---

## 2. Utility Classes and Components

- **Utility-First Approach:** Leverage Bootstrap's utility classes (`mt-3`, `d-flex`, `text-center`, `pb-0`) over custom CSS for spacing, typography, and layout. This keeps stylesheets lean and consistent.
- **Component Consistency:** Bootstrap's prebuilt components (buttons, navs, cards, forms) provide accessible, consistent styling. Only override defaults when brand requirements demand it.
- **Customization via SASS:** Customize Bootstrap using SASS variables (`$primary`, `$border-radius`, `$spacer`) rather than writing one-off CSS overrides. Change the theme at the source, not via `!important` patches.
- **Minimal JavaScript Bundle:** Load only the JavaScript components you need (modals, dropdowns, tooltips) via individual imports rather than the entire `bootstrap.bundle.js`. Remove unused components with a custom build step.

---

## 3. Accessibility and Quality

- **Semantic HTML:** Pair Bootstrap classes with proper HTML elements (`<button>`, `<nav>`, `<form>`, `<label>`) for accessibility and SEO. Buttons should use `<button>` elements, not `<div>` with `role="button"`.
- **Focus Management:** Ensure all interactive components have visible focus states. Bootstrap includes focus styles by default, but verify they haven't been overridden.
- **Color Contrast:** Verify color contrast ratios meet WCAG 2.1 AA standards. Bootstrap's default colors generally meet these ratios, but custom themes must be validated.
- **Responsive Testing:** Test layouts on real devices, not just browser DevTools. Verify tap targets, spacing, navbar toggler behavior, and dropdown menus on mobile phones and tablets.

---

## 4. Performance and Optimization

- **Purge Unused CSS:** In production, use PurgeCSS or your bundler's tree-shaking to strip unreferenced Bootstrap classes. The full framework is ~22 KB min+gzip; unused CSS can balloon this significantly.
- **Minify and Concatenate:** Minify CSS and JavaScript files for production deployment. Concatenate files where appropriate to reduce HTTP requests.
- **Avoid !important:** Never use `!important` to override Bootstrap styles. If overrides are necessary, customize via SASS variables before the `@import` statement or use a single, well-placed override class.
- **Grid Nesting:** Avoid nesting `.row` inside `.row` without a `.col` wrapper. This creates unpredictable spacing and layout behavior. If complex sublayouts are needed, wrap them in separate components.

---

## 5. Setup and Project Configuration

- **Use Bootstrap 5:** Bootstrap 3 and 4 are end-of-life. Browser updates can cause breaking changes. If constrained, use Bootstrap LTS to bridge the gap until migration.
- **Package Manager Installation:** Install Bootstrap via NPM/Yarn for production projects to enable version pinning, custom builds, and update management. CDN is acceptable for prototypes or internal tools.
- **Responsive Meta Tag:** Always include `<meta name="viewport" content="width=device-width, initial-scale=1">` in `<head>`. Without it, layouts break on mobile devices.
- **Data Attribute API:** Leverage Bootstrap's data attribute API for interactive components (modals, dropdowns, tooltips) rather than writing JavaScript. Example: `<button data-bs-toggle="modal" data-bs-target="#myModal">`.

---

## 6. Common Anti-Patterns

| Anti-Pattern                                                   | Fix                                                                                                              |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Overriding Bootstrap with `!important` everywhere              | Customize via SASS variables before `@import` statement                                                          |
| Loading the entire JS bundle for a single tooltip              | Import individual plugins: `import { Tooltip } from 'bootstrap'`                                                 |
| Nesting `.container` inside another `.container`               | Use a single container; nest `.row` and `.col-*` inside it                                                       |
| Using `.col-12` on every breakpoint — ignoring responsiveness  | Design mobile-first: `.col-12 .col-sm-6 .col-lg-4` progressions                                                  |
| Mixing custom CSS with Bootstrap utilities in conflicting ways | Use SASS theme customization as the base; add custom components only when needed                                 |
| Ignoring the viewport meta tag                                 | Always include `<meta name="viewport" content="width=device-width, initial-scale=1">`                            |
| Loading JavaScript bundle twice                                | Ensure bootstrap.js is not loaded separately if bootstrap.bundle.js is already included (bundle includes Popper) |
