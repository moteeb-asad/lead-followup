// Static sample data from the design: 14 to 27 October, the last day is today.
const days = [
  { label: "14", count: 4, height: "h-[50%]" },
  { label: "15", count: 6, height: "h-[75%]" },
  { label: "16", count: 5, height: "h-[63%]" },
  { label: "17", count: 2, height: "h-[25%]" },
  { label: "18", count: 1, height: "h-[13%]" },
  { label: "19", count: 7, height: "h-[88%]" },
  { label: "20", count: 5, height: "h-[63%]" },
  { label: "21", count: 6, height: "h-[75%]" },
  { label: "22", count: 8, height: "h-[100%]" },
  { label: "23", count: 4, height: "h-[50%]" },
  { label: "24", count: 3, height: "h-[38%]" },
  { label: "25", count: 3, height: "h-[38%]" },
  { label: "26", count: 3, height: "h-[38%]" },
];

export default function LeadsPerDayChart() {
  return (
    <section
      className="flex flex-col border border-ink bg-card p-6 lg:col-span-8"
      aria-labelledby="chart-title"
    >
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h2
          id="chart-title"
          className="text-base font-bold font-stretch-expanded tracking-wide uppercase"
        >
          Leads per day
        </h2>
        <p className="font-mono text-label text-muted uppercase">
          Last 14 days · 62 leads
        </p>
      </header>
      <div className="mt-6 overflow-x-auto">
        <div className="min-w-[480px]">
          <div
            className="grid h-56 grid-cols-14 gap-2 border-b-2 border-ink pt-6"
            role="img"
            aria-label="Leads per day from 14 to 27 October. Lowest 1 on Sunday 18 October, highest 8 on Thursday 22 October, 5 today."
          >
            {days.map((day) => (
              <div key={day.label} className="flex items-end">
                <div className={`relative w-full ${day.height} bg-ink`}>
                  <span className="absolute inset-x-0 -top-5 text-center font-mono text-label text-ink-2">
                    {day.count}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex items-end">
              <div className="relative h-[63%] w-full border-2 border-b-0 border-ink bg-signal">
                <span className="absolute inset-x-0 -top-5 text-center font-mono text-label font-semibold text-ink">
                  5
                </span>
              </div>
            </div>
          </div>
          <div
            className="mt-2 grid grid-cols-14 gap-2 text-center font-mono text-label text-muted uppercase"
            aria-hidden="true"
          >
            {days.map((day) => (
              <span key={day.label}>{day.label}</span>
            ))}
            <span className="font-semibold text-ink">Today</span>
          </div>
        </div>
      </div>
      <div className="mt-auto pt-8">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-label text-muted uppercase">
          <span>By source</span>
          <span>
            <span className="text-ink">Form 41</span> · Webhook 21
          </span>
        </div>
        <div
          className="mt-2 flex h-3 border border-ink"
          role="img"
          aria-label="41 leads from the form and 21 from the webhook in the last 14 days"
        >
          <div className="w-[66%] bg-ink" />
          <div className="flex-1 bg-paper-2" />
        </div>
      </div>
    </section>
  );
}
