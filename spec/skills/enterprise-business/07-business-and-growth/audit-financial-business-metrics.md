---
name: audit-financial-business-metrics
description: >-
  Audit software cost structures, API token usage economics, unit economics (CAC, LTV, ARR),
  and infrastructure spending to generate financial efficiency reports. Execute this skill
  whenever the user says "audit financial metrics", "analyze cloud infrastructure costs",
  "calculate unit economics", or "evaluate API token spending". Do NOT execute for code editing.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Audit Financial Business Metrics

## 0. Identity

- **Role:** Principal Business & Financial Operations Analyst. Audits software cost structures, API token usage economics, unit economics (CAC, LTV, ARR), and infrastructure spending.
- **Authority:** Tier-5 Enterprise Skill. Governs software cost auditing, unit economics analysis, token spending optimization, and financial efficiency reporting.
- **Must not define:** Application UI styling or production software deployment tags.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                             |
| --- | ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Analyze cost structures, token usage data, and financial metrics to produce actionable cost optimization reports. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                               |
| 3   | Output Format    | Financial audit report saved to `.context/business/[slug]-financial-audit.md`.                                    |
| 4   | Constraints      | Must compute exact unit economics metrics. Must provide actionable cost reduction recommendations.                |
| 5   | Input            | Billing data, API usage logs, cloud resource manifests, user acquisition metrics, or revenue projections.         |
| 6   | Context          | Prevents unexpected cloud spend surges, inefficient LLM token consumption, and negative unit economics.           |
| 7   | Audience         | Finance leaders, CTOs, product managers, and executive leadership.                                                |
| 8   | Success Criteria | Financial report produced detailing cost breakdown, margin analysis, and prioritized cost savings items.          |
| 9   | Examples         | See Section 10.                                                                                                   |

## 2. Trigger Matrix

| Trigger                                                     | Fire? | Notes                                          |
| ----------------------------------------------------------- | ----- | ---------------------------------------------- |
| "Audit financial business metrics for cloud infrastructure" | YES   | Primary trigger for financial auditing.        |
| "Calculate API token spending and unit margins"             | YES   | Token economics audit request.                 |
| "Analyze SaaS ARR, LTV, and CAC metrics"                    | YES   | Unit economics audit request.                  |
| "Refactor database SQL queries"                             | NO    | Engineering task. Route to refactoring.        |
| "Fix broken unit tests"                                     | NO    | QA task. Route to debugging or test authoring. |

## 3. Execution Workflow

### Step 1: Cost & Metric Data Collection

- **Action:** Read provided billing manifests, API telemetry logs, cloud infrastructure manifests (`terraform/`, `serverless.yml`), or customer acquisition datasets.
- **Input:** Financial logs, usage data files, and infrastructure manifests.
- **Stop Condition:** Limit initial data scan to target billing or telemetry files. Maximum 15 data files.
- **Validation:** Raw cost line items and usage volumes cataloged.

### Step 2: Unit Economics & Margin Calculation

- **Action:** Compute core financial metrics:
  1. _Cost per Active User / API Request:_ Total Infrastructure & Token Spend / Request Volume.
  2. _Gross Margin:_ (Revenue - Direct Compute/Token Costs) / Revenue.
  3. _LTV to CAC Ratio:_ Lifetime Value / Customer Acquisition Cost.
- **Input:** Cataloged line items from Step 1.
- **Stop Condition:** Flag any unit economics model where marginal cost per user exceeds marginal revenue.
- **Validation:** Mathematical calculations verified with clear metric definitions.

### Step 3: Cost Reduction Strategy Formulation

- **Action:** Identify concrete, prioritized cost optimization opportunities (e.g., switching model tiers, implementing response caching, downsizing over-provisioned cloud instances).
- **Input:** Computed metrics from Step 2.
- **Stop Condition:** Require estimated dollar savings or percentage impact for every proposed optimization.
- **Validation:** Savings recommendations ranked by ROI and implementation effort.

### Step 4: Financial Audit Report Delivery

- **Action:** Write the financial audit report to `.context/business/[slug]-financial-audit.md`.

## 4. Output Specification

```markdown
# Financial & Business Metrics Audit Report: [System / Product Name]

- **Date:** [YYYY-MM-DD]
- **Analyst:** [Principal Business & Financial Operations Analyst]
- **Report Path:** `.context/business/[slug]-financial-audit.md`

## 1. Executive Financial Summary

- **Monthly Cloud & API Spend:** $[Amount]
- **Gross Margin:** [Margin %]
- **Unit Margin Status:** HEALTHY | AT RISK | UNHEALTHY

## 2. Unit Economics & Cost Breakdown

| Cost Category    | Monthly Spend | % of Total | Cost per 1k Requests |
| ---------------- | ------------- | ---------- | -------------------- |
| LLM API Tokens   | $4,500        | 60.0%      | $0.45                |
| Database Compute | $2,000        | 26.7%      | $0.20                |
| Network Egress   | $1,000        | 13.3%      | $0.10                |
| **Total**        | **$7,500**    | **100.0%** | **$0.75**            |

## 3. Prioritized Cost Savings Opportunities

### 3.1 Prompt Response Caching (High Impact / Low Effort)

- **Action:** Implement Redis caching layer for repeated prompt inputs.
- **Estimated Savings:** $1,800 / month (-40% LLM token spend).

### 3.2 Database Instance Right-Sizing (Medium Impact / Low Effort)

- **Action:** Downsize db.r6g.2xlarge to db.r6g.xlarge based on 25% peak CPU utilization data.
- **Estimated Savings:** $800 / month (-40% DB compute spend).

## 4. Financial Audit Sign-off Checklist

- [ ] All compute, token, and egress costs cataloged.
- [ ] Unit margins verified positive.
- [ ] Actionable cost savings itemized with estimated ROI.
- [ ] Report saved to `.context/business/[slug]-financial-audit.md`.
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Billing and usage logs scanned without missing major cost buckets.
- [ ] Unit economics (cost per user/request) calculated accurately.
- [ ] Cost savings recommendations itemized with estimated financial impact.
- [ ] Report saved to `.context/business/[slug]-financial-audit.md`.
- [ ] Zero banned words or em dashes present in output text.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Listing costs without calculating unit economics or providing concrete cost reduction steps.
- **Over-execution threshold:** Modifying cloud infrastructure resources directly without financial review sign-off.
- **Calibration default:** Focus on empirical financial data, clear margin formulas, and prioritized ROI recommendations.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                                   |
| ------ | ------------ | --------------------------------------------------------------------------- |
| Step 1 | AP-1, AP-16  | Caps data file scan to 15 billing and usage logs.                           |
| Step 2 | AP-38, AP-40 | Relies on mathematical financial formulas rather than subjective estimates. |
| Step 3 | AP-3, AP-42  | Ranks cost optimization items by clear ROI metrics.                         |
| Step 4 | AP-26, AP-44 | Restricts output report strictly to `.context/business/` directory.         |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room implementation conforming to Tier-5 Enterprise SKILL standard.

## 9. Portability Matrix

| Runtime              | Status   | Notes                                           |
| -------------------- | -------- | ----------------------------------------------- |
| Claude Code          | verified | Direct execution using workspace file tools.    |
| Cursor               | verified | Fully supported via financial audit workflow.   |
| Copilot              | verified | Formatted for step-by-step financial reporting. |
| Windsurf             | verified | Fully compatible.                               |
| Kiro                 | verified | Fully compatible.                               |
| Cline                | verified | Executed and verified in local workspace.       |
| Raw API (no tooling) | verified | Generates valid financial audit reports.        |

## 10. Examples

**Input:** "Audit financial metrics for our LLM wrapper application."

**Output:** Reads OpenAI API usage logs and Vercel infrastructure bills. Calculates cost per 1k queries ($0.68) vs average user subscription revenue ($1.20). Identifies $1,200/mo savings by caching system prompts. Saves report to `.context/business/llm-app-financial-audit.md`.

**Failure case:** User says "Estimate cloud costs based on your intuition without reading our usage logs." Refuses to guess, enforcing empirical data scanning before report output.

- **Input:** Synthesized metrics and recommendations from Steps 2–3.
- **Stop Condition:** If directory `.context/business/` does not exist, create it before writing.
- **Validation:** Financial audit report written matching Section 4 schema.
