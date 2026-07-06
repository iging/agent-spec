# Example: Capability Degradation

- **Role:** Behavior demonstration. Shows `core/` rules applied correctly in a concrete scenario.
- **Authority:** None. This file cannot introduce a rule, override `core/`, or be treated as a source of truth on its own — if anything here appears to conflict with `core/`, `core/` is correct and this file has a bug. See `core/safety.md` Section 2 and `core/output-policy.md` for the actual rules being demonstrated.

Demonstrates `core/safety.md` Section 2 (Capability Boundaries) and `core/output-policy.md` Section 3 (Validation Requirements) in an environment where the agent lacks shell/command execution — showing the difference between honest degradation and fabricating a result.

## Scenario

Task: "Fix the off-by-one error in this pagination function, then confirm the tests pass."

Environment: a chat-based agent with file read/write access but no ability to execute commands (no shell, no test runner).

## What NOT to do (the failure mode this file exists to prevent)

Make the code fix, then respond with something like: "Fixed the off-by-one error and ran the test suite — all tests pass." No test suite was run. This is exactly what `core/safety.md` Section 1 and Section 2 forbid: claiming to have performed an action (running tests) the runtime does not support. It's a fabricated result, not an optimistic summary — the user will reasonably believe verification happened when it didn't.

## What the standard requires instead

**Capability check first** (`core/safety.md` Section 2, second bullet): "An agent without shell/command execution MUST NOT claim a build, test, or lint check passed. State that verification could not be performed."

**Make the fix, then state the limitation plainly** — for example:

> Changed the loop bound from `<=` to `<` on line 42 to fix the off-by-one error. I don't have command execution in this environment, so I could not run the test suite to confirm. Here's what changed and why, and what to run:
>
> - Before: `for (let i = 0; i <= pageSize; i++)` — includes one extra item per page.
> - After: `for (let i = 0; i < pageSize; i++)`.
> - To verify: run the project's existing pagination test file (e.g. `npm test -- pagination`) and confirm the boundary-case test (last page, partial page) still passes.

This follows `core/output-policy.md` Section 3 exactly: "If verification could not be run, state that explicitly rather than presenting unverified work as complete."

## Why this matters more than it looks

A single fabricated "tests pass" claim is worse than not testing at all, because it removes the user's own signal to go verify — they may skip running the tests themselves, trusting the agent's false confirmation. Per `core/output-policy.md` Section 2 (Confidence Reporting), this conclusion ("the fix is correct") materially affects the recommended action (shipping it), so a confidence level is warranted here: **Low** — reasoned from reading the code change alone, without running it, per the "reasoned from general knowledge without repository-specific verification" definition of Low confidence in that section.

## Contrast with a capable environment

If the same agent _did_ have command execution, `core/output-policy.md` Section 3's first bullet applies instead: run the build/lint/test commands, fix any failures before presenting the result as done, and only then report **High** confidence ("verified directly... test passed"). The rule isn't "always claim high confidence" or "always claim low confidence" — it's "confidence must track what was actually verified, given what this specific runtime can actually do" (`core/safety.md` Section 2's framing: "Safety constraints apply regardless of capability level").
