import { pool } from "../../db.ts";
import type { NewLead } from "./leads.schemas.ts";

// The one place a lead is inserted. The public form uses it now, and the
// webhook route will too, with its own source and external_id.
// Returns undefined, and saves nothing, when the lead already exists: either
// the same (source, external_id), which is a retried request, or the same
// email, service and message (migration 0004), whoever sent it. A NULL
// external_id never matches, so it only dedupes on the content.
export async function createLead(
  lead: NewLead,
  source: "form" | "webhook",
  externalId: string | null = null,
) {
  const { rows } = await pool.query<{ id: string }>(
    `INSERT INTO leads (name, email, phone, service, message, source, external_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT DO NOTHING
     RETURNING id`,
    [
      lead.name,
      lead.email,
      lead.phone,
      lead.service,
      lead.message,
      source,
      externalId,
    ],
  );
  return rows[0]?.id;
}
