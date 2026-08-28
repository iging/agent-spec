---
name: Shared JavaScript Principles
description: Foundational coding rules, enterprise architecture standards, ECMAScript standards, and runtime validation constraints for generating JavaScript logic.
---

# Shared JavaScript Principles

> **Purpose:** Foundational coding rules, JavaScript architecture standards, and runtime validation constraints shared across all JS application environments. Reference this file from your prompt to enforce software engineering paradigms like SOLID, defensive coding, and explicit naming. Where topics overlap with dedicated `shared/engineering/` files, those files are authoritative.

---

## 1. Enterprise Architecture and Functional Design

- **Feature-Driven Structure:** Organize code by feature or domain (for example `/features/auth`) rather than technical type (for example all controllers in one folder). Encapsulate logic inside feature modules.
- **Pure Functions First:** Functions must remain pure, avoid side effects, and rely on higher-order functions. Global state mutation is forbidden.
- **Decoupled Communication:** Large applications must implement event-driven patterns (Pub/Sub) or dependency injection to prevent tight coupling.
- **No Barrel Files:** Do not create or add to barrel files (`index.js` re-exporting sibling modules). Refer to `shared/engineering/module-organization.md` for authoritative module graph rules.

---

## 2. Modern ECMAScript Standards and Defensive Coding

- **Primary Language and ES Modules:** Modern JavaScript is mandatory. Target the current annual standard (ECMAScript 2026, the 17th edition, approved by Ecma in June 2026). You must use ES Modules (`import`/`export`). CommonJS (`require`) is forbidden outside tooling configuration files.
- **Variable Declarations:** Use `const` for all immutable references. Use `let` only for values undergoing reassignment. The `var` keyword is forbidden.
- **Null Safety:** Use optional chaining (`?.`) and nullish coalescing (`??`) to prevent runtime crashes when accessing nested objects.
- **Modern Array and Object Operations:** Prefer non-mutating array methods (`toSorted()`, `toReversed()`, `toSpliced()`, `with()`) over mutating counterparts (`sort()`, `reverse()`, `splice()`). Use `Object.groupBy()` and `Map.groupBy()` for grouping data.
- **Explicit Resource Management:** Use `using` declarations and `Symbol.dispose` for automated cleanup of handles, sockets, and memory buffers.
- **Native Immutability and Utilities:** Use `Object.freeze()` to create immutable constant maps instead of loose strings. Use native `structuredClone()` for deep object cloning instead of `JSON.parse(JSON.stringify())`. Prefer built-in Web APIs (`Map`, `Set`, `Intl`, `URLPattern`) over external utility libraries.

---

## 3. Async Flow, Error Chaining, and Cancellation

- **Asynchronous Flow:** Use `async/await` exclusively for asynchronous operations. Promise chaining (`.then()`) is forbidden for readability.
- **Structured Error Chaining:** Wrap asynchronous calls in `try/catch` blocks. When rethrowing errors, preserve root cause context using `Error.cause` (for example `throw new Error("Failed to load user profile", { cause: error })`).
- **Resilient Parallelism:** Use `Promise.allSettled()` when executing independent parallel operations where individual failures should not abort the entire batch.
- **Operation Cancellation:** Accept `AbortSignal` parameters in long-running or async network operations to support clean cancellation via `AbortController`.

---

## 4. Type Safety Without TypeScript (`@ts-check` & JSDoc)

- **Mandatory `@ts-check`:** Include `// @ts-check` at the top of JavaScript source files to enable static type analysis through the TypeScript compiler without requiring a build step.
- **Strict JSDoc Enforcement:** Every function, component, and complex object must have comprehensive JSDoc annotations (`@param`, `@returns`, `@typedef`, `@template`). This enables IDE inference and catches errors early.
- **Boundary Runtime Validation:** Enforce explicit runtime validation at all system boundaries (API responses, form inputs, external libraries). Use `typeof`, `Array.isArray()`, or schema validation libraries (such as Zod or Valibot) since compile-time type checking is absent at runtime.
- **Default Parameters:** Assign default parameters in function signatures to ensure fallback values exist.

---

## 5. Function Design and Code Structure

- **Small Single-Purpose Functions:** A function must do one thing. If labelled chunks exist inside a function, split them into smaller step-down functions.
- **One Level of Abstraction per Function:** High-level functions must read like a table of contents. Call lower-level functions instead of inlining implementation details.
- **Minimize Argument Count:** Aim for zero to two arguments. Wrap three or more parameters into a structured options object.
- **No Flag Arguments:** Do not use boolean flags to select execution paths inside a function. Split the paths into separate named functions instead.
- **No Output Arguments:** Data flows in through parameters and out through return values without mutating input argument objects.
- **Command Query Separation (CQS):** A function either performs an action (command) or returns data (query), never both.
- **No Hidden Side Effects:** Function names are contracts. If a function performs side effects beyond its name, rename it honestly or extract the side effect.
- **Early Return Guard Pattern:** Handle errors and edge cases at the top of functions using early returns. Avoid nested `if/else` logic.

---

## 6. SOLID Principles and Naming Alignment

- **Single Responsibility Principle (SRP):** Each function or module has one reason to change. Keep presentation decoupled from logic.
- **Open/Closed Principle (OCP):** Extend functionality through composition or strategy patterns rather than mutating established core components.
- **Dependency Inversion Principle (DIP):** Pass dependencies into functions rather than hardcoding concrete implementations.
- **DRY (Don't Repeat Yourself):** Extract a shared abstraction only when a pattern genuinely repeats multiple times.
- **KISS (Keep It Simple):** Prefer the simplest design satisfying requirements. Avoid premature optimization or unnecessary indirection.
- **Naming Alignment:** Follow `shared/engineering/naming-conventions.md` for universal casing rules (`kebab-case` files, `camelCase` functions/variables, `PascalCase` classes) and clarity principles across codebases.

