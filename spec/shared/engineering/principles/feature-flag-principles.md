---
name: Feature Flag & Configuration Principles
description: Framework-agnostic baseline standard for feature toggles, dynamic configuration management, trunk-based development enablement, experimentation control, and flag lifecycle cleanup.
---

# Feature Flag & Configuration Principles

> **Purpose:** Baseline feature flag engineering rules. Reference this file when implementing feature flags, dynamic runtime configuration, targeted user rollouts, or flag deprecation workflows.

---

## Role / Authority

- **Role:** Framework-agnostic baseline standard for feature flag architecture, dynamic configuration, progressive deployment, experimentation, and flag lifecycle management.
- **Authority:** Tier-3 shared engineering specification applicable across frontend applications, backend services, and release engineering systems.
- **Must not define:** Application authentication protocols or cloud infrastructure deployment scripts.

---

## 1. Feature Flag Categorization and Scope Isolation

- Classify feature flags explicitly into distinct operational categories: Release Toggles (short-lived feature rollouts), Experimentation Toggles (A/B testing), Ops Toggles (circuit breakers, kill switches), and Permission Toggles (entitlements).
- Keep flag evaluations scoped tightly: isolate flag checks to boundary entry points or high-level routing handlers; avoid scattering flag conditionals across deep domain logic.
- Name feature flags deterministically using domain prefixes and explicit intent: `release_v2_checkout_flow`, `ops_disable_search_indexing`.

---

## 2. Trunk-Based Development and Decoupled Releases

- Use release feature flags to merge incomplete or in-progress features into the primary git branch without exposing unfinished capabilities to end users.
- Decouple code deployment from feature activation: deploy code safely while flags remain disabled, then activate features dynamically when ready.
- Eliminate long-lived feature branches: merge code continuously behind disabled flags to prevent massive branch merge conflicts.

---

## 3. Flag Evaluation Performance and Fallback Safety

- Perform flag evaluations in-memory using local cached configurations or microsecond evaluation SDKs; avoid synchronous network calls to external flag management services inside request execution paths.
- Provide safe fallback default values for every flag check: ensure application logic behaves predictably if flag evaluation fails or encounters network timeout.
- Keep default fallback states safe: default release flags to `false` (disabled) so service startup defaults to proven code paths.

---

## 4. Targeted Rollouts and Progressive Release

- Support targeted user rollouts based on deterministic hashing of user or tenant identifiers (ring deployments: internal team -> 1% -> 10% -> 50% -> 100%).
- Ensure user evaluation consistency: users must experience sticky flag evaluations throughout a session window to avoid UI state flickering.
- Enable instant kill-switch capabilities: operational flags must revert service features to safe baseline states instantly during production incidents.

---

## 5. Auditability and Change Visibility

- Log feature flag evaluations and state modifications to audit trails for security and operational compliance.
- Emit telemetry events when flags are evaluated to track operational metrics (error rates, latency) broken down by flag variation.
- Restrict flag modification permissions: require approval workflows or RBAC permissions for toggling flags in production environments.

---

## 6. Flag Lifecycle Management and Technical Debt Cleanup

- Treat short-lived release flags as temporary technical debt: attach expiration dates and ownership metadata to every new flag definition.
- Schedule explicit removal tasks when a feature flag achieves 100% rollout stability in production.
- Enforce strict flag quotas or stale flag alerts: highlight flags un-modified for over 30 days to mandate removal sweeps.
- Remove retired flag conditionals and fallback branch code completely during cleanup; do not leave dead flag branches in codebases.
