# Open Governance & Community Charter

## 1. Overview

`agent-spec` is an open specification and skill framework for configuring AI coding agents across multiple IDE platforms (Claude Code, Cursor, Cline, Copilot, Windsurf, Kiro). This charter governs standard changes, specification RFCs, and skill registration.

## 2. Decision Making Model

All normative updates to `spec/core/`, `schemas/`, or `spec/skills/` follow an open RFC process:

1. **Proposal:** Submit an RFC pull request under `spec/docs/rfcs/`.
2. **Review Period:** 7 days open community comment period.
3. **Approval:** Requires approval from at least two core maintainers.

## 3. Roles and Responsibilities

- **Contributors:** Anyone who submits issue reports, pull requests, or skill extensions.
- **Maintainers:** Review pull requests, triage issues, maintain JSON schemas, and publish release versions to npm and Docker Hub / GHCR.

## 4. Specification Integrity

All new skills added to `spec/skills/` MUST satisfy the Tier-5 Enterprise Skill Standard defined in `spec/docs/skill-standard.md` and pass `npx agent-spec audit` before merging.
