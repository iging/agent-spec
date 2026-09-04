---
name: Incident Response & Postmortem Principles
description: Framework-agnostic baseline standard for production incident triage, severity classification, communication protocols, mitigation strategies, blameless postmortems, and preventative action tracking.
---

# Incident Response & Postmortem Principles

> **Purpose:** Baseline incident response and postmortem rules. Reference this file when declaring incidents, managing production outages, authoring incident runbooks, or writing blameless postmortems.

---

## Role / Authority

- **Role:** Framework-agnostic baseline standard for operational incident response workflows, incident severity classification, incident command procedures, blameless postmortem analysis, and reliability remediation.
- **Authority:** Tier-3 shared engineering specification applicable across production engineering teams, operations centers, and site reliability organization practices.
- **Must not define:** Third-party on-call scheduling platform vendor APIs or customer service level agreements (SLAs).

---

## 1. Incident Severity Classification and Triage

- Define clear incident severity levels based on business impact: SEV-1 (Critical: total system outage or severe data loss), SEV-2 (Major: core functionality broken for large user subset), SEV-3 (Minor: localized non-critical issue with workaround).
- Establish low-friction incident declaration paths: any engineer or operator must be empowered to declare an incident immediately upon detecting production anomaly.
- Prioritize rapid triage: assess customer impact, data integrity risk, and system blast radius within 5 minutes of incident declaration.

---

## 2. Roles, Incident Command, and Communication Protocols

- Designate explicit operational roles during an active incident: Incident Commander (leads response and decision-making), Communications Lead (manages stakeholder updates), and Operations Lead (coordinates technical investigation).
- Establish a single dedicated communication channel (incident Slack channel or bridge) for all real-time incident coordination.
- Maintain regular stakeholder status updates: publish internal and status-page updates at fixed intervals (every 15 minutes for SEV-1, every 30 minutes for SEV-2).

---

## 3. Mitigation-First Incident Stabilization

- Prioritize rapid service restoration and mitigation over root cause identification during active outages.
- Execute fast stabilization moves: roll back recent deployments, disable non-critical features via feature flags, scale up compute capacity, or activate circuit breakers.
- Preserve operational evidence: capture log snapshots, metric graphs, and heap dumps before restarting services or recycling nodes.

---

## 4. Operational Runbooks and Diagnostic Playbooks

- Maintain actionable operational runbooks for all core services, high-priority alerts, and critical failure modes.
- Structure runbooks deterministically: symptom description, verification commands, diagnostic checks, immediate mitigation steps, and escalation points.
- Test runbooks routinely through chaos engineering exercises or operational game-day simulations to ensure accuracy.

---

## 5. Blameless Postmortems and Root Cause Analysis

- Conduct blameless postmortems for all SEV-1 and SEV-2 incidents within 48 hours of resolution.
- Focus postmortems on systemic process and technical vulnerabilities rather than human error; ask how systems failed to prevent or catch the mistake.
- Apply the 5 Whys methodology to identify deep systemic root causes beyond immediate triggering events.
- Document accurate timeline of events: trigger time, detection time, triage time, mitigation time, and full resolution time.

---

## 6. Action Item Tracking and Reliability Prevention

- Generate explicit, actionable preventive items from postmortem analysis; prioritize items by risk impact and implementation complexity.
- Assign clear engineering owners and completion deadlines to every postmortem action item.
- Review open postmortem action items in engineering leadership meetings to ensure items are completed before launching new features.
