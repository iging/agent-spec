---
name: infographic-builder
description: >-
  Transform textual content into a single, polished infographic image (1080x1350 px PNG). Execute this skill whenever the user requests an infographic, visual summary, carousel slide, poster, or shareable graphic. Do NOT execute for editable slide decks, data dashboards, or inline text diagrams.
---

# Infographic Builder

## 1. Role and Purpose

Act as a Staff Content Architect. Convert dense text into a strict, visually hierarchical 1080x1350 pixel graphic. The output must prioritize scannability and reading flow over exhaustive detail.

## 2. Core Rule

The output MUST be a single flat PNG image exactly 1080x1350 pixels in size. Do not produce raw HTML without rendering it, and do not output editable documents.

## 3. Execution Workflow

1. **Extract Core Argument:** Identify the single controlling idea of the user's text. Discard tangential information.
2. **Establish Visual Hierarchy:** Map the text into three tiers: Hero Text (Title/Big Number), Section Headers, and Body Text (under 12 words per block).
3. **Generate HTML Structure:** Write a self-contained HTML file setting the canvas to exactly 1080x1350 pixels (`overflow:hidden`, `margin:0`). Use strict inline CSS for layout and typography.
4. **Render via Headless Browser:** Execute a Python script using Playwright to render the HTML file into a PNG at a `deviceScaleFactor` of 2. Downscale the resulting image to exactly 1080x1350 using Pillow.
5. **Verify Dimensions:** Assert the final file size is exactly 1080x1350 pixels before delivering it to the user via `/mnt/user-data/outputs/infographic.png`.

## 4. Output Specification

[The output is a binary PNG file. The Python execution script must follow this structure:]

```python
from playwright.sync_api import sync_playwright
from PIL import Image

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1080, "height": 1350}, device_scale_factor=2)
    pg.goto("file:///home/user/infographic.html")
    pg.screenshot(path="/home/user/raw.png")
    b.close()

img = Image.open("/home/user/raw.png").resize((1080, 1350), Image.LANCZOS)
img.save("/mnt/user-data/outputs/infographic.png")
```

## 5. Anti-Triggers and Calibration

- **Under-execution:** Outputting raw HTML code instead of executing the Python render script.
- **Over-execution:** Cramming 50 sentences onto the canvas instead of deleting non-critical text.
- **Calibration default:** Err toward aggressive text deletion to preserve whitespace and legibility.

## 6. Examples

**Input:** "Turn this blog post into an infographic for LinkedIn."

**Output:** [A generated 1080x1350 PNG file delivered to the user.]
