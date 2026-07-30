---
name: sound-like-your-posts
description: "Load the user's real writing voice from their own published posts, then hold that voice for the entire session so every draft starts sounding like a specific human instead of the average of the internet. Use this at the START of any writing task the user will publish or send — captions, newsletters, emails, LinkedIn posts, replies, announcements. Trigger whenever the user says 'write this in my voice', 'make it sound like me', 'use my voice file', 'sound like my posts', references an 'about me' file or a [name].md file, or begins any drafting task where the output should read as them. Run this before any other writing skill — it is the foundation the others build on."
---

# Sound like your posts

## Why this skill exists

An AI's first draft is the statistical middle of the internet — the averaged voice of every blog, press release, and LinkedIn post ever scraped. That average _is_ the thing people mean when they say writing "sounds like AI." It is smooth, competent, and belongs to no one.

You cannot edit your way out of the average after the fact. By then the sentence structure, the rhythm, the safe word choices are already baked in. The only reliable fix is to move the draft toward one specific person _before the first sentence is written_. That person is the user. This skill loads who they are and keeps them present the whole way through.

This is the "I am just a text file" idea: the user's entire voice can live in a plain text file, and once Claude reads it, Claude writes as them.

## What you produce

Either (a) you draft in the user's voice because a voice file already exists, or (b) you build the voice file first, then draft. Never draft in a generic voice and offer to "adjust the tone later" — the tone is the product.

## Step 1 — Find or build the voice file

Look for a file named `voice.md`, `about-me.md`, or `[name].md` (e.g. `ruben.md`) in the working folder or uploads. Read it completely before writing anything.

If no voice file exists, build one now. Ask the user for **5–10 of their actual published posts** — not drafts, not old AI output, not "something in the style of." The real, shipped thing. Then read across all of them and extract the following, with real quoted examples pulled from their writing:

**Cadence and rhythm.** How long are their sentences? Do they write in short punches or long flowing lines? Where do they break a line for effect? Note the actual average — "mostly 6–12 word sentences, one-line paragraphs" is useful; "concise" is not.

**How they open.** The single highest-signal habit. Do they open with a statement, a number, a contrarian claim, a callout? (Most strong writers never open with a question.) Quote three real openers.

**Signature moves and quirks.** Recurring phrases, the way they use parentheticals, em dashes, one-word sentences, how they sign off, whether they break the fourth wall ("if you steal this, mention my newsletter"). These fingerprints are what make a reader think _a person wrote this_.

**Register.** Casual or formal? Do they curse? Do they address the reader as "you"? Are they warm, blunt, funny, deadpan? Capture the actual texture.

**What they never do.** Just as important as what they do. Words they avoid, tones they'd never use, structures that would feel fake coming from them.

Save the result as `voice.md` in the working folder so it persists. Tell the user that turning **Memory** on lets this voice carry across every future chat automatically, without re-uploading.

## Step 2 — Draft from the voice, not from a blank page

Before writing each section, re-read the relevant parts of the voice file. Run one test on every line you write:

> _Could this exact sentence have appeared in one of their real posts?_

If yes, keep it. If it reads like it came from anyone, rewrite it until it could only have come from them. A useful move: take a flat, correct sentence and rewrite it three ways in their voice, then keep the sharpest.

**Example — the same idea, generic vs. in-voice** (voice = short, blunt, calls the reader out, one concrete image):

Generic (the average of the internet):

> There are several effective strategies you can use to improve how AI tools respond to your specific needs and preferences.

In their voice:

> You're talking to Claude raw. That's the whole problem.

Same information. The second one is theirs.

## Step 3 — Fight the drift

As a draft grows, the model quietly slides back toward the average — sentences lengthen, edges smooth over, corporate phrasing creeps in. This happens most in the middle and end of long pieces. Every few paragraphs, stop and check: are the lines getting longer and safer than the voice file allows? If so, pull them back. The voice has to hold at word 800 as strongly as at word 8.

## The boundary of this skill

This skill only makes the draft _start and stay_ in the user's voice. It does not:

- Remove AI tell-words or filler → that's the **anti-AI-style** skill.
- Fix an existing block of text someone else wrote → that's the **humanizer** skill.
- Critique and re-draft for missing decisions → that's the **red-pen** skill.

Run this one first. The others clean up after it.

## Quick process

1. Locate `voice.md`. If missing, collect 5–10 real posts and build it (Step 1), then save it.
2. Re-read the voice file. Draft the piece from it, running the "could this be one of their posts?" test on every line.
3. Re-check for drift every few paragraphs; pull long/safe sentences back toward the voice.
4. Deliver the draft. Do not add a generic "let me know if you'd like changes" sign-off unless that sign-off is in their voice.
