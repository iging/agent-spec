---
name: linkedin-post-report
description: Turn an Apify "LinkedIn profile posts" export (CSV or XLSX) into a decision-ready analytics report plus a reusable SOP for the next post. Use this skill whenever someone uploads a LinkedIn posts scrape and wants to know what's actually working — which formats, hooks, angles, and visuals drive engagement — and what to double down on or drop. Trigger on phrases like "analyze my LinkedIn posts", "what's working on my LinkedIn", "I scraped my posts", "Apify export", "LinkedIn content report", or when an XLSX/CSV with columns like engagement/likes, postImages, document/title, or linkedinUrl is attached. Built to handle the quirks of the Apify export format, which has misleading columns. Produces two files: a written report and a step-by-step SOP.
---

# LinkedIn Post Report

Take an Apify "LinkedIn profile posts" export — a CSV or XLSX scrape of one person's LinkedIn posts, anywhere from 50 to 5,000+ rows — and produce a decision-ready report on what's actually working, so the user can tell this person what to double down on and what to drop. Treat this as a serious analytics deliverable, not a quick summary.

If no file is attached, ask for it before doing anything else.

## Handle these quirks of the export format

The obvious columns lie. Read them correctly:

- The `type` column says "post" for every row — ignore it. Derive each post's FORMAT from which media columns are populated: if `document/*` (e.g. `document/title`, `document/totalPageCount`) is filled → carousel/document; else if `postVideo/*` → video; else if `article/*` → shared article/link; else if `postImages/0/url` → image; otherwise → text-only.
- Engagement per post = `engagement/likes` + `engagement/comments` + `engagement/shares`. Reaction mix lives in `engagement/reactions/N/type` and `/count` (like, empathy, praise, funny…) — use it to read emotional register. Post text is in `content`; the author's handle and the post link are in `linkedinUrl`.
- There's no date column, but the timestamp is encoded in the activity ID (`engagement/id`, also the number after "activity-" in the URL): take it as a 64-bit integer and shift right 22 bits for Unix milliseconds (date = id >> 22, then ÷1000). Use this to build the timeline for cadence and best-day/time.

## Quantitative pass

Compute the quantitative stats across ALL posts in code so the numbers are exact. Define an outlier as a post whose engagement is some multiple of its baseline, and state the multiple you used.

## Qualitative pass

Do the qualitative read on the standouts — top and bottom performers, every outlier, and a representative sample of the middle. Don't infer what a post said from its numbers, and for visual posts don't judge from the caption alone: actually OPEN THE MEDIA and look at it.

- Download and view the image (`postImages/N/url`) and the video thumbnail (`postVideo/thumbnailUrl`).
- For carousels, pull the on-slide wording from `document/transcribedDocumentUrl` (or `document/manifest/transcribedDocumentUrl`) and view the cover/slide images (`document/coverPages/.../imageUrls`, `document/manifest/perResolutions/N/imageManifestUrl`).
- For every winning visual post, describe what's literally on it — the on-image or first-slide text and hook, the visual style (candid photo, selfie, screenshot, data chart, quote/text card, diagram, meme), the layout — and tie those visual choices to why it performed.
- Quote the hook and link the post every time.

## What the report must deliver

With specifics and real examples:

1. **Bottom line first** — in 3-4 sentences, what's working and what should change.
2. **What FORMAT wins** (text / image / carousel / video / article) — average and median engagement and sample size per format, flag any format that looks strong but rests on only a few posts, and for the winning visual formats spell out what the strong images/slides actually look like.
3. **What ANGLE / hook / topic wins** — cluster posts into the angles this person actually uses (personal story, contrarian take, how-to, news reaction, list/framework, hot take, etc.), rank them by engagement, and name the opening-line and first-slide patterns that track with high engagement.
4. **The biggest outliers** — the posts that massively over- and under-performed their baseline, each with numbers, the hook, the link, what was on the image/slides, and the best read on WHY.
5. **Stop / Continue / Start** — what to stop (formats, angles, habits that reliably underperform), what to keep, and what to test next — concrete enough to act on this week.
6. **Whatever else the data clearly supports** and a sharp strategist would want: posting cadence and consistency, best day/time, ideal length, comment-to-reaction ratio (conversation vs passive likes), reaction-mix tells (controversy vs warmth), recurring themes, signs of fatigue or decline, and the single highest-leverage change.

## Output: save two new files (don't modify the upload)

1. A written report the user can read top to bottom — clear hierarchy, bottom line up front, no filler, every claim tied to a number or a quoted/linked post.
2. An SOP for the next post, reverse-engineered from the highest outliers: the repeatable recipe spelled out step by step — the hook formula, the winning format and angle, and the visual template (what slide 1 / the image should contain and look like), with real outlier posts as worked examples.

## Before calling it done

Ground every finding in the data. If the export lacks what a section needs (e.g. too few videos to judge, or media URLs that won't open), say so plainly instead of guessing. Re-check the headline numbers against the file and confirm every format, angle, and visual claim matches what's actually in the export.
