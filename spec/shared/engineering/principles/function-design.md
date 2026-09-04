---
name: Function Design
description: Rules for shaping functions and documenting code, covering size, cognitive complexity, argument flow, pure functions, side-effect honesty, guard clauses, and JSDoc conventions.
---

# Function Design

> **Purpose:** Structural rules for every function an agent or developer writes. Reference this file when generating application logic so functions stay small, honest about effects, and self-documenting through structure before comments.

---

## 1. Scope, Size, and Cognitive Complexity

- **Small Single-Purpose Functions:** A function must do one thing. If you can label chunks of a function with different names, split it into smaller functions.
- **One Level of Abstraction per Function:** High-level functions must read like a table of contents. Call lower-level functions instead of inlining details. Push loops and low-level logic into dedicated step-down functions.
- **Minimize Argument Count:** Aim for zero to two arguments. Wrap three or more parameters into a structured options object.
- **Cognitive Complexity Target:** Keep cognitive complexity at or below 15 (measured via SonarQube / Biome rules). Avoid deep nesting, complex conditional chains, or long subroutines.

---

## 2. Pure Functions and Execution Flow

- **Pure Functions First:** Prefer pure functions that compute output solely from input parameters without modifying external state.
- **No Parameter Reassignment or Output Arguments:** Data flows in through parameters and out through return values. Treat input arguments as immutable references. Never reassign parameters or mutate argument objects.
- **No Flag Arguments:** Do not pass boolean flags to select execution paths inside a function. Split the paths into separate named functions instead. Data booleans remain allowed (for example `setVisible(true)`).
- **Command Query Separation (CQS):** A function either performs an action (command) or returns data (query), never both. Split a `setX` returning existence into `xExists()` and `setX()`.
- **No Hidden Side Effects:** A function name is a contract. If a function performs effects beyond its name (for example `checkPassword()` resetting a session), rename it honestly or move the effect out.
- **Early Return Guard Pattern:** Handle errors and edge cases at the top of functions using early returns (`if (!data) return null;`). Avoid nested `if`/`else` chains.

---

## 3. Refactoring Lifecycle

- **Refactor After It Works:** Write working code covered by tests first. Clean up function size, naming, parameter objects, and duplication in a second pass.

---

## 4. Code Documentation Conventions

Apply these rules on every generation or edit of code in this project:

- **JSDoc Coverage:** Document every exported function, class, hook, provider, and utility with JSDoc. Include `@param` entries for each parameter, `@returns` for non-void returns, and `@throws` for functions that throw errors or return rejected promises. Describe contracts, units, and failure conditions rather than restating signatures.
- **Inline Comments Sparingly:** Add inline comments only for non-obvious logic such as workarounds, performance trade-offs, or external constraints. Code explains what. Comments explain why.
- **Comment Quality:** Keep comments current within the same edit as the code change. Delete stale comments immediately instead of patching them. Never leave commented-out code behind.

---

## 5. File Layout and Density

- **Headline First:** Place the highest-level function at the top of each source file so a reader learns what the module does within three lines.
- **Stepdown Order:** Define every function below its first caller. Files read top to bottom from high-level intent down to low-level detail.
- **Conceptual Affinity:** Group functions serving one purpose even when nothing calls them. Shared naming patterns signal shared placement.
- **Blank Lines Mark Concepts:** One blank line opens a new concept. Related lines stay vertically dense, because density communicates grouping and scattered spacing destroys scannability.
- **Declare Near Use:** Introduce each local variable immediately before its first use. Never hoist declarations to the top of long functions where readers carry them unused.
- **One Team Standard:** Brace placement, quote style, and indentation are team decisions. Choose one answer per project and apply it everywhere without exceptions.
