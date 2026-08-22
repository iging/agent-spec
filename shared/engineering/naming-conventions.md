---
name: Naming Conventions
description: Casing rules and clarity principles for files, folders, components, hooks, functions, and identifiers in TypeScript and React codebases.
---

# Naming Conventions

> **Purpose:** One naming system for every identifier an agent or developer writes in this codebase. Reference this file when generating files, components, functions, or variables so names stay predictable and searchable across the project.

---

## 1. Casing and Structure Rules

- **Files and Folders:** Use lowercase `kebab-case` for all files and directories (for example `theme-provider.tsx`, `auth-wizard/`).
- **React Components:** Use `PascalCase` for component declarations and JSX tags (for example `ThemeProvider`, `ProjectCard`). React requires this at the language level: lowercase names in JSX are treated as HTML tags and a component named `profile()` will not work (react.dev, "Your First Component").
- **Variables and Functions:** Use `camelCase` for general variables, object keys, and utility functions (for example `userSession`, `calculateTotal`).
- **Custom Hooks:** Prefix with `use` plus a capital letter (for example `useTheme`, `useMediaQuery`, `useUser`). React's rules of hooks require this prefix so tooling can verify hook calls happen only inside components or other hooks.
- **Event Handlers:** Prefix with `handle` plus a description of the triggered action (for example `handleClick`, `handleSubmit`, `handleSelect`).
- **Global Constants:** Use `UPPER_SNAKE_CASE` for immutable module-level constants (for example `MAX_POSTS_PER_PAGE`, `API_BASE_URL`).
- **Boolean Variables and Props:** Prefix with the auxiliary verbs `is`, `has`, `can`, or `should` (for example `isLoading`, `hasError`, `canSubmit`, `shouldRender`).
- **React Context:** Suffix with `Context` on a `PascalCase` base (for example `ThemeContext`, `AuthContext`).
- **Context Providers:** Suffix with `Provider` on a `PascalCase` base (for example `ThemeProvider`, `AuthProvider`).
- **React Refs:** Suffix with `Ref` on a `camelCase` base (for example `containerRef`, `inputRef`, `buttonRef`).

---

## 2. Naming Clarity Principles

- **Reveal Intent:** A name must answer why it exists, what it does, and how it is used. If a comment fulfills this role, rename the symbol instead.
- **Avoid Disinformation:** Never call a `Map` a `list`. Never let two names differ only through visually ambiguous characters (for example `userData` vs `userDate`, lowercase `l` vs `1`).
- **Make Meaningful Distinctions:** Two different names imply two different responsibilities. Generic suffixes like `Manager`, `Handler`, or `Data` add noise. Name the actual role instead.
- **Keep Names Pronounceable and Searchable:** Broadly scoped identifiers must read aloud cleanly and grep cleanly. Single letters and magic numbers are allowed only as short-scoped loop locals.
- **Skip Type Encodings:** Do not prefix names with type identifiers (`strName`, `iCount`). The type system surfaces types automatically.
- **Avoid Mental Mapping:** Do not force readers to memorize abbreviation tables (`t`, `tx`, `u`). Spell out full concepts (`transaction`, `user`).
