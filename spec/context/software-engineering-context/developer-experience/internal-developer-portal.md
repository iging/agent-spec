# Internal Developer Portal Specification

## Role / Authority

- **Role:** Definition of internal developer platform (IDP) tooling, developer documentation portals, service catalogs, and engineering onboarding workflows.
- **Authority:** Primary context reference for developer experience and service catalog standards.
- **Must not define:** Production database schema indexes or client CSS stylesheets.

---

## 1. Service Catalog & System Registry

- **Developer Portal Platform:** `[PLACEHOLDER: DEVELOPER_PORTAL_PLATFORM]` (e.g., Backstage, Port, Cortex, Compass)
- **Service Metadata Format:** `catalog-info.yaml` entity definitions registered for all domain microservices and repositories.
- **Software Templates:** Scaffolding templates provided for generating compliant new microservices or frontend applications.

---

## 2. Developer Documentation Engine

- **Documentation Framework:** `[PLACEHOLDER: DOCS_FRAMEWORK]` (e.g., TechDocs, Docusaurus, MkDocs)
- **Docs-like-Code Model:** Technical documentation co-located with source code in markdown files and published via automated CI pipelines.
- **API Documentation Portal:** Interactive Swagger/OpenAPI documentation auto-generated from code definitions. See [`backend/api-design-and-contracts.md`](../backend/api-design-and-contracts.md).

---

## 3. Onboarding & Environment Parity

- **Containerized Dev Envs:** `[PLACEHOLDER: DEV_CONTAINER_ENGINE]` (e.g., Devcontainers, GitHub Codespaces, Gitpod)
- **Onboarding SLA:** New developers able to bootstrap local development environments within 30 minutes.
