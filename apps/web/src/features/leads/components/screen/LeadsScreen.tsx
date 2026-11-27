import DataTable from "@/components/data-table/DataTable";
import Pagination from "@/components/data-table/Pagination";
import { ApiError } from "@/lib/api";
import { useLeads } from "../../hooks/useLeads";
import { useLeadsFilters } from "../../hooks/useLeadsFilters";
import LeadFilters from "../LeadFilters";
import { leadColumns } from "./leadColumns";

// 4xx errors carry a message written for the user. A 401 means the session
// ended while the screen was open. Anything else gets a generic message.
function errorMessage(error: Error | null) {
  if (!error) return null;
  if (error instanceof ApiError && error.status === 401) {
    return "Your session ended. Log in again.";
  }
  if (error instanceof ApiError && error.status < 500) return error.message;
  return "Couldn't load the leads. Try again in a moment.";
}

// The main leads screen of the dashboard: heading, filters, table and pages.
// The page at /admin/leads only renders this. The page and the filters live in
// the URL, and the API does the filtering and the paging.
export default function LeadsScreen() {
  const { query, setStatus, setSource, setPage } = useLeadsFilters();
  const leads = useLeads(query);
  const filtered = query.status !== undefined || query.source !== undefined;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-label text-muted uppercase">
            From the website form
          </p>
          <h1 className="mt-1 text-4xl font-extrabold font-stretch-expanded tracking-tight">
            Leads
          </h1>
        </div>
        <p className="font-mono text-xs text-ink-2">
          Newest first{leads.data ? ` · ${leads.data.total} total` : ""}
        </p>
      </div>

      <LeadFilters
        status={query.status}
        source={query.source}
        onStatusChange={setStatus}
        onSourceChange={setSource}
      />

      <DataTable
        columns={leadColumns}
        rows={leads.data?.items ?? []}
        getRowKey={(lead) => lead.id}
        caption="Leads, newest first"
        isLoading={leads.isPending}
        isFetching={leads.isPlaceholderData}
        error={errorMessage(leads.error)}
        onRetry={() => void leads.refetch()}
        emptyMessage={
          filtered
            ? "No leads match these filters."
            : "No leads yet. A lead sent from the form will show here."
        }
        tableClassName="min-w-[960px]"
      />

      {leads.data && (
        <Pagination
          page={query.page}
          pageSize={query.pageSize}
          total={leads.data.total}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
