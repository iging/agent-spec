# Schema and Data Models Specification

## Role / Authority

- **Role:** Definition of database storage engine choices, data entity relationships, table schemas, and indexing strategies.
- **Authority:** Primary context reference for persistent data schemas and data models.
- **Must not define:** Application UI component design or API routing paths.

---

## 1. Database Storage Engines

- **Primary Database:** `[PLACEHOLDER: PRIMARY_DATABASE]` (e.g., PostgreSQL v16, MySQL v8.0, MongoDB v7.0)
- **ORM / Query Engine:** `[PLACEHOLDER: ORM_QUERY_ENGINE]` (e.g., Prisma, Drizzle ORM, SQLAlchemy, Hibernate)
- **Standard Reference:** ANSI SQL Standards ([ansi.org](https://www.ansi.org))

---

## 2. Entity Relational Models & Schemas

- **Core Entities:** `[PLACEHOLDER: CORE_ENTITIES_LIST]`
- **Naming Conventions:** Lowercase snake_case for tables and columns; singular or plural table naming consistent across schemas.
- **Primary Key Policy:** UUID v4 or auto-incrementing 64-bit BigInt primary keys.

---

## 3. Indexing & Migration Controls

- **Index Optimization:** B-tree indexes mandated for foreign key columns and frequent query filter predicates.
- **Migration Strategy:** Version-controlled forward-only SQL migration scripts.
