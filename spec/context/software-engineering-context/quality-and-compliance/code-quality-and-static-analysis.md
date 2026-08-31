# Code Quality and Static Analysis Specification

## Role / Authority

- **Role:** Standards for code linting, static analysis tooling, formatting enforcement, and architectural rule compliance.
- **Authority:** Primary context reference for static code quality enforcement.
- **Must not define:** Runtime error boundary handling or production infrastructure telemetry.

---

## 1. Static Analysis & Linters

- **Primary Code Linter:** `[PLACEHOLDER: PRIMARY_LINTER]` (e.g., ESLint, Ruff, Biome, SonarQube)
- **Code Formatter:** `[PLACEHOLDER: CODE_FORMATTER]` (e.g., Prettier, Black, Rustfmt)
- **Type Checker:** `[PLACEHOLDER: TYPE_CHECKER]` (e.g., TypeScript strict mode, MyPy, Dialyzer)

---

## 2. Quality Rules & Architectural Boundaries

- **Strict Type Discipline:** Implicit `any` types and unhandled type coercions prohibited.
- **Complexity Metrics:** Maximum cyclomatic complexity per function capped at `[PLACEHOLDER: MAX_CYCLOMATIC_COMPLEXITY]` (e.g., 10).
- **Import Dependency Rules:** Layered boundary enforcement (e.g., UI components cannot import database ORM models directly).

---

## 3. Pre-Commit & Automation Rules

- **Git Hook Framework:** `[PLACEHOLDER: GIT_HOOK_FRAMEWORK]` (e.g., Husky, pre-commit)
- **Automated Actions:** Formatting checks, linting passes, and secret scanning executed prior to commit creation.
