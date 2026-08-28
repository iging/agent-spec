---
name: Module Organization
description: Import-graph and bundling rules covering the barrel-file ban, direct imports, published package entry points, circular dependency prevention, and type-only imports.
---

# Module Organization

> **Purpose:** Rules governing how modules import from each other. Reference this file when creating files, moving exports, or reviewing import statements so the module graph stays flat, tree-shakeable, and fast for both bundlers and test runners.

---

## 1. No Barrel Files in Application Code

- **Rule:** Do not create or add to barrel files in application code. A barrel is an `index.js` or `index.ts` file strictly re-exporting sibling modules (for example `export * from './color'`).
- **Why Barrels Cost:** Importing one API through a barrel forces the bundler to resolve every module the barrel re-exports, including unrequested ones. Measured effects on real projects include slower dev server startup, degraded hot module replacement, inflated bundles when any re-exported module carries side effects, accidental circular imports, and slower test runner cold starts.
- **Direct Imports:** Import from the specific file defining the API: `import { useUser } from '@/hooks/use-user'`, never `import { useUser } from '@/hooks'`.
- **No New Barrels:** Do not introduce a new `index.ts` whose only job is re-exporting sibling files.

---

## 2. Existing Barrels Policy

- **Prefer Direct Imports:** In code you are touching, import directly from the source file instead of adding another re-export to an existing barrel.
- **Do Not Mass-Rewrite:** Removing existing barrels across untouched directories is a dedicated refactoring task with its own measurement step (dev server start time, test cold start). Do not mix it into feature work.

---

## 3. Published Package Entry Points

- **Single Sanctioned Exception:** A published library package may expose entry files listed in `package.json` (`main`, `module`, or `exports`).
- **Explicit Named Re-exports:** When writing a library entry boundary, use explicit named re-exports (for example `export { Button } from './button'`). Never use `export *` because it forces the bundler to load every module to enumerate its names.
- **Side-Effect Declarations:** Set `"sideEffects": false` in `package.json` for published packages unless specific files contain top-level side effects. This enables bundlers to prune unused exports during tree-shaking.

---

## 4. Zero Circular Dependencies

- **No Module Cycles:** Modules must never form circular import loops (A imports B, B imports A). Circular references break module initialization, cause runtime temporal dead zones (`undefined` imports), and degrade bundler resolution.
- **Cycle Resolution:** When two modules depend on each other, extract the shared types or logic into a separate downstream file, or apply dependency inversion by passing callbacks or instances at runtime.

---

## 5. Type-Only Imports and Path Mapping

- **Explicit Type Imports:** Use `import type` for type-only references (for example `import type { UserProfile } from '@/types/user'`). This ensures complete removal of type references during compilation and prevents phantom runtime dependencies.
- **Clean Path Mapping:** Use root path aliases (for example `@/components/button`) instead of deep relative imports (for example `../../../components/button`). This maintains clean import statements and simplifies code movement during refactoring.
