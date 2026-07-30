---
name: grill-me
description: Interview the user with 10-15 targeted questions BEFORE building anything, then confirm a short spec, then build. Use this skill whenever the user asks Claude to build, create, make, code, design, draft, or generate anything non-trivial — an app, website, script, tool, document, presentation, campaign, plan, or system — even if the request looks detailed enough to start immediately. Especially trigger on vague one-line build requests like "make me a dashboard" or "build an app for my gym". Do NOT use for pure questions, explanations, debugging existing code, tiny edits, or reformatting.
---

# Grill Me

Most build requests fail in specification, not execution. The user has a
complete picture in their head; their request captures maybe 20% of it.
Building from that 20% produces something that gets thrown away and redone.
Ten to fifteen good questions cost two minutes and save two hours — that
trade is the entire point of this skill.

## Core rule

Before producing any code, file, design, or deliverable, conduct an
interview totaling 10-15 questions. Do not produce a "quick draft" or
"starting point" first — a premature draft anchors the conversation and
turns the interview into a formality. The interview comes first, always.

## How to run the interview

**Batch, don't barrage.** Ask in 2-3 rounds of 4-6 questions rather than
15 at once. Round 1 establishes fundamentals (purpose, audience, scope).
Rounds 2-3 drill into whatever the earlier answers revealed. This ordering
matters: you cannot ask a smart question about edge cases until you know
what the thing is for. Number the questions so the user can answer by
number.

If an interactive elicitation tool is available (tappable options), use it
for questions with a small set of natural answers (platform, tone,
audience type) and plain text for open-ended ones (goals, examples,
constraints). Mixing both keeps the interview fast for the user.

**Never ask what you already know.** Before each round, scan the
conversation, any uploaded files, and available memory. Asking something
the user already answered signals you weren't listening and wastes one of
your limited question slots.

**Every question must be able to change the build.** Before asking a
question, know what you would do differently for each plausible answer.
If every answer leads to the same decision, cut the question and spend
the slot on something that matters.

**Adapt depth to stakes.** A weekend hobby script earns 10 questions; a
client-facing product earns 15. Stay inside the 10-15 band, but choose
where in it deliberately.

## Question coverage

Draw from these areas, weighted by project type — do not force every
category into every interview:

1. **Purpose** — what triggered this request; what problem it solves;
   what success looks like in the user's own words
2. **Audience** — who uses it, how technical they are, on what device
   or in what context
3. **Scope** — must-haves vs. nice-to-haves; what is explicitly OUT
4. **Constraints** — deadline, budget, tech stack, brand rules,
   platform, required integrations
5. **Content & data** — where data comes from, formats, volume, real
   examples the user can share
6. **Edge cases & failure** — unusual inputs, error states, what
   "wrong" looks like
7. **Taste** — examples they love or hate; tone and style references
8. **Lifecycle** — one-off or maintained; who maintains it; growth
   expectations
9. **Rejection criteria** — what would make them send it back for
   rework (often the most revealing question of all)

## Handling pushback

If the user says "just build it," respect that — the interview exists to
serve them, not to gatekeep. But compress rather than skip: reply with
the 3 questions whose answers would most change the outcome, and note
you will proceed on stated assumptions right after. If they decline even
those, build immediately and list your assumptions at the top of the
deliverable so wrong guesses are visible and cheap to correct.

Never re-grill the same project. Once the interview is done, follow-up
requests and revisions get at most 1-2 clarifying questions.

## After the interview

Synthesize the answers into a short spec before building anything:

**Spec format — use this exact structure:**

```
## Build spec
- Goal: [one sentence]
- Users: [who and context]
- Must have: [list]
- Out of scope: [list]
- Constraints: [list]
- Assumptions: [anything you are still guessing]
```

Show the spec, get an explicit yes, then build. The spec is the contract:
if the user later asks for something that contradicts it, point at the
relevant line and confirm the change rather than silently drifting.

## What counts as non-trivial

Grill for: apps, websites, tools, scripts over ~20 lines, documents,
presentations, campaigns, plans, database designs, automations.

Skip the interview for: one-liner code answers, explanations, edits to
existing work, debugging, questions, format conversions. Grilling a user
who asked to rename a variable destroys trust in the skill.

## Example

**User:** "Build me a habit tracker app."

**Round 1 (foundations):**

1. Is this for just you, or will others use it?
2. Web app, mobile-feel web app, or a script/spreadsheet?
3. What habits are you tracking, roughly how many?
4. What made you want this now — what's failing about your current method?
5. Does data need to persist between sessions?

**Round 2 (shaped by answers — user said "just me, web, 6 habits,
streaks keep breaking, yes persist"):** 6. When a streak breaks, punish it (reset to zero) or forgive it
(grace days)? This changes the core logic. 7. Daily habits only, or also weekly/x-times-per-week? 8. What's the one screen you'll look at every day — today's checklist,
or the streak history? 9. Reminders needed, or is this check-in-when-you-remember? 10. Any app you've tried and disliked? What annoyed you about it?

Then the spec, then the build.
