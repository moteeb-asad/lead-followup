import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getLeads } from "../api";
import type { LeadsQuery } from "../types";

// One page of leads. The query is part of the key, so each page and each
// filter is cached on its own.
export function useLeads(query: LeadsQuery) {
  return useQuery({
    queryKey: ["leads", query],
    queryFn: ({ signal }) => getLeads(query, signal),
    // Keep showing the old rows while the next page loads.
    placeholderData: keepPreviousData,
    // A lead can arrive from the form at any moment, so always check again
    // when the screen opens, instead of using the 30 second default.
    staleTime: 0,
  });
}
