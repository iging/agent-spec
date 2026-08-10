---
name: infographic-builder
description: >-
  Transform textual content into a single, polished infographic image
  (1080x1350 px PNG). Execute this skill whenever the user requests an
  infographic, visual summary, carousel slide, poster, or shareable graphic.
  Do NOT execute for editable slide decks, data dashboards, or inline text
  diagrams.
version: 2.0.0
verified-on: [cline]
---

# Infographic Builder

## 0. Identity

- **Role:** Staff Content Architect. Converts dense text into a strict, visually hierarchical 1080x1350 pixel graphic that prioritizes scannability and reading flow over exhaustive detail.
- **Authority:** Owns the infographic render pipeline only. Cannot produce editable slide decks, data dashboards, or inline text diagrams.
- **Must not define:** The user's brand palette, final publishing destination, or text semantics.
- **Normative base:** `shared/css-html-principles.md`; `shared/javascript-principles.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-16 (context dumping), AP-44 (unlocked filesystem), or AP-52 (no circuit breaker).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                                                |
| --- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Render a single flat 1080x1350 PNG infographic from textual content through a deterministic HTML-to-PNG pipeline.                                    |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                                             |
| 3   | Output Format    | One binary PNG file, exactly 1080x1350 pixels, written to the configured output path.                                                                |
| 4   | Constraints      | Never output raw HTML without rendering. Never produce editable documents. Output path and working directory come from configuration, never assumed. |
| 5   | Input            | User text; configured output path and working directory; optional brand palette.                                                                     |
| 6   | Context          | Prevents raw-artifact delivery and locked sandbox assumptions (AP-1, AP-44).                                                                         |
| 7   | Audience         | The requesting user and the infographic viewers.                                                                                                     |
| 8   | Success Criteria | PNG delivered at the configured path; pixel dimensions asserted exactly 1080x1350; text hierarchy preserved.                                         |
| 9   | Examples         | See §10.                                                                                                                                             |

## 2. Trigger Matrix

| Trigger                                                                      | Fire? | Notes                      |
| ---------------------------------------------------------------------------- | ----- | -------------------------- |
| "Infographic / visual summary / carousel slide / poster / shareable graphic" | YES   | Core trigger.              |
| "Turn this [article] into an infographic"                                    | YES   | Core trigger.              |
| Editable slide deck                                                          | NO    | Route to `deck-builder`.   |
| Data dashboard, inline text diagram                                          | NO    | Different artifact owners. |

## 3. Execution Workflow

### Step 1: Resolve Paths

- **Action:** Resolve the working directory and final output path from runtime configuration (e.g., environment variables or explicit user instruction). If neither is configured, use the current working directory and ask the user for a preferred output name.
- **Input:** Runtime configuration; user prompt.
- **Stop Condition:** If no writable location can be resolved, stop and ask for a path before touching the filesystem.
- **Validation:** Working directory and output path are explicit and writable.

### Step 2: Extract Core Argument

- **Action:** Identify the single controlling idea of the user's text. Discard tangential information. Map the text into three hierarchy tiers: Hero Text (Title/Big Number), Section Headers, Body Text (under 12 words per block).
- **Input:** User text.
- **Stop Condition:** If the text has no single controlling idea, stop and ask the user to state the core message before rendering.
- **Validation:** One core argument; every retained block assigned to exactly one tier.

### Step 3: Generate HTML Structure

- **Action:** Write a self-contained HTML file at the resolved working directory setting the canvas to exactly 1080x1350 pixels (`overflow:hidden`, `margin:0`). Use strict inline CSS for layout and typography.
- **Input:** Three-tier text map.
- **Stop Condition:** If the canvas or inline CSS cannot guarantee the exact pixel canvas, stop and fix the scaffold before rendering.
- **Validation:** HTML sets an exact 1080x1350 viewport; zero external asset references.

### Step 4: Render via Headless Browser

- **Action:** Execute a Python script using Playwright to render the HTML file into a PNG at `deviceScaleFactor` 2. Downscale the resulting image to exactly 1080x1350 using Pillow. Write the final PNG to the resolved output path.
- **Input:** HTML file; resolved working directory and output path.
- **Stop Condition:** If Playwright or Pillow is unavailable, stop and report the missing dependency instead of approximating output.
- **Validation:** Render command exits zero; output file exists at the resolved path.

### Step 5: Verify Dimensions

- **Action:** Assert the final file size is exactly 1080x1350 pixels before declaring completion. Deliver the file to the user via the runtime's file-presentation mechanism.
- **Input:** Rendered PNG.
- **Stop Condition:** If the assertion fails, stop and re-render; never deliver a mis-sized image.
- **Validation:** Dimension assertion passes; file presented to the user.

## 4. Output Specification

The output is a binary PNG file delivered at the resolved path. The Python execution script must follow this structure, using the resolved path placeholders:

```python
from playwright.sync_api import sync_playwright
from PIL import Image

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1080, "height": 1350}, device_scale_factor=2)
    pg.goto(f"file:///{WORKING_DIR}/infographic.html")
    pg.screenshot(path=f"{WORKING_DIR}/raw.png")
    b.close()

img = Image.open(f"{WORKING_DIR}/raw.png").resize((1080, 1350), Image.LANCZOS)
img.save(OUTPUT_PATH)
```

## 5. Validation Gate

- [ ] Working directory and output path resolved and writable.
- [ ] One core argument extracted; every retained block tiered.
- [ ] HTML canvas exactly 1080x1350; zero external assets.
- [ ] Render executed; final PNG written to the resolved output path.
- [ ] Dimension assertion passed exactly 1080x1350; file presented.

## 6. Anti-Triggers and Calibration

- **Under-execution:** Outputting raw HTML code instead of executing the render pipeline.
- **Over-execution:** Cramming 50 sentences onto the canvas instead of deleting non-critical text.
- **Calibration default:** Err toward aggressive text deletion to preserve whitespace and legibility.

## 7. Anti-Pattern Compliance

| Step        | Prevents AP                      | Mechanism                                                  |
| ----------- | -------------------------------- | ---------------------------------------------------------- |
| 1 (Paths)   | AP-44 (unlocked filesystem)      | Writable path resolved before any write.                   |
| 2 (Extract) | AP-1, AP-16 (vague/context dump) | Single controlling idea forced; tangential text discarded. |
| 3 (HTML)    | AP-3 (no success criteria)       | Exact canvas constraint is deterministic.                  |
| 4 (Render)  | AP-52 (no circuit breaker)       | Missing dependency halts with a report.                    |
| 5 (Verify)  | AP-42 (no target state)          | Pixel assertion gates delivery.                            |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Replaced hardcoded sandbox paths (`/mnt/user-data/outputs/`, `/home/user/`) with resolved configuration placeholders. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

## 9. Portability Matrix

| Runtime              | Status   | Notes                          |
| -------------------- | -------- | ------------------------------ |
| Claude Code          | untested |                                |
| Cursor               | untested |                                |
| Copilot              | untested |                                |
| Windsurf             | untested |                                |
| Kiro                 | untested |                                |
| Cline                | verified | Executed in current workspace. |
| Raw API (no tooling) | untested |                                |

## 10. Examples

**Input:** "Turn this blog post into an infographic for LinkedIn."

**Output:** Paths resolved from configuration, core argument extracted into three tiers, HTML scaffold set to 1080x1350, headless render executed at device scale 2, downscaled exactly to 1080x1350, dimension-asserted, and the PNG delivered at the resolved output path.

**Failure case:** The user asks for the raw HTML "so I can edit it myself." Refuse: Step 4 requires executing the render, never delivering raw HTML per §6 under-execution.
