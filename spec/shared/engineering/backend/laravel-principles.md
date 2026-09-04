---
name: Shared Laravel Principles
description: Reusable, deterministic Laravel 11.x and 12.x architecture constraints, Eloquent ORM performance rules, Livewire and Inertia stack boundaries, security standards, and Pest PHP testing guidelines.
---

# Shared Laravel Principles

> **Purpose:** Reusable, deterministic Laravel 11.x and 12.x architecture constraints, Eloquent ORM performance guidelines, Livewire and Inertia stack boundaries, security standards, and Pest PHP testing specifications for any prompt generating or modifying Laravel codebases. Reference this file from your prompt to enforce strict PHP and Laravel software engineering paradigms.

---

## 1. Modern Framework & Architecture (Laravel 11.x / 12.x) - Hard Rules

Apply these rules strictly to all Laravel codebase creation and modification.

- **Streamlined Directory & Configuration Structure:** Laravel 11.x and 12.x eliminate monolithic kernel files (`Http/Kernel.php`, `Console/Kernel.php`) and separate middleware files. Define global middleware, exception handling, and routing configuration directly inside `bootstrap/app.php`. Use `routes/console.php` for scheduled tasks and custom commands.
- **Strict Typing & File Declarations:** `declare(strict_types=1);` MUST be the first statement in every PHP file immediately after the opening `<?php` tag. Annotate all controller methods, action parameters, model properties, and job signatures with explicit scalar or class types.
- **Action & Service Pattern:** Keep controllers thin. Controllers MUST only handle HTTP request parsing, authorization checks, and response formatting. Delegate core business logic to dedicated Action classes located in `app/Actions/` or domain service classes.
- **Service Container & Interface Binding:** Register interface-to-implementation bindings inside `AppServiceProvider` or domain-specific providers. Prefer constructor dependency injection over global facades inside domain services and external API integration layers to ensure testability.
- **Form Request Classes for Validation:** Never call `$request->validate()` or `Validator::make()` inside controller methods. Use dedicated Form Request classes (`app/Http/Requests/`) with strict validation rules and explicit authorization methods (`authorize()`).

---

## 2. Eloquent ORM & Database Performance

- **Mass Assignment Protection:** Models MUST explicitly define `$fillable` array properties or `$guarded = ['id']`. Unrestricted mass assignment (`$guarded = []`) is strictly BANNED to prevent security mass-assignment vulnerabilities.
- **Strict Eager Loading & N+1 Prevention:** Enable strict lazy-loading prevention in `AppServiceProvider` for non-production environments using `Model::preventLazyLoading(! app()->isProduction())`. Always eager-load relationships (`with(['user', 'comments'])`) when accessing collections.
- **Database Transactions:** Enclose multi-table write operations inside `DB::transaction()` callbacks. Ensure exceptions inside transaction blocks roll back database changes cleanly before propagating.
- **Typed Casts & Backed Enums:** Define model attribute casting via the `casts()` method returning array configurations. Use backed PHP 8 Enums (`OrderStatus::class`), `hashed` for secret tokens, and immutable array casts instead of manual mutators.
- **Schema & Migration Discipline:** Migration files MUST enforce foreign key constraints (`foreignId('user_id')->constrained()->cascadeOnDelete()`), composite indexes on query lookup columns, and explicit nullability flags.

---

## 3. Livewire 3 & Inertia.js Stack Boundaries

- **Livewire 3 Component Discipline:** Use `wire:model.blur` or `wire:model.live` for reactive inputs. Group complex form state inside Livewire Form Objects (`Livewire\Form`). Protect public component properties using the `#[Locked]` attribute to prevent client-side property tampering.
- **Inertia.js Boundary Rules:** Controllers serving Inertia frontend pages MUST return typed Eloquent API Resources (`JsonResource`) or explicit arrays. Never pass raw Eloquent models with unhidden relations. Keep client page components thin and push domain logic to backend actions.
- **Blade & Template Escaping:** Blade auto-escaping `{{ $data }}` MUST be used for all dynamic output. Unescaped raw output `{!! $data !!}` is strictly BANNED unless rendering sanitized HTML from an approved HTML sanitizer service.

---

## 4. Security, Authentication, & API Safeguards

- **Policy & Gate Authorization:** Every controller action, Livewire method, and Action class MUST verify authorization using Laravel Policies (`$this->authorize('update', $post)` or `Gate::authorize()`).
- **Standardized Authentication:** Use Laravel Sanctum for API token and SPA authentication, or Laravel Fortify for headless authentication flows. Writing custom session token handlers or plain-text password hashing logic is strictly BANNED.
- **CSRF Protection & Secure Cookies:** All web routes MUST retain `VerifyCsrfToken` middleware. Session cookies MUST set `SameSite=Lax` or `Strict`, `Secure`, and `HttpOnly` flags in environment configurations.
- **Rate Limiting & Endpoint Throttling:** Configure explicit rate limiters in `AppServiceProvider` using `RateLimiter::for()`. Apply throttle middleware (`throttle:api`, `throttle:60,1`) to authentication routes, registration endpoints, and public API endpoints.

---

## 5. Job Queues, Cache & Operational Architecture

- **Queued Asynchronous Tasks:** Offload slow operations (email delivery, notification dispatch, external HTTP integration, report generation) to asynchronous jobs implementing `ShouldQueue`.
- **Job Idempotency & Failure Handling:** Design queued jobs to be idempotent. Set explicit retry limits (`public int $tries = 3;`), backoff delays (`public int $backoff = 10;`), and implement the `failed(Throwable $exception)` method for cleanup.
- **Atomic Cache Locks:** Use `Cache::lock('resource-id', 10)->block(...)` for concurrent operations such as inventory allocation, payment processing, and balance adjustments to prevent race conditions.

---

## 6. Testing & Quality Assurance (Pest PHP 3.x)

- **Pest PHP Preferred Test Runner:** Write tests using Pest PHP (`it()`, `expect()`, datasets) for clean and readable test suites.
- **Feature & Unit Test Isolation:** Test HTTP endpoints with Pest Feature tests (`getJson()`, `postJson()`, `assertStatus(200)`). Test domain actions in isolation. Use fakes (`Bus::fake()`, `Mail::fake()`, `Event::fake()`, `Queue::fake()`) to prevent real I/O during test execution.
- **Database Safety in Testing:** Include the `RefreshDatabase` trait in feature tests. Tests MUST execute against an isolated testing database or in-memory SQLite instance, never modifying development or production data stores.
