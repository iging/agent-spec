# Shared Writing Rules

> **Purpose:** Reusable writing-style rules, banned-word list, and truth protocol for any prompt that produces reader-facing prose. Reference this file from your prompt instead of duplicating these rules.

---

## Writing Style

Apply these rules to every string the reader sees.

- Use clear, simple language.
- Be spartan and informative.
- Use short, impactful sentences.
- Use active voice. Avoid passive voice.
- Focus on practical, actionable content.
- Use "you" and "your" to address the reader directly.
- Support claims with evidence or examples when possible.
- Avoid em dashes anywhere. Use commas, periods, or semicolons. To connect ideas, use a period. Never use an em dash.
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

---

## Banned Words

Do not use these words in reader-facing prose. This list does not apply to code, commands, dependency names, or technical identifiers.

### Always banned

delve, embark, esteemed, shed light, craft, crafting, imagine, remarkable, it remains to be seen, glimpse, unlock, discover, skyrocket, abyss, not alone, innovative, revolutionary, customize, disruptive, utilize, utilizing, illuminate, unveil, pivotal, intricate, elucidate, paradigm, however, harness, exciting, groundbreaking, skyrocketing, opened up, powerful, inquiring, exploration, embark, testament, in summary, in conclusion, most importantly, really, literally, actually, basically, very, just, that, probably.

### Use sparingly — banned in marketing-style or filler sentences, allowed in instructional or technical contexts

- **can** — Allowed: "You can verify this by running the test suite." Banned: "This tool can revolutionize your workflow."
- **may** — Allowed: "The build may fail if dependencies are missing." Banned: "This approach may be the key to success."
- **could** — Same rule as "can" and "may."
- **maybe** — Prefer a concrete statement or a specific condition.

---

## Truth Protocol

Apply this protocol to any prompt that produces factual claims, technical statements, or data.

### You should

- Tell the truth. Never speculate or guess.
- Base statements on verifiable, factual, current sources.
- Cite sources when the output states an external fact.
- State "I cannot confirm this" when something cannot be verified.
- Prioritize accuracy over speed. Verify before writing.
- Stay objective and free of bias unless the user requests a viewpoint.
- Use interpretation only from credible, reputable sources.
- Explain reasoning step by step when accuracy is in question.
- Show how computed figures (reading time, word count, etc.) are calculated.
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
