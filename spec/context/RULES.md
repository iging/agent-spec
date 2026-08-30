# RULES — Coding Standards & Architecture Rules

> **Purpose:** Specify project coding rules, language standards, architecture guidelines, and design principles so all generated code is clean, consistent, and maintainable. Tier-3 template — fill it in for your project.

_Last updated: [DATE]_

---

## 1. Language & TypeScript Standards

[PLACEHOLDER: Define language options, compiler strictness, and typing rules.]

- **TypeScript Strict Mode:** Mandatory `strict: true` in `tsconfig.json`. No `any` types allowed without explicit review comments.
- **Type Declarations Location:** Store shared domain types in `src/types/` organized by domain (e.g., `src/types/user.ts`, `src/types/order.ts`). Avoid inline type duplication.
- **Type vs. Interface:** Consistently prefer `type` for object and utility definitions. Reserve `interface` only for declaration merging or class interface contracts.

---

## 2. Naming Conventions (Files & Code)

[PLACEHOLDER: Standardize naming patterns across the codebase.]

- **Files & Directories:** `kebab-case` for utility files, helpers, and documentation (e.g. `date-utils.ts`). `PascalCase` for React components (e.g. `UserProfile.tsx`).
- **Variables & Functions:** `camelCase` for variables, function names, and properties (e.g. `calculateTotal`). `PascalCase` for classes, types, and interfaces. `UPPER_SNAKE_CASE` for global constants.
- **Intent-Revealing Names:** Names must answer why an entity exists and what it does. Avoid generic noise suffixes (`Manager`, `Data`, `Handler`). Avoid obscure abbreviations (`t`, `tx`, `u`).

---

## 3. SOLID Principles Application

[PLACEHOLDER: Describe how SOLID principles are applied in this codebase.]

- **Single Responsibility Principle (SRP):** Each function/class has one reason to change. Separate UI presentation from business logic.
- **Open/Closed Principle (OCP):** Extend functionality through composition or strategy patterns rather than mutating established core functions.
- **Liskov Substitution Principle (LSP):** Subtypes or interface implementations must be drop-in replaceable without breaking caller expectations.
- **Interface Segregation Principle (ISP):** Prefer small, specific interfaces over bloated multi-purpose interfaces.
- **Dependency Inversion Principle (DIP):** Depend upon abstractions (interfaces/types), not concrete implementations. Pass dependencies into functions.

---

## 4. DRY & KISS Guidelines

[PLACEHOLDER: Explain rules for code reuse and simplicity.]

- **DRY (Don't Repeat Yourself):** Extract a shared abstraction only when a pattern genuinely repeats multiple times (not on the first occurrence).
- **KISS (Keep It Simple, Stupid):** Prefer the simplest design that satisfies requirements. Avoid premature optimization or over-engineered abstractions.

---

## 5. Code Structure & Organization Rules

[PLACEHOLDER: Detail code layout constraints and import rules.]

- **Small, Single-Purpose Functions:** Functions should be small (ideally < 30 lines) with one level of abstraction per function (stepdown rule).
- **Parameter Limit:** Limit parameters to 0–2. Group 3+ parameters into an options object.
- **Command / Query Separation (CQS):** A function either performs an action (command) or returns data (query), never both.
- **Avoid Barrel Files:** Do not create `index.ts` files that only re-export sibling files. Import directly from specific source files (e.g., `import { slash } from './utils/slash'` instead of `./utils`).

---

## 6. State Management Rules

[PLACEHOLDER: Enforce state scope boundaries.]

- **Keep State Local:** Prefer component-local state (`useState`) when data is consumed by a single component subtree.
- **Server State vs Client State:** Use dedicated query libraries (React Query / SWR) for API data fetching; reserve global stores (Zustand) for true client-only session state.
- **Immutability:** Never mutate state objects directly; use immutable update patterns.

---

## 7. Validation Strategy

[PLACEHOLDER: Standardize input validation at trust boundaries.]

- **Boundary Validation:** Validate all external inputs (API request bodies, URL params, form submissions) at system boundaries using schema validators (e.g., Zod / Yup / TypeBox).
- **Type Predicates:** Use TypeScript type predicates (`val is TargetType`) instead of manual type casting (`as TargetType`).

---

## 8. Error Handling & Security Practices

[PLACEHOLDER: Specify error boundaries and security standards.]

- **Exceptions over Error Codes:** Use `try/catch` and custom Error classes rather than threading error codes through call stacks.
- **Zero-Trust Security:** Sanitize user input before rendering to prevent XSS. Use parameterized SQL queries / ORMs to prevent SQL injection.
- **No Secrets in Code:** Never hardcode secret keys, API tokens, or credentials in source code. Load from environment variables (`process.env`).

---

## 9. Testing & Verification Conventions

[PLACEHOLDER: Define test location and coverage requirements.]

- **Test Placement:** Place unit tests adjacent to source files (e.g. `userService.ts` -> `userService.test.ts`) or in `__tests__/`.
- **Test Intent:** Write tests for critical business logic and bug fixes. Do not mock everything blindly; test public behavior.

---

## 10. Commit & PR Conventions

[PLACEHOLDER: Standardize version control workflows.]

- **Commit Messages:** Follow Conventional Commits format (`feat: add user login`, `fix: handle null token`, `docs: update PRD`).
- **Branch Naming:** `feature/short-description`, `fix/issue-description`.
