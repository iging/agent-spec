---
name: Shared PHP Principles
description: Reusable, deterministic modern PHP (PHP 8.x, PSRs) architecture constraints, strict typing rules, security standards, and performance patterns.
---

# Shared PHP Principles

> **Purpose:** Reusable, deterministic modern PHP (PHP 8.x, PSRs) architecture constraints, strict typing rules, security standards, and performance patterns for any prompt generating or modifying PHP codebases. Reference this file from your prompt to enforce strict software engineering paradigms, type safety, and defensive security.

---

## 1. Modern Language Features and Strict Typing (Hard Rules)

Apply these rules strictly to all PHP file creation and modification to enforce runtime type safety and leverage modern PHP capabilities.

- **Strict Type Declaration:** `declare(strict_types=1);` MUST be the first statement in every PHP file immediately after the opening `<?php` tag.
- **Explicit Type Annotations:** All function parameters, return types, and class properties MUST have explicit scalar or class/interface types. Omission of type declarations is strictly BANNED. Use native Union types (`int|float`), Intersection types (`Countable&ArrayAccess`), Nullable types (`?string`), or Disjunctive Normal Form (DNF) types (`(A&B)|C`).
- **Immutability & DTOs:** Use `readonly` classes or `readonly` properties for Data Transfer Objects (DTOs) and Value Objects to guarantee immutability after initialization.
- **Enums over Magic Constants:** Use backed Enums (`enum OrderStatus: string`) instead of class constants or string/integer literals for fixed options or state flags.
- **Modern Control Flow:** Use `match` expressions instead of `switch` statements or nested `if/else` checks for value mapping and strict type comparison.
- **Constructor Property Promotion:** Use constructor promotion to declare and initialize class properties directly in the constructor signature, eliminating boilerplate property declarations.
- **Property Hooks & Asymmetric Visibility:** In PHP 8.4+ environments, leverage Property Hooks (`get => ...; set => ...;`) and Asymmetric Visibility (`public private(set) string $id;`) to expose readable state safely without writing redundant getter boilerplate.

---

## 2. Code Architecture, PSR Standards, and SOLID Design

- **PSR-12 / PER Coding Standard:** Follow PSR-12 and PER CS guidelines strictly for formatting, single-space indentation, visibility modifiers (`public`, `protected`, `private`), and placement of braces.
- **PSR-4 Autoloading:** All classes MUST follow PSR-4 folder structure and namespace mapping under the `src/` directory.
- **Dependency Injection:** Use constructor dependency injection via interfaces (compatible with PSR-11 containers). Business logic MUST NOT instantiate concrete service dependencies directly (`new Service()`).
- **No Global State:** Global variables (`global $var`), raw superglobals (`$_GET`, `$_POST`, `$_SERVER`, `$_SESSION`) inside application logic, and mutable singletons are strictly BANNED. Encapsulate HTTP requests in PSR-7 `ServerRequestInterface` or framework request objects.
- **Ban on Scope-Polluting Functions:** Use of `extract()` is strictly BANNED because it injects dynamic variables into local scope and bypasses static analysis.
- **Feature-First Domain Architecture:** Group code by domain or feature (e.g., `src/Domain/User/`) rather than technical type folders (`src/Controllers/`, `src/Models/`).
- **Final Classes by Default:** Domain services, DTOs, and concrete implementations MUST be declared `final` by default unless explicitly designed for inheritance or extension, preventing fragile base class anti-patterns.

---

## 3. Security and Input Validation

- **Prepared Statements Mandatory:** Direct variable interpolation or string concatenation inside raw SQL queries is strictly BANNED. You MUST use PDO prepared statements with parameter binding or safe query builders.
- **Context-Aware Escaping:** All output rendered to HTML MUST be escaped using `htmlspecialchars($data, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')` or template engine auto-escaping (Blade/Twig).
- **Password Hashing:** Passwords MUST be hashed using `password_hash()` with `PASSWORD_ARGON2ID` or `PASSWORD_BCRYPT`. Legacy hashing functions (`md5`, `sha1`, `crypt`) are strictly BANNED.
- **Ban on Unsafe Code and Shell Execution:** Use of `eval()`, `create_function()`, `exec()`, `shell_exec()`, `system()`, `passthru()`, or shell backtick operators (`` `command` ``) is strictly BANNED for web applications to prevent remote code execution vulnerabilities.
- **Strict Boundary Validation:** Validate and sanitize all external data at API or web boundaries using typed DTOs, request validation schemas, or assertion libraries before passing data to domain services.
- **CSRF Protection & Secure Cookies:** All state-modifying endpoints (POST, PUT, DELETE, PATCH) MUST enforce anti-CSRF token verification. Session cookies MUST explicitly set `SameSite=Lax` or `Strict`, `Secure`, and `HttpOnly` flags.

---

## 4. Error Handling and Logging

- **No Error Suppression:** The `@` error suppression operator is strictly BANNED.
- **Domain-Specific Exceptions:** Throw explicit domain exceptions (e.g., `UserNotFoundException`) extending SPL exception types (`InvalidArgumentException`, `RuntimeException`). Never throw generic `\Exception` or return error status arrays.
- **Structured Logging:** Log exceptional states using PSR-3 compliant loggers (`LoggerInterface`) with context arrays. Sensitive data (passwords, auth tokens, PII) MUST be redacted before logging.

---

## 5. Performance and Memory Management

- **Generators for Streaming:** Use Generators (`yield`) when iterating through large data sets, file streams, or database cursors to maintain low memory footprints.
- **N+1 Query Prevention:** Always eager-load ORM relations (e.g., `with()`) before iterating over model collections.
- **OPcache & JIT Compatibility:** Avoid dynamic execution constructs (`eval()`, dynamic variable variable names `$$var`) that prevent OPcache optimization.

---

## 6. Static Analysis and Automated Testing

- **Static Analysis Gate:** Code must pass PHPStan at Level 8 (or Psalm equivalent) with zero type errors.
- **Automated Testing:** Write isolated unit and integration tests using Pest PHP or PHPUnit. Tests MUST be deterministic and mock external I/O boundaries.
