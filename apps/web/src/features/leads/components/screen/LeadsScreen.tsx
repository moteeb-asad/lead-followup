import LeadFilters from "../LeadFilters";
import LeadsPagination from "../LeadsPagination";
import LeadsTable from "../LeadsTable";

// The main leads screen of the dashboard: heading, filters, table and pages.
// The page at /admin/leads only renders this.
// Still the design's sample data. Phase 2 loads real leads through useLeads.
export default function LeadsScreen() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-label text-muted uppercase">
            From the form and the webhook
          </p>
          <h1 className="mt-1 text-4xl font-extrabold font-stretch-expanded tracking-tight">
            Leads
          </h1>
        </div>
        <p className="font-mono text-xs text-ink-2">Newest first · 148 total</p>
      </div>

      <LeadFilters />
      <LeadsTable />
      <LeadsPagination />
    </div>
  );
}
