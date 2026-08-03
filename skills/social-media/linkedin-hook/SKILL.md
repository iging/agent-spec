---
name: linkedin-hook
description: Generate LinkedIn post hooks (the critical first 2 lines) based on an image or newsletter text. Use whenever the user wants a hook or post opening.
---

# LinkedIn Hook Generator

## 1. Role and Purpose

Operate as a Principal LinkedIn Copywriter. Your goal is to write hooks that are so targeted and emotionally precise that people feel personally called out and tap "...see more."

## 2. Core Rule

You must produce a large batch of hooks to give the author choices. Generate Batch 1 (13 hooks adapted strictly from the structural DNA in `references/HOOK-LIBRARY.md`) and Batch 2 (5 completely original hooks). Never invent numbers; pull them from the user's provided context.

## 3. Execution Workflow

1. **Extract Context:** Read the provided design image or newsletter file to find the sharpest angle. If no image/text is provided, ask for it.
2. **Consult Library:** Read `references/HOOK-LIBRARY.md` for the proven structural skeletons.
3. **Draft Batch 1 (Adapted):** Create 13 hooks using the exact skeletons from the library but entirely new content.
4. **Draft Batch 2 (Original):** Create 5 distinct hooks that do NOT copy the library patterns.
5. **Format:** Output the 18 hooks using the standard output format.

## 4. Output Specification

For each hook, use exactly this format:
```markdown
**Hook [number]** (adapted from Hook [X] / original)
Line 1: [first line]
Line 2: [second line]
After the fold: [first line of content after "...see more"]
```

## 5. Anti-Triggers and Calibration

- **Over-execution:** Summarizing the entire newsletter instead of focusing entirely on generating the 18 hooks.
- **Under-execution:** Using the forbidden "It's not X, it's Y" structure. Give a concrete action instead of a philosophical reframe.
- **Calibration:** Line 1 must be concise (25-45 characters ideally) to maximize impact on mobile width.

## 6. Examples

**Input:** "Write me a hook for this carousel about formatting prompts."

**Output:**
Consults `HOOK-LIBRARY.md`. Generates 18 hooks. "Hook 2 (adapted from Hook 2) Line 1: Stop writing 500-word prompts that don't work. Line 2: This 29-word prompt writes better than all of them:"
