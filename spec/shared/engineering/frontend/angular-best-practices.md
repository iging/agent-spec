---
name: Angular Best Practices
description: Angular (v20+) architecture constraints, signal-based state management, standalone component rules, and quality guidelines for modern Angular codebases.
---

# Angular Best Practices

> **Purpose:** Angular v20+ engineering rules covering standalone components, signal reactivity, change detection, accessibility, and project setup. Reference this file from your prompt to enforce strict Angular standards.

---

## 1. Core Architecture and Component Design

- **Standalone Default:** All components MUST be standalone by default. Do NOT use NgModules for new code; NgModules are legacy.
- **Folder Structure:** Organize by feature, not by type. Each feature owns its components, services, and related logic. Avoid `components/`, `services/`, `directives/` directories.
- **Feature Boundaries:** Keep components, services, and logic isolated within their feature domain. Cross-feature dependencies should be minimized.
- **Lazy Loading:** Load features only when needed via route-level lazy loading or `@defer` for template parts.

---

## 2. Reactive State Management

- **Signals First:** Use `signal()` for local component state, `computed()` for derived values, `effect()` for side effects (always clean up), `linkedSignal()` for synchronized derived state.
- **RxJS for Time-Based Async:** Use RxJS for debounce, throttle, retry, `switchMap`, `mergeMap`, websockets, and server-sent events. Bridge to signals via `toSignal()`.
- **Key Heuristic:** "Use RxJS to fetch and transform; use Signals to store and display."
- **NgRx SignalStore:** Only for complex global state with side effects (pagination, optimistic updates, undo). Otherwise prefer service-level signals.
- **Avoid `any`:** Use `unknown` for external data; force safe narrowing with type guards.

---

## 3. Change Detection and Performance

- **Zoneless Default:** Angular v21+ makes zoneless the default; removes Zone.js (~33KB bundle reduction). Change detection only runs on Signal updates, template events, or AsyncPipe.
- **OnPush:** Default in Angular v22; works synergistically with zoneless/Signals. Do NOT turn it off.
- **`httpResource`:** Stable in Angular v22; reactive HTTP with automatic refetch, cancellation, loading/error states as signals. Keep `HttpClient` for mutations only.
- **`@defer`:** Lazy load templates with placeholder/loading blocks; enables incremental hydration for SSR; control hydration with viewport/interaction/condition triggers.

---

## 4. Template Syntax and Patterns

- **Modern Control Flow:** Use `@if`/`@for`/`@switch` replacing `*ngIf`/`*ngFor`/`*ngSwitch`. `@for` requires `track` with stable unique keys.
- **Signal Inputs/Outputs:** Use `input()`, `output()`, `model()` replacing `@Input()`/`@Output()` decorators. `model()` for two-way bound properties with `[(prop)]` syntax.
- **`class`/`style` Bindings:** Prefer native `class` and `style` bindings over `ngClass`/`ngStyle` directives.
- **Inline Templates:** Prefer inline templates for small components. Use `NgOptimizedImage` for static images (does NOT work for inline base64).
- **No `any` in Templates:** Template expressions should use explicit types; avoid implicit `any`.

---

## 5. Forms

- **Signal Forms:** Stable in Angular v22; schema-based validation, type-safe field access, `input()` signals for form controls.
- **Reactive Forms:** For large, dynamic, or highly conditional forms. Keep `FormBuilder` patterns where applicable.
- **Avoid:** Template-driven forms entirely.

---

## 6. Accessibility and Quality

- **WCAG AA:** Must pass all AXE checks. Include focus management, color contrast ratios, and proper ARIA attributes.
- **`readonly` on Angular-Initialized Properties:** Mark `input`, `model`, `output`, and query properties as `readonly` to prevent overwriting Angular-set values.
- **`protected` for Template-Bound Members:** Use `protected` access for any class members meant to be read from the component template.
- **Safe Navigation:** Use `?.` operator for optional property access in templates.

---

## 7. Project Setup and Stack

- **CLI Defaults:** `ng new` with `--standalone --routing --strict`. Enable strict TypeScript mode.
- **Build Tool:** esbuild default; 70%+ faster than webpack.
- **UI Library:** Angular Material 3 for complex interactive components (tables, dialogs, date pickers, forms); Tailwind CSS v4 for layout and custom styling.
- **Testing:** Jest + Angular Testing Library (replaced Karma, 3x faster); Playwright for E2E testing.
- **i18n:** Transloco for internationalization.
- **State (Complex):** NgRx SignalStore for global state; otherwise service-level signals.

---

## 8. Code Quality

- **Small PRs:** Reviewable in under 15 minutes; use feature flags for frequent merging.
- **No Nested Subscriptions:** `.subscribe()` inside `.subscribe()` is an anti-pattern; flatten with RxJS operators or convert to signals.
- **No Direct Signal Mutation:** Use `set()`/`update()` on signals; never direct assignment that bypasses store logic.
- **No Over-Using `effect()`:** Prefer `computed()` for derived state; `effect()` only for last-resort side effects (logging, manual DOM manipulation).
- **No `any`:** Enable `"noImplicitAny": true` and `"strict": true` in tsconfig.
