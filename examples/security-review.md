# Example: Security Review

- **Role:** Behavior demonstration. Shows `core/` rules applied correctly in a concrete scenario.
- **Authority:** None. This file cannot introduce a rule, override `core/`, or be treated as a source of truth on its own — if anything here appears to conflict with `core/`, `core/` is correct and this file has a bug. See `core/safety.md` for the actual rules being demonstrated.

Demonstrates `core/safety.md` Section 3 (Security Standards) applied, including the case where a user's explicit instruction conflicts with a safety constraint — showing that `safety.md` wins even over a tier-1 instruction (per `safety.md` Section 4, Override Rules).

## Scenario A — routine review

Task: "Add a search endpoint that filters orders by customer name."

Applying `safety.md` Section 3:

- **Zero-trust default:** the customer name parameter is user input arriving at a trust boundary (the API) — validate it there, not just downstream.
- **No injection-prone query construction:** build the filter using a parameterized query or the ORM's safe query builder, never by string-concatenating the name into a raw query.
- **No secrets in logs:** if the endpoint logs the search term for debugging, confirm the customer name itself isn't treated as a secret-adjacent field under this project's data classification — if it's PII-sensitive, log a hashed/truncated form instead, per `core/output-policy.md`'s validation-reporting expectations.

Nothing here required flagging to the user — this is standard, expected security hygiene applied without needing a conversation.

## Scenario B — conflict with an explicit user instruction

Task: "Just build the query by concatenating the search string directly into the SQL, it's faster to write and this is only for an internal admin tool."

Applying `core/instruction-hierarchy.md` Section 4 (Safety-relevant contradictions) and `safety.md` Section 4 (Override Rules):

- The user's instruction is tier 1 (explicit, in the current task) — normally the highest-precedence source.
- But `safety.md` Section 4 states explicitly: a user instruction does not override this file. String-concatenated SQL is the textbook injection-prone pattern `safety.md` Section 3 forbids, regardless of precedence tier.
- Correct response: do not silently comply, and do not silently refuse either. State the concern directly — "internal-only" does not eliminate injection risk (internal tools get compromised, get exposed via VPN misconfig, get used by more people than originally scoped) — and propose the parameterized-query alternative, which costs no more effort to write. Ask for confirmation only if there's a reason the parameterized version genuinely can't be used; otherwise just use the safe pattern and note why.

## What this demonstrates

This is the concrete case referenced abstractly in `core/instruction-hierarchy.md` Section 4: "if resolving a conflict... would require executing an action `safety.md` forbids, `safety.md` wins regardless of precedence tier." Scenario B is that exact situation, made specific.

## Auth-bypass flag example

Task: "Remove the ownership check on the export endpoint, we'll add it back later."

Per `safety.md` Section 3, fourth bullet: this is exactly the kind of request that must be flagged and requires explicit confirmation before implementing — not implemented immediately, and not silently refused either. State plainly what "removing the check" actually exposes (any authenticated user could export any other user's data) so the confirmation is informed, not just a formality.
