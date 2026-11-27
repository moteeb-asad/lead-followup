// The values the API and the database allow for a lead (migration 0003).
export const leadStatuses = ["new", "contacted", "won", "lost"] as const;
export const leadSources = ["form", "webhook"] as const;

export type LeadStatus = (typeof leadStatuses)[number];
export type LeadSource = (typeof leadSources)[number];
export type ReplyState = "queued" | "sent" | "failed";

// One row of GET /api/leads. The id is a string, and the dates are ISO text.
export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  source: LeadSource;
  status: LeadStatus;
  createdAt: string;
};

// The answer of GET /api/leads. `total` counts every lead that matches the
// filters, not just this page.
export type LeadsResponse = {
  items: Lead[];
  total: number;
  page: number;
  pageSize: number;
};

// What the leads screen asks for. A filter that is left out matches everything.
export type LeadsQuery = {
  status?: LeadStatus;
  source?: LeadSource;
  page: number;
  pageSize: number;
};
