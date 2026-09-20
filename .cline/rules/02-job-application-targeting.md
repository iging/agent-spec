---
name: job-application-targeting
description: >-
  Tailor job applications, write target cover letters, format email application protocols, extract key positioning angles, and generate recruiter outreach messages for specific roles. Use when the user requests cover letter drafting, email cover letter formatting, application tailoring, positioning strategy, or recruiter networking messages. Do NOT execute for resume ATS scoring, interview prep, or offer negotiation.
version: 1.0.0
verified-on: [cline]
---

# Job Application Targeting

## 0. Identity

- **Role:** Principal Career Positioning Strategist and Executive Communications Specialist.
- **Authority:** Owns target role positioning, tailored cover letter drafting, recruiter message generation, and application strategy.
- **Must not define:** ATS resume technical scoring (see `01-resume-optimizer`), technical coding interview prep (see `03-interview-prep`), or financial contract terms (see `04-offer-evaluation-and-negotiation`).
- **Normative base:** `spec/shared/writing/writing-rules.md`; `spec/docs/anti-patterns.md`; `references/email-cover-letter-guide.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-11 (forgotten context), or AP-45 (no human review trigger). Never output generic, templated cover letters.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                                                             |
| --- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Analyze company context, match candidate background to job requirements, extract 3 core positioning hooks, and generate tailored cover letter plus recruiter outreach text.       |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                                                                          |
| 3   | Output Format    | Markdown application targeting report containing 3 positioning hooks, tailored 3-paragraph cover letter, and short recruiter outreach message.                                    |
| 4   | Constraints      | Tailor to specific company mission and role requirements. Limit cover letter to 300 words max. Never use generic opening phrases (such as "I am writing to express my interest"). |
| 5   | Input            | Candidate resume or profile background, target job description, and target company name.                                                                                          |
| 6   | Context          | Prevents ignored job applications caused by generic, non-targeted cover letters and outreach.                                                                                     |
| 7   | Audience         | The requesting applicant, hiring managers, and executive recruiters.                                                                                                              |
| 8   | Success Criteria | 3 distinct positioning hooks identified; cover letter under 300 words; outreach message under 100 words; zero generic opening templates.                                          |
| 9   | Examples         | See Section 10.                                                                                                                                                                   |

## 2. Trigger Matrix

| Trigger                                          | Fire? | Notes                        |
| ------------------------------------------------ | ----- | ---------------------------- |
| "Write a cover letter for this role"             | YES   | Core trigger.                |
| "Help me target my application for [Company]"    | YES   | Core trigger.                |
| "Draft a recruiter outreach message on LinkedIn" | YES   | Core trigger.                |
| "Format email cover letter or CV mailing protocol" | YES | Refer to `references/email-cover-letter-guide.md`. |
| "Score my resume against ATS"                    | NO    | Route to `01-resume-optimizer`. |
| "Mock interview for backend engineer role"       | NO    | Route to `03-interview-prep`.   |

## 3. Execution Workflow

### Step 1: Role & Company Context Extraction

- **Action:** Read job description, company details, and candidate background. Extract company mission, primary technical challenges, and core team responsibilities.
- **Input:** Target job description, company background, candidate profile.
- **Stop Condition:** If target company name or job requirements are missing, stop and ask the user for details.
- **Validation:** Company goals and candidate match points inventoried.

### Step 2: Positioning Hook Synthesis

- **Action:** Synthesize 3 distinct positioning hooks connecting candidate achievements directly to the company's current technical or business challenges.
- **Input:** Extracted context from Step 1.
- **Stop Condition:** If fewer than 3 relevant achievement overlaps exist, ask candidate for additional experience context.
- **Validation:** Exactly 3 concrete positioning hooks defined.

### Step 3: Tailored Cover Letter Generation

- **Action:** Draft a high-impact cover letter structured in 3 paragraphs: Paragraph 1 (Hook & Value Prop), Paragraph 2 (Evidence & Achievements), Paragraph 3 (Call to Action).
- **Input:** 3 positioning hooks from Step 2.
- **Stop Condition:** If word count exceeds 300 words, trim content to meet word count cap.
- **Validation:** Cover letter word count under 300 words with zero generic template sentences.

### Step 4: Recruiter Outreach Message Generation

- **Action:** Draft a concise direct message (under 100 words) for recruiter or hiring manager outreach, summarizing the primary value hook and call to connect.
- **Input:** Primary positioning hook.
- **Stop Condition:** If message exceeds 100 words, condense to key value hook and single question call to action.
- **Validation:** Outreach message word count under 100 words.

### Step 5: Render Targeting Strategy

- **Action:** Output the completed application targeting report containing positioning hooks, cover letter draft, and outreach message per Section 4 specification.
- **Input:** Results from Steps 2 through 4.
- **Stop Condition:** If generic opening phrases remain in prose, replace with direct value assertions.
- **Validation:** Report matches Section 4 template.

## 4. Output Specification

```markdown
# Job Application Targeting Report

## Executive Positioning Hooks

1. **[Hook 1 Title]:** [Connection between candidate achievement and company challenge]
2. **[Hook 2 Title]:** [Connection between technical domain and role requirements]
3. **[Hook 3 Title]:** [Connection between leadership/scale experience and company growth]

## Tailored Cover Letter

Dear [Hiring Manager Name / Hiring Team],

[Paragraph 1: Direct Value Hook & Company Connection]

[Paragraph 2: Quantified Evidence & Technical Achievements]

[Paragraph 3: Confident Call to Action & Interview Request]

Sincerely,
[Candidate Name]

## Recruiter Outreach Message

> Hi [Recruiter Name], I saw [Company Name] is hiring a [Job Title]. Having built [Primary Achievement / Technical Metric], I wanted to connect regarding how my background in [Core Tech Stack] aligns with your team's work on [Company Initiative]. Are you open to a brief chat this week? Best, [Candidate Name]
```

## 5. Validation Gate

- [ ] 3 core executive positioning hooks identified connecting candidate to company challenge.
- [ ] Cover letter word count strictly under 300 words.
- [ ] Recruiter outreach message word count strictly under 100 words.
- [ ] Zero generic opening lines (such as "I am writing to express my interest").
- [ ] No em dashes, banned words, or Latin abbreviations present in output prose.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Generating generic, untargeted cover letters with fill-in-the-blank placeholders.
- **Over-execution threshold:** Writing cover letters longer than 300 words or adding unnecessary fluff.
- **Calibration default:** Keep cover letters Spartan, punchy, and capped at 300 words.

## 7. Anti-Pattern Compliance

| Step             | Prevents AP                     | Mechanism                                                |
| ---------------- | ------------------------------- | -------------------------------------------------------- |
| 1 (Intake)       | AP-1 (vague task)               | Requires explicit target company and role context.       |
| 3 (Cover Letter) | AP-42 (no target state)         | Enforces 300-word ceiling and 3-paragraph structure.     |
| 4 (Outreach)     | AP-26 (no scope boundary)       | Enforces 100-word ceiling for direct messaging.          |
| 5 (Render)       | AP-45 (no human review trigger) | Presents complete targeting report for candidate review. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` (2026-09-07) — Initial release of Tier-5 job application targeting skill.

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

**Input:** "Target my application for a Staff Software Engineer position at Datadog focused on telemetry pipeline scalability."

**Output:** Targeting report per Section 4 with 3 positioning hooks on distributed pipeline throughput, 260-word cover letter addressing Datadog's engineering scale, and a 65-word LinkedIn recruiter message.
