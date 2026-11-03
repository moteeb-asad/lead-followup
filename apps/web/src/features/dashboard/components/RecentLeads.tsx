import { Link } from "react-router";
import LeadStatusBadge from "@/features/leads/components/LeadStatusBadge";
import ReplyStatus from "@/features/leads/components/ReplyStatus";
import SourceBadge from "@/features/leads/components/SourceBadge";
import type {
  LeadSource,
  LeadStatus,
  ReplyState,
} from "@/features/leads/types";

// Static sample data from the design.
const leads: {
  id: string;
  time: string;
  name: string;
  email: string;
  service: string;
  source: LeadSource;
  status: LeadStatus;
  reply: ReplyState;
  replyText: string;
}[] = [
  {
    id: "L-1048",
    time: "14:19",
    name: "Omar Sheikh",
    email: "omar.sheikh@example.com",
    service: "Blocked drain",
    source: "webhook",
    status: "new",
    reply: "queued",
    replyText: "Queued",
  },
  {
    id: "L-1047",
    time: "13:04",
    name: "Emma Ross",
    email: "emma.ross@example.com",
    service: "Radiators",
    source: "form",
    status: "new",
    reply: "sent",
    replyText: "Sent · 44s",
  },
  {
    id: "L-1046",
    time: "10:02",
    name: "Sara Khan",
    email: "sara.khan@example.com",
    service: "Boiler repair",
    source: "form",
    status: "contacted",
    reply: "sent",
    replyText: "Sent · 37s",
  },
  {
    id: "L-1045",
    time: "09:38",
    name: "Ali Raza",
    email: "ali.raza@example.com",
    service: "Leak",
    source: "form",
    status: "new",
    reply: "failed",
    replyText: "Failed · 3/3",
  },
  {
    id: "L-1044",
    time: "08:51",
    name: "James Lee",
    email: "james.lee@example.com",
    service: "Leak",
    source: "webhook",
    status: "contacted",
    reply: "sent",
    replyText: "Sent · 42s",
  },
];

function ArrowIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="square"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export default function RecentLeads() {
  return (
    <section
      className="border border-ink bg-card"
      aria-labelledby="recent-title"
    >
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-ink px-6 py-4">
        <h2
          id="recent-title"
          className="text-base font-bold font-stretch-expanded tracking-wide uppercase"
        >
          Recent leads
        </h2>
        <Link
          to="/admin/leads"
          className="inline-flex items-center gap-1.5 font-mono text-label uppercase underline-offset-4 hover:underline"
        >
          All leads
          <ArrowIcon className="size-3.5" />
        </Link>
      </header>
      <ul className="divide-y divide-line">
        {leads.map((lead) => (
          <li key={lead.id}>
            <Link
              to={`/admin/leads/${lead.id}`}
              className="grid grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 hover:bg-signal-soft lg:grid-cols-[72px_minmax(0,1.3fr)_minmax(0,1fr)_96px_132px_150px_20px]"
            >
              <span className="font-mono text-xs text-ink-2 tabular-nums">
                {lead.time}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-semibold">
                  {lead.name}
                </span>
                <span className="block truncate text-xs text-muted">
                  {lead.email}
                </span>
              </span>
              <span className="hidden truncate text-sm lg:block">
                {lead.service}
              </span>
              <span className="hidden lg:block">
                <SourceBadge source={lead.source} />
              </span>
              <span>
                <LeadStatusBadge status={lead.status} />
              </span>
              <span className="hidden lg:block">
                <ReplyStatus state={lead.reply} text={lead.replyText} />
              </span>
              <ArrowIcon className="hidden size-4 lg:block" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
