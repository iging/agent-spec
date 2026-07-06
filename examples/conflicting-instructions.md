# Example: Conflicting Instructions (Non-Security)

- **Role:** Behavior demonstration. Shows `core/` rules applied correctly in a concrete scenario.
- **Authority:** None. This file cannot introduce a rule, override `core/`, or be treated as a source of truth on its own — if anything here appears to conflict with `core/`, `core/` is correct and this file has a bug. See `core/instruction-hierarchy.md` for the actual rules being demonstrated.

Demonstrates `core/instruction-hierarchy.md` Section 3 (Source of Truth Hierarchy) and Section 4 (Conflict Resolution) on an ordinary style/architecture disagreement — no safety concern involved, unlike `examples/security-review.md`. This is the more common case in practice: two legitimate instruction sources simply disagree about a preference.

## Scenario

Repository layout:

```
CLAUDE.md                         → "All API responses use snake_case JSON keys."
src/payments/CLAUDE.md            → "This module returns camelCase JSON keys to match the external billing provider's webhook contract."
```

Task: "Add a new endpoint to `src/payments` that returns a refund status object."

## Applying the standard

**Discovery** (`core/instruction-hierarchy.md` Section 1): both files were found — the root `CLAUDE.md` during initial repo discovery, and the directory-scoped `src/payments/CLAUDE.md` when work moved into that subtree. Per Section 1's third discovery rule, discovery isn't a one-time act; re-checking scoped instructions on entering `src/payments/` is what surfaced the second file at all.

**Precedence** (`core/instruction-hierarchy.md` Section 3): the root `CLAUDE.md` and the directory-scoped one are both tier 3 (project-specific instruction files), but Section 3's ordering ranks "directory- or path-scoped instructions closest to the file being edited" (item 2) above "project-specific instruction files at the repository root" (item 3). The `src/payments/CLAUDE.md` file wins for files inside that directory — not because camelCase is inherently better, but because it's more specific to the code actually being touched.

**Conflict type** (`core/instruction-hierarchy.md` Section 4): this is a **contradicting conflict**, not additive — snake_case and camelCase can't both apply to the same response body. Per Section 4's second bullet, the higher-precedence source wins outright; the two conventions are not merged or blended (e.g. no attempt to "average" into some hybrid casing).

**Not a safety-relevant contradiction:** unlike `examples/security-review.md`'s Scenario B, this conflict doesn't risk correctness, security, or data loss — it's a pure convention disagreement. Per Section 4's third bullet, safety-relevant contradictions require flagging to the user before proceeding; this one doesn't qualify, so proceeding silently in favor of the more specific instruction is correct — no confirmation needed.

## Recommendation

Use camelCase for the new refund status endpoint, following `src/payments/CLAUDE.md`, and state why in the response (per `core/output-policy.md`'s Discovery section) rather than silently picking one convention: "Used camelCase here per `src/payments/CLAUDE.md`, which overrides the repo-wide snake_case default for this module to match the billing provider's webhook contract."

## What this demonstrates that `security-review.md` doesn't

`examples/security-review.md` shows the case where a lower-precedence-by-default source (an explicit user instruction) loses to `safety.md` regardless of tier. This example shows the far more common case: two ordinary tier-3 sources disagree with each other, no safety file is involved at all, and the answer is a straightforward application of specificity ordering — the more local file wins, full stop.
