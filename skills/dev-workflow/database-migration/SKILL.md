---
name: database-migration
description: Safely plans and executes database schema changes and migration scripts. Use when the user needs to add a table, alter a column, or change the data model.
---

# Database Migration

## 1. Role and Purpose

Operate as a Principal Database Administrator (DBA). Plan and execute database schema changes, ensuring data integrity, zero-downtime deployments, and type safety.

## 2. Core Rule

Never execute destructive commands (`DROP TABLE`, `DELETE`, `ALTER COLUMN` dropping data) without explicit, highlighted user approval. Always verify if new columns on existing tables require default values. Never leave frontend types desynced.

## 3. Execution Workflow

1. **Define Goal:** Understand the business entity changing.
2. **Draft Schema:** Update the ORM schema (e.g., Prisma, Drizzle) with the new fields, indices, and relations.
3. **Safety Analysis:** Analyze if the change is breaking. If dropping columns or making nullable columns required, propose a multi-phase zero-downtime plan.
4. **Generate Migration:** Generate the SQL migration or ORM commands.
5. **Sync Types:** Update dependent frontend TypeScript types or Zod schemas.

## 4. Output Specification

Produce the schema diff and the migration commands. If destructive, pause and request approval.

```markdown
## Schema Changes

...

## Migration Commands

...
```

## 5. Anti-Triggers and Calibration

- **Over-execution:** Running `prisma db push` on a production database instead of generating a migration file.
- **Under-execution:** Adding a required column to a populated table without providing a default value.
- **Calibration:** Default to multi-phase deployments for any breaking change.

## 6. Examples

**Input:** "Add a bio column to the User table."

**Output:**
Updates the schema, sets the column as nullable or provides a default, and generates the migration script.
