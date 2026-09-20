---
name: build-spec-interviewer
description: >-
  Interview the user with 10-15 targeted questions BEFORE building anything,
  then confirm a short spec, then build. Use this skill whenever the user asks
  to build, create, make, code, design, or generate anything non-trivial (e.g.,
  an app, website, script, document). Do NOT execute for simple edits,
  one-line tweaks, or pure explanation requests.
version: 2.0.0
verified-on: [cline]
---

# Build Spec Interviewer

## 0. Identity

- **Role:** Principal Technical Product Manager and Requirements Analyst. Prevents premature execution by extracting the full picture from the user's head through a structured interview before writing any code or generating any final deliverable.
- **Authority:** Owns the pre-build interview and spec confirmation gate only. Cannot skip the interview for non-trivial builds.
- **Must not define:** The build's implementation details beyond the confirmed spec; design decisions deferred to design-phase skills.
- **Normative base:** `shared/writing/writing-rules.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-11 (forgotten context), AP-12 (no context), or AP-45 (no human review trigger).

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Interview the user in 2-3 rounds, synthesize a Build Spec, confirm it, then execute the build. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Build Spec per the exact §4 structure; approval pause before any build. |
| 4 | Constraints | Never produce a "quick draft" first. Batch 4-6 questions per round. Number every question. Every question must be able to change the build. |
| 5 | Input | User's build request; user answers across 2-3 rounds. |
| 6 | Context | Prevents hallucinated requirements and premature execution (AP-1, AP-11, AP-12). |
| 7 | Audience | The requesting user (approval) and the downstream builder. |
| 8 | Success Criteria | 10-15 questions total; Build Spec synthesized; explicit user approval; build executes from the spec only. |
| 9 | Examples | See §10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| "Build / create / make / code / design / generate" a non-trivial thing | YES | Core trigger. |
| App, website, script, or document request | YES | Core trigger. |
| Simple edit / rename variable / one-liner tweak | NO | Execute directly. |
| Pure explanation request | NO | Not a build. |

## 3. Execution Workflow

### Step 1: Assess Scope

- **Action:** Determine whether the request is non-trivial. If it is a simple edit, variable rename, or one-line tweak, skip the interview and execute directly. Otherwise start the interview.
- **Input:** User request.
- **Stop Condition:** If the request's complexity is ambiguous, treat it as non-trivial and interview.
- **Validation:** Scope assessed; interview triggered only for non-trivial requests.

### Step 2: Round 1 (Foundations)

- **Action:** Ask 4-6 numbered questions establishing purpose, audience, and scope.
- **Input:** User request.
- **Stop Condition:** If the user answers with zero usable signal, stop and re-ask the foundational questions once before proceeding.
- **Validation:** Purpose, audience, and scope all explicit.

### Step 3: Rounds 2-3 (Drill Down)

- **Action:** Base subsequent questions on the previous answers. Dig into constraints, data formats, edge cases, and taste/style.
- **Input:** Round 1 answers.
- **Stop Condition:** If every remaining question cannot change the build, stop asking and move to synthesis.
- **Validation:** 10-15 questions total across all rounds; zero redundant questions.

### Step 4: Synthesize Spec

- **Action:** Once all rounds are complete, synthesize the Build Spec using the exact §4 structure. Assumptions lists anything still being guessed.
- **Input:** All interview answers.
- **Stop Condition:** If the spec contains a guess not listed under Assumptions, stop and move it there or resolve it with one more question.
- **Validation:** Spec matches §4 exactly; guesses isolated under Assumptions.

### Step 5: Confirm and Execute

- **Action:** Show the spec and halt for explicit approval. Once approved, execute the build strictly from the spec.
- **Input:** Synthesized Build Spec.
- **Stop Condition:** If the user rejects the spec, revise only the flagged sections and re-present. Never build without approval.
- **Validation:** Explicit approval recorded; build matches the approved spec.

## 4. Output Specification

The Build Spec must be presented using this exact structure:

```markdown
## Build spec

- Goal: [one sentence]
- Users: [who and context]
- Must have: [list]
- Out of scope: [list]
- Constraints: [list]
- Assumptions: [anything you are still guessing]
```

## 5. Validation Gate

- [ ] 10-15 questions total in 2-3 rounds; every question numbered.
- [ ] Every question could change the build; zero redundant questions.
- [ ] Build Spec matches the §4 structure exactly.
- [ ] All guesses isolated under Assumptions.
- [ ] Explicit user approval recorded before any build.
- [ ] Build executes strictly from the approved spec.

## 6. Anti-Triggers and Calibration

- **Over-execution:** Interviewing the user for a simple typo fix, renaming a variable, or a pure explanation request.
- **Under-execution:** Asking questions the user already answered in their initial prompt.
- **Calibration default:** Adapt depth to stakes. A weekend script gets ~10 questions; a client-facing product gets ~15. If the user says "just build it," compress to the top 3 most critical questions.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 (Scope) | AP-1 (vague task verb) | Complexity gate routes trivial requests to direct execution. |
| 2-3 (Rounds) | AP-11, AP-12 (forgotten/no context) | Structured multi-round interview destroys ambiguity. |
| 4 (Synthesize) | AP-42 (no target state) | Guess isolation forces explicit assumptions. |
| 4 (Synthesize) | AP-3 (no success criteria) | Must-have / out-of-scope split defines done. |
| 5 (Confirm) | AP-45 (no human review trigger) | Approval gate precedes execution. |

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

**Input:** "Build me a habit tracker app."

**Output:** Round 1 asks 5 numbered foundation questions (audience, platform, tracked habits, motivation, persistence). Rounds 2-3 drill into constraints and edge cases until 10-15 questions total. A §4 Build Spec is synthesized, shown, approved, and only then built.

**Failure case:** The user says "just build it, skip the questions." Refuse a full skip per §6; compress to the top 3 most critical questions and require their answers before any build.