---
name: Architecture Decision Records (ADR) Principles
description: ADR engineering rules for documenting architectural decisions, context, consequences, and acceptance criteria for long-term maintainability.
---

# Architecture Decision Records (ADR) Principles

> **Purpose:** ADR engineering rules for documenting architectural decisions, context, consequences, and acceptance criteria. Reference this file from your prompt to enforce consistent ADR adoption and long-term maintainability.

---

## 1. ADR Format and Location

- **Mandatory Directory:** All ADRs live in `docs/architecture/adr/` (or `spec/shared/engineering/adr/`). No ADRs stored in wiki, Confluence, or inline comments. They must be version-controlled markdown files.
- **File Naming Convention:** `YYYYMMDD-short-description-adn.md`. Example: `20231015-use-postgres-for-user-data.adn.md`. Use adjectives and nouns; avoid verbs.
- **Front Matter (YAML):** Every ADR must include a minimal YAML front matter block:
  ```yaml
  ---
  id: "001"
  title: "Use PostgreSQL for User Data"
  date: 2023-10-15
  status: proposed | accepted | deprecated | superseded
  tags: [postgresql, data-modeling]
  ---
  ```
- **Status Workflow:**
  - `proposed`: Under discussion. No code changes yet.
  - `accepted`: Decision made. Implementation may proceed.
  - `deprecated`: Superseded by a newer ADR. Old code still works but migration path is documented.
  - `superseded`: Replaced by a new ADR. The old decision is archived but not actively enforced.

---

## 2. ADR Section Requirements

Each ADR markdown file must contain the following sections (in order):

### a. Context

- **Problem Statement:** One or two sentences describing the problem being solved.
- **Current State:** How is the problem currently handled? What existing system/component is affected?
- **Constraints:** Technical, business, or temporal constraints that influence the decision.

### b. Decision

- **The Decision:** A clear, concise statement of the chosen approach.
- **Options Considered:** At least two alternatives were evaluated. List them briefly.
- **Rationale:** Why was this option chosen over others? Include trade-offs (pros/cons).

### c. Consequences

- **Positive Consequences:** Benefits, improvements, new capabilities enabled.
- **Negative Consequences:** Trade-offs, compromises, ongoing maintenance costs, degraded properties.
- **Implementation Effort:** Rough estimate of implementation complexity (T-shirt size: S, M, L, or person-days).
- **Rollback Plan:** How to undo this decision if it proves wrong. Not always possible, but must be documented if applicable.

### d. Acceptance Criteria (Optional but Recommended)

- **Testable Criteria:** How will we know this decision is working as intended?
- **Monitoring/Metrics:** What metrics should we track to ensure the decision remains healthy?
- **Migration Path:** If applicable, how do we migrate existing data/code from the previous approach?

---

## 3. ADR Workflow

### a. Creation

- **Trigger:** A significant architectural choice that will affect multiple teams, services, or has long-term implications (> 3 months impact).
- **Author:** Senior engineer, staff engineer, or architect. Any team member can propose, but a staff+ engineer must sign off.
- **Discussion:** Minimum 3-day discussion window (async, in ADR comments or team channel). Capture objections and responses in the ADR itself.
- **Decision:** Lead architect or engineering manager reviews and sets status to `accepted` or `deprecated`.

### b. Review

- **Mandatory Review:** Every accepted ADR must be reviewed by at least one engineer who was not the author.
- **Checklist:**
  - [ ] Context accurately describes the problem.
  - [ ] Decision is clearly stated without ambiguity.
  - [ ] At least two options were considered and dismissed with rationale.
  - [ ] Consequences are honestly presented (not just benefits).
  - [ ] Acceptance criteria are measurable or clearly defined.
  - [ ] ADR format conforms to this specification.

### c. Maintenance

- **Periodic Review:** Accepted ADRs are reviewed annually or when the associated system undergoes major refactoring.
- **Deprecation:** If the system is being replaced, update the ADR status to `deprecated` or `superseded`. Add a `see also` link to the new ADR.
- **Link Integrity:** Ensure all links (internal `docs/` paths, external URLs) are checked quarterly. Broken links degrade trust in the ADR system.

---

## 4. ADR Best Practices

- **One Decision Per ADR:** Never combine multiple unrelated decisions in a single ADR. If you are switching from Option A to Option B and then to Option C, create three separate ADRs (`adr-001`, `adr-002`, `adr-003`).
- **No Retroactive ADRs:** Write ADRs before or during the decision process, not after the fact. Retroactive ADRs lack the honesty of documented trade-offs.
- **Keep ADRs Lean:** Each ADR should be 1–3 pages maximum. If it exceeds 3 pages, you are documenting a design, not a decision. Split into multiple ADRs.
- **Link, Don't Duplicate:** When referring to another ADR, use a relative link (`../adr-003.md`) rather than duplicating the context. This keeps knowledge DRY.
- **Tag for Searchability:** Use consistent tags (`#postgresql`, `#microservices`, `#caching`) in the YAML `tags` field. Enable full-text search across all ADRs (e.g., `grep -R "adr-" docs/architecture/adr/`).
- **Explicit "No-Decision":** If no decision is made, document why. Use status `proposed` with a note that further discussion is needed, or mark as `deferred` with a reason and owner.

---

## 5. ADR Index and Navigation

- **Root Index File:** Maintain `adr-index.md` at the root of the ADR directory. This file lists all ADRs with their ID, title, date, and current status.
- **Automated Index Generation:** Use a script (Python, shell) to scan `adr/` directory and generate `adr-index.md`. Commit the generated file. Do not maintain by hand if > 10 ADRs.
- **Cross-Reference Map:** In `adr-index.md`, add a "Related ADRs" section for each entry, linking to ADRs that influenced or were influenced by this decision.
- **Searchability:** Ensure ADRs are indexed by the team's search system (ElasticSearch, Algolia, or simple `grep`). Use consistent keywords in the title and YAML `tags`.

---

## 6. ADR and Documentation Synergy

- **ADR vs. Wiki:** ADRs are for _decisions_. Wiki/Confluence is for _procedures_, _onboarding_, and _general knowledge_. Do not store ADRs in a wiki — they will become out-of-date and lose version control.
- **ADR vs. Architecture Decision Record (ADR) Templates:** This specification is the template. Do not create a new template for each ADR. Consistency across all ADRs is the goal.
- **ADR and Code:** Code should reflect the decisions in ADRs. If code diverges from the ADR without an update to the ADR status (`deprecated`), the ADR becomes technical debt.
- **ADR and RFC:** For open-source or multi-org projects, consider publishing ADRs as RFCs (Request for Comments). Use the same format, but open a discussion period before setting status to `accepted`.
