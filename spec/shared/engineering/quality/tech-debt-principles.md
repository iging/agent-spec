---
name: Technical Debt & Refactoring Principles
description: Framework-agnostic baseline standard for identifying, quantifying, prioritizing, refactoring, and managing technical debt, architectural erosion, and legacy code modernization.
---

# Technical Debt & Refactoring Principles

> **Purpose:** Baseline technical debt management and refactoring rules. Reference this file when assessing technical debt, planning refactoring initiatives, sunsetting legacy code, or balancing speed with architectural quality.

---

## Role / Authority

- **Role:** Framework-agnostic baseline standard for technical debt categorization, refactoring patterns, API deprecation, code modernization, and architectural debt management.
- **Authority:** Tier-3 shared engineering specification applicable across software development projects, maintenance lifecycles, and codebases.
- **Must not define:** Product backlog prioritization feature rankings or marketing business requirements.

---

## 1. Technical Debt Categorization and Visibility

- Classify technical debt explicitly into distinct operational categories: Code Debt (tangled logic, missing tests), Architectural Debt (outdated patterns, tight coupling), Infrastructure Debt (outdated OS/runtimes), and Documentation Debt (stale guides).
- Maintain an active Technical Debt Registry (backlog items tagged `tech-debt`) to make technical debt visible to product and engineering stakeholders.
- Avoid hidden debt: record deliberate shortcuts taken during rapid shipping as debt items immediately upon merging.

---

## 2. Quantitative Debt Assessment and Impact Scoring

- Evaluate technical debt items using explicit impact dimensions: Interest (ongoing cost in developer velocity or operational overhead), Contagion (rate at which bad patterns spread to new code), and Risk (probability of outage or security bug).
- Prioritize high-interest, high-contagion debt for refactoring; avoid spending engineering capacity on stable, low-churn legacy code that rarely changes.
- Track quantitative codebase health indicators: cyclomatic complexity, test coverage trends, dependency age, and build duration.

---

## 3. Incremental Refactoring and Boy Scout Rule

- Apply the Boy Scout Rule continuously: leave edited code cleaner than you found it during routine feature implementation.
- Execute refactorings incrementally using small, isolated pull requests rather than massive, multi-month rewrite branches.
- Require comprehensive test coverage (unit/integration) around target code paths prior to executing structural refactoring.
- Maintain behavior equivalence: refactoring pull requests must alter internal structure without changing external business behavior or contract APIs.

---

## 4. Deprecation and Safe Sundown Protocols

- Follow a structured deprecation protocol when retiring APIs, internal libraries, or legacy database models: Announce -> Deprecate -> Telemetry Verification -> Remove.
- Annotate deprecated interfaces explicitly with deprecation warnings and migration guidance (`@deprecated` annotations with replacement links).
- Verify zero active traffic via telemetry metrics before removing deprecated APIs or database columns.
- Enforce hard removal dates on deprecated code to prevent abandoned legacy paths from persisting indefinitely.

---

## 5. Architecture Decision Records (ADRs) and Preservation

- Document non-trivial architectural decisions, tradeoffs, and structural changes using lightweight Architecture Decision Records (ADRs) stored in the codebase repository.
- Include context, options considered, chosen solution, and long-term consequences in every ADR.
- Consult existing ADRs prior to refactoring core architectural boundaries to understand historic context and constraints.

---

## 6. Debt Budgeting and Capacity Allocation

- Allocate dedicated engineering capacity (15-20% per iteration cycle) for technical debt remediation, dependency updates, and refactoring tasks.
- Combine technical debt remediation with feature work: refactor target modules immediately before introducing major new capabilities into them.
- Avoid complete greenfield rewrites: prefer continuous incremental refactoring over risky full-system ground-up rewrites.
