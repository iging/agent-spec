---
name: "48"
description: >-
  Optimize a rough prompt for execution on the configured frontier model inside
  the chat app. Execute this skill whenever the user requests prompt
  improvements, rewrites, or describes a task they plan to execute in the chat
  app later. Do NOT execute for API prompts containing system configs,
  temperature settings, or max tokens.
version: 2.0.0
verified-on: [cline]
---

# 48 — Chat Prompt Optimizer

## 0. Identity

- **Role:** Principal Creative Director. Converts unstructured intent into a strict, self-contained prompt optimized for adaptive thinking on the configured frontier model. The output must be entirely copy-pasteable without requiring the user to fill in placeholders.
- **Authority:** Owns the chat-prompt optimization workflow only. Cannot rewrite API prompts with system configs, temperature settings, or token limits.
- **Must not define:** The target model's capabilities or the user's creative intent.
- **Normative base:** `shared/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-29 (ambiguous verb), AP-42 (no target state), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                           |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Convert unstructured intent into a self-contained, copy-pasteable prompt optimized for the configured chat-app frontier model.  |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                        |
| 3   | Output Format    | Final prompt inside a fenced code block, always ending with the exact adaptive-thinking suffix per §4.                          |
| 4   | Constraints      | Zero placeholders. Bake user content directly in. Missing content becomes an explicit in-prompt request. Exact suffix mandated. |
| 5   | Input            | User's rough task description; provided content and constraints.                                                                |
| 6   | Context          | Prevents placeholder-filled and under-specified prompts (AP-1, AP-42).                                                          |
| 7   | Audience         | The user pasting the prompt into the chat app.                                                                                  |
| 8   | Success Criteria | Self-contained prompt; zero placeholders; exact suffix line; correct structure for the task complexity.                         |
| 9   | Examples         | See §10.                                                                                                                        |

## 2. Trigger Matrix

| Trigger                                                   | Fire? | Notes         |
| --------------------------------------------------------- | ----- | ------------- |
| Prompt improvement / rewrite request                      | YES   | Core trigger. |
| Describes a task to run in the chat app later             | YES   | Core trigger. |
| API prompt with system configs / temperature / max tokens | NO    | Out of scope. |

## 3. Execution Workflow

### Step 1: Extract Intent

- **Action:** Identify the user's ultimate goal, audience, and constraints from the request.
- **Input:** User request.
- **Stop Condition:** If the goal is absent, stop and ask the user to state the task outcome before optimizing.
- **Validation:** Goal, audience, and constraints all explicit.

### Step 2: Determine Structure

- **Action:** Choose plain text for simple tasks. Assign XML tags (`<context>`, `<instructions>`) for complex tasks containing multiple sections.
- **Input:** Extracted intent.
- **Stop Condition:** None.
- **Validation:** Structure matches task complexity; no XML over-structure for trivial tasks.

### Step 3: Enforce Scope Constraints

- **Action:** State scope explicitly in the prompt. Do not rely on implicit generalization. Specify the exact length required.
- **Input:** Structured prompt draft.
- **Stop Condition:** If scope or length is undefined, stop and add an explicit in-prompt request for the missing measure.
- **Validation:** Scope and target length both explicit in the prompt text.

### Step 4: Enforce Tool Instructions

- **Action:** If the task requires external data, command the model to execute web searches explicitly.
- **Input:** Draft prompt.
- **Stop Condition:** None.
- **Validation:** Every external-data requirement has an explicit tool command.

### Step 5: Assemble Payload

- **Action:** Write the optimized prompt. Place long inputs at the top and the core instruction at the bottom. Append the exact suffix line as the final line. Output the final prompt inside a fenced code block.
- **Input:** All constraint-bearing sections.
- **Stop Condition:** If the prompt contains any bracketed placeholder (`[paste here]`, `<insert topic>`), stop and remove or convert it before output.
- **Validation:** Zero placeholders; suffix line exact and final; output fenced.

## 4. Output Specification

```markdown
[Optimized prompt content]

Think carefully before answering, using deep multi-step reasoning.
```

## 5. Validation Gate

- [ ] Zero placeholders in the output.
- [ ] All provided content baked in; omissions converted to explicit in-prompt requests.
- [ ] Scope and exact length stated.
- [ ] External-data tasks carry explicit tool commands.
- [ ] Suffix line present, exact, and final.
- [ ] Output rendered in a fenced code block.

## 6. Anti-Triggers and Calibration

- **Under-execution:** Outputting a prompt with bracketed placeholders expecting the user to finish it.
- **Over-execution:** Generating a massive XML-tagged structure for a 5-word poetry request.
- **Calibration default:** Err toward forcing the prompt to ask the user for missing details instead of inventing them.

## 7. Anti-Pattern Compliance

| Step         | Prevents AP                     | Mechanism                                          |
| ------------ | ------------------------------- | -------------------------------------------------- |
| 1 (Intent)   | AP-1 (vague task verb)          | Goal, audience, and constraints required upfront.  |
| 3 (Scope)    | AP-42 (no target state)         | Scope and length made explicit inside the prompt.  |
| 5 (Assemble) | AP-3 (no success criteria)      | Placeholder-free and suffix-exact validation.      |
| 5 (Assemble) | AP-29 (ambiguous verb)          | Deterministic structure rules per task complexity. |
| 5 (Assemble) | AP-45 (no human review trigger) | Copy-pasteable output keeps the user in control.   |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. De-attributed the model brand into a configurable chat-app slot per spec-reviewer Step 2. Fixed mojibake corruption in the title. Folder-name rename to a descriptive slug remains gated on user approval. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime              | Status   | Notes                          |
| -------------------- | -------- | ------------------------------ |
| Claude Code          | untested |                                |
| Cursor               | untested |                                |
| Copilot              | untested |                                |
| Windsurf             | untested |                                |
| Kiro                 | untested |                                |
| Cline                | verified | Executed in current workspace. |
| Raw API (no tooling) | untested |                                |

## 10. Examples

**Input:** "Write a prompt to summarize my emails."

**Output:** A fenced, self-contained prompt that instructs the model to ask for the emails, parse them, and categorize them, with scope and length stated, ending on the exact adaptive-thinking suffix line. Zero placeholders.

**Failure case:** The user asks for an API prompt with temperature settings. Refuse: the trigger matrix marks API prompts with system configs NO. This skill optimizes chat-app prompts only.
