# 0008. How the lead form sends a lead, and how repeats are stopped

- **Status:** Accepted
- **Date:** 2026-11-20

Builds on [decision 0004](0004-public-form-route.md), which added the public route, its rate limit and the honeypot.

## Context

Connecting the form on `/form` to `POST /api/public/leads` brought up four problems:

1. **Validation.** Browser validation (`required`, `type="email"`) gives different messages in each browser and can be skipped by anyone who posts to the API directly. The form needed its own rules, shown the same way everywhere, and the person shouldn't be able to send until they pass.
2. **Slow requests.** Nothing set a timeout, so a hanging server left the button on "Sending…" for as long as the browser allowed, which can be minutes.
3. **Retries.** When a request times out or the answer is lost, the lead may already be saved. The person sees an error, presses Send again, and a second lead is created.
4. **Repeats.** The first fix for retries was a per-send id. Testing showed it only covers a retry of the _same send_. The same content sent as two separate sends was saved twice: in the dev database, leads 1 and 5 were identical, 48 minutes apart. The owner's requirement is that the same content is never saved twice, whether a bot or a person sends it. The honeypot and the rate limit (decision 0004) slow spam down, but neither looks at what was sent.

## Decision

**Validation.** One zod schema (`features/lead-form/validators/lead.schema.ts`) with react-hook-form. It repeats the API's rules so people get feedback early. The form has `noValidate`, errors show under each field, and the Send button is disabled until every rule passes. The API validates again with its own schema, and that check is the one that counts.

**Timeout.** The request is cancelled after 15 seconds with `AbortSignal.timeout`. The form keeps what the person typed and shows a message that tells them to press Send again. The mutation never retries by itself.

**Retry of the same send.** The browser makes a UUID, `submissionId`, for each send (`useSubmitLead`). Sending the same data again reuses it. Changed data gets a new one, and a successful send clears it. The API stores it as the lead's `external_id`, and the existing unique key on `(source, external_id)` turns a repeat into a no-op.

**Same content, any sender.** Migration `0004` adds a unique index on `(lower(email), coalesce(service, ''), md5(coalesce(message, '')))`. `createLead` inserts with `ON CONFLICT DO NOTHING`. The same email (in any case), service and message is saved once, whatever its name, phone or `submissionId`, and however long ago the first one came in. A missing service or message counts as empty. The message is hashed because it can be 5000 characters, too long for an index entry. The migration first deletes copies that already exist, keeping the oldest.

**The answer is always `201 {"ok":true}`,** whether the lead was saved or was a repeat. A bot can't tell it was dropped, and a person who sends twice sees the same thank-you, which is true: we have their request.

## Alternatives considered

- **Browser validation only.** Rejected. Inconsistent messages, and it protects nothing on the server.
- **Retry failed requests automatically.** Rejected. Without an id it would create duplicates. With one, the person should still decide when to resend after an error.
- **A time window** (same content within 10 minutes). Rejected, because the requirement is that it is never saved twice. It would also need a read before the insert, and two identical requests arriving together can both pass that read.
- **Check in code first, then insert.** Rejected for the same race. A unique index in the database is the only check that two simultaneous requests can't both pass.
- **Compare name and phone as well.** Rejected. A bot that changes only the name would get through, and the enquiry is the same.
- **Answer 409 for a repeat.** Rejected. It tells a bot exactly what to change, and it shows a person an error for something that worked.
- **Captcha.** Not now. The honeypot, the rate limit and this rule cover the current need. Decision 0004 keeps a captcha as the next step if spam gets through, and the outbox ticket may bring it forward: an auto-reply to an address typed into the form can be abused to mail a stranger.

## Consequences

- A retry after a timeout is safe, and the same content never makes a second row, even when requests arrive at the same moment (4 identical requests at once added one row in testing).
- Both the webhook and the form get this rule, because it lives in the database and in `createLead`.
- **A real customer who sends the same email, service and message again later is silently dropped,** and never gets a second reply. If their first lead was handled long ago, this loses a genuine new enquiry. This is the accepted cost of "never twice". Changing one word avoids it, so the rule is a duplicate filter, not spam protection.
- Messages that differ by one character, or emails written differently (`name+tag@…`), are different content and are saved.
- Nobody is told when their lead is dropped. The 201 hides it on purpose.
- Migration `0004` deletes existing copies. That is safe while the app holds only test data. Once real leads exist, a migration like this needs a backup and a look at what it will delete first.
- The browser needs `crypto.randomUUID()`, which only works on HTTPS or `localhost`. Production is HTTPS, but opening the dev server by a LAN address over plain HTTP would fail.
- The web schema and the API schema repeat the same rules by hand. If one changes, change the other.
