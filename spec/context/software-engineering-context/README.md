# Software Engineering Context Architecture

## Role / Authority

- **Role:** Reusable, tool-agnostic software engineering context taxonomy catalog for persistent system knowledge.
- **Authority:** Tier-4 project context baseline specification for software systems.
- **Must not define:** AI agent operational behaviors or CLI runtime configuration.

---

## 1. Overview & Taxonomy Structure

This package defines a 23-domain enterprise software engineering context taxonomy. It provides persistent system knowledge templates structured with `[PLACEHOLDER: ...]` markers to be filled by engineering adopters.

### 1.1 Agent Instructions vs Project Context

- **Agent Instructions** (`AGENTS.md`, `CLAUDE.md`, `.cursor/rules/`, `GEMINI.md`): Define how the agent behaves, operational boundaries, tool policies, and output formats.
- **Project Context** (`spec/context/software-engineering-context/`): Defines what the agent needs to know about the software system, including architecture, schemas, deployment, security, and operational models.

---

## 2. 23-Domain Enterprise Context Taxonomy Index

| Domain Category              | Path                                                 | Primary Purpose                                   | Standard References                                                        |
| ---------------------------- | ---------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------- |
| **System Architecture**      | [`architecture/`](architecture/)                     | System topology, component boundaries, data flows | ISO/IEC/IEEE 42010, C4 Model ([c4model.com](https://c4model.com))          |
| **Backend Services**         | [`backend/`](backend/)                               | API contracts, service logic, validation          | OpenAPI v3.1 ([openapis.org](https://www.openapis.org)), RFC 7807          |
| **Database & Persistence**   | [`database/`](database/)                             | Data schemas, entities, transactional guarantees  | ANSI SQL, ACID/BASE models ([niso.org](https://www.niso.org))              |
| **Architecture Decisions**   | [`decisions/`](decisions/)                           | Architecture Decision Records (ADRs)              | MADR, Michael Nygard ADR Template ([adr.github.io](https://adr.github.io)) |
| **Release & Deployment**     | [`deployment/`](deployment/)                         | Release pipelines, deployment procedures          | Twelve-Factor App ([12factor.net](https://12factor.net)), DORA             |
| **Deployment Platform**      | [`deployment-platform/`](deployment-platform/)       | Host infrastructure abstractions, runtime compute | OCI Specs ([opencontainers.org](https://opencontainers.org))               |
| **Development Setup**        | [`development/`](development/)                       | Local setup, workflow, testing standards          | Martin Fowler Test Pyramid ([martinfowler.com](https://martinfowler.com))  |
| **Cloud Infrastructure**     | [`infrastructure/`](infrastructure/)                 | Cloud resources, virtual networks, IaC            | NIST SP 800-145 ([nist.gov](https://www.nist.gov))                         |
| **Observability**            | [`observability/`](observability/)                   | Metrics, structured logging, tracing              | OpenTelemetry ([opentelemetry.io](https://opentelemetry.io))               |
| **Product Roadmap**          | [`roadmap/`](roadmap/)                               | Milestones, tech debt backlog                     | Agile/Lean Roadmap Standards                                               |
| **Security & Auth**          | [`security/`](security/)                             | Auth, RBAC/ABAC, encryption, threat models        | OWASP ASVS v4.0.3 ([owasp.org](https://owasp.org)), NIST CSF v2.0          |
| **Frontend Architecture**    | [`frontend/`](frontend/)                             | UI components, design tokens, web vitals          | W3C WCAG v2.2 AA ([w3.org](https://www.w3.org/TR/WCAG22/))                 |
| **Test Strategy**            | [`testing/`](testing/)                               | Test pyramid, automated test suites, test data    | Martin Fowler Test Pyramid ([martinfowler.com](https://martinfowler.com))  |
| **Quality & Compliance**     | [`quality-and-compliance/`](quality-and-compliance/) | Code linting, static analysis, audit trails       | ISO/IEC 27001 ([iso.org](https://www.iso.org))                             |
| **Third-Party Integrations** | [`integrations/`](integrations/)                     | SaaS APIs, webhooks, streaming contracts          | CloudEvents v1.0.2 ([cloudevents.io](https://cloudevents.io))              |
| **Data Engineering**         | [`data-engineering/`](data-engineering/)             | ETL/ELT pipelines, analytical warehouses          | OpenLineage ([openlineage.io](https://openlineage.io))                     |
| **Performance & CDN**        | [`performance/`](performance/)                       | Caching strategy, CDN edge, load testing          | W3C Navigation Timing ([w3.org](https://www.w3.org))                       |
| **Mobile Architecture**      | [`mobile/`](mobile/)                                 | Native/hybrid app structure, offline sync         | Apple HIG & Android Architecture Standards                                 |
| **AI & Machine Learning**    | [`ai-and-ml/`](ai-and-ml/)                           | LLM gateway routing, vector storage, RAG          | W3C AI & JSON Schema Standards                                             |
| **Developer Experience**     | [`developer-experience/`](developer-experience/)     | Monorepo layout, build graphs, IDP portals        | CNCF Developer Portal Framework                                            |
| **Disaster Recovery**        | [`disaster-recovery/`](disaster-recovery/)           | RTO/RPO targets, regional failover                | NIST SP 800-34 Rev. 1 ([nist.gov](https://www.nist.gov))                   |
| **Cost & FinOps**            | [`cost-and-finops/`](cost-and-finops/)               | Resource tagging taxonomy, cost allocation        | FinOps Foundation Standards ([finops.org](https://www.finops.org))         |
| **Governance & Policy**      | [`governance-and-policy/`](governance-and-policy/)   | CODEOWNERS rules, PR review gates                 | NIST SP 800-161 Rev. 1 ([nist.gov](https://www.nist.gov))                  |

---

## 3. Adoption & Integration Protocol

1. Copy `spec/context/software-engineering-context/` into your repository.
2. Select relevant domain directories required for your system boundaries.
3. Replace all `[PLACEHOLDER: ...]` markers with verified system facts.
4. Bind domain context files into your agent runtime tools and instructions.
