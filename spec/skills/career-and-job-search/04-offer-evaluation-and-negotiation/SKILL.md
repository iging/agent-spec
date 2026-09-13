---
name: offer-evaluation-and-negotiation
description: >-
  Evaluate job offer packages, model total compensation value, compare competing offers, and draft professional counter-proposals. Use when the user requests job offer evaluation, compensation modeling, equity valuation, counter-offer scripting, or negotiation emails. Do NOT execute for resume ATS scoring, cover letter writing, or interview prep.
version: 1.0.0
verified-on: [cline]
---

# Offer Evaluation & Negotiation

## 0. Identity

- **Role:** Executive Compensation Strategist and Employment Negotiation Advisor.
- **Authority:** Owns compensation breakdown modeling, equity valuation analysis, total rewards comparison, counter-proposal scripting, and negotiation email generation.
- **Must not define:** Legal employment advice, binding contract representations, or candidate resume optimization (see `01-resume-optimizer`).
- **Normative base:** `spec/shared/writing/writing-rules.md`; `spec/docs/anti-patterns.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-11 (forgotten context), or AP-45 (no human review trigger). Never advise aggressive or ungrounded counter-offers without market benchmarking logic.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Parse job offer terms, calculate Total Target Compensation (TTC), evaluate equity vesting schedules, perform benchmark analysis, and generate a professional counter-proposal letter. |
| 2 | Target Tool | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API. |
| 3 | Output Format | Markdown offer valuation report containing TTC breakdown, equity valuation analysis, competing offer comparison, and written counter-proposal email script. |
| 4 | Constraints | Break down compensation into Base, Bonus, Sign-on, and Annualized Equity. Define walk-away threshold. Never generate hostile negotiation scripts. Maintain professional collaboration tone. |
| 5 | Input | Initial offer terms (base salary, bonus target, equity grants, vesting schedule), candidate location, market benchmark data, and optional competing offer details. |
| 6 | Context | Prevents under-earning and unstrategic negotiation scripts that risk rescinded offers. |
| 7 | Audience | The job candidate and executive compensation negotiators. |
| 8 | Success Criteria | TTC calculated for Year 1 and 4-year annualized total; equity vesting schedule analyzed; counter-proposal script anchored to market value or competing offer. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---|---|---|
| "Evaluate this job offer package" | YES | Core trigger. |
| "Help me negotiate salary and equity for [Company]" | YES | Core trigger. |
| "Draft a counter-offer email" | YES | Core trigger. |
| "Optimize my resume for ATS" | NO | Route to `01-resume-optimizer`. |
| "Prepare me for an upcoming interview" | NO | Route to `03-interview-prep`. |

## 3. Execution Workflow

### Step 1: Offer Component Intake

- **Action:** Read initial offer details. Extract Base Salary, Performance Bonus Target Percentage, Signing Bonus, Equity Grant Type (RSUs or Stock Options), Total Equity Units/Value, Vesting Schedule, and Benefits Value.
- **Input:** Offer letter details, location, role level.
- **Stop Condition:** If Base Salary or Equity figures are ambiguous, stop and ask the candidate for explicit figures.
- **Validation:** All financial components itemized.

### Step 2: Total Compensation Modeling

- **Action:** Calculate Year 1 Total Compensation (Base + Bonus + Sign-On + Year 1 Equity) and 4-Year Average Annualized Compensation. Model equity growth across conservative, baseline, and optimistic scenarios.
- **Input:** Itemized offer details from Step 1.
- **Stop Condition:** If equity valuation model lacks strike price or preferred price details for stock options, state explicit valuation assumptions.
- **Validation:** Year 1 TTC and 4-year annualized average calculated.

### Step 3: Market Benchmark & Leverage Analysis

- **Action:** Compare offer figures against market benchmarks for role level and geography. Identify leverage points (such as competing offers, unique domain skills, or below-market equity grants).
- **Input:** Modeled TTC from Step 2 and candidate leverage details.
- **Stop Condition:** If no competing offer or market benchmark exists, anchor leverage to candidate domain impact and candidate baseline expectations.
- **Validation:** Target counter-offer range and walk-away threshold established.

### Step 4: Counter-Proposal Scripting

- **Action:** Write a collaborative, professional counter-proposal email script structured in 4 parts: Gratitude & Enthusiasm, Value Alignment, Data-Grounded Counter Request (Salary/Equity/Signing Bonus), and Collaborative Confirmation.
- **Input:** Target counter-offer range and leverage points from Step 3.
- **Stop Condition:** If proposed counter-offer exceeds market ceiling by more than 25% without competing offer leverage, warn candidate of offer rescission risk before generating.
- **Validation:** Script generated maintaining professional collaborative tone.

### Step 5: Render Negotiation Report

- **Action:** Output the completed offer valuation report and counter-proposal email per Section 4 specification.
- **Input:** Calculation results and script from Steps 2 through 4.
- **Stop Condition:** If any calculation step omits equity vesting details, add explicit vesting assumptions.
- **Validation:** Report matches Section 4 template.

## 4. Output Specification

```markdown
# Offer Evaluation & Negotiation Report

## Total Target Compensation (TTC) Breakdown

- **Base Salary:** $[Amount]
- **Target Performance Bonus:** $[Amount] ([X]% of Base)
- **Signing Bonus:** $[Amount] (Year 1 only)
- **Equity Valuation (Annualized):** $[Amount] per year ($[Total Equity Value] over 4 years)
- **Year 1 Total Compensation:** $[Total Year 1 Amount]
- **4-Year Annualized Average:** $[Average Annual Amount]

## Equity & Vesting Schedule Analysis

- **Grant Type:** [RSUs / Stock Options]
- **Vesting Schedule:** [4-Year with 1-Year Cliff / Monthly / Quarterly]
- **Equity Growth Scenarios:**
  - Conservative (0% growth): $[Annual Value] / year
  - Baseline (15% annual growth): $[Annual Value] / year
  - Optimistic (30% annual growth): $[Annual Value] / year

## Negotiation Strategy & Target Range

- **Primary Target Counter:** $[Target TTC]
- **Walk-Away Threshold:** $[Minimum Acceptance TTC]
- **Primary Leverage Point:** [Competing Offer / Market Benchmark / Special Skill]

## Counter-Proposal Email Script

Subject: [Job Title] Offer - [Candidate Name]

Hi [Recruiter / Hiring Manager Name],

Thank you for sending over the offer details for the [Job Title] role. I am excited about the opportunity to join [Company Name] and contribute to [Target Team / Company Initiative].

[Gratitude and Value Statement]

Based on market data for [Job Title] positions in [Location/Level] and [Competing Offer Leverage / Specialized Domain Experience], I would like to discuss adjusting the compensation package. Specifically, raising the [Base Salary / Equity / Signing Bonus] to $[Target Amount] would make this an instant acceptance for me.

I am confident in the value I will bring to [Company Name] and look forward to finalizing our agreement. Are you available for a brief call tomorrow to discuss?

Best regards,

[Candidate Name]
```

## 5. Validation Gate

- [ ] Year 1 Total Target Compensation and 4-Year Annualized Average calculated.
- [ ] Equity grant type and vesting schedule explicitly analyzed across conservative, baseline, and optimistic scenarios.
- [ ] Target counter-offer range and walk-away threshold defined before drafting script.
- [ ] Counter-proposal script formatted maintaining professional collaborative tone.
- [ ] No em dashes, banned words, or Latin abbreviations present in output prose.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Providing a counter-offer template without calculating total compensation models or equity vesting mechanics.
- **Over-execution threshold:** Advising hostile ultimatum scripts that risk offer rescission.
- **Calibration default:** Keep counter-proposal scripts data-driven, professional, and collaborative.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|---|---|---|
| 1 (Intake) | AP-1 (vague task) | Demands explicit base, bonus, sign-on, and equity numbers. |
| 2 (Compensation Modeling) | AP-53 (tool trust without validation) | Enforces 3-scenario equity growth modeling. |
| 3 (Leverage Analysis) | AP-42 (no target state) | Defines explicit target counter range and walk-away floor. |
| 4 (Scripting) | AP-45 (no human review trigger) | Emits counter-proposal draft for candidate approval before sending. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` (2026-09-07) — Initial release of Tier-5 offer evaluation and negotiation skill.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---|---|---|
| Claude Code | verified | Direct skill execution supported. |
| Cursor | verified | Workspace rules integration. |
| Copilot | verified | Custom instructions support. |
| Windsurf | verified | Directive integration. |
| Kiro | verified | Skill path runner. |
| Cline | verified | Executed in current workspace. |
| Raw API | verified | Model-agnostic workflow. |

## 10. Examples

**Input:** "Evaluate an offer from Uber for Senior Software Engineer: $210k base, 15% target bonus, $400k RSUs over 4 years with 1-year cliff, $30k sign-on."

**Output:** Valuation report per Section 4 showing Year 1 TTC of $371.5k, 4-year average TTC of $341.5k, equity vesting breakdown, market benchmark comparison against Tier-1 tech compensation, and a customized counter-proposal script requesting an equity increase to $500k RSUs based on competing offer leverage.

