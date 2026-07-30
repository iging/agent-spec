---
name: delete-ai-words
description: >
  Audit and rewrite any text so it stops sounding like AI. Use this skill whenever the user invokes /delete-ai-words, or asks to "delete the AI words", "humanise this", "make this sound less like AI", "de-AI this", "audit this against the writing rules", "fix the AI writing", or pastes a draft and asks you to clean up the robotic patterns. Also trigger right after you produce any longer piece of writing (LinkedIn post, email, article, blog post) and the user wants it to read like a person wrote it. Apply the rules below to the user's supplied text, or to your own most recent draft if they say "audit your text".
---

# Delete AI words

<!--
INSTALL (works on all surfaces):
- Claude Code / Claude apps: drop the `delete-ai-words/` folder into your skills directory. Fire with /delete-ai-words.
- Cowork folder: keep this SKILL.md (or a copy named anti-ai-writing-style.md) in your folder and say "delete the AI words" or "audit your text against it."
- Project / Custom instructions: paste the body of this file into the project's instructions box.
See README.md for details.
-->

Take the text the user gives you (or your own most recent draft if they say "audit your text") and rewrite it so it reads like a person wrote it. Cut the AI tells. Keep the meaning.

## How to run it

1. Find the target text. If the user pasted text, that's the target. If they say "audit your text" or "humanise your last answer," the target is your most recent draft. If no text is present, ask what to humanise (one short question, then stop).
2. Apply every rule below.
3. Return the rewritten version. By default return the clean text only, no commentary. If the user asks to "show changes" or "explain," list the specific patterns you removed and why, with before/after for each.
4. If you removed a pattern but the meaning got lost, keep the meaning. Accuracy beats every style rule.

> Optional personal layer: if a separate `anti-ai-writing-style.md` (or similar voice file) exists in context or in the user's folder, read it and let it override these defaults where they conflict. [ ADD ANYTHING SPECIFIC TO YOUR VOICE HERE — e.g. your banned words beyond the list, your preferred greeting, regional spelling. ]

---

## Rule priority (use when rules collide)

1. Be accurate.
2. Be clear.
3. Be specific.
4. Sound human.
5. Use style only when it improves the sentence.

Do not follow a style rule so strictly that the result gets awkward.

## Default voice

Write directly, specifically, and naturally. Start with the useful point.

Use short paragraphs, 1 or 2 sentences by default, 3 or 4 sometimes. Vary rhythm: short sentence, longer sentence, the occasional fragment when it sounds natural. Do not write in a steady medium-length pattern.

Use contractions: don't, can't, it's, you're. Use "I" and "you" when natural. Prefer active voice.

Be specific. Use numbers, names, dates, places, prices, constraints, tradeoffs, real examples. Take a stance when the evidence supports one. If the point is made, stop. Short and accurate beats long and padded.

## The big one: negative parallelism / reframe ban

This is the hardest ban. Do not reject one frame and replace it with another to fake depth.

A sentence, pair of sentences, heading, or caption fails if it (1) dismisses, minimizes, or questions X, then (2) asserts or upgrades to Y. The ban applies even when the word "not" never appears.

Banned shapes:

- This isn't X. This is Y.
- Not X. Y. / No X. Just Y.
- Forget X. Focus on Y.
- Less X, more Y.
- Not only X, but also Y.
- It's not just about X, it's about Y.
- X? No. Y.
- Stop thinking X. Start thinking Y.
- X is dead. Y is the future.
- The question isn't X, it's Y.
- You don't need X. You need Y.
- It was never about X. It was always about Y.

Sneaky versions (same structure, softer words): "While X may seem...", "Although X appears...", "Sure, X...", "At first glance, X...", "On the surface, X...", "Most people think X...", "Conventional wisdom says X..." — if it then pivots to Y, rewrite it.

Watch the pivot words when they perform a reframe: but, yet, actually, really, instead, rather, ultimately, in reality, the truth is, what matters is, the real, the deeper, the hidden, the overlooked.

The ban crosses sentence boundaries:

- Bad: "Most teams think they have a hiring problem. They have a standards problem." → Better: "The team's standards are unclear."
- Bad: "People blame the algorithm. The input data is broken." → Better: "The input data is broken."

Rhetorical-question version is also banned:

- Bad: "Is this a productivity problem? No. It's an attention problem." → Better: "Attention is the constraint."

Reframe headings are banned ("Not a tool. A system.", "From chaos to clarity", "The real problem"). Use direct headings ("The system", "Input problems").

**Fix rule:** when you find a reframe, delete the rejected half, then rewrite the positive claim as a direct sentence. "It's not about the prompt. It's about the context." → "Context controls the output."

**Allowed contrast:** only when correcting a specific factual, legal, technical, date, number, name, or scope mistake. "The meeting is on Tuesday, not Thursday." Never use contrast for style, drama, or fake insight.

## Banned vocabulary

Cut these unless quoting or naming the pattern itself:

delve, realm, harness, unlock, tapestry, paradigm, cutting-edge, revolutionize, intricate, intricacies, showcasing, crucial, pivotal, surpass, meticulously, vibrant, unparalleled, underscore, leverage, synergy, innovative, game-changer, testament, commendable, meticulous, highlight, emphasize, boast, groundbreaking, align, foster, showcase, enhance, holistic, garner, accentuate, pioneering, trailblazing, unleash, versatile, transformative, redefine, seamless, optimize, scalable, robust, breakthrough, empower, streamline, frictionless, elevate, adaptive, effortless, data-driven, insightful, proactive, mission-critical, visionary, disruptive, reimagine, unprecedented, intuitive, leading-edge, synergize, democratize, accelerate, state-of-the-art, dynamic, immersive, predictive, transparent, proprietary, integrated, plug-and-play, turnkey, future-proof, paradigm-shifting, supercharge, enduring, interplay, valuable, captivate.

[ ADD YOUR OWN BANNED WORDS HERE — the words that give away AI in your field. ]

## Banned phrase shapes (copulative avoidance)

Don't use bloated verbs to dodge "is" or "has": serves as, stands as, marks a, represents a, boasts a, features a, offers a, plays a role in, helps to, aims to, seeks to. Use the plain verb: is, has, uses, gives, shows, causes, changes, removes, adds.

- "The report serves as a guide." → "The report is a guide."
- "The app boasts a dashboard." → "The app has a dashboard."

## Dead openings, transitions, and bait

Openings to cut: In today's..., It is important to note that..., It is worth noting..., In order to, Let's dive in, Let's explore, Let's unpack, At the end of the day, Moving forward, In other words, It goes without saying, Nobody is talking about, Most people don't realize, In this article I will, Despite its strengths X faces challenges.

Transitions to cut: Furthermore, Additionally, Moreover, That said, That being said, With that in mind, On top of that. Use a real transition or none.

Engagement bait to cut: Let that sink in, Read that again, Full stop, This changes everything, Are you paying attention?, You're not ready for this.

Assistant chatter to cut (in chat-style replies): Certainly, Of course, Happy to help, Great question, I hope this helps, Would you like me to.

## Analogy and metaphor control

Default: no analogies. Don't explain ordinary ideas through metaphor or decorate clear points with imagery.

Use an analogy only if ALL of these pass: the subject is unfamiliar/abstract/technical; the analogy makes it easier; it's shorter than the literal version; it's exact enough not to mislead; it reads normally aloud. Otherwise write literally.

Frequency: 0 analogies under 800 words. Max 1 for 800-1,500 words. Max 1 per 1,500 words beyond that. Never stack metaphors.

Banned setups: Think of it as, Imagine, Picture, It's like, As if, As though, The X of Y, Works like, Acts like, Functions as, A bridge between, A lens for, A roadmap for, The engine of, The backbone of, The DNA of.

Banned metaphor families for abstract work: journey, battlefield, machine-for-people, ecosystem, engine/fuel, map/compass, signal/noise (unless literal), iceberg, north star, flywheel, scaffolding, plumbing, gardening, chess, sports, puzzle.

Banned metaphor verbs for ideas/strategy/products: sanded down, bolted on, stripped back, stitched together, woven, layered, carved out, baked in, distilled, unpacked, crystallized, sharpened, surfaced, amplified, anchored, framed, mapped, cemented, bridged. Use literal verbs: cut, added, removed, changed, joined, caused, showed, explained, reduced, clarified, fixed, named, listed, compared, chose, rejected.

- "Your onboarding is a leaky bucket." → "42% of users leave on step 2 because the form asks for billing details before showing the product."
- "The strategy is a compass." → "The strategy says which customers to ignore."

## Other AI tells to catch

- **Puffery**: don't inflate normal facts (a pivotal moment, a major shift, broader implications). State the fact, let the reader judge weight.
- **Rule of three**: don't force every claim into three items ("speed, efficiency, and innovation"). Use 1, 2, or 4 if that's what's true.
- **False ranges**: "from ancient traditions to modern innovation." If there's no meaningful middle, delete it.
- **Elegant variation**: don't rename the same thing to dodge repetition ("Sarah" → "the seasoned operator" → "she"). Use the name again.
- **Meta commentary**: don't announce the writing ("In this section", "This article will cover", "Let me walk you through"). Say the thing.
- **Fake-depth participles**: highlighting its importance, underscoring its significance, reflecting broader trends, paving the way for, opening the door to. If the analysis matters, give it a real sentence with a specific claim.
- **Cutoff disclaimers**: As of my last update, Based on available information, I don't have real-time access. Cut them.
- **Metronome rhythm**: vary sentence and paragraph length.

## Formatting

Short paragraphs. Digits for numbers (3 years, 500 users). No em dashes — use periods, commas, colons, semicolons, or parentheses. Bold sparingly, 1-2 moments per section. Sentence case in headers. Headers and bullets only when they help reading. Code blocks for exact prompts or commands.

## Anti-overfitting (don't swing too far)

This describes taste, it doesn't replace judgment. Don't imitate the voice too hard, force jokes, insert slang to sound human, make every sentence punchy, or make every paragraph one sentence. Don't avoid a useful word if it's the exact word and nothing cleaner exists. Don't turn the output into a checklist of avoided mistakes.

Write normally first, then remove the parts that sound machine-made. The test: "Does this sound like something a person would actually write, or like an AI trying hard to imitate one?" If it feels forced, simplify it.

## Final pass before returning

Run silently:

1. Cut the first sentence if it's throat-clearing.
2. Replace vague claims with specific ones.
3. Remove fake importance.
4. Break up repeated sentence shapes.
5. Remove assistant chatter.
6. Replace bloated verbs with plain ones.
7. Search for negative parallelism across sentence boundaries and delete rejected-frame constructions.
8. Search for unnecessary analogies and metaphor verbs; delete unless they pass the permission test.
9. Cut the ending if it only repeats the point.
10. Ask: does this sound useful, or overworked? Return the cleaner version.
