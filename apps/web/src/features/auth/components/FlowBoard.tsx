// Static example of one lead moving through the system. Not live data.
const rows = [
  {
    time: "10:02",
    event: "Lead in",
    status: "Received",
    statusClass: "text-paper",
  },
  { time: "10:02", event: "Outbox", status: "Queued", statusClass: "text-fog" },
  {
    time: "10:02",
    event: "Auto-reply",
    status: "Sent",
    statusClass: "text-signal",
  },
  {
    time: "11:40",
    event: "Status",
    status: "Contacted",
    statusClass: "text-paper",
  },
];

const cellClass = "relative h-10 items-center bg-ink-soft px-2.5";

// The thin line across the middle of each cell, like a split-flap board.
function Seam() {
  return (
    <span
      className="absolute inset-x-0 top-1/2 h-px bg-ink"
      aria-hidden="true"
    />
  );
}

export default function FlowBoard() {
  return (
    <section
      className="flex flex-[1_1_560px] flex-col justify-between gap-12 bg-ink p-6 text-paper sm:p-8 lg:p-14"
      aria-label="About Lead Follow-up"
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-flex size-9 items-center justify-center bg-signal text-ink"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="square"
            className="size-5"
          >
            <path d="M10 6 4 12l6 6" />
            <path d="M4 12h9a7 7 0 0 1 7 7v1" />
          </svg>
        </span>
        <span className="text-sm font-extrabold font-stretch-expanded tracking-tight uppercase">
          Lead Follow-up
        </span>
      </div>

      <div className="flex flex-col gap-10">
        <p className="max-w-xl text-4xl leading-[0.95] font-extrabold font-stretch-expanded tracking-tight sm:text-5xl lg:text-6xl">
          Every lead gets a reply within{" "}
          <mark className="inline-block bg-signal px-1 leading-[1.05] text-ink">
            a minute.
          </mark>
        </p>

        <figure className="max-w-xl border border-ink-2 p-5">
          <figcaption className="flex flex-wrap items-center justify-between gap-2 font-mono text-label text-fog uppercase">
            <span>Lead L-1046 · Today</span>
            <span>Form → Outbox → Email</span>
          </figcaption>
          <table className="mt-4 w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-left font-mono text-label text-fog uppercase">
                <th scope="col" className="font-normal">
                  Time
                </th>
                <th scope="col" className="pl-2 font-normal">
                  Event
                </th>
                <th scope="col" className="pl-2 font-normal">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="font-mono text-sm font-medium tracking-[0.1em] uppercase sm:text-lg sm:tracking-[0.18em]">
              {rows.map((row) => (
                <tr key={`${row.time}-${row.event}`}>
                  <td className="w-0">
                    <span className={`${cellClass} inline-flex text-paper`}>
                      {row.time}
                      <Seam />
                    </span>
                  </td>
                  <td className="pl-2">
                    <span className={`${cellClass} flex text-paper`}>
                      {row.event}
                      <Seam />
                    </span>
                  </td>
                  <td className="w-0 pl-2">
                    <span
                      className={`${cellClass} flex sm:min-w-40 ${row.statusClass}`}
                    >
                      {row.status}
                      <Seam />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      </div>

      <p className="font-mono text-label text-fog uppercase">
        v0.1 · Admin area
      </p>
    </section>
  );
}
