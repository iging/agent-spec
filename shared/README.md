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

- [`typescript-standards.md`](engineering/typescript-standards.md) — Type-system rules covering strict setup, erasable syntax, runtime validation, and advanced type derivation.
- [`naming-conventions.md`](engineering/naming-conventions.md) — Casing rules and clarity principles for files, components, hooks, functions, and identifiers.
- [`design-principles.md`](engineering/design-principles.md) — Structural design axioms covering SOLID, DRY, KISS, YAGNI, Law of Demeter, and encapsulation.
- [`function-design.md`](engineering/function-design.md) — Function shaping rules covering size, argument flow, side-effect honesty, guard clauses, JSDoc conventions, and file layout.
- [`module-organization.md`](engineering/module-organization.md) — Import-graph rules covering the barrel-file ban and direct imports.
- [`error-handling.md`](engineering/error-handling.md) — Exception design covering contract-first catches, exception translation, and the ban on exceptions as control flow.
- [`react-native-principles.md`](engineering/react-native-principles.md) — React Native and Expo foundation covering architecture posture, platform boundaries, list and image policies, storage security, and accessibility mapping.
- [`javascript-principles.md`](engineering/javascript-principles.md) — Modern JavaScript / TypeScript idiomatic patterns and conventions.
- [`nextjs-principles.md`](engineering/nextjs-principles.md) — Next.js App Router patterns, Server Components, and API route rules.

### Design (`shared/design/`)

- [`ui-ux-principles.md`](design/ui-ux-principles.md) — UI/UX design heuristics, accessibility baselines, and visual polish rules.
- [`html-css-principles.md`](design/html-css-principles.md) — Semantic HTML structure, responsive layouts, and CSS/Tailwind standards.
- [`design-tokens.md`](design/design-tokens.md) — Semantic token naming, spacing and type steps, motion easing assignments, icon tiers, and the component state matrix.

### Writing (`shared/writing/`)

- [`writing-rules.md`](writing/writing-rules.md) — Anti-AI prose constraints, banned marketing buzzwords, and concise documentation style.
