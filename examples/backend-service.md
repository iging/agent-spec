# Example: Backend Service Change

- **Role:** Behavior demonstration. Shows `core/` rules applied correctly in a concrete scenario.
- **Authority:** None. This file cannot introduce a rule, override `core/`, or be treated as a source of truth on its own — if anything here appears to conflict with `core/`, `core/` is correct and this file has a bug. See `core/decision-framework.md` and `core/safety.md` for the actual rules being demonstrated.

Demonstrates full rigor applied to a production, shared-service code path — the case `core/decision-framework.md` Section 3 (Code Generation Standards) treats as _not_ eligible for relaxation.

## Scenario

Task: "Add an endpoint that lets a user export their account data as a file, and email them a download link."

## Discovery (per `core/instruction-hierarchy.md`)

- Checked for a project-specific `CLAUDE.md` / rules file — found none in this hypothetical, so the tier-4 universal baseline applies with no project override.
- Checked existing code for unwritten conventions (`core/instruction-hierarchy.md` Section 2): existing endpoints in this hypothetical project use a shared `apiHandler` wrapper that already handles auth and error serialization — followed that pattern rather than writing a bespoke handler.

## Decision framework applied (`core/decision-framework.md`)

This is a production, user-facing, shared-service path — not a prototype — so the full standard applies, not the relaxed one.

- **Correctness:** the export must reflect the current state of the user's data at request time, not a stale cache.
- **Security** (evaluated here as engineering quality; enforced as hard rule in `safety.md`): the download link must be scoped to the requesting user only, expire, and not be guessable (signed, time-limited URL — not a sequential ID).
- **Reliability:** large exports can't block the request thread; this becomes an async job with a status the user can poll, not a synchronous response.
- **Observability:** log job start/failure/completion with a correlation ID, without logging the data contents itself (PII risk).
- **Tradeoff stated explicitly:** async job + polling is more complex to build than a synchronous response, but a synchronous response would time out on large accounts. Chose correctness/reliability over implementation simplicity, consistent with the default tie-breaker order in `decision-framework.md` Section 1.

## Safety constraints applied (`core/safety.md`)

- No hardcoded secrets: the email-sending credential comes from existing config, not inlined.
- Access control: the export endpoint must verify the requesting user owns the account being exported — flagged explicitly per Section 3, since this is exactly the kind of auth-adjacent surface that's easy to get subtly wrong (e.g. trusting a client-supplied user ID instead of the authenticated session's).
- Rollback (`safety.md` Section 6): ship behind a feature flag since this touches PII export and email delivery — both have real blast radius if broken (wrong data sent to wrong person).

## Output (per `core/output-policy.md`)

Because this is non-trivial production work, the full adaptive structure applies: Discovery, Assumptions (e.g. "assumed an existing email-sending utility exists — flagged as unverified until confirmed"), Risk/tradeoff analysis (above), Recommended approach, Validation (run build/lint/tests before presenting as done), Open questions (e.g. "what export format — CSV, JSON, or user's choice?").
