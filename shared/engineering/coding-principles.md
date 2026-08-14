---
name: Shared Coding Principles
description: Foundational coding rules, TypeScript standards, and architectural constraints for any prompt generating application logic.
---

# Shared Coding Principles

> **Purpose:** Foundational coding rules, TypeScript standards, and architectural constraints shared across all application environments. Reference this file from your prompt to enforce strict software engineering paradigms like SOLID, DRY, and explicit naming.

---

## 1. Language and TypeScript Standards

### Core Setup and Architecture

- **Primary Language:** TypeScript (Strict mode enabled in `tsconfig.json`).
- **Type Declarations Location:** Put every interface and type declaration in `src/types/`, organized as one dedicated file per domain/concern (e.g., `src/types/user.ts`). Component and hook files import from `src/types/` rather than declaring their own.
- **Functional and Declarative Patterns:** Use pure functional components and declarative patterns. Avoid ES6 classes for React components.

### Type Definition Rules

- **Type vs. Interface:** Prefer `interface` for object shapes and public contracts. The TypeScript compiler caches interfaces significantly faster at enterprise scale. Reserve `type` strictly for unions, primitives, and complex utility mappings.
- **Avoid Enums:** Do not use TypeScript `enum`s. Rationale: They generate runtime boilerplate objects, increasing bundle size and preventing tree-shaking. Use union literal types (`type Status = 'idle' | 'loading' | 'success'`) or `as const` object maps, which are fully erased at compile time.
- **Make Illegal States Unrepresentable:** Model polymorphic types using discriminated unions (`kind` field) instead of optional fields (`?`) and non-null assertions (`!`).
- **Tuples over Loose Arrays:** Use Tuples (`[string, number]`) for fixed-length positional arrays instead of union arrays (`(string | number)[]`).

### Runtime Safety and Validation

- **Parse, Don't Validate:** API responses (DTOs) MUST be parsed into internal Domain Models at the system edge using runtime validation (e.g., Zod schemas). Do not bleed raw API types throughout the UI logic.
- **Avoid `any`:** The `any` keyword is strictly BANNED. Use `unknown` for external data, forcing safe type-narrowing (type guards) before execution.
- **Avoid Type Assertions (`as`):** Use type predicates (`fn(x): x is TargetType`) instead of manual type casting to ensure runtime safety. Leverage TS 5.5 automatic type predicate inference; stop writing manual predicates for simple array filter operations.
- **Exhaustive Checks:** Enforce compile-time coverage on unions using `const _exhaustiveCheck: never = value` in default branches.

### Advanced Type Manipulation

- **Branded Types:** Introduce Branded Types (`type UserId = string & { __brand: 'UserId' }`) for critical identifiers. This prevents accidentally mixing identical primitives across domains.
- **Explicit Return Types:** Enforce explicit return types on high-level or complex functions. This prevents massive compiler slowdowns and circular inference loops in large codebases.
- **Types as Sets:** Treat types as sets of values (`unknown` is Universal Set, `never` is Empty Set, `&` is Intersection, `|` is Union).
- **Distributive Conditional Types Control:** Wrap generic parameters in tuples `[T] extends [Array<unknown>]` when distributing union types is undesired.
- **Precision with `as const` and `satisfies`:** Use `as const` for literal types/tuples. Use `satisfies` to validate schema conformance without widening or discarding the inferred literal types.
- **Derive Types (DRY):** Derive types using `typeof`, `ReturnType<T>`, `Pick`, `Omit`, Mapped Types, and Template Literal Types instead of manually duplicating type structures.
- **Type Extraction with `infer`:** Use `infer` in conditional generic types to extract unwrapped payload types on the fly.

---

## 2. Naming Conventions (Files and Code)

### Casing and Structure Rules

- **Files and Folders:** Lowercase `kebab-case` for all files and directories (e.g., `theme-provider.tsx`, `auth-wizard/`).
- **React Components:** `PascalCase` for component declarations and JSX tags (e.g., `ThemeProvider`, `ProjectCard`).
- **Variables and Functions:** `camelCase` for general variables, object keys, and utility functions (e.g., `userSession`, `calculateTotal`).
- **Custom Hooks:** `use` + `camelCase` (e.g., `useTheme`, `useMediaQuery`, `useUser`).
- **Event Handlers:** `handle` + `PascalCase`/`camelCase` describing the triggered action (e.g., `handleClick`, `handleSubmit`, `handleSelect`).
- **Global Constants:** `UPPER_SNAKE_CASE` for immutable global module constants (e.g., `MAX_POSTS_PER_PAGE`, `API_BASE_URL`).
- **Boolean Variables and Props:** Prefix with auxiliary verbs `is`/`has`/`can`/`should` (e.g., `isLoading`, `hasError`, `canSubmit`, `shouldRender`).
- **React Context:** `PascalCase` + `Context` (e.g., `ThemeContext`, `AuthContext`).
- **Context Providers:** `PascalCase` + `Provider` (e.g., `ThemeProvider`, `AuthProvider`).
- **React Refs:** `camelCase` + `Ref` (e.g., `containerRef`, `inputRef`, `buttonRef`).

### Naming Clarity Principles

- **Reveal Intent:** A name must answer why it exists, what it does, and how it is used. If a comment fulfills this role, rename the symbol instead.
- **Avoid Disinformation:** Do not call a `Map` a `list`, and do not let two names differ only in visually ambiguous ways (e.g., `userData` vs. `userDate`, lowercase `l` vs. `1`).
- **Make Meaningful Distinctions:** If two things have different names, they should carry different responsibilities. Generic noise suffixes like `Manager`, `Handler`, `Data` on every class are noise; prefer names stating actual roles.
- **Keep Names Pronounceable and Searchable:** Broadly scoped identifiers must be easy to read aloud and grep for. Single letters and magic numbers are allowed ONLY for short-scoped local loop variables.
- **Skip Type Encodings:** Do not prefix names with type identifiers (`strName`, `iCount`); TypeScript's type system surfaces types automatically.
- **Avoid Forcing Mental Mapping:** Do not force readers to hold lookup tables of abbreviations in their head (`t`, `tx`, `u`); spell out full concepts (`transaction`, `user`).

---

## 3. SOLID Principles Application

- **Single Responsibility Principle (SRP):** Each function/component has one reason to change. Keep presentation components decoupled from routing and state logic.
- **Open/Closed Principle (OCP):** Extend functionality through composition or strategy patterns rather than mutating established core components.
- **Liskov Substitution Principle (LSP):** Subtypes or interface implementations must be drop-in replaceable without breaking caller expectations.
- **Interface Segregation Principle (ISP):** Prefer small, specific interfaces over bloated multi-purpose interfaces.
- **Dependency Inversion Principle (DIP):** Depend upon abstractions (interfaces/types), not concrete implementations. Pass dependencies into functions.
- **Polymorphism over Type Branching:** Replace repeated `switch`/`if` checks on type flags with discriminated unions or polymorphic patterns.

---

## 4. DRY and KISS Guidelines

- **DRY (Don't Repeat Yourself):** Extract a shared abstraction only when a pattern genuinely repeats multiple times (not on the first occurrence). Premature extraction leads to rigid code.
- **KISS (Keep It Simple):** Prefer the simplest design satisfying requirements. Avoid premature optimization, over-engineered abstractions, or unnecessary indirection.

---

## 5. Function Design and Code Structure

### Scope and Size

- **Small, Single-Purpose Functions:** A function must do one thing. If you can label chunks of a function with different names, split it into smaller functions.
- **One Level of Abstraction per Function:** High-level functions must read like a table of contents. Call lower-level functions instead of inlining details; push loops and low-level logic into dedicated stepdown functions.
- **Minimize Argument Count:** Aim for 0–2 arguments. Wrap 3+ parameters into a structured options object.

### Execution Flow and Side Effects

- **No Flag Arguments:** Do not use boolean flags to select execution code paths inside a function; split into separate named functions instead. (Data booleans like `setVisible(true)` are allowed).
- **No Output Arguments:** Data flows in through parameters and out through return values without mutating input argument objects.
- **Command / Query Separation (CQS):** A function either performs an action (command) or returns data (query), never both. (e.g., split `setX` returning existence into `xExists()` and `setX()`).
- **No Hidden Side Effects:** Function names are contracts. If a function performs side effects beyond its name (e.g., `checkPassword()` resetting a session), rename it honestly or move the side effect out.
- **Early Return Guard Pattern:** Handle errors and edge cases at the top of functions using early returns (`if (!data) return null;`). Avoid deeply nested `if/else` statements.

### Lifecycle and Documentation

- **Refactor After It Works:** Write working code covered by tests first, then clean up function size, naming, and duplication in a second pass.
- **Code Documentation Conventions:** Every time code is generated or edited in this project, apply the JSDoc and inline-comment rules from `prompts/04-code-documentation.md`: JSDoc on exported functions, classes, hooks, providers, and utilities; inline comments only for genuinely non-obvious logic; and the Comment Quality Principles in the specified file.

---

## 6. Avoid Barrel Files

- **Rule:** Do not create or add to barrel files (an `index.js`/`index.ts` file strictly re-exporting other modules in the same directory, e.g. `export * from './color'`).
- **Rationale and Performance:** Importing a single API from a barrel file forces the bundler to fetch and transform every module the barrel re-exports (even unrequested ones). This triggers initialization side effects, slows down dev server startup and HMR, creates circular dependency crashes, and inflates bundle size due to lack of tree-shaking.
- **Direct Imports:** Import directly from the specific file defining the API, e.g. `import { useUser } from './hooks/useUser'` instead of `import { useUser } from './hooks'`.
- **No New Barrels:** Do not introduce a new `index.ts` whose only job is re-exporting sibling files.
- **Existing Barrels Policy:** If a barrel file already exists in code you're touching, prefer importing directly from the source file over adding another re-export to the barrel.
