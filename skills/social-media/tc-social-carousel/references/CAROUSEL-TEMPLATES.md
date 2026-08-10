---
name: tc-social-carousel
description: Build Instagram carousel slides for the configured brand using the fixed six-template system (cover/hook, list, quote, chart, photo, CTA) in the brand's visual identity — warm neutral backgrounds, single accent hue, display + label typefaces, lowercase-first anti-guru voice, 1080x1350 artboards. Use this skill whenever the user asks for a brand carousel, Instagram carousel, IG slides, swipe post, carousel template, or any social slide/card design — even if they only mention one slide, a hook, or "make this into a carousel." Also use it when adjusting or iterating on previously generated carousel designs.
---

# Social Carousel Templates

A reusable template SET for branded Instagram carousels. Six fixed slide templates that read as one cohesive carousel. The goal is a quiet, editorial, paper-and-ink feel — the opposite of loud "guru" social graphics.

> **Brand slots.** This skill ships with a default brand identity (warm paper + burgundy accent, display serif + hand-mono labels, keyword-comment CTA). Wherever `[brand]`, `[display typeface]`, `[label typeface]`, `[accent hue]`, or `[keyword]` appear, substitute the adopter's configured values. The defaults below are fully functional as shipped.

If reference card images exist in this skill's `assets/` folder, view them first and treat them as the source of truth for layout, spacing, and feel. The rules below reproduce their anatomy; when the references and these words seem to disagree, the references win.

## Non-negotiable brand rules

Apply these to every slide, no exceptions, and do not "improve" on them:

**Palette.** Warm neutrals only for surfaces — default: `#EDE6DE` (paper/page background) and `#F7F6F2` (card surface). A single accent hue is the ONLY non-neutral color — default: burgundy `#8B1A1A` — used sparingly for emphasis words, chart strokes, the CTA keyword, small marks. Ink/body text is a soft near-black warm charcoal (e.g. `#2B2624`), never pure `#000`. No other hues anywhere: no gradients, no blues, no greens, no drop-shadow color casts.

**Type.** Three roles, never swapped. The typefaces are the adopter's brand slots (`[display typeface]` and `[label typeface]`); defaults are a chunky display serif for display/headlines and a hand-drawn-feel monospace for labels:

- Display/headlines: **[display typeface]**
- Eyebrows and hand-mono labels (page indicators, tags like "question #4"): **[label typeface]**
- Body copy: a quiet serif

If the configured faces are unavailable in the rendering environment, stand in with the closest available faces (a chunky display serif for the display role; a monospace with a hand-drawn feel for the label role) and tell the user a substitution was made — never silently swap to a generic sans.

**Voice.** Lowercase-first: sentences start lowercase; capitalize proper nouns only. No exclamation marks, ever. Plain-spoken, anti-guru — no hype words ("insane," "game-changer"), no emoji, no ALL-CAPS shouting except the single keyword on the CTA slide.

**Format.** 1080 × 1350 px (4:5 vertical). Each slide is its own artboard/canvas, clearly labelled (e.g. "01 — cover", "02 — list").

## Shared anatomy (every slide)

Replicate this exact structure so all templates read as one carousel:

1. **Warm paper background** filling the artboard in the paper hue, with subtle paper texture (fine noise/grain, very low opacity — texture should be felt, not seen).
2. **Inset floating card** in the card surface hue sitting on the paper: inset roughly 48–64 px on all sides, soft rounded corners (~24–32 px radius), a subtle thin border (~1 px, low-opacity charcoal) and at most a whisper of shadow.
3. **Eyebrow label** top-left inside the card, in the label typeface, small (~28–34 px), letterspaced, e.g. `question #4` or `[brand] · carousels`. Optionally underlined by a fine hairline.
4. **Fine hairline dividers** (1 px, low-opacity charcoal) to separate zones — used sparingly.
5. **Generous whitespace.** When in doubt, remove an element rather than shrink the margins. Body text stays small (~30–36 px) relative to the canvas.
6. **Hand-drawn swipe arrow** bottom-right on every slide EXCEPT the final CTA slide: a fine-line, slightly wobbly right-pointing arrow (single-weight stroke, imperfect curve — drawn, not geometric).
7. **Page indicator**, subtle, in the label typeface — e.g. `03 / 06` bottom-left or small dots — consistent position across all slides.

## The six templates

Build one artboard per template, clearly labelled, and always show all six together on the canvas so consistency can be judged at a glance.

**1 · Cover / hook.** Big display-type headline (the hook) dominating the upper two-thirds of the card, eyebrow above it, one small serif subline beneath. One or two hook words may be in the accent hue. This slide carries the most visual weight of the set — but still quiet by normal social standards.

**2 · List.** Eyebrow, then 3–5 bulleted points in the serif body face, separated or introduced by fine hairlines. Bullets are small fine-line marks (a short dash or tiny circle), not heavy dots. Each point one to two lines max.

**3 · Quote / statement.** A single centered line in the display typeface (or large serif for softer statements), vertically centered, surrounded by the most breathing room of any slide. Optional tiny attribution or eyebrow. Nothing else.

**4 · Chart / data.** A minimal fine-line chart (line, bar, or simple comparison) drawn in 1–2 px charcoal strokes with the accent hue as the only accent (the highlighted series, bar, or data point). Hairline axes, small label-typeface captions, no gridlines-heavy look, no fills except a possible flat accent on the highlighted element. Short serif takeaway line beneath.

**5 · Photo.** Full-bleed photo placeholder filling the inset card (rounded corners clip the image), with a short overlay text — a few words in the display typeface or serif — placed on a small paper-colored chip or over a subtle scrim so it stays legible. Keep the overlay minimal; the photo breathes.

**6 · CTA / final.** No swipe arrow. Short closing line, then a clearly reserved space for a comment/keyword CTA — the one place ALL CAPS is allowed, set in the display or label typeface with an accent-hue treatment (e.g. `comment "[keyword]"`). Optional small handle/footer line in the label typeface.

## Workflow

1. If `assets/` contains reference cards, view them before designing anything.
2. Build all six artboards in one pass, labelled, and present them together.
3. Do not lock or finalize the design — the user reviews the first pass and requests adjustments. Expect iteration; keep the templates easy to tweak (consistent spacing variables, shared components where the medium allows).
4. When filling templates with real content later, the brand voice rules apply to the copy too (lowercase-first, no exclamation marks).

## Consistency checklist (run before presenting)

- Same inset, corner radius, border, and texture on all six cards
- Eyebrow and page indicator in identical positions on every slide
- Swipe arrow present on slides 1–5, absent on slide 6, identical style throughout
- Only three colors of ink on the whole set: charcoal, accent hue, paper tones
- No exclamation marks, no stray capital letters, no emoji
- All artboards exactly 1080 × 1350