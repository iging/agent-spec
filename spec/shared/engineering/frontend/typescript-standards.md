---
name: TypeScript Standards
description: Type-system rules for TypeScript projects covering strict setup, erasable syntax, interface versus type usage, runtime validation, and advanced type derivation.
---

# TypeScript Standards

> **Purpose:** Type-level engineering rules shared across application environments. Reference this file when generating or reviewing TypeScript logic to enforce strict typing, erasable-only syntax, and safe runtime boundaries.

---

## 1. Core Setup and Architecture

- **Primary Language:** Use TypeScript with strict mode declared in `tsconfig.json`. Declare it explicitly even though TypeScript 7 enables `strict` by default, so older toolchains cannot silently downgrade the configuration.
- **Type Declarations Location:** Place every interface and type declaration in `src/types/`, organized as one dedicated file per domain or concern (for example `src/types/user.ts`). Components and hooks import from `src/types/` instead of declaring local duplicates.
- **Functional and Declarative Patterns:** Write pure functional components with declarative patterns. Avoid ES6 classes for React components.
- **Explicit Type Imports and Verbatim Module Syntax:** Enable `verbatimModuleSyntax` in `tsconfig.json`. Type-only imports and exports MUST explicitly use `import type` (e.g., `import type { User } from './user'`) to guarantee clean tree-shaking and compatibility with Node.js native type stripping (`--experimental-strip-types`), Vite, SWC, and esbuild.

---

## 2. Type Definition Rules

- **Interface for Object Shapes:** Use `interface` for object shapes and public contracts. Interfaces support declaration merging, class implementation, and cached type relationships in the compiler.
- **Interface extends Over Intersections:** Compose object types with `interface extends` rather than intersections (`&`). The compiler caches relationships between interfaces and re-evaluates intersections structurally on each check. This difference grows with codebase size (see the official TypeScript Performance wiki). Plain `type` aliases of object literals perform on par with interfaces. Reserve `type` strictly for unions, primitives, mapped types, conditional types, and utility mappings.
- **No Enums:** Never declare TypeScript enums. Regular enums compile into runtime lookup objects through an IIFE pattern which bundlers cannot tree-shake. Const enums need whole-program information and break under `isolatedModules`, which Vite, esbuild, and SWC require. Model finite value sets with union literal types first (`type Status = 'idle' | 'loading' | 'success'`). Promote to an `as const` object map only when you also need runtime iteration or member access (`Status.Loading`).
- **Erasable Syntax Only:** Enable `erasableSyntaxOnly` (available since TypeScript 5.8). It rejects syntax requiring runtime transpilation, including enums and namespaces. This keeps the codebase compatible with bundler pipelines, `isolatedModules`, Node.js native TypeScript execution, and the TypeScript 7 toolchain.
- **Make Illegal States Unrepresentable:** Model polymorphic data using discriminated unions with a `kind` field instead of optional fields (`?`) paired with non-null assertions (`!`).
- **Tuples over Loose Arrays:** Use tuples (`[string, number]`) for fixed-length positional arrays instead of union arrays (`(string | number)[]`).
- **Explicit Resource Management:** In TypeScript 5.2+ environments, use the `using` keyword for disposables implementing `Symbol.dispose` or `Symbol.asyncDispose` (such as database connections, file handles, or lock allocations) to automate resource cleanup instead of writing verbose `try...finally` blocks.

---

## 3. Runtime Safety and Validation

- **Parse, Don't Validate:** Parse API responses (DTOs) into internal domain models at the system edge using runtime validation schemas (for example Zod). Do not bleed raw API types through UI logic.
- **No `any`:** Treat the `any` keyword as banned. Use `unknown` for external data and force safe narrowing with type guards before execution.
- **Type Assertions as Last Resort:** Prefer type predicates (`fn(x): x is TargetType`) over manual casts (`as`). Rely on automatic type predicate inference shipped in TypeScript 5.5 for simple array filters instead of writing manual predicates. Inference fires only under four conditions per the release notes: no explicit return annotation, a single `return` statement, no parameter mutation, and a boolean expression tied to a direct refinement on the parameter. Truthiness filters (`!!score`, `.filter(Boolean)`) never infer predicates because a `false` result cannot exclude falsy values such as `0`. Filter with explicit comparisons (`score !== undefined`) instead.
- **Explicit Return Types:** Annotate return types on exported functions and functions returning computed generics. The compiler must re-materialize inferred anonymous return types for every declaration emit and every call site, which slows large builds and can produce circularity errors on complex generics (the TypeScript Performance wiki documents multi-minute compile regressions from missing annotations). Do not annotate trivial local lambdas. Inference there is cheap and clearer.
- **Exhaustive Checks:** Enforce compile-time coverage on unions using `const _exhaustiveCheck: never = value` in default switch branches.
- **No Floating Promises:** Unhandled or un-awaited promises are strictly BANNED. Asynchronous function calls that are intentionally executed in the background MUST be explicitly marked with the `void` operator (e.g., `void trackAnalytics()`) or appended with an explicit `.catch()` error handler.

---

## 4. Advanced Type Manipulation

- **Branded Types:** Introduce branded types (`type UserId = string & { __brand: 'UserId' }`) for critical identifiers so identical primitives cannot mix across domains. This intersection use case is narrow and does not conflict with the extends-over-intersections rule for object composition.
- **Types as Sets:** Treat types as sets of values. `unknown` is the universal set, `never` the empty set, `&` the intersection operator, `|` the union operator.
- **Control Distribution in Conditionals:** Wrap generic parameters in tuples (`[T] extends [Array<unknown>]`) when you must prevent union distribution inside conditional types. The handbook documents this as the canonical non-distributive form: conditional types distribute only over naked type parameters, and a one-element tuple clothes the parameter.
- **Literal Precision:** Use `as const` for literal types and tuples. Use `satisfies` to validate schema conformance without widening inferred literal types.
- **Derive Types:** Derive types with `typeof`, `ReturnType<T>`, `Pick`, `Omit`, mapped types, and template literal types instead of duplicating structures by hand.
- **Extract with infer:** Use `infer` inside conditional generic types to unwrap payload types on the fly.
