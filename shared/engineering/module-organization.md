---
name: Module Organization
description: Import-graph and bundling rules covering the barrel-file ban, direct imports, and policy for existing barrels in application code.
---

# Module Organization

> **Purpose:** Rules governing how modules import from each other. Reference this file when creating files, moving exports, or reviewing import statements so the module graph stays flat, tree-shakeable, and fast for both bundlers and test runners.

---

## 1. No Barrel Files

- **Rule:** Do not create or add to barrel files in application code. A barrel is an `index.js` or `index.ts` file strictly re-exporting sibling modules (for example `export * from './color'`).
- **Why Barrels Cost:** Importing one API through a barrel forces the bundler to resolve every module the barrel re-exports, including unrequested ones. Measured effects on real projects include slower dev server startup, degraded hot module replacement, inflated bundles when any re-exported module carries side effects, accidental circular imports, and slower test runner cold starts.
- **Direct Imports:** Import from the specific file defining the API: `import { useUser } from './hooks/useUser'`, never `import { useUser } from './hooks'`.
- **No New Barrels:** Do not introduce a new `index.ts` whose only job is re-exporting sibling files.

---

## 2. Existing Barrels Policy

- **Prefer Direct Imports:** In code you are touching, import directly from the source file instead of adding another re-export to an existing barrel.
- **Do Not Mass-Rewrite:** Removing existing barrels across untouched directories is a dedicated refactoring task with its own measurement step (dev server start time, test cold start). Do not mix it into feature work.

---

## 3. Single Sanctioned Exception

- **Published Package Entry Points:** A library package may expose exactly one entry file listed in `package.json` (`main`, `module`, or `exports`). When writing such a boundary, use explicit named re-exports (`export { Button } from './button'`). Never use `export *` because it forces the bundler to load each module merely to enumerate its names.
