const statuses = [
  { label: "All", count: 148, swatch: "" },
  { label: "New", count: 7, swatch: "border border-ink bg-signal" },
  { label: "Contacted", count: 41, swatch: "bg-cobalt" },
  { label: "Won", count: 64, swatch: "bg-ink" },
  { label: "Lost", count: 36, swatch: "border border-muted" },
];

const selects = [
  {
    id: "source",
    label: "Source",
    options: ["All sources", "Website form", "Webhook"],
  },
  {
    id: "received",
    label: "Received",
    options: ["Any time", "Today", "Last 7 days", "Last 30 days"],
  },
];

// Static for now: "All" is selected and nothing filters yet.
export default function LeadFilters() {
  return (
    <div className="flex flex-wrap items-center gap-3 border-y-2 border-ink py-3">
      <div
        role="group"
        aria-label="Filter by status"
        className="flex flex-wrap"
      >
        {statuses.map((status, i) => {
          const selected = i === 0;
          return (
            <button
              key={status.label}
              type="button"
              aria-pressed={selected}
              className={`inline-flex h-11 items-center gap-2 border border-ink px-4 text-sm font-semibold ${
                i > 0 ? "-ml-px" : ""
              } ${selected ? "bg-ink text-paper" : "bg-card hover:bg-paper-2"}`}
            >
              {status.swatch && (
                <span
                  className={`size-2.5 ${status.swatch}`}
                  aria-hidden="true"
                />
              )}
              {status.label}
              <span
                className={`font-mono text-label ${selected ? "text-fog" : "text-muted"}`}
              >
                {status.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="ml-auto flex flex-wrap items-center gap-4">
        {selects.map((select) => (
          <div key={select.id} className="flex items-center gap-2">
            <label
              htmlFor={select.id}
              className="font-mono text-label text-muted uppercase"
            >
              {select.label}
            </label>
            <div className="relative">
              <select
                id={select.id}
                className="h-11 appearance-none border border-ink bg-card pr-9 pl-3 text-sm font-medium focus:outline-2 focus:outline-offset-2 focus:outline-cobalt"
              >
                {select.options.map((option) => (
                  <option key={option}>{option}</option>
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
        ))}
      </div>
    </div>
  );
}
