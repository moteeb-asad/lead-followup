import { pool } from "../../db.ts";
import type { ListLeadsQuery, NewLead } from "./leads.schemas.ts";

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

export type LeadListItem = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  source: "form" | "webhook";
  status: "new" | "contacted" | "won" | "lost";
  createdAt: Date;
};

// A filter that is NULL matches every row, so the SQL never changes shape and
// nothing from the request is ever put into it as text.
const LIST_FILTER = `($1::text IS NULL OR status = $1)
       AND ($2::text IS NULL OR source = $2)`;

// One page of leads, newest first, and how many leads match the filters. The
// full message is left out: it belongs to the detail page.
export async function listLeads({
  status,
  source,
  page,
  pageSize,
}: ListLeadsQuery) {
  const filters = [status ?? null, source ?? null];
  const [list, count] = await Promise.all([
    pool.query<LeadListItem>(
      `SELECT id, name, email, phone, service, source, status,
              created_at AS "createdAt"
         FROM leads
        WHERE ${LIST_FILTER}
        ORDER BY created_at DESC, id DESC
        LIMIT $3 OFFSET $4`,
      [...filters, pageSize, (page - 1) * pageSize],
    ),
    pool.query<{ total: number }>(
      `SELECT count(*)::int AS total FROM leads WHERE ${LIST_FILTER}`,
      filters,
    ),
  ]);
  return { items: list.rows, total: count.rows[0].total, page, pageSize };
}
