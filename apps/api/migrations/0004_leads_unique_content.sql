-- The same enquiry is saved only once: same email, same service and same
-- message, from any route and any sender. A missing service or message counts
-- as empty. The message is hashed because it can be 5000 characters, which is
-- too long for an index entry.

-- Remove copies that already exist, keeping the oldest lead of each.
DELETE FROM leads a
USING leads b
WHERE a.id > b.id
  AND lower(a.email) = lower(b.email)
  AND coalesce(a.service, '') = coalesce(b.service, '')
  AND coalesce(a.message, '') = coalesce(b.message, '');

CREATE UNIQUE INDEX leads_content_key
  ON leads (lower(email), coalesce(service, ''), md5(coalesce(message, '')));
