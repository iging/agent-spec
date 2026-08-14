# Shared Engineering, Design, & Writing Principles

## Role / Authority

- **Role:** Central index for shared conventions, coding principles, design guides, and writing rules.
- **Authority:** Cross-cutting guidance tier referenced by modules, templates, and runtime adapters.
- **Must not define:** Project-specific data models or framework core instructions.

---

## 1. Overview

The `shared/` directory organizes cross-cutting domain principles into structured sub-directories for agent guidance and quality enforcement.

## 2. Domain Catalogs

### Engineering (`shared/engineering/`)

- [`coding-principles.md`](engineering/coding-principles.md) — Core coding standards, type safety rules, and refactoring guidelines.
- [`javascript-principles.md`](engineering/javascript-principles.md) — Modern JavaScript / TypeScript idiomatic patterns and conventions.
- [`nextjs-principles.md`](engineering/nextjs-principles.md) — Next.js App Router patterns, Server Components, and API route rules.

### Design (`shared/design/`)

- [`ui-ux-principles.md`](design/ui-ux-principles.md) — UI/UX design heuristics, accessibility baselines, and visual polish rules.
- [`html-css-principles.md`](design/html-css-principles.md) — Semantic HTML structure, responsive layouts, and CSS/Tailwind standards.

### Writing (`shared/writing/`)

- [`writing-rules.md`](writing/writing-rules.md) — Anti-AI prose constraints, banned marketing buzzwords, and concise documentation style.
