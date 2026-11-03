import PanelTitle from "./PanelTitle";

// The marker style tells events apart: solid for received, outlined for
// queued, lime for sent, cobalt for a status change.
const markers = {
  received: "bg-ink",
  queued: "border-2 border-ink bg-card",
  sent: "border-2 border-ink bg-signal",
  status: "bg-cobalt",
};

// Static sample data from the design.
const events: {
  time: string;
  title: string;
  detail: string;
  marker: keyof typeof markers;
}[] = [
  {
    time: "10:02:14",
    title: "Lead received",
    detail: "Website form",
    marker: "received",
  },
  {
    time: "10:02:14",
    title: "Auto-reply queued",
    detail: "Template: New enquiry",
    marker: "queued",
  },
  {
    time: "10:02:51",
    title: "Auto-reply sent",
    detail: "To sara.khan@example.com · attempt 1 · 37s after the lead",
    marker: "sent",
  },
  {
    time: "11:40:03",
    title: "Status changed",
    detail: "New → Contacted",
    marker: "status",
  },
  {
    time: "11:42:30",
    title: "Manual reply queued",
    detail: "Subject: We can visit tomorrow",
    marker: "queued",
  },
  {
    time: "11:42:34",
    title: "Manual reply sent",
    detail: "Attempt 1",
    marker: "sent",
  },
];

export default function LeadTimeline() {
  return (
    <section className="lg:col-span-4" aria-labelledby="timeline-title">
      <PanelTitle id="timeline-title">Timeline</PanelTitle>
      <div className="border border-ink bg-card">
        <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 font-mono text-label text-muted uppercase">
          <span className="text-ink">Today · Tue 27 Oct</span>
          <span>{events.length} events</span>
        </div>

        {/* Ticket-style perforation with a notch cut into each side. */}
        <div className="relative" aria-hidden="true">
          <div className="mx-5 border-t-2 border-dashed border-ink" />
          <span className="absolute -top-[11px] -left-[12px] size-6 rounded-full border border-ink bg-paper [clip-path:inset(0_0_0_50%)]" />
          <span className="absolute -top-[11px] -right-[12px] size-6 rounded-full border border-ink bg-paper [clip-path:inset(0_50%_0_0)]" />
        </div>

        <ol className="relative px-5 py-2 before:absolute before:top-7 before:bottom-7 before:left-[111.5px] before:w-px before:bg-line">
          {events.map((event, i) => (
            <li
              key={i}
              className="grid grid-cols-[72px_16px_minmax(0,1fr)] gap-x-3 border-b border-dashed border-line py-4 last:border-b-0"
            >
              <time className="font-mono text-xs text-ink-2 tabular-nums">
                {event.time}
              </time>
              <span className="flex justify-center pt-1" aria-hidden="true">
                <span className={`relative size-3 ${markers[event.marker]}`} />
              </span>
              <div>
                <p className="text-sm font-semibold">{event.title}</p>
                <p className="mt-0.5 text-xs text-muted">{event.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
