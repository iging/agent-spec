---
name: write-feature-spec
description: >-
  Turn vague feature requests into precise, executable specifications and task
  decompositions across five structured phases. Execute this skill whenever the
  user says "spec this out", "file an issue", "write up a ticket", "turn this into
  an issue", or "create a backlog item". Do NOT execute for high-level business ideation
  or direct code writing.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Write Feature Spec

## 0. Identity

- **Role:** Lead Technical Product Manager. Converts raw feature ideas into detailed, unambiguous software specifications and structured task breakdowns ready for engineering execution.
- **Authority:** Tier-5 Enterprise Skill. Governs feature specification and issue authoring workflows.
- **Must not define:** Direct production code implementation, deployment pipeline configuration, or strategic business model validation.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `context/PRD.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                  |
| --- | ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Transform ambiguous feature ideas into five-phase actionable specifications and GitHub-ready task issues.              |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                                    |
| 3   | Output Format    | Specification file saved to `.context/specs/[slug]-[branch]-feature-spec.md` and printed issue markdown.               |
| 4   | Constraints      | Must complete discovery before drafting spec. Must cap task breakdown to 5 discrete sub-tasks. Must lock scope bounds. |
| 5   | Input            | User feature request, codebase context, existing PRD or architecture docs.                                             |
| 6   | Context          | Prevents engineers from starting work on underspecified features that cause scope creep or rework.                     |
| 7   | Audience         | Software engineers, code reviewers, and automated coding agents executing tasks.                                       |
| 8   | Success Criteria | Specification document created with explicit acceptance criteria, scope boundaries, and zero ambiguous requirements.   |
| 9   | Examples         | See Section 10.                                                                                                        |

## 2. Trigger Matrix

| Trigger                                 | Fire? | Notes                                                  |
| --------------------------------------- | ----- | ------------------------------------------------------ |
| "Spec this feature out"                 | YES   | Core trigger for feature specification.                |
| "Write up a ticket for this"            | YES   | Issue drafting request.                                |
| "Turn this request into a GitHub issue" | YES   | Task specification request.                            |
| "I have a new business idea"            | NO    | Ideation stage. Route to `interrogate-product-demand`. |
| "Refactor database models"              | NO    | Direct engineering execution task.                     |

## 3. Execution Workflow

### Phase 1: Intent Extraction & Goal Boundary Definition

- **Action:** Read your feature request. Extract the primary objective, target user persona, affected interface or API, and success metrics. Define explicit allowed and forbidden boundaries for this feature.
- **Input:** Your initial prompt, current repository name, and active git branch name.
- **Stop Condition:** If your feature goal is ambiguous or contains conflicting requirements, stop and ask up to 3 clarifying questions.
- **Validation:** Clear problem statement and goal boundary established in session memory.

### Phase 2: Codebase Context & Dependency Scanning

- **Action:** Scan the codebase to identify existing files, functions, types, components, and APIs impacted by the proposed feature. Map existing data flows that will be altered.
- **Input:** Source files identified through targeted file reading and codebase search operations.
- **Stop Condition:** Limit file scan to 10 relevant files. Do not perform repository-wide context dumps.
- **Validation:** Complete list of modified paths and new paths recorded.

### Phase 3: Interactive Clarification & Requirement Locking

- **Action:** Present a summary of technical choices, edge cases, and potential breaking changes discovered during Phase 2. Ask you to confirm preferred behavior for edge cases.
- **Input:** Codebase findings from Phase 2.
- **Stop Condition:** Wait for your explicit approval of technical choices before proceeding to spec drafting.
- **Validation:** All technical decisions locked without open questions.

### Phase 4: Executable Spec & Task Decomposition

- **Action:** Write the complete feature specification document to `.context/specs/[slug]-[branch]-feature-spec.md`. Break down implementation into 3 to 5 atomic engineering tasks ordered by dependency.
- **Input:** Locked requirements and codebase context from Phases 1–3.
- **Stop Condition:** If `.context/specs/` directory does not exist, create it before writing.
- **Validation:** Specification file written to disk matching the schema in Section 4.

### Phase 5: Issue Generation & Implementation Handoff

- **Action:** Format the finalized specification as a structured GitHub issue markdown payload. Output instructions for passing the spec to an engineering workflow or automated coding agent.
- **Input:** Written specification document from Phase 4.
- **Stop Condition:** Stop after displaying the issue payload and next-step prompt instructions.
- **Validation:** User receives ready-to-copy issue body with complete acceptance criteria.

## 4. Output Specification

```markdown
# Feature Specification: [Feature Title]

- **Status:** Draft | Approved
- **Author:** [Lead Technical PM]
- **Target Branch:** [branch-name]
- **Spec Path:** `.context/specs/[slug]-[branch]-feature-spec.md`

## 1. Goal and User Value

[Clear statement of what this feature achieves and why]

## 2. Scope Boundaries

### Allowed Changes
- Edit files matching: `[file pattern 1]`, `[file pattern 2]`
- Add new endpoints/components: `[component path]`

### Forbidden Actions
- Do not edit: `package.json`, database migration scripts, `.env`
- Do not add third-party dependencies without approval

## 3. Detailed Requirements

### 3.1 Functional Requirements
1. [Requirement 1]
2. [Requirement 2]

### 3.2 Acceptance Criteria
- [ ] Given [precondition], when [action], then [expected outcome].
- [ ] Given [precondition], when [invalid input], then handle error gracefully.

## 4. Atomic Execution Breakdown

1. **Task 1: Data Model / Schema Updates**
   - Files: `[path]`
   - Verification: `npm test` or type checker passes.
2. **Task 2: Core Logic Implementation**
   - Files: `[path]`
   - Verification: Unit tests pass.
3. **Task 3: Interface / API Endpoint Wiring**
   - Files: `[path]`
   - Verification: Endpoint returns expected response payload.

## 5. Verification Command

```bash
[Command to verify implementation complete]
```
```

## 5. Validation Gate

Run before declaring completion:

- [ ] All 5 phases completed in sequential order.
- [ ] Maximum of 10 context files scanned during Phase 2.
- [ ] Specification saved to `.context/specs/[slug]-[branch]-feature-spec.md`.
- [ ] Scope boundaries explicitly define allowed and forbidden file paths.
- [ ] Zero banned words or em dashes present in specification text.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Creating a ticket without explicit file scope boundaries or acceptance criteria.
- **Over-execution threshold:** Writing full implementation code inside the specification document.
- **Calibration default:** Err toward non-execution if the user asks directly to write application code.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| Phase 1 | AP-1, AP-3 | Defines unambiguous single task and explicit success criteria. |
| Phase 2 | AP-16, AP-31 | Caps context scanning to 10 files to prevent token bloat and attention loss. |
| Phase 3 | AP-45 | Pauses for user confirmation before locking technical choices. |
| Phase 4 | AP-4, AP-26 | Specifies explicit allowed and forbidden file bounds for downstream implementation. |
| Phase 5 | AP-28, AP-42 | Provides deterministic task decomposition and clear target state. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room implementation conforming to Tier-5 Enterprise SKILL standard.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct execution using standard file tools. |
| Cursor | verified | Fully supported via workspace context scanning. |
| Copilot | verified | Formatted for step-by-step guidance. |
| Windsurf | verified | Fully compatible. |
| Kiro | verified | Fully compatible. |
| Cline | verified | Executed and verified in local workspace. |
| Raw API (no tooling) | verified | Generates valid specification payloads. |

## 10. Examples

**Input:** "Spec out a rate limiter for our login endpoint to prevent brute force attacks."

**Output:** Executes Phases 1–5. Scans `src/routes/auth.js` and `src/middleware/rateLimit.js`. Asks whether rate limit should be memory-based or Redis-backed. Locks Redis choice. Writes `.context/specs/app-auth-rate-limiter.md` with explicit criteria (max 5 attempts per minute per IP, returns HTTP 429). Outputs ready-to-use GitHub issue.

**Failure case:** User says "Implement the rate limiter right now." Skill halts spec mode and suggests switching to engineering implementation workflow.

