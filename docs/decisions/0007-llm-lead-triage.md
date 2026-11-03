# 0007. Classify incoming leads with an LLM, as a queued job

- **Status:** Proposed
- **Date:** 2026-11-03

## Context

The auto-reply is a template. It fills `{name}` and `{service}` and ignores what the person actually wrote, so "our boiler stopped this morning, the gauge shows 0.5 bar, can someone come today" and "thinking about a new bathroom next spring" get the same email.

The bigger problem is ordering. The leads table sorts by `created_at`, so those two enquiries look identical in the list. Replying within a minute is automatic, but the owner still has to decide who to ring, and nothing in the app helps with that. On a busy day the emergency can sit below three enquiries that could have waited a week.

Form leads carry a `service` value because it is a form field. Leads from the webhook and from forwarded email are free text and often carry nothing structured at all, so filters and template placeholders are empty for exactly the sources we cannot control.

## Decision

A worker job sends each new lead's message to an LLM and stores what comes back on the lead: urgency, job type, whether it reads as an emergency, any timeframe the customer mentioned, and an extracted `service` when the field is empty.

The output is internal. It labels and sorts rows in the admin screens. Nothing the model writes is sent to a customer, and the auto-reply stays a template.

The call runs as a queued job claimed by the worker with `FOR UPDATE SKIP LOCKED`, the same way email is sent (see [0003](0003-outbox-and-worker.md)). It never runs inside the request that creates the lead.

## Consequences

- The leads table can sort and filter by urgency instead of arrival time, the dashboard can show how many urgent leads are waiting, and the lead detail page can show the labels beside the existing chips. No new screen: a feature that needs its own page is not wired into the work.
- A model outage degrades to an unlabelled lead. Lead creation and the auto-reply are untouched, because the classification is a separate queued job and not part of the request.
- Extraction fills `service` for webhook and email leads, so templates personalise where they currently render nothing.
- A wrong label costs an ordering mistake, not a customer. That is the reason for keeping the model away from anything that gets sent.
- The worker now runs more than one kind of job, so `messages` needs a job type or triage needs its own table and claim query.
- A paid external dependency with its own latency, rate limits and key to manage, and a small per-lead cost.
- Labels can be wrong and will be trusted anyway. The admin screens must present them as a suggestion and keep the customer's own words visible next to them.

## Alternatives considered

- **Generate the auto-reply itself.** Rejected for v1. The reply goes out unreviewed under the business's name, and a model that commits to a visit time or a price does real damage. A drafted reply the owner reviews before sending is a reasonable later step.
- **A chat assistant over the leads.** Rejected. It does not serve the thing this product is for, which is getting to the right customer first.
- **Rules on keywords.** Cheaper and with no dependency, but it misses the phrasings nobody thought to list, which is most of them.
