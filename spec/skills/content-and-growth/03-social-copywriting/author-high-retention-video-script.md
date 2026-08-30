---
name: author-high-retention-video-script
description: >-
  Draft high-retention short-form video scripts (Reels, Shorts, TikTok) featuring pattern interrupts,
  visual cue directions, rapid pacing, and zero filler word openers.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Author High Retention Video Script

## 0. Identity

- **Role:** Short-Form Video Scriptwriter & Pacing Specialist.
- **Authority:** Tier-5 Enterprise Skill for video script authoring.
- **Must not define:** Direct video editing or automated rendering pipelines.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|---|---|
| 1 | Task | Draft 45-60 second video script with visual cues, line timing, and pattern interrupts. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | Two-column script document (Spoken Audio \| Visual Direction) saved to `.context/scripts/`. |
| 4 | Constraints | Must follow spartan writing rules. Zero em dashes, zero intro greetings ("Hey guys"). |
| 5 | Input | Core technical lesson, counter-intuitive insight, or product demonstration. |
| 6 | Context | Prevents viewer drop-off in first 3 seconds and slow video pacing. |
| 7 | Audience | Short-form video creators, technical founders, and educators. |
| 8 | Success Criteria | Complete 60-second script drafted with explicit visual directions per line. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger Pattern | Fire? | Target Action |
|---|---|---|
| "Draft short video script about technical topic" | YES | Write 60s script with visual cues and timing. |
| "Write high retention TikTok script" | YES | Format two-column audio/visual script. |
| "Create Reel script for product feature" | YES | Structure pattern interrupt script. |
| "Deploy Terraform infrastructure" | NO | Engineering task. Route to cloud skill. |

## 3. Execution Workflow

### Step 1: Hook & Pattern Interrupt Mapping
- **Action:** Read topic. Draft immediate 0-3 second spoken hook. Eliminate greetings ("Hey everyone").
- **Input:** Video topic input.
- **Stop Condition:** Stop if spoken hook takes longer than 3 seconds to deliver.
- **Validation:** Hook states a bold claim or shows visual contrast immediately.

### Step 2: Two-Column Script Drafting
- **Action:** Write line-by-line spoken dialogue (max 140 words for 60 seconds). Pair each line with explicit visual direction (b-roll, screen capture, text overlay).
- **Input:** Spoken hook from Step 1.
- **Stop Condition:** Stop if spoken word count exceeds 150 words.
- **Validation:** Every audio line has a corresponding visual action cue.

### Step 3: Retention Polish Pass
- **Action:** Check for visual change cues every 3-5 seconds. Cut passive verbs and filler transition words.
- **Input:** Draft script from Step 2.
- **Stop Condition:** Stop if script contains any em dashes or banned words.
- **Validation:** Script saved to `.context/scripts/[slug]-script.md`.

## 4. Output Specification

```markdown
# Short Video Script: PostgreSQL Connection Caching

**Total Duration:** 45 seconds | **Target Word Count:** 115 words

| Spoken Audio (Spoken Fast & Clear) | Visual Direction / Text Overlay |
|---|---|
| **(0-3s)** Stop running database queries inside your main request loop. | **[VISUAL]** Creator slams laptop closed. |
| **(3-10s)** Every request opens a TCP connection to Postgres, adding 20ms latency. | **[VISUAL]** Screen recording showing DevTools red bar. |
| **(10-22s)** Here is the 3-line fix: use a connection pool singleton. | **[VISUAL]** Fast code zoom onto `pg.Pool({ max: 20 })`. |
| **(22-35s)** Now 100 requests share 5 persistent database channels. | **[VISUAL]** Motion graphic showing 100 requests into 5 pipes. |
| **(35-45s)** Check your database setup today. Full guide in description. | **[VISUAL]** Creator points to link overlay. |
```

## 5. Validation Gate

- [ ] Spoken word count capped under 150 words for 60-second timing.
- [ ] Visual direction cue included for every spoken line segment.
- [ ] Zero intro greetings ("Hey guys") present in hook.
- [ ] Script saved strictly under `.context/scripts/` path.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Providing raw text without visual direction cues or timing bounds.
- **Over-execution threshold:** Writing complex film screenplays for simple 30-second social videos.
- **Calibration default:** Keep pacing fast, visual directions explicit, and word count tight.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|---|---|---|
| Step 1 | AP-1, AP-38 | Cuts opening fluff and focuses on core technical contrast. |
| Step 2 | AP-4, AP-26 | Enforces hard word count limits corresponding to video duration. |
| Step 3 | AP-26, AP-44 | Output saved strictly to `.context/scripts/` directory. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial release matching Tier-5 Enterprise standard.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---|---|---|
| Claude Code | verified | Direct workspace execution. |
| Cursor | verified | Supported via rule file. |
| Copilot | verified | Formatted for prompt execution. |
| Windsurf | verified | Fully compatible. |
| Kiro | verified | Fully compatible. |
| Cline | verified | Verified in active workspace. |
| Raw API | verified | Accurate video script generation. |

## 10. Examples

**Input:** "Draft a 45-second script explaining why Rust is memory safe."
**Output:** Drafts 110-word two-column script featuring compiler error screen zoom cues. Saves to `.context/scripts/rust-memory-safety-script.md`.
