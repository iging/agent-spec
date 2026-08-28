---
name: Naming Conventions
description: Unified multi-language casing rules, framework conventions (React, Vue, Node.js, PHP, Python, Go), API contracts, database identifiers, and clarity principles.
---

# Naming Conventions

> **Purpose:** One universal naming specification for every identifier an agent or developer writes across all languages and layers (TypeScript, React, PHP, Python, Go, SQL, REST/GraphQL, HTML/CSS). Reference this file when generating or reviewing code to ensure predictable, searchable names across any tech stack.

---

## 1. Universal Casing and Structure Standards (Language-Agnostic)

These fundamental rules apply across every programming language and technology stack:

- **Files and Folders:** Use lowercase `kebab-case` for all source files, directories, and assets (for example `theme-provider.tsx`, `auth-wizard/`, `user-service.php`).
- **Variables and Functions:** Use language-idiomatic casing (`camelCase` in JS/TS/PHP/Go; `snake_case` in Python/Rust/SQL) for local variables, parameters, utility functions, and class methods (for example `userSession`, `calculateTotal`).
- **Global Constants:** Use `UPPER_SNAKE_CASE` across all languages for immutable module-level constants (for example `MAX_POSTS_PER_PAGE`, `API_BASE_URL`).
- **Boolean Variables and Props:** Prefix with auxiliary verbs `is`, `has`, `can`, or `should` regardless of casing convention (for example `isLoading` / `is_loading`, `hasError` / `has_error`, `canSubmit` / `can_submit`, `shouldRender` / `should_render`).

---

## 2. Frontend and UI Layer (React, Vue, Svelte, Mobile, HTML/CSS)

- **React & UI Components:** Use `PascalCase` for component declarations and JSX/template tags (for example `ThemeProvider`, `ProjectCard`). React requires this at the language level: lowercase names in JSX are treated as HTML tags.
- **Custom Hooks / Composables:** Prefix with `use` plus a capital letter (for example `useTheme`, `useMediaQuery`, `useUser`). React's rules of hooks require this prefix so tooling can verify hook calls happen only inside components or other hooks.
- **Event Handlers:** Prefix with `handle` plus a description of the triggered action for internal event handlers (`handleClick`, `handleSubmit`, `handleSelect`), and `on` for component event props (`onClick`, `onSubmit`, `onSelect`).
- **React Context:** Suffix with `Context` on a `PascalCase` base (for example `ThemeContext`, `AuthContext`).
- **Context Providers:** Suffix with `Provider` on a `PascalCase` base (for example `ThemeProvider`, `AuthProvider`).
- **React Refs:** Suffix with `Ref` on a `camelCase` base (for example `containerRef`, `inputRef`, `buttonRef`).
- **CSS Classes and Design Tokens:** Use lowercase `kebab-case` or BEM methodology for CSS classes (`.btn-primary`, `.card__header--active`) and CSS custom properties (`--color-bg-primary`).

---

## 3. Backend and Systems Layer (TypeScript/Node, PHP, Python, Go, Rust)

- **TypeScript / JavaScript:** Use `PascalCase` for types, interfaces, classes, and enums; `camelCase` for functions and methods; `kebab-case` for file modules.
- **PHP (PSR-1 / PSR-12 / PER CS):** Use `PascalCase` for namespaces and classes (`UserRepository`, `OrderProcessor`); `camelCase` for class methods and properties (`findUserById`, `$userSession`).
- **Python (PEP 8):** Use `PascalCase` for classes (`UserService`); `snake_case` for functions, methods, parameters, and files (`user_service.py`).
- **Go / Rust:** Use `PascalCase` for exported structs, interfaces, and functions; `camelCase` / `snake_case` for unexported members and functions.

---

## 4. API Contracts and Persistence Layer (REST, GraphQL, Databases, Config)

- **REST API Endpoints:** Use lowercase `kebab-case` plural nouns for HTTP URI paths (for example `/api/v1/user-profiles`, `/api/v1/orders`).
- **GraphQL Schemas:** Use `PascalCase` for types (`type UserProfile`) and `camelCase` for query/mutation fields (`firstName`, `getUserById`).
- **Database Tables and Columns:** Use lowercase `snake_case` plural for SQL tables (`user_accounts`, `orders`) and singular `snake_case` for columns (`created_at`, `user_id`, `is_active`).
- **Environment Variables:** Use `UPPER_SNAKE_CASE` with mandatory framework or scope prefixes (for example `NEXT_PUBLIC_API_URL`, `EXPO_PUBLIC_KEY`, `DATABASE_URL`).

---

## 5. Naming Clarity Principles

- **Reveal Intent:** A name must answer why it exists, what it does, and how it is used. If a comment fulfills this role, rename the symbol instead.
- **Avoid Disinformation:** Never call a `Map` a `list`. Never let two names differ only through visually ambiguous characters (for example `userData` vs `userDate`, lowercase `l` vs `1`).
- **Make Meaningful Distinctions:** Two different names imply two different responsibilities. Generic suffixes like `Manager`, `Handler`, or `Data` add noise. Name the actual role instead.
- **Keep Names Pronounceable and Searchable:** Broadly scoped identifiers must read aloud cleanly and grep cleanly. Single letters and magic numbers are allowed only as short-scoped loop locals.
- **Skip Type Encodings:** Do not prefix names with type identifiers (`strName`, `iCount`). The type system surfaces types automatically.
- **Avoid Mental Mapping:** Do not force readers to memorize abbreviation tables (`t`, `tx`, `u`). Spell out full concepts (`transaction`, `user`).
- **Pick One Word per Concept:** Use one canonical verb for identical operations across the codebase (for example standardizing on `fetch` for async network reads vs `get` for synchronous accessors; `delete` for resource destruction vs `remove` for collection decoupling).
- **Prefer Positive Booleans:** Name boolean variables and flags using positive states (`isEnabled`, `isVisible`, `hasAccess`) to prevent double-negatives in conditional logic (`!isDisabled`).
- **Use Symmetric Antonym Pairs:** Pair opposite operations using standard complementary terms (`open`/`close`, `start`/`stop`, `enable`/`disable`, `subscribe`/`unsubscribe`, `show`/`hide`).
- **Scale Name Length to Scope Size:** Identifier length must be proportional to scope size. Single-letter identifiers (`i`, `e`) are permitted only in 1 to 3 line local scopes; global or module-scoped symbols must be explicit.
- **Align with Ubiquitous Domain Language:** Use authoritative domain terminology consistently across code logic, database schemas, API specs, and UI labels (for example standardizing on `Customer` rather than mixing `User`, `Client`, and `Account`).
