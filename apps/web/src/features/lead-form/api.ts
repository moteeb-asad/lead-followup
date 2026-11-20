import { api } from "@/lib/api";
import type { LeadFormInput } from "./validators/lead.schema";

// POST /api/public/leads. The API answers { ok: true } and never the lead's id.
export function submitLead(input: LeadFormInput) {
  return api<{ ok: true }>("/public/leads", { method: "POST", body: input });
}
