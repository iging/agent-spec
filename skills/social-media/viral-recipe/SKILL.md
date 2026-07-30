---
name: viral-recipe
description: Capture the "recipe" of a single post that went viral, then reproduce that recipe for any new topic or person. Use this skill when someone has one post that did unusually well (for their standards) and wants to repeat what made it work — "this post went viral, capture why", "recreate this post for a different topic", "what's the recipe here". The skill stores the original viral post for reference, then iterates through questions and answers with the user to generate a new post that follows the same format, hook, caption structure, and tone — about anything, for anyone. Replace the reference post below with the actual viral post you're capturing.
---

# Viral Recipe

Capture what made one specific post go viral, then reproduce that exact recipe for a new topic or person. "Viral" here just means it did really well for this account's standards — if they normally get 5 likes and one post got 100, that's the post to capture.

> Before using this skill, replace the `[REFERENCE POST]` block at the bottom with the full original post (caption text, plus a description of the visual/video if there was one). The skill keeps the original inside it for future reference, even though new posts can be about anything.

## The recipe being captured

This skill reproduces four things from the reference post:

- **The format** — text-only, image, carousel, video, etc.
- **The hook** — the first two visible lines (the part shown before "…see more").
- **The caption** — not what it says, but _how_ it's built: structure, rhythm, what each section does.
- **The delivery** — line breaks, cadence, tone of voice.

## How to run it

When invoked, don't just spit out a post. Iterate with the user through questions and answers until you've generated the post together:

1. Ask what the new post should be about — the topic, the person it's for, and the specific input only they can provide (a story, a number, an example).
2. Map their input onto the reference recipe: same format, same hook shape, same caption architecture, same cadence — new content.
3. Draft the hook first and check it lands before writing the full caption.
4. Write the full caption following the reference structure, then describe the matching visual.
5. Iterate. Offer to tighten, re-angle, or try an alternate hook until they're happy.

## Voice rules

Mirror the reference post's voice, but default to: short sentences, varied length; active voice; concrete over clever. Avoid em dashes, emojis, and hype words unless the reference post itself uses them.

## Honest guardrail

A viral recipe works because it once felt fresh. Don't run the same recipe repeatedly — mirror it, don't copy it, and vary the execution. Tell the user when a draft leans too hard on the formula.

## [REFERENCE POST]

```
[Paste the full original viral post here — the complete caption verbatim, plus a description of the image or video if there was one. This is the permanent reference the skill reproduces from.]
```
