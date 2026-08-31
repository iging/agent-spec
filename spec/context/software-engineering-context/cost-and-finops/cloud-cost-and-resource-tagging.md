# Cloud Cost and Resource Tagging Specification

## Role / Authority

- **Role:** Specification of FinOps cost management policies, infrastructure resource tagging taxonomy, cost allocation models, and waste reduction strategies.
- **Authority:** Primary context reference for cloud cost engineering and FinOps compliance.
- **Must not define:** Application code syntax conventions or client state management libraries.

---

## 1. Resource Tagging Taxonomy

Standard Reference: FinOps Foundation Tagging and Labeling Best Practices ([finops.org](https://www.finops.org))

All cloud infrastructure resources must mandate the following tags:

- `Environment`: `[PLACEHOLDER: TAG_ENV]` (e.g., `production`, `staging`, `development`)
- `Owner`: `[PLACEHOLDER: TAG_OWNER]` (e.g., `team-platform`, `team-data`)
- `Service`: `[PLACEHOLDER: TAG_SERVICE]` (e.g., `user-api`, `billing-engine`)
- `CostCenter`: `[PLACEHOLDER: TAG_COST_CENTER]` (e.g., `cc-1042`)

---

## 2. Infrastructure Cost Allocation & Rightsizing

- **Untagged Resource Policy:** Untagged non-production resources automatically flagged and terminated after `[PLACEHOLDER: UNTAGGED_GRACE_PERIOD]` (e.g., 48 hours).
- **Compute Rightsizing:** Auto-scaling groups and container CPU/Memory limits tuned based on usage metrics.
- **Reserved / Savings Plans:** Production baseline workloads backed by 1-year or 3-year commitment plans.

---

## 3. Anomaly Detection & Telemetry

- **Cost Anomaly Alerts:** Automated notification triggers on sudden > 20% daily spend spikes per service.
- **Cost Dashboard:** Live cost dashboards integrated into observability platforms. See [`observability/telemetry-and-signals.md`](../observability/telemetry-and-signals.md).
