# Agent Workflow Examples Index

## Role / Authority

- **Role:** Central index catalog for annotated workflow and decision examples.
- **Authority:** Demonstration layer showing proper agent decision-making, rigor calibration, and anti-pattern avoidance.
- **Must not define:** New normative core instructions or framework rules.

---

## 1. Overview

The `examples/` directory contains concrete, step-by-step traces demonstrating proper agent behavior under various scenarios, constraint levels, and task complexities.

## 2. Workflow Catalog

| Example | Focus Area | Description |
| :--- | :--- | :--- |
| [`architecture-review.md`](architecture-review.md) | System Design & Audits | Step-by-step walkthrough of conducting an architectural review without scope creep. |
| [`capability-degradation.md`](capability-degradation.md) | Resiliency & Safety | Handling missing tools or reduced runtime capabilities gracefully. |
| [`full-rigor-production-change.md`](full-rigor-production-change.md) | Production Safety | High-rigor workflow for executing critical production changes safely. |
| [`proportional-minimal-change.md`](proportional-minimal-change.md) | Efficiency & Scope | Applying minimal, targeted edits for low-complexity requests without over-engineering. |
| [`refactor-problem-first.md`](refactor-problem-first.md) | Refactoring Protocol | Problem-first diagnosis and test-backed refactoring workflow. |
| [`security-conflict.md`](security-conflict.md) | Conflict Resolution | Navigating security policy conflicts and escalating appropriately to human operators. |

## 3. Visual & Style Catalog

- [`brand-presets/`](brand-presets/) — Preset design system configurations and theme examples for visual design engineering.
