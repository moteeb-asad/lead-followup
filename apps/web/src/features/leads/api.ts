import { api } from "@/lib/api";
import type { LeadsQuery, LeadsResponse } from "./types";

// GET /api/leads. A filter that isn't set is left out of the URL, so the API
// returns every value. The signal lets TanStack Query cancel the request when
// the screen moves on to another page.
export function getLeads(query: LeadsQuery, signal?: AbortSignal) {
  const params = new URLSearchParams({
    page: String(query.page),
    pageSize: String(query.pageSize),
  });
  if (query.status) params.set("status", query.status);
  if (query.source) params.set("source", query.source);

  return api<LeadsResponse>(`/leads?${params}`, { signal });
}
