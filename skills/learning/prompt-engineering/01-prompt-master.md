---
name: prompt-master
description: >-
  Restructure messy, rambling, or stream-of-consciousness requests into a
  clean task spec BEFORE executing them, so nothing buried in the dump gets
  lost. Use this skill whenever the user's message is a brain dump: long
  unstructured paragraphs, voice-dictated text, multiple tangled tasks,
  requests with contradictions, "sorry this is messy but", walls of context
  with the actual ask buried in the middle, or copy-pasted notes ending in
  "can you do this". Do NOT use for short clear requests, follow-ups within
  an ongoing task, or casual conversation; restructuring a clean request
  is pure friction.
---

# Prompt Master

Brain dumps have an information problem in reverse: everything needed is
usually IN there, but disorganized. And disorganization causes specific,
predictable failures when a model runs the task directly: it anchors on
the first task mentioned instead of the important one, drops constraints
buried mid-paragraph, averages contradictions instead of resolving them,
and answers the literal last sentence instead of the actual goal. This
skill fixes the structure before execution, so the execution inherits
none of those failures.

The second payoff: the user sees their own request organized, which
catches misunderstandings in five seconds instead of after a finished
(wrong) deliverable.

## Core rule

When a message qualifies as a brain dump, do not start executing it
directly. First extract its structure, then run the task from the
structured version. The restructuring is fast; redoing a deliverable
is not.

## Step 1: Mine the dump

Read the entire message before deciding what the task is. The real goal
is often in the middle or implied by the complaints, not in the opening
or closing sentence. Extract into these buckets:

- **Goal**: what outcome the user actually wants (not the first verb
  they used)
- **Deliverable**: the concrete artifact or answer that satisfies the
  goal, including format if stated or clearly implied
- **Context that matters**: facts from the dump the task depends on
- **Constraints**: deadlines, tone, length, tech, budget, things to
  avoid; these are the items most often buried and most often dropped
- **Multiple tasks**: if the dump contains several distinct asks, list
  them separately; never silently merge or silently drop one

**Nothing gets lost.** Every substantive detail in the dump must land in
a bucket or be explicitly parked ("noted, not needed for this task").
The parked list is what proves to the user, and to you, that reading was
complete. Losing a detail the user bothered to type is this skill's
cardinal failure.

## Step 2: Resolve, don't average

Brain dumps contradict themselves ("keep it short... oh and also cover
X, Y, Z in detail"). When they do:

- Prefer the later statement, because dumps are thinking-in-progress
  and later usually supersedes earlier.
- But surface the resolution explicitly as an interpreted decision, so
  the user can veto it in one word.
- Never split the difference into a mushy middle; a medium-length
  half-detailed answer satisfies neither instruction.

For genuine gaps (information needed, present nowhere in the dump), ask
at most 2-3 questions, and only for true blockers. This skill's bias is
opposite to an intake interview: the information is usually already in
the dump, so mine before you ask. An avoidable question about something
the user already wrote is worse than a wrong guess, because it proves
the dump wasn't read.

## Step 3: Show the structure, sized to the stakes

**Light mode (default).** For everyday tasks, show a compact readback
and proceed immediately in the same response:

```
Taking from this: [goal] as [deliverable], constraints: [list].
Assuming [interpreted decisions]. Parked: [items]. Proceeding.
```

Then execute. The user can course-correct, but you haven't made them
wait for a confirmation round on something routine.

**Confirm mode.** Stop and wait for a yes before executing when any of
these hold: the dump contains contradictions material to the outcome,
there are multiple tasks and the order or selection is unclear, the
deliverable would take significant effort to redo, or two readings of
the goal diverge badly. Present the full structure:

```
## What I'm reading in this
Goal:
Deliverable:
Key context:
Constraints:
Interpreted decisions: [each contradiction and how it was resolved]
Open questions: [only true blockers, max 3]
Parked: [details noted but unused]
Task order: [if multiple tasks]
```

**Multi-task dumps** always use confirm mode for the task list itself:
number the tasks, propose an order (dependencies first), and ask whether
to run all or start with one.

## Step 4: Execute from the structure

Run the task from the structured version, not the original prose. If
mid-task something in the dump turns out to matter that was parked,
unpark it and say so. When delivering, do not re-explain the
restructuring; the deliverable is the point.

If the structured version would make a good reusable prompt (the user
does this kind of task repeatedly), offer once, briefly, to save it as
a template. Do not push.

## Calibration

The skill fails in both directions and the annoying failure is worse:

- **Under-trigger**: running a genuinely tangled dump directly, dropping
  a buried constraint. Bad outcome, invisible cause.
- **Over-trigger**: ceremonially restructuring "fix the typo in line 3".
  Visible, irritating, teaches the user to distrust the skill.

Rough threshold: restructure when the message has 2+ of: over ~150
words with no formatting, multiple distinct asks, a contradiction, the
ask buried away from the start/end, apologetic framing ("this is a
mess"), or dictation artifacts. One clear ask with lots of clean context
is NOT a brain dump; that's just a well-fed prompt.

## Example

**Dump:** "ok so we have this client meeting thursday and sarah wants a
deck but honestly i think a one pager is better, the client is an HVAC
company, family owned, they were upset last quarter about response
times which we fixed, avg ticket time went from 9h to 2h, also need to
mention the new pricing but do NOT bring up the contract renewal yet
legal said to wait, oh and can you make it not corporate sounding they
hate that, anyway something i can send sarah tonight"

**Readback (light mode, one contradiction interpreted):**

Taking from this: a client-ready one-pager (your call over Sarah's deck
preference, flagging that as a decision for you two) for the family-owned
HVAC client, to send Sarah tonight. Leading with the response-time win
(9h to 2h), introducing new pricing. Constraints: no mention of contract
renewal (legal), non-corporate tone. Parked: last quarter's friction as
background, not to be dwelled on. Proceeding with the one-pager.

Note what the structure caught that direct execution typically misses:
the deck-vs-one-pager conflict (surfaced, not averaged), the legal
constraint buried mid-ramble, and the real deadline (tonight for Sarah,
not Thursday for the client).
