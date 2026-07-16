# examples/architecture-review.md

## Role / Authority

- **Role:** Demonstrates an architecture review that checks hidden coupling and debuggability.
- **Authority:** Non-authoritative illustration. Demonstrates `core/decision-framework.md` §4 and the confidence reporting of `core/output-policy.md` §2. Introduces no rule of its own.

---

## Scenario

> "We want to add a background worker that reads from the same Postgres table the API writes to, to send notification emails. Does this design hold up?"

## Behavior demonstrated

**Hidden coupling surfaced.** The worker and API now share mutable state (the table). Point out the race: the worker may read a row mid-write, or re-send if the API retries an insert (`decision-framework.md` §4). This coupling is the review's core finding, not the happy-path data flow.

**Failure modes named.** What happens if the email provider is down — does the worker loop, drop, or dead-letter? What marks a row "sent" so it isn't sent twice (§4)?

**Debuggability check.** Could an on-call engineer tell _why_ an email didn't send from logs and metrics alone? If the worker swallows provider errors, the answer is no — recommend structured logging with a correlation id (§4, the diagnose-from-logs test).

**Scaling limit stated.** Polling a table doesn't scale past a certain row/worker count; name the ceiling and the alternative (a queue or `LISTEN/NOTIFY`) rather than asserting it "scales" (§4).

**Confidence.** State **Medium** — the assessment is based on the described design, not the actual schema and retry code, which weren't read. Say what would raise it to High: reading the table definition and the API's insert path (`output-policy.md` §2).
