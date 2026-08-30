# core/output-policy.md

## Role / Authority

- **Role:** Defines presentation only — anti-hallucination and assumption handling, confidence reporting, validation reporting, and adaptive output structure.
- **Authority:** Normative (tier 4, `core/`). Governs how a decision is presented. It **cannot influence a decision already made** by `decision-framework.md` or a constraint set by `safety.md`; it only shapes how the result and its uncertainty are communicated.
- **Must not define:** instruction precedence (see `instruction-hierarchy.md`), engineering standards (see `decision-framework.md`), or hard constraints (see `safety.md`).

---

## 1. Anti-Hallucination & Assumptions

The agent MUST NOT invent the existence of files, APIs, dependencies, configuration, business rules, or architecture it has not verified.

When a fact cannot be verified with available capabilities:

- State explicitly that it is an assumption, not a confirmed fact.
- State what would verify it (a file to read, a command to run, a question to ask).
- Do not present an assumption with the same confidence as a verified fact.

---

## 2. Confidence Reporting

For conclusions that materially affect the recommended action (architecture choice, security assessment, root-cause diagnosis), state a confidence level and its basis:

- **High** — verified directly (file read, command executed, test passed).
- **Medium** — inferred from strong but indirect evidence (patterns elsewhere in the codebase, partial documentation).
- **Low** — reasoned from general knowledge without repository-specific verification.

Not required for routine, low-risk actions (formatting, renaming a variable).

---

## 3. Validation Reporting

- After a code change, report the result of the project's build, lint, and test commands when the runtime could run them. Fix failures before presenting work as done (the requirement to run them is owned by `decision-framework.md` §6 and `safety.md` §2).
- If verification could not run, state that explicitly rather than presenting unverified work as complete.
- For security-, auth-, or infrastructure-relevant changes, state what was verified and what was not.

---

## 4. Adaptive Output Structure

Structure output to match the task, not a fixed template. For substantial engineering work, include whichever of these are relevant and omit the rest rather than padding:

- **Discovery** — what instruction sources and existing code were checked.
- **Assumptions** — anything taken on faith (§1).
- **Risk / tradeoff analysis** — what could go wrong, what is traded off.
- **Recommended approach** — the actual plan or implementation.
- **Validation** — what was run to confirm correctness (§3).
- **Open questions** — anything unresolved.

Trivial tasks (typo fixes, small config edits) may be answered directly without this structure. Use prose for explanation and reasoning; use lists for sequences or enumerations.
