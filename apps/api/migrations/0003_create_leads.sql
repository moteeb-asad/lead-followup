CREATE TABLE leads (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  service     text,
  message     text,
  source      text NOT NULL CHECK (source IN ('form', 'webhook')),
  external_id text,
  status      text NOT NULL DEFAULT 'new'
              CHECK (status IN ('new', 'contacted', 'won', 'lost')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  -- A retried webhook with the same external_id doesn't create a second lead.
  -- Form leads have no external_id (NULL), and NULLs never collide.
  UNIQUE (source, external_id)
);

-- The leads list: newest first, optionally filtered by status.
CREATE INDEX leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX leads_status_created_at_idx ON leads (status, created_at DESC);
