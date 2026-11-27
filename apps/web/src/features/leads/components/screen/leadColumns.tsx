import { Link } from "react-router";
import type { Column } from "@/components/data-table/types";
import { formatReceived } from "../../formatReceived";
import type { Lead } from "../../types";
import LeadStatusBadge from "../LeadStatusBadge";
import SourceBadge from "../SourceBadge";

// The columns of the leads table. The auto-reply column shows a dash until the
// outbox exists, and then it shows the real state of each lead's reply.
export const leadColumns: Column<Lead>[] = [
  {
    id: "id",
    header: "ID",
    cell: (lead) => `L-${lead.id}`,
    cellClassName: "font-mono text-xs text-ink-2 tabular-nums",
  },
  {
    id: "name",
    header: "Name",
    cell: (lead) => (
      <>
        <Link
          to={`/admin/leads/${lead.id}`}
          className="font-semibold underline-offset-4 hover:underline"
        >
          {lead.name}
        </Link>
        <span className="block text-xs text-muted">{lead.email}</span>
      </>
    ),
  },
  {
    id: "service",
    header: "Service",
    cell: (lead) => lead.service ?? "—",
  },
  {
    id: "source",
    header: "Source",
    cell: (lead) => <SourceBadge source={lead.source} />,
  },
  {
    id: "status",
    header: "Status",
    cell: (lead) => <LeadStatusBadge status={lead.status} />,
  },
  {
    id: "reply",
    header: "Auto-reply",
    cell: () => <span className="text-muted">—</span>,
  },
  {
    id: "received",
    header: "Received",
    cell: (lead) => formatReceived(lead.createdAt),
    align: "right",
    cellClassName: "font-mono text-xs text-ink-2 tabular-nums",
  },
];
