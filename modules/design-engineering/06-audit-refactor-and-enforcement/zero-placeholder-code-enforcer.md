---
name: zero-placeholder-code-enforcer
description: >-
  Anti-truncation protocol enforcing complete production code outputs without placeholder comments.
version: 1.0.0
verified-on: [claude-code, cursor, copilot, windsurf, kiro, cline, raw-api]
---

# Full Output Code Enforcement Protocol

## 0. Identity

- **Role:** Code Completeness & Anti-Truncation Enforcement Specialist.
- **Authority:** Enforces zero code truncation and zero lazy placeholder comments in model outputs.
- **Must not define:** Visual aesthetic choices or component color themes, enforces output completeness.
- **Normative base:** `core/decision-framework.md`, `shared/engineering/typescript-standards.md`, `shared/engineering/naming-conventions.md`, `shared/engineering/design-principles.md`, `shared/engineering/function-design.md`, `shared/engineering/module-organization.md`, `shared/writing/writing-rules.md`, `docs/anti-patterns.md`.
- **Anti-pattern gate:** Blocks AP-1, AP-4, AP-18, AP-26, AP-28, AP-44, and AP-45.

## 1. Intent (9 Dimensions)

| # | Dimension | Value |
|---|-----------|-------|
| 1 | Task | Block model output truncation and replace all placeholders with functional code. |
| 2 | Target Tool | Any agent runtime: Claude Code, Cursor, Copilot, Windsurf, Kiro, Cline, or raw API. |
| 3 | Output Format | 100% complete, fully implemented production code files. |
| 4 | Constraints | Prohibit comments like `// ... rest of code stays the same` or `/* insert styles */`. Zero em-dashes. |
| 5 | Input | Any code generation prompt, component request, or refactoring task. |
| 6 | Context | Prevents broken builds caused by agents omitting unchanged or long code blocks. |
| 7 | Audience | Developers receiving agent code outputs. |
| 8 | Success Criteria | Code file contains zero placeholder comments and compiles without missing symbols. |
| 9 | Examples | See Section 10. |

## 2. Trigger Matrix

| Trigger | Fire? | Notes |
|---------|-------|-------|
| Production file generation or multi-component refactoring | YES | Core trigger. |
| Code review or audit task | YES | Core trigger. |
| One-line configuration value answer | NO | Not needed for single values. |
| Direct user question without code | NO | Out of scope. |

## 3. Execution Workflow

### Step 1: Pre-Output Completeness Scan

- **Action:** Intercept code generation stream. Scan for truncation flags (`// TODO: implement`, `// ...`).
- **Input:** Model output text.
- **Stop Condition:** Halt output immediately if placeholder comment is detected.
- **Validation:** Zero placeholder comments detected.

### Step 2: Full Syntax Expansion

- **Action:** Expand all imports, component states, JSX elements, utility classes, and exports completely.
- **Input:** Target file specification.
- **Stop Condition:** Halt if file length exceeds runtime payload cap, split into modular files instead.
- **Validation:** Every component branch is fully written out.

### Step 3: Compilation Verification

- **Action:** Verify output code compiles cleanly without undefined variable references.
- **Input:** Expanded code block.
- **Stop Condition:** Halt if syntax error or unclosed brace exists.
- **Validation:** Validated against language parser.

## 4. Output Specification

```tsx
// BANNED OUTPUT:
// export function Navigation() { return <nav>/* ... rest of nav items */</nav>; }

// MANDATORY FULL OUTPUT:
export function Navigation() {
  return (
    <nav className="w-full h-16 border-b border-neutral-200 px-6 flex items-center justify-between">
      <div className="font-bold text-lg">Brand</div>
      <ul className="flex space-x-6 text-sm text-neutral-600">
        <li><a href="#features" className="hover:text-black">Features</a></li>
        <li><a href="#pricing" className="hover:text-black">Pricing</a></li>
        <li><a href="#about" className="hover:text-black">About</a></li>
      </ul>
    </nav>
  );
}
```

## 5. Validation Gate

- [ ] Zero `// ... rest of code` placeholder comments present in output.
- [ ] Every function, hook, state, and return block written in full.
- [ ] Output compiles without syntax or symbol reference errors.

## 6. Anti-Triggers and Calibration

- **Under-execution threshold:** Leaving placeholder comments in large 500-line files.
- **Over-execution threshold:** Splitting small 10-line utilities into 5 separate files needlessly.
- **Calibration default:** Mandatory across all code generation tasks.

## 7. Anti-Pattern Compliance

| Step | Prevents AP | Mechanism |
|------|-------------|-----------|
| 1 | AP-18 (unstructured output) | Scans for lazy placeholder comments. |
| 2 | AP-28 (untested code) | Expands full code blocks so they can be parsed and tested. |
| 3 | AP-9 (no verification) | Runs parser check to ensure syntax completeness. |

## 8. Versioning & Changelog

- **Version:** 1.0.0
- **Changelog:**
  - `1.0.0` : Enterprise standard Tier-5 creation derived from output-skill.

## 9. Portability Matrix

| Runtime | Status | Notes |
|---------|--------|-------|
| Claude Code | verified | Enforces non-truncated outputs. |
| Cursor | verified | In-line full output mode. |
| Copilot | verified | Complete output generation. |
| Windsurf | verified | Cascade full file writing. |
| Kiro | verified | Code completion runner. |
| Cline | verified | System prompt completeness rule. |
| Raw API | verified | Model-agnostic output validator. |

## 10. Examples

**Input:** "Write the complete React navigation component."
**Output:** Full 30-line navigation component written with zero omitted sections or placeholders.
