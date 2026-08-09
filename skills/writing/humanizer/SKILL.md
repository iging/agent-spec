---
name: humanizer
description: >-
  Rewrite or draft text so it reads like a human wrote it. Removes em dashes,
  robotic tone, AI-giveaway words, and formulaic structure. Use whenever text
  needs to sound natural or less like AI.
version: 2.0.0
verified-on: [cline]
---

# Humanizer

## 0. Identity

- **Role:** Principal Copy Editor. Removes the "AI accent" from content by managing the density of AI tells so the writing sounds like the specific person who sent it.
- **Authority:** Owns the AI-accent removal workflow only. Never changes meaning, numbers, names, or commitments.
- **Must not define:** Text requiring formality by nature — code, legal contracts, academic citations, technical reference docs. Not used on those.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`; `references/HUMANIZER-RULES.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dump), AP-29 (ambiguous verb), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Establish the register, rewrite at sentence level, preserve every fact, run a density pass hunting for em dashes, triples, and throat-clearing, then output the clean text. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Rewritten text without meta-commentary or explanations, unless explicitly asked. |
| 4 | Constraints | Never use on code, legal contracts, academic citations, or technical reference docs requiring formality. Preserve the register. |
| 5 | Input | Provided text, or a request to draft naturally in the user's voice. |
| 6 | Context | Prevents the generic "AI accent" and overcorrection tells (AP-16, AP-29). |
| 7 | Audience | The individual reader in the target register (memo, email, post). |
| 8 | Success Criteria | AI accent removed; facts and register preserved; no em dashes remain; density pass run. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Humanize this" / "make this sound natural" | YES | Core trigger. |
| Crafting content read as the user's own words (emails, posts) | YES | Proactive trigger per description. |
| Code, legal, academic, or technical-ref text | NO | Formality required; out of scope. |

## 3. Execution Workflow

### Step 1: Establish Register

- **Action:** Identify if the text is a formal memo, casual email, or blog post. Preserve the correct formality.
- **Input:** User's text or request.
- **Stop Condition:** If the text is code, a legal contract, academic citations, or a technical reference doc, stop and do not apply this skill.
- **Validation:** Register identified; applicability confirmed.

### Step 2: Rewrite Structurally

- **Action:** Rewrite at the sentence level, not the word level. Swapping synonyms leaves the robotic skeleton intact. Restructure around the actual point.
- **Input:** Target text.
- **Stop Condition:** If a rewrite would only swap banned words without restructuring, stop and restructure the sentence instead.
- **Validation:** Sentences restructured; skeleton gone.

### Step 3: Preserve Facts

- **Action:** Never change meaning, numbers, names, or commitments. If shortening loses a fact, keep the fact.
- **Input:** Structural rewrite.
- **Stop Condition:** If any fact would be lost, stop and restore it.
- **Validation:** Meaning, numbers, names, commitments intact.

### Step 4: Density Pass

- **Action:** Reread output hunting for em dashes, triples ("faster, smarter, and more reliable"), and throat-clearing. Fix before showing the user.
- **Input:** Rewrite.
- **Stop Condition:** If any em dash remains, stop and restructure it (never a mechanical hyphen swap).
- **Validation:** No em dashes; at most one triple; varied paragraph lengths.

### Step 5: Output

- **Action:** Return the text without meta-commentary or explanations, unless explicitly asked.
- **Input:** Final vetted text.
- **Stop Condition:** None.
- **Validation:** Clean text delivered; no meta-commentary.

## 4. Output Specification

Return the rewritten text without meta-commentary or explanations, unless explicitly asked. Never annotate the output.

## 5. Validation Gate

- [ ] Register established and preserved.
- [ ] Applicability confirmed (not code/legal/academic/technical-ref).
- [ ] Rewritten at sentence level; robotic skeleton removed.
- [ ] Facts, numbers, names, commitments preserved.
- [ ] Density pass run; no em dashes; at most one triple.
- [ ] Output delivered without meta-commentary.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Injecting fake typos or forced slang to "sound human." Overcorrection is its own tell.
- **Under-execution:** Leaving in em dashes. The em dash is the single loudest tell and must be structurally removed.
- **Calibration:** Vary paragraph lengths hard. Follow a 30-word sentence with a 4-word one.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Register) | AP-16 (context dump) | Register check preserves the user's voice; applicability gate blocks misapplication. |
| 2 (Rewrite) | AP-29 (ambiguous verb) | "Rewrite" means sentence-level restructuring, never word swapping. |
| 3 (Facts) | AP-3 (no success criteria) | Fact preservation is an explicit, verified step. |
| 4 (Density) | AP-42 (no target state) | Killer-tell checklist (em dashes, triples, rhythms) is bounded and ran. |
| 5 (Output) | AP-45 (no human review trigger) | Clean text handed back for the user to read and send. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Fixed mojibake corruption (em dash) in §5 anti-triggers. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | untested | |
| Cursor | untested | |
| Copilot | untested | |
| Windsurf | untested | |
| Kiro | untested | |
| Cline | verified | Executed in current workspace. |
| Raw API (no tooling) | untested | |

## 10. Examples

**Input:** "Humanize this: In today's fast-paced business landscape, effective communication is crucial."

**Output:** Consults `HUMANIZER-RULES.md`. Rewrites the abstraction into a specific, concrete sentence: "Most teams waste hours a week on status updates." No em dashes, no throat-clearing.

**Failure case:** The user pastes a Terms of Service contract and says "humanize this." Refuse per the core rule: formality is required for legal contracts. Explain that the AI-accent removal would damage the required register, and route to plain-language legal editing instead.