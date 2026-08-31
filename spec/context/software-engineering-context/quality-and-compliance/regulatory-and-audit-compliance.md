# Regulatory and Audit Compliance Specification

## Role / Authority

- **Role:** Definition of regulatory compliance frameworks, audit log standards, data privacy obligations, and compliance verification models.
- **Authority:** Primary context reference for regulatory compliance and audit logging rules.
- **Must not define:** Individual code function definitions or local IDE editor extensions.

---

## 1. Governance & Regulatory Frameworks

- **Applicable Frameworks:** `[PLACEHOLDER: REGULATORY_FRAMEWORKS]` (e.g., SOC 2 Type II, ISO/IEC 27001, GDPR, HIPAA, PCI-DSS)
- **Standard Citation:** ISO/IEC 27001 Information Security Management ([iso.org](https://www.iso.org/isoiec-27001-information-security.html))
- **Data Residency Rules:** `[PLACEHOLDER: DATA_RESIDENCY_RULES]` (e.g., EU data stored within EU regions)

---

## 2. Audit Trail & Log Compliance

- **Immutable Audit Logging:** All administrative actions and sensitive data mutations recorded to tamper-evident audit storage.
- **Audit Log Fields:** Timestamp (ISO 8601), actor ID, IP address, resource ID, action type, and status code.
- **Retention Period:** `[PLACEHOLDER: AUDIT_LOG_RETENTION]` (e.g., 365 days)

---

## 3. Data Privacy & Subject Rights

- **Right to Erasure (GDPR):** Automated workflows to purge or anonymize personal data upon request.
- **Data Minimization:** Collection restricted exclusively to attributes required for business operation.
- **Security Baseline:** See [`security/auth-and-data-protection.md`](../security/auth-and-data-protection.md).
