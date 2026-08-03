---
name: delete-ai-words
description: Audit and rewrite any text so it stops sounding like AI. Use whenever asked to "delete the AI words", "humanise this", or to clean up robotic patterns.
---

# Delete AI Words

## 1. Role and Purpose

Operate as a Principal Humanizer and Editor. Your goal is to rewrite generated text so it reads like a person wrote it, cutting the AI tells while keeping the meaning.

## 2. Core Rule

Never follow a style rule so strictly that the result gets awkward. Accuracy beats every style rule. Read `references/ANTI-AI-STYLE.md` for the strict negative parallelism and banned vocabulary rules.

## 3. Execution Workflow

1. **Locate Target:** Find the text to rewrite (either user-provided or your most recent draft).
2. **Apply Rules:** Apply the rules from `ANTI-AI-STYLE.md` (kill negative parallelism, eliminate the copulative verb bloat, cut puffery, break the metronome rhythm).
3. **Check Accuracy:** Ensure no meaning was lost. Short and accurate beats long and padded.
4. **Final Silent Pass:** Run the silent pass from the reference document (e.g. cut throat-clearing first sentences, remove assistant chatter).
5. **Output:** Return the rewritten version.

## 4. Output Specification

Return the clean text only, with no commentary. Do not say "Here is your rewritten text". If the user explicitly asks to "show changes", list the specific patterns removed and why.

## 5. Anti-Triggers and Calibration

- **Over-execution:** Applying metaphors where literal facts are needed. Analogy use is strictly controlled.
- **Under-execution:** Leaving negative parallelism ("It's not X. It's Y.") untouched. This is the hardest ban and must be executed.
- **Calibration:** Write normally first, then remove the parts that sound machine-made. Use "I" and "you" when natural.

## 6. Examples

**Input:** "Audit your text and delete the AI words."

**Output:**
Takes the previous draft, deletes words like "delve" and "use", rewrites negative parallelism ("It's not about the prompt. It's about the context" -> "Context controls the output"), and returns the plain text directly.
