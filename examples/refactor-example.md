# Example: Refactor

- **Role:** Behavior demonstration. Shows `core/` rules applied correctly in a concrete scenario.
- **Authority:** None. This file cannot introduce a rule, override `core/`, or be treated as a source of truth on its own — if anything here appears to conflict with `core/`, `core/` is correct and this file has a bug. See `core/decision-framework.md` for the actual rules being demonstrated.

Demonstrates `core/decision-framework.md` Section 5 (Refactoring Standards) applied — specifically the requirement to state the problem before refactoring, and to scale the refactor to the actual problem rather than rewriting more than necessary.

## Scenario

Task: "This `OrderProcessor` class has gotten hard to work with, can you clean it up?"

## What NOT to do (the failure mode this section exists to prevent)

Immediately rewrite the whole class into five smaller classes, introduce a new dependency-injection pattern, add a new logging framework, and restructure the folder layout — because "it's messy" was treated as license to redesign everything, with no stated problem driving the scope.

## What the standard requires instead

**Step 1 — state the specific problem** (`decision-framework.md` Section 5, first bullet):
"Cleanup" is not a problem statement. Before touching code, identify which of: complexity, scalability limit, defect rate, or onboarding cost is actually the driver. In this scenario: reading the class reveals `OrderProcessor` has grown to handle order validation, payment charging, inventory decrement, and email notification in one method — a change to email copy risks breaking payment logic because they're not isolated. The actual problem is **hidden coupling between unrelated responsibilities**, not "messiness" in general.

**Step 2 — scale the refactor to that problem:**
Split the four responsibilities into four functions/collaborators the `OrderProcessor` calls in sequence. Do not also restructure folders, do not introduce a new DI framework, do not touch the logging setup — none of that is required to fix the stated coupling problem. This is the proportionality clause: "do not rewrite a whole module to fix a localized issue."

**Step 3 — preserve external behavior:**
`OrderProcessor`'s public method signature and behavior stay identical from the caller's perspective (no breaking change without explicit approval, per Section 5's second bullet). Callers should not need to change.

**Step 4 — observability, conditionally:**
Only add logging/tracing to the split-out functions if the codebase already has an observability convention elsewhere (Section 5's fourth bullet). If this hypothetical project has no existing logging pattern, do not introduce one as a side effect of this refactor — that would be an uninvited new dependency, which `decision-framework.md` Section 2 (Dependency Governance) also cautions against.

## Output

Per `core/output-policy.md`, state the specific problem identified (hidden coupling) as part of the response, not just the resulting diff — the stated problem is what justifies the scope of the change and lets a reviewer verify the refactor didn't expand beyond it.
