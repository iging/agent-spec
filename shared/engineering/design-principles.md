---
name: Design Principles
description: Structural design axioms for application code covering SOLID, DRY, KISS, and YAGNI, applied through composition and explicit contracts.
---

# Design Principles

> **Purpose:** Classical structural heuristics governing abstraction decisions in any codebase. Reference this file when designing modules, components, or class hierarchies so structure decisions stay principled instead of accidental.

---

## 1. SOLID Principles Application

- **Single Responsibility Principle (SRP):** Give each function and component one reason to change. Keep presentation components decoupled from routing and state logic.
- **Open/Closed Principle (OCP):** Extend behavior through composition or strategy patterns. Do not mutate established core components to add variants.
- **Liskov Substitution Principle (LSP):** Subtypes and interface implementations must drop into any caller without breaking caller expectations.
- **Interface Segregation Principle (ISP):** Prefer small, specific interfaces over bloated multi-purpose interfaces. Consumers should depend only on members they call.
- **Dependency Inversion Principle (DIP):** Depend on abstractions (interfaces, types), not concrete implementations. Pass dependencies into functions as arguments.
- **Polymorphism over Type Branching:** Replace repeated `switch` or `if` checks on type flags with discriminated unions or polymorphic dispatch.

---

## 2. DRY, KISS, and YAGNI Guidelines

- **DRY (Don't Repeat Yourself):** Extract a shared abstraction only after a pattern genuinely repeats multiple times. Premature extraction produces rigid code.
- **KISS (Keep It Simple):** Prefer the least complex design satisfying requirements. Avoid premature optimization, over-engineered abstractions, and unnecessary indirection layers.
- **YAGNI (You Aren't Gonna Need It):** Build only what current requirements demand. Do not add features on speculation about future needs. Defer a capability until a real requirement triggers it.

---

## 3. Applying These Together

- When SRP and DRY conflict, resolve toward SRP first. A small duplicated block with one owner beats a shared abstraction with two reasons to change.
- Treat every abstraction as a debt instrument. Each one must pay rent through reduced duplication, isolated change, or simplified reasoning. Delete abstractions failing this test during refactoring passes.
- Reject any feature lacking a current requirement regardless of its expected future value. Speculative features create maintenance cost before they create value.

---

## 4. Data and Behavior

- **Law of Demeter:** A method talks only to its own class, objects it creates, objects passed as arguments, and objects it holds as fields. Never chain calls through objects returned by other calls. Tell the nearby object what you need instead of reaching through its structure. This rule applies to objects with behavior, not to plain data structures.
- **Encapsulation Has a Purpose:** Private state buys the freedom to change representation later. Exposing every field through automatic getters and setters restores public state and cancels the freedom.
- **No Anemic Hybrids:** A type is either a data structure exposing its shape or an object hiding shape behind behavior. A class exposing all of its fields while also performing real work refuses a single responsibility. Split it along the axis of likely change, because every class is a bet on which change comes next.
