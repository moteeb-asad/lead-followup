# 0003. Send emails from an outbox table with a separate worker

- **Status:** Accepted
- **Date:** 2026-10-27

## Context

Each new lead should get an auto-reply within a minute. If the API sent the email inside the request, a slow or failing email provider would slow down or break lead creation. And a crash between saving the lead and sending the email would lose the email.

## Decision

The API saves the lead, a `messages` row (status `queued`) and an activity row in one transaction, and never sends email itself. A worker process (`apps/api/src/worker.ts`) runs every 5 seconds, claims due rows with `FOR UPDATE SKIP LOCKED`, sends them, and retries failures after 1 and 5 minutes. After the 3rd failure the message is marked `failed` and shows on the dashboard. A message stuck in `sending` for over 10 minutes goes back to `queued`.

## Consequences

- No email is lost: if the lead is saved, its message is saved too.
- Lead creation stays fast whatever the email provider does.
- `SKIP LOCKED` lets more than one worker run without sending the same email twice.
- Replies are not instant: up to 5 seconds of delay, plus retries.
- The worker is a second process that must run all the time, which rules out hosts that sleep when idle.
