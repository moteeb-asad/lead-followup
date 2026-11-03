import PanelTitle from "./PanelTitle";

const linkClass =
  "underline decoration-line underline-offset-4 hover:decoration-ink";
const buttonClass =
  "inline-flex h-11 items-center justify-center gap-2 border border-ink bg-card text-sm font-semibold hover:bg-paper-2";

// Static sample data from the design.
const details = [
  {
    label: "Email",
    value: (
      <a href="mailto:sara.khan@example.com" className={linkClass}>
        sara.khan@example.com
      </a>
    ),
    className: "truncate text-sm",
  },
  {
    label: "Phone",
    value: (
      <a href="tel:+447700900123" className={linkClass}>
        +44 7700 900123
      </a>
    ),
    className: "text-sm",
  },
  { label: "Service", value: "Boiler repair", className: "text-sm" },
  { label: "Source", value: "Website form", className: "text-sm" },
  {
    label: "Created",
    value: "27 Oct 2026, 10:02:14",
    className: "font-mono text-xs leading-5 tabular-nums",
  },
];

export default function LeadContact() {
  return (
    <section className="lg:col-span-4" aria-labelledby="contact-title">
      <PanelTitle id="contact-title">Contact</PanelTitle>
      <div className="border border-ink bg-card p-5">
        <dl className="divide-y divide-line">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 py-3 first:pt-0"
            >
              <dt className="pt-0.5 font-mono text-label text-muted uppercase">
                {detail.label}
              </dt>
              <dd className={detail.className}>{detail.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-2 border-t-2 border-ink pt-4">
          <p className="font-mono text-label text-muted uppercase">Message</p>
          <blockquote className="mt-2 text-lg leading-snug">
            “Our boiler stopped heating water this morning. The pressure gauge
            shows 0.5 bar. Can someone come today or tomorrow? Any time after
            2pm works.”
          </blockquote>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <a href="tel:+447700900123" className={buttonClass}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
            </svg>
            Call
          </a>
          <a href="mailto:sara.khan@example.com" className={buttonClass}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="size-4"
              aria-hidden="true"
            >
              <path d="M3 5h18v14H3z" />
              <path d="m3 6 9 7 9-7" />
            </svg>
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
