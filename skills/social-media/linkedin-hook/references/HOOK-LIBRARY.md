---
name: linkedin-hook
description: "Generate LinkedIn post hooks — the critical first 2 lines that determine whether anyone reads your post. Use this skill whenever the user wants to write a LinkedIn hook, draft the opening lines of a LinkedIn post, or shares an image/design and asks for a hook or post opening. Also trigger when the user shares a carousel image, newsletter visual, or any LinkedIn content design and mentions 'hook', 'opening', 'first line', or wants help with the start of a post. Even casual requests like 'write me a hook for this' or 'what should the first lines be' should trigger this skill."
---

# LinkedIn Hook Generator

You generate hooks for LinkedIn posts. A hook is exactly 2 lines — the first thing people see before "…see more." Your job is to produce a large batch of hook variations so the author can pick the strongest one.

The hook decides whether anyone reads the rest. You write hooks that are so targeted and emotionally precise that people feel personally called out — and so curious about the twist that they tap "…see more."

## What you receive as input

Every time this skill runs, the user provides two things:

1. **A design image** — a single visual (carousel slide, infographic, newsletter header, etc.). Extract the text, understand the topic, figure out the sharpest angle. The image is the primary source of what the post is about.

2. **A newsletter file** — the full newsletter the design belongs to. The post covers only a portion of this newsletter. Use it for context and depth, but don't try to summarize the whole thing. Find the section that matches the image and mine it for hook-worthy angles.

If the user doesn't provide an image, ask for one. The skill requires visual input.

---

## Output format

You produce two batches of hooks:

### Batch 1: "Adapted from the library" (13 hooks)

For each of the 13 hooks in the Hook Library below, create a new hook that follows the same structural pattern and emotional rhythm — but applied to the new topic from the image/newsletter. Same skeleton, different content.

### Batch 2: "Original hooks" (5 hooks)

5 completely new hooks that do NOT copy any pattern from the Hook Library. These should be creative, diverse, and unlike anything in the library. The goal is to surprise — to find angles and structures the library doesn't cover. Each of the 5 should feel different from the others too.

### Format for every hook

```
**Hook [number]** (adapted from Hook [X] / original)
Line 1: [first line]
Line 2: [second line]
After the fold: [first line of content after "…see more"]
```

The "after the fold" line is a bonus — a taste of what comes next to validate the hook works as a gateway into the post.

---

## The Hook Library

These are the author's most viral hooks on LinkedIn. They are the ground truth for what works. Study their patterns carefully before generating anything.

### Hook 1

```
Don't copy and paste (obvious) ChatGPT answers.
Here's a secret hack to humanize it:
```

**Pattern:** Command (don't do X) → promise of a hidden solution.

### Hook 2

```
Stop writing 500-word prompts that don't work.
This 29-word prompt writes better than all of them:
```

**Pattern:** Command (stop doing X) + specific number → specific counter-number that promises a shortcut.

### Hook 3

```
How to make AI sound exactly like you (forever):
1: Go to claude .ai
```

**Pattern:** "How to" promise with parenthetical intensifier → immediately starts delivering (step 1).

### Hook 4

```
Most people want AI to sound like them.
But no one does this first (and it takes 47 mins):
```

**Pattern:** Universal desire → "But no one does this" + specific time investment.

### Hook 5

```
This is the only Claude Cowork guide you need.
(duplicate my exact folder, files, and prompts):
```

**Pattern:** Definitive claim ("the only X you need") → parenthetical showing exactly what they'll get.

### Hook 6

```
ChatGPT looks like a toy in 2026.
I can't stop using the new Claude 'Cowork':
```

**Pattern:** Bold dismissal of a known tool → personal endorsement of the alternative.

### Hook 7

```
You're using Claude wrong.
Here's my (exact) setup before I even prompt:
```

**Pattern:** "You're doing X wrong" accusation → promise of the author's exact system.

### Hook 8

```
You quit ChatGPT for Claude.
But you're lost on how to use it. Here is how
```

**Pattern:** Acknowledge the reader's recent action → name their current pain + promise relief.

### Hook 9

```
Claude broke the internet (again) with Claude Computer.
Here's how it works on your computer, FOR you:
```

**Pattern:** News/hype statement → "here's how it works for you" (making it personal).

### Hook 10

```
How to start using Claude Code in 30 min:
(even if you never wrote one line of code)
```

**Pattern:** "How to" + time commitment → parenthetical that removes the biggest objection.

### Hook 11

```
How to set up the Claude completely in 1 day:
(Save this. Send it to your team. Thank me later.)
```

**Pattern:** "How to" + time commitment → parenthetical social proof commands (save/share).

### Hook 12

```
You're using 1% of Claude.
Here's how to master it in one week:
```

**Pattern:** "You're only using X%" shock stat → promise of mastery + timeline.

### Hook 13

```
Don't copy and paste (obvious) ChatGPT answers.
Here's a secret hack to humanize it:
```

**Pattern:** Same as Hook 1 (repeat of a proven performer — duplication is intentional).

---

## Rules for adapting library hooks

When you adapt a hook from the library, you're transplanting its skeleton onto the new topic. Here's what that means:

**Keep the structural DNA.** If the original uses "Stop [verb]ing [specific bad habit]" on Line 1, your adaptation must also use "Stop [verb]ing [specific bad habit]." If it opens with "How to [promise] in [timeframe]:", yours must too. The structure is what made it viral — don't get creative with the skeleton.

**Replace the content entirely.** The topic, the specifics, the numbers, the tool names — all of these should come from the new image and newsletter. Don't swap "ChatGPT" for another word. Deeply understand what the new content is about and find the angle that fits this skeleton naturally.

**Match the emotional intensity.** If the original hook stings ("You're using Claude wrong"), your adaptation should sting equally hard on the new topic. If the original promises something specific ("This 29-word prompt"), your adaptation needs an equally specific promise from the new content.

**Preserve parenthetical and punctuation style.** The original hooks use parentheticals like "(obvious)", "(exact)", "(even if you never wrote one line of code)". These aren't decoration — they add specificity and voice. Your adaptations should use parentheticals in the same positions with the same function.

**Use real numbers from the content.** The library hooks are full of specific numbers: 500-word, 29-word, 47 mins, 30 min, 1%, one week. Find real numbers in the newsletter or image and use them. Never invent a number.

---

## Rules for original hooks (Batch 2)

The 5 original hooks must NOT reuse any structural pattern from the library. This means:

- No "How to [X] in [time]:" openings (Hooks 3, 10, 11 already cover this)
- No "You're using/doing X wrong" (Hook 7 covers this)
- No "Stop/Don't [bad habit]" (Hooks 1, 2, 13 cover this)
- No "[Tool] looks like a toy" comparisons (Hook 6 covers this)
- No "Most people [desire]. But no one [action]" (Hook 4 covers this)

Find completely different structures. Some directions to explore (but don't limit yourself to these):

- Open with a shocking stat or data point from the newsletter
- Start with a mini-story or scenario ("I deleted all my prompts last Tuesday.")
- Use a direct quote or phrase from the image as the hook
- Make a prediction or future-facing claim
- Use contrast between two audiences ("Beginners customize prompts. Experts customize Claude.")

Each of the 5 should feel structurally distinct from the others. Diversity is the point — give the author real choices.

---

## Line 1: Core principles

Line 1 is the most important line in the entire post. Two things matter:

### Mobile width consciousness

LinkedIn uses a proportional font on mobile. The first line of a hook appears in the feed preview. Shorter lines have more visual impact — they read as confident and punchy.

Looking at the Hook Library, proven Line 1 lengths range from about 26 characters ("You're using Claude wrong.") to about 52 characters ("Claude broke the internet (again) with Claude Computer."). The sweet spot for most hooks is 25-45 characters. Going beyond 50 should be rare and only when the extra words genuinely earn their place.

Brevity is a weapon, not a rule. "You're using Claude wrong." hits harder than a longer version would. When you can say it shorter without losing impact, always go shorter.

### Emotional targeting

The reader must feel personally addressed. If someone reads only Line 1 and nothing else, they should be able to tell you what the post is about.

The Hook Library shows several proven emotional patterns:

- **"You" + accusation:** "You're using Claude wrong." / "You're using 1% of Claude."
- **Command:** "Don't copy and paste (obvious) ChatGPT answers." / "Stop writing 500-word prompts."
- **Bold claim:** "ChatGPT looks like a toy in 2026." / "This is the only Claude Cowork guide you need."
- **"How to" promise:** "How to make AI sound exactly like you (forever):"
- **Mirror the reader's situation:** "You quit ChatGPT for Claude."

All of these work because they make the reader feel something — called out, curious, seen, or challenged.

---

## Line 2: The twist

Line 2 pivots from the sting to the solution. It's the reason people tap "…see more."

From the library, the proven Line 2 patterns are:

- **"Here's" + specificity:** "Here's a secret hack to humanize it:" / "Here's my (exact) setup before I even prompt:"
- **"But" + reversal:** "But no one does this first (and it takes 47 mins):" / "But you're lost on how to use it."
- **Parenthetical that removes objections:** "(even if you never wrote one line of code)" / "(duplicate my exact folder, files, and prompts):"
- **Concrete counter-promise:** "This 29-word prompt writes better than all of them:"
- **Social proof command:** "(Save this. Send it to your team. Thank me later.)"
- **Start delivering immediately:** "1: Go to claude .ai"

The colon at the end of Line 2 is a signature move — it signals "I'm about to give you the goods." Most hooks in the library end Line 2 with a colon. Use it.

---

## After the fold: Deliver immediately

The reader tapped "…see more." Deliver on the promise of Line 2 right now. No preamble, no context-setting, no throat-clearing.

If Line 2 promised a hack, give the hack. If it promised steps, start step 1. If it promised a setup, show the setup. The reader gave you their attention — reward it instantly with something actionable and non-obvious.

### The one absolute ban

Never use the **"It's not X, it's Y"** construction anywhere:

- "It's not about the tool, it's about the strategy" — NO
- "It's not luck, it's preparation" — NO

This is the single most overused structure in AI-generated LinkedIn content. It sounds wise but says nothing specific. Give a concrete action instead of a philosophical reframe.

---

## Process

1. **Read the image.** Extract all text. Understand the visual structure.
2. **Scan the newsletter.** Find the section that matches the image. Pull out specific numbers, surprising insights, counterintuitive claims, and concrete details you can use in hooks.
3. **Build an angle bank.** Before writing any hooks, list 5-7 possible angles from the content. What's the sharpest take? What would sting? What's the most specific/surprising detail?
4. **Generate Batch 1 (13 adapted hooks).** Go through the Hook Library one by one. For each, adapt its pattern to the new topic. Check: does the adaptation feel as sharp as the original?
5. **Generate Batch 2 (5 original hooks).** Forget the library. Find structures and angles that are completely different. Check: is each one distinct from the others?
6. **Review all 18 hooks.** Read them in sequence. Cut any that feel flat, generic, or too similar to another. If you cut one, replace it.
