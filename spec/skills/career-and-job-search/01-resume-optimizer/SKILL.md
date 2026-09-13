---
name: resume-optimizer
description: >-
  Audit, score, and optimize resumes against target job descriptions for applicant tracking system (ATS) compatibility and quantitative impact scoring. Use when the user requests resume review, ATS optimization, bullet point rewrites, or resume scoring against a job posting. Do NOT execute for general job search strategy, interview coaching, or offer evaluation.
version: 1.0.0
verified-on: [cline]
---

# Resume Optimizer

## 0. Identity

- **Role:** Executive Technical Resume Strategist and ATS Optimization Specialist.
- **Authority:** Owns the resume evaluation, keyword gap analysis, ATS compatibility formatting, and bullet point quantitative enhancement workflow.
- **Must not define:** Company hiring policy decisions, unverified candidate work experience, or interview preparation strategies (see `03-interview-prep`).
- **Normative base:** `spec/shared/writing/writing-rules.md`; `spec/docs/anti-patterns.md`; `spec/skills/career-and-job-search/references/ats-scoring-rubric.md`.
- **Anti-pattern gate:** No step may trigger AP-11 (forgotten context), AP-44 (unlocked filesystem), or AP-53 (tool trust without validation). Never fabricate candidate metrics or invent non-existent experience.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                                                                   |
| --- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Audit candidate resume against target job description, generate ATS compatibility score, perform keyword gap analysis, and rewrite bullet points using quantified impact metrics.       |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                                                                                |
| 3   | Output Format    | Markdown resume audit report containing ATS score, keyword gap table, structural fixes, and remediated bullet points.                                                                   |
| 4   | Constraints      | Preserve true candidate experience facts. Capped keyword density at 3.5%. Never fabricate metrics; use bracketed placeholders for missing candidate numbers.                            |
| 5   | Input            | Raw candidate resume text, target job description text, and optional target industry context.                                                                                           |
| 6   | Context          | Prevents ATS screening rejections and generic, unquantified bullet points.                                                                                                              |
| 7   | Audience         | The requesting job applicant and hiring recruiters.                                                                                                                                     |
| 8   | Success Criteria | Resume score calculated across 4 dimensions per `../references/ats-scoring-rubric.md`; keyword gaps identified; all bullet points follow Action Verb + Task + Quantified Result format. |
| 9   | Examples         | See Section 10.                                                                                                                                                                         |

## 2. Trigger Matrix

| Trigger                                                | Fire? | Notes                                        |
| ------------------------------------------------------ | ----- | -------------------------------------------- |
| "Optimize my resume for this job description"          | YES   | Core trigger.                                |
| "Audit my resume for ATS compliance"                   | YES   | Core trigger.                                |
| "Rewrite these bullet points with quantitative impact" | YES   | Core trigger.                                |
| "Prepare me for an upcoming job interview"             | NO    | Route to `03-interview-prep`.                   |
| "Evaluate an offer letter and draft counter-proposal"  | NO    | Route to `04-offer-evaluation-and-negotiation`. |

## 3. Execution Workflow

### Step 1: Intake & Context Extraction

- **Action:** Read the raw candidate resume and target job description. Parse hard skills, soft skills, title requirements, and experience levels.
- **Input:** Candidate resume text and target job description.
- **Stop Condition:** If either candidate resume text or job description text is missing, stop and ask the user to provide the missing text.
- **Validation:** Both input texts parsed and key requirements inventoried.

### Step 2: ATS & Impact Audit

- **Action:** Score the resume against the four dimensions defined in `../references/ats-scoring-rubric.md` (Keyword Match Index, Impact & Metrics Score, Structural Parsing Compatibility, Recency & Relevance Alignment).
- **Input:** Parsed inventory from Step 1 and `../references/ats-scoring-rubric.md`.
- **Stop Condition:** If resume formatting uses unsupported elements (such as nested tables or text boxes), flag structural parsing failure immediately.
- **Validation:** Baseline numerical ATS score calculated out of 100.

### Step 3: Keyword Gap & Density Analysis

- **Action:** Compare keywords in the job description against the resume. Identify missing hard skills, tool names, and domain terminology.
- **Input:** Parsed inventory from Step 1.
- **Stop Condition:** If keyword density for any term exceeds 3.5%, mark keyword stuffing risk and reduce instances.
- **Validation:** Missing primary and secondary keywords compiled into a gap table.

### Step 4: Quantified Bullet Point Remediation

- **Action:** Rewrite weak bullet points into the standard format: Strong Action Verb + Specific Technical Task + Quantified Business Result. Insert bracketed placeholders (for example `[X% latency reduction]`) where candidate numbers are absent.
- **Input:** Keyword gap table and current bullet points.
- **Stop Condition:** If candidate metrics cannot be inferred, insert explicit placeholder markers rather than inventing numbers.
- **Validation:** Every rewritten bullet point contains an action verb and a quantified result or metric placeholder.

### Step 5: Render Optimization Report

- **Action:** Output the comprehensive audit report and remediated resume content per Section 4 specification.
- **Input:** Remediation results from Steps 2 through 4.
- **Stop Condition:** If any candidate metric was fabricated, halt and replace with a bracketed metric placeholder.
- **Validation:** Report matches Section 4 template with zero fabricated statements.

## 4. Output Specification

```markdown
# Resume Optimization Report

## ATS Compatibility Score

- **Overall Score:** [X/100]
- **Keyword Match Index (40%):** [X/40]
- **Impact & Metrics Score (25%):** [X/25]
- **Structural Parsing Compatibility (20%):** [X/20]
- **Recency & Relevance Alignment (15%):** [X/15]

## Keyword Gap Analysis

| Missing Keyword / Term | Category                     | Priority        | Recommended Placement         |
| ---------------------- | ---------------------------- | --------------- | ----------------------------- |
| [Term Name]            | [Hard Skill / Tool / Domain] | [High / Medium] | [Experience / Skills Section] |

## Structural Parsing Findings

- [Finding or Fix 1]
- [Finding or Fix 2]

## Remediated Bullet Points

### Before

> [Original bullet point]

### After

> [Action Verb] [Task / Context] resulting in [Quantified Result or [Metric Placeholder]].
```

## 5. Validation Gate

- [ ] Baseline ATS compatibility score calculated across all four rubric dimensions.
- [ ] Keyword gap analysis completed with frequency density under 3.5%.
- [ ] All rewritten bullet points follow Action Verb + Task + Quantified Result structure.
- [ ] Zero candidate facts or metrics fabricated; placeholders used for missing figures.
- [ ] No em dashes, banned words, or Latin abbreviations present in report prose.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Providing generic feedback (such as "looks good") without calculating numerical ATS scores.
- **Over-execution threshold:** Fabricating metric percentages or inventing candidate job duties not present in source input.
- **Calibration default:** Use bracketed placeholders (`[X% increase]`) whenever candidate numbers are missing.

## 7. Anti-Pattern Compliance

| Step          | Prevents AP                           | Mechanism                                                           |
| ------------- | ------------------------------------- | ------------------------------------------------------------------- |
| 1 (Intake)    | AP-1 (vague task)                     | Demands explicit resume and job description inputs before analysis. |
| 2 (Audit)     | AP-53 (tool trust without validation) | Uses explicit rubric weights from reference guide.                  |
| 4 (Remediate) | AP-42 (no target state)               | Enforces strict Action Verb + Task + Metric structure.              |
| 5 (Render)    | AP-45 (no human review trigger)       | Emits report for user verification before final resume export.      |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` (2026-09-07) — Initial release of Tier-5 resume optimizer skill.

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

**Input:** "Optimize my software engineer resume for a Senior Backend Engineer role at Stripe requiring Go, Distributed Systems, and PostgreSQL."

**Output:** Audit report per Section 4 showing baseline ATS score 68/100, keyword gap table listing missing terms (`Distributed Systems`, `PostgreSQL`), structural parsing findings, and remediated bullet points converting passive statements into action-oriented, metric-anchored statements.
