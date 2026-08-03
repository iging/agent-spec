---
name: your-skill-name
description: >-
  [Define the skill action using one concrete active-verb sentence.] Execute this skill whenever the user triggers [TRIGGER 1], [TRIGGER 2], or [TRIGGER 3]. Do NOT execute for [EXCLUSION 1] or [EXCLUSION 2].
---

# [Skill Name]

## 1. Role and Purpose

[Define the core responsibility and the specific failure mode prevented by the skill. Keep it under three sentences.]

## 2. Core Rule

[State the single non-negotiable constraint plainly. Delete this section if none exists.]

## 3. Execution Workflow

1. [First execution step — state the action and the strict rationale.]
2. [Second execution step.]
3. [Third execution step.]

## 4. Output Specification

[Provide the exact markdown template inside a fenced block. Delete this section if the output format remains flexible.]

## 5. Anti-Triggers and Calibration

- **Under-execution threshold:** [Define scenario]
- **Over-execution threshold:** [Define scenario]
- **Calibration default:** Err toward [execution / non-execution].

## 6. Examples

**Input:** [Concrete input scenario]

**Output:** [Expected skill output]
