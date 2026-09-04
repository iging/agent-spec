---
name: Design Principles
description: Structural design axioms for application code covering SOLID, composition over inheritance, DRY, KISS, YAGNI, AHA, Law of Demeter, and object-data duality.
---

# Design Principles

> **Purpose:** Classical structural heuristics governing abstraction decisions in any codebase. Reference this file when designing modules, components, or class hierarchies so structure decisions stay principled instead of accidental.

---

## 1. SOLID Principles Application

- **Single Responsibility Principle (SRP):** Give each function, class, and component one reason to change. Keep presentation components decoupled from routing, data fetching, and state logic.
- **Open/Closed Principle (OCP):** Extend behavior through composition or strategy patterns. Do not mutate established core components to add variants.
- **Liskov Substitution Principle (LSP):** Subtypes and interface implementations must drop into any caller without breaking caller expectations or contracts.
- **Interface Segregation Principle (ISP):** Prefer small, specific interfaces over bloated multi-purpose interfaces. Consumers depend strictly on members they call.
- **Dependency Inversion Principle (DIP):** Depend on abstractions (interfaces, abstract contracts, types), not concrete implementations. Pass dependencies into functions or constructors.
- **Polymorphism over Type Branching:** Replace repeated `switch` or `if` checks on type flags with discriminated unions, pattern matching, or polymorphic dispatch.

---

## 2. Composition Over Inheritance

- **Favor Object Composition:** Compose behavior using small, single-purpose objects or functions rather than inheriting from deep class hierarchies.
- **Avoid Fragile Base Classes:** Deep inheritance binds subclasses tightly to parent implementation details, leading to fragile base class problems and LSP violations.
- **Strategy & Delegation:** Encapsulate varying algorithms behind strategy interfaces and delegate work to composed dependencies.

---

## 3. DRY, KISS, YAGNI, and AHA Guidelines

- **DRY (Don't Repeat Yourself) & Rule of Three:** Extract a shared abstraction only after a pattern repeats three distinct times. Premature extraction produces rigid code.
- **AHA (Avoid Hasty Abstractions):** Prefer mild duplication over the wrong abstraction. Duplication is cheaper than a flawed abstraction that couples unrelated concerns.
- **KISS (Keep It Simple):** Prefer the least complex design satisfying requirements. Avoid premature optimization, over-engineered abstractions, and unnecessary indirection layers.
- **YAGNI (You Aren't Gonna Need It):** Build strictly what current requirements demand. Do not add features on speculation about future needs. Defer a capability until an explicit requirement triggers it.

---

## 4. Applying These Together

- When SRP and DRY conflict, resolve toward SRP first. A small duplicated block with one clear owner beats a shared abstraction with two reasons to change.
- Treat every abstraction as a debt instrument. Each abstraction must pay rent through reduced duplication, isolated change, or simplified reasoning. Delete abstractions failing this test during refactoring passes.
- Reject any feature lacking a current requirement regardless of its expected future value. Speculative features create maintenance cost before creating value.

---

## 5. Data, Behavior, and Boundary Architecture

- **Law of Demeter:** A method talks only to its own class, objects it creates, objects passed as arguments, and objects it holds as fields. Never chain calls through objects returned by other calls.
- **Tell, Don't Ask:** Command objects to perform actions rather than querying internal state to make decisions outside the object.
- **Encapsulation Has a Purpose:** Private state preserves freedom to change implementation representations later. Exposing fields through automatic getters/setters cancels that freedom.
- **No Anemic Hybrids:** A type is either a plain data structure exposing shape OR an object hiding shape behind behavior—never both. Split mixed types along their axis of change.
- **Functional Core, Imperative Shell:** Keep business logic pure and deterministic at the core. Push side effects (I/O, database access, external APIs) to system boundaries.
