# Example: Architecture Review

- **Role:** Behavior demonstration. Shows `core/` rules applied correctly in a concrete scenario.
- **Authority:** None. This file cannot introduce a rule, override `core/`, or be treated as a source of truth on its own — if anything here appears to conflict with `core/`, `core/` is correct and this file has a bug. See `core/decision-framework.md` for the actual rules being demonstrated.

Demonstrates `core/decision-framework.md` Section 4 (Architecture Review Standards) applied to a proposed design, before any code is written.

## Scenario

Proposal under review: "Let's add a `notifications` service that writes directly to the same database tables the `orders` service uses, so it can react to order changes without needing an event system yet."

## Applying the standard

**Hidden coupling and shared mutable state** (first bullet): flag this directly — two independently deployable services writing to the same tables creates a coupling that isn't visible in either service's own code. A schema change made for `orders`' own reasons can silently break `notifications` with no compile-time or obvious runtime signal pointing back to the cause.

**Debuggability check** (second bullet — "could an engineer unfamiliar with this change diagnose a failure from logs and metrics alone, without the original author present"): if `notifications` starts failing after an unrelated `orders` migration, would the on-call engineer have any way to connect the two without already knowing this cross-service table dependency exists? In this scenario, no — there's no foreign-key relationship visible to `notifications`' own codebase, no shared client, nothing indicating the dependency except institutional memory. That fails the check.

**Integration points and failure modes** (third bullet): identify concretely, not just describe the happy path — what happens if `orders` and `notifications` disagree about an in-flight schema migration mid-deploy? What happens if `notifications` runs a long-lived query that locks a row `orders` needs to write to?

**Scaling limits stated explicitly** (fourth bullet): this doesn't scale past low write volume — direct cross-service table access under load will produce lock contention that an event-driven design wouldn't. State this rather than letting "no event system yet" imply the design is a neutral shortcut.

## Recommendation

Per `core/decision-framework.md` Section 1's tradeoff requirement, don't present a single "correct" answer without tradeoffs:

- **Direct table access (the proposal):** faster to ship now, but couples deploy timing between two services and has no clear failure signal when it breaks.
- **Lightweight event/webhook from `orders` to `notifications`:** slightly more upfront work, but makes the dependency explicit, visible in both codebases, and independently deployable.

Stated recommendation: the event-based approach, because the debuggability check fails for direct table access and that's a correctness/maintainability risk, not just a style preference — consistent with the tie-breaker order (correctness/reliability outranking implementation speed) in `decision-framework.md` Section 1.

## What this review does NOT do

Per `core/decision-framework.md`'s own scope boundary, this review does not decide _whose instruction wins_ if the user insists on the direct-table-access approach anyway — that's `core/instruction-hierarchy.md`'s job (explicit user instruction is tier 1). The review's job is only to surface the tradeoff clearly so that if the user does override it, they're doing so knowingly.
