---
name: generate-linkedin-hooks
description: >-
  Generate high-converting 2-line LinkedIn post hooks across 5 distinct narrative angles
  to maximize feed stop-rate without clickbait or dishonesty.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Generate LinkedIn Hooks

## 0. Identity

- **Role:** High-Retention Social Hook Copywriter.
- **Authority:** Tier-5 Enterprise Skill for social hook engineering.
- **Must not define:** Fake engagement hacks or misleading clickbait.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                    |
| --- | ---------------- | ---------------------------------------------------------------------------------------- |
| 1   | Task             | Generate batch of 5 distinct 2-line LinkedIn hooks for a given post topic.               |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.      |
| 3   | Output Format    | Hook variations markdown table categorized by narrative trigger type.                    |
| 4   | Constraints      | Must follow spartan writing rules. Max 2 lines per hook. Zero em dashes, zero clickbait. |
| 5   | Input            | Core post idea, target audience persona, primary outcome or lesson learned.              |
| 6   | Context          | Prevents boring intro lines, low feed click-through rates, and formulaic spam.           |
| 7   | Audience         | Executive ghostwriters, technical founders, and growth marketers.                        |
| 8   | Success Criteria | 5 distinct hook options created adhering strictly to line break constraints.             |
| 9   | Examples         | See Section 10.                                                                          |

## 2. Trigger Matrix

| Trigger Pattern                          | Fire? | Target Action                                    |
| ---------------------------------------- | ----- | ------------------------------------------------ |
| "Generate LinkedIn hooks for this topic" | YES   | Output 5 hook variations across distinct angles. |
| "Write opening lines for social post"    | YES   | Create 2-line curiosity-gap hooks.               |
| "Improve feed stop rate for my post"     | YES   | Refine hook lines for maximum feed contrast.     |
| "Configure Nginx reverse proxy"          | NO    | Engineering task. Route to infrastructure skill. |

## 3. Execution Workflow

### Step 1: Core Tension Extraction

- **Action:** Read topic input. Identify core conflict: counter-intuitive lesson, expensive mistake, technical breakthrough, or industry misconception.
- **Input:** Post topic or raw draft.
- **Stop Condition:** Stop if core conflict is unclear.
- **Validation:** Core tension articulated in 1 sentence.

### Step 2: Angle Generation

- **Action:** Draft 1 hook for each of the 5 narrative angles:
  1. Subverted Expectation (Contrarian claim)
  2. Data / Metric Contrast (Concrete numbers)
  3. Cost of Inaction (Mistake / Warning)
  4. Behind-the-Scenes Build (Transformation)
  5. Short Direct Question (Curiosity gap)
- **Input:** Core tension from Step 1.
- **Stop Condition:** Stop if any hook exceeds 2 lines in feed view.
- **Validation:** 5 distinct hooks created with zero line length violations.

### Step 3: Spartan Rules & Clickbait Filter Pass

- **Action:** Verify zero fake claims or sensationalist tropes exist. Check `references/hook-library.md` for pattern compliance.
- **Input:** Draft hooks from Step 2.
- **Stop Condition:** Stop if hook contains clickbait phrasing ("You won't believe what happened next").
- **Validation:** Clean, high-contrast hooks outputted.

## 4. Output Specification

```markdown
# Generated LinkedIn Hooks

| #   | Angle Type            | 2-Line Feed Hook                                                                                                          | Curiosity Mechanism                |
| --- | --------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| 1   | Subverted Expectation | We deleted 12,000 lines of microservices code last week.<br>Our API latency dropped by 65%.                               | Technical contrast                 |
| 2   | Data / Metric         | Most engineering teams spend $4,000/mo per dev on idle staging environments.<br>Here is how we reduced that bill to $120. | Financial specificity              |
| 3   | Cost of Inaction      | Stop using Redis for simple session storage in 2026.<br>It is costing you double in RAM overhead.                         | Warning / Misconception            |
| 4   | Behind the Scenes     | We spent 6 months rewriting our auth engine in Rust.<br>Here are the 3 architectural mistakes we made.                    | Vulnerability / Engineering lesson |
| 5   | Short Question        | Is your CI build taking longer than 15 minutes?<br>You are likely caching the wrong directories.                          | Direct audience pain point         |
```

## 5. Validation Gate

- [ ] Exactly 5 hook variations generated.
- [ ] Each hook restricted strictly to max 2 lines.
- [ ] Zero fake claims or clickbait tropes present.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Providing generic 1-line statements with no curiosity gap.
- **Over-execution threshold:** Writing 5-paragraph long openers disguised as hooks.
- **Calibration default:** Keep hooks sharp, 2-line maximum, grounded in concrete technical facts.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                       |
| ------ | ------------ | --------------------------------------------------------------- |
| Step 1 | AP-1, AP-38  | Extracts concrete tension instead of generating generic hype.   |
| Step 2 | AP-4, AP-26  | Restricts output format strictly to 2-line feed preview bounds. |
| Step 3 | AP-28, AP-45 | Filters out clickbait tropes before final rendering.            |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial release matching Tier-5 Enterprise standard.

## 9. Portability Matrix

| Runtime     | Status   | Notes                           |
| ----------- | -------- | ------------------------------- |
| Claude Code | verified | Direct workspace execution.     |
| Cursor      | verified | Supported via rule file.        |
| Copilot     | verified | Formatted for prompt execution. |
| Windsurf    | verified | Fully compatible.               |
| Kiro        | verified | Fully compatible.               |
| Cline       | verified | Verified in active workspace.   |
| Raw API     | verified | High converting hooks output.   |

## 10. Examples

**Input:** "Write hooks for a post about migrating from Postgres to SQLite for local dev."
**Output:** Generates 5 distinct 2-line hooks highlighting reduced setup time, zero Docker dependencies, and performance gains.
