# examples/refactor-problem-first.md

## Role / Authority

- **Role:** Demonstrates a refactor that states its problem before touching code.
- **Authority:** Non-authoritative illustration. Demonstrates `core/decision-framework.md` §5 (and §3.1 for the resulting function shape). Introduces no rule of its own.

---

## Scenario

> "Clean up `processOrder()` — it's gotten messy."

## Behavior demonstrated

**Problem stated first.** "Messy" is not a problem statement. Name the actual issue before refactoring, or it's scope creep (`decision-framework.md` §5): e.g. _`processOrder()` is 140 lines mixing validation, tax calculation, persistence, and email — the tax logic can't be unit-tested in isolation and a recent bug hid there._

**Scoped to the problem.** Extract the three responsibilities into single-purpose functions with one level of abstraction each (`decision-framework.md` §3.1). Do **not** rewrite the whole order module to fix a localized issue (§5).

**Behavior preserved.** `processOrder()`'s signature and observable behavior stay identical — this is an internal decomposition, not an interface change, so no migration path is needed (§5).

**Observability preserved.** The existing logging around persistence is carried into the extracted function, not dropped (§5).

**Validation.** Run existing tests to confirm behavior is unchanged; report results (`output-policy.md` §3). Do not add new tests unprompted unless the project's convention expects them (`decision-framework.md` §6).
