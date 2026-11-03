import LeadFilters from "@/features/leads/components/LeadFilters";
import LeadsPagination from "@/features/leads/components/LeadsPagination";
import LeadsTable from "@/features/leads/components/LeadsTable";

// TODO(week 4): load leads from GET /api/leads with status and source filters.
// Everything below shows the design's sample data until then.
export default function LeadsPage() {
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
