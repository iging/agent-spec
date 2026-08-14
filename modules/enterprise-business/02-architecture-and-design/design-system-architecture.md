---
name: design-system-architecture
description: >-
  Evaluate existing codebase topology, define component boundaries, establish
  data flows, and write architectural design documents before feature implementation.
  Execute this skill whenever the user says "design system architecture", "plan
  the architecture", "draw system boundary", or "design architecture for this feature".
  Do NOT execute for low-level bug fixing or small UI tweaks.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Design System Architecture

## 0. Identity

- **Role:** Principal Systems Architect. Evaluates existing codebase topology, defines system boundaries, establishes data flows, and creates architectural design documents before implementation.
- **Authority:** Tier-5 Enterprise Skill. Governs system architecture design and component boundary specification.
- **Must not define:** Low-level feature implementations, UI component styling details, or release deployment operations.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `context/ARCHITECTURE.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                                     |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 1   | Task             | Analyze existing system structure and author comprehensive architecture design documents for new components or refactors. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                                       |
| 3   | Output Format    | Architecture document saved to `.context/architecture/[slug]-[branch]-architecture-design.md`.                            |
| 4   | Constraints      | Must complete context mapping before architecture drafting. Must define explicit component ownership boundaries.          |
| 5   | Input            | User architectural goal, feature requirements, existing architecture docs, and codebase entry points.                     |
| 6   | Context          | Prevents architectural erosion, circular dependencies, and monolithic coupling during codebase expansion.                 |
| 7   | Audience         | Systems architects, senior technical leads, and engineering teams.                                                        |
| 8   | Success Criteria | Architecture document produced detailing system topology, data flow, component boundaries, and security constraints.      |
| 9   | Examples         | See Section 10.                                                                                                           |

## 2. Trigger Matrix

| Trigger                                        | Fire? | Notes                                     |
| ---------------------------------------------- | ----- | ----------------------------------------- |
| "Design system architecture for feature X"     | YES   | Primary trigger for architectural design. |
| "Plan the architecture for a new microservice" | YES   | Component architecture design request.    |
| "Map module boundaries for this codebase"      | YES   | Architectural boundary mapping request.   |
| "Fix typos in documentation"                   | NO    | Minor documentation editing task.         |
| "Implement the login button CSS"               | NO    | UI component implementation task.         |

## 3. Execution Workflow

### Step 1: Architectural Context Scan

- **Action:** Inspect the workspace structure and existing architectural documentation in `context/ARCHITECTURE.md` or `.context/architecture/`. Identify core system layers, database abstractions, public APIs, and communication protocols.
- **Input:** Workspace file paths and existing architecture context files.
- **Stop Condition:** Stop scanning after reading top-level module definitions and core entry points. Maximum 15 files scanned.
- **Validation:** Current architectural baseline established in session memory.

### Step 2: Component Boundary and Interface Definition

- **Action:** Define new components, microservices, or modules required to satisfy the system goals. Specify clear interface contracts, data schemas, and explicit boundary limits for each component.
- **Input:** Baseline architectural context from Step 1 and new system requirements.
- **Stop Condition:** If any interface contract relies on circular module dependencies, stop and refactor the component boundary topology.
- **Validation:** Every new component has a single responsibility and unambiguous interface contract.

### Step 3: Data Flow and Security Threat Mapping

- **Action:** Trace data movement from entry points through components down to storage layers. Identify security boundaries, authentication controls, encryption points, and potential single points of failure.
- **Input:** Defined component topology from Step 2.
- **Stop Condition:** If sensitive data flows across unauthenticated component boundaries, flag the risk and mandate secure transport.
- **Validation:** Data flow sequence mapped with explicit security constraints at every hop.

### Step 4: Architectural Document Generation

- **Action:** Write the architectural specification to `.context/architecture/[slug]-[branch]-architecture-design.md`.
- **Input:** Synthesized findings from Steps 1–3.
- **Stop Condition:** If directory `.context/architecture/` does not exist, create it before writing.
- **Validation:** Document written to disk matching Section 4 schema.

## 4. Output Specification

```markdown
# Architectural Design Specification: [System / Feature Name]

- **Date:** [YYYY-MM-DD]
- **Architect:** [Principal Systems Architect]
- **Status:** Proposed | Approved
- **Document Path:** `.context/architecture/[slug]-[branch]-architecture-design.md`

## 1. Executive Architecture Summary

[High level overview of architectural changes and system goals]

## 2. Component Topology and Module Boundaries

### Component Map

- `[Component A]`: [Role and responsibility]
- `[Component B]`: [Role and responsibility]

### Boundary Rules

- Component A MUST NOT directly access database tables owned by Component B.
- All inter-module communication MUST route through explicit API interface contracts.

## 3. Data Flow Diagram (ASCII / Mermaid)
```

[Client Entry] --> [API Gateway] --> [Auth Middleware] --> [Core Service] --> [Database]

```

## 4. Security and Compliance Boundary

- **Authentication:** [Mechanism]
- **Data Encryption:** Enforced at rest and in transit.
- **Threat Mitigations:** [Specific risk mitigation strategies]

## 5. Architectural Tradeoffs and Non-Goals

- **Chosen Tradeoff:** [Description of architectural tradeoff]
- **Explicit Non-Goals:** [What this architecture specifically does NOT support]
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Baseline context scanned without exceeding 15 files.
- [ ] Component boundaries explicitly defined with zero circular dependencies.
- [ ] Data flows mapped from entry point to persistence layer.
- [ ] Document generated at `.context/architecture/[slug]-[branch]-architecture-design.md`.
- [ ] Zero banned words or em dashes present in output.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Defining component boundaries without specifying data flow contracts.
- **Over-execution threshold:** Writing lower-level function implementations or UI component styles inside architectural specs.
- **Calibration default:** Err toward non-execution if request asks for immediate feature code implementation.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                               |
| ------ | ------------ | ----------------------------------------------------------------------- |
| Step 1 | AP-16, AP-31 | Restricts context scan to 15 key files.                                 |
| Step 2 | AP-1, AP-26  | Specifies explicit module boundaries and non-goals upfront.             |
| Step 3 | AP-45        | Identifies security risks and forces boundary verification.             |
| Step 4 | AP-44, AP-52 | Restricts output file generation to `.context/architecture/` directory. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room implementation conforming to Tier-5 Enterprise SKILL standard.

## 9. Portability Matrix

| Runtime              | Status   | Notes                                                |
| -------------------- | -------- | ---------------------------------------------------- |
| Claude Code          | verified | Direct execution using standard toolset.             |
| Cursor               | verified | Fully supported via workspace context scanning.      |
| Copilot              | verified | Formatted for step-by-step guidance.                 |
| Windsurf             | verified | Fully compatible.                                    |
| Kiro                 | verified | Fully compatible.                                    |
| Cline                | verified | Executed and verified in local workspace.            |
| Raw API (no tooling) | verified | Generates valid architectural design specifications. |

## 10. Examples

**Input:** "Design system architecture for an async job processing engine to handle video uploads."

**Output:** Scans workspace entry points. Defines three discrete components: Upload Ingestion Service, Job Queue Worker, and Media Metadata Store. Creates ASCII data flow map tracing video files from user upload to blob storage and queue processing. Writes `.context/architecture/job-engine-main-architecture-design.md`.

**Failure case:** User says "Write the Node.js code for the upload endpoint." Refuses architectural mode because request is code implementation, routing user to engineering workflow instead.
