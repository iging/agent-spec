---
name: write-a-skill
description: >-
  Convert a plain-language description of a desired behavior into a properly structured, installable SKILL.md document. Enforce strict skill-authoring constraints: trigger-optimized descriptions, deterministic execution steps, output templates, and anti-trigger calibration. Execute this skill whenever the user says "make a skill", "write a skill", "turn this into a skill", or requests a globally persistent behavior constraint. Do NOT execute for one-off task instructions or MCP server development.
---

# Write a Skill

## 1. Role and Authority

- **Role:** Principal Prompt Engineer & Tooling Architect. Converts user intent into a deterministically structured `SKILL.md` document.
- **Authority:** Enforces strict YAML frontmatter constraints and Markdown body structures required for agent onboarding.

## 2. Phase 1: Intent Extraction

Before generating the skill document, extract the following constraints from the user request. Ask a maximum of 3 clarifying questions if any critical dimensions remain undefined.

1. **Target Task:** What specific behavior must the skill produce?
2. **Execution Trigger:** What exact phrases or contexts prompt the execution?
3. **Anti-Triggers (Exclusions):** When MUST the skill remain dormant? Identify near-miss scenarios to prevent over-triggering.
4. **Output Specification:** Does the skill require a fixed output format or template?
5. **Execution Determinism:** Must the agent execute a rigid script, or evaluate context dynamically?

## 3. Phase 2: YAML Frontmatter Generation

The `SKILL.md` document MUST begin with a strict YAML frontmatter block.

- **Name:** Use lowercase, hyphens, and a maximum of 64 characters. Match the folder name exactly (e.g., `fact-checker`).
- **Description Constraint:** Format the description strictly as a YAML block scalar using `description: >-`. Do NOT use quotes.
- **Description Structure:** Keep the description under 1024 characters. Sequence the content as follows:
  1. Define the action using one concrete active-verb sentence.
  2. Define the exact trigger contexts.
  3. Define proactive execution scenarios.
  4. Define explicit exclusions using "Do NOT execute for..." to prevent over-triggering.

## 4. Phase 3: Body Structure Generation

The body of the `SKILL.md` document MUST remain under 500 lines. Enforce imperative voice. Use the following exact structure:

```markdown
# [Skill Name]

## 1. Role and Purpose

[Define the core responsibility and the specific failure mode prevented by the skill.]

## 2. Core Rule

[State the single non-negotiable constraint plainly.]

## 3. Execution Workflow

[List numbered, chronological execution steps. Append the explicit rationale to any step prone to failure.]

## 4. Output Specification

[Provide the exact markdown template inside a fenced block. Do not rely on descriptive paragraphs for format enforcement.]

## 5. Anti-Triggers and Calibration

[Define under-triggering and over-triggering scenarios. Establish a strict execution threshold.]

## 6. Examples

[Provide minimum one concrete example containing an input and the expected output mapping.]
```
