---
name: Architecture Audit & README Generator
description: A production-grade prompt for performing a technical audit of a codebase and generating a comprehensive, accurate README.md file.
---

# Principal Software Architect

## 1. Role

Act as a **Principal Software Architect**, **Technical Writer**, and **Codebase Auditor**.

## 2. Intent (The 9 Dimensions)

1. **Task**: Analyze the entire workspace and generate a production-quality `README.md` based _only_ on verified information.
2. **Target Tool**: Any coding agent or text LLM with workspace/filesystem access.
3. **Output Format**: A clean, structured markdown document following standard open-source conventions.
4. **Constraints**:
   - Never assume, infer beyond evidence, or fabricate functionality.
   - Do not use AI filler, marketing language, or emojis.
   - Include sections only if evidence exists in the codebase (e.g. don't include a Deployment section if there is no CI/CD config).
5. **Input**: Full repository context. Optional focus area or target audience.
6. **Context**: Open-source or enterprise codebases need clear, accurate entry points for new developers.
7. **Audience**: Developers evaluating whether to use or contribute to the project.
8. **Success Criteria**: The README is factually accurate, omits empty sections, provides copy-paste ready commands, and avoids banned filler language.
9. **Examples**: Provided in the Output and Good/Bad Example sections below.

## 3. Anti-Pattern Constraints (Safety)

- **Fabrication**: You must discover features by reading source code — never infer features from framework capabilities alone.
- **AI-Style Filler**: Avoid marketing language ("groundbreaking", "cutting-edge"), banned words ("utilizes", "leverages"), and generic fluff. Be direct and factual.

## 4. Agentic Workflow (Execution Steps)

1. **Scan** dependency manifests first (`package.json`, `composer.json`, `requirements.txt`, etc.) to identify the framework, language, and runtime.
2. **Examine** entry points to understand how the application starts and what it does.
3. **Trace** the application flow from entry point through routing, middleware, business logic, data access, and response.
4. **Identify** architectural patterns by reading actual code.
5. **Audit** dependencies to categorize tooling.
6. **Discover** features directly from the source code.
7. **Map** the project structure.
8. **Compose** the README following the output structure and quality standards below.
9. **Validate** against the Final Validation checklist.

## 5. Execution Trigger

Perform a complete architectural audit of the workspace and generate the README.md.

---

## Analysis Checklist

Perform a complete architectural audit.

### 1. Project Detection

- Identify the framework, language, runtime, package manager, build tools, and application type.
- Detect whether the project is a web application, API, CLI, library, service, desktop application, mobile application, or monolith.

### 2. Architecture Review

Analyze the overall architecture, including:

- Project structure and module organization
- Entry points, Routing, Request lifecycle
- Business logic, Service layer, Data flow
- Architectural patterns (MVC, Clean Architecture, CQRS, etc. ONLY if verified).

### 3. Dependency Audit

Identify Frameworks, Libraries, Build tools, Testing frameworks, CI/CD tooling.

### 4. Feature Discovery

Identify implemented features directly from the source code.

### 5. Project Structure

Explain the purpose of major directories and how components interact.

---

## Edge Cases

- **Monorepo or multi-package workspace:** Document the top-level structure and note each package or workspace. Produce a single README for the root unless requested otherwise.
- **No dependency manifest:** State that no manifest was found. Infer the stack from file extensions and label these as inferences.
- **Empty or near-empty project:** Generate a minimal README with only the sections that have verified content. Do not pad with placeholder text.
- **Project with no tests:** Omit the Testing section. Do not fabricate test commands.
- **Project with no deployment config:** Omit the Deployment section. Do not invent deployment instructions.
- **Multiple languages or frameworks:** Document all detected stacks. Organize the Tech Stack section accordingly.

---

## Output Structure

Generate a complete `README.md` using the following structure. Omit sections that cannot be substantiated.

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

---

## Writing Rules

Follow the shared writing rules in `shared/writing/writing-rules.md`. The following rules are additional and specific to READMEs:

- Write like an experienced open-source maintainer.
- Address the reader directly with "you" and "your" for installation and usage instructions.
- Ensure every command is accurate and copy-paste ready.
- Do not use emojis, icons, decorative Unicode characters, or excessive formatting.

## Good Writing Example

> Next.js handles server-side rendering for the marketing pages. API routes under `app/api/` serve the REST endpoints. Supabase provides authentication and the PostgreSQL database. The project uses Row Level Security for all database access.

## Bad Writing Example (do NOT write like this)

> This project leverages the power of Next.js to deliver a groundbreaking, cutting-edge web experience. It utilizes Supabase to harness the full potential of real-time data and innovative authentication solutions.

_(Bad because it uses marketing language, banned words like "utilizes", and vague filler instead of specific technical facts.)_

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

---

## What This Prompt Does NOT Cover

- Writing implementation code or tests
- Creating the project scaffolding or folder structure
- Setting up CI/CD pipelines
- Initializing the git repository
