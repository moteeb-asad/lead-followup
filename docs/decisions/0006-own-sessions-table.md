# 0006. Store login sessions in my own table, not express-session

- **Status:** Accepted
- **Date:** 2026-10-28

## Context

The admin area needs a login that survives page refreshes and API restarts, and that can be ended on logout. The two options were `express-session` with a Postgres store, or a `sessions` table and a small middleware of my own. There is one admin user in v1, and the database is plain SQL through `pg` (decision 0002).

## Decision

Sessions live in a `sessions` table that I manage myself. Login creates a random 32-byte token, sends it to the browser in an `HttpOnly`, `SameSite=Lax` cookie (`Secure` in production), and stores only its SHA-256 hash with the user id and an expiry 7 days ahead. A `requireAuth` middleware hashes the cookie, looks up a session that hasn't expired, and returns 401 if there isn't one. Logout deletes the row and clears the cookie.

## Consequences

- About 50 lines of code that I can read and test, instead of a library and a store adapter to configure.
- The table matches the rest of the schema and goes through the same migrations.
- A leaked `sessions` table can't be used to log in, because it only holds hashes.
- Logging out, or deleting a user, ends their sessions at once.
- I own the security details that `express-session` would handle: token generation, cookie flags, expiry. They are written down here so they can be reviewed.
- Expired rows stay in the table until something deletes them. A cleanup job can come later; with one user the table stays small.
