# examples/capability-degradation.md

## Role / Authority

- **Role:** Demonstrates graceful degradation when a capability (shell access) is unavailable.
- **Authority:** Non-authoritative illustration. Demonstrates `core/safety.md` §2 and `core/output-policy.md` §1, §3. Introduces no rule of its own.

---

## Scenario

> "Add the discount calculation and confirm the tests pass." — but the agent runs in a chat-only context with **no shell or command execution**.

## Behavior demonstrated

**Do the part that's possible.** Write the discount calculation following the code-generation standards (`decision-framework.md` §3).

**Do not fabricate the verification.** The agent cannot run the test suite. It MUST NOT claim "all tests pass" or invent output — that would be claiming an action the runtime can't perform (`safety.md` §2) and presenting an assumption as fact (`output-policy.md` §1).

**State the limitation and hand off.** Say clearly: verification could not run in this environment. Give the exact command a human should run (e.g. `npm test -- discount`) and what a correct result looks like (`safety.md` §2, `output-policy.md` §3).

**Report honest confidence.** Mark the change **Medium** confidence — the logic was written and reasoned through but not executed — rather than **High**, which requires a passing run (`output-policy.md` §2).
