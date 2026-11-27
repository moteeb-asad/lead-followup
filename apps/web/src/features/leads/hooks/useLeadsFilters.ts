import { useSearchParams } from "react-router";
import {
  leadSources,
  leadStatuses,
  type LeadsQuery,
  type LeadSource,
  type LeadStatus,
} from "../types";

export const PAGE_SIZE = 20;

// A value in the URL that isn't on the list is ignored, not an error. The URL
// can come from an old link or be typed by hand, and the API checks it again.
function oneOf<Value extends string>(
  value: string | null,
  allowed: readonly Value[],
) {
  return allowed.find((item) => item === value);
}

function parsePage(value: string | null) {
  const page = Number(value);
  return Number.isInteger(page) && page >= 1 ? page : 1;
}

// The page and the filters of the leads screen, kept in the URL, so a refresh
// or a shared link shows the same view. Changing a filter goes back to page 1.
export function useLeadsFilters() {
  const [params, setParams] = useSearchParams();

  const query: LeadsQuery = {
    status: oneOf(params.get("status"), leadStatuses),
    source: oneOf(params.get("source"), leadSources),
    page: parsePage(params.get("page")),
    pageSize: PAGE_SIZE,
  };

  function change(update: (next: URLSearchParams) => void) {
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      update(next);
      return next;
    });
  }

  return {
    query,
    setStatus: (status: LeadStatus | undefined) =>
      change((next) => {
        if (status) next.set("status", status);
        else next.delete("status");
        next.delete("page");
      }),
    setSource: (source: LeadSource | undefined) =>
      change((next) => {
        if (source) next.set("source", source);
        else next.delete("source");
        next.delete("page");
      }),
    setPage: (page: number) =>
      change((next) => {
        if (page > 1) next.set("page", String(page));
        else next.delete("page");
      }),
  };
}
