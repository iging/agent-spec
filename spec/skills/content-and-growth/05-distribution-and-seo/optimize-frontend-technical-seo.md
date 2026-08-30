---
name: optimize-frontend-technical-seo
description: >-
  Audit and optimize frontend technical SEO, Next.js metadata, OpenGraph tags, JSON-LD structured data,
  Core Web Vitals Cumulative Layout Shift (CLS), and canonical URLs.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Optimize Frontend Technical SEO

## 0. Identity

- **Role:** Technical SEO Engineer & Core Web Vitals Specialist.
- **Authority:** Tier-5 Enterprise Skill for frontend technical SEO auditing and code fixes.
- **Must not define:** Keyword-stuffed black-hat SEO tactics or link buying schemes.
- **Normative base:** `core/instruction-hierarchy.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                           |
| --- | ---------------- | ----------------------------------------------------------------------------------------------- |
| 1   | Task             | Audit page source code, generate JSON-LD schema, and fix metadata / Web Vitals issues.          |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.             |
| 3   | Output Format    | Frontend SEO audit report and TypeScript/HTML code fixes.                                       |
| 4   | Constraints      | Must follow spartan writing rules. Valid JSON-LD schema, valid OpenGraph, zero CLS regressions. |
| 5   | Input            | Frontend component files (`page.tsx`, `layout.tsx`), URL, page metadata spec.                   |
| 6   | Context          | Prevents missing search previews, unindexed pages, and low Web Vitals scores.                   |
| 7   | Audience         | Frontend engineers, web performance leads, and technical SEO directors.                         |
| 8   | Success Criteria | 100% metadata tag coverage, valid JSON-LD output, and zero unhandled image dimensions.          |
| 9   | Examples         | See Section 10.                                                                                 |

## 2. Trigger Matrix

| Trigger Pattern                                     | Fire? | Target Action                                            |
| --------------------------------------------------- | ----- | -------------------------------------------------------- |
| "Optimize technical SEO for Next.js app"            | YES   | Audit page metadata, OpenGraph, and JSON-LD schema.      |
| "Generate Article JSON-LD structured data"          | YES   | Create valid Schema.org script tag snippet.              |
| "Fix Cumulative Layout Shift (CLS) on landing page" | YES   | Add explicit width/height to images and layout elements. |
| "Train machine learning PyTorch model"              | NO    | Data science task. Route to ML skill.                    |

## 3. Execution Workflow

### Step 1: Frontend Metadata Audit

- **Action:** Read layout or page code. Check title (50-60 chars), description (150-160 chars), canonical tag, `og:image` (1200x630), and `robots` directives.
- **Input:** Target frontend file paths.
- **Stop Condition:** Stop if file is non-HTML/React code.
- **Validation:** Missing metadata tags compiled into audit list.

### Step 2: JSON-LD Structured Data Generation

- **Action:** Draft valid Schema.org JSON-LD object (TechArticle or SoftwareApplication).
- **Input:** Page content details and author profile.
- **Stop Condition:** Stop if schema type is invalid per Schema.org specs.
- **Validation:** Output passes JSON syntax and schema validation.

### Step 3: Core Web Vitals CLS Optimization

- **Action:** Inspect `<img>` elements for missing `width` and `height` attributes. Add Next.js `<Image>` props or CSS `aspect-ratio` rules.
- **Input:** JSX/HTML layout files.
- **Stop Condition:** Stop if changes break responsive CSS layout.
- **Validation:** Layout shift risk eliminated on render.

## 4. Output Specification

```typescript
// Next.js App Router Metadata Specification
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Database Migration Guide | Company Engineering",
  description:
    "Learn how to execute zero-downtime PostgreSQL migrations with connection pooling.",
  alternates: {
    canonical: "https://company.com/blog/database-migration-guide",
  },
  openGraph: {
    title: "Database Migration Guide | Company Engineering",
    description: "Learn how to execute zero-downtime PostgreSQL migrations.",
    url: "https://company.com/blog/database-migration-guide",
    images: [
      {
        url: "https://company.com/og/database-migration.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};
```

## 5. Validation Gate

- [ ] Meta title strictly between 50-60 characters.
- [ ] Meta description strictly between 150-160 characters.
- [ ] Valid JSON-LD Schema snippet generated.
- [ ] All image tags specify explicit dimensions to block CLS.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Providing generic meta descriptions without canonical tags or OpenGraph images.
- **Over-execution threshold:** Keyword stuffing meta tags with 50 repetitive search phrases.
- **Calibration default:** Keep metadata clean, accurate, technical, and performant.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                         |
| ------ | ------------ | ----------------------------------------------------------------- |
| Step 1 | AP-1, AP-16  | Scans target layout files strictly for missing metadata keys.     |
| Step 2 | AP-4, AP-38  | Mandates schema compliance per Schema.org standards.              |
| Step 3 | AP-28, AP-45 | Prevents CLS layout regressions by enforcing width/height bounds. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial release matching Tier-5 Enterprise standard.

## 9. Portability Matrix

| Runtime     | Status   | Notes                           |
| ----------- | -------- | ------------------------------- |
| Claude Code | verified | Direct workspace execution.     |
| Cursor      | verified | Supported via rule file.        |
| Copilot     | verified | Formatted for prompt execution. |
| Windsurf    | verified | Fully compatible.               |
| Kiro        | verified | Fully compatible.               |
| Cline       | verified | Verified in active workspace.   |
| Raw API     | verified | Accurate technical SEO output.  |

## 10. Examples

**Input:** "Audit SEO metadata for `app/blog/[slug]/page.tsx`."
**Output:** Generates Next.js Metadata export object, canonical tag, OpenGraph image configuration, and TechArticle JSON-LD script block.
