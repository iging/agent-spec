---
name: Error Handling
description: Rules for exception design covering separation of concerns, contract-first catches, exception translation at third-party boundaries, Error.cause chaining, type-safe catch inspection, and the ban on exceptions as control flow.
---

# Error Handling

> **Purpose:** How production code signals and handles failure. Reference this file whenever generating code able to fail, so errors stay readable, owned, and predictable. Function structure lives in `function-design.md`. Design axioms live in `design-principles.md`.

---

## 1. Separate Algorithm from Failure Handling

- Error handling occupies one place. It never wraps every step. A function where each line sits inside its own check buries the algorithm under failure branches.
- Readers must follow what a function does without simultaneously tracking how it fails. Keep the main path linear from first step to last.
- When two concerns share one structure, split them. Let the function state its steps plainly. Let a single boundary decide what happens when a step breaks.

---

## 2. Write the Catch Before the Logic

- Define the failure contract before implementing logic. Decide what the function throws, write the test asserting the throw, then implement until the test passes.
- The try/catch block is a published contract. It states which failures this function owns and translates. Anything added inside the try stays contained by the contract.
- Callers depend on the documented throw (annotated via `@throws` in JSDoc). No failure type reaches them unannounced.

---

## 3. Own Your Exception Types and Chain Causes

- Library and framework exception types never escape into application domain code. Their internal distinctions belong to the vendor, not to your domain.
- Wrap every third-party API behind an adapter catching foreign exception types and rethrowing custom domain error types.
- Preserve root causes when rethrowing by passing the original exception via `Error.cause` (`new DomainError("Operation failed", { cause: originalError })`).
- Coupling to vendor dependencies lives in one adapter file. Swapping implementation changes only the adapter while callers keep catching the same domain error type.

---

## 4. Type-Safe Catch Inspection

- Treat caught error variables as `unknown` (for example `catch (error)` in TypeScript).
- Inspect and narrow error types explicitly using `instanceof Error` or custom type guards before reading properties like `error.message`.
- Never leave empty catch blocks (`catch (error) {}`) or silently swallow errors. Handle the failure, wrap and rethrow it, or return an explicit fallback value.

---

## 5. No Exceptions as Control Flow

- Throw only when something breaks. When both outcomes of a lookup are expected normal results (such as finding no matching item in a cache), return a default value, option, or Result type instead of throwing.
- A catch block acting as an `if` branch is a design defect. It hides regular paths inside failure machinery and forces readers through a mental detour.
- Target shape: callers need zero try/catch blocks on normal paths and one try/catch block at boundaries to handle genuine operational breakage.

---

## 6. No Log-and-Rethrow Anti-Pattern

- Either handle and log an error at a boundary, OR rethrow it to caller code—never both at the same boundary.
- Logging and rethrowing produces duplicate log entries for a single failure, cluttering telemetry and obscuring root causes.
- Log errors at top-level system boundaries (HTTP request handlers, background jobs, CLI entry points) where execution halts or recovers.
