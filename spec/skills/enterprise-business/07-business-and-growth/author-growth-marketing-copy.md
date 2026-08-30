---
name: author-growth-marketing-copy
description: >-
  Draft technical product release announcements, developer landing page copy, feature launch posts,
  and value proposition messaging without hype or buzzwords. Execute this skill whenever the user
  says "write feature launch post", "draft landing page copy", "author product release announcement",
  or "write developer marketing copy". Do NOT execute for code implementation tasks.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Author Growth Marketing Copy

## 0. Identity

- **Role:** Lead Technical Growth & Product Marketing Copywriter. Drafts technical product release announcements, developer landing page copy, feature launch posts, and value proposition messaging.
- **Authority:** Tier-5 Enterprise Skill. Governs technical product copy, feature announcement posts, value proposition framing, and developer-facing launch messaging.
- **Must not define:** Source code implementations or false technical capabilities.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                               |
| --- | ---------------- | --------------------------------------------------------------------------------------------------- |
| 1   | Task             | Draft developer-facing product launch copy, landing page headlines, and feature announcements.      |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                 |
| 3   | Output Format    | Growth marketing copy document saved to `.context/marketing/[slug]-launch-copy.md`.                 |
| 4   | Constraints      | Must follow spartan writing rules. Zero hype, zero banned words, zero em dashes, zero fluff.        |
| 5   | Input            | Feature specification, technical architecture highlights, target developer persona, launch channel. |
| 6   | Context          | Prevents marketing buzzword overload, dishonest claims, and low-converting launch copy.             |
| 7   | Audience         | Developers, technical decision makers, engineering leads, and adopters.                             |
| 8   | Success Criteria | Technical copy delivered highlighting concrete features, code examples, and clear call-to-action.   |
| 9   | Examples         | See Section 10.                                                                                     |

## 2. Trigger Matrix

| Trigger                                      | Fire? | Notes                                      |
| -------------------------------------------- | ----- | ------------------------------------------ |
| "Write feature launch announcement for v2.0" | YES   | Primary trigger for launch copy authoring. |
| "Draft developer landing page copy"          | YES   | Landing page copy request.                 |
| "Author release notes blog post"             | YES   | Product announcement request.              |
| "Fix bug in auth middleware"                 | NO    | Engineering task. Route to debugging.      |
| "Deploy to Kubernetes cluster"               | NO    | Ops task. Route to release engineering.    |

## 3. Execution Workflow

### Step 1: Feature & Developer Persona Mapping

- **Action:** Inspect the feature specification or release summary. Identify the target developer persona, primary technical pain point solved, key architecture highlights, and concrete developer benefits.
- **Input:** Target spec file (`.context/specs/*`) or release summary (`.context/releases/*`).
- **Stop Condition:** Limit feature inspection to assigned release or spec files. Maximum 5 context files.
- **Validation:** Developer pain point, technical solution, and target persona locked.

### Step 2: Value Proposition & Code Example Framing

- **Action:** Draft core value proposition headline and sub-headline. Frame the technical capability using concrete code snippets or API usage examples.
- **Input:** Target persona and feature highlights from Step 1.
- **Stop Condition:** Reject vague adjectives (e.g., promotional hype words). Replace with concrete technical metrics (e.g., "reduces query latency from 200ms to 12ms").
- **Validation:** Value proposition framed with concrete code example.

### Step 3: Copy Generation & Rule Compliance Check

- **Action:** Write the launch copy payload including headline, sub-headline, technical highlights, code snippet, and clear call-to-action (CTA). Apply strict spartan prose filters.
- **Input:** Framed value proposition from Step 2.
- **Stop Condition:** Enforce writing constraints: zero banned marketing terms, zero em dashes, zero semicolons in prose.
- **Validation:** Copy generated matching Section 4 schema with zero banned word violations.

### Step 4: Marketing Copy Artifact Delivery

- **Action:** Save the completed launch copy to `.context/marketing/[slug]-launch-copy.md`.
- **Input:** Verified copy payload from Step 3.
- **Stop Condition:** If directory `.context/marketing/` does not exist, create it before saving.
- **Validation:** Launch copy document saved to target path.

## 4. Output Specification

````markdown
# Developer Product Launch Copy: [Feature / Product Name]

- **Date:** [YYYY-MM-DD]
- **Copywriter:** [Lead Technical Growth & Product Marketing Copywriter]
- **Target Audience:** Backend Engineers | Frontend Developers | DevOps
- **Copy Path:** `.context/marketing/[slug]-launch-copy.md`

## 1. Landing Page Headline & Sub-Headline

### Headline

Run Sub-Millisecond Database Queries Across Distributed Regions

### Sub-Headline

Connect your TypeScript application to geographically distributed read replicas with zero configuration changes.

## 2. Code-First Technical Feature Highlights

### 1. Automatic Connection Pooling

- **Problem:** Database connection limits choked during traffic spikes.
- **Solution:** Integrated connection pool manager maintains steady 100-connection limit.

```typescript
import { connectPool } from "@company/db";
const db = await connectPool({ maxConnections: 100 });
```
````

### 2. Built-in Prepared Statement Caching

- **Problem:** Repeated query parsing added 15ms overhead per request.
- **Solution:** Automatic statement cache reduces query overhead to under 1ms.

## 3. Clear Call-to-Action (CTA)

- **Primary CTA:** Install package via `npm install @company/db`
- **Secondary CTA:** Read the 5-minute integration guide at `https://docs.company.com/quickstart`

## 4. Banned Words Compliance Checklist

- [x] Zero banned words (`craft`, `delve`, `innovative`, `skyrocket`, `utilize`).
- [x] Zero em dashes in body text.
- [x] Zero unverified marketing claims.

```

## 5. Validation Gate

Run before declaring completion:

- [ ] Target developer persona and technical pain points mapped.
- [ ] Concrete code snippets included alongside technical feature claims.
- [ ] Strict spartan writing rules enforced (zero banned words, zero em dashes).
- [ ] Copy saved to `.context/marketing/[slug]-launch-copy.md`.
- [ ] Zero unverified hype or marketing buzzwords present.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Writing marketing copy without technical specifics, code snippets, or benchmark numbers.
- **Over-execution threshold:** Overpromising unbuilt product capabilities or inventing false technical benchmarks.
- **Calibration default:** Keep copy concise, technical, code-first, and spartan.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| Step 1 | AP-1, AP-16 | Caps context scan to 5 spec or release files. |
| Step 2 | AP-38, AP-40 | Requires concrete code snippets and benchmark numbers instead of adjectives. |
| Step 3 | AP-42 | Enforces spartan prose rules and filters banned words automatically. |
| Step 4 | AP-26, AP-44 | Restricts output report strictly to `.context/marketing/` directory. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room implementation conforming to Tier-5 Enterprise SKILL standard.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Direct execution using standard workspace tools. |
| Cursor | verified | Fully supported via copywriter workflow. |
| Copilot | verified | Formatted for developer marketing copy generation. |
| Windsurf | verified | Fully compatible. |
| Kiro | verified | Fully compatible. |
| Cline | verified | Executed and verified in local workspace. |
| Raw API (no tooling) | verified | Generates valid developer launch copy. |

## 10. Examples

**Input:** "Author product launch copy for our new CLI tool that automates database schema migrations."

**Output:** Reads CLI feature spec. Drafts landing page headline "Automate PostgreSQL Migrations in 1 Command". Includes code example showing `npx migrate-cli up`. Eliminates buzzwords. Saves copy to `.context/marketing/cli-migration-tool-launch-copy.md`.

**Failure case:** User says "Write launch copy using exaggerated marketing hype words." Refuses hype words, replacing with spartan technical metrics.

```
