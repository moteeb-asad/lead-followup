import { Link } from "react-router";
import type { LeadSource, LeadStatus, ReplyState } from "../types";
import LeadStatusBadge from "./LeadStatusBadge";
import ReplyStatus from "./ReplyStatus";
import SourceBadge from "./SourceBadge";

// Static sample data from the design.
const leads: {
  id: string;
  name: string;
  email: string;
  service: string;
  source: LeadSource;
  status: LeadStatus;
  reply: ReplyState;
  replyText: string;
  received: string;
}[] = [
  {
    id: "L-1048",
    name: "Omar Sheikh",
    email: "omar.sheikh@example.com",
    service: "Blocked drain",
    source: "webhook",
    status: "new",
    reply: "queued",
    replyText: "Queued",
    received: "Today 14:19",
  },
  {
    id: "L-1047",
    name: "Emma Ross",
    email: "emma.ross@example.com",
    service: "Radiators",
    source: "form",
    status: "new",
    reply: "sent",
    replyText: "Sent · 44s",
    received: "Today 13:04",
  },
  {
    id: "L-1046",
    name: "Sara Khan",
    email: "sara.khan@example.com",
    service: "Boiler repair",
    source: "form",
    status: "contacted",
    reply: "sent",
    replyText: "Sent · 37s",
    received: "Today 10:02",
  },
  {
    id: "L-1045",
    name: "Ali Raza",
    email: "ali.raza@example.com",
    service: "Leak",
    source: "form",
    status: "new",
    reply: "failed",
    replyText: "Failed · 3/3",
    received: "Today 09:38",
  },
  {
    id: "L-1044",
    name: "James Lee",
    email: "james.lee@example.com",
    service: "Leak",
    source: "webhook",
    status: "contacted",
    reply: "sent",
    replyText: "Sent · 42s",
    received: "Today 08:51",
  },
  {
    id: "L-1043",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    service: "Bathroom fitting",
    source: "form",
    status: "won",
    reply: "sent",
    replyText: "Sent · 39s",
    received: "Yesterday 17:40",
  },
  {
    id: "L-1042",
    name: "Tom Becker",
    email: "tom.becker@example.com",
    service: "Leak",
    source: "webhook",
    status: "won",
    reply: "sent",
    replyText: "Sent · 51s",
    received: "Yesterday 15:12",
  },
  {
    id: "L-1041",
    name: "Hina Malik",
    email: "hina.malik@example.com",
    service: "Something else",
    source: "form",
    status: "contacted",
    reply: "sent",
    replyText: "Sent · 35s",
    received: "Yesterday 11:26",
  },
  {
    id: "L-1040",
    name: "Daniel Okafor",
    email: "daniel.okafor@example.com",
    service: "Boiler repair",
    source: "form",
    status: "lost",
    reply: "sent",
    replyText: "Sent · 47s",
    received: "25 Oct 16:03",
  },
  {
    id: "L-1039",
    name: "Grace Liu",
    email: "grace.liu@example.com",
    service: "Blocked drain",
    source: "webhook",
    status: "won",
    reply: "sent",
    replyText: "Sent · 40s",
    received: "25 Oct 09:47",
  },
];

const columns = [
  "ID",
  "Name",
  "Service",
  "Source",
  "Status",
  "Auto-reply",
  "Received",
];

export default function LeadsTable() {
  return (
    <div className="overflow-x-auto border border-ink bg-card">
      <table className="w-full min-w-[960px] border-collapse text-sm">
        <caption className="sr-only">Leads, newest first</caption>
        <thead className="bg-paper-2">
          <tr className="border-b border-ink text-left font-mono text-label text-muted uppercase">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className={`h-10 px-4 font-normal ${column === "Received" ? "text-right" : ""}`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-b border-line last:border-b-0 hover:bg-signal-soft"
            >
              <td className="px-4 py-3 font-mono text-xs text-ink-2 tabular-nums">
                {lead.id}
              </td>
              <td className="px-4 py-3">
                <Link
                  to={`/admin/leads/${lead.id}`}
                  className="font-semibold underline-offset-4 hover:underline"
                >
                  {lead.name}
                </Link>
                <span className="block text-xs text-muted">{lead.email}</span>
              </td>
              <td className="px-4 py-3">{lead.service}</td>
              <td className="px-4 py-3">
                <SourceBadge source={lead.source} />
              </td>
              <td className="px-4 py-3">
                <LeadStatusBadge status={lead.status} />
              </td>
              <td className="px-4 py-3">
                <ReplyStatus state={lead.reply} text={lead.replyText} />
              </td>
              <td className="px-4 py-3 text-right font-mono text-xs text-ink-2 tabular-nums">
                {lead.received}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
