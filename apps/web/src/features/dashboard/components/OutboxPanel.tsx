const rows = [
  { label: "Queued", count: 1 },
  { label: "Sending", count: 0 },
  { label: "Sent today", count: 4 },
];

export default function OutboxPanel() {
  return (
    <section
      className="flex flex-col gap-5 bg-ink p-6 text-paper lg:col-span-4"
      aria-labelledby="outbox-title"
    >
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h2
          id="outbox-title"
          className="text-base font-bold font-stretch-expanded tracking-wide uppercase"
        >
          Outbox
        </h2>
        <span className="inline-flex items-center gap-2 font-mono text-label text-signal uppercase">
          <span className="size-2 bg-signal" aria-hidden="true" />
          Worker running
        </span>
      </header>
      <dl className="flex flex-col">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between border-t border-ink-2 py-3"
          >
            <dt className="font-mono text-label text-fog uppercase">
              {row.label}
            </dt>
            <dd className="text-3xl font-extrabold font-stretch-expanded tabular-nums">
              {row.count}
            </dd>
          </div>
        ))}
        <div className="flex items-baseline justify-between border-y border-ink-2 py-3">
          <dt className="font-mono text-label text-fog uppercase">Failed</dt>
          <dd className="text-3xl font-extrabold font-stretch-expanded text-alert-bright tabular-nums">
            1
          </dd>
        </div>
      </dl>
      <p className="mt-auto font-mono text-xs leading-5 text-fog">
        Polls every 5s. A failed send retries after 1 min, then 5 min, and stops
        after 3 attempts.
      </p>
    </section>
  );
}
