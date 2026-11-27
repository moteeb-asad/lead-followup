import type { ReactNode } from "react";
import type { Column } from "./types";

type DataTableProps<Row> = {
  columns: Column<Row>[];
  rows: Row[];
  getRowKey: (row: Row) => string;
  // Read out by screen readers, never shown. Say what the table lists.
  caption: string;
  // True until the first answer arrives: shows placeholder rows.
  isLoading?: boolean;
  // True while newer rows load, for example after a page change. The old rows
  // stay on screen, dimmed.
  isFetching?: boolean;
  // A message written for the person. Shown instead of the rows.
  error?: string | null;
  onRetry?: () => void;
  emptyMessage?: ReactNode;
  // How many placeholder rows to show while loading.
  placeholderRows?: number;
  // Classes for the <table>, for example a minimum width.
  tableClassName?: string;
};

// A table that only displays what it is given: it never fetches, never knows
// what a row is, and never decides who may see what. The header always stays,
// so the layout doesn't jump between loading, error, empty and loaded.
// Request failures arrive as the `error` prop. An error boundary is for
// unexpected render errors, not for a failed request.
export default function DataTable<Row>({
  columns,
  rows,
  getRowKey,
  caption,
  isLoading = false,
  isFetching = false,
  error = null,
  onRetry,
  emptyMessage = "Nothing to show.",
  placeholderRows = 5,
  tableClassName = "min-w-[720px]",
}: DataTableProps<Row>) {
  const cellAlign = (column: Column<Row>) =>
    column.align === "right" ? "text-right" : "";

  return (
    <div className="overflow-x-auto border border-ink bg-card">
      <table
        className={`w-full border-collapse text-sm transition-opacity ${tableClassName} ${isFetching ? "opacity-60" : ""}`}
        aria-busy={isLoading || isFetching}
      >
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-paper-2">
          <tr className="border-b border-ink text-left font-mono text-label text-muted uppercase">
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className={`h-10 px-4 font-normal ${cellAlign(column)}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: placeholderRows }, (_, index) => (
              <tr
                key={index}
                className="border-b border-line last:border-b-0"
                aria-hidden="true"
              >
                {columns.map((column) => (
                  <td key={column.id} className="px-4 py-3">
                    <span className="block h-4 w-3/4 animate-pulse bg-paper-2" />
                  </td>
                ))}
              </tr>
            ))
          ) : error ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center">
                <p role="alert" className="text-sm font-medium text-alert">
                  {error}
                </p>
                {onRetry && (
                  <button
                    type="button"
                    onClick={onRetry}
                    className="mt-4 inline-flex h-11 items-center border-2 border-ink bg-card px-5 font-mono text-label uppercase hover:bg-paper-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
                  >
                    Try again
                  </button>
                )}
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-sm text-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={getRowKey(row)}
                className="border-b border-line last:border-b-0 hover:bg-signal-soft"
              >
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={`px-4 py-3 ${cellAlign(column)} ${column.cellClassName ?? ""}`}
                  >
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
