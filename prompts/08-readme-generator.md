# Architecture Audit & README Generator

## Role

Act as a **Principal Software Architect**, **Technical Writer**, and **Codebase Auditor**.

## Objective

Analyze the entire workspace and generate a production-quality `README.md` based **only** on verified information from the codebase.

---

## Input

### Required

- Access to the project workspace (filesystem access to read source files, configuration, and dependency manifests).

### Optional

- A focus area or emphasis from the user (e.g., "emphasize the API documentation," "this is for open-source contributors").
- A target audience (e.g., "new hire onboarding," "open-source community," "internal team").
- Specific sections to include or exclude.

### Defaults

- If no audience is specified, write for a developer evaluating whether to use or contribute to the project.
- If no focus area is given, cover all applicable sections from the output structure below.

---

## Reasoning Steps

1. **Scan** dependency manifests first (`package.json`, `composer.json`, `requirements.txt`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `.csproj`, or equivalent) to identify the framework, language, and runtime.
2. **Examine** entry points to understand how the application starts and what it does.
3. **Trace** the application flow from entry point through routing, middleware, business logic, data access, and response.
4. **Identify** architectural patterns by reading actual code, not by guessing from the framework.
5. **Audit** dependencies to categorize frameworks, libraries, build tools, testing tools, linters, formatters, and CI/CD tooling.
6. **Discover** features by reading source code — never infer features from framework capabilities alone.
7. **Map** the project structure, documenting the purpose of each major directory and how components interact.
8. **Compose** the README following the output structure and quality standards below.

---

## Analysis

Perform a complete architectural audit.

### 1. Project Detection

- Identify the framework, language, runtime, package manager, build tools, and application type.
- Detect whether the project is a web application, API, CLI, library, service, desktop application, mobile application, or monolith.

### 2. Architecture Review

Analyze the overall architecture, including:

- Project structure and module organization
- Entry points
- Routing
- Request lifecycle
- Business logic
- Service layer
- Data flow
- API integrations
- Authentication and authorization (if present)
- Database access patterns
- Architectural patterns such as:
  - MVC
  - Clean Architecture
  - Repository Pattern
  - Dependency Injection
  - Middleware
  - Event-Driven Architecture
  - CQRS
  - Hooks
  - Queues
  - Scheduled jobs
  - Other implemented patterns

Only document patterns that are verified in the codebase.

### 3. Dependency Audit

Analyze dependency manifests. Identify:

- Frameworks
- Libraries
- Build tools
- Testing frameworks
- Linters
- Formatters
- CI/CD tooling
- Deployment tooling

### 4. Feature Discovery

Identify implemented features directly from the source code.

Never assume, infer beyond evidence, or fabricate functionality.

### 5. Project Structure

Explain:

- The purpose of major directories
- Module responsibilities
- How major components interact
- Overall application flow

---

## Edge Cases

- **Monorepo or multi-package workspace:** Document the top-level structure and note each package or workspace. Produce a single README for the root unless the user asks for per-package READMEs.
- **No dependency manifest:** State that no manifest was found. Infer the stack from file extensions and import statements, but label these as inferences.
- **Empty or near-empty project:** Generate a minimal README with only the sections that have verified content. Do not pad with placeholder text.
- **Project with no tests:** Omit the Testing section. Do not fabricate test commands.
- **Project with no deployment config:** Omit the Deployment section. Do not invent deployment instructions.
- **Multiple languages or frameworks:** Document all detected stacks. Organize the Tech Stack section accordingly.

---

## Documentation Standard

Generate documentation comparable to a mature, actively maintained GitHub repository.

Prioritize:

- Accuracy
- Clarity
- Maintainability
- Developer experience

---

## Output

Generate a complete `README.md` using the following structure. Include only sections that have verified content. Omit sections that cannot be substantiated.

```text
# Project Title

## Overview

## Features

## Tech Stack

## Architecture
- Folder Structure
- Application Flow
- Design Patterns

## Prerequisites

## Installation

## Configuration

## Running the Project

## Usage

## Development

## Testing
(include if test files, test directories, or test commands exist in the project)

## Deployment
(include if deployment config, CI/CD files, or hosting configuration exist)

## Project Structure

## Contributing
(include if CONTRIBUTING.md or contribution guidelines exist)

## License
(include if a LICENSE file exists)
```

### Section Inclusion Criteria

| Section | Include when |
|---|---|
| Testing | Test files, test directories, or test commands exist |
| Deployment | Deployment config, CI/CD files, or hosting configuration exist |
| Contributing | `CONTRIBUTING.md` or contribution guidelines exist |
| License | A `LICENSE` file exists |
| Configuration | Environment variables, config files, or setup steps are needed |

---

## Writing Rules

Follow the shared writing rules in `prompts/shared/writing-rules.md`. The following rules are additional and specific to READMEs:

- Write like an experienced open-source maintainer.
- Use precise technical terminology.
- Keep explanations brief without sacrificing clarity.
- Address the reader directly with "you" and "your" for installation and usage instructions.
- Support claims with evidence from the codebase.
- Avoid repetition.
- Avoid marketing language.
- Avoid AI-style filler.
- Avoid generic statements and unsupported claims.
- The writing rules apply to prose only. They do not change markdown structure, headings, tables, code blocks, or command syntax.

---

## Formatting

- Follow GitHub Markdown best practices.
- Do not use emojis, icons, decorative Unicode characters, or excessive formatting.
- Use headings, tables, bullet lists, and fenced code blocks where they improve readability.
- Ensure every command is accurate and copy-paste ready.
- Produce clean, readable Markdown suitable for a public GitHub repository.

---

## Good Writing Example

> Next.js handles server-side rendering for the marketing pages. API routes under `app/api/` serve the REST endpoints. Supabase provides authentication and the PostgreSQL database. The project uses Row Level Security for all database access.

## Bad Writing Example (do NOT write like this)

> This project leverages the power of Next.js to deliver a groundbreaking, cutting-edge web experience. It utilizes Supabase to harness the full potential of real-time data and innovative authentication solutions.

This is bad because it uses marketing language ("groundbreaking," "cutting-edge," "harness," "innovative"), banned words ("utilizes," "leverages"), and vague filler instead of specific technical facts.

---

## Adaptability

Detect and adapt to whatever technology stack the project uses. Document only technologies and patterns verified in the workspace. Do not enumerate frameworks you checked for — only mention what you found.

---

## Quality Standard

The generated README must be:

- Production-ready
- GitHub repository quality
- Maintainer-quality documentation
- Self-contained
- Technically accurate
- Easy for new contributors to understand
- Immediately usable without editing
- Free of placeholder content
- Free of generic AI-generated wording
- Consistent with professional open-source documentation standards

---

## Final Validation

Before returning the README, verify that:

- Every statement is supported by the codebase.
- No features or technologies have been fabricated.
- No placeholder or template text remains.
- Installation, configuration, and usage commands are accurate and copy-paste ready.
- All Markdown renders correctly on GitHub.
- Every section is relevant to the detected project.
- Sections without verified content are omitted, not padded.
- The writing is concise, natural, factual, and free of AI-style filler.
- The prose follows the shared writing rules and contains no em dashes or banned words. Code blocks, commands, and identifiers are exempt.
