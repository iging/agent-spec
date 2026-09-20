---
name: career-and-job-search
description: >-
  Root router and 4-phase sequential lifecycle dispatcher for the Career & Job Search module, routing resume optimization, job application targeting, interview prep, and offer negotiation requests to specialist sub-skills.
version: 2.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Career & Job Search Router & Sequential Lifecycle Dispatcher

## 0. Identity

- **Role:** Career & Job Search Sequential Lifecycle Dispatcher.
- **Authority:** Tier-5 normative root skill for `skills/career-and-job-search/`.
- **Must not define:** Direct resume writing, cover letter drafting, interview coaching, or compensation modeling; delegates execution to phase sub-skills.
- **Normative base:** `spec/core/decision-framework.md`, `spec/shared/writing/writing-rules.md`, `spec/docs/anti-patterns.md`, `spec/docs/skill-standard.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-11, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                              |
| --- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Inspect user requests, classify them into 4 sequential career lifecycle phases, and dispatch or chain sub-skills.                  |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                                                |
| 3   | Output Format    | Structured routing decision and target skill execution handoff plan.                                                               |
| 4   | Constraints      | Router executes no career search tasks directly. Sub-skills execute sequentially with structured phase handoffs.                   |
| 5   | Input            | User prompt, candidate background, resume text, job posting, cover letter request, interview details, or offer compensation terms. |
| 6   | Context          | Prevents unguided career assistance, missing ATS scoring, unaligned application messaging, and unstrategic negotiation scripts.    |
| 7   | Audience         | Job applicants, executive candidates, career strategists, and autonomous developer agents.                                         |
| 8   | Success Criteria | Exactly one target phase sub-skill path resolved deterministically and executed in lifecycle order.                                |
| 9   | Examples         | See Section 10.                                                                                                                    |

### Sequential Lifecycle Phase Matrix

The Career & Job Search module follows a strict 4-phase sequential pipeline. Each phase produces structured artifacts that feed into the subsequent phase:

```
[Phase 01: Resume Optimizer] ──> Optimized Profile & ATS Gaps
           │
           ▼
[Phase 02: Application Targeting] ──> Executive Hooks & Tailored Assets
           │
           ▼
[Phase 03: Interview Prep] ──> STAR Stories & Architecture Rubrics
           │
           ▼
[Phase 04: Offer Negotiation] ──> TTC Breakdown & Counter Script
```

| Phase | Phase Name                     | Sub-Skill Path                                 | Inputs Received                                                                   | Primary Artifacts Produced                                                                                             | Downstream Handoff                                                 |
| ----- | ------------------------------ | ---------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `01`  | Resume Optimization            | `01-resume-optimizer/SKILL.md`                 | Candidate resume, target job description                                          | ATS score (100pt), keyword gap table, metric-anchored bullet points                                                    | Passes optimized candidate profile & keyword alignment to Phase 02 |
| `02`  | Application Targeting          | `02-job-application-targeting/SKILL.md`        | Optimized candidate profile, target company & role context                        | 3 positioning hooks, tailored cover letter (<300w), recruiter outreach message (<100w)                                 | Passes role positioning & strategic value hooks to Phase 03        |
| `03`  | Interview Preparation          | `03-interview-prep/SKILL.md`                   | Target role context, candidate background, interview stage                        | 5 predicted questions, metric-anchored STAR stories, technical/trade-off rubrics, 3 strategic questions                | Passes candidate market alignment & readiness data to Phase 04     |
| `04`  | Offer Evaluation & Negotiation | `04-offer-evaluation-and-negotiation/SKILL.md` | Offer package (base, bonus, equity, vesting), market benchmarks, competing offers | Year 1 & 4-year TTC breakdown, equity valuation model, target counter range & walk-away floor, counter-proposal script | Delivers final negotiation package for candidate review            |

## 2. Trigger Matrix

| User Intent / Trigger Pattern                                                                     | Targeted Phase                        | Target Skill File Path                         |
| ------------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------- |
| Audit resume, score ATS compatibility, rewrite bullet points with metrics                         | `01-resume-optimizer`                 | `01-resume-optimizer/SKILL.md`                 |
| Draft cover letter, tailor application, write recruiter outreach messages                         | `02-job-application-targeting`        | `02-job-application-targeting/SKILL.md`        |
| Prepare for interviews, mock Q&A, STAR behavioral framework, system design prep                   | `03-interview-prep`                   | `03-interview-prep/SKILL.md`                   |
| Evaluate offer package, model equity vesting, total compensation calculation, draft counter-offer | `04-offer-evaluation-and-negotiation` | `04-offer-evaluation-and-negotiation/SKILL.md` |

## 3. Execution Workflow

### Step 1: Analyze Intent & Classify Phase

- **Action:** Read user prompt. Extract user goal, available input artifacts (resume, job description, offer terms), and target career phase.
- **Input:** User prompt text and provided documents.
- **Stop Condition:** Stop and prompt user if career domain or input context is ambiguous.
- **Validation:** Intent maps to exactly one phase in the Sequential Lifecycle Phase Matrix.

### Step 2: Resolve Target Skill Path

- **Action:** Resolve the sub-skill path corresponding to the identified phase.
- **Input:** Sequential Lifecycle Phase Matrix & Trigger Matrix.
- **Stop Condition:** Decline execution if request is out of career search scope.
- **Validation:** Target `SKILL.md` file exists under `skills/career-and-job-search/`.

### Step 3: Dispatch & Handoff Pipeline

- **Action:** Delegate control to the resolved phase sub-skill. If the user requests an end-to-end career strategy execution, chain sub-skills sequentially from Phase 01 through Phase 04, passing intermediate output artifacts.
- **Input:** Resolved target path and candidate context.
- **Stop Condition:** Handoff control to target sub-skill.
- **Validation:** Target sub-skill executes internal workflow.

## 4. Output Specification

```json
{
  "module": "career-and-job-search",
  "phase": "01-resume-optimizer",
  "target_skill": "skills/career-and-job-search/01-resume-optimizer/SKILL.md",
  "handoff_next": "skills/career-and-job-search/02-job-application-targeting/SKILL.md",
  "reasoning": "Selected based on user request to optimize resume bullet points for ATS compliance before applying."
}
```

## 5. Validation Gate

- [ ] User intent mapped to exactly one primary lifecycle phase.
- [ ] Target sub-skill file path exists on disk under `skills/career-and-job-search/`.
- [ ] Router executes zero direct career writing or modeling tasks.
- [ ] Sequential handoff dependencies explicitly defined for multi-phase requests.

## 6. Anti-Triggers

- **Under-execution:** Bypassing sub-skill dispatch and generating unquantified resume advice or generic cover letters.
- **Over-execution:** Routing non-career software engineering or code refactoring tasks to `career-and-job-search`.
- **Calibration default:** Route single-phase requests directly; chain sequential phases (01 → 02 → 03 → 04) when the user requests end-to-end job search campaign support.

## 7. Anti-Pattern Compliance

| Step | Prevents AP                  | Mechanism                                                              |
| ---- | ---------------------------- | ---------------------------------------------------------------------- |
| 1    | AP-1 (vague task)            | Enforces strict phase classification before dispatch.                  |
| 2    | AP-26 (no scope boundary)    | Maps execution strictly to designated phase sub-skills.                |
| 3    | AP-4 (over-permissive agent) | Router cannot draft copy or calculate financial compensation directly. |

## 8. Versioning

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-09-07) — Formalized 4-phase sequential lifecycle flow (`01-resume-optimizer` → `02-job-application-targeting` → `03-interview-prep` → `04-offer-evaluation-and-negotiation`), updated directory routing paths, and added sequential pipeline handoff specifications.
  - `1.0.0` (2026-09-07) — Initial root router release for `skills/career-and-job-search/`.

## 9. Portability Matrix

| Runtime     | Status   | Notes                                 |
| ----------- | -------- | ------------------------------------- |
| Claude Code | verified | Direct sub-skill execution supported. |
| Cursor      | verified | Workspace rules integration.          |
| Copilot     | verified | Custom instructions support.          |
| Windsurf    | verified | Directive integration.                |
| Kiro        | verified | Skill path runner.                    |
| Cline       | verified | Executed in current workspace.        |
| Raw API     | verified | Model-agnostic workflow.              |

## 10. Annotated Examples

### Example 1: Single Phase Dispatch (Resume Optimization)

**Input:** "Optimize my software engineer resume for a Senior Staff Engineer role at Stripe."  
**Output:** Phase `01-resume-optimizer`, target `skills/career-and-job-search/01-resume-optimizer/SKILL.md`.

### Example 2: Sequential Campaign Chaining

**Input:** "Help me prepare my entire application and interview strategy for Datadog."  
**Output:** Initiates Phase 01 (`01-resume-optimizer`), handoffs optimized profile to Phase 02 (`02-job-application-targeting`), and prepares Phase 03 (`03-interview-prep`) STAR framework.
