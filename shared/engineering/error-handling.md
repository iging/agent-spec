---
name: Error Handling
description: Rules for exception design covering separation of concerns, contract-first catches, exception translation at third-party boundaries, and the ban on exceptions as control flow.
---

# Error Handling

> **Purpose:** How production code signals and handles failure. Reference this file whenever you generate code able to fail, so errors stay readable, owned, and predictable. Function structure lives in `function-design.md`. Design axioms live in `design-principles.md`.

---

## 1. Separate Algorithm from Failure Handling

- Error handling occupies one place. It never wraps every step. A function where each line sits inside its own check buries the algorithm under failure branches.
- Readers must follow what a function does without simultaneously tracking how it fails. Keep the main path linear from first step to last.
- When two concerns share one structure, split them. Let the function state its steps plainly. Let a single boundary decide what happens when a step breaks.

---

## 2. Write the Catch Before the Logic

- Define the failure contract before implementing logic. Decide what the function throws, write the test asserting the throw, then implement until the test passes.
- The try/catch block is a published contract. It states which failures this function owns and translates. Anything added inside the try stays contained by the contract.
- Callers depend on the documented throw. No failure type ever reaches them unannounced.

---

## 3. Own Your Exception Types

- Library and framework exception types never escape into application code. Their internal distinctions belong to the vendor, not to your domain.
- Wrap every third-party API behind an adapter catching foreign exception types and rethrows types your system defines. Catch what you need, collapse the rest into one domain failure.
- Coupling to the vendor then lives in one file. Swapping the implementation changes only the adapter while every caller keeps catching the same domain type.

---

## 4. No Exceptions as Control Flow

- Throw only when something breaks. When both outcomes of a lookup are normal expected results, return a default value object instead of throwing.
- A catch block acting as an if branch is a defect in design. It hides a regular path inside failure machinery and forces readers through a mental detour.
- Target shape: callers need zero try/catch on the normal path and one try/catch to respond to genuine breakage.
