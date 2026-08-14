---
name: benchmark-model-performance
description: >-
  Evaluate model execution latencies, resource consumption, token usage, and inference
  quality across comparative benchmark runs. Execute this skill whenever the user says
  "benchmark model performance", "compare model latencies", "evaluate token usage",
  or "run model benchmark suite". Do NOT execute for standard application unit testing.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Benchmark Model Performance

## 0. Identity

- **Role:** Machine Learning Performance Engineer. Evaluates model execution latencies, resource consumption, token usage, and inference quality across comparative model runs.
- **Authority:** Tier-5 Enterprise Skill. Governs model performance measurement, token usage tracking, and latency benchmarking.
- **Must not define:** Application UI layout or business logic specifications.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                  |
| --- | ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Run comparative benchmarks across model variants to measure latency, throughput, token efficiency, and quality scores. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                                    |
| 3   | Output Format    | Performance benchmark report saved to `.context/benchmarks/[slug]-benchmark-report.md`.                                |
| 4   | Constraints      | Must run a minimum of 3 iterations per test prompt. Must calculate statistical variance (p50, p95, p99).               |
| 5   | Input            | Target model identifiers, benchmark prompt dataset, concurrency settings, and evaluation metrics.                      |
| 6   | Context          | Prevents silent performance regressions, cost overruns, and high-latency LLM integration choices.                      |
| 7   | Audience         | Machine learning engineers, system performance leads, and infrastructure teams.                                        |
| 8   | Success Criteria | Benchmark report created detailing latency percentiles, throughput (tokens/sec), total token cost, and error rates.    |
| 9   | Examples         | See Section 10.                                                                                                        |

## 2. Trigger Matrix

| Trigger                                    | Fire? | Notes                                       |
| ------------------------------------------ | ----- | ------------------------------------------- |
| "Benchmark model performance"              | YES   | Primary trigger for model benchmarking.     |
| "Compare latencies between Claude and GPT" | YES   | Comparative benchmark request.              |
| "Measure token throughput for model X"     | YES   | Throughput measurement request.             |
| "Refactor CSS stylesheet"                  | NO    | Frontend styling task.                      |
| "Fix database connection leak"             | NO    | Backend debugging task. Route to debugging. |

## 3. Execution Workflow

### Step 1: Benchmark Suite Configuration & Dataset Load

- **Action:** Read the target model configuration, prompt dataset, and evaluation parameters. Confirm model API keys or endpoints are active.
- **Input:** Benchmark configuration file or prompt dataset paths.
- **Stop Condition:** If model endpoints are unreachable or invalid, stop and notify you to provide active credentials.
- **Validation:** Test environment and target model endpoints confirmed active.

### Step 2: Execution and Telemetry Capture

- **Action:** Execute the benchmark prompt suite against target models across multiple runs (minimum 3 warm-up runs, minimum 10 sample runs per prompt). Record time-to-first-token (TTFT), inter-token latency, total latency, input tokens, and output tokens.
- **Input:** Benchmark dataset and configured model endpoints from Step 1.
- **Stop Condition:** If error rate exceeds 5%, halt execution and report endpoint instability.
- **Validation:** Raw telemetry captured for all sample runs.

### Step 3: Statistical Synthesis & Percentile Calculation

- **Action:** Process captured telemetry. Compute median (p50), 95th percentile (p95), 99th percentile (p99) latencies, tokens per second, and estimated financial cost per 1,000 queries.
- **Input:** Telemetry data from Step 2.
- **Stop Condition:** Exclude outlier runs that timed out due to network failures from percentile calculations while logging total error count.
- **Validation:** Complete statistical summary table generated.

### Step 4: Benchmark Report Generation

- **Action:** Save the benchmark performance report to `.context/benchmarks/[slug]-benchmark-report.md`.
- **Input:** Statistical summary from Step 3.
- **Stop Condition:** If directory `.context/benchmarks/` does not exist, create it before saving.
- **Validation:** Report document saved matching Section 4 schema.

## 4. Output Specification

```markdown
# Model Performance Benchmark Report: [Suite / Feature Name]

- **Date:** [YYYY-MM-DD]
- **Engineer:** [Machine Learning Performance Engineer]
- **Report Path:** `.context/benchmarks/[slug]-benchmark-report.md`

## 1. Benchmark Environment Summary

- **Sample Size:** 10 runs per prompt
- **Prompt Count:** [N prompts]
- **Target Models:** [Model A, Model B]

## 2. Comparative Latency & Throughput Matrix

| Model   | TTFT (p50) | TTFT (p95) | Total Latency (p50) | Total Latency (p95) | Tokens/Sec | Error Rate |
| ------- | ---------- | ---------- | ------------------- | ------------------- | ---------- | ---------- |
| Model A | 120 ms     | 240 ms     | 1.10 s              | 1.85 s              | 85 t/s     | 0.0%       |
| Model B | 250 ms     | 510 ms     | 2.40 s              | 3.90 s              | 42 t/s     | 1.0%       |

## 3. Financial & Resource Cost Analysis

- **Model A Estimated Cost / 1k Invocations:** $0.45
- **Model B Estimated Cost / 1k Invocations:** $1.20

## 4. Performance Recommendation

- **Recommended Choice:** [Model A]
- **Justification:** Model A delivers 2x higher token throughput and lower p95 latency at 62% lower cost.
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Model endpoint connectivity verified before starting full suite.
- [ ] Minimum 10 iterations per prompt executed for statistical significance.
- [ ] Percentiles (p50, p95, p99) and token throughput calculated accurately.
- [ ] Benchmark report saved to `.context/benchmarks/[slug]-benchmark-report.md`.
- [ ] Zero banned words or em dashes present in report document.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Reporting single-run latency numbers without computing percentiles or statistical variance.
- **Over-execution threshold:** Attempting to retrain model weights or rewrite backend inference code during a benchmark run.
- **Calibration default:** Focus strictly on accurate telemetry collection and statistical presentation.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                              |
| ------ | ------------ | ---------------------------------------------------------------------- |
| Step 1 | AP-1, AP-28  | Verifies active endpoints before starting batch runs.                  |
| Step 2 | AP-11        | Mandates multi-run sampling (10 runs) to eliminate noise.              |
| Step 3 | AP-38, AP-40 | Computes exact percentile statistics rather than subjective estimates. |
| Step 4 | AP-26, AP-44 | Restricts output report strictly to `.context/benchmarks/` directory.  |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room implementation conforming to Tier-5 Enterprise SKILL standard.

## 9. Portability Matrix

| Runtime              | Status   | Notes                                                     |
| -------------------- | -------- | --------------------------------------------------------- |
| Claude Code          | verified | Direct execution using command-line benchmark runner.     |
| Cursor               | verified | Fully supported via workspace benchmark script execution. |
| Copilot              | verified | Formatted for step-by-step performance analysis.          |
| Windsurf             | verified | Fully compatible.                                         |
| Kiro                 | verified | Fully compatible.                                         |
| Cline                | verified | Executed and verified in local workspace environment.     |
| Raw API (no tooling) | verified | Generates valid benchmark report structures.              |

## 10. Examples

**Input:** "Benchmark model performance comparing Claude Sonnet and GPT-4o on our customer support prompt set."

**Output:** Runs 10 samples per prompt against both APIs. Measures TTFT and throughput. Calculates p50 and p95 latencies. Calculates estimated cost. Saves report to `.context/benchmarks/support-prompts-sonnet-vs-4o.md`.

**Failure case:** User says "Estimate which model is faster without running any benchmark requests." Refuses to guess without data, enforcing execution of benchmark suite.
