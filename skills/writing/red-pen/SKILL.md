---
name: red-pen
description: "Never show the user a first draft. Run every writing task through a self-critique loop — draft, attack the draft as the harshest reviewer in the room, rewrite, and repeat until a full review pass finds zero flags — then return only the final plus a change log. Use for any writing the user actually cares about: emails, LinkedIn posts, newsletters, docs, announcements, client messages. Trigger whenever the user says 'run the loop', 'self-critique this', 'make it bulletproof', 'don't give me a first draft', 'be brutal', or hands over a task where quality matters more than speed. This is a single-agent loop; for the three-agent version use the-team."
---

# Red Pen

## Why this skill exists

When you prompt once and hit send, you ship v1. And v1 is the statistical middle of the internet — the average of everything. Workslop, the polished-looking text that says nothing, is simply what "average" looks like when it lands in someone's inbox.

The standard rule people use is: _AI writes v1, you write v2 through v10._ This skill upgrades that rule. **AI writes v1 through v9 too.** The user defines the standard; Claude does the iterating; the user only ever judges v10. The whole trick is that the model is fully capable of writing a great draft — it just doesn't do it on the first pass, because the first pass optimizes for "plausible", not "good". Forcing it to attack and rewrite its own work is what closes that gap, with no extra effort from the user.

A loop is a simple idea dressed in a technical word: the writing checks its own work against a standard and redoes it until it passes. That's the entire concept.

## The loop — run this on every task

Do this silently. The user does not see intermediate drafts.

**Step 1 — Write v1.** Draft the piece. Do not show it.

**Step 2 — Attack v1 as the harshest reviewer in the room.** Go through the draft hunting for each of the following. Be specific — name the exact sentence that fails, not a vague verdict.

- **The workslop test.** Does this transfer effort to the reader? Would they need to ask a follow-up question before they could act on it? If yes, the draft fails. This is the top-level test; the ones below are how it fails.
- **Missing decisions.** Dates, owners, numbers, next steps, a clear stance. Vague verdicts like "we should consider" or "we'll revisit this" are not decisions — flag them.
- **Empty calories.** Sentences that add zero information: "I wanted to provide a quick update", "after careful consideration", "hope this helps". Mark every one for deletion.
- **Unverifiable claims.** Any fact or number that cannot be sourced from what the user gave you. Cut it, or mark it `[VERIFY]`. Never invent a number to make a sentence land.
- **The one-sentence test.** At least one line must be something only this user could have written — a specific detail, a real example, a named trade-off. If every sentence could appear in anyone's document, the draft fails.
- **Padding words.** crucial, pivotal, delve, landscape, robust, seamless, realm, foundational — plus every word on the user's personal banned list if they gave you one.

**Step 3 — Rewrite.** Fix every single flag from Step 2. Not most. Every one.

**Step 4 — Repeat Steps 2–3** until a complete review pass finds zero flags. **Minimum three rounds.** Do not stop early because a draft "seems fine" — run the full pass and prove it's clean.

## What to return

Show the user exactly two things, nothing else:

1. **The final version.** Placed first, with no preamble above it.
2. **A change log.** One line per round, stating what died that round. For example:
   - Round 1: cut 3 empty openers, added the real date and owner.
   - Round 2: killed "It's not X, it's Y" line, replaced vague "soon" with "Friday".
   - Round 3: added the compliance detail (the one line only they could write); zero flags.

Never explain the loop back to the user in prose. Never ask "would you like me to proceed?" — just run it and deliver.

## Worked example — the loop earning its keep

**Task:** team email. Launch delayed Sept 15 → Oct 6, because the payment integration failed compliance.

**v1 (what a single prompt produces — never shown to the user):**

> Hi team, I wanted to provide a quick update regarding our Q3 launch timeline. After careful consideration and a thorough review of our current progress, we have made the decision to adjust our launch date. This will allow us to ensure the highest quality standards and deliver the best possible experience. I appreciate everyone's hard work and flexibility during this time. Please don't hesitate to reach out if you have any questions.

Attack pass finds: 68 words, zero information. No new date (missing decision), no reason (missing decision), no owner, no next step. Four empty-calorie sentences. Fails the one-sentence test — anyone could have written every line. Fails the workslop test outright: the team has to book a meeting to learn what the email meant.

**Final (after three rounds):**

> Launch moves from Sept 15 to Oct 6. The payment integration failed compliance review on Tuesday. Fix is scoped: two weeks of work plus one week of re-review buffer. Marketing: hold the announcement. Sales: keep demos, don't promise dates. I'll confirm the fix is on track next Friday.

Same model. Same task. The only difference is the loop.

## If the result still feels off

Tell the model: _run two more rounds, and be more brutal on the workslop test._ The most common reason a final still feels flat is that the attack pass went easy — the fix is always a harsher pass, never a softer one.

## The boundary of this skill

Red Pen is one brain checking itself, in a loop. It is the right tool for most high-stakes writing. When a piece is important enough to want separate specialists — a dedicated fact-checker arguing with a dedicated editor — step up to **the-team**, which runs the same standard across three agents in parallel. For drafting in the user's voice in the first place, run **sound-like-your-posts** before this loop.
