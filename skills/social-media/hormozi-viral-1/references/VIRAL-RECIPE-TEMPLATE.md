---
name: hormozi-viral-1
description: Generate a high-impact social post (LinkedIn-first) using the exact viral recipe behind Alex Hormozi's "I've built wealth without..." post — a contrarian anaphora list of things you did WITHOUT, a pivot to the few things that matter, a dead-simple numbered framework, and a one-line reframe closer, paired with a striking portrait image. Use this skill whenever the user invokes hormozi-viral-1, or asks to write a post in "the Hormozi style," a "contrarian without-list post," an "I did X without Y" post, a "myth-busting list post," or wants to recreate that viral structure for any topic, niche, or audience. Trigger even on casual asks like "make me a hormozi-1 post about cold email" or "turn this into that viral without-list format." The skill runs a short interactive Q&A to fill the template, then outputs the finished caption plus an image-direction brief.
---

# hormozi-viral-1

This skill recreates one specific post that went massively viral, and lets you point its recipe at any topic, niche, or audience. The subject changes every time. The structure, cadence, and psychology stay fixed — that's the part that did the work.

The job is simple: run a short back-and-forth with the user to fill the template, then produce a finished, paste-ready caption plus a brief for the image that should sit beneath it. Never hand back a template with blanks. The user wants a post they can publish, not a fill-in-the-blank worksheet.

## How to use this skill

Work in three beats. Don't dump every question at once, and don't write the post before you understand the topic.

1. **Gather the essentials** (ask the user — see "The interactive Q&A"). You need three things to start: the topic + audience, the big outcome being claimed, and whose voice it's in. That's enough to draft.
2. **Draft the whole post yourself** using the skeleton. Propose the full "without" list, the numbered steps, and the closer. Don't make the user supply every line — your value is generating strong candidates from the niche's clichés. Filling those slots well is the hard part, so do it.
3. **Refine together.** Show the draft, then ask targeted questions: "Is this outcome punchy enough? Which of these closer lines do you like? Any 'without' item feel off?" Iterate until the user says ship it. This is the "iterate through questions and answers" loop the user asked for.

When the environment supports multiple-choice prompts (e.g., a desktop app integration), use them for choices like picking a closer or selecting which "without" items to keep. Otherwise ask in plain text.

## The reference post (the original viral artifact)

Keep this here permanently for reference. This is the exact post the recipe is reverse-engineered from. Use it to calibrate tone and rhythm — **never copy its topic (wealth) into the user's post** unless the user's post is about building wealth.

> **Author:** Alex Hormozi · **Platform:** LinkedIn
> **Engagement:** ~9,500 reactions · 673 comments · 227 reposts
>
> **Caption (verbatim):**
>
> ```
> I've built wealth without reading a book a week.
> I've built wealth without making my bed.
> I've built wealth without journaling.
> I've built wealth without a 2 hour morning routine.
> I've built wealth without giving up alcohol.
> I've built wealth without giving up Netflix.
> I've built wealth without waiting to marry.
> I've built wealth without use.
>
> Because the only things you have to do to build wealth are:
> 1) Find "stuff" that people want
> 2) Sell it to them for more than it costs you.
> 3) Do this many times.
>
> There is no "hack" for it.
> ```
>
> **Image:** a real, high-contrast portrait of the author seated in a plain armchair, black tank top, hands clasped, leaning slightly forward, direct unsmiling eye contact, plain light background. Not stock, not an illustration — him.

## Why it went viral (the mechanics you're recreating)

Understanding the engine matters more than copying the words, because the words change every time. Four things fire at once:

**Pattern interrupt.** The opening lines contradict advice the audience has heard a thousand times ("read a book a week," "make your bed"). A claim that cuts against conventional wisdom stops the scroll because it reads as mild heresy.

**Curiosity gap.** If the big outcome did _not_ require all those sacred rituals, then what _did_ it require? The reader has to open "see more" to find out. The whole front half is engineered to make the back half feel necessary.

**Permission + relatability.** The "without" list quietly absolves the reader of the things they feel guilty for skipping. That feels good, and feeling good is what gets a post shared. People repost what makes them feel seen.

**Quotable payoff.** The numbered steps are almost insultingly simple, and the closer is a clean one-liner. Simplicity reads as hard-won truth, and a tight closer is screenshot-able — which drives the reposts.

The emotional arc is: _negation_ (what you DON'T need) → _pivot_ → _affirmation_ (the few things you DO) → _reframe_ (everything else was noise). Preserve that arc and the post works for almost any topic.

## The recipe — anatomy, beat by beat

Since the user chose the exact recipe, treat these beats as the fixed skeleton. The content inside each beat is fully variable; the beats themselves don't move.

**1. The format: image + caption.** Always pair the caption with a single strong portrait (see "Image direction"). The text carries the idea; the image is an authority anchor and a second pattern interrupt in the feed.

**2. The hook — the first two lines (make-or-break).** Only the first ~2 lines show before "see more," so they do all the recruiting. Build them like this:

- **Line 1:** `[Big outcome] without [the single most clichéd "you must do this" advice in the niche].`
- **Line 2:** `[Big outcome] without [something almost trivially small, a sacred-cow ritual].`
- The bigger the gap between the grandeur of the outcome and the pettiness of the rejected ritual, the stronger the pull. ("built wealth" vs. "making my bed.") Each line must stand alone and read as a small act of heresy against what everyone "knows."

**3. The anaphora list.** 6–8 lines, every one opening with the identical stem `[Big outcome] without ___`. The repetition is the rhythm — do not vary the stem. Escalate the content:

- Start with self-improvement / productivity clichés (routines, journaling, reading, waking at 5am).
- Move to lifestyle sacrifices (giving up alcohol, Netflix, fun, sleep, waiting).
- End on one "insider" item that sounds technical or non-negotiable to people in the niche (the original uses "use"). This last curveball signals the turn is coming.

**4. The pivot.** One line, after a blank line: `Because the only things you [have to do / need] to [outcome] are:` — it resolves the tension and promises the real answer.

**5. The numbered framework.** Exactly 3 steps. Each radically simple, plain verbs, one line each. Format as `1)` `2)` `3)`. The simplicity _is_ the message — resist the urge to make it sophisticated. The final step is often volume/repetition stated flatly ("Do this many times."), because the unglamorous truth is the punchline.

**6. The reframe closer.** A blank line, then one short declarative line that recasts every rejected ritual as noise. Use ironic quotation marks around the buzzword you're puncturing. Original: `There is no "hack" for it.` It must be quotable on its own.

## The skeleton

This is the structural template (for your reference — output a finished post, never this):

```
[Outcome] without [biggest cliché in the niche].
[Outcome] without [trivial sacred-cow ritual].
[Outcome] without [self-improvement cliché].
[Outcome] without [lifestyle sacrifice].
[Outcome] without [another sacrifice].
[Outcome] without [another sacrifice].
[Outcome] without [another cliché].
[Outcome] without [insider/technical curveball term].


Because the only things you [have to do / need] to [outcome] are:
1) [Dead-simple fundamental]
2) [Dead-simple fundamental]
3) [Volume / repetition stated flatly]


There is no "[buzzword]" for it.
```

## Generation rules (the "how" — cadence, tone, format)

These are what make it read like the original even when the topic is completely different.

- **One sentence per line. Hard return after every line.** No line wraps to a paragraph. The vertical rhythm is the format.
- **Blank line before the pivot, and a blank line before the closer.** Two breaths in the whole post. They're load-bearing.
- **Short, plain words.** Cut adjectives and adverbs that only pad. If a word can be removed without losing meaning, remove it.
- **No hedging.** No "maybe," "I think," "in my experience." The voice is certain. That certainty is the appeal.
- **Ironic quotation marks** around the buzzword/cliché you're deflating ("hack," "secret," "stuff," "hustle"). Used sparingly — once or twice.
- **No emojis, no hashtags, no links, no @-mentions** in the body. The original has none and they break the deadpan authority.
- **Keep the numbered list at 3.** Four feels like a listicle; three feels like a law.
- **Default to first person** ("I've [outcome]...") because lived experience is what makes the contrarian claim land. Switch to second person ("You can [outcome] without...") only if the user wants it framed as advice rather than confession.
- **Match the niche's real vocabulary.** The "without" items only sting if the audience recognizes them as things their gurus preach. Use the genuine clichés of _that_ world.

## The interactive Q&A (what to ask the user)

Ask only what you need, then draft. Suggested order:

1. **Topic + audience.** "What's the post about, and who's it for?" (e.g., "growing on LinkedIn, for solo founders.") The audience determines which clichés will sting.
2. **The big outcome.** "What's the impressive result you're claiming?" This becomes the repeated stem. Push for something concrete and a little bold — "built a 7-figure agency," "hit 100k followers," "got in the best shape of my life" — not vague ("became successful").
3. **Voice.** "First person ('I did this'), or addressed to the reader ('you can')?" Default first person.

Then **draft the full post yourself** and present it. For refinement, offer choices rather than open-ended homework:

4. Show the proposed **"without" list** and ask which items to keep, cut, or sharpen. Offer 1–2 spare candidates.
5. Confirm the **3 fundamentals** are the real ones (you proposed them; the user knows the truth of their niche best).
6. Offer **2–3 closer options** and let the user pick.

Keep iterating in this shape until the user is happy.

## Image direction brief

After the caption, always give a short, concrete shot brief so the user can shoot it on a phone or hand it to a photographer. The image is an authority anchor, not an illustration of the text. Recreate this visual logic:

- **A real photo of the author/persona** — not stock, not AI, not an illustration. Authenticity is the whole point of the format.
- **Direct eye contact** with the lens. This is the single biggest scroll-stopper.
- **Plain, uncluttered, light background.** Nothing competes with the face.
- **Confident, grounded posture** — seated and leaning slightly in, or arms crossed standing. Calm and a little intense. Not a big smile; the look says "I've done this."
- **Crisp, well-lit, high contrast.** Square or portrait crop that holds up small in a mobile feed.

Deliver it as a couple of plain sentences the user can act on, e.g.: "Shoot a waist-up portrait against a plain white wall. Look straight into the camera, no smile, relaxed but serious. Good natural light from the front. Square crop."

## Quality check before delivering

Read the draft once against these, since they're the things that quietly break the format:

- Do the first two lines stand alone and read as heresy against common advice? (If lines 1–2 are weak, nothing else matters.)
- Does every list line use the identical stem?
- Does the list escalate and end on an insider curveball?
- Exactly 3 numbered steps, dead simple, last one about volume/repetition?
- One-line, quotable closer with an ironic buzzword?
- One sentence per line, blank lines only before the pivot and the closer?
- No emojis, hashtags, links, or hedging?
- Is the topic the _user's_ topic — not "wealth" carried over from the reference post?

Then deliver: the finished caption in a clean block, followed by the image brief.
