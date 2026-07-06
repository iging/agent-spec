# Example: Frontend Component Change

- **Role:** Behavior demonstration. Shows `core/` rules applied correctly in a concrete scenario.
- **Authority:** None. This file cannot introduce a rule, override `core/`, or be treated as a source of truth on its own — if anything here appears to conflict with `core/`, `core/` is correct and this file has a bug. See `core/decision-framework.md` for the actual rules being demonstrated.

Demonstrates `core/decision-framework.md` applied to a UI/frontend task, showing the framework isn't backend-specific — the same evaluation categories apply, just with different concrete concerns.

## Scenario

Task: "Add a search box to the dashboard that filters the results table as the user types."

## Discovery (per `core/instruction-hierarchy.md`)

- Checked for a project-specific rules file — this hypothetical project has a `CLAUDE.md` stating "use the existing `useDebounce` hook for any input that triggers a network request."
- Convention inference (Section 2): the existing results table already has a loading-state pattern (`isLoading` + skeleton rows) used elsewhere in the codebase — followed that pattern rather than introducing a new loading indicator style.

## Decision framework applied (`core/decision-framework.md`)

- **Correctness:** filtering must reflect the current input value, not a stale one — a fast typist re-typing before a previous request resolves must not have an old response overwrite a newer one (a classic out-of-order-response bug in typeahead search).
- **Architecture and coupling:** the search box should not reach directly into the results table's internal state; it should communicate through the existing data-fetching layer/props contract already used by other filters on the page, to avoid a one-off coupling between two components that happens to work today and breaks the next time either is refactored.
- **Performance:** per the discovered `CLAUDE.md` rule, debounce the keystroke-triggered request using the existing `useDebounce` hook rather than firing a network call per keystroke — this is both a correctness concern (avoiding the race above) and a performance one.
- **Observability:** if the codebase has an existing pattern for logging failed API calls (checked, and in this hypothetical it does — a shared `apiClient` error interceptor), let the new request pass through it rather than adding a bespoke `try/catch` that silently swallows errors.
- **Testability:** the debounced search logic is extracted into a small, pure function (input string → query params) rather than embedded directly in the keystroke handler, so it can be tested without simulating timers or DOM events.
- **Tradeoff stated explicitly:** debouncing adds a small perceived-latency delay (typically 200–300ms) in exchange for not spamming the backend on every keystroke and avoiding the race condition above — consistent with `decision-framework.md`'s tie-breaker (correctness/reliability outranking raw responsiveness) when the two are actually in tension.

## Security note (per `core/safety.md` Section 3, evaluated here as engineering quality per `decision-framework.md`)

The search term is user input reaching a backend query — validate/sanitize it the same as any other trust-boundary input, even though it "feels" like a client-only UI feature. A search box is still a request-construction surface, not just a rendering concern.

## Output (per `core/output-policy.md`)

This is a small, contained UI change on an existing page, not a new production service — a lighter structure than `examples/backend-service.md` is appropriate. State the discovered convention (`useDebounce`, existing loading-state pattern) and the race-condition consideration; skip a full Discovery/Assumptions/Risk/Validation/Open-Questions breakdown, since the task doesn't warrant it (see `examples/minimal-change-vs-overengineered.md` for the proportionality principle this follows).
