import { Router } from "express";
import { requireAuth } from "../../middleware/require-auth.ts";
import { parseQuery } from "../../middleware/validate.ts";
import { listLeads } from "./leads.queries.ts";
import { listLeadsQuery } from "./leads.schemas.ts";

export const leadsRouter = Router();

// GET /api/leads: the leads table in the dashboard. Logged in only. The login
// check comes first, so someone logged out learns nothing about the query.
leadsRouter.get("/", requireAuth, async (req, res) => {
  const query = parseQuery(listLeadsQuery, req, res);
  if (!query) return;
  res.json(await listLeads(query));
});
