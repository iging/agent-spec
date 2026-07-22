# RULES — Web App Coding Rules

> **Purpose:** Specify web app coding rules, language standards, architecture guidelines, and design principles so all generated code is clean, consistent, and maintainable. Tier-3 rules for `apps/web/`.

_Last updated: 2026-07-22_

---

## 1. Language & TypeScript Standards

- **Primary Language:** TypeScript (Strict mode enabled).
- **Type Declarations Location:** Put every interface and type declaration in `apps/web/src/types/`, organized as one dedicated file per domain/concern (e.g., `apps/web/src/types/user-session.ts`). Component and hook files import from `apps/web/src/types/` rather than declaring their own.
- **Type vs. Interface:** Consistently use `type` construct for object definitions. Reserve `interface` only when requiring interface merging or object-oriented class/interface hierarchies.
- **Types as Sets:** Treat types as sets of values (`unknown` is Universal Set, `never` is Empty Set, `&` is Intersection, `|` is Union).
- **Make Illegal States Unrepresentable:** Model polymorphic types using discriminated unions (`kind` field) instead of optional fields (`?`) and non-null assertions (`!`).
- **Avoid Type Assertions (`as`):** Use type predicates (`fn(x): x is TargetType`) instead of manual type casting.
- **Distributive Conditional Types Control:** Wrap generic parameters in tuples `[T] extends [Array<unknown>]` when distributing union types is undesired.
- **Exhaustive Checks:** Enforce compile-time coverage on unions using `const _exhaustiveCheck: never = value` in default branches.
- **Tuples over Loose Arrays:** Use Tuples (`[string, number]`) for fixed-length positional arrays instead of union arrays (`(string | number)[]`).
- **Precision with `as const` & `satisfies`:** Use `as const` for literal types/tuples. Use `satisfies` to validate schema conformance without widening or discarding the inferred literal types.
- **Type Extraction with `infer`:** Use `infer` in conditional generic types to extract unwrapped payload types on the fly.
- **Derive Types (DRY):** Derive types using `typeof`, `ReturnType<T>`, `Pick`, `Omit`, Mapped Types, and Template Literal Types instead of manually duplicating type structures.
- **Avoid Enums:** Do not use TypeScript `enum`s (they generate runtime boilerplate objects). Use union literal types (`type Status = 'idle' | 'loading' | 'success'`) or `as const` object maps.
- **Typed API Responses:** Define strict TypeScript types or Zod schemas for all network request payloads and server responses.

---

## 2. Naming Conventions (Files & Code)

- **Casing & Structure Rules:**
  - **Files & Folders:** Lowercase `kebab-case` for all files and directories (e.g., `theme-provider.tsx`, `blog-post.ts`, `auth-wizard/`).
  - **React Components:** `PascalCase` for component declarations and JSX tags (e.g., `ThemeProvider`, `ProjectCard`).
  - **Variables & Functions:** `camelCase` for general variables, object keys, and utility functions (e.g., `userSession`, `calculateTotal`).
  - **Custom Hooks:** `use` + `camelCase` (e.g., `useTheme`, `useMediaQuery`, `useUser`).
  - **Event Handlers:** `handle` + `PascalCase`/`camelCase` describing the triggered action (e.g., `handleClick`, `handleSubmit`, `handleSelect`).
  - **Global Constants:** `UPPER_SNAKE_CASE` for immutable global module constants (e.g., `MAX_POSTS_PER_PAGE`, `API_BASE_URL`).
  - **Boolean Variables & Props:** Prefix with auxiliary verbs `is`/`has`/`can`/`should` (e.g., `isLoading`, `hasError`, `canSubmit`, `shouldRender`).
  - **React Context:** `PascalCase` + `Context` (e.g., `ThemeContext`, `AuthContext`).
  - **Context Providers:** `PascalCase` + `Provider` (e.g., `ThemeProvider`, `AuthProvider`).
  - **React Refs:** `camelCase` + `Ref` (e.g., `containerRef`, `inputRef`, `buttonRef`).
- **Naming Clarity Principles:**
  - **Reveal Intent:** A name must answer why it exists, what it does, and how it is used. If a comment is doing that job, rename the symbol instead.
  - **Avoid Disinformation:** Do not call a `Map` a `list`, and do not let two names differ only in visually ambiguous ways (e.g., `userData` vs. `userDate`, lowercase `l` vs. `1`).
  - **Make Meaningful Distinctions:** If two things have different names, they should carry different responsibilities. Generic noise suffixes like `Manager`, `Handler`, `Data` on every class are noise — prefer names that state actual roles.
  - **Keep Names Pronounceable & Searchable:** Broadly scoped identifiers must be easy to read aloud and grep for. Single letters and magic numbers are allowed ONLY for short-scoped local loop variables.
  - **Skip Type Encodings:** Do not prefix names with type identifiers (`strName`, `iCount`); TypeScript's type system surfaces types automatically.
  - **Avoid Forcing Mental Mapping:** Do not force readers to hold lookup tables of abbreviations in their head (`t`, `tx`, `u`); spell out full concepts (`transaction`, `user`).

---

## 3. SOLID Principles Application

- **Single Responsibility Principle (SRP):** Each function/component has one reason to change. Keep presentation components decoupled from page routing and data fetching logic.
- **Open/Closed Principle (OCP):** Extend functionality through composition or strategy patterns rather than mutating established core components.
- **Liskov Substitution Principle (LSP):** Subtypes or interface implementations must be drop-in replaceable without breaking caller expectations.
- **Interface Segregation Principle (ISP):** Prefer small, specific interfaces over bloated multi-purpose interfaces.
- **Dependency Inversion Principle (DIP):** Depend upon abstractions (interfaces/types), not concrete implementations. Pass dependencies into functions.
- **Polymorphism over Type Branching:** Replace repeated `switch`/`if` checks on type flags with discriminated unions or polymorphic patterns.

---

## 4. DRY & KISS Guidelines

- **DRY (Don't Repeat Yourself):** Extract a shared abstraction only when a pattern genuinely repeats multiple times (not on the first occurrence).
- **KISS (Keep It Simple):** Prefer the simplest design that satisfies requirements. Avoid premature optimization, over-engineered abstractions, or unnecessary indirection.

---

## 5. Code Structure & Organization Rules

- **Function Design Conventions:**
  - **Small, Single-Purpose Functions:** A function must do one thing. If you can label chunks of a function with different names, split it into smaller functions.
  - **One Level of Abstraction per Function:** High-level functions must read like a table of contents. Call lower-level functions instead of inlining details; push loops and low-level logic into dedicated stepdown functions.
  - **Minimize Argument Count:** Aim for 0–2 arguments. Wrap 3+ parameters into a structured options object.
  - **No Flag Arguments:** Do not use boolean flags to select execution code paths inside a function; split into separate named functions instead. (Data booleans like `setVisible(true)` are allowed).
  - **No Output Arguments:** Data flows in through parameters and out through return values without mutating input argument objects.
  - **Command / Query Separation (CQS):** A function either performs an action (command) or returns data (query), never both. (e.g., split `setX` returning existence into `xExists()` and `setX()`).
  - **No Hidden Side Effects:** Function names are contracts. If a function performs side effects beyond its name (e.g., `checkPassword()` resetting a session), rename it honestly or move the side effect out.
  - **Refactor After It Works:** Write working code covered by tests first, then clean up function size, naming, and duplication in a second pass.
- **Early Return Guard Pattern:** Handle errors and edge cases at the top of functions using early returns (`if (!data) return null;`). Avoid deeply nested `if/else` statements.
- **File Internal Structure:** Standardize component file organization:
  1. Imports
  2. Exported Main Component
  3. Subcomponents / Internal Render Helpers
  4. Non-exported Helpers / Utilities
  5. Styles (CSS Modules / styled-components / CSS classes)
  6. Types are always imported from `src/types/` — never co-located in the component file
- **DOM & Event Handling:** Use React synthetic events. Do not mutate DOM nodes directly or access `document`/`window` during server-side rendering (SSR) lifecycle passes.
- **Code Documentation Conventions:** Every time code is generated or edited in this project — not just when explicitly asked to document something — apply the JSDoc and inline-comment rules from `.agents/prompts/04-code-documentation.md`: JSDoc on exported functions, classes, hooks, providers, and utilities; inline comments only for logic that's genuinely non-obvious; and the Comment Quality Principles in that file for what's worth writing versus noise. Treat its rules as standing instructions for all code output in this repo.
- **Avoid Barrel Files:**
  - **Rule:** Do not create or add to barrel files (an `index.js`/`index.ts` file that only re-exports other modules in the same directory, e.g. `export * from './color'`).
  - **Rationale & Performance:** Importing a single API from a barrel file forces the bundler/dev server (Vite/Next.js/Webpack) to fetch and transform every module the barrel re-exports (even unrequested ones), triggering initialization side effects, slowing down dev server startup, HMR, and initial page loads.
  - **Direct Imports:** Import directly from the specific file that defines the API, e.g. `import { slash } from './utils/slash'` instead of `import { slash } from './utils'`.
  - **No New Barrels:** Do not introduce a new `index.ts` whose only job is re-exporting sibling files.
  - **Existing Barrels Policy:** If a barrel file already exists in code you're touching, prefer importing directly from the source file over adding another re-export to the barrel.

---

## 6. State Management Rules

- **State Boundaries & Categorization:**
  - **Local UI State (`useState` / `useReducer`):** Modals, toggles, form inputs. Keep local to the component unless multiple non-nested components require it. Never over-globalize transient UI state.
  - **Server Cache State (TanStack Query / SWR):** API data fetching, caching, loading/error states. Keep server data strictly out of global client stores (Zustand / Redux).
  - **Global Client State (Zustand / Redux Toolkit):** Auth session, theme, cart, global preferences. Organize into modular domain slices (`features/auth/store`) rather than a single monolithic store. Normalize state objects using entity IDs.
  - **URL / Route State (`searchParams`):** Active filters, search queries, pagination, tab selection. Store in the URL to keep state shareable and bookmarkable.
- **Selective Subscriptions & Selectors:** Always use fine-grained selectors (e.g., `useStore(state => state.property)`) to prevent unnecessary re-renders when unrelated store properties change. Maintain referential stability.
- **No Derived State Duplication:** Never store values that can be calculated on the fly from existing state (e.g., compute `items.length` dynamically instead of maintaining a separate `itemCount` state).
- **Immutability:** Always create new object/array references when updating state. Never mutate state directly.
- **Scoped Context API:** Use React Context only for low-frequency global values (e.g., Theme, Auth profile). Use focused contexts to avoid full component tree re-renders.

---

## 7. Validation Strategy

- **Boundary Validation:** Validate all external inputs (API request bodies, URL params, form submissions) at system boundaries using schema validators (e.g., Zod).
- **Typed Fetch Clients:** Standardize async API calls using typed wrapper functions (e.g., custom `fetchJson<T>()` utility, `ky`, or `ofetch`) with explicit error boundary and loading state handling.

---

## 8. Error Handling & Security Practices

- **Exceptions over Error Codes:** Use `try/catch` and keep error-handling logic separated from normal execution flow.
- **React Error Boundaries:** Wrap route-level and feature-level components in React Error Boundaries to prevent a single component crash from bringing down the entire page.
- **Zero-Trust Security:** Sanitize user inputs before rendering to prevent XSS attacks.
- **Browser Storage Security:** Never store sensitive tokens or user PII in unencrypted `localStorage` / `sessionStorage`. Use secure HTTP-only cookies or encrypted memory state.
- **No Secrets in Code:** Never hardcode secret keys, API tokens, or credentials in source code. Load from environment variables (`process.env` / `.env`).

---

## 9. Testing & Verification Conventions

- **Test Placement:** Place unit tests adjacent to source files (e.g., `user-service.ts` → `user-service.test.ts`) or in a `__tests__/` directory.
- **Web Testing:** Run unit/component tests using Vitest or Jest. Validate accessibility (Axe) and SSR hydration.

---

## 10. Commit & PR Conventions

- **Workspace Progress Analysis:** When summarizing session progress or analyzing workspace changes, apply `.agents/prompts/01-progress-report.md` to produce a structured `report-result.md`.
- **Commit Message Generation:** Follow Conventional Commits formatted via `.agents/prompts/02-commit-message-generator.md` (`git commit -m` with human-readable generalized bullets; no file names or internal identifiers in bullet points).
- **PR Description Generation:** Generate pull request descriptions structured via `.agents/prompts/03-pr-description-generator.md` (Title, Summary, Changes, Testing, Risk/Rollback).
- **Branch Naming:** `feature/short-description`, `fix/issue-description`.
