import { Link } from "react-router";

type Reply = "queued" | "sent" | "failed";

// Static sample data from the design.
const leads: {
  id: string;
  time: string;
  name: string;
  email: string;
  service: string;
  source: string;
  status: "New" | "Contacted";
  reply: Reply;
  replyText: string;
}[] = [
  {
    id: "1",
    time: "14:19",
    name: "Omar Sheikh",
    email: "omar.sheikh@example.com",
    service: "Blocked drain",
    source: "Webhook",
    status: "New",
    reply: "queued",
    replyText: "Queued",
  },
  {
    id: "2",
    time: "13:04",
    name: "Emma Ross",
    email: "emma.ross@example.com",
    service: "Radiators",
    source: "Form",
    status: "New",
    reply: "sent",
    replyText: "Sent · 44s",
  },
  {
    id: "3",
    time: "10:02",
    name: "Sara Khan",
    email: "sara.khan@example.com",
    service: "Boiler repair",
    source: "Form",
    status: "Contacted",
    reply: "sent",
    replyText: "Sent · 37s",
  },
  {
    id: "4",
    time: "09:38",
    name: "Ali Raza",
    email: "ali.raza@example.com",
    service: "Leak",
    source: "Form",
    status: "New",
    reply: "failed",
    replyText: "Failed · 3/3",
  },
  {
    id: "5",
    time: "08:51",
    name: "James Lee",
    email: "james.lee@example.com",
    service: "Leak",
    source: "Webhook",
    status: "Contacted",
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

function ReplyStatus({ reply, text }: { reply: Reply; text: string }) {
  if (reply === "failed") {
    return (
      <span className="hidden lg:block">
        <span className="inline-flex h-6 items-center gap-1.5 bg-alert-soft px-2 font-mono text-label text-alert uppercase">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            className="size-3"
            aria-hidden="true"
          >
            <path d="M12 4 21 20H3zM12 10v4M12 17v.5" />
          </svg>
          {text}
        </span>
      </span>
    );
  }

  return (
    <span className="hidden items-center gap-1.5 font-mono text-xs text-ink-2 lg:inline-flex">
      {reply === "queued" ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="size-3.5"
          aria-hidden="true"
        >
          <path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7v5l3 2" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="square"
          className="size-3.5"
          aria-hidden="true"
        >
          <path d="M5 12.5 10 17l9-10" />
        </svg>
      )}
      {text}
    </span>
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
                <span className="inline-flex h-6 items-center border border-line px-2 font-mono text-label text-ink-2 uppercase">
                  {lead.source}
                </span>
              </span>
              <span>
                {lead.status === "New" ? (
                  <span className="inline-flex h-6 items-center gap-1.5 bg-signal px-2 font-mono text-label text-ink uppercase">
                    <span className="size-1.5 bg-ink" aria-hidden="true" />
                    New
                  </span>
                ) : (
                  <span className="inline-flex h-6 items-center gap-1.5 bg-cobalt-soft px-2 font-mono text-label text-cobalt uppercase">
                    <span className="size-1.5 bg-cobalt" aria-hidden="true" />
                    Contacted
                  </span>
                )}
              </span>
              <ReplyStatus reply={lead.reply} text={lead.replyText} />
              <ArrowIcon className="hidden size-4 lg:block" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
