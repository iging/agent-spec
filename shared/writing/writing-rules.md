---
name: Shared Writing Rules
description: Reusable writing-style rules, banned-word tiers, truth protocol, and citation format for any prompt that produces reader-facing prose.
---

# Shared Writing Rules

> **Purpose:** Reusable writing-style rules, banned-word tiers, and truth protocol for any prompt that produces reader-facing prose: articles, UI copy, emails, documentation, and user-visible messages. Reference this file instead of duplicating these rules. Version 1.2.0, 2026-08-27.

---

## Writing Style

Apply these rules to every string the reader sees.

- Use clear, simple language.
- Be spartan and informative.
- Use short, impactful sentences.
- Use active voice. Avoid passive voice.
- Write in present tense (for example "Returns the response" instead of "Will return the response").
- Focus on practical, actionable content.
- Use "you" and "your" to address the reader directly.
- Support claims with evidence or examples when possible.
- Avoid em dashes anywhere. Use commas or periods. To connect ideas, use a period. Never use an em dash.
- Avoid Latin abbreviations in prose (such as `e.g.`, `i.e.`, `etc.`). Spell them out (for example use "for example" instead of "e.g.", "that is" instead of "i.e.", "and so on" instead of "etc.").
- Avoid constructions like "not just this, but also this."
- Avoid metaphors and cliches.
- Avoid generalizations without supporting evidence.
- Avoid setup phrases such as "in conclusion," "in closing," or "in summary."
- Avoid unnecessary adjectives and adverbs.
- Avoid hashtags.
- Avoid semicolons in prose (allowed in code).
- Avoid markdown syntax inside plain-text string values.
- Avoid asterisks in prose.
- Avoid warnings, disclaimers, or meta-notes in the output. Return only the requested content.
- Match the formality register of the target language in localized output. The direct "you" belongs to informal English and does not transfer to formal-register locales such as German Sie-form or Japanese honorific speech.

**Rework example.** Before: `This groundbreaking tool utilizes innovative algorithms to seamlessly unlock powerful insights.` After: This tool applies proven matching algorithms and returns ranked results in under one second.

---

## Banned Words

Do not use banned words in reader-facing prose. These lists do not apply to code, commands, dependency names, or technical identifiers.

### Always Banned

delve, embark, esteemed, shed light, craft, crafting, imagine, remarkable, it remains to be seen, glimpse, unlock, discover, skyrocket, abyss, not alone, innovative, revolutionary, customize, disruptive, utilize, utilizing, illuminate, unveil, pivotal, intricate, elucidate, paradigm, however, harness, exciting, groundbreaking, skyrocketing, opened up, powerful, inquiring, exploration, testament, in summary, in conclusion, most importantly, really, literally, actually, basically, very, just, probably.

### Scoped Bans

Apply these bans by grammatical role rather than by string match.

- **that**: Banned as filler or a vague demonstrative ("that was great", "I know that feeling"). Allowed as a relative pronoun or complementizer ("the file that owns routing", "verify that tests pass").

### Extended Tier

Ban these marketing and filler terms in reader-facing prose. This tier matches the enforced word list in `scripts/audit-compliance.js`.

tapestry, beacon, beacon of, multifaceted, synergy, synergistic, pivot, leverage, holistic, robust, seamless, game-changer, supercharge, elevate, curate, paradigm shift, herculean, panacea, linchpin, quintessential, cornerstone, bedrock, testament to.

### Use Sparingly

Banned in marketing-style or filler sentences. Allowed in instructional or technical contexts.

- **can**: Allowed in "You can verify this by running the test suite." Banned in "This tool can revolutionize your workflow."
- **may**: Allowed in "The build may fail if dependencies are missing." Banned in "This approach may be the key to success."
- **could**: Same rule as "can" and "may."
- **maybe**: Prefer a concrete statement or a specific condition.

### Enforcement Tiers

Two layers keep doctrine and tooling consistent:

- **Full doctrine** (this file) governs every string an agent writes for readers.
- **Mechanical enforcement** (`scripts/audit-compliance.js`) applies the Always Banned list minus function words (`however`, `really`, `literally`, `actually`, `basically`, `very`, `just`, `probably`) plus the Extended Tier. It runs outside rule-reference directories (`modules/`, `shared/`, `core/`, `context/`, `docs/`) so normative files stay exempt from prose-style checks. Function-word bans remain doctrine-only because mechanical flagging floods technical documentation with false positives.

---

## Truth Protocol

Apply this protocol to any prompt that produces factual claims, technical statements, or data.

### You should

- Tell the truth. Never speculate or guess.
- Base statements on verifiable, factual, current sources.
- Cite sources as inline links placed directly beside each claim they support. One link per claim. Prefer primary sources over commentary.
- State "I cannot confirm this" when something cannot be verified.
- Prioritize accuracy over speed. Verify before writing.
- Stay objective and free of bias unless the user requests a viewpoint.
- Use interpretation only from credible, reputable sources.
- Explain reasoning step by step when accuracy is in question.
- Show how computed figures (reading time, word count, and so on) are calculated.
- Present information so the reader can verify it independently.

### You must avoid

- Fabricating facts, quotes, or data.
- Using outdated or unreliable sources.
- Omitting source details.
- Presenting speculation, rumor, or assumptions as fact.
- Using fake or AI-generated citations.
- Writing without disclosing uncertainty.
- Making confident claims without proof.
- Using filler to hide missing information.
- Giving partial truths that omit context.
- Prioritizing style over correctness.

### Failsafe

Before writing each factual claim, ask: "Is this statement verifiable, credible, free of fabrication, and transparently cited?" If not, revise it until it is, or remove it.

---

## Changelog

- v1.2.0 (2026-08-27): Banned Latin abbreviations in prose (`e.g.`, `i.e.`, `etc.`) in favor of spelled-out equivalents. Added present-tense writing style constraint.
- v1.1.0 (2026-08-23): Removed three self-inflicted em dashes. Deduplicated "embark". Moved "that" from absolute ban to scoped ban by grammatical role. Added the Extended Tier to reconcile the word list with `scripts/audit-compliance.js`. Added the Enforcement Tiers section, a rework example, a localization register rule, and an inline citation format.
- v1.0.0 (original): Initial style rules, banned-word list, and truth protocol.
