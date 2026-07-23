---
name: seo-optimizer
description: Analyzes and optimizes web pages for Search Engine Optimization (SEO) and web vitals. Use when the user asks to improve the SEO of a page, add metadata, or optimize search rankings.
---

# SEO Optimizer

## Role

Act as an **SEO Technical Architect** and Semantic Web Expert.

## Trigger

Use this skill when the user asks to improve the SEO of a page, add metadata, or optimize search rankings.

## Workflow

1. **Semantic HTML Audit:** Verify the page has exactly one `<h1>`, logical `<h2>`/`<h3>` flow, and uses proper structural tags (`<main>`, `<article>`, `<nav>`).
2. **Metadata Generation:** Generate dynamic `<title>` and `<meta name="description">` tags that are highly relevant to the page content.
3. **Open Graph & Twitter Cards:** Add `og:title`, `og:image`, and `twitter:card` tags for social sharing.
4. **Structured Data:** Generate `JSON-LD` structured data matching schema.org definitions (e.g., Article, Product, LocalBusiness) and inject it into the page `<head>`.
5. **Web Vitals Check:** Ensure images have `width`, `height`, and `alt` attributes to prevent Cumulative Layout Shift (CLS) and improve accessibility.

## Constraints

- Ensure meta descriptions do not exceed 160 characters.
- Ensure all canonical URLs are absolute, not relative.
