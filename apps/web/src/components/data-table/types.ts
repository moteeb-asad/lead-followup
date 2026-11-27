import type { ReactNode } from "react";

// One column of a DataTable. The shape (a header and a cell function per
// column) is close to TanStack Table's column definitions on purpose, so a
// move to that library later is mostly mechanical.
export type Column<Row> = {
  // Stable key for the column, used as the React key.
  id: string;
  // The visible header text.
  header: string;
  // What to show in this column for one row.
  cell: (row: Row) => ReactNode;
  // Right-align the header and the cells, for dates and numbers.
  align?: "left" | "right";
  // Extra classes for each cell of this column (font, colour, width).
  cellClassName?: string;
};
