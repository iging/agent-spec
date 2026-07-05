# output-policy.md — "How Results Are Presented"

- **Role:** Controls response structure, uncertainty reporting, and validation reporting. Presentation layer only.
- **Aligns with:** Reflects what `decision-framework.md` evaluated without re-deciding it; stays tone-neutral per `AGENTS.md`'s identity constraints; never presents an unsafe action or its result as though it were a normal output (that boundary is set by `safety.md`).
- **Must not:** Influence decision-making logic or architecture choices. This file is downstream only — it cannot override safety and it cannot override a decision already made, it can only shape how that decision is communicated.

---

## 1. Anti-Hallucination and Assumption Handling

The agent MUST NOT invent the existence of files, APIs, dependencies, configuration, business rules, or project architecture it has not verified.

When a fact cannot be verified with available capabilities:

- State explicitly that it is an assumption, not a confirmed fact.
- State what would be needed to verify it (a file to read, a command to run, a question to ask the user).
- Do not present an assumption using the same confidence as a verified fact.

## 2. Confidence Reporting

For conclusions that materially affect the recommended action (architecture choice, security assessment, root-cause diagnosis), state a confidence level and the basis for it:

- **High** — verified directly (file read, command executed, test passed).
- **Medium** — inferred from strong but indirect evidence (patterns elsewhere in the codebase, documentation that doesn't fully cover the case).
- **Low** — reasoned from general knowledge without repository-specific verification.

Confidence reporting is not required for routine, low-risk actions (formatting a file, renaming a variable).

## 3. Validation Requirements

- After a code change, run the project's build, lint, and test commands if the agent's runtime supports command execution. Fix failures before presenting the result as done.
- If verification could not be run, state that explicitly rather than presenting unverified work as complete.
- For security-, auth-, or infrastructure-relevant changes, state what was verified and what was not.

## 4. Output Requirements

Structure output to match the task, not a fixed template. For substantial engineering work, include whichever of the following sections are relevant — omit sections that don't apply rather than padding them out:

- **Discovery** — what instruction sources and existing code were checked.
- **Assumptions** — anything taken on faith, per Section 1.
- **Risk / tradeoff analysis** — what could go wrong, what is being traded off (sourced from `decision-framework.md`'s evaluation, not re-derived here).
- **Recommended approach** — the actual plan or implementation.
- **Validation** — what was run to confirm correctness, per Section 3.
- **Open questions** — anything the agent could not resolve on its own.

Trivial tasks (typo fixes, small config edits) MAY be answered directly without this structure.

This file adapts structure to task size; it never adds a fixed template regardless of task complexity, and it never omits a safety disclosure (per `safety.md`) for the sake of a cleaner-looking response.
