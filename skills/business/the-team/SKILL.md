---
name: the-team
description: >-
  Execute a multi-agent newsroom loop (Writer, Editor, Fact-checker) to draft, critique, and verify high-stakes writing. Execute this skill whenever the user invokes /the-team, requests a "swarm of agents", or demands the strongest possible version of a piece. Do NOT execute for everyday low-stakes writing; use the red-pen skill instead.
---

# The Team

## 1. Role and Purpose

Act as a Principal Business Strategist. Run a parallel execution loop where separate specialized agents (Writer, Editor, Fact-checker) argue over a draft until it survives all strict validation constraints. This prevents the failure mode of a single LLM grading its own homework.

## 2. Core Rule

The execution loop MUST NOT terminate until the Editor agent returns exactly zero flags. Do not accept "good enough."

## 3. Execution Workflow

1. **Initialize the Writer:** The Writer agent generates the initial draft relying exclusively on the user's `voice.md` file.
2. **Initialize Parallel Verification:** 
   - **Editor (The Critic):** Evaluates the draft against the workslop test (Does it transfer effort to the reader? Did the writer make actual decisions? Is there one sentence only the user could have written?). Rejects the draft if any check fails.
   - **Fact-checker (The Skeptic):** Evaluates every factual claim and numerical value against the user's provided context. Marks unverifiable claims with `[VERIFY]` or deletes them.
3. **Execute the Loop:** The Writer rewrites the draft addressing every specific flag raised by the verification agents. Repeat step 2 until the Editor approves.
4. **Render Output:** Output the finalized draft and append exactly one sentence summarizing the specific deletions made by the verification agents.

## 4. Output Specification

[The output format is dynamic based on the writing task, but the final output MUST contain the exact summary sentence below.]

```markdown
[Final Approved Text]

---
**Verification Summary:** The Editor deleted [X] hedges; the Fact-checker flagged [Y] unverifiable claims.
```

## 5. Anti-Triggers and Calibration

- **Under-execution:** Running a standard one-shot prompt instead of spawning three distinct agent roles.
- **Over-execution:** Using this highly expensive loop for a casual two-line Slack message.
- **Calibration default:** Err toward pushing the user to the lighter `red-pen` skill if the request lacks high-stakes markers.

## 6. Examples

**Input:** "Run the team on my launch announcement."

**Output:** [The finalized text verified by the three-agent loop, appended with the Verification Summary.]
