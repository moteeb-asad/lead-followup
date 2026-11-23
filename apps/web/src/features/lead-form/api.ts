import { api } from "@/lib/api";
import type { LeadFormInput } from "./validators/lead.schema";

export type LeadSubmission = LeadFormInput & { submissionId: string };

// Give up after this long. The request may still have reached the API, which
// is why the same submissionId is sent again on a retry.
const TIMEOUT_MS = 15_000;

// POST /api/public/leads. The API answers { ok: true } and never the lead's id.
export function submitLead(input: LeadSubmission) {
  return api<{ ok: true }>("/public/leads", {
    method: "POST",
    body: input,
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}
