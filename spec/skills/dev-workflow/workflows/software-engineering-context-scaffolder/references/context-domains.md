# 23 Enterprise Software Engineering Context Domains

This reference details the 23 software engineering context domains managed by `software-engineering-context-scaffolder`.

## Core Context Domains (1-7)

1. **GLOSSARY** (`context/GLOSSARY.md`): Domain Vocabulary & Business Terms. Eliminates naming ambiguity across agents and developers.
2. **PRD** (`context/PRD.md`): Product Requirements Document. Core problem statement, solution, user stories, MVP vs V2 boundaries.
3. **ARCHITECTURE** (`context/ARCHITECTURE.md`): Technical Architecture & Component Boundaries. Stack choices, module contracts, data flow architecture.
4. **SCHEMA** (`context/SCHEMA.md`): Data Schema & Model Contracts. DB entities, state structures, domain models, branded IDs.
5. **DESIGN** (`context/DESIGN.md`): Design System & UI/UX Standards. Token systems, layout rules, typography, color palettes, accessibility thresholds.
6. **RULES** (`context/RULES.md`): Non-Negotiable Engineering Rules & Boundaries. Hard security, architecture, and behavioral constraints.
7. **TASKS** (`context/TASKS.md`): Executable Task Backlog. Sequenced, numbered task items tracing back to PRD user stories.

## Extended Engineering Domains (8-15)

8. **API** (`context/API.md`): API Contracts & Endpoint Definitions. Request/response schemas, validation bounds, error contracts.
9. **CODING-STANDARDS** (`context/CODING_STANDARDS.md`): Coding Conventions & Style Rules. Language-specific patterns, linting, typing discipline.
10. **TESTING** (`context/TESTING.md`): Testing Strategy & Pyramid Rules. Unit, integration, E2E bounds, assertion styles, coverage rules.
11. **SECURITY** (`context/SECURITY.md`): Security & Compliance Boundaries. Threat boundaries, auth flow requirements, sanitized logging.
12. **INFRASTRUCTURE** (`context/INFRASTRUCTURE.md`): Environment & Infrastructure Configuration. Environment vars, cloud resources, container setups.
13. **DEPLOYMENT** (`context/DEPLOYMENT.md`): CI/CD & Deployment Workflows. Release pipelines, tagging strategies, rollback protocols.
14. **MIGRATIONS** (`context/MIGRATIONS.md`): Database & Migration Policies. Zero-downtime rules, schema migration steps, backfill constraints.
15. **STATE** (`context/STATE.md`): State Management & Data Flow. Client/server state boundaries, caching, persistence mechanisms.

## System & Operational Domains (16-23)

16. **ERROR-HANDLING** (`context/ERROR_HANDLING.md`): Error Handling & Resilience. Error boundaries, sanitization, retry strategies.
17. **PERFORMANCE** (`context/PERFORMANCE.md`): Performance & Latency Budgets. Bundle limits, query limits, frame rate / latency targets.
18. **A11Y-I18N** (`context/A11Y_I18N.md`): Accessibility & Internationalization. WCAG 2.2 AA targets, screen reader behavior, locale handling.
19. **DEPENDENCIES** (`context/DEPENDENCIES.md`): Dependency & Module Boundaries. Package approval, version locking, import restrictions.
20. **OBSERVABILITY** (`context/OBSERVABILITY.md`): Observability & Telemetry. Tracing, metrics, structured log format, alert thresholds.
21. **FEATURE-FLAGS** (`context/FEATURE_FLAGS.md`): Feature Flag & Rollout Strategy. Flag naming, rollout stages, cleanup schedules.
22. **INCIDENTS** (`context/INCIDENTS.md`): Incident Response & Triage Protocols. Runbooks, triage steps, post-mortem templates.
23. **TECH-DEBT** (`context/TECH_DEBT.md`): Technical Debt & Refactoring Log. Deprecation schedules, refactoring backlog, architectural debt.

## Domain Audit Rubric

When auditing an existing codebase, each domain is classified into one of three health states:

- **HEALTHY:** File exists in `context/` or `.agents/context/`, contains populated project facts, retains zero unreplaced `[PLACEHOLDER: ...]` markers, and aligns with current repository code.
- **DRIFTED:** File exists but contains stale information contradicting actual code implementation or remaining `[PLACEHOLDER]` text.
- **MISSING:** Domain document is absent or uninitialized.
