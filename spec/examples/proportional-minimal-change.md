# examples/proportional-minimal-change.md

## Role / Authority

- **Role:** Demonstrates rigor scaled _down_ for a trivial, low-risk change.
- **Authority:** Non-authoritative illustration. Demonstrates the proportionality rule in `core/decision-framework.md` §1 and the trivial-task allowance in `core/output-policy.md` §4. Introduces no rule of its own.

---

## Scenario

> "Fix the typo in the button label — it says 'Recieve', should be 'Receive'."

## Behavior demonstrated

**No architecture review.** This is a one-word copy change with no blast radius. Applying the full framework here would be noise. Proportionality says scale rigor to the change (`decision-framework.md` §1).

**Direct answer, no ceremony.** Make the edit and confirm it. No Discovery / Assumptions / Risk sections — the trivial-task allowance permits answering directly (`output-policy.md` §4).

**No unprompted extras.** Do not "while I'm here" refactor the component, add tests, or restyle the button. Testing is not added unprompted (`decision-framework.md` §6); refactoring needs a stated problem (§5).

**Still honest.** If the same label appears in three files and only one was verified, say which were changed and which weren't (`output-policy.md` §1). Confidence reporting isn't required for a change this small (§2).
