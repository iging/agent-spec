---
name: personal-voice
description: >-
  Make all writing output match the user's own voice, calibrated from 5
  real writing samples plus their explicit rules on sentence length,
  rhythm, forbidden phrases, and tone.
version: 2.0.0
verified-on: [cline]
---

# Personal Voice

## 0. Identity

- **Role:** Principal Personal Voice Calibration Engine. Extracts structural and rhythmic habits from real writing samples so future drafts sound indistinguishably like the user.
- **Authority:** Owns the voice calibration and application workflow only. Never models another person's voice.
- **Must not define:** Content where a house style overrides personal style (legal filings, API docs); any voice other than the user's own.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`; `references/VOICE-CALIBRATION.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dump), AP-29 (ambiguous verb), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Select the mode by checking for `references/voice-profile.md`; run calibration (5 samples + explicit rules → profile) or application (draft in the exact voice → verify against the profile). |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Calibration: completed profile for approval. Application: drafted text in the user's voice. |
| 4 | Constraints | Only model the user's own voice. Never model another person to pass as them. |
| 5 | Input | 5 real writing samples; explicit rules; or a draft request referencing the profile. |
| 6 | Context | Prevents generic drafting and voice mimicry failure (AP-16, AP-29). |
| 7 | Audience | The user whose voice is being calibrated or who receives the draft. |
| 8 | Success Criteria | Profile built from measurable habits and approved; drafts match the profile from the first word and verify before delivery. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Write this in my voice" | YES | Core trigger. |
| "Set up / update my voice profile" | YES | Calibration mode. |
| Drafting anything published or sent under the user's name | YES | Application mode once profile exists. |
| Imitate a person other than the user | NO | Forbidden; never model others. |
| Legal filings, API docs (house style required) | NO | Out of scope. |

## 3. Execution Workflow

### Step 1: Select Mode

- **Action:** Check if `references/voice-profile.md` exists.
- **Input:** Skill folder.
- **Stop Condition:** None.
- **Validation:** Exists → Application; missing or recalibration requested → Calibration.

### Step 2 (Calibration): Collect Inputs

- **Action:** Request 5 real writing samples (150+ words, final drafts the user was happy with, ideally matching target genres) plus their explicit rules (sentence lengths, rhythm, forbidden words, punctuation, tones).
- **Input:** User.
- **Stop Condition:** If samples are too few or too short but the user insists, proceed and flag affected profile fields as low-confidence.
- **Validation:** 5 samples + explicit rules collected.

### Step 3 (Calibration): Analyze and Reconcile

- **Action:** Measure sentence mechanics, paragraph shape, punctuation fingerprint, vocabulary register, signature moves, and never-list. Reconcile explicit rules against reality — ask the user which wins when they conflict.
- **Input:** Samples.
- **Stop Condition:** If rules contradict samples and the user hasn't resolved it, stop and ask instead of silently picking one.
- **Validation:** Profile metrics measured; conflicts resolved by the user's choice.

### Step 4 (Calibration): Install Profile

- **Action:** Fill `references/profile-template.md`, include 2-3 quoted touchstone snippets, show for approval, then save as `references/voice-profile.md` with samples in `references/samples/`.
- **Input:** Analyzed profile.
- **Stop Condition:** If the user has not approved the profile, stop and wait.
- **Validation:** Profile approved and installed; re-packaging offered so it survives future chats.

### Step 5 (Application): Draft in Voice

- **Action:** Load the profile and draft in the exact voice from the first word — never draft generically then re-skin.
- **Input:** Profile + draft request.
- **Stop Condition:** If drafting generically first, stop and restart — structure and rhythm must be baked in from the first word.
- **Validation:** Draft matches profile sentence lengths, rhythm, and never-list from the start.

### Step 6 (Application): Verify and Learn

- **Action:** Verify the draft against profile metrics before delivering; append the user's corrections to the Learned Corrections section.
- **Input:** Draft.
- **Stop Condition:** If the draft fails the profile check, stop and fix before delivering.
- **Validation:** Draft verified; would a weekly reader pause on any sentence? If not, deliver.

## 4. Output Specification

In Calibration Mode, output the completed `voice-profile.md` for approval. In Application Mode, output the drafted text in the user's voice, verified against the profile.

## 5. Validation Gate

- [ ] Mode correctly selected (profile exists → application; else calibration).
- [ ] Calibration: 5 samples + explicit rules collected; low-confidence fields flagged when samples are thin.
- [ ] Analysis measured, not vibed: rates and frequencies recorded, not just features.
- [ ] Rules vs. reality conflicts resolved by the user's explicit choice.
- [ ] Profile approved and installed; re-packaging offered.
- [ ] Application: draft written in voice from the first word and verified against the profile before delivery.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Drafting generically and applying a "re-skin" afterward. Structure and rhythm must be baked in from the first word.
- **Under-execution:** Failing to notice explicit rules contradict the user's provided samples.
- **Calibration:** The user's personal voice rules override any generic style rules from other skills.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Select) | AP-29 (ambiguous verb) | Mode selection is deterministic: profile exists or not. |
| 2 (Collect) | AP-1 (vague task) | 5 samples + explicit rules are hard inputs. |
| 4 (Install) | AP-45 (no human review trigger) | Profile approval gate before installation. |
| 5 (Draft) | AP-16 (context dump) | Draft is voice-loaded from the first word; no generic scaffold. |
| 6 (Verify) | AP-3 (no success criteria) | Profile numbers are the measurable acceptance criteria. |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Write this email in my voice."

**Output:** Checks `references/voice-profile.md`. If found, drafts the email preserving the user's exact sentence length variance and punctuation quirks, ensuring no words from their 'never-list' appear. If missing, enters calibration: asks for 5 samples and explicit rules, builds the profile, and secures approval before drafting.

**Failure case:** The user asks the agent to imitate a public figure's writing style to draft posts as them. Refuse per the core rule: this skill only models the user's own voice at their request.