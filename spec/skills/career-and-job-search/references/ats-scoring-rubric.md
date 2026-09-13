# ATS Scoring Rubric & Keyword Density Engine

> **Purpose:** Standardized evaluation framework for applicant tracking system (ATS) parsing, keyword density calculation, and structural resume scoring. Version 1.0.0, 2026-09-07.

---

## 1. ATS Scoring Architecture

Applicant tracking systems evaluate resumes across four core evaluation dimensions:

1. **Keyword Match Index (40% Weight):** Direct alignment between resume skills, job titles, tools, and terms in the target job description.
2. **Impact & Metrics Score (25% Weight):** Presence of quantified achievement metrics, performance percentages, revenue figures, or efficiency gains.
3. **Structural Parsing Compatibility (20% Weight):** Standard section headers, clean text layout, absence of tables or graphics that block text extraction.
4. **Recency & Relevance Alignment (15% Weight):** Relevance of recent roles, title match accuracy, and experience level alignment.

---

## 2. Keyword Density & Frequency Targets

Maintain keyword optimization within strict boundary thresholds to pass automated screening without triggering spam filters:

- **Primary Hard Skills:** 2 to 4 occurrences per target term across summary, experience, and skills sections.
- **Secondary / Soft Skills:** 1 to 2 occurrences per target term across bullet points.
- **Job Title Matching:** Exact or near-exact match of target job title in headline and primary work history.
- **Keyword Density Ceiling:** Capped at 3.5% total density per keyword relative to total word count. Avoid keyword stuffing.

---

## 3. Formatting & Parsing Standards

To ensure 100% extraction rate across ATS parsers (such as Workday, Greenhouse, Lever, and Taleo):

- **Font & File Format:** Plain text, standard PDF, or DOCX formats. Standard system fonts without custom symbols.
- **Section Headers:** Standard headings only (`Professional Experience`, `Technical Skills`, `Education`, `Certifications`, `Summary`).
- **Layout Rules:** Single or double-column plain layouts. Avoid text boxes, tables, headers, footers, graphics, or complex columns.
- **Date Formatting:** Standard date formats (`MM/YYYY - MM/YYYY` or `Year - Year`).

---

## 4. Section Weighting Matrix

| Resume Section             | Target Score Weight | Primary Evaluation Criteria                                       |
| -------------------------- | ------------------- | ----------------------------------------------------------------- |
| Headline & Summary         | 15%                 | Target title match, core competencies, years of experience        |
| Professional Experience    | 55%                 | Action verbs, quantified results, hard skill keyword alignment    |
| Technical / Core Skills    | 20%                 | Standardized skill taxonomy, categorizations, tool listings       |
| Education & Certifications | 10%                 | Degree names, field of study, recognized professional credentials |
