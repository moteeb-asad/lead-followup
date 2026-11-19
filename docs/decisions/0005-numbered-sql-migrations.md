# 0005. Numbered SQL migrations with my own runner

- **Status:** Accepted
- **Date:** 2026-11-19

## Context

Schema changes must be repeatable on any machine: a fresh local database, the live RDS database, a teammate's laptop. The two options were `node-pg-migrate`, or numbered `.sql` files applied by a small runner script. The database is plain SQL through `pg` with no ORM (decision 0002), and the schema is small: seven tables.

## Decision

Migrations are numbered `.sql` files in `apps/api/migrations/`, such as `0003_create_leads.sql`. `npm run db:migrate` runs `scripts/migrate.ts`, which:

- creates a `schema_migrations` table on first run, with one row per applied file
- takes a Postgres advisory lock, so two runs can't overlap
- applies the files that aren't in `schema_migrations`, in name order
- runs each file and its `schema_migrations` row in one transaction, and rolls both back if the file fails

A migration is never edited after it has run. A change gets a new file.

## Consequences

- Migrations are the SQL that runs, with no DSL or extra tool to learn. This matches decision 0002.
- The runner is about 40 lines that I can read and test, instead of a library to configure.
- `schema_migrations` shows what has run on any database.
- There are no down migrations. Undoing a change means writing a new migration that reverses it.
- The runner doesn't store a checksum, so editing a file that has already run goes unnoticed. The rule above and code review are the only protection.
- Each file runs in a transaction, so statements that can't run inside one, such as `CREATE INDEX CONCURRENTLY`, need the runner changed first.
- If migrations ever need rollbacks or branching histories, a new decision can switch to `node-pg-migrate` and supersede this one.
