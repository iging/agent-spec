# Infrastructure Architecture Specification

## Role / Authority

- **Role:** Specification of cloud infrastructure design, Infrastructure-as-Code (IaC) tooling, cloud providers, and environment isolation.
- **Authority:** Primary context reference for cloud infrastructure architecture.
- **Must not define:** Frontend React component prop interfaces.

---

## 1. Cloud Provider & IaC Frameworks

- **Primary Cloud Provider:** `[PLACEHOLDER: CLOUD_PROVIDER]` (e.g., AWS, GCP, Azure)
- **IaC Framework:** `[PLACEHOLDER: IAC_FRAMEWORK]` (e.g., Terraform, Pulumi, OpenTofu, AWS CDK)
- **Standard Reference:** NIST SP 800-145 Cloud Computing Definition ([nist.gov](https://csrc.nist.gov/publications/detail/sp/800-145/final))

---

## 2. Environment Isolation & Provisioning

- **State Management:** Remote encrypted S3/GCS state backends with state locking enabled.
- **Environment Isolation:** Separate cloud accounts or projects for `development`, `staging`, and `production`.
