---
name: interview-prep
description: >-
  Prepare candidates for technical, behavioral, system design, and executive job interviews. Use when the user requests mock interviews, behavioral question prep using STAR framework, technical question breakdowns, or executive interview strategy. Do NOT execute for resume ATS scoring, cover letter writing, or offer negotiation.
version: 1.0.0
verified-on: [cline]
---

# Interview Prep

## 0. Identity

- **Role:** Principal Technical Interview Coach and Executive Assessment Specialist.
- **Authority:** Owns mock interview simulation, behavioral response structuring, technical architecture questioning, and candidate preparation strategy.
- **Must not define:** Resume ATS compatibility scoring (see `01-resume-optimizer`), application cover letters (see `02-job-application-targeting`), or compensation negotiations (see `04-offer-evaluation-and-negotiation`).
- **Normative base:** `spec/shared/writing/writing-rules.md`; `spec/docs/anti-patterns.md`; `spec/skills/career-and-job-search/references/star-story-framework.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-11 (forgotten context), or AP-45 (no human review trigger). Never supply generic interview answers without candidate metrics.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                                                                                               |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Prepare candidates for job interviews by predicting role-specific questions, structuring behavioral answers using `../references/star-story-framework.md`, outlining technical breakdowns, and practicing mock Q&A. |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                                                                                                            |
| 3   | Output Format    | Markdown interview preparation guide containing 5 role questions, STAR behavioral frameworks, system architecture rubrics, and reverse interview questions.                                                         |
| 4   | Constraints      | Anchor behavioral answers in STAR framework with quantified metrics. Ensure technical breakdowns cover trade-offs. Include candidate questions to ask interviewers.                                                 |
| 5   | Input            | Target job title, company name, target seniority level, candidate background, and optional interview stage context.                                                                                                 |
| 6   | Context          | Prevents candidate stumbles during high-stakes behavioral and technical interview rounds.                                                                                                                           |
| 7   | Audience         | The job candidate and mock interview practice partners.                                                                                                                                                             |
| 8   | Success Criteria | 5 role-specific questions generated; behavioral answers formatted using STAR framework per `../references/star-story-framework.md`; technical trade-offs specified; 3 reverse questions provided.                   |
| 9   | Examples         | See Section 10.                                                                                                                                                                                                     |

## 2. Trigger Matrix

| Trigger                                                 | Fire? | Notes                                 |
| ------------------------------------------------------- | ----- | ------------------------------------- |
| "Prepare me for an interview at [Company]"              | YES   | Core trigger.                         |
| "Practice behavioral questions with me using STAR"      | YES   | Core trigger.                         |
| "Help me structure my system design interview strategy" | YES   | Core trigger.                         |
| "Optimize my resume for ATS"                            | NO    | Route to `01-resume-optimizer`.          |
| "Draft a cover letter for this application"             | NO    | Route to `02-job-application-targeting`. |

## 3. Execution Workflow

### Step 1: Interview Context Extraction

- **Action:** Read candidate profile, target job title, company name, and interview stage (such as Recruiter Screen, Hiring Manager, Technical Architecture, or Executive Panel).
- **Input:** Candidate experience details, target job title, company name, interview stage.
- **Stop Condition:** If target job title or company is missing, stop and ask the candidate for details.
- **Validation:** Interview round type and technical scope inventoried.

### Step 2: Role Question Prediction

- **Action:** Predict 5 high-probability interview questions customized to the target company, role seniority, and domain technical requirements (2 behavioral, 2 technical/system architecture, 1 cultural fit).
- **Input:** Context from Step 1.
- **Stop Condition:** If predicted questions do not match role seniority, recalibrate questions to match candidate level.
- **Validation:** Exactly 5 target questions defined.

### Step 3: STAR Behavioral Response Structuring

- **Action:** Structure candidate behavioral responses using the Situation, Task, Action, Result framework defined in `../references/star-story-framework.md`. Ensure every Result phase contains a quantitative metric or bracketed placeholder.
- **Input:** Candidate behavioral experiences and predicted behavioral questions.
- **Stop Condition:** If a candidate behavioral story lacks a quantitative result metric, insert a bracketed placeholder marker (`[Metric placeholder]`).
- **Validation:** Behavioral answers comply with STAR framework requirements.

### Step 4: Technical & Architectural Breakdown

- **Action:** Outline technical responses covering system design, architectural trade-offs, edge cases, failure modes, and performance scalability.
- **Input:** Predicted technical and system design questions.
- **Stop Condition:** If a technical answer mentions a technology without addressing trade-offs or constraints, add trade-off analysis.
- **Validation:** Technical responses address architecture, trade-offs, and scalability.

### Step 5: Reverse Interview Question Generation

- **Action:** Formulate 3 strategic reverse interview questions for the candidate to ask the interviewer, focusing on team culture, engineering challenges, and business strategy.
- **Input:** Target company context and role level.
- **Stop Condition:** If questions are generic (such as "what is a typical day"), replace with strategic team-specific questions.
- **Validation:** 3 high-impact candidate questions generated.

## 4. Output Specification

```markdown
# Interview Preparation Guide

## Target Role Context

- **Role Title:** [Target Job Title]
- **Company:** [Company Name]
- **Interview Stage:** [Recruiter / Hiring Manager / Technical / Executive]

## Predicted High-Probability Questions

1. **[Question 1 - Behavioral]:** [Question text]
2. **[Question 2 - Behavioral]:** [Question text]
3. **[Question 3 - Technical]:** [Question text]
4. **[Question 4 - Technical / Architecture]:** [Question text]
5. **[Question 5 - Culture / Strategy]:** [Question text]

## Behavioral Story Frameworks (STAR)

### Story 1: [Scenario Title]

- **Situation (15%):** [Context and constraint]
- **Task (15%):** [Specific responsibility assigned]
- **Action (50%):** [Detailed steps taken and personal contribution]
- **Result (20%):** [Quantified outcome metric or [Metric Placeholder]]

## Technical & Architecture Breakdowns

### Topic: [System Design / Technical Concept]

- **Architectural Approach:** [Core architecture]
- **Trade-offs & Constraints:** [Pros, cons, and alternatives evaluated]
- **Failure Modes & Edge Cases:** [Resilience strategies and safeguards]

## Candidate Questions for Interviewer

1. [Strategic Question 1 on engineering challenges]
2. [Strategic Question 2 on team structure and autonomy]
3. [Strategic Question 3 on product roadmap and business impact]
```

## 5. Validation Gate

- [ ] 5 high-probability questions predicted matching role seniority and company context.
- [ ] Behavioral stories formatted in Situation, Task, Action, Result structure per `../references/star-story-framework.md`.
- [ ] Every behavioral story includes a quantified metric or explicit bracketed metric placeholder.
- [ ] Technical responses contain trade-off analysis and failure mode considerations.
- [ ] 3 strategic candidate questions generated for the interviewer.
- [ ] No em dashes, banned words, or Latin abbreviations present in output prose.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Giving generic tips (such as "be confident") without structured STAR stories or technical breakdowns.
- **Over-execution threshold:** Providing long scripts for questions the candidate did not ask to prepare.
- **Calibration default:** Focus on STAR metrics and technical trade-off rigor.

## 7. Anti-Pattern Compliance

| Step                    | Prevents AP                           | Mechanism                                                  |
| ----------------------- | ------------------------------------- | ---------------------------------------------------------- |
| 1 (Intake)              | AP-1 (vague task)                     | Demands explicit job title, company, and stage context.    |
| 3 (STAR Structuring)    | AP-42 (no target state)               | Enforces strict Situation, Task, Action, Result framework. |
| 4 (Technical)           | AP-53 (tool trust without validation) | Requires trade-off and failure mode analysis.              |
| 5 (Candidate Questions) | AP-26 (no scope boundary)             | Limits candidate reverse questions to 3 strategic entries. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` (2026-09-07) — Initial release of Tier-5 interview prep skill.

## 9. Portability Matrix

| Runtime     | Status   | Notes                             |
| ----------- | -------- | --------------------------------- |
| Claude Code | verified | Direct skill execution supported. |
| Cursor      | verified | Workspace rules integration.      |
| Copilot     | verified | Custom instructions support.      |
| Windsurf    | verified | Directive integration.            |
| Kiro        | verified | Skill path runner.                |
| Cline       | verified | Executed in current workspace.    |
| Raw API     | verified | Model-agnostic workflow.          |

## 10. Examples

**Input:** "Prepare me for a System Design and Architecture interview for a Principal Engineer position at Netflix."

**Output:** Interview preparation guide per Section 4 featuring 5 predicted questions, STAR behavioral frameworks for high-concurrency outage scenarios, microservices vs monolith trade-off analysis, and 3 strategic questions regarding Netflix playback reliability.
