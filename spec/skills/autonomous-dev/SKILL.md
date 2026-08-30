---
name: autonomous-dev
description: >-
  Root router and lifecycle dispatcher for autonomous engineering skills.
  Executes phase classification and hands off work to specialized sub-skills.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Autonomous Dev Router & Lifecycle Dispatcher

## 0. Identity

- **Role:** Autonomous Software Engineering Lifecycle Dispatcher.
- **Authority:** Normative root tier for `skills/autonomous-dev/`.
- **Must not define:** Direct file edits or coding execution, routing logic hands off execution to specialized skills.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                 |
| --- | ---------------- | ------------------------------------------------------------------------------------- |
| 1   | Task             | Classify user requests into lifecycle phases and dispatch matching sub-skills.        |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.   |
| 3   | Output Format    | Structured routing decision and target skill execution handoff.                       |
| 4   | Constraints      | No direct code edits within the router. Dispatch to sub-skill files.                  |
| 5   | Input            | User intent, prompt requests, feature ideas, bug reports, or pull requests.           |
| 6   | Context          | Prevents premature code editing, context drift, and uncoordinated subagent execution. |
| 7   | Audience         | Autonomous agents and developers executing engineering tasks.                         |
| 8   | Success Criteria | Exactly one primary target sub-skill path resolved and invoked deterministically.     |
| 9   | Examples         | See Section 10.                                                                       |

## 2. Trigger Matrix

| Trigger         | Target Phase                     | Target Skill File Path                                          |
| --------------- | -------------------------------- | --------------------------------------------------------------- |
| Design request  | `01-ideation-and-design`         | `01-ideation-and-design/brainstorming.md`                       |
| Worktree setup  | `02-isolation-and-workspace`     | `02-isolation-and-workspace/using-git-worktrees.md`             |
| Branch cleanup  | `02-isolation-and-workspace`     | `02-isolation-and-workspace/finishing-a-development-branch.md`  |
| Task plan       | `03-planning-and-decomposition`  | `03-planning-and-decomposition/writing-plans.md`                |
| Subagent SDD    | `04-execution-and-orchestration` | `04-execution-and-orchestration/subagent-driven-development.md` |
| Batch plan      | `04-execution-and-orchestration` | `04-execution-and-orchestration/executing-plans.md`             |
| Parallel agents | `04-execution-and-orchestration` | `04-execution-and-orchestration/dispatching-parallel-agents.md` |
| TDD engine      | `05-quality-and-testing`         | `05-quality-and-testing/test-driven-development.md`             |
| Proof check     | `05-quality-and-testing`         | `05-quality-and-testing/verification-before-completion.md`      |
| Debugging       | `06-debugging-and-investigation` | `06-debugging-and-investigation/systematic-debugging.md`        |
| Pre-review      | `07-code-review-and-feedback`    | `07-code-review-and-feedback/requesting-code-review.md`         |
| Review feedback | `07-code-review-and-feedback`    | `07-code-review-and-feedback/receiving-code-review.md`          |
| Bootstrap       | `08-meta-and-bootstrap`          | `08-meta-and-bootstrap/using-superpowers.md`                    |
| Meta authoring  | `08-meta-and-bootstrap`          | `08-meta-and-bootstrap/writing-skills.md`                       |

## 3. Execution Workflow

### Step 1: Analyze Intent

- **Action:** Read user prompt. Extract goal, scope, and technical target.
- **Input:** User prompt text.
- **Stop Condition:** Stop and ask user if intent is ambiguous.
- **Validation:** Intent matches a row in the Trigger Matrix.

### Step 2: Resolve Target Skill Path

- **Action:** Select exact sub-skill path corresponding to the identified phase.
- **Input:** Trigger Matrix table.
- **Stop Condition:** Decline execution if no sub-skill matches.
- **Validation:** Target file exists under `skills/autonomous-dev/`.

### Step 3: Handoff Execution

- **Action:** Invoke target sub-skill with contextual inputs.
- **Input:** Resolved sub-skill path.
- **Stop Condition:** Handoff transfers control to sub-skill.
- **Validation:** Sub-skill executes internal workflow.

## 4. Output Specification

```json
{
  "phase": "01-ideation-and-design",
  "target_skill": "skills/autonomous-dev/01-ideation-and-design/brainstorming.md",
  "reasoning": "Selected based on intent matching criteria."
}
```

## 5. Validation Gate

- [ ] User intent mapped to exactly one lifecycle phase.
- [ ] Target sub-skill file exists on disk.
- [ ] Router executes no code or file edits directly.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Failing to route leads to uncoordinated code edits.
- **Over-execution threshold:** Routing single-line trivial fixes like typo corrections.
- **Calibration default:** Route multi-step tasks, execute single-line edits directly.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                  | Mechanism                                       |
| ---- | ---------------------------- | ----------------------------------------------- |
| 1    | AP-1 (vague task)            | Requires goal clarification before dispatching. |
| 2    | AP-26 (no scope boundary)    | Maps intent strictly to dedicated sub-skills.   |
| 3    | AP-4 (over-permissive agent) | Router cannot edit files directly.              |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Initial router creation for `skills/autonomous-dev/`.

## 9. Portability Matrix

| Runtime     | Status   | Notes                         |
| ----------- | -------- | ----------------------------- |
| Claude Code | verified | Direct sub-skill invocation.  |
| Cursor      | verified | `.cursorrules` route support. |
| Copilot     | verified | Custom instruction support.   |
| Windsurf    | verified | Directive integration.        |
| Kiro        | verified | Skill path linking.           |
| Cline       | verified | System prompt directive.      |
| Raw API     | verified | Model-agnostic router.        |

## 10. Examples

**Input:** "Design a user authentication feature."
**Output:** Phase `01-ideation-and-design`, target `01-ideation-and-design/brainstorming.md`.
