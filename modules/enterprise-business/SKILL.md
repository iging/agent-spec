---
name: company-suite
description: Root router and software engineering lifecycle dispatcher for Tier-5 Enterprise AI Agent Skills.
version: 5.0.0
license: Apache-2.0
allowed-tools:
  - Read
  - Search
  - AskUserQuestion
---

# Company Suite Router & Lifecycle Dispatcher

## 1. Identity & Purpose

- **Role:** Enterprise AI Agent Router and Lifecycle Dispatcher.
- **Authority:** Tier-5 normative root skill for `skills/company-suite/`.
- **Purpose:** Provide deterministic prompt analysis, phase classification, and skill dispatch across all seven software engineering lifecycle phases without duplicating skill logic or violating scope boundaries.

---

## 2. 9-Dimension Intent Model

1. **Domain:** Enterprise software development lifecycle orchestration.
2. **Goal:** Inspect incoming prompts, determine the matching lifecycle phase, and dispatch to the correct specialist skill file under `skills/company-suite/`.
3. **Context:** Operates across clean-room software projects, enterprise codebases, and autonomous agent runtimes.
4. **Input Constraints:** Accepts raw user intent, feature requests, bug reports, deployment requests, or documentation tasks.
5. **Output Constraints:** Emits a structured routing decision, target skill path, pre-flight verification summary, and execution instructions.
6. **Tool Usage:** Uses `Read`, `Search`, and `AskUserQuestion` for directory verification and ambiguous intent resolution.
7. **Safety Boundaries:** Blocks ambiguous execution, forbids direct code edits within the router, and enforces strict phase isolation.
8. **Quality Standards:** Guarantees deterministic skill selection, zero vendor lock-in, and zero prose policy violations.
9. **Failure Modes:** Ambiguous intent triggers `AskUserQuestion` clarification before dispatching.

---

## 3. Trigger Matrix & Skill Mapping

| User Intent / Trigger Pattern                                          | Targeted Lifecycle Phase         | Target Skill File Path                                             |
| :--------------------------------------------------------------------- | :------------------------------- | :----------------------------------------------------------------- |
| Demand validation, customer problem analysis, product interrogation    | `01-think-and-spec`              | `01-think-and-spec/interrogate-product-demand.md`                  |
| Feature specification, acceptance criteria, task breakdown             | `01-think-and-spec`              | `01-think-and-spec/write-feature-spec.md`                          |
| Design system creation, UI component tokens, layout guidelines         | `02-architecture-and-design`     | `02-architecture-and-design/design-system-architecture.md`         |
| Codebase mapping, dependency graph, architectural context              | `02-architecture-and-design`     | `02-architecture-and-design/map-codebase-context.md`               |
| Model latency benchmarking, LLM evaluation, throughput scoring         | `03-engineering-execution`       | `03-engineering-execution/benchmark-model-performance.md`          |
| Systematic root cause analysis, stack trace diagnosis, bug fixing      | `03-engineering-execution`       | `03-engineering-execution/execute-root-cause-debugging.md`         |
| Code refactoring, debt reduction, pattern modernization                | `03-engineering-execution`       | `03-engineering-execution/refactor-clean-code.md`                  |
| Pre-merge code review, static analysis, quality gate verification      | `03-engineering-execution`       | `03-engineering-execution/review-code-quality.md`                  |
| Core feature implementation, module creation, system coding            | `03-engineering-execution`       | `03-engineering-execution/write-code-implementation.md`            |
| OWASP audit, security vulnerability scanning, STRIDE threat modeling   | `04-quality-and-testing`         | `04-quality-and-testing/audit-security-vulnerabilities.md`         |
| Automated unit test creation, integration testing, E2E test suites     | `04-quality-and-testing`         | `04-quality-and-testing/author-automated-tests.md`                 |
| WCAG 2.1 AA audit, screen reader testing, accessibility verification   | `04-quality-and-testing`         | `04-quality-and-testing/verify-accessibility-compliance.md`        |
| Environment configuration, secrets validation, environment drift       | `05-release-and-ops`             | `05-release-and-ops/manage-environment-config.md`                  |
| Production release deployment, version tagging, PR merging             | `05-release-and-ops`             | `05-release-and-ops/ship-production-release.md`                    |
| Incident triage, production outage response, rollback execution        | `05-release-and-ops`             | `05-release-and-ops/triage-incident-response.md`                   |
| Technical documentation, Diataxis framework guides, API reference      | `06-documentation-and-knowledge` | `06-documentation-and-knowledge/author-technical-documentation.md` |
| Research synthesis, retrospective analysis, knowledge extraction       | `06-documentation-and-knowledge` | `06-documentation-and-knowledge/synthesize-research-findings.md`   |
| Financial business metrics audit, unit economics, SaaS KPI analysis    | `07-business-and-growth`         | `07-business-and-growth/audit-financial-business-metrics.md`       |
| Growth marketing copy, positioning narrative, landing page copy        | `07-business-and-growth`         | `07-business-and-growth/author-growth-marketing-copy.md`           |

---

## 4. 4-Step Dispatcher Workflow

```
+---------------------------------------------------------+
| Step 1: Analyze Request & Extract Intent               |
+----------------────────────+----------------------------+
                             |
                             v
+---------------------------------------------------------+
| Step 2: Classify Phase & Select Target Skill            |
+----------------────────────+----------------------------+
                             |
                             v
+---------------------------------------------------------+
| Step 3: Verify Pre-Flight Gates & Scope Boundaries       |
+----------------────────────+----------------------------+
                             |
                             v
+---------------------------------------------------------+
| Step 4: Dispatch Execution & Return Handoff Plan        |
+---------------------------------------------------------+
```

### Step 1: Analyze Request & Extract Intent

Extract core action verbs, domain targets, and constraints from the incoming prompt. Identify whether the user requires planning, coding, auditing, testing, shipping, or documenting.

### Step 2: Classify Phase & Select Target Skill

Cross-reference extracted keywords against the Trigger Matrix in Section 3. Map the request to exactly one primary lifecycle phase (01 through 07) and select the corresponding target file path.

### Step 3: Verify Pre-Flight Gates & Scope Boundaries

Confirm the target skill file exists on disk. Verify that all required pre-flight artifacts (such as specifications or architectural plans) are available if the target skill requires them. If intent is ambiguous across multiple phases, prompt the user using `AskUserQuestion`.

### Step 4: Dispatch Execution & Return Handoff Plan

Emit the structured dispatch payload. Direct the executing AI agent to load and follow the normative instructions inside the selected skill file.

---

## 5. Output Specification

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "SkillRoutingDecision",
  "type": "object",
  "required": [
    "status",
    "selected_phase",
    "target_skill_path",
    "rationale",
    "preflight_checks_passed"
  ],
  "properties": {
    "status": {
      "type": "string",
      "enum": ["DISPATCHED", "CLARIFICATION_REQUIRED", "UNSUPPORTED_INTENT"]
    },
    "selected_phase": {
      "type": "string",
      "enum": [
        "01-think-and-spec",
        "02-architecture-and-design",
        "03-engineering-execution",
        "04-quality-and-testing",
        "05-release-and-ops",
        "06-documentation-and-knowledge",
        "07-business-and-growth"
      ]
    },
    "target_skill_path": {
      "type": "string"
    },
    "rationale": {
      "type": "string"
    },
    "preflight_checks_passed": {
      "type": "boolean"
    }
  }
}
```

---

## 6. Validation Gate

Before completing dispatch, the router MUST verify:

1. Exactly one primary skill file is selected for execution.

---

## 7. Anti-Triggers & Scope Boundaries

- **Do NOT execute code directly inside this router:** Routing logic must only select and hand off execution to specialist skills.
- **Do NOT bypass phase classification:** Unclassified prompts must be clarified rather than assigned randomly.
- **Do NOT modify repository configuration files:** Infrastructure setup belongs in `manage-environment-config.md`.

---

## 8. Anti-Pattern Matrix

| Anti-Pattern             | Description                                                | Correct Action                                       |
| :----------------------- | :--------------------------------------------------------- | :--------------------------------------------------- |
| Monolithic Execution     | Executing implementation steps directly inside the router  | Hand off execution to `write-code-implementation.md` |
| Overlapping Dispatch     | Attempting to execute multiple phase skills simultaneously | Process lifecycle phases sequentially                |
| Silent Assumption        | Selecting a skill when user intent is ambiguous            | Trigger `AskUserQuestion` to confirm user target     |
| Hardcoded Vendor Tooling | Coupling routing decisions to specific vendor CLI binaries | Use generic capability definitions for dispatch      |

---

## 9. Portability Matrix

| Agent Runtime     | Supported | Integration Mechanism                                  |
| :---------------- | :-------- | :----------------------------------------------------- |
| Claude Code       | Yes       | System prompt router or slash command `/company-suite` |
| Cursor            | Yes       | `.cursorrules` skill path reference                    |
| Windsurf          | Yes       | `.windsurfrules` directive integration                 |
| Copilot Workspace | Yes       | Custom agent instruction path                          |
| Kiro              | Yes       | `.kiro/skills` definition link                         |
| Cline             | Yes       | System prompt skill directive                          |

---

## 10. Annotated Examples

### Example 1: Security Audit Dispatch

_User Request:_ "Run an OWASP security scan on our payment service."
_Routing Decision:_

- Selected Phase: `04-quality-and-testing`
- Target Skill Path: `skills/company-suite/04-quality-and-testing/audit-security-vulnerabilities.md`
- Rationale: Request explicitly targets vulnerability auditing and threat analysis.

### Example 2: Ambiguous Request Resolution

_User Request:_ "Make this feature better."
_Routing Decision:_

- Status: `CLARIFICATION_REQUIRED`
- Action: Invoke `AskUserQuestion` with options:
  - A) Refactor codebase implementation (`03-engineering-execution/refactor-clean-code.md`)
  - B) Audit code quality and bugs (`03-engineering-execution/review-code-quality.md`)
  - C) Improve user experience and design (`02-architecture-and-design/design-system-architecture.md`)

2. The selected skill file path exists under `skills/company-suite/`.
3. No code edits or file modifications were executed by the router itself.
4. Ambiguous intents were resolved prior to selection.
