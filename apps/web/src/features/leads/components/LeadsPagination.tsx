const pageClass =
  "-ml-px inline-flex h-11 items-center border border-ink px-4 font-mono text-xs";

// Static for now: page 1 of 15 is showing and the buttons do nothing.
export default function LeadsPagination() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="font-mono text-xs text-ink-2">Showing 1–10 of 148</p>
      <nav aria-label="Pagination" className="flex">
        <span
          aria-disabled="true"
          className="inline-flex h-11 items-center gap-2 border border-line bg-card px-4 font-mono text-label text-muted uppercase"
        >
          Prev
        </span>
        <button
          type="button"
          aria-current="page"
          className={`${pageClass} bg-ink text-paper`}
        >
          1
        </button>
        {["2", "3"].map((page) => (
          <button
            key={page}
            type="button"
            className={`${pageClass} bg-card hover:bg-paper-2`}
          >
            {page}
          </button>
        ))}
        <span
          className="-ml-px inline-flex h-11 items-center border border-ink bg-card px-3 font-mono text-xs text-muted"
          aria-hidden="true"
        >
          …
        </span>
        <button
          type="button"
          className={`${pageClass} bg-card hover:bg-paper-2`}
        >
          15
        </button>
        <button
          type="button"
          className="-ml-px inline-flex h-11 items-center gap-2 border border-ink bg-card px-4 font-mono text-label uppercase hover:bg-paper-2"
        >
          Next
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="square"
            className="size-3.5"
            aria-hidden="true"
          >
            <path d="M4 12h15" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </button>
      </nav>
    </div>
  );
}
