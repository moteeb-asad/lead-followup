# 0002. Plain SQL with `pg`, no ORM

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

The data model is small: seven tables. The core of the app depends on database features an ORM tends to hide, such as transactions across three inserts and `FOR UPDATE SKIP LOCKED` in the worker. Job applications also ask directly whether you write SQL yourself or only use an ORM.

## Decision

Use the `pg` package with hand-written, parameterized SQL (`$1`, `$2`). Schema changes go through numbered migration files that are never edited after they run.

## Consequences

- Every query is visible and explainable, including the locking in the worker.
- No query builder to learn; SQL knowledge carries to any stack.
- Types for query results are written by hand, and a typo in SQL shows up at runtime, not compile time. Tests on the main routes cover this.
- More repetitive code for simple inserts and selects.
