---
name: Tailwind CSS Best Practices
description: Tailwind CSS v4 engineering rules covering design tokens, utility classes, variants, dark mode, responsive design, and performance guidelines for modern web development.
---

# Tailwind CSS Best Practices

> **Purpose:** Tailwind CSS v4 engineering rules for design tokens, utility classes, variants, dark mode, and performance. Reference this file from your prompt to enforce strict Tailwind standards.

---

## 1. Design Tokens and Theme Configuration

- **CSS-First Configuration:** All design tokens live in `@theme` blocks in your main CSS file. Never scatter values across arbitrary bracket syntax (`bg-[#1a2b3c]`) as a primary design system — this creates inconsistency and maintenance debt.
- **Token Promotion:** When a value appears more than once (colors, radii, shadows, spacing, breakpoints), promote it to `@theme` rather than repeating bracket syntax. Example: define `--primary` in `@theme` and use `bg-primary` / `text-primary` / `border-primary` everywhere.
- **Semantic Naming:** Use semantic token names (`text-foreground`, `bg-surface`) rather than literal color names (`text-slate-800`). This makes refactoring brand colors trivial — change the token once, everywhere updates.
- **Spacing, Radius, Typography Tokens:** Standardize on Tailwind's default scale for spacing (`p-4`, not `p-[18px]`), radius (`rounded-md`, `rounded-xl`), typography (`text-sm leading-6`), and shadows (`shadow-sm`, `shadow-md`). Allow arbitrary values only as rare exceptions with a clear reason.

---

## 2. Utility Classes and Component Patterns

- **Think in Utility Classes First:** The core Tailwind habit is combining single-purpose utility classes directly in markup. Only reach for custom CSS when Tailwind genuinely cannot express the styling need.
- **Keep Class Lists Readable:** Long class lists are normal in Tailwind, but unformatted lists are the problem. Use `prettier-plugin-tailwindcss` to auto-sort classes in a deterministic order (layout > spacing > sizing > typography > visual > interactive). Configure CI with `prettier --check`.
- **Group Long Class Lists with Comments:** For class lists with 20+ utilities, group them with comments representing styling concerns: layout, spacing, typography, visual, responsive overrides, dark mode, conditional states.
- **Extract Real Components, Not Giant Parent Classes:** When the same combination of utilities appears in 3+ places, extract it as a React/Vue component with the class string directly on the element — not via `@apply`. Component extraction preserves Tailwind's tree-shaking mechanism and keeps styles co-located with markup.
- **Avoid `@apply` as Default:** `@apply` is an anti-pattern for everyday component styling because it hides the utility layer Tailwind provides and prevents tree-shaking (scanner cannot detect `@apply` usage in templates). Use `@apply` only for:
  - Truly global, non-composable patterns (base button resets)
  - Bridging Tailwind with CSS you cannot express in markup (CMS articles, vendor widgets)
  - Component primitives where the class string is versioned separately
    Otherwise, extract components or keep utilities in templates.

---

## 3. Variants for States, Themes, and Responsive Behavior

- **State Variants:** Use `hover:`, `focus:`, `disabled:`, `active:` prefixes for interactive states. Never rely on custom CSS for hover/focus styles — Tailwind's variants are the first-class mechanism.
- **Responsive Prefixes:** Use responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) intentionally. Define what each breakpoint means in your product context and only override what changes at larger breakpoints. Mobile-first: set base mobile styles, then add overrides at specific breakpoints.
- **Dark Mode (Class Strategy):** For products, class-based dark mode (`dark:` prefix) is usually best. Toggle the `dark` class on `<html>` from a script that reads `localStorage` and `prefers-color-scheme` (use `next-themes` or minimal approach). Style with `dark:` variants.
- **Dark Mode Pitfall:** Never use `@theme inline` for dark mode colors. `@theme inline` bakes the variable's value into the utility at build time, breaking runtime dark-mode switching. The correct approach: put raw HSL channel values in `:root` / `.dark` and map them with non-inline `@theme`.
- **Focus Visible:** Always include `focus-visible` styles. Never use `:focus { outline: none }` without providing an accessible alternative. Example: `:focus-visible { outline: 2px solid hsl(var(--ring)); outline-offset: 2px }`.
- **Reduced Motion:** Honor `prefers-reduced-motion` with minimal CSS: `*, ::before, ::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }` at `@media (prefers-reduced-motion: reduce)`.

---

## 4. Class Name Detectability and Dynamic Classes

- **Statically Detectable Classes:** Tailwind only generates classes it can find in source files. Never construct class names dynamically via string concatenation (e.g., `` `bg-${color}-600` ``). Tailwind's scanner cannot detect these, leading to missing styles or bloated CSS.
- **Interpolation Replacement:** Replace interpolated fragments like `bg-${color}-600` with a map of complete class names, or promote the value to a `@theme` token.
- **Gitignore and Scanning:** Register library paths explicitly when they contain full utility classes you need. Tailwind ignores `node_modules` and paths covered by `.gitignore` during automatic detection. Add `@source` for exact paths Tailwind must scan.
- **Safelist for Known Variations:** Use `safelist` in your Tailwind config only for known class variations that the scanner cannot detect. Keep safelist minimal — it should not be a replacement for proper token usage.

---

## 5. Custom CSS and @apply Usage

- **Custom CSS Only When Needed:** Tailwind is not a religion. Use custom CSS when:
  - Styling third-party markup you do not control
  - Defining a truly reusable custom utility
  - Targeting selectors or pseudo-elements that would be awkward inline (e.g., `::before` content, complex `:not()` chains)
- **@Apply Restrictions:** Use `@apply` sparingly. In Tailwind v4, `@apply` doubles down on preventing tree-shaking because the scanner cannot analyze which parts of the utility are needed inside CSS rules. Each `@apply` block carries the full weight of the utility's generated rules.
  - Good uses: Base button resets, design-system primitives, components you genuinely want to version separately.
  - Bad uses: Everyday component styling, theme customization, composing utilities that could stay in templates.
- **@Layer Components:** For creating reusable component abstractions, use `@layer components` directive. This ensures your custom component styles have correct cascade priority and can be overridden by utilities. `@layer components` still allows tree-shaking, unlike bare `@apply`.

---

## 6. Preflight and Base Styles

- **Understand Preflight Before Disabling:** Preflight (built on `modern-normalize`) is usually why buttons, headings, lists, or borders look different after installing Tailwind. Do not turn it off globally as a reflex — understand what it changed and override specific areas.
- **Selective Overrides:** If Preflight's base reset affects areas you care about, override only those specific selectors rather than disabling the entire layer.

---

## 7. Upgrade to v4 Deliberately

- **Official Upgrade Guide Required:** Tailwind v4 changes how customization, installation, and browser support work. Read the official upgrade guide before upgrading.
- **Migration Checklist:**
  - Move repeated design decisions into `@theme` (colors, spacing, typography, breakpoints, shadows)
  - Check any old `tailwind.config.js` assumptions (config is gone in v4 — moved to CSS `@import`/`@theme`)
  - Validate build tooling and plugins (v4 uses Oxide engine, new Vite plugin `@tailwindcss/vite`)
  - Test pages that relied on older defaults or reset behavior
- **10-Minute Tailwind Audit:** On one representative screen:
  1. Find repeated arbitrary colors, radii, shadows, spacing, breakpoints. Promote to `@theme`.
  2. Find class strings repeated across templates. Extract components when markup/behavior repeat.
  3. Find interpolated fragments `bg-${color}-600`. Replace with complete class names.
  4. Check if shared packages live in ignored folders. Add `@source` for exact sources.
  5. Build production CSS and open hover, focus, disabled, dark, and responsive states — not only default desktop view.
  6. Keep one unusual arbitrary value when truly one-off. A clean system still needs escape hatches.

---

## 8. Performance and Bundle Optimization

- **Content Paths Configuration:** Configure the `content` array (or `@source` in v4) precisely to include all files where Tailwind classes are used. Misconfigured paths are the most common cause of bloated CSS files — either huge output or missing styles.
- **Tree-Shaking Mechanism:** Tailwind's JIT compiler scans source files and generates only utilities you actually use. Preserve this by never constructing class names dynamically and avoiding `@apply` abuse.
- **Production CSS Monitoring:** Track your CSS output size. A typical Tailwind project has a 3-5 KB CSS file after purging unused utilities. Every `@apply` block used in 10 places can bloat output by 40-60KB per instance.
- **Build Speed:** Tailwind v4's Oxide engine (Rust) offers up to 5× faster build speed and over 100× incremental builds. Keep configuration minimal to maintain performance.
