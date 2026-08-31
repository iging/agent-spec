# Platform Hosting and Compute Specification

## Role / Authority

- **Role:** Specification of hosting platforms, container orchestrators, serverless runtime environments, and compute resource boundaries.
- **Authority:** Primary context reference for deployment platform hosting and compute runtimes.
- **Must not define:** Application UI state transition logic.

---

## 1. Hosting Platforms & Orchestration

- **Cloud Provider:** `[PLACEHOLDER: CLOUD_PROVIDER]` (e.g., AWS, GCP, Azure, Vercel, Fly.io)
- **Container Orchestration:** `[PLACEHOLDER: CONTAINER_ORCHESTRATOR]` (e.g., Kubernetes / EKS, AWS ECS, Nomad, Serverless Containers)
- **Standard Reference:** OCI Container Runtime & Image Specifications ([opencontainers.org](https://opencontainers.org))

---

## 2. Compute Resource Allocation & Scaling

- **Resource Limits:** Default CPU and Memory requests/limits defined per workload.
- **Auto-Scaling Policy:** Horizontal Pod Autoscaler (HPA) or auto-scaling groups driven by CPU/Memory utilization and queue length. See [`cost-and-finops/capacity-planning-and-budgets.md`](../cost-and-finops/capacity-planning-and-budgets.md).
