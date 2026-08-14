---
name: synthesize-research-findings
description: >-
  Gather research data, analyze technology ecosystems, synthesize multi-source technical
  findings, and produce structured research reports. Execute this skill whenever the user says
  "synthesize research", "analyze technology ecosystem", "conduct competitive tech research",
  or "write research summary". Do NOT execute for code implementation tasks.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Synthesize Research Findings

## 0. Identity

- **Role:** Principal Technology Researcher & Knowledge Analyst. Gathers research data, analyzes technology ecosystems, synthesizes multi-source technical findings, and produces structured research reports.
- **Authority:** Tier-5 Enterprise Skill. Governs technical research synthesis, technology ecosystem evaluation, source auditing, and research report generation.
- **Must not define:** Direct production source code changes or unverified marketing fluff.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                       |
| --- | ---------------- | ----------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Synthesize data across multiple source files or web references into a structured technical research report. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                         |
| 3   | Output Format    | Research synthesis document saved to `.context/research/[slug]-research-synthesis.md`.                      |
| 4   | Constraints      | Must verify facts against primary sources. Must explicitly document conflicting data points.                |
| 5   | Input            | Research prompts, target technology topic, local workspace files, or external URLs.                         |
| 6   | Context          | Prevents uninformed technology stack decisions, unverified assumptions, and redundant research cycles.      |
| 7   | Audience         | Systems architects, CTOs, engineering leads, and technology evaluators.                                     |
| 8   | Success Criteria | Research synthesis report produced detailing comparative matrix, trade-offs, and clear recommendations.     |
| 9   | Examples         | See Section 10.                                                                                             |

## 2. Trigger Matrix

| Trigger                                            | Fire? | Notes                                                    |
| -------------------------------------------------- | ----- | -------------------------------------------------------- |
| "Synthesize research findings on vector databases" | YES   | Primary trigger for research synthesis.                  |
| "Analyze technology ecosystem for RPC frameworks"  | YES   | Technology ecosystem analysis request.                   |
| "Compare performance of gRPC vs GraphQL"           | YES   | Comparative technology evaluation request.               |
| "Implement GraphQL resolver code"                  | NO    | Feature coding. Route to `write-code-implementation`.    |
| "Fix bug in payment database query"                | NO    | Debugging task. Route to `execute-root-cause-debugging`. |

## 3. Execution Workflow

### Step 1: Research Boundary Definition & Source Collection

- **Action:** Define explicit research boundaries, target topics, and key technical evaluation dimensions (e.g., latency, licensing, ecosystem maturity, developer experience). Read local research data files or fetch external references.
- **Input:** Target research topic and source material paths.
- **Stop Condition:** Limit primary source reading to maximum 15 files or documents.
- **Validation:** Source material cataloged with explicit evaluation dimensions established.

### Step 2: Source Auditing & Fact-Checker Verification

- **Action:** Audit extracted findings across primary sources. Verify claims, identify data discrepancies, and highlight conflicting benchmarks or unverified claims.
- **Input:** Source catalog from Step 1.
- **Stop Condition:** Flag unverified marketing claims as unconfirmed hypotheses. Do not present unverified claims as factual guarantees.
- **Validation:** Audited facts and conflicting data points categorized.

### Step 3: Comparative Synthesis & Matrix Formulation

- **Action:** Synthesize findings into a comparative matrix contrasting candidates across technical dimensions, operational tradeoffs, and cost models.
- **Input:** Audited facts from Step 2.
- **Stop Condition:** Ensure every comparison candidate has explicit pro/con analysis and risk profile.
- **Validation:** Comparative analysis matrix completed.

### Step 4: Research Synthesis Document Delivery

- **Action:** Write the consolidated research synthesis report to `.context/research/[slug]-research-synthesis.md`.
- **Input:** Synthesized findings and comparative matrix from Steps 2–3.
- **Stop Condition:** If directory `.context/research/` does not exist, create it before writing.
- **Validation:** Report saved to disk matching Section 4 schema.

## 4. Output Specification

```markdown
# Research Synthesis Report: [Technology / Subject Name]

- **Date:** [YYYY-MM-DD]
- **Researcher:** [Principal Technology Researcher & Knowledge Analyst]
- **Report Path:** `.context/research/[slug]-research-synthesis.md`

## 1. Executive Research Summary

[High level synthesis of key findings and core recommendations]

## 2. Comparative Evaluation Matrix

| Metric / Dimension     | Option A (e.g., PostgreSQL) | Option B (e.g., MongoDB) | Option C (e.g., DynamoDB) |
| ---------------------- | --------------------------- | ------------------------ | ------------------------- |
| Data Model             | Relational / ACID           | Document / JSON          | Key-Value / NoSQL         |
| Latency (p95)          | 12 ms                       | 8 ms                     | 4 ms                      |
| License                | PostgreSQL License (Open)   | SSPL (Source Available)  | Proprietary (AWS Managed) |
| Operational Complexity | Low / Standard              | Medium                   | Very Low (Serverless)     |

## 3. Key Findings & Strategic Tradeoffs

### 3.1 Primary Tradeoff Analysis

- **Option A:** Best for complex joins and relational consistency, but requires manual scaling setup.
- **Option B:** High developer velocity for flexible schemas, but potential SSPL licensing restrictions.

### 3.2 Unverified Claims & Discrepancies

- _Claim X:_ Vendor benchmarks report 10x throughput advantage.
- _Audit Finding:_ Independent benchmarks demonstrate advantage shrinks to 1.2x under real-world write contention.

## 4. Final Strategic Recommendation

- **Recommended Selection:** [Option A]
- **Justification:** Aligns with open-source compliance policies and provides superior long-term data consistency guarantees.
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Research scope and evaluation dimensions defined upfront.
- [ ] Claims audited against primary sources with unverified claims flagged.
- [ ] Comparative matrix constructed contrasting all evaluated options.
- [ ] Report saved to `.context/research/[slug]-research-synthesis.md`.
- [ ] Zero banned words or em dashes present in output text.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Summarizing a single blog post without auditing claims or building a comparative analysis matrix.
- **Over-execution threshold:** Modifying repository source code or implementing prototype code during a research synthesis task.
- **Calibration default:** Focus strictly on objective data synthesis, empirical benchmarks, and clear tradeoff analysis.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                           |
| ------ | ------------ | ------------------------------------------------------------------- |
| Step 1 | AP-1, AP-16  | Caps context reading scan to 15 key research documents.             |
| Step 2 | AP-38, AP-40 | Flags unverified marketing claims and validates empirical sources.  |
| Step 3 | AP-3, AP-42  | Enforces comparative matrix formatting across all candidates.       |
| Step 4 | AP-26, AP-44 | Restricts output report strictly to `.context/research/` directory. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room release in Tier-5 Enterprise SKILL standard format.

## 9. Portability Matrix

| Runtime              | Status   | Notes                                             |
| -------------------- | -------- | ------------------------------------------------- |
| Claude Code          | verified | Direct execution using workspace search tools.    |
| Cursor               | verified | Fully supported via workspace research synthesis. |
| Copilot              | verified | Formatted for step-by-step research reporting.    |
| Windsurf             | verified | Fully compatible.                                 |
| Kiro                 | verified | Fully compatible.                                 |
| Cline                | verified | Executed and verified in local workspace.         |
| Raw API (no tooling) | verified | Generates valid research synthesis reports.       |

## 10. Examples

**Input:** "Synthesize research findings comparing Redis vs Memcached for session caching."

**Output:** Scans technical documentation and performance benchmarks. Builds comparative matrix evaluating latency, memory overhead, persistence options, and cluster topology. Saves report to `.context/research/redis-vs-memcached-session-cache.md`.

**Failure case:** User says "Copy vendor marketing copy directly into the research report without checking facts." Refuses request, enforcing source auditing and empirical verification rules.
