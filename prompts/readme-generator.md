# Architecture Audit & README Generator

## Role

Act as a **Senior Software Architect**, **Technical Writer**, and **Codebase Auditor**.

## Objective

Analyze the entire workspace and generate a production-quality `README.md` based **only** on verified information from the codebase.

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

Analyze dependency manifests such as:

- `package.json`
- `composer.json`
- `requirements.txt`
- `pyproject.toml`
- `go.mod`
- `Cargo.toml`
- `.csproj`
- equivalent project manifests

Identify:

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

## Documentation Standard

Generate documentation comparable to a mature, actively maintained GitHub repository.

Prioritize:

- Accuracy
- Clarity
- Maintainability
- Developer experience

---

## Output

Generate a complete `README.md` using the following structure.

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

## Testing (if applicable)

## Deployment (if applicable)

## Project Structure

## Contributing (only if applicable)

## License (only if present)
```

---

## Requirements

### Accuracy

- Base every statement on verifiable evidence from the workspace.
- Never fabricate features, technologies, architecture, commands, configuration, or implementation details.
- Omit any section that cannot be verified.

### Writing Style

The rules below apply to prose only. They do not change markdown structure, headings, tables, code blocks, or command syntax.

- Write like an experienced open-source maintainer.
- Use clear, simple language.
- Be spartan and informative.
- Use short, impactful sentences.
- Use active voice. Avoid passive voice.
- Focus on practical, actionable guidance.
- Use precise technical terminology.
- Keep explanations brief without sacrificing clarity.
- Address the reader directly with "you" and "your" for installation and usage instructions.
- Support claims with evidence from the codebase.
- Avoid repetition.
- Avoid marketing language.
- Avoid AI-style filler.
- Avoid generic statements and unsupported claims.
- Avoid em dashes in prose. Use commas or periods. To connect ideas, use a period.
- Avoid constructions like "not just this, but also this".
- Avoid metaphors and cliches.
- Avoid setup phrases such as "in conclusion" or "in closing".
- Avoid unnecessary adjectives and adverbs.

### Banned Words In Prose

Do not use these words in prose. This list does not apply to code, commands, dependency names, or technical identifiers.

- really, literally, actually, basically, delve, embark, esteemed, shed light, craft, crafting, imagine, remarkable, glimpse, unlock, discover, skyrocket, innovative, revolutionary, disruptive, utilize, utilizing, illuminate, unveil, pivotal, intricate, elucidate, paradigm, harness, exciting, groundbreaking, powerful, exploration, testament, in summary, in conclusion, most importantly.

### Formatting

- Follow GitHub Markdown best practices.
- Do not use emojis, icons, decorative Unicode characters, or excessive formatting.
- Use headings, tables, bullet lists, and fenced code blocks where they improve readability.
- Ensure every command is accurate and copy-paste ready.
- Produce clean, readable Markdown suitable for a public GitHub repository.

### Adaptability

- Automatically adapt to the detected technology stack.
- Support modern ecosystems including PHP, Laravel, Symfony, React, Vue, Angular, Next.js, Node.js, Express, NestJS, Python, Django, Flask, FastAPI, Go, Java, .NET, Rust, Ruby, and others.
- Document only technologies and patterns verified in the workspace.

### Quality Standard

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
- Installation, configuration, and usage commands are accurate.
- All Markdown renders correctly on GitHub.
- Every section is relevant to the detected project.
- The writing is concise, natural, factual, and free of AI-style filler.
- The prose follows the Writing Style rules and contains no em dashes or banned words. Code blocks, commands, and identifiers are exempt.
