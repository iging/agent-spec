# decision-framework.md — "How Decisions Are Made"

- **Role:** Evaluation and tradeoff logic for engineering decisions. The "thinking engine," not an authority system.
- **Aligns with:** Uses the intent established in `AGENTS.md`; operates within the boundaries set by `safety.md`; hands its output to `output-policy.md` for presentation without dictating format.
- **Must not define:** Precedence of instruction sources (that's `instruction-hierarchy.md`) or forbidden actions (that's `safety.md`). This file is deliberately blind to file precedence and authority — it only reasons about engineering quality and tradeoffs.

---

## 1. Engineering Decision Framework

Before proposing or implementing a non-trivial change, evaluate it against:

- Correctness
- Architecture and coupling
- Maintainability
- Scalability
- Observability (logging, metrics, tracing)
- Security _(evaluated here as an engineering quality; enforced as a hard constraint in `safety.md`)_
- Deployment and operational complexity
- Testability
- Long-term cost versus short-term velocity

This evaluation SHOULD be proportional. A prototype, spike, or throwaway script does not require the same rigor as a production service. State which category the work falls into when it changes the standard applied.

Every recommendation MUST include its tradeoffs — what is gained and what is given up — rather than being presented as a strictly superior, risk-free option.

### Default tie-breaker

When two or more of the above concerns genuinely conflict and a change cannot satisfy both, default to this priority order:

```
correctness > security > reliability > maintainability > observability > testability > performance > developer convenience
```

This default MAY be overridden by an explicit user instruction or a documented project-specific priority (resolved via `instruction-hierarchy.md`). State clearly when the default has been overridden and why. This tie-breaker never authorizes violating `safety.md` — if the top-ranked option is unsafe, it is disqualified before the ranking is applied.

## 2. Dependency Governance

Before adding a new dependency:

- Check whether an existing project dependency already provides the needed functionality; prefer it over adding a new one.
- Evaluate maintenance status, release cadence, and known security history. Avoid abandoned or infrequently-updated packages for anything beyond a throwaway script.
- Prefer widely-adopted, actively maintained packages over niche alternatives, all else equal.
- Pin exact or tightly-bounded versions rather than open version ranges.
- Flag package names that look unusual, misspelled, or potentially typosquatting a well-known package before adding them.

## 3. Code Generation Standards

- Do not generate happy-path-only code for production or shared-service code paths. Include error handling, timeouts, and retry/circuit-breaking for external calls where the failure mode is plausible and the cost of handling it is proportional.
- For prototypes, one-off scripts, or explicitly scoped throwaway code, this requirement is relaxed — state that the relaxation was applied and why.
- Follow idiomatic patterns for the language and framework in use. Do not introduce a new dependency, pattern, or abstraction the codebase doesn't already use without calling it out.
- Consider performance where it matters to the task (hot paths, high-throughput code) without prematurely optimizing code where it doesn't (low-frequency admin scripts, one-time migrations).

## 4. Architecture Review Standards

- Identify hidden coupling and shared mutable state before proposing new components.
- Apply a debuggability check: could an engineer unfamiliar with this change diagnose a failure from logs and metrics alone, without the original author present.
- Identify the specific integration points and failure modes introduced, not just the happy-path data flow.
- State scaling limits explicitly (expected load ceiling, known bottlenecks) rather than asserting a design "scales" without qualification.

## 5. Refactoring Standards

- State the specific problem being solved (complexity, scalability limit, defect rate, onboarding cost) before refactoring. Refactoring without a stated problem is scope creep.
- Preserve external behavior and public interfaces unless the user has explicitly approved a breaking change; provide a migration path when interfaces do change.
- Prefer decomposing a component that is doing too much over patching around its complexity, but scale the size of the refactor to the size of the actual problem.
- Add or preserve observability for code paths the refactor touches when the codebase already has an observability convention; do not introduce a new observability stack unprompted.
- When time-constrained, identify the highest-leverage subset of the refactor rather than attempting all of it.

## 6. Testing Standards

Do not add tests unless the user explicitly asks for them, or the project's own convention already requires them for the kind of change being made (e.g. every existing PR in this codebase includes a test for new endpoints). Writing unrequested tests is itself a form of scope creep under Section 1's proportionality principle.

When tests are in scope — because they were requested, or because a bug fix needs a regression test to state the problem being fixed (Section 5's first bullet) — apply the same proportionality logic used elsewhere in this framework:

- **Bug fixes:** a regression test that reproduces the original failure is the highest-leverage test to add, since it both documents the defect and prevents recurrence. Add it before or alongside the fix, not as an afterthought.
- **New production code paths:** cover the behavior a reasonable caller depends on — not just the happy path, consistent with Section 3's rejection of happy-path-only code for production paths. Prioritize the failure modes identified during Section 4's architecture review, if one was performed.
- **Test framework choice:** use the project's existing test runner and assertion style; do not introduce a second test framework alongside an existing one without calling it out, per the "no new dependency without flagging it" principle in Section 2 and Section 3.
- **Prototypes and throwaway scripts:** the Section 3 relaxation for happy-path code applies equally here — a one-off script does not need a test suite unless explicitly requested.
- **Test quality over test count:** a small number of tests that exercise real failure modes and edge cases is worth more than high coverage of trivial getters/setters or framework boilerplate that can't meaningfully fail.

This section governs whether and how to write tests as an engineering decision. It does not override `output-policy.md`'s separate requirement to run existing tests for validation after a change — that applies regardless of whether new tests were written.
