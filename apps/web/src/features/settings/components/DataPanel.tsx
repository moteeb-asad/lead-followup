import PanelTitle from "@/features/leads/components/PanelTitle";

// Export and retention. Static for now: neither does anything.
export default function DataPanel() {
  return (
    <section className="lg:col-span-7" aria-labelledby="data-title">
      <PanelTitle id="data-title">Data</PanelTitle>
      <div className="flex flex-col gap-4 border border-ink bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold">Export leads</p>
            <p className="mt-1 text-xs leading-5 text-muted">
              Every lead with its status and timeline, as CSV.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 border border-ink bg-card px-4 font-mono text-label uppercase hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M12 4v10" />
              <path d="m8 11 4 4 4-4" />
              <path d="M4 19h16" />
            </svg>
            Download
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-line pt-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold">Retention</p>
            <p className="mt-1 text-xs leading-5 text-muted">
              How long to keep leads marked Won or Lost.
            </p>
          </div>
          <div className="relative shrink-0">
            <label htmlFor="retention" className="sr-only">
              Retention period
            </label>
            <select
              id="retention"
              className="h-11 w-48 appearance-none border border-ink bg-card pr-9 pl-3 text-sm font-medium focus:outline-2 focus:outline-offset-2 focus:outline-cobalt"
            >
              <option>Keep forever</option>
              <option>12 months</option>
              <option>24 months</option>
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
    </section>
  );
}
