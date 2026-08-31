---
name: Infrastructure as Code & Cloud Principles
description: Framework-agnostic baseline standard for declarative Infrastructure as Code (IaC), immutable infrastructure, cloud resource isolation, least-privilege identity access, cost optimization, and multi-region resilience.
---

# Infrastructure as Code & Cloud Principles

> **Purpose:** Baseline infrastructure engineering rules. Reference this file when defining Terraform, OpenTofu, Pulumi, CloudFormation, or cloud infrastructure configurations.

---

## Role / Authority

- **Role:** Framework-agnostic baseline standard for Infrastructure as Code (IaC), cloud network topology, security perimeters, state management, and resource governance.
- **Authority:** Tier-3 shared engineering specification applicable across cloud providers, container orchestration clusters, and infrastructure automation tools.
- **Must not define:** Application-level routing frameworks or database schema normalization rules.

---

## 1. Declarative Infrastructure as Code

- Store all infrastructure configurations in version-controlled repositories using declarative IaC tools (Terraform, OpenTofu, Pulumi, or AWS CloudFormation).
- Maintain strict remote state isolation: use dedicated state buckets per environment (development, staging, production) with state locking enabled.
- Parameterize environments cleanly using workspace variables or environment-specific config files; never hardcode environment specifics in reusable modules.
- Structure IaC repositories into modular, single-responsibility modules with explicit input variables and output definitions.
- Enforce automated plan validation (`terraform plan`, `pumi preview`) in CI pipelines prior to merging infrastructure changes.

---

## 2. Least-Privilege Identity and Access Management

- Grant cloud IAM permissions according to the principle of least privilege; never attach full admin policies (`*:*`) to compute workloads or user identities.
- Utilize short-lived dynamic credentials and workload identity federation (OIDC) for CI/CD runners instead of static IAM user access keys.
- Assign dedicated service accounts or IAM roles per microservice or workload component; isolate permissions by domain responsibility.
- Enforce multi-factor authentication (MFA) and strict IP/device access policies for all human administrative identities.

---

## 3. Network Segmentation and Traffic Controls

- Deploy workload resources within private Virtual Private Clouds (VPCs) or Virtual Networks (VNets) with isolated subnets across multiple Availability Zones.
- Keep compute workloads, data stores, and internal services inside private subnets without public IP addresses assigned.
- Ingress traffic must pass through dedicated load balancers or API gateways in public subnets with Web Application Firewall (WAF) filtering enabled.
- Restrict egress traffic using NAT Gateways and explicit egress security group rules to prevent unauthorized external network egress.
- Enforce microsegmentation between application tiers using security group rules or Kubernetes NetworkPolicies.

---

## 4. Immutable Infrastructure and Artifact Lifecycle

- Provision server instances and container nodes using pre-baked, immutable artifacts (AMI images built with Packer, container images built with Docker).
- Never modify running instances or live cluster nodes via manual SSH, RDP, or dynamic inline scripts in production.
- Sign and scan all container images and machine artifacts for vulnerabilities before deployment into cluster environments.
- Enforce lifecycle rules on artifact registries (ECR, Artifact Registry) to clean up untagged images and maintain version control.

---

## 5. High Availability and Cross-Region Resilience

- Distribute compute tasks across at least two Availability Zones within a region to withstand localized zone failures.
- Implement automated health checks and auto-scaling groups configured with target tracking metrics (CPU, memory, latency).
- Design stateless application tiers to allow seamless node replacement without data loss or active user session teardown.
- Maintain automated multi-region backup replication for critical data stores with defined Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO).

---

## 6. Resource Tagging, Cost Control, and Governance

- Apply consistent mandatory metadata tags across all cloud resources: `Environment`, `Owner`, `Service`, `CostCenter`, and `ManagedBy`.
- Define automated budget alerts and anomaly detection rules to catch unexpected resource consumption spikes.
- Enforce auto-shutdown policies for non-production environments during off-peak hours to eliminate idle compute costs.
- Terminate unattached storage volumes, obsolete snapshots, and orphaned elastic IP addresses automatically via governance policies.
