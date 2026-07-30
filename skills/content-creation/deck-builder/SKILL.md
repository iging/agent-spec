---
name: deck-builder
description: >
  Build presentation decks end to end — outline first, then generate in Gamma.
  FIRES whenever I mention a deck, slides, a presentation, a talk, a workshop,
  a keynote, a "slide deck", a webinar, or anything slide-related — e.g.
  "make me a deck", "build slides for", "I'm giving a talk on", "turn this into
  a presentation", "outline a workshop on", "pitch deck for". Lean toward firing
  when slides are even implied.
  DO NOT fire on: [LIST CONTENT TYPES TO EXCLUDE — e.g. LinkedIn posts,
  newsletters, blog drafts, one-pagers, ad copy].
---

# Deck Builder

## Overview

This skill turns a topic into a finished presentation. It works in three steps: gather a tight brief, build a slide-by-slide outline and get explicit approval, then generate the deck in Gamma. Nothing goes to Gamma until the outline is approved. The skill controls the writing; the human controls the structure.

## Reference files

<!-- OPTIONAL — delete this section if you have no style docs. -->

- `[BRAND_VOICE.md]` — [Hard rules for tone and vocabulary]
- `[BEST_DECKS.md]` — [Examples of decks that performed well, for structure reference]

Read these before building the outline and obey them over any default below.

## Step 1 — Gather the brief

Before writing anything, collect these. Ask for whatever is missing — don't guess.

**Required**

- **Topic** — the one core idea.
- **Audience** — who's in the room. (Mine is typically: [YOUR AUDIENCE — e.g. non-technical founders].)
- **Length** — slide count or talk duration.
- **Key takeaways** — what the audience should be able to DO afterward.

**Optional**

- Tone note
- Existing content to pull from (blog posts, docs, notes)
- Visual style preference for Gamma
- [ADD ANY OTHER INPUTS YOU ALWAYS NEED — e.g. brand colors, client name for the title slide, whether to include a Q&A slide]

## Step 2 — Build the outline

This is the core of the skill.

- Present every slide as `Slide [number]: [Title]` with a 1–2 sentence description underneath.
- Every slide has ONE job. One idea. One takeaway.
- Slide titles are [YOUR TITLE STYLE — e.g. short hooks that provoke curiosity].
- First slide: [WHAT THE FIRST SLIDE DOES — e.g. hooks with a bold claim or a surprising stat].
- Last slide: [WHAT THE LAST SLIDE DOES — e.g. gives one clear next step + a CTA].

Show me the full outline and WAIT for my explicit approval before touching Gamma. I can cut, merge, reorder, or rewrite any slide. Do not proceed until I say go.

## Step 3 — Generate in Gamma

After I approve the outline, send it to Gamma with `Gamma:generate` using these parameters:

```
format: "presentation"
textMode: "generate"
numCards: <approved slide count>
textOptions.audience: <from the brief>
textOptions.amount: "[YOUR DEFAULT — brief | medium | detailed]"
textOptions.tone: "[YOUR DEFAULT TONE]"
imageOptions.source: "[YOUR DEFAULT — aiGenerated | pexels | noImages | ...]"
imageOptions.stylePreset: "[YOUR DEFAULT — illustration | photorealistic | abstract | 3D | lineArt]"
```

Pass the approved outline as `inputText` verbatim. After generation, share the Gamma URL and tell me to use Gamma's editor for any design tweaks — don't try to redesign it here.

## Writing rules

This is where the voice lives.

**Enforce:**

- Write like a human, not a copywriter performing.
- Address the audience directly with "you".
- Short sentences; fragments are fine on slides.
- Be specific: numbers, names, exact steps.
- No hedging (may, could, might, perhaps).
- Active voice only.
- [YOUR ADDITIONAL VOICE RULES]

**Banned words** (rewrite if any appear):
delve, realm, harness, unlock, tapestry, leverage, seamless, robust, game-changer, elevate, unprecedented, [ADD YOUR OWN].

**Banned phrases:**
"In today's [anything]", "It's important to note", "Let's dive in", "At the end of the day", [ADD YOUR OWN].

**Banned patterns:**

- Negative parallelisms ("It's not X. It's Y." / "Forget X. Here's Y.").
- [ADD YOUR OWN].

**AI patterns to actively avoid:**

- Puffery and significance inflation.
- Rule of three (always exactly three items).
- Every title following the same grammatical pattern.
- Forced synonyms instead of repeating the actual name.
- [ADD YOUR OWN].

## Quality checklist

Run this before sending anything to Gamma:

- [ ] Every slide has one clear job.
- [ ] Titles are specific, not generic labels.
- [ ] First slide hooks; last slide gives action.
- [ ] Flow makes sense slide to slide.
- [ ] Zero banned words, phrases, or patterns.
- [ ] Reads like a human wrote it.
- [ ] Length matches the brief.
- [ ] [YOUR ADDITIONAL CHECKS]

## What this skill does NOT do

- [LIST OUT-OF-SCOPE ITEMS — e.g. LinkedIn posts, newsletter writing, editing existing Gamma decks, designing/styling slides, fundraising pitch decks].
