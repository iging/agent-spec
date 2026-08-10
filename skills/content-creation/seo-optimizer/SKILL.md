---
name: seo-optimizer
description: >-
  Execute technical SEO and Web Vitals audits on web components. Execute this
  skill whenever the user requests SEO improvements, metadata injection, schema
  generation, or search ranking optimization on a source file. Do NOT execute
  on backend business logic or database schemas.
version: 2.0.0
verified-on: [cline]
---

# SEO Optimizer

## 0. Identity

- **Role:** Principal SEO Technical Architect. Injects machine-readable semantics, structured data, and performance guards into frontend code to ensure zero penalties from search crawlers.
- **Authority:** Owns the frontend SEO audit and metadata injection workflow only. Cannot modify backend business logic, database schemas, or visual layout.
- **Must not define:** Content strategy, copywriting, or ranking targets.
- **Normative base:** `shared/html-css-principles.md`; `shared/javascript-principles.md`; `docs/anti-patterns.md`; `skills/_template/SKILL.md`; `docs/skill-standard.md`.
- **Anti-pattern gate:** No step may trigger AP-1 (vague task), AP-3 (no success criteria), AP-42 (no target state), AP-45 (no human review trigger), or AP-52 (no circuit breaker).

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                   |
| --- | ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Audit the provided frontend source and inject machine-readable metadata, structured data, and CLS guards.               |
| 2   | Target Tool      | Any agent runtime reading markdown skills: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, raw API.                |
| 3   | Output Format    | Refactored code block with injected metadata per §4; source file edited only on user request.                           |
| 4   | Constraints      | Never more than one h1 per route. Description under 160 characters. Canonical URLs absolute. Never alter visual layout. |
| 5   | Input            | Frontend source file or component; user SEO intent.                                                                     |
| 6   | Context          | Prevents keyword stuffing and penalty-causing duplicate headings (AP-1, AP-42).                                         |
| 7   | Audience         | The implementing developer and search crawlers.                                                                         |
| 8   | Success Criteria | Zero crawler penalties; valid heading hierarchy; structured data matching the page type; CLS guards injected.           |
| 9   | Examples         | See §10.                                                                                                                |

## 2. Trigger Matrix

| Trigger                                                     | Fire? | Notes                     |
| ----------------------------------------------------------- | ----- | ------------------------- |
| "SEO improvements / metadata injection / schema generation" | YES   | Core trigger.             |
| "Optimize this [page/component] for SEO"                    | YES   | Core trigger.             |
| Backend business logic or database schemas                  | NO    | Out of scope.             |
| Pure content/copywriting request                            | NO    | Different artifact owner. |

## 3. Execution Workflow

### Step 1: Semantic DOM Audit

- **Action:** Scan the provided code for exact heading hierarchy (h1 through h6). Ensure the primary payload sits inside a `<main>` tag. Record every heading violation explicitly.
- **Input:** Frontend source file.
- **Stop Condition:** If the file has zero heading elements, stop and report that no hierarchy exists before injecting anything.
- **Validation:** Heading hierarchy mapped; `<main>` presence verified; violations recorded.

### Step 2: Inject Core Metadata

- **Action:** Generate the `<title>` and `<meta name="description">`. Enforce the description strictly under 160 characters and the title under 60.
- **Input:** Audited DOM; user SEO intent.
- **Stop Condition:** If the description cannot fit under 160 characters without truncating meaning, stop and ask the user for a shorter core phrase.
- **Validation:** Title under 60 characters; description under 160; canonical absolute.

### Step 3: Inject Social Graph

- **Action:** Append `og:title`, `og:image`, and `twitter:card` tags matching the resolved title and a user-provided or page-derived image URL.
- **Input:** Core metadata.
- **Stop Condition:** If no image URL can be resolved, stop and omit `og:image` rather than inventing a URL.
- **Validation:** Social tags reference real, absolute URLs only.

### Step 4: Generate Structured Data

- **Action:** Write a `JSON-LD` script block matching a schema.org definition (e.g., Article, Product, LocalBusiness) selected by the page content type.
- **Input:** Page content; resolved metadata.
- **Stop Condition:** If the page content type is ambiguous, stop and select the least presumptive schema (Article) rather than guessing.
- **Validation:** JSON-LD validates against the selected schema.org type.

### Step 5: Mitigate CLS

- **Action:** Audit all `<img>` tags. Inject missing `width`, `height`, and descriptive `alt` attributes to prevent Cumulative Layout Shift.
- **Input:** Audited DOM.
- **Stop Condition:** If an image's intrinsic dimensions cannot be determined, stop and mark that image `[DIMENSIONS REQUIRED]` instead of guessing.
- **Validation:** Every image has width, height, and alt; zero layout-shift sources remain.

## 4. Output Specification

The output must be the refactored code block containing the injected metadata:

```html
<head>
  <title>[Target Keyword] - [Brand]</title>
  <meta name="description" content="[Strictly under 160 characters]" />
  <link rel="canonical" href="[Absolute URL]" />
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article"
    }
  </script>
</head>
```

## 5. Validation Gate

- [ ] Exactly one h1 per route; heading hierarchy valid.
- [ ] Title under 60 characters; description under 160; canonical absolute.
- [ ] Social graph tags reference real absolute URLs.
- [ ] JSON-LD valid for the selected schema.org type.
- [ ] Every image has width, height, and descriptive alt.
- [ ] Visual layout untouched; only invisible metadata and guards injected.

## 6. Anti-Triggers and Calibration

- **Under-execution:** Fixing alt tags but failing to inject JSON-LD structured data.
- **Over-execution:** Adding massive keyword stuffing blocks into the visible UI.
- **Calibration default:** Err toward invisible metadata perfection (head tags, JSON-LD) over altering the visual layout.

## 7. Anti-Pattern Compliance

| Step                | Prevents AP                    | Mechanism                                           |
| ------------------- | ------------------------------ | --------------------------------------------------- |
| 1 (Audit)           | AP-1 (vague task verb)         | Heading hierarchy mapped before injection.          |
| 2 (Metadata)        | AP-3 (no success criteria)     | Character-count constraints are deterministic.      |
| 4 (Structured Data) | AP-42 (no target state)        | Schema type matched to page content ambiguity gate. |
| 5 (CLS)             | AP-52 (no circuit breaker)     | Unknown image dimensions halt with a marker.        |
| 6 (Calibration)     | AP-2 (two tasks in one prompt) | Layout untouched; metadata-only scope enforced.     |

## 8. Versioning & Changelog

- **Version:** 2.0.0
- **Changelog:**
  - `2.0.0` (2026-08-09) — Elevated to Tier 5 per `docs/skill-standard.md`. Added Identity, 9-Dimension Intent, Trigger Matrix, per-step Action/Input/Stop/Validation, Validation Gate, AP compliance map, Versioning, Portability Matrix.

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

**Input:** "Optimize this landing page component for SEO."

**Output:** The refactored component with a valid heading hierarchy, `<main>` wrapper, title and description under the hard limits, absolute canonical, social graph tags, a JSON-LD Article block, and width/height/alt on every image — zero visual-layout changes.

**Failure case:** The user asks for "SEO" on a database schema. Refuse: the trigger matrix marks backend schemas NO. This skill owns frontend metadata only.
