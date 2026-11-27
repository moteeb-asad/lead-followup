import { Link } from "react-router";

const statuses = ["New", "Contacted", "Won", "Lost"];
const current = "Contacted";

// Back link, the lead's name and tags, and the status picker.
// Static for now: the picker shows "Contacted" and doesn't change anything.
export default function LeadHeader() {
  return (
    <>
      <Link
        to="/admin/leads"
        className="inline-flex w-fit items-center gap-2 font-mono text-label text-ink-2 uppercase hover:text-ink"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="square"
          className="size-3.5"
          aria-hidden="true"
        >
          <path d="M20 12H5" />
          <path d="M11 6l-6 6 6 6" />
        </svg>
        All leads
      </Link>

      <header className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-6">
        <div className="min-w-0">
          <p className="font-mono text-label text-muted uppercase">
            Lead L-1046 · Received today 10:02
          </p>
          <h1 className="mt-1 text-4xl font-extrabold font-stretch-expanded tracking-tight">
            Sara Khan
          </h1>
          <p className="mt-3 flex flex-wrap gap-2">
            {["Boiler repair", "Form"].map((tag) => (
              <span
                key={tag}
                className="inline-flex h-6 items-center border border-line px-2 font-mono text-label text-ink-2 uppercase"
              >
                {tag}
              </span>
            ))}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p
            id="status-label"
            className="font-mono text-label text-muted uppercase"
          >
            Status
          </p>
          <div
            role="group"
            aria-labelledby="status-label"
            className="inline-flex flex-wrap border-2 border-ink bg-card"
          >
            {statuses.map((status, i) => {
              const selected = status === current;
              return (
                <button
                  key={status}
                  type="button"
                  aria-pressed={selected}
                  className={`inline-flex h-11 items-center gap-2 px-4 text-sm font-semibold ${
                    i > 0 ? "border-l-2 border-ink" : ""
                  } ${selected ? "bg-ink text-paper" : "hover:bg-paper-2"}`}
                >
                  {selected && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="square"
                      className="size-3.5 text-signal"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5 10 17l9-10" />
                    </svg>
                  )}
                  {status}
                </button>
              );
            })}
          </div>
        </div>
      </header>
    </>
  );
}
