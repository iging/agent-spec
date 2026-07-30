---
name: infographic-builder
description: Turns textual content into a single, polished infographic image (1080×1350 px PNG) suitable for social feeds, reports, and educational sharing. Use whenever the user wants an "infographic," a "visual summary," a "carousel slide," a "poster," or asks to make text "shareable" / "visual" as an image they can post or download. Triggers on phrases like "make this an infographic," "turn this into a graphic," "visualize this for LinkedIn/Instagram," "one-pager I can post." Do NOT use for editable slide decks (use pptx), data dashboards, or inline chat diagrams.
license: Complete terms in LICENSE.txt
---

# Infographic Builder

## Overview

Transforms textual content into one finished infographic image: a 1080×1350 px portrait PNG (4:5 ratio — the standard phone-feed format for Instagram and LinkedIn). The output is a single flat image the user can post or download, not an editable document and not an inline chat visual.

**Keywords**: infographic, visual summary, poster, carousel, shareable graphic, one-pager

## What "great" means here

An infographic is not "text with boxes around it." It is a designed argument. Before anything else, decide what makes this one good:

- **One controlling idea.** State the single question the graphic answers or the single claim it makes. If you can't say it in one sentence, the infographic will be a list, not a graphic. Everything on the canvas must serve that idea.
- **Three readable levels.** (1) The 2-second takeaway — the title or hero number a scroller absorbs without stopping. (2) The 10-second skim — section headers and labels. (3) The detail — read only if interested. Bad infographics flatten everything to one level; great ones are legible at all three.
- **A deliberate reading path.** Decide how the eye moves: single column top-to-bottom, numbered steps, a 2-column grid, or hub-and-spoke. The layout guides the eye on purpose — it never just tiles content to fill space.
- **A focal point.** One element the eye lands on first (the title, a large number, a central figure). If everything is the same weight, nothing is.

## Content craft

- **Compress hard.** Headers are noun phrases, not sentences. Body lines stay under ~12 words. Cut every word that doesn't change meaning. The most common failure is too much text — when in doubt, remove a sentence rather than shrink the font.
- **Extract, then sequence.** Pull the key points, then order them by the reading path you chose — don't preserve the source's order by default.
- **Group, don't scatter.** Related points become a labeled section. Aim for 3–6 sections; more than ~8 distinct blocks is too dense for one image.
- **Keep numbers honest.** If you show data, don't distort it: bar charts start at zero, areas scale proportionally, and a single big stat is often clearer than a chart.
- **Lead with the payoff.** Put the takeaway near the top; supporting detail flows below it.

## Visual approach (light touch — principles, not rules)

Use judgment; these are guardrails, not a rigid spec.

- **Color carries meaning, not decoration.** Pick one accent color plus neutrals. Reserve red/green/amber for genuinely negative/positive/cautionary content. A two-color graphic reads cleaner than a rainbow.
- **Establish a type scale.** A clear jump between the hero element, section headers, and body — three or four sizes, used consistently. Don't size text ad hoc.
- **Align to an implied grid** and give content room — generous margins and whitespace make it look designed rather than crammed. Reserve a comfortable margin (≈64–80 px) around the canvas edge.
- **Icons label, they don't fill space.** Use simple line icons next to headers if they aid scanning; skip clip art.
- **Pick a tone that fits the content** — a finance one-pager and a wellness tip sheet should not look the same.

## Output: rendering the PNG (this part must be exact)

The deliverable is a single PNG at **exactly 1080×1350 px**. Do not use the inline visualizer for this — it renders responsive SVG, not a fixed-pixel raster. Instead, design in HTML/CSS at the target size and rasterize with a headless browser. Recommended pipeline:

1. Build a self-contained HTML file with the body sized to exactly 1080×1350 px (set `width` and `height`, `margin:0`, `overflow:hidden`). Lay the design out inside it.
2. Render to PNG with Playwright (Chromium) using a **deviceScaleFactor of 2** so the image is crisp, then confirm the saved file is 1080×1350 (Playwright outputs the CSS size × scale — set the viewport to 1080×1350 and the screenshot will be 2160×2700; downscale to 1080×1350 on save, or set the layout in CSS pixels and accept the 2× file then resize). Verify final dimensions before presenting.

```bash
pip install playwright --break-system-packages && playwright install chromium
```

```python
from playwright.sync_api import sync_playwright
from PIL import Image


with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1080, "height": 1350}, device_scale_factor=2)
    pg.goto("file:///home/claude/infographic.html")
    pg.screenshot(path="/home/claude/raw.png")
    b.close()


img = Image.open("/home/claude/raw.png").resize((1080, 1350), Image.LANCZOS)
img.save("/mnt/user-data/outputs/infographic.png")
print(img.size)  # must print (1080, 1350)
```

If Playwright is unavailable, fall back to building the canvas directly with Pillow at 1080×1350. Either way, **assert the final size is (1080, 1350)** before presenting, and place the file in `/mnt/user-data/outputs/`.

## Before you finish — self-audit

Check every item; fix any failure before presenting:

- Is the controlling idea obvious within 2 seconds of looking?
- Is anything longer than ~12 words? Cut it.
- Does color encode meaning rather than decorate?
- Is there a clear focal point and a single obvious reading path?
- Do the margins breathe, or is the canvas crammed edge to edge?
- Is the saved file exactly 1080×1350 px?

## Constraints

- One image, one idea. If the content needs more, offer a multi-image set (a carousel) rather than cramming.
- Never sacrifice legibility for density — removing content is the right move when it's tight.
- Fonts must be available in the render environment (use a websafe/system stack or embed the font), or text will fall back and break the layout.
