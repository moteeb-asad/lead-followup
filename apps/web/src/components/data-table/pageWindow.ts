// Which page buttons to show: the first page, the last page, and the pages
// next to the current one. A gap of exactly one page shows that page instead
// of "…", and a longer gap shows "gap". Example for page 8 of 20:
// 1 gap 7 8 9 gap 20.
export function pageWindow(
  page: number,
  pageCount: number,
): (number | "gap")[] {
  const wanted = new Set([1, pageCount, page - 1, page, page + 1]);
  const pages = [...wanted]
    .filter((p) => p >= 1 && p <= pageCount)
    .sort((a, b) => a - b);

  const result: (number | "gap")[] = [];
  let previous = 0;
  for (const p of pages) {
    if (previous && p - previous > 1) {
      result.push(p - previous === 2 ? previous + 1 : "gap");
    }
    result.push(p);
    previous = p;
  }
  return result;
}
