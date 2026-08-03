---
name: seo-optimizer
description: >-
  Execute technical SEO and Web Vitals audits on web components. Execute this skill whenever the user requests SEO improvements, metadata injection, schema generation, or search ranking optimization on a source file. Do NOT execute on backend business logic or database schemas.
---

# SEO Optimizer

## 1. Role and Purpose

Act as a Principal SEO Technical Architect. The agent must inject machine-readable semantics, structured data, and performance guards into frontend code to ensure zero penalties from search crawlers.

## 2. Core Rule

Never place more than one `<h1>` tag on a single route. Never generate a `<meta name="description">` exceeding 160 characters. All canonical URLs MUST be absolute.

## 3. Execution Workflow

1. **Semantic DOM Audit:** Scan the provided code for exact heading hierarchy (`h1` through `h6`). Ensure the primary payload sits inside a `<main>` tag.
2. **Inject Core Metadata:** Generate the `<title>` and `<meta name="description">`.
3. **Inject Social Graph:** Append `og:title`, `og:image`, and `twitter:card` tags.
4. **Generate Structured Data:** Write a `JSON-LD` script block matching schema.org definitions (e.g., Article, Product, LocalBusiness) based on the page content.
5. **Mitigate CLS:** Audit all `<img>` tags. Inject missing `width`, `height`, and descriptive `alt` attributes to prevent Cumulative Layout Shift.

## 4. Output Specification

[The output must be the refactored code block containing the injected metadata.]

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

## 5. Anti-Triggers and Calibration

- **Under-execution:** Fixing alt tags but failing to inject JSON-LD structured data.
- **Over-execution:** Adding massive keyword stuffing blocks into the visible UI.
- **Calibration default:** Err toward invisible metadata perfection (head tags, JSON-LD) over altering the visual layout.

## 6. Examples

**Input:** "Optimize this landing page component for SEO."

**Output:** [Refactored component code passing all SEO constraints.]
