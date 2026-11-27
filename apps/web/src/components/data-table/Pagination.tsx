import { pageWindow } from "./pageWindow";

type PaginationProps = {
  page: number;
  pageSize: number;
  // How many rows match in total, across every page.
  total: number;
  onPageChange: (page: number) => void;
};

const buttonClass =
  "-ml-px inline-flex h-11 items-center gap-2 border border-ink bg-card px-4 font-mono text-label uppercase hover:bg-paper-2 focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt disabled:pointer-events-none disabled:border-line disabled:text-muted";
const pageClass =
  "-ml-px inline-flex h-11 min-w-11 items-center justify-center border border-ink px-3 font-mono text-xs focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt";

// Page buttons under a DataTable. It only reports the page the person picks:
// the parent decides what to do, for example change the URL.
export default function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
}: PaginationProps) {
  if (total === 0) return null;

  const pageCount = Math.ceil(total / pageSize);
  // A page number past the end can come from an old link or a typed URL. It
  // has no rows, so say that instead of printing a range.
  const pastEnd = page > pageCount;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="font-mono text-xs text-ink-2">
        {pastEnd
          ? `No rows on page ${page}. There are ${pageCount} pages.`
          : `Showing ${from}–${to} of ${total}`}
      </p>
      <nav aria-label="Pagination" className="flex">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(Math.min(page - 1, pageCount))}
          className={buttonClass}
        >
          Prev
        </button>
        {pageWindow(Math.min(page, pageCount), pageCount).map((item, index) =>
          item === "gap" ? (
            <span
              key={`gap-${index}`}
              aria-hidden="true"
              className="-ml-px inline-flex h-11 items-center border border-ink bg-card px-3 font-mono text-xs text-muted"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-current={item === page ? "page" : undefined}
              aria-label={`Page ${item}`}
              onClick={() => onPageChange(item)}
              className={`${pageClass} ${item === page ? "bg-ink text-paper" : "bg-card hover:bg-paper-2"}`}
            >
              {item}
            </button>
          ),
        )}
        <button
          type="button"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          className={buttonClass}
        >
          Next
        </button>
      </nav>
    </div>
  );
}
