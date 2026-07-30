---
name: handoff
description: >-
  Compress the entire current conversation into a clean, structured handoff
  document that lets a new chat session, a colleague, or future-you resume
  the work without losing decisions, constraints, or progress. Use this
  skill whenever the user says "handoff", asks to summarize the thread to
  continue elsewhere, mentions hitting context limits or the chat getting
  too long, wants to brief a teammate on this conversation, or asks to
  export or save where things stand. ALSO offer it proactively when a long
  working thread is clearly winding down or the user says they'll "pick
  this up later". Do NOT use for summarizing external documents or
  meetings; this skill summarizes the conversation itself.
---

# Handoff

Long threads die two deaths: the context window fills up, or the human
walks away for a week. Either way, restarting from nothing costs hours of
re-explaining, and worse, silently loses decisions, so the next session
relitigates settled questions and repeats rejected approaches. A good
handoff document is the difference between "continue" and "start over".

The core insight: a handoff is a **state snapshot, not a story**. The
next reader does not need to know what happened in what order; they need
to know where things stand, what's been ruled out, and what's next. The
number one failure mode of conversation summaries is chronological
narration ("First we discussed X, then we explored Y..."), which buries
the actionable state under a play-by-play nobody needs.

## Step 1: Identify the recipient

The document differs by who receives it. Infer from context or ask one
question:

- **New AI session** (most common): optimized for pasting into a fresh
  chat. Includes working preferences, exact constraints, and ends with a
  paste-ready opening prompt.
- **Human colleague**: more background on why the work exists, less
  instruction-style framing, no opening prompt.
- **Future self**: leans on reminders of intent ("you chose X because
  the client hated Y") since they'll half-remember everything.

## Step 2: Mine the conversation for what actually transfers

Re-read the whole thread and extract, in priority order:

1. **Decisions and their reasons.** Not just "we chose PostgreSQL" but
   "chose PostgreSQL over SQLite because of concurrent writes". Without
   the reason, the next session reopens the decision.
2. **Dead ends.** Approaches tried and rejected, and why. This is the
   most valuable and most-omitted section of any handoff: it is the
   only thing standing between the next session and re-exploring every
   failed path. If something was rejected for a fixable reason, say so.
3. **Corrections the user made.** Every time the user pushed back
   ("shorter", "not that tone", "the deadline is Friday not Monday"),
   that correction is a preference paid for once and must never be paid
   for again. Sweep the thread specifically for these; they hide in
   throwaway lines.
4. **Constraints stated once.** A requirement mentioned in message 3
   and never repeated still governs everything. Recency is not
   importance. This is exactly what naive summaries lose.
5. **Artifact state.** Every file, draft, or deliverable produced:
   its name, where it lives, and its status (final / draft / superseded).
   When there were multiple versions, only the current one and what
   distinguishes it. Never make the reader guess which version is live.
6. **Open items.** What is in progress, what is blocked and on what,
   and the single concrete next step.

**Verbatim essentials.** Some things must survive exactly, not
paraphrased: names and spellings, numbers, dates, URLs, IDs, error
messages, key code snippets, exact phrasings the user approved.
Paraphrasing these is corruption, not compression.

**Leave behind:** pleasantries, the back-and-forth of drafting (keep
final state + rationale only), abandoned tangents that produced no
decision, and anything the next reader could not act on.

## Step 3: Write the document

Use this structure, cutting sections that would be empty rather than
padding them:

```markdown
# Handoff: [topic]
[Date] · [one line: what this thread was for]

## Objective
[The goal in 1-2 sentences, including success criteria if established]

## Current state
[Where things stand right now; the "you are here" marker]

## Decisions (and why)
- [decision]: [reason]

## Dead ends — do not retry
- [approach]: [why it failed / was rejected]

## Artifacts
- [name/location]: [status: final | draft | superseded by X]

## Verbatim essentials
[exact values, requirements, approved phrasings]

## Working preferences
[corrections and style preferences learned this thread]

## Open items
- Next step: [the one concrete action]
- Then: [remaining items]
- Blocked: [item + what unblocks it]

## Suggested opening prompt        <- new-AI-session handoffs only
[A paste-ready first message for the new chat that references this
document and starts the next step directly]
```

Length: proportional to the thread but capped by absorbability. Target a
document the recipient reads in 2-3 minutes; even a very long thread
should compress to one or two pages. If it's running longer, you are
narrating instead of snapshotting.

Deliver as a downloadable markdown file when file creation is available,
since the whole point is portability; otherwise as a clearly fenced
block that's easy to copy.

## Step 4: Verify against the thread

Before delivering, re-scan the conversation one more time with three
specific questions, because these are the known leak points:

1. Is there any user correction not reflected in Working preferences?
2. Is there any constraint stated exactly once that didn't make it in?
3. For each artifact, is the version referenced actually the latest?

If the thread contains contradictions the conversation never resolved,
do not silently pick a winner in the handoff; list it under Open items
as an unresolved question.

## Fidelity rules

Everything in the handoff must trace to something actually in the
thread. Do not fill gaps with plausible inference; a handoff reader
trusts the document completely, so an invented detail becomes an
invisible landmine. Where something is genuinely uncertain, mark it:
"(unconfirmed: user implied but never stated)". And keep who-said-what
straight: a suggestion you made that the user never accepted is not a
decision, and must not be recorded as one.
