# Example: Minimal Change vs. Overengineered

- **Role:** Behavior demonstration. Shows `core/` rules applied correctly in a concrete scenario.
- **Authority:** None. This file cannot introduce a rule, override `core/`, or be treated as a source of truth on its own — if anything here appears to conflict with `core/`, `core/` is correct and this file has a bug. See `core/decision-framework.md` for the actual rules being demonstrated.

Demonstrates the proportionality principle that runs through `core/decision-framework.md` — the same small task solved two ways, showing what "scale rigor to actual risk" means versus over-applying every rule uniformly regardless of stakes.

## Scenario

Task: "Fix this one-off migration script — it throws an unhandled error if the CSV file is missing a column, add a check for that."

This is explicitly the kind of task `decision-framework.md` Section 3 calls out for relaxed treatment: "prototypes, one-off scripts, or explicitly scoped throwaway code."

## The overengineered version (what NOT to do)

- Wraps the fix in a retry-with-exponential-backoff decorator, even though this script runs once, manually, by a human watching it.
- Adds a circuit breaker for the CSV file read, even though there's no external service being called.
- Introduces a structured logging library because "observability" is listed in the Engineering Decision Framework, ignoring that this codebase has no existing logging convention and this is a one-off script, not a shared service.
- Splits the fix into a new `CsvValidator` class with an interface, to "follow SOLID," for a script that will run exactly once and be deleted after.
- Produces a five-section write-up (Discovery, Risk Analysis, Tradeoffs, Validation, Open Questions) for a two-line change.

Every one of these individually cites a real rule from `decision-framework.md` or `output-policy.md` — but applying all of them to a throwaway script is exactly the failure mode Sections 3 and the Engineering Decision Framework's proportionality clause exist to prevent. Rigor was not scaled to risk; it was applied uniformly regardless of context.

## The correctly-scoped version

```python
if "amount" not in row:
    raise ValueError(f"Missing 'amount' column in row: {row}")
```

- Error handling: yes — an unhandled crash mid-script is worse than a clear error message, and this costs nothing extra to add. This is still required even for throwaway code; the _relaxation_ in Section 3 is about retries/circuit-breakers/timeouts for external calls, not about skipping basic error handling entirely.
- No retry/circuit-breaker: there's no external call here to retry against, and even if there were, a one-off script doesn't need production-grade resilience.
- No new class, no new dependency, no new logging framework: none of these are needed to fix the actual reported problem (a crash on a missing column).
- Output: answered directly, no fixed template — per `output-policy.md`'s explicit exception for trivial tasks.

## What determines which version is correct

Per `decision-framework.md` Section 1: "State which category the work falls into when it changes the standard applied." The determining question isn't "does a rule technically apply" — nearly every rule can be stretched to apply to nearly any code. The question is whether the _category_ of the work (one-off script vs. production shared service) actually calls for that rigor. Section 3's relaxation clause exists precisely so that citing a rule isn't sufficient justification on its own — the relaxation must be actively considered and stated when it applies, per the requirement to "state that the relaxation was applied and why."
