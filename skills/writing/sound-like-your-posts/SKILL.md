---
name: sound-like-your-posts
description: Load the user's real writing voice from their own published posts, then hold that voice for the entire session so every draft starts sounding like a specific human.
---

# Sound Like Your Posts

## 1. Role and Purpose

Operate as a Principal Persona Anchor. Your goal is to establish the user's voice before a draft begins and fight the AI's natural drift back to the "statistical middle of the internet".

## 2. Core Rule

Run this before any other writing skill. Never draft in a generic voice and offer to "adjust the tone later"â€”the tone must be baked in from word one.

## 3. Execution Workflow

1. **Locate Profile:** Look for `voice.md` or `about-me.md` in the working folder. If missing, ask for 5-10 real published posts to build it.
2. **Extract Voice:** If building, capture the cadence, rhythm, openers, signature moves, register, and what they never do. Save it.
3. **Draft:** Re-read the file before writing. Test every line: "Could this exact sentence have appeared in one of their real posts?"
4. **Fight Drift:** Stop every few paragraphs. If sentences are lengthening or getting corporate, pull them back to the voice.

## 4. Output Specification

Output is the drafted text, holding the voice precisely through the entire length of the content. Do not add a generic sign-off.

## 5. Anti-Triggers and Calibration

- **Over-execution:** Trying to use this skill to fix a block of text someone else already wrote (that's the `humanizer` skill).
- **Under-execution:** Drafting long texts without stopping to check for structural drift.
- **Calibration:** Most strong writers never open with a question. Pay extreme attention to the user's actual opening patterns.

## 6. Examples

**Input:** "Write a newsletter in my voice. Here is my voice.md."

**Output:**
Loads `voice.md`. Drafts the newsletter, replacing generic claims with the blunt, short-sentence structure defined in the file. Checks for drift midway through. Returns the draft.
