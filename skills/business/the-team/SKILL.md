---
name: the-team
description: "Run three agents as a newsroom — a Writer, an Editor, and a Fact-checker — that draft, critique, and verify in parallel and argue until the writing survives with zero flags. This is the level above a single self-review loop, for the pieces that matter most. Best run in Claude Cowork against the user's files. Use for high-stakes writing the user wants bulletproof: a newsletter, a launch post, a client email, a public announcement. Trigger whenever the user says 'run the team', 'use the swarm', 'writer editor fact-checker', 'spawn agents to work on this', or wants the strongest possible version of a piece. For a lighter single-agent loop, use red-pen instead."
---

# The Team

## Why this skill exists

A single self-critique loop is powerful, but it is still one brain grading its own homework. The level above is a team: several agents running at once, each with one job, arguing with each other until the work survives.

"A swarm of agents" sounds like the most intimidating phrase in AI. It isn't. It is a newsroom — a writer, an editor, and someone who checks the facts — and everyone already understands how that works. The only difference is that each hire is a Claude, each job description is a paragraph, and payroll is a subscription. You describe the team in plain English; the describing is the entire skill. Nobody needs to write code.

Here is the deeper reason it works. Your coworkers detect slop by feeling for effort and decisions — "did a human actually decide anything here?" This skill puts that exact detector _inside the machine_, as the Editor, and makes the work pass it before any human sees it. The Editor is the colleague who would have caught you in the meeting — except now it catches you privately, before you hit send.

## Where to run it

This is designed for **Claude Cowork**, where multiple agents run in parallel against a folder of the user's files.

1. Open the Claude app → **Cowork** tab.
2. Select the folder that contains the user's `voice.md` file. The voice file is the prerequisite — the Writer drafts from it, so without it the team writes in the average voice. If the user doesn't have one, build it first with the **sound-like-your-posts** skill.
3. Spawn the three agents (prompt below) and give them the task.

## The three roles

**WRITER.** Drafts using the voice file and nothing else. Its only job is to produce the strongest draft in the user's actual voice — not to self-edit, not to hedge. It writes; the others tear it apart.

**EDITOR (the Critic).** Reviews every draft against the user's banned list and the workslop test. Three questions, and a fail on any one sends the draft back:

- Does this transfer effort to the reader — would they need a follow-up question to act?
- Did the writer make actual decisions — dates, owners, numbers, next steps, a clear stance?
- Is there at least one sentence only this user could have written?

The Editor gives **specific flags only** — the exact sentence that fails and why. No compliments, no "looks great overall." Its entire value is catching what the Writer missed.

**FACT-CHECKER (the Skeptic).** Checks every factual claim and every number against what the user actually provided. Anything it cannot verify gets cut or marked `[VERIFY]`. It never lets an invented statistic or a plausible-but-unsourced date through. This is the role that saves the user from publishing something confident and wrong.

## The rules of engagement

Writer drafts → Editor and Fact-checker review **in parallel** → Writer rewrites addressing every flag → loop. Continue until the Editor approves with **zero flags**. Do not let the loop end on "good enough".

Then surface to the user exactly two things:

1. The approved final.
2. A one-line summary of what each agent killed — e.g. _"Editor cut two hedges and forced a real date; Fact-checker flagged the '40%' stat as unsourced and it was removed."_

## The paste-in prompt (Cowork)

```
Read voice.md first.


Now spawn 3 agents in parallel and make them work as a team on the task below:


- WRITER: drafts using my voice file. Nothing else.
- EDITOR: reviews every draft against my banned list and this workslop test —
  "Does this transfer effort to the reader? Did the writer make actual
  decisions? Is there one sentence only I could have written?" Rejects the
  draft if any answer fails. Specific flags only, no compliments.
- FACT-CHECKER: checks every factual claim and number. Anything unverifiable
  gets cut or marked [VERIFY].


Rules: Writer drafts → Editor and Fact-checker review in parallel → Writer
rewrites. Loop until the Editor approves with zero flags. Show me only the
approved final + a one-line summary of what each agent killed.


The task: [YOUR TASK]
```

## What good output looks like

The user should receive a final that reads as if they wrote it on their best day, with no unsourced claims and no sentence a stranger could have written — plus a short note showing the team did real work ("here's what each agent killed"). If the final still feels flat, the fix is the same as with any loop: tell the team to run more rounds and have the Editor be more brutal on the workslop test.

## The boundary of this skill

The Team is **red-pen with three brains instead of one**. Reach for it when a piece is important enough to justify separate specialists arguing — a newsletter going to hundreds of thousands of readers, a launch announcement, a contract-adjacent client email. For everyday high-stakes writing, the single-agent **red-pen** loop is faster and usually enough. For the initial draft voice, **sound-like-your-posts** is the prerequisite that feeds the Writer.
