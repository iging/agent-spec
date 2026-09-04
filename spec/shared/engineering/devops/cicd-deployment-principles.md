---
name: CI/CD & Deployment Principles
description: Framework-agnostic baseline standard for continuous integration pipelines, automated deployment strategies (blue/green, canary), rollback safety, artifact versioning, and build security.
---

# CI/CD & Deployment Principles

> **Purpose:** Baseline deployment pipeline engineering rules. Reference this file when authoring GitHub Actions, GitLab CI, CircleCI, Tekton, ArgoCD, or deployment scripts.

---

## Role / Authority

- **Role:** Framework-agnostic baseline standard for Continuous Integration pipelines, artifact verification, deployment automation, deployment strategies, and rollback mechanisms.
- **Authority:** Tier-3 shared engineering specification applicable across deployment systems, CI platforms, and container release pipelines.
- **Must not define:** Source code branch naming rules or application framework routing.

---

## 1. Pipeline Automation and Fast-Feedback Loops

- Automate build, lint, type-check, and unit test execution on every pull request or commit push.
- Keep CI feedback loops under 10 minutes by parallelizing test runs, caching dependencies, and isolating long-running integration tests.
- Fail pipeline runs fast: execute syntax verification and fast static analysis before launching expensive build steps.
- Require branch protection rules mandating green CI pipeline runs prior to pull request merges into main branches.

---

## 2. Build Security and Supply Chain Protection

- Pin all pipeline actions, dependencies, and base container images to immutable git commits or SHA256 image digests.
- Inject secrets into pipeline environments dynamically at runtime using secure secret managers; never hardcode secrets in repository files.
- Run automated Software Bill of Materials (SBOM) generation and static vulnerability scanning (SAST, dependency audit) on every build artifact.
- Execute CI builds in isolated, ephemeral environments that tear down completely after execution.

---

## 3. Artifact Versioning and Release Promotion

- Build deployment artifacts (Docker containers, binaries, static assets) once per git commit and promote the identical artifact across environments.
- Enforce Semantic Versioning (SemVer) or deterministic commit SHA tags for all build artifacts; never deploy unversioned or `latest` tags to production.
- Store build artifacts in immutable artifact registries with retention policies matching compliance requirements.
- Verify cryptographic signatures (Cosign, Sigstore) on build artifacts prior to executing production deployments.

---

## 4. Zero-Downtime Deployment Strategies

- Deploy applications using zero-downtime strategies: Blue/Green deployment or progressive Canary releases.
- Ensure new container instances or server processes achieve healthy status via readiness probes before cutting over live traffic.
- Maintain application backward compatibility: ensure database schema changes are non-breaking before deploying new application versions.
- Drain in-flight HTTP connections gracefully during pod or server termination (graceful shutdown hooks).

---

## 5. Automated Rollback Mechanisms and Health Gates

- Configure automated post-deployment health checks measuring latency, HTTP 5xx error rates, and pod restart counts.
- Trigger automatic deployment rollbacks immediately when health gates fail during canary or cutover phases.
- Ensure rollback paths require no manual code modifications: reverting a deployment must consist of redeploying the previous stable artifact tag.
- Decouple code deployment from feature exposure using feature flags to enable instant feature toggling without redeploying code.

---

## 6. Environment Parity and Configuration Management

- Maintain high parity between staging and production environments in network setup, database engine versions, and container runtimes.
- Externalize configuration via environment variables or central configuration stores following Twelve-Factor App methodology.
- Validate configuration schemas at application startup; abort process initialization if required environment variables are missing or malformed.
