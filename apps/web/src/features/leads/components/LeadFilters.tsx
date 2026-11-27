import { leadSources, type LeadSource, type LeadStatus } from "../types";

// "All" has no status. The swatches are the colours of the status badges.
const statuses: {
  value: LeadStatus | undefined;
  label: string;
  swatch: string;
}[] = [
  { value: undefined, label: "All", swatch: "" },
  { value: "new", label: "New", swatch: "border border-ink bg-signal" },
  { value: "contacted", label: "Contacted", swatch: "bg-cobalt" },
  { value: "won", label: "Won", swatch: "bg-ink" },
  { value: "lost", label: "Lost", swatch: "border border-muted" },
];

const sourceLabels: Record<LeadSource, string> = {
  form: "Website form",
  webhook: "Webhook",
};

type LeadFiltersProps = {
  status: LeadStatus | undefined;
  source: LeadSource | undefined;
  onStatusChange: (status: LeadStatus | undefined) => void;
  onSourceChange: (source: LeadSource | undefined) => void;
};

// The filters above the leads table. They only report what the person picks:
// the screen puts it in the URL, and the API does the filtering.
export default function LeadFilters({
  status,
  source,
  onStatusChange,
  onSourceChange,
}: LeadFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-y-2 border-ink py-3">
      <div
        role="group"
        aria-label="Filter by status"
        className="flex flex-wrap"
      >
        {statuses.map((item, i) => {
          const selected = item.value === status;
          return (
            <button
              key={item.label}
              type="button"
              aria-pressed={selected}
              onClick={() => onStatusChange(item.value)}
              className={`inline-flex h-11 items-center gap-2 border border-ink px-4 text-sm font-semibold focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt ${
                i > 0 ? "-ml-px" : ""
              } ${selected ? "bg-ink text-paper" : "bg-card hover:bg-paper-2"}`}
            >
              {item.swatch && (
                <span
                  className={`size-2.5 ${item.swatch}`}
                  aria-hidden="true"
                />
              )}
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <label
          htmlFor="lead-source"
          className="font-mono text-label text-muted uppercase"
        >
          Source
        </label>
        <div className="relative">
          <select
            id="lead-source"
            value={source ?? ""}
            onChange={(event) =>
              onSourceChange(
                leadSources.find((item) => item === event.target.value),
              )
            }
            className="h-11 appearance-none border border-ink bg-card pr-9 pl-3 text-sm font-medium focus:outline-2 focus:outline-offset-2 focus:outline-cobalt"
          >
            <option value="">All sources</option>
            {leadSources.map((item) => (
              <option key={item} value={item}>
                {sourceLabels[item]}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="square"
            className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
