---
name: Shared JavaScript Principles
description: Foundational coding rules, enterprise architecture standards, and runtime validation constraints for generating JavaScript logic.
---

# Shared JavaScript Principles

> **Purpose:** Foundational coding rules, JavaScript architecture standards, and runtime validation constraints shared across all JS application environments. Reference this file from your prompt to enforce strict software engineering paradigms like SOLID, defensive coding, and explicit naming.

---

## 1. Enterprise Architecture and Functional Paradigm

- **Feature-Driven Structure:** Organize code by feature or domain (e.g., `/features/auth`) rather than technical type (e.g., all controllers in one folder). Encapsulate logic inside feature modules.
- **Pure Functions First:** Functions must remain pure, avoid side effects, and rely on higher-order functions. Global state mutation is BANNED.
- **Decoupled Communication:** Large applications must implement event-driven patterns (Pub/Sub) or dependency injection to prevent tight coupling.
- **No Barrel Files:** Do not create or add to barrel files (an `index.js` file strictly re-exporting other modules). Import directly from the specific file defining the API.

---

## 2. Modern Language Standards and Defensive Coding

- **Primary Language and ES Modules:** Modern JavaScript (ES2024+) is MANDATORY. You MUST use ES Modules (`import`/`export`). CommonJS (`require`) is strictly BANNED.
- **Variable Declarations:** Use `const` for all immutable references. Use `let` only for values undergoing reassignment. The `var` keyword is BANNED.
- **Null Safety:** Use optional chaining (`?.`) and nullish coalescing (`??`) to prevent runtime crashes when accessing nested objects.
- **Asynchronous Flow:** Use `async/await` exclusively for asynchronous operations. Promise chaining (`.then()`) is BANNED for readability. Wrap all asynchronous calls in `try/catch` blocks.
- **Immutable Maps over Enums:** Use `Object.freeze()` to create immutable constant maps instead of relying on loose strings for status flags or options.
- **Avoid Over-Engineering:** Prioritize web standards. Avoid unnecessary abstraction layers and prefer native JavaScript APIs (e.g., `Map`, `Set`, `Intl`) where applicable.

---

## 3. Type Safety Without TypeScript

- **Strict JSDoc Enforcement:** Every function, component, and complex object MUST have comprehensive JSDoc annotations (`@param`, `@returns`, `@typedef`). This enables IDE inference and catches errors early.
- **Runtime Validation:** Enforce explicit runtime validation at all system boundaries (API responses, form inputs, external libraries). Use `typeof`, `Array.isArray()`, or validation schemas (e.g., Zod) since compile-time checking is absent.
- **Default Parameters:** Assign default parameters in function signatures to ensure fallback values exist.

---

## 4. Naming Conventions (Files and Code)

### Casing and Structure Rules

- **Files and Folders:** Lowercase `kebab-case` for all files and directories.
- **React Components:** `PascalCase` for component declarations and JSX tags.
- **Variables and Functions:** `camelCase` for general variables, object keys, and utility functions.
- **Custom Hooks:** `use` + `camelCase`.
- **Event Handlers:** `handle` + `PascalCase`/`camelCase` describing the triggered action.
- **Global Constants:** `UPPER_SNAKE_CASE` for immutable global module constants.
- **Boolean Variables and Props:** Prefix with auxiliary verbs `is`, `has`, `can`, or `should`.

### Naming Clarity Principles

- **Reveal Intent:** A name must answer why it exists, what it does, and how it is used. If a comment fulfills this role, rename the symbol instead.
- **Avoid Disinformation:** Do not call a `Map` a `list`, and do not let two names differ only in visually ambiguous ways.
- **Make Meaningful Distinctions:** If two things have different names, they should carry different responsibilities. Prefer names stating actual roles.
- **Keep Names Pronounceable and Searchable:** Broadly scoped identifiers must be easy to read aloud and grep for. Single letters and magic numbers are allowed ONLY for short-scoped local loop variables.

---

## 5. Function Design and Code Structure

### Scope and Size

- **Small, Single-Purpose Functions:** A function must do one thing. If you can label chunks of a function with different names, split it into smaller functions.
- **One Level of Abstraction per Function:** High-level functions must read like a table of contents. Call lower-level functions instead of inlining details; push loops and low-level logic into dedicated stepdown functions.
- **Minimize Argument Count:** Aim for 0–2 arguments. Wrap 3+ parameters into a structured options object.

### Execution Flow and Side Effects

- **No Flag Arguments:** Do not use boolean flags to select execution code paths inside a function; split into separate named functions instead.
- **No Output Arguments:** Data flows in through parameters and out through return values without mutating input argument objects.
- **Command / Query Separation (CQS):** A function either performs an action (command) or returns data (query), never both.
- **No Hidden Side Effects:** Function names are contracts. If a function performs side effects beyond its name, rename it honestly or extract the side effect.
- **Early Return Guard Pattern:** Handle errors and edge cases at the top of functions using early returns. Avoid deeply nested `if/else` statements.

---

## 6. SOLID Principles and Code Philosophy

- **Single Responsibility Principle (SRP):** Each function or module has one reason to change. Keep presentation decoupled from logic.
- **Open/Closed Principle (OCP):** Extend functionality through composition or strategy patterns rather than mutating established core components.
- **Dependency Inversion Principle (DIP):** Pass dependencies into functions rather than hardcoding concrete implementations.
- **DRY (Don't Repeat Yourself):** Extract a shared abstraction only when a pattern genuinely repeats multiple times.
- **KISS (Keep It Simple):** Prefer the simplest design satisfying requirements. Avoid premature optimization or unnecessary indirection.
