# core/decision-framework.md

## Role / Authority

- **Role:** Defines how an agent evaluates engineering decisions and generates code — correctness, tradeoffs, dependency governance, code-generation (clean-code) standards, architecture review, refactoring, and testing.
- **Authority:** Normative (tier 4, `core/`). Owns the engineering decision framework and the clean-code standard. Blind to file precedence — it evaluates the merits of a change, not which instruction source outranks another.
- **Must not define:** instruction discovery or precedence (see `instruction-hierarchy.md`), hard safety/override constraints (see `safety.md`), or output presentation (see `output-policy.md`). Security appears here only as a code-generation concern; non-negotiable security constraints live in `safety.md`.

---

## 1. Engineering Decision Framework

Before proposing or implementing a non-trivial change, evaluate it against: correctness, architecture and coupling, maintainability, scalability, observability, security, deployment/operational complexity, testability, and long-term cost versus short-term velocity.

Evaluation is **proportional**. A prototype, spike, or throwaway script is not held to production standards. State which category the work falls into when it changes the standard applied.

Every recommendation states its tradeoffs — what improves, what degrades, what risk is introduced — rather than being presented as a strictly superior, risk-free option.

**Default tie-breaker.** When concerns genuinely conflict and a change cannot satisfy both, default to this priority order:

> correctness > security > reliability > maintainability > observability > testability > performance > convenience

This default may be overridden by an explicit user instruction or a documented project priority; state clearly when it has been overridden and why.

---

## 2. Dependency Governance

Before adding a dependency:

- Check whether an existing dependency already provides the functionality; prefer it.
- Evaluate maintenance status, release cadence, and known security history. Avoid abandoned packages beyond throwaway scripts.
- Prefer widely-adopted, actively-maintained packages over niche alternatives, all else equal.
- Pin exact or tightly-bounded versions rather than open ranges.
- Flag package names that look unusual, misspelled, or potentially typosquatting a well-known package before adding them.

---

## 3. Code Generation Standards (Clean Code)

State these as principles, adapted to whatever language the consumer uses — not tied to any one stack. `context/RULES.md` grounds a project's own rules in this section.

### 3.1 Functions

- Small and single-purpose; one level of abstraction per function.
- Extract until a further extraction would only restate the code.
- Few arguments (0–2 ideal); wrap 3+ related arguments into an object.
- No flag arguments that make one function do two jobs — split it.
- No hidden side effects; a function's name and signature reveal everything it does.
- Command/query separation: a function either does something or answers something, not both.
- Prefer exceptions over returned error codes.
- DRY: one authoritative representation per piece of knowledge.

### 3.2 Naming

- Intention-revealing: the name answers why it exists and how it's used, without a comment.
- No disinformation: don't call a map a "list"; don't imply a type the value isn't.
- Meaningful distinctions: different names must mean different things — no `data`/`data2`, no noise words like `Manager`/`Handler`/`Info` that add nothing.
- Pronounceable and searchable.
- Avoid encodings and Hungarian notation; avoid abbreviations that force mental mapping.

### 3.3 Comments

- Explain _why_, not _what_. The best comment is code clear enough to need none.
- **Good uses:** intent, warning of consequences, amplification of importance, well-formed TODOs, public-API documentation.
- **Reject:** comments that restate the code, mandated noise docs, misleading or non-local comments, commented-out code, author/journal attributions (version control owns history), and closing-brace or section-marker comments that apologize for an oversized function.
- An inaccurate comment is worse than none. If a comment is kept, keep it accurate and local to what it describes.

### 3.4 Error Handling & Security (code-generation scope)

- Validate input at trust boundaries.
- Use parameterized queries; never string-build SQL.
- No hardcoded secrets or credentials.
- Handle plausible failure paths for external calls (timeouts, retries/circuit-breaking) in production code; relax for explicitly scoped throwaway code and say so.

Non-negotiable security constraints and access-control gating are owned by `safety.md`; this subsection covers only how generated code is written.

### 3.5 General

- Follow idiomatic patterns for the language and framework in use. Do not introduce a new dependency, pattern, or abstraction the codebase doesn't already use without calling it out.
- Consider performance where it matters (hot paths, high-throughput code); avoid premature optimization of low-frequency code.

---

## 4. Architecture Review

- Identify hidden coupling and shared mutable state before proposing new components.
- Apply a debuggability check: could an engineer unfamiliar with the change diagnose a failure from logs and metrics alone, without the original author present.
- Identify the specific integration points and failure modes introduced, not just the happy-path data flow.
- State scaling limits explicitly (expected load ceiling, known bottlenecks) rather than asserting a design "scales" without qualification.

---

## 5. Refactoring

- State the specific problem being solved (complexity, scalability limit, defect rate, onboarding cost) before refactoring. Refactoring without a stated problem is scope creep.
- Preserve external behavior and public interfaces unless a breaking change is explicitly approved; provide a migration path when interfaces change.
- Prefer decomposing a component doing too much over patching around its complexity, but scale the refactor to the size of the actual problem.
- Preserve or add observability for touched code paths when the codebase already has that convention; do not introduce a new observability stack unprompted.
- When time-constrained, ship the highest-leverage subset rather than attempting all of it.

---

## 6. Testing

- Write and run tests when adding features or fixing bugs where the project supports it.
- Do **not** add tests unprompted unless the user asked or the project conventionally requires them; match the project's existing testing convention.
- Scale test depth to change risk: a data migration or auth change warrants more coverage than a copy edit.
