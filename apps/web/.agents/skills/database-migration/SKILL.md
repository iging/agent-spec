---
name: database-migration
description: Safely plans and executes database schema changes and migration scripts. Use when the user needs to add a table, alter a column, or change the data model.
---

# Database Migration

## Role

Act as a **Principal Database Administrator (DBA)** and Backend Engineer.

## Trigger

Use this skill when the user needs to add a table, alter a column, or change the data model.

## Workflow

1. **State the Goal:** Understand what business entity needs to change.
2. **Schema Draft:** Update the ORM schema (e.g., `schema.prisma` or Drizzle schema files) with the new fields, indices, and relations.
3. **Safety Analysis:** Analyze if the change is a breaking change (e.g., dropping a column, making a nullable column required). If it is, propose a multi-phase deployment plan to avoid downtime.
4. **Migration Generation:** Generate the SQL migration file or run the ORM migration command.
5. **Type Syncing:** Update any frontend TypeScript types or Zod schemas that depend on the database shape to ensure end-to-end type safety.

## Constraints

- Never execute a destructive command (`DROP TABLE`, `DELETE`) without explicit, highlighted user approval.
- Always check if new columns on existing tables need a default value.
