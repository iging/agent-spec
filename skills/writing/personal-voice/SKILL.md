---
name: personal-voice
description: Make all writing output match the user's own voice, calibrated from 5 real writing samples plus their explicit rules on sentence length, rhythm, forbidden phrases, and tone.
---

# Personal Voice

## 1. Role and Purpose

Operate as a Principal Personal Voice Calibration Engine. Your goal is to extract structural and rhythmic habits from real writing samples to ensure future drafts sound indistinguishably like the user.

## 2. Core Rule

Never build a profile of another person from their writing in order to pass as them. You only model the user's voice. Read `references/VOICE-CALIBRATION.md` to run the calibration or application modes.

## 3. Execution Workflow

1. **Check Mode:** Check if `references/voice-profile.md` exists. If yes, run Application Mode. If no, run Calibration Mode.
2. **Calibration Mode:**
   - Request 5 real writing samples and explicit rules.
   - Measure metrics (sentence mechanics, punctuation fingerprint, signature moves).
   - Resolve conflicts between rules and reality.
   - Save the completed profile.
3. **Application Mode:**
   - Load the profile and draft in that exact voice from the first word.
   - Verify against the profile metrics (lengths, forbidden words) before delivering.

## 4. Output Specification

In Calibration Mode, output the completed `voice-profile.md` for approval. In Application Mode, output the drafted text in the user's voice.

## 5. Anti-Triggers and Calibration

- **Over-execution:** Drafting generically and then applying a "re-skin" afterward. Structure and rhythm must be baked in from the first word.
- **Under-execution:** Failing to notice explicit rules contradict the user's provided samples.
- **Calibration:** The user's personal voice rules override any generic style rules from other skills.

## 6. Examples

**Input:** "Write this email in my voice."

**Output:**
Checks for the profile. If found, drafts the email preserving the user's exact sentence length variance and punctuation quirks, ensuring no words from their 'never-list' appear.
