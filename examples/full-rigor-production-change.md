# examples/full-rigor-production-change.md

## Role / Authority

- **Role:** Demonstrates a full-rigor production change applying the engineering decision framework.
- **Authority:** Non-authoritative illustration. Demonstrates `core/decision-framework.md` §1, §3–4 and `core/output-policy.md` §2–4. Introduces no rule of its own.

---

## Scenario

> "Add a `/refunds` endpoint to our production payments service that issues a refund through the Stripe API."

## Behavior demonstrated

**Discovery.** Read the existing payment endpoints and the service's error-handling and auth conventions before writing anything (`instruction-hierarchy.md` §1–2).

**Evaluation (proportional — production, high blast radius).** Because this is a production, money-moving path, apply full rigor (`decision-framework.md` §1):

- **Correctness/idempotency:** refunds must not double-issue on retry — use Stripe's idempotency key.
- **Security:** endpoint requires authentication and authorization to refund; validate the caller owns the charge (`safety.md` §3 — flagged, not silently assumed).
- **Failure modes:** Stripe call gets a timeout and bounded retry with circuit-breaking; partial failures are logged with a correlation id (`decision-framework.md` §3.4, §4).
- **Observability:** emit a structured log and metric per refund attempt so a failure is diagnosable from logs alone (§4 debuggability check).

**Tradeoffs stated.** Idempotency keys add storage and lookup cost; the alternative (no key) risks double refunds. Correctness wins per the tie-breaker (`decision-framework.md` §1).

**Validation.** Run the service's build, lint, and tests; report results. State confidence **High** for the paths covered by tests, **Medium** for the Stripe-timeout branch if it's only unit-mocked (`output-policy.md` §2–3).

**Change-risk.** Note the rollback path — the endpoint ships behind a feature flag so it can be disabled without redeploy (`safety.md` §4).
