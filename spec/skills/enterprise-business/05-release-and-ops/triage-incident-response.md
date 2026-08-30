---
name: triage-incident-response
description: >-
  Analyze production outage signals, isolate blast radius, execute emergency hotfix or rollback
  mitigations, and author post-mortem reports. Execute this skill whenever the user says
  "triage incident", "production outage alert", "handle emergency hotfix", or "write post-mortem".
  Do NOT execute for non-urgent routine maintenance.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline]
---

# Triage Incident Response

## 0. Identity

- **Role:** Lead Incident Responder & SRE. Analyzes production outage signals, isolates blast radius, executes emergency hotfix or rollback mitigations, and authors post-mortem reports.
- **Authority:** Tier-5 Enterprise Skill. Governs emergency incident triage, mitigation path execution, blast radius containment, and post-mortem analysis.
- **Must not define:** Routine feature product roadmaps or unverified data deletion commands.
- **Normative base:** `core/instruction-hierarchy.md`, `core/decision-framework.md`, `core/safety.md`, `shared/writing/writing-rules.md`.
- **Anti-pattern gate:** This skill must never encode anti-patterns AP-1–AP-56 from `docs/anti-patterns.md`. Any step that could violate AP-4 (over-permissive agent), AP-26 (no scope boundary), AP-28 (no stop condition), AP-44 (unlocked filesystem), or AP-45 (no human review trigger) is forbidden.

## 1. Intent (9 Dimensions)

| #   | Dimension        | Value                                                                                                  |
| --- | ---------------- | ------------------------------------------------------------------------------------------------------ |
| 1   | Task             | Rapidly assess incident severity, contain blast radius, apply emergency mitigation, write post-mortem. |
| 2   | Target Tool      | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API.                    |
| 3   | Output Format    | Post-mortem document saved to `.context/incidents/[date]-[slug]-post-mortem.md`.                       |
| 4   | Constraints      | Must prioritize service restoration over root cause analysis during active outage.                     |
| 5   | Input            | Alert notifications, error rate metrics, application logs, recent deployment diffs.                    |
| 6   | Context          | Minimizes mean time to recovery (MTTR) during active production outages.                               |
| 7   | Audience         | SRE teams, engineering leadership, incident commanders, and operations teams.                          |
| 8   | Success Criteria | Service restored, incident severity assigned, mitigation verified, post-mortem authored.               |
| 9   | Examples         | See Section 10.                                                                                        |

## 2. Trigger Matrix

| Trigger                                   | Fire? | Notes                                             |
| ----------------------------------------- | ----- | ------------------------------------------------- |
| "Triage production incident SEV-1"        | YES   | Primary trigger for incident response.            |
| "Handle emergency outage alert"           | YES   | Outage triage request.                            |
| "Write post-mortem for database downtime" | YES   | Post-mortem authoring request.                    |
| "Draft feature spec for user profiles"    | NO    | Product spec task. Route to `write-feature-spec`. |
| "Refactor TypeScript type declarations"   | NO    | Maintenance task. Route to refactoring.           |

## 3. Execution Workflow

### Step 1: Severity Assessment & Blast Radius Containment

- **Action:** Read the incident telemetry, error logs, and metrics. Assign an initial severity classification (SEV-1 Critical Outage, SEV-2 Major Degradation, SEV-3 Minor Issue). Isolate affected systems to contain blast radius.
- **Input:** Incident alert payload, error logs, and system topology.
- **Stop Condition:** If SEV-1 outage is active, prioritize service restoration over deep root cause analysis.
- **Validation:** Incident severity level assigned and blast radius isolated.

### Step 2: Immediate Mitigation Execution

- **Action:** Select and execute the fastest viable mitigation path:
  1. _Option A (Rollback):_ Revert to last known good deployment tag if incident was triggered by a recent release.
  2. _Option B (Traffic Shedding / Feature Flag):_ Disable failing feature flag or rate-limit failing endpoint.
  3. _Option C (Emergency Hotfix):_ Apply minimal targeted patch if root cause is immediately clear.
- **Input:** System rollback procedures, feature flag triggers, or emergency hotfix patch.
- **Stop Condition:** Require explicit confirmation before executing destructive database or deployment commands.
- **Validation:** Service health indicators return to normal parameters.

### Step 3: Mitigation Verification

- **Action:** Monitor error rate metrics, HTTP status codes (2xx/5xx ratios), and response latencies post-mitigation.
- **Input:** Monitoring logs and telemetry endpoints.
- **Stop Condition:** Confirm error rates drop below 0.1% baseline before declaring incident mitigated.
- **Validation:** Service health status green confirmed.

### Step 4: Post-Mortem Document Generation

- **Action:** Write the blameless post-mortem report to `.context/incidents/[date]-[slug]-post-mortem.md`. Detail timeline, root cause, short-term mitigations, and preventive action items.

## 4. Output Specification

```markdown
# Incident Post-Mortem: [Incident Title / SEV Level]

- **Date:** [YYYY-MM-DD]
- **Incident Lead:** [Lead Incident Responder & SRE]
- **Severity Level:** SEV-1 | SEV-2 | SEV-3
- **Outage Duration:** [N minutes]
- **Post-Mortem Path:** `.context/incidents/[date]-[slug]-post-mortem.md`

## 1. Executive Incident Summary

[Concise overview of what failed, impact on users, and resolution]

## 2. Incident Timeline (UTC)

- `14:02` - Alert triggered: HTTP 500 error rate exceeded 15% on `/api/v1/checkout`.
- `14:05` - Triage initiated. Incident classified as SEV-1.
- `14:12` - Rollback executed to deployment tag `v2.3.9`.
- `14:15` - HTTP 500 error rate dropped to 0.02%. Incident mitigated.

## 3. Root Cause Analysis (5 Whys)

1. _Why did checkout fail?_ Database connection pool exhausted.
2. _Why was pool exhausted?_ Unindexed query introduced in release `v2.4.0` caused 10s query holds.
3. _Why was query unindexed?_ Missing migration index verification in release pre-flight checklist.

## 4. Preventive Action Items

| Action Item                                     | Type       | Owner        | Target Date |
| ----------------------------------------------- | ---------- | ------------ | ----------- |
| Add migration index check to CI pre-flight gate | Prevention | SRE          | YYYY-MM-DD  |
| Add database query execution timeout cap (2s)   | Mitigation | Backend Team | YYYY-MM-DD  |
```

## 5. Validation Gate

Run before declaring completion:

- [ ] Incident severity classified (SEV-1, SEV-2, SEV-3).
- [ ] Mitigation applied and service health recovery verified.
- [ ] Timeline of events documented in UTC.
- [ ] Post-mortem report saved to `.context/incidents/[date]-[slug]-post-mortem.md`.
- [ ] Zero banned words or em dashes present in post-mortem report.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Applying a quick fix without documenting timeline, root cause, or preventive action items.
- **Over-execution threshold:** Spending hours investigating root cause while production service remains down.
- **Calibration default:** Prioritize immediate service restoration first, followed by thorough blameless post-mortem analysis.

## 7. Anti-Pattern Compliance

| Step   | Prevents AP  | Mechanism                                                              |
| ------ | ------------ | ---------------------------------------------------------------------- |
| Step 1 | AP-1, AP-28  | Focuses immediately on blast radius containment during active outage.  |
| Step 2 | AP-4, AP-45  | Requires explicit approval before running destructive commands.        |
| Step 3 | AP-3, AP-48  | Mandates metrics-driven verification of service health recovery.       |
| Step 4 | AP-26, AP-44 | Restricts output artifact strictly to `.context/incidents/` directory. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0`: Initial clean-room implementation conforming to Tier-5 Enterprise SKILL standard.

## 9. Portability Matrix

| Runtime              | Status   | Notes                                          |
| -------------------- | -------- | ---------------------------------------------- |
| Claude Code          | verified | Direct execution using workspace search tools. |
| Cursor               | verified | Fully supported via incident triage workflow.  |
| Copilot              | verified | Formatted for incident response guidance.      |
| Windsurf             | verified | Fully compatible.                              |
| Kiro                 | verified | Fully compatible.                              |
| Cline                | verified | Executed and verified in local workspace.      |
| Raw API (no tooling) | verified | Generates valid post-mortem payloads.          |

## 10. Examples

**Input:** "Triage SEV-1 incident: payment webhook returning 500 errors after latest deploy."

**Output:** Identifies deployment delta `v3.1.0`. Triggers rollback to `v3.0.9`. Verifies HTTP 500 error rate drops to 0%. Authors post-mortem report at `.context/incidents/2026-08-14-payment-webhook-outage.md`.

**Failure case:** User says "Assign blame to the junior developer who opened the PR during the incident." Refuses blame assignment, enforcing blameless post-mortem standards.

- **Input:** Incident timeline, logs, and resolution details from Steps 1–3.
- **Stop Condition:** If directory `.context/incidents/` does not exist, create it before writing.
- **Validation:** Post-mortem report saved matching Section 4 schema.
